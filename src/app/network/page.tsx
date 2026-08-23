import Link from "next/link";

import {
  BUCKET_LABEL, DAILY_QUESTIONS, DEFAULT_PORTFOLIO_MIX, LAUNCH_PLAN, PLATFORM_LABEL,
} from "@/lib/network/constants";
import { getNetworkOverview } from "@/lib/network/queries";
import type { ContentBucket } from "@/lib/network/types";

import { DemoBadge, PageHeader, Panel, StatCard } from "./_components/ui";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("en-GB");
const cf = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" });

const compact = (n: number) => new Intl.NumberFormat("en-GB", { notation: "compact", maximumFractionDigits: 1 }).format(n);

const STATUS_STYLE: Record<string, string> = {
  live: "border-success/40 text-success",
  launching: "border-accent/40 text-accent-secondary",
  planned: "border-border text-text-muted",
  paused: "border-border text-text-muted",
};

export default async function NetworkDashboard() {
  const { isDemo, kpis, characters } = await getNetworkOverview();

  return (
    <>
      <PageHeader
        title="Network Dashboard"
        description="One network, four fictional creators. Discover what works, produce original versions, measure, and scale the winners."
        right={isDemo ? <DemoBadge /> : undefined}
      />

      <div className="space-y-6 px-7 py-6">
        {isDemo && (
          <p className="border border-accent/30 bg-accent/5 px-4 py-3 text-[12px] leading-relaxed text-text-secondary">
            <strong className="text-accent-secondary">Demo data.</strong> Supabase is not connected, or the{" "}
            <code className="text-text-primary">cn_*</code> tables have not been seeded yet. Every follower,
            view, order and revenue figure below is fabricated for interface development and must not be
            reported as a real metric.
          </p>
        )}

        {/* Reach — spec §16 */}
        <section>
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">Reach</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <StatCard isDemo={isDemo} label="Total followers" value={nf.format(kpis.totalFollowers)} hint="Across 12 accounts" />
            <StatCard isDemo={isDemo} label="Total views" value={compact(kpis.totalViews)} />
            <StatCard isDemo={isDemo} label="Views · 7 days" value={compact(kpis.views7d)} />
            <StatCard isDemo={isDemo} label="Views · 30 days" value={compact(kpis.views30d)} />
            <StatCard isDemo={isDemo} label="Videos published" value={nf.format(kpis.videosPublished)} />
          </div>
        </section>

        {/* Revenue — spec §16, §35 */}
        <section>
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">Revenue</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <StatCard isDemo={isDemo} label="Total revenue" value={cf.format(kpis.totalRevenue)} />
            <StatCard isDemo={isDemo} label="TikTok Shop" value={cf.format(kpis.tiktokShopRevenue)} />
            <StatCard isDemo={isDemo} label="Affiliate" value={cf.format(kpis.affiliateRevenue)} />
            <StatCard isDemo={isDemo} label="Brand deals" value={cf.format(kpis.brandRevenue)} />
            <StatCard isDemo={isDemo} label="Revenue per video" value={cf.format(kpis.revenuePerVideo)} />
          </div>
        </section>

        {/* Retention and commerce — spec §16 */}
        <section>
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
            Retention &amp; commerce
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            <StatCard isDemo={isDemo} label="Avg watch time" value={`${kpis.avgWatchSeconds.toFixed(1)}s`} />
            <StatCard isDemo={isDemo} label="Avg completion" value={`${kpis.avgCompletionRate.toFixed(1)}%`} />
            <StatCard isDemo={isDemo} label="Product clicks" value={nf.format(kpis.productClicks)} />
            <StatCard isDemo={isDemo} label="Orders" value={nf.format(kpis.orders)} />
            <StatCard isDemo={isDemo} label="Conversion rate" value={`${kpis.conversionRate.toFixed(2)}%`} />
          </div>
        </section>

        {/* Character cards — spec §16 */}
        <section>
          <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">Characters</h2>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {characters.map(({ character, followers, topPlatform, topVideoTitle, topVideoViews, revenue, videosPublished, status }) => (
              <article key={character.id} className="flex flex-col border border-border bg-bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-[15px] font-bold">{character.name}</h3>
                    <p className="text-[11px] text-text-muted">
                      {character.age_range} · {character.market ?? "UK"}
                    </p>
                  </div>
                  <span className={`border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] ${STATUS_STYLE[status]}`}>
                    {status}
                  </span>
                </div>

                <dl className="mt-3.5 grid grid-cols-3 gap-2 border-y border-border py-3">
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Followers</dt>
                    <dd className="mt-0.5 text-[14px] font-bold tabular-nums">{compact(followers)}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Videos</dt>
                    <dd className="mt-0.5 text-[14px] font-bold tabular-nums">{videosPublished}</dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.12em] text-text-muted">Revenue</dt>
                    <dd className="mt-0.5 text-[14px] font-bold tabular-nums">{cf.format(revenue)}</dd>
                  </div>
                </dl>

                <div className="mt-3 flex-1 space-y-1.5 text-[11px]">
                  <div className="text-text-muted">
                    Top platform:{" "}
                    <span className="text-text-secondary">
                      {topPlatform ? PLATFORM_LABEL[topPlatform] : "—"}
                    </span>
                  </div>
                  <div className="text-text-muted">
                    Top video:{" "}
                    <span className="text-text-secondary">
                      {topVideoTitle ?? (topVideoViews > 0 ? `${compact(topVideoViews)} views` : "—")}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {character.content_pillars.slice(0, 3).map((pillar) => (
                    <span key={pillar} className="border border-border px-1.5 py-0.5 text-[9px] text-text-muted">
                      {pillar}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* 90-day launch plan — spec §10 */}
          <Panel title="90-day launch plan">
            <ol className="space-y-3">
              {LAUNCH_PLAN.map((step) => (
                <li key={step.window} className="border-l-2 border-accent/40 pl-3">
                  <div className="text-[12px] font-semibold">{step.focus}</div>
                  <div className="text-[11px] text-text-muted">{step.window}</div>
                  <div className="mt-0.5 text-[11px] text-text-secondary">{step.note}</div>
                </li>
              ))}
            </ol>
          </Panel>

          {/* Content portfolio — spec §11 */}
          <Panel
            title="Content portfolio"
            footer="Configurable — rebalanced from performance data, not fixed."
          >
            <div className="space-y-3">
              {(Object.keys(DEFAULT_PORTFOLIO_MIX) as ContentBucket[]).map((bucket) => (
                <div key={bucket}>
                  <div className="mb-1 flex justify-between text-[11px]">
                    <span className="text-text-secondary">{BUCKET_LABEL[bucket]}</span>
                    <span className="tabular-nums text-text-muted">{DEFAULT_PORTFOLIO_MIX[bucket]}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-secondary">
                    <div className="h-full bg-accent" style={{ width: `${DEFAULT_PORTFOLIO_MIX[bucket]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* The five questions — spec §46 */}
          <Panel
            title="Answered daily"
            footer={
              <>
                Read the plan in ROADMAP.md ·{" "}
                <Link href="/network/settings" className="text-accent hover:underline">
                  Settings
                </Link>
              </>
            }
          >
            <ol className="space-y-2">
              {DAILY_QUESTIONS.map((q, i) => (
                <li key={q} className="flex gap-2.5 text-[12px] leading-relaxed text-text-secondary">
                  <span className="font-mono text-[11px] text-accent">{i + 1}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </>
  );
}
