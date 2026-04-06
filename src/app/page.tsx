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
import { useI18n } from "@/lib/i18n";

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
  const { t } = useI18n();

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
            {t("hero.badge")}
          </motion.div>

          {/* H1 */}
          <motion.h1
            className="heading-xl mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {t("hero.h1_line1")}
            <br />
            <span className="text-[#8899BB]">{t("hero.h1_line2")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="body-lead max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/contact" className="btn-primary text-base px-8 py-4">
              {t("hero.cta_primary")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/platform" className="btn-outline text-base px-8 py-4">
              {t("hero.cta_secondary")}
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
              { value: t("hero.stat1_value"), label: t("hero.stat1_label") },
              { value: t("hero.stat2_value"), label: t("hero.stat2_label") },
              { value: t("hero.stat3_value"), label: t("hero.stat3_label") },
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
            <span className="text-[#4A5A7A] line-through">{t("positioning.strikethrough")}</span>
            {" "}
            <span className="text-[#F0F4FF]">
              {t("positioning.statement")}
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
            <SectionLabel>{t("problem.label")}</SectionLabel>
            <h2 className="heading-lg mb-6 max-w-2xl">
              {t("problem.h2")}
            </h2>
            <p className="body-lead max-w-3xl">{t("problem.body1")}</p>
            <p className="body-lead max-w-3xl mt-4">{t("problem.body2")}</p>
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
                title: t("problem.card1_title"),
                body: t("problem.card1_body"),
              },
              {
                icon: <Layers className="w-5 h-5 text-[#0066FF]" />,
                title: t("problem.card2_title"),
                body: t("problem.card2_body"),
              },
              {
                icon: <Zap className="w-5 h-5 text-[#0066FF]" />,
                title: t("problem.card3_title"),
                body: t("problem.card3_body"),
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
            <SectionLabel>{t("solution.label")}</SectionLabel>
            <h2 className="heading-lg mb-6">{t("solution.h2")}</h2>
            <p className="body-lead max-w-2xl mx-auto">{t("solution.body")}</p>
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
            <SectionLabel>{t("modules.label")}</SectionLabel>
            <h2 className="heading-lg">{t("modules.h2")}</h2>
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
                title: t("modules.m01_title"),
                body: t("modules.m01_body"),
                tag: t("modules.m01_tag"),
                tagColor: "badge-live",
              },
              {
                num: "02",
                icon: <Sparkles className="w-5 h-5 text-[#00D4FF]" />,
                title: t("modules.m02_title"),
                body: t("modules.m02_body"),
                tag: t("modules.m02_tag"),
                tagColor: "badge-beta",
              },
              {
                num: "03",
                icon: <Workflow className="w-5 h-5 text-[#00E5A0]" />,
                title: t("modules.m03_title"),
                body: t("modules.m03_body"),
                tag: t("modules.m03_tag"),
                tagColor: "badge-live",
              },
              {
                num: "04",
                icon: <Globe className="w-5 h-5 text-[#8899BB]" />,
                title: t("modules.m04_title"),
                body: t("modules.m04_body"),
                tag: t("modules.m04_tag"),
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
              {t("modules.link")}
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
            <SectionLabel>{t("biz.label")}</SectionLabel>
            <h2 className="heading-lg mb-6 max-w-xl">{t("biz.h2")}</h2>
            <p className="body-lead max-w-3xl">{t("biz.body")}</p>
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
                title: t("biz.p1_title"),
                body: t("biz.p1_body"),
              },
              {
                icon: <Database className="w-5 h-5 text-[#00D4FF]" />,
                title: t("biz.p2_title"),
                body: t("biz.p2_body"),
              },
              {
                icon: <Globe className="w-5 h-5 text-[#00E5A0]" />,
                title: t("biz.p3_title"),
                body: t("biz.p3_body"),
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
            <SectionLabel>{t("traction.label")}</SectionLabel>
            <h2 className="heading-lg">{t("traction.h2")}</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {[
              { value: t("traction.m1_val"), label: t("traction.m1_lbl") },
              { value: t("traction.m2_val"), label: t("traction.m2_lbl") },
              { value: t("traction.m3_val"), label: t("traction.m3_lbl") },
              { value: t("traction.m4_val"), label: t("traction.m4_lbl") },
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
              &ldquo;{t("traction.quote")}&rdquo;
            </p>
            <footer className="text-sm text-[#4A5A7A] font-mono">
              — {t("traction.author")}
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
            <SectionLabel>{t("vision.label")}</SectionLabel>
            <h2 className="heading-lg mb-8">{t("vision.h2")}</h2>
            <p className="font-display text-2xl md:text-3xl text-[#F0F4FF] italic max-w-3xl mx-auto leading-relaxed">
              &ldquo;{t("vision.statement")}&rdquo;
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
              <SectionLabel>{t("founder.label")}</SectionLabel>
              <h2 className="heading-lg mb-2">{t("founder.name")}</h2>
              <p className="text-sm font-mono text-[#0066FF] mb-6">{t("founder.title")}</p>
              <div className="space-y-4 body-lead">
                <p>{t("founder.bio1")}</p>
                <p>{t("founder.bio2")}</p>
                <p>{t("founder.bio3")}</p>
              </div>

              <ul className="mt-8 space-y-3">
                {[
                  t("founder.cred1"),
                  t("founder.cred2"),
                  t("founder.cred3"),
                  t("founder.cred4"),
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
            <SectionLabel>{t("cta.label")}</SectionLabel>
            <h2 className="heading-lg mb-6">{t("cta.h2")}</h2>
            <p className="body-lead max-w-xl mx-auto mb-10">{t("cta.body")}</p>
            <Link href="/contact" className="btn-primary text-base px-10 py-4 text-lg">
              {t("cta.button")}
            </Link>
            <p className="text-[12px] text-[#4A5A7A] mt-4 font-mono">
              {t("cta.footnote")}
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
