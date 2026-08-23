import { NextRequest, NextResponse } from "next/server";

import { createAdminSupabase } from "@/lib/supabase-admin";
import { getNetworkUser } from "@/lib/network/auth";

/**
 * Character Bible fields an operator may edit (spec §17).
 *
 * An explicit allowlist, not a spread of the request body: `id`, `slug` and
 * `partner_character_id` are identity and would silently re-point a character's
 * history if a client sent them.
 */
const TEXT_FIELDS = [
  "name", "age_range", "gender_presentation", "market", "language", "accent",
  "bio", "personality", "tone", "visual_description", "face_reference",
  "body_description", "hair", "eyes", "wardrobe", "voice_provider", "voice_id",
  "master_image_prompt", "master_video_prompt", "negative_prompt",
  "backstory", "brand_rules", "safety_rules",
] as const;

const ARRAY_FIELDS = [
  "vocabulary", "catchphrases", "interests", "content_pillars",
  "commercial_categories", "things_character_says", "things_character_never_says",
] as const;

/** Accepts either a real array or the newline/comma text the editor sends. */
function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((v) => v.trim()).filter(Boolean);
  if (typeof value === "string") {
    return value.split(/[\n,]/).map((v) => v.trim()).filter(Boolean);
  }
  return [];
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getNetworkUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await req.json()) as Record<string, unknown>;

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

  for (const field of TEXT_FIELDS) {
    if (field in body) {
      const value = body[field];
      update[field] = typeof value === "string" && value.trim() === "" ? null : value;
    }
  }
  for (const field of ARRAY_FIELDS) {
    if (field in body) update[field] = toArray(body[field]);
  }
  if ("is_active" in body) update.is_active = Boolean(body.is_active);

  // Only `updated_at` present: nothing was actually submitted.
  if (Object.keys(update).length === 1) {
    return NextResponse.json({ error: "No editable fields supplied" }, { status: 400 });
  }

  const supabase = createAdminSupabase();
  const { data, error } = await supabase
    .from("cn_characters")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
