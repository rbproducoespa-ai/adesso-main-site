import Link from "next/link";
import { URLS } from "@/lib/urls";

const divisions = [
  {
    n: "01", tag: "Exhibition", name: "Stands & Trade Shows",
    href: URLS.exhibition,
    desc: "Stand concept design, 3D visualisation, and on-site event management for B2B brands exhibiting across Europe.",
    services: ["Concept Design", "3D Renders", "Event Production", "Freelance Support"],
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=75",
  },
  {
    n: "02", tag: "Automation", name: "Workflows & Systems",
    href: URLS.automation,
    desc: "Business process automation, CRM integration, and custom internal tools for companies that have outgrown manual operations.",
    services: ["Process Audit", "Workflow Build", "CRM Integration", "Custom Tools"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=75",
  },
  {
    n: "03", tag: "Intelligence", name: "Lead Databases",
    href: URLS.leads,
    desc: "Verified B2B contact databases segmented by trade show attendance, sector, geography, and decision-maker role.",
    services: ["Visitor Packs", "Sector Databases", "Enrichment", "Custom Research"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=75",
  },
  {
    n: "04", tag: "Lab", name: "Future Tools",
    href: URLS.lab,
    desc: "Early-stage SaaS products and experimental digital tools being developed inside the ADESSO ecosystem.",
    services: ["ExhibitionRadar", "Lead Capture", "API Products", "Early Access"],
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=75",
  },
];

export function DivisionsSection() {
  return (
    <section className="bg-white">
      {/* Section header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20 border-b border-[#E2DFDA]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <span className="eyebrow">The ADESSO Ecosystem</span>
            <h2 className="headline-xl">
              Four specialist divisions.<br />One integrated company.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="body-base">
              Each division serves a distinct market. Together they form a vertically integrated
              platform for B2B companies that need digital capability without the agency overhead.
            </p>
            <Link href="/divisions" className="inline-flex items-center gap-2 mt-6 text-[12px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors">
              Explore all divisions →
            </Link>
          </div>
        </div>
      </div>

      {/* Division rows */}
      {divisions.map((d, i) => (
        <a
          key={d.n}
          href={d.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block group ${i % 2 === 0 ? "bg-white" : "bg-[#F5F4F1]"}`}
        >
          <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 lg:py-12 border-b border-[#E2DFDA]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              {/* Number */}
              <div className="lg:col-span-1 flex lg:flex-col gap-3 items-center lg:items-start">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355]">{d.n}</span>
              </div>
              {/* Name */}
              <div className="lg:col-span-3">
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#B0A898] mb-1">{d.tag}</p>
                <h3 className="headline-md group-hover:text-[#8C7355] transition-colors duration-200">{d.name}</h3>
              </div>
              {/* Description */}
              <div className="lg:col-span-4">
                <p className="body-base">{d.desc}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-4">
                  {d.services.map((s) => (
                    <li key={s} className="text-[11px] text-[#8B8B8B] tracking-wide">{s}</li>
                  ))}
                </ul>
              </div>
              {/* Image thumbnail */}
              <div className="hidden lg:block lg:col-span-2 lg:col-start-10">
                <div className="overflow-hidden aspect-[3/2]">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </div>
              {/* CTA */}
              <div className="lg:col-span-1 lg:col-start-12 text-right flex lg:flex-col justify-end items-end">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 group-hover:text-[#111111] group-hover:border-[#111111] transition-colors">
                  Visit →
                </span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
