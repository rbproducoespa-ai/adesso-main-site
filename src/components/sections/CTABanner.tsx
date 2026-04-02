import Link from "next/link";

interface CTABannerProps {
  image?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  button?: string;
}

export function CTABanner({
  image = "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=80",
  eyebrow = "Work With Us",
  title = "Let's build something\nthat actually works.",
  subtitle = "Fixed-price proposals. Direct communication. A team that understands your market.\nNo account managers. No guesswork.",
  button = "Book a Call",
}: CTABannerProps) {
  const [titleLine1, titleLine2] = title.includes("\n") ? title.split("\n") : [title, ""];
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,10,10,0.91)" }} />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-20 lg:py-28 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Left */}
          <div className="lg:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="headline-xl text-white mb-4">
              {titleLine1}{titleLine2 && <><br />{titleLine2}</>}
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed max-w-lg whitespace-pre-line">
              {subtitle}
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8">
              {["Fixed-price proposals", "UK-based team", "Responds within 24h", "Founder-led"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#8C7355]" />
                  <span className="text-[12px] text-white/50">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTA stack */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-3">
            <Link href="/contact"
              className="block w-full text-center bg-white text-[#111111] text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-4 hover:bg-[#8C7355] hover:text-white transition-colors duration-200">
              {button}
            </Link>
            <a href="https://wa.me/447470361422" target="_blank" rel="noopener noreferrer"
              className="block w-full text-center border border-white/20 text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-4 hover:border-[#8C7355] hover:text-[#8C7355] transition-colors duration-200">
              WhatsApp Us
            </a>
            <a href="mailto:hello@adesso.digital"
              className="block w-full text-center text-white/30 text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-4 hover:text-white/60 transition-colors duration-200">
              hello@adesso.digital
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
