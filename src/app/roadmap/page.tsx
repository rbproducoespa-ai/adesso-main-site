"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Rocket,
  Globe,
  Layers,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = "progress" | "planned";

interface TimelinePhase {
  year: string;
  name: string;
  badge: BadgeVariant;
  badgeLabel: string;
  bullets: string[];
}

interface WhyCard {
  icon: React.ReactNode;
  title: string;
  body: string;
}

// ─── Fade-up animation preset ─────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── Badge ────────────────────────────────────────────────────────────────────

function StatusBadge({ variant, label }: { variant: BadgeVariant; label: string }) {
  const styles: Record<BadgeVariant, string> = {
    progress: "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30",
    planned: "bg-[#4A5A7A]/20 text-[#8899BB] border border-[#4A5A7A]/40",
  };
  const dotStyles: Record<BadgeVariant, string> = {
    progress: "bg-[#00E5FF]",
    planned: "bg-[#4A5A7A]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase ${styles[variant]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[variant]}`} />
      {label}
    </span>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const phases: TimelinePhase[] = [
  {
    year: "2026",
    name: "UK Foundation",
    badge: "progress",
    badgeLabel: "In Progress",
    bullets: [
      "Platform development and infrastructure build",
      "Launch of Lead Intelligence module (UK focus)",
      "AI Stand Concept Generator beta programme",
      "Initial user acquisition: 50–100 paying subscribers",
      "Seed funding round preparation",
      "Data collection and indexing: UK + German exhibitions",
      "Regulatory and compliance framework established",
    ],
  },
  {
    year: "2027",
    name: "European Expansion",
    badge: "planned",
    badgeLabel: "Planned",
    bullets: [
      "Scaling lead intelligence to cover all major EU exhibitions",
      "Full public launch of AI Stand Concept Generator",
      "Automation & CRM module full release",
      "Strategic partnerships with exhibition organisers (Messe Frankfurt, NEC Group)",
      "Target: 500+ subscribers, €300K ARR",
      "Series A fundraise preparation",
      "Team expansion: engineering, data, sales",
    ],
  },
  {
    year: "2028",
    name: "Global Platform",
    badge: "planned",
    badgeLabel: "Vision",
    bullets: [
      "Exhibition Marketplace launch (two-sided)",
      "Expansion to North American and Asian markets",
      "Enterprise tier with custom API access",
      "Third-party developer ecosystem",
      "Target: 2,000+ subscribers, €1M+ ARR",
      "Platform becomes industry standard infrastructure",
    ],
  },
];

const whyCards: WhyCard[] = [
  {
    icon: <Rocket className="w-5 h-5 text-[#0066FF]" />,
    title: "Validation First",
    body: "The UK market provides a dense, accessible testing ground before European scale. London alone hosts dozens of major exhibitions annually.",
  },
  {
    icon: <Layers className="w-5 h-5 text-[#0066FF]" />,
    title: "Infrastructure Before Marketplace",
    body: "Data and AI modules must be proven before launching the marketplace, which requires network effects to function.",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-[#0066FF]" />,
    title: "Capital Efficiency",
    body: "The subscription model generates revenue from day one, reducing dependency on external funding during the critical build phase.",
  },
];

// ─── Timeline phase card ───────────────────────────────────────────────────────

function PhaseCard({ phase, index }: { phase: TimelinePhase; index: number }) {
  const isLast = index === phases.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="relative flex gap-8 md:gap-12"
    >
      {/* Left: year + connector */}
      <div className="flex flex-col items-center flex-shrink-0 w-20 md:w-28">
        <span className="font-mono font-bold text-4xl md:text-5xl text-[#0066FF] leading-none">
          {phase.year}
        </span>
        {/* connector line */}
        {!isLast && (
          <div className="flex-1 mt-6 w-px bg-gradient-to-b from-[#1A2540] to-transparent min-h-[60px]" />
        )}
      </div>

      {/* Right: card */}
      <div className="flex-1 pb-16">
        <div className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-6 hover:border-[#0066FF]/40 transition-all duration-300 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-xl md:text-2xl font-semibold text-[#F0F4FF]">
              {phase.name}
            </h2>
            <StatusBadge variant={phase.badge} label={phase.badgeLabel} />
          </div>
          <ul className="space-y-3">
            {phase.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-[#8899BB] text-sm">
                <CheckCircle2 className="mt-0.5 flex-shrink-0 w-4 h-4 text-[#00E5A0]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
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
              Roadmap
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-[#F0F4FF] leading-none tracking-tight">
              Roadmap
            </h1>
            <p className="text-[#8899BB] text-lg md:text-xl leading-relaxed max-w-xl mx-auto">
              Adesso&apos;s development trajectory from UK launch to global platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-[#04040A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.4 }}
            className="mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4A5A7A]">
              Development Phases
            </span>
          </motion.div>

          <div>
            {phases.map((phase, index) => (
              <PhaseCard key={phase.year} phase={phase} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Timeline ── */}
      <section className="bg-[#080D1A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-14 max-w-xl"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4A5A7A] block mb-4">
              Strategic Rationale
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F0F4FF] leading-tight">
              Why This Timeline
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-6 hover:border-[#0066FF]/40 transition-all duration-300 space-y-4"
              >
                <div className="w-10 h-10 rounded-sm bg-[#080D1A] border border-[#1A2540] flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#F0F4FF]">
                  {card.title}
                </h3>
                <p className="text-[#8899BB] text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#04040A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-10 md:p-16 text-center max-w-2xl mx-auto space-y-6"
          >
            <Globe className="mx-auto w-10 h-10 text-[#0066FF]" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-[#F0F4FF]">
              Ready to be part of this journey?
            </h2>
            <p className="text-[#8899BB] text-base leading-relaxed">
              Get early access to the platform and shape its development alongside the
              founding team.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0066FF] text-white text-sm font-medium rounded-sm hover:bg-[#0052CC] transition-colors duration-200"
            >
              Request Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
