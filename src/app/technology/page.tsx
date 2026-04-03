"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Database,
  Sparkles,
  Workflow,
  Server,
  Brain,
  Zap,
  Code,
  ArrowRight,
} from "lucide-react";

/* ── Animation helpers ─────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── Sub-components ─────────────────────────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="section-label">{children}</span>;
}

function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[10px] font-mono text-[#4A5A7A] bg-[#080D1A] border border-[#1A2540] px-2 py-0.5 rounded-sm">
      {children}
    </span>
  );
}

/* ── Stack card badge types ─────────────────────────────────────────────────── */
type BadgeVariant = "CORE" | "AI" | "AUTO" | "INFRA";

function StackBadge({ variant }: { variant: BadgeVariant }) {
  const styles: Record<BadgeVariant, string> = {
    CORE: "text-[#0066FF] bg-[#0066FF]/10 border-[#0066FF]/20",
    AI:   "text-[#00D4FF] bg-[#00D4FF]/10 border-[#00D4FF]/20",
    AUTO: "text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/20",
    INFRA:"text-[#8899BB] bg-[#8899BB]/10 border-[#8899BB]/20",
  };
  return (
    <span
      className={`inline-block text-[9px] font-mono font-semibold tracking-widest uppercase px-2 py-0.5 rounded-full border ${styles[variant]}`}
    >
      {variant}
    </span>
  );
}

/* ── Flow diagram node ──────────────────────────────────────────────────────── */
interface FlowNodeProps {
  label: string;
  sub: string;
  isLast?: boolean;
  pulse?: boolean;
}

function FlowNode({ label, sub, isLast = false, pulse = false }: FlowNodeProps) {
  return (
    <div className="flex items-center">
      <div className="flex flex-col items-center">
        <div className="relative bg-[#0D1525] border border-[#0066FF]/40 rounded-sm px-4 py-3 text-center min-w-[112px]">
          {pulse && (
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00E5A0] animate-pulse" />
          )}
          <p className="text-[13px] font-semibold text-[#F0F4FF]">{label}</p>
          <p className="text-[10px] font-mono text-[#0066FF] mt-0.5">{sub}</p>
        </div>
      </div>
      {!isLast && (
        <>
          <div className="hidden md:flex items-center mx-1">
            <div className="h-[1px] w-6 bg-gradient-to-r from-[#0066FF]/60 to-[#0066FF]/20" />
            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#0066FF]/60" />
          </div>
          <div className="md:hidden text-[#0066FF] text-sm my-1">↓</div>
        </>
      )}
    </div>
  );
}

