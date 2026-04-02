"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Exhibition", "Automation", "Leads", "Industry", "Case Study", "General"];

const S = {
  label: {
    fontSize: "10px", fontWeight: 700 as const, color: "#555",
    letterSpacing: "0.1em", textTransform: "uppercase" as const,
    display: "block", marginBottom: "6px",
  },
  input: {
    width: "100%", padding: "9px 12px",
    background: "#111", border: "1px solid #252525",
    color: "#fff", fontSize: "13px", borderRadius: "3px",
    boxSizing: "border-box" as const, outline: "none",
  },
  textarea: {
    width: "100%", padding: "9px 12px",
    background: "#111", border: "1px solid #252525",
    color: "#ccc", fontSize: "13px", borderRadius: "3px",
    boxSizing: "border-box" as const, outline: "none",
    resize: "vertical" as const, lineHeight: 1.7,
  },
  field: { marginBottom: "20px" },
};

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState<"idle" | "saving" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "General",
    author: "",
    excerpt: "",
    content: "",
    cover_image: "",
    status: "draft" as "draft" | "published",
    seo_title: "",
    seo_description: "",
  });

  function slugify(val: string) {
    return val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function handleTitleChange(val: string) {
    setForm(f => ({
      ...f,
      title: val,
      slug: f.slug === "" || f.slug === slugify(f.title) ? slugify(val) : f.slug,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setSaving("saving");
    setError(null);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          published_at: form.status === "published" ? new Date().toISOString() : null,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) throw new Error(json.error ?? "Failed to save");
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSaving("error");
    }
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: "860px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>
          Admin › Blog › New Post
        </p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Create New Post</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>

          {/* Main Column */}
          <div>
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px", marginBottom: "16px" }}>
              <div style={S.field}>
                <label style={S.label}>Title *</label>
                <input
                  style={S.input}
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Post title..."
                  required
                />
              </div>

              <div style={S.field}>
                <label style={S.label}>URL Slug *</label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#444", fontSize: "12px", whiteSpace: "nowrap" }}>/blog/</span>
                  <input
                    style={S.input}
                    value={form.slug}
                    onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))}
                    placeholder="my-post-slug"
                    required
                  />
                </div>
              </div>

              <div style={S.field}>
                <label style={S.label}>Excerpt</label>
                <textarea
                  style={S.textarea}
                  rows={3}
                  value={form.excerpt}
                  onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                  placeholder="Short description shown in post listings..."
                />
              </div>

              <div style={S.field}>
                <label style={S.label}>Content</label>
                <textarea
                  style={{ ...S.textarea, minHeight: "280px" }}
                  rows={14}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  placeholder="Write your post content here... (Markdown supported)"
                />
              </div>
            </div>

            {/* SEO */}
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 16px" }}>SEO Settings</p>

              <div style={S.field}>
                <label style={S.label}>SEO Title</label>
                <input
                  style={S.input}
                  value={form.seo_title}
                  onChange={e => setForm(f => ({ ...f, seo_title: e.target.value }))}
                  placeholder={form.title || "Leave blank to use post title"}
                />
              </div>

              <div style={{ marginBottom: 0 }}>
                <label style={S.label}>Meta Description</label>
                <textarea
                  style={S.textarea}
                  rows={3}
                  value={form.seo_description}
                  onChange={e => setForm(f => ({ ...f, seo_description: e.target.value }))}
                  placeholder="160 chars max — leave blank to use excerpt"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Publish */}
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 14px" }}>Publish</p>

              <div style={S.field}>
                <label style={S.label}>Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value as "draft" | "published" }))}
                  style={{
                    ...S.input,
                    appearance: "none" as const, cursor: "pointer",
                  }}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {error && (
                <p style={{ color: "#8C3535", fontSize: "11px", margin: "0 0 12px", padding: "8px 10px", background: "rgba(140,53,53,0.1)", borderRadius: "3px" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={saving === "saving"}
                style={{
                  width: "100%", padding: "10px",
                  background: saving === "saving" ? "#555" : "#8C7355",
                  border: "none", color: "#fff",
                  fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  cursor: saving === "saving" ? "default" : "pointer",
                  borderRadius: "3px",
                }}
              >
                {saving === "saving" ? "Saving..." : form.status === "published" ? "Publish Post" : "Save Draft"}
              </button>

              <a
                href="/admin/blog"
                style={{
                  display: "block", textAlign: "center", marginTop: "8px",
                  color: "#444", fontSize: "11px", textDecoration: "none",
                }}
              >
                ← Cancel
              </a>
            </div>

            {/* Meta */}
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 14px" }}>Post Details</p>

              <div style={S.field}>
                <label style={S.label}>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{ ...S.input, appearance: "none" as const, cursor: "pointer" }}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div style={S.field}>
                <label style={S.label}>Author</label>
                <input
                  style={S.input}
                  value={form.author}
                  onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                  placeholder="Bruno Castro"
                />
              </div>

              <div style={{ marginBottom: 0 }}>
                <label style={S.label}>Cover Image URL</label>
                <input
                  style={S.input}
                  value={form.cover_image}
                  onChange={e => setForm(f => ({ ...f, cover_image: e.target.value }))}
                  placeholder="https://images.unsplash.com/..."
                />
                {form.cover_image && (
                  <div style={{ marginTop: "8px", borderRadius: "3px", overflow: "hidden", aspectRatio: "16/9" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.cover_image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => (e.currentTarget.style.opacity = "0.2")} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
