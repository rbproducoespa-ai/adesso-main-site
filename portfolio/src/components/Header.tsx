import Link from "next/link";
import { site } from "@/content/site";
import { publicDivisions, type DivisionSlug } from "@/content/divisions";
import { localePath, otherLocale, pick, t, type Locale } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
  /** Slug of the area currently open, so it can be marked in the nav. */
  current?: DivisionSlug;
  /** Path without locale prefix, used to keep the language switch on the same page. */
  path?: string;
}

export function Header({ locale, current, path = "" }: HeaderProps) {
  const other = otherLocale(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="sheet flex flex-wrap items-center gap-x-6 gap-y-2 py-3">
        <Link href={localePath(locale)} className="group mr-auto flex items-baseline gap-3">
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{site.name}</span>
          <span className="label hidden sm:inline group-hover:text-ink-2 transition-colors">
            {pick(site.role, locale).split(" · ")[0]}
          </span>
        </Link>

        <nav aria-label={t(locale, "nav.divisions")}>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {publicDivisions.map((d) => {
              const active = d.slug === current;
              return (
                <li key={d.slug}>
                  <Link
                    href={localePath(locale, d.slug)}
                    aria-current={active ? "page" : undefined}
                    className={`font-mono text-[11px] uppercase tracking-label transition-colors ${
                      active ? "text-accent" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {pick(d.name, locale)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4 border-l border-rule pl-4">
          <Link
            href={localePath(locale, "contact")}
            className="font-mono text-[11px] uppercase tracking-label text-ink-2 hover:text-ink transition-colors"
          >
            {t(locale, "nav.contact")}
          </Link>
          <Link
            href={localePath(other, path)}
            hrefLang={other}
            className="font-mono text-[11px] uppercase tracking-label text-ink-3 hover:text-ink transition-colors"
          >
            {other.toUpperCase()}
          </Link>
        </div>
      </div>
    </header>
  );
}
