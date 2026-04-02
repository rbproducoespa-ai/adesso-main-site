import Link from "next/link";

const cases = [
  {
    n: "01",
    tag: "Exhibition",
    title: "Frankfurt Stand Concept & 3D Visualisation",
    result: "Client approved full build within 48h of concept delivery",
    img: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80",
    service: "Stand Design + 3D Renders",
  },
  {
    n: "02",
    tag: "Automation",
    title: "CRM & Follow-Up Workflow Build",
    result: "Eliminated 12h/week of manual data entry across team of 4",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    service: "Process Automation",
  },
  {
    n: "03",
    tag: "Intelligence",
    title: "Sector Lead Database — Medical Devices",
    result: "847 verified decision-maker contacts delivered in 5 days",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    service: "Lead Database",
  },
];

export function CaseStudiesSection() {
  return (
    <section className="bg-white border-t border-[#E2DFDA]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-24">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-6">
            <span className="eyebrow">Work</span>
            <h2 className="headline-xl">Selected project outcomes.</h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <Link href="/contact"
              className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors">
              Start a project →
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E2DFDA]">
          {cases.map((c) => (
            <div key={c.n} className="bg-white group flex flex-col">
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#111111]/20 group-hover:bg-transparent transition-colors duration-500" />
                <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-[0.15em] uppercase bg-[#8C7355] text-white px-2.5 py-1">
                  {c.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 lg:p-7 border-t border-[#E2DFDA]">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C7355] mb-3">{c.n}</span>
                <h3 className="font-semibold text-[#111111] text-[16px] leading-snug mb-3 flex-1">{c.title}</h3>
                <div className="border-t border-[#E2DFDA] pt-4 mt-4">
                  <p className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8B8B8B] mb-1">Outcome</p>
                  <p className="text-[13px] text-[#111111] leading-snug">{c.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
