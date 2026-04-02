"use client";

import { useState, useEffect } from "react";

const DIVISIONS_CONFIG = [
  { label: "Main Site",   envKey: "NEXT_PUBLIC_SITE_URL",        placeholder: "https://adesso.digital" },
  { label: "Exhibition",  envKey: "NEXT_PUBLIC_EXHIBITION_URL",  placeholder: "https://exhibition.adesso.digital" },
  { label: "Automation",  envKey: "NEXT_PUBLIC_AUTOMATION_URL",  placeholder: "https://automation.adesso.digital" },
  { label: "Leads",       envKey: "NEXT_PUBLIC_LEADS_URL",       placeholder: "https://leads.adesso.digital" },
  { label: "Lab",         envKey: "NEXT_PUBLIC_LAB_URL",         placeholder: "https://lab.adesso.digital" },
];

const INTEGRATIONS = [
  { name: "Supabase",           status: "connected", desc: "Database, Auth, Storage",   icon: "⬡" },
  { name: "Vercel",             status: "connected", desc: "Hosting & deployment",       icon: "◈" },
  { name: "Google Analytics 4", status: "not-set",   desc: "Add NEXT_PUBLIC_GA_ID",      icon: "↗" },
  { name: "Resend",             status: "not-set",   desc: "Transactional emails",       icon: "⊡" },
  { name: "Stripe",             status: "not-set",   desc: "Payment processing",         icon: "◻" },
  { name: "Crisp Chat",         status: "not-set",   desc: "Live chat widget",           icon: "▣" },
];

type SaveState = "idle" | "saving" | "saved" | "error";

interface SiteSettings {
  site_name: string;
  tagline: string;
  contact_email: string;
  admin_email: string;
  whatsapp: string;
  address: string;
  ga_id: string;
}

const DEFAULTS: SiteSettings = {
  site_name: "ADESSO Digital",
  tagline: "Exhibition · Automation · Leads · Lab",
  contact_email: "contact@adesso.digital",
  admin_email: "admin@adesso.digital",
  whatsapp: "+44 7XXX XXXXXX",
  address: "London, United Kingdom",
  ga_id: "",
};

function InputRow({ label, field, value, onChange }: {
  label: string;
  field: string;
  value: string;
  onChange: (f: string, v: string) => void;
}) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "200px 1fr",
      padding: "10px 20px", borderBottom: "1px solid #181818",
      alignItems: "center", gap: "16px",
    }}>
      <p style={{ color: "#555", fontSize: "11px", fontWeight: 600, margin: 0 }}>{label}</p>
      <input
        value={value}
        onChange={e => onChange(field, e.target.value)}
        style={{
          background: "#0D0D0D", border: "1px solid #252525",
          color: "#ccc", fontSize: "12px", padding: "6px 10px",
          borderRadius: "3px", width: "100%", boxSizing: "border-box",
          outline: "none", fontFamily: "monospace",
        }}
      />
    </div>
  );
}

