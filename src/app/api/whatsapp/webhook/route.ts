import { NextRequest, NextResponse } from "next/server";
import { processMessage, sendWhatsAppMessage } from "@/lib/whatsapp-engine";

// GET — webhook verification (WhatsApp Business API / Evolution API)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === (process.env.WHATSAPP_VERIFY_TOKEN ?? "adesso-whatsapp-2024")) {
    return new NextResponse(challenge, { status: 200 });
  }
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// POST — receive incoming messages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Normalise across providers ──────────────────────────────────────────

    let phone: string | null = null;
    let text:  string | null = null;
    let contactName: string | undefined;

    // Evolution API format
    if (body?.data?.key?.remoteJid) {
      const jid = body.data.key.remoteJid as string;
      phone = jid.replace("@s.whatsapp.net", "").replace("@c.us", "");
      text  = body.data?.message?.conversation
        ?? body.data?.message?.extendedTextMessage?.text
        ?? null;
      contactName = body.data?.pushName ?? undefined;
    }

    // WhatsApp Business API (Meta) format
    else if (body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
      const msg = body.entry[0].changes[0].value.messages[0];
      phone = msg.from;
      text  = msg.text?.body ?? null;
      const contacts = body.entry[0].changes[0].value.contacts;
      contactName = contacts?.[0]?.profile?.name ?? undefined;
    }

    // Twilio format
    else if (body?.From && body?.Body) {
      phone = (body.From as string).replace("whatsapp:+", "").replace("+", "");
      text  = body.Body as string;
    }

    // Z-API format
    else if (body?.phone && body?.text?.message) {
      phone = body.phone;
      text  = body.text.message;
      contactName = body?.senderName ?? undefined;
    }

    if (!phone || !text) {
      // Not a text message we need to handle (status update, read receipt, etc.)
      return NextResponse.json({ received: true });
    }

    console.log(`[WhatsApp] Inbound from ${phone}: ${text.substring(0, 80)}`);

    // ── Process through flow engine ─────────────────────────────────────────
    const result = await processMessage(phone, contactName, text);

    // ── Send responses ──────────────────────────────────────────────────────
    for (const message of result.messages) {
      await sendWhatsAppMessage(phone, message);
      // Small delay between messages for natural feel
      await new Promise(r => setTimeout(r, 800));
    }

    // ── Notify admin on agent transfer ──────────────────────────────────────
    if (result.transfer_to_agent) {
      console.log(`[WhatsApp] Transfer to agent requested by ${phone}`);
      // Could send notification via Resend here if needed
    }

    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("[WhatsApp Webhook] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
