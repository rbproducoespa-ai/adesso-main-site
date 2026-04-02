import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  const supabase = createAdminSupabase();
  const { conversation_id } = await req.json();
  await supabase
    .from("whatsapp_conversations")
    .update({ status: "agent" })
    .eq("id", conversation_id);
  return NextResponse.json({ ok: true });
}
