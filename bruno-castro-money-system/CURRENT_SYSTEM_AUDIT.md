# CURRENT SYSTEM AUDIT

Date: 11 August 2026 · Auditor: Claude (CTO role) · Scope: everything reachable
from this environment

---

## 0. Scope and honesty statement

The master prompt asks for an audit of the existing project — Company System BR,
its Supabase schema, migrations, CRM, existing phases, TODOs and Obsidian files.

**Most of that was not reachable, and I did not guess at it.**

What I could read:

- `adesso-main-site` — full source, git history, all nine commits
- `portfolio/` — the site built earlier in this session
- The rate and channel analysis in `docs/estrategia-freelance-remoto.md`

What I could not read, and why:

| Target | Status |
|---|---|
| Company System BR | Not on GitHub under `rbproducoespa-ai` — searched, one repo exists |
| Signstastic | Same |
| LED Repair UK | Same |
| RL Paint OS | Same |
| MotoOps AI, FOMENTA, ExpoAgents, Omniroute | Same — known only from session titles |
| Supabase schema / migrations | Not versioned in the repo. No `.sql`, no migrations folder |
| Obsidian vaults | Local to your machine, not in any repo |

The `nexusairb-dev` organisation exists in your session history but is not
searchable with this token.

**Consequence for the plan:** any statement below about Company System BR would
be fiction, so there are none. If those projects matter to the build order, push
them to GitHub or run the master prompt locally.

---

## 1. The finding that changes the plan

> **You are about to build a CRM that already substantially exists.**

`adesso-main-site/src/app/admin` is not a mockup. It is a working, Supabase-backed
admin with authentication, email-gated roles, and ten live tables.

Tables actually referenced in the code, by frequency of use:

| Table | References | What it already stores |
|---|---|---|
| `orders` | 18 | Orders, with a detail view and file attachments |
| `whatsapp_conversations` | 14 | Conversation threads |
| `blog_posts` | 10 | Content |
| `site_content` | 9 | Editable page content |
| `whatsapp_flows` | 8 | Automation flows, with a visual flow editor |
| `contacts` | 7 | **See below — this is the important one** |
| `form_submissions` | 6 | Inbound leads from forms |
| `whatsapp_messages` | 3 | Message log |
| `waitlist` | 3 | Early-access signups |
| `order_files` | 2 | Attachments |

### The `contacts` table is 70% of the lead record you specified

Fields already present in the code: `name`, `email`, `phone`, `company`,
`message`, `source`, `status`, `value`, `notes`, `created_at`.

Compare against the lead schema in the master prompt. Already there: name,
company, email, phone, source, notes, estimated value, created_at, and a status
field that can carry the pipeline stage.

Missing, and genuinely needed: `role`, `linkedin`, `website`, `country`,
`company_type`, `service_interested`, `probability`, `last_contact`,
`next_follow_up`, `pipeline_stage` (as a proper enum rather than free `status`),
`owner`, `updated_at`.

**That is one additive migration, not a new system.** Roughly a day of work
instead of the three weeks a CRM from scratch would cost.

### What else is directly reusable

- **Auth and role gating** — `src/middleware.ts` protects `/admin` by email allowlist. Works. Reuse as-is.
- **Admin shell and navigation** — `src/app/admin/_components/AdminShell.tsx`. Reuse.
- **WhatsApp engine** — `src/lib/whatsapp-engine.ts` plus a flow editor UI. This is exactly the outreach and follow-up automation in Passo 6, already built.
- **Inbox** — `src/app/admin/inbox` over `form_submissions`. This is inbound lead capture, done.
- **Orders + order_files** — the delivery and invoicing half of "vender → entregar → receber".
- **Supabase clients** — `supabase.ts`, `supabase-server.ts`, `supabase-admin.ts`. Correctly separated already.
- **Analytics lib** — `src/lib/analytics.ts`.

---

## 2. What is missing for the Revenue OS

Ordered by revenue impact, not by effort.

