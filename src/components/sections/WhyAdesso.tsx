import Link from "next/link";

const reasons = [
  { n: "01", title: "Built inside the industry", body: "Founded by an exhibition professional with 10+ years on European trade show floors. We don't guess at your market — we've worked in it." },
  { n: "02", title: "Commercial focus, not delivery theatre", body: "We measure our work by business outcomes — qualified leads, operational efficiency, revenue. Not by hours billed or slide decks produced." },
  { n: "03", title: "Four divisions, one relationship", body: "Need stand design and a follow-up automation system? We handle both. No handoffs, no briefing multiple agencies. One company, full capability." },
  { n: "04", title: "Fast, direct, no overhead", body: "No account managers. No project management layers. You work directly with the people doing the work. Decisions happen in hours, not weeks." },
  { n: "05", title: "Products, not just services", body: "We build and sell our own data products and SaaS tools — which means we approach client work with a product mindset, not a time-and-materials mentality." },
  { n: "06", title: "Transparent pricing, always", body: "Fixed-price proposals. Starting prices published for every service. No surprises at invoice time. You know the number before we start." },
];

export function WhyAdessoSection() {
  return (
    <section className="bg-[#111111]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-24">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 pb-12 border-b border-white/10">
          <div className="lg:col-span-6">
            <span className="eyebrow">Why ADESSO</span>
            <h2 className="headline-xl text-white">The case for working with us.</h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="body-lead text-[#7A7A7A]">
              Six reasons companies choose ADESSO over generalist agencies, freelancers, or in-house teams.
            </p>
          </div>
        </div>

        {/* Reasons — editorial list */}
        <div className="space-y-0">
          {reasons.map((r, i) => (
            <div key={r.n} className={`grid grid-cols-12 gap-6 py-8 border-b border-white/10 group ${i === 0 ? "border-t border-white/10" : ""}`}>
              <div className="col-span-1 lg:col-span-1">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C7355]">{r.n}</span>
              </div>
              <div className="col-span-11 lg:col-span-4">
                <h3 className="font-semibold text-white text-[16px] leading-snug">{r.title}</h3>
              </div>
              <div className="col-span-11 col-start-2 lg:col-span-6 lg:col-start-auto">
                <p className="text-[#7A7A7A] text-[14px] leading-relaxed">{r.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-12 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-[#7A7A7A] text-sm max-w-md">
            Ready to work with a company that actually understands your market?
          </p>
          <Link href="/contact"
            className="bg-white text-[#111111] text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3.5 hover:bg-[#8C7355] hover:text-white transition-colors duration-200 flex-shrink-0">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
