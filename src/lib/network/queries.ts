/**
 * AI CREATOR NETWORK OS — server-side data access.
 *
 * Reads the cn_* tables through the service-role client. When Supabase is not
 * configured, or the network has not been seeded yet, these fall back to
 * clearly-labelled demo data (spec §43) instead of crashing — matching how the
 * existing /admin area degrades.
 *
 * Fetching lives here; the counting lives in `overview.ts`, which is pure and
 * tested.
 *
 * Server-side only: uses the service-role client and must never be imported
 * from a client component.
 */

import { createAdminSupabase } from "@/lib/supabase-admin";

import { DEMO_CHARACTER_LIST, DEMO_OVERVIEW } from "./demo";
import { computeOverview } from "./overview";
import type { AccountRow, MetricRow, PubRow, RevenueRow } from "./overview";
import type { Character, CharacterAsset, NetworkOverview, PlatformAccount } from "./types";

/**
 * Network overview for the dashboard (spec §16).
 * Returns `isDemo: true` whenever the numbers are not real.
 */
export async function getNetworkOverview(): Promise<NetworkOverview> {
  const supabase = createAdminSupabase();

  const [charactersRes, accountsRes, pubsRes, metricsRes, revenueRes] = await Promise.all([
    supabase.from("cn_characters").select("*").order("launch_order", { ascending: true }),
    supabase.from("cn_platform_accounts").select("character_id, platform, followers, is_live"),
    supabase
      .from("cn_publications")
      .select("id, character_id, platform, published_at")
      .not("published_at", "is", null),
    supabase
      .from("cn_publication_metrics")
      .select("publication_id, checkpoint, views, link_clicks, orders, revenue, avg_watch_seconds, completion_rate"),
    supabase.from("cn_revenue").select("source, character_id, gross_amount, occurred_on"),
  ]);

  const characters = (charactersRes.data ?? []) as Character[];

  // No Supabase, or the seed has not run: show the demo network, labelled.
  if (characters.length === 0) return DEMO_OVERVIEW;

  return computeOverview({
    characters,
    accounts: (accountsRes.data ?? []) as AccountRow[],
    publications: (pubsRes.data ?? []) as PubRow[],
    metrics: (metricsRes.data ?? []) as MetricRow[],
    revenue: (revenueRes.data ?? []) as RevenueRow[],
  });
}

export interface CharacterListResult {
  isDemo: boolean;
  characters: Character[];
  accountsByCharacter: Record<string, PlatformAccount[]>;
}

/** Character roster for /network/characters (spec §17). */
export async function getCharacters(): Promise<CharacterListResult> {
  const supabase = createAdminSupabase();

  const [charactersRes, accountsRes] = await Promise.all([
    supabase.from("cn_characters").select("*").order("launch_order", { ascending: true }),
    supabase.from("cn_platform_accounts").select("*"),
  ]);

  const characters = (charactersRes.data ?? []) as Character[];
  if (characters.length === 0) {
    return { isDemo: true, characters: DEMO_CHARACTER_LIST, accountsByCharacter: {} };
  }

  const accountsByCharacter: Record<string, PlatformAccount[]> = {};
  for (const account of (accountsRes.data ?? []) as PlatformAccount[]) {
    (accountsByCharacter[account.character_id] ??= []).push(account);
  }

  return { isDemo: false, characters, accountsByCharacter };
}

export interface CharacterDetail {
  isDemo: boolean;
  character: Character;
  accounts: PlatformAccount[];
  assets: CharacterAsset[];
  partner: Character | null;
}

/** One Character Bible, by slug. Null when the slug does not exist. */
export async function getCharacter(slug: string): Promise<CharacterDetail | null> {
  const supabase = createAdminSupabase();

  const { data } = await supabase.from("cn_characters").select("*").eq("slug", slug).maybeSingle();
  const character = data as Character | null;

  if (!character) {
    const demo = DEMO_CHARACTER_LIST.find((c) => c.slug === slug);
    if (!demo) return null;
    return { isDemo: true, character: demo, accounts: [], assets: [], partner: null };
  }

  const [accountsRes, assetsRes, partnerRes] = await Promise.all([
    supabase.from("cn_platform_accounts").select("*").eq("character_id", character.id),
    supabase
      .from("cn_character_assets")
      .select("*")
      .eq("character_id", character.id)
      .order("created_at", { ascending: true }),
    character.partner_character_id
      ? supabase.from("cn_characters").select("*").eq("id", character.partner_character_id).maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  return {
    isDemo: false,
    character,
    accounts: (accountsRes.data ?? []) as PlatformAccount[],
    assets: (assetsRes.data ?? []) as CharacterAsset[],
    partner: (partnerRes.data ?? null) as Character | null,
  };
}
