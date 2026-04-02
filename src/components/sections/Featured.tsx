import Link from "next/link";
import { URLS } from "@/lib/urls";

const services = [
  {
    n: "01", category: "Exhibition", name: "Stand Design & Visualisation",
    href: URLS.exhibition,
    desc: "From floor plan concept through to photorealistic 3D renders. Used by marketing teams for internal approval, contractor briefing, and pre-show content.",
    tags: ["Concept Design", "3D Renders", "Cinematic Renders"],
    price: "Quote on request",
  },
  {
    n: "02", category: "Exhibition", name: "Event Production & Support",
    href: URLS.exhibition,
    desc: "On-site and remote support for exhibition stand managers and marketing teams. Contractor coordination, logistics, and show-floor representation.",
    tags: ["On-site Management", "Contractor Liaison", "Post-show Reports"],
    price: "Quote on request",
  },
  {
    n: "03", category: "Automation", name: "Business Process Automation",
    href: URLS.automation,
    desc: "We audit your workflows, identify what should be automated, then build the systems that eliminate manual work — using n8n, Zapier, Make, and custom code.",
    tags: ["Process Audit", "Workflow Build", "CRM Integration", "Custom Tools"],
    price: "From £299",
  },
  {
    n: "04", category: "Leads", name: "B2B Lead Intelligence",
    href: URLS.leads,
    desc: "Verified contact databases built from trade show attendance records. Decision-makers, procurement contacts, and stand managers — ready for outreach.",
    tags: ["Visitor Packs", "Sector Databases", "Data Enrichment"],
    price: "From £49",
  },
];

export function FeaturedSection() {
  return (
    <section className="bg-[#F5F4F1]">
      {/* Header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20 border-b border-[#E2DFDA]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <span className="eyebrow">What We Do</span>
            <h2 className="headline-xl">Services built for real commercial outcomes.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end justify-end">
            <Link href="/services"
              className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors">
              All Services →
            </Link>
          </div>
        </div>
      </div>

      {/* Service rows */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {services.map((s) => (
          <a key={s.n} href={s.href} target="_blank" rel="noopener noreferrer"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-10 lg:py-12 border-b border-[#E2DFDA] group hover:bg-white/50 transition-colors -mx-6 lg:-mx-12 px-6 lg:px-12">
            <div className="lg:col-span-1">
              <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C7355]">{s.n}</span>
            </div>
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#B0A898] mb-1">{s.category}</p>
              <h3 className="font-semibold text-[#111111] text-[17px] leading-snug group-hover:text-[#8C7355] transition-colors">{s.name}</h3>
            </div>
            <div className="lg:col-span-5">
              <p className="body-base mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="text-[10px] tracking-wide text-[#8B8B8B] border border-[#E2DFDA] px-2.5 py-1">{t}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 lg:col-start-11 text-right flex lg:flex-col justify-between lg:justify-start items-end gap-4">
              <span className="text-[15px] font-bold text-[#111111]">{s.price}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
