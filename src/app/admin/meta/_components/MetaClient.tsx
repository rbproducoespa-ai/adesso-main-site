"use client";

import { useState, useEffect, useCallback } from "react";

type SaveState = "idle" | "saving" | "saved" | "error";

interface MetaConfig {
  pixel_id: string;
  access_token: string;
  domain_verification: string;
}

const EVENTS = [
  { name: "PageView",        desc: "Fired automatically on every page load" },
  { name: "ViewContent",     desc: "Product or content detail pages" },
  { name: "Contact",         desc: "Contact form submission" },
  { name: "Lead",            desc: "Lead capture form submission" },
  { name: "Purchase",        desc: "Completed checkout / order paid" },
  { name: "InitiateCheckout",desc: "Checkout started" },
  { name: "Search",          desc: "Site search performed" },
];

export default function MetaClient() {
  const [config, setConfig]     = useState<MetaConfig>({ pixel_id: "", access_token: "", domain_verification: "" });
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState<"pixel" | "events" | "ads">("pixel");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/content?app=main&page=__meta__");
      const { data } = await res.json();
      const rows: { section: string; key: string; value: string }[] = data ?? [];
      const patch: Partial<MetaConfig> = {};
      rows.forEach(r => {
        if (r.section === "meta") {
          if (r.key === "pixel_id")           patch.pixel_id = r.value;
          if (r.key === "access_token")       patch.access_token = r.value;
          if (r.key === "domain_verification") patch.domain_verification = r.value;
        }
      });
      setConfig(prev => ({ ...prev, ...patch }));
    } catch { /* silent */ }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    setSaveState("saving");
    try {
      await Promise.all(
        (Object.entries(config) as [keyof MetaConfig, string][]).map(([key, value]) =>
          fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ app: "main", page: "__meta__", section: "meta", key, value, type: "text", label: key }),
          })
        )
      );
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch {
      setSaveState("error");
      setTimeout(() => setSaveState("idle"), 3000);
    }
  };

  const Tab = ({ id, label }: { id: typeof activeTab; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        padding: "8px 18px", fontSize: "11px", fontWeight: 600,
        background: activeTab === id ? "#8C7355" : "none",
        border: "none", borderBottom: activeTab === id ? "none" : "2px solid transparent",
        color: activeTab === id ? "#fff" : "#555",
        cursor: "pointer", borderRadius: "3px 3px 0 0",
        letterSpacing: "0.1em", textTransform: "uppercase",
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Meta</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Meta Business Suite</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Facebook &amp; Instagram Pixel, Ads and conversion tracking</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <a
            href="https://business.facebook.com"
            target="_blank" rel="noreferrer"
            style={{ background: "#1877F2", color: "#fff", padding: "9px 16px", fontSize: "11px", fontWeight: 700, textDecoration: "none", borderRadius: "4px", letterSpacing: "0.1em" }}
          >
            ↗ Meta Business Manager
          </a>
          <a
            href="https://www.facebook.com/events_manager"
            target="_blank" rel="noreferrer"
            style={{ background: "#141414", color: "#8C7355", padding: "9px 16px", fontSize: "11px", textDecoration: "none", borderRadius: "2px", border: "1px solid #252525" }}
          >
            Events Manager →
          </a>
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        background: config.pixel_id ? "rgba(37,99,235,0.08)" : "#141414",
        border: `1px solid ${config.pixel_id ? "rgba(24,119,242,0.3)" : "#1E1E1E"}`,
        borderRadius: "4px", padding: "14px 20px",
        display: "flex", gap: "12px", alignItems: "center",
        marginBottom: "24px",
      }}>
        <div style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: config.pixel_id ? "#1877F2" : "#333",
          flexShrink: 0,
          boxShadow: config.pixel_id ? "0 0 8px rgba(24,119,242,0.6)" : "none",
        }} />
        <div style={{ flex: 1 }}>
          <p style={{ color: config.pixel_id ? "#60a5fa" : "#555", fontSize: "12px", fontWeight: 600, margin: "0 0 2px" }}>
            {config.pixel_id ? `Pixel configurado — ID: ${config.pixel_id}` : "Pixel não configurado"}
          </p>
          <p style={{ color: "#444", fontSize: "11px", margin: 0 }}>
            {config.pixel_id ? "O pixel Meta está ativo no site. Verifique os eventos no Events Manager." : "Insira o Pixel ID abaixo para ativar o rastreamento Meta no site."}
          </p>
        </div>
        {config.pixel_id && (
          <a
            href={`https://www.facebook.com/ads/manager/pixel/facebook_pixel/?pixel_id=${config.pixel_id}`}
            target="_blank" rel="noreferrer"
            style={{ color: "#1877F2", fontSize: "11px", textDecoration: "none", flexShrink: 0 }}
          >
            Ver pixel →
          </a>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid #1E1E1E", marginBottom: "20px" }}>
        <Tab id="pixel"  label="Configuração do Pixel" />
        <Tab id="events" label="Eventos de Conversão" />
        <Tab id="ads"    label="Anúncios &amp; Audiences" />
      </div>

      {/* TAB: Pixel Config */}
      {activeTab === "pixel" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Pixel ID */}
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px" }}>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 700, margin: "0 0 16px" }}>Meta Pixel</p>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ color: "#555", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Pixel ID
                </label>
                <input
                  type="text"
                  value={loading ? "" : config.pixel_id}
                  onChange={e => setConfig(c => ({ ...c, pixel_id: e.target.value }))}
                  placeholder={loading ? "A carregar…" : "Ex: 1234567890123456"}
                  disabled={loading}
                  style={{
                    width: "100%", background: "#0D0D0D", border: "1px solid #252525",
                    color: "#fff", fontSize: "13px", padding: "10px 12px",
                    borderRadius: "3px", outline: "none", boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                />
                <p style={{ color: "#444", fontSize: "10px", margin: "6px 0 0" }}>
                  Encontra o Pixel ID em Events Manager → Fontes de Dados → Pixels
                </p>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ color: "#555", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Access Token (API Conversions — opcional)
                </label>
                <input
                  type="password"
                  value={loading ? "" : config.access_token}
                  onChange={e => setConfig(c => ({ ...c, access_token: e.target.value }))}
                  placeholder={loading ? "A carregar…" : "EAAxxxxx…"}
                  disabled={loading}
                  style={{
                    width: "100%", background: "#0D0D0D", border: "1px solid #252525",
                    color: "#fff", fontSize: "13px", padding: "10px 12px",
                    borderRadius: "3px", outline: "none", boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                />
                <p style={{ color: "#444", fontSize: "10px", margin: "6px 0 0" }}>
                  Para Conversions API server-side (melhor precisão, sem bloqueio de cookies)
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#555", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                  Código de Verificação de Domínio
                </label>
                <input
                  type="text"
                  value={loading ? "" : config.domain_verification}
                  onChange={e => setConfig(c => ({ ...c, domain_verification: e.target.value }))}
                  placeholder={loading ? "A carregar…" : "Ex: abcdef1234567890"}
                  disabled={loading}
                  style={{
                    width: "100%", background: "#0D0D0D", border: "1px solid #252525",
                    color: "#fff", fontSize: "13px", padding: "10px 12px",
                    borderRadius: "3px", outline: "none", boxSizing: "border-box",
                    fontFamily: "monospace",
                  }}
                />
                <p style={{ color: "#444", fontSize: "10px", margin: "6px 0 0" }}>
                  Obtém em Business Manager → Configurações → Domínios
                </p>
              </div>

              <button
                onClick={save}
                disabled={saveState === "saving" || loading}
                style={{
                  background: saveState === "saved" ? "#2D5A27" : saveState === "error" ? "#6B2727" : "#8C7355",
                  color: "#fff", border: "none",
                  fontSize: "11px", fontWeight: 700, padding: "10px 20px",
                  borderRadius: "3px", cursor: saveState === "saving" ? "not-allowed" : "pointer",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                }}
              >
                {saveState === "saving" ? "A guardar…" : saveState === "saved" ? "✓ Guardado!" : saveState === "error" ? "⚠ Erro" : "Guardar Configuração"}
              </button>
            </div>

            {/* Code Preview */}
            {config.pixel_id && (
              <div style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px 20px" }}>
                <p style={{ color: "#555", fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 10px" }}>
                  Código gerado — injetado automaticamente
                </p>
                <pre style={{ color: "#8C7355", fontSize: "10px", margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.8, overflowX: "auto" }}>
{`<!-- Meta Pixel -->
<script>
  !function(f,b,e,v,n,t,s){...}(window,
  document,'script','https://connect.facebook.net/
  en_US/fbevents.js');
  fbq('init', '${config.pixel_id}');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" src="https://www.facebook.com/
  tr?id=${config.pixel_id}&ev=PageView&noscript=1"/>
</noscript>`}
                </pre>
              </div>
            )}
          </div>

          {/* Side guide */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { step: "1", title: "Cria o Pixel", desc: "Acede ao Events Manager no Business Manager e cria um novo Pixel para o domínio adesso.digital" },
              { step: "2", title: "Copia o Pixel ID", desc: "O ID são 15-16 dígitos. Cola no campo acima e guarda." },
              { step: "3", title: "Verifica o domínio", desc: "Vai a Configurações → Domínios e adiciona adesso.digital. O código de verificação é inserido automaticamente no <head>." },
              { step: "4", title: "Testa os eventos", desc: "Usa o Test Events no Events Manager para confirmar que os eventos chegam correctamente." },
            ].map(s => (
              <div key={s.step} style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "14px 16px", display: "flex", gap: "12px" }}>
                <div style={{ width: "22px", height: "22px", borderRadius: "50%", background: "#1877F218", border: "1px solid rgba(24,119,242,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700, color: "#1877F2", flexShrink: 0 }}>
                  {s.step}
                </div>
                <div>
                  <p style={{ color: "#ccc", fontSize: "11px", fontWeight: 600, margin: "0 0 3px" }}>{s.title}</p>
                  <p style={{ color: "#444", fontSize: "10px", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Events */}
      {activeTab === "events" && (
        <div>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden", marginBottom: "16px" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1A1A1A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, margin: 0 }}>Eventos de Conversão</p>
              {config.pixel_id && (
                <a href="https://www.facebook.com/events_manager" target="_blank" rel="noreferrer" style={{ color: "#1877F2", fontSize: "11px", textDecoration: "none" }}>
                  Verificar no Events Manager →
                </a>
              )}
            </div>
            {EVENTS.map((ev, i) => (
              <div key={ev.name} style={{
                padding: "14px 20px", borderBottom: i < EVENTS.length - 1 ? "1px solid #1A1A1A" : "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <code style={{ color: "#8C7355", fontSize: "12px", fontWeight: 600 }}>{ev.name}</code>
                  <p style={{ color: "#555", fontSize: "11px", margin: "2px 0 0" }}>{ev.desc}</p>
                </div>
                <span style={{
                  fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: ev.name === "PageView" || ev.name === "Contact" || ev.name === "Lead" || ev.name === "Purchase" ? "#3D7A4E" : "#555",
                  background: ev.name === "PageView" || ev.name === "Contact" || ev.name === "Lead" || ev.name === "Purchase" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                  padding: "2px 7px", borderRadius: "10px",
                }}>
                  {ev.name === "PageView" || ev.name === "Contact" || ev.name === "Lead" || ev.name === "Purchase" ? "● Activo" : "○ Pendente"}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "16px 20px" }}>
            <p style={{ color: "#777", fontSize: "12px", fontWeight: 600, margin: "0 0 6px" }}>Como funcionam os eventos</p>
            <p style={{ color: "#444", fontSize: "11px", margin: 0, lineHeight: 1.7 }}>
              O pixel dispara automaticamente <code style={{ color: "#8C7355" }}>PageView</code> em cada página.
              O evento <code style={{ color: "#8C7355" }}>Contact</code> é enviado ao submeter o formulário de contacto.
              O evento <code style={{ color: "#8C7355" }}>Purchase</code> é enviado após o pagamento Stripe confirmado.
              Ativa a Conversions API para tracking server-side sem dependência de cookies.
            </p>
          </div>
        </div>
      )}

      {/* TAB: Ads */}
      {activeTab === "ads" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {[
            { icon: "◎", title: "Custom Audiences", desc: "Cria públicos personalizados com base nos visitantes do site, contactos e compradores para retargeting.", link: "https://business.facebook.com/audiences" },
            { icon: "⊛", title: "Lookalike Audiences", desc: "Expande o alcance para utilizadores semelhantes aos teus melhores clientes com base nos dados do pixel.", link: "https://business.facebook.com/audiences" },
            { icon: "≡", title: "Catálogo de Produtos", desc: "Liga o teu catálogo de produtos para Dynamic Ads e retargeting automático de produtos vistos.", link: "https://business.facebook.com/products" },
            { icon: "↗", title: "Criar Campanha", desc: "Acede ao Ads Manager para criar campanhas de conversão, tráfego ou notoriedade.", link: "https://www.facebook.com/adsmanager" },
            { icon: "◈", title: "Attribution Reporting", desc: "Analisa quais anúncios geram conversões e o ROI de cada campanha.", link: "https://www.facebook.com/adsmanager" },
            { icon: "⬡", title: "Pixel Health", desc: "Verifica a saúde do pixel, qualidade do match e volume de eventos nas últimas 24 horas.", link: `https://www.facebook.com/events_manager/pixel/${config.pixel_id || ""}/diagnostics` },
          ].map(t => (
            <div key={t.title} style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "18px 20px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
                <span style={{ fontSize: "20px", flexShrink: 0, opacity: 0.7 }}>{t.icon}</span>
                <p style={{ color: "#fff", fontSize: "13px", fontWeight: 600, margin: 0 }}>{t.title}</p>
              </div>
              <p style={{ color: "#555", fontSize: "11px", margin: "0 0 14px", lineHeight: 1.6 }}>{t.desc}</p>
              <a href={t.link} target="_blank" rel="noreferrer" style={{ color: "#1877F2", fontSize: "11px", textDecoration: "none" }}>
                Abrir no Meta →
              </a>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
