# ADESSO — CLAUDE CODE PROMPT
## Complete Website Rebuild | UK Innovator Founder Visa Ready
### Production-Ready | Next.js 14 | TypeScript | Tailwind CSS | Zero Placeholders

---

## CONTEXT & MISSION

Build a complete, production-ready website for **Adesso** — an AI-powered platform for the exhibition industry — optimised to support the founder's **UK Innovator Founder Visa** application. The site must position Adesso as an **innovative technology company** with a scalable platform, not a design agency or freelance service.

The three visa criteria that must be visually evident throughout the site:
- **Innovation** — genuine AI/tech platform solving real industry problems
- **Viability** — credible subscription-based business model with revenue streams
- **Scalability** — built to grow beyond the founder, across Europe and globally

**Current live site:** www.adessoexhibition.co.uk (Next.js, Supabase, Tailwind)
**Keep the same tech stack.** Replace all content, structure, and messaging.

---

## TECH STACK

```
- Framework: Next.js 14 (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- Fonts: Geist (display) + DM Sans (body) via next/font/google
- Animations: Framer Motion
- Icons: Lucide React
- Email: Resend (contact form)
- Deployment: Vercel
```

---

## DESIGN SYSTEM

### Visual Identity
- **Theme:** Dark, sophisticated, technology-forward. Deep navy/black backgrounds with sharp white typography and electric blue/teal accent system.
- **Aesthetic:** Luxury tech — think Palantir meets Linear. Not startup-playful. Not agency-warm. Cold precision with purpose.
- **NOT allowed:** Purple gradients, stock photo business imagery, rounded pill buttons, emoji in UI, freelancer/agency language.

### Color Palette (CSS variables)
```css
--bg-primary: #04040A        /* near-black */
--bg-secondary: #080D1A      /* deep navy */
--bg-card: #0D1525           /* card surface */
--border: #1A2540            /* subtle border */
--accent: #0066FF            /* electric blue */
--accent-secondary: #00D4FF  /* cyan highlight */
--text-primary: #F0F4FF      /* near-white */
--text-secondary: #8899BB    /* muted blue-grey */
--text-muted: #4A5A7A        /* very muted */
--success: #00E5A0           /* green accent */
```

### Typography
```
Display: Geist (700, 800) — headlines
Body: DM Sans (400, 500) — paragraphs
Mono: Geist Mono — data/stats/labels
```

### Layout Rules
- Max content width: 1280px
- Section padding: py-24 md:py-32
- Grid: CSS Grid + Flexbox (no Bootstrap)
- Spacing scale: Tailwind defaults
- Mobile-first, fully responsive

### Animation Principles
- Page load: staggered fade-up on hero elements (Framer Motion)
- Scroll reveals: `whileInView` with `once: true`
- Hover states: subtle scale + border glow on cards
- No autoplay video, no particle systems (keep it fast)

---

## SITE ARCHITECTURE

```
/ — Homepage
/about — About & Founder
/technology — Technical Architecture
/platform — Product / Platform Modules
/roadmap — Roadmap 2026–2028
/why-adesso — Strategic Positioning
/contact — Contact Form
```

Navigation: sticky top nav with logo left, links centre, CTA button right ("Request Access").

---

## PAGE SPECIFICATIONS

---

### PAGE 1: HOMEPAGE `/`

#### SECTION 1.1 — HERO

Full-viewport dark section. Animated background: subtle CSS grid pattern with slow pulse animation on the accent colour lines.

**Badge (top, small):**
```
[dot] Now in Early Access — UK Innovator Founder Programme
```

**H1 (large, bold, two lines):**
```
AI Infrastructure
for the Exhibition Industry
```
"AI Infrastructure" in white. "for the Exhibition Industry" in --text-secondary.

**Subtitle (max-w-2xl, centered):**
```
Adesso is building a data-driven platform that enables companies to discover 
exhibition opportunities, generate AI-powered stand concepts, and deliver 
projects through intelligent automation — at scale.
```

**CTA Buttons (side by side):**
- Primary: "Request Early Access" (solid --accent blue)
- Secondary: "See the Platform →" (ghost, white border)

