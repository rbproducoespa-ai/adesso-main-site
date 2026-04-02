import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase-admin";

export async function GET() {
  const supabase = createAdminSupabase();
  const { data } = await supabase
    .from("whatsapp_conversations")
    .select("id, phone, contact_name, status, last_message_at, created_at")
    .order("last_message_at", { ascending: false })
    .limit(100);
  return NextResponse.json(data ?? []);
}
