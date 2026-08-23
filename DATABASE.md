# AI CREATOR NETWORK OS — Database

Postgres on Supabase. Every object is prefixed `cn_` so the OS coexists with the
adesso site's tables in one project. Migrations live in `supabase/migrations/`
and are **append-only** — never edit a shipped file.

| File | Contents |
|------|----------|
| `0001_network_os_schema.sql` | 11 enums, 22 tables, 27 indexes, `updated_at` triggers |
| `0002_network_os_rls.sql` | RLS on every table + role helper functions |
| `0003_network_os_seed.sql` | Four characters, 12 accounts, monetisation records, base prompts |

## Applying

```bash
# Supabase CLI
supabase db push

# or paste each file, in order, into the SQL editor
```

Then give yourself a profile — nothing is readable through the anon key without one:

```sql
insert into cn_profiles (user_id, email, role)
select id, email, 'owner' from auth.users where email = 'you@example.com';
```

## Table map (spec §42)

The spec names 22 entities. `users` maps to Supabase's `auth.users` plus a
`cn_profiles` row that carries the OS role.

| Spec name | Table | Purpose |
|-----------|-------|---------|
| users | `cn_profiles` | Role for an authenticated user: owner / admin / editor / viewer |
| characters | `cn_characters` | Character Bible — the permanent identity record (§17) |
| character_assets | `cn_character_assets` | Face, body, side, lifestyle, wardrobe, voice references (§18) |
| platform_accounts | `cn_platform_accounts` | 12 accounts: 4 characters × TikTok, Instagram, YouTube (§9) |
| references | `cn_references` | Discovered external content, with risk flags (§19) |
| content_dna | `cn_content_dna` | Viral Mirror analysis + the structured DNA fingerprint (§20, §21) |
| ideas | `cn_ideas` | Original concepts, character match scores, pipeline status (§22, §23) |
| hooks | `cn_hooks` | Hook Lab output, classified by type (§24) |
| scripts | `cn_scripts` | Platform-specific scripts, versioned, approval flag (§25) |
| productions | `cn_productions` | One unit of content moving through the pipeline (§27) |
| assets | `cn_assets` | Generated and uploaded media (§40) |
| products | `cn_products` | Product intelligence with trend and commerce metrics (§29) |
| product_character_scores | `cn_product_character_scores` | Product × character fit, manual override flag (§30) |
| experiments | `cn_experiments` | A tracked question with a hypothesis (§31) |
| experiment_variants | `cn_experiment_variants` | Hook A / B / C against productions (§31) |
| publications | `cn_publications` | A production live on one platform account |
| publication_metrics | `cn_publication_metrics` | One row per checkpoint: 24h, 72h, 7d, 30d (§31) |
| revenue | `cn_revenue` | Money by source, character, product, publication (§35) |
| monetisation_programmes | `cn_monetisation_programmes` | Editable eligibility records (§36) |
| monetisation_progress | `cn_monetisation_progress` | Per-account progress toward a programme |
| prompts | `cn_prompts` | Prompt library with `{{variables}}` (§41) |
| compliance_checks | `cn_compliance_checks` | AI disclosure and rights gate, one per production (§37) |

## Enums

`cn_role`, `cn_platform`, `cn_pipeline_status`, `cn_content_bucket`,
`cn_hook_type`, `cn_script_format`, `cn_asset_kind`, `cn_prompt_kind`,
`cn_risk_level`, `cn_checkpoint`, `cn_revenue_source`, `cn_analysis_status`.

Enums are mirrored as TypeScript unions in `src/lib/network/types.ts` and
labelled in `src/lib/network/constants.ts`. **Change them in all three places or
not at all** — a drift between the enum and the union is a runtime error the
compiler cannot see.

Adding a value later:

```sql
alter type cn_hook_type add value 'nostalgia';
```

## Design notes

**Pipeline status lives on the row, not in a separate state table.**
`cn_pipeline_status` runs `idea → … → published → measuring → winner/loser →
archived` (§27) and is the single ordering used by both the Kanban and the table
view.

**Metrics are checkpointed, not overwritten.** `cn_publication_metrics` is
unique on `(publication_id, checkpoint)`, so a 7-day reading never destroys the
24-hour reading. Aggregation takes the highest checkpoint per publication —
otherwise the same views are counted four times. This is implemented in
`getNetworkOverview()`.

**Follower counts sit on the account, not the character.** A character's total
is the sum over its platform accounts, which keeps per-platform growth
measurable (§34).

**Monetisation thresholds are nullable and seeded unverified.** Every programme
row carries `source` and `last_verified_date`, and the seed leaves the
requirement columns NULL with `status = 'needs_verification'`. Platform rules
change; a hard-coded number becomes a lie without anyone noticing (§12, §36).

**Arthur and Rose are two rows.** `partner_character_id` links them for couple
formats. They never merge into one entity (§8).

**JSONB where the shape is genuinely open:** `shot_sequence`, `scenes`,
`match_scores`, asset `metadata`. Everything queried or filtered is a real
column.

## Row Level Security

RLS is on for all 22 tables. Three helper functions read `cn_profiles`:

| Function | True for |
|----------|----------|
| `cn_is_member()` | any user with a `cn_profiles` row |
| `cn_can_write()` | role owner, admin or editor |
| `cn_is_admin()` | role owner or admin |

Policy per table: SELECT for members, INSERT/UPDATE for writers, DELETE for
admins. `cn_profiles` itself lets a member read the roster and update their own
row without changing their own role; only admins change roles.

The service-role key bypasses RLS entirely and is what server-side work uses
(`src/lib/supabase-admin.ts`). It must never reach the browser.

## Storage

Character reference assets (`cn_character_assets`) are uploaded to the existing
`site-assets` Supabase Storage bucket under `network/characters/<character_id>/`.
No separate bucket is needed. The row holds both `storage_path` and the public
`url`; deleting the row also removes the stored file when the OS uploaded it,
and leaves it alone when the asset was registered by URL.

Only one asset per kind is `is_primary` — promoting a new one demotes the
previous. The consistency engine quotes the primary reference of each kind, so
two candidates would mean no rule.

## Aggregation

`src/lib/network/overview.ts` computes the dashboard KPIs in TypeScript from raw
rows fetched by `queries.ts`. That is correct at Phase 1 volume and wrong at scale: once publication
counts pass a few thousand, move the aggregation into Postgres views or a
materialised rollup refreshed on metric ingest. Phase 8 owns that change.
