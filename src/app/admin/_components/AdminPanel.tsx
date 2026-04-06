"use client";

import { useState } from "react";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface Order {
  id: string;
  product_name: string;
  customer_email: string;
  amount_pence: string;
  status: string;
  created_at: string;
}

interface Stats {
  totalOrders: number;
  paidOrders: number;
  deliveredOrders: number;
}

interface Division {
  n: string;
  tag: string;
  name: string;
  url: string;
  editorUrl: string;
  description: string;
  color: string;
  status: "live" | "in-dev";
}

const DIVISIONS: Division[] = [
  {
    n: "01", tag: "Exhibition", name: "ADESSO Exhibition",
    url: process.env.NEXT_PUBLIC_EXHIBITION_URL ?? "https://exhibition.adesso.digital",
    editorUrl: "/admin/editor",
    description: "Stand design, 3D visualisation & event production.",
    color: "#0066FF", status: "live",
  },
  {
    n: "02", tag: "Automation", name: "ADESSO Automation",
    url: process.env.NEXT_PUBLIC_AUTOMATION_URL ?? "https://automation.adesso.digital",
    editorUrl: "/admin/editor",
    description: "Business process automation & custom digital systems.",
    color: "#5C7A6A", status: "live",
  },
  {
    n: "03", tag: "Leads", name: "ADESSO Leads",
    url: process.env.NEXT_PUBLIC_LEADS_URL ?? "https://leads.adesso.digital",
    editorUrl: "/admin/editor",
    description: "Targeted B2B lead intelligence & verified databases.",
    color: "#4A6C8C", status: "live",
  },
  {
    n: "04", tag: "Lab", name: "ADESSO Lab",
    url: process.env.NEXT_PUBLIC_LAB_URL ?? "https://lab.adesso.digital",
    editorUrl: "/admin/editor",
    description: "Early-stage SaaS products & experimental tools.",
    color: "#6B4C8C", status: "in-dev",
  },
];

type Section = "dashboard" | "editor" | "divisions" | "analytics" | "marketing" | "orders" | "settings";

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: "dashboard",  label: "Dashboard",      icon: "⊞" },
  { id: "editor",     label: "Site Editor",     icon: "✏" },
  { id: "divisions",  label: "Divisions",       icon: "◈" },
  { id: "analytics",  label: "Analytics",       icon: "↗" },
  { id: "marketing",  label: "Marketing & Ads", icon: "◎" },
  { id: "orders",     label: "Orders",          icon: "◻" },
  { id: "settings",   label: "Settings",        icon: "⚙" },
];

