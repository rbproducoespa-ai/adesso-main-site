import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "site-content.json");

function hasSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes("YOUR_PROJECT_ID");
}

// ── Local file helpers ──────────────────────────────────────────
type ContentRow = {
  app: string; page: string; section: string; key: string;
  value: string; type: string; label: string; updated_at: string;
};

function readLocal(): ContentRow[] {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch { return []; }
}

function writeLocal(rows: ContentRow[]) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(rows, null, 2));
}

// ── GET /api/content?app=main&page=home ─────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const app  = searchParams.get("app")  ?? "main";
  const page = searchParams.get("page") ?? "home";

  if (!hasSupabase()) {
    const all  = readLocal();
    const data = all.filter(r => r.app === app && r.page === page);
    return NextResponse.json({ data });
  }

  try {
    const { createAdminSupabase } = await import("@/lib/supabase-admin");
    const adminDb = createAdminSupabase();
    const { data, error } = await adminDb
      .from("site_content")
      .select("section, key, value, type, label, updated_at")
      .eq("app", app)
      .eq("page", page);
    if (error) return NextResponse.json({ data: [] });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ data: [] });
  }
}

// ── POST /api/content — upsert a single field ───────────────────
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { app, page, section, key, value, type, label } = body;

  if (!app || !page || !section || !key) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!hasSupabase()) {
    const rows = readLocal();
    const idx  = rows.findIndex(r =>
      r.app === app && r.page === page && r.section === section && r.key === key
    );
    const row: ContentRow = {
      app, page, section, key,
      value: value ?? "",
      type: type ?? "text",
      label: label ?? key,
      updated_at: new Date().toISOString(),
    };
    if (idx >= 0) rows[idx] = row; else rows.push(row);
    writeLocal(rows);
    return NextResponse.json({ ok: true });
  }

  try {
    const { createServerSupabase } = await import("@/lib/supabase-server");
    const { createAdminSupabase }  = await import("@/lib/supabase-admin");

    const authClient = await createServerSupabase();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminDb = createAdminSupabase();
    const { error } = await adminDb
      .from("site_content")
      .upsert({
        app, page, section, key, value,
        type: type ?? "text", label: label ?? key,
        updated_by: user.id,
      }, { onConflict: "app,page,section,key" });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}

// ── DELETE /api/content — reset a field to default ──────────────
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { app, page, section, key } = body;

  if (!hasSupabase()) {
    const rows    = readLocal();
    const updated = rows.filter(r =>
      !(r.app === app && r.page === page && r.section === section && r.key === key)
    );
    writeLocal(updated);
    return NextResponse.json({ ok: true });
  }

  try {
    const { createServerSupabase } = await import("@/lib/supabase-server");
    const { createAdminSupabase }  = await import("@/lib/supabase-admin");

    const authClient = await createServerSupabase();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const adminDb = createAdminSupabase();
    const { error } = await adminDb
      .from("site_content")
      .delete()
      .match({ app, page, section, key });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
