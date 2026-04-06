import { createServerSupabase } from "@/lib/supabase-server";
import { createAdminSupabase } from "@/lib/supabase-admin";

export const metadata = { title: "User Roles — ADESSO Admin" };

const ROLES = [
  {
    name: "Admin",     color: "#0066FF",
    desc: "Full access to all features including settings, user management and dev tools",
    permissions: ["Dashboard", "Site Editor", "All Pages", "Media", "SEO", "Blog", "Ecommerce", "CRM", "Forms", "Automations", "Analytics", "Settings", "Roles", "Database", "Dev Mode"],
  },
  {
    name: "Editor",    color: "#4A6C8C",
    desc: "Can edit site content, manage blog and media. No access to settings or user management",
    permissions: ["Dashboard", "Site Editor", "Pages", "Media", "Blog", "Analytics"],
  },
  {
    name: "Marketing", color: "#3D7A4E",
    desc: "Access to leads, forms, analytics and marketing tools. Cannot edit site design",
    permissions: ["Dashboard", "CRM / Contacts", "Forms", "Inbox", "Marketing Tools", "Automations", "Analytics"],
  },
  {
    name: "Developer", color: "#6B4C8C",
    desc: "Technical access including database, dev mode and API settings",
    permissions: ["Dashboard", "Database", "Dev Mode", "Settings", "Site Editor"],
  },
];

export default async function RolesPage() {
  // Use server supabase for session-based user identity
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  // Use admin supabase to count total users (requires service role)
  const adminSupabase = createAdminSupabase();
  const { data: allUsers } = await adminSupabase.auth.admin.listUsers().catch(() => ({ data: null }));
  const totalUsers = (allUsers as { users?: unknown[] } | null)?.users?.length ?? 0;

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Roles</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>User Roles & Permissions</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Manage team access and permission levels</p>
        </div>
        {/* Link to Supabase dashboard for actual user invite */}
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#0066FF", color: "#fff", padding: "9px 18px",
            fontSize: "11px", fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
          }}
        >
          + Invite User
        </a>
      </div>

      {/* Current User */}
      <div style={{
        background: "#141414", border: "1px solid #1E1E1E",
        borderRadius: "4px", padding: "16px 20px",
        display: "flex", gap: "14px", alignItems: "center",
        marginBottom: "28px",
      }}>
        <div style={{
          width: "36px", height: "36px", background: "#0066FF",
          borderRadius: "50%", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#fff",
          flexShrink: 0,
        }}>
          {user?.email?.charAt(0).toUpperCase() ?? "A"}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#ddd", fontSize: "13px", fontWeight: 600, margin: "0 0 2px" }}>
            {user?.email ?? "Admin User"}
          </p>
          <p style={{ color: "#555", fontSize: "11px", margin: 0 }}>Logged in · Current session</p>
        </div>
        <span style={{
          fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em",
          textTransform: "uppercase", color: "#0066FF",
          background: "rgba(140,115,85,0.12)", padding: "4px 10px", borderRadius: "10px",
        }}>
          Admin
        </span>
      </div>

      {/* Roles Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "28px" }}>
        {ROLES.map((role) => (
          <div key={role.name} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
            borderTop: `3px solid ${role.color}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700, margin: 0 }}>{role.name}</p>
              {/* Link to Supabase to actually edit RLS policies */}
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "none", border: "1px solid #252525", color: "#555",
                  fontSize: "10px", padding: "3px 10px", borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Edit in Supabase
              </a>
            </div>
            <p style={{ color: "#555", fontSize: "11px", margin: "0 0 14px", lineHeight: 1.6 }}>{role.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
              {role.permissions.map(p => (
                <span key={p} style={{
                  fontSize: "9px", fontWeight: 700,
                  color: role.color,
                  background: `${role.color}14`,
                  padding: "2px 7px", borderRadius: "8px",
                  letterSpacing: "0.06em",
                }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Supabase RLS note */}
      <div style={{
        background: "#0D0D0D", border: "1px solid #1E1E1E",
        borderRadius: "4px", padding: "16px 20px",
        display: "flex", gap: "12px",
      }}>
        <span style={{ fontSize: "16px", flexShrink: 0 }}>⬡</span>
        <div>
          <p style={{ color: "#777", fontSize: "12px", fontWeight: 600, margin: "0 0 4px" }}>Row-Level Security (RLS) in Supabase</p>
          <p style={{ color: "#444", fontSize: "11px", margin: 0, lineHeight: 1.6 }}>
            Permissions are enforced at the database level via Supabase RLS policies.
            User roles are stored in <code style={{ color: "#0066FF" }}>auth.users.user_metadata.role</code>.
            Update the role by editing user metadata in the Supabase Auth dashboard.
          </p>
        </div>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#0066FF", fontSize: "11px", textDecoration: "none",
            whiteSpace: "nowrap", alignSelf: "center",
          }}
        >
          Open Supabase →
        </a>
      </div>

    </div>
  );
}
