import { describe, expect, it } from "vitest";

import { DEMO_CHARACTER_LIST } from "../demo";
import { computeOverview, latestMetricPerPublication, num } from "../overview";
import type { AccountRow, MetricRow, PubRow, RevenueRow } from "../overview";
import type { Character } from "../types";

const NOW = Date.parse("2026-03-01T00:00:00Z");
const daysBefore = (n: number) => new Date(NOW - n * 86_400_000).toISOString();

function character(id: string, overrides: Partial<Character> = {}): Character {
  return { ...DEMO_CHARACTER_LIST[0], id, slug: `c-${id}`, ...overrides };
}

function metric(publication_id: string, checkpoint: string, over: Partial<MetricRow> = {}): MetricRow {
  return {
    publication_id,
    checkpoint,
    views: 0,
    link_clicks: 0,
    orders: 0,
    revenue: 0,
    avg_watch_seconds: 0,
    completion_rate: null,
    ...over,
  };
}

function publication(id: string, over: Partial<PubRow> = {}): PubRow {
  return { id, character_id: "a", platform: "tiktok", published_at: daysBefore(1), ...over };
}

function run(over: Partial<Parameters<typeof computeOverview>[0]> = {}) {
  return computeOverview({
    characters: [],
    accounts: [],
    publications: [],
    metrics: [],
    revenue: [],
    now: NOW,
    ...over,
  });
}

describe("num", () => {
  it("parses the numeric strings PostgREST returns", () => {
    expect(num("1840.50")).toBe(1840.5);
  });

  it("treats null, undefined and unparseable values as zero", () => {
    expect(num(null)).toBe(0);
    expect(num(undefined)).toBe(0);
    expect(num("not a number")).toBe(0);
  });
});

describe("latestMetricPerPublication", () => {
  it("keeps only the highest checkpoint per publication", () => {
    const latest = latestMetricPerPublication([
      metric("p1", "h24", { views: 100 }),
      metric("p1", "d7", { views: 900 }),
      metric("p1", "h72", { views: 400 }),
    ]);

    expect(latest.size).toBe(1);
    expect(latest.get("p1")?.checkpoint).toBe("d7");
  });

  it("is independent of row order", () => {
    const ordered = latestMetricPerPublication([metric("p1", "h24"), metric("p1", "d30")]);
    const reversed = latestMetricPerPublication([metric("p1", "d30"), metric("p1", "h24")]);

    expect(ordered.get("p1")?.checkpoint).toBe("d30");
    expect(reversed.get("p1")?.checkpoint).toBe("d30");
  });

  it("ignores an unknown checkpoint in favour of a known one", () => {
    const latest = latestMetricPerPublication([
      metric("p1", "h24", { views: 10 }),
      metric("p1", "weird", { views: 999 }),
    ]);

    expect(latest.get("p1")?.checkpoint).toBe("h24");
  });
});

describe("computeOverview — view counting", () => {
  it("counts each publication once, not once per checkpoint", () => {
    const result = run({
      publications: [publication("p1")],
      metrics: [
        metric("p1", "h24", { views: 1_000 }),
        metric("p1", "h72", { views: 5_000 }),
        metric("p1", "d7", { views: 9_000 }),
      ],
    });

    expect(result.kpis.totalViews).toBe(9_000);
  });

  it("skips metrics whose publication is missing or unpublished", () => {
    const result = run({
      publications: [publication("p1", { published_at: null })],
      metrics: [metric("p1", "d7", { views: 500 }), metric("ghost", "d7", { views: 4_000 })],
    });

    // p1 still counts toward totals, but contributes to no date window.
    expect(result.kpis.totalViews).toBe(500);
    expect(result.kpis.views7d).toBe(0);
    expect(result.kpis.views30d).toBe(0);
  });
});

describe("computeOverview — date windows", () => {
  it("buckets views into the 7- and 30-day windows by publish date", () => {
    const result = run({
      publications: [
        publication("recent", { published_at: daysBefore(2) }),
        publication("midway", { published_at: daysBefore(20) }),
        publication("old", { published_at: daysBefore(200) }),
      ],
      metrics: [
        metric("recent", "d7", { views: 100 }),
        metric("midway", "d7", { views: 200 }),
        metric("old", "d30", { views: 400 }),
      ],
    });

    expect(result.kpis.views7d).toBe(100);
    expect(result.kpis.views30d).toBe(300);
    expect(result.kpis.totalViews).toBe(700);
  });
});

