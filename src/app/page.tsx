"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  Sparkles,
  Workflow,
  Globe,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Layers,
  Zap,
} from "lucide-react";
import Image from "next/image";

/* ── Animation helpers ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── Sub-components ─────────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-mono font-medium tracking-[0.2em] uppercase text-[#0066FF] mb-4">
      {children}
    </span>
  );
}

/* ── HOMEPAGE ────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* ── SECTION 1: HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#04040A] pt-[72px]">
        {/* Grid background */}
        <div
          className="absolute inset-0 bg-grid opacity-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,102,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(0,102,255,0.15),transparent)]" />

        <div className="container-max relative z-10 text-center py-24">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#00D4FF] text-[12px] font-mono px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5A0] animate-pulse" />
            Now in Early Access — UK Innovator Founder Programme
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="heading-xl mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            AI Infrastructure
            <br />
            <span className="text-[#8899BB]">for the Exhibition Industry</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="body-lead max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Adesso is building a data-driven platform that enables companies to discover exhibition
            opportunities, generate AI-powered stand concepts, and deliver projects through
            intelligent automation — at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              Request Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/platform" className="btn-outline text-base px-8 py-4">
              See the Platform →
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {[
              { value: "€48B", label: "Global Market" },
              { value: "Manual", label: "Current State" },
              { value: "2026", label: "UK Launch" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-2xl font-bold text-[#F0F4FF]">{s.value}</p>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#4A5A7A] mt-1">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Platform mockup */}
          <motion.div
            className="mt-20 mx-auto max-w-4xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-[#0D1525] border border-[#1A2540] rounded-t-lg overflow-hidden shadow-[0_0_80px_rgba(0,102,255,0.12)]">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A2540] bg-[#080D1A]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#1A2540]" />
                  <div className="w-3 h-3 rounded-full bg-[#1A2540]" />
                  <div className="w-3 h-3 rounded-full bg-[#1A2540]" />
                </div>
                <div className="flex-1 mx-4 bg-[#1A2540] rounded-sm h-5 flex items-center px-3">
                  <span className="text-[10px] text-[#4A5A7A] font-mono">app.adessoexhibition.co.uk</span>
                </div>
              </div>
              {/* Dashboard content */}
              <div className="p-6 grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Lead Intelligence",
                    icon: <Database className="w-4 h-4 text-[#0066FF]" />,
                    value: "3,241",
                    sub: "data points indexed",
                    badge: "Live",
                    color: "#00E5A0",
                  },
                  {
                    label: "AI Concept Generator",
                    icon: <Sparkles className="w-4 h-4 text-[#00D4FF]" />,
                    value: "12",
                    sub: "concepts generated today",
                    badge: "Beta",
                    color: "#0066FF",
                  },
                  {
                    label: "Pipeline Automation",
                    icon: <Workflow className="w-4 h-4 text-[#00E5A0]" />,
                    value: "47",
                    sub: "active sequences",
                    badge: "Live",
                    color: "#00E5A0",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#080D1A] border border-[#1A2540] rounded-sm p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-[10px] font-mono text-[#4A5A7A] uppercase tracking-wider">
                          {item.label}
                        </span>
                      </div>
                      <span
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded-full"
                        style={{ color: item.color, background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-[#F0F4FF] font-mono">{item.value}</p>
                    <p className="text-[11px] text-[#4A5A7A] mt-1">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 2: POSITIONING STRIP ─────────────────────────────────────── */}
      <section className="bg-[#080D1A] border-y border-[#1A2540] py-10">
        <div className="container-max text-center">
          <motion.p
            className="text-2xl md:text-3xl font-semibold leading-snug"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#4A5A7A] line-through">Not an agency. Not a freelancer.</span>
            {" "}
            <span className="text-[#F0F4FF]">
              A scalable technology platform transforming how exhibitions are planned and delivered.
            </span>
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 3: PROBLEM ───────────────────────────────────────────────── */}
      <section className="section-pad bg-[#04040A]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel>The Problem</SectionLabel>
            <h2 className="heading-lg mb-6 max-w-2xl">
              A Multi-Billion Industry Running on Manual Processes
            </h2>
            <p className="body-lead max-w-3xl">
              The global exhibition industry generates over €48 billion in annual revenue. Yet the
              workflows that drive it — lead sourcing, stand design, contractor coordination,
              follow-up — remain entirely manual, fragmented, and disconnected.
            </p>
            <p className="body-lead max-w-3xl mt-4">
              Companies spend £40,000–£80,000 on a single exhibition stand with no digital strategy,
              no automated follow-up, and no intelligence layer to measure ROI. The problem isn&apos;t
              budget. It&apos;s infrastructure.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Database className="w-5 h-5 text-[#0066FF]" />,
                title: "Fragmented Discovery",
                body: "No centralised system to identify the right exhibitions or target the right exhibitors. Sales teams rely on trade publications and word of mouth.",
              },
              {
                icon: <Layers className="w-5 h-5 text-[#0066FF]" />,
                title: "Slow Concept Cycles",
                body: "Stand design approval takes weeks of manual iteration, delaying sales cycles. Every revision requires designer time, email chains, and physical reviews.",
              },
              {
                icon: <Zap className="w-5 h-5 text-[#0066FF]" />,
                title: "Zero Commercial Layer",
                body: "Post-exhibition, companies have no automation to convert contacts into pipeline. Thousands of leads collected on stands go unworked.",
              },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeUp} className="card-base">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-sm mb-4">
                  {card.icon}
                </div>
                <h3 className="heading-sm mb-3">{card.title}</h3>
                <p className="body-base">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: SOLUTION ──────────────────────────────────────────────── */}
      <section className="section-pad bg-[#080D1A]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="heading-lg mb-6">A Unified Digital Layer for Exhibitions</h2>
            <p className="body-lead max-w-2xl mx-auto">
              Adesso integrates data intelligence, artificial intelligence, and workflow automation
              into a single platform. From opportunity discovery through to stand delivery and
              post-show pipeline management — in one system.
            </p>
          </motion.div>

          {/* Flow diagram */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0 overflow-x-auto pb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { label: "Exhibition Data", sub: "Discovery" },
              { label: "AI Processing", sub: "Intelligence" },
              { label: "Lead Scoring", sub: "Targeting" },
              { label: "Stand Generation", sub: "Design" },
              { label: "Automation", sub: "Delivery" },
              { label: "Revenue", sub: "Growth" },
            ].map((node, i) => (
              <div key={node.label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="bg-[#0D1525] border border-[#0066FF]/40 rounded-sm px-4 py-3 text-center min-w-[120px] relative">
                    {i === 1 || i === 4 ? (
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00E5A0] animate-pulse" />
                    ) : null}
                    <p className="text-[13px] font-semibold text-[#F0F4FF]">{node.label}</p>
                    <p className="text-[10px] font-mono text-[#0066FF] mt-0.5">{node.sub}</p>
                  </div>
                </div>
                {i < 5 && (
                  <div className="hidden md:flex items-center mx-1">
                    <div className="h-[1px] w-6 bg-gradient-to-r from-[#0066FF]/60 to-[#0066FF]/20" />
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#0066FF]/60" />
                  </div>
                )}
                {i < 5 && (
                  <div className="md:hidden text-[#0066FF] text-sm my-1">↓</div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: PLATFORM MODULES ──────────────────────────────────────── */}
      <section className="section-pad bg-[#04040A]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionLabel>The Platform</SectionLabel>
            <h2 className="heading-lg">Four Modules. One Integrated System.</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                num: "01",
                icon: <Database className="w-5 h-5 text-[#0066FF]" />,
                title: "Exhibition Lead Intelligence",
                body: "Structured data from European exhibitions — exhibitor profiles, event insights, decision-maker contacts, and targeted lead scoring. Updated continuously.",
                tag: "Live",
                tagColor: "badge-live",
              },
              {
                num: "02",
                icon: <Sparkles className="w-5 h-5 text-[#00D4FF]" />,
                title: "AI Stand Concept Generator",
                body: "Generate exhibition stand concepts using AI in minutes. Trained on thousands of exhibition environments. Accelerates sales cycles and client approval rates.",
                tag: "Beta",
                tagColor: "badge-beta",
              },
              {
                num: "03",
                icon: <Workflow className="w-5 h-5 text-[#00E5A0]" />,
                title: "Automation & Pipeline CRM",
                body: "Unified system for managing leads, automating outreach sequences, and tracking project pipelines from initial contact to post-show follow-up.",
                tag: "Live",
                tagColor: "badge-live",
              },
              {
                num: "04",
                icon: <Globe className="w-5 h-5 text-[#8899BB]" />,
                title: "Exhibition Marketplace",
                body: "A two-sided marketplace connecting brands, stand designers, and builders across Europe. Verified supplier network with integrated project management.",
                tag: "2027",
                tagColor: "badge-planned",
              },
            ].map((mod) => (
              <motion.div key={mod.num} variants={fadeUp} className="card-base group">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-[#0066FF]">Module {mod.num}</span>
                    <div className="w-6 h-6 flex items-center justify-center">
                      {mod.icon}
                    </div>
                  </div>
                  <span className={mod.tagColor}>{mod.tag}</span>
                </div>
                <h3 className="heading-sm mb-3">{mod.title}</h3>
                <p className="body-base">{mod.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/platform" className="btn-outline">
              Full Platform Overview →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 6: BUSINESS MODEL ────────────────────────────────────────── */}
      <section className="section-pad bg-[#080D1A]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionLabel>Business Model</SectionLabel>
            <h2 className="heading-lg mb-6 max-w-xl">Built for Scale</h2>
            <p className="body-lead max-w-3xl">
              Adesso operates on a subscription-based model, providing tiered access to data
              intelligence, AI tools, and automation systems. Revenue is diversified across SaaS
              subscriptions, premium data services, and marketplace transaction fees.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <TrendingUp className="w-5 h-5 text-[#0066FF]" />,
                title: "SaaS Subscriptions",
                body: "Monthly and annual platform access across Starter, Growth, and Enterprise tiers. Recurring, predictable revenue from day one.",
              },
              {
                icon: <Database className="w-5 h-5 text-[#00D4FF]" />,
                title: "Data Products",
                body: "Premium lead databases, sector intelligence reports, and exhibitor data packs. High-margin data products sold independently of platform access.",
              },
              {
                icon: <Globe className="w-5 h-5 text-[#00E5A0]" />,
                title: "Marketplace Fees",
                body: "Transaction-based revenue from supplier connections and project placements on the Exhibition Marketplace. Scales with platform usage and network growth.",
              },
            ].map((pillar) => (
              <motion.div key={pillar.title} variants={fadeUp} className="card-base">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0D1525] border border-[#1A2540] rounded-sm mb-4">
                  {pillar.icon}
                </div>
                <h3 className="heading-sm mb-3">{pillar.title}</h3>
                <p className="body-base">{pillar.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 7: TRACTION ──────────────────────────────────────────────── */}
      <section className="section-pad bg-[#04040A] border-y border-[#1A2540]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionLabel>Traction</SectionLabel>
            <h2 className="heading-lg">Early Signals</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { value: "3,200+", label: "Exhibition data points indexed" },
              { value: "€48B", label: "Addressable market" },
              { value: "47", label: "Early access registrations" },
              { value: "12", label: "Countries covered" },
            ].map((metric) => (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                className="text-center p-6 bg-[#080D1A] border border-[#1A2540] rounded-sm"
              >
                <p className="font-mono text-4xl font-bold text-[#F0F4FF] mb-2">{metric.value}</p>
                <p className="text-[12px] text-[#4A5A7A] leading-tight">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl text-[#F0F4FF] font-display italic leading-relaxed mb-4">
              &ldquo;The exhibition industry is ready for this. We&apos;ve been waiting for someone
              to build the infrastructure layer.&rdquo;
            </p>
            <footer className="text-sm text-[#4A5A7A] font-mono">
              — Beta User, UK Event Marketing Director
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* ── SECTION 8: VISION ────────────────────────────────────────────────── */}
      <section className="section-pad bg-[#080D1A]">
        <div className="container-max text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Vision</SectionLabel>
            <h2 className="heading-lg mb-8">Our Vision</h2>
            <p className="font-display text-2xl md:text-3xl text-[#F0F4FF] italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;To become the leading digital infrastructure powering
              the global exhibition industry.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 9: FOUNDER ───────────────────────────────────────────────── */}
      <section className="section-pad bg-[#04040A]">
        <div className="container-max">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Photo */}
            <div className="relative">
              <div className="aspect-square max-w-sm mx-auto lg:mx-0 bg-[#0D1525] border border-[#1A2540] rounded-sm overflow-hidden">
                <Image
                  src="/bruno-castro.jpg"
                  alt="Bruno Castro, Founder & CEO of Adesso"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                  onError={() => {}}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#0D1525]">
                  <span className="font-display text-5xl font-bold text-[#1A2540]">BC</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <SectionLabel>Founder</SectionLabel>
              <h2 className="heading-lg mb-2">Bruno Castro</h2>
              <p className="text-sm font-mono text-[#0066FF] mb-6">Founder &amp; CEO, Adesso</p>
              <div className="space-y-4 body-lead">
                <p>
                  Bruno Castro spent over a decade working on European exhibition floors — managing
                  stand builds, coordinating logistics, and helping B2B brands present at trade shows
                  from London to Frankfurt.
                </p>
                <p>
                  What he identified was consistent: an industry generating billions annually with no
                  digital infrastructure. No intelligence layer. No automation. No scalable systems.
                </p>
                <p>
                  Adesso was founded to build that infrastructure — starting with the UK, scaling
                  across Europe.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  "10+ years exhibition industry experience",
                  "Technical specialist: CAD, LED systems, event production",
                  "UK-based, EU market expertise",
                  "Registered company: England & Wales",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5A0] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#8899BB]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 10: EARLY ACCESS CTA ─────────────────────────────────────── */}
      <section className="section-pad relative overflow-hidden bg-[#080D1A]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,102,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(0,102,255,0.1),transparent)]" />

        <div className="container-max relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionLabel>Early Access</SectionLabel>
            <h2 className="heading-lg mb-6">Join the Early Access Programme</h2>
            <p className="body-lead max-w-xl mx-auto mb-10">
              Be among the first companies to access Adesso&apos;s platform. Limited early access
              available for UK and European exhibition professionals.
            </p>
            <Link href="/contact" className="btn-primary text-base px-10 py-4 text-lg">
              Request Early Access →
            </Link>
            <p className="text-[12px] text-[#4A5A7A] mt-4 font-mono">
              No commitment. We&apos;ll reach out within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
