import { notFound } from "next/navigation";
import { FlowEditor } from "./_components/FlowEditor";
import { createAdminSupabase } from "@/lib/supabase-admin";

const EMPTY_FLOW = {
  id: "new",
  name: "Novo Fluxo",
  description: "",
  is_active: false,
  nodes: [
    {
      id: "start",
      type: "menu" as const,
      content: "Olá! Como posso ajudar?\n\n*1* — Opção 1\n*2* — Falar com atendente",
      options: [
        { keys: ["1", "opcao1"], label: "Opção 1", next_node_id: "opcao1" },
        { keys: ["2", "falar", "atendente", "humano"], label: "Atendente", next_node_id: "transfer" },
      ],
    },
    {
      id: "opcao1",
      type: "message" as const,
      content: "Você escolheu a opção 1! Em breve entraremos em contato.\n\nDigite *menu* para voltar.",
      next_node_id: "wait_restart",
    },
    {
      id: "transfer",
      type: "transfer" as const,
      content: "Transferindo para um atendente. Aguarde um momento! 🙏",
    },
    {
      id: "wait_restart",
      type: "wait_input" as const,
      options: [
        { keys: ["menu", "voltar", "inicio", "oi", "olá"], label: "Menu", next_node_id: "start" },
      ],
      fallback_node_id: "start",
    },
  ],
};

export default async function FlowEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";

  let flow = EMPTY_FLOW;

  if (!isNew) {
    const supabase = createAdminSupabase();
    const { data } = await supabase
      .from("whatsapp_flows")
      .select("*")
      .eq("id", id)
      .single();

    if (!data) notFound();
    flow = data;
  }

  return <FlowEditor flow={flow} isNew={isNew} />;
}
