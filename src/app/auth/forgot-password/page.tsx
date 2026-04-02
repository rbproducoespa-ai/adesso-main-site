"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setSent(true);
  }

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-md">
          <span className="eyebrow">Client Area</span>
          <h1 className="headline-display mb-2">Reset password</h1>
          <p className="body-sm text-[#8B8B8B] mb-10">Enter your email and we will send a reset link.</p>
          {sent ? (
            <div className="border border-[#E2DFDA] bg-[#F5F4F1] px-6 py-8">
              <p className="font-semibold text-[#111111] mb-1">Check your inbox</p>
              <p className="body-sm">Reset link sent to <strong>{email}</strong>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>}
              <div>
                <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Email</label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
