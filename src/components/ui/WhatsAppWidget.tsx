"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackWhatsAppClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "447470361422";
const DEFAULT_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da ADESSO Digital.";

export function WhatsAppWidget() {
  const pathname = usePathname();
  const [open, setOpen]         = useState(false);
  const [message, setMessage]   = useState(DEFAULT_MESSAGE);
  const [visible, setVisible]   = useState(false);

  // Hide on admin pages
  useEffect(() => {
    setVisible(!pathname?.startsWith("/admin"));
  }, [pathname]);

  // Delay initial appearance
  useEffect(() => {
    const t = setTimeout(() => setVisible(v => v && !pathname?.startsWith("/admin")), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  const handleSend = () => {
    const encoded = encodeURIComponent(message || DEFAULT_MESSAGE);
    trackWhatsAppClick({ source: "widget" });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Chat Panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: "88px", right: "24px",
          width: "320px", background: "#fff",
          borderRadius: "16px", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.15)",
          zIndex: 9998,
          animation: "waSlidein 0.25s ease",
          fontFamily: "Inter, system-ui, sans-serif",
        }}>
          {/* Header */}
          <div style={{
            background: "#25D366",
            padding: "16px 18px",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", flexShrink: 0,
            }}>
              🅰
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: "0 0 2px" }}>ADESSO Digital</p>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#A8F5BC", display: "inline-block" }} />
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "11px", margin: 0 }}>Normalmente responde em minutos</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", fontSize: "18px", cursor: "pointer", padding: "0 0 0 4px", lineHeight: 1 }}
            >
              ×
            </button>
          </div>

          {/* Chat bubble */}
          <div style={{ background: "#ECE5DD", padding: "16px", minHeight: "80px" }}>
            <div style={{
              background: "#fff",
              borderRadius: "0 12px 12px 12px",
              padding: "10px 14px",
              maxWidth: "85%",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
            }}>
              <p style={{ color: "#111", fontSize: "13px", margin: "0 0 4px", lineHeight: 1.5 }}>
                Olá! 👋 Como podemos ajudar?
              </p>
              <p style={{ color: "#999", fontSize: "10px", margin: 0, textAlign: "right" }}>Agora</p>
            </div>
          </div>

          {/* Message input */}
          <div style={{ background: "#fff", padding: "12px 14px", borderTop: "1px solid #f0f0f0" }}>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              placeholder="Digite sua mensagem…"
              onKeyDown={e => { if (e.key === "Enter" && e.ctrlKey) handleSend(); }}
              style={{
                width: "100%", border: "1px solid #e0e0e0",
                borderRadius: "8px", padding: "10px 12px",
                fontSize: "13px", lineHeight: 1.5, resize: "none",
                outline: "none", color: "#111",
                fontFamily: "Inter, system-ui, sans-serif",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: "100%", marginTop: "8px",
                background: "#25D366", border: "none",
                color: "#fff", fontSize: "13px", fontWeight: 700,
                padding: "11px 16px", borderRadius: "8px",
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Iniciar conversa no WhatsApp
            </button>
            <p style={{ color: "#aaa", fontSize: "10px", textAlign: "center", margin: "8px 0 0" }}>
              Ctrl+Enter para enviar
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Abrir chat WhatsApp"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "56px", height: "56px",
          background: open ? "#1ebc57" : "#25D366",
          border: "none", borderRadius: "50%",
          boxShadow: "0 4px 20px rgba(37,211,102,0.5), 0 2px 8px rgba(0,0,0,0.2)",
          cursor: "pointer", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "transform 0.2s, background 0.2s",
          transform: open ? "rotate(0deg) scale(1.05)" : "rotate(0deg) scale(1)",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = open ? "scale(1.05)" : "scale(1)"; }}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
            <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes waSlidein {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </>
  );
}
