import type { Metadata } from "next";
import { getPageContent, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — ADESSO Digital",
  description: "Exhibition stand design, business process automation, and lead intelligence services for B2B companies across the UK and Europe. Fixed-price proposals.",
  openGraph: {
    title: "Services — ADESSO Digital",
    description: "Exhibition design, automation systems, and lead intelligence. Fixed-price proposals for B2B companies operating in competitive markets.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

export default async function ServicesPage() {
  const c = await getPageContent("main", "services");
  const g = (section: string, key: string) => getContent(c, "services", section, key);

  const serviceGroups = [
    {
      tag: "Exhibition Division",
      intro: "Physical presence, elevated. Stand design, 3D visualisation, and event production for brands that exhibit at European trade shows.",
      img: g("division_images", "img_exhibition"),
      items: [
        { n: "01", name: "Stand Concept Design",         desc: "Floor plan, moodboard, and initial concept layouts for your exhibition stand." },
        { n: "02", name: "3D Visualisation",             desc: "Photorealistic renders of your stand before production begins." },
        { n: "03", name: "Cinematic Renders",            desc: "High-end atmospheric renders for marketing materials and proposals." },
        { n: "04", name: "Freelance Exhibition Support", desc: "On-site and remote support from an experienced exhibition professional." },
      ],
    },
    {
      tag: "Automation Division",
      intro: "Remove the manual. Build systems that work while your team focuses on what actually matters.",
      img: g("division_images", "img_automation"),
      items: [
        { n: "01", name: "Process Audit & Mapping",  desc: "Document your current workflows and identify automation opportunities." },
        { n: "02", name: "Automation Starter",        desc: "Single workflow automated end-to-end using n8n, Zapier, or Make." },
        { n: "03", name: "CRM Integration",           desc: "Connect your CRM to sales, marketing, and ops tools seamlessly." },
        { n: "04", name: "Custom Internal Tool",      desc: "Bespoke admin panels, dashboards, or internal apps built to your spec." },
        { n: "05", name: "Full Automation Build",     desc: "Complete workflow redesign and automation implementation for your business." },
        { n: "06", name: "API & Data Pipeline",       desc: "Custom integrations and data flows between your systems." },
      ],
    },
    {
      tag: "Lead Intelligence Division",
      intro: "Data-driven prospecting. Verified B2B contact lists built for the exhibition and events industry.",
      img: g("division_images", "img_leads"),
      items: [
        { n: "01", name: "Exhibition Visitor Pack",   desc: "250+ verified contacts from recent trade shows in your sector." },
        { n: "02", name: "Sector Lead Database",      desc: "500–2,000 decision-maker contacts segmented by industry and geography." },
        { n: "03", name: "Custom Research Request",   desc: "Bespoke lead generation targeting your exact market and criteria." },
        { n: "04", name: "Data Enrichment",           desc: "Enhance your existing CRM data with verified contact and company info." },
      ],
    },
  ];

  return (
    <main>
      {/* ── Header — dark with image ── */}
      <section className="relative min-h-[55vh] flex items-end bg-[#111111] pt-[72px] overflow-hidden">
        <img
          src={g("hero", "image")}
          alt="ADESSO services — professional workspace"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-16 z-10 w-full">
          <span className="eyebrow">What We Do</span>
          <h1 className="headline-display text-white mb-4">
            {g("hero", "title1")}<br />
            <em className="text-[#8C7355] not-italic">{g("hero", "accent")}</em>
          </h1>
          <p className="body-lead text-white/60 max-w-xl whitespace-pre-line">
            {g("hero", "subtitle")}
          </p>
        </div>
      </section>

      {/* ── Service groups ── */}
      {serviceGroups.map((group, gi) => (
        <section key={group.tag} className={`border-b border-[#E2DFDA] ${gi % 2 === 0 ? "bg-white" : "bg-[#F5F4F1]"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image column */}
            <div className={`lg:col-span-4 relative overflow-hidden min-h-[280px] ${gi % 2 !== 0 ? "lg:order-2" : ""}`}>
              <img
                src={group.img}
                alt={group.tag}
                className="w-full h-full object-cover absolute inset-0 grayscale"
              />
              <div className="absolute inset-0 bg-[#111111]/50 flex items-end p-8">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] border border-[#8C7355] px-3 py-1.5">
                  {group.tag}
                </span>
              </div>
            </div>
            {/* Content column */}
            <div className={`lg:col-span-8 py-14 px-8 lg:px-14 ${gi % 2 !== 0 ? "lg:order-1" : ""}`}>
              <p className="body-lead mb-8 max-w-lg">{group.intro}</p>
              <div className="border-t border-[#E2DFDA]">
                {group.items.map((item) => (
                  <div key={item.n} className="grid grid-cols-12 gap-4 py-5 border-b border-[#E2DFDA] group hover:bg-white/60 transition-colors">
                    <div className="col-span-1">
                      <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C7355]">{item.n}</span>
                    </div>
                    <div className="col-span-7 md:col-span-8">
                      <h3 className="font-semibold text-[#111111] text-[15px] mb-1 group-hover:text-[#8C7355] transition-colors">{item.name}</h3>
                      <p className="body-sm">{item.desc}</p>
                    </div>
                    <div className="col-span-4 md:col-span-3 text-right flex items-center justify-end">
                      <a href="/contact" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Get a Quote →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="section-pad-sm bg-[#111111]">
        <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow">Custom Scope</span>
            <h2 className="headline-lg text-white">Need something bespoke?</h2>
            <p className="text-[#A0A0A0] text-sm mt-1">All prices are indicative. We scope every project individually.</p>
          </div>
          <a href="/contact" className="btn-primary flex-shrink-0">Discuss Your Project</a>
        </div>
      </section>
    </main>
  );
}
