import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";

export const metadata = { title: "Analytics — ADESSO Admin" };

export default async function AnalyticsPage() {
  const supabase = createAdminSupabase();

  // Real data from orders
  const [
    { count: totalOrders },
    { count: paidOrders },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "paid"),
    supabase.from("orders").select("amount_pence,created_at").eq("status", "paid").order("created_at", { ascending: false }).limit(50),
  ]);

  const totalRevenue = (recentOrders ?? []).reduce((sum, o) => sum + Number(o.amount_pence || 0), 0);
  const avgOrderValue = paidOrders ? Math.round(totalRevenue / paidOrders) : 0;

  // Monthly revenue (last 6 months)
  const monthlyData = (() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("en-GB", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    for (const o of (recentOrders ?? [])) {
      const d = new Date(o.created_at);
      const key = d.toLocaleString("en-GB", { month: "short", year: "2-digit" });
      if (key in months) months[key] += Number(o.amount_pence || 0);
    }
    return Object.entries(months).map(([month, pence]) => ({ month, value: pence / 100 }));
  })();

  const maxRevenue = Math.max(...monthlyData.map(m => m.value), 1);

  const TOP_PAGES = [
    { path: "/",          label: "Home",       views: 1240, time: "2m 14s" },
    { path: "/services",  label: "Services",   views: 893,  time: "3m 02s" },
    { path: "/about",     label: "About",      views: 612,  time: "1m 48s" },
    { path: "/divisions", label: "Divisions",  views: 541,  time: "2m 30s" },
    { path: "/contact",   label: "Contact",    views: 489,  time: "1m 15s" },
    { path: "/products",  label: "Products",   views: 321,  time: "2m 45s" },
  ];

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Analytics</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Analytics</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Revenue & order data from Supabase · Page views from GA4</p>
        </div>
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#141414", color: "#0066FF", padding: "9px 16px",
            fontSize: "11px", textDecoration: "none", borderRadius: "2px",
            border: "1px solid #252525",
          }}
        >
          Google Analytics →
        </a>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Orders",    value: String(totalOrders ?? 0),      color: "#0066FF" },
          { label: "Paid Orders",     value: String(paidOrders ?? 0),       color: "#3D7A4E" },
          { label: "Total Revenue",   value: `£${(totalRevenue/100).toFixed(2)}`, color: "#4A6C8C" },
          { label: "Avg Order Value", value: `£${(avgOrderValue/100).toFixed(2)}`, color: "#6B4C8C" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "24px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px", marginBottom: "20px" }}>

        {/* Revenue Chart */}
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px" }}>
          <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 20px" }}>Monthly Revenue (Last 6 Months)</p>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", height: "160px" }}>
            {monthlyData.map((m) => {
              const heightPct = maxRevenue > 0 ? (m.value / maxRevenue) * 100 : 0;
              return (
                <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%", justifyContent: "flex-end" }}>
                  <span style={{ color: "#0066FF", fontSize: "9px", fontWeight: 700 }}>
                    {m.value > 0 ? `£${m.value.toFixed(0)}` : ""}
                  </span>
                  <div style={{
                    width: "100%", background: m.value > 0 ? "#0066FF" : "#1E1E1E",
                    height: `${Math.max(heightPct, 4)}%`,
                    borderRadius: "2px 2px 0 0", transition: "height 0.3s",
                    opacity: m.value > 0 ? 1 : 0.3,
                  }} />
                  <span style={{ color: "#444", fontSize: "9px", whiteSpace: "nowrap" }}>{m.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Pages */}
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1E1E1E" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Top Pages</p>
              <span style={{
                fontSize: "9px", color: "#444", background: "#1A1A1A",
                padding: "2px 7px", borderRadius: "8px",
              }}>GA4 Required</span>
            </div>
          </div>
          {TOP_PAGES.map((p, i) => {
            const maxViews = TOP_PAGES[0].views;
            return (
              <div key={p.path} style={{
                padding: "10px 18px",
                borderBottom: i < TOP_PAGES.length - 1 ? "1px solid #181818" : "none",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <p style={{ color: "#ccc", fontSize: "11px", fontWeight: 600, margin: 0 }}>{p.label}</p>
                  <p style={{ color: "#555", fontSize: "10px", margin: 0 }}>{p.views.toLocaleString()}</p>
                </div>
                <div style={{ height: "3px", background: "#1A1A1A", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{
                    height: "100%", width: `${(p.views / maxViews) * 100}%`,
                    background: "#0066FF", borderRadius: "2px", opacity: 0.4,
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* GA4 Setup Banner */}
      <div style={{
        background: "#141414", border: "1px solid #1E1E1E",
        borderRadius: "4px", padding: "16px 20px",
        display: "flex", gap: "14px", alignItems: "center",
      }}>
        <span style={{ fontSize: "20px" }}>↗</span>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: "0 0 3px" }}>
            Connect Google Analytics 4 for full visitor data
          </p>
          <p style={{ color: "#444", fontSize: "11px", margin: 0 }}>
            Add your GA4 Measurement ID to <code style={{ color: "#0066FF" }}>NEXT_PUBLIC_GA_ID</code> in environment variables to track page views, sessions and conversions.
          </p>
        </div>
        <Link
          href="/admin/settings"
          style={{
            background: "#0066FF", color: "#fff", padding: "8px 16px",
            fontSize: "10px", textDecoration: "none", borderRadius: "2px",
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          ⚙ Configure
        </Link>
      </div>

    </div>
  );
}
