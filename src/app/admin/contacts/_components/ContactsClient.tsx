"use client";

import { useState, useCallback } from "react";

interface Contact {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"];

const STATUS_COLORS: Record<string, [string, string]> = {
  new:       ["#0066FF", "rgba(140,115,85,0.12)"],
  contacted: ["#4A6C8C", "rgba(74,108,140,0.12)"],
  qualified: ["#3D7A4E", "rgba(61,122,78,0.12)"],
  closed:    ["#555",    "#1A1A1A"],
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function ContactsClient({ contacts: initialContacts, tableUsed }: { contacts: Contact[]; tableUsed: string }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selected, setSelected] = useState<Contact | null>(null);

  const updateStatus = useCallback(async (id: string, status: string) => {
    if (tableUsed !== "contacts") return; // can't update form_submissions
    setUpdating(id);
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
        if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null);
      }
    } finally {
      setUpdating(null);
    }
  }, [tableUsed, selected]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: selected ? "1fr 340px" : "1fr", gap: "16px" }}>
      {/* Table */}
      <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name / Email", "Company", "Source", "Message", "Status", "Time", ""].map(h => (
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
            {contacts.map((c) => {
              const s = c.status ?? "new";
              const [fg, bg] = STATUS_COLORS[s] ?? ["#555", "#1A1A1A"];
              const isSelected = selected?.id === c.id;
              return (
                <tr
                  key={c.id}
                  style={{ borderBottom: "1px solid #181818", background: isSelected ? "#1A1A1A" : "transparent", cursor: "pointer" }}
                  onClick={() => setSelected(isSelected ? null : c)}
                >
                  <td style={{ padding: "12px 16px" }}>
                    {c.name && <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: "0 0 2px" }}>{c.name}</p>}
                    <p style={{ color: "#555", fontSize: "10px", margin: 0 }}>{c.email ?? "—"}</p>
                  </td>
                  <td style={{ padding: "12px 16px", color: "#666", fontSize: "11px" }}>{c.company ?? "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                      textTransform: "uppercase", color: "#555",
                      background: "#1A1A1A", padding: "2px 7px", borderRadius: "10px",
                    }}>
                      {c.source ?? "website"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 16px", maxWidth: "220px" }}>
                    <p style={{
                      color: "#555", fontSize: "11px", margin: 0,
                      overflow: "hidden", textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {c.message ?? "—"}
                    </p>
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {tableUsed === "contacts" ? (
                      <select
                        value={s}
                        onClick={e => e.stopPropagation()}
                        onChange={e => { e.stopPropagation(); updateStatus(c.id, e.target.value); }}
                        disabled={updating === c.id}
                        style={{
                          fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em",
                          textTransform: "uppercase", color: fg, background: bg,
                          padding: "2px 6px", borderRadius: "10px", border: "none",
                          cursor: updating === c.id ? "default" : "pointer",
                          appearance: "none",
                        }}
                      >
                        {STATUS_OPTIONS.map(o => (
                          <option key={o} value={o} style={{ background: "#141414", color: "#fff", textTransform: "capitalize" }}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span style={{
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: fg, background: bg,
                        padding: "2px 7px", borderRadius: "10px",
                      }}>
                        {s}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#444", fontSize: "10px" }}>
                    {c.created_at ? timeAgo(c.created_at) : "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <button
                      onClick={e => { e.stopPropagation(); setSelected(isSelected ? null : c); }}
                      style={{
                        background: isSelected ? "rgba(140,115,85,0.1)" : "none",
                        border: `1px solid ${isSelected ? "rgba(140,115,85,0.3)" : "#252525"}`,
                        color: isSelected ? "#0066FF" : "#555",
                        fontSize: "10px", padding: "3px 10px", borderRadius: "2px", cursor: "pointer",
                      }}
                    >
                      {isSelected ? "Close" : "View"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div style={{
          background: "#141414", border: "1px solid #1E1E1E",
          borderRadius: "4px", padding: "20px",
          display: "flex", flexDirection: "column", gap: "16px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>
                {selected.name ?? "Unknown"}
              </p>
              <p style={{ color: "#555", fontSize: "11px", margin: 0 }}>{selected.email}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              style={{ background: "none", border: "none", color: "#444", fontSize: "16px", cursor: "pointer" }}
            >
              ×
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { label: "Company", value: selected.company },
              { label: "Phone",   value: selected.phone },
              { label: "Source",  value: selected.source },
              { label: "Received", value: selected.created_at ? timeAgo(selected.created_at) : undefined },
            ].filter(r => r.value).map(r => (
              <div key={r.label} style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "#444", fontSize: "10px", fontWeight: 700, minWidth: "64px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{r.label}</span>
                <span style={{ color: "#888", fontSize: "11px" }}>{r.value}</span>
              </div>
            ))}
          </div>

          {selected.message && (
            <div style={{ background: "#0D0D0D", border: "1px solid #1A1A1A", borderRadius: "3px", padding: "12px" }}>
              <p style={{ color: "#0066FF", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>Message</p>
              <p style={{ color: "#888", fontSize: "12px", margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.message}</p>
            </div>
          )}

          {tableUsed === "contacts" && (
            <div>
              <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 8px" }}>Update Status</p>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {STATUS_OPTIONS.map(s => {
                  const current = selected.status ?? "new";
                  const [fg, bg] = STATUS_COLORS[s] ?? ["#555", "#1A1A1A"];
                  return (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      disabled={updating === selected.id}
                      style={{
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: current === s ? "#fff" : fg,
                        background: current === s ? fg : bg,
                        padding: "4px 10px", borderRadius: "10px",
                        border: `1px solid ${fg}`,
                        cursor: updating === selected.id ? "default" : "pointer",
                      }}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selected.email && (
            <a
              href={`mailto:${selected.email}`}
              style={{
                display: "block", textAlign: "center",
                background: "#0066FF", color: "#fff",
                padding: "9px", fontSize: "11px",
                fontWeight: 700, textDecoration: "none",
                letterSpacing: "0.12em", textTransform: "uppercase",
                borderRadius: "3px",
              }}
            >
              ✉ Reply by Email
            </a>
          )}
        </div>
      )}
    </div>
  );
}
