"use client";
import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-sm border border-red-200 bg-red-50 px-4 py-3">{error}</p>}
      <div>
        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Email</label>
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com" className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
      </div>
      <div>
        <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Password</label>
        <input required type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="••••••••" className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
        {loading ? "Signing in..." : "Sign In"}
      </button>
      <div className="flex justify-between text-[12px] text-[#8B8B8B] pt-1">
        <Link href="/auth/forgot-password" className="hover:text-[#8C7355]">Forgot password?</Link>
        <Link href="/auth/register" className="hover:text-[#8C7355]">Create account →</Link>
      </div>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl max-w-md">
          <span className="eyebrow">Client Area</span>
          <h1 className="headline-display mb-2">Sign in</h1>
          <p className="body-sm text-[#8B8B8B] mb-10">Access your orders and purchased data.</p>
          <Suspense><LoginForm /></Suspense>
        </div>
      </section>
    </main>
  );
}
