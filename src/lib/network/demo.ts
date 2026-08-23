/**
 * DEMO DATA — spec §43.
 * Every value here is fabricated for interface development. It is always
 * returned behind `isDemo: true` and the UI must label it DEMO. Never present
 * these followers, views, revenue or sales as real metrics.
 */

import type { Character, CharacterSummary, NetworkOverview } from "./types";

function demoCharacter(
  slug: string,
  name: string,
  ageRange: string,
  pillars: string[],
  categories: string[],
  order: number,
): Character {
  return {
    id: `demo-${slug}`,
    slug,
    name,
    age_range: ageRange,
    gender_presentation: null,
    market: "United Kingdom",
    language: "en-GB",
    accent: "British English",
    bio: null,
    personality: null,
    tone: null,
    content_pillars: pillars,
    commercial_categories: categories,
    visual_description: null,
    wardrobe: null,
    voice_provider: null,
    voice_id: null,
    master_image_prompt: null,
    master_video_prompt: null,
    negative_prompt: null,
    backstory: null,
    brand_rules: null,
    safety_rules: null,
    is_active: true,
    launch_order: order,
    partner_character_id: null,
  };
}

const DEMO_CHARACTERS: CharacterSummary[] = [
  {
    character: demoCharacter("maya-hart", "Maya Hart", "26-30",
      ["beauty", "fashion", "lifestyle", "tiktok shop"],
      ["beauty", "fashion", "home"], 1),
    followers: 18420,
    followerGrowth30d: 12.4,
    topPlatform: "tiktok",
    topVideoTitle: "The £9 hair tool I did not expect to work",
    topVideoViews: 412000,
    revenue: 1840.5,
    videosPublished: 42,
    status: "live",
  },
  {
    character: demoCharacter("leo-grant", "Leo Grant", "29-35",
      ["technology", "gadgets", "cars", "tools"],
      ["tech", "automotive", "tools"], 2),
    followers: 6120,
    followerGrowth30d: 8.1,
    topPlatform: "tiktok",
    topVideoTitle: "Three EDC tools that actually earn pocket space",
    topVideoViews: 96000,
    revenue: 410.0,
    videosPublished: 16,
    status: "launching",
  },
  {
    character: demoCharacter("arthur-bennett", "Arthur Bennett", "62-68",
      ["diy", "tools", "home", "life advice"],
      ["home", "diy", "tools"], 3),
    followers: 0,
    followerGrowth30d: 0,
    topPlatform: null,
    topVideoTitle: null,
    topVideoViews: 0,
    revenue: 0,
    videosPublished: 0,
    status: "planned",
  },
  {
    character: demoCharacter("rose-bennett", "Rose Bennett", "58-65",
      ["home", "kitchen", "mature beauty", "travel"],
      ["home", "kitchen", "mature beauty"], 4),
    followers: 0,
    followerGrowth30d: 0,
    topPlatform: null,
    topVideoTitle: null,
    topVideoViews: 0,
    revenue: 0,
    videosPublished: 0,
    status: "planned",
  },
];

export const DEMO_OVERVIEW: NetworkOverview = {
  isDemo: true,
  kpis: {
    totalFollowers: 24540,
    totalViews: 1_284_000,
    views7d: 218_400,
    views30d: 742_900,
    videosPublished: 58,
    totalRevenue: 2250.5,
    affiliateRevenue: 612.0,
    tiktokShopRevenue: 1338.5,
    brandRevenue: 300.0,
    revenuePerVideo: 38.8,
    avgWatchSeconds: 11.4,
    avgCompletionRate: 38.2,
    productClicks: 8940,
    orders: 214,
    conversionRate: 2.39,
  },
  characters: DEMO_CHARACTERS,
};

/** An empty-but-real overview: Supabase is wired, the network just has no data yet. */
export const EMPTY_KPIS: NetworkOverview["kpis"] = {
  totalFollowers: 0,
  totalViews: 0,
  views7d: 0,
  views30d: 0,
  videosPublished: 0,
  totalRevenue: 0,
  affiliateRevenue: 0,
  tiktokShopRevenue: 0,
  brandRevenue: 0,
  revenuePerVideo: 0,
  avgWatchSeconds: 0,
  avgCompletionRate: 0,
  productClicks: 0,
  orders: 0,
  conversionRate: 0,
};
