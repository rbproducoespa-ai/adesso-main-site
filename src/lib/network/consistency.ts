/**
 * Character Consistency Engine — spec §18.
 *
 * Every generation prompt is composed, never hand-written:
 *
 *   CHARACTER MASTER PROFILE + SCENE + ACTION + CLOTHING + CAMERA
 *     + LIGHTING + EMOTION + DIALOGUE + PLATFORM FORMAT
 *
 * Composing it here rather than in the UI is what makes consistency a property
 * of the pipeline instead of a property of whoever is typing. Image, video,
 * voice, b-roll and thumbnail prompts (§26) all inherit the same master profile.
 */

import type { Character, Platform, ScriptFormat } from "./types";

export type PromptTarget = "image" | "video" | "voice" | "broll" | "thumbnail";

export interface SceneInput {
  scene?: string;
  action?: string;
  /** Overrides the character's default wardrobe for this shot only. */
  clothing?: string;
  camera?: string;
  lighting?: string;
  emotion?: string;
  dialogue?: string;
  platform?: Platform;
  format?: ScriptFormat;
  durationSeconds?: number;
}

export interface ComposedPrompt {
  target: PromptTarget;
  prompt: string;
  negativePrompt: string | null;
  /** The sections that were filled, in order — useful for showing gaps in the UI. */
  sections: { label: string; value: string }[];
  /** Bible fields this character is missing for this target. */
  missing: string[];
}

const ASPECT: Record<Platform, string> = {
  tiktok: "9:16 vertical",
  instagram: "9:16 vertical",
  youtube: "9:16 vertical for Shorts, 16:9 for long form",
  other: "9:16 vertical",
};

function list(values: string[] | null | undefined, limit = 8): string | null {
  if (!values || values.length === 0) return null;
  return values.slice(0, limit).join(", ");
}

/**
 * The character's permanent identity, rendered as prompt text. This is the part
 * that must be byte-identical across every generation for a given character —
 * it is why the Character Bible is a database record and not a note somewhere.
 */
export function buildMasterProfile(character: Character): string {
  const lines: string[] = [
    `NAME: ${character.name} (fictional AI character — not a real person)`,
  ];

  const add = (label: string, value: string | null | undefined) => {
    if (value && value.trim()) lines.push(`${label}: ${value.trim()}`);
  };

  add("AGE", character.age_range);
  add("PRESENTATION", character.gender_presentation);
  add("MARKET", character.market);
  add("LANGUAGE", character.language ? `${character.language}${character.accent ? ` (${character.accent})` : ""}` : null);
  add("APPEARANCE", character.visual_description);
  add("BODY", character.body_description);
  add("HAIR", character.hair);
  add("EYES", character.eyes);
  add("DEFAULT WARDROBE", character.wardrobe);
  add("PERSONALITY", character.personality);
  add("TONE", character.tone);
  add("INTERESTS", list(character.interests));
  add("VOCABULARY", list(character.vocabulary));
  add("CATCHPHRASES", list(character.catchphrases));
  add("NEVER SAYS", list(character.things_character_never_says));

  return lines.join("\n");
}

/** Bible fields a given target needs before it can produce consistent output. */
function missingFields(character: Character, target: PromptTarget): string[] {
  const gaps: string[] = [];
  const needsVisual = target !== "voice";

  if (needsVisual) {
    if (!character.visual_description) gaps.push("visual_description");
    if (!character.wardrobe) gaps.push("wardrobe");
    if (!character.face_reference) gaps.push("face_reference");
  }
  if (target === "voice") {
    if (!character.voice_provider) gaps.push("voice_provider");
    if (!character.voice_id) gaps.push("voice_id");
  }
  if (target === "image" && !character.master_image_prompt) gaps.push("master_image_prompt");
  if (target === "video" && !character.master_video_prompt) gaps.push("master_video_prompt");

  return gaps;
}

const TARGET_HEADER: Record<PromptTarget, string> = {
  image: "IMAGE GENERATION",
  video: "VIDEO GENERATION",
  voice: "VOICE GENERATION",
  broll: "B-ROLL GENERATION",
  thumbnail: "THUMBNAIL GENERATION",
};

/**
 * Composes one generation prompt for a character and a scene.
 *
 * Voice deliberately drops the visual sections: sending wardrobe and camera
 * notes to a TTS provider is noise that degrades the read.
 */
