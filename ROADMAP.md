# AI CREATOR NETWORK OS — Roadmap

Working name: **AI CREATOR NETWORK OS** (spec §13). This document is the plan
and the working format. `DATABASE.md`, `CONTENT_ENGINE.md` and `COMPLIANCE.md`
carry the detail for their areas.

---

## 1. Current state

The repository is the **adesso main site** — a Next.js 15 App Router project
(React 19, TypeScript, Tailwind 3, Supabase, Resend) with:

- A public marketing site (`/`, `/about`, `/services`, `/divisions`, `/blog`, …).
- An authenticated admin studio at `/admin` (~30 screens: CRM, blog, media,
  WhatsApp flows, SEO, analytics, settings).
- Supabase wiring in `src/lib/`: browser client, SSR server client, and a
  service-role admin client that degrades to a mock when env vars are missing.
- Auth via Supabase, gated in `src/middleware.ts` by an `ADMIN_EMAILS` allowlist.
- No SQL migrations, no test runner, and (before this phase) no ESLint config.

**Decision: the OS is built alongside the site, not on top of it.** The existing
marketing site and `/admin` are working functionality and stay untouched. The OS
gets its own route namespace (`/network`), its own library namespace
(`src/lib/network/`) and its own database namespace (`cn_*` tables), so the two
products share infrastructure — auth, Supabase project, design tokens, deploy —
without sharing surface area. `references` is also a reserved SQL keyword, so
the table prefix earns its keep twice.

## 2. Proposed architecture

```
src/
  app/network/               Route namespace for the OS (auth-gated, noindex)
    layout.tsx               Auth gate + shell
    _components/             NetworkShell (sidebar) + UI primitives
    page.tsx                 Dashboard (spec §16)
    settings/                Environment, phase status, non-negotiable rules
    <module>/                One route per nav item (spec §15)
  lib/network/
    types.ts                 Domain types mirroring the cn_* schema
    constants.ts             Nav, pipeline, hook taxonomy, portfolio mix, phases
    queries.ts               Server-side reads and KPI aggregation
    demo.ts                  DEMO data, always behind isDemo
    providers/               Vendor-neutral AI provider contract + registry
supabase/migrations/         Schema, RLS, seed
```

Rules that hold across phases:

- **No vendor lock-in.** Every AI call goes through `lib/network/providers`.
  Nothing above that layer imports OpenAI, Anthropic, ElevenLabs, HeyGen, Kling
  or Runway directly (spec §14).
- **The database is the product.** Modules are views over `cn_*` tables; logic
  that decides (matching, scoring, winners) lives in `lib/network`, not in JSX.
- **Degrade, don't crash.** With no Supabase configured the OS shows labelled
  demo data, exactly as `/admin` degrades today.
- **Compliance is a gate, not a report.** See `COMPLIANCE.md`.

## 3. Database plan

22 tables under the `cn_` prefix, three migrations: schema + indexes + triggers,
RLS policies, seed. Full field list and rationale in `DATABASE.md`.

## 4. Build phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1  | Foundation, auth, database, navigation, design system | **Done** |
| 2  | Characters, Character Bible, assets, consistency engine | **Done** |
| 3  | Discover, references, Viral Mirror Engine, Content DNA | Next |
| 4  | Hooks, scripts, Original Version Generator | |
| 5  | Production pipeline, calendar, asset library | |
| 6  | Product intelligence, character matching | |
| 7  | Experiments, metrics, Winner Engine | |
| 8  | Analytics, revenue, monetisation tracker | |
| 9  | Compliance, originality, AI disclosure | |
| 10 | AI providers and external integrations | |

Phase 9 is a *hardening* phase, not the first time compliance appears: the
`cn_compliance_checks` table and the READY gate are designed in from Phase 1 and
enforced as soon as Phase 5 creates productions.

### Phase 1 — delivered

- `supabase/migrations/0001_network_os_schema.sql` — 22 tables, 11 enums, 27
  indexes, `updated_at` triggers.
- `supabase/migrations/0002_network_os_rls.sql` — RLS on every table, member /
  writer / admin policies driven by `cn_profiles.role`.
- `supabase/migrations/0003_network_os_seed.sql` — the four characters with
  their Character Bible fields, 12 platform accounts, monetisation programme
  records (unverified by design), base prompt library.
- `/network` route namespace: dashboard with the full §16 metric set, character
  cards, 90-day launch plan, portfolio mix, and the five daily questions.
- Settings screen: environment checks, phase status, non-negotiable rules.
- Roadmap stubs on the 14 unbuilt modules stating spec section and scope, so the
  navigation is complete and honest rather than 404s.
- Auth: `/network` added to the middleware allowlist gate; excluded from
  `robots.txt`.
- Vendor-neutral provider contract and registry (empty until Phase 10).
- Repo hygiene needed to make the phase gate real: ESLint flat config added,
  8 pre-existing type errors fixed, 8 pre-existing lint errors fixed, and the
  mock Supabase client taught `auth.admin.listUsers` (it was breaking
  `next build` on `/admin/membership`).

#### Phase 1 gate results

