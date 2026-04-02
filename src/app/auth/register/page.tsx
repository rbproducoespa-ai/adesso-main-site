"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", company: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name, company: form.company },
      },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setDone(true);
  }

  if (done) return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-md">
          <span className="eyebrow">Account Created</span>
          <h1 className="headline-display mb-4">Check your email.</h1>
          <p className="body-lead mb-6">We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.</p>
          <Link href="/auth/login" className="btn-primary">Go to Login</Link>
        </div>
      </section>
    </main>
  );

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-md">
          <span className="eyebrow">Client Area</span>
          <h1 className="headline-display mb-2">Create account</h1>
          <p className="body-sm text-[#8B8B8B] mb-10">Register to purchase data products and manage your orders.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Full Name</label>
                <input required type="text" value={form.full_name} onChange={e => set("full_name", e.target.value)} placeholder="Your name" className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
              </div>
              <div>
                <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Company</label>
                <input type="text" value={form.company} onChange={e => set("company", e.target.value)} placeholder="Company" className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
              </div>
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Email</label>
              <input required type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="your@email.com" className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
            </div>
            <div>
              <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Password</label>
              <input required type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min. 8 characters" minLength={8} className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
              {loading ? "Creating account..." : "Create Account"}
            </button>
            <p className="text-center text-[12px] text-[#8B8B8B]">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-[#8C7355] hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
