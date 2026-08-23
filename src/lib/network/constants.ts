/**
 * AI CREATOR NETWORK OS — shared vocabulary and navigation.
 * Single source of truth for the labels the UI renders, so every module speaks
 * the same language as the database enums.
 */

import type {
  ContentBucket, HookType, PipelineStatus, Platform, RevenueSource, ScriptFormat,
} from "./types";

/** Build phases — spec §44. `phase` drives the "not built yet" placeholders. */
export const BUILD_PHASES = [
  { n: 1,  name: "Foundation, Auth, Database, Navigation, Design System" },
  { n: 2,  name: "Characters, Character Bible, Assets, Consistency Engine" },
  { n: 3,  name: "Discover, References, Viral Mirror Engine, Content DNA" },
  { n: 4,  name: "Hooks, Scripts, Original Version Generator" },
  { n: 5,  name: "Production Pipeline, Calendar, Asset Library" },
  { n: 6,  name: "Product Intelligence, Character Matching" },
  { n: 7,  name: "Experiments, Metrics, Winner Engine" },
  { n: 8,  name: "Analytics, Revenue, Monetisation Tracker" },
  { n: 9,  name: "Compliance, Originality, AI Disclosure" },
  { n: 10, name: "AI Providers and External Integrations" },
] as const;

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  /** Phase that delivers this screen; anything above CURRENT_PHASE renders a roadmap stub. */
  phase: number;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const CURRENT_PHASE = 1;