**Stats Strip (below CTAs, horizontal):**
```
[€48B]        [Manual]         [2026]
Global Market  Current State    UK Launch
```
Labels in mono font, small, --text-muted.

**Hero Image:** Dark mockup of the platform dashboard. Use a placeholder div styled as a browser chrome with a dark UI inside — show mock data panels labelled "Lead Intelligence", "AI Concept Generator", "Pipeline Automation". Style it with the card colour system.

---

#### SECTION 1.2 — POSITIONING STRIP

Full-width dark strip. One-line bold statement, centered:

```
Not an agency. Not a freelancer. 
A scalable technology platform transforming how exhibitions are planned and delivered.
```

Use `text-2xl md:text-3xl font-semibold`. "Not an agency. Not a freelancer." in --text-muted with strikethrough. The main claim in white.

---

#### SECTION 1.3 — PROBLEM SECTION

**Label:** `THE PROBLEM`
**H2:** `A Multi-Billion Industry Running on Manual Processes`
**Body text:**
```
The global exhibition industry generates over €48 billion in annual revenue. 
Yet the workflows that drive it — lead sourcing, stand design, contractor 
coordination, follow-up — remain entirely manual, fragmented, and disconnected.

Companies spend £40,000–£80,000 on a single exhibition stand with no digital 
strategy, no automated follow-up, and no intelligence layer to measure ROI. 
The problem isn't budget. It's infrastructure.
```

**Three problem cards (grid):**
1. **Fragmented Discovery** — No centralised system to identify the right exhibitions or target the right exhibitors
2. **Slow Concept Cycles** — Stand design approval takes weeks of manual iteration, delaying sales cycles
3. **Zero Commercial Layer** — Post-exhibition, companies have no automation to convert contacts into pipeline

Cards: dark bg-card, border, icon (Lucide), title, body. On hover: border changes to accent colour.

---

#### SECTION 1.4 — SOLUTION SECTION

**Label:** `THE SOLUTION`
**H2:** `A Unified Digital Layer for Exhibitions`
**Body:**
```
Adesso integrates data intelligence, artificial intelligence, and workflow 
automation into a single platform. From opportunity discovery through to 
stand delivery and post-show pipeline management — in one system.
```

**Visual:** A horizontal flow diagram showing:
`[Exhibition Data] → [AI Processing] → [Lead Intelligence] → [Stand Generation] → [Automation & CRM] → [Revenue]`

Build this as an SVG or styled div component with connecting arrows and animated pulse dots between nodes. Use accent blue throughout.

---

#### SECTION 1.5 — PLATFORM MODULES

**Label:** `THE PLATFORM`
**H2:** `Four Modules. One Integrated System.`

Four cards in a 2x2 grid (desktop), stacked (mobile):

**Module 1: Exhibition Lead Intelligence**
- Icon: Database
- Label: `Module 01`
- Title: `Exhibition Lead Intelligence`
- Body: `Structured data from European exhibitions — exhibitor profiles, event insights, decision-maker contacts, and targeted lead scoring. Updated continuously.`
- Tag: `Live`

**Module 2: AI Stand Concept Generator**
- Icon: Sparkles
- Label: `Module 02`
- Title: `AI Stand Concept Generator`
- Body: `Generate exhibition stand concepts using AI in minutes. Trained on thousands of exhibition environments. Accelerates sales cycles and client approval rates.`
- Tag: `Beta`

**Module 3: Automation & Pipeline CRM**
- Icon: Workflow
- Label: `Module 03`
- Title: `Automation & Pipeline CRM`
- Body: `Unified system for managing leads, automating outreach sequences, and tracking project pipelines from initial contact to post-show follow-up.`
- Tag: `Live`

**Module 4: Exhibition Marketplace**
- Icon: Globe
- Label: `Module 04`
- Title: `Exhibition Marketplace`
- Body: `A two-sided marketplace connecting brands, stand designers, and builders across Europe. Verified supplier network with integrated project management.`
- Tag: `2027`

Tag styling: small pill badge. "Live" = green. "Beta" = blue. "2027" = muted.

---

