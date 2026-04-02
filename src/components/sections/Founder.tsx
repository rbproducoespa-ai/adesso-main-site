import Link from "next/link";

interface FounderSectionProps {
  image?: string;
  name?: string;
  bio?: string;
  whatsapp?: string;
}

export function FounderSection({
  image = "/bruno-castro.jpg",
  name = "Bruno Castro",
  bio = "Founder-led, deliberately small, and built for long-term client relationships. Bruno is available directly — no account manager, no intermediary.",
  whatsapp = "447470361422",
}: FounderSectionProps) {
  return (
    <section className="bg-white border-t border-[#E2DFDA]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — photo + credentials */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              {/* Photo */}
              <div className="relative mb-8 overflow-hidden aspect-[4/5] bg-[#F5F4F1]">
                <img
                  src={image}
                  alt={`${name} — Founder, ADESSO Digital`}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#111111]/70 to-transparent p-5">
                  <p className="text-white font-semibold text-[15px]">{name}</p>
                  <p className="text-white/60 text-[11px] tracking-wide">Founder, ADESSO Digital</p>
                </div>
              </div>

              <span className="eyebrow">The Founder</span>
              <div className="space-y-2 mb-8">
                {["Exhibition Design", "10+ years industry", "UK-based studio", "EU market reach"].map((c) => (
                  <div key={c} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 rounded-full bg-[#8C7355] flex-shrink-0" />
                    <span className="text-[12px] text-[#7A7A7A] tracking-wide">{c}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors w-fit">
                  Message directly →
                </a>
                <Link href="/about"
                  className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8B8B8B] hover:text-[#111111] transition-colors">
                  About ADESSO →
                </Link>
              </div>
            </div>
          </div>

          {/* Right — bio */}
          <div className="lg:col-span-7 lg:col-start-6 space-y-6 body-lead">
            <h2 className="headline-xl mb-8">{name}</h2>

            <p>
              Bruno Castro spent over ten years working on European exhibition floors — managing stand builds,
              coordinating logistics teams, and helping B2B brands present themselves at trade shows from
              London to Frankfurt to Dubai.
            </p>
            <p>
              What he noticed was consistent: companies spending £40,000–£80,000 on a stand had no digital
              strategy, no follow-up system, and no way to measure who actually visited them. The design
              was good. The execution was good. But the commercial layer was completely missing.
            </p>
            <p>
              ADESSO was built to close that gap — starting with exhibition design and visualisation,
              then expanding into automation, lead intelligence, and digital products as clients asked
              for more capability.
            </p>
            <p className="text-[#111111] font-medium">
              Today ADESSO operates across four divisions. The company remains founder-led, direct, and
              deliberately small — because that's what produces better work.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-0 border-t border-[#E2DFDA] pt-10 mt-10">
              {[
                { v: "10+", l: "Years on European\nexhibition floors" },
                { v: "4",   l: "Business divisions\nbuilt and operating" },
                { v: "EU",  l: "European reach\nfrom UK studio" },
              ].map((s) => (
                <div key={s.l} className="pr-8 border-r border-[#E2DFDA] last:border-r-0 last:pr-0">
                  <span className="text-3xl font-bold text-[#111111] font-display block mb-1">{s.v}</span>
                  <span className="text-[11px] text-[#8B8B8B] leading-snug whitespace-pre-line">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
