// Pure schema constants — safe to import in both server and client components

export type ContentType = "text" | "image" | "textarea" | "url";

export interface ContentField {
  label: string;
  type: ContentType;
  default: string;
  placeholder?: string;
}

export interface ContentSection {
  label: string;
  fields: Record<string, ContentField>;
}

export interface ContentPage {
  label: string;
  path: string;
  app?: string;
  sections: Record<string, ContentSection>;
}

export const CONTENT_SCHEMA: Record<string, ContentPage> = {

  // ────────────────────────────────────────
  // HOMEPAGE
  // ────────────────────────────────────────
  home: {
    label: "Homepage",
    path: "/",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          badge:        { label: "Badge Text",          type: "text",     default: "Now in Early Access — UK Innovator Founder Programme" },
          h1_line1:     { label: "Headline Line 1",     type: "text",     default: "AI Infrastructure" },
          h1_line2:     { label: "Headline Line 2",     type: "text",     default: "for the Exhibition Industry" },
          subtitle:     { label: "Subtitle",            type: "textarea", default: "Adesso is building a data-driven platform that enables companies to discover exhibition opportunities, generate AI-powered stand concepts, and deliver projects through intelligent automation — at scale." },
          cta_primary:  { label: "Primary CTA",         type: "text",     default: "Request Early Access" },
          cta_secondary:{ label: "Secondary CTA",       type: "text",     default: "See the Platform →" },
          stat1_value:  { label: "Stat 1 — Value",      type: "text",     default: "€48B" },
          stat1_label:  { label: "Stat 1 — Label",      type: "text",     default: "Global Market" },
          stat2_value:  { label: "Stat 2 — Value",      type: "text",     default: "Manual" },
          stat2_label:  { label: "Stat 2 — Label",      type: "text",     default: "Current State" },
          stat3_value:  { label: "Stat 3 — Value",      type: "text",     default: "2026" },
          stat3_label:  { label: "Stat 3 — Label",      type: "text",     default: "UK Launch" },
        },
      },
      positioning: {
        label: "Positioning Strip",
        fields: {
          strikethrough: { label: "Strikethrough Text", type: "text", default: "Not an agency. Not a freelancer." },
          statement:     { label: "Main Statement",     type: "text", default: "A scalable technology platform transforming how exhibitions are planned and delivered." },
        },
      },
      problem: {
        label: "Problem Section",
        fields: {
          label:  { label: "Section Label",   type: "text",     default: "The Problem" },
          h2:     { label: "Heading",         type: "text",     default: "A Multi-Billion Industry Running on Manual Processes" },
          body1:  { label: "Body Paragraph 1",type: "textarea", default: "The global exhibition industry generates over €48 billion in annual revenue. Yet the workflows that drive it — lead sourcing, stand design, contractor coordination, follow-up — remain entirely manual, fragmented, and disconnected." },
          body2:  { label: "Body Paragraph 2",type: "textarea", default: "Companies spend £40,000–£80,000 on a single exhibition stand with no digital strategy, no automated follow-up, and no intelligence layer to measure ROI. The problem isn't budget. It's infrastructure." },
        },
      },
      traction: {
        label: "Traction / Early Signals",
        fields: {
          label:          { label: "Section Label",      type: "text", default: "Traction" },
          h2:             { label: "Heading",            type: "text", default: "Early Signals" },
          metric1_value:  { label: "Metric 1 — Value",  type: "text", default: "3,200+" },
          metric1_label:  { label: "Metric 1 — Label",  type: "text", default: "Exhibition data points indexed" },
          metric2_value:  { label: "Metric 2 — Value",  type: "text", default: "€48B" },
          metric2_label:  { label: "Metric 2 — Label",  type: "text", default: "Addressable market" },
          metric3_value:  { label: "Metric 3 — Value",  type: "text", default: "47" },
          metric3_label:  { label: "Metric 3 — Label",  type: "text", default: "Early access registrations" },
          metric4_value:  { label: "Metric 4 — Value",  type: "text", default: "12" },
          metric4_label:  { label: "Metric 4 — Label",  type: "text", default: "Countries covered" },
          quote_text:     { label: "Quote Text",        type: "textarea", default: "The exhibition industry is ready for this. We've been waiting for someone to build the infrastructure layer." },
          quote_author:   { label: "Quote Author",      type: "text", default: "Beta User, UK Event Marketing Director" },
        },
      },
      vision: {
        label: "Vision Section",
        fields: {
          label:     { label: "Section Label", type: "text",     default: "Vision" },
          h2:        { label: "Heading",       type: "text",     default: "Our Vision" },
          statement: { label: "Vision Statement", type: "textarea", default: "To become the leading digital infrastructure powering the global exhibition industry." },
        },
      },
      founder: {
        label: "Founder Section",
        fields: {
          photo:   { label: "Photo URL",          type: "image",    default: "/bruno-castro.jpg" },
          name:    { label: "Name",               type: "text",     default: "Bruno Castro" },
          title:   { label: "Title",              type: "text",     default: "Founder & CEO, Adesso" },
          bio1:    { label: "Bio — Paragraph 1",  type: "textarea", default: "Bruno Castro spent over a decade working on European exhibition floors — managing stand builds, coordinating logistics, and helping B2B brands present at trade shows from London to Frankfurt." },
          bio2:    { label: "Bio — Paragraph 2",  type: "textarea", default: "What he identified was consistent: an industry generating billions annually with no digital infrastructure. No intelligence layer. No automation. No scalable systems." },
          bio3:    { label: "Bio — Paragraph 3",  type: "textarea", default: "Adesso was founded to build that infrastructure — starting with the UK, scaling across Europe." },
        },
      },
      cta: {
        label: "Early Access CTA",
        fields: {
          h2:          { label: "Heading",       type: "text",     default: "Join the Early Access Programme" },
          body:        { label: "Body",          type: "textarea", default: "Be among the first companies to access Adesso's platform. Limited early access available for UK and European exhibition professionals." },
          cta_label:   { label: "Button Text",   type: "text",     default: "Request Early Access →" },
          footer_note: { label: "Footer Note",   type: "text",     default: "No commitment. We'll reach out within 24 hours." },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // ABOUT
  // ────────────────────────────────────────
  about: {
    label: "About",
    path: "/about",
    sections: {
      hero: {
        label: "Hero",
        fields: {
          h1:      { label: "Headline",       type: "text",     default: "Building the digital infrastructure the exhibition industry never had." },
          mission: { label: "Mission Quote",  type: "textarea", default: "A unified platform connecting opportunity discovery, intelligent design, and commercial delivery — purpose-built for the exhibition industry." },
        },
      },
      story: {
        label: "Company Story",
        fields: {
          h2:    { label: "Heading",         type: "text",     default: "Why Adesso Exists" },
          para1: { label: "Paragraph 1",     type: "textarea", default: "Adesso was founded to solve a fundamental gap in the exhibition industry: the absence of a unified digital system connecting opportunity discovery, intelligent design, and commercial delivery." },
          para2: { label: "Paragraph 2",     type: "textarea", default: "While industries such as real estate, finance, and e-commerce have undergone complete digital transformation — with platforms, data layers, and automation as standard — the exhibition sector remains largely manual and fragmented." },
          para3: { label: "Paragraph 3",     type: "textarea", default: "Adesso is building a scalable platform that integrates data intelligence, artificial intelligence, and workflow automation to connect every stage of the exhibition process." },
        },
      },
      company: {
        label: "Company Details",
        fields: {
          legal_name:  { label: "Legal Name",      type: "text", default: "ADESSO DIGITAL LTD" },
          registered:  { label: "Registered In",   type: "text", default: "England & Wales" },
          location:    { label: "Operating From",  type: "text", default: "London, United Kingdom" },
          market:      { label: "Market Focus",    type: "text", default: "European B2B Exhibition Market" },
          stage:       { label: "Stage",           type: "text", default: "Early-stage / Pre-seed" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // TECHNOLOGY
  // ────────────────────────────────────────
  technology: {
    label: "Technology",
    path: "/technology",
    sections: {
      hero: {
        label: "Hero",
        fields: {
          h1_line1: { label: "Headline Line 1",   type: "text",     default: "How Adesso Processes," },
          h1_line2: { label: "Headline Line 2",   type: "text",     default: "Analyses, and Activates Exhibition Data" },
          subtitle: { label: "Subtitle",          type: "textarea", default: "A proprietary AI and data infrastructure stack purpose-built for the exhibition industry — not adapted from generic tools." },
        },
      },
      overview: {
        label: "Technical Overview",
        fields: {
          h2:    { label: "Heading",        type: "text",     default: "Built on AI, Data, and Automation" },
          body1: { label: "Paragraph 1",   type: "textarea", default: "Adesso is built using a combination of data extraction systems, large language models, computer vision pipelines, and automation frameworks. The platform processes exhibition data at scale, transforming unstructured, fragmented information into structured, actionable intelligence." },
          body2: { label: "Paragraph 2",   type: "textarea", default: "This is not a traditional SaaS wrapper. Adesso's core technical advantage lies in its exhibition-specific data models, trained on years of industry data, enabling contextual AI outputs that generic tools cannot replicate." },
        },
      },
      ai_generator: {
        label: "AI Stand Concept Generator",
        fields: {
          h2:              { label: "Heading",                   type: "text",     default: "AI Stand Concept Generator" },
          metric1_before:  { label: "Metric 1 — Before",        type: "text",     default: "48 hours" },
          metric1_after:   { label: "Metric 1 — After",         type: "text",     default: "20 minutes" },
          metric1_label:   { label: "Metric 1 — Label",         type: "text",     default: "Stand concept generation" },
          metric2_before:  { label: "Metric 2 — Before",        type: "text",     default: "3–4 rounds" },
          metric2_after:   { label: "Metric 2 — After",         type: "text",     default: "1–2 rounds" },
          metric2_label:   { label: "Metric 2 — Label",         type: "text",     default: "Client approval cycles" },
          metric3_before:  { label: "Metric 3 — Before",        type: "text",     default: "12 hours" },
          metric3_after:   { label: "Metric 3 — After",         type: "text",     default: "2 hours" },
          metric3_label:   { label: "Metric 3 — Label",         type: "text",     default: "Designer time per concept" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // PLATFORM
  // ────────────────────────────────────────
  platform: {
    label: "Platform",
    path: "/platform",
    sections: {
      hero: {
        label: "Hero",
        fields: {
          h1:       { label: "Headline",  type: "text",     default: "Platform Overview" },
          subtitle: { label: "Subtitle",  type: "textarea", default: "A complete operating system for exhibition professionals" },
        },
      },
      module01: {
        label: "Module 01 — Lead Intelligence",
        fields: {
          name:        { label: "Module Name",   type: "text",     default: "Exhibition Lead Intelligence" },
          status:      { label: "Status Badge",  type: "text",     default: "Live" },
          desc1:       { label: "Description 1", type: "textarea", default: "The Lead Intelligence module aggregates and structures data from across the European exhibition ecosystem. Event programmes, exhibitor directories, floor plans, sector classifications, and historical participation records are processed through Adesso's proprietary scoring model." },
          desc2:       { label: "Description 2", type: "textarea", default: "This data is then ranked by relevance, intent signals, and commercial potential — providing sales teams with prioritised, actionable intelligence rather than raw data dumps. Updated weekly, it remains the freshest source of exhibition intelligence available." },
          for_whom:    { label: "Who It's For",  type: "textarea", default: "Sales teams, marketing directors, and business development professionals at companies that exhibit or sell to exhibitors across European trade shows." },
        },
      },
      module02: {
        label: "Module 02 — AI Concept Generator",
        fields: {
          name:        { label: "Module Name",   type: "text",     default: "AI Stand Concept Generator" },
          status:      { label: "Status Badge",  type: "text",     default: "Beta" },
          desc1:       { label: "Description 1", type: "textarea", default: "The AI Stand Concept Generator is Adesso's primary proprietary innovation. It combines exhibition brief ingestion, industry-trained context, and multi-modal AI generation to produce visual concepts, spatial layouts, and material specifications simultaneously." },
          desc2:       { label: "Description 2", type: "textarea", default: "By automating the initial concept stage, the module reduces stand design timelines from weeks to hours. Sales teams can generate multiple concept variants for client review without designer involvement — accelerating approval cycles and increasing win rates." },
          for_whom:    { label: "Who It's For",  type: "textarea", default: "Exhibition stand contractors, marketing teams managing stand procurement, and brand managers requiring fast visual approvals." },
        },
      },
      module03: {
        label: "Module 03 — Automation & CRM",
        fields: {
          name:        { label: "Module Name",   type: "text",     default: "Automation & Pipeline CRM" },
          status:      { label: "Status Badge",  type: "text",     default: "Live" },
          desc1:       { label: "Description 1", type: "textarea", default: "The Automation & CRM module provides a unified system for managing the complete lifecycle of an exhibition project. From initial lead capture through to post-show follow-up, every touchpoint is automated and tracked in a single pipeline." },
          desc2:       { label: "Description 2", type: "textarea", default: "Unlike generic CRM platforms, Adesso's automation system is built around exhibition industry timelines — pre-show outreach windows, on-site engagement periods, and post-show conversion sequences are all pre-configured." },
          for_whom:    { label: "Who It's For",  type: "textarea", default: "Exhibition contractors, event agencies, and B2B marketing teams managing multiple concurrent exhibition projects." },
        },
      },
      module04: {
        label: "Module 04 — Marketplace",
        fields: {
          name:        { label: "Module Name",   type: "text",     default: "Exhibition Marketplace" },
          status:      { label: "Status Badge",  type: "text",     default: "Coming 2027" },
          desc1:       { label: "Description 1", type: "textarea", default: "The Exhibition Marketplace will be a two-sided platform connecting brands that need exhibition stands with verified designers, builders, and logistics providers across Europe. Project briefs are published, suppliers bid, and the entire engagement is managed within Adesso." },
          desc2:       { label: "Description 2", type: "textarea", default: "The Marketplace creates network effects that compound as the platform grows — more verified suppliers attract more brands, and more brand activity attracts more suppliers. Launching in 2027 once the data and AI modules have established critical mass." },
          for_whom:    { label: "Who It's For",  type: "textarea", default: "Brands seeking verified exhibition suppliers, and stand contractors seeking qualified project briefs across Europe." },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // ROADMAP
  // ────────────────────────────────────────
  roadmap: {
    label: "Roadmap",
    path: "/roadmap",
    sections: {
      hero: {
        label: "Hero",
        fields: {
          h1:       { label: "Headline", type: "text",     default: "Roadmap" },
          subtitle: { label: "Subtitle", type: "textarea", default: "Adesso's development trajectory from UK launch to global platform" },
        },
      },
      phase1: {
        label: "Phase 1 — 2026 UK Foundation",
        fields: {
          year:   { label: "Year",   type: "text",     default: "2026" },
          name:   { label: "Phase Name", type: "text", default: "UK Foundation" },
          badge:  { label: "Status Badge", type: "text", default: "In Progress" },
        },
      },
      phase2: {
        label: "Phase 2 — 2027 European Expansion",
        fields: {
          year:   { label: "Year",       type: "text", default: "2027" },
          name:   { label: "Phase Name", type: "text", default: "European Expansion" },
          target: { label: "ARR Target", type: "text", default: "€300K ARR" },
        },
      },
      phase3: {
        label: "Phase 3 — 2028 Global Platform",
        fields: {
          year:   { label: "Year",       type: "text", default: "2028" },
          name:   { label: "Phase Name", type: "text", default: "Global Platform" },
          target: { label: "ARR Target", type: "text", default: "€1M+ ARR" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // WHY ADESSO
  // ────────────────────────────────────────
  why_adesso: {
    label: "Why Adesso",
    path: "/why-adesso",
    sections: {
      hero: {
        label: "Hero",
        fields: {
          h1:        { label: "Headline",   type: "text",     default: "Why Adesso Exists" },
          statement: { label: "Statement",  type: "textarea", default: "The exhibition industry generates billions in annual revenue globally. It has no digital infrastructure." },
        },
      },
      gap: {
        label: "The Gap",
        fields: {
          h2:    { label: "Heading",     type: "text",     default: "The Gap" },
          body1: { label: "Paragraph 1", type: "textarea", default: "Every major industry vertical has been transformed by technology platforms — real estate by Rightmove and Zoopla, hospitality by Booking.com, recruitment by LinkedIn. The exhibition industry — a sector responsible for connecting businesses, launching products, and generating billions in B2B commerce — has no equivalent." },
          body2: { label: "Paragraph 2", type: "textarea", default: "Adesso exists to build it." },
        },
      },
      innovation: {
        label: "The Innovation Case",
        fields: {
          h2:      { label: "Heading",    type: "text",     default: "The Innovation Case" },
          body:    { label: "Body",       type: "textarea", default: "Adesso qualifies as genuinely innovative because it does not replicate an existing product in a new market. It creates a new category — exhibition intelligence infrastructure — by combining proprietary data collection, AI models trained for exhibition-specific outputs, workflow automation, and a marketplace model that creates network effects as it scales." },
          closing: { label: "Closing Statement", type: "text", default: "This is not a repackaged agency. This is category creation." },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // CONTACT
  // ────────────────────────────────────────
  contact: {
    label: "Contact",
    path: "/contact",
    sections: {
      hero: {
        label: "Page Header",
        fields: {
          h1:       { label: "Headline", type: "text",     default: "Get in Touch" },
          subtitle: { label: "Subtitle", type: "textarea", default: "Whether you're an exhibition professional, investor, or potential partner — we want to hear from you." },
        },
      },
      info: {
        label: "Contact Information",
        fields: {
          email:         { label: "Email",          type: "text", default: "hello@adesso.digital" },
          location:      { label: "Location",       type: "text", default: "London, United Kingdom" },
          response_time: { label: "Response Time",  type: "text", default: "Within 24 hours" },
        },
      },
      waitlist: {
        label: "Waitlist Section",
        fields: {
          h2:   { label: "Heading",  type: "text",     default: "Interested in early access?" },
          body: { label: "Body",     type: "textarea", default: "Join the waitlist and be first to know when Adesso launches." },
        },
      },
    },
  },

};
