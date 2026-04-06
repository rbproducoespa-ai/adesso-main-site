import Link from "next/link";

export const metadata = { title: "Marketing Tools — ADESSO Admin" };

const CAMPAIGNS = [
  { name: "ExhibitionRadar Launch", channel: "Email",  status: "draft", opens: 0, clicks: 0 },
  { name: "Stand Design Portfolio", channel: "Social", status: "draft", opens: 0, clicks: 0 },
  { name: "Automation ROI Guide",   channel: "Email",  status: "draft", opens: 0, clicks: 0 },
];

const TOOLS = [
  { name: "Popup Builder",            desc: "Create lead capture popups and banners",            icon: "◻", status: "coming-soon", link: null },
  { name: "Email Campaigns",          desc: "Send newsletters to your contact list",              icon: "⊡", status: "coming-soon", link: "https://mailchimp.com" },
  { name: "Social Media Scheduler",   desc: "Schedule and manage social posts",                  icon: "◎", status: "external",    link: "https://buffer.com" },
  { name: "Google Ads Integration",   desc: "Connect Google Ads for conversion tracking",        icon: "↗", status: "external",    link: "https://ads.google.com" },
  { name: "Meta Pixel",               desc: "Facebook/Instagram conversion tracking",            icon: "◈", status: "not-set",     link: null },
  { name: "LinkedIn Insight Tag",     desc: "Track B2B visitors from LinkedIn",                  icon: "⊛", status: "not-set",     link: null },
];

export default function MarketingPage() {
  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Marketing</p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Marketing Tools</h2>
        <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Campaigns, lead capture and tracking integrations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>

        {/* Campaigns */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
              Campaigns
            </p>
            {/* Link to contacts rather than a dead button */}
            <Link
              href="/admin/contacts"
              style={{
                background: "#0066FF", color: "#fff", padding: "6px 14px",
                fontSize: "10px", fontWeight: 700, textDecoration: "none",
                letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: "2px",
              }}
            >
              + New Campaign
            </Link>
          </div>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Campaign", "Channel", "Opens", "Clicks", "Status", ""].map(h => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                      textTransform: "uppercase", color: "#333",
                      borderBottom: "1px solid #1A1A1A",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CAMPAIGNS.map((c, i) => (
                  <tr key={c.name} style={{ borderBottom: i < CAMPAIGNS.length - 1 ? "1px solid #181818" : "none" }}>
                    <td style={{ padding: "12px 16px", color: "#ddd", fontSize: "12px", fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#555", background: "#1A1A1A", padding: "2px 7px", borderRadius: "8px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                        {c.channel}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#555", fontSize: "12px" }}>{c.opens}</td>
                    <td style={{ padding: "12px 16px", color: "#555", fontSize: "12px" }}>{c.clicks}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: c.status === "active" ? "#3D7A4E" : "#555",
                        background: c.status === "active" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                        padding: "2px 7px", borderRadius: "10px",
                      }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        background: "none", border: "1px solid #252525", color: "#444",
                        fontSize: "10px", padding: "3px 10px", borderRadius: "2px",
                        display: "inline-block",
                      }}>
                        Edit
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lead Capture Section */}
          <div style={{ marginTop: "20px" }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
              Lead Capture
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { label: "Contact Form",     page: "/contact",   status: "active",   leads: 0 },
                { label: "Newsletter Popup", page: "/",          status: "inactive", leads: 0 },
                { label: "Quote Form",       page: "/services",  status: "inactive", leads: 0 },
                { label: "Exhibition Brief", page: "/divisions", status: "inactive", leads: 0 },
              ].map(lc => (
                <div key={lc.label} style={{
                  background: "#141414", border: "1px solid #1E1E1E",
                  borderRadius: "4px", padding: "14px 16px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <p style={{ color: "#ccc", fontSize: "12px", fontWeight: 600, margin: 0 }}>{lc.label}</p>
                    <span style={{
                      fontSize: "9px", fontWeight: 700,
                      color: lc.status === "active" ? "#3D7A4E" : "#444",
                      background: lc.status === "active" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                      padding: "1px 6px", borderRadius: "8px",
                    }}>
                      {lc.status === "active" ? "● On" : "○ Off"}
                    </span>
                  </div>
                  <p style={{ color: "#444", fontSize: "10px", margin: "0 0 6px" }}>{lc.page}</p>
                  <p style={{ color: "#0066FF", fontSize: "11px", margin: 0, fontWeight: 600 }}>
                    {lc.leads} leads
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Marketing Integrations
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {TOOLS.map((t) => (
              <div key={t.name} style={{
                background: "#141414", border: "1px solid #1E1E1E",
                borderRadius: "4px", padding: "14px 16px",
                display: "flex", gap: "12px", alignItems: "center",
              }}>
                <span style={{ fontSize: "16px", flexShrink: 0, opacity: 0.6 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#ccc", fontSize: "12px", fontWeight: 600, margin: "0 0 2px" }}>{t.name}</p>
                  <p style={{ color: "#444", fontSize: "10px", margin: 0 }}>{t.desc}</p>
                </div>
                {t.link ? (
                  <a
                    href={t.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#0066FF", fontSize: "10px", textDecoration: "none",
                      padding: "4px 10px", background: "rgba(140,115,85,0.1)",
                      borderRadius: "2px", border: "1px solid rgba(140,115,85,0.2)",
                      flexShrink: 0,
                    }}
                  >
                    Connect
                  </a>
                ) : (
                  <span style={{
                    fontSize: "9px", fontWeight: 700, color: "#444",
                    background: "#1A1A1A", padding: "2px 7px", borderRadius: "8px",
                    flexShrink: 0,
                  }}>
                    {t.status === "coming-soon" ? "Soon" : "Not set"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
