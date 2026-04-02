import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Brief & Discovery",
    body: "We start with a direct conversation — no lengthy forms or RFP processes. Tell us what you need and we will tell you honestly whether we can deliver it, at what cost and in what timeframe.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="14" r="11" />
        <path d="M14 10v4l3 3" />
        <circle cx="14" cy="7" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Proposal & Scope",
    body: "A clear written proposal with scope, deliverables, timeline and fixed price. No hidden costs, no scope creep without agreement. You know exactly what you are getting before you commit.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h14a2 2 0 0 1 2 2v18l-5-2-5 2-5-2-5 2V5a2 2 0 0 1 2-2z" />
        <line x1="10" y1="10" x2="18" y2="10" />
        <line x1="10" y1="14" x2="18" y2="14" />
        <line x1="10" y1="18" x2="14" y2="18" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Build & Delivery",
    body: "We work fast and we communicate throughout. You will not be left waiting for updates. The work is reviewed together and refined until it meets the standard we agreed on.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8L12 17l-5-5" />
        <circle cx="14" cy="14" r="11" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Handover & Scale",
    body: "Everything we build is handed over properly — with documentation, access and support built in. The relationship does not end at delivery. We build long-term, not one-off.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20L12 12l4 4 8-10" />
        <polyline points="18 6 24 6 24 12" />
      </svg>
    ),
  },
];

export function ProcessSection() {
  return (
    <section className="bg-white section-pad border-t border-[#E2DFDA]">
      <div className="container-xl">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <span className="eyebrow">How We Work</span>
            <h2 className="headline-xl">
              Simple, direct,<br />no agency overhead.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <p className="body-lead">
              Four steps from first conversation to delivered result. No bloated process, no endless meetings.
              Direct access to the people doing the work.
            </p>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E2DFDA]">
          {steps.map((step) => (
            <div key={step.num} className="bg-white p-8 lg:p-10 group hover:bg-[#F5F4F1] transition-colors duration-200">

              {/* Large step number */}
              <div className="step-num mb-2">{step.num}</div>

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center border border-[#E2DFDA] text-[#8C7355] mb-5 group-hover:bg-[#8C7355] group-hover:border-[#8C7355] group-hover:text-white transition-all duration-300">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-bold text-[#111111] mb-3 group-hover:text-[#8C7355] transition-colors">
                {step.title}
              </h3>

              {/* Body */}
              <p className="body-sm leading-[1.72]">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA below */}
        <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 pt-12 border-t border-[#E2DFDA]">
          <p className="body-lead text-center sm:text-left">
            Ready to start? Book a call and we will talk through your project within 24 hours.
          </p>
          <Link href="/contact" className="btn-primary whitespace-nowrap flex-shrink-0">
            Book a free call
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
