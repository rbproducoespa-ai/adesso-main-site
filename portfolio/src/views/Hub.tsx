import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DivisionCard } from "@/components/DivisionCard";
import { ContactBlock } from "@/components/ContactBlock";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/content/site";
import { publicDivisions } from "@/content/divisions";
import { pick, t, type Locale } from "@/lib/i18n";
import { personJsonLd } from "@/lib/seo";

export function Hub({ locale }: { locale: Locale }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />

      <Header locale={locale} />

      <main id="main">
        {/* ── Title block ────────────────────────────────────────────── */}
        <section className="band border-b border-rule">
          <div className="sheet">
            <p className="label-accent mb-6 animate-rise-in">{pick(site.role, locale)}</p>

            <h1 className="h-display mb-8 max-w-[19ch] animate-rise-in">
              {pick(site.headline, locale)}
            </h1>

            <p className="lede mb-12 animate-rise-in">{pick(site.intro, locale)}</p>

            <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-rule pt-6">
              {pick(site.credentials, locale).map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-px w-4 bg-accent" />
                  <span className="font-mono text-[11px] uppercase tracking-label text-ink-2">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The four doors ─────────────────────────────────────────── */}
        <section className="band">
          <div className="sheet">
            <SectionHead
              title={t(locale, "hub.chooseArea")}
              aside={t(locale, "hub.allAreas")}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              {publicDivisions.map((d) => (
                <DivisionCard key={d.slug} division={d} locale={locale} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <section className="band-tight">
          <div className="sheet">
            <ContactBlock locale={locale} />
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
