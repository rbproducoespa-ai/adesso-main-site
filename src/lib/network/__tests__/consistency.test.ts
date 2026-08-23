import { describe, expect, it } from "vitest";

import { buildMasterProfile, composeCouplePrompt, composePrompt } from "../consistency";
import { DEMO_CHARACTER_LIST } from "../demo";
import type { Character } from "../types";

const maya = DEMO_CHARACTER_LIST[0];
const arthur = DEMO_CHARACTER_LIST[2];
const rose = DEMO_CHARACTER_LIST[3];

function withFields(base: Character, over: Partial<Character>): Character {
  return { ...base, ...over };
}

const labels = (sections: { label: string }[]) => sections.map((s) => s.label);

describe("buildMasterProfile", () => {
  it("always states the character is fictional", () => {
    expect(buildMasterProfile(maya)).toContain("fictional AI character — not a real person");
  });

  it("omits empty Bible fields instead of emitting blank lines", () => {
    const sparse = withFields(maya, { hair: null, eyes: null, body_description: null });
    const profile = buildMasterProfile(sparse);

    expect(profile).not.toContain("HAIR:");
    expect(profile).not.toContain("EYES:");
    expect(profile.split("\n").every((line) => line.trim().length > 0)).toBe(true);
  });

  it("includes accent alongside language when both are set", () => {
    expect(buildMasterProfile(maya)).toContain("LANGUAGE: en-GB (British English)");
  });

  it("is stable for the same character — the point of the engine", () => {
    expect(buildMasterProfile(maya)).toBe(buildMasterProfile(maya));
  });

  it("lists the phrases the character must never say", () => {
    const guarded = withFields(maya, { things_character_never_says: ["as a real person", "I promise results"] });

    expect(buildMasterProfile(guarded)).toContain("NEVER SAYS: as a real person, I promise results");
  });
});

describe("composePrompt", () => {
  it("composes the sections the spec requires, in order", () => {
    const composed = composePrompt(maya, {
      scene: "Small kitchen, morning",
      action: "Unboxing a hair tool",
      camera: "Handheld medium shot",
      lighting: "Soft window light",
      emotion: "Curious",
      dialogue: "Right, let us see if this is worth nine pounds.",
      platform: "tiktok",
      durationSeconds: 22,
    });

    expect(labels(composed.sections)).toEqual([
      "CHARACTER MASTER PROFILE",
      "SCENE",
      "ACTION",
      "CLOTHING",
      "CAMERA",
      "LIGHTING",
      "EMOTION",
      "DIALOGUE",
      "PLATFORM FORMAT",
      "IDENTITY CONSTRAINT",
    ]);
  });

  it("falls back to the character's default wardrobe when the scene sets no clothing", () => {
    const composed = composePrompt(maya, { scene: "Kitchen" });
    const clothing = composed.sections.find((s) => s.label === "CLOTHING");

    expect(clothing?.value).toBe(maya.wardrobe);
  });

  it("lets a scene override wardrobe for one shot without changing the Bible", () => {
    const composed = composePrompt(maya, { scene: "Beach", clothing: "Linen shirt over swimwear" });

    expect(composed.sections.find((s) => s.label === "CLOTHING")?.value).toBe("Linen shirt over swimwear");
    expect(maya.wardrobe).toContain("high-street");
  });

  it("drops visual sections for voice generation", () => {
    const composed = composePrompt(maya, { scene: "Kitchen", camera: "Close up", lighting: "Warm" }, "voice");

    expect(labels(composed.sections)).not.toContain("CAMERA");
    expect(labels(composed.sections)).not.toContain("LIGHTING");
    expect(labels(composed.sections)).not.toContain("CLOTHING");
    expect(composed.negativePrompt).toBeNull();
  });

  it("carries the negative prompt on visual targets", () => {
    expect(composePrompt(maya, {}, "image").negativePrompt).toContain("deformed hands");
  });

  it("always appends the identity constraint, whatever the scene says", () => {
    const composed = composePrompt(maya, { scene: "Anything" });

    expect(composed.prompt).toContain("Do not reproduce the likeness, voice or branding of any real person.");
  });

  it("derives aspect ratio from the platform for visual targets only", () => {
    const image = composePrompt(maya, { platform: "instagram" }, "image");
    const voice = composePrompt(maya, { platform: "instagram" }, "voice");

    expect(image.sections.find((s) => s.label === "PLATFORM FORMAT")?.value).toContain("9:16 vertical");
    expect(voice.sections.find((s) => s.label === "PLATFORM FORMAT")?.value).not.toContain("9:16");
  });

  it("reports the Bible fields a visual target is missing", () => {
    const bare = withFields(maya, { visual_description: null, wardrobe: null, face_reference: null });

    expect(composePrompt(bare, {}, "image").missing).toEqual(
      expect.arrayContaining(["visual_description", "wardrobe", "face_reference", "master_image_prompt"]),
    );
  });

  it("reports voice fields only for the voice target", () => {
    const noVoice = withFields(maya, { voice_provider: null, voice_id: null });

    expect(composePrompt(noVoice, {}, "voice").missing).toEqual(
      expect.arrayContaining(["voice_provider", "voice_id"]),
    );
    expect(composePrompt(noVoice, {}, "image").missing).not.toContain("voice_id");
  });

  it("reports no gaps once the Bible is complete for that target", () => {
    const complete = withFields(maya, {
      visual_description: "described",
      wardrobe: "styled",
      face_reference: "https://example.com/face.png",
      master_image_prompt: "master",
    });

    expect(composePrompt(complete, {}, "image").missing).toEqual([]);
  });

  it("headers the prompt with its target", () => {
    expect(composePrompt(maya, {}, "thumbnail").prompt.startsWith("THUMBNAIL GENERATION")).toBe(true);
  });
});

describe("composeCouplePrompt", () => {
  it("keeps both characters as separate master profiles", () => {
    const composed = composeCouplePrompt(arthur, rose, { scene: "Kitchen table" });

    expect(labels(composed.sections)).toEqual(
      expect.arrayContaining([`CHARACTER A — ${arthur.name}`, `CHARACTER B — ${rose.name}`]),
    );
    expect(composed.prompt).toContain("Arthur Bennett");
    expect(composed.prompt).toContain("Rose Bennett");
  });

  it("supports a per-character action split", () => {
    const composed = composeCouplePrompt(arthur, rose, {
      scene: "Kitchen",
      actionA: "Reading the instructions aloud",
      actionB: "Already using the device correctly",
    });

    expect(composed.sections.find((s) => s.label === `ACTION — ${rose.name}`)?.value).toBe(
      "Already using the device correctly",
    );
  });

  it("merges both negative prompts without duplicating shared terms", () => {
    const negatives = composeCouplePrompt(arthur, rose, {}, "video").negativePrompt ?? "";
    const occurrences = negatives.split(", ").filter((term) => term === "watermark").length;

    expect(occurrences).toBe(1);
  });

  it("unions the missing fields of both characters", () => {
    const a = withFields(arthur, { visual_description: null });
    const b = withFields(rose, { wardrobe: null });

    expect(composeCouplePrompt(a, b, {}, "image").missing).toEqual(
      expect.arrayContaining(["visual_description", "wardrobe"]),
    );
  });

  it("marks the output as a couple format", () => {
    expect(composeCouplePrompt(arthur, rose, {}).prompt).toContain("COUPLE FORMAT");
  });
});