/* ── TECHNOLOGY PAGE ─────────────────────────────────────────────────────────── */
export default function TechnologyPage() {
  return (
    <>
      {/* ── SECTION 1: HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col justify-center overflow-hidden bg-[#04040A] pt-[72px]">
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,102,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,102,255,0.13),transparent)]" />

        <div className="container-max relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Technology</SectionLabel>
          </motion.div>

          <motion.h1
            className="heading-xl max-w-3xl mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            Technology
          </motion.h1>

          <motion.p
            className="body-lead max-w-2xl text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            How Adesso processes, analyses, and activates exhibition data at scale.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 3.1: TECHNICAL OVERVIEW ───────────────────────────────────── */}
      <section className="section-pad bg-[#080D1A]">
        <div className="container-max">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <SectionLabel>Architecture</SectionLabel>
              <h2 className="heading-lg mb-6">Built on AI, Data, and Automation</h2>

              {/* Architecture pill tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Data Extraction", "LLMs", "Computer Vision", "Automation Frameworks"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/20 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="body-lead">
                Adesso is built using a combination of data extraction systems, large language models,
                computer vision pipelines, and automation frameworks. The platform processes exhibition
                data at scale, transforming unstructured, fragmented information into structured,
                actionable intelligence.
              </p>
              <p className="body-lead mt-5">
                This is not a traditional SaaS wrapper. Adesso&apos;s core technical advantage lies
                in its exhibition-specific data models, trained on years of industry data, enabling
                contextual AI outputs that generic tools cannot replicate.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3.2: TECHNICAL STACK ──────────────────────────────────────── */}
      <section className="section-pad bg-[#04040A]">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Technical Stack</SectionLabel>
            <h2 className="heading-lg">Four Layers. One Coherent System.</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {/* Card 1: Data Extraction */}
            <motion.div variants={fadeUp} className="card-base flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-sm">
                  <Database className="w-5 h-5 text-[#0066FF]" />
                </div>
                <StackBadge variant="CORE" />
              </div>
              <h3 className="heading-sm mb-3">Data Extraction Layer</h3>
              <p className="body-base mb-6 flex-1">
                Automated crawlers and structured parsers extract exhibitor data, event metadata,
                and market intelligence from across European exhibition ecosystems.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#1A2540]">
                {["Python", "Puppeteer", "BeautifulSoup", "Supabase"].map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </motion.div>

            {/* Card 2: AI Processing */}
            <motion.div variants={fadeUp} className="card-base flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center bg-[#00D4FF]/10 border border-[#00D4FF]/20 rounded-sm">
                  <Brain className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <StackBadge variant="AI" />
              </div>
              <h3 className="heading-sm mb-3">AI Processing Engine</h3>
              <p className="body-base mb-6 flex-1">
                Large language models fine-tuned on exhibition industry data process unstructured
                inputs and generate contextual outputs — stand concepts, outreach copy, sector
                analysis reports.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#1A2540]">
                {["Anthropic Claude API", "OpenAI", "Custom prompt engineering"].map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Automation */}
            <motion.div variants={fadeUp} className="card-base flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center bg-[#00E5A0]/10 border border-[#00E5A0]/20 rounded-sm">
                  <Workflow className="w-5 h-5 text-[#00E5A0]" />
                </div>
                <StackBadge variant="AUTO" />
              </div>
              <h3 className="heading-sm mb-3">Automation Framework</h3>
              <p className="body-base mb-6 flex-1">
                Multi-step automation workflows handle lead enrichment, outreach sequencing, CRM
                synchronisation, and project state management without manual intervention.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#1A2540]">
                {["n8n", "Make", "Custom API integrations", "Webhook systems"].map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </motion.div>

            {/* Card 4: Platform Infrastructure */}
            <motion.div variants={fadeUp} className="card-base flex flex-col">
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 flex items-center justify-center bg-[#8899BB]/10 border border-[#8899BB]/20 rounded-sm">
                  <Server className="w-5 h-5 text-[#8899BB]" />
                </div>
                <StackBadge variant="INFRA" />
              </div>
              <h3 className="heading-sm mb-3">Platform Infrastructure</h3>
              <p className="body-base mb-6 flex-1">
                Cloud-native, serverless architecture built for scalability from day one. Deployed
                on Vercel Edge Network with global CDN and sub-100ms response times.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[#1A2540]">
                {["Next.js 15", "TypeScript", "Supabase (PostgreSQL)", "Vercel", "Resend"].map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3.3: AI STAND CONCEPT GENERATOR ───────────────────────────── */}
      <section className="section-pad bg-[#080D1A]">
        <div className="container-max">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Left col: explanation */}
            <div>
              <SectionLabel>Core Innovation</SectionLabel>
              <h2 className="heading-lg mb-8">AI Stand Concept Generator</h2>

              <ol className="space-y-6">
                {[
                  {
                    n: "01",
                    title: "Brief Ingestion",
                    body: "Client inputs are parsed into structured prompts — brand identity, objectives, spatial requirements, budget parameters, and target audience.",
                  },
                  {
                    n: "02",
                    title: "Industry-Trained Context",
                    body: "Exhibition design principles, spatial constraints, and EU regulatory requirements are embedded into every generation request via fine-tuned context layers.",
                  },
                  {
                    n: "03",
                    title: "Multi-Modal AI Generation",
                    body: "Visual concepts, spatial layouts, and material specifications are generated simultaneously across multiple AI modalities — producing complete stand concepts in a single pipeline pass.",
                  },
                  {
                    n: "04",
                    title: "Iteration Engine",
                    body: "Rapid concept variants are generated without designer involvement, enabling clients to explore multiple directions before a single hour of human design time is spent.",
                  },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="font-mono text-[11px] text-[#0066FF] pt-1 flex-shrink-0 w-7">
                      {step.n}
                    </span>
                    <div>
                      <h4 className="text-[#F0F4FF] font-semibold text-[15px] mb-1.5">{step.title}</h4>
                      <p className="body-base">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right col: impact metrics */}
            <div>
              <div className="sticky top-28 space-y-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#4A5A7A] mb-6">
                  Impact Metrics
                </p>

                {[
                  {
                    before: "48 hours",
                    after: "20 minutes",
                    label: "Stand concept generation",
                    icon: <Sparkles className="w-4 h-4 text-[#00D4FF]" />,
                  },
                  {
                    before: "3–4 rounds",
                    after: "1–2 rounds",
                    label: "Client approval cycles",
                    icon: <Zap className="w-4 h-4 text-[#00E5A0]" />,
                  },
                  {
                    before: "12 hours",
                    after: "2 hours",
                    label: "Designer time per concept",
                    icon: <Code className="w-4 h-4 text-[#0066FF]" />,
                  },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="card-base"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      {metric.icon}
                      <span className="text-[11px] font-mono text-[#4A5A7A] uppercase tracking-widest">
                        {metric.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#4A5A7A] line-through text-sm">
                        {metric.before}
                      </span>
                      <span className="text-[#4A5A7A] text-xs">→</span>
                      <span className="font-mono font-bold text-[#00E5A0] text-xl">
                        {metric.after}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3.4: DATA INTELLIGENCE ARCHITECTURE ───────────────────────── */}
      <section className="section-pad bg-[#04040A]">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <SectionLabel>Data Intelligence</SectionLabel>
            <h2 className="heading-lg mb-6 max-w-2xl">Exhibition Lead Intelligence</h2>
            <p className="body-lead max-w-3xl">
              Adesso&apos;s data pipeline continuously ingests raw sources from across the European
              exhibition ecosystem — event catalogues, exhibitor directories, company registries,
              and public business data. Each record passes through extraction, normalisation, and
              AI-powered enrichment before entering the scoring model. The result is a continuously
              updated, structured intelligence layer that powers lead targeting, sector analysis,
              and opportunity discovery across the platform.
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
            <FlowNode label="Raw Sources"       sub="Ingestion"     pulse />
            <FlowNode label="Extraction"        sub="Parsing"       />
            <FlowNode label="Normalisation"     sub="Structuring"   />
            <FlowNode label="Enrichment"        sub="AI Layer"      pulse />
            <FlowNode label="Scoring"           sub="Ranking"       />
            <FlowNode label="Platform Output"   sub="Activation"    isLast />
          </motion.div>

          {/* Pipeline detail cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              {
                step: "01",
                title: "Raw Sources",
                body: "European exhibition catalogues, event directories, company registries, LinkedIn data, trade publication databases, and exhibitor lists.",
              },
              {
                step: "02",
                title: "Extraction & Parsing",
                body: "Automated crawlers and structured parsers extract relevant signals from unstructured web and document sources at scale.",
              },
              {
                step: "03",
                title: "AI Enrichment",
                body: "LLM pipelines classify, tag, and enrich each record with sector labels, decision-maker identification, and exhibition history context.",
              },
              {
                step: "04",
                title: "Lead Scoring",
                body: "A proprietary scoring model ranks leads by fit, intent signals, exhibition frequency, sector relevance, and estimated budget tier.",
              },
              {
                step: "05",
                title: "Platform Activation",
                body: "Scored leads are surfaced in the platform dashboard, integrated with CRM workflows, and used to trigger automated outreach sequences.",
              },
              {
                step: "06",
                title: "Continuous Updates",
                body: "The entire pipeline runs on a continuous cycle — new exhibitions are ingested within 24 hours of announcement, keeping the database current.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.step}
                custom={i}
                variants={fadeUp}
                className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-5 hover:border-[#0066FF]/30 transition-all duration-300"
              >
                <span className="text-[10px] font-mono text-[#0066FF] tracking-widest block mb-2">
                  {card.step}
                </span>
                <h4 className="text-[#F0F4FF] font-semibold text-[15px] mb-2">{card.title}</h4>
                <p className="text-[13px] text-[#8899BB] leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────────────── */}
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
            <h2 className="heading-lg mb-6">See the Platform in Action</h2>
            <p className="body-lead max-w-xl mx-auto mb-10">
              Request access to Adesso&apos;s intelligence and automation platform. Available now
              for UK and European exhibition professionals.
            </p>
            <Link href="/contact" className="btn-primary text-base px-10 py-4">
              Request Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[12px] text-[#4A5A7A] mt-4 font-mono">
              No commitment. We&apos;ll be in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
