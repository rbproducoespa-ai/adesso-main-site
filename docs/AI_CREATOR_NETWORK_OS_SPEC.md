# AI CREATOR NETWORK OS — Source specification

Verbatim text of the master plan document that defines this product.
Section numbers referenced across ROADMAP.md, DATABASE.md, CONTENT_ENGINE.md
and COMPLIANCE.md (as `§n`) point here.

---


AI CREATOR NETWORK OS
MASTER PLAN + MASTER PROMPT FOR CLAUDE CODE
Maya Hart • Leo Grant • Arthur Bennett • Rose Bennett
1. PROJECT OBJECTIVE
Build a complete AI-powered creator network around four original fictional characters. The goal is to create a data-driven media and commerce operation that discovers successful content patterns, analyses why they work, produces original versions for the correct character, measures results, identifies winners and scales what works across TikTok, Instagram, YouTube, TikTok Shop, affiliate programmes, brand partnerships and future owned products.
2. CORE OPERATING MODEL
Discover high-performing content and products.
Analyse why the content works.
Extract its Content DNA.
Match the idea to the most suitable character.
Generate an original concept and script.
Generate character-consistent image, video and voice assets.
Check originality, rights and AI disclosure requirements.
Publish or schedule.
Measure performance.
Detect winners and losers.
Generate new original variations.
Monetise through platform, affiliate, commerce and brand channels.
3. IMPORTANT RULE: MIRROR THE MECHANISM, NOT THE CONTENT
The project must not be built as a download + face-swap + repost system. Reference videos can be used to understand hook type, psychology, topic, pacing, shot structure, editing rhythm, emotional trigger, problem, value proposition and CTA structure. The final output must be a materially original execution with new script, dialogue, scenes, voice, character and generated assets.
Do not reproduce another creator's exact dialogue, footage, likeness, voice, copyrighted music, watermark, logo, unique branding or other protected assets.
4. CHARACTER 1 — MAYA HART
Primary female creator.
Apparent age: 26–30.
Market: United Kingdom.
Language: British English.
Personality: friendly, attractive, curious, fun, aspirational, relatable and confident without arrogance.
Content pillars: beauty, fashion, lifestyle, TikTok Shop, viral products, home finds, travel, food, POV, storytelling and relationships.
Commercial strengths: beauty, fashion, home, female products and lifestyle products.
Launch role: first laboratory for testing the content engine.
5. CHARACTER 2 — LEO GRANT
Male UK creator.
Apparent age: 29–35.
Personality: modern, friendly, confident, practical, funny and tech-aware.
Content pillars: technology, gadgets, cars, motorcycles, men's lifestyle, tools, EDC, light fitness, grooming and product testing.
Commercial strengths: tech, automotive, tools, men's products and useful gadgets.
6. CHARACTER 3 — ARTHUR BENNETT
British male.
Apparent age: 62–68.
Positioning: modern British grandad.
Personality: experienced, witty, opinionated, warm and practical.
Content pillars: DIY, tools, home, gadgets, life advice, technology for older audiences, product tests, generational humour and relationship humour.
Commercial strengths: home, DIY, tools, practical gadgets and senior-friendly products.
7. CHARACTER 4 — ROSE BENNETT
British female.
Apparent age: 58–65.
Arthur's wife.
Positioning: elegant, warm, intelligent, funny, confident and relatable.
Content pillars: home, kitchen, mature beauty, lifestyle, travel, relationships, useful products, stories and product tests.
Commercial strengths: home, kitchen, mature beauty, lifestyle and travel.
8. ARTHUR + ROSE COUPLE CONTENT
Arthur and Rose remain separate character entities but can appear together. Examples include: My husband tried..., My wife bought..., Who knows who better?, marriage POV, product challenges, travel, food, relationship stories, generational humour and gift reactions.
9. ACCOUNT ECOSYSTEM
Character
TikTok
Instagram
YouTube
Maya Hart
YES
YES
YES
Leo Grant
YES
YES
YES
Arthur Bennett
YES
YES
YES
Rose Bennett
YES
YES
YES
Initial network: 12 main social accounts. A separate Arthur + Rose account should only be created later if the data justifies it.
10. 90-DAY LAUNCH PLAN
Days 1–14 — Maya only
Publish approximately 3 experiments per day. Test hook, duration, visual style, voice, product category, CTA, posting time and format. Target approximately 42 initial experiments.
Days 15–30 — Maya + Leo
Keep Maya active and launch Leo. Transfer learnings about hooks and structure while preserving Leo's identity and niche.
Days 31–45 — Add Arthur + Rose
Launch both senior characters and begin testing individual and couple formats.
Days 46–90 — Optimise the network
Scale winning formats, reduce weak formats, build product intelligence, affiliate revenue, monetisation tracking and systematic experimentation.
11. CONTENT PORTFOLIO
60% Growth Content: stories, entertainment, POV, humour, relationships, curiosity and lifestyle.
25% Commerce Content: reviews, demonstrations, comparisons, tests and unboxings.
15% Experimental Content: trends, new hooks, new formats and new storytelling mechanisms.
These percentages must be configurable based on performance data.
12. MONETISATION MODEL
TikTok Shop Affiliate and product commissions.
Affiliate links through eligible programmes.
TikTok Creator Rewards when each account and video meet current eligibility requirements.
YouTube Partner Programme using both Shorts and long-form content.
Instagram monetisation tools where eligible.
Brand partnerships and sponsored content.
Virtual UGC / branded AI creator campaigns.
Owned physical or digital products in later phases.
Platform monetisation requirements must NOT be permanently hard-coded. Store them as editable records with programme name, market, source URL and last verified date because platform rules change.
13. SOFTWARE NAME
Working name: AI CREATOR NETWORK OS (alternative: CREATOR NETWORK OS).
14. RECOMMENDED TECHNOLOGY
Next.js
TypeScript
Tailwind CSS
Supabase / PostgreSQL
Supabase Auth
Supabase Storage
Use a modular provider architecture for future OpenAI, Anthropic, ElevenLabs, HeyGen, Kling, Runway, YouTube, Meta, TikTok and TikTok Shop integrations. Do not tightly couple the product to one AI vendor.
15. MAIN NAVIGATION
Dashboard
Characters
Discover
Inspiration
Content Lab
Scripts
Productions
Calendar
Products
Experiments
Analytics
Revenue
AI Studio
Prompt Library
Assets
Settings
16. DASHBOARD
Total Followers / Subscribers
Total Views
Views Last 7 Days
Views Last 30 Days
Videos Published
Total Revenue
Affiliate Revenue
TikTok Shop Revenue
Brand Revenue
Revenue Per Video
Revenue Per Character
Average Watch Time
Average Completion Rate
Product Clicks
Orders
Conversion Rate
Character cards with growth, top platform, top video and status
17. CHARACTER BIBLE
Each creator must have a permanent Character Bible with fields including:
id, name, slug, age_range, gender_presentation, market, language, accent
bio, personality, tone, vocabulary, catchphrases, interests, content_pillars
commercial_categories, visual_description, face_reference, body_description
hair, eyes, wardrobe, voice_provider, voice_id
master_image_prompt, master_video_prompt, negative_prompt
things_character_says, things_character_never_says, backstory
brand_rules, safety_rules, created_at, updated_at
18. CHARACTER CONSISTENCY ENGINE
Every generation prompt must automatically combine: CHARACTER MASTER PROFILE + SCENE + ACTION + CLOTHING + CAMERA + LIGHTING + EMOTION + DIALOGUE + PLATFORM FORMAT.
Face Reference
Full Body Reference
Side Reference
Lifestyle Reference
Wardrobe Reference
Voice Reference
19. DISCOVER MODULE
Allow users to register TikTok, Instagram, YouTube and manual references. Store:
Source URL and platform
Creator/source name
Date discovered
Views, likes, comments and shares when available
Description
Product
Category
Notes
Analysis status
Risk flags
20. VIRAL MIRROR ENGINE
This is a core feature. It must analyse why a successful format works instead of cloning the video.
Hook
Hook Type
Core Idea
Problem
Curiosity Gap
Story Structure
Visual Structure
Shot Sequence
Pacing
Editing Rhythm
Emotion
Product Integration
CTA
Target Audience
Virality Drivers
Commercial Intent
Potential Risks
21. CONTENT DNA
category
subcategory
hook_type
emotion
story_pattern
content_format
camera_style
editing_style
duration
shot_count
text_density
product_type
CTA_type
commercial_intent
virality_score
sales_score
originality_requirements
22. CHARACTER MATCHING
Score each idea, reference and product against all four characters using audience fit, topic, persona, product fit, historical performance, format, demographics and commercial potential. Allow manual override.
23. ORIGINAL VERSION GENERATOR
For a selected reference and character, generate at least:
Concept A
Concept B
Concept C
Original Hook
Original Story
Original Dialogue
New Scene Structure
Different Phrasing
New CTA
New Visual Plan
Do not produce sentence-by-sentence rewrites of another creator's script. Each concept must be materially original.
24. HOOK LAB
Generate at least 10 hooks per concept and classify them:
Curiosity
Contrarian
Problem
Confession
Story
Shock
Comparison
Question
Result First
Negative Hook
Authority
Challenge
25. SCRIPT LAB
Generate platform-specific scripts for:
TikTok Short
TikTok 60+ Seconds
Instagram Reel
YouTube Short
YouTube Long Form
Each script should include:
Hook
Scene
Dialogue
B-roll
Text Overlay
Camera Instructions
Sound Notes
CTA
Estimated Duration
26. AI PRODUCTION PROMPTS
Image Prompt
Video Prompt
Voice Prompt
B-roll Prompt
Thumbnail Prompt
All prompts automatically inherit the selected character's consistency profile.
27. CONTENT PIPELINE
IDEA → REFERENCE → ANALYSED → SCRIPT → APPROVED → ASSETS → GENERATING → EDITING → READY → SCHEDULED → PUBLISHED → MEASURING → WINNER / LOSER → ARCHIVED
Create both Kanban and table views.
28. CONTENT CALENDAR
Daily, weekly and monthly views
Filter by character, platform, status and content type
Drag and drop content between dates
Show planned volume per character
29. PRODUCT INTELLIGENCE
Product Name
Source
Platform
Category
Price
Commission
Rating
Review Count
Sales Estimate
Trend Score
URL
Image
Character Matches
Content References
Clicks
Orders
Revenue
Conversion Rate
Revenue Per Video
30. PRODUCT × CHARACTER MATCHING
Create an AI score showing which character is best for a product. Example: a hair tool might strongly match Maya and Rose; a car diagnostic tool might strongly match Leo and Arthur.
31. EXPERIMENT ENGINE
Every concept can become an experiment. Track variants such as Hook A, Hook B and Hook C.
Views
3-second hold
5-second hold
Average Watch Time
Completion Rate
Likes
Comments
Shares
Saves
Profile Visits
Followers Gained
Link Clicks
Orders
Revenue
Measurement checkpoints: approximately 24 hours, 72 hours, 7 days and 30 days.
32. WINNER ENGINE
Use configurable thresholds and account baselines. When content materially outperforms baseline, mark WINNER.
Explain why it won.
Generate 5 new hooks.
Generate 3 new concepts.
Adapt the mechanism for another suitable character.
Create a long-form version.
Create a product variation.
Never simply duplicate and repost the exact same video.
33. LOSER ANALYSIS
Possible hook problem
Retention problem
Wrong audience
Weak visual
Weak product
Wrong character
Weak CTA
Timing problem
Recommended next experiment
34. ANALYTICS
Support analysis by Network, Character, Platform, Content, Format, Hook, Product, Category and Date.
Views
Followers
Retention
Engagement
Sales
Revenue
Best Hook Types
Best Video Lengths
Best Characters
Best Posting Periods
Best Categories
Best Products
Best CTAs
35. REVENUE DASHBOARD
TikTok Shop
Affiliate
YouTube
Instagram
Brand Deals
UGC
Other
Gross Revenue
Commission
Revenue Per 1,000 Views
Revenue Per Video
Revenue Per Character
Revenue Per Product
Conversion Rate
Monthly Revenue
36. MONETISATION TRACKER
Create editable programme records with:
platform
programme
followers_required
views_required
watch_hours_required
time_window
minimum_video_length
country
status
source
last_verified_date
Do not permanently hard-code platform thresholds. The dashboard should show current progress for each character/account.
37. AI DISCLOSURE AND COMPLIANCE
ai_generated
photorealistic
contains_real_person
real_person_permission
voice_cloned
voice_owner
platform_disclosure_required
disclosure_completed
copyright_checked
music_rights_checked
commercial_disclosure_required
Do not allow a piece of content to become READY while critical compliance warnings remain unresolved.
38. AI PERSONA SAFETY RULES
The four creators are fictional.
Do not build the system around impersonating celebrities, influencers or private individuals.
Do not reproduce a real person's likeness or voice without appropriate rights/permission.
Do not falsely present an AI character as a specific real person.
Flag realistic AI content when platform disclosure may be required.
39. ORIGINALITY SCORE
Before publishing, estimate:
Script Originality
Visual Originality
Narrative Originality
Similarity Risk
Example output: Originality 91/100; Similarity Risk LOW; warning if a hook or sequence is too close to the reference.
40. ASSET LIBRARY
Character Images
Reference Images
Generated Video
Voice
Music
B-roll
Thumbnails
Logos
Product Images
Tags and metadata
41. PROMPT LIBRARY
Character
Image
Video
Voice
Script
Hook
Analysis
Product
Thumbnail
Long-form
Short-form
Support variables such as {{character}}, {{product}}, {{hook}}, {{scene}}, {{platform}}, {{duration}} and {{emotion}}.
42. DATABASE
Create a relational Supabase schema for:
users
characters
character_assets
platform_accounts
references
content_dna
ideas
scripts
hooks
productions
assets
products
product_character_scores
experiments
experiment_variants
publications
publication_metrics
revenue
monetisation_programmes
monetisation_progress
prompts
compliance_checks
Create migrations, indexes, RLS policies and seed data for the four characters.
43. DEMO DATA
Populate the interface with realistic demo data when needed, but clearly label it as DEMO. Never present demo followers, revenue, views or sales as real metrics.
44. BUILD PHASES
PHASE 1 — Foundation, Auth, Database, Navigation, Design System
PHASE 2 — Characters, Character Bible, Assets, Consistency Engine
PHASE 3 — Discover, References, Viral Mirror Engine, Content DNA
PHASE 4 — Hooks, Scripts, Original Version Generator
PHASE 5 — Production Pipeline, Calendar, Asset Library
PHASE 6 — Product Intelligence, Character Matching
PHASE 7 — Experiments, Metrics, Winner Engine
PHASE 8 — Analytics, Revenue, Monetisation Tracker
PHASE 9 — Compliance, Originality, AI Disclosure
PHASE 10 — AI Providers and External Integrations
45. DEVELOPMENT RULES
Inspect the existing repository before changing architecture.
Preserve useful working functionality.
Create ROADMAP.md.
Create DATABASE.md.
Create CONTENT_ENGINE.md.
Create COMPLIANCE.md.
Implement features in logical phases rather than many incomplete modules at once.
At the end of every phase run typecheck, lint, tests and production build.
Fix errors before moving forward.
Document COMPLETED, FILES CHANGED, DATABASE CHANGES, TEST RESULTS and NEXT PHASE.
46. FIVE QUESTIONS THE PRODUCT MUST ANSWER DAILY
What content should we create?
Which character should create it?
Why should it perform?
Did it perform?
How can we turn the result into revenue?
47. FINAL BUSINESS PRINCIPLE
We are not building four random AI influencer accounts. We are building a DATA-DRIVEN AI CREATOR NETWORK.
Competitive advantage = VIRAL DISCOVERY + CONTENT INTELLIGENCE + CONSISTENT CHARACTERS + HIGH-VOLUME ORIGINAL PRODUCTION + EXPERIMENTATION + MONETISATION DATA.
48. MASTER INSTRUCTION TO CLAUDE CODE
You are acting as a Senior Product Architect, Full-Stack Engineer, AI Automation Engineer, Content Growth Strategist and UX Designer.

Use this entire document as the authoritative product specification for AI CREATOR NETWORK OS.

Start by analysing the current repository. Do not assume the project is empty and do not replace working functionality unnecessarily.

Before implementation, return:
1. CURRENT STATE
2. PROPOSED ARCHITECTURE
3. DATABASE PLAN
4. PHASE 1 IMPLEMENTATION PLAN

Then begin PHASE 1 immediately.

Work phase by phase. At the end of every phase run typecheck, lint, tests and a production build. Resolve failures before advancing.

The system must be designed for original AI-created content inspired by successful content mechanisms, not for impersonation, copyright infringement, exact reposting or simple face-swapping of third-party videos.

Where platform eligibility, monetisation or AI disclosure rules are needed, implement them as editable configuration records with source and last_verified_date rather than permanent hard-coded assumptions.

Build for production quality, scalability, clear UX and maintainable modular architecture.
49. FIRST ACTION CLAUDE CODE MUST TAKE
Read this complete specification, inspect the repository, identify what already exists, map the existing code against these requirements, create the project documentation files, and begin Phase 1 without destroying any existing working functionality.
