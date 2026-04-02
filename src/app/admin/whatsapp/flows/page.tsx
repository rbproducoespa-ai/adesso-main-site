import Link from "next/link";
import { createAdminSupabase } from "@/lib/supabase-admin";

const S = {
  page: { padding: "32px", maxWidth: "900px" },
  h1: { fontSize: "22px", fontWeight: 700, color: "#fff", margin: "0 0 4px" },
  sub: { fontSize: "13px", color: "#555", margin: "0 0 28px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  btn: { display: "inline-block", background: "#8C7355", color: "#fff", padding: "9px 20px", fontSize: "11px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase" as const },
  card: { background: "#141414", border: "1px solid #1E1E1E", padding: "20px 24px", marginBottom: "12px", display: "flex", alignItems: "center", gap: "16px" },
  dot: (active: boolean) => ({ width: "8px", height: "8px", borderRadius: "50%", background: active ? "#22C55E" : "#333", flexShrink: 0 }),
  name: { fontSize: "15px", fontWeight: 600, color: "#ddd", margin: "0 0 4px" },
  meta: { fontSize: "11px", color: "#555", margin: 0 },
  actions: { marginLeft: "auto", display: "flex", gap: "8px", flexShrink: 0 },
  editBtn: { fontSize: "11px", color: "#8C7355", textDecoration: "none", fontWeight: 600 },
};

export default async function FlowsPage() {
  const supabase = createAdminSupabase();
  const { data: flows } = await supabase
    .from("whatsapp_flows")
    .select("id, name, description, is_active, nodes, created_at")
    .order("created_at");

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div>
          <h1 style={S.h1}>Fluxos de Atendimento</h1>
          <p style={S.sub}>Gerencie os fluxos do chatbot WhatsApp</p>
        </div>
        <Link href="/admin/whatsapp/flows/new" style={S.btn}>+ Novo Fluxo</Link>
      </div>

      {(!flows || flows.length === 0) && (
        <div style={{ background: "#141414", border: "1px solid #1E1E1E", padding: "48px", textAlign: "center" as const }}>
          <p style={{ color: "#555", fontSize: "14px", margin: "0 0 16px" }}>Nenhum fluxo criado ainda.</p>
          <Link href="/admin/whatsapp/flows/new" style={S.btn}>Criar primeiro fluxo</Link>
        </div>
      )}

      {flows?.map((f) => {
        const nodeCount = Array.isArray(f.nodes) ? (f.nodes as unknown[]).length : 0;
        return (
          <div key={f.id} style={S.card}>
            <div style={S.dot(f.is_active)} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={S.name}>{f.name}</p>
              <p style={S.meta}>
                {nodeCount} etapa{nodeCount !== 1 ? "s" : ""} &nbsp;·&nbsp;
                {f.is_active ? <span style={{ color: "#22C55E" }}>Ativo</span> : <span style={{ color: "#555" }}>Inativo</span>}
                {f.description && <> &nbsp;·&nbsp; {f.description}</>}
              </p>
            </div>
            <div style={S.actions}>
              <Link href={`/admin/whatsapp/flows/${f.id}`} style={S.editBtn}>Editar →</Link>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: "24px", padding: "16px", background: "#111", border: "1px solid #1E1E1E", fontSize: "12px", color: "#555", lineHeight: 1.6 }}>
        <strong style={{ color: "#8C7355" }}>Dica:</strong> Apenas um fluxo ativo é usado por vez. O sistema seleciona o fluxo mais antigo com status <em>ativo</em>. Para criar um fluxo de teste, desative o principal primeiro.
      </div>
    </div>
  );
}
