import Link from "next/link";
import { createAdminSupabase } from "@/lib/supabase-admin";

async function getStats() {
  const supabase = createAdminSupabase();
  const [{ count: total }, { count: bot }, { count: agent }, { count: closed }, { data: recent }] = await Promise.all([
    supabase.from("whatsapp_conversations").select("*", { count: "exact", head: true }),
    supabase.from("whatsapp_conversations").select("*", { count: "exact", head: true }).eq("status", "bot"),
    supabase.from("whatsapp_conversations").select("*", { count: "exact", head: true }).eq("status", "agent"),
    supabase.from("whatsapp_conversations").select("*", { count: "exact", head: true }).eq("status", "closed"),
    supabase.from("whatsapp_conversations").select("id, phone, contact_name, status, last_message_at").order("last_message_at", { ascending: false }).limit(5),
  ]);
  return { total: total ?? 0, bot: bot ?? 0, agent: agent ?? 0, closed: closed ?? 0, recent: recent ?? [] };
}

async function getFlows() {
  const supabase = createAdminSupabase();
  const { data } = await supabase.from("whatsapp_flows").select("id, name, is_active, created_at").order("created_at");
  return data ?? [];
}

const S = {
  page: { padding: "32px", maxWidth: "1100px" },
  h1: { fontSize: "22px", fontWeight: 700, color: "#fff", margin: "0 0 4px" },
  sub: { fontSize: "13px", color: "#555", margin: "0 0 32px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "32px" },
  card: { background: "#141414", border: "1px solid #1E1E1E", padding: "20px 24px" },
  cardLabel: { fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#555", marginBottom: "8px" },
  cardVal: { fontSize: "30px", fontWeight: 700, color: "#fff" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" },
  section: { background: "#141414", border: "1px solid #1E1E1E", padding: "20px 24px" },
  sectionTitle: { fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#0066FF", marginBottom: "16px" },
  btn: { display: "inline-block", background: "#0066FF", color: "#fff", padding: "8px 18px", fontSize: "11px", fontWeight: 700, textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase" as const },
  btnGhost: { display: "inline-block", background: "#1E1E1E", color: "#888", padding: "8px 18px", fontSize: "11px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.1em" },
  convRow: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #1E1E1E" },
  statusDot: (s: string) => ({
    width: "7px", height: "7px", borderRadius: "50%",
    background: s === "agent" ? "#F59E0B" : s === "bot" ? "#22C55E" : "#555",
    flexShrink: 0,
  }),
};

export default async function WhatsAppOverviewPage() {
  const [stats, flows] = await Promise.all([getStats(), getFlows()]);
  const envOk = !!(process.env.WHATSAPP_API_URL || process.env.TWILIO_ACCOUNT_SID);

  return (
    <div style={S.page}>
      <h1 style={S.h1}>WhatsApp Agent</h1>
      <p style={S.sub}>Chatbot automatizado com fluxos de atendimento e transferência para agente humano</p>

      {/* Status banner */}
      {!envOk && (
        <div style={{ background: "#1a1500", border: "1px solid #3a2e00", padding: "12px 16px", marginBottom: "24px", fontSize: "12px", color: "#F59E0B" }}>
          ⚠ Provedor WhatsApp não configurado. Defina <code>WHATSAPP_PROVIDER</code> + <code>WHATSAPP_API_URL</code> + <code>WHATSAPP_API_TOKEN</code> + <code>WHATSAPP_INSTANCE</code> no .env para enviar mensagens.
          {" "}Webhook URL: <code>https://adesso.digital/api/whatsapp/webhook</code>
        </div>
      )}

      {/* Stats */}
      <div style={S.grid}>
        {[
          { label: "Total conversas", val: stats.total },
          { label: "Com bot ativo", val: stats.bot, color: "#22C55E" },
          { label: "Aguardando agente", val: stats.agent, color: "#F59E0B" },
          { label: "Encerradas", val: stats.closed, color: "#555" },
        ].map(({ label, val, color }) => (
          <div key={label} style={S.card}>
            <p style={S.cardLabel}>{label}</p>
            <p style={{ ...S.cardVal, color: color ?? "#fff" }}>{val}</p>
          </div>
        ))}
      </div>

      <div style={S.row}>
        {/* Recent conversations */}
        <div style={S.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <p style={{ ...S.sectionTitle, marginBottom: 0 }}>Conversas recentes</p>
            <Link href="/admin/whatsapp/conversations" style={{ fontSize: "11px", color: "#0066FF", textDecoration: "none" }}>Ver todas →</Link>
          </div>
          {stats.recent.length === 0 && (
            <p style={{ fontSize: "13px", color: "#444" }}>Nenhuma conversa ainda.</p>
          )}
          {stats.recent.map((c: { id: string; phone: string; contact_name?: string; status: string; last_message_at: string }) => (
            <Link key={c.id} href={`/admin/whatsapp/conversations?id=${c.id}`} style={{ ...S.convRow, textDecoration: "none" }}>
              <div style={S.statusDot(c.status)} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#ccc", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.contact_name ?? c.phone}
                </p>
                <p style={{ fontSize: "11px", color: "#555", margin: 0 }}>{c.phone}</p>
              </div>
              <span style={{ fontSize: "10px", color: c.status === "agent" ? "#F59E0B" : "#555", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {c.status === "agent" ? "⚡ Agente" : c.status === "bot" ? "Bot" : "Fechado"}
              </span>
            </Link>
          ))}
        </div>

        {/* Flows */}
        <div style={S.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <p style={{ ...S.sectionTitle, marginBottom: 0 }}>Fluxos de atendimento</p>
            <Link href="/admin/whatsapp/flows/new" style={{ fontSize: "11px", color: "#0066FF", textDecoration: "none" }}>+ Novo fluxo</Link>
          </div>
          {flows.map((f: { id: string; name: string; is_active: boolean }) => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #1E1E1E" }}>
              <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: f.is_active ? "#22C55E" : "#333", flexShrink: 0 }} />
              <p style={{ flex: 1, fontSize: "13px", color: "#ccc", margin: 0 }}>{f.name}</p>
              <Link href={`/admin/whatsapp/flows/${f.id}`} style={{ fontSize: "11px", color: "#0066FF", textDecoration: "none" }}>Editar →</Link>
            </div>
          ))}
          {flows.length === 0 && <p style={{ fontSize: "13px", color: "#444" }}>Nenhum fluxo encontrado.</p>}
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <Link href="/admin/whatsapp/flows" style={S.btnGhost}>Ver fluxos</Link>
            <Link href="/admin/whatsapp/flows/new" style={S.btn}>+ Criar fluxo</Link>
          </div>
        </div>
      </div>

      {/* Setup guide */}
      <div style={{ ...S.section, marginTop: "24px" }}>
        <p style={S.sectionTitle}>Configuração da integração</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {[
            {
              n: "01", title: "Escolha o provedor",
              desc: "Evolution API (recomendado), Twilio ou Z-API. Configure as variáveis de ambiente.",
              code: "WHATSAPP_PROVIDER=evolution\nWHATSAPP_API_URL=http://seu-servidor:8080\nWHATSAPP_INSTANCE=adesso\nWHATSAPP_API_TOKEN=seu-token",
            },
            {
              n: "02", title: "Configure o webhook",
              desc: "Aponte o webhook do seu provedor para a URL abaixo:",
              code: "POST https://adesso.digital/api/whatsapp/webhook\n\nVerify Token:\nadesso-whatsapp-2024",
            },
            {
              n: "03", title: "Crie e ative o fluxo",
              desc: "Edite o fluxo padrão ADESSO ou crie um novo. Ative-o e o bot começa a responder automaticamente.",
              code: "Status: bot → mensagem automática\nStatus: agent → você responde\nStatus: closed → conversa encerrada",
            },
          ].map(({ n, title, desc, code }) => (
            <div key={n} style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", padding: "16px" }}>
              <p style={{ fontSize: "10px", color: "#0066FF", fontWeight: 700, letterSpacing: "0.15em", margin: "0 0 6px" }}>{n}</p>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#ccc", margin: "0 0 6px" }}>{title}</p>
              <p style={{ fontSize: "12px", color: "#555", margin: "0 0 10px", lineHeight: 1.5 }}>{desc}</p>
              <pre style={{ fontSize: "10px", color: "#0066FF", background: "#141414", padding: "8px", margin: 0, lineHeight: 1.6, overflow: "auto" }}>{code}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
