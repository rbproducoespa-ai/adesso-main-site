import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — ADESSO Digital",
  description: "Terms governing your use of adesso.digital and associated subdomains. Governed by the laws of England and Wales.",
  openGraph: {
    title: "Terms of Use — ADESSO Digital",
    description: "Terms governing your use of adesso.digital and associated subdomains.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

const sections = [
  {
    n: "01",
    h: "Acceptance",
    t: "By accessing adesso.digital or any associated subdomain, you agree to these terms of use. If you do not agree, please do not use our website.",
  },
  {
    n: "02",
    h: "Services",
    t: "ADESSO Digital Ltd provides digital services including exhibition design, business automation, lead intelligence products, and digital product development. Service delivery is subject to individual project agreements.",
  },
  {
    n: "03",
    h: "Intellectual Property",
    t: "All content on this website — including text, graphics, logos, and code — is the property of ADESSO Digital Ltd and may not be reproduced without prior written consent.",
  },
  {
    n: "04",
    h: "Limitation of Liability",
    t: "ADESSO Digital Ltd is not liable for any indirect, incidental, or consequential damages arising from your use of this website or our services. Our liability is limited to the value of services directly contracted.",
  },
  {
    n: "05",
    h: "External Links",
    t: "This website may contain links to external sites. ADESSO Digital Ltd is not responsible for the content or practices of those sites.",
  },
  {
    n: "06",
    h: "Governing Law",
    t: "These terms are governed by the laws of England and Wales. Any disputes will be resolved in the courts of England and Wales.",
  },
  {
    n: "07",
    h: "Changes",
    t: "We reserve the right to update these terms at any time. Continued use of the website after changes constitutes acceptance of the updated terms.",
  },
  {
    n: "08",
    h: "Contact",
    t: "For questions about these terms: hello@adesso.digital.",
  },
];

export default function TermsPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="section-pad-sm bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="headline-display mb-4">Terms of Use</h1>
          <p className="body-lead text-[#8B8B8B]">Last updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-pad bg-white">
        <div className="container-xl max-w-3xl">
          {sections.map((s) => (
            <div key={s.n} className="border-t border-[#E2DFDA] py-10 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-1">
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355]">{s.n}</span>
              </div>
              <div className="col-span-12 sm:col-span-11">
                <h2 className="headline-md mb-3">{s.h}</h2>
                <p className="body-base">{s.t}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-[#E2DFDA] pt-10">
            <p className="body-sm text-[#8B8B8B]">
              ADESSO Digital Ltd is registered in England &amp; Wales.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
