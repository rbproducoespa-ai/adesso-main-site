# AI CREATOR NETWORK OS — Compliance

The four creators are fictional. Everything below follows from that, and from
the mechanism rule in `CONTENT_ENGINE.md`.

These are product constraints enforced in the schema and the pipeline, not legal
advice. Platform rules and the law in each market change; verify before you rely
on anything here.

## Non-negotiable rules (spec §3, §38)

1. **Mirror the mechanism, not the content.** References teach hook type,
   pacing, structure and psychology. They never supply dialogue, footage,
   likeness, voice, music, watermarks, logos or branding.
2. **The characters are fictional.** The system is not built around
   impersonating celebrities, influencers or private individuals.
3. **No real person's likeness or voice** without appropriate rights or
   permission, recorded on the production.
4. **Never present an AI character as a specific real person.**
5. **Flag realistic AI content** where platform disclosure may be required.
6. **No content targeting a private individual.**

A feature request that requires breaking one of these is refused, not
negotiated. Face-swapping a third-party video, cloning a real creator's voice,
or reposting a downloaded clip are all outside what this system does.

## The READY gate (spec §37)

A production **cannot** reach `ready` while a critical warning is unresolved.
`cn_compliance_checks` holds one row per production:

| Field | Blocks READY when |
|-------|-------------------|
| `contains_real_person` | true and `real_person_permission` is false |
| `voice_cloned` | true and `voice_owner` is empty |
| `platform_disclosure_required` | true and `disclosure_completed` is false |
| `copyright_checked` | false |
| `music_rights_checked` | false |
| `commercial_disclosure_required` | true and disclosure is not in the script |

`ai_generated` and `photorealistic` default to true — this is an AI creator
network, so the burden is on marking an exception, not on remembering the rule.
Unresolved conditions are written to `blocking_issues` so the UI can say exactly
what is stopping a piece of content.

Phase 5 enforces the gate as soon as productions exist. Phase 9 hardens it with
the originality score and automated disclosure checks.

## Originality (spec §39)

Every production is scored before publishing: script originality, visual
originality, narrative originality, and a similarity risk of low / medium /
high. High similarity risk blocks READY. The warning names the specific hook or
sequence that sits too close to its reference, so the fix is a rewrite of that
element rather than a debate about the score.

## AI disclosure

Requirements differ by platform, market and content type, and they change. The
OS therefore:

- Marks every production `ai_generated` by default.
- Raises `platform_disclosure_required` for photorealistic content.
- Stores the disclosure decision per production, with who checked it and when.
- Keeps the rules themselves in `cn_monetisation_programmes`-style editable
  records rather than in code.

## Monetisation eligibility (spec §12, §36)

**Nothing about platform eligibility is hard-coded.** `cn_monetisation_programmes`
stores each programme with `followers_required`, `views_required`,
`watch_hours_required`, `time_window`, `minimum_video_length`, `country`,
`status`, `source` and `last_verified_date`.

The seed deliberately ships these thresholds **NULL** with
`status = 'needs_verification'` and only the official source URL filled in.
A seeded number would be a guess that looks like a fact, and would silently rot
the first time a platform changed its terms. An operator verifies each programme
against its source and stamps the date; `cn_monetisation_progress` then tracks
each account against it.

Treat a programme whose `last_verified_date` is more than 90 days old as stale
and re-verify it before making a decision on it.

## Demo data (spec §43)

Demo data is allowed, and it is always labelled. `getNetworkOverview()` returns
`isDemo: true` whenever the figures are fabricated, the dashboard renders a DEMO
badge on every affected tile plus a banner explaining why, and no demo follower,
view, order or revenue figure may be presented as a real metric — internally, to
a partner, or in a funding or visa context.

## Data protection

The OS holds performance data, product data and operator accounts. It is not a
place for third-party personal data. Discovered references store a public URL
and public metrics — not the source creator's personal information beyond the
handle needed to attribute the observation. RLS is on for all 22 tables, and
`/network` is excluded from `robots.txt` and marked `noindex`.

## Review cadence

- **Per production:** the READY gate.
- **Per phase:** confirm no new module bypasses the gate.
- **Every 90 days:** re-verify monetisation programmes and disclosure rules
  against their sources, and update `last_verified_date`.
