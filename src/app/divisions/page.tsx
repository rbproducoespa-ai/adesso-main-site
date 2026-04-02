import type { Metadata } from "next";
import Link from "next/link";
import { URLS } from "@/lib/urls";
import { getPageContent, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Divisions — ADESSO Digital",
  description: "Four specialist divisions, one integrated company. ADESSO Exhibition, Automation, Lead Intelligence, and Lab — each serving a distinct B2B market.",
  openGraph: {
    title: "The ADESSO Divisions",
    description: "Exhibition, Automation, Lead Intelligence, and Lab. Four specialist divisions operating as one integrated platform.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

export default async function DivisionsPage() {
  const c = await getPageContent("main", "divisions");
  const g = (section: string, key: string) => getContent(c, "divisions", section, key);

  const divisions = [
    {
      n: "01", tag: "Exhibition", name: "ADESSO Exhibition",
      url: URLS.exhibition,
      description: "Stand design, 3D visualisation, event production, and on-site management for B2B brands exhibiting across Europe.",
      services: ["Stand Concept Design", "3D Visualisation & Renders", "Event Production", "Freelance Exhibition Support", "Post-Event Reports"],
      forWho: "Exhibition managers, marketing teams, and B2B brands participating in trade shows.",
      img: g("card_images", "img_01"),
    },
    {
      n: "02", tag: "Automation", name: "ADESSO Automation",
      url: URLS.automation,
      description: "Business process automation, workflow design, and custom digital systems for operational efficiency.",
      services: ["Process Mapping & Audit", "Workflow Automation (n8n / Zapier)", "CRM Integration", "Custom Internal Tools", "API & Data Pipelines"],
      forWho: "Operations teams, founders, and growing companies with manual processes costing time and money.",
      img: g("card_images", "img_02"),
    },
    {
      n: "03", tag: "Intelligence", name: "ADESSO Leads",
      url: URLS.leads,
      description: "Targeted lead intelligence products — verified B2B databases segmented by industry, geography, and exhibition participation.",
      services: ["Exhibition Visitor Data", "Sector-Specific Lead Packs", "Decision-Maker Contacts", "Custom Research Requests", "Data Enrichment"],
      forWho: "Sales teams, business development managers, and companies entering new European markets.",
      img: g("card_images", "img_03"),
    },
    {
      n: "04", tag: "Lab", name: "ADESSO Lab",
      url: URLS.lab,
      description: "Early-stage SaaS products, digital tools, and experimental projects being developed inside the ADESSO ecosystem.",
      services: ["ExhibitionRadar (in dev)", "Lead Capture Tools", "Waitlist Products", "Internal Tools", "Open Experiments"],
      forWho: "Early adopters, product testers, and companies interested in bleeding-edge exhibition technology.",
      img: g("card_images", "img_04"),
      external: true,
    },
    {
      n: "05", tag: "3D Architecture", name: "ADESSO 3D Architecture",
      url: "/divisions/3d-architecture",
      description: "High-end 3D visualization for architects, developers, and real estate projects. Photorealistic renders, floor plans, and cinematic animations.",
      services: ["Site Planning & Masterplans", "2D Technical Floor Plans", "3D Visualised Floor Plans", "Photorealistic Renders", "3D Animation & Video"],
      forWho: "Architects, property developers, real estate agencies, and investors needing premium visualisation for presentations and sales.",
      img: g("card_images", "img_05"),
      external: false,
    },
  ];

  return (
    <main>
      {/* ── Header — dark ── */}
      <section className="relative min-h-[55vh] flex items-end bg-[#111111] pt-[72px] overflow-hidden">
        <img
          src={g("hero", "image")}
          alt="ADESSO Digital — four divisions, one platform"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-16 z-10 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors mb-6">
            ← Home
          </Link>
          <span className="eyebrow">The Ecosystem</span>
          <h1 className="headline-display text-white mb-4">
            {g("hero", "title1")}<br />
            <em className="text-[#8C7355] not-italic">{g("hero", "accent")}</em>
          </h1>
          <p className="body-lead text-white/60 max-w-2xl">
            Each division operates with full independence — its own subdomain, service offering,
            and market focus — while sharing infrastructure, brand standards, and strategic direction.
          </p>
        </div>
      </section>

      {/* ── Division cards ── */}
      {divisions.map((d, i) => (
        <section key={d.n} className={`border-b border-[#E2DFDA] ${i % 2 === 0 ? "bg-white" : "bg-[#F5F4F1]"}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image — alternates sides */}
            <div className={`relative aspect-[4/3] lg:aspect-auto min-h-[380px] overflow-hidden ${i % 2 !== 0 ? "lg:order-2" : ""}`}>
              <img
                src={d.img}
                alt={d.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-6 left-6">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase bg-[#8C7355] text-white px-3 py-1.5">{d.tag}</span>
              </div>
            </div>
            {/* Content */}
            <div className={`p-10 lg:p-16 flex flex-col justify-center ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
              <span className="eyebrow">{d.tag} — {d.n}</span>
              <h2 className="headline-xl mb-4">{d.name}</h2>
              <p className="body-lead mb-8">{d.description}</p>
              <div className="mb-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-4">Services</p>
                <ul className="space-y-2 border-t border-[#E2DFDA]">
                  {d.services.map((s) => (
                    <li key={s} className="flex items-center gap-3 py-2 border-b border-[#E2DFDA]">
                      <span className="w-1 h-1 rounded-full bg-[#8C7355] flex-shrink-0" />
                      <span className="body-sm text-[#111111]">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F5F4F1] border border-[#E2DFDA] px-5 py-4 mb-8">
                <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-1">For</p>
                <p className="body-sm text-[#5C5C5C]">{d.forWho}</p>
              </div>
              {(d as { external?: boolean }).external !== false ? (
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="btn-primary w-fit">
                  Visit Division
                </a>
              ) : (
                <Link href={d.url} className="btn-primary w-fit">
                  Visit Division
                </Link>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="section-pad-sm bg-[#111111]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow">Not Sure Where to Start?</span>
            <h2 className="headline-lg text-white">Talk to us directly.</h2>
          </div>
          <a href="/contact" className="btn-primary flex-shrink-0">Get in Touch</a>
        </div>
      </section>
    </main>
  );
}
