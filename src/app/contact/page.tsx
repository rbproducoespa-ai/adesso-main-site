import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { URLS } from "@/lib/urls";
import { getPageContent, getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — ADESSO Digital",
  description: "Get in touch with ADESSO Digital. Fixed-price proposals, direct communication, and a response within 24 hours. UK-based studio serving European markets.",
  openGraph: {
    title: "Contact ADESSO Digital",
    description: "Get in touch. Fixed-price proposals, direct communication. We respond within 24 hours.",
    type: "website",
    siteName: "ADESSO Digital",
    locale: "en_GB",
  },
};

export default async function ContactPage() {
  const c = await getPageContent("main", "contact");
  const g = (section: string, key: string) => getContent(c, "contact", section, key);

  const email = g("hero", "email");
  const whatsapp = g("hero", "whatsapp");
  const location = g("hero", "location");

  const ways = [
    { label: "Email",    value: email,    href: `mailto:${email}` },
    { label: "WhatsApp", value: `+${whatsapp.replace(/\D/g, "")}`,  href: `https://wa.me/${whatsapp.replace(/\D/g, "")}` },
    { label: "Location", value: location,  href: null },
  ];

  return (
    <main>
      {/* ── Header ── */}
      <section className="section-pad bg-white border-b border-[#E2DFDA] pt-[92px] lg:pt-[104px]">
        <div className="container-xl">
          <div className="max-w-2xl">
            <span className="eyebrow">Get In Touch</span>
            <h1 className="headline-display mb-6">
              {g("hero", "title1")}<br />
              <em className="text-[#8C7355] not-italic">{g("hero", "accent")}</em>
            </h1>
            <p className="body-lead">
              We respond to every enquiry within 24 hours. Tell us what you're working on —
              we'll let you know if we can help, and how.
            </p>
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-4">
              <h2 className="headline-md mb-8">Contact details</h2>
              <div className="space-y-6">
                {ways.map((w) => (
                  <div key={w.label}>
                    <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#8C7355] block mb-1">{w.label}</span>
                    {w.href ? (
                      <a href={w.href} className="font-medium text-[#111111] hover:text-[#8C7355] transition-colors text-[15px]">{w.value}</a>
                    ) : (
                      <span className="text-[15px] text-[#5C5C5C]">{w.value}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t border-[#E2DFDA] pt-8">
                <p className="body-sm mb-4">Looking for a specific division?</p>
                <ul className="space-y-2">
                  {[
                    ["Exhibition", URLS.exhibition],
                    ["Automation", URLS.automation],
                    ["Lead Intelligence", URLS.leads],
                    ["Lab", URLS.lab],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] text-[#8C7355] font-medium hover:underline">
                        {label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
