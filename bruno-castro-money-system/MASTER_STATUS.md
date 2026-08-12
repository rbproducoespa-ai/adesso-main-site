# MASTER STATUS

Single source of truth for build progress. Updated at the end of every phase.

Statuses: `NOT STARTED` · `IN PROGRESS` · `BLOCKED` · `DONE`

Last updated: 11 August 2026

---

## Phase table

| Phase | Name | Status | Notes |
|---|---|---|---|
| **P0** | Audit | `DONE` (partial) | `CURRENT_SYSTEM_AUDIT.md`. Scope limited — see blocker B1 |
| **P1** | Offers | `DONE` | `OFFERS.md`, 26 offers priced, `REVENUE_ROADMAP.md` |
| **D1** | Day 1 execution | `DONE` | LinkedIn rewrite + prospect list, in `day-1/` |
| **P2** | Sales CRM | `NOT STARTED` | Extend `contacts`, do not rebuild. Blocked on decision D1 |
| **P3** | Today dashboard | `NOT STARTED` | Highest leverage screen. Depends on P2 |
| **P4** | Prospecting | `NOT STARTED` | CSV import of `day-1/prospects.csv` |
| **P5** | Outreach | `NOT STARTED` | WhatsApp engine already exists — reuse |
| **P6** | Proposals | `NOT STARTED` | |
| **P7** | Portfolio | `PARTIAL` | Public site built in `portfolio/`. Admin module not built |
| **P8** | Revenue dashboard | `NOT STARTED` | |
| **P9** | 90-day plan module | `NOT STARTED` | Targets defined in `REVENUE_ROADMAP.md` |
| **P10** | Brand content | `NOT STARTED` | |
| **P11** | AI sales assistant | `NOT STARTED` | Rules first, LLM adapter later |

---

## Blockers

### B1 — Most of the codebase is unreachable · `OPEN`

The projects the master prompt asks to audit — Company System BR, Signstastic,
LED Repair UK, RL Paint OS, and the Supabase schema — are not in any repository
this session can read. `rbproducoespa-ai` has exactly one repo.

**Impact.** P0 is complete only for `adesso-main-site`. P2 may duplicate work
that already exists in Company System BR.

**To clear.** Push those projects to GitHub and say so, or run the master prompt
in Claude Code locally where the folders exist.

### B2 — Supabase schema is not versioned · `OPEN`

No `.sql` files, no migrations directory. The database exists only as live state
in the Supabase project.

**Impact.** No reproducible environment, no safe rollback. This must be fixed
*before* P2 touches the schema.

**To clear.** `supabase db dump --schema public > supabase/migrations/0000_baseline.sql`,
commit it, then build forward with small reversible migrations.

---

## Decisions needed from Bruno

### D1 — Which Supabase project holds freelance client data? · `OPEN — blocks P2`

The audit recommends extending the existing Adesso admin rather than building a
new app, because auth, the admin shell, `contacts`, the WhatsApp engine and the
Supabase wiring already exist. That saves roughly three weeks.

The open question is only about data:

- **Option A — same Supabase project.** Fastest. One database, one set of
  credentials. Freelance leads live alongside Adesso data.
- **Option B — separate Supabase project.** Clean separation between the
  endorsed business and freelance work. Costs about half a day of extra wiring.

**Recommendation: B.** Half a day now, versus a painful migration later — and
given the visa positioning, keeping the two commercial records separate is worth
more than the half day.

Cheap to decide now, expensive to change in three months.

### D2 — Publish prices on the public portfolio? · `OPEN`

Prices are currently live on the `portfolio/` division pages. They filter out
time-wasters and support fixed-scope selling, but they also cap what you can
quote a large agency.

**Recommendation:** keep them for `/ai` and `/audio`, remove from `/exhibition`
and replace with "fixed-scope quotes, typically £1,400–4,000". Agencies with
real budgets should have to ask.

---

## P2 implementation plan (ready to start once D1 is answered)

Vertical slice. One feature finished and tested before the next begins.

1. **Baseline the schema.** Clear B2 first. Non-negotiable.
2. **Migration `0001_pipeline.sql`** — additive only, every column nullable, no drops:
   `pipeline_stage`, `role`, `linkedin`, `website`, `country`, `company_type`,
   `service_interested`, `probability`, `last_contact`, `next_follow_up`,
   `owner`, `updated_at`. Backfill `pipeline_stage` from the existing `status`.
3. **Stage enum** — `new_lead`, `contacted`, `replied`, `qualified`, `meeting`,
   `proposal`, `negotiation`, `won`, `lost`, `follow_up`.
4. **Lead list view** — filter by stage, service, country, next follow-up. Mobile first.
5. **Lead detail** — edit, notes, stage change, follow-up date, contact history.
6. **Test** — create, read, update, stage transition, follow-up. Then stop and commit.

Only after that: P3.

---

## Log

| Date | Phase | What happened |
|---|---|---|
| 11 Aug 2026 | P0 | Audited `adesso-main-site`. Found `contacts` already covers ~70% of the lead schema; WhatsApp engine and flow editor already built. Recommended extend-then-extract over rebuild. Logged B1 and B2. |
| 11 Aug 2026 | P1 | 26 offers defined and priced across high value, fast cash and recurring. Revenue roadmap with activity maths and company priority matrix. |
| 11 Aug 2026 | D1 | LinkedIn profile rewritten for search discoverability. Prospect list seeded with verified beMatrix partners plus the authoritative directories to expand from. |
