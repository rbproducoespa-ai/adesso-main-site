/**
 * DEMO DATA — spec §43.
 * Every value here is fabricated for interface development. It is always
 * returned behind `isDemo: true` and the UI must label it DEMO. Never present
 * these followers, views, revenue or sales as real metrics.
 *
 * The character text mirrors the seed in
 * supabase/migrations/0003_network_os_seed.sql so the demo and the real network
 * look like the same product.
 */

import type { Character, CharacterSummary, NetworkOverview } from "./types";

type DemoSeed = Pick<
  Character,
  "slug" | "name" | "age_range" | "gender_presentation" | "bio" | "personality" | "tone"
  | "content_pillars" | "commercial_categories" | "visual_description" | "wardrobe"
  | "backstory" | "brand_rules" | "safety_rules" | "launch_order"
>;

function demoCharacter(seed: DemoSeed): Character {
  return {
    id: `demo-${seed.slug}`,
    market: "United Kingdom",
    language: "en-GB",
    accent: "British English",
    vocabulary: [],
    catchphrases: [],
    interests: [],
    things_character_says: [],
    things_character_never_says: [],
    face_reference: null,
    body_description: null,
    hair: null,
    eyes: null,
    voice_provider: null,
    voice_id: null,
    master_image_prompt: null,
    master_video_prompt: null,
    negative_prompt:
      "deformed hands, extra fingers, distorted face, watermark, logo, text artefacts, other people's likeness",
    is_active: true,
    partner_character_id: null,
    ...seed,
  };
}

export const DEMO_CHARACTER_LIST: Character[] = [
  demoCharacter({
    slug: "maya-hart",
    name: "Maya Hart",
    age_range: "26-30",
    gender_presentation: "female",
    bio: "Primary female creator and first laboratory for the content engine.",
    personality: "Friendly, attractive, curious, fun, aspirational, relatable, confident without arrogance.",
    tone: "Warm, upbeat, conversational.",
    content_pillars: ["beauty", "fashion", "lifestyle", "tiktok shop", "viral products", "home finds", "travel"],
    commercial_categories: ["beauty", "fashion", "home", "female products", "lifestyle products"],
    visual_description: "Late-twenties British woman, natural styling, contemporary urban UK settings.",
    wardrobe: "Contemporary high-street UK fashion, seasonal, colour-coordinated per shoot.",
    backstory: "Fictional character. Lives in a UK city, shares finds, routines and honest product opinions.",
    brand_rules: "Never claims to be a real person. Discloses AI generation where a platform requires it.",
    safety_rules: "No medical, financial or legal advice. No content aimed at minors.",
    launch_order: 1,
  }),
  demoCharacter({
    slug: "leo-grant",
    name: "Leo Grant",
    age_range: "29-35",
    gender_presentation: "male",
    bio: "Male UK creator covering technology, gadgets and men's lifestyle.",
    personality: "Modern, friendly, confident, practical, funny, tech-aware.",
    tone: "Direct, dry humour, hands-on.",
    content_pillars: ["technology", "gadgets", "cars", "motorcycles", "tools", "edc", "product testing"],
    commercial_categories: ["tech", "automotive", "tools", "mens products", "useful gadgets"],
    visual_description: "Early-thirties British man, casual modern styling, workshop / city / garage settings.",
    wardrobe: "Casual technical wear, jackets, plain tees, workwear where relevant.",
    backstory: "Fictional character. Tests gadgets and tools and reports what actually works.",
    brand_rules: "No fabricated benchmark numbers presented as measured facts.",
    safety_rules: "No unsafe modification, electrical or automotive instructions presented as professional guidance.",
    launch_order: 2,
  }),
  demoCharacter({
    slug: "arthur-bennett",
    name: "Arthur Bennett",
    age_range: "62-68",
    gender_presentation: "male",
    bio: "Modern British grandad. DIY, tools and practical life advice.",
    personality: "Experienced, witty, opinionated, warm, practical.",
    tone: "Wry, plainspoken, generous.",
    content_pillars: ["diy", "tools", "home", "gadgets", "life advice", "generational humour"],
    commercial_categories: ["home", "diy", "tools", "practical gadgets", "senior-friendly products"],
    visual_description: "British man in his sixties, warm and characterful, home / garden / workshop settings.",
    wardrobe: "Shirts, knitwear, practical outdoor and workshop clothing.",
    backstory: "Fictional character. Married to Rose Bennett. Decades of practical experience, sceptical of hype.",
    brand_rules: "No age-based stereotyping used as the joke target.",
    safety_rules: "No medical advice. No unsafe DIY presented as professional guidance.",
    launch_order: 3,
  }),
  demoCharacter({
    slug: "rose-bennett",
    name: "Rose Bennett",
    age_range: "58-65",
    gender_presentation: "female",
    bio: "Elegant, warm and funny. Home, kitchen, mature beauty and travel.",
    personality: "Elegant, warm, intelligent, funny, confident, relatable.",
    tone: "Gracious, playful, reassuring.",
    content_pillars: ["home", "kitchen", "mature beauty", "lifestyle", "travel", "relationships"],
    commercial_categories: ["home", "kitchen", "mature beauty", "lifestyle", "travel"],
    visual_description: "British woman in her late fifties to sixties, elegant natural styling, kitchen / home settings.",
    wardrobe: "Elegant everyday British styling, knitwear, blouses, travel outfits.",
    backstory: "Fictional character. Married to Arthur Bennett. Shares home, kitchen and travel life with dry warmth.",
    brand_rules: "No unrealistic anti-ageing claims.",
    safety_rules: "No medical or cosmetic-procedure claims. No health outcomes attributed to products.",
    launch_order: 4,
  }),
];

