# Bruno Castro — Money System

Commercial operating system. Everything here exists to answer one question:
**how does this help Bruno get clients, sell, get paid, and build recurring
revenue?** Anything that cannot answer it goes to the backlog.

---

## Read this first: where these files actually are

You asked for this in `desktop/projetos todos/Bruno Castro project new`. I could
not put it there, and it matters that you know why rather than wonder later.

This session runs in a **disposable cloud container**, not on your machine. The
only thing in it is a fresh clone of `adesso-main-site` — there is no desktop,
no `projetos todos`, no access to your local disk. I checked before writing
anything.

So this folder lives at the root of the `adesso-main-site` repository, as a
**sibling** of the Adesso site. It does not touch the Adesso app: no shared
code, no shared config, no changes to its files. Same arrangement as
`portfolio/`.

To get it onto your desktop:

```bash
cd ~/Desktop/"projetos todos"
git clone -b claude/estrategia-freelancer-remoto-1p1cbx \
  https://github.com/rbproducoespa-ai/adesso-main-site.git "Bruno Castro project new"
```

Then delete everything except `bruno-castro-money-system/` and `portfolio/` if
you want them standalone, or keep the clone as-is.

## Second thing you need to know: the audit is partial, and why

The master prompt says to audit the existing project — Company System BR,
Signstastic, LED Repair UK, the existing CRM, Supabase migrations, Obsidian
files. **None of those are reachable from here.** The GitHub account
`rbproducoespa-ai` has exactly one repository, `adesso-main-site`. I searched.

So `CURRENT_SYSTEM_AUDIT.md` audits what I could genuinely read, and lists what
I could not, rather than inventing findings about code I have never seen. The
short version: the Adesso admin already contains most of the CRM you are about
to specify, and that changes the build plan considerably. Read the audit.

To get a full audit, either push those projects to GitHub and tell me, or run
the master prompt in Claude Code on your own machine where the folders exist.

---

## What is in here

| File | What it is |
|---|---|
| `CURRENT_SYSTEM_AUDIT.md` | What exists, what works, what is reusable, what is missing, what I could not see |
| `OFFERS.md` | Everything you can sell, with prices, ideal client, deliverables and upsells |
| `REVENUE_ROADMAP.md` | The path to £10,000/month, with the activity maths behind it |
| `MASTER_STATUS.md` | Phase tracker — P0 to P11, updated as work lands |
| `day-1/` | Executable today: LinkedIn rewrite and the prospect list |

## Start here, today

1. `day-1/LINKEDIN_PROFILE.md` — copy-paste ready. Thirty minutes.
2. `day-1/prospects.csv` — seeded with verified beMatrix partners. Fill it to 200.
3. `day-1/PROSPECTING_PLAYBOOK.md` — where the other 190 come from, and the method.

Nothing in the rest of this system earns a pound until those three are done.
