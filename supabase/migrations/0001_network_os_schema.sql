-- ============================================================================
-- AI CREATOR NETWORK OS — Phase 1 — Core relational schema
-- ----------------------------------------------------------------------------
-- All objects are prefixed with `cn_` (creator network) so the OS can live
-- inside the same Supabase project as the existing adesso site without
-- colliding with its tables. `references` is a reserved SQL keyword, so the
-- prefix also removes the need to quote it everywhere.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ── Enums ───────────────────────────────────────────────────────────────────

create type cn_role as enum ('owner', 'admin', 'editor', 'viewer');

create type cn_platform as enum ('tiktok', 'instagram', 'youtube', 'other');

create type cn_pipeline_status as enum (
  'idea', 'reference', 'analysed', 'script', 'approved', 'assets',
  'generating', 'editing', 'ready', 'scheduled', 'published',
  'measuring', 'winner', 'loser', 'archived'
);

create type cn_content_bucket as enum ('growth', 'commerce', 'experimental');

create type cn_hook_type as enum (
  'curiosity', 'contrarian', 'problem', 'confession', 'story', 'shock',
  'comparison', 'question', 'result_first', 'negative', 'authority', 'challenge'
);

create type cn_script_format as enum (
  'tiktok_short', 'tiktok_long', 'instagram_reel', 'youtube_short', 'youtube_long'
);

create type cn_asset_kind as enum (
  'character_image', 'reference_image', 'generated_video', 'voice', 'music',
  'broll', 'thumbnail', 'logo', 'product_image'
);

create type cn_prompt_kind as enum (
  'character', 'image', 'video', 'voice', 'script', 'hook', 'analysis',
  'product', 'thumbnail', 'long_form', 'short_form'
);

create type cn_risk_level as enum ('low', 'medium', 'high');

create type cn_checkpoint as enum ('h24', 'h72', 'd7', 'd30');

create type cn_revenue_source as enum (
  'tiktok_shop', 'affiliate', 'youtube', 'instagram', 'brand_deal', 'ugc', 'other'
);

create type cn_analysis_status as enum ('pending', 'analysing', 'analysed', 'rejected');

-- ── Shared trigger ──────────────────────────────────────────────────────────

create or replace function cn_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Profiles (maps auth.users into the OS) ──────────────────────────────────

