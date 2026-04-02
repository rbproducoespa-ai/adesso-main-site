import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ADESSO Digital",
  description: "How ADESSO Digital collects, uses, and protects your personal data in accordance with UK GDPR.",
  openGraph: {
    title: "Privacy Policy — ADESSO Digital",
    description: "How ADESSO Digital collects, uses, and protects your personal data.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

const sections = [
  {
    n: "01",
    h: "Who We Are",
    t: "ADESSO Digital Ltd is a UK-based digital services company. We operate at adesso.digital and associated subdomains. For any privacy-related questions, contact us at hello@adesso.digital.",
  },
  {
    n: "02",
    h: "Data We Collect",
    t: "We collect information you provide directly — such as your name, email address, company name, and message — when you use our contact forms or request a quote. We do not collect payment information directly.",
  },
  {
    n: "03",
    h: "How We Use Your Data",
    t: "We use your data to respond to enquiries, provide requested services, and communicate about projects. We do not sell your data to third parties, and we do not use it for advertising purposes.",
  },
  {
    n: "04",
    h: "Data Storage",
    t: "Your data is stored securely on UK/EU-based infrastructure. We retain contact data for up to 24 months after our last interaction, after which it is deleted unless you have an ongoing relationship with us.",
  },
  {
    n: "05",
    h: "Your Rights",
    t: "Under UK GDPR, you have the right to access, correct, or delete your personal data at any time. To exercise these rights, email hello@adesso.digital.",
  },
  {
    n: "06",
    h: "Cookies",
    t: "Our website uses minimal cookies — only those necessary for basic functionality. We do not use tracking or advertising cookies. You can disable cookies in your browser settings.",
  },
  {
    n: "07",
    h: "Contact",
    t: "For privacy enquiries: hello@adesso.digital. ADESSO Digital Ltd, London, United Kingdom.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="section-pad-sm bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="headline-display mb-4">Privacy Policy</h1>
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
