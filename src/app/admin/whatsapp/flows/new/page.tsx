import { FlowEditor } from "../[id]/_components/FlowEditor";

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
        { keys: ["1"], label: "Opção 1", next_node_id: "opcao1" },
        { keys: ["2", "falar", "atendente"], label: "Atendente", next_node_id: "transfer" },
      ],
    },
    {
      id: "opcao1",
      type: "message" as const,
      content: "Ótimo! Aguarde nosso contato.",
      next_node_id: "wait_restart",
    },
    {
      id: "transfer",
      type: "transfer" as const,
      content: "Transferindo para um atendente. Aguarde! 🙏",
    },
    {
      id: "wait_restart",
      type: "wait_input" as const,
      options: [
        { keys: ["menu", "voltar", "inicio", "oi"], label: "Menu", next_node_id: "start" },
      ],
      fallback_node_id: "start",
    },
  ],
};

export default function NewFlowPage() {
  return <FlowEditor flow={EMPTY_FLOW} isNew={true} />;
}
