"use client";

interface Division {
  n: string;
  name: string;
  url: string;
  color: string;
  status: string;
}

interface QuickAction {
  label: string;
  href: string;
  icon: string;
  desc: string;
}

// ── Division Links ──────────────────────────────────────────────────────────
export function DivisionLinks({ divisions }: { divisions: Division[] }) {
  return (
    <div style={{ padding: "12px" }}>
      {divisions.map((d) => (
        <a
          key={d.n}
          href={d.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "10px 12px", borderRadius: "3px",
            textDecoration: "none", transition: "background 0.12s",
            marginBottom: "2px",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#1A1A1A")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <div style={{
            width: "28px", height: "28px", background: d.color,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "9px", fontWeight: 700, color: "#fff", flexShrink: 0,
          }}>
            {d.n}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#ccc", fontSize: "12px", fontWeight: 600, margin: 0 }}>
              ADESSO {d.name}
            </p>
          </div>
          <span style={{
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: d.status === "live" ? "#3D7A4E" : "#555",
          }}>
            {d.status === "live" ? "● Live" : "○ Dev"}
          </span>
        </a>
      ))}
    </div>
  );
}

// ── Quick Actions Grid ──────────────────────────────────────────────────────
export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
      {actions.map((a) => (
        <a
          key={a.href}
          href={a.href}
          style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "16px",
            textDecoration: "none", display: "block",
            transition: "border-color 0.15s, background 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "#0066FF";
            (e.currentTarget as HTMLElement).style.background = "#191919";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = "#1E1E1E";
            (e.currentTarget as HTMLElement).style.background = "#141414";
          }}
        >
          <p style={{ fontSize: "18px", margin: "0 0 8px" }}>{a.icon}</p>
          <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: "0 0 3px" }}>{a.label}</p>
          <p style={{ color: "#444", fontSize: "10px", margin: 0, lineHeight: 1.4 }}>{a.desc}</p>
        </a>
      ))}
    </div>
  );
}