| Gate | Result |
|------|--------|
| `tsc --noEmit` | Pass — 0 errors (8 pre-existing errors fixed) |
| `eslint .` | Pass — 0 errors, 34 warnings (all pre-existing `<img>`/`any` advisories) |
| Tests | **Not run — no test runner in the repo.** First item of Phase 2. |
| `next build` | Pass — 83 pages, all 16 `/network` routes emitted |
| Migrations | Applied to a real Postgres 16 instance: 22 tables, RLS on all 22, 87 policies, 57 indexes. Seed verified idempotent over three runs; RLS verified for non-member / owner / viewer. |

### Phase 2 — delivered

- **Vitest**, closing the gate Phase 1 left open. `npm test` runs 39 tests.
- **`src/lib/network/overview.ts`** — the KPI aggregation, extracted out of
  `queries.ts` as a pure function so it can be tested without a database. The
  fetching stayed in `queries.ts`; the counting moved here.
- **`src/lib/network/consistency.ts`** — the consistency engine (§18).
  `composePrompt()` builds `CHARACTER MASTER PROFILE + SCENE + ACTION + CLOTHING
  + CAMERA + LIGHTING + EMOTION + DIALOGUE + PLATFORM FORMAT` for image, video,
  voice, b-roll and thumbnail targets, and reports which Bible fields are still
  missing for that target. `composeCouplePrompt()` handles Arthur + Rose (§8) by
  layering a shared scene over two intact master profiles.
- **`/network/characters`** — roster with a Bible-completeness bar per
  character, so a thin Bible is visible before a bad render reveals it.
- **`/network/characters/[slug]`** — the Character Bible editor: five field
  groups, an asset panel, and a Consistency tab that renders the prompt the
  pipeline would actually send for a sample scene, with a warning listing the
  gaps.
- **API** — `PATCH /api/network/characters/[id]` (explicit field allowlist, so a
  client cannot re-point identity or partner links) and
  `POST|DELETE /api/network/characters/[id]/assets` (upload to Supabase Storage
  or register by URL; one primary per kind).
- **`src/lib/network/auth.ts`** — route-level access control mirroring the
  middleware gate. Route handlers are reachable directly and must not rely on
  the page gate having run.

#### Phase 2 gate results

| Gate | Result |
|------|--------|
| `tsc --noEmit` | Pass — 0 errors |
| `eslint .` | Pass — 0 errors, 34 warnings (all pre-existing) |
| `npm test` | Pass — 39 tests across 2 files |
| `next build` | Pass — 82 pages |
| Smoke | Roster and both Bible pages 200; unknown slug 404; `PATCH` without a session returns 401 |

Storage note: asset upload writes to the existing `site-assets` bucket under
`network/characters/<id>/`, so no new bucket is required.

### Phase 3 — next

1. `/network/discover` — register references with metrics, product, category
   and risk flags over `cn_references` (§19).
2. Viral Mirror Engine over `cn_content_dna`: the 17 analysis fields, with no
   transcript field by design (§20).
3. Content DNA fingerprint and scoring (§21).
4. Provider-backed analysis is **not** part of Phase 3 — the engine writes and
   reads structured analysis; the AI adapters that fill it land in Phase 10.
   Until then analysis is entered by an operator.

## 5. Working format

**Branch and review.** One branch per phase, `claude/phase-N-<slug>`, opened as a
draft PR. Phases land whole; half a phase across two PRs is worse than a phase
that took longer.

*Current exception:* Phases 1 and 2 share the branch
`claude/formato-desenvolvimento-qz4q9q` and one PR, because Phase 1 had not been
merged when Phase 2 began and this session is pinned to that branch. Once it
merges, later phases go back to a branch each.

**Phase gate.** A phase is not done until, in order:

```bash
npm run type-check     # tsc --noEmit
npx eslint .           # 0 errors
npm test               # from Phase 2
npm run build          # production build
```

Every gate green, no exceptions and no "fix it next phase". A pre-existing
failure discovered at the gate gets fixed in that phase — that is why Phase 1
carries a repo-hygiene section.

**Phase report.** Every phase closes with: COMPLETED · FILES CHANGED · DATABASE
CHANGES · TEST RESULTS · NEXT PHASE. This file's phase table is the running
record.

**Migrations are append-only.** Never edit a shipped migration; add the next
numbered one. Seed data is idempotent so it can be re-run.

**Demo data never leaks.** Any fabricated figure travels behind `isDemo` and
renders with a DEMO label (spec §43).

**Definition of done for a module.** It reads real data when Supabase is
configured; it degrades to labelled demo data when it is not; the state it
writes is covered by RLS; and it answers at least one of the five questions
(spec §46).

## 6. Operational plan

The 90-day launch plan (§10) is product content, surfaced on the dashboard:
Maya alone for days 1–14 at ~3 experiments/day, Leo from day 15, Arthur and Rose
from day 31, network optimisation from day 46. Software phases and launch days
are deliberately not the same clock — the engine has to exist before the network
can use it, and Phases 1–5 are what Maya's first 42 experiments actually need.
