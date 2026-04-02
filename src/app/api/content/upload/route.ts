import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { createAdminSupabase } from "@/lib/supabase-admin";

function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",").map(e => e.trim().toLowerCase()).filter(Boolean);
  if (allowed.length === 0) return true; // dev mode
  return allowed.includes(email.toLowerCase());
}

export async function POST(req: NextRequest) {
  // 1. Auth check (anon key + cookie)
  const authClient = await createServerSupabase();
  const { data: { user } } = await authClient.auth.getUser();
  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const key  = formData.get("key") as string;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext      = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}-${key}.${ext}`;
  const buffer   = await file.arrayBuffer();

  // 2. Upload with service role key (bypasses Storage RLS)
  const adminDb = createAdminSupabase();
  const { error } = await adminDb.storage
    .from("site-assets")
    .upload(filename, buffer, { contentType: file.type, upsert: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = adminDb.storage
    .from("site-assets")
    .getPublicUrl(filename);

  return NextResponse.json({ url: publicUrl });
}
