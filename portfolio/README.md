# Bruno Castro — portfolio

Portfolio site with a hub and one dedicated landing page per professional area.
Someone arriving from an exhibition job ad lands on `/exhibition` and never has
to see the audio work; someone arriving from an automation enquiry lands on
`/ai`. The hub exists for people who arrive without a specific reason.

Standalone Next.js app. It shares no code with the Adesso site and is meant to
be deployed as its own project on its own domain — the Adesso brief explicitly
prohibits freelancer and agency language, because that site supports the visa
positioning. Keep the two apart.

---

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · Geist fonts.
No database, no CMS, no client-side state. Everything is statically generated —
21 pages at build time, so hosting is effectively free and the site is fast.

## Run locally

```bash
cd portfolio
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run type-check   # TypeScript, no emit
```

## Deploy on Vercel

Because this app lives in a subdirectory of the Adesso repository, point Vercel
at the subdirectory rather than the repository root:

1. New Project → import `rbproducoespa-ai/adesso-main-site`
2. **Root Directory: `portfolio`**
3. Environment variable: `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
4. Add the domain under Project → Domains

`NEXT_PUBLIC_SITE_URL` drives canonical URLs, hreflang tags and the sitemap. If
you leave it unset the build falls back to `https://brunocastro.com`, which is a
placeholder — set it before the first real deploy or search engines will be told
the wrong canonical host.

If you would rather this lived in its own repository, the folder is fully
self-contained: copy it out, `git init`, and nothing breaks.

---

## URL structure

```
/                     hub, English
/exhibition           01 Exhibition & 3D
/creative             02 Creative & Digital
/ai                   03 AI & Technology
/audio                04 Audio Technology
/about
/contact
/local-services       05 Trade services — hidden, see below

/pt                   same tree in Portuguese
/pt/exhibition
...
```

English is at the root; Portuguese is prefixed. Both languages have real,
indexable URLs and are cross-linked with `hreflang`, so Google treats them as
translations rather than duplicates.

### Why folders and not subdomains

Subdomains are treated as separate sites by search engines, so
`exhibition.yourdomain.com` would build its own authority from zero and split
the value of every link you earn across five sites. Folders concentrate it on
one domain. The visitor experience is identical either way.

If you later decide you want the subdomains anyway, nothing here needs
rewriting: add the DNS records, then add a `middleware.ts` that rewrites
`exhibition.yourdomain.com/*` to `/exhibition/*` and keep the existing canonical
tags pointing at the folder URLs.

---

## Editing content

Three files hold everything. No component needs touching for ordinary changes.

| File | What lives there |
|---|---|
| `src/content/site.ts` | Name, email, WhatsApp, location, headline, credentials |
| `src/content/divisions.ts` | The five areas: copy, capabilities, tools, process, prices, SEO |
| `src/content/work.ts` | Case studies |

Every text field is `{ en: "...", pt: "..." }`. TypeScript will fail the build
if you add one language and forget the other, which is deliberate.

### Before the first deploy

- [ ] `site.ts` — confirm `email`. It is currently a placeholder.
- [ ] `site.ts` — confirm `whatsapp`. It is the number already published on the Adesso site; change it if you want a separate line for freelance enquiries.
- [ ] `site.ts` — add your LinkedIn URL to `social.linkedin`.
- [ ] `divisions.ts` — check every price. They follow the rate analysis in `docs/estrategia-freelance-remoto.md`, but they are your prices, not mine. Delete the whole `engagement` block from a division if you would rather not publish numbers for it.
- [ ] `work.ts` — see below.
- [ ] Set `NEXT_PUBLIC_SITE_URL`.

### Case studies

Each item in `work.ts` has a `status`:

- `"published"` — real project, real copy, safe to show a client.
- `"placeholder"` — renders with a visible **PLACEHOLDER** badge and a labelled
  empty image frame telling you what to supply.

The placeholders are there so a half-finished portfolio never reads as a
finished one. For each, you need three things:

1. A hero image, 1600×1200, saved in `public/work/`, then set `image: "/work/your-file.jpg"`.
2. The client name, or "confidential client" if it is under NDA.
3. One measurable fact — square metres, show name, lead count, hours saved.

Then flip `status` to `"published"` and the badge disappears.

The two that matter most commercially are `stand-project-02` (beMatrix) and
`ledskin-repair`. Almost nobody else can show that work, and it is what
justifies charging above the market median rather than competing inside it.

### Adding a new area

Append an object to the `divisions` array in `divisions.ts`. The route, the hub
card, the nav entry, the sitemap entry and both language versions are generated
from it. Pick an `accent` from the five defined in `globals.css`, or add a new
one there.

### The hidden page

`/local-services` carries the UK trade work — painting, soundproofing,
installation. It is excluded from the nav, the hub, the footer and the sitemap,
and is served with `noindex, nofollow`. It exists so you can send the link
directly to a local client without it appearing on the international profile.

Setting `hidden: false` on that division puts it everywhere, if you change your
mind.

---

## Design notes

The visual language is a technical drawing sheet: paper ground, hairline rules,
monospace annotations, work presented as plates. It is deliberately nothing like
the Adesso site, because these are two different brands with two different jobs.

Each area owns an accent colour — oxide red, burnt amber, deep indigo, forest
teal — from a single pigment family, so the areas read as siblings while still
being visibly distinct destinations. Accents are set through `data-accent` on a
wrapper and cascade via the `--accent` CSS variable.

Light and dark themes are both defined at token level in `globals.css`, covering
all three viewer states: explicit light, explicit dark, and the system default
where no attribute is stamped.
