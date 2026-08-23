"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { CURRENT_PHASE, NAV_GROUPS } from "@/lib/network/constants";

export function NetworkShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) =>
    href === "/network" ? pathname === "/network" : pathname.startsWith(href);

  const current = NAV_GROUPS.flatMap((g) => g.items).find((i) => isActive(i.href));

  return (
    <div className="fixed inset-0 z-[100] flex bg-bg-primary font-sans text-text-primary">
      <aside
        className={`flex flex-col overflow-hidden border-r border-border bg-bg-secondary transition-[width] duration-200 ${
          collapsed ? "w-[68px]" : "w-[236px]"
        }`}
      >
        <div className="flex flex-shrink-0 items-center gap-2.5 border-b border-border p-4">
          <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-accent text-[11px] font-extrabold text-white">
            CN
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-[12px] font-semibold leading-tight">
                Creator Network OS
              </div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-text-muted">
                Phase {CURRENT_PHASE}
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              {!collapsed && (
                <div className="px-4 pb-1 pt-3.5 text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const active = isActive(item.href);
                const locked = item.phase > CURRENT_PHASE;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-3 px-4 py-2 text-[13px] transition-colors ${
                      active
                        ? "border-l-2 border-accent bg-accent/10 text-text-primary"
                        : "border-l-2 border-transparent text-text-secondary hover:bg-bg-card hover:text-text-primary"
                    }`}
                  >
                    <span className="w-4 flex-shrink-0 text-center text-[13px]">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.label}</span>
                        {locked && (
                          <span className="text-[9px] font-mono text-text-muted">P{item.phase}</span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="flex-shrink-0 border-t border-border p-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full rounded-sm px-2 py-1.5 text-left text-[11px] text-text-muted hover:text-text-primary"
          >
            {collapsed ? "»" : "« Collapse"}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-[52px] flex-shrink-0 items-center gap-3 border-b border-border bg-bg-secondary px-7">
          <span className="text-[13px] font-semibold">{current?.label ?? "Creator Network OS"}</span>
          <span className="ml-auto text-[11px] text-text-muted">{userEmail}</span>
          <Link href="/admin" className="text-[11px] text-text-secondary hover:text-accent">
            Adesso Admin →
          </Link>
        </header>

        <main className="flex-1 overflow-y-auto bg-bg-primary">{children}</main>
      </div>
    </div>
  );
}
