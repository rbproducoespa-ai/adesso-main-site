import Link from "next/link";

interface HeroSectionProps {
  image?: string;
  eyebrow?: string;
  location?: string;
  title1?: string;
  title2?: string;
  accent?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  projectTitle?: string;
  projectServices?: string;
  projectShow?: string;
}

export function HeroSection({
  image = "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=85",
  eyebrow = "ADESSO Digital",
  location = "London, United Kingdom",
  title1 = "We build the digital",
  title2 = "infrastructure for",
  accent = "ambitious businesses.",
  subtitle = "Stand design. Automation systems.\nLead databases. Digital products.\nADESSO delivers across four specialist divisions.",
  ctaPrimary = "Book a consultation",
  ctaSecondary = "Our divisions",
  projectTitle = "Frankfurt Exhibition Stand",
  projectServices = "Design + 3D + On-site",
  projectShow = "Automechanika 2025",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[100svh] flex flex-col bg-white pt-[72px] overflow-hidden">

      {/* Top rule */}
      <div className="absolute top-[72px] left-0 right-0 border-b border-[#E2DFDA] z-10" />

      {/* Dot grid background */}
      <div
        className="absolute inset-0 top-[72px] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #D4CFC8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }}
      />

      <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-2 z-10">

        {/* LEFT — text content */}
        <div className="flex flex-col justify-end px-6 lg:px-12 pb-12 lg:pb-16 pt-12 lg:pt-20 max-w-[1400px] lg:max-w-none">

          {/* Eyebrow strip */}
          <div className="flex items-center gap-6 mb-10 lg:mb-14">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#8C7355]">
              {eyebrow}
            </span>
            <span className="h-px w-16 bg-[#E2DFDA]" />
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B0A898]">
              {location}
            </span>
          </div>

          <h1 className="headline-display mb-8" style={{ lineHeight: "1.05" }}>
            {title1}<br />
            {title2}<br />
            <em className="not-italic text-[#8C7355]">{accent}</em>
          </h1>

          <p className="body-lead text-[#5C5C5C] text-[15px] leading-[1.7] max-w-md mb-8 whitespace-pre-line">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 mb-12 lg:mb-16">
            <Link href="/contact"
              className="bg-[#1A1A1A] text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-7 py-4 hover:bg-[#8C7355] transition-colors duration-200">
              {ctaPrimary}
            </Link>
            <Link href="/divisions"
              className="border border-[#C5C0B8] text-[#111111] text-[11px] font-semibold tracking-[0.18em] uppercase px-7 py-4 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200">
              {ctaSecondary}
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-8 border-t border-[#E2DFDA] grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "4",    label: "Business divisions" },
              { value: "10+",  label: "Years experience" },
              { value: "EU",   label: "European reach" },
              { value: "B2B",  label: "Focused" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#111111] font-display">{s.value}</span>
                <span className="text-[11px] text-[#8B8B8B] tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — image panel */}
        <div className="hidden lg:block relative">
          {/* Thin left border line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-[#E2DFDA] z-10" />

          <img
            src={image}
            alt="Modern European business architecture"
            className="w-full h-full object-cover object-center"
            style={{ minHeight: "calc(100svh - 72px)" }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/60 via-transparent to-transparent" />

          {/* Floating project card */}
          <div className="absolute bottom-10 left-8 right-8 bg-white/95 backdrop-blur-sm border border-[#E2DFDA] p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#8C7355] mb-1">Active Project</p>
                <p className="font-semibold text-[#111111] text-[14px]">{projectTitle}</p>
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase bg-[#8C7355] text-white px-2.5 py-1">In Progress</span>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] text-[#8B8B8B] tracking-wide mb-0.5">Services</p>
                <p className="text-[12px] font-medium text-[#111111]">{projectServices}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#8B8B8B] tracking-wide mb-0.5">Show</p>
                <p className="text-[12px] font-medium text-[#111111]">{projectShow}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
