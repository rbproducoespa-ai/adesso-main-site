"use client";

import { useEffect, useState, useCallback } from "react";

interface PageSEO {
  page: string;
  path: string;
  label: string;
  title: string;
  description: string;
  indexable: boolean;
}

const DEFAULT_PAGES: PageSEO[] = [
  { page: "home",      path: "/",         label: "Home",      title: "ADESSO Digital — Exhibition, Automation & Lead Generation", description: "Premium digital solutions for European businesses. Exhibition stands, workflow automation, B2B lead intelligence.", indexable: true },
  { page: "about",     path: "/about",    label: "About",     title: "About ADESSO Digital — Our Story", description: "Founded in London. ADESSO Digital is a multi-division company serving exhibitors, businesses and brands across Europe.", indexable: true },
  { page: "services",  path: "/services", label: "Services",  title: "Services — ADESSO Digital", description: "Full suite of digital services including automation, exhibition production, lead generation and strategic consulting.", indexable: true },
  { page: "divisions", path: "/divisions",label: "Divisions", title: "Divisions — ADESSO Digital", description: "Four specialist divisions: Exhibition, Automation, Leads and Lab. Each focused on delivering measurable results.", indexable: true },
  { page: "products",  path: "/products", label: "Products",  title: "Products — ADESSO Digital", description: "Digital products and tools built by ADESSO Lab. SaaS, automation software and B2B intelligence platforms.", indexable: true },
  { page: "contact",   path: "/contact",  label: "Contact",   title: "Contact ADESSO Digital", description: "Get in touch with our team. Available for projects, partnerships and enquiries across Europe.", indexable: true },
  { page: "blog",      path: "/blog",     label: "Blog",      title: "Blog — ADESSO Digital", description: "Insights on exhibition design, automation and B2B lead generation from the ADESSO Digital team.", indexable: true },
];

type SaveState = "idle" | "saving" | "saved" | "error";

