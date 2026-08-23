-- ============================================================================
-- AI CREATOR NETWORK OS — Phase 1 — Seed data
-- ----------------------------------------------------------------------------
-- Seeds the four fictional characters (spec §4–§7), their 12 platform accounts
-- (§9), the monetisation programme records (§36) and the base prompt library
-- (§41). Idempotent: safe to re-run.
--
-- NOTE ON MONETISATION THRESHOLDS: requirement columns are seeded NULL with
-- status 'needs_verification'. Platform rules change, so the OS must never
-- treat a hard-coded number as truth — an operator fills these in and stamps
-- source + last_verified_date. See COMPLIANCE.md.
-- ============================================================================

-- ── Characters ──────────────────────────────────────────────────────────────

insert into cn_characters (
  slug, name, age_range, gender_presentation, market, language, accent,
  bio, personality, tone, content_pillars, commercial_categories,
  visual_description, wardrobe, backstory, brand_rules, safety_rules,
  negative_prompt, launch_order
) values
(
  'maya-hart', 'Maya Hart', '26-30', 'female', 'United Kingdom', 'en-GB', 'British English',
  'Primary female creator and first laboratory for the content engine.',
  'Friendly, attractive, curious, fun, aspirational, relatable, confident without arrogance.',
  'Warm, upbeat, conversational.',
  array['beauty','fashion','lifestyle','tiktok shop','viral products','home finds','travel','food','pov','storytelling','relationships'],
  array['beauty','fashion','home','female products','lifestyle products'],
  'Late-twenties British woman, natural styling, contemporary urban UK settings.',
  'Contemporary high-street UK fashion, seasonal, colour-coordinated per shoot.',
  'Fictional character. Lives in a UK city, shares finds, routines and honest product opinions.',
  'Never claims to be a real person. Discloses AI generation where a platform requires it. Never endorses a product she has not "tested" in-script.',
  'No medical, financial or legal advice. No content aimed at minors. No impersonation of real creators.',
  'deformed hands, extra fingers, distorted face, watermark, logo, text artefacts, other people''s likeness',
  1
),
(
  'leo-grant', 'Leo Grant', '29-35', 'male', 'United Kingdom', 'en-GB', 'British English',
  'Male UK creator covering technology, gadgets and men''s lifestyle.',
  'Modern, friendly, confident, practical, funny, tech-aware.',
  'Direct, dry humour, hands-on.',
  array['technology','gadgets','cars','motorcycles','mens lifestyle','tools','edc','light fitness','grooming','product testing'],
  array['tech','automotive','tools','mens products','useful gadgets'],
  'Early-thirties British man, casual modern styling, workshop / city / garage settings.',
  'Casual technical wear, jackets, plain tees, workwear where relevant.',
  'Fictional character. Tests gadgets and tools and reports what actually works.',
  'Never claims to be a real person. Discloses AI generation where a platform requires it. No fabricated benchmark numbers presented as measured facts.',
  'No unsafe modification, electrical or automotive instructions presented as professional guidance.',
  'deformed hands, extra fingers, distorted face, watermark, logo, text artefacts, other people''s likeness',
  2
),
(
  'arthur-bennett', 'Arthur Bennett', '62-68', 'male', 'United Kingdom', 'en-GB', 'British English',
  'Modern British grandad. DIY, tools and practical life advice.',
  'Experienced, witty, opinionated, warm, practical.',
  'Wry, plainspoken, generous.',
  array['diy','tools','home','gadgets','life advice','technology for older audiences','product tests','generational humour','relationship humour'],
  array['home','diy','tools','practical gadgets','senior-friendly products'],
  'British man in his sixties, warm and characterful, home / garden / workshop settings.',
  'Shirts, knitwear, practical outdoor and workshop clothing.',
  'Fictional character. Married to Rose Bennett. Decades of practical experience, sceptical of hype.',
  'Never claims to be a real person. Discloses AI generation where a platform requires it. No age-based stereotyping used as the joke target.',
  'No medical advice. No unsafe DIY presented as professional guidance.',
  'deformed hands, extra fingers, distorted face, watermark, logo, text artefacts, other people''s likeness',
  3
),
(
  'rose-bennett', 'Rose Bennett', '58-65', 'female', 'United Kingdom', 'en-GB', 'British English',
  'Elegant, warm and funny. Home, kitchen, mature beauty and travel.',
  'Elegant, warm, intelligent, funny, confident, relatable.',
  'Gracious, playful, reassuring.',
  array['home','kitchen','mature beauty','lifestyle','travel','relationships','useful products','stories','product tests'],
  array['home','kitchen','mature beauty','lifestyle','travel'],
  'British woman in her late fifties to sixties, elegant natural styling, kitchen / home / travel settings.',
  'Elegant everyday British styling, knitwear, blouses, travel outfits.',
  'Fictional character. Married to Arthur Bennett. Shares home, kitchen and travel life with dry warmth.',
  'Never claims to be a real person. Discloses AI generation where a platform requires it. No unrealistic anti-ageing claims.',
  'No medical or cosmetic-procedure claims. No health outcomes attributed to products.',
  'deformed hands, extra fingers, distorted face, watermark, logo, text artefacts, other people''s likeness',
  4
)
on conflict (slug) do nothing;

