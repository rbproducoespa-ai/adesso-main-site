import { createAdminSupabase } from "@/lib/supabase-admin";
import Link from "next/link";

export const metadata = { title: "Ecommerce — ADESSO Admin" };

function statusColor(status: string) {
  if (status === "paid" || status === "delivered") return "#3D7A4E";
  if (status === "pending") return "#0066FF";
  if (status === "cancelled") return "#8C3535";
  return "#555";
}

function fmt(pence: string | number) {
  return `£${(Number(pence) / 100).toFixed(2)}`;
}

export default async function EcommercePage() {
  const supabase = createAdminSupabase();

  const [
    { count: total },
    { count: paid },
    { count: pending },
    { count: cancelled },
    { data: orders },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "paid"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "cancelled"),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(30),
  ]);

  const revenue = (orders ?? [])
    .filter(o => o.status === "paid" || o.status === "delivered")
    .reduce((s, o) => s + Number(o.amount_pence || 0), 0);

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Ecommerce</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>Ecommerce</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>Orders, payments and revenue</p>
        </div>
        <Link
          href="/admin/orders"
          style={{
            background: "#0066FF", color: "#fff", padding: "9px 18px",
            fontSize: "11px", fontWeight: 700, textDecoration: "none",
            letterSpacing: "0.12em", textTransform: "uppercase", borderRadius: "2px",
          }}
        >
          Manage Orders →
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total Orders",  value: total ?? 0,               color: "#0066FF" },
          { label: "Paid",          value: paid ?? 0,                color: "#3D7A4E" },
          { label: "Pending",       value: pending ?? 0,             color: "#0066FF" },
          { label: "Cancelled",     value: cancelled ?? 0,           color: "#8C3535" },
          { label: "Total Revenue", value: fmt(revenue),             color: "#4A6C8C" },
        ].map(s => (
          <div key={s.label} style={{
            background: "#141414", border: "1px solid #1E1E1E",
            borderRadius: "4px", padding: "18px 20px",
          }}>
            <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ color: s.color, fontSize: typeof s.value === "string" ? "20px" : "28px", fontWeight: 700, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Products */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: 0 }}>
            Service Products
          </p>
          <Link href="/admin/pages" style={{ color: "#0066FF", fontSize: "11px", textDecoration: "none" }}>
            Edit on site →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
          {[
            { name: "Exhibition Stand Design",   price: "From £2,500",  category: "Exhibition",  status: "active" },
            { name: "Process Automation Setup",  price: "From £1,800",  category: "Automation",  status: "active" },
            { name: "B2B Lead Database",         price: "From £490",    category: "Leads",       status: "active" },
            { name: "Full Digital Package",      price: "Custom Quote", category: "Bundle",      status: "active" },
            { name: "Lab SaaS Access",           price: "From £99/mo",  category: "Lab",         status: "coming-soon" },
            { name: "Monthly Retainer",          price: "From £1,200",  category: "Retainer",    status: "active" },
          ].map(p => (
            <div key={p.name} style={{
              background: "#141414", border: "1px solid #1E1E1E",
              borderRadius: "4px", padding: "14px 16px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <p style={{ color: "#ddd", fontSize: "12px", fontWeight: 600, margin: 0, flex: 1 }}>{p.name}</p>
                <span style={{
                  fontSize: "9px", fontWeight: 700,
                  color: p.status === "active" ? "#3D7A4E" : "#555",
                  background: p.status === "active" ? "rgba(61,122,78,0.12)" : "#1A1A1A",
                  padding: "1px 6px", borderRadius: "8px", flexShrink: 0, marginLeft: "8px",
                }}>
                  {p.status === "active" ? "● Live" : "Soon"}
                </span>
              </div>
              <p style={{ color: "#0066FF", fontSize: "12px", fontWeight: 700, margin: "0 0 4px" }}>{p.price}</p>
              <p style={{ color: "#444", fontSize: "9px", margin: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>{p.category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      {orders && orders.length > 0 && (
        <div>
          <p style={{ color: "#333", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 12px" }}>
            Recent Orders
          </p>
          <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Product", "Customer", "Amount", "Status", "Date"].map(h => (
                    <th key={h} style={{
                      padding: "10px 16px", textAlign: "left",
                      fontSize: "9px", fontWeight: 700, letterSpacing: "0.14em",
                      textTransform: "uppercase", color: "#333",
                      borderBottom: "1px solid #1A1A1A",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((o: {
                  id: string; product_name: string; customer_email: string;
                  amount_pence: string; status: string; created_at: string;
                }) => (
                  <tr key={o.id} style={{ borderBottom: "1px solid #181818" }}>
                    <td style={{ padding: "10px 16px", color: "#ccc", fontSize: "12px" }}>{o.product_name}</td>
                    <td style={{ padding: "10px 16px", color: "#555", fontSize: "11px" }}>{o.customer_email}</td>
                    <td style={{ padding: "10px 16px", color: "#0066FF", fontSize: "12px", fontWeight: 600 }}>{fmt(o.amount_pence)}</td>
                    <td style={{ padding: "10px 16px" }}>
                      <span style={{
                        fontSize: "9px", fontWeight: 700, textTransform: "uppercase",
                        color: statusColor(o.status), letterSpacing: "0.1em",
                      }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 16px", color: "#444", fontSize: "10px" }}>
                      {new Date(o.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