// ── Main Component ──────────────────────────────────────────────────────────
export function AdminPanel({ stats, orders, userEmail }: {
  stats: Stats;
  orders: Order[];
  userEmail: string;
}) {
  const [section, setSection] = useState<Section>("dashboard");

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", background: "#F5F4F1" }}>
      {/* ── Sidebar ── */}
      <aside style={{ width: 220, background: "#111111", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "20px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16 }}>
            <div style={{ width: 32, height: 32, background: "#0066FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>A</span>
            </div>
            <div>
              <p style={{ color: "white", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", margin: 0 }}>ADESSO</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, letterSpacing: "0.15em", margin: 0 }}>ADMIN STUDIO</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "10px 20px", border: "none", cursor: "pointer",
                background: section === item.id ? "rgba(140,115,85,0.18)" : "transparent",
                borderLeft: section === item.id ? "2px solid #0066FF" : "2px solid transparent",
                color: section === item.id ? "#E8D5BA" : "rgba(255,255,255,0.5)",
                fontSize: 13, textAlign: "left", transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{item.icon}</span>
              <span style={{ fontWeight: section === item.id ? 600 : 400 }}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "12px 20px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginBottom: 10, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {userEmail}
          </p>
          <a href="/" target="_blank"
            style={{ display: "flex", alignItems: "center", gap: 6, color: "#0066FF", fontSize: 12, textDecoration: "none", fontWeight: 600 }}>
            <span>↗</span> View Site
          </a>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <div style={{
          padding: "16px 32px", background: "white",
          borderBottom: "1px solid #E2DFDA",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111111", margin: 0 }}>
            {NAV.find(n => n.id === section)?.label}
          </h1>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <a href="/admin/editor"
              style={{
                background: "#0066FF", color: "white", padding: "8px 16px",
                fontSize: 12, fontWeight: 600, textDecoration: "none",
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
              ✏ Site Editor
            </a>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 32, flex: 1 }}>
          {section === "dashboard"  && <DashboardSection stats={stats} orders={orders} setSection={setSection} />}
          {section === "editor"     && <EditorSection />}
          {section === "divisions"  && <DivisionsSection />}
          {section === "analytics"  && <AnalyticsSection stats={stats} />}
          {section === "marketing"  && <MarketingSection />}
          {section === "orders"     && <OrdersSection orders={orders} />}
          {section === "settings"   && <SettingsSection />}
        </div>
      </main>
    </div>
  );
}

// ── Dashboard ───────────────────────────────────────────────────────────────
function DashboardSection({ stats, orders, setSection }: {
  stats: Stats;
  orders: Order[];
  setSection: (s: Section) => void;
}) {
  return (
    <div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Total Orders", value: stats.totalOrders, color: "#111111", icon: "◻" },
          { label: "Awaiting Delivery", value: stats.paidOrders, color: "#0066FF", icon: "◷" },
          { label: "Delivered", value: stats.deliveredOrders, color: "#4A8C6A", icon: "✓" },
          { label: "Divisions Live", value: 4, color: "#4A6C8C", icon: "◈" },
        ].map((s) => (
          <div key={s.label} style={{
            background: "white", border: "1px solid #E2DFDA",
            padding: 20, borderRadius: 2,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 20, color: s.color }}>{s.icon}</span>
            </div>
            <p style={{ fontSize: 28, fontWeight: 800, color: s.color, margin: "0 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#8B8B8B", textTransform: "uppercase", letterSpacing: "0.12em", margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Division Status */}
        <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2DFDA", display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Division Status</h2>
            <button onClick={() => setSection("divisions")} style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
              Manage →
            </button>
          </div>
          {DIVISIONS.map((d) => (
            <div key={d.n} style={{ padding: "12px 20px", borderBottom: "1px solid #F5F4F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.status === "live" ? "#4A8C6A" : "#0066FF" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>{d.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={d.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, color: "#0066FF", textDecoration: "none", padding: "3px 8px", border: "1px solid #0066FF" }}>
                  Open ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2DFDA" }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Quick Actions</h2>
          </div>
          <div style={{ padding: 12 }}>
            {[
              { label: "Edit Homepage",        href: "/admin/editor", icon: "✏", desc: "Change hero, images, text" },
              { label: "View Orders",          href: "#", onClick: () => setSection("orders"), icon: "◻", desc: "Recent orders and status" },
              { label: "Marketing & Ads",      href: "#", onClick: () => setSection("marketing"), icon: "◎", desc: "Google Ads, paid traffic" },
              { label: "Analytics",            href: "#", onClick: () => setSection("analytics"), icon: "↗", desc: "Visitor and conversion data" },
            ].map((a) => (
              a.href === "#" ? (
                <button key={a.label} onClick={a.onClick}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 8px",
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    borderRadius: 2, transition: "background 0.1s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F5F4F1")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <span style={{ width: 32, height: 32, background: "#F5F4F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: 0 }}>{a.label}</p>
                    <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>{a.desc}</p>
                  </div>
                </button>
              ) : (
                <a key={a.label} href={a.href}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 8px",
                    textDecoration: "none", borderRadius: 2,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#F5F4F1")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >
                  <span style={{ width: 32, height: 32, background: "#F5F4F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{a.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: 0 }}>{a.label}</p>
                    <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>{a.desc}</p>
                  </div>
                </a>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2DFDA", display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Recent Orders</h2>
          <button onClick={() => setSection("orders")} style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
            View all →
          </button>
        </div>
        {orders.slice(0, 5).map((o) => (
          <div key={o.id} style={{ padding: "12px 20px", borderBottom: "1px solid #F5F4F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: "0 0 2px" }}>{o.product_name}</p>
              <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>{o.customer_email} · #{o.id.slice(0, 8)}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>£{(parseInt(o.amount_pence) / 100).toFixed(2)}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "3px 8px",
                background: o.status === "delivered" ? "#111111" : o.status === "paid" ? "#0066FF" : "#E2DFDA",
                color: o.status === "pending" ? "#5C5C5C" : "white",
              }}>{o.status}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && (
          <p style={{ padding: 20, color: "#8B8B8B", fontSize: 13 }}>No orders yet.</p>
        )}
      </div>
    </div>
  );
}

// ── Site Editor ─────────────────────────────────────────────────────────────
function EditorSection() {
  return (
    <div>
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, marginBottom: 24 }}>
        <div style={{ padding: "24px 28px", borderBottom: "1px solid #E2DFDA" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px" }}>Site Editor</h2>
          <p style={{ fontSize: 13, color: "#5C5C5C", margin: 0 }}>Edit any text, image, or content on the ADESSO main site. Changes go live immediately after saving.</p>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <a href="/admin/editor"
            style={{
              display: "inline-block", background: "#111111", color: "white",
              padding: "12px 24px", fontSize: 12, fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none",
              marginRight: 12,
            }}>
            ✏ Open Site Editor
          </a>
          <a href="/" target="_blank"
            style={{
              display: "inline-block", border: "1px solid #E2DFDA", color: "#111111",
              padding: "12px 24px", fontSize: 12, fontWeight: 600,
              letterSpacing: "0.1em", textDecoration: "none",
            }}>
            ↗ View Live Site
          </a>
        </div>
      </div>

      {/* Pages you can edit */}
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2 }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2DFDA" }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>Editable Pages</h2>
        </div>
        {[
          { label: "Home Page",   path: "/",          sections: "Hero, CTA Banner, Founder" },
          { label: "About",       path: "/about",     sections: "Hero, Story Image, Founder" },
          { label: "Services",    path: "/services",  sections: "Hero" },
          { label: "Divisions",   path: "/divisions", sections: "Hero" },
          { label: "Contact",     path: "/contact",   sections: "Hero, Contact Info" },
          { label: "Products",    path: "/products",  sections: "Hero" },
        ].map((p) => (
          <div key={p.path} style={{ padding: "14px 20px", borderBottom: "1px solid #F5F4F1", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: "0 0 2px" }}>{p.label}</p>
              <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>Sections: {p.sections}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <a href={`/admin/editor`}
                style={{ fontSize: 11, color: "white", background: "#0066FF", padding: "4px 10px", textDecoration: "none", fontWeight: 600 }}>
                Edit
              </a>
              <a href={p.path} target="_blank"
                style={{ fontSize: 11, color: "#0066FF", padding: "4px 10px", border: "1px solid #0066FF", textDecoration: "none", fontWeight: 600 }}>
                View ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Divisions ───────────────────────────────────────────────────────────────
function DivisionsSection() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {DIVISIONS.map((d) => (
          <div key={d.n} style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "20px 24px", background: "#111111", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: d.color }}>{d.tag}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  padding: "3px 8px",
                  background: d.status === "live" ? "rgba(74,140,106,0.2)" : "rgba(140,115,85,0.2)",
                  color: d.status === "live" ? "#6BC48A" : "#C8A97A",
                }}>
                  {d.status === "live" ? "● Live" : "◑ In Dev"}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{d.name}</h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: 0 }}>{d.description}</p>
            </div>

            {/* Actions */}
            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <a href={d.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, textAlign: "center", background: "#111111", color: "white",
                    padding: "10px 0", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
                  }}>
                  Open Site ↗
                </a>
                <a href="/admin/editor"
                  style={{
                    flex: 1, textAlign: "center", border: "1px solid #0066FF", color: "#0066FF",
                    padding: "10px 0", fontSize: 12, fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
                  }}>
                  ✏ Edit Content
                </a>
              </div>

              <div style={{ borderTop: "1px solid #F5F4F1", paddingTop: 12 }}>
                <p style={{ fontSize: 11, color: "#8B8B8B", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Division URL</p>
                <p style={{ fontSize: 12, color: "#111111", fontFamily: "monospace", margin: 0, wordBreak: "break-all" }}>{d.url}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(140,115,85,0.08)", border: "1px solid rgba(140,115,85,0.2)", borderRadius: 2 }}>
        <p style={{ fontSize: 13, color: "#7A6347", margin: 0 }}>
          <strong>Note:</strong> Each division has its own Next.js app. To edit their content, open the division site and use the editor within that app at <code style={{ background: "rgba(140,115,85,0.1)", padding: "1px 4px", fontSize: 12 }}>/admin/editor</code>.
        </p>
      </div>
    </div>
  );
}

// ── Analytics ───────────────────────────────────────────────────────────────
function AnalyticsSection({ stats }: { stats: Stats }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Revenue", value: "—", note: "Connect Stripe for revenue tracking" },
          { label: "Total Orders", value: stats.totalOrders },
          { label: "Conversion Rate", value: "—", note: "Requires visitor tracking" },
        ].map((s) => (
          <div key={s.label} style={{ background: "white", border: "1px solid #E2DFDA", padding: 20, borderRadius: 2 }}>
            <p style={{ fontSize: 26, fontWeight: 800, color: "#111111", margin: "0 0 4px" }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#8B8B8B", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>{s.label}</p>
            {s.note && <p style={{ fontSize: 11, color: "#0066FF", margin: 0 }}>{s.note}</p>}
          </div>
        ))}
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 28 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px" }}>Connect Analytics</h3>
        <p style={{ fontSize: 13, color: "#5C5C5C", marginBottom: 20, lineHeight: 1.6 }}>
          To track visitors, page views, and conversion rates, connect Google Analytics 4 or Vercel Analytics to your site.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "Google Analytics 4", desc: "Full visitor tracking, events, goals", href: "https://analytics.google.com", badge: "Free" },
            { name: "Vercel Analytics",   desc: "Built-in edge analytics, no cookies", href: "https://vercel.com/analytics", badge: "Paid" },
            { name: "Plausible",          desc: "Privacy-first, GDPR compliant",       href: "https://plausible.io",       badge: "Paid" },
          ].map((tool) => (
            <div key={tool.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", border: "1px solid #E2DFDA", borderRadius: 2 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111111", margin: 0 }}>{tool.name}</p>
                  <span style={{ fontSize: 10, padding: "1px 6px", background: "#F5F4F1", color: "#8B8B8B", fontWeight: 600 }}>{tool.badge}</span>
                </div>
                <p style={{ fontSize: 12, color: "#8B8B8B", margin: 0 }}>{tool.desc}</p>
              </div>
              <a href={tool.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: "#0066FF", padding: "6px 12px", border: "1px solid #0066FF", textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
                Set Up ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Marketing ───────────────────────────────────────────────────────────────
function MarketingSection() {
  const [activeTab, setActiveTab] = useState<"google" | "meta" | "linkedin" | "seo">("google");

  const tabs = [
    { id: "google" as const,   label: "Google Ads" },
    { id: "meta" as const,     label: "Meta Ads" },
    { id: "linkedin" as const, label: "LinkedIn Ads" },
    { id: "seo" as const,      label: "SEO" },
  ];

  return (
    <div>
      {/* Tab nav */}
      <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid #E2DFDA" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{
              padding: "10px 20px", border: "none", background: "none", cursor: "pointer",
              fontSize: 13, fontWeight: activeTab === t.id ? 700 : 500,
              color: activeTab === t.id ? "#0066FF" : "#8B8B8B",
              borderBottom: activeTab === t.id ? "2px solid #0066FF" : "2px solid transparent",
              marginBottom: -1,
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "google" && <GoogleAdsContent />}
      {activeTab === "meta" && <MetaAdsContent />}
      {activeTab === "linkedin" && <LinkedInAdsContent />}
      {activeTab === "seo" && <SEOContent />}
    </div>
  );
}

function GoogleAdsContent() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px", color: "#111111" }}>Google Ads Setup</h3>
        <p style={{ fontSize: 13, color: "#5C5C5C", lineHeight: 1.6, marginBottom: 20 }}>
          Run Search and Display campaigns targeting exhibition professionals, B2B decision-makers, and companies looking for automation services across the UK and Europe.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { step: "01", text: "Create a Google Ads account at ads.google.com" },
            { step: "02", text: "Set up conversion tracking on /contact form submissions" },
            { step: "03", text: "Create Search campaigns targeting exhibition + automation keywords" },
            { step: "04", text: "Add your domain: adesso.digital as the destination" },
          ].map((s) => (
            <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0066FF", flexShrink: 0, paddingTop: 2 }}>{s.step}</span>
              <p style={{ fontSize: 13, color: "#5C5C5C", margin: 0, lineHeight: 1.5 }}>{s.text}</p>
            </div>
          ))}
        </div>
        <a href="https://ads.google.com" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 20, background: "#111111", color: "white", padding: "10px 20px", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none" }}>
          Open Google Ads ↗
        </a>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px", color: "#111111" }}>Recommended Keywords</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "exhibition stand design UK",
            "trade show stand builder",
            "B2B automation agency",
            "business process automation UK",
            "exhibition lead intelligence",
            "3D stand visualisation",
            "exhibition stand company London",
            "CRM automation services",
          ].map((kw) => (
            <div key={kw} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#F5F4F1", borderRadius: 2 }}>
              <span style={{ fontSize: 13, color: "#111111", fontFamily: "monospace" }}>{kw}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>Conversion Tracking</h3>
        <p style={{ fontSize: 13, color: "#5C5C5C", lineHeight: 1.6, marginBottom: 16 }}>Add this tag to track contact form submissions as conversions:</p>
        <div style={{ background: "#111111", padding: 16, borderRadius: 2, fontFamily: "monospace", fontSize: 11, color: "#E8D5BA", lineHeight: 1.6, overflow: "auto" }}>
          {`// Add to /contact page after form submit
gtag('event', 'conversion', {
  'send_to': 'AW-XXXXXXXXX/YYYYYYYYY',
  'value': 1.0,
  'currency': 'GBP'
});`}
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>Budget Guidance</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { budget: "£500/mo", type: "Starter", desc: "Search only, brand + 2 core services" },
            { budget: "£1,500/mo", type: "Growth", desc: "Search + Display remarketing, full keyword set" },
            { budget: "£3,000/mo", type: "Scale", desc: "Full funnel: Search + Display + YouTube" },
          ].map((b) => (
            <div key={b.budget} style={{ padding: "12px 16px", border: "1px solid #E2DFDA", borderRadius: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#111111" }}>{b.budget}</span>
                <span style={{ fontSize: 10, fontWeight: 700, background: "#0066FF", color: "white", padding: "2px 6px" }}>{b.type}</span>
              </div>
              <p style={{ fontSize: 12, color: "#5C5C5C", margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaAdsContent() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>Meta Ads (Facebook & Instagram)</h3>
        <p style={{ fontSize: 13, color: "#5C5C5C", lineHeight: 1.6, marginBottom: 20 }}>
          Best for brand awareness and retargeting visitors who have been to your site. Less effective for B2B than Google, but useful for warming audiences.
        </p>
        {[
          { step: "01", text: "Install Meta Pixel on adesso.digital" },
          { step: "02", text: "Build a custom audience from site visitors" },
          { step: "03", text: "Run retargeting campaigns to warm leads" },
          { step: "04", text: "Use lookalike audiences to find similar prospects" },
        ].map((s) => (
          <div key={s.step} style={{ display: "flex", gap: 12, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#0066FF", flexShrink: 0, paddingTop: 2 }}>{s.step}</span>
            <p style={{ fontSize: 13, color: "#5C5C5C", margin: 0, lineHeight: 1.5 }}>{s.text}</p>
          </div>
        ))}
        <a href="https://business.facebook.com" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 20, background: "#1877F2", color: "white", padding: "10px 20px", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
          Open Meta Business ↗
        </a>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Meta Pixel Code</h3>
        <p style={{ fontSize: 13, color: "#5C5C5C", marginBottom: 12, lineHeight: 1.6 }}>Add to <code style={{ background: "#F5F4F1", padding: "1px 4px", fontSize: 12 }}>apps/main/src/app/layout.tsx</code>:</p>
        <div style={{ background: "#111111", padding: 16, borderRadius: 2, fontFamily: "monospace", fontSize: 11, color: "#E8D5BA", lineHeight: 1.6 }}>
          {`<Script id="meta-pixel">
  {
    \`!function(f,b,e,v,n,t,s){...}
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');\`
  }
</Script>`}
        </div>
      </div>
    </div>
  );
}

function LinkedInAdsContent() {
  return (
    <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 28 }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>LinkedIn Ads — Best for B2B</h3>
      <p style={{ fontSize: 13, color: "#5C5C5C", lineHeight: 1.6, marginBottom: 24 }}>
        LinkedIn is the highest-intent B2B ad platform for ADESSO. Target by job title (Exhibition Manager, Operations Director), industry (Manufacturing, Technology), and company size.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { title: "Target Audiences",  items: ["Exhibition Managers", "Marketing Directors", "Operations Directors", "Companies 50-500 employees", "UK + Germany + Netherlands"] },
          { title: "Ad Formats",         items: ["Sponsored Content (feed posts)", "Message Ads (InMail)", "Lead Gen Forms", "Document Ads", "Event Ads"] },
          { title: "Campaign Objectives", items: ["Website visits → /contact", "Lead generation forms", "Brand awareness for cold audiences", "Retarget site visitors"] },
          { title: "Budget Guidance",    items: ["Min £15/day recommended", "£500–1,000/mo starter", "CPC typically £5–12 in B2B", "Test with 2-week campaigns"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: "#0066FF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{col.title}</h4>
            {col.items.map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#0066FF", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#5C5C5C" }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <a href="https://www.linkedin.com/campaignmanager" target="_blank" rel="noopener noreferrer"
        style={{ display: "inline-block", marginTop: 24, background: "#0A66C2", color: "white", padding: "10px 20px", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
        Open LinkedIn Campaign Manager ↗
      </a>
    </div>
  );
}

function SEOContent() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 8px" }}>SEO Checklist</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { done: true,  text: "Meta titles & descriptions set on all pages" },
            { done: true,  text: "OpenGraph tags configured" },
            { done: true,  text: "Canonical URLs set" },
            { done: false, text: "Submit sitemap to Google Search Console" },
            { done: false, text: "Add structured data (Organization schema)" },
            { done: false, text: "Build backlinks from exhibition industry sites" },
            { done: false, text: "Create blog/content for long-tail keywords" },
          ].map((item) => (
            <div key={item.text} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: item.done ? "#4A8C6A" : "#C5C0B8" }}>{item.done ? "✓" : "○"}</span>
              <span style={{ fontSize: 13, color: item.done ? "#111111" : "#8B8B8B" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Key SEO Tools</h3>
        {[
          { name: "Google Search Console", href: "https://search.google.com/search-console", desc: "Monitor rankings & fix issues" },
          { name: "Google PageSpeed",      href: "https://pagespeed.web.dev", desc: "Check site speed & Core Web Vitals" },
          { name: "Ahrefs / SEMrush",      href: "https://ahrefs.com", desc: "Keyword research & backlink analysis" },
          { name: "Schema Markup",         href: "https://schema.org", desc: "Add structured data for rich results" },
        ].map((tool) => (
          <div key={tool.name} style={{ padding: "10px 0", borderBottom: "1px solid #F5F4F1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: "0 0 2px" }}>{tool.name}</p>
                <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>{tool.desc}</p>
              </div>
              <a href={tool.href} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: "#0066FF", padding: "4px 8px", border: "1px solid #0066FF", textDecoration: "none", whiteSpace: "nowrap" }}>
                Open ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Orders ──────────────────────────────────────────────────────────────────
function OrdersSection({ orders }: { orders: Order[] }) {
  return (
    <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2 }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2DFDA", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>All Orders ({orders.length})</h2>
        <a href="/admin/orders" style={{ fontSize: 12, color: "#0066FF", textDecoration: "none", fontWeight: 600 }}>Full Orders Page →</a>
      </div>

      {/* Table header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px 80px 100px 100px", gap: 16, padding: "10px 20px", background: "#F5F4F1", borderBottom: "1px solid #E2DFDA" }}>
        {["Product", "Customer", "Amount", "Date", "Status"].map((h) => (
          <span key={h} style={{ fontSize: 11, fontWeight: 700, color: "#8B8B8B", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</span>
        ))}
      </div>

      {orders.map((o) => (
        <a key={o.id} href={`/admin/orders/${o.id}`}
          style={{ display: "grid", gridTemplateColumns: "1fr 200px 80px 100px 100px", gap: 16, padding: "12px 20px", borderBottom: "1px solid #F5F4F1", alignItems: "center", textDecoration: "none", color: "inherit" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#F5F4F1")}
          onMouseLeave={e => (e.currentTarget.style.background = "none")}
        >
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: "0 0 2px" }}>{o.product_name}</p>
            <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>#{o.id.slice(0, 8)}</p>
          </div>
          <p style={{ fontSize: 12, color: "#5C5C5C", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.customer_email}</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#111111", margin: 0 }}>£{(parseInt(o.amount_pence) / 100).toFixed(2)}</p>
          <p style={{ fontSize: 12, color: "#5C5C5C", margin: 0 }}>{new Date(o.created_at).toLocaleDateString("en-GB")}</p>
          <span style={{
            fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            padding: "3px 8px", display: "inline-block",
            background: o.status === "delivered" ? "#111111" : o.status === "paid" ? "#0066FF" : "#E2DFDA",
            color: o.status === "pending" ? "#5C5C5C" : "white",
          }}>{o.status}</span>
        </a>
      ))}

      {orders.length === 0 && (
        <p style={{ padding: 20, color: "#8B8B8B", fontSize: 13 }}>No orders yet.</p>
      )}
    </div>
  );
}

// ── Settings ────────────────────────────────────────────────────────────────
function SettingsSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 20px" }}>Site Settings</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "Site Name", value: "ADESSO Digital" },
            { label: "Domain",    value: "adesso.digital" },
            { label: "Email",     value: "hello@adesso.digital" },
            { label: "WhatsApp",  value: "+44 7470 361422" },
            { label: "Location",  value: "London, United Kingdom" },
          ].map((f) => (
            <div key={f.label}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#8B8B8B", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: 6 }}>{f.label}</label>
              <div style={{ padding: "10px 14px", border: "1px solid #E2DFDA", background: "#F5F4F1", fontSize: 13, color: "#5C5C5C", borderRadius: 2 }}>
                {f.value}
              </div>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#0066FF", margin: 0 }}>To update contact info, use the Site Editor → Contact page.</p>
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 20px" }}>Integrations</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "Supabase",          status: "connected", desc: "Database & Auth" },
            { name: "Stripe",            status: "connected", desc: "Payment processing" },
            { name: "Google Analytics",  status: "pending",   desc: "Visitor tracking" },
            { name: "Meta Pixel",        status: "pending",   desc: "Ad retargeting" },
            { name: "Google Ads Tag",    status: "pending",   desc: "Conversion tracking" },
          ].map((i) => (
            <div key={i.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", border: "1px solid #E2DFDA", borderRadius: 2 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#111111", margin: "0 0 2px" }}>{i.name}</p>
                <p style={{ fontSize: 11, color: "#8B8B8B", margin: 0 }}>{i.desc}</p>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px",
                background: i.status === "connected" ? "rgba(74,140,106,0.12)" : "rgba(140,115,85,0.12)",
                color: i.status === "connected" ? "#4A8C6A" : "#0066FF",
              }}>
                {i.status === "connected" ? "● Connected" : "○ Not Set Up"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "white", border: "1px solid #E2DFDA", borderRadius: 2, padding: 24 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 12px" }}>Account</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <a href="/auth/login" style={{ fontSize: 13, color: "#0066FF", textDecoration: "none", fontWeight: 600 }}>Change Password →</a>
          <a href="/" style={{ fontSize: 13, color: "#5C5C5C", textDecoration: "none" }}>← Back to Site</a>
        </div>
      </div>
    </div>
  );
}