-- Arthur + Rose are a couple (spec §8) — separate entities, linked for couple formats.
update cn_characters c
   set partner_character_id = p.id
  from cn_characters p
 where c.slug = 'arthur-bennett' and p.slug = 'rose-bennett';

update cn_characters c
   set partner_character_id = p.id
  from cn_characters p
 where c.slug = 'rose-bennett' and p.slug = 'arthur-bennett';

-- ── Platform accounts: 12 accounts, 3 per character (spec §9) ───────────────

insert into cn_platform_accounts (character_id, platform, handle, is_live)
select c.id, p.platform, null, false
  from cn_characters c
 cross join (values ('tiktok'::cn_platform), ('instagram'::cn_platform), ('youtube'::cn_platform)) as p(platform)
on conflict (character_id, platform) do nothing;

-- ── Monetisation programmes (spec §12, §36) — values to be verified ────────

insert into cn_monetisation_programmes (platform, programme, country, status, source, last_verified_date)
values
  ('tiktok',    'TikTok Shop Affiliate',      'UK', 'needs_verification', 'https://seller-uk.tiktok.com/', null),
  ('tiktok',    'TikTok Creator Rewards',     'UK', 'needs_verification', 'https://www.tiktok.com/creators/', null),
  ('youtube',   'YouTube Partner Programme',  'UK', 'needs_verification', 'https://support.google.com/youtube/answer/72851', null),
  ('instagram', 'Instagram Monetisation',     'UK', 'needs_verification', 'https://creators.instagram.com/', null)
on conflict (platform, programme, country) do nothing;

-- ── Prompt library base entries (spec §26, §41) ────────────────────────────

insert into cn_prompts (name, kind, body, variables, is_system)
values
(
  'Character consistency block', 'character',
  E'CHARACTER MASTER PROFILE\n{{character}}\n\nSCENE: {{scene}}\nACTION: {{action}}\nCLOTHING: {{wardrobe}}\nCAMERA: {{camera}}\nLIGHTING: {{lighting}}\nEMOTION: {{emotion}}\nDIALOGUE: {{dialogue}}\nPLATFORM FORMAT: {{platform}} / {{duration}}',
  array['character','scene','action','wardrobe','camera','lighting','emotion','dialogue','platform','duration'],
  true
),
(
  'Viral Mirror analysis', 'analysis',
  E'Analyse WHY the referenced content performs. Do not transcribe, translate or rewrite its script.\nReturn: hook, hook_type, core_idea, problem, curiosity_gap, story_structure, visual_structure, shot_sequence, pacing, editing_rhythm, emotion, product_integration, cta, target_audience, virality_drivers, commercial_intent, potential_risks.\nReference metadata: {{reference}}',
  array['reference'],
  true
),
(
  'Original version generator', 'script',
  E'Using ONLY the extracted mechanism (not the source wording), produce three materially original concepts for {{character}}.\nEach concept needs: original hook, original story, original dialogue, new scene structure, new CTA, new visual plan.\nHard rule: no sentence-by-sentence rewriting of the reference. Mechanism DNA: {{dna}}',
  array['character','dna'],
  true
),
(
  'Hook Lab', 'hook',
  E'Generate 10 original hooks for {{character}} on the concept: {{concept}}.\nClassify each as one of: curiosity, contrarian, problem, confession, story, shock, comparison, question, result_first, negative, authority, challenge.',
  array['character','concept'],
  true
)
on conflict (name, version) do nothing;