#### SECTION 1.6 — BUSINESS MODEL

**Label:** `BUSINESS MODEL`
**H2:** `Built for Scale`
**Body:**
```
Adesso operates on a subscription-based model, providing tiered access to 
data intelligence, AI tools, and automation systems. Revenue is diversified 
across SaaS subscriptions, premium data services, and marketplace transaction fees.
```

Three revenue pillars in horizontal cards:
1. **SaaS Subscriptions** — Monthly/annual platform access. Starter, Growth, Enterprise tiers
2. **Data Products** — Premium lead databases, sector reports, exhibitor intelligence packs
3. **Marketplace Fees** — Transaction-based revenue from supplier connections and project placements

---

#### SECTION 1.7 — TRACTION / EARLY SIGNALS

**Label:** `TRACTION`
**H2:** `Early Signals`

Metric cards (horizontal row):
- `3,200+` Exhibition data points indexed
- `€48B` Addressable market
- `47` Early access registrations
- `12` Countries covered

Below metrics, a quote block:
```
"The exhibition industry is ready for this. We've been waiting for 
someone to build the infrastructure layer." 
— Beta User, UK Event Marketing Director
```

---

#### SECTION 1.8 — VISION

**Label:** `VISION`
**H2:** `Our Vision`
**Statement (large, centered, italic):**
```
"To become the leading digital infrastructure powering 
the global exhibition industry."
```

---

#### SECTION 1.9 — FOUNDER

Two-column layout. Left: photo placeholder (styled div with initials "BC" if no image available — use the `/bruno-castro.jpg` path from the existing site). Right: text.

**Name:** Bruno Castro
**Title:** Founder & CEO, Adesso

**Bio:**
```
Bruno Castro spent over a decade working on European exhibition floors — 
managing stand builds, coordinating logistics, and helping B2B brands present 
at trade shows from London to Frankfurt.

What he identified was consistent: an industry generating billions annually 
with no digital infrastructure. No intelligence layer. No automation. 
No scalable systems.

Adesso was founded to build that infrastructure — starting with the UK, 
scaling across Europe.
```

**Credentials (icon list):**
- 10+ years exhibition industry experience
- Technical specialist: CAD, LED systems, event production
- UK-based, EU market expertise
- Registered company: England & Wales

---

#### SECTION 1.10 — CTA / CONTACT PREVIEW

Dark section, centered. 

**H2:** `Join the Early Access Programme`
**Body:** `Be among the first companies to access Adesso's platform. Limited early access available for UK and European exhibition professionals.`
**Button:** "Request Early Access →" (large, solid accent)
**Below button (small text):** `No commitment. We'll reach out within 24 hours.`

---

### PAGE 2: ABOUT `/about`

#### Section: Company Story

**H1:** `About Adesso`

**Mission statement (large, styled):**
```
Building the digital infrastructure the exhibition industry never had.
```

**Full company narrative (3 paragraphs):**

Para 1:
```
Adesso was founded to solve a fundamental gap in the exhibition industry: 
the absence of a unified digital system connecting opportunity discovery, 
intelligent design, and commercial delivery.
```

Para 2:
```
While industries such as real estate, finance, and e-commerce have undergone 
complete digital transformation — with platforms, data layers, and automation 
as standard — the exhibition sector remains largely manual and fragmented. 
Event organisers, stand builders, and exhibiting brands all operate in silos, 
with no shared intelligence infrastructure.
```

Para 3:
```
Adesso is building a scalable platform that integrates data intelligence, 
artificial intelligence, and workflow automation to connect every stage of 
the exhibition process. From identifying the right exhibitors to generating 
stand concepts and managing commercial pipeline — Adesso provides the complete 
digital layer exhibition professionals have needed for decades.
```

#### Section: Why This Matters

Three-column stat cards with supporting text:
- **€48 Billion** — Global exhibition industry annual revenue
- **Fragmented** — No dominant digital platform exists in this space
- **Timing** — Post-pandemic digitisation urgency creates a critical window

#### Section: Registered Business

Include a clean info block:
```
ADESSO DIGITAL LTD
Registered in England & Wales
Operating from: London, United Kingdom
Focus: European B2B exhibition market
Stage: Early-stage / Pre-seed
```

