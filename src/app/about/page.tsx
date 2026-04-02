import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — ADESSO Digital",
  description: "The story behind ADESSO: a digital studio built on exhibition industry experience, operational discipline, and a belief that most agencies over-promise.",
  openGraph: {
    title: "About ADESSO Digital",
    description: "Founded by an exhibition professional with 10+ years on European trade show floors. Direct, founder-led, and built for long-term client relationships.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

const steps = [
  { n: "01", title: "Brief & Discovery",    body: "We start by understanding your business, audience, and objectives — before touching any design or code." },
  { n: "02", title: "Strategy & Proposal",  body: "A clear scope, timeline, and investment summary. No surprises." },
  { n: "03", title: "Build & Review",       body: "Iterative delivery with regular check-ins. You see work in progress, not just a final reveal." },
  { n: "04", title: "Launch & Support",     body: "Go-live, handover, and 30-day post-launch support included as standard." },
];

const values = [
  { n: "01", title: "No Vanity Metrics",    body: "We measure what moves your business. Not impressions, not reach — qualified leads, revenue, conversions." },
  { n: "02", title: "Operational Honesty",  body: "If something won't work or isn't right for you, we say so. Straightforward advice over comfortable agreement." },
  { n: "03", title: "Quality Over Volume",  body: "We take on a limited number of clients at a time to maintain craft standards. We are not a production line." },
  { n: "04", title: "European Market Depth", body: "We understand the exhibition circuit, the trade show calendar, and the commercial rhythms of B2B Europe." },
  { n: "05", title: "Lean & Effective",     body: "No account managers, no layers. You work directly with the people building your project." },
  { n: "06", title: "Long-Term Thinking",   body: "We'd rather be your agency for five years than close a deal and disappear." },
];

export default async function AboutPage() {
  const c = await getPageContent("main", "about");
  const g = (section: string, key: string) => getContent(c, "about", section, key);

  return (
    <main>
      {/* ── Hero — dark with image ── */}
      <section className="relative min-h-[70vh] flex items-end bg-[#111111] pt-[72px] overflow-hidden">
        <img
          src={g("hero", "image")}
          alt="ADESSO Digital studio"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-20 z-10 w-full">
          <div className="max-w-3xl">
            <span className="eyebrow">About ADESSO</span>
            <h1 className="headline-display text-white mb-6" style={{ lineHeight: "1.05" }}>
              {g("hero", "title1")}<br />
              <em className="not-italic text-[#8C7355]">{g("hero", "accent")}</em>
            </h1>
            <p className="body-lead text-white/60 max-w-2xl whitespace-pre-line">
              {g("hero", "subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* ── Story — split with image ── */}
      <section className="bg-white border-b border-[#E2DFDA]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto min-h-[420px] overflow-hidden">
            <img
              src={g("story", "image")}
              alt="Exhibition hall with stands"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#111111]/10" />
          </div>
          {/* Text */}
          <div className="px-8 py-16 lg:px-16 lg:py-20 flex flex-col justify-center">
            <span className="eyebrow">The Story</span>
            <h2 className="headline-xl mb-8">{g("story", "title")}</h2>
            <div className="space-y-5 body-lead">
              <p>
                After years working across European exhibition floors — managing stand builds, coordinating
                logistics teams, and helping brands present themselves at trade shows — Bruno noticed that
                the digital layer of the industry was still largely broken. Companies spending £50,000 on
                a stand had no digital strategy, no follow-up system, and no way to measure who actually
                visited them.
              </p>
              <p>
                ADESSO was created to close that gap: to be the digital partner that exhibition companies,
                B2B brands, and European businesses actually needed. Not a generalist agency, but one with
                deep sector knowledge and a bias toward execution over presentation.
              </p>
              <p>
                Today the company operates across four divisions — Exhibition, Automation, Lead Intelligence,
                and Lab — each addressing a different layer of the same problem: helping businesses build,
                scale, and perform in competitive markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          <div className="mb-14">
            <span className="eyebrow">How We Work</span>
            <h2 className="headline-xl max-w-lg">A clear process.<br />No surprises.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E2DFDA]">
            {steps.map((s) => (
              <div key={s.n} className="bg-[#F5F4F1] p-8 hover:bg-white transition-colors">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-3">{s.n}</span>
                <h3 className="headline-md mb-3">{s.title}</h3>
                <p className="body-base">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values — dark ── */}
      <section className="section-pad bg-[#111111]">
        <div className="container-xl">
          <div className="mb-14">
            <span className="eyebrow">What We Stand For</span>
            <h2 className="headline-xl text-white">Six principles.<br />Non-negotiable.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-white/10">
            {values.map((v, i) => (
              <div
                key={v.n}
                className={`py-8 pr-8 border-b border-white/10 ${
                  (i + 1) % 3 !== 0 ? "lg:border-r lg:border-white/10" : ""
                }`}
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-3">{v.n}</span>
                <h3 className="text-white font-semibold text-lg mb-2 leading-snug">{v.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder photo strip ── */}
      <section className="bg-white border-t border-[#E2DFDA]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="px-8 py-16 lg:px-16 lg:py-20 flex flex-col justify-center order-2 lg:order-1">
            <span className="eyebrow">The Founder</span>
            <h2 className="headline-xl mb-6">{g("founder", "name")}</h2>
            <p className="body-lead mb-8 whitespace-pre-line">{g("founder", "bio")}</p>
            <div className="flex flex-col gap-3">
              <a href={`https://wa.me/${g("founder", "whatsapp")}`} target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] border-b border-[#8C7355] pb-0.5 hover:text-[#111111] hover:border-[#111111] transition-colors w-fit">
                Message directly →
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto min-h-[400px] overflow-hidden order-1 lg:order-2">
            <img
              src={g("founder", "image")}
              alt={`${g("founder", "name")} — Founder`}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-pad-sm bg-[#F5F4F1] border-t border-[#E2DFDA]">
        <div className="container-xl text-center">
          <span className="eyebrow">Work With Us</span>
          <h2 className="headline-xl mb-6">Ready to start?</h2>
          <p className="body-lead max-w-lg mx-auto mb-8">Tell us what you're building. We'll tell you if — and how — we can help.</p>
          <Link href="/contact" className="btn-primary">Start a Conversation</Link>
        </div>
      </section>
    </main>
  );
}
