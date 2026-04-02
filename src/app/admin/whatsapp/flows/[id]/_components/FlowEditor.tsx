"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// ── Types ─────────────────────────────────────────────────────────────────────

type NodeType = "message" | "menu" | "wait_input" | "transfer" | "end";

interface FlowOption {
  keys: string[];
  label: string;
  next_node_id: string;
}

interface FlowNode {
  id: string;
  type: NodeType;
  content?: string;
  options?: FlowOption[];
  next_node_id?: string;
  fallback_node_id?: string;
}

interface Flow {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  nodes: FlowNode[];
}

// ── Styles ────────────────────────────────────────────────────────────────────
const S = {
  wrap: { display: "flex", height: "100%", overflow: "hidden" as const },
  // Left: node list
  list: { width: "320px", minWidth: "320px", background: "#111", borderRight: "1px solid #1E1E1E", display: "flex", flexDirection: "column" as const, overflow: "hidden" },
  listHeader: { padding: "16px", borderBottom: "1px solid #1E1E1E", display: "flex", justifyContent: "space-between", alignItems: "center" },
  listBody: { flex: 1, overflowY: "auto" as const, padding: "8px" },
  // Right: editor
  editor: { flex: 1, overflowY: "auto" as const, padding: "24px 32px", background: "#0D0D0D" },
  // Node card
  nodeCard: (active: boolean, type: NodeType) => ({
    background: active ? "rgba(140,115,85,0.15)" : "#141414",
    border: `1px solid ${active ? "#8C7355" : "#1E1E1E"}`,
    borderLeft: `3px solid ${typeColor(type)}`,
    padding: "10px 12px",
    marginBottom: "6px",
    cursor: "pointer" as const,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }),
  label: { fontSize: "9px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#555", marginBottom: "4px" },
  input: {
    width: "100%", background: "#1E1E1E", border: "1px solid #2a2a2a",
    color: "#ddd", padding: "8px 10px", fontSize: "13px",
    outline: "none", resize: "vertical" as const, boxSizing: "border-box" as const,
  },
  textarea: {
    width: "100%", background: "#1E1E1E", border: "1px solid #2a2a2a",
    color: "#ddd", padding: "8px 10px", fontSize: "13px",
    outline: "none", resize: "vertical" as const, minHeight: "120px", boxSizing: "border-box" as const,
    fontFamily: "inherit",
  },
  select: {
    background: "#1E1E1E", border: "1px solid #2a2a2a",
    color: "#ddd", padding: "8px 10px", fontSize: "13px",
    outline: "none", width: "100%", boxSizing: "border-box" as const,
  },
  saveBtn: { background: "#8C7355", color: "#fff", border: "none", padding: "10px 24px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", cursor: "pointer" as const, textTransform: "uppercase" as const },
  deleteBtn: { background: "#1E1E1E", color: "#888", border: "none", padding: "10px 16px", fontSize: "12px", cursor: "pointer" as const },
  addBtn: { background: "#1E1E1E", color: "#8C7355", border: "1px solid #2a2a2a", padding: "8px 14px", fontSize: "11px", fontWeight: 600, cursor: "pointer" as const, width: "100%", textAlign: "center" as const },
  optionRow: { background: "#1a1a1a", border: "1px solid #222", padding: "12px", marginBottom: "8px" },
  removeBtn: { background: "none", border: "none", color: "#555", cursor: "pointer" as const, fontSize: "14px", padding: "2px 4px" },
};

function typeColor(type: NodeType): string {
  switch (type) {
    case "message": return "#3B82F6";
    case "menu":    return "#8C7355";
    case "wait_input": return "#A78BFA";
    case "transfer":   return "#F59E0B";
    case "end":        return "#EF4444";
    default:           return "#555";
  }
}

function typeLabel(type: NodeType): string {
  switch (type) {
    case "message":    return "Mensagem";
    case "menu":       return "Menu de opções";
    case "wait_input": return "Aguardar input";
    case "transfer":   return "Transferir agente";
    case "end":        return "Encerrar";
    default:           return type;
  }
}