export default function SEOClient() {
  const [pages, setPages] = useState<PageSEO[]>(DEFAULT_PAGES);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<PageSEO>>({});
  const [saveState, setSaveState] = useState<Record<string, SaveState>>({});
  const [loading, setLoading] = useState(true);

  const loadSEO = useCallback(async () => {
    setLoading(true);
    try {
      const updates: Partial<Record<string, Partial<PageSEO>>> = {};

      await Promise.all(
        DEFAULT_PAGES.map(async (p) => {
          const res = await fetch(`/api/content?app=main&page=${p.page}`);
          if (!res.ok) return;
          const json = await res.json();
          const rows: { section: string; key: string; value: string }[] = json.data ?? [];
          const seoRows = rows.filter((r) => r.section === "seo");
          if (seoRows.length > 0) {
            const patch: Partial<PageSEO> = {};
            seoRows.forEach((r) => {
              if (r.key === "title") patch.title = r.value;
              if (r.key === "description") patch.description = r.value;
              if (r.key === "indexable") patch.indexable = r.value === "true";
            });
            updates[p.page] = patch;
          }
        })
      );

      setPages((prev) =>
        prev.map((p) => (updates[p.page] ? { ...p, ...updates[p.page] } : p))
      );
    } catch (e) {
      console.error("SEO load error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadSEO(); }, [loadSEO]);

  const startEdit = (p: PageSEO) => {
    setEditing(p.page);
    setDraft({ title: p.title, description: p.description, indexable: p.indexable });
  };

  const cancelEdit = () => {
    setEditing(null);
    setDraft({});
  };

  const saveField = async (page: string, key: string, value: string) => {
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app: "main", page, section: "seo", key, value, type: "text", label: key }),
    });
  };

  const savePage = async (p: PageSEO) => {
    setSaveState((s) => ({ ...s, [p.page]: "saving" }));
    try {
      await Promise.all([
        saveField(p.page, "title", draft.title ?? p.title),
        saveField(p.page, "description", draft.description ?? p.description),
        saveField(p.page, "indexable", String(draft.indexable ?? p.indexable)),
      ]);
      setPages((prev) =>
        prev.map((pg) =>
          pg.page === p.page
            ? { ...pg, title: draft.title ?? pg.title, description: draft.description ?? pg.description, indexable: draft.indexable ?? pg.indexable }
            : pg
        )
      );
      setSaveState((s) => ({ ...s, [p.page]: "saved" }));
      setEditing(null);
      setTimeout(() => setSaveState((s) => ({ ...s, [p.page]: "idle" })), 2000);
    } catch {
      setSaveState((s) => ({ ...s, [p.page]: "error" }));
    }
  };

  const scoreFor = (p: PageSEO) => {
    let score = 50;
    if (p.title && p.title.length >= 30 && p.title.length <= 60) score += 20;
    else if (p.title) score += 10;
    if (p.description && p.description.length >= 120 && p.description.length <= 160) score += 20;
    else if (p.description) score += 10;
    if (p.indexable) score += 10;
    return Math.min(score, 100);
  };

  const avgScore = Math.round(pages.reduce((s, p) => s + scoreFor(p), 0) / pages.length);
  const ScoreColor = (s: number) => s >= 85 ? "#3D7A4E" : s >= 70 ? "#8C7355" : "#8C3535";

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › SEO</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>SEO Manager</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Site-wide SEO health and per-page optimisation</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="/sitemap.xml" target="_blank" rel="noreferrer" style={{ background: "#1A1A1A", color: "#777", padding: "9px 16px", fontSize: "11px", textDecoration: "none", borderRadius: "2px", border: "1px solid #252525" }}>
            ↗ View Sitemap
          </a>
          <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" style={{ background: "#141414", color: "#8C7355", padding: "9px 16px", fontSize: "11px", textDecoration: "none", borderRadius: "2px", border: "1px solid #252525" }}>
            Google Search Console →
          </a>
        </div>
      </div>

      {/* Score Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Average SEO Score",  value: `${avgScore}`, color: ScoreColor(avgScore) },
          { label: "Indexed Pages",      value: `${pages.filter(p => p.indexable).length}/${pages.length}`, color: "#4A6C8C" },
          { label: "Pages Configured",   value: `${pages.length}`, color: "#3D7A4E" },
          { label: "Needs Improvement",  value: `${pages.filter(p => scoreFor(p) < 75).length}`, color: "#8C3535" },
        ].map(c => (
          <div key={c.label} style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "18px 20px" }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{c.label}</p>
            <p style={{ color: c.color, fontSize: "26px", fontWeight: 700, margin: 0 }}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Per-page SEO */}
      <div style={{ marginBottom: "24px" }}>
        <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Per-Page SEO {loading && <span style={{ color: "#555", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>— loading…</span>}
        </p>

        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          {pages.map((p, i) => {
            const score = scoreFor(p);
            const isEditing = editing === p.page;
            const state = saveState[p.page] ?? "idle";

            return (
              <div key={p.page} style={{
                padding: "16px 20px",
                borderBottom: i < pages.length - 1 ? "1px solid #1A1A1A" : "none",
              }}>
                {isEditing ? (
                  /* Edit mode */
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <div>
                        <p style={{ color: "#ccc", fontSize: "13px", fontWeight: 600, margin: "0 0 2px" }}>{p.label}</p>
                        <code style={{ color: "#444", fontSize: "10px" }}>{p.path}</code>
                      </div>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <button onClick={cancelEdit} style={{ background: "none", border: "1px solid #252525", color: "#555", fontSize: "10px", padding: "5px 12px", borderRadius: "2px", cursor: "pointer" }}>
                          Cancel
                        </button>
                        <button
                          onClick={() => savePage(p)}
                          disabled={state === "saving"}
                          style={{
                            background: "#8C7355", color: "#fff", border: "none",
                            fontSize: "10px", fontWeight: 700, padding: "5px 14px",
                            borderRadius: "2px", cursor: state === "saving" ? "not-allowed" : "pointer",
                            letterSpacing: "0.1em", textTransform: "uppercase",
                          }}
                        >
                          {state === "saving" ? "Saving…" : "Save"}
                        </button>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div>
                        <label style={{ color: "#555", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                          Meta Title <span style={{ color: (draft.title?.length ?? 0) > 60 ? "#8C3535" : "#555" }}>({draft.title?.length ?? 0}/60)</span>
                        </label>
                        <input
                          type="text"
                          value={draft.title ?? ""}
                          onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
                          maxLength={80}
                          style={{
                            width: "100%", background: "#0D0D0D", border: "1px solid #252525",
                            color: "#fff", fontSize: "12px", padding: "8px 12px",
                            borderRadius: "3px", outline: "none", boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ color: "#555", fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                          Meta Description <span style={{ color: (draft.description?.length ?? 0) > 160 ? "#8C3535" : "#555" }}>({draft.description?.length ?? 0}/160)</span>
                        </label>
                        <textarea
                          value={draft.description ?? ""}
                          onChange={e => setDraft(d => ({ ...d, description: e.target.value }))}
                          maxLength={200}
                          rows={2}
                          style={{
                            width: "100%", background: "#0D0D0D", border: "1px solid #252525",
                            color: "#fff", fontSize: "12px", padding: "8px 12px",
                            borderRadius: "3px", outline: "none", resize: "vertical",
                            boxSizing: "border-box", fontFamily: "inherit",
                          }}
                        />
                      </div>
                      <label style={{ display: "flex", gap: "8px", alignItems: "center", cursor: "pointer" }}>
                        <input
                          type="checkbox"
                          checked={draft.indexable ?? true}
                          onChange={e => setDraft(d => ({ ...d, indexable: e.target.checked }))}
                        />
                        <span style={{ color: "#777", fontSize: "11px" }}>Indexable (allow search engines)</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  /* View mode */
                  <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 80px 110px", gap: "16px", alignItems: "start" }}>
                    <div>
                      <p style={{ color: "#ccc", fontSize: "12px", fontWeight: 600, margin: "0 0 2px" }}>{p.label}</p>
                      <code style={{ color: "#444", fontSize: "10px" }}>{p.path}</code>
                    </div>
                    <div>
                      <p style={{ color: "#ddd", fontSize: "11px", fontWeight: 600, margin: "0 0 4px" }}>{p.title || <span style={{ color: "#333" }}>No title set</span>}</p>
                      <p style={{ color: "#555", fontSize: "10px", margin: 0, lineHeight: 1.5 }}>{p.description || <span style={{ color: "#333" }}>No description set</span>}</p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: ScoreColor(score), background: `${ScoreColor(score)}18`, padding: "2px 8px", borderRadius: "10px" }}>
                        {score}
                      </span>
                      <p style={{ color: "#444", fontSize: "9px", margin: "4px 0 0" }}>Score</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <button
                        onClick={() => startEdit(p)}
                        style={{
                          color: "#8C7355", fontSize: "10px", cursor: "pointer",
                          padding: "4px 10px", background: "rgba(140,115,85,0.1)",
                          borderRadius: "2px", border: "1px solid rgba(140,115,85,0.2)",
                          textAlign: "center",
                        }}
                      >
                        {state === "saved" ? "✓ Saved" : "Edit SEO"}
                      </button>
                      <a
                        href={p.path}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#555", fontSize: "10px", textDecoration: "none",
                          padding: "4px 10px", background: "#1A1A1A",
                          borderRadius: "2px", border: "1px solid #252525",
                          textAlign: "center",
                        }}
                      >
                        ↗ View
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px" }}>
        <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 16px" }}>SEO Recommendations</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { icon: "⚡", label: "Add Open Graph images", desc: "Set og:image for all pages to improve social sharing appearance", priority: "high" },
            { icon: "⌖", label: "Register Google Search Console", desc: "Submit sitemap.xml to Google Search Console for faster indexing", priority: "high" },
            { icon: "≡", label: "Add Blog content", desc: "Regular blog posts with target keywords improve organic rankings", priority: "medium" },
            { icon: "◉", label: "Local SEO schema", desc: "Add LocalBusiness schema markup for London/European presence", priority: "medium" },
            { icon: "↗", label: "Core Web Vitals", desc: "Monitor LCP, FID and CLS scores in Google PageSpeed Insights", priority: "low" },
            { icon: "⊟", label: "Canonical tags", desc: "Ensure all pages have canonical URLs to prevent duplicate content", priority: "low" },
          ].map(r => (
            <div key={r.label} style={{ padding: "12px 14px", background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "3px", display: "flex", gap: "10px" }}>
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{r.icon}</span>
              <div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                  <p style={{ color: "#ccc", fontSize: "11px", fontWeight: 600, margin: 0 }}>{r.label}</p>
                  <span style={{
                    fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", padding: "1px 5px", borderRadius: "8px",
                    color: r.priority === "high" ? "#8C3535" : r.priority === "medium" ? "#8C7355" : "#444",
                    background: r.priority === "high" ? "#8C353518" : r.priority === "medium" ? "#8C735518" : "#1A1A1A",
                  }}>{r.priority}</span>
                </div>
                <p style={{ color: "#444", fontSize: "10px", margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
