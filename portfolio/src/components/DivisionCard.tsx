import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Division } from "@/content/divisions";
import { localePath, pick, t, type Locale } from "@/lib/i18n";

/**
 * The hub's routing device. Each card carries its own accent so the four
 * areas read as distinct destinations, which is the point of the hub: a stand
 * builder should be able to see, in one glance, which door is theirs.
 */
export function DivisionCard({ division, locale }: { division: Division; locale: Locale }) {
  return (
    <Link
      href={localePath(locale, division.slug)}
      data-accent={division.accent}
      className="group relative flex flex-col border border-rule bg-surface p-6 transition-colors hover:border-accent sm:p-8"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-accent opacity-70 transition-opacity group-hover:opacity-100"
      />

      <div className="mb-5 flex items-baseline gap-3">
        <span className="label-accent figure">{division.number}</span>
        <h2 className="h-card">{pick(division.name, locale)}</h2>
      </div>

      <p className="mb-5 text-[14px] leading-relaxed text-ink-2">
        {pick(division.audience, locale)}
      </p>

      <ul className="mb-8 flex flex-wrap gap-x-2 gap-y-1.5">
        {pick(division.deliverables, locale).map((d) => (
          <li
            key={d}
            className="border border-rule px-2 py-1 font-mono text-[10px] uppercase tracking-label text-ink-3"
          >
            {d}
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-accent">
        {t(locale, "common.viewArea")}
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
