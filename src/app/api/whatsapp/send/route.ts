/**
 * Manual send endpoint — used by admin panel when agent takes over conversation.
 */
import { NextRequest, NextResponse } from "next/server";
import { sendWhatsAppMessage } from "@/lib/whatsapp-engine";
import { createAdminSupabase } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminSupabase();
    const { phone, message, conversation_id, action } = await req.json();

    if (!phone || !message) {
      return NextResponse.json({ error: "phone and message are required" }, { status: 400 });
    }

    // Send message
    const sent = await sendWhatsAppMessage(phone, message);

    // Save to DB
    if (conversation_id) {
      await supabase.from("whatsapp_messages").insert({
        conversation_id,
        direction: "outbound",
        content: message,
        message_type: "text",
      });

      await supabase.from("whatsapp_conversations").update({
        last_message_at: new Date().toISOString(),
      }).eq("id", conversation_id);

      // Handle special actions
      if (action === "close") {
        await supabase.from("whatsapp_conversations").update({ status: "closed" }).eq("id", conversation_id);
      }
      if (action === "return_to_bot") {
        await supabase.from("whatsapp_conversations").update({
          status: "bot",
          current_node_id: "start",
        }).eq("id", conversation_id);
      }
    }

    return NextResponse.json({ sent });
  } catch (err) {
    console.error("[WhatsApp Send] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
