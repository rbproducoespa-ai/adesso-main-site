import { BUILD_PHASES, CURRENT_PHASE } from "@/lib/network/constants";
import { getNetworkOverview } from "@/lib/network/queries";

import { PageHeader, Panel } from "../_components/ui";

export const dynamic = "force-dynamic";

/** Spec §3 and §38 — rules that constrain every module, restated where operators see them. */
const NON_NEGOTIABLES = [
  "Mirror the mechanism, never the content: references teach hook type, pacing and structure — never dialogue, footage, likeness or music.",
  "The four creators are fictional. The system never impersonates a celebrity, influencer or private individual.",
  "No real person's likeness or voice without rights or permission.",
  "Realistic AI content is flagged for platform disclosure before it can go out.",
  "Content cannot reach READY while a critical compliance warning is unresolved.",
  "Platform monetisation thresholds are editable records with a source and last_verified_date — never hard-coded.",
  "Demo data is always labelled DEMO and never reported as a real metric.",
];

export default async function NetworkSettings() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const hasSupabase = Boolean(supabaseUrl && !supabaseUrl.includes("YOUR_PROJECT_ID"));
  const hasServiceRole = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { isDemo } = await getNetworkOverview();

  const checks = [
    { label: "Supabase project URL", ok: hasSupabase, hint: "NEXT_PUBLIC_SUPABASE_URL" },
    { label: "Service role key", ok: hasServiceRole, hint: "SUPABASE_SERVICE_ROLE_KEY" },
    { label: "Migrations applied and seeded", ok: !isDemo, hint: "supabase/migrations/0001…0003" },
  ];

  return (
    <>
      <PageHeader
        title="Settings"
        description="Environment status, build phase and the rules every module inherits."
      />

      <div className="grid max-w-5xl gap-4 px-7 py-6 lg:grid-cols-2">
        <Panel
          title="Environment"
          footer="Copy .env.local.example to .env.local and fill in the Supabase values, then apply supabase/migrations."
        >
          <ul className="space-y-2.5">
            {checks.map((check) => (
              <li key={check.label} className="flex items-center gap-3 text-[13px]">
                <span
                  className={`flex h-4 w-4 flex-shrink-0 items-center justify-center text-[10px] ${
                    check.ok ? "bg-success/15 text-success" : "bg-bg-secondary text-text-muted"
                  }`}
                >
                  {check.ok ? "✓" : "—"}
                </span>
                <span className="flex-1">{check.label}</span>
                <code className="text-[10px] text-text-muted">{check.hint}</code>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Build phases" footer={`Currently building Phase ${CURRENT_PHASE}.`}>
          <ol className="space-y-1.5">
            {BUILD_PHASES.map((phase) => {
              const done = phase.n < CURRENT_PHASE;
              const active = phase.n === CURRENT_PHASE;
              return (
                <li key={phase.n} className="flex gap-2.5 text-[12px] leading-relaxed">
                  <span
                    className={`font-mono text-[11px] ${
                      done ? "text-success" : active ? "text-accent" : "text-text-muted"
                    }`}
                  >
                    {done ? "✓" : String(phase.n).padStart(2, "0")}
                  </span>
                  <span className={active ? "text-text-primary" : "text-text-secondary"}>{phase.name}</span>
                </li>
              );
            })}
          </ol>
        </Panel>

        <div className="lg:col-span-2">
          <Panel title="Non-negotiable rules" footer="Full detail in COMPLIANCE.md.">
            <ul className="space-y-2">
              {NON_NEGOTIABLES.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-[13px] leading-relaxed text-text-secondary">
                  <span className="mt-[7px] h-1 w-1 flex-shrink-0 bg-accent" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
