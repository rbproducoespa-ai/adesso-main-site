import Link from "next/link";
import { notFound } from "next/navigation";

import { composePrompt } from "@/lib/network/consistency";
import { getCharacter } from "@/lib/network/queries";

import { DemoBadge, PageHeader } from "../../_components/ui";
import { CharacterBible } from "./_components/CharacterBible";

export const dynamic = "force-dynamic";

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const detail = await getCharacter(slug);

  if (!detail) notFound();

  const { character, accounts, assets, partner, isDemo } = detail;

  // Composed server-side so the page shows what the pipeline would actually
  // send, not an approximation written in the component.
  const previews = {
    image: composePrompt(character, {
      scene: "Bright kitchen, morning light",
      action: "Holding a product up to camera",
      emotion: "Curious",
      platform: "tiktok",
    }, "image"),
    video: composePrompt(character, {
      scene: "Bright kitchen, morning light",
      action: "Demonstrating the product",
      camera: "Handheld medium shot, slow push in",
      lighting: "Soft window light",
      emotion: "Enthusiastic but honest",
      platform: "tiktok",
      durationSeconds: 22,
    }, "video"),
    voice: composePrompt(character, {
      emotion: "Warm, conversational",
      dialogue: "I did not expect this one to work.",
      platform: "tiktok",
    }, "voice"),
  };

  return (
    <>
      <PageHeader
        title={character.name}
        description={character.bio ?? "Character Bible — the permanent identity record for this creator."}
        right={
          <div className="flex items-center gap-2">
            {isDemo && <DemoBadge />}
            <Link
              href="/network/characters"
              className="border border-border px-2.5 py-1 text-[11px] text-text-secondary hover:text-accent"
            >
              ← All characters
            </Link>
          </div>
        }
      />

      <CharacterBible
        character={character}
        accounts={accounts}
        assets={assets}
        partner={partner}
        previews={previews}
        readOnly={isDemo}
      />
    </>
  );
}
