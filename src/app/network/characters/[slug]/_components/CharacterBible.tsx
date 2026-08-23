"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { ComposedPrompt } from "@/lib/network/consistency";
import { PLATFORM_LABEL } from "@/lib/network/constants";
import type { Character, CharacterAsset, PlatformAccount } from "@/lib/network/types";

type TextField = {
  key: keyof Character;
  label: string;
  hint?: string;
  multiline?: boolean;
  /** Comma or newline separated in the editor, string[] in the database. */
  list?: boolean;
};

/** Character Bible field groups — spec §17. */
const GROUPS: { id: string; label: string; fields: TextField[] }[] = [
  {
    id: "identity",
    label: "Identity",
    fields: [
      { key: "name", label: "Name" },
      { key: "age_range", label: "Apparent age" },
      { key: "gender_presentation", label: "Presentation" },
      { key: "market", label: "Market" },
      { key: "language", label: "Language" },
      { key: "accent", label: "Accent" },
      { key: "bio", label: "Bio", multiline: true },
      { key: "personality", label: "Personality", multiline: true },
      { key: "tone", label: "Tone" },
      { key: "backstory", label: "Backstory", multiline: true },
      { key: "content_pillars", label: "Content pillars", list: true, hint: "One per line, or comma separated" },
      { key: "commercial_categories", label: "Commercial categories", list: true },
      { key: "interests", label: "Interests", list: true },
      { key: "vocabulary", label: "Vocabulary", list: true },
      { key: "catchphrases", label: "Catchphrases", list: true },
    ],
  },
  {
    id: "look",
    label: "Voice & look",
    fields: [
      { key: "visual_description", label: "Visual description", multiline: true },
      { key: "body_description", label: "Body" },
      { key: "hair", label: "Hair" },
      { key: "eyes", label: "Eyes" },
      { key: "wardrobe", label: "Default wardrobe", multiline: true },
      { key: "face_reference", label: "Face reference URL", hint: "Set automatically when a primary face asset is uploaded" },
      { key: "voice_provider", label: "Voice provider" },
      { key: "voice_id", label: "Voice ID" },
    ],
  },
  {
    id: "prompts",
    label: "Prompts",
    fields: [
      { key: "master_image_prompt", label: "Master image prompt", multiline: true },
      { key: "master_video_prompt", label: "Master video prompt", multiline: true },
      { key: "negative_prompt", label: "Negative prompt", multiline: true },
    ],
  },
  {
    id: "rules",
    label: "Rules",
    fields: [
      { key: "brand_rules", label: "Brand rules", multiline: true },
      { key: "safety_rules", label: "Safety rules", multiline: true },
      { key: "things_character_says", label: "Things this character says", list: true },
      { key: "things_character_never_says", label: "Things this character never says", list: true },
    ],
  },
];

const ASSET_KINDS = ["face", "full_body", "side", "lifestyle", "wardrobe", "voice"] as const;

const ASSET_LABEL: Record<string, string> = {
  face: "Face", full_body: "Full body", side: "Side", lifestyle: "Lifestyle",
  wardrobe: "Wardrobe", voice: "Voice",
};

function toEditable(character: Character): Record<string, string> {
  const form: Record<string, string> = {};
  for (const group of GROUPS) {
    for (const field of group.fields) {
      const value = character[field.key];
      form[field.key as string] = Array.isArray(value) ? value.join("\n") : ((value as string | null) ?? "");
    }
  }
  return form;
}