describe("computeOverview — averages", () => {
  it("weights average watch time by views rather than averaging flat", () => {
    const result = run({
      publications: [publication("big"), publication("small")],
      metrics: [
        metric("big", "d7", { views: 1_000_000, avg_watch_seconds: 2 }),
        metric("small", "d7", { views: 100, avg_watch_seconds: 40 }),
      ],
    });

    // Flat mean would be 21s; weighted is ~2.0s.
    expect(result.kpis.avgWatchSeconds).toBeCloseTo(2.004, 2);
  });

  it("averages completion only over rows that reported it", () => {
    const result = run({
      publications: [publication("p1"), publication("p2"), publication("p3")],
      metrics: [
        metric("p1", "d7", { views: 10, completion_rate: 40 }),
        metric("p2", "d7", { views: 10, completion_rate: 60 }),
        metric("p3", "d7", { views: 10, completion_rate: null }),
      ],
    });

    expect(result.kpis.avgCompletionRate).toBe(50);
  });

  it("returns zero rather than NaN when there is nothing to divide by", () => {
    const result = run();

    expect(result.kpis.avgWatchSeconds).toBe(0);
    expect(result.kpis.avgCompletionRate).toBe(0);
    expect(result.kpis.conversionRate).toBe(0);
    expect(result.kpis.revenuePerVideo).toBe(0);
  });
});

describe("computeOverview — commerce and revenue", () => {
  it("derives conversion rate from orders over product clicks", () => {
    const result = run({
      publications: [publication("p1")],
      metrics: [metric("p1", "d7", { link_clicks: 1_000, orders: 25 })],
    });

    expect(result.kpis.conversionRate).toBe(2.5);
  });

  it("splits revenue by source and totals it", () => {
    const revenue: RevenueRow[] = [
      { source: "affiliate", character_id: "a", gross_amount: "100.50", occurred_on: "2026-02-01" },
      { source: "tiktok_shop", character_id: "a", gross_amount: 200, occurred_on: "2026-02-01" },
      { source: "brand_deal", character_id: null, gross_amount: 300, occurred_on: "2026-02-01" },
      { source: "ugc", character_id: null, gross_amount: 50, occurred_on: "2026-02-01" },
    ];

    const result = run({ publications: [publication("p1")], revenue });

    expect(result.kpis.affiliateRevenue).toBe(100.5);
    expect(result.kpis.tiktokShopRevenue).toBe(200);
    expect(result.kpis.brandRevenue).toBe(300);
    // UGC has no dedicated tile but must still reach the total.
    expect(result.kpis.totalRevenue).toBe(650.5);
    expect(result.kpis.revenuePerVideo).toBe(650.5);
  });
});

describe("computeOverview — character summaries", () => {
  const characters = [character("a"), character("b", { slug: "c-b" })];
  const accounts: AccountRow[] = [
    { character_id: "a", platform: "tiktok", followers: 1_000, is_live: true },
    { character_id: "a", platform: "instagram", followers: 250, is_live: true },
    { character_id: "b", platform: "tiktok", followers: 0, is_live: false },
  ];

  it("sums followers per character and across the network", () => {
    const result = run({ characters, accounts });

    expect(result.characters[0].followers).toBe(1_250);
    expect(result.characters[1].followers).toBe(0);
    expect(result.kpis.totalFollowers).toBe(1_250);
  });

  it("picks the top platform by follower count, and none when there are no followers", () => {
    const result = run({ characters, accounts });

    expect(result.characters[0].topPlatform).toBe("tiktok");
    expect(result.characters[1].topPlatform).toBeNull();
  });

  it("derives status from publications, live accounts and the active flag", () => {
    const result = run({
      characters: [...characters, character("c", { slug: "c-c", is_active: false })],
      accounts,
      publications: [publication("p1", { character_id: "a" })],
      metrics: [metric("p1", "d7", { views: 10 })],
    });

    expect(result.characters[0].status).toBe("live"); // has published
    expect(result.characters[1].status).toBe("planned"); // account exists but not live
    expect(result.characters[2].status).toBe("paused"); // is_active false
  });

  it("attributes each character's best video and revenue", () => {
    const result = run({
      characters,
      accounts,
      publications: [publication("p1", { character_id: "a" }), publication("p2", { character_id: "a" })],
      metrics: [
        metric("p1", "d7", { views: 400 }),
        metric("p2", "d7", { views: 1_200 }),
      ],
      revenue: [{ source: "affiliate", character_id: "a", gross_amount: 42, occurred_on: "2026-02-01" }],
    });

    expect(result.characters[0].topVideoViews).toBe(1_200);
    expect(result.characters[0].videosPublished).toBe(2);
    expect(result.characters[0].revenue).toBe(42);
    expect(result.characters[1].revenue).toBe(0);
  });

  it("never reports computed figures as demo data", () => {
    expect(run().isDemo).toBe(false);
  });
});
