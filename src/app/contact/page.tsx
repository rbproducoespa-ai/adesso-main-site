"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";
type WaitlistStatus = "idle" | "loading" | "success" | "error";

interface FormFields {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

const emptyForm: FormFields = {
  name: "",
  email: "",
  company: "",
  role: "",
  message: "",
};

const roleOptions = [
  "Exhibitor",
  "Stand Contractor",
  "Event Organiser",
  "Investor",
  "Other",
];

// ─── Shared input classes ─────────────────────────────────────────────────────

const inputCls =
  "bg-[#0D1525] border border-[#1A2540] text-[#F0F4FF] focus:border-[#0066FF] focus:outline-none p-3 rounded-sm w-full text-sm placeholder:text-[#4A5A7A] transition-colors";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  // Contact form state
  const [fields, setFields] = useState<FormFields>(emptyForm);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Waitlist state
  const [waitlistEmail, setWaitlistEmail] = useState<string>("");
  const [waitlistStatus, setWaitlistStatus] = useState<WaitlistStatus>("idle");

  // ── Form handlers ──────────────────────────────────────────────────────────

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      setFields(emptyForm);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  // ── Waitlist handler ───────────────────────────────────────────────────────

  async function handleWaitlist(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWaitlistStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: waitlistEmail }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong.");
      }

      setWaitlistStatus("success");
      setWaitlistEmail("");
    } catch {
      setWaitlistStatus("error");
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <main>
      <section className="bg-[#04040A] pt-[72px] py-24 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          >
            {/* ── Left: Contact Form ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F0F4FF]">
                  Get in Touch
                </h1>
                <p className="text-[#8899BB] text-base leading-relaxed">
                  Whether you&apos;re an exhibition professional, investor, or potential partner
                  — we want to hear from you.
                </p>
              </div>

              {/* Success banner */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] rounded-sm px-4 py-3 text-sm"
                >
                  <CheckCircle2 size={16} className="shrink-0" />
                  Message sent! We&apos;ll be in touch within 24 hours.
                </motion.div>
              )}

              {/* Error banner */}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-sm px-4 py-3 text-sm"
                >
                  <AlertCircle size={16} className="shrink-0" />
                  {errorMessage || "Something went wrong. Please try again."}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-[#8899BB] uppercase tracking-wide">
                    Name <span className="text-[#0066FF]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputCls}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-[#8899BB] uppercase tracking-wide">
                    Email <span className="text-[#0066FF]">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-medium text-[#8899BB] uppercase tracking-wide">
                    Company <span className="text-[#0066FF]">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    required
                    value={fields.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputCls}
                  />
                </div>

                {/* Role */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="role" className="text-xs font-medium text-[#8899BB] uppercase tracking-wide">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={fields.role}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>
                      Select your role
                    </option>
                    {roleOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-[#8899BB] uppercase tracking-wide">
                    Message <span className="text-[#0066FF]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={fields.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or enquiry..."
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#0066FF] text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-[#0052CC] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <span className="inline-block h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* ── Right: Info + Waitlist ── */}
            <motion.div variants={fadeUp} className="flex flex-col gap-10">
              {/* Contact info */}
              <div className="bg-[#0D1525] border border-[#1A2540] rounded-sm p-6 flex flex-col gap-6">
                <h2 className="font-display text-xl font-semibold text-[#F0F4FF]">
                  Contact Information
                </h2>

                <ul className="flex flex-col gap-5">
                  <li className="flex items-start gap-4">
                    <Mail size={18} className="text-[#0066FF] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#4A5A7A] uppercase tracking-wide font-medium">Email</span>
                      <a
                        href="mailto:hello@adesso.digital"
                        className="text-[#F0F4FF] text-sm hover:text-[#0066FF] transition-colors"
                      >
                        hello@adesso.digital
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <MapPin size={18} className="text-[#0066FF] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#4A5A7A] uppercase tracking-wide font-medium">Location</span>
                      <span className="text-[#F0F4FF] text-sm">London, United Kingdom</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Clock size={18} className="text-[#0066FF] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-[#4A5A7A] uppercase tracking-wide font-medium">Response time</span>
                      <span className="text-[#F0F4FF] text-sm">Within 24 hours</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="border-t border-[#1A2540]" />

              {/* Waitlist */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="font-display text-xl font-semibold text-[#F0F4FF]">
                    Interested in early access?
                  </h2>
                  <p className="text-[#8899BB] text-sm leading-relaxed">
                    Join the waitlist and be first to know when Adesso launches.
                  </p>
                </div>

                {waitlistStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] rounded-sm px-4 py-3 text-sm"
                  >
                    <CheckCircle2 size={16} className="shrink-0" />
                    You&apos;re on the list!
                  </motion.div>
                ) : (
                  <form onSubmit={handleWaitlist} noValidate>
                    <div className="flex gap-2">
                      <label htmlFor="waitlist-email" className="sr-only">
                        Email address for waitlist
                      </label>
                      <input
                        id="waitlist-email"
                        type="email"
                        required
                        value={waitlistEmail}
                        onChange={(e) => setWaitlistEmail(e.target.value)}
                        placeholder="you@company.com"
                        className={`${inputCls} flex-1`}
                        disabled={waitlistStatus === "loading"}
                      />
                      <button
                        type="submit"
                        disabled={waitlistStatus === "loading"}
                        className="bg-[#0066FF] text-white text-sm font-semibold px-5 py-3 rounded-sm hover:bg-[#0052CC] transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {waitlistStatus === "loading" ? "..." : "Join Waitlist"}
                      </button>
                    </div>

                    {waitlistStatus === "error" && (
                      <p className="mt-2 text-xs text-red-400">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