---

### PAGE 3: TECHNOLOGY `/technology`

**Critical page for visa — demonstrates genuine technical innovation.**

#### H1: `Technology`
#### Subtitle: `How Adesso processes, analyses, and activates exhibition data at scale`

---

#### Section 3.1 — Technical Overview

**Label:** `ARCHITECTURE`
**H2:** `Built on AI, Data, and Automation`

**Body:**
```
Adesso is built using a combination of data extraction systems, large language 
models, computer vision pipelines, and automation frameworks. The platform 
processes exhibition data at scale, transforming unstructured, fragmented 
information into structured, actionable intelligence.

This is not a traditional SaaS wrapper. Adesso's core technical advantage 
lies in its exhibition-specific data models, trained on years of industry 
data, enabling contextual AI outputs that generic tools cannot replicate.
```

---

#### Section 3.2 — Technical Stack (Visual)

Four tech pillars displayed as tall cards:

**Pillar 1: Data Extraction Layer**
```
Automated crawlers and structured parsers extract exhibitor data, event 
metadata, and market intelligence from across European exhibition ecosystems.

Technologies: Python, Puppeteer, BeautifulSoup, Supabase
```

**Pillar 2: AI Processing Engine**
```
Large language models fine-tuned on exhibition industry data process 
unstructured inputs and generate contextual outputs — stand concepts, 
outreach copy, sector analysis reports.

Technologies: Anthropic Claude API, OpenAI, custom prompt engineering
```

**Pillar 3: Automation Framework**
```
Multi-step automation workflows handle lead enrichment, outreach sequencing, 
CRM synchronisation, and project state management without manual intervention.

Technologies: n8n, Make, custom API integrations, webhook systems
```

**Pillar 4: Platform Infrastructure**
```
Cloud-native, serverless architecture built for scalability from day one. 
Deployed on Vercel Edge Network with global CDN and sub-100ms response times.

Technologies: Next.js 14, TypeScript, Supabase (PostgreSQL), Vercel, Resend
```

---

#### Section 3.3 — AI Stand Concept Generator (Deep Dive)

**H2:** `AI Stand Concept Generator`
**Label:** `CORE INNOVATION`

**Technical explanation:**
```
The AI Stand Concept Generator is Adesso's primary proprietary innovation. 
It combines:

1. Exhibition brief ingestion — parsing client inputs (industry, budget, 
   stand size, brand guidelines) into structured prompts
   
2. Industry-trained context — a knowledge base of exhibition design principles, 
   spatial constraints, and European regulatory requirements
   
3. Multi-modal AI generation — producing visual concepts, spatial layouts, 
   and material specifications simultaneously
   
4. Iteration engine — enabling rapid concept variants without designer 
   involvement, reducing approval cycles from weeks to hours
```

**Impact metrics:**
- Stand concept generation: `48 hours → 20 minutes`
- Client approval cycles: `3–4 rounds → 1–2 rounds`  
- Designer time per concept: `12 hours → 2 hours`

---

#### Section 3.4 — Data Intelligence Architecture

**H2:** `Exhibition Lead Intelligence`

**Body:**
```
The Intelligence module aggregates and structures data from across the 
European exhibition ecosystem — event programmes, exhibitor directories, 
floor plans, sector classifications, and historical participation records.

This data is processed through Adesso's proprietary scoring model, which 
ranks leads by relevance, intent signals, and commercial potential — 
providing sales teams with prioritised, actionable intelligence rather 
than raw data dumps.
```

**Data pipeline visual (flowchart):**
```
[Raw Sources] → [Extraction] → [Normalisation] → [Enrichment] → [Scoring] → [Platform Output]
```

Build this as a horizontal SVG flow with labelled nodes.

---

### PAGE 4: PLATFORM `/platform`

**H1:** `Platform Overview`
**Subtitle:** `A complete operating system for exhibition professionals`

For each of the four modules, create a full-detail section:

