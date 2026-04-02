import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";
import { ContactsClient } from "./_components/ContactsClient";

export const metadata = { title: "CRM / Contacts — ADESSO Admin" };

interface Contact {
  id: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
  source?: string;
  status?: string;
  notes?: string;
  created_at?: string;
}

export default async function ContactsPage() {
  const supabase = createAdminSupabase();

  let contacts: Contact[] = [];
  let tableUsed = "contacts";

  const { data: contactsData, error: contactsError } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (!contactsError && contactsData) {
    contacts = contactsData;
    tableUsed = "contacts";
  } else {
    const { data: formsData } = await supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (formsData) {
      contacts = formsData;
      tableUsed = "form_submissions";
    }
  }

  const newCount       = contacts.filter(c => !c.status || c.status === "new").length;
  const contactedCount = contacts.filter(c => c.status === "contacted").length;
  const qualifiedCount = contacts.filter(c => c.status === "qualified").length;

  const STATS = [
    { label: "Total Leads",  value: contacts.length, color: "#8C7355" },
    { label: "New",          value: newCount,         color: "#8C3535" },
    { label: "Contacted",    value: contactedCount,   color: "#4A6C8C" },
    { label: "Qualified",    value: qualifiedCount,   color: "#3D7A4E" },
  ];

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › CRM</p>
        <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>CRM / Contacts</h2>
        <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>
          {contacts.length} total leads · Table: <code style={{ color: "#8C7355" }}>{tableUsed}</code>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {STATS.map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: "28px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table — Client component for interactive status updates */}
      {contacts.length === 0 ? (
        <div style={{
          background: "#141414", border: "1px solid #1E1E1E",
          borderRadius: "4px", padding: "60px 40px", textAlign: "center",
        }}>
          <p style={{ fontSize: "32px", margin: "0 0 12px", opacity: 0.3 }}>◉</p>
          <p style={{ color: "#777", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>No contacts yet</p>
          <p style={{ color: "#444", fontSize: "12px", margin: 0, lineHeight: 1.6 }}>
            Contacts from your website forms will appear here.<br />
            Make sure your forms are connected to the <code style={{ color: "#8C7355" }}>contacts</code> Supabase table.
          </p>
        </div>
      ) : (
        <ContactsClient contacts={contacts} tableUsed={tableUsed} />
      )}

    </div>
  );
}
