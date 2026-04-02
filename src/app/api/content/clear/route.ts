import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

// DELETE /api/content/clear — remove all content overrides for main app
export async function DELETE() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("site_content")
    .delete()
    .eq("app", "main")
    .neq("page", "__settings__"); // preserve settings

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