#### Module Detail Layout (repeat x4):
- Large module number (01, 02, 03, 04) in accent colour
- Module name as H2
- Status badge (Live / Beta / Coming 2027)
- 2-paragraph detailed description
- Feature list (4–6 bullets with checkmark icons)
- "Who it's for" subsection
- Screenshot placeholder (dark UI mockup div)

**Module 01: Exhibition Lead Intelligence**
Features:
- ✓ European exhibition database (10,000+ events)
- ✓ Exhibitor profiles with contact enrichment
- ✓ Sector and geography filtering
- ✓ Decision-maker identification and scoring
- ✓ Export to CRM / CSV / API
- ✓ Weekly data refresh cycle

Who it's for: Sales teams, marketing directors, and business development professionals at companies that exhibit or sell to exhibitors across European trade shows.

**Module 02: AI Stand Concept Generator**
Features:
- ✓ Brief-to-concept in under 30 minutes
- ✓ Multiple style variants per generation
- ✓ Budget-aware design parameters
- ✓ Regulatory compliance checking (EU event standards)
- ✓ Export to PDF presentation format
- ✓ Client review and approval workflow

Who it's for: Exhibition stand contractors, marketing teams managing stand procurement, and brand managers requiring fast visual approvals.

**Module 03: Automation & Pipeline CRM**
Features:
- ✓ Lead-to-project pipeline management
- ✓ Automated email and outreach sequences
- ✓ Multi-channel communication tracking
- ✓ Project milestone and deadline management
- ✓ Post-show follow-up automation
- ✓ Revenue and conversion reporting

Who it's for: Exhibition contractors, event agencies, and B2B marketing teams managing multiple concurrent exhibition projects.

**Module 04: Exhibition Marketplace** *(Coming 2027)*
Features:
- ✓ Verified supplier network (designers, builders, logistics)
- ✓ Project brief publication and bidding
- ✓ Integrated contract and payment management
- ✓ Supplier rating and review system
- ✓ Pan-European coverage
- ✓ API for enterprise integration

Who it's for: Brands seeking verified exhibition suppliers, and stand contractors seeking qualified project briefs across Europe.

---

### PAGE 5: ROADMAP `/roadmap`

**Critical for visa — demonstrates viability and scalability plans.**

**H1:** `Roadmap`
**Subtitle:** `Adesso's development trajectory from UK launch to global platform`

Build a **vertical timeline** component. Each phase has: year label (large, accent), phase name, status badge, and bullet list of milestones.

---

**Phase 1: 2026 — UK Foundation**
Status: `IN PROGRESS`

- Platform development and infrastructure build
- Launch of Lead Intelligence module (UK focus)
- AI Stand Concept Generator beta programme
- Initial user acquisition: 50–100 paying subscribers
- Seed funding round preparation
- Data collection and indexing: UK + German exhibitions
- Regulatory and compliance framework established

**Phase 2: 2027 — European Expansion**
Status: `PLANNED`

- Scaling lead intelligence to cover all major EU exhibitions
- Full public launch of AI Stand Concept Generator
- Automation & CRM module full release
- Strategic partnerships with exhibition organisers (Messe Frankfurt, NEC Group)
- Target: 500+ subscribers, €300K ARR
- Series A fundraise preparation
- Team expansion: engineering, data, sales

**Phase 3: 2028 — Global Platform**
Status: `VISION`

- Exhibition Marketplace launch (two-sided)
- Expansion to North American and Asian markets
- Enterprise tier with custom API access
- Third-party developer ecosystem
- Target: 2,000+ subscribers, €1M+ ARR
- Platform becomes industry standard infrastructure

---

**Below timeline, add a "Why This Timeline" section:**

```
This roadmap is designed around three principles:

Validation first — the UK market provides a dense, accessible testing ground 
before European scale. London alone hosts dozens of major exhibitions annually.

Infrastructure before marketplace — data and AI modules must be proven before 
launching the marketplace, which requires network effects to function.

Capital efficiency — the subscription model generates revenue from day one, 
reducing dependency on external funding during the critical build phase.
```

---

### PAGE 6: WHY ADESSO `/why-adesso`

**H1:** `Why Adesso Exists`

#### Section: The Gap

