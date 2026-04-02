"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Record<string, unknown> | null>(null);
  const [files, setFiles] = useState<Record<string, unknown>[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [msg, setMsg] = useState("");

  async function fetchOrder() {
    const res = await fetch(`/api/admin/orders/${id}`);
    if (!res.ok) return;
    const { order: o, files: f } = await res.json();
    setOrder(o);
    setFiles(f ?? []);
  }

  useEffect(() => {
    if (id) fetchOrder();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function addFile(e: React.FormEvent) {
    e.preventDefault();
    if (!fileUrl) return;
    setUploading(true);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add_file", file_url: fileUrl, file_name: fileName || "Data file" }),
    });
    if (res.ok) {
      setFileUrl(""); setFileName("");
      setMsg("File added.");
      await fetchOrder();
    } else {
      setMsg("Failed to add file.");
    }
    setUploading(false);
  }

  async function markDelivered() {
    setMarking(true);
    const res = await fetch("/api/admin/deliver", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    if (res.ok) {
      setMsg("Order marked as delivered. Customer notified by email.");
      setOrder((o) => o ? ({ ...o, status: "delivered" }) : o);
    } else {
      setMsg("Error — check console.");
    }
    setMarking(false);
  }

  if (!order) return (
    <div style={{ padding: "28px 32px" }}>
      <p style={{ color: "#555", fontSize: "13px" }}>Loading order...</p>
    </div>
  );

  const inp = {
    width: "100%", padding: "9px 12px",
    background: "#111", border: "1px solid #252525",
    color: "#fff", fontSize: "13px", borderRadius: "3px",
    boxSizing: "border-box" as const, outline: "none",
  };
  const lbl = {
    fontSize: "10px", fontWeight: 700 as const, color: "#555",
    letterSpacing: "0.1em", textTransform: "uppercase" as const,
    display: "block", marginBottom: "6px",
  };

  const orderId = order.id as string;
  const productName = order.product_name as string;
  const customerEmail = order.customer_email as string;
  const amountPence = order.amount_pence as number;
  const status = order.status as string;
  const createdAt = order.created_at as string;
  const stripeSessionId = order.stripe_session_id as string | undefined;

  return (
    <div style={{ padding: "28px 32px" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <p style={{ color: "#555", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 4px" }}>
            Admin › Orders › #{orderId.slice(0, 8)}
          </p>
          <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, margin: 0 }}>
            {productName}
          </h2>
          <p style={{ color: "#444", fontSize: "12px", margin: "4px 0 0" }}>{customerEmail}</p>
        </div>
        <button
          onClick={() => router.back()}
          style={{
            background: "none", border: "1px solid #252525",
            color: "#555", padding: "8px 16px",
            fontSize: "11px", cursor: "pointer", borderRadius: "2px",
          }}
        >
          ← Back
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

        {/* Order Details */}
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px" }}>
          <p style={{ color: "#fff", fontSize: "13px", fontWeight: 700, margin: "0 0 16px" }}>Order Details</p>
          {[
            ["Customer",      customerEmail],
            ["Product",       productName],
            ["Amount",        `£${(amountPence / 100).toFixed(2)}`],
            ["Status",        status],
            ["Date",          new Date(createdAt).toLocaleString("en-GB")],
            ["Stripe Session", stripeSessionId ? stripeSessionId.slice(0, 24) + "…" : "—"],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid #1A1A1A",
            }}>
              <span style={{ color: "#444", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}</span>
              <span style={{ color: "#ddd", fontSize: "12px", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          {msg && (
            <p style={{
              marginTop: "14px", padding: "10px 12px",
              background: "rgba(140,115,85,0.1)", border: "1px solid rgba(140,115,85,0.2)",
              color: "#8C7355", fontSize: "12px", borderRadius: "3px",
            }}>
              {msg}
            </p>
          )}
        </div>

        {/* File Delivery */}
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", borderRadius: "4px", padding: "20px" }}>
          <p style={{ color: "#fff", fontSize: "13px", fontWeight: 700, margin: "0 0 16px" }}>Deliver Files</p>

          {files.length > 0 && (
            <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {files.map((f) => (
                <div key={f.id as string} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  border: "1px solid #252525", padding: "10px 12px", borderRadius: "3px",
                }}>
                  <span style={{ color: "#ccc", fontSize: "12px" }}>{f.file_name as string}</span>
                  <a
                    href={f.file_url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#8C7355", fontSize: "11px", textDecoration: "none" }}
                  >
                    View →
                  </a>
                </div>
              ))}
            </div>
          )}

          <form onSubmit={addFile} style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px" }}>
            <div>
              <label style={lbl}>File Name</label>
              <input
                type="text"
                value={fileName}
                onChange={e => setFileName(e.target.value)}
                placeholder="e.g. Exhibition_Visitor_Pack_Q1_2026.csv"
                style={inp}
              />
            </div>
            <div>
              <label style={lbl}>File URL (Supabase Storage or Google Drive)</label>
              <input
                required
                type="url"
                value={fileUrl}
                onChange={e => setFileUrl(e.target.value)}
                placeholder="https://..."
                style={inp}
              />
            </div>
            <button
              type="submit"
              disabled={uploading}
              style={{
                padding: "10px", background: "transparent",
                border: "1px solid #252525", color: "#ccc",
                fontSize: "11px", fontWeight: 700, cursor: uploading ? "default" : "pointer",
                borderRadius: "3px", opacity: uploading ? 0.6 : 1,
              }}
            >
              {uploading ? "Adding..." : "+ Add File"}
            </button>
          </form>

          {status !== "delivered" && files.length > 0 && (
            <button
              onClick={markDelivered}
              disabled={marking}
              style={{
                width: "100%", padding: "11px",
                background: marking ? "#555" : "#8C7355",
                border: "none", color: "#fff",
                fontSize: "11px", fontWeight: 700, cursor: marking ? "default" : "pointer",
                borderRadius: "3px", letterSpacing: "0.12em", textTransform: "uppercase",
              }}
            >
              {marking ? "Processing..." : "Mark Delivered + Notify Customer"}
            </button>
          )}
          {status === "delivered" && (
            <p style={{
              textAlign: "center", fontSize: "12px", fontWeight: 600,
              color: "#3D7A4E", border: "1px solid rgba(61,122,78,0.3)",
              background: "rgba(61,122,78,0.08)", padding: "10px", borderRadius: "3px",
            }}>
              ✓ Delivered — customer notified
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
