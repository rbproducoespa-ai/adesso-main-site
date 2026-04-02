"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CONTENT_SCHEMA, type ContentField } from "@/lib/content-schema";

type SaveStatus = "idle" | "saving" | "saved" | "error";
type ViewMode  = "desktop" | "tablet" | "mobile";

const VIEW_WIDTHS: Record<ViewMode, string> = {
  desktop: "100%",
  tablet:  "768px",
  mobile:  "390px",
};

const APP_LABELS: Record<string, string> = {
  main:       "Main Site",
  exhibition: "Exhibition",
  automation: "Automation",
  leads:      "Leads",
  lab:        "Lab",
};

const APP_ORDER = ["main", "exhibition", "automation", "leads", "lab"];

function getAppBaseUrl(app?: string): string {
  switch (app) {
    case "exhibition": return (process.env.NEXT_PUBLIC_EXHIBITION_URL ?? "http://localhost:3001").replace(/\/$/, "");
    case "automation": return (process.env.NEXT_PUBLIC_AUTOMATION_URL  ?? "http://localhost:3002").replace(/\/$/, "");
    case "leads":      return (process.env.NEXT_PUBLIC_LEADS_URL        ?? "http://localhost:3003").replace(/\/$/, "");
    case "lab":        return (process.env.NEXT_PUBLIC_LAB_URL          ?? "http://localhost:3004").replace(/\/$/, "");
    default:           return (process.env.NEXT_PUBLIC_SITE_URL         ?? "http://localhost:3000").replace(/\/$/, "");
  }
}

// Group pages by app
const PAGES_BY_APP: Record<string, [string, (typeof CONTENT_SCHEMA)[string]][]> = {};
for (const [key, page] of Object.entries(CONTENT_SCHEMA)) {
  const app = page.app ?? "main";
  if (!PAGES_BY_APP[app]) PAGES_BY_APP[app] = [];
  PAGES_BY_APP[app].push([key, page]);
}

