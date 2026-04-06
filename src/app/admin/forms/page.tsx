import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";

export const metadata = { title: "Forms & Leads — ADESSO Admin" };

interface Submission {
  id: string;
  form_name?: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  created_at?: string;
  [key: string]: unknown;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const SITE_FORMS = [
  { name: "Contact Form",     page: "/contact",  fields: ["name", "email", "company", "subject", "message"], active: true },
  { name: "Newsletter Popup", page: "/",         fields: ["email"], active: false },
  { name: "Quote Request",    page: "/services", fields: ["name", "email", "service", "budget", "message"], active: false },
  { name: "Exhibition Brief", page: "/divisions",fields: ["name", "email", "event", "stand_size", "message"], active: false },
];

export default async function FormsPage() {
  const supabase = createAdminSupabase();

  let submissions: Submission[] = [];

  const { data } = await supabase
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  if (data) submissions = data;

  const todayCount = submissions.filter(s => {
    if (!s.created_at) return false;
    const d = new Date(s.created_at);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;

  const weekCount = submissions.filter(s => {
    if (!s.created_at) return false;
    const diff = Date.now() - new Date(s.created_at).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Forms</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Forms & Leads</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>{submissions.length} total submissions</p>
        </div>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#141414", color: "#777", padding: "9px 16px",
            fontSize: "11px", textDecoration: "none", borderRadius: "2px",
            border: "1px solid #252525",
          }}
        >
          View in Supabase →
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Submissions", value: submissions.length, color: "#0066FF" },
          { label: "Today",             value: todayCount,         color: "#3D7A4E" },
          { label: "This Week",         value: weekCount,          color: "#4A6C8C" },
          { label: "Active Forms",      value: SITE_FORMS.filter(f => f.active).length, color: "#6B4C8C" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "28px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>

        {/* Submissions */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Recent Submissions
          </p>
          {submissions.length === 0 ? (
            <div style={{
              background: "#141414", border: "1px solid #1E1E1E",
              borderRadius: "4px", padding: "60px 40px", textAlign: "center",
            }}>
              <p style={{ fontSize: "32px", margin: "0 0 12px", opacity: 0.3 }}>⊡</p>
              <p style={{ color: "#777", fontSize: "13px", fontWeight: 600, margin: "0 0 8px" }}>No submissions yet</p>
              <p style={{ color: "#444", fontSize: "11px", margin: 0, lineHeight: 1.6 }}>
                Form submissions will appear here when visitors contact you.<br />
                Connect your contact form to the <code style={{ color: "#0066FF" }}>form_submissions</code> table.
              </p>
            </div>
          ) : (
            <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
              {submissions.map((s, i) => (
                <div key={s.id} style={{
                  padding: "14px 18px",
                  borderBottom: i < submissions.length - 1 ? "1px solid #1A1A1A" : "none",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: 0 }}>
                        {s.name ?? "Anonymous"}
                      </p>
                      {s.form_name && (
                        <span style={{
                          fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                          textTransform: "uppercase", color: "#555",
                          background: "#1A1A1A", padding: "1px 6px", borderRadius: "8px",
                        }}>
                          {s.form_name}
                        </span>
                      )}
                    </div>
                    <span style={{ color: "#444", fontSize: "10px" }}>
                      {s.created_at ? timeAgo(s.created_at) : ""}
                    </span>
                  </div>
                  <p style={{ color: "#555", fontSize: "11px", margin: "0 0 4px" }}>{s.email}</p>
                  {s.message && (
                    <p style={{
                      color: "#444", fontSize: "11px", margin: 0,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {String(s.message)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Forms List */}
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Site Forms
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {SITE_FORMS.map((f) => (
              <div key={f.name} style={{
                background: "#141414", border: "1px solid #1E1E1E",
                borderRadius: "4px", padding: "14px 16px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: 0 }}>{f.name}</p>
                  <span style={{
                    fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: f.active ? "#3D7A4E" : "#444",
                    background: f.active ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                    padding: "2px 7px", borderRadius: "10px",
                  }}>
                    {f.active ? "● Active" : "○ Draft"}
                  </span>
                </div>
                <p style={{ color: "#444", fontSize: "10px", margin: "0 0 8px" }}>
                  <code style={{ color: "#555" }}>{f.page}</code>
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {f.fields.map(field => (
                    <span key={field} style={{
                      fontSize: "9px", color: "#555",
                      background: "#0D0D0D", padding: "2px 6px",
                      borderRadius: "2px", border: "1px solid #252525",
                    }}>
                      {field}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
