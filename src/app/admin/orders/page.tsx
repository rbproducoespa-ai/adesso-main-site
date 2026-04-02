import Link from "next/link";
import { createAdminSupabase } from "@/lib/supabase-admin";

export const metadata = { title: "Orders — ADESSO Admin" };

function statusColor(status: string) {
  if (status === "delivered") return ["#3D7A4E", "rgba(61,122,78,0.12)"];
  if (status === "paid")      return ["#8C7355", "rgba(140,115,85,0.12)"];
  if (status === "cancelled") return ["#8C3535", "rgba(140,53,53,0.12)"];
  return ["#555", "#1A1A1A"];
}

export default async function AdminOrdersPage() {
  const supabase = createAdminSupabase();

  const [
    { count: total },
    { count: paid },
    { count: delivered },
    { count: pending },
    { data: orders },
  ] = await Promise.all([
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "paid"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "delivered"),
    supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
  ]);

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>Admin › Orders</p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>All Orders</h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>{total ?? 0} total orders</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "28px" }}>
        {[
          { label: "Total",     value: total ?? 0,     color: "#8C7355" },
          { label: "Paid",      value: paid ?? 0,      color: "#3D7A4E" },
          { label: "Delivered", value: delivered ?? 0, color: "#4A6C8C" },
          { label: "Pending",   value: pending ?? 0,   color: "#555"    },
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

      {/* Table */}
      {!orders || orders.length === 0 ? (
        <div style={{
          background: "#141414", border: "1px solid #1E1E1E",
          borderRadius: "4px", padding: "60px 40px", textAlign: "center",
        }}>
          <p style={{ fontSize: "32px", margin: "0 0 12px", opacity: 0.3 }}>◻</p>
          <p style={{ color: "#777", fontSize: "14px", fontWeight: 600, margin: "0 0 8px" }}>No orders yet</p>
          <p style={{ color: "#444", fontSize: "12px", margin: 0 }}>
            Orders will appear here once customers complete checkout.
          </p>
        </div>
      ) : (
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["#", "Customer", "Product", "Amount", "Date", "Status", "Action"].map(h => (
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
              {(orders as Record<string, string>[]).map((o) => {
                const [fg, bg] = statusColor(o.status);
                return (
                  <tr key={o.id} style={{ borderBottom: "1px solid #181818" }}>
                    <td style={{ padding: "12px 16px" }}>
                      <code style={{ color: "#444", fontSize: "10px" }}>#{o.id.slice(0, 8)}</code>
                    </td>
                    <td style={{ padding: "12px 16px", color: "#ccc", fontSize: "12px", maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {o.customer_email}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#888", fontSize: "12px", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {o.product_name}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#8C7355", fontSize: "12px", fontWeight: 700 }}>
                      £{(parseInt(o.amount_pence) / 100).toFixed(2)}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#444", fontSize: "10px" }}>
                      {new Date(o.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{
                        fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em",
                        textTransform: "uppercase", color: fg, background: bg,
                        padding: "2px 8px", borderRadius: "10px",
                      }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={{ padding: "12px 16px" }}>
                      <Link
                        href={`/admin/orders/${o.id}`}
                        style={{
                          color: "#8C7355", fontSize: "10px", textDecoration: "none",
                          padding: "4px 10px", background: "rgba(140,115,85,0.1)",
                          borderRadius: "2px", border: "1px solid rgba(140,115,85,0.2)",
                        }}
                      >
                        {o.status === "paid" ? "Process →" : "View →"}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
