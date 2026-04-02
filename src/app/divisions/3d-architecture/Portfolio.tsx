"use client";

import { useState } from "react";

type Project = {
  id: number;
  category: string;
  title: string;
  description: string;
  img: string;
  wide?: boolean;
};

const CATEGORIES = ["All", "Masterplan", "2D Plans", "3D Plans", "Interior", "Exterior", "Animation"];

const DEFAULTS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
];

const BASE_PROJECTS = [
  { id: 1, category: "Exterior",   title: "Hampstead Manor — Exterior Render",          description: "Photorealistic daytime exterior for a 6-bedroom private manor in Hampstead. Accurate stone and brick facade, mature landscaping, and driveway approach. Delivered for planning application and sales brochure.", wide: true },
  { id: 2, category: "Interior",   title: "Chelsea Penthouse — Open-Plan Living",        description: "Ultra-realistic interior visualisation for a Chelsea penthouse. Bespoke joinery, Italian marble surfaces, and natural light simulation through full-height glazing. Pre-construction presentation render." },
  { id: 3, category: "3D Plans",   title: "Mayfair Lateral Apartment — 3D Floor Plan",   description: "Furnished 3D floor plan for a 3,200 sq ft lateral apartment in Mayfair. Overhead perspective with room proportions, furniture layout, materials, and spatial flow clearly communicated for sales documentation." },
  { id: 4, category: "Exterior",   title: "St John's Wood Estate — Dusk Render",        description: "Cinematic dusk exterior render for a 7-bedroom estate in St John's Wood. Pool terrace, landscaped grounds, and garage wing visualised at golden hour. Six camera angles included in the project package.", wide: true },
  { id: 5, category: "2D Plans",   title: "Notting Hill Townhouse — Technical Plans",    description: "Approval-ready 2D technical floor plans for a full-floor conversion across four levels in Notting Hill. Ground, first, second, and loft plans with room labels, dimensions, and building control annotations." },
  { id: 6, category: "Interior",   title: "Belgravia Townhouse — Master Suite",          description: "Pre-construction render of a master bedroom suite in a Belgravia townhouse development. Bespoke fabric headboard wall, walk-in wardrobe entrance, and en-suite framing — designed for developer sales pack." },
  { id: 7, category: "Masterplan", title: "Surrey Hills — Equestrian Estate Masterplan", description: "Aerial site masterplan for a 12-acre equestrian estate in Surrey. Main residence, stables, paddocks, and guest lodge positioned across the site. Used for planning approval submission and investor overview.", wide: true },
  { id: 8, category: "Interior",   title: "Kensington Residence — Kitchen & Dining",    description: "Photorealistic kitchen and open-plan dining render for a Kensington residence. Bespoke handleless cabinetry, Calacatta marble island, and integrated appliances — full material accuracy for client sign-off." },
  { id: 9, category: "Animation",  title: "Marylebone Mews — Cinematic Walkthrough",    description: "2-minute cinematic walkthrough animation for a mews house conversion in Marylebone. Full exterior approach, all three floors, and roof terrace in sequence. Delivered in 4K for investor presentation format." },
];

export function Portfolio({ images = [] }: { images?: string[] }) {
  const [active, setActive]     = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const PROJECTS: Project[] = BASE_PROJECTS.map((p, i) => ({ ...p, img: images[i] || DEFAULTS[i] }));
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section className="py-24 bg-[#0D0D0D]" id="portfolio">
      {/* Heading */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mb-14">
        <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355]">Our Work</span>
        <h2 className="font-display text-[2.75rem] font-bold text-white leading-tight mt-2 mb-4">
          Project Showcase
        </h2>
        <p className="text-[#7A7A7A] text-[1.0625rem] max-w-2xl leading-relaxed">
          A selection of our most impactful work across London and the Home Counties — mansions, penthouses,
          and residential developments visualised to the highest standard.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase transition-all duration-200 ${
                active === cat
                  ? "bg-[#8C7355] text-white"
                  : "border border-[#333] text-[#7A7A7A] hover:border-[#8C7355] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => setSelected(p)}
              className={`group relative overflow-hidden cursor-pointer ${p.wide ? "md:col-span-2" : ""}`}
              style={{ aspectRatio: p.wide ? "16/7" : "4/3" }}
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Tag */}
              <div className="absolute top-5 left-5">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase bg-[#8C7355] text-white px-3 py-1.5">
                  {p.category}
                </span>
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-1 block">{p.category}</span>
                <h3 className="text-white font-display text-xl font-bold">{p.title}</h3>
                <p className="text-white/60 text-[12px] mt-1">View project →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-[#111111] max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/60 text-white hover:text-[#8C7355] transition-colors text-xl"
            >
              ✕
            </button>
            {/* Image */}
            <div className="aspect-video overflow-hidden">
              <img src={selected.img} alt={selected.title} className="w-full h-full object-cover" />
            </div>
            {/* Content */}
            <div className="p-8 md:p-10">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-2">{selected.category}</span>
              <h3 className="font-display text-[1.75rem] font-bold text-white mb-4">{selected.title}</h3>
              <p className="text-[#7A7A7A] text-[1rem] leading-relaxed mb-8">{selected.description}</p>
              <a
                href="/contact"
                className="inline-block bg-[#8C7355] text-white text-[11px] font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-[#7A6249] transition-colors"
              >
                Request Similar Project
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
