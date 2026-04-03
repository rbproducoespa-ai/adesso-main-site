"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Database,
  Sparkles,
  Workflow,
  Globe,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  text: string;
}

interface Module {
  number: string;
  name: string;
  status: "live" | "beta" | "planned";
  statusLabel: string;
  description: [string, string];
  features: Feature[];
  whoItIsFor: string;
  icon: React.ReactNode;
  bgClass: string;
}

// ─── Fade-up animation preset ─────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── Badge ────────────────────────────────────────────────────────────────────

function StatusBadge({ status, label }: { status: Module["status"]; label: string }) {
  const styles: Record<Module["status"], string> = {
    live: "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30",
    beta: "bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30",
    planned: "bg-[#4A5A7A]/20 text-[#8899BB] border border-[#4A5A7A]/40",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "live"
            ? "bg-[#00E5A0]"
            : status === "beta"
            ? "bg-[#0066FF]"
            : "bg-[#4A5A7A]"
        }`}
      />
      {label}
    </span>
  );
}

// ─── Browser chrome mockup ─────────────────────────────────────────────────────

function BrowserMockup({ number }: { number: string }) {
  return (
    <div className="rounded-sm border border-[#1A2540] bg-[#0D1525] overflow-hidden shadow-2xl">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#080D1A] border-b border-[#1A2540]">
        <span className="w-3 h-3 rounded-full bg-[#1A2540]" />
        <span className="w-3 h-3 rounded-full bg-[#1A2540]" />
        <span className="w-3 h-3 rounded-full bg-[#1A2540]" />
        <div className="ml-3 flex-1 bg-[#0D1525] rounded-sm px-3 py-1 text-[10px] text-[#4A5A7A] font-mono">
          app.adesso.io / module-{number.toLowerCase()}
        </div>
      </div>
      {/* Content area */}
      <div className="p-6 min-h-[260px] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 rounded-sm bg-[#1A2540]" />
          <div className="h-4 w-16 rounded-sm bg-[#0066FF]/20" />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-sm bg-[#080D1A] border border-[#1A2540] p-3 space-y-2"
            >
              <div className="h-3 w-full rounded-sm bg-[#1A2540]" />
              <div className="h-3 w-3/4 rounded-sm bg-[#1A2540]" />
              <div className="h-6 w-full rounded-sm bg-[#0066FF]/10 mt-2" />
            </div>
          ))}
        </div>
        <div className="mt-auto space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-3 rounded-sm bg-[#1A2540]"
              style={{ width: `${90 - i * 15}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Module section ────────────────────────────────────────────────────────────

function ModuleSection({ module, index }: { module: Module; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section className={`${module.bgClass} py-24 md:py-32 overflow-hidden`}>
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* Large decorative number */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5 }}
          className="mb-8 select-none"
        >
          <span className="text-8xl font-bold text-[#0066FF]/20 font-mono leading-none">
            {module.number}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: content */}
          <div className="space-y-8">
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.05 }} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 text-[#0066FF]">{module.icon}</div>
                <StatusBadge status={module.status} label={module.statusLabel} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F0F4FF] leading-tight">
                {module.name}
              </h2>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-4">
              <p className="text-[#8899BB] text-base leading-relaxed">
                {module.description[0]}
              </p>
              <p className="text-[#8899BB] text-base leading-relaxed">
                {module.description[1]}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-[#4A5A7A] mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {module.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#8899BB] text-sm">
                    <CheckCircle2 className="mt-0.5 flex-shrink-0 w-4 h-4 text-[#00E5A0]" />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Who it's for */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-l-2 border-[#0066FF]/40 pl-5 py-1"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[#4A5A7A] mb-2">
                Who It&apos;s For
              </p>
              <p className="text-[#8899BB] text-sm leading-relaxed">
                {module.whoItIsFor}
              </p>
            </motion.div>
          </div>

          {/* Right: mockup */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:sticky lg:top-[96px]"
          >
            <BrowserMockup number={module.number} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const modules: Module[] = [
  {
    number: "01",
    name: "Exhibition Lead Intelligence",
    status: "live",
    statusLabel: "Live",
    bgClass: "bg-[#04040A]",
    icon: <Database className="w-6 h-6" />,
    description: [
      "The Lead Intelligence module aggregates and structures data from across the European exhibition ecosystem. Event programmes, exhibitor directories, floor plans, sector classifications, and historical participation records are processed through Adesso's proprietary scoring model.",
      "This data is then ranked by relevance, intent signals, and commercial potential — providing sales teams with prioritised, actionable intelligence rather than raw data dumps. Updated weekly, it remains the freshest source of exhibition intelligence available.",
    ],
    features: [
      { text: "European exhibition database (10,000+ events)" },
      { text: "Exhibitor profiles with contact enrichment" },
      { text: "Sector and geography filtering" },
      { text: "Decision-maker identification and scoring" },
      { text: "Export to CRM / CSV / API" },
      { text: "Weekly data refresh cycle" },
    ],
    whoItIsFor:
      "Sales teams, marketing directors, and business development professionals at companies that exhibit or sell to exhibitors across European trade shows.",
  },
  {
    number: "02",
    name: "AI Stand Concept Generator",
    status: "beta",
    statusLabel: "Beta",
    bgClass: "bg-[#080D1A]",
    icon: <Sparkles className="w-6 h-6" />,
    description: [
      "The AI Stand Concept Generator is Adesso's primary proprietary innovation. It combines exhibition brief ingestion, industry-trained context, and multi-modal AI generation to produce visual concepts, spatial layouts, and material specifications simultaneously.",
      "By automating the initial concept stage, the module reduces stand design timelines from weeks to hours. Sales teams can generate multiple concept variants for client review without designer involvement — accelerating approval cycles and increasing win rates.",
    ],
    features: [
      { text: "Brief-to-concept in under 30 minutes" },
      { text: "Multiple style variants per generation" },
      { text: "Budget-aware design parameters" },
      { text: "Regulatory compliance checking (EU event standards)" },
      { text: "Export to PDF presentation format" },
      { text: "Client review and approval workflow" },
    ],
    whoItIsFor:
      "Exhibition stand contractors, marketing teams managing stand procurement, and brand managers requiring fast visual approvals.",
  },
  {
    number: "03",
    name: "Automation & Pipeline CRM",
    status: "live",
    statusLabel: "Live",
    bgClass: "bg-[#04040A]",
    icon: <Workflow className="w-6 h-6" />,
    description: [
      "The Automation & CRM module provides a unified system for managing the complete lifecycle of an exhibition project. From initial lead capture through to post-show follow-up, every touchpoint is automated and tracked in a single pipeline.",
      "Unlike generic CRM platforms, Adesso's automation system is built around exhibition industry timelines — pre-show outreach windows, on-site engagement periods, and post-show conversion sequences are all pre-configured.",
    ],
    features: [
      { text: "Lead-to-project pipeline management" },
      { text: "Automated email and outreach sequences" },
      { text: "Multi-channel communication tracking" },
      { text: "Project milestone and deadline management" },
      { text: "Post-show follow-up automation" },
      { text: "Revenue and conversion reporting" },
    ],
    whoItIsFor:
      "Exhibition contractors, event agencies, and B2B marketing teams managing multiple concurrent exhibition projects.",
  },
  {
    number: "04",
    name: "Exhibition Marketplace",
    status: "planned",
    statusLabel: "Coming 2027",
    bgClass: "bg-[#080D1A]",
    icon: <Globe className="w-6 h-6" />,
    description: [
      "The Exhibition Marketplace will be a two-sided platform connecting brands that need exhibition stands with verified designers, builders, and logistics providers across Europe. Project briefs are published, suppliers bid, and the entire engagement is managed within Adesso.",
      "The Marketplace creates network effects that compound as the platform grows — more verified suppliers attract more brands, and more brand activity attracts more suppliers. Launching in 2027 once the data and AI modules have established critical mass.",
    ],
    features: [
      { text: "Verified supplier network (designers, builders, logistics)" },
      { text: "Project brief publication and bidding" },
      { text: "Integrated contract and payment management" },
      { text: "Supplier rating and review system" },
      { text: "Pan-European coverage" },
      { text: "API for enterprise integration" },
    ],
    whoItIsFor:
      "Brands seeking verified exhibition suppliers, and stand contractors seeking qualified project briefs across Europe.",
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PlatformPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#04040A] pt-[72px] pb-24 md:pb-32 overflow-hidden relative">
        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,102,255,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 relative z-10">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center pt-20 pb-6 space-y-6"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#0066FF]">
              The Platform
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#F0F4FF] leading-none tracking-tight">
              Platform Overview
            </h1>
            <p className="text-[#8899BB] text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              A complete operating system for exhibition professionals
            </p>
          </motion.div>

          {/* Module nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-10"
          >
            {modules.map((m) => (
              <a
                key={m.number}
                href={`#module-${m.number}`}
                className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[#0D1525] border border-[#1A2540] text-[#8899BB] text-sm hover:border-[#0066FF]/40 hover:text-[#F0F4FF] transition-all duration-300"
              >
                <span className="font-mono text-[#0066FF] text-xs">{m.number}</span>
                {m.name}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Module Sections ── */}
      {modules.map((module, index) => (
        <div key={module.number} id={`module-${module.number}`}>
          <ModuleSection module={module} index={index} />
        </div>
      ))}

      {/* ── CTA ── */}
      <section className="bg-[#04040A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-10 md:p-16 text-center max-w-2xl mx-auto space-y-6"
          >
            <Users className="mx-auto w-10 h-10 text-[#0066FF]" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F0F4FF]">
              Ready to get started?
            </h2>
            <p className="text-[#8899BB] text-base leading-relaxed">
              Join exhibition professionals already using Adesso to find leads, generate
              concepts, and close more projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-medium rounded-sm hover:bg-[#0052CC] transition-colors duration-200"
              >
                Request Early Access
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#1A2540] text-[#8899BB] text-sm font-medium rounded-sm hover:border-[#0066FF]/40 hover:text-[#F0F4FF] transition-all duration-300"
              >
                View Roadmap
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
