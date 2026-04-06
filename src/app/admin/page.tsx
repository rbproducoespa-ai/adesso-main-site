import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";
import { QuickActions } from "./_components/DashboardClient";

export const metadata = { title: "Dashboard — Adesso Admin" };

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default async function AdminDashboardPage() {
  const supabase = createAdminSupabase();

  const [
    { count: totalWaitlist },
    { count: totalContacts },
    { count: newContacts },
    { data: recentContacts },
    { data: recentWaitlist },
  ] = await Promise.all([
    supabase.from("waitlist").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }),
    supabase.from("contacts").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contacts")
      .select("id,name,email,company,message,created_at,status")
      .order("created_at", { ascending: false })
      .limit(8),
    supabase.from("waitlist")
      .select("id,email,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const STATS = [
    { label: "Waitlist Signups",   value: totalWaitlist ?? 0,  color: "#0066FF", href: "/admin/contacts" },
    { label: "Total Enquiries",    value: totalContacts ?? 0,  color: "#00D4FF", href: "/admin/contacts" },
    { label: "New (Unread)",       value: newContacts ?? 0,    color: "#00E5A0", href: "/admin/contacts" },
    { label: "Early Access Goal",  value: "100",               color: "#4A5A7A", href: "/admin/contacts" },
  ];

  const QUICK_ACTIONS = [
    { label: "Site Editor",     href: "/admin/editor",      icon: "✏", desc: "Edit page content and copy" },
    { label: "Blog",            href: "/admin/blog",        icon: "≡", desc: "Create & manage posts" },
    { label: "CRM / Contacts",  href: "/admin/contacts",    icon: "◉", desc: "Leads & enquiry history" },
    { label: "Forms & Leads",   href: "/admin/forms",       icon: "⊡", desc: "Form submissions" },
    { label: "Inbox",           href: "/admin/inbox",       icon: "▣", desc: "Messages & notifications" },
    { label: "Media Manager",   href: "/admin/media",       icon: "◈", desc: "Upload & organise files" },
    { label: "SEO Manager",     href: "/admin/seo",         icon: "⌖", desc: "Meta tags & page titles" },
    { label: "Analytics",       href: "/admin/analytics",   icon: "↗", desc: "Traffic & conversion data" },
    { label: "Settings",        href: "/admin/settings",    icon: "⚙", desc: "Domain, email, config" },
  ];

  return (
    <div style={{ padding: "28px 32px", maxWidth: "1200px" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#4A5A7A", fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 4px", fontFamily: "monospace" }}>
          ADESSO DIGITAL
        </p>
        <h2 style={{ color: "#F0F4FF", fontSize: "22px", fontWeight: 700, margin: 0 }}>Admin Studio</h2>
      </div>

      {/* ── Stats ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {STATS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              background: "#0D1525", border: "1px solid #1A2540",
              borderRadius: "4px", padding: "18px 20px",
              textDecoration: "none", display: "block",
            }}
          >
            <p style={{ color: "#4A5A7A", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px", fontFamily: "monospace" }}>
              {s.label}
            </p>
            <p style={{ color: s.color, fontSize: "30px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em", fontFamily: "monospace" }}>
              {s.value}
            </p>
          </Link>
        ))}
      </div>

      {/* ── Body Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", marginBottom: "28px" }}>

        {/* Recent Enquiries */}
        <div style={{ background: "#0D1525", border: "1px solid #1A2540", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{
            padding: "14px 20px", borderBottom: "1px solid #1A2540",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <p style={{ color: "#F0F4FF", fontSize: "12px", fontWeight: 700, margin: 0 }}>Recent Enquiries</p>
            <Link href="/admin/contacts" style={{ color: "#0066FF", fontSize: "11px", textDecoration: "none" }}>
              View all →
            </Link>
          </div>

          {!recentContacts || recentContacts.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <p style={{ color: "#4A5A7A", fontSize: "13px", margin: 0 }}>No enquiries yet</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Name", "Company", "Email", "Status", "Time"].map((h) => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                      textTransform: "uppercase", color: "#4A5A7A",
                      borderBottom: "1px solid #1A2540", fontFamily: "monospace",
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentContacts ?? []).map((c: {
                  id: string; name: string; email: string;
                  company: string | null; status: string; created_at: string;
                }) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #0D1525" }}>
                    <td style={{ padding: "10px 16px", fontSize: "12px", color: "#F0F4FF", fontWeight: 600 }}>
                      {c.name}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "12px", color: "#8899BB" }}>
                      {c.company ?? "—"}
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "11px", color: "#4A5A7A", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.email}
                    </td>
                    <td style={{ padding: "10px 16px" }}>
                      <span style={{
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", fontFamily: "monospace",
                        color: c.status === "new" ? "#00E5A0" : "#4A5A7A",
                        background: c.status === "new" ? "rgba(0,229,160,0.1)" : "transparent",
                        padding: c.status === "new" ? "2px 6px" : "0",
                        borderRadius: "2px",
                      }}>
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", fontSize: "10px", color: "#4A5A7A", fontFamily: "monospace" }}>
                      {timeAgo(c.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent Waitlist */}
        <div style={{ background: "#0D1525", border: "1px solid #1A2540", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid #1A2540" }}>
            <p style={{ color: "#F0F4FF", fontSize: "12px", fontWeight: 700, margin: 0 }}>Waitlist</p>
          </div>

          {!recentWaitlist || recentWaitlist.length === 0 ? (
            <div style={{ padding: "32px 20px", textAlign: "center" }}>
              <p style={{ color: "#4A5A7A", fontSize: "13px", margin: 0 }}>No signups yet</p>
            </div>
          ) : (
            <div>
              {(recentWaitlist ?? []).map((w: { id: string; email: string; created_at: string }) => (
                <div
                  key={w.id}
                  style={{
                    padding: "12px 20px", borderBottom: "1px solid #1A2540",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#8899BB", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    {w.email}
                  </span>
                  <span style={{ fontSize: "10px", color: "#4A5A7A", fontFamily: "monospace", flexShrink: 0, marginLeft: "8px" }}>
                    {timeAgo(w.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div style={{ padding: "12px 20px", borderTop: "1px solid #1A2540" }}>
            <Link href="/admin/contacts" style={{ color: "#0066FF", fontSize: "11px", textDecoration: "none" }}>
              View all signups →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <p style={{ color: "#4A5A7A", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "12px", fontFamily: "monospace" }}>
          Quick Actions
        </p>
        <QuickActions actions={QUICK_ACTIONS} />
      </div>

    </div>
  );
}
