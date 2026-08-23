/**
 * AI CREATOR NETWORK OS — domain types.
 * Mirrors supabase/migrations/0001_network_os_schema.sql (cn_* tables).
 */

export type Platform = "tiktok" | "instagram" | "youtube" | "other";

export type PipelineStatus =
  | "idea" | "reference" | "analysed" | "script" | "approved" | "assets"
  | "generating" | "editing" | "ready" | "scheduled" | "published"
  | "measuring" | "winner" | "loser" | "archived";

export type ContentBucket = "growth" | "commerce" | "experimental";

export type HookType =
  | "curiosity" | "contrarian" | "problem" | "confession" | "story" | "shock"
  | "comparison" | "question" | "result_first" | "negative" | "authority" | "challenge";

export type ScriptFormat =
  | "tiktok_short" | "tiktok_long" | "instagram_reel" | "youtube_short" | "youtube_long";

export type AssetKind =
  | "character_image" | "reference_image" | "generated_video" | "voice" | "music"
  | "broll" | "thumbnail" | "logo" | "product_image";

export type PromptKind =
  | "character" | "image" | "video" | "voice" | "script" | "hook" | "analysis"
  | "product" | "thumbnail" | "long_form" | "short_form";

export type RiskLevel = "low" | "medium" | "high";

export type Checkpoint = "h24" | "h72" | "d7" | "d30";

export type RevenueSource =
  | "tiktok_shop" | "affiliate" | "youtube" | "instagram" | "brand_deal" | "ugc" | "other";

export type AnalysisStatus = "pending" | "analysing" | "analysed" | "rejected";

/** Character Bible — spec §17. */
export interface Character {
  id: string;
  slug: string;
  name: string;
  age_range: string | null;
  gender_presentation: string | null;
  market: string | null;
  language: string | null;
  accent: string | null;
  bio: string | null;
  personality: string | null;
  tone: string | null;
  content_pillars: string[];
  commercial_categories: string[];
  visual_description: string | null;
  wardrobe: string | null;
  voice_provider: string | null;
  voice_id: string | null;
  master_image_prompt: string | null;
  master_video_prompt: string | null;
  negative_prompt: string | null;
  backstory: string | null;
  brand_rules: string | null;
  safety_rules: string | null;
  is_active: boolean;
  launch_order: number;
  partner_character_id: string | null;
}

export interface PlatformAccount {
  id: string;
  character_id: string;
  platform: Platform;
  handle: string | null;
  followers: number;
  is_live: boolean;
}

/** The five questions the product answers daily — spec §46, rendered on the dashboard. */
export interface NetworkKpis {
  totalFollowers: number;
  totalViews: number;
  views7d: number;
  views30d: number;
  videosPublished: number;
  totalRevenue: number;
  affiliateRevenue: number;
  tiktokShopRevenue: number;
  brandRevenue: number;
  revenuePerVideo: number;
  avgWatchSeconds: number;
  avgCompletionRate: number;
  productClicks: number;
  orders: number;
  conversionRate: number;
}

export interface CharacterSummary {
  character: Character;
  followers: number;
  followerGrowth30d: number;
  topPlatform: Platform | null;
  topVideoTitle: string | null;
  topVideoViews: number;
  revenue: number;
  videosPublished: number;
  status: "planned" | "launching" | "live" | "paused";
}

/** Every dashboard payload declares whether it is real or demo — spec §43. */
export interface NetworkOverview {
  isDemo: boolean;
  kpis: NetworkKpis;
  characters: CharacterSummary[];
}
