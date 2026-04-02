"use client";

import { useState } from "react";
import { trackContactForm } from "@/lib/analytics";

export function ContactForm() {
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name:       (data.get("name")      as string)?.trim(),
      email:      (data.get("email")     as string)?.trim(),
      company:    (data.get("company")   as string)?.trim(),
      division:   (data.get("division")  as string)?.trim(),
      message:    (data.get("message")   as string)?.trim(),
      _honeypot:  (data.get("_honeypot") as string)?.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSent(true);
      trackContactForm({ division: payload.division ?? undefined });
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="border border-[#E2DFDA] bg-white px-8 py-14 text-center">
        <div className="w-10 h-10 border border-[#8C7355] flex items-center justify-center mx-auto mb-6">
          <svg className="w-4 h-4 text-[#8C7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="eyebrow">Message Sent</span>
        <p className="headline-md mb-3">We&apos;ll be in touch.</p>
        <p className="body-sm">Expect a response within 24 hours. Check your inbox — we reply directly, not via automation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users, catches bots */}
      <input type="text" name="_honeypot" aria-hidden="true" tabIndex={-1}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} />

      {error && (
        <div className="border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id="cf-name" required type="text" name="name" placeholder="Your full name"
            className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="cf-company" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">
            Company
          </label>
          <input
            id="cf-company" type="text" name="company" placeholder="Company or organisation"
            className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-email" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="cf-email" required type="email" name="email" placeholder="your@email.com"
          className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="cf-division" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">
          I&apos;m interested in
        </label>
        <div className="relative">
          <select
            id="cf-division" name="division"
            className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] focus:outline-none focus:border-[#8C7355] transition-colors appearance-none pr-10"
          >
            <option value="">Select a division (optional)</option>
            <option value="Exhibition — Stand Design &amp; Events">Exhibition — Stand Design &amp; Events</option>
            <option value="Automation — Workflows &amp; Systems">Automation — Workflows &amp; Systems</option>
            <option value="Lead Intelligence — Data Products">Lead Intelligence — Data Products</option>
            <option value="Lab — Experimental Tools">Lab — Experimental Tools</option>
            <option value="General Enquiry">General Enquiry</option>
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-[#8B8B8B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="cf-message" required name="message" rows={6}
          placeholder="Tell us about your project — what you need, your timeline, and any relevant context..."
          className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors resize-none"
        />
      </div>

      <div className="flex items-start justify-between gap-4 pt-1">
        <p className="text-[11px] text-[#ABABAB] leading-snug max-w-xs">
          We respond to every enquiry within 24 hours.
          Your data is handled in accordance with our{" "}
          <a href="/privacy" className="underline hover:text-[#8C7355] transition-colors">Privacy Policy</a>.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-shrink-0 disabled:opacity-60"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
