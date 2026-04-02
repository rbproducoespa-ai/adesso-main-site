import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { createAdminSupabase } from "@/lib/supabase-admin";

function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
  if (allowed.length === 0) return true; // dev mode — no ADMIN_EMAILS set
  return allowed.includes(email.toLowerCase());
}

// GET /api/content?app=main&page=home
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const app = searchParams.get("app") ?? "main";
  const page = searchParams.get("page") ?? "home";

  // Use admin client to bypass RLS on reads too
  const adminDb = createAdminSupabase();
  const { data, error } = await adminDb
    .from("site_content")
    .select("section, key, value, type, label, updated_at")
    .eq("app", app)
    .eq("page", page);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/content — upsert a single field
export async function POST(req: NextRequest) {
  // 1. Authenticate via cookie session (anon key)
  const authClient = await createServerSupabase();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { app, page, section, key, value, type, label } = body;

  if (!app || !page || !section || !key) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // 2. Write with service role to bypass RLS
  const adminDb = createAdminSupabase();
  const { error } = await adminDb
    .from("site_content")
    .upsert({
      app, page, section, key, value, type: type ?? "text", label: label ?? key,
      updated_by: user.id,
    }, { onConflict: "app,page,section,key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE /api/content — reset a field to default
export async function DELETE(req: NextRequest) {
  // 1. Authenticate
  const authClient = await createServerSupabase();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { app, page, section, key } = body;

  // 2. Delete with service role to bypass RLS
  const adminDb = createAdminSupabase();
  const { error } = await adminDb
    .from("site_content")
    .delete()
    .match({ app, page, section, key });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
