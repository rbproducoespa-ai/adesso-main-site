import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";
import { DivisionLinks, QuickActions } from "./_components/DashboardClient";

export const metadata = { title: "Dashboard — ADESSO Admin" };

function fmt(pence: number) {
  return `£${(pence / 100).toFixed(2)}`;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function statusColor(status: string) {
  if (status === "paid" || status === "delivered") return "#3D7A4E";
  if (status === "pending") return "#8C7355";
  if (status === "cancelled") return "#8C3535";
  return "#555";
}

export default async function AdminDashboardPage() {
  const supabase = createAdminSupabase();

  const [
    { count: totalOrders },
    { count: paidOrders },
    { count: deliveredOrders },
    { count: pendingOrders },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "paid"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "delivered"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders")
      .select("id,product_name,customer_email,amount_pence,status,created_at")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const STATS = [
    { label: "Total Orders",   value: totalOrders   ?? 0, color: "#8C7355", href: "/admin/orders" },
    { label: "Paid",           value: paidOrders    ?? 0, color: "#3D7A4E", href: "/admin/orders" },
    { label: "Delivered",      value: deliveredOrders ?? 0, color: "#4A6C8C", href: "/admin/orders" },
    { label: "Pending Review", value: pendingOrders  ?? 0, color: "#6B4C8C", href: "/admin/orders" },
  ];

  const DIVISIONS = [
    { n: "01", name: "Exhibition", url: process.env.NEXT_PUBLIC_EXHIBITION_URL ?? "http://localhost:3001", color: "#8C7355", status: "live" },
    { n: "02", name: "Automation", url: process.env.NEXT_PUBLIC_AUTOMATION_URL ?? "http://localhost:3002", color: "#5C7A6A", status: "live" },
    { n: "03", name: "Leads",      url: process.env.NEXT_PUBLIC_LEADS_URL      ?? "http://localhost:3003", color: "#4A6C8C", status: "live" },
    { n: "04", name: "Lab",        url: process.env.NEXT_PUBLIC_LAB_URL        ?? "http://localhost:3004", color: "#6B4C8C", status: "in-dev" },
  ];

  const QUICK_ACTIONS = [
    { label: "Site Editor",     href: "/admin/editor",      icon: "✏", desc: "Edit pages, images, text" },
    { label: "Pages Manager",   href: "/admin/pages",       icon: "⊟", desc: "Manage all site pages" },
    { label: "Media Manager",   href: "/admin/media",       icon: "◈", desc: "Upload & organise files" },
    { label: "SEO Manager",     href: "/admin/seo",         icon: "⌖", desc: "Meta tags, sitemaps, slugs" },
    { label: "Blog",            href: "/admin/blog",        icon: "≡", desc: "Create & manage posts" },
    { label: "CRM / Contacts",  href: "/admin/contacts",    icon: "◉", desc: "Leads & contact history" },
    { label: "Forms & Leads",   href: "/admin/forms",       icon: "⊡", desc: "Form submissions" },
    { label: "Automations",     href: "/admin/automations", icon: "⟳", desc: "Triggered workflows" },
    { label: "Analytics",       href: "/admin/analytics",   icon: "↗", desc: "Traffic & conversion data" },
    { label: "Settings",        href: "/admin/settings",    icon: "⚙", desc: "Domain, language, config" },
  ];

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* ── Header ────────────────────────────────────────────── */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 4px" }}>
          ADESSO Digital
        </p>
        <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: 0 }}>Admin Studio</h2>
      </div>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {STATS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              background: "#141414", border: "1px solid #1E1E1E",
              borderRadius: "4px", padding: "18px 20px",
              textDecoration: "none", display: "block",
            }}
          >
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>
              {s.label}
            </p>
            <p style={{ color: s.color, fontSize: "30px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Body Grid ─────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", marginBottom: "28px" }}>

        {/* Recent Orders */}
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{
            padding: "14px 20px", borderBottom: "1px solid #1E1E1E",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Recent Orders</p>
            <Link href="/admin/orders" style={{ color: "#8C7355", fontSize: "11px", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          {!recentOrders || recentOrders.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <p style={{ color: "#333", fontSize: "13px", margin: 0 }}>No orders yet</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Product", "Customer", "Amount", "Status", "Time"].map((h) => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                      textTransform: "uppercase", color: "#333",
                      borderBottom: "1px solid #1A1A1A",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentOrders ?? []).map((o: {
                  id: string; product_name: string; customer_email: string;
                  amount_pence: string; status: string; created_at: string;
                }) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #181818" }}>
                    <td style={{ padding: "10px 16px", fontSize: "12px", color: "#ccc", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {o.product_name}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "11px", color: "#555", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {o.customer_email}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "12px", color: "#8C7355", fontWeight: 600 }}>
                      {fmt(Number(o.amount_pence))}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <span style={{
                        fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: statusColor(o.status),
                      }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "10px", color: "#444" }}>
                      {timeAgo(o.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Divisions — CLIENT (has hover handlers) */}
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #1E1E1E" }}>
            <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Divisions</p>
          </div>
          <DivisionLinks divisions={DIVISIONS} />
          <div style={{ padding: "12px 20px", borderTop: "1px solid #1E1E1E" }}>
            <Link href="/admin/settings" style={{ color: "#555", fontSize: "11px", textDecoration: "none" }}>
              ⚙ Configure domains →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick Actions — CLIENT (has hover handlers) ─────── */}
      <div>
        <p style={{ color: "#444", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px" }}>
          Quick Actions
        </p>
        <QuickActions actions={QUICK_ACTIONS} />
      </div>

    </div>
  );
}
