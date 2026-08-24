import Image from "next/image";
import type { WorkItem } from "@/content/work";
import { pick, t, type Locale } from "@/lib/i18n";

/**
 * A work plate. Items without an image render a labelled empty frame stating
 * exactly what to supply, and unfinished items carry a visible PLACEHOLDER
 * badge — so a half-filled portfolio never reads as a finished one.
 */
export function WorkPlate({ item, locale }: { item: WorkItem; locale: Locale }) {
  const isPlaceholder = item.status === "placeholder";

  return (
    <article className="group border border-rule bg-surface">
      <div className="relative aspect-[4/3] overflow-hidden border-b border-rule bg-raised">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <span
              aria-hidden="true"
              className="block h-8 w-8 border border-dashed border-rule-strong"
            />
            <p className="label">{t(locale, "common.imagePending")}</p>
            <p className="max-w-[32ch] font-mono text-[11px] leading-relaxed text-ink-3">
              {pick(item.imageNote, locale)}
            </p>
          </div>
        )}

        {isPlaceholder ? (
          <span className="absolute left-3 top-3 bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-label text-paper">
            {t(locale, "common.placeholder")}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-baseline gap-3">
          <h3 className="h-card">{item.title}</h3>
          {item.year ? <span className="label figure ml-auto shrink-0">{item.year}</span> : null}
        </div>
        <p className="label mb-3">{pick(item.meta, locale)}</p>
        <p className="text-[14px] leading-relaxed text-ink-2">{pick(item.summary, locale)}</p>

        {item.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
            {item.tags.map((tag) => (
              <li key={tag} className="font-mono text-[10px] uppercase tracking-label text-ink-3">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
