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
  app?: string; // "main" | "exhibition" | "automation" | "leads" | "lab" — defaults to "main"
  sections: Record<string, ContentSection>;
}

export const CONTENT_SCHEMA: Record<string, ContentPage> = {

  // ────────────────────────────────────────
  // MAIN SITE (localhost:3000)
  // ────────────────────────────────────────
  home: {
    label: "Home", path: "/",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:         { label: "Background Image URL",    type: "image",    default: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85" },
          eyebrow:       { label: "Eyebrow Text",            type: "text",     default: "ADESSO Digital" },
          location:      { label: "Location Tag",            type: "text",     default: "London, United Kingdom" },
          title1:        { label: "Title Line 1",            type: "text",     default: "We build the digital" },
          title2:        { label: "Title Line 2",            type: "text",     default: "infrastructure for" },
          accent:        { label: "Accent Text",             type: "text",     default: "ambitious businesses." },
          subtitle:      { label: "Subtitle",                type: "textarea", default: "Stand design. Automation systems.\nLead databases. Digital products.\nADESSO delivers across four specialist divisions." },
          cta_primary:   { label: "Primary Button Text",     type: "text",     default: "Book a consultation" },
          cta_secondary: { label: "Secondary Button Text",   type: "text",     default: "Our divisions" },
          project_title:    { label: "Active Project — Title",    type: "text", default: "Frankfurt Exhibition Stand" },
          project_services: { label: "Active Project — Services", type: "text", default: "Design + 3D + On-site" },
          project_show:     { label: "Active Project — Show",     type: "text", default: "Automechanika 2025" },
        },
      },
      shows: {
        label: "Shows Strip",
        fields: {
          list: { label: "Shows (comma-separated)", type: "textarea", default: "Automechanika Frankfurt, Hannover Messe, DSEI London, Interpack Düsseldorf, Eurobike Frankfurt, MIPIM Cannes, Fachpack Nuremberg, Medica Düsseldorf, SPS Nuremberg, Intersolar Munich, Bauma Munich, Productronica Munich, Formnext Frankfurt, CES Las Vegas" },
        },
      },
      project: {
        label: "Active Project Card",
        fields: {
          title:    { label: "Project Title",    type: "text", default: "Frankfurt Exhibition Stand" },
          services: { label: "Services",         type: "text", default: "Design + 3D + On-site" },
          show:     { label: "Show / Event",     type: "text", default: "Automechanika 2025" },
        },
      },
      testimonials: {
        label: "Client Testimonials",
        fields: {
          t1_photo:   { label: "Client 1 — Photo URL",  type: "image",    default: "" },
          t1_name:    { label: "Client 1 — Name",        type: "text",     default: "Marco Bianchi" },
          t1_company: { label: "Client 1 — Company",     type: "text",     default: "TechExpo Italy" },
          t1_text:    { label: "Client 1 — Testimonial", type: "textarea", default: "ADESSO delivered a stand that exceeded every expectation. The 3D renders were so accurate we didn't need a single revision on-site." },
          t2_photo:   { label: "Client 2 — Photo URL",  type: "image",    default: "" },
          t2_name:    { label: "Client 2 — Name",        type: "text",     default: "Sarah Williams" },
          t2_company: { label: "Client 2 — Company",     type: "text",     default: "MedTech UK" },
          t2_text:    { label: "Client 2 — Testimonial", type: "textarea", default: "From first brief to final delivery, the process was completely transparent. Bruno was available throughout and the result was outstanding." },
          t3_photo:   { label: "Client 3 — Photo URL",  type: "image",    default: "" },
          t3_name:    { label: "Client 3 — Name",        type: "text",     default: "Lars Müller" },
          t3_company: { label: "Client 3 — Company",     type: "text",     default: "IndustrialGroup DE" },
          t3_text:    { label: "Client 3 — Testimonial", type: "textarea", default: "The lead intelligence data gave us a real edge at Hannover Messe. We had contact lists ready before competitors even started planning." },
        },
      },
      cta_banner: {
        label: "CTA Banner",
        fields: {
          image:    { label: "Background Image URL", type: "image",    default: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=85" },
          eyebrow:  { label: "Eyebrow",              type: "text",     default: "Start a Project" },
          title:    { label: "Title",                type: "text",     default: "Ready to work with us?" },
          subtitle: { label: "Subtitle",             type: "textarea", default: "Tell us what you're building. We'll tell you how we can help." },
          button:   { label: "Button Text",          type: "text",     default: "Start a Conversation" },
        },
      },
      founder: {
        label: "Founder Section",
        fields: {
          image:    { label: "Founder Photo URL", type: "image",    default: "/bruno-castro.jpg" },
          name:     { label: "Founder Name",      type: "text",     default: "Bruno Castro" },
          bio:      { label: "Bio",               type: "textarea", default: "Founder-led, deliberately small, and built for long-term client relationships. Bruno is available directly — no account manager, no intermediary." },
          whatsapp: { label: "WhatsApp Number",   type: "text",     default: "447470361422" },
        },
      },
    },
  },

  about: {
    label: "About", path: "/about",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:    { label: "Hero Background Image", type: "image",    default: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85" },
          title1:   { label: "Title Line 1",          type: "text",     default: "A studio built on" },
          accent:   { label: "Accent Text",           type: "text",     default: "real industry experience." },
          subtitle: { label: "Subtitle",              type: "textarea", default: "ADESSO was founded by Bruno Castro — an exhibition industry professional with over a decade of hands-on experience across stand design, event logistics, and B2B sales in Europe." },
        },
      },
      story: {
        label: "Story Section",
        fields: {
          image: { label: "Story Image", type: "image", default: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80" },
          title: { label: "Section Title", type: "text", default: "Why ADESSO exists" },
        },
      },
      founder: {
        label: "Founder Section",
        fields: {
          image:    { label: "Founder Photo URL", type: "image",    default: "/bruno-castro.jpg" },
          name:     { label: "Founder Name",      type: "text",     default: "Bruno Castro" },
          bio:      { label: "Bio",               type: "textarea", default: "Founder-led, deliberately small, and built for long-term client relationships. Bruno is available directly — no account manager, no intermediary." },
          whatsapp: { label: "WhatsApp Number",   type: "text",     default: "447470361422" },
        },
      },
    },
  },

  services: {
    label: "Services", path: "/services",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:    { label: "Hero Background Image", type: "image",    default: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85" },
          title1:   { label: "Title Line 1",          type: "text",     default: "Services &" },
          accent:   { label: "Accent Text",           type: "text",     default: "Capabilities" },
          subtitle: { label: "Subtitle",              type: "textarea", default: "Across three active divisions — Exhibition, Automation, and Lead Intelligence — we provide specialist services for B2B companies operating in competitive markets." },
        },
      },
      division_images: {
        label: "Division Card Images",
        fields: {
          img_exhibition: { label: "Exhibition Division — Image", type: "image", default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80" },
          img_automation: { label: "Automation Division — Image", type: "image", default: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=700&q=80" },
          img_leads:      { label: "Lead Intelligence — Image",   type: "image", default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80" },
        },
      },
    },
  },

  divisions: {
    label: "Divisions", path: "/divisions",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:  { label: "Hero Background Image", type: "image", default: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85" },
          title1: { label: "Title Line 1",          type: "text",  default: "Four specialist divisions." },
          accent: { label: "Accent Text",           type: "text",  default: "One integrated company." },
        },
      },
      card_images: {
        label: "Division Card Images",
        fields: {
          img_01: { label: "01 — Exhibition Card Image",     type: "image", default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80" },
          img_02: { label: "02 — Automation Card Image",     type: "image", default: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80" },
          img_03: { label: "03 — Lead Intelligence Image",   type: "image", default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80" },
          img_04: { label: "04 — Lab Card Image",            type: "image", default: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80" },
          img_05: { label: "05 — 3D Architecture Image",     type: "image", default: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80" },
        },
      },
    },
  },

  contact: {
    label: "Contact", path: "/contact",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1",    type: "text", default: "Let's talk" },
          accent:   { label: "Accent Text",     type: "text", default: "about your project." },
          email:    { label: "Contact Email",   type: "text", default: "hello@adesso.digital" },
          whatsapp: { label: "WhatsApp Number", type: "text", default: "447470361422" },
          location: { label: "Location",        type: "text", default: "London, United Kingdom" },
        },
      },
    },
  },

  products: {
    label: "Products", path: "/products",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:    { label: "Hero Background Image", type: "image",    default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=85" },
          title1:   { label: "Title Line 1",          type: "text",     default: "Things we've built." },
          accent:   { label: "Accent Text",           type: "text",     default: "Ready to use." },
          subtitle: { label: "Subtitle",              type: "textarea", default: "Alongside our bespoke services, ADESSO develops packaged products — fixed-price lead databases, automation bundles, and early-stage SaaS tools." },
        },
      },
    },
  },

  architecture_3d: {
    label: "3D Architecture", path: "/divisions/3d-architecture",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:         { label: "Background Image",   type: "image",    default: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=85" },
          title1:        { label: "Title Line 1",       type: "text",     default: "Where Architecture" },
          accent:        { label: "Accent Text",        type: "text",     default: "Meets Artistry." },
          subtitle:      { label: "Subtitle",           type: "textarea", default: "Photorealistic 3D visualisation for architects, developers, and real estate brands. From concept renders to cinematic animations — presentation-ready from day one." },
          cta_primary:   { label: "Primary Button",     type: "text",     default: "View Our Work" },
          cta_secondary: { label: "Secondary Button",   type: "text",     default: "Get a Quote" },
        },
      },
      services: {
        label: "Services Section",
        fields: {
          heading:    { label: "Section Heading",  type: "text",     default: "What We Deliver" },
          subheading: { label: "Section Subtitle", type: "textarea", default: "Every deliverable is crafted to the highest visual standard — built for investor decks, planning submissions, and sales campaigns." },
        },
      },
      process: {
        label: "Process Section",
        fields: {
          heading:     { label: "Section Heading",    type: "text", default: "How It Works" },
          step1_title: { label: "Step 1 Title",       type: "text", default: "Brief & Scope" },
          step1_desc:  { label: "Step 1 Description", type: "textarea", default: "You share your plans, references, and project goals. We assess scope, timeline, and deliverables together." },
          step2_title: { label: "Step 2 Title",       type: "text", default: "Modelling & Layout" },
          step2_desc:  { label: "Step 2 Description", type: "textarea", default: "Our team builds the 3D model based on your technical drawings. Camera angles and composition reviewed at this stage." },
          step3_title: { label: "Step 3 Title",       type: "text", default: "Lighting & Materials" },
          step3_desc:  { label: "Step 3 Description", type: "textarea", default: "Photorealistic materials, lighting simulation, and environmental context applied. First renders shared for feedback." },
          step4_title: { label: "Step 4 Title",       type: "text", default: "Final Delivery" },
          step4_desc:  { label: "Step 4 Description", type: "textarea", default: "High-resolution files delivered in agreed formats — print-ready, web-optimised, or video export. Revisions included." },
        },
      },
      why_choose: {
        label: "Why Choose Section",
        fields: {
          heading: { label: "Section Heading", type: "text", default: "Why Studios & Developers Choose ADESSO" },
          accent:  { label: "Accent Word",     type: "text", default: "ADESSO" },
        },
      },
      cta: {
        label: "CTA Section",
        fields: {
          title:       { label: "CTA Title",       type: "text",     default: "Turn Your Project Into a Visual Experience" },
          subtitle:    { label: "CTA Subtitle",    type: "textarea", default: "Share your brief and we'll respond within 24 hours with a scope and indicative price." },
          button_text: { label: "Button Text",     type: "text",     default: "Request a Quote" },
        },
      },
      service_images: {
        label: "Service Section Images",
        fields: {
          img_01:   { label: "Service 01 — Site Planning Image",             type: "image", default: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" },
          img_02:   { label: "Service 02 — 2D Floor Plans Image",            type: "image", default: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=800&q=80" },
          img_03:   { label: "Service 03 — 3D Floor Plans Image",            type: "image", default: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80" },
          img_04:   { label: "Service 04 — Renders Image",                   type: "image", default: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" },
          img_05:   { label: "Service 05 — Animation Fallback Image",        type: "image", default: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" },
          video_05: { label: "Service 05 — Animation Video URL (YouTube embed ou .mp4)", type: "url",   default: "https://www.youtube.com/embed/8B8N04l6v9Q?autoplay=1&mute=1&loop=1&playlist=8B8N04l6v9Q&controls=0&rel=0&modestbranding=1" },
        },
      },
      portfolio: {
        label: "Portfolio Gallery Images",
        fields: {
          p1_img: { label: "Portfolio 1 — Exterior Render",    type: "image", default: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85" },
          p2_img: { label: "Portfolio 2 — Interior Living",    type: "image", default: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80" },
          p3_img: { label: "Portfolio 3 — 3D Floor Plan",      type: "image", default: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80" },
          p4_img: { label: "Portfolio 4 — Dusk Exterior",      type: "image", default: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85" },
          p5_img: { label: "Portfolio 5 — 2D Technical Plans", type: "image", default: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=900&q=80" },
          p6_img: { label: "Portfolio 6 — Master Suite",       type: "image", default: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=900&q=80" },
          p7_img: { label: "Portfolio 7 — Estate Masterplan",  type: "image", default: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85" },
          p8_img: { label: "Portfolio 8 — Kitchen & Dining",   type: "image", default: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80" },
          p9_img: { label: "Portfolio 9 — Mews Walkthrough",   type: "image", default: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // EXHIBITION (localhost:3001)
  // ────────────────────────────────────────
  exhibition_home: {
    label: "Home", path: "/", app: "exhibition",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:         { label: "Background Image",    type: "image",    default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85" },
          title1:        { label: "Title Line 1",        type: "text",     default: "Stand design &" },
          title2:        { label: "Title Line 2",        type: "text",     default: "exhibition strategy" },
          accent:        { label: "Accent Text",         type: "text",     default: "for serious brands." },
          subtitle:      { label: "Subtitle",            type: "textarea", default: "We design and deliver exhibition stands for B2B companies competing at European trade shows. From concept to on-site execution — plus the lead intelligence to make it worthwhile." },
          cta_primary:   { label: "Primary Button",      type: "text",     default: "View Solutions" },
          cta_secondary: { label: "Secondary Button",    type: "text",     default: "Request a Quote" },
        },
      },
      cta: {
        label: "CTA Section",
        fields: {
          title:  { label: "CTA Title",       type: "text", default: "Ready to talk stand design?" },
          button: { label: "CTA Button Text", type: "text", default: "Request a Quote" },
        },
      },
    },
  },

  exhibition_portfolio: {
    label: "Portfolio", path: "/portfolio", app: "exhibition",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:    { label: "Background Image", type: "image",    default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85" },
          heading:  { label: "Page Heading",     type: "text",     default: "Project Gallery" },
          subtitle: { label: "Subtitle",         type: "textarea", default: "Stand design, 3D visualisation, and full production management. Projects across ExCeL London, Olympia, and European trade shows." },
        },
      },
      gallery: {
        label: "Gallery — Project 1",
        fields: {
          p1_img:   { label: "Project 1 Image",       type: "image",    default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=85" },
          p1_title: { label: "Project 1 Title",       type: "text",     default: "Precision Engineering — Advanced Engineering" },
          p1_show:  { label: "Project 1 Show/Venue",  type: "text",     default: "Advanced Engineering — ExCeL London" },
          p1_desc:  { label: "Project 1 Description", type: "textarea", default: "Minimalist two-level stand for a UK precision engineering firm exhibiting at Advanced Engineering ExCeL." },
          p1_size:  { label: "Project 1 Size",        type: "text",     default: "72sqm" },
        },
      },
      gallery2: {
        label: "Gallery — Project 2",
        fields: {
          p2_img:   { label: "Project 2 Image",       type: "image",    default: "https://images.unsplash.com/photo-1559223607-b4d0c8fd41b1?auto=format&fit=crop&w=900&q=80" },
          p2_title: { label: "Project 2 Title",       type: "text",     default: "FinTech Brand — Money20/20" },
          p2_show:  { label: "Project 2 Show/Venue",  type: "text",     default: "Money20/20 Europe — Amsterdam" },
          p2_desc:  { label: "Project 2 Description", type: "textarea", default: "Grid-based minimalist stand design for a London-headquartered fintech." },
          p2_size:  { label: "Project 2 Size",        type: "text",     default: "36sqm" },
        },
      },
      gallery3: {
        label: "Gallery — Project 3",
        fields: {
          p3_img:   { label: "Project 3 Image",       type: "image",    default: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80" },
          p3_title: { label: "Project 3 Title",       type: "text",     default: "SaaS Startup — London Tech Week" },
          p3_show:  { label: "Project 3 Show/Venue",  type: "text",     default: "London Tech Week — ExCeL London" },
          p3_desc:  { label: "Project 3 Description", type: "textarea", default: "Cinematic render series for a SaaS company's first trade show appearance." },
          p3_size:  { label: "Project 3 Size",        type: "text",     default: "20sqm" },
        },
      },
      gallery4: {
        label: "Gallery — Project 4",
        fields: {
          p4_img:   { label: "Project 4 Image",       type: "image",    default: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=85" },
          p4_title: { label: "Project 4 Title",       type: "text",     default: "Logistics Group — Multimodal ExCeL" },
          p4_show:  { label: "Project 4 Show/Venue",  type: "text",     default: "Multimodal — ExCeL London" },
          p4_desc:  { label: "Project 4 Description", type: "textarea", default: "End-to-end stand design, contractor brief, and full on-site coordination for a pan-European logistics operator." },
          p4_size:  { label: "Project 4 Size",        type: "text",     default: "60sqm" },
        },
      },
      gallery5: {
        label: "Gallery — Project 5",
        fields: {
          p5_img:   { label: "Project 5 Image",       type: "image",    default: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80" },
          p5_title: { label: "Project 5 Title",       type: "text",     default: "Pharmacy Brand — Olympia London" },
          p5_show:  { label: "Project 5 Show/Venue",  type: "text",     default: "The Pharmacy Show — Olympia London" },
          p5_desc:  { label: "Project 5 Description", type: "textarea", default: "Clinic-grade minimalist stand for a UK medical devices company." },
          p5_size:  { label: "Project 5 Size",        type: "text",     default: "24sqm" },
        },
      },
      gallery6: {
        label: "Gallery — Project 6",
        fields: {
          p6_img:   { label: "Project 6 Image",       type: "image",    default: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&w=900&q=80" },
          p6_title: { label: "Project 6 Title",       type: "text",     default: "Industrial Brand — Hillhead Exhibition" },
          p6_show:  { label: "Project 6 Show/Venue",  type: "text",     default: "Hillhead — Buxton" },
          p6_desc:  { label: "Project 6 Description", type: "textarea", default: "Full production management for an outdoor island stand at the UK's largest quarrying and construction trade event." },
          p6_size:  { label: "Project 6 Size",        type: "text",     default: "96sqm" },
        },
      },
      gallery7: {
        label: "Gallery — Project 7",
        fields: {
          p7_img:   { label: "Project 7 Image",       type: "image",    default: "https://images.unsplash.com/photo-1467521996782-b72a22c5e4c3?auto=format&fit=crop&w=1400&q=85" },
          p7_title: { label: "Project 7 Title",       type: "text",     default: "Property Developer — Olympia London" },
          p7_show:  { label: "Project 7 Show/Venue",  type: "text",     default: "International Property Show — Olympia" },
          p7_desc:  { label: "Project 7 Description", type: "textarea", default: "Luxury brand presence for a central London property developer." },
          p7_size:  { label: "Project 7 Size",        type: "text",     default: "48sqm" },
        },
      },
      gallery8: {
        label: "Gallery — Project 8",
        fields: {
          p8_img:   { label: "Project 8 Image",       type: "image",    default: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" },
          p8_title: { label: "Project 8 Title",       type: "text",     default: "Automation Brand — Smart Industry Expo" },
          p8_show:  { label: "Project 8 Show/Venue",  type: "text",     default: "Smart Industry Expo — NEC Birmingham" },
          p8_desc:  { label: "Project 8 Description", type: "textarea", default: "Photorealistic renders for a German automation company entering the UK market." },
          p8_size:  { label: "Project 8 Size",        type: "text",     default: "40sqm" },
        },
      },
      gallery9: {
        label: "Gallery — Project 9",
        fields: {
          p9_img:   { label: "Project 9 Image",       type: "image",    default: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=900&q=80" },
          p9_title: { label: "Project 9 Title",       type: "text",     default: "Beauty Brand — Professional Beauty ExCeL" },
          p9_show:  { label: "Project 9 Show/Venue",  type: "text",     default: "Professional Beauty — ExCeL London" },
          p9_desc:  { label: "Project 9 Description", type: "textarea", default: "Soft-luxury design language for a B2B cosmetics brand at Professional Beauty ExCeL." },
          p9_size:  { label: "Project 9 Size",        type: "text",     default: "30sqm" },
        },
      },
    },
  },

  exhibition_about: {
    label: "About", path: "/about", app: "exhibition",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:    { label: "Background Image", type: "image",    default: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85" },
          title1:   { label: "Title Line 1",     type: "text",     default: "Exhibition expertise" },
          accent:   { label: "Accent Text",      type: "text",     default: "built from the floor up." },
          subtitle: { label: "Subtitle",         type: "textarea", default: "ADESSO Exhibition was built by professionals who have worked in the exhibition industry — not consultants guessing from the outside." },
        },
      },
    },
  },

  exhibition_solutions: {
    label: "Solutions", path: "/solutions", app: "exhibition",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "Exhibition solutions" },
          accent:   { label: "Accent Text",  type: "text",     default: "for every stand size." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "From small shell scheme upgrades to full custom stands — we design for every budget and footprint." },
        },
      },
    },
  },

  exhibition_industries: {
    label: "Industries", path: "/industries", app: "exhibition",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "Industries we serve." },
          accent:   { label: "Accent Text",  type: "text",     default: "Across European trade shows." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "We work with B2B companies across manufacturing, technology, healthcare, food & beverage, and professional services." },
        },
      },
    },
  },

  exhibition_contact: {
    label: "Contact", path: "/contact", app: "exhibition",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1",    type: "text", default: "Get a quote." },
          accent:   { label: "Accent Text",     type: "text", default: "Let's talk about your stand." },
          email:    { label: "Contact Email",   type: "text", default: "hello@adesso.digital" },
          whatsapp: { label: "WhatsApp Number", type: "text", default: "447470361422" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // AUTOMATION (localhost:3002)
  // ────────────────────────────────────────
  automation_home: {
    label: "Home", path: "/", app: "automation",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:         { label: "Background Image",  type: "image",    default: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1800&q=85" },
          title1:        { label: "Title Line 1",      type: "text",     default: "Stop doing" },
          title2:        { label: "Title Line 2",      type: "text",     default: "manually what" },
          accent:        { label: "Accent Text",       type: "text",     default: "a system can do." },
          subtitle:      { label: "Subtitle",          type: "textarea", default: "We map, design, and build automation systems for growing companies — eliminating manual processes, connecting your tools, and giving your team back the time they need to focus on real work." },
          cta_primary:   { label: "Primary Button",    type: "text",     default: "View Services" },
          cta_secondary: { label: "Secondary Button",  type: "text",     default: "Start a Project" },
        },
      },
      cta: {
        label: "CTA Section",
        fields: {
          title:  { label: "CTA Title",  type: "text", default: "Ready to automate?" },
          button: { label: "CTA Button", type: "text", default: "Book a Discovery Call" },
        },
      },
    },
  },

  automation_services: {
    label: "Services", path: "/services", app: "automation",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "Automation services" },
          accent:   { label: "Accent Text",  type: "text",     default: "built to your workflow." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "Fixed-price engagements. Clear deliverables. No scope creep." },
        },
      },
    },
  },

  automation_how_it_works: {
    label: "How It Works", path: "/how-it-works", app: "automation",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "How we build" },
          accent:   { label: "Accent Text",  type: "text",     default: "your automations." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "A structured, documented process — from discovery to handover." },
        },
      },
    },
  },

  automation_projects: {
    label: "Projects", path: "/projects", app: "automation",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1: { label: "Title Line 1", type: "text", default: "Projects we've built." },
          accent: { label: "Accent Text",  type: "text", default: "Real automations. Real results." },
        },
      },
    },
  },

  automation_contact: {
    label: "Contact", path: "/contact", app: "automation",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1",    type: "text", default: "Start a project." },
          accent:   { label: "Accent Text",     type: "text", default: "Let's automate something." },
          email:    { label: "Contact Email",   type: "text", default: "hello@adesso.digital" },
          whatsapp: { label: "WhatsApp Number", type: "text", default: "447470361422" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // LEADS (localhost:3003)
  // ────────────────────────────────────────
  leads_home: {
    label: "Home", path: "/", app: "leads",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          image:         { label: "Background Image",  type: "image",    default: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=85" },
          title1:        { label: "Title Line 1",      type: "text",     default: "Reach the right" },
          title2:        { label: "Title Line 2",      type: "text",     default: "people before" },
          accent:        { label: "Accent Text",       type: "text",     default: "your competitors do." },
          subtitle:      { label: "Subtitle",          type: "textarea", default: "Verified B2B contact databases built specifically for the exhibition and trade show industry. Decision-makers, stand managers, and procurement contacts — segmented by show, sector, and geography." },
          cta_primary:   { label: "Primary Button",    type: "text",     default: "View Products" },
          cta_secondary: { label: "Secondary Button",  type: "text",     default: "Custom Research" },
        },
      },
      cta: {
        label: "CTA Section",
        fields: {
          title:  { label: "CTA Title",  type: "text", default: "Need something specific?" },
          button: { label: "CTA Button", type: "text", default: "Request Custom Research" },
        },
      },
    },
  },

  leads_products: {
    label: "Products", path: "/products", app: "leads",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "Lead intelligence" },
          accent:   { label: "Accent Text",  type: "text",     default: "packages." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "Verified B2B contact databases segmented by trade show, industry, and geography. GDPR compliant. Delivered in 48h." },
        },
      },
    },
  },

  leads_pricing: {
    label: "Pricing", path: "/pricing", app: "leads",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "Simple, transparent" },
          accent:   { label: "Accent Text",  type: "text",     default: "pricing." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "No subscriptions. No contracts. Pay per database." },
        },
      },
    },
  },

  leads_contact: {
    label: "Contact", path: "/contact", app: "leads",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1",    type: "text", default: "Get in touch." },
          accent:   { label: "Accent Text",     type: "text", default: "We'll find the right data." },
          email:    { label: "Contact Email",   type: "text", default: "hello@adesso.digital" },
          whatsapp: { label: "WhatsApp Number", type: "text", default: "447470361422" },
        },
      },
    },
  },

  // ────────────────────────────────────────
  // LAB (localhost:3004)
  // ────────────────────────────────────────
  lab_home: {
    label: "Home", path: "/", app: "lab",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:        { label: "Title Line 1",   type: "text",     default: "ADESSO Lab." },
          accent:        { label: "Accent Text",    type: "text",     default: "Experiments in progress." },
          subtitle:      { label: "Subtitle",       type: "textarea", default: "Early-stage tools, prototypes, and experiments from the ADESSO studio. Not production-ready — but worth watching." },
          cta_primary:   { label: "Primary Button", type: "text",     default: "View Tools" },
          cta_secondary: { label: "Join Waitlist",  type: "text",     default: "Join Waitlist" },
        },
      },
    },
  },

  lab_waitlist: {
    label: "Waitlist", path: "/waitlist", app: "lab",
    sections: {
      hero: {
        label: "Hero Section",
        fields: {
          title1:   { label: "Title Line 1", type: "text",     default: "Join the waitlist." },
          accent:   { label: "Accent Text",  type: "text",     default: "Be first when we launch." },
          subtitle: { label: "Subtitle",     type: "textarea", default: "Early access to new tools and experiments from the ADESSO studio." },
        },
      },
    },
  },
};
