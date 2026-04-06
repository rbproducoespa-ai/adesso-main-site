import { createAdminSupabase } from "@/lib/supabase-admin";
import { InboxClient } from "./_components/InboxClient";

export const metadata = { title: "Inbox — ADESSO Admin" };

export default async function InboxPage() {
  const supabase = createAdminSupabase();

  const { data: messages } = await supabase
    .from("form_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const msgs = messages ?? [];
  const unread = msgs.filter(m => !m.read).length;

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Inbox</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: "0", display: "flex", gap: "10px", alignItems: "center" }}>
            Inbox
            {unread > 0 && (
              <span style={{
                background: "#0066FF", color: "#fff",
                fontSize: "11px", fontWeight: 700,
                padding: "2px 8px", borderRadius: "20px",
              }}>
                {unread} new
              </span>
            )}
          </h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Messages from site contact forms</p>
        </div>
        <a
          href="mailto:contact@adesso.digital"
          style={{
            background: "#0066FF", color: "#fff", padding: "9px 18px",
            fontSize: "11px", fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
          }}
        >
          ✉ Compose
        </a>
      </div>

      {msgs.length === 0 ? (
        <div style={{
          background: "#141414", border: "1px solid #1E1E1E",
          borderRadius: "4px", padding: "80px 40px", textAlign: "center",
        }}>
          <p style={{ fontSize: "40px", margin: "0 0 16px", opacity: 0.2 }}>▣</p>
          <p style={{ color: "#777", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>Your inbox is empty</p>
          <p style={{ color: "#444", fontSize: "12px", margin: 0, lineHeight: 1.6 }}>
            Messages from your contact form will appear here.<br />
            Form submissions save to the <code style={{ color: "#0066FF" }}>form_submissions</code> table in Supabase.
          </p>
        </div>
      ) : (
        <InboxClient messages={msgs} />
      )}

    </div>
  );
}