/** Main navigation — spec §15, grouped by the loop it belongs to. */
export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/network",            label: "Dashboard",   icon: "⊞", phase: 1 },
      { href: "/network/characters", label: "Characters",  icon: "◉", phase: 2 },
    ],
  },
  {
    label: "Discover",
    items: [
      { href: "/network/discover",    label: "Discover",    icon: "⌖", phase: 3 },
      { href: "/network/inspiration", label: "Inspiration", icon: "✦", phase: 3 },
    ],
  },
  {
    label: "Create",
    items: [
      { href: "/network/content-lab", label: "Content Lab", icon: "⚗", phase: 4 },
      { href: "/network/scripts",     label: "Scripts",     icon: "≡", phase: 4 },
      { href: "/network/productions", label: "Productions", icon: "▣", phase: 5 },
      { href: "/network/calendar",    label: "Calendar",    icon: "▤", phase: 5 },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/network/products", label: "Products", icon: "⬡", phase: 6 },
    ],
  },
  {
    label: "Measure",
    items: [
      { href: "/network/experiments", label: "Experiments", icon: "⚖", phase: 7 },
      { href: "/network/analytics",   label: "Analytics",   icon: "↗", phase: 8 },
      { href: "/network/revenue",     label: "Revenue",     icon: "£", phase: 8 },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/network/ai-studio",      label: "AI Studio",      icon: "◐", phase: 10 },
      { href: "/network/prompt-library", label: "Prompt Library", icon: "❯", phase: 4 },
      { href: "/network/assets",         label: "Assets",         icon: "◈", phase: 5 },
      { href: "/network/settings",       label: "Settings",       icon: "⚙", phase: 1 },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);

/** Content pipeline — spec §27, in order. */
export const PIPELINE_ORDER: PipelineStatus[] = [
  "idea", "reference", "analysed", "script", "approved", "assets",
  "generating", "editing", "ready", "scheduled", "published",
  "measuring", "winner", "loser", "archived",
];

export const PIPELINE_LABEL: Record<PipelineStatus, string> = {
  idea: "Idea", reference: "Reference", analysed: "Analysed", script: "Script",
  approved: "Approved", assets: "Assets", generating: "Generating",
  editing: "Editing", ready: "Ready", scheduled: "Scheduled",
  published: "Published", measuring: "Measuring", winner: "Winner",
  loser: "Loser", archived: "Archived",
};

/** Hook taxonomy — spec §24. */
export const HOOK_TYPES: { value: HookType; label: string }[] = [
  { value: "curiosity",    label: "Curiosity" },
  { value: "contrarian",   label: "Contrarian" },
  { value: "problem",      label: "Problem" },
  { value: "confession",   label: "Confession" },
  { value: "story",        label: "Story" },
  { value: "shock",        label: "Shock" },
  { value: "comparison",   label: "Comparison" },
  { value: "question",     label: "Question" },
  { value: "result_first", label: "Result First" },
  { value: "negative",     label: "Negative Hook" },
  { value: "authority",    label: "Authority" },
  { value: "challenge",    label: "Challenge" },
];

export const SCRIPT_FORMATS: { value: ScriptFormat; label: string; target: string }[] = [
  { value: "tiktok_short",   label: "TikTok Short",     target: "15–30s" },
  { value: "tiktok_long",    label: "TikTok 60s+",      target: "60–180s" },
  { value: "instagram_reel", label: "Instagram Reel",   target: "15–60s" },
  { value: "youtube_short",  label: "YouTube Short",    target: "15–60s" },
  { value: "youtube_long",   label: "YouTube Long Form", target: "6–12min" },
];

/**
 * Default content portfolio — spec §11. Configurable: the OS stores the live
 * split in settings and rebalances it from performance data.
 */
export const DEFAULT_PORTFOLIO_MIX: Record<ContentBucket, number> = {
  growth: 60,
  commerce: 25,
  experimental: 15,
};

export const BUCKET_LABEL: Record<ContentBucket, string> = {
  growth: "Growth",
  commerce: "Commerce",
  experimental: "Experimental",
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  tiktok: "TikTok",
  instagram: "Instagram",
  youtube: "YouTube",
  other: "Other",
};

export const REVENUE_SOURCE_LABEL: Record<RevenueSource, string> = {
  tiktok_shop: "TikTok Shop",
  affiliate: "Affiliate",
  youtube: "YouTube",
  instagram: "Instagram",
  brand_deal: "Brand Deals",
  ugc: "UGC",
  other: "Other",
};

/** Experiment measurement checkpoints — spec §31. */
export const CHECKPOINTS = [
  { value: "h24", label: "24h" },
  { value: "h72", label: "72h" },
  { value: "d7",  label: "7 days" },
  { value: "d30", label: "30 days" },
] as const;

/** 90-day launch plan — spec §10. */
export const LAUNCH_PLAN = [
  { window: "Days 1–14",  focus: "Maya only",        note: "~3 experiments/day, ~42 experiments total" },
  { window: "Days 15–30", focus: "Maya + Leo",       note: "Transfer hook learnings, keep Leo's niche" },
  { window: "Days 31–45", focus: "Add Arthur + Rose", note: "Individual and couple formats" },
  { window: "Days 46–90", focus: "Optimise network", note: "Scale winners, build product intelligence" },
] as const;

/** The five questions — spec §46. */
export const DAILY_QUESTIONS = [
  "What content should we create?",
  "Which character should create it?",
  "Why should it perform?",
  "Did it perform?",
  "How can we turn the result into revenue?",
] as const;

/**
 * What each module will contain, taken from the specification. Phase 1 renders
 * this on the not-yet-built screens so the roadmap is visible inside the product
 * instead of only in ROADMAP.md.
 */
export const MODULE_SCOPE: Record<string, { spec: string; scope: string[] }> = {
  "/network/characters": {
    spec: "§17, §18",
    scope: [
      "Character Bible with the full field set per creator",
      "Reference assets: face, full body, side, lifestyle, wardrobe, voice",
      "Consistency engine that composes profile + scene + action + camera + emotion",
      "Couple formats for Arthur + Rose without merging the two entities",
    ],
  },
  "/network/discover": {
    spec: "§19",
    scope: [
      "Register TikTok, Instagram, YouTube and manual references",
      "Store source, creator, date, views, likes, comments, shares, product, category",
      "Analysis status and risk flags per reference",
    ],
  },
  "/network/inspiration": {
    spec: "§20, §21",
    scope: [
      "Viral Mirror Engine: why a format works, never a clone of the video",
      "Content DNA fingerprint: hook type, emotion, pacing, shot count, CTA type",
      "Virality and sales scoring with originality requirements",
    ],
  },
  "/network/content-lab": {
    spec: "§22, §23, §24",
    scope: [
      "Character matching scores across all four creators with manual override",
      "Original Version Generator: three materially original concepts per reference",
      "Hook Lab: 10+ hooks per concept, classified by hook type",
    ],
  },
  "/network/scripts": {
    spec: "§25, §26",
    scope: [
      "Platform scripts: TikTok short and long, Reel, YouTube Short, YouTube long form",
      "Hook, scene, dialogue, b-roll, overlay, camera, sound, CTA, duration",
      "Image, video, voice, b-roll and thumbnail prompts inheriting the character profile",
    ],
  },
  "/network/productions": {
    spec: "§27",
    scope: [
      "Kanban and table views over the full pipeline",
      "Idea → analysed → script → approved → assets → ready → published → winner/loser",
      "Compliance gate blocking READY while critical warnings are unresolved",
    ],
  },
  "/network/calendar": {
    spec: "§28",
    scope: [
      "Daily, weekly and monthly views",
      "Filter by character, platform, status and content type",
      "Drag and drop scheduling with planned volume per character",
    ],
  },
  "/network/products": {
    spec: "§29, §30",
    scope: [
      "Product intelligence: price, commission, rating, sales estimate, trend score",
      "Product × character scoring with rationale",
      "Clicks, orders, revenue, conversion rate and revenue per video",
    ],
  },
  "/network/experiments": {
    spec: "§31, §32, §33",
    scope: [
      "Variant tracking (Hook A / B / C) with 24h, 72h, 7d and 30d checkpoints",
      "Winner Engine: configurable thresholds against account baselines",
      "Loser analysis with a recommended next experiment",
    ],
  },
  "/network/analytics": {
    spec: "§34",
    scope: [
      "Slice by network, character, platform, format, hook, product, category and date",
      "Best hook types, video lengths, posting periods, categories and CTAs",
    ],
  },
  "/network/revenue": {
    spec: "§35, §36",
    scope: [
      "Revenue by source, character, product and video",
      "Revenue per 1,000 views and per character",
      "Monetisation tracker with editable programme records and last_verified_date",
    ],
  },
  "/network/ai-studio": {
    spec: "§14, §26",
    scope: [
      "Provider registry for OpenAI, Anthropic, ElevenLabs, HeyGen, Kling, Runway",
      "Generation runs against the character consistency profile",
      "No vendor lock-in: every call goes through the provider interface",
    ],
  },
  "/network/prompt-library": {
    spec: "§41",
    scope: [
      "Versioned prompts by kind with {{variable}} support",
      "Character-scoped overrides on top of system prompts",
    ],
  },
  "/network/assets": {
    spec: "§40",
    scope: [
      "Character images, generated video, voice, music, b-roll, thumbnails, product images",
      "Tags, metadata and links back to the production that used them",
    ],
  },
};
