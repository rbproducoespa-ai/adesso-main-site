/**
 * WhatsApp Flow Engine
 * Processes incoming messages against the active flow and returns bot responses.
 */

import { createAdminSupabase } from "./supabase-admin";



// ── Types ─────────────────────────────────────────────────────────────────────

export type NodeType = "message" | "menu" | "wait_input" | "transfer" | "end";

export interface FlowOption {
  keys: string[];       // keywords that match this option (lowercase)
  label: string;        // display label
  next_node_id: string;
}

export interface FlowNode {
  id: string;
  type: NodeType;
  content?: string;
  options?: FlowOption[];
  next_node_id?: string;     // auto-advance after sending message
  fallback_node_id?: string; // if input doesn't match any option
}

export interface EngineResult {
  messages: string[];         // responses to send back
  next_node_id: string | null;
  transfer_to_agent: boolean;
  conversation_closed: boolean;
}

// ── Engine ────────────────────────────────────────────────────────────────────

export async function processMessage(
  phone: string,
  contactName: string | undefined,
  inboundText: string
): Promise<EngineResult> {
  const supabase = createAdminSupabase();
  const text = inboundText.trim().toLowerCase();

  // 1. Get or create conversation
  let { data: conv } = await supabase
    .from("whatsapp_conversations")
    .select("*")
    .eq("phone", phone)
    .maybeSingle();

  if (!conv) {
    // New conversation — find active flow
    const { data: flow } = await supabase
      .from("whatsapp_flows")
      .select("id, nodes")
      .eq("is_active", true)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    const { data: newConv } = await supabase
      .from("whatsapp_conversations")
      .insert({
        phone,
        contact_name: contactName ?? null,
        flow_id: flow?.id ?? null,
        current_node_id: null,
        status: "bot",
      })
      .select()
      .single();

    conv = newConv;
  }

  if (!conv) {
    return { messages: [], next_node_id: null, transfer_to_agent: false, conversation_closed: false };
  }

  // 2. If already assigned to agent — don't auto-reply
  if (conv.status === "agent") {
    await saveMessage(conv.id, "inbound", inboundText);
    await supabase
      .from("whatsapp_conversations")
      .update({ last_message_at: new Date().toISOString() })
      .eq("id", conv.id);
    return { messages: [], next_node_id: conv.current_node_id, transfer_to_agent: false, conversation_closed: false };
  }

  // 3. Load flow nodes
  if (!conv.flow_id) {
    return { messages: ["Olá! No momento não há um fluxo ativo. Por favor, entre em contato pelo email hello@adesso.digital"], next_node_id: null, transfer_to_agent: false, conversation_closed: false };
  }

  const { data: flow } = await supabase
    .from("whatsapp_flows")
    .select("nodes")
    .eq("id", conv.flow_id)
    .single();

  if (!flow) {
    return { messages: [], next_node_id: null, transfer_to_agent: false, conversation_closed: false };
  }

  const nodes: FlowNode[] = flow.nodes as FlowNode[];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  // 4. Determine current node
  let currentNodeId = conv.current_node_id ?? "start";

  // If user types global reset keywords, restart
  const resetKeywords = ["menu", "inicio", "início", "restart", "reiniciar", "oi", "olá", "ola", "hi", "hello", "start", "ola!", "olá!"];
  if (resetKeywords.includes(text) && currentNodeId !== "start") {
    currentNodeId = "start";
  }

  await saveMessage(conv.id, "inbound", inboundText);

  // 5. Process nodes and collect responses
  const result: EngineResult = {
    messages: [],
    next_node_id: null,
    transfer_to_agent: false,
    conversation_closed: false,
  };

  let node: FlowNode | undefined = nodeMap.get(currentNodeId);
  let steps = 0;
  const MAX_STEPS = 10; // prevent infinite loops

  while (node && steps < MAX_STEPS) {
    steps++;

    switch (node.type) {

      case "message": {
        if (node.content) result.messages.push(node.content);
        if (node.next_node_id) {
          // Auto-advance to next node
          node = nodeMap.get(node.next_node_id);
          if (node?.type === "wait_input" || node?.type === "menu" || node?.type === "transfer" || node?.type === "end") {
            // Show that node's content too then stop
            continue;
          }
        } else {
          node = undefined;
        }
        break;
      }

      case "menu": {
        if (node.content) result.messages.push(node.content);
        result.next_node_id = node.id; // stay on this menu node until user picks
        // First visit: show menu and wait
        // On subsequent calls: we'd have already processed input below
        node = undefined;
        break;
      }

      case "wait_input": {
        // Match input to options
        const matched = matchOption(text, node.options ?? []);
        if (matched) {
          node = nodeMap.get(matched.next_node_id);
          currentNodeId = matched.next_node_id;
        } else if (node.fallback_node_id) {
          node = nodeMap.get(node.fallback_node_id);
          currentNodeId = node?.id ?? currentNodeId;
        } else {
          result.messages.push("Não entendi sua resposta. Por favor, escolha uma das opções disponíveis ou digite *menu* para voltar ao início.");
          result.next_node_id = node.id;
          node = undefined;
        }
        break;
      }

      case "transfer": {
        if (node.content) result.messages.push(node.content);
        result.transfer_to_agent = true;
        result.next_node_id = node.id;
        node = undefined;
        break;
      }

      case "end": {
        if (node.content) result.messages.push(node.content);
        result.conversation_closed = true;
        node = undefined;
        break;
      }

      default:
        node = undefined;
    }
  }

  // Handle case where current node is a menu and user sent input
  if (!result.next_node_id && conv.current_node_id) {
    const prevNode = nodeMap.get(conv.current_node_id);
    if (prevNode?.type === "menu" && prevNode.options) {
      const matched = matchOption(text, prevNode.options);
      if (matched) {
        const nextNode = nodeMap.get(matched.next_node_id);
        if (nextNode) {
          // Reset result and process from matched node
          result.messages = [];
          if (nextNode.content) result.messages.push(nextNode.content);

          if (nextNode.type === "transfer") {
            result.transfer_to_agent = true;
            result.next_node_id = nextNode.id;
          } else if (nextNode.type === "menu") {
            result.next_node_id = nextNode.id;
          } else if (nextNode.type === "end") {
            result.conversation_closed = true;
          } else if (nextNode.next_node_id) {
            const followNode = nodeMap.get(nextNode.next_node_id);
            if (followNode?.content) result.messages.push(followNode.content);
            result.next_node_id = followNode?.type === "wait_input" || followNode?.type === "menu"
              ? followNode.id
              : nextNode.next_node_id;
          } else {
            result.next_node_id = nextNode.id;
          }
        }
      } else {
        // Didn't match — re-show menu
        if (!result.messages.length) {
          result.messages.push("Por favor, escolha uma das opções acima digitando o número correspondente, ou *menu* para reiniciar.");
          result.next_node_id = prevNode.id;
        }
      }
    }
  }

  if (!result.next_node_id) {
    result.next_node_id = currentNodeId;
  }

  // 6. Save outbound messages
  for (const msg of result.messages) {
    await saveMessage(conv.id, "outbound", msg);
  }

  // 7. Update conversation state
  const updatePayload: Record<string, unknown> = {
    current_node_id: result.next_node_id,
    last_message_at: new Date().toISOString(),
    contact_name: contactName ?? conv.contact_name,
  };
  if (result.transfer_to_agent) updatePayload.status = "agent";
  if (result.conversation_closed) updatePayload.status = "closed";

  await supabase.from("whatsapp_conversations").update(updatePayload).eq("id", conv.id);

  return result;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function matchOption(input: string, options: FlowOption[]): FlowOption | null {
  const clean = input.trim().toLowerCase().replace(/[^\w\s]/g, "").trim();
  for (const opt of options) {
    for (const key of opt.keys) {
      if (clean === key.toLowerCase() || clean.includes(key.toLowerCase())) {
        return opt;
      }
    }
  }
  return null;
}

async function saveMessage(
  conversationId: string,
  direction: "inbound" | "outbound",
  content: string
) {
  const supabase = createAdminSupabase();
  await supabase.from("whatsapp_messages").insert({
    conversation_id: conversationId,
    direction,
    content,
    message_type: "text",
  });
}

// ── Send via WhatsApp provider ────────────────────────────────────────────────

export async function sendWhatsAppMessage(phone: string, text: string): Promise<boolean> {
  const provider = process.env.WHATSAPP_PROVIDER ?? "evolution";

  try {
    if (provider === "evolution") {
      const baseUrl = process.env.WHATSAPP_API_URL;
      const instance = process.env.WHATSAPP_INSTANCE;
      const token = process.env.WHATSAPP_API_TOKEN;

      if (!baseUrl || !instance || !token) {
        console.warn("[WhatsApp] Evolution API not configured — message not sent");
        return false;
      }

      const res = await fetch(`${baseUrl}/message/sendText/${instance}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: token },
        body: JSON.stringify({
          number: phone.replace(/\D/g, ""),
          textMessage: { text },
        }),
      });
      return res.ok;
    }

    if (provider === "twilio") {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken  = process.env.TWILIO_AUTH_TOKEN;
      const fromNumber = process.env.WHATSAPP_NUMBER;

      if (!accountSid || !authToken || !fromNumber) {
        console.warn("[WhatsApp] Twilio not configured — message not sent");
        return false;
      }

      const res = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: "Basic " + Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            From: `whatsapp:+${fromNumber}`,
            To: `whatsapp:+${phone.replace(/\D/g, "")}`,
            Body: text,
          }),
        }
      );
      return res.ok;
    }

    if (provider === "zapi") {
      const instanceId = process.env.WHATSAPP_INSTANCE;
      const token      = process.env.WHATSAPP_API_TOKEN;

      if (!instanceId || !token) return false;

      const res = await fetch(`https://api.z-api.io/instances/${instanceId}/token/${token}/send-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.replace(/\D/g, ""), message: text }),
      });
      return res.ok;
    }

    console.warn("[WhatsApp] No provider configured (WHATSAPP_PROVIDER env not set)");
    return false;

  } catch (err) {
    console.error("[WhatsApp] Send error:", err);
    return false;
  }
}