const NODE_TYPES: NodeType[] = ["message", "menu", "wait_input", "transfer", "end"];

// ── Component ─────────────────────────────────────────────────────────────────

export function FlowEditor({ flow: initialFlow, isNew }: { flow: Flow; isNew: boolean }) {
  const router = useRouter();
  const [flow, setFlow] = useState<Flow>(initialFlow);
  const [selectedId, setSelectedId] = useState<string>(initialFlow.nodes[0]?.id ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const selectedNode = flow.nodes.find((n) => n.id === selectedId) ?? null;
  const nodeIds = flow.nodes.map((n) => n.id);

  // ── Flow meta ──────────────────────────────────────────────────────────────

  const setMeta = (key: keyof Flow, val: string | boolean) =>
    setFlow((f) => ({ ...f, [key]: val }));

  // ── Nodes CRUD ─────────────────────────────────────────────────────────────

  const addNode = () => {
    const id = `node_${Date.now()}`;
    const node: FlowNode = { id, type: "message", content: "Nova mensagem", next_node_id: "" };
    setFlow((f) => ({ ...f, nodes: [...f.nodes, node] }));
    setSelectedId(id);
  };

  const deleteNode = (id: string) => {
    setFlow((f) => ({
      ...f,
      nodes: f.nodes.filter((n) => n.id !== id),
    }));
    const remaining = flow.nodes.filter((n) => n.id !== id);
    setSelectedId(remaining[0]?.id ?? "");
  };

  const updateNode = useCallback((updated: FlowNode) => {
    setFlow((f) => ({ ...f, nodes: f.nodes.map((n) => n.id === updated.id ? updated : n) }));
  }, []);

  const moveNode = (id: string, dir: -1 | 1) => {
    setFlow((f) => {
      const nodes = [...f.nodes];
      const idx = nodes.findIndex((n) => n.id === id);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= nodes.length) return f;
      [nodes[idx], nodes[newIdx]] = [nodes[newIdx], nodes[idx]];
      return { ...f, nodes };
    });
  };

  // ── Save ───────────────────────────────────────────────────────────────────

  const save = async () => {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`/api/whatsapp/flows${isNew ? "" : `/${flow.id}`}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: flow.name,
          description: flow.description,
          is_active: flow.is_active,
          nodes: flow.nodes,
        }),
      });
      if (res.ok) {
        setMsg("✓ Salvo com sucesso");
        if (isNew) {
          const data = await res.json();
          router.replace(`/admin/whatsapp/flows/${data.id}`);
        }
      } else {
        setMsg("✗ Erro ao salvar");
      }
    } catch {
      setMsg("✗ Erro ao salvar");
    }
    setSaving(false);
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ height: "calc(100vh - 52px)", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <div style={{ background: "#141414", borderBottom: "1px solid #1E1E1E", padding: "12px 24px", display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
        <input
          value={flow.name}
          onChange={(e) => setMeta("name", e.target.value)}
          placeholder="Nome do fluxo"
          style={{ ...S.input, width: "260px", fontSize: "14px", fontWeight: 600 }}
        />
        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "#888", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={flow.is_active}
            onChange={(e) => setMeta("is_active", e.target.checked)}
            style={{ accentColor: "#8C7355" }}
          />
          Fluxo ativo
        </label>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
          {msg && <span style={{ fontSize: "12px", color: msg.startsWith("✓") ? "#22C55E" : "#EF4444" }}>{msg}</span>}
          <button onClick={save} disabled={saving} style={S.saveBtn}>
            {saving ? "Salvando..." : "Salvar fluxo"}
          </button>
        </div>
      </div>

      <div style={S.wrap}>
        {/* ── Node list ───────────────────────────────────────────── */}
        <div style={S.list}>
          <div style={S.listHeader}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#555", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Etapas ({flow.nodes.length})
            </span>
            <button onClick={addNode} style={{ background: "#8C7355", color: "#fff", border: "none", padding: "4px 10px", fontSize: "11px", fontWeight: 700, cursor: "pointer" }}>
              + Etapa
            </button>
          </div>
          <div style={S.listBody}>
            {flow.nodes.map((node, i) => (
              <div key={node.id} style={S.nodeCard(node.id === selectedId, node.type)} onClick={() => setSelectedId(node.id)}>
                <div style={{ width: "4px", height: "36px", background: typeColor(node.type), flexShrink: 0, borderRadius: "2px" }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, color: typeColor(node.type), margin: "0 0 2px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {typeLabel(node.type)}
                  </p>
                  <p style={{ fontSize: "12px", color: "#aaa", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <strong style={{ color: "#555" }}>{i === 0 ? "▶ " : ""}</strong>
                    {node.id}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <button onClick={(e) => { e.stopPropagation(); moveNode(node.id, -1); }} style={{ ...S.removeBtn, fontSize: "11px" }}>▲</button>
                  <button onClick={(e) => { e.stopPropagation(); moveNode(node.id, 1); }} style={{ ...S.removeBtn, fontSize: "11px" }}>▼</button>
                </div>
              </div>
            ))}
            <button onClick={addNode} style={{ ...S.addBtn, marginTop: "8px" }}>+ Adicionar etapa</button>
          </div>
        </div>

        {/* ── Node editor ─────────────────────────────────────────── */}
        <div style={S.editor}>
          {!selectedNode ? (
            <p style={{ color: "#555", fontSize: "14px" }}>Selecione uma etapa para editar.</p>
          ) : (
            <NodeEditor
              node={selectedNode}
              allNodeIds={nodeIds}
              onChange={updateNode}
              onDelete={() => deleteNode(selectedNode.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── NodeEditor ────────────────────────────────────────────────────────────────

function NodeEditor({
  node, allNodeIds, onChange, onDelete,
}: {
  node: FlowNode;
  allNodeIds: string[];
  onChange: (n: FlowNode) => void;
  onDelete: () => void;
}) {
  const set = (key: keyof FlowNode, val: unknown) => onChange({ ...node, [key]: val });

  const addOption = () => {
    const opts = node.options ?? [];
    onChange({
      ...node,
      options: [...opts, { keys: [""], label: "", next_node_id: "" }],
    });
  };

  const updateOption = (i: number, partial: Partial<FlowOption>) => {
    const opts = [...(node.options ?? [])];
    opts[i] = { ...opts[i], ...partial };
    onChange({ ...node, options: opts });
  };

  const removeOption = (i: number) => {
    const opts = [...(node.options ?? [])];
    opts.splice(i, 1);
    onChange({ ...node, options: opts });
  };

  const S2 = {
    section: { marginBottom: "24px" },
    title: { fontSize: "18px", fontWeight: 700, color: "#ddd", margin: "0 0 20px" },
    field: { marginBottom: "16px" },
    row: { display: "flex", gap: "8px", alignItems: "center" },
  };

  return (
    <div style={{ maxWidth: "680px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <div>
          <p style={{ fontSize: "10px", color: typeColor(node.type), fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 4px" }}>
            {typeLabel(node.type)}
          </p>
          <h2 style={S2.title}>Editar etapa: <code style={{ fontSize: "16px", color: "#8C7355" }}>{node.id}</code></h2>
        </div>
        <button onClick={onDelete} style={{ background: "#1a0000", color: "#EF4444", border: "1px solid #2a0000", padding: "6px 14px", fontSize: "11px", cursor: "pointer" }}>
          Excluir etapa
        </button>
      </div>

      {/* Node ID */}
      <div style={S2.field}>
        <p style={S.label}>ID da etapa (único)</p>
        <input value={node.id} onChange={(e) => set("id", e.target.value)} style={S.input} placeholder="ex: start, menu_principal, transfer" />
        <p style={{ fontSize: "11px", color: "#444", margin: "4px 0 0" }}>Use IDs simples sem espaços. A primeira etapa deve ter ID <code>start</code>.</p>
      </div>

      {/* Type */}
      <div style={S2.field}>
        <p style={S.label}>Tipo da etapa</p>
        <select value={node.type} onChange={(e) => set("type", e.target.value as NodeType)} style={S.select}>
          {NODE_TYPES.map((t) => (
            <option key={t} value={t}>{typeLabel(t)} — {t}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      {(node.type !== "end" || node.content) && (
        <div style={S2.field}>
          <p style={S.label}>Mensagem {node.type === "menu" && "(aparece acima das opções)"}</p>
          <textarea
            value={node.content ?? ""}
            onChange={(e) => set("content", e.target.value)}
            style={S.textarea}
            placeholder="Texto que o bot vai enviar. Use *negrito* e _itálico_ para formatação WhatsApp."
          />
          <p style={{ fontSize: "11px", color: "#444", margin: "4px 0 0" }}>
            Suporte a formatação WhatsApp: *negrito*, _itálico_, ~tachado~, ```monospace```
          </p>
        </div>
      )}

      {/* Next node (for message type) */}
      {(node.type === "message" || node.type === "wait_input") && (
        <div style={S2.field}>
          <p style={S.label}>Próxima etapa (após enviar)</p>
          <select value={node.next_node_id ?? ""} onChange={(e) => set("next_node_id", e.target.value)} style={S.select}>
            <option value="">— nenhuma (aguardar) —</option>
            {allNodeIds.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </div>
      )}

      {/* Fallback (for wait_input) */}
      {node.type === "wait_input" && (
        <div style={S2.field}>
          <p style={S.label}>Etapa fallback (se não reconhecer input)</p>
          <select value={node.fallback_node_id ?? ""} onChange={(e) => set("fallback_node_id", e.target.value)} style={S.select}>
            <option value="">— enviar mensagem de erro —</option>
            {allNodeIds.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </div>
      )}

      {/* Options (for menu and wait_input) */}
      {(node.type === "menu" || node.type === "wait_input") && (
        <div style={S2.section}>
          <p style={S.label}>Opções de resposta</p>
          <p style={{ fontSize: "12px", color: "#555", margin: "0 0 12px", lineHeight: 1.5 }}>
            Defina quais palavras/números o usuário pode digitar e para qual etapa ir. Separe múltiplas palavras com vírgula.
          </p>

          {(node.options ?? []).map((opt, i) => (
            <div key={i} style={S.optionRow}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "8px" }}>
                <div>
                  <p style={S.label}>Palavras-chave (separadas por vírgula)</p>
                  <input
                    value={opt.keys.join(", ")}
                    onChange={(e) => updateOption(i, { keys: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                    style={S.input}
                    placeholder="1, sim, exhibition, expo"
                  />
                </div>
                <div>
                  <p style={S.label}>Rótulo (exibição)</p>
                  <input
                    value={opt.label}
                    onChange={(e) => updateOption(i, { label: e.target.value })}
                    style={S.input}
                    placeholder="Exhibition"
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <p style={S.label}>Ir para etapa</p>
                  <select value={opt.next_node_id} onChange={(e) => updateOption(i, { next_node_id: e.target.value })} style={S.select}>
                    <option value="">— selecionar —</option>
                    {allNodeIds.map((id) => <option key={id} value={id}>{id}</option>)}
                  </select>
                </div>
                <button onClick={() => removeOption(i)} style={{ ...S.removeBtn, marginTop: "18px", fontSize: "18px", color: "#EF4444" }}>×</button>
              </div>
            </div>
          ))}

          <button onClick={addOption} style={S.addBtn}>+ Adicionar opção</button>
        </div>
      )}

      {/* Info for transfer */}
      {node.type === "transfer" && (
        <div style={{ background: "#1a1200", border: "1px solid #2a2000", padding: "12px 16px", fontSize: "12px", color: "#F59E0B", lineHeight: 1.6 }}>
          ⚡ Esta etapa transfere o usuário para um agente humano. A conversa ficará com status <strong>agent</strong> e aparecerá no painel de conversas aguardando resposta manual.
        </div>
      )}

      {/* Info for end */}
      {node.type === "end" && (
        <div style={{ background: "#1a0000", border: "1px solid #2a0000", padding: "12px 16px", fontSize: "12px", color: "#EF4444", lineHeight: 1.6 }}>
          🔴 Esta etapa encerra a conversa. O status muda para <strong>closed</strong>.
        </div>
      )}
    </div>
  );
}
