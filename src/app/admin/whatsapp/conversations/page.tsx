"use client";

import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  direction: "inbound" | "outbound";
  content: string;
  sent_at: string;
}

interface Conversation {
  id: string;
  phone: string;
  contact_name?: string;
  status: "bot" | "agent" | "closed";
  last_message_at: string;
}

const S = {
  wrap: { display: "flex", height: "calc(100vh - 52px)", overflow: "hidden" as const },
  // Left sidebar
  sidebar: { width: "280px", minWidth: "280px", background: "#111", borderRight: "1px solid #1E1E1E", display: "flex", flexDirection: "column" as const, overflow: "hidden" },
  sidebarHeader: { padding: "14px 16px", borderBottom: "1px solid #1E1E1E", fontSize: "11px", fontWeight: 700, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "flex", justifyContent: "space-between", alignItems: "center" },
  convItem: (active: boolean, status: string) => ({
    padding: "12px 16px",
    borderBottom: "1px solid #1a1a1a",
    cursor: "pointer" as const,
    background: active ? "rgba(140,115,85,0.12)" : "transparent",
    borderLeft: `3px solid ${active ? "#8C7355" : "transparent"}`,
  }),
  statusDot: (s: string) => ({
    width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0,
    background: s === "agent" ? "#F59E0B" : s === "bot" ? "#22C55E" : "#333",
  }),
  // Main
  main: { flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden", background: "#0D0D0D" },
  chatHeader: { padding: "14px 20px", borderBottom: "1px solid #1E1E1E", background: "#141414", display: "flex", alignItems: "center", justifyContent: "space-between" },
  messages: { flex: 1, overflowY: "auto" as const, padding: "20px" },
  bubble: (dir: string) => ({
    maxWidth: "65%",
    marginLeft: dir === "outbound" ? "auto" : 0,
    marginBottom: "8px",
    background: dir === "outbound" ? "#8C7355" : "#1E1E1E",
    color: dir === "outbound" ? "#fff" : "#ddd",
    padding: "10px 14px",
    fontSize: "13px",
    lineHeight: 1.5,
    whiteSpace: "pre-wrap" as const,
    borderRadius: "2px",
  }),
  inputBar: { padding: "14px 20px", borderTop: "1px solid #1E1E1E", background: "#141414", display: "flex", gap: "10px" },
  input: { flex: 1, background: "#1E1E1E", border: "1px solid #2a2a2a", color: "#ddd", padding: "10px 14px", fontSize: "13px", outline: "none", resize: "none" as const, fontFamily: "inherit" },
  sendBtn: { background: "#8C7355", color: "#fff", border: "none", padding: "10px 20px", fontSize: "12px", fontWeight: 700, cursor: "pointer" as const, textTransform: "uppercase" as const, letterSpacing: "0.1em" },
  actionBtn: (color: string) => ({ background: "#1E1E1E", color, border: `1px solid #2a2a2a`, padding: "6px 14px", fontSize: "11px", fontWeight: 600, cursor: "pointer" as const }),
};

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState<"all" | "agent" | "bot">("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId);

  // Load conversations
  const loadConversations = async () => {
    const res = await fetch("/api/whatsapp/conversations");
    if (res.ok) {
      const data = await res.json();
      setConversations(data);
    }
  };

  // Load messages for selected conversation
  const loadMessages = async (id: string) => {
    const res = await fetch(`/api/whatsapp/conversations/${id}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    loadConversations();
    const interval = setInterval(loadConversations, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadMessages(selectedId);
      const interval = setInterval(() => loadMessages(selectedId), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Read URL param on load
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const id = p.get("id");
    if (id) setSelectedId(id);
  }, []);

  const filtered = conversations.filter((c) => {
    if (filter === "all") return true;
    return c.status === filter;
  });

  const sendMessage = async (action?: "close" | "return_to_bot") => {
    if (!selected || (!text.trim() && !action)) return;
    setSending(true);
    await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: selected.phone,
        message: text || (action === "close" ? "Atendimento encerrado. Obrigado por entrar em contato! 👋" : "Retornando ao atendimento automático."),
        conversation_id: selected.id,
        action,
      }),
    });
    setText("");
    setSending(false);
    await loadMessages(selected.id);
    await loadConversations();
  };

  const takeOver = async () => {
    if (!selected) return;
    await fetch("/api/whatsapp/conversations/takeover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation_id: selected.id }),
    });
    await loadConversations();
  };

  return (
    <div style={S.wrap}>
      {/* ── Conversation list ──────────────────────────────────────── */}
      <div style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <span>Conversas</span>
          <div style={{ display: "flex", gap: "4px" }}>
            {(["all", "agent", "bot"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} style={{
                background: filter === f ? "#8C7355" : "#1E1E1E",
                color: filter === f ? "#fff" : "#555",
                border: "none", padding: "3px 8px", fontSize: "9px", fontWeight: 700,
                letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase",
              }}>
                {f === "all" ? "Todas" : f === "agent" ? "Agente" : "Bot"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.length === 0 && (
            <p style={{ padding: "24px 16px", color: "#444", fontSize: "13px" }}>Nenhuma conversa.</p>
          )}
          {filtered.map((c) => (
            <div key={c.id} style={S.convItem(c.id === selectedId, c.status)} onClick={() => setSelectedId(c.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <div style={S.statusDot(c.status)} />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#ccc", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {c.contact_name ?? c.phone}
                </span>
                {c.status === "agent" && (
                  <span style={{ fontSize: "9px", background: "#F59E0B", color: "#000", padding: "1px 5px", fontWeight: 700, letterSpacing: "0.1em", flexShrink: 0 }}>AGENTE</span>
                )}
              </div>
              <p style={{ fontSize: "11px", color: "#555", margin: 0, paddingLeft: "15px" }}>{c.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Chat area ─────────────────────────────────────────────── */}
      <div style={S.main}>
        {!selected ? (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#444", fontSize: "14px" }}>Selecione uma conversa para ver o histórico.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={S.chatHeader}>
              <div>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#ddd" }}>
                  {selected.contact_name ?? selected.phone}
                </p>
                <p style={{ margin: 0, fontSize: "11px", color: "#555" }}>
                  {selected.phone} &nbsp;·&nbsp;
                  <span style={{ color: selected.status === "agent" ? "#F59E0B" : selected.status === "bot" ? "#22C55E" : "#555" }}>
                    {selected.status === "agent" ? "⚡ Atendimento humano" : selected.status === "bot" ? "🤖 Bot ativo" : "✗ Encerrada"}
                  </span>
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {selected.status === "bot" && (
                  <button onClick={takeOver} style={S.actionBtn("#F59E0B")}>⚡ Assumir atendimento</button>
                )}
                {selected.status === "agent" && (
                  <>
                    <button onClick={() => sendMessage("return_to_bot")} style={S.actionBtn("#22C55E")}>🤖 Devolver ao bot</button>
                    <button onClick={() => sendMessage("close")} style={S.actionBtn("#EF4444")}>✗ Encerrar conversa</button>
                  </>
                )}
              </div>
            </div>

            {/* Messages */}
            <div style={S.messages}>
              {messages.length === 0 && (
                <p style={{ color: "#444", fontSize: "13px", textAlign: "center", marginTop: "40px" }}>Nenhuma mensagem ainda.</p>
              )}
              {messages.map((m) => (
                <div key={m.id} style={{ marginBottom: "8px", display: "flex", flexDirection: "column", alignItems: m.direction === "outbound" ? "flex-end" : "flex-start" }}>
                  <div style={S.bubble(m.direction)}>{m.content}</div>
                  <p style={{ fontSize: "10px", color: "#444", margin: "2px 4px 0" }}>
                    {m.direction === "inbound" ? "👤" : "🤖"} {new Date(m.sent_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            {selected.status === "agent" && (
              <div style={S.inputBar}>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Escreva sua resposta... (Enter para enviar, Shift+Enter para nova linha)"
                  rows={2}
                  style={S.input}
                />
                <button onClick={() => sendMessage()} disabled={sending || !text.trim()} style={S.sendBtn}>
                  {sending ? "..." : "Enviar"}
                </button>
              </div>
            )}
            {selected.status === "bot" && (
              <div style={{ padding: "12px 20px", borderTop: "1px solid #1E1E1E", background: "#141414", fontSize: "12px", color: "#555", textAlign: "center" as const }}>
                Bot está respondendo automaticamente. Clique em <strong style={{ color: "#F59E0B" }}>Assumir atendimento</strong> para responder manualmente.
              </div>
            )}
            {selected.status === "closed" && (
              <div style={{ padding: "12px 20px", borderTop: "1px solid #1E1E1E", background: "#141414", fontSize: "12px", color: "#555", textAlign: "center" as const }}>
                Conversa encerrada.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
