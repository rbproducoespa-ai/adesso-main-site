import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";

export const metadata = { title: "Database — ADESSO Admin" };

interface TableInfo {
  name: string;
  desc: string;
  status: "exists" | "missing";
  rows?: number;
  icon: string;
  createSql?: string;
}

async function checkTable(supabase: Awaited<ReturnType<typeof import("@/lib/supabase-server").createServerSupabase>>, name: string) {
  const { count, error } = await supabase.from(name).select("*", { count: "exact", head: true });
  return { exists: !error, count: count ?? 0 };
}

export default async function DatabasePage() {
  const supabase = createAdminSupabase();

  const [orders, siteContent, formSubs, contacts, blogPosts, profiles] = await Promise.all([
    checkTable(supabase, "orders"),
    checkTable(supabase, "site_content"),
    checkTable(supabase, "form_submissions"),
    checkTable(supabase, "contacts"),
    checkTable(supabase, "blog_posts"),
    checkTable(supabase, "profiles"),
  ]);

  const TABLES: TableInfo[] = [
    {
      name: "orders",
      icon: "◻",
      desc: "Customer orders, payments and delivery status",
      status: orders.exists ? "exists" : "missing",
      rows: orders.count,
    },
    {
      name: "site_content",
      icon: "✏",
      desc: "Content overrides for the Site Editor (text, images per page/section)",
      status: siteContent.exists ? "exists" : "missing",
      rows: siteContent.count,
      createSql: `CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  app text NOT NULL DEFAULT 'main',
  page text NOT NULL,
  section text NOT NULL,
  key text NOT NULL,
  value text,
  type text NOT NULL DEFAULT 'text',
  label text,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id),
  UNIQUE(app, page, section, key)
);`,
    },
    {
      name: "form_submissions",
      icon: "⊡",
      desc: "Contact form and lead capture submissions",
      status: formSubs.exists ? "exists" : "missing",
      rows: formSubs.count,
      createSql: `CREATE TABLE public.form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_name text,
  name text,
  email text,
  company text,
  subject text,
  message text,
  source text DEFAULT 'website',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);`,
    },
    {
      name: "contacts",
      icon: "◉",
      desc: "CRM contacts and leads with status tracking",
      status: contacts.exists ? "exists" : "missing",
      rows: contacts.count,
      createSql: `CREATE TABLE public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text,
  company text,
  phone text,
  message text,
  source text DEFAULT 'website',
  status text DEFAULT 'new',
  tags text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);`,
    },
    {
      name: "blog_posts",
      icon: "≡",
      desc: "Blog posts with title, content, categories and SEO fields",
      status: blogPosts.exists ? "exists" : "missing",
      rows: blogPosts.count,
      createSql: `CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  category text,
  author text,
  cover_image text,
  status text DEFAULT 'draft',
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);`,
    },
    {
      name: "profiles",
      icon: "⊕",
      desc: "Extended user profiles linked to auth.users",
      status: profiles.exists ? "exists" : "missing",
      rows: profiles.count,
      createSql: `CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text,
  full_name text,
  role text DEFAULT 'admin',
  avatar_url text,
  created_at timestamptz DEFAULT now()
);`,
    },
  ];

  const existingCount = TABLES.filter(t => t.status === "exists").length;
  const missingCount  = TABLES.filter(t => t.status === "missing").length;

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Database</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Database Manager</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>
            Supabase PostgreSQL · {existingCount}/{TABLES.length} tables ready
          </p>
        </div>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#141414", color: "#0066FF", padding: "9px 16px",
            fontSize: "11px", textDecoration: "none", borderRadius: "2px",
            border: "1px solid #252525",
          }}
        >
          Open Supabase Dashboard →
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Tables Ready",   value: existingCount,     color: "#3D7A4E" },
          { label: "Tables Missing", value: missingCount,      color: missingCount > 0 ? "#8C3535" : "#555" },
          { label: "Total Rows",     value: TABLES.reduce((s, t) => s + (t.rows ?? 0), 0), color: "#0066FF" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "28px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tables */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {TABLES.map((t) => (
          <div key={t.name} style={{
            background: "#141414",
            border: `1px solid ${t.status === "missing" ? "#3A1E1E" : "#1E1E1E"}`,
            borderLeft: `3px solid ${t.status === "exists" ? "#3D7A4E" : "#8C3535"}`,
            borderRadius: "4px", padding: "16px 20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: t.createSql && t.status === "missing" ? "14px" : "0" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "18px", opacity: 0.6 }}>{t.icon}</span>
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "3px" }}>
                    <code style={{ color: "#ddd", fontSize: "13px", fontWeight: 600 }}>{t.name}</code>
                    {t.status === "exists" && (
                      <span style={{
                        fontSize: "9px", fontWeight: 700,
                        color: "#0066FF", background: "rgba(140,115,85,0.1)",
                        padding: "1px 6px", borderRadius: "8px",
                      }}>
                        {t.rows} rows
                      </span>
                    )}
                  </div>
                  <p style={{ color: "#555", fontSize: "11px", margin: 0 }}>{t.desc}</p>
                </div>
              </div>
              <span style={{
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: t.status === "exists" ? "#3D7A4E" : "#8C3535",
                background: t.status === "exists" ? "rgba(61,122,78,0.12)" : "rgba(140,53,53,0.12)",
                padding: "3px 9px", borderRadius: "10px", flexShrink: 0,
              }}>
                {t.status === "exists" ? "● Ready" : "○ Missing"}
              </span>
            </div>

            {t.status === "missing" && t.createSql && (
              <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "3px", padding: "12px 14px" }}>
                <p style={{ color: "#8C3535", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  Run in Supabase SQL Editor:
                </p>
                <pre style={{
                  color: "#0066FF", fontSize: "10px", margin: 0,
                  fontFamily: "monospace", lineHeight: 1.7,
                  overflowX: "auto", whiteSpace: "pre-wrap",
                }}>
                  {t.createSql}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Migration file note */}
      <div style={{
        marginTop: "20px", background: "#0D0D0D",
        border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px 20px",
      }}>
        <p style={{ color: "#777", fontSize: "12px", fontWeight: 600, margin: "0 0 4px" }}>
          Full Migration File Available
        </p>
        <p style={{ color: "#444", fontSize: "11px", margin: 0, lineHeight: 1.6 }}>
          Run <code style={{ color: "#0066FF" }}>supabase/content-schema.sql</code> in your Supabase SQL Editor
          to create all missing tables at once with proper RLS policies and storage buckets.
        </p>
      </div>

    </div>
  );
}
