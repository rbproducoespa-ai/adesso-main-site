import Link from "next/link";

export const metadata = { title: "Automations — ADESSO Admin" };

const AUTOMATIONS = [
  {
    id: "1", name: "New Contact → Email Notification",
    trigger: "Form submission on /contact",
    action: "Send email to admin@adesso.digital",
    status: "active",
    lastRun: "2h ago", runs: 47,
  },
  {
    id: "2", name: "New Order → Confirmation Email",
    trigger: "Order status = paid",
    action: "Send confirmation email to customer",
    status: "active",
    lastRun: "1d ago", runs: 12,
  },
  {
    id: "3", name: "Order Delivered → Review Request",
    trigger: "Order status = delivered",
    action: "Send review request email after 3 days",
    status: "draft",
    lastRun: "—", runs: 0,
  },
  {
    id: "4", name: "Lead Qualified → CRM Tag",
    trigger: "Contact status updated to qualified",
    action: "Add tag 'hot-lead' + notify sales",
    status: "draft",
    lastRun: "—", runs: 0,
  },
];

const TEMPLATES = [
  { icon: "⊡", name: "Form → Email",    desc: "When visitor submits a form, notify you by email" },
  { icon: "◻", name: "Order → Confirm", desc: "Send automated confirmation when order is paid" },
  { icon: "◉", name: "Lead → Follow-up",desc: "Schedule follow-up reminder for new leads" },
  { icon: "⟳", name: "Weekly Report",   desc: "Send summary of orders, leads and visits weekly" },
];

export default function AutomationsPage() {
  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Automations</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Automations</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Trigger-based workflows for your site</p>
        </div>
        {/* Use a Link instead of a dead <button> */}
        <Link
          href="/admin/devmode"
          style={{
            background: "#8C7355", color: "#fff", padding: "9px 18px",
            fontSize: "11px", fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
          }}
        >
          + New Automation
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Automations", value: AUTOMATIONS.length,                                   color: "#8C7355" },
          { label: "Active",            value: AUTOMATIONS.filter(a => a.status === "active").length, color: "#3D7A4E" },
          { label: "Total Runs",        value: AUTOMATIONS.reduce((s, a) => s + a.runs, 0),           color: "#4A6C8C" },
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>

        {/* Automation List */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Your Automations
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {AUTOMATIONS.map((a) => (
              <div key={a.id} style={{
                background: "#141414", border: `1px solid ${a.status === "active" ? "#1E2A1E" : "#1E1E1E"}`,
                borderRadius: "4px", padding: "16px 18px",
                borderLeft: `3px solid ${a.status === "active" ? "#3D7A4E" : "#252525"}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 600, margin: 0 }}>{a.name}</p>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0 }}>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: a.status === "active" ? "#3D7A4E" : "#555",
                      background: a.status === "active" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                      padding: "2px 7px", borderRadius: "10px",
                    }}>
                      {a.status === "active" ? "● Active" : "○ Draft"}
                    </span>
                    {/* Informational note — no real edit functionality yet */}
                    <span style={{
                      background: "none", border: "1px solid #252525", color: "#555",
                      fontSize: "10px", padding: "3px 10px", borderRadius: "2px",
                    }}>
                      Webhook
                    </span>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
                  <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "3px", padding: "8px 12px" }}>
                    <p style={{ color: "#444", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 3px" }}>Trigger</p>
                    <p style={{ color: "#777", fontSize: "11px", margin: 0 }}>{a.trigger}</p>
                  </div>
                  <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "3px", padding: "8px 12px" }}>
                    <p style={{ color: "#444", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 3px" }}>Action</p>
                    <p style={{ color: "#777", fontSize: "11px", margin: 0 }}>{a.action}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "16px" }}>
                  <span style={{ color: "#333", fontSize: "10px" }}>Runs: <span style={{ color: "#8C7355" }}>{a.runs}</span></span>
                  <span style={{ color: "#333", fontSize: "10px" }}>Last run: <span style={{ color: "#555" }}>{a.lastRun}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Templates */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Quick Templates
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TEMPLATES.map((t) => (
              <div key={t.name} style={{
                background: "#141414", border: "1px solid #1E1E1E",
                borderRadius: "4px", padding: "14px 16px",
              }}>
                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: "0 0 3px" }}>{t.name}</p>
                    <p style={{ color: "#444", fontSize: "10px", margin: 0, lineHeight: 1.5 }}>{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Email Config */}
          <div style={{
            marginTop: "16px", background: "#0D0D0D",
            border: "1px solid #1E1E1E", borderRadius: "4px", padding: "14px 16px",
          }}>
            <p style={{ color: "#8C7355", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>
              Email Provider
            </p>
            <p style={{ color: "#555", fontSize: "11px", margin: "0 0 10px", lineHeight: 1.5 }}>
              Configure SMTP or a provider like Resend / Postmark for automation emails.
            </p>
            <a
              href="https://resend.com"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#8C7355", fontSize: "11px", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "4px",
              }}
            >
              Set up Resend →
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
