"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Site",
    items: [
      { href: "/admin",        label: "Dashboard",   icon: "⊞" },
      { href: "/admin/editor", label: "Site Editor", icon: "✏" },
      { href: "/admin/blog",   label: "Blog",        icon: "≡" },
      { href: "/admin/media",  label: "Media",       icon: "◈" },
    ],
  },
  {
    label: "Leads",
    items: [
      { href: "/admin/contacts", label: "CRM / Contacts", icon: "◉" },
      { href: "/admin/forms",    label: "Forms & Leads",  icon: "⊡" },
      { href: "/admin/inbox",    label: "Inbox",          icon: "▣" },
    ],
  },
  {
    label: "Performance",
    items: [
      { href: "/admin/seo",       label: "SEO Manager", icon: "⌖" },
      { href: "/admin/analytics", label: "Analytics",   icon: "↗" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/settings", label: "Settings",       icon: "⚙" },
      { href: "/admin/roles",    label: "User Roles",     icon: "⊕" },
      { href: "/admin/devmode",  label: "Developer Mode", icon: "⌨" },
    ],
  },
];

const S = {
  shell: {
    position: "fixed" as const, inset: 0, zIndex: 100,
    display: "flex", background: "#04040A",
    fontFamily: "Inter, -apple-system, sans-serif",
  },
  sidebar: {
    width: "232px", minWidth: "232px",
    background: "#080D1A",
    borderRight: "1px solid #1A2540",
    display: "flex", flexDirection: "column" as const,
    overflow: "hidden",
  },
  logo: {
    padding: "18px 18px 16px",
    borderBottom: "1px solid #1A2540",
    display: "flex", alignItems: "center", gap: "10px",
    flexShrink: 0,
  },
  logoMark: {
    width: "30px", height: "30px",
    background: "#0066FF",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "12px", fontWeight: 800, color: "#fff",
    flexShrink: 0,
  },
  nav: { flex: 1, overflowY: "auto" as const, padding: "8px 0" },
  groupLabel: {
    padding: "14px 16px 4px",
    fontSize: "9px", fontWeight: 700,
    letterSpacing: "0.2em", textTransform: "uppercase" as const,
    color: "#1A2540",
  },
  main: { flex: 1, display: "flex", flexDirection: "column" as const, overflow: "hidden" },
  topbar: {
    height: "52px", background: "#080D1A",
    borderBottom: "1px solid #1A2540",
    display: "flex", alignItems: "center",
    padding: "0 28px", gap: "12px",
    flexShrink: 0,
  },
  content: { flex: 1, overflowY: "auto" as const, background: "#04040A" },
  bottomBar: {
    padding: "12px 16px",
    borderTop: "1px solid #1A2540",
    flexShrink: 0,
  },
};

export function AdminShell({ children, userEmail }: { children: React.ReactNode; userEmail: string }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Active check: exact match for /admin, prefix match for others
  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  // Current page label
  const currentLabel = NAV_GROUPS
    .flatMap(g => g.items)
    .find(i => isActive(i.href))?.label ?? "Admin Studio";

  return (
    <div style={S.shell}>

      {/* ── Sidebar ──────────────────────────────────────────────────── */}
      <aside style={{ ...S.sidebar, width: sidebarCollapsed ? "56px" : "232px", transition: "width 0.2s" }}>

        {/* Logo */}
        <a href="/" style={{ ...S.logo, textDecoration: "none" }} title="Back to site">
          <div style={S.logoMark}>A</div>
          {!sidebarCollapsed && (
            <div>
              <p style={{ color: "#F0F4FF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", margin: 0 }}>ADESSO</p>
              <p style={{ color: "#4A5A7A", fontSize: "9px", letterSpacing: "0.16em", margin: 0, textTransform: "uppercase" }}>Admin Studio</p>
            </div>
          )}
        </a>

        {/* Nav */}
        <nav style={S.nav}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {!sidebarCollapsed && (
                <div style={S.groupLabel}>{group.label}</div>
              )}
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex", alignItems: "center",
                      gap: sidebarCollapsed ? 0 : "10px",
                      padding: sidebarCollapsed ? "10px 18px" : "8px 16px",
                      background: active ? "rgba(0,102,255,0.12)" : "transparent",
                      borderLeft: active ? "2px solid #0066FF" : "2px solid transparent",
                      color: active ? "#F0F4FF" : "#4A5A7A",
                      fontSize: "12px",
                      fontWeight: active ? 600 : 400,
                      textDecoration: "none",
                      transition: "all 0.12s",
                      justifyContent: sidebarCollapsed ? "center" : "flex-start",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <span style={{ fontSize: "14px", flexShrink: 0, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                    {!sidebarCollapsed && <span>{item.label}</span>}
                    {!sidebarCollapsed && item.badge && (
                      <span style={{
                        marginLeft: "auto", fontSize: "9px", fontWeight: 700,
                        background: "#0066FF", color: "#fff",
                        padding: "1px 5px", borderRadius: "10px",
                      }}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={S.bottomBar}>
          {!sidebarCollapsed && (
            <p style={{ color: "#4A5A7A", fontSize: "10px", margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {userEmail}
            </p>
          )}
          <div style={{ display: "flex", gap: "8px", justifyContent: sidebarCollapsed ? "center" : "flex-start" }}>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#0066FF", fontSize: "11px", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "4px",
              }}
              title="View Site"
            >
              <span>↗</span>
              {!sidebarCollapsed && <span>View Site</span>}
            </a>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────────────────────── */}
      <div style={S.main}>

        {/* Top bar */}
        <div style={S.topbar}>
          <button
            onClick={() => setSidebarCollapsed(p => !p)}
            style={{
              background: "none", border: "none", color: "#555",
              fontSize: "16px", cursor: "pointer", padding: "4px",
              flexShrink: 0,
            }}
            title="Toggle Sidebar"
          >
            ☰
          </button>

          <h1 style={{ fontSize: "13px", fontWeight: 600, color: "#8899BB", margin: 0, flex: 1 }}>
            {currentLabel}
          </h1>

          {/* Quick links */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <Link
              href="/admin/editor"
              style={{
                background: "#0066FF", color: "#fff",
                padding: "6px 14px", fontSize: "10px",
                fontWeight: 700, textDecoration: "none",
                letterSpacing: "0.12em", textTransform: "uppercase",
                borderRadius: "2px", flexShrink: 0,
              }}
            >
              ✏ Editor
            </Link>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#0D1525", color: "#8899BB",
                padding: "6px 12px", fontSize: "10px",
                fontWeight: 600, textDecoration: "none",
                letterSpacing: "0.1em", borderRadius: "2px",
                border: "1px solid #1A2540",
              }}
            >
              ↗ Live
            </a>
          </div>
        </div>

        {/* Page content */}
        <div style={S.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