// Arthur and Rose stay two entities, linked for couple formats (spec §8).
const arthur = DEMO_CHARACTER_LIST[2];
const rose = DEMO_CHARACTER_LIST[3];
arthur.partner_character_id = rose.id;
rose.partner_character_id = arthur.id;

const DEMO_STATS: Record<string, Omit<CharacterSummary, "character">> = {
  "maya-hart": {
    followers: 18420, followerGrowth30d: 12.4, topPlatform: "tiktok",
    topVideoTitle: "The £9 hair tool I did not expect to work",
    topVideoViews: 412000, revenue: 1840.5, videosPublished: 42, status: "live",
  },
  "leo-grant": {
    followers: 6120, followerGrowth30d: 8.1, topPlatform: "tiktok",
    topVideoTitle: "Three EDC tools that actually earn pocket space",
    topVideoViews: 96000, revenue: 410, videosPublished: 16, status: "launching",
  },
  "arthur-bennett": {
    followers: 0, followerGrowth30d: 0, topPlatform: null, topVideoTitle: null,
    topVideoViews: 0, revenue: 0, videosPublished: 0, status: "planned",
  },
  "rose-bennett": {
    followers: 0, followerGrowth30d: 0, topPlatform: null, topVideoTitle: null,
    topVideoViews: 0, revenue: 0, videosPublished: 0, status: "planned",
  },
};

export const DEMO_OVERVIEW: NetworkOverview = {
  isDemo: true,
  kpis: {
    totalFollowers: 24540,
    totalViews: 1_284_000,
    views7d: 218_400,
    views30d: 742_900,
    videosPublished: 58,
    totalRevenue: 2250.5,
    affiliateRevenue: 612,
    tiktokShopRevenue: 1338.5,
    brandRevenue: 300,
    revenuePerVideo: 38.8,
    avgWatchSeconds: 11.4,
    avgCompletionRate: 38.2,
    productClicks: 8940,
    orders: 214,
    conversionRate: 2.39,
  },
  characters: DEMO_CHARACTER_LIST.map((character) => ({
    character,
    ...DEMO_STATS[character.slug],
  })),
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
