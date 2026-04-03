"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Globe, TrendingUp } from "lucide-react";

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
  return (
    <span className="section-label">{children}</span>
  );
}

/* ── ABOUT PAGE ──────────────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* ── SECTION 1: HERO ───────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden bg-[#04040A] pt-[72px]">
        {/* Grid background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,102,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,102,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(0,102,255,0.12),transparent)]" />

        <div className="container-max relative z-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>About Adesso</SectionLabel>
          </motion.div>

          <motion.h1
            className="heading-xl max-w-4xl mb-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            Building the digital infrastructure the exhibition industry never had.
          </motion.h1>

          <motion.p
            className="text-2xl italic text-[#F0F4FF] max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            &ldquo;A unified platform connecting opportunity discovery, intelligent design, and commercial delivery — purpose-built for the exhibition industry.&rdquo;
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2: COMPANY STORY ──────────────────────────────────────────── */}
      <section className="section-pad bg-[#04040A] border-t border-[#1A2540]">
        <div className="container-max">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="heading-lg mb-8">Why Adesso Exists</h2>
            </div>

            <div className="space-y-6">
              <motion.p
                className="body-lead"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Adesso was founded to solve a fundamental gap in the exhibition industry: the absence
                of a unified digital system connecting opportunity discovery, intelligent design, and
                commercial delivery.
              </motion.p>

              <motion.p
                className="body-lead"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                While industries such as real estate, finance, and e-commerce have undergone complete
                digital transformation — with platforms, data layers, and automation as standard —
                the exhibition sector remains largely manual and fragmented. Event organisers, stand
                builders, and exhibiting brands all operate in silos, with no shared intelligence
                infrastructure.
              </motion.p>

              <motion.p
                className="body-lead"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Adesso is building a scalable platform that integrates data intelligence, artificial
                intelligence, and workflow automation to connect every stage of the exhibition process.
                From identifying the right exhibitors to generating stand concepts and managing
                commercial pipeline — Adesso provides the complete digital layer exhibition
                professionals have needed for decades.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: WHY THIS MATTERS ───────────────────────────────────────── */}
      <section className="section-pad bg-[#080D1A]">
        <div className="container-max">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Market Context</SectionLabel>
            <h2 className="heading-lg">Why This Matters</h2>
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
                icon: <TrendingUp className="w-6 h-6 text-[#0066FF]" />,
                stat: "€48 Billion",
                statColor: "text-gradient-accent",
                title: "Global Market Scale",
                body: "The global exhibition industry generates over €48 billion in annual revenue — yet operates almost entirely on manual processes and fragmented workflows.",
              },
              {
                icon: <Globe className="w-6 h-6 text-[#F0F4FF]" />,
                stat: "Fragmented",
                statColor: "text-[#F0F4FF]",
                title: "No Dominant Platform",
                body: "No dominant digital platform exists across the exhibition sector. Unlike real estate or finance, there is no shared data layer, no automation standard, no intelligence infrastructure.",
              },
              {
                icon: <Building2 className="w-6 h-6 text-[#00E5A0]" />,
                stat: "Timing",
                statColor: "text-[#00E5A0]",
                title: "Critical Window",
                body: "Post-pandemic digitisation urgency creates a critical window. The industry is actively seeking technological solutions — and there is no established incumbent to displace.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={fadeUp}
                className="card-base flex flex-col"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-[#080D1A] border border-[#1A2540] rounded-sm mb-6">
                  {card.icon}
                </div>
                <p className={`font-mono text-3xl font-bold mb-2 ${card.statColor}`}>
                  {card.stat}
                </p>
                <h3 className="heading-sm mb-3">{card.title}</h3>
                <p className="body-base flex-1">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: REGISTERED BUSINESS INFO ───────────────────────────────── */}
      <section className="section-pad bg-[#04040A]">
        <div className="container-max">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel>Company Details</SectionLabel>
            <h2 className="heading-lg mb-10">Registered Business</h2>
          </motion.div>

          <motion.div
            className="max-w-2xl bg-[#0D1525] border border-[#1A2540] rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Panel header */}
            <div className="px-8 py-5 border-b border-[#1A2540] bg-[#080D1A] flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A2540]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A2540]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#1A2540]" />
              </div>
              <span className="text-[11px] font-mono text-[#4A5A7A] uppercase tracking-widest">
                company_profile.json
              </span>
            </div>

            {/* Info rows */}
            <div className="divide-y divide-[#1A2540]">
              {[
                { label: "Legal Name", value: "ADESSO DIGITAL LTD" },
                { label: "Registered In", value: "England & Wales" },
                { label: "Operating From", value: "London, United Kingdom" },
                { label: "Market Focus", value: "European B2B Exhibition Market" },
                { label: "Stage", value: "Early-stage / Pre-seed" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0 px-8 py-5"
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-[#4A5A7A] sm:w-48 flex-shrink-0">
                    {row.label}
                  </span>
                  <span className="font-semibold text-[#F0F4FF] text-[15px]">{row.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ────────────────────────────────────────────────────── */}
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
              Be among the first exhibition professionals to access Adesso&apos;s platform. Limited
              early access available for UK and European industry leaders.
            </p>
            <Link href="/contact" className="btn-primary text-base px-10 py-4">
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[12px] text-[#4A5A7A] mt-4 font-mono">
              No commitment required. We&apos;ll be in touch within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
