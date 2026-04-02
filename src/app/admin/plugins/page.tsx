export const metadata = { title: "Apps & Plugins — ADESSO Admin" };

const INSTALLED = [
  { name: "Supabase",            version: "2.x",    category: "Database",     icon: "⬡", status: "active",   desc: "Database, Auth & Storage" },
  { name: "Next.js",             version: "15.x",   category: "Framework",    icon: "◈", status: "active",   desc: "App Router, Server Components" },
  { name: "Stripe",              version: "latest", category: "Payments",     icon: "◻", status: "active",   desc: "Checkout & subscriptions" },
  { name: "Turborepo",           version: "2.x",    category: "Build",        icon: "⟳", status: "active",   desc: "Monorepo build system" },
  { name: "Tailwind CSS",        version: "3.4",    category: "Styling",      icon: "◎", status: "active",   desc: "Utility-first CSS framework" },
];

const AVAILABLE = [
  {
    name: "Crisp Chat",      category: "Support",    icon: "▣",
    desc: "Live chat widget — connect instantly with visitors",
    setupTime: "5 min", link: "https://crisp.chat",
  },
  {
    name: "Hotjar",          category: "Analytics",  icon: "↗",
    desc: "Heatmaps and session recordings for UX insights",
    setupTime: "10 min", link: "https://hotjar.com",
  },
  {
    name: "Mailchimp",       category: "Email",      icon: "⊡",
    desc: "Email marketing platform and newsletter management",
    setupTime: "15 min", link: "https://mailchimp.com",
  },
  {
    name: "Resend",          category: "Email",      icon: "⊡",
    desc: "Developer-first transactional email API",
    setupTime: "5 min", link: "https://resend.com",
  },
  {
    name: "Cal.com",         category: "Booking",    icon: "◎",
    desc: "Open-source scheduling for discovery calls",
    setupTime: "20 min", link: "https://cal.com",
  },
  {
    name: "Sentry",          category: "Monitoring", icon: "⌖",
    desc: "Error tracking and performance monitoring",
    setupTime: "10 min", link: "https://sentry.io",
  },
  {
    name: "Cloudinary",      category: "Media",      icon: "◈",
    desc: "Advanced image/video optimisation and delivery",
    setupTime: "15 min", link: "https://cloudinary.com",
  },
  {
    name: "PostHog",         category: "Analytics",  icon: "↗",
    desc: "Product analytics, feature flags and A/B testing",
    setupTime: "10 min", link: "https://posthog.com",
  },
];

export default function PluginsPage() {
  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Plugins</p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Apps & Plugins</h2>
        <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Installed packages and available integrations</p>
      </div>

      {/* Installed */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Installed ({INSTALLED.length})
        </p>
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          {INSTALLED.map((p, i) => (
            <div key={p.name} style={{
              display: "flex", alignItems: "center", gap: "14px",
              padding: "14px 20px",
              borderBottom: i < INSTALLED.length - 1 ? "1px solid #181818" : "none",
            }}>
              <span style={{ fontSize: "20px", flexShrink: 0, opacity: 0.6 }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "2px" }}>
                  <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 600, margin: 0 }}>{p.name}</p>
                  <code style={{ color: "#444", fontSize: "10px" }}>{p.version}</code>
                  <span style={{
                    fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#555", background: "#1A1A1A", padding: "1px 5px", borderRadius: "6px",
                  }}>
                    {p.category}
                  </span>
                </div>
                <p style={{ color: "#555", fontSize: "11px", margin: 0 }}>{p.desc}</p>
              </div>
              <span style={{
                fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                color: "#3D7A4E", background: "rgba(61,122,78,0.12)",
                padding: "3px 9px", borderRadius: "10px",
              }}>
                ● Active
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Available */}
      <div>
        <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
          Recommended Integrations
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
          {AVAILABLE.map((p) => (
            <div key={p.name} style={{
              background: "#141414", border: "1px solid #1E1E1E",
              borderRadius: "4px", padding: "16px 18px",
              display: "flex", gap: "14px", alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "20px", flexShrink: 0, opacity: 0.5, marginTop: "1px" }}>{p.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                  <div>
                    <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 600, margin: "0 0 1px" }}>{p.name}</p>
                    <span style={{
                      fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "#555", background: "#1A1A1A", padding: "1px 5px", borderRadius: "6px",
                    }}>
                      {p.category}
                    </span>
                  </div>
                  <span style={{ color: "#444", fontSize: "9px", flexShrink: 0, marginLeft: "8px" }}>
                    ⏱ {p.setupTime}
                  </span>
                </div>
                <p style={{ color: "#555", fontSize: "11px", margin: "8px 0 10px", lineHeight: 1.5 }}>{p.desc}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#8C7355", fontSize: "10px", textDecoration: "none",
                    padding: "5px 12px", background: "rgba(140,115,85,0.1)",
                    borderRadius: "2px", border: "1px solid rgba(140,115,85,0.2)",
                    display: "inline-block",
                  }}
                >
                  + Install
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
