import Link from "next/link";

import { CURRENT_PHASE, MODULE_SCOPE, NAV_ITEMS } from "@/lib/network/constants";

export function PageHeader({
  title,
  description,
  right,
}: {
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start gap-4 border-b border-border px-7 py-6">
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-[22px] font-bold leading-tight">{title}</h1>
        {description && (
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {right}
    </div>
  );
}

/** Spec §43 — demo numbers must never be presented as real metrics. */
export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-secondary">
      Demo data
    </span>
  );
}

export function StatCard({
  label,
  value,
  hint,
  isDemo,
}: {
  label: string;
  value: string;
  hint?: string;
  isDemo?: boolean;
}) {
  return (
    <div className="border border-border bg-bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
          {label}
        </span>
        {isDemo && <span className="text-[9px] font-bold tracking-widest text-accent/70">DEMO</span>}
      </div>
      <div className="mt-2 font-display text-[22px] font-bold leading-none tabular-nums">{value}</div>
      {hint && <div className="mt-1.5 text-[11px] text-text-secondary">{hint}</div>}
    </div>
  );
}

export function Panel({
  title,
  children,
  footer,
}: {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-bg-card">
      <h2 className="border-b border-border px-4 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
        {title}
      </h2>
      <div className="p-4">{children}</div>
      {footer && <div className="border-t border-border px-4 py-3 text-[11px] text-text-muted">{footer}</div>}
    </section>
  );
}

/**
 * Roadmap stub for a module a later phase delivers. It states the spec section
 * and the scope so the plan is visible in the product, rather than pretending
 * the screen is broken.
 */
export function ModuleStub({ href }: { href: string }) {
  const item = NAV_ITEMS.find((i) => i.href === href);
  const scope = MODULE_SCOPE[href];

  return (
    <>
      <PageHeader
        title={item?.label ?? "Module"}
        description={
          scope
            ? `Specified in section ${scope.spec}. Scheduled for Phase ${item?.phase}.`
            : `Scheduled for Phase ${item?.phase}.`
        }
        right={
          <span className="border border-border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted">
            Phase {item?.phase} · not built
          </span>
        }
      />
      <div className="max-w-3xl space-y-4 px-7 py-6">
        <Panel title="What this module will do">
          <ul className="space-y-2">
            {(scope?.scope ?? []).map((line) => (
              <li key={line} className="flex gap-2.5 text-[13px] leading-relaxed text-text-secondary">
                <span className="mt-[7px] h-1 w-1 flex-shrink-0 bg-accent" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Panel>
        <p className="text-[12px] text-text-muted">
          Phase {CURRENT_PHASE} is the current build. The schema behind this screen already exists in{" "}
          <code className="text-text-secondary">supabase/migrations</code> — see{" "}
          <Link href="/network" className="text-accent hover:underline">
            the dashboard
          </Link>{" "}
          and ROADMAP.md for sequencing.
        </p>
      </div>
    </>
  );
}
