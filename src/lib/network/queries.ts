/**
 * AI CREATOR NETWORK OS — server-side data access.
 *
 * Reads the cn_* tables through the service-role client. When Supabase is not
 * configured, or the network has not been seeded yet, the dashboard falls back
 * to clearly-labelled demo data (spec §43) instead of crashing — matching how
 * the existing /admin area degrades.
 *
 * Server-side only: it uses the service-role client and must never be imported
 * from a client component.
 */

import { createAdminSupabase } from "@/lib/supabase-admin";
import { DEMO_OVERVIEW, EMPTY_KPIS } from "./demo";
import type {
  Character, CharacterSummary, NetworkOverview, NetworkKpis, Platform,
} from "./types";

interface AccountRow  { character_id: string; platform: Platform; followers: number | null; is_live: boolean }
interface PubRow      { id: string; character_id: string | null; platform: Platform; published_at: string | null }
interface MetricRow {
  publication_id: string;
  checkpoint: string;
  views: number | null;
  link_clicks: number | null;
  orders: number | null;
  revenue: number | string | null;
  avg_watch_seconds: number | string | null;
  completion_rate: number | string | null;
}
interface RevenueRow  { source: string; character_id: string | null; gross_amount: number | string | null; occurred_on: string }

const CHECKPOINT_RANK: Record<string, number> = { h24: 1, h72: 2, d7: 3, d30: 4 };

function num(v: number | string | null | undefined): number {
  if (v === null || v === undefined) return 0;
  const n = typeof v === "string" ? parseFloat(v) : v;
  return Number.isFinite(n) ? n : 0;
}

function daysAgo(n: number): number {
  return Date.now() - n * 24 * 60 * 60 * 1000;
}

/**
 * Network overview for the dashboard (spec §16).
 * Returns `isDemo: true` whenever the numbers are not real.
 */
export async function getNetworkOverview(): Promise<NetworkOverview> {
  const supabase = createAdminSupabase();

  const [charactersRes, accountsRes, pubsRes, metricsRes, revenueRes] = await Promise.all([
    supabase.from("cn_characters").select("*").order("launch_order", { ascending: true }),
    supabase.from("cn_platform_accounts").select("character_id, platform, followers, is_live"),
    supabase.from("cn_publications").select("id, character_id, platform, published_at").not("published_at", "is", null),
    supabase.from("cn_publication_metrics").select(
      "publication_id, checkpoint, views, link_clicks, orders, revenue, avg_watch_seconds, completion_rate",
    ),
    supabase.from("cn_revenue").select("source, character_id, gross_amount, occurred_on"),
  ]);

  const characters = (charactersRes.data ?? []) as Character[];

  // No Supabase, or the seed has not run: show the demo network instead of a blank screen.
  if (characters.length === 0) return DEMO_OVERVIEW;

  const accounts = (accountsRes.data ?? []) as AccountRow[];
  const publications = (pubsRes.data ?? []) as PubRow[];
  const metrics = (metricsRes.data ?? []) as MetricRow[];
  const revenue = (revenueRes.data ?? []) as RevenueRow[];

  // Keep only the latest checkpoint per publication so views are not double-counted.
  const latestByPublication = new Map<string, MetricRow>();
  for (const m of metrics) {
    const current = latestByPublication.get(m.publication_id);
    const rank = CHECKPOINT_RANK[m.checkpoint] ?? 0;
    const currentRank = current ? CHECKPOINT_RANK[current.checkpoint] ?? 0 : -1;
    if (rank > currentRank) latestByPublication.set(m.publication_id, m);
  }

  const pubById = new Map(publications.map((p) => [p.id, p]));
  const cutoff7 = daysAgo(7);
  const cutoff30 = daysAgo(30);

  const kpis: NetworkKpis = { ...EMPTY_KPIS };
  let watchWeightedViews = 0;
  let watchSum = 0;
  let completionSum = 0;
  let completionCount = 0;

  const viewsByCharacter = new Map<string, number>();
  const topVideoByCharacter = new Map<string, { views: number; publicationId: string }>();

  for (const [pubId, m] of latestByPublication) {
    const pub = pubById.get(pubId);
    if (!pub) continue;

    const views = num(m.views);
    kpis.totalViews += views;
    kpis.productClicks += num(m.link_clicks);
    kpis.orders += num(m.orders);

    const publishedAt = pub.published_at ? Date.parse(pub.published_at) : 0;
    if (publishedAt >= cutoff7) kpis.views7d += views;
    if (publishedAt >= cutoff30) kpis.views30d += views;

    if (views > 0) {
      watchWeightedViews += views;
      watchSum += num(m.avg_watch_seconds) * views;
    }
    if (m.completion_rate !== null) {
      completionSum += num(m.completion_rate);
      completionCount += 1;
    }

    if (pub.character_id) {
      viewsByCharacter.set(pub.character_id, (viewsByCharacter.get(pub.character_id) ?? 0) + views);
      const top = topVideoByCharacter.get(pub.character_id);
      if (!top || views > top.views) {
        topVideoByCharacter.set(pub.character_id, { views, publicationId: pubId });
      }
    }
  }

  kpis.videosPublished = publications.length;
  kpis.avgWatchSeconds = watchWeightedViews > 0 ? watchSum / watchWeightedViews : 0;
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
      // Growth needs a metric history table snapshot — Phase 8 fills this in.
      followerGrowth30d: 0,
      topPlatform: topAccount && num(topAccount.followers) > 0 ? topAccount.platform : null,
      topVideoTitle: null,
      topVideoViews: topVideoByCharacter.get(character.id)?.views ?? 0,
      revenue: revenueByCharacter.get(character.id) ?? 0,
      videosPublished: published,
      status: !character.is_active ? "paused" : published > 0 ? "live" : live ? "launching" : "planned",
    };
  });

  return { isDemo: false, kpis, characters: summaries };
}
