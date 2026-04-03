"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle, MinusCircle } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Comparison table data ───────────────────────────────────────────────────

type CellValue = "yes" | "no" | "partial" | "limited";

interface TableRow {
  feature: string;
  adesso: CellValue;
  agency: CellValue;
  freelancer: CellValue;
  crm: CellValue;
}

const tableRows: TableRow[] = [
  { feature: "Exhibition-specific AI",  adesso: "yes",     agency: "no",      freelancer: "no",      crm: "no"      },
  { feature: "Lead intelligence data",  adesso: "yes",     agency: "no",      freelancer: "no",      crm: "no"      },
  { feature: "Scalable / subscription", adesso: "yes",     agency: "no",      freelancer: "no",      crm: "partial" },
  { feature: "Automated workflows",     adesso: "yes",     agency: "no",      freelancer: "no",      crm: "yes"     },
  { feature: "Industry expertise",      adesso: "yes",     agency: "partial", freelancer: "partial", crm: "no"      },
  { feature: "European coverage",       adesso: "yes",     agency: "limited", freelancer: "no",      crm: "no"      },
];

function CellIcon({ value }: { value: CellValue }) {
  if (value === "yes")
    return <CheckCircle2 size={18} className="mx-auto text-[#00E5A0]" aria-label="Yes" />;
  if (value === "no")
    return <XCircle size={18} className="mx-auto text-[#4A5A7A]" aria-label="No" />;
  if (value === "partial")
    return <span className="text-[#8899BB] text-sm">Partial</span>;
  return <span className="text-[#8899BB] text-sm">Limited</span>;
}

// ─── Opportunity cards ────────────────────────────────────────────────────────

const opportunityCards = [
  {
    title: "Market Size",
    body: "The global exhibition industry is valued at over €48 billion annually. The UK market alone accounts for £11 billion. No dominant SaaS platform exists in this space — Adesso is entering an uncontested vertical.",
  },
  {
    title: "Technology Window",
    body: "The convergence of large language models, computer vision, and scalable cloud infrastructure makes it possible — for the first time — to automate exhibition design and intelligence at a cost that works for SMEs and enterprise clients alike.",
  },
  {
    title: "Founder-Market Fit",
    body: "Adesso's founder spent over a decade working inside the exhibition industry. This is not a technology solution looking for a problem. It is a deeply understood industry problem being solved by someone with direct operational experience and technical capability.",
  },
];

const innovationBullets = [
  "Proprietary data collection from fragmented exhibition ecosystems",
  "AI models trained and contextualised for exhibition-specific outputs",
  "Workflow automation designed around exhibition industry timelines",
  "A marketplace model that creates network effects as it scales",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WhyAdessoPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="bg-[#04040A] pt-[72px] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-6 max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-xs font-semibold tracking-[0.18em] uppercase text-[#0066FF]"
            >
              WHY ADESSO EXISTS
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl md:text-6xl font-bold text-[#F0F4FF] leading-tight"
            >
              Why Adesso Exists
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-[#F0F4FF] max-w-2xl leading-snug"
            >
              The exhibition industry generates billions in annual revenue globally.
              It has no digital infrastructure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── The Gap ── */}
      <section className="bg-[#04040A] py-24 md:py-32 border-t border-[#1A2540]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl flex flex-col gap-6"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-[#F0F4FF]"
            >
              The Gap
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[#8899BB] text-base leading-relaxed">
              Every major industry vertical has been transformed by technology platforms — real
              estate by Rightmove and Zoopla, hospitality by Booking.com, recruitment by LinkedIn.
              The exhibition industry — a sector responsible for connecting businesses, launching
              products, and generating billions in B2B commerce — has no equivalent.
            </motion.p>

            <motion.p variants={fadeUp} className="text-[#8899BB] text-base leading-relaxed">
              Adesso exists to build it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── The Opportunity ── */}
      <section className="bg-[#080D1A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-12"
          >
            The Opportunity
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {opportunityCards.map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-6 hover:border-[#0066FF]/40 transition-all flex flex-col gap-4"
              >
                <h3 className="font-display text-lg font-semibold text-[#F0F4FF]">
                  {card.title}
                </h3>
                <p className="text-[#8899BB] text-sm leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Competitive Landscape ── */}
      <section className="bg-[#04040A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-[#F0F4FF] mb-12"
          >
            Competitive Landscape
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#1A2540]">
                  <th className="text-left py-3 px-4 text-[#4A5A7A] font-medium w-52"></th>
                  <th className="text-center py-3 px-4 text-[#0066FF] font-bold">Adesso</th>
                  <th className="text-center py-3 px-4 text-[#8899BB] font-medium">Traditional Agency</th>
                  <th className="text-center py-3 px-4 text-[#8899BB] font-medium">Freelancer</th>
                  <th className="text-center py-3 px-4 text-[#8899BB] font-medium">Generic CRM</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[#1A2540] ${i % 2 === 0 ? "bg-[#080D1A]/50" : ""}`}
                  >
                    <td className="py-3 px-4 text-[#8899BB]">{row.feature}</td>
                    <td className="py-3 px-4 text-center">
                      <CellIcon value={row.adesso} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CellIcon value={row.agency} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CellIcon value={row.freelancer} />
                    </td>
                    <td className="py-3 px-4 text-center">
                      <CellIcon value={row.crm} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ── The Innovation Case ── */}
      <section className="bg-[#080D1A] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl flex flex-col gap-6"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-[#F0F4FF]"
            >
              The Innovation Case
            </motion.h2>

            <motion.p variants={fadeUp} className="text-[#8899BB] text-base leading-relaxed">
              Adesso qualifies as genuinely innovative because it does not replicate an existing
              product in a new market. It creates a new category — exhibition intelligence
              infrastructure — by combining:
            </motion.p>

            <motion.ul variants={stagger} className="flex flex-col gap-3">
              {innovationBullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-[#8899BB] text-base"
                >
                  <span
                    className="mt-[5px] h-2 w-2 rounded-full bg-[#0066FF] shrink-0"
                    aria-hidden="true"
                  />
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeUp}
              className="text-[#F0F4FF] text-base font-bold leading-relaxed"
            >
              This is not a repackaged agency. This is category creation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#04040A] py-24 md:py-32 border-t border-[#1A2540]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 flex flex-col items-center text-center gap-8">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-[#F0F4FF]"
          >
            Ready to see it in action?
          </motion.h2>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0066FF] text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#0052CC] transition-colors"
            >
              Get in touch
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
