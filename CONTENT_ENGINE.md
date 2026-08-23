# AI CREATOR NETWORK OS — Content Engine

How an observation about someone else's successful video becomes an original
video of ours, and then becomes revenue.

## The rule the engine is built around

> **Mirror the mechanism, not the content.** (spec §3)

A reference teaches us *why* something worked: hook type, psychology, topic,
pacing, shot structure, editing rhythm, emotional trigger, problem, value
proposition, CTA structure.

A reference never supplies: dialogue, footage, likeness, voice, music,
watermark, logo, branding, or any other protected asset.

This is not a disclaimer bolted on at the end. It shapes the schema — the Viral
Mirror analysis stores *structure*, never a transcript — and it is enforced at
the READY gate by the originality score (§39). If the engine ever finds itself
producing a sentence-by-sentence rewrite of a source script, the engine is
broken, not the policy.

## The loop (spec §2)

```
DISCOVER → ANALYSE → CONTENT DNA → MATCH CHARACTER → GENERATE CONCEPT
    → SCRIPT → ASSETS → COMPLIANCE → PUBLISH → MEASURE → WINNER / LOSER
    → NEW VARIATIONS → MONETISE
```

Each arrow is a table transition, not a vibe. The pipeline status on
`cn_productions` is the ground truth (§27).

### 1. Discover (§19) — `cn_references`

Register a TikTok, Instagram, YouTube or manual reference with its metrics,
product, category and risk flags. `analysis_status` moves `pending → analysing →
analysed`. A reference flagged as high-risk (real person, licensed music,
recognisable branding) never reaches the generator.

### 2. Viral Mirror Engine (§20) — `cn_content_dna`

The core feature. It answers *why this format works*, in 17 fields: hook, hook
type, core idea, problem, curiosity gap, story structure, visual structure, shot
sequence, pacing, editing rhythm, emotion, product integration, CTA, target
audience, virality drivers, commercial intent, potential risks.

Note what is absent: no transcript field, no download field, no source-clip
field. The analysis is a description of a mechanism.

### 3. Content DNA (§21) — same table

The reusable fingerprint: category, hook type, emotion, story pattern, format,
camera style, editing style, duration, shot count, text density, product type,
CTA type, virality score, sales score, originality requirements. DNA is what the
Winner Engine recombines later, and it is character-agnostic — a mechanism that
works for a hair tool can carry a cordless drill.

### 4. Character matching (§22) — `cn_ideas.match_scores`

Every idea is scored against all four characters on audience fit, topic,
persona, product fit, historical performance, format, demographics and
commercial potential. The system recommends; a human can override, and the
override is recorded (`match_override`) so the scorer can be corrected by its
own error history rather than argued with.

### 5. Original Version Generator (§23)

For a reference plus a character, produce at least three concepts, each with an
original hook, story, dialogue, scene structure, CTA and visual plan. Hard rule:
materially original execution. The generator receives the **DNA**, not the
source script — the mechanism is the input, so a rewrite is not structurally
available to it.

### 6. Hook Lab (§24) — `cn_hooks`

Ten or more hooks per concept, each classified: curiosity, contrarian, problem,
confession, story, shock, comparison, question, result first, negative,
authority, challenge. Hook type is the primary experimental variable in the
first 14 days (§10), which is why it is an enum and not free text.

### 7. Script Lab (§25) — `cn_scripts`

Per format — TikTok short, TikTok 60s+, Instagram Reel, YouTube Short, YouTube
long form — with hook, scenes, dialogue, b-roll, text overlay, camera
instructions, sound notes, CTA and estimated duration.

### 8. Character consistency engine (§18)

Every generation prompt is composed, never hand-written:

```
CHARACTER MASTER PROFILE + SCENE + ACTION + CLOTHING + CAMERA
  + LIGHTING + EMOTION + DIALOGUE + PLATFORM FORMAT
```

The master profile comes from the Character Bible (`cn_characters`) and the
reference set (`cn_character_assets`: face, full body, side, lifestyle,
wardrobe, voice). Image, video, voice, b-roll and thumbnail prompts (§26) all
inherit it, so consistency is a property of the pipeline rather than of whoever
is typing.

### 9. Compliance gate (§37)

A production cannot reach READY while a critical compliance warning is open. See
`COMPLIANCE.md`.

### 10. Measure (§31) — `cn_publication_metrics`

Four checkpoints per publication: 24h, 72h, 7d, 30d. Tracked: views, 3s and 5s
hold, average watch time, completion rate, likes, comments, shares, saves,
profile visits, followers gained, link clicks, orders, revenue. Early checkpoints
are never overwritten by later ones — retention *shape* is the signal, not just
the final number.

### 11. Winner Engine (§32)

Thresholds are configurable and measured against that account's own baseline,
not a global number — 40k views is a win for a new account and a failure for an
established one. When content wins, the engine explains why, generates 5 new
hooks and 3 new concepts, adapts the mechanism for another suitable character,
proposes a long-form cut and a product variation.

It never duplicates and reposts the same video. Scaling means recombining the
DNA, not re-uploading the asset.

### 12. Loser analysis (§33)

A failure is a measurement, and the diagnosis is structured: hook problem,
retention problem, wrong audience, weak visual, weak product, wrong character,
weak CTA, timing problem — each with a recommended next experiment. A loss that
produces no next experiment is wasted.

## Content portfolio (§11)

60% growth · 25% commerce · 15% experimental — the default in
`DEFAULT_PORTFOLIO_MIX`, and explicitly configurable. The split is a starting
hypothesis to be corrected by data, which is why it is a constant in code today
and a settings record in Phase 8.

## Originality score (§39)

Before publishing: script originality, visual originality, narrative
originality, similarity risk. Stored on `cn_productions`. A hook or sequence too
close to its reference raises a warning that blocks READY. Target: originality
≥ 90, similarity risk LOW.

## What answers the five daily questions (§46)

| Question | Module |
|----------|--------|
| What content should we create? | Discover + Inspiration + Content Lab |
| Which character should create it? | Character matching (§22, §30) |
| Why should it perform? | Viral Mirror Engine + Content DNA |
| Did it perform? | Experiments + Analytics |
| How do we turn the result into revenue? | Products + Revenue + Winner Engine |

If a proposed feature answers none of these, it does not belong in the OS.