**Large statement:**
```
The exhibition industry generates billions in annual revenue globally.
It has no digital infrastructure.
```

**Body:**
```
Every major industry vertical has been transformed by technology platforms 
— real estate by Rightmove and Zoopla, hospitality by Booking.com, 
recruitment by LinkedIn. The exhibition industry — a sector responsible for 
connecting businesses, launching products, and generating billions in B2B 
commerce — has no equivalent.

Adesso exists to build it.
```

#### Section: The Opportunity

Three-column opportunity cards:

**Market Size**
```
The global exhibition industry is valued at over €48 billion annually. 
The UK market alone accounts for £11 billion. No dominant SaaS platform 
exists in this space — Adesso is entering an uncontested vertical.
```

**Technology Window**
```
The convergence of large language models, computer vision, and scalable 
cloud infrastructure makes it possible — for the first time — to automate 
exhibition design and intelligence at a cost that works for SMEs and 
enterprise clients alike.
```

**Founder-Market Fit**
```
Adesso's founder spent over a decade working inside the exhibition industry. 
This is not a technology solution looking for a problem. It is a deeply 
understood industry problem being solved by someone with direct operational 
experience and technical capability.
```

#### Section: Competitive Landscape

Table comparing Adesso vs alternatives:

| | **Adesso** | Traditional Agency | Freelancer | Generic CRM |
|---|---|---|---|---|
| Exhibition-specific AI | ✓ | ✗ | ✗ | ✗ |
| Lead intelligence data | ✓ | ✗ | ✗ | ✗ |
| Scalable / subscription | ✓ | ✗ | ✗ | Partial |
| Automated workflows | ✓ | ✗ | ✗ | ✓ |
| Industry expertise | ✓ | Partial | Partial | ✗ |
| European coverage | ✓ | Limited | ✗ | ✗ |

Style the table with dark bg-card rows, border separators, and ✓ in accent green, ✗ in muted red.

#### Section: The Innovation Case

```
Adesso qualifies as genuinely innovative because it does not replicate 
an existing product in a new market. It creates a new category — 
exhibition intelligence infrastructure — by combining:

• Proprietary data collection from fragmented exhibition ecosystems
• AI models trained and contextualised for exhibition-specific outputs  
• Workflow automation designed around exhibition industry timelines
• A marketplace model that creates network effects as it scales

This is not a repackaged agency. This is category creation.
```

---

### PAGE 7: CONTACT `/contact`

**H1:** `Get in Touch`
**Subtitle:** `Whether you're an exhibition professional, investor, or potential partner — we want to hear from you.`

**Contact form fields:**
- Name (required)
- Email (required)
- Company (required)
- Role (select: Exhibitor / Stand Contractor / Event Organiser / Investor / Other)
- Message (textarea, required)
- Submit: "Send Message"

Form validation: client-side with clear error states. On submit: POST to API route `/api/contact` using Resend to `hello@adesso.digital`.

**Alongside form:**
- Email: hello@adesso.digital
- Location: London, United Kingdom
- Response time: Within 24 hours

**Second CTA below form:**
```
Interested in early access?
Join the waitlist and be first to know when Adesso launches.
```
Email input + "Join Waitlist" button. Store to Supabase `waitlist` table.

---

## GLOBAL COMPONENTS

### Navbar
```
[ADESSO logo] ........... [Home] [Platform] [Technology] [Roadmap] [About] ........... [Request Access →]
```
- Sticky, dark bg with backdrop-blur
- Mobile: hamburger menu, full-screen overlay
- Active page indicator: accent underline
- "Request Access" button: solid accent, rounded-sm

### Footer
Three columns:
- Col 1: Logo + tagline ("AI Infrastructure for the Exhibition Industry") + social links (LinkedIn)
- Col 2: Navigation links grouped
- Col 3: Company info (Registered in England & Wales, London UK)

Below footer rule: `© 2026 Adesso Digital Ltd. All rights reserved. Registered in England & Wales.`

### Shared Components

**SectionLabel component:**
```tsx
// Small all-caps label above section headings
// Styles: text-xs tracking-widest font-mono text-accent uppercase
```