export function SettingsClient() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [siteInfoState, setSiteInfoState] = useState<SaveState>("idle");
  const [contactInfoState, setContactInfoState] = useState<SaveState>("idle");
  const [clearState, setClearState] = useState<SaveState>("idle");

  useEffect(() => {
    // Load saved settings from site_content
    fetch("/api/settings")
      .then(r => r.json())
      .then(({ data }) => {
        if (data) setSettings(s => ({ ...s, ...data }));
      })
      .catch(() => {});
  }, []);

  function set(field: string, value: string) {
    setSettings(s => ({ ...s, [field]: value }));
  }

  async function saveSiteInfo() {
    setSiteInfoState("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_name: settings.site_name,
          tagline: settings.tagline,
          ga_id: settings.ga_id,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSiteInfoState("saved");
      setTimeout(() => setSiteInfoState("idle"), 3000);
    } catch {
      setSiteInfoState("error");
      setTimeout(() => setSiteInfoState("idle"), 3000);
    }
  }

  async function saveContactInfo() {
    setContactInfoState("saving");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_email: settings.contact_email,
          admin_email: settings.admin_email,
          whatsapp: settings.whatsapp,
          address: settings.address,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      setContactInfoState("saved");
      setTimeout(() => setContactInfoState("idle"), 3000);
    } catch {
      setContactInfoState("error");
      setTimeout(() => setContactInfoState("idle"), 3000);
    }
  }

  async function clearAllContent() {
    if (!window.confirm("This will delete all site content overrides. Pages will revert to their default text and images. Continue?")) return;
    setClearState("saving");
    try {
      const res = await fetch("/api/content/clear", { method: "DELETE" });
      if (!res.ok) throw new Error("Clear failed");
      setClearState("saved");
      setTimeout(() => setClearState("idle"), 3000);
    } catch {
      setClearState("error");
      setTimeout(() => setClearState("idle"), 3000);
    }
  }

  function saveLabel(state: SaveState, idle: string) {
    if (state === "saving") return "Saving...";
    if (state === "saved")  return "✓ Saved!";
    if (state === "error")  return "⚠ Error";
    return idle;
  }

  function saveBg(state: SaveState) {
    if (state === "saved")  return "#2D5A27";
    if (state === "error")  return "#6B2727";
    return "#8C7355";
  }

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Settings</p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Settings</h2>
        <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Site configuration, domains and integrations</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "20px" }}>
        <div>

          {/* Site Info */}
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1E1E1E" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Site Information</p>
            </div>
            <InputRow label="Site Name"        field="site_name"  value={settings.site_name}  onChange={set} />
            <InputRow label="Tagline"           field="tagline"    value={settings.tagline}    onChange={set} />
            <div style={{
              display: "grid", gridTemplateColumns: "200px 1fr",
              padding: "10px 20px", borderBottom: "1px solid #181818",
              alignItems: "center", gap: "16px",
            }}>
              <p style={{ color: "#555", fontSize: "11px", fontWeight: 600, margin: 0 }}>Language</p>
              <p style={{ color: "#888", fontSize: "12px", margin: 0, fontFamily: "monospace" }}>en-GB</p>
            </div>
            <div style={{
              display: "grid", gridTemplateColumns: "200px 1fr",
              padding: "10px 20px", borderBottom: "1px solid #181818",
              alignItems: "center", gap: "16px",
            }}>
              <p style={{ color: "#555", fontSize: "11px", fontWeight: 600, margin: 0 }}>Currency</p>
              <p style={{ color: "#888", fontSize: "12px", margin: 0, fontFamily: "monospace" }}>GBP (£)</p>
            </div>
            <InputRow label="GA4 Measurement ID" field="ga_id" value={settings.ga_id} onChange={set} />
            <div style={{ padding: "12px 20px" }}>
              <button
                onClick={saveSiteInfo}
                disabled={siteInfoState === "saving"}
                style={{
                  background: saveBg(siteInfoState), color: "#fff", padding: "8px 16px",
                  fontSize: "10px", fontWeight: 700, border: "none", cursor: siteInfoState === "saving" ? "default" : "pointer",
                  letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
                  transition: "background 0.2s",
                }}
              >
                {saveLabel(siteInfoState, "Save Changes")}
              </button>
            </div>
          </div>

          {/* Domain / URLs */}
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1E1E1E" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Domains & URLs</p>
              <p style={{ color: "#444", fontSize: "10px", margin: "3px 0 0" }}>Configure in Vercel dashboard + <code style={{ color: "#8C7355" }}>.env.production</code></p>
            </div>
            {DIVISIONS_CONFIG.map((d) => (
              <div key={d.envKey} style={{
                display: "grid", gridTemplateColumns: "160px 1fr",
                padding: "12px 20px", borderBottom: "1px solid #181818",
                alignItems: "center", gap: "16px",
              }}>
                <p style={{ color: "#555", fontSize: "11px", fontWeight: 600, margin: 0 }}>{d.label}</p>
                <div>
                  <p style={{ color: "#8C7355", fontSize: "9px", fontFamily: "monospace", margin: "0 0 2px" }}>{d.envKey}</p>
                  <p style={{ color: "#555", fontSize: "11px", margin: 0, fontFamily: "monospace" }}>{d.placeholder}</p>
                </div>
              </div>
            ))}
            <div style={{ padding: "12px 20px" }}>
              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#8C7355", fontSize: "11px", textDecoration: "none" }}
              >
                Manage in Vercel →
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ padding: "14px 20px", borderBottom: "1px solid #1E1E1E" }}>
              <p style={{ color: "#fff", fontSize: "12px", fontWeight: 700, margin: 0 }}>Contact Information</p>
            </div>
            <InputRow label="Contact Email"  field="contact_email" value={settings.contact_email} onChange={set} />
            <InputRow label="Admin Email"    field="admin_email"   value={settings.admin_email}   onChange={set} />
            <InputRow label="WhatsApp"       field="whatsapp"      value={settings.whatsapp}      onChange={set} />
            <InputRow label="Address"        field="address"       value={settings.address}       onChange={set} />
            <div style={{ padding: "12px 20px" }}>
              <button
                onClick={saveContactInfo}
                disabled={contactInfoState === "saving"}
                style={{
                  background: saveBg(contactInfoState), color: "#fff", padding: "8px 16px",
                  fontSize: "10px", fontWeight: 700, border: "none", cursor: contactInfoState === "saving" ? "default" : "pointer",
                  letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
                  transition: "background 0.2s",
                }}
              >
                {saveLabel(contactInfoState, "Save Changes")}
              </button>
            </div>
          </div>

        </div>

        {/* Integrations */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Integrations
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {INTEGRATIONS.map((int) => (
              <div key={int.name} style={{
                background: "#141414", border: "1px solid #1E1E1E",
                borderRadius: "4px", padding: "14px 16px",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <span style={{ fontSize: "18px", flexShrink: 0, opacity: 0.6 }}>{int.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#ccc", fontSize: "12px", fontWeight: 600, margin: "0 0 2px" }}>{int.name}</p>
                  <p style={{ color: "#444", fontSize: "10px", margin: 0 }}>{int.desc}</p>
                </div>
                <span style={{
                  fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: int.status === "connected" ? "#3D7A4E" : "#555",
                  background: int.status === "connected" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                  padding: "2px 7px", borderRadius: "10px", flexShrink: 0,
                }}>
                  {int.status === "connected" ? "● On" : "○ Off"}
                </span>
              </div>
            ))}
          </div>

          {/* Danger Zone */}
          <div style={{
            marginTop: "20px", background: "#141414",
            border: "1px solid #3A1E1E", borderRadius: "4px", padding: "16px",
          }}>
            <p style={{ color: "#8C3535", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", margin: "0 0 10px" }}>
              ⚠ Danger Zone
            </p>
            <p style={{ color: "#444", fontSize: "11px", margin: "0 0 12px", lineHeight: 1.5 }}>
              These actions are irreversible. Proceed with caution.
            </p>
            <button
              onClick={clearAllContent}
              disabled={clearState === "saving"}
              style={{
                background: "transparent", color: clearState === "saved" ? "#3D7A4E" : "#8C3535",
                padding: "7px 14px", fontSize: "10px", fontWeight: 600,
                border: `1px solid ${clearState === "saved" ? "#3D7A4E" : "#3A1E1E"}`,
                cursor: clearState === "saving" ? "default" : "pointer",
                borderRadius: "2px", letterSpacing: "0.08em",
              }}
            >
              {saveLabel(clearState, "Clear all site content overrides")}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
