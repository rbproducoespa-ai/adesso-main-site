"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<{ email?: string; user_metadata?: Record<string, string> } | null>(null);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setFullName(data.user.user_metadata?.full_name ?? "");
        setCompany(data.user.user_metadata?.company ?? "");
      }
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSaved(false);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, company },
    });
    if (error) { setError(error.message); } else { setSaved(true); }
    setLoading(false);
  }

  const sidebarLinks = [
    { label: "Overview", href: "/account" },
    { label: "Submit a Brief", href: "/account/new-project" },
    { label: "My Orders", href: "/account/orders" },
    { label: "Downloads", href: "/account/orders" },
    { label: "Profile", href: "/account/profile" },
  ];

  return (
    <main>
      <section className="section-pad bg-white border-b border-[#E2DFDA]">
        <div className="container-xl">
          <span className="eyebrow">Client Area</span>
          <h1 className="headline-display">Profile</h1>
        </div>
      </section>

      <section className="section-pad bg-[#F5F4F1]">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 space-y-1">
              {sidebarLinks.map((l) => (
                <Link key={l.label} href={l.href}
                  className={"flex items-center justify-between px-4 py-3 text-[13px] font-medium border transition-all " +
                    (l.href === "/account/profile"
                      ? "bg-white border-[#E2DFDA] text-[#111111]"
                      : "text-[#5C5C5C] hover:text-[#111111] hover:bg-white border-transparent hover:border-[#E2DFDA]")}>
                  {l.label}
                  <span className="text-[#E2DFDA]">→</span>
                </Link>
              ))}
            </div>

            <div className="lg:col-span-9">
              <div className="bg-white border border-[#E2DFDA] p-8">
                <h2 className="headline-md mb-8">Your Details</h2>
                {saved && <p className="text-sm text-green-700 border border-green-200 bg-green-50 px-4 py-3 mb-6">Profile updated successfully.</p>}
                {error && <p className="text-sm text-red-700 border border-red-200 bg-red-50 px-4 py-3 mb-6">{error}</p>}
                <form onSubmit={handleSave} className="space-y-5 max-w-lg">
                  <div>
                    <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Email</label>
                    <p className="w-full border border-[#E2DFDA] bg-[#F5F4F1] px-4 py-3 text-[14px] text-[#8B8B8B]">{user?.email}</p>
                    <p className="text-[11px] text-[#B0B0B0] mt-1">Email cannot be changed here.</p>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Full Name</label>
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#8C7355] block mb-2">Company</label>
                    <input type="text" value={company} onChange={e => setCompany(e.target.value)}
                      placeholder="Your company name"
                      className="w-full border border-[#E2DFDA] bg-white px-4 py-3 text-[14px] text-[#111111] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#8C7355] transition-colors" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
