import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

const SETTINGS_PAGE = "__settings__";
const SETTINGS_SECTION = "global";
const APP = "main";

// GET /api/settings — load all saved settings
export async function GET() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .eq("app", APP)
    .eq("page", SETTINGS_PAGE)
    .eq("section", SETTINGS_SECTION);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const result: Record<string, string> = {};
  for (const row of data ?? []) {
    result[row.key] = row.value;
  }
  return NextResponse.json({ data: result });
}

// POST /api/settings — save settings (upsert each key/value)
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const rows = Object.entries(body).map(([key, value]) => ({
    app: APP,
    page: SETTINGS_PAGE,
    section: SETTINGS_SECTION,
    key,
    value: String(value),
    type: "text",
    label: key,
    updated_by: user.id,
  }));

  const { error } = await supabase
    .from("site_content")
    .upsert(rows, { onConflict: "app,page,section,key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
