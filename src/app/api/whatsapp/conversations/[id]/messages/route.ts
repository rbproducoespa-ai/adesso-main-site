import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-admin";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const supabase = createAdminSupabase();
  const { id } = await params;
  const { data } = await supabase
    .from("whatsapp_messages")
    .select("id, direction, content, message_type, sent_at")
    .eq("conversation_id", id)
    .order("sent_at", { ascending: true })
    .limit(200);
  return NextResponse.json(data ?? []);
}
