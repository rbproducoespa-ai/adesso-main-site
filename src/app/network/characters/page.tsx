import Link from "next/link";

import { PLATFORM_LABEL } from "@/lib/network/constants";
import { getCharacters } from "@/lib/network/queries";
import type { Character } from "@/lib/network/types";

import { DemoBadge, PageHeader } from "../_components/ui";

export const dynamic = "force-dynamic";

/**
 * How complete a Character Bible is. The consistency engine can only hold a
 * character steady across generations if these are filled in, so the roster
 * shows the gap rather than waiting for a bad render to reveal it.
 */
const BIBLE_FIELDS: (keyof Character)[] = [
  "bio", "personality", "tone", "visual_description", "body_description",
  "hair", "eyes", "wardrobe", "voice_provider", "voice_id",
  "master_image_prompt", "master_video_prompt", "negative_prompt",
  "backstory", "brand_rules", "safety_rules", "face_reference",
];

function completeness(character: Character): number {
  const filled = BIBLE_FIELDS.filter((field) => {
    const value = character[field];
    return typeof value === "string" && value.trim().length > 0;
  }).length;
  return Math.round((filled / BIBLE_FIELDS.length) * 100);
}

export default async function CharactersPage() {
  const { isDemo, characters, accountsByCharacter } = await getCharacters();

  return (
    <>
      <PageHeader
        title="Characters"
        description="Four fictional creators. The Character Bible is what keeps each one consistent across every image, video and voice generation."
        right={isDemo ? <DemoBadge /> : undefined}
      />

      <div className="space-y-4 px-7 py-6">
        {isDemo && (
          <p className="border border-accent/30 bg-accent/5 px-4 py-3 text-[12px] leading-relaxed text-text-secondary">
            <strong className="text-accent-secondary">Demo data.</strong> These are the seeded characters shown
            from a local fixture because Supabase is not connected. Editing is disabled until the{" "}
            <code className="text-text-primary">cn_*</code> tables are live.
          </p>
        )}

        <div className="grid gap-3 md:grid-cols-2">
          {characters.map((character) => {
            const accounts = accountsByCharacter[character.id] ?? [];
            const percent = completeness(character);

            return (
              <Link
                key={character.id}
                href={`/network/characters/${character.slug}`}
                className="group flex flex-col border border-border bg-bg-card p-5 transition-colors hover:border-accent/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-display text-[17px] font-bold group-hover:text-accent-secondary">
                      {character.name}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-text-muted">
                      {character.age_range} · {character.gender_presentation} · {character.market}
                    </p>
                  </div>
                  <span className="flex-shrink-0 border border-border px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-text-muted">
                    #{character.launch_order}
                  </span>
                </div>

                {character.bio && (
                  <p className="mt-3 text-[12px] leading-relaxed text-text-secondary">{character.bio}</p>
                )}

                <div className="mt-4">
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span className="uppercase tracking-[0.14em] text-text-muted">Bible completeness</span>
                    <span className="tabular-nums text-text-secondary">{percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-secondary">
                    <div
                      className={percent >= 80 ? "h-full bg-success" : "h-full bg-accent"}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {character.content_pillars.slice(0, 5).map((pillar) => (
                    <span key={pillar} className="border border-border px-1.5 py-0.5 text-[9px] text-text-muted">
                      {pillar}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3 border-t border-border pt-3 text-[10px] text-text-muted">
                  {accounts.length > 0 ? (
                    accounts.map((account) => (
                      <span key={account.id} className={account.is_live ? "text-success" : undefined}>
                        {PLATFORM_LABEL[account.platform]}
                        {account.is_live ? " · live" : ""}
                      </span>
                    ))
                  ) : (
                    <span>No platform accounts registered</span>
                  )}
                  <span className="ml-auto text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Open bible →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