export function composePrompt(
  character: Character,
  scene: SceneInput,
  target: PromptTarget = "image",
): ComposedPrompt {
  const visual = target !== "voice";
  const sections: { label: string; value: string }[] = [];

  const push = (label: string, value: string | null | undefined) => {
    if (value && value.trim()) sections.push({ label, value: value.trim() });
  };

  push("CHARACTER MASTER PROFILE", buildMasterProfile(character));

  if (visual && target === "image") push("MASTER IMAGE PROMPT", character.master_image_prompt);
  if (visual && (target === "video" || target === "broll")) {
    push("MASTER VIDEO PROMPT", character.master_video_prompt);
  }

  push("SCENE", scene.scene);
  push("ACTION", scene.action);
  if (visual) {
    push("CLOTHING", scene.clothing ?? character.wardrobe);
    push("CAMERA", scene.camera);
    push("LIGHTING", scene.lighting);
  }
  push("EMOTION", scene.emotion);
  push("DIALOGUE", scene.dialogue);

  if (target === "voice") {
    push(
      "VOICE",
      [
        character.voice_provider ? `provider ${character.voice_provider}` : null,
        character.voice_id ? `voice ${character.voice_id}` : null,
        character.accent,
      ]
        .filter(Boolean)
        .join(", ") || null,
    );
  }

  const platform = scene.platform ?? "tiktok";
  const formatBits = [
    `platform ${platform}`,
    visual ? ASPECT[platform] : null,
    scene.format ?? null,
    scene.durationSeconds ? `${scene.durationSeconds}s` : null,
  ].filter(Boolean);
  push("PLATFORM FORMAT", formatBits.join(" · "));

  // Spec §38: the output must never read as a specific real person.
  push(
    "IDENTITY CONSTRAINT",
    "Original fictional character. Do not reproduce the likeness, voice or branding of any real person.",
  );

  const body = sections.map((s) => `${s.label}\n${s.value}`).join("\n\n");

  return {
    target,
    prompt: `${TARGET_HEADER[target]}\n\n${body}`,
    negativePrompt: visual ? character.negative_prompt : null,
    sections,
    missing: missingFields(character, target),
  };
}

export interface CoupleSceneInput extends SceneInput {
  /** What each character is doing, when the scene splits them. */
  actionA?: string;
  actionB?: string;
}

/**
 * Couple formats for Arthur + Rose — spec §8.
 *
 * They remain two separate character entities: each keeps its own master
 * profile, and the scene is layered on top. Merging them into one profile would
 * lose the individual consistency that makes them usable apart.
 */
export function composeCouplePrompt(
  a: Character,
  b: Character,
  scene: CoupleSceneInput,
  target: PromptTarget = "video",
): ComposedPrompt {
  const visual = target !== "voice";
  const sections: { label: string; value: string }[] = [
    { label: `CHARACTER A — ${a.name}`, value: buildMasterProfile(a) },
    { label: `CHARACTER B — ${b.name}`, value: buildMasterProfile(b) },
  ];

  const push = (label: string, value: string | null | undefined) => {
    if (value && value.trim()) sections.push({ label, value: value.trim() });
  };

  push("RELATIONSHIP", `${a.name} and ${b.name} are a married couple appearing together in one scene.`);
  push("SCENE", scene.scene);
  push("ACTION", scene.action);
  push(`ACTION — ${a.name}`, scene.actionA);
  push(`ACTION — ${b.name}`, scene.actionB);
  if (visual) {
    push("CLOTHING", scene.clothing ?? [a.wardrobe, b.wardrobe].filter(Boolean).join(" / "));
    push("CAMERA", scene.camera);
    push("LIGHTING", scene.lighting);
  }
  push("EMOTION", scene.emotion);
  push("DIALOGUE", scene.dialogue);

  const platform = scene.platform ?? "tiktok";
  push(
    "PLATFORM FORMAT",
    [`platform ${platform}`, visual ? ASPECT[platform] : null, scene.durationSeconds ? `${scene.durationSeconds}s` : null]
      .filter(Boolean)
      .join(" · "),
  );
  push(
    "IDENTITY CONSTRAINT",
    "Two original fictional characters. Do not reproduce the likeness, voice or branding of any real person.",
  );

  const negatives = [a.negative_prompt, b.negative_prompt].filter(Boolean);

  return {
    target,
    prompt: `${TARGET_HEADER[target]} — COUPLE FORMAT\n\n${sections.map((s) => `${s.label}\n${s.value}`).join("\n\n")}`,
    negativePrompt: visual && negatives.length > 0 ? [...new Set(negatives.join(", ").split(", "))].join(", ") : null,
    sections,
    missing: [...new Set([...missingFields(a, target), ...missingFields(b, target)])],
  };
}
