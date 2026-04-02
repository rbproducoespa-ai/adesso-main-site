import type { Metadata } from "next";
import { URLS } from "@/lib/urls";
import { getPageContent, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products — ADESSO Digital",
  description: "Packaged digital products by ADESSO. B2B lead intelligence databases from £49, automation starter packs, and early-access SaaS tools. Buy once, own it.",
  openGraph: {
    title: "Products — ADESSO Digital",
    description: "Lead intelligence databases, automation packs, and SaaS tools. Fixed-price. No subscriptions.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

const products = [
  {
    n: "01",
    category: "Lead Intelligence",
    name: "Exhibition Visitor Pack",
    status: "Available",
    description: "250+ verified contact records from recent European trade shows. Decision-makers, stand managers, and procurement contacts segmented by show and sector.",
    includes: ["250+ verified contacts", "LinkedIn + email where available", "Show name + sector tag", "GDPR-compliant sourcing", "Delivered in 48h as CSV/Excel"],
    href: URLS.leads,
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=75",
  },
  {
    n: "02",
    category: "Lead Intelligence",
    name: "Sector Lead Database",
    status: "Available",
    description: "500 to 2,000 B2B decision-maker contacts segmented by industry, geography, and company size. Built for outbound sales and market entry campaigns.",
    includes: ["500–2,000 contacts", "Job title + company + contact info", "Industry & geography filters", "Verified and enriched", "Dedicated account delivery"],
    href: URLS.leads,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=75",
  },
  {
    n: "03",
    category: "Lab — In Development",
    name: "ExhibitionRadar",
    status: "Coming Soon",
    description: "A SaaS platform for exhibition professionals: track shows, monitor competitors, manage stand briefs, and identify leads — all in one place.",
    includes: ["Show calendar & tracking", "Competitor stand monitoring", "Brief management tools", "Lead capture integration", "Early access pricing"],
    href: URLS.lab,
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=75",
  },
  {
    n: "04",
    category: "Automation",
    name: "Automation Starter Pack",
    status: "Available",
    description: "A fixed-scope automation package: one end-to-end workflow automated in n8n or Zapier, with documentation and a 30-day support window.",
    includes: ["Discovery call", "One workflow automated", "Written documentation", "30-day support", "Optional monthly retainer"],
    href: "/contact",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=75",
  },
];

export default async function ProductsPage() {
  const c = await getPageContent("main", "products");
  const g = (section: string, key: string) => getContent(c, "products", section, key);

  return (
    <main>
      {/* ── Hero — dark with image ── */}
      <section className="relative min-h-[55vh] flex items-end bg-[#111111] pt-[72px] overflow-hidden">
        <img
          src={g("hero", "image")}
          alt="ADESSO Products — data and intelligence"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-16 z-10 w-full">
          <span className="eyebrow">Products</span>
          <h1 className="headline-display text-white mb-4">
            {g("hero", "title1")}<br />
            <em className="text-[#8C7355] not-italic">{g("hero", "accent")}</em>
          </h1>
          <p className="body-lead text-white/60 max-w-xl whitespace-pre-line">
            {g("hero", "subtitle")}
          </p>
        </div>
      </section>

      {/* ── Products — image cards ── */}
      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E2DFDA]">
            {products.map((p) => (
              <div key={p.n} className="bg-white group flex flex-col">
                {/* Image */}
                <div className="overflow-hidden aspect-[16/9] relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 ${
                      p.status === "Available"
                        ? "bg-[#111111] text-white"
                        : "bg-[#E2DFDA] text-[#5C5C5C]"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-2">{p.category}</span>
                  <h2 className="headline-md mb-4 group-hover:text-[#8C7355] transition-colors">{p.name}</h2>
                  <p className="body-base mb-6">{p.description}</p>
                  <ul className="space-y-2 border-t border-[#E2DFDA] pt-5 mb-6 flex-1">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-[#8C7355] flex-shrink-0 mt-[7px]" />
                        <span className="body-sm text-[#5C5C5C]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-[#E2DFDA]">
                    <a
                      href={p.href}
                      className="btn-primary w-full justify-center text-center block"
                      {...(p.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {p.status === "Coming Soon" ? "Join Waitlist" : "Get a Quote"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Custom ── */}
      <section className="section-pad-sm bg-[#111111]">
        <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="eyebrow">Custom Requirements</span>
            <h2 className="headline-lg text-white">Need something specific?</h2>
            <p className="text-[#A0A0A0] text-sm mt-1 max-w-md">Custom data research, bespoke automation builds, or tailored product scopes — we handle those too.</p>
          </div>
          <a href="/contact" className="btn-primary flex-shrink-0">Start a Conversation</a>
        </div>
      </section>
    </main>
  );
}