| Gap | Why it matters | Size |
|---|---|---|
| **Pipeline stages** on contacts | Without stages there is no pipeline, no win rate, no forecast | Small |
| **`/today` page** | The single highest-leverage screen in the whole system (Passo 10) | Small |
| **Follow-up dates** | Deals are lost to silence, not to rejection | Small |
| **Prospecting lists** | Where the 200 stand builders live (Passo 5) | Medium |
| **Proposals** | Currently no way to send or track one (Passo 7) | Medium |
| **Revenue dashboard** | You cannot see which skill actually earns (Passo 9) | Medium |
| **Outreach templates** | Personalised message generation (Passo 6) | Small |
| **Portfolio module** | Case studies as proposal attachments (Passo 8) | Medium |
| **Goals / 90-day plan** | Activity targets and progress (Passo 11) | Small |
| **AI sales assistant** | Rules-based first, LLM adapter later (Passo 14) | Medium |

---

## 3. What is consuming time without returning money

Judged strictly against the ten revenue questions in the master prompt.

| Module | Verdict | Reasoning |
|---|---|---|
| `admin/ecommerce` | **Pause** | You sell services, not products. No revenue path. |
| `admin/membership` | **Pause** | Subscription product that does not exist yet. |
| `admin/plugins` | **Pause** | Platform feature for a platform with no users. |
| `admin/mobile` | **Pause** | Duplicates responsive design. |
| `admin/devmode` | **Pause** | Developer convenience, zero revenue. |
| `admin/database` | **Keep, low priority** | Useful for you, invisible to clients. |
| `admin/marketing`, `admin/meta`, `admin/seo` | **Keep** | Feeds lead generation. |
| `admin/blog`, `admin/media`, `admin/pages`, `admin/editor` | **Keep, low priority** | Content supports authority; not urgent. |
| `admin/analytics` | **Keep** | Needed for the revenue dashboard. |

Do not delete any of these. Classify and stop investing in them, exactly as the
prompt instructs for the company matrix.

### The bigger time sink

Nine commits across four months, all on one platform, with **zero pounds
invoiced through it**. The Adesso platform is a good business but it is a
2027 business — subscriptions, marketplace, data products. Meanwhile the
skills that can invoice next week have no system behind them at all.

That is the actual finding of this audit: the engineering is not the problem.
The absence of a sales motion is.

---

## 4. Architectural decision: where the Revenue OS should live

Three options, judged on cost, speed and risk.

**A. Extend the Adesso admin.** Fastest by a wide margin — auth, shell, contacts,
WhatsApp engine and Supabase all exist. Risk: the Adesso site carries visa
positioning and must not read as a freelance agency. Mitigation: the admin is
behind an email-gated login, invisible to the public, so positioning is
unaffected. Public pages stay untouched.

**B. New standalone app.** Clean separation, but rebuilds auth, admin shell,
Supabase wiring and the WhatsApp engine from zero. Weeks of work that earns
nothing.

**C. Extend the admin now, extract later.** Ship the revenue modules into the
existing admin, prove they generate money, then extract into a standalone app
once there is revenue justifying the migration.

> **Recommendation: C.** It respects your own rule — do not rebuild what exists
> — and gets a working pipeline in days rather than weeks. The extraction is
> cheap later because the modules are additive and the data lives in Supabase,
> not in the app.

**One caveat worth flagging:** this means new tables in the Adesso Supabase
project. If you would rather keep freelance client data in a separate Supabase
project for clean separation, say so before P2 starts — that is a five-minute
decision now and a painful migration in three months.

---

## 5. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| **Supabase schema is not versioned** | High | No migrations in the repo means no reproducible database and no safe rollback. Fix this before touching the schema: dump the current schema into `supabase/migrations/0000_baseline.sql` first. |
| Building modules instead of selling | High | The rule from the prompt: work vertically, one module fully finished and tested, then the next. |
| Contacts table changing under a live site | Medium | All changes additive, all columns nullable, no drops. |
| Twelve offers, no focus | Medium | `OFFERS.md` ranks them; the roadmap commits to three streams. |

---

## 6. Verdict

| Question | Answer |
|---|---|
| Is there a system already? | Yes, more than you think. The admin is real and Supabase-backed. |
| Should we rebuild it? | No. Extend `contacts` into a pipeline and add `/today`. |
| What is the fastest path to money? | Not code. The LinkedIn rewrite and 200 prospects in `day-1/`. |
| What is the fastest path to a working Revenue OS? | One migration plus two screens. Days, not weeks. |
| What should stop? | E-commerce, membership, plugins, mobile, devmode. Classify, do not delete. |
