import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBlock } from "@/components/ContactBlock";
import { publicDivisions } from "@/content/divisions";
import { localePath, pick, t, type Locale } from "@/lib/i18n";

export function Contact({ locale }: { locale: Locale }) {
  return (
    <>
      <Header locale={locale} path="contact" />

      <main id="main">
        <section className="band">
          <div className="sheet">
            <ContactBlock locale={locale} />

            <div className="mt-12">
              <p className="label mb-4">{t(locale, "nav.divisions")}</p>
              <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
                {publicDivisions.map((d) => (
                  <li key={d.slug} data-accent={d.accent} className="bg-surface">
                    <Link
                      href={localePath(locale, d.slug)}
                      className="flex items-baseline gap-3 p-5 transition-colors hover:bg-raised"
                    >
                      <span className="label-accent figure">{d.number}</span>
                      <span>
                        <span className="block text-[15px] font-semibold">
                          {pick(d.name, locale)}
                        </span>
                        <span className="mt-1 block text-[13px] leading-relaxed text-ink-2">
                          {pick(d.audience, locale)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
