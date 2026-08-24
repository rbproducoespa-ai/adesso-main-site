import Link from "next/link";
import { site, whatsappLink } from "@/content/site";
import { publicDivisions } from "@/content/divisions";
import { localePath, pick, t, type Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="rule-top mt-24 bg-surface">
      <div className="sheet grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[15px] font-semibold">{site.name}</p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-ink-3">
            {pick(site.role, locale)}
          </p>
        </div>

        <nav aria-label={t(locale, "nav.divisions")}>
          <p className="label mb-3">{t(locale, "nav.divisions")}</p>
          <ul className="flex flex-col gap-2">
            {publicDivisions.map((d) => (
              <li key={d.slug}>
                <Link
                  href={localePath(locale, d.slug)}
                  className="text-[13px] text-ink-2 hover:text-ink transition-colors"
                >
                  {pick(d.name, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label mb-3">{t(locale, "nav.contact")}</p>
          <ul className="flex flex-col gap-2 text-[13px]">
            <li>
              <a href={`mailto:${site.email}`} className="text-ink-2 hover:text-ink transition-colors">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-2 hover:text-ink transition-colors"
              >
                WhatsApp
              </a>
            </li>
            {site.social.linkedin ? (
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-2 hover:text-ink transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <p className="label mb-3">{t(locale, "common.basedIn")}</p>
          <p className="text-[13px] leading-relaxed text-ink-2">
            {pick(site.location, locale)}
            <br />
            {pick(site.availability, locale)}
          </p>
          <p className="label mt-4 mb-1">{t(locale, "common.languages")}</p>
          <p className="text-[13px] text-ink-2">{pick(site.languages, locale)}</p>
        </div>
      </div>

      <div className="rule-top">
        <div className="sheet flex flex-wrap items-center justify-between gap-3 py-5">
          <p className="font-mono text-[10px] uppercase tracking-label text-ink-3">
            © {year} {site.name}. {t(locale, "footer.rights")}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-label text-ink-3">
            {t(locale, "footer.builtWith")}
          </p>
        </div>
      </div>
    </footer>
  );
}
