export const metadata = { title: "Mobile Editor — ADESSO Admin" };

export default function MobileEditorPage() {
  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Mobile</p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Mobile Editor</h2>
        <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Preview and optimise your site for mobile devices</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px" }}>

        {/* Mobile Preview Wrapper */}
        <div>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px", textAlign: "center" }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 20px" }}>
              Mobile Preview (390px)
            </p>
            <div style={{
              display: "inline-block",
              border: "2px solid #333",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              background: "#fff",
            }}>
              {/* Phone notch */}
              <div style={{
                height: "24px", background: "#111",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: "60px", height: "8px", background: "#000", borderRadius: "4px" }} />
              </div>
              <iframe
                src={process.env.NEXT_PUBLIC_SITE_URL ?? "/"}
                style={{
                  width: "390px", height: "600px",
                  border: "none", display: "block",
                }}
                title="Mobile Preview"
              />
            </div>
            <p style={{ color: "#444", fontSize: "10px", margin: "12px 0 0" }}>
              Live preview of your site at 390px viewport
            </p>
          </div>
        </div>

        {/* Mobile Checklist */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px" }}>
            <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: "0 0 14px" }}>Mobile Checklist</p>
            {[
              { label: "Responsive layout",        done: true },
              { label: "Font size ≥ 16px body",    done: true },
              { label: "Touch targets ≥ 44px",     done: true },
              { label: "No horizontal scroll",     done: true },
              { label: "Mobile nav works",         done: true },
              { label: "Images optimised (WebP)",  done: false },
              { label: "LCP < 2.5s on mobile",     done: false },
              { label: "No popup on mobile",       done: false },
              { label: "CTA visible above fold",   done: true },
              { label: "Forms keyboard-friendly",  done: true },
            ].map(item => (
              <div key={item.label} style={{
                display: "flex", gap: "10px", alignItems: "center",
                padding: "7px 0", borderBottom: "1px solid #1A1A1A",
              }}>
                <span style={{
                  width: "16px", height: "16px", borderRadius: "50%",
                  background: item.done ? "rgba(61,122,78,0.2)" : "#1A1A1A",
                  border: `1px solid ${item.done ? "#3D7A4E" : "#252525"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "9px", color: item.done ? "#3D7A4E" : "#333",
                  flexShrink: 0,
                }}>
                  {item.done ? "✓" : ""}
                </span>
                <p style={{
                  color: item.done ? "#666" : "#888",
                  fontSize: "11px", margin: 0,
                  textDecoration: item.done ? "line-through" : "none",
                }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "14px 16px",
          }}>
            <p style={{ color: "#8C7355", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>
              Open in Editor
            </p>
            <p style={{ color: "#444", fontSize: "11px", margin: "0 0 12px", lineHeight: 1.5 }}>
              Switch to mobile view in the Site Editor to see and edit the mobile layout.
            </p>
            <a
              href="/admin/editor"
              style={{
                background: "#8C7355", color: "#fff", padding: "8px 14px",
                fontSize: "10px", textDecoration: "none", borderRadius: "2px",
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                display: "inline-block",
              }}
            >
              ✏ Open Editor → Mobile
            </a>
          </div>

          <div style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "14px 16px",
          }}>
            <p style={{ color: "#777", fontSize: "11px", fontWeight: 600, margin: "0 0 6px" }}>Test on Real Device</p>
            <p style={{ color: "#444", fontSize: "10px", margin: "0 0 8px", lineHeight: 1.5 }}>
              Use ngrok or Vercel preview URLs to test on a real mobile device.
            </p>
            <a
              href="https://ngrok.com"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#8C7355", fontSize: "11px", textDecoration: "none" }}
            >
              Set up ngrok →
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
