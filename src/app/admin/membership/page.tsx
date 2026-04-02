import { createAdminSupabase } from "@/lib/supabase-admin";

export const metadata = { title: "Membership — ADESSO Admin" };

export default async function MembershipPage() {
  const supabase = createAdminSupabase();

  const { data: users } = await supabase.auth.admin.listUsers().catch(() => ({ data: null }));
  const totalUsers = (users as { users?: unknown[] } | null)?.users?.length ?? 0;

  const PLANS = [
    {
      name: "Free",       price: "£0/mo",     desc: "Basic access",
      features: ["Account dashboard", "Order history"],
      color: "#555",
    },
    {
      name: "Client",     price: "Custom",    desc: "Active project clients",
      features: ["Account dashboard", "Order history", "Project files", "Direct support"],
      color: "#8C7355",
    },
    {
      name: "Partner",    price: "Custom",    desc: "Strategic partners",
      features: ["All Client features", "Referral tracking", "Co-marketing", "Priority access"],
      color: "#4A6C8C",
    },
  ];

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Membership</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Membership & Access</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>User accounts, plans and access control</p>
        </div>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#141414", color: "#8C7355", padding: "9px 16px",
            fontSize: "11px", textDecoration: "none", borderRadius: "2px",
            border: "1px solid #252525",
          }}
        >
          Manage in Supabase Auth →
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Users",   value: totalUsers, color: "#8C7355" },
          { label: "Active Plans",  value: "3",        color: "#4A6C8C" },
          { label: "Members Area",  value: "Active",   color: "#3D7A4E" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "26px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>Membership Plans</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          {PLANS.map((plan) => (
            <div key={plan.name} style={{
              background: "#141414", border: "1px solid #1E1E1E",
              borderRadius: "4px", padding: "20px",
              borderTop: `3px solid ${plan.color}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <p style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: 0 }}>{plan.name}</p>
                <p style={{ color: plan.color, fontSize: "13px", fontWeight: 700, margin: 0 }}>{plan.price}</p>
              </div>
              <p style={{ color: "#555", fontSize: "11px", margin: "0 0 14px" }}>{plan.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{ color: plan.color, fontSize: "10px" }}>✓</span>
                    <span style={{ color: "#666", fontSize: "11px" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Area Routes */}
      <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid #1E1E1E" }}>
          <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Members Area Routes</p>
        </div>
        {[
          { path: "/auth/login",   desc: "Login page",             status: "active" },
          { path: "/auth/signup",  desc: "Registration page",      status: "active" },
          { path: "/account",      desc: "User dashboard",         status: "active" },
          { path: "/account/orders", desc: "Order history",        status: "active" },
          { path: "/checkout",     desc: "Checkout & payment",     status: "active" },
        ].map((r, i, arr) => (
          <div key={r.path} style={{
            display: "flex", alignItems: "center", gap: "16px",
            padding: "11px 20px",
            borderBottom: i < arr.length - 1 ? "1px solid #181818" : "none",
          }}>
            <code style={{ color: "#8C7355", fontSize: "11px", minWidth: "180px" }}>{r.path}</code>
            <p style={{ color: "#555", fontSize: "11px", margin: 0, flex: 1 }}>{r.desc}</p>
            <span style={{
              fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "#3D7A4E", background: "rgba(61,122,78,0.12)",
              padding: "2px 7px", borderRadius: "10px",
            }}>
              ● {r.status}
            </span>
            <a
              href={r.path}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#444", fontSize: "11px", textDecoration: "none" }}
            >
              ↗
            </a>
          </div>
        ))}
      </div>

      {/* Auth config note */}
      <div style={{
        background: "#0D0D0D", border: "1px solid #1E1E1E",
        borderRadius: "4px", padding: "16px 20px",
        display: "flex", gap: "12px",
      }}>
        <span style={{ fontSize: "18px", flexShrink: 0 }}>⬡</span>
        <div>
          <p style={{ color: "#777", fontSize: "12px", fontWeight: 600, margin: "0 0 4px" }}>Powered by Supabase Auth</p>
          <p style={{ color: "#444", fontSize: "11px", margin: 0, lineHeight: 1.6 }}>
            Authentication is handled by Supabase Auth (email/password + magic link).
            Configure allowed email providers, redirect URLs and email templates in the Supabase dashboard.
          </p>
        </div>
      </div>

    </div>
  );
}