export function CharacterBible({
  character,
  accounts,
  assets,
  partner,
  previews,
  readOnly,
}: {
  character: Character;
  accounts: PlatformAccount[];
  assets: CharacterAsset[];
  partner: Character | null;
  previews: Record<"image" | "video" | "voice", ComposedPrompt>;
  readOnly: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<string>("identity");
  const [form, setForm] = useState(() => toEditable(character));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const initial = toEditable(character);
  const dirty = Object.keys(form).some((key) => form[key] !== initial[key]);

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/network/characters/${character.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Save failed");
      setMessage({ kind: "ok", text: "Bible saved." });
      router.refresh();
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  const tabs = [...GROUPS.map((g) => ({ id: g.id, label: g.label })),
    { id: "assets", label: `Assets (${assets.length})` },
    { id: "consistency", label: "Consistency" }];

  return (
    <div className="px-7 py-6">
      <nav className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-3 py-2 text-[12px] transition-colors ${
              tab === t.id
                ? "border-b-2 border-accent text-text-primary"
                : "border-b-2 border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div className="py-5">
        {GROUPS.map(
          (group) =>
            tab === group.id && (
              <div key={group.id} className="grid max-w-4xl gap-4 md:grid-cols-2">
                {group.fields.map((field) => (
                  <label
                    key={field.key as string}
                    className={field.multiline || field.list ? "md:col-span-2" : undefined}
                  >
                    <span className="mb-1 block text-[10px] font-medium uppercase tracking-[0.14em] text-text-muted">
                      {field.label}
                      {field.hint && <span className="ml-2 normal-case tracking-normal opacity-70">{field.hint}</span>}
                    </span>
                    {field.multiline || field.list ? (
                      <textarea
                        rows={field.list ? 4 : 3}
                        disabled={readOnly}
                        value={form[field.key as string]}
                        onChange={(e) => setForm({ ...form, [field.key as string]: e.target.value })}
                        className="w-full resize-y border border-border bg-bg-secondary px-3 py-2 text-[13px] text-text-primary outline-none focus:border-accent disabled:opacity-60"
                      />
                    ) : (
                      <input
                        type="text"
                        disabled={readOnly}
                        value={form[field.key as string]}
                        onChange={(e) => setForm({ ...form, [field.key as string]: e.target.value })}
                        className="w-full border border-border bg-bg-secondary px-3 py-2 text-[13px] text-text-primary outline-none focus:border-accent disabled:opacity-60"
                      />
                    )}
                  </label>
                ))}
              </div>
            ),
        )}

        {tab === "assets" && (
          <AssetPanel characterId={character.id} assets={assets} readOnly={readOnly} onChange={() => router.refresh()} />
        )}

        {tab === "consistency" && (
          <ConsistencyPanel previews={previews} accounts={accounts} partner={partner} />
        )}
      </div>

      {!readOnly && GROUPS.some((g) => g.id === tab) && (
        <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-bg-primary py-3">
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="bg-accent px-4 py-2 text-[12px] font-semibold text-white disabled:opacity-40"
          >
            {saving ? "Saving…" : "Save bible"}
          </button>
          {dirty && !saving && <span className="text-[11px] text-text-muted">Unsaved changes</span>}
          {message && (
            <span className={`text-[11px] ${message.kind === "ok" ? "text-success" : "text-red-400"}`}>
              {message.text}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function AssetPanel({
  characterId,
  assets,
  readOnly,
  onChange,
}: {
  characterId: string;
  assets: CharacterAsset[];
  readOnly: boolean;
  onChange: () => void;
}) {
  const [kind, setKind] = useState<string>("face");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setBusy(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("kind", kind);
      body.append("is_primary", String(!assets.some((a) => a.kind === kind && a.is_primary)));

      const res = await fetch(`/api/network/characters/${characterId}/assets`, { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Upload failed");
      onChange();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function remove(assetId: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/network/characters/${characterId}/assets?assetId=${assetId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Delete failed");
      onChange();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-5">
      <p className="text-[12px] leading-relaxed text-text-secondary">
        Reference assets pin the character&apos;s look and voice across every generation. The consistency engine
        quotes the primary reference of each kind.
      </p>

      {!readOnly && (
        <div className="flex flex-wrap items-end gap-3 border border-border bg-bg-card p-4">
          <label className="text-[11px]">
            <span className="mb-1 block uppercase tracking-[0.14em] text-text-muted">Kind</span>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="border border-border bg-bg-secondary px-3 py-2 text-[13px] text-text-primary outline-none focus:border-accent"
            >
              {ASSET_KINDS.map((k) => (
                <option key={k} value={k}>
                  {ASSET_LABEL[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-[11px]">
            <span className="mb-1 block uppercase tracking-[0.14em] text-text-muted">File</span>
            <input
              type="file"
              disabled={busy}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void upload(file);
                e.target.value = "";
              }}
              className="text-[12px] text-text-secondary file:mr-3 file:border file:border-border file:bg-bg-secondary file:px-3 file:py-1.5 file:text-[12px] file:text-text-primary"
            />
          </label>
          {busy && <span className="text-[11px] text-text-muted">Working…</span>}
          {error && <span className="text-[11px] text-red-400">{error}</span>}
        </div>
      )}

      <div className="space-y-4">
        {ASSET_KINDS.map((k) => {
          const forKind = assets.filter((a) => a.kind === k);
          return (
            <div key={k}>
              <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">
                {ASSET_LABEL[k]} {forKind.length === 0 && <span className="font-normal opacity-70">— none yet</span>}
              </h3>
              {forKind.length > 0 && (
                <ul className="grid gap-2 md:grid-cols-2">
                  {forKind.map((asset) => (
                    <li key={asset.id} className="flex items-center gap-3 border border-border bg-bg-card p-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          {asset.is_primary && (
                            <span className="border border-success/40 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-success">
                              Primary
                            </span>
                          )}
                          <a
                            href={asset.url ?? "#"}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate text-[12px] text-accent hover:underline"
                          >
                            {asset.storage_path?.split("/").pop() ?? asset.url}
                          </a>
                        </div>
                        {asset.notes && <p className="mt-1 text-[11px] text-text-muted">{asset.notes}</p>}
                      </div>
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => void remove(asset.id)}
                          disabled={busy}
                          className="flex-shrink-0 text-[11px] text-text-muted hover:text-red-400 disabled:opacity-40"
                        >
                          Remove
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ConsistencyPanel({
  previews,
  accounts,
  partner,
}: {
  previews: Record<"image" | "video" | "voice", ComposedPrompt>;
  accounts: PlatformAccount[];
  partner: Character | null;
}) {
  const [target, setTarget] = useState<"image" | "video" | "voice">("image");
  const preview = previews[target];

  return (
    <div className="max-w-4xl space-y-4">
      <p className="text-[12px] leading-relaxed text-text-secondary">
        This is what the pipeline sends for a sample scene — master profile plus scene, action, clothing, camera,
        lighting, emotion, dialogue and platform format. Saved Bible fields change it; the scene here is an example.
      </p>

      <div className="flex gap-1">
        {(["image", "video", "voice"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTarget(t)}
            className={`border px-3 py-1.5 text-[11px] capitalize transition-colors ${
              target === t
                ? "border-accent bg-accent/10 text-accent-secondary"
                : "border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {preview.missing.length > 0 && (
        <div className="border border-accent/40 bg-accent/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-secondary">
            Bible gaps for {target}
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-text-secondary">
            Generation will drift without these: {preview.missing.map((f) => f.replace(/_/g, " ")).join(", ")}.
          </p>
        </div>
      )}

      <pre className="overflow-x-auto border border-border bg-bg-card p-4 text-[11px] leading-relaxed text-text-secondary">
        {preview.prompt}
      </pre>

      {preview.negativePrompt && (
        <div>
          <h3 className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Negative prompt</h3>
          <p className="border border-border bg-bg-card p-3 text-[11px] text-text-secondary">
            {preview.negativePrompt}
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Platform accounts</h3>
          <ul className="space-y-1 text-[12px] text-text-secondary">
            {accounts.length === 0 && <li className="text-text-muted">None registered.</li>}
            {accounts.map((account) => (
              <li key={account.id} className="flex justify-between border border-border bg-bg-card px-3 py-2">
                <span>{PLATFORM_LABEL[account.platform]}</span>
                <span className="tabular-nums text-text-muted">
                  {account.handle ?? "no handle"} · {account.is_live ? "live" : "not live"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {partner && (
          <div>
            <h3 className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-text-muted">Couple format</h3>
            <p className="border border-border bg-bg-card p-3 text-[12px] leading-relaxed text-text-secondary">
              Pairs with <strong className="text-text-primary">{partner.name}</strong>. They stay separate character
              entities — each keeps its own master profile, and the couple prompt layers a shared scene on top.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