**MetricCard component:**
```tsx
// Large number + label
// Number: text-4xl font-bold text-white
// Label: text-sm text-muted
```

**ModuleCard component:**
```tsx
// Dark card with number, title, status badge, body, features list
// Hover: border-accent, subtle glow
```

---

## BANNED CONTENT — REMOVE EVERYTHING

The following must **not appear anywhere** in the site:

- ❌ "freelancer" or "freelance support"
- ❌ "deliberately small"
- ❌ "no account managers"  
- ❌ "no project management layers"
- ❌ "cheap", "low cost", "affordable", "quick turnaround"
- ❌ Prices (£49, £299) — remove all pricing from public-facing pages
- ❌ "four divisions" framing — replace with "platform modules"
- ❌ Testimonials with unverified names (Marco Bianchi, Sarah Williams, Lars Müller) — remove entirely or replace with anonymised beta user quotes
- ❌ "Quote on request" as a CTA
- ❌ Agency language ("work with us", "we deliver", "our clients")

---

## REQUIRED KEYWORDS

These must appear naturally throughout the copy:

- ✅ AI-powered
- ✅ scalable platform
- ✅ automation
- ✅ data-driven
- ✅ infrastructure
- ✅ technology
- ✅ innovation
- ✅ subscription
- ✅ intelligence
- ✅ proprietary

---

## SEO & META

Each page must have:

```tsx
// app/layout.tsx — default metadata
export const metadata: Metadata = {
  title: 'Adesso — AI Infrastructure for the Exhibition Industry',
  description: 'Adesso is building a data-driven platform for exhibition intelligence, AI stand generation, and workflow automation. UK-based, European scale.',
  openGraph: {
    title: 'Adesso — AI Infrastructure for the Exhibition Industry',
    description: '...',
    url: 'https://www.adessoexhibition.co.uk',
    siteName: 'Adesso',
  }
}
```

Page-specific titles:
- `/about` → `About Adesso | AI Platform for Exhibitions`
- `/technology` → `Technology | How Adesso Works`
- `/platform` → `Platform | Adesso Modules`
- `/roadmap` → `Roadmap 2026–2028 | Adesso`
- `/why-adesso` → `Why Adesso | The Innovation Case`
- `/contact` → `Contact | Adesso`

---

## CONTACT FORM API ROUTE

```typescript
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { name, email, company, role, message } = await req.json()
  
  await resend.emails.send({
    from: 'Adesso Contact <noreply@adessoexhibition.co.uk>',
    to: 'hello@adesso.digital',
    subject: `New enquiry from ${name} — ${company}`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Message:</strong> ${message}</p>
    `
  })
  
  return Response.json({ success: true })
}
```

---

## WAITLIST API ROUTE

```typescript
// app/api/waitlist/route.ts
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const { email } = await req.json()
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  await supabase.from('waitlist').insert({ email, created_at: new Date().toISOString() })
  return Response.json({ success: true })
}
```

---

## ENVIRONMENT VARIABLES

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
```

---

## EXECUTION RULES

1. **Zero placeholders.** Every section must have real copy from this brief.
2. **Zero TODOs.** All components must be fully implemented.
3. **Every page fully built.** No "coming soon" page stubs.
4. **TypeScript strict.** No `any` types. Proper interfaces for all data.
5. **Mobile responsive.** Test all breakpoints: 375px, 768px, 1280px.
6. **No console errors.** Clean build with `next build` before delivery.
7. **Animation performance.** All Framer Motion animations must use `will-change: transform` and avoid layout-triggering properties.
8. **Accessibility.** All interactive elements have `aria-label`. Colour contrast AA compliant.

---

## STRATEGIC NOTE FOR CLAUDE CODE

This website is the primary digital evidence for a **UK Innovator Founder Visa** application. Every design decision, every word choice, and every structural element should reinforce three things:

1. **This is an innovative technology company** — not a freelancer, not an agency
2. **This is built to scale** — subscription model, platform architecture, marketplace vision
3. **The founder has unique expertise** — industry insider turned tech innovator

Build with this weight in mind. The visa assessor will scrutinise this site.
