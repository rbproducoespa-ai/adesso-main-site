"use client";

import { useState, useCallback } from "react";

interface Message {
  id: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  read?: boolean;
  created_at?: string;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? "Yesterday" : `${d}d ago`;
}

export function InboxClient({ messages: initialMessages }: { messages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selected, setSelected] = useState<Message | null>(initialMessages[0] ?? null);
  const [marking, setMarking] = useState(false);

  const unread = messages.filter(m => !m.read).length;

  const markRead = useCallback(async (id: string) => {
    // Optimistic update
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, read: true } : null);

    await fetch("/api/inbox", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => {});
  }, [selected]);

  const markAllRead = useCallback(async () => {
    setMarking(true);
    await fetch("/api/inbox", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAllRead: true }),
    }).catch(() => {});
    setMessages(prev => prev.map(m => ({ ...m, read: true })));
    setMarking(false);
  }, []);

  const handleSelect = useCallback((m: Message) => {
    setSelected(m);
    if (!m.read) markRead(m.id);
  }, [markRead]);

  return (
    <div>
      {/* Toolbar */}
      {unread > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
          <button
            onClick={markAllRead}
            disabled={marking}
            style={{
              background: "none", border: "1px solid #252525", color: "#555",
              fontSize: "10px", padding: "6px 14px", borderRadius: "2px",
              cursor: marking ? "default" : "pointer",
            }}
          >
            {marking ? "Marking..." : `Mark all read (${unread})`}
          </button>
        </div>
      )}

      <div style={{
        display: "grid", gridTemplateColumns: "280px 1fr",
        gap: "0", background: "#141414", border: "1px solid #1E1E1E",
        borderRadius: "4px", overflow: "hidden", minHeight: "500px",
      }}>

        {/* Message List */}
        <div style={{ borderRight: "1px solid #1E1E1E", overflowY: "auto" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #1A1A1A", display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#555", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
              All Messages
            </span>
            <span style={{ color: "#444", fontSize: "10px" }}>{messages.length}</span>
          </div>
          {messages.map((m, i) => (
            <div
              key={m.id}
              onClick={() => handleSelect(m)}
              style={{
                padding: "12px 16px",
                borderBottom: i < messages.length - 1 ? "1px solid #181818" : "none",
                cursor: "pointer",
                borderLeft: !m.read ? "2px solid #8C7355" : "2px solid transparent",
                background: selected?.id === m.id ? "#1A1A1A" : "transparent",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                <p style={{
                  color: m.read ? "#666" : "#ddd",
                  fontSize: "11px", fontWeight: m.read ? 400 : 600,
                  margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1,
                }}>
                  {m.name ?? "Unknown"}
                </p>
                <span style={{ color: "#444", fontSize: "9px", flexShrink: 0, marginLeft: "6px" }}>
                  {m.created_at ? timeAgo(m.created_at) : ""}
                </span>
              </div>
              <p style={{ color: "#555", fontSize: "10px", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {m.email}
              </p>
              <p style={{ color: "#444", fontSize: "10px", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {m.message ?? m.subject ?? "No message"}
              </p>
            </div>
          ))}
        </div>

        {/* Message Detail */}
        {selected ? (
          <div style={{ padding: "24px" }}>
            <div style={{ marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #1E1E1E", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ color: "#fff", fontSize: "16px", fontWeight: 700, margin: "0 0 8px" }}>
                  {selected.subject ?? "Contact Form Message"}
                </p>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <p style={{ color: "#888", fontSize: "12px", margin: 0 }}>
                    <span style={{ color: "#555" }}>From:</span> {selected.name} &lt;{selected.email}&gt;
                  </p>
                  <p style={{ color: "#444", fontSize: "11px", margin: 0 }}>
                    {selected.created_at ? timeAgo(selected.created_at) : ""}
                  </p>
                </div>
              </div>
              {!selected.read && (
                <span style={{
                  fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase", color: "#8C7355",
                  background: "rgba(140,115,85,0.12)", padding: "3px 8px", borderRadius: "10px",
                }}>
                  Unread
                </span>
              )}
            </div>

            <p style={{ color: "#888", fontSize: "13px", lineHeight: 1.8, margin: "0 0 24px", whiteSpace: "pre-wrap" }}>
              {selected.message ?? "No message content."}
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              {selected.email && (
                <a
                  href={`mailto:${selected.email}`}
                  style={{
                    display: "inline-block",
                    background: "#8C7355", color: "#fff",
                    padding: "9px 20px", fontSize: "11px",
                    fontWeight: 700, textDecoration: "none",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    borderRadius: "2px",
                  }}
                >
                  ✉ Reply
                </a>
              )}
              {!selected.read && (
                <button
                  onClick={() => markRead(selected.id)}
                  style={{
                    background: "none", border: "1px solid #252525", color: "#555",
                    padding: "9px 16px", fontSize: "11px", cursor: "pointer",
                    borderRadius: "2px",
                  }}
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ padding: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#333", fontSize: "13px" }}>Select a message</p>
          </div>
        )}
      </div>
    </div>
  );
}