create table cn_profiles (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  role        cn_role not null default 'viewer',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Characters (Character Bible, spec §17) ──────────────────────────────────

create table cn_characters (
  id                       uuid primary key default gen_random_uuid(),
  name                     text not null,
  slug                     text not null unique,
  age_range                text,
  gender_presentation      text,
  market                   text,
  language                 text,
  accent                   text,
  bio                      text,
  personality              text,
  tone                     text,
  vocabulary               text[]      not null default '{}',
  catchphrases             text[]      not null default '{}',
  interests                text[]      not null default '{}',
  content_pillars          text[]      not null default '{}',
  commercial_categories    text[]      not null default '{}',
  visual_description       text,
  face_reference           text,
  body_description         text,
  hair                     text,
  eyes                     text,
  wardrobe                 text,
  voice_provider           text,
  voice_id                 text,
  master_image_prompt      text,
  master_video_prompt      text,
  negative_prompt          text,
  things_character_says    text[]      not null default '{}',
  things_character_never_says text[]   not null default '{}',
  backstory                text,
  brand_rules              text,
  safety_rules             text,
  is_active                boolean     not null default true,
  launch_order             int         not null default 0,
  partner_character_id     uuid        references cn_characters(id) on delete set null,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ── Character reference assets (consistency engine, spec §18) ───────────────

create table cn_character_assets (
  id            uuid primary key default gen_random_uuid(),
  character_id  uuid not null references cn_characters(id) on delete cascade,
  kind          text not null,          -- face | full_body | side | lifestyle | wardrobe | voice
  storage_path  text,
  url           text,
  is_primary    boolean not null default false,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ── Platform accounts (spec §9) ─────────────────────────────────────────────

create table cn_platform_accounts (
  id            uuid primary key default gen_random_uuid(),
  character_id  uuid not null references cn_characters(id) on delete cascade,
  platform      cn_platform not null,
  handle        text,
  profile_url   text,
  followers     bigint not null default 0,
  is_live       boolean not null default false,
  opened_at     date,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (character_id, platform)
);

-- ── Discover: external references (spec §19) ────────────────────────────────

create table cn_references (
  id               uuid primary key default gen_random_uuid(),
  source_url       text not null,
  platform         cn_platform not null default 'other',
  source_name      text,
  discovered_at    timestamptz not null default now(),
  views            bigint,
  likes            bigint,
  comments         bigint,
  shares           bigint,
  description      text,
  product_name     text,
  category         text,
  notes            text,
  analysis_status  cn_analysis_status not null default 'pending',
  risk_flags       text[] not null default '{}',
  created_by       uuid references auth.users(id) on delete set null,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── Viral Mirror Engine output + Content DNA (spec §20, §21) ────────────────

create table cn_content_dna (
  id                        uuid primary key default gen_random_uuid(),
  reference_id              uuid references cn_references(id) on delete cascade,
  -- Viral Mirror Engine (§20): why the mechanism works
  hook                      text,
  hook_type                 cn_hook_type,
  core_idea                 text,
  problem                   text,
  curiosity_gap             text,
  story_structure           text,
  visual_structure          text,
  shot_sequence             jsonb not null default '[]'::jsonb,
  pacing                    text,
  editing_rhythm            text,
  emotion                   text,
  product_integration       text,
  cta                       text,
  target_audience           text,
  virality_drivers          text[] not null default '{}',
  commercial_intent         text,
  potential_risks           text[] not null default '{}',
  -- Content DNA (§21): the structured, reusable fingerprint
  category                  text,
  subcategory               text,
  story_pattern             text,
  content_format            text,
  camera_style              text,
  editing_style             text,
  duration_seconds          int,
  shot_count                int,
  text_density              text,
  product_type              text,
  cta_type                  text,
  virality_score            numeric(5,2),
  sales_score               numeric(5,2),
  originality_requirements  text,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

-- ── Ideas (original concepts generated from a reference, spec §23) ──────────

create table cn_ideas (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  reference_id      uuid references cn_references(id) on delete set null,
  content_dna_id    uuid references cn_content_dna(id) on delete set null,
  character_id      uuid references cn_characters(id) on delete set null,
  bucket            cn_content_bucket not null default 'growth',
  status            cn_pipeline_status not null default 'idea',
  concept           text,
  original_hook     text,
  original_story    text,
  scene_structure   text,
  new_cta           text,
  visual_plan       text,
  match_scores      jsonb not null default '{}'::jsonb,  -- character_id -> score (§22)
  match_override    boolean not null default false,
  product_id        uuid,
  created_by        uuid references auth.users(id) on delete set null,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ── Hook Lab (spec §24) ─────────────────────────────────────────────────────

create table cn_hooks (
  id           uuid primary key default gen_random_uuid(),
  idea_id      uuid references cn_ideas(id) on delete cascade,
  character_id uuid references cn_characters(id) on delete set null,
  text         text not null,
  hook_type    cn_hook_type not null,
  score        numeric(5,2),
  is_selected  boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Script Lab (spec §25) ───────────────────────────────────────────────────

create table cn_scripts (
  id                 uuid primary key default gen_random_uuid(),
  idea_id            uuid references cn_ideas(id) on delete cascade,
  character_id       uuid references cn_characters(id) on delete set null,
  format             cn_script_format not null,
  hook               text,
  scenes             jsonb not null default '[]'::jsonb,
  dialogue           text,
  broll              text,
  text_overlay       text,
  camera_notes       text,
  sound_notes        text,
  cta                text,
  estimated_seconds  int,
  version            int not null default 1,
  is_approved        boolean not null default false,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ── Productions: one unit of content moving through the pipeline (§27) ──────

create table cn_productions (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  idea_id        uuid references cn_ideas(id) on delete set null,
  script_id      uuid references cn_scripts(id) on delete set null,
  character_id   uuid references cn_characters(id) on delete set null,
  platform       cn_platform,
  bucket         cn_content_bucket not null default 'growth',
  status         cn_pipeline_status not null default 'script',
  scheduled_for  timestamptz,
  published_at   timestamptz,
  image_prompt   text,
  video_prompt   text,
  voice_prompt   text,
  broll_prompt   text,
  thumbnail_prompt text,
  -- Originality score (§39)
  script_originality   int,
  visual_originality   int,
  narrative_originality int,
  similarity_risk      cn_risk_level,
  notes          text,
  created_by     uuid references auth.users(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── Asset library (spec §40) ────────────────────────────────────────────────

create table cn_assets (
  id             uuid primary key default gen_random_uuid(),
  kind           cn_asset_kind not null,
  character_id   uuid references cn_characters(id) on delete set null,
  production_id  uuid references cn_productions(id) on delete set null,
  product_id     uuid,
  storage_path   text,
  url            text,
  mime_type      text,
  bytes          bigint,
  duration_seconds int,
  tags           text[] not null default '{}',
  metadata       jsonb not null default '{}'::jsonb,
  created_by     uuid references auth.users(id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── Product intelligence (spec §29) ─────────────────────────────────────────

create table cn_products (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  source           text,
  platform         cn_platform not null default 'other',
  category         text,
  price            numeric(12,2),
  currency         text not null default 'GBP',
  commission_rate  numeric(5,2),
  rating           numeric(3,2),
  review_count     int,
  sales_estimate   bigint,
  trend_score      numeric(5,2),
  url              text,
  image_url        text,
  clicks           bigint not null default 0,
  orders           bigint not null default 0,
  revenue          numeric(12,2) not null default 0,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table cn_ideas
  add constraint cn_ideas_product_fk
  foreign key (product_id) references cn_products(id) on delete set null;

alter table cn_assets
  add constraint cn_assets_product_fk
  foreign key (product_id) references cn_products(id) on delete set null;

-- ── Product × Character matching (spec §30) ─────────────────────────────────

create table cn_product_character_scores (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references cn_products(id) on delete cascade,
  character_id  uuid not null references cn_characters(id) on delete cascade,
  score         numeric(5,2) not null default 0,
  rationale     text,
  is_manual     boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (product_id, character_id)
);

-- ── Experiment engine (spec §31) ────────────────────────────────────────────

create table cn_experiments (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  hypothesis    text,
  idea_id       uuid references cn_ideas(id) on delete set null,
  character_id  uuid references cn_characters(id) on delete set null,
  variable      text,                   -- hook | duration | style | cta | timing | ...
  started_at    timestamptz,
  ended_at      timestamptz,
  is_open       boolean not null default true,
  conclusion    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table cn_experiment_variants (
  id             uuid primary key default gen_random_uuid(),
  experiment_id  uuid not null references cn_experiments(id) on delete cascade,
  label          text not null,          -- "Hook A", "Hook B", ...
  production_id  uuid references cn_productions(id) on delete set null,
  hook_id        uuid references cn_hooks(id) on delete set null,
  description    text,
  is_winner      boolean not null default false,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- ── Publications + metrics (spec §31, §34) ──────────────────────────────────

create table cn_publications (
  id                    uuid primary key default gen_random_uuid(),
  production_id         uuid references cn_productions(id) on delete cascade,
  character_id          uuid references cn_characters(id) on delete set null,
  platform_account_id   uuid references cn_platform_accounts(id) on delete set null,
  platform              cn_platform not null,
  external_id           text,
  url                   text,
  published_at          timestamptz,
  outcome               cn_pipeline_status,   -- winner | loser | measuring
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create table cn_publication_metrics (
  id                 uuid primary key default gen_random_uuid(),
  publication_id     uuid not null references cn_publications(id) on delete cascade,
  checkpoint         cn_checkpoint not null,
  measured_at        timestamptz not null default now(),
  views              bigint not null default 0,
  hold_3s            numeric(5,2),
  hold_5s            numeric(5,2),
  avg_watch_seconds  numeric(8,2),
  completion_rate    numeric(5,2),
  likes              bigint not null default 0,
  comments           bigint not null default 0,
  shares             bigint not null default 0,
  saves              bigint not null default 0,
  profile_visits     bigint not null default 0,
  followers_gained   bigint not null default 0,
  link_clicks        bigint not null default 0,
  orders             bigint not null default 0,
  revenue            numeric(12,2) not null default 0,
  created_at         timestamptz not null default now(),
  unique (publication_id, checkpoint)
);

-- ── Revenue (spec §35) ──────────────────────────────────────────────────────

create table cn_revenue (
  id              uuid primary key default gen_random_uuid(),
  source          cn_revenue_source not null,
  character_id    uuid references cn_characters(id) on delete set null,
  publication_id  uuid references cn_publications(id) on delete set null,
  product_id      uuid references cn_products(id) on delete set null,
  occurred_on     date not null default current_date,
  gross_amount    numeric(12,2) not null default 0,
  commission      numeric(12,2) not null default 0,
  currency        text not null default 'GBP',
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Monetisation tracker (spec §12, §36) — editable, never hard-coded ───────

create table cn_monetisation_programmes (
  id                    uuid primary key default gen_random_uuid(),
  platform              cn_platform not null,
  programme             text not null,
  followers_required    bigint,
  views_required        bigint,
  watch_hours_required  numeric(10,2),
  time_window           text,
  minimum_video_length  text,
  country               text,
  status                text not null default 'active',
  source                text,
  last_verified_date    date,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  -- One record per programme per market, so re-running the seed cannot duplicate it.
  unique nulls not distinct (platform, programme, country)
);

create table cn_monetisation_progress (
  id                   uuid primary key default gen_random_uuid(),
  programme_id         uuid not null references cn_monetisation_programmes(id) on delete cascade,
  platform_account_id  uuid not null references cn_platform_accounts(id) on delete cascade,
  followers_current    bigint not null default 0,
  views_current        bigint not null default 0,
  watch_hours_current  numeric(10,2) not null default 0,
  is_eligible          boolean not null default false,
  measured_at          timestamptz not null default now(),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  unique (programme_id, platform_account_id)
);

-- ── Prompt library (spec §41) ───────────────────────────────────────────────

create table cn_prompts (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  kind          cn_prompt_kind not null,
  body          text not null,
  variables     text[] not null default '{}',
  character_id  uuid references cn_characters(id) on delete set null,
  is_system     boolean not null default false,
  version       int not null default 1,
  created_by    uuid references auth.users(id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (name, version)
);

-- ── Compliance + AI disclosure (spec §37, §38) ─────────────────────────────

create table cn_compliance_checks (
  id                            uuid primary key default gen_random_uuid(),
  production_id                 uuid not null references cn_productions(id) on delete cascade,
  ai_generated                  boolean not null default true,
  photorealistic                boolean not null default true,
  contains_real_person          boolean not null default false,
  real_person_permission        boolean not null default false,
  voice_cloned                  boolean not null default false,
  voice_owner                   text,
  platform_disclosure_required  boolean not null default false,
  disclosure_completed          boolean not null default false,
  copyright_checked             boolean not null default false,
  music_rights_checked          boolean not null default false,
  commercial_disclosure_required boolean not null default false,
  blocking_issues               text[] not null default '{}',
  checked_by                    uuid references auth.users(id) on delete set null,
  checked_at                    timestamptz,
  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now(),
  unique (production_id)
);

-- ── Indexes ─────────────────────────────────────────────────────────────────

create index cn_characters_active_idx           on cn_characters (is_active, launch_order);
create index cn_character_assets_char_idx       on cn_character_assets (character_id, kind);
create index cn_platform_accounts_char_idx      on cn_platform_accounts (character_id);
create index cn_references_status_idx           on cn_references (analysis_status, discovered_at desc);
create index cn_references_platform_idx         on cn_references (platform);
create index cn_content_dna_reference_idx       on cn_content_dna (reference_id);
create index cn_content_dna_hook_type_idx       on cn_content_dna (hook_type);
create index cn_ideas_character_idx             on cn_ideas (character_id, status);
create index cn_ideas_status_idx                on cn_ideas (status, created_at desc);
create index cn_hooks_idea_idx                  on cn_hooks (idea_id);
create index cn_scripts_idea_idx                on cn_scripts (idea_id, format);
create index cn_productions_status_idx          on cn_productions (status, scheduled_for);
create index cn_productions_character_idx       on cn_productions (character_id, status);
create index cn_assets_kind_idx                 on cn_assets (kind, created_at desc);
create index cn_assets_character_idx            on cn_assets (character_id);
create index cn_products_trend_idx              on cn_products (trend_score desc nulls last);
create index cn_pcs_product_idx                 on cn_product_character_scores (product_id, score desc);
create index cn_experiments_open_idx            on cn_experiments (is_open, started_at desc);
create index cn_experiment_variants_exp_idx     on cn_experiment_variants (experiment_id);
create index cn_publications_char_idx           on cn_publications (character_id, published_at desc);
create index cn_publications_platform_idx       on cn_publications (platform, published_at desc);
create index cn_publication_metrics_pub_idx     on cn_publication_metrics (publication_id, checkpoint);
create index cn_revenue_source_idx              on cn_revenue (source, occurred_on desc);
create index cn_revenue_character_idx           on cn_revenue (character_id, occurred_on desc);
create index cn_monetisation_progress_acc_idx   on cn_monetisation_progress (platform_account_id);
create index cn_prompts_kind_idx                on cn_prompts (kind);
create index cn_compliance_production_idx       on cn_compliance_checks (production_id);

-- ── updated_at triggers ─────────────────────────────────────────────────────

do $$
declare t text;
begin
  foreach t in array array[
    'cn_profiles','cn_characters','cn_character_assets','cn_platform_accounts',
    'cn_references','cn_content_dna','cn_ideas','cn_hooks','cn_scripts',
    'cn_productions','cn_assets','cn_products','cn_product_character_scores',
    'cn_experiments','cn_experiment_variants','cn_publications','cn_revenue',
    'cn_monetisation_programmes','cn_monetisation_progress','cn_prompts',
    'cn_compliance_checks'
  ]
  loop
    execute format(
      'create trigger %I_touch before update on %I
         for each row execute function cn_touch_updated_at()', t, t);
  end loop;
end $$;