function EditorInner() {
  const searchParams   = useSearchParams();
  const initialPage    = searchParams?.get("page") ?? "home";
  const validInitial   = CONTENT_SCHEMA[initialPage] ? initialPage : "home";

  const [selectedPage,    setSelectedPage]    = useState(validInitial);
  const [selectedSection, setSelectedSection] = useState(
    Object.keys(CONTENT_SCHEMA[validInitial]?.sections ?? {})[0] ?? "hero"
  );
  const [fieldValues,  setFieldValues]  = useState<Record<string, string>>({});
  const [savedValues,  setSavedValues]  = useState<Record<string, Record<string, Record<string, string>>>>({});
  const [saveStatus,   setSaveStatus]   = useState<SaveStatus>("idle");
  const [viewMode,     setViewMode]     = useState<ViewMode>("desktop");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [activeUploadKey, setActiveUploadKey] = useState<string | null>(null);
  const [expandedApps, setExpandedApps] = useState<Record<string, boolean>>(() => {
    // Expand the app that contains the initial page
    const initApp = CONTENT_SCHEMA[validInitial]?.app ?? "main";
    const expanded: Record<string, boolean> = {};
    for (const app of APP_ORDER) expanded[app] = app === initApp;
    return expanded;
  });

  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pageSchema    = CONTENT_SCHEMA[selectedPage];
  const sectionSchema = pageSchema?.sections[selectedSection];
  const currentApp    = pageSchema?.app ?? "main";

  // ── URL sync ─────────────────────────────────────────────────
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", selectedPage);
    window.history.replaceState(null, "", url.toString());
  }, [selectedPage]);

  // ── Load saved content for current page ──────────────────────
  useEffect(() => {
    if (!savedValues[selectedPage]) {
      fetch(`/api/content?app=${currentApp}&page=${selectedPage}`)
        .then(r => r.json())
        .then(({ data }) => {
          const map: Record<string, Record<string, string>> = {};
          for (const row of (data ?? [])) {
            if (!map[row.section]) map[row.section] = {};
            map[row.section][row.key] = row.value;
          }
          setSavedValues(prev => ({ ...prev, [selectedPage]: map }));
        })
        .catch(() => {});
    }
  }, [selectedPage, currentApp]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Populate form when section changes ───────────────────────
  useEffect(() => {
    if (!sectionSchema) return;
    const saved = savedValues[selectedPage]?.[selectedSection] ?? {};
    const vals: Record<string, string> = {};
    for (const [key, field] of Object.entries(sectionSchema.fields)) {
      vals[key] = saved[key] ?? field.default;
    }
    setFieldValues(vals);
  }, [selectedPage, selectedSection, savedValues, sectionSchema]);

  // ── Reload iframe ─────────────────────────────────────────────
  const reloadPreview = useCallback(() => {
    if (!iframeRef.current) return;
    const src = iframeRef.current.src;
    iframeRef.current.src = "";
    setTimeout(() => { if (iframeRef.current) iframeRef.current.src = src; }, 80);
  }, []);

  // ── Page change ───────────────────────────────────────────────
  const handlePageChange = useCallback((page: string) => {
    setSelectedPage(page);
    const firstSection = Object.keys(CONTENT_SCHEMA[page]?.sections ?? {})[0];
    setSelectedSection(firstSection ?? "hero");
    // Auto-expand the app group of the selected page
    const app = CONTENT_SCHEMA[page]?.app ?? "main";
    setExpandedApps(prev => ({ ...prev, [app]: true }));
  }, []);

  // ── Intercept internal link clicks inside iframe ──────────────
  const handleIframeLoad = useCallback(() => {
    try {
      const doc = iframeRef.current?.contentDocument;
      if (!doc) return;
      doc.addEventListener("click", (e) => {
        const a = (e.target as HTMLElement).closest("a");
        if (!a) return;
        const href = a.getAttribute("href");
        if (!href || href.startsWith("http") || href.startsWith("//") ||
            href.startsWith("mailto") || href.startsWith("tel") || href.startsWith("#")) return;
        e.preventDefault();
        e.stopPropagation();
        const cleanHref = href.split("?")[0];
        // Match against pages in the same app
        const match = Object.entries(CONTENT_SCHEMA).find(([, p]) =>
          (p.app ?? "main") === currentApp && p.path === cleanHref
        );
        if (match) {
          handlePageChange(match[0]);
        } else {
          if (iframeRef.current) {
            iframeRef.current.src = getAppBaseUrl(currentApp) + href;
          }
        }
      }, true);
    } catch {
      // Cross-origin — can't intercept
    }
  }, [handlePageChange, currentApp]);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      const results = await Promise.all(
        Object.entries(fieldValues).map(([key, value]) =>
          fetch("/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              app: currentApp,
              page: selectedPage,
              section: selectedSection,
              key, value,
              type:  sectionSchema?.fields[key]?.type  ?? "text",
              label: sectionSchema?.fields[key]?.label ?? key,
            }),
          }).then(r => r.json())
        )
      );
      if (results.some(r => r.error)) throw new Error("Save failed");
      setSavedValues(prev => ({
        ...prev,
        [selectedPage]: {
          ...(prev[selectedPage] ?? {}),
          [selectedSection]: { ...(prev[selectedPage]?.[selectedSection] ?? {}), ...fieldValues },
        },
      }));
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 3000);
      reloadPreview();
    } catch {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleReset = async (key: string) => {
    const defaultVal = sectionSchema?.fields[key]?.default ?? "";
    setFieldValues(prev => ({ ...prev, [key]: defaultVal }));
    await fetch("/api/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ app: currentApp, page: selectedPage, section: selectedSection, key }),
    }).catch(() => {});
  };

  const handleFileUpload = async (key: string, file: File) => {
    setUploadingKey(key);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("key", key);
      const res  = await fetch("/api/content/upload", { method: "POST", body: formData });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      if (url) setFieldValues(prev => ({ ...prev, [key]: url }));
    } catch {
      alert("Upload failed. Paste an image URL directly instead.");
    }
    setUploadingKey(null);
    setActiveUploadKey(null);
  };

  const isModified = (key: string) => {
    const saved = savedValues[selectedPage]?.[selectedSection]?.[key];
    const def   = sectionSchema?.fields[key]?.default ?? "";
    const cur   = fieldValues[key] ?? def;
    return saved !== undefined ? cur !== saved : cur !== def;
  };

  const previewPath = pageSchema?.path ?? "/";
  const baseUrl     = getAppBaseUrl(currentApp);
  const previewUrl  = `${baseUrl}${previewPath}`;

  const modifiedCount = sectionSchema
    ? Object.keys(sectionSchema.fields).filter(k => isModified(k)).length
    : 0;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", height: "100vh", overflow: "hidden",
      background: "#0F0F0F", color: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
    }}>

      {/* ── Left Sidebar: apps + pages + sections ── */}
      <div style={{
        width: "220px", minWidth: "220px",
        background: "#141414", borderRight: "1px solid #252525",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{
          padding: "14px 16px", borderBottom: "1px solid #252525",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <div style={{
            width: "26px", height: "26px", background: "#8C7355",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "11px", fontWeight: 800, flexShrink: 0, color: "#fff",
          }}>A</div>
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", color: "#fff" }}>
            SITE EDITOR
          </span>
        </div>

        {/* App groups + pages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
          {APP_ORDER.filter(app => PAGES_BY_APP[app]?.length).map(app => (
            <div key={app}>
              {/* App group header */}
              <button
                onClick={() => setExpandedApps(prev => ({ ...prev, [app]: !prev[app] }))}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "8px 14px 6px",
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <span style={{
                  fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em",
                  color: currentApp === app ? "#8C7355" : "#444",
                  textTransform: "uppercase",
                }}>
                  {APP_LABELS[app] ?? app}
                </span>
                <span style={{ fontSize: "9px", color: "#333" }}>
                  {expandedApps[app] ? "▾" : "▸"}
                </span>
              </button>

              {/* Pages in this app */}
              {expandedApps[app] && (
                <div>
                  {PAGES_BY_APP[app].map(([pageKey, pageDef]) => (
                    <div key={pageKey}>
                      <button
                        onClick={() => handlePageChange(pageKey)}
                        style={{
                          width: "100%", textAlign: "left", padding: "6px 14px 6px 20px",
                          background: selectedPage === pageKey ? "#8C7355" : "none",
                          border: "none",
                          color: selectedPage === pageKey ? "#fff" : "#777",
                          fontSize: "12px", cursor: "pointer",
                          fontWeight: selectedPage === pageKey ? 600 : 400,
                          transition: "all 0.15s",
                        }}
                      >
                        {pageDef.label}
                      </button>
                      {selectedPage === pageKey && (
                        <div>
                          {Object.entries(pageDef.sections).map(([secKey, secDef]) => (
                            <button
                              key={secKey}
                              onClick={() => setSelectedSection(secKey)}
                              style={{
                                width: "100%", textAlign: "left",
                                padding: "5px 14px 5px 30px",
                                background: "none", border: "none",
                                borderLeft: selectedSection === secKey ? "2px solid #8C7355" : "2px solid transparent",
                                color: selectedSection === secKey ? "#fff" : "#555",
                                fontSize: "11px", cursor: "pointer", transition: "all 0.15s",
                              }}
                            >
                              {secDef.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid #252525", display: "flex", flexDirection: "column", gap: "8px" }}>
          <a href="/admin" style={{ color: "#555", fontSize: "11px", textDecoration: "none" }}>← Dashboard</a>
          <a href="/admin/pages" style={{ color: "#555", fontSize: "11px", textDecoration: "none" }}>← Pages</a>
        </div>
      </div>

      {/* ── Form Panel ── */}
      <div style={{
        width: "340px", minWidth: "340px",
        background: "#1A1A1A", borderRight: "1px solid #252525",
        display: "flex", flexDirection: "column",
      }}>
        {/* Panel header */}
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #252525" }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", color: "#8C7355", textTransform: "uppercase", marginBottom: "2px" }}>
            {APP_LABELS[currentApp] ?? currentApp} › {pageSchema?.label}
          </div>
          <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>
            {sectionSchema?.label ?? "Select a section"}
          </div>
          {modifiedCount > 0 && (
            <div style={{ fontSize: "10px", color: "#8C7355", marginTop: "4px" }}>
              {modifiedCount} field{modifiedCount > 1 ? "s" : ""} modified — not saved yet
            </div>
          )}
        </div>

        {/* Fields */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "18px" }}>
          {!sectionSchema ? (
            <p style={{ color: "#444", fontSize: "13px" }}>Select a section from the sidebar</p>
          ) : Object.entries(sectionSchema.fields).map(([key, field]: [string, ContentField]) => (
            <div key={key}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "10px", fontWeight: 700, color: "#666", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {field.label}
                  {isModified(key) && <span style={{ marginLeft: "6px", color: "#8C7355", fontSize: "9px" }}>● edited</span>}
                </label>
                {isModified(key) && (
                  <button onClick={() => handleReset(key)} style={{ fontSize: "10px", color: "#555", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    Reset
                  </button>
                )}
              </div>

              {field.type === "image" ? (
                <div>
                  {fieldValues[key] && (
                    <div style={{ marginBottom: "8px", aspectRatio: "16/9", overflow: "hidden", background: "#111", borderRadius: "3px", border: "1px solid #2A2A2A" }}>
                      <img src={fieldValues[key]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => (e.currentTarget.style.opacity = "0.2")} />
                    </div>
                  )}
                  <input type="url" value={fieldValues[key] ?? ""} onChange={e => setFieldValues(prev => ({ ...prev, [key]: e.target.value }))} placeholder="https://images.unsplash.com/..." style={{ width: "100%", padding: "8px 10px", background: "#111", border: "1px solid #2A2A2A", color: "#fff", fontSize: "12px", borderRadius: "3px", boxSizing: "border-box", marginBottom: "6px" }} />
                  <button onClick={() => { setActiveUploadKey(key); fileInputRef.current?.click(); }} disabled={uploadingKey === key} style={{ width: "100%", padding: "7px", background: "#252525", border: "1px dashed #333", color: "#777", fontSize: "11px", borderRadius: "3px", cursor: uploadingKey === key ? "default" : "pointer" }}>
                    {uploadingKey === key ? "Uploading..." : "↑ Upload from computer"}
                  </button>
                </div>
              ) : field.type === "textarea" ? (
                <textarea value={fieldValues[key] ?? ""} onChange={e => setFieldValues(prev => ({ ...prev, [key]: e.target.value }))} rows={4} style={{ width: "100%", padding: "8px 10px", background: "#111", border: "1px solid #2A2A2A", color: "#ccc", fontSize: "13px", borderRadius: "3px", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
              ) : (
                <input type="text" value={fieldValues[key] ?? ""} onChange={e => setFieldValues(prev => ({ ...prev, [key]: e.target.value }))} style={{ width: "100%", padding: "8px 10px", background: "#111", border: "1px solid #2A2A2A", color: "#fff", fontSize: "13px", borderRadius: "3px", boxSizing: "border-box" }} />
              )}
            </div>
          ))}
        </div>

        {/* Save */}
        <div style={{ padding: "14px 18px", borderTop: "1px solid #252525" }}>
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            style={{
              width: "100%", padding: "12px",
              background: saveStatus === "saved" ? "#2D5A27" : saveStatus === "error" ? "#6B2727" : "#8C7355",
              border: "none", color: "#fff", fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: saveStatus === "saving" ? "default" : "pointer",
              borderRadius: "3px", transition: "background 0.2s",
            }}
          >
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "✓ Saved!" : saveStatus === "error" ? "⚠ Error — Try again" : "Save & Publish"}
          </button>
          <p style={{ fontSize: "10px", color: "#333", textAlign: "center", marginTop: "8px", marginBottom: 0 }}>
            Changes go live immediately after saving
          </p>
        </div>
      </div>

      {/* ── Preview Panel ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0A0A0A", minWidth: 0 }}>
        {/* Toolbar */}
        <div style={{
          height: "46px", background: "#141414",
          borderBottom: "1px solid #252525",
          display: "flex", alignItems: "center",
          padding: "0 16px", gap: "12px", flexShrink: 0,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
            <span style={{ fontSize: "10px", color: "#444", flexShrink: 0 }}>Preview:</span>
            <span style={{ fontSize: "10px", color: "#555", flexShrink: 0 }}>
              {APP_LABELS[currentApp] ?? currentApp} ›
            </span>
            <span style={{ fontSize: "11px", color: "#8C7355", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {pageSchema?.label}
            </span>
            <span style={{ fontSize: "11px", color: "#333", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {previewUrl}
            </span>
          </div>

          {/* View mode */}
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            {(["desktop", "tablet", "mobile"] as ViewMode[]).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)} style={{
                padding: "4px 10px", fontSize: "10px", fontWeight: 600,
                background: viewMode === mode ? "#8C7355" : "#252525",
                border: "none", color: "#fff", cursor: "pointer", borderRadius: "3px",
                textTransform: "capitalize",
              }}>
                {mode === "desktop" ? "🖥" : mode === "tablet" ? "⬜" : "📱"} {mode}
              </button>
            ))}
          </div>

          <button onClick={reloadPreview} title="Reload preview" style={{ padding: "4px 10px", fontSize: "14px", background: "#252525", border: "none", color: "#888", cursor: "pointer", borderRadius: "3px", flexShrink: 0 }}>↻</button>
        </div>

        {/* Iframe */}
        <div style={{
          flex: 1, display: "flex",
          alignItems: "flex-start", justifyContent: "center",
          padding: viewMode === "desktop" ? "0" : "20px",
          overflow: "auto", background: "#0A0A0A",
        }}>
          <div style={{
            width: VIEW_WIDTHS[viewMode], maxWidth: "100%",
            height: viewMode === "desktop" ? "100%" : "calc(100vh - 86px)",
            boxShadow: viewMode !== "desktop" ? "0 0 40px rgba(0,0,0,0.8)" : "none",
            transition: "width 0.3s", flexShrink: 0,
          }}>
            <iframe
              ref={iframeRef}
              key={previewUrl}
              src={previewUrl}
              onLoad={handleIframeLoad}
              style={{ width: "100%", height: "100%", border: "none", display: "block", background: "#fff" }}
              title="Site Preview"
            />
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file && activeUploadKey) handleFileUpload(activeUploadKey, file);
          e.target.value = "";
        }}
      />
    </div>
  );
}

export default function SiteEditorPage() {
  return (
    <Suspense fallback={null}>
      <EditorInner />
    </Suspense>
  );
}
