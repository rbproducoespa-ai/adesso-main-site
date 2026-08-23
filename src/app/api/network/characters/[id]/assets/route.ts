import { NextRequest, NextResponse } from "next/server";

import { createAdminSupabase } from "@/lib/supabase-admin";
import { getNetworkUser } from "@/lib/network/auth";

/**
 * Character reference assets — spec §18.
 *
 * These are what pin a character's look and voice across every generation, so
 * they are stored per character and per kind rather than dropped into the
 * general asset library.
 */
const KINDS = ["face", "full_body", "side", "lifestyle", "wardrobe", "voice"] as const;
type Kind = (typeof KINDS)[number];

const BUCKET = "site-assets";
const MAX_BYTES = 15 * 1024 * 1024;

function isKind(value: unknown): value is Kind {
  return typeof value === "string" && (KINDS as readonly string[]).includes(value);
}

/** POST — upload a reference asset (multipart) or register one by URL (JSON). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getNetworkUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: characterId } = await params;
  const supabase = createAdminSupabase();
  const contentType = req.headers.get("content-type") ?? "";

  let kind: unknown;
  let url: string | null = null;
  let storagePath: string | null = null;
  let notes: string | null = null;
  let isPrimary = false;

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("file");
    kind = form.get("kind");
    notes = (form.get("notes") as string) || null;
    isPrimary = form.get("is_primary") === "true";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file supplied" }, { status: 400 });
    }
    if (!isKind(kind)) {
      return NextResponse.json({ error: `kind must be one of: ${KINDS.join(", ")}` }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File exceeds 15MB" }, { status: 413 });
    }

    const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
    storagePath = `network/characters/${characterId}/${kind}-${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, await file.arrayBuffer(), { contentType: file.type, upsert: true });

    if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
    url = publicUrl;
  } else {
    const body = (await req.json()) as Record<string, unknown>;
    kind = body.kind;
    url = typeof body.url === "string" ? body.url : null;
    notes = typeof body.notes === "string" ? body.notes : null;
    isPrimary = Boolean(body.is_primary);

    if (!isKind(kind)) {
      return NextResponse.json({ error: `kind must be one of: ${KINDS.join(", ")}` }, { status: 400 });
    }
    if (!url) return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  // One primary per kind: promoting a new reference demotes the previous one,
  // otherwise the consistency engine has two candidates and no rule.
  if (isPrimary) {
    await supabase
      .from("cn_character_assets")
      .update({ is_primary: false })
      .eq("character_id", characterId)
      .eq("kind", kind);
  }

  const { data, error } = await supabase
    .from("cn_character_assets")
    .insert({
      character_id: characterId,
      kind,
      url,
      storage_path: storagePath,
      notes,
      is_primary: isPrimary,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // The face reference is quoted directly in every visual prompt, so keep the
  // Bible's shortcut field in step with the primary face asset.
  if (isPrimary && kind === "face" && url) {
    await supabase.from("cn_characters").update({ face_reference: url }).eq("id", characterId);
  }

  return NextResponse.json({ data });
}

/** DELETE — remove one reference asset, and its stored file when we own it. */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getNetworkUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: characterId } = await params;
  const assetId = req.nextUrl.searchParams.get("assetId");
  if (!assetId) return NextResponse.json({ error: "assetId is required" }, { status: 400 });

  const supabase = createAdminSupabase();

  // Scope the lookup to the character in the path so an id from another
  // character cannot be deleted through this route.
  const { data: asset } = await supabase
    .from("cn_character_assets")
    .select("id, storage_path")
    .eq("id", assetId)
    .eq("character_id", characterId)
    .maybeSingle();

  if (!asset) return NextResponse.json({ error: "Asset not found" }, { status: 404 });

  if (asset.storage_path) {
    await supabase.storage.from(BUCKET).remove([asset.storage_path]);
  }

  const { error } = await supabase.from("cn_character_assets").delete().eq("id", assetId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
