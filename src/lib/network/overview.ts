/**
 * Network KPI aggregation — spec §16.
 *
 * Pure: it takes rows and returns numbers, with no Supabase client and no clock
 * of its own. `queries.ts` does the fetching and calls in here, which is what
 * makes this testable — the counting rules below are easy to get subtly wrong
 * and expensive to get wrong silently.
 */

import { EMPTY_KPIS } from "./demo";
import type {
  Character, CharacterSummary, NetworkKpis, NetworkOverview, Platform,
} from "./types";

export interface AccountRow {
  character_id: string;
  platform: Platform;
  followers: number | null;
  is_live: boolean;
}

export interface PubRow {
  id: string;
  character_id: string | null;
  platform: Platform;
  published_at: string | null;
}

export interface MetricRow {
  publication_id: string;
  checkpoint: string;
  views: number | null;
  link_clicks: number | null;
  orders: number | null;
  revenue: number | string | null;
  avg_watch_seconds: number | string | null;
  completion_rate: number | string | null;
}

export interface RevenueRow {
  source: string;
  character_id: string | null;
  gross_amount: number | string | null;
  occurred_on: string;
}

export interface OverviewInput {
  characters: Character[];
  accounts: AccountRow[];
  publications: PubRow[];
  metrics: MetricRow[];
  revenue: RevenueRow[];
  /** Injectable clock so the 7- and 30-day windows are testable. */
  now?: number;
}

/** Later checkpoints supersede earlier ones for the same publication. */
const CHECKPOINT_RANK: Record<string, number> = { h24: 1, h72: 2, d7: 3, d30: 4 };

/** Postgres numerics arrive as strings over PostgREST. */
export function num(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === "string" ? parseFloat(value) : value;
  return Number.isFinite(n) ? n : 0;
}

/**
 * Keeps one metric row per publication: the highest checkpoint reached.
 * Summing every row instead would count the same views up to four times.
 */
export function latestMetricPerPublication(metrics: MetricRow[]): Map<string, MetricRow> {
  const latest = new Map<string, MetricRow>();
  for (const m of metrics) {
    const rank = CHECKPOINT_RANK[m.checkpoint] ?? 0;
    const held = latest.get(m.publication_id);
    const heldRank = held ? CHECKPOINT_RANK[held.checkpoint] ?? 0 : -1;
    if (rank > heldRank) latest.set(m.publication_id, m);
  }
  return latest;
}

export function computeOverview(input: OverviewInput): NetworkOverview {
  const { characters, accounts, publications, metrics, revenue } = input;
  const now = input.now ?? Date.now();
  const cutoff7 = now - 7 * 86_400_000;
  const cutoff30 = now - 30 * 86_400_000;

  const kpis: NetworkKpis = { ...EMPTY_KPIS };
  const pubById = new Map(publications.map((p) => [p.id, p]));

  let watchViews = 0;
  let watchSum = 0;
  let completionSum = 0;
  let completionCount = 0;

  const topViewsByCharacter = new Map<string, number>();

  for (const [pubId, m] of latestMetricPerPublication(metrics)) {
    const pub = pubById.get(pubId);
    // A metric row whose publication is missing or unpublished is not counted:
    // it has no date to bucket by and no character to attribute to.
    if (!pub) continue;

    const views = num(m.views);
    kpis.totalViews += views;
    kpis.productClicks += num(m.link_clicks);
    kpis.orders += num(m.orders);

    const publishedAt = pub.published_at ? Date.parse(pub.published_at) : NaN;
    if (!Number.isNaN(publishedAt)) {
      if (publishedAt >= cutoff7) kpis.views7d += views;
      if (publishedAt >= cutoff30) kpis.views30d += views;
    }

    // Watch time is weighted by views — a 2s video with 1M views should not be
    // averaged flat against a 40s video with 100.
    if (views > 0) {
      watchViews += views;
      watchSum += num(m.avg_watch_seconds) * views;
    }
    if (m.completion_rate !== null && m.completion_rate !== undefined) {
      completionSum += num(m.completion_rate);
      completionCount += 1;
    }

    if (pub.character_id) {
      const best = topViewsByCharacter.get(pub.character_id) ?? 0;
      if (views > best) topViewsByCharacter.set(pub.character_id, views);
    }
  }

  kpis.videosPublished = publications.length;
  kpis.avgWatchSeconds = watchViews > 0 ? watchSum / watchViews : 0;
  kpis.avgCompletionRate = completionCount > 0 ? completionSum / completionCount : 0;
  kpis.conversionRate = kpis.productClicks > 0 ? (kpis.orders / kpis.productClicks) * 100 : 0;

  const revenueByCharacter = new Map<string, number>();
  for (const r of revenue) {
    const amount = num(r.gross_amount);
    kpis.totalRevenue += amount;
    if (r.source === "affiliate") kpis.affiliateRevenue += amount;
    if (r.source === "tiktok_shop") kpis.tiktokShopRevenue += amount;
    if (r.source === "brand_deal") kpis.brandRevenue += amount;
    if (r.character_id) {
      revenueByCharacter.set(r.character_id, (revenueByCharacter.get(r.character_id) ?? 0) + amount);
    }
  }
  kpis.revenuePerVideo = kpis.videosPublished > 0 ? kpis.totalRevenue / kpis.videosPublished : 0;

  const publishedByCharacter = new Map<string, number>();
  for (const p of publications) {
    if (!p.character_id) continue;
    publishedByCharacter.set(p.character_id, (publishedByCharacter.get(p.character_id) ?? 0) + 1);
  }

  const summaries: CharacterSummary[] = characters.map((character) => {
    const charAccounts = accounts.filter((a) => a.character_id === character.id);
    const followers = charAccounts.reduce((sum, a) => sum + num(a.followers), 0);
    kpis.totalFollowers += followers;

    const topAccount = [...charAccounts].sort((a, b) => num(b.followers) - num(a.followers))[0];
    const published = publishedByCharacter.get(character.id) ?? 0;
    const live = charAccounts.some((a) => a.is_live);

    return {
      character,
      followers,
      // Needs a follower history snapshot to be real — Phase 8 owns it.
      followerGrowth30d: 0,
      topPlatform: topAccount && num(topAccount.followers) > 0 ? topAccount.platform : null,
      topVideoTitle: null,
      topVideoViews: topViewsByCharacter.get(character.id) ?? 0,
      revenue: revenueByCharacter.get(character.id) ?? 0,
      videosPublished: published,
      status: !character.is_active ? "paused" : published > 0 ? "live" : live ? "launching" : "planned",
    };
  });

  return { isDemo: false, kpis, characters: summaries };
}
