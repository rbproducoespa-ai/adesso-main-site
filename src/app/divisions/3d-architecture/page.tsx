import type { Metadata } from "next";
import Link from "next/link";
import { Portfolio } from "./Portfolio";
import { getPageContent, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "3D Architecture — ADESSO Digital",
  description: "High-end 3D visualization for architects, developers, and real estate projects. Photorealistic renders, floor plans, animations and walkthroughs.",
  openGraph: {
    title: "ADESSO 3D Architecture — Bringing Architecture to Life Before It Exists",
    description: "Photorealistic renders, masterplans, 3D floor plans and cinematic animations for architects, developers and real estate projects.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

const steps = [
  {
    n: "01",
    title: "Brief & Concept",
    description: "We review your drawings, references, and project goals. You share what you want to communicate — we define the visual approach.",
  },
  {
    n: "02",
    title: "Modelling & Layout",
    description: "Our team builds the 3D model from your architectural plans. Camera angles, lighting studies, and composition are agreed before rendering begins.",
  },
  {
    n: "03",
    title: "Rendering & Refinement",
    description: "High-resolution rendering with photorealistic materials, lighting, and post-production. We refine until the result matches your vision.",
  },
  {
    n: "04",
    title: "Delivery",
    description: "Final files delivered in your required formats — print-ready, web-optimised, or video. Full usage rights included.",
  },
];

const reasons = [
  {
    title: "High-end visual quality",
    description: "Every output is crafted to the standard of top-tier architectural studios in London and Europe.",
  },
  {
    title: "Fast turnaround",
    description: "Standard renders in 5–7 business days. Rush delivery available for time-sensitive presentations.",
  },
  {
    title: "Tailored for architects & developers",
    description: "We understand technical drawings, planning requirements, and the language of architecture.",
  },
  {
    title: "Realistic lighting & materials",
    description: "Physically-based rendering means every surface, shadow, and reflection behaves like the real world.",
  },
  {
    title: "Presentation-ready outputs",
    description: "Files optimised for brochures, websites, pitch decks, and social media — no extra work required.",
  },
  {
    title: "Integrated with ADESSO",
    description: "Combine 3D with exhibition stand design, lead generation, and automation for a complete pre-launch strategy.",
  },
];

export default async function ThreeDArchitecturePage() {
  const c = await getPageContent("main", "architecture_3d");
  const g = (section: string, key: string) => getContent(c, "architecture_3d", section, key);

  const services = [
    {
      n: "01",
      title: "Site Planning",
      subtitle: "Lote / Masterplan",
      description: "Large-scale visualization of developments and land distribution. Aerial perspectives that communicate the full scope of your project to investors, planners, and buyers.",
      img: g("service_images", "img_01"),
    },
    {
      n: "02",
      title: "2D Floor Plans",
      subtitle: "Technical Layouts",
      description: "Clean, precise technical drawings for presentations, planning approvals, and client communication. Publication-ready and fully annotated.",
      img: g("service_images", "img_02"),
    },
    {
      n: "03",
      title: "3D Floor Plans",
      subtitle: "Fully Visualised Layouts",
      description: "Top-down rendered floor plans with furniture, materials, and depth. Give buyers and clients a complete spatial understanding before construction begins.",
      img: g("service_images", "img_03"),
    },
    {
      n: "04",
      title: "Photorealistic Renders",
      subtitle: "Interior & Exterior",
      description: "Ultra-realistic still images that capture lighting, materials, and atmosphere with cinematic precision. Indistinguishable from photography.",
      img: g("service_images", "img_04"),
    },
    {
      n: "05",
      title: "3D Animation",
      subtitle: "Video Walkthroughs",
      description: "Cinematic fly-throughs, interior walkthroughs, and full project storytelling in motion. Ideal for investor presentations, marketing campaigns, and pre-sales.",
      img: g("service_images", "img_05"),
      videoUrl: g("service_images", "video_05"),
    },
  ];

  const heroImg = g("hero", "image");
  const portfolioImgs = [
    g("portfolio", "p1_img"), g("portfolio", "p2_img"), g("portfolio", "p3_img"),
    g("portfolio", "p4_img"), g("portfolio", "p5_img"), g("portfolio", "p6_img"),
    g("portfolio", "p7_img"), g("portfolio", "p8_img"), g("portfolio", "p9_img"),
  ];

  return (
    <main className="bg-[#0A0A0A]">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <img
          src={heroImg}
          alt="3D architectural visualisation"
          className="absolute inset-0 w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-[88px] left-6 lg:left-12 z-10">
          <Link href="/divisions"
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40 hover:text-white/80 transition-colors">
            ← Divisions
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12 pb-24 pt-[160px] w-full">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-4">
            ADESSO 3D Architecture
          </span>
          <h1 className="font-display text-[3.25rem] md:text-[5rem] lg:text-[6rem] font-bold text-white leading-[1.0] tracking-tight mb-6 max-w-4xl">
            Bringing Architecture<br />
            <em className="not-italic text-[#8C7355]">to Life Before It Exists.</em>
          </h1>
          <p className="text-white/60 text-[1.125rem] leading-relaxed max-w-xl mb-10">
            High-end 3D visualization for architects, developers, and real estate projects.
            From masterplans to cinematic animations.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/contact"
              className="bg-[#8C7355] text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#7A6249] transition-colors duration-200">
              Request a Quote
            </a>
            <a href="#portfolio"
              className="border border-white/30 text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-8 py-4 hover:border-white/70 transition-colors duration-200">
              View Our Work ↓
            </a>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 right-12 hidden lg:flex flex-col items-center gap-2 z-10">
          <div className="w-[1px] h-12 bg-white/20" />
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-[#0D0D0D]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Header */}
          <div className="mb-16">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355]">What We Deliver</span>
            <h2 className="font-display text-[2.75rem] font-bold text-white leading-tight mt-2 mb-4">
              Services Overview
            </h2>
            <p className="text-[#7A7A7A] text-[1.0625rem] max-w-2xl leading-relaxed">
              Every service is designed to give your project maximum visual impact — from planning stage to market launch.
            </p>
          </div>

          {/* Services — alternating */}
          <div className="space-y-0">
            {services.map((s, i) => (
              <div key={s.n}
                className={`grid grid-cols-1 lg:grid-cols-2 border border-[#1A1A1A]`}>
                {/* Image or Video */}
                <div className={`relative overflow-hidden ${i % 2 !== 0 ? "lg:order-2" : ""}`}
                  style={{ minHeight: "360px" }}>
                  {"videoUrl" in s && s.videoUrl ? (
                    s.videoUrl.includes("youtube.com") || s.videoUrl.includes("youtu.be") ? (
                      <iframe
                        src={s.videoUrl}
                        className="absolute inset-0 w-full h-full"
                        style={{ border: "none" }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen={false}
                        title={s.title}
                      />
                    ) : (
                      <video
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      >
                        <source src={s.videoUrl} type="video/mp4" />
                      </video>
                    )
                  ) : (
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover absolute inset-0 grayscale hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase bg-[#8C7355] text-white px-3 py-1.5">{s.n}</span>
                  </div>
                </div>
                {/* Content */}
                <div className={`p-10 lg:p-16 flex flex-col justify-center bg-[#111111] ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] mb-4">{s.subtitle}</span>
                  <h3 className="font-display text-[2rem] font-bold text-white mb-4">{s.title}</h3>
                  <p className="text-[#7A7A7A] text-[1rem] leading-relaxed mb-8">{s.description}</p>
                  <a href="/contact"
                    className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] hover:text-white transition-colors group">
                    Get a quote
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO (Client Component) ── */}
      <Portfolio images={portfolioImgs} />

      {/* ── PROCESS ── */}
      <section className="py-24 bg-[#111111]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355]">How It Works</span>
            <h2 className="font-display text-[2.75rem] font-bold text-white leading-tight mt-2 mb-4">
              Our Process
            </h2>
            <p className="text-[#7A7A7A] text-[1.0625rem] max-w-xl leading-relaxed">
              Simple, transparent, and built around your schedule. From first brief to final delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1A1A1A]">
            {steps.map((step, i) => (
              <div key={step.n} className="bg-[#111111] p-10 relative group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-[3.5rem] right-0 w-px h-8 bg-[#8C7355]/30 hidden lg:block" />
                )}
                <div className="font-display text-[4rem] font-bold text-[#8C7355]/20 leading-none mb-4 group-hover:text-[#8C7355]/40 transition-colors duration-300">
                  {step.n}
                </div>
                <h3 className="font-display text-[1.25rem] font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#5C5C5C] text-[0.9rem] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — heading + image */}
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355]">Why Adesso</span>
              <h2 className="font-display text-[2.75rem] font-bold text-white leading-tight mt-2 mb-8">
                The visual standard<br />
                <em className="not-italic text-[#8C7355]">your projects deserve.</em>
              </h2>
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Premium architectural visualisation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-[13px] font-medium">
                    Built by architects for architects — we understand the difference between a render and a vision.
                  </p>
                </div>
              </div>
            </div>

            {/* Right — reasons */}
            <div className="space-y-0">
              {reasons.map((r, i) => (
                <div key={i} className="py-6 border-b border-[#1A1A1A] group cursor-default">
                  <div className="flex items-start gap-4">
                    <span className="w-5 h-5 rounded-full border border-[#8C7355] flex-shrink-0 mt-0.5 group-hover:bg-[#8C7355] transition-colors duration-300" />
                    <div>
                      <h3 className="text-white font-semibold text-[0.9375rem] mb-1 group-hover:text-[#8C7355] transition-colors">{r.title}</h3>
                      <p className="text-[#5C5C5C] text-[0.875rem] leading-relaxed">{r.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING HINT ── */}
      <section className="py-20 bg-[#111111] border-y border-[#1A1A1A]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1A1A1A]">
            {[
              { value: "£300+",  label: "2D Floor Plan" },
              { value: "£600+",  label: "Photorealistic Render" },
              { value: "£900+",  label: "3D Floor Plan Package" },
              { value: "£2,500+", label: "Full Animation" },
            ].map(stat => (
              <div key={stat.label} className="bg-[#111111] p-8 text-center">
                <div className="font-display text-[2.25rem] font-bold text-[#8C7355] mb-1">{stat.value}</div>
                <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#5C5C5C]">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-[#3A3A3A] text-[12px] text-center mt-4">Indicative pricing. Final quotes based on scope and complexity.</p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 overflow-hidden bg-[#0A0A0A]">
        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=2000&q=70"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12 text-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-6">
            Ready to Begin?
          </span>
          <h2 className="font-display text-[2.75rem] md:text-[4rem] font-bold text-white leading-tight mb-6 max-w-3xl mx-auto">
            Turn Your Project Into<br />
            <em className="not-italic text-[#8C7355]">a Visual Experience.</em>
          </h2>
          <p className="text-[#7A7A7A] text-[1.0625rem] max-w-lg mx-auto mb-12 leading-relaxed">
            Send us your drawings, references, and brief. We&apos;ll come back with a proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact"
              className="bg-[#8C7355] text-white text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-5 hover:bg-[#7A6249] transition-colors duration-200">
              Start Your Project →
            </a>
            <a href="/divisions"
              className="border border-[#333] text-[#7A7A7A] text-[11px] font-semibold tracking-[0.2em] uppercase px-10 py-5 hover:border-[#8C7355] hover:text-white transition-colors duration-200">
              Explore All Divisions
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
