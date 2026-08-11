import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionHead } from "@/components/SectionHead";
import { WorkPlate } from "@/components/WorkPlate";
import { ContactBlock } from "@/components/ContactBlock";
import type { Division } from "@/content/divisions";
import { workForDivision } from "@/content/work";
import { localePath, pick, t, type Locale } from "@/lib/i18n";

export function DivisionView({ division, locale }: { division: Division; locale: Locale }) {
  const items = workForDivision(division.slug);
  const capabilities = pick(division.capabilities, locale);
  const process = pick(division.process, locale);
  const engagement = pick(division.engagement, locale);

  return (
    <div data-accent={division.accent}>
      <Header locale={locale} current={division.slug} path={division.slug} />

      <main id="main">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section className="band border-b border-rule">
          <div className="sheet">
            <div className="mb-6 flex items-baseline gap-3">
              <span className="label-accent figure">{division.number}</span>
              <span className="label">{pick(division.name, locale)}</span>
            </div>

            <h1 className="h-display mb-6 max-w-[20ch] animate-rise-in">
              {pick(division.headline, locale)}
            </h1>

            <p className="mb-8 max-w-prose text-[15px] font-medium text-ink">
              {pick(division.audience, locale)}
            </p>

            <p className="lede mb-12">{pick(division.intro, locale)}</p>

            <div className="border-t border-rule pt-6">
              <p className="label mb-4">{t(locale, "common.deliverables")}</p>
              <ul className="flex flex-wrap gap-2">
                {pick(division.deliverables, locale).map((d) => (
                  <li
                    key={d}
                    className="border border-rule-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-label"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Capabilities ───────────────────────────────────────────── */}
        <section className="band">
          <div className="sheet">
            <SectionHead title={t(locale, "common.capabilities")} />

            <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {capabilities.map((group) => (
                <div key={group.title}>
                  <h3 className="h-card mb-3 border-b border-rule pb-2">{group.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="relative pl-5 text-[14px] leading-relaxed text-ink-2">
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-[0.7em] h-px w-3 bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {division.tools.length > 0 ? (
              <div className="mt-12 border-t border-rule pt-6">
                <p className="label mb-3">{t(locale, "common.tools")}</p>
                <ul className="flex flex-wrap gap-x-5 gap-y-2">
                  {division.tools.map((tool) => (
                    <li key={tool} className="font-mono text-[12px] text-ink-2">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        {/* ── Work ───────────────────────────────────────────────────── */}
        {items.length > 0 ? (
          <section className="band-tight">
            <div className="sheet">
              <SectionHead title={t(locale, "common.selectedWork")} />
              <div className="grid gap-5 lg:grid-cols-2">
                {items.map((item) => (
                  <WorkPlate key={item.id} item={item} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ── Process ────────────────────────────────────────────────── */}
        <section className="band">
          <div className="sheet">
            <SectionHead title={t(locale, "common.howIWork")} />

            {/* Numbered because these steps genuinely run in order. */}
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {process.map((step, i) => (
                <li key={step.step} className="border border-rule bg-surface p-6">
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="label-accent figure">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="h-card">{step.step}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-2">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Engagement ─────────────────────────────────────────────── */}
        <section className="band-tight">
          <div className="sheet">
            <SectionHead title={t(locale, "common.engagement")} />

            <p className="body-text mb-6">{engagement.note}</p>

            <div className="scroll-x border border-rule-strong bg-surface">
              <table className="w-full min-w-[420px] border-collapse">
                <tbody>
                  {engagement.lines.map((line) => (
                    <tr key={line.label} className="border-b border-rule last:border-b-0">
                      <td className="px-4 py-3 text-[14px]">{line.label}</td>
                      <td className="px-4 py-3 text-right font-mono text-[13px] tabular-nums text-ink-2">
                        {line.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <section className="band-tight">
          <div className="sheet">
            <ContactBlock
              locale={locale}
              waMessage={`${pick(division.name, locale)} — `}
            />

            <Link
              href={localePath(locale)}
              className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-ink-2 hover:text-ink transition-colors"
            >
              <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
              {t(locale, "common.backToAreas")}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
