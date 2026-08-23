# MASTER PLAN — PORTFÓLIO DE APPS / MICRO-SAAS PARA ANDROID, IOS E WEB

> **Fonte da verdade.** Este documento é o briefing mestre do portfólio.
> Toda sessão de desenvolvimento deve lê-lo antes de escrever código (ver §21).
> Destino final do código: repositório **graphipy** (ver `docs/phase-1-foundation-architecture.md`).

## Objetivo deste documento

Este arquivo deve ser usado como briefing mestre para o Claude Code planejar, arquitetar e desenvolver uma linha de aplicativos SaaS e utilitários voltados principalmente para profissionais autônomos, pequenas empresas e usuários finais no Reino Unido.

A estratégia não é construir todos os produtos de uma vez. Devemos criar uma base tecnológica compartilhada, lançar MVPs rapidamente, medir uso real, validar cobrança e continuar apenas com os produtos que demonstrarem tração comercial.

**Meta estratégica:**

- Criar um ecossistema de aplicativos com componentes reutilizáveis.
- Priorizar problemas simples, frequentes e que economizem tempo ou dinheiro.
- Desenvolver primeiro para Android + iOS e, quando fizer sentido, dashboard web.
- Monetização prioritária: assinatura mensal/anual, planos de equipe e add-ons de IA.
- Buscar produtos que possam atingir £5k, £10k, £30k+ MRR ao longo do tempo.
- Evitar overengineering no MVP.

---

## 1. PRINCÍPIOS DE PRODUTO

Todos os aplicativos devem obedecer aos seguintes princípios:

1. O usuário deve entender o produto em menos de 30 segundos.
2. O primeiro valor útil deve ser entregue em menos de 3 minutos.
3. Onboarding mínimo.
4. Ações importantes em no máximo 3 toques.
5. Mobile-first.
6. Interface simples e profissional.
7. Possibilidade de uso por voz sempre que fizer sentido.
8. IA deve reduzir trabalho, não apenas gerar texto decorativo.
9. Todas as ações importantes devem deixar histórico/auditoria.
10. Todo produto deve ter caminho claro para monetização.
11. Sempre medir ativação, retenção, conversão para pago e churn.
12. Não construir funções complexas antes de validar o problema.

---

## 2. STACK RECOMENDADA

### Mobile

Preferência inicial:

- React Native
- Expo
- TypeScript
- Expo Router

Alternativa, se Claude Code identificar benefício técnico relevante:

- Flutter + Dart

### Backend

- Supabase
  - PostgreSQL
  - Auth
  - Row Level Security
  - Storage
  - Edge Functions quando necessário

### Web dashboard

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

### Pagamentos

- Stripe
- Stripe Billing
- Apple Pay
- Google Pay

### IA

- Claude API como opção principal para linguagem, análise e automações.
- OCR/vision conforme necessidade do produto.
- Speech-to-text para fluxos por voz.

### Outras integrações possíveis

- Google Maps / Places
- Google Calendar
- Apple Calendar
- Push notifications
- Email transactional
- WhatsApp Business API quando aplicável
- PDF generation
- Camera / photo metadata
- Device location with explicit user permission

### Infraestrutura

- GitHub
- Vercel para web
- EAS Build / EAS Submit para mobile
- Sentry ou similar para erros
- PostHog ou alternativa para analytics de produto

---

## 3. ARQUITETURA COMPARTILHADA

Criar uma base monorepo reutilizável para os produtos.

Estrutura sugerida:

```text
/apps
  /mobile
  /web
/packages
  /ui
  /auth
  /billing
  /database
  /analytics
  /notifications
  /ai
  /pdf
  /storage
  /design-tokens
```

Componentes que devem ser reutilizáveis:

- Authentication
- User profile
- Company/workspace
- Team members
- Roles/permissions
- Subscription/paywall
- Stripe billing
- Notifications
- File upload
- Photos
- PDF export
- AI requests
- Usage limits
- Audit logs
- Analytics events
- Settings
- Help/support
- Dark/light mode
- Internationalisation-ready structure

---

## 4. MODELO BASE DE DADOS MULTI-TENANT

Entidades centrais reutilizáveis:

```text
users
profiles
workspaces
workspace_members
subscriptions
plans
customers
jobs
quotes
invoices
payments
expenses
files
photos
notes
reports
tasks
notifications
ai_usage
audit_logs
```

Todos os produtos B2B devem considerar multi-tenancy desde o início.

Toda tabela sensível deve usar Row Level Security.

---

## 5. PORTFÓLIO DE PRODUTOS

### APP 01 — DOIT AI

**Proposta:** Assistente administrativo controlado principalmente por voz para profissionais autônomos e pequenas empresas.

Tagline de trabalho: **Talk. Done.**

**Problema:** Tradespeople e freelancers perdem tempo com CRM, orçamento, agenda, invoices e acompanhamento de clientes.

**Experiência principal:** O usuário fala algo como:

> Create a quote for Michael, decorating his living room, £850, 30% deposit.

O sistema transforma a fala em ação estruturada.

Outros exemplos:

- "Book Michael Tuesday at 8."
- "Mark Sarah's job as complete."
- "Send the final invoice."
- "Add £82 materials to the job."
- "Remind me to chase this payment Friday."

**MVP:** Auth · Customers · Jobs · Quotes · Invoices · Calendar · Voice input · AI command parser · PDF quote/invoice · Push reminders · Stripe subscription

**Planos sugeridos:** Free 3 jobs/month · Solo £9.99/mo · Pro £24.99/mo · Business £49/mo · Team £99/mo

**Prioridade:** P0 — produto principal candidato.

---

### APP 02 — QUOTESNAP AI

**Proposta:** Criar orçamento profissional usando fotos, descrição por voz e IA.

**Fluxo:**

```text
Take photos
→ Describe job
→ AI analyses scope
→ Suggested labour/material structure
→ User adjusts price
→ Generate quote
→ Customer receives link
→ Accept
→ Sign
→ Pay deposit
```

**Público:** Painters · Builders · Flooring installers · Decorators · Electricians · Plumbers · Handymen

**MVP:** Customer · Photos · Voice/text description · AI scope summary · Labour/material line items · Editable price · Quote PDF · Customer approval link · Digital signature · Deposit request

**Planos:** Starter £9.99 · Pro £24.99 · Business £49

**Prioridade:** P0/P1.

---

### APP 03 — WORKPROOF

**Proposta:** Aplicativo que comprova profissionalmente onde, quando e como um serviço foi realizado.

**Problema:** Conflitos com clientes e empresas sobre horário, estado anterior, trabalho executado e conclusão.

**Dados possíveis:** Start time · End time · Location (with permission) · Before photos · During photos · After photos · Notes · Materials · Customer signature · Completion status

**Saída:** Gerar automaticamente um Job Completion Report PDF.

**Público:** Builders · Painters · Electricians · Plumbers · Cleaners · Maintenance · Exhibition installers · LED technicians · Freelancers

**Planos:** Individual £9.99/mo · Team £29.99/mo · Company £79.99/mo

**Prioridade:** P0 — excelente MVP rápido.

---

### APP 04 — WHATSJOB AI

**Proposta:** Transformar conversas e áudios relacionados a trabalho em jobs estruturados.

**Exemplo.** Mensagem:

> Can you come Tuesday to fix the bathroom?

Resultado:

```text
New job
Customer: John Smith
Task: Bathroom repair
Date: Tuesday
Status: New
```

Depois:

> Charge him £450 plus materials.

Atualização automática:

```text
Quote: £450 + materials
```

**Fluxo desejado:**

```text
Message/voice
→ AI extraction
→ Job
→ Calendar
→ Quote
→ Invoice
→ Payment
```

**Atenção técnica:** A integração direta com WhatsApp deve respeitar APIs, permissões e políticas oficiais. O MVP pode começar por share sheet, copy/paste, forwarded text e uploaded audio — antes de depender da WhatsApp Business API.

**Planos:** £19/mo · £29/mo · £49/mo

**Prioridade:** P1.

---

### APP 05 — SITEREPORT AI

**Proposta:** Transformar fotos + voz em relatórios profissionais de obra/serviço.

**Exemplo.** Usuário grava:

> Today we installed the left wall, three panels are damaged, electrical is still pending and customer requested the graphic to move 50 millimetres.

Sistema gera: Project · Date · Client · Staff · Work completed · Outstanding work · Problems · Variations · Photos · Recommendations · Signature

**Output:** PDF profissional com branding da empresa.

**Planos:** Solo £19/mo · Team £49/mo · Company £149/mo

**Prioridade:** P0 — muito forte para lançamento rápido.

---

### APP 06 — EXHIBITION OS

**Proposta:** Sistema de operação e acompanhamento de montagem de stands/eventos.

**Módulos:** Projects · Venues · Stand numbers · Build dates · Team · Drawings · Graphics · Electrical · LED · Flooring · Deliveries · Tools · Snagging · Tasks · Client changes · Photos · Daily reports · Handover

**Fluxo de tarefa:**

```text
Wall A / Frame 4
Install LEDSkin
Status: Pending
→ photo proof
→ Completed
```

**Planos potenciais:** Freelancer £49/mo · Small company £149/mo · Agency £299/mo · Enterprise £500+/mo

**Prioridade:** P1/P2, mas alto ticket B2B.

---

### APP 07 — VOICEINVOICE

**Proposta:** Gerar invoice falando com o telefone.

**Exemplo:**

> I worked eight hours for ABC Exhibitions today at £45 per hour plus £30 parking.

Sistema extrai: Customer · Date · Hours · Rate · Expenses · VAT if applicable · Total

**Funções:** Customer database · Voice capture · Draft invoice · PDF · Send/share · Payment status · Payment reminders

**Preço:** £5.99/mo · £9.99/mo · £14.99/mo

**Prioridade:** P0 para micro-MVP, podendo virar feature do DOIT AI.

---

### APP 08 — FIXMYHOME AI

**Proposta:** Usuário fotografa um problema doméstico e recebe orientação inicial e indicação do tipo de profissional necessário.

**Exemplos:** Damp/mould · Broken wall · Flooring damage · Leak visual clues · Furniture damage · Paint problem

**Importante:** Evitar diagnósticos perigosos em áreas elétricas, gás, estruturas e saúde. Deve deixar claro quando o usuário precisa de profissional qualificado.

**Monetização:** Freemium · Lead generation · Local professional marketplace · Featured professionals

**Prioridade:** P2.

---

### APP 09 — RECEIPT AI UK

**Proposta:** Fotografar recibos e organizar automaticamente despesas de self-employed/small businesses.

**Funções:** OCR · Merchant · Date · Amount · VAT · Category · Project/job assignment · Export CSV/PDF · Monthly summary

**Preço:** £5/mo · £9/mo · £15/mo

**Prioridade:** P1/P2.

---

### APP 10 — VANSTOCK

**Proposta:** Controle extremamente simples do estoque carregado em vans de profissionais.

**Funções:** Items · Quantity · Minimum stock · Barcode/QR · Van · Employee · Usage by job · Low stock alerts · Restock list

**Preço:** £9/mo solo · £25/mo team · £59/mo business

**Prioridade:** P2.

---

### APP 11 — MAINTENANCE PASSPORT

**Proposta:** Criar histórico permanente de manutenção de um ativo.

**Ativos possíveis:** House · Car · Motorcycle · Van · Equipment · Machinery

**Dados:** Service history · Photos · Receipts · Parts · Warranty · Next service · Documents · Ownership transfer

**Monetização:** Consumer subscription · Business plans · Paid digital transfer certificate

**Preço:** £3.99–£15/mo depending on use case

**Prioridade:** P2.

---

### APP 12 — SCHOOLLIFE UK

**Proposta:** Centralizar a vida escolar da família.

**Funções:** School calendar · Uniform reminders · School events · Payments reminders · Documents · Clubs · Trips · Parent tasks · Push alerts

**Preço:** £2.99/mo · £4.99/mo family · £7.99 premium

**Prioridade:** P3 — B2C, monetização mais difícil.

---

### APP 13 — FAMILY ADMIN AI

**Proposta:** Assistente de administração pessoal/familiar.

**Pode organizar:** Insurance renewals · MOT reminders · Car tax reminders · Household bills · Contracts · Warranty · Passport/document expiry · School reminders · Subscriptions

**Preço:** £4.99/mo · £9.99/mo family

**Prioridade:** P2/P3.

---

### APP 14 — SUBSCRIPTION KILLER

**Proposta:** Organizar assinaturas e evitar cobranças esquecidas.

**Funções:** Manual subscription entry · Renewal dates · Price increases · Trial end reminders · Cancellation reminders · Monthly total · Annual projection

**Futuro:** Integração bancária só depois de validação e avaliação regulatória/técnica.

**Preço:** Free · £2.99/mo · £4.99 premium

**Prioridade:** P3.

---

### APP 15 — PARKINGMATE UK

**Proposta:** Assistente para obrigações e custos de motoristas.

**Possíveis funções:** Parking location · Parking expiry reminder · MOT reminder · Insurance renewal · Road tax reminder · ULEZ/Congestion information via official data sources where technically and legally available · Service reminder · Vehicle documents

**Preço:** £2.99/mo · £6.99 premium

**Prioridade:** P2/P3.

---

## 6. PRIORIZAÇÃO GERAL

### Tier A — Construir/validar primeiro

1. WorkProof
2. SiteReport AI
3. QuoteSnap AI
4. DOIT AI
5. VoiceInvoice

Razões: problema muito claro · usuário pagante identificável · MVP tecnicamente possível · pode vender diretamente para profissionais · fluxo demonstrável em vídeo · boa possibilidade de assinatura.

### Tier B — Após criar a base

6. WhatsJob AI
7. Exhibition OS
8. Receipt AI UK
9. VanStock

### Tier C — Depois de validação ou com time maior

10. FixMyHome AI
11. Maintenance Passport
12. Family Admin AI
13. ParkingMate UK
14. Subscription Killer
15. SchoolLife UK

---

## 7. ESTRATÉGIA DE DESENVOLVIMENTO POR FASES

### FASE 0 — PRODUCT DISCOVERY

**Objetivo:** Não escrever código de produção antes de definir problema, público e hipótese comercial.

Para cada app: definir ICP · top 3 dores · principal job-to-be-done · diferencial · 1 ação principal do usuário · pricing hypothesis · MVP · métricas · landing page simples · lista de 20 potenciais usuários para entrevistas.

**Critério para avançar:** dor real confirmada em entrevistas; pelo menos alguns usuários demonstrando disposição concreta para testar.

---

### FASE 1 — FOUNDATION / MONOREPO

Construir base técnica compartilhada.

**Entregáveis:** Git repository · Monorepo · Shared TypeScript config · Shared ESLint/Prettier · Environment strategy · Supabase project · Database migrations · Auth · User profile · Workspace/company model · Team membership · Roles · File storage · Basic audit log · Analytics events · Error monitoring · Shared design system

Do not build product-specific complexity yet.

---

### FASE 2 — MOBILE APP SHELL

**Entregáveis:** Expo project · iOS configuration · Android configuration · Authentication flow · Onboarding · Bottom/tab navigation · Settings · Profile · Subscription screen placeholder · Camera permissions · Photo upload · Push permission flow · Basic offline/error states

---

### FASE 3 — BILLING & ACCESS CONTROL

**Entregáveis:** Stripe products/plans · Monthly/yearly billing · Free tier · Trial support · Subscription status sync · Usage limits · Paywall · Billing portal · Webhook handling · Feature entitlements

Apple/Google in-app purchase requirements must be checked before App Store release depending on the nature of each subscription and platform rules.

---

### FASE 4 — WORKPROOF MVP

Construir primeiro produto operacional.

**Screens:** Home · Customers · Jobs · New Job · Start Job · Job Timeline · Camera · Completion · Signature · Report Preview · Settings

**Data model additions:**

```text
customers
jobs
job_sessions
job_photos
job_notes
job_materials
signatures
reports
```

**Core actions:** Create job · Start job · Capture start timestamp · Capture permitted location · Upload before/during/after photos · Add notes · Add materials · End job · Customer signature · Generate PDF report · Share report

**Analytics — track:** `signup_completed` · `first_job_created` · `first_job_started` · `first_photo_uploaded` · `first_report_generated` · `report_shared` · `subscription_started`

**MVP success metric:** At least 30–40% of activated testers generate more than one report in the initial validation period.

---

### FASE 5 — SITEREPORT AI

Reuse WorkProof infrastructure.

**Add:** Voice note recording · Speech-to-text · AI summarisation · Structured report schema · Project/site metadata · Issues list · Outstanding list · Variations/change requests · Branded PDF templates

AI should produce structured JSON first, then the application renders the report. Never rely only on raw AI-formatted text.

Example schema:

```json
{
  "summary": "",
  "work_completed": [],
  "outstanding": [],
  "issues": [],
  "variations": [],
  "recommendations": []
}
```

---

### FASE 6 — QUOTESNAP AI

**Reuse:** Customers · Photos · AI · PDFs · Billing

**Add:** Quote model · Quote items · Labour · Materials · Tax/VAT configuration · Customer approval · Public secure quote link · Signature · Deposit status

Do not allow AI to silently set final commercial pricing. AI can suggest structure/estimates; user must review and approve final value.

---

### FASE 7 — VOICEINVOICE

Add command: Voice → structured invoice draft.

**Entities:**

```text
invoices
invoice_items
expenses
payment_status
```

**Flow:** Record voice · Transcribe · Extract customer, hours, rate, expenses · Preview draft · User confirms · PDF · Share/send · Mark paid

---

### FASE 8 — DOIT AI CORE

Now combine validated primitives. Build an AI command router.

**Examples:**

```text
create_quote
create_job
schedule_job
update_job
create_invoice
mark_paid
add_expense
create_reminder
find_customer
summarise_day
```

**Architecture:**

```text
Voice/Text
  ↓
Transcription
  ↓
Intent classifier
  ↓
Structured command JSON
  ↓
Validation layer
  ↓
User confirmation if destructive/financial
  ↓
Application action
  ↓
Audit log
```

**Critical principle:** AI must never directly perform sensitive/destructive actions without backend validation and, when necessary, explicit confirmation.

---

### FASE 9 — WHATSJOB AI

MVP first without deep WhatsApp dependency.

**Support:** Paste message · Share text to app · Upload audio · Share audio if platform allows · Extract customer/job/date/price

Later investigate official WhatsApp Business API flows.

---

### FASE 10 — EXHIBITION OS

Create dedicated workspace mode.

**Entities:**

```text
projects
venues
stands
build_phases
crew
project_files
project_drawings
graphics
electrical_items
led_items
flooring_items
deliveries
snags
client_changes
handovers
```

**Features:** Project dashboard · Drawings version control · Crew assignment · Task board · Snagging · Photo proof · Daily report · Client variation log · Completion handover

---

### FASE 11 — RECEIPT AI UK

**Features:** Camera scan · OCR · Receipt crop · Merchant/date/total · VAT field · Category · Assign to job · Export

Avoid claiming tax/accounting compliance without appropriate professional review.

---

### FASE 12 — VANSTOCK

**Features:** Inventory · Vans · Stock movement · Job consumption · Low stock · QR/barcode · Restock list

Can later integrate with DOIT AI and jobs.

---

### FASE 13 — B2C EXPERIMENTS

After B2B platform generates recurring revenue, test: FixMyHome AI · Maintenance Passport · Family Admin AI · ParkingMate UK · Subscription Killer · SchoolLife UK

Each starts as separate landing page + clickable prototype before coding.

---

## 8. SHARED UX DESIGN LANGUAGE

**Desired style:** Clean · Modern · Trustworthy · High contrast · Minimal cognitive load · Professional UK SaaS aesthetic

Do not make it look like a generic AI template.

**Design requirements:** 8pt spacing system · Clear typography hierarchy · Large touch targets · Accessible contrast · Native-feeling mobile navigation · Skeleton states · Empty states with CTA · Error recovery · Confirmation for destructive actions · Optimistic UI only when safe

---

## 9. SECURITY REQUIREMENTS

Mandatory:

- Supabase RLS
- Server-side authorization
- Never trust client-side role checks alone
- Secure secrets
- Signed URLs where appropriate
- Private storage for customer/job documents
- Rate limiting for AI endpoints
- Usage quotas
- Audit logs
- Input validation
- File type validation
- File size limits
- Sanitisation of user-generated data
- Secure public quote/report links using non-guessable tokens
- GDPR-conscious data handling
- Account deletion/export path
- Privacy policy before public launch

---

## 10. AI SAFETY / RELIABILITY

Every AI workflow must use structured outputs where possible.

**Required pattern:**

```text
raw user input
→ model
→ typed JSON/schema
→ validation
→ business rules
→ preview/confirmation
→ database write
```

**Never let an LLM:**

- Arbitrarily change invoice totals
- Send money
- Delete data silently
- Create legally binding commitments without confirmation
- Provide dangerous electrical/gas/structural instructions as authoritative professional advice

Store AI model/version and response metadata where useful for debugging.

---

## 11. ANALYTICS & KPI

For every product monitor:

**Acquisition:** Landing visits · Signup conversion · Source

**Activation:** Define one activation event per product. Examples — WorkProof: first report generated. SiteReport: first AI report generated. QuoteSnap: first quote shared.

**Retention:** D1 · D7 · D30 · Weekly active users

**Revenue:** Trial → paid · MRR · ARPU · Churn · Expansion revenue

**Product:** Jobs/user · Reports/user · Quotes/user · AI actions/user

---

## 12. MARKET / PRICING FRAMEWORK

Do not permanently hardcode the current suggested prices. Build plan configuration in database/Stripe.

Initial price hypotheses:

```text
B2C utility:            £2.99–£9.99/month
Solo professional:      £9.99–£29/month
Small business:         £29–£99/month
Vertical B2B:           £99–£299/month
Enterprise / agencies:  £500+/month where value supports it
```

Use annual plans with ~15–20% discount after validation.

---

## 13. VALIDATION SYSTEM

Before fully developing any new app:

1. Create name + positioning.
2. Create landing page.
3. Create 30–60 second demo/prototype.
4. Contact at least 20 potential users.
5. Run interviews/demos.
6. Capture objections.
7. Ask for beta commitment.
8. Ideally secure pre-order/deposit/waitlist before full build.

**Decision:**

```text
Problem validated?
    ↓
No → stop/change
Yes
    ↓
Users repeatedly use MVP?
    ↓
No → simplify/change
Yes
    ↓
Will they pay?
    ↓
No → pricing/value change
Yes → invest further
```

---

## 14. RELEASE PHASES FOR EACH APP

- **Alpha** — Internal · Core happy path only · No marketing launch
- **Closed Beta** — 10–30 users · Direct communication · Manual onboarding acceptable
- **Paid Beta** — First paying users · Discounted founder plan allowed · Measure retention
- **V1 Public** — App Store · Play Store · Website · Pricing · Support · Legal pages
- **V1.5** — Only build features requested repeatedly by paying users
- **V2** — Automation, integrations, teams, deeper AI

---

## 15. TESTING STRATEGY

Required: type checking · linting · unit tests for domain logic · integration tests for important backend functions · E2E for critical flows.

**Critical E2E flows:** Signup · Login · Create customer · Create job · Generate report · Generate quote · Generate invoice · Upgrade subscription · Cancel subscription · Delete account

**Mobile test matrix:** iOS latest supported versions · Common iPhone sizes · Android current/common versions · Small Android screens

---

## 16. CI/CD

**Git flow:** `main` · `development` or short-lived feature branches

**CI:** install · lint · typecheck · tests · build

**Deployment:** Preview environments for web · Supabase migration pipeline · EAS preview builds · Production release process

---

## 17. APP STORE / PLAY STORE RELEASE CHECKLIST

Before submission: App icon · Splash screen · Screenshots · App description · Privacy policy · Terms · Support URL/email · Data safety declaration · App privacy details · Permission descriptions · Delete account flow if required · Subscription disclosure · Restore purchase where required · Test subscription flows · Crash-free smoke testing

---

## 18. COMMERCIAL LAUNCH STRATEGY

For B2B apps do not depend only on App Store discovery.

**Initial acquisition:** Direct outreach · WhatsApp groups · Facebook groups · LinkedIn · Local trade businesses · Cold email · In-person demos · Referral program · Short video demos · Free founder accounts for strategic users

Message should sell outcome, not features.

- WorkProof: *Protect your work. Prove every job.*
- SiteReport: *Turn site photos and voice notes into a professional report in minutes.*
- QuoteSnap: *Photo. Speak. Quote.*

---

## 19. RECOMMENDED BUILD ORDER

Claude Code should treat this as the default sequence:

```text
0.  Product discovery
1.  Shared monorepo foundation
2.  Mobile shell
3.  Auth/workspaces/billing/files
4.  WorkProof MVP
5.  SiteReport AI
6.  QuoteSnap AI
7.  VoiceInvoice
8.  DOIT AI command layer
9.  WhatsJob AI
10. Exhibition OS
11. Receipt AI
12. VanStock
13. Only then explore B2C apps
```

Do not build the 15 apps independently from zero. Reuse the same platform capabilities.

---

## 20. FIRST COMMERCIAL GOAL

Do not measure success by number of features.

```text
Milestone 1: 10 active testers
Milestone 2: 3 paying customers
Milestone 3: £500 MRR
Milestone 4: £1,000 MRR
Milestone 5: £5,000 MRR
Milestone 6: £10,000 MRR
```

Only scale product development after retention is proven.

---

## 21. INSTRUCTIONS TO CLAUDE CODE

Claude Code must **NOT** attempt to generate the entire platform in one giant pass.

For every phase:

1. Inspect repository.
2. Read this master plan.
3. State current phase.
4. Identify existing reusable code.
5. Produce a concise implementation plan.
6. Implement only the current phase.
7. Run lint/typecheck/tests.
8. Fix errors.
9. Document migrations/environment variables.
10. Update CHANGELOG / PROJECT_STATUS.
11. Stop at a stable checkpoint.

Do not silently change architecture or dependencies without documenting the reason.

Prefer boring, maintainable technology over unnecessary complexity.

Do not duplicate modules that already exist.

All database changes must use migrations.

All sensitive backend actions must enforce authorization server-side.

All major modules should have typed interfaces.

---

## 22. REQUIRED PROJECT STATUS FILE

Claude Code should maintain `PROJECT_STATUS.md`:

```text
Current phase:
Status:
Completed:
In progress:
Blocked:
Next task:
Database migrations:
Environment variables:
Known issues:
Tests status:
```

This makes it possible to continue development in future sessions without losing context.

---

## 23. DEFINITION OF DONE FOR A PHASE

A phase is complete only when:

- Feature works end-to-end
- No known critical errors
- Typecheck passes
- Lint passes
- Relevant tests pass
- Database migration exists
- Permissions/RLS checked
- Empty/loading/error states handled
- Mobile usability checked
- Documentation updated

---

## 24. MASTER PRODUCT VISION

Long-term, the strongest validated B2B modules may converge into one platform:

```text
DOIT BUSINESS OS
│
├── Customers
├── Jobs
├── Quotes
├── Calendar
├── WorkProof
├── Site Reports
├── Invoices
├── Payments
├── Expenses
├── Receipts
├── Inventory
├── Team
└── AI Assistant
```

The individual apps can remain separate acquisition channels with focused branding while sharing one backend/platform where technically and commercially sensible.

- WorkProof attracts users needing proof of work.
- QuoteSnap attracts users needing quotes.
- VoiceInvoice attracts users needing invoices.
- SiteReport attracts site managers.
- All can later upsell to DOIT AI / Business OS.

This creates a product ecosystem instead of isolated applications.

---

## FINAL DIRECTIVE TO CLAUDE CODE

Start by creating a technical architecture and repository plan for **PHASE 1 — FOUNDATION**, but do not implement unrelated later phases prematurely.

Before writing code, check whether the repository is empty or already contains a project.

If code exists, preserve working functionality and propose incremental migration rather than destructive replacement.

The first target product after the shared foundation is **WORKPROOF**, followed by **SITEREPORT AI**, **QUOTESNAP AI**, **VOICEINVOICE**, and then **DOIT AI**.

The goal is not to create the largest application. The goal is to launch useful products quickly, get real users, generate recurring revenue, learn from behaviour, and continuously reuse the strongest technology across the portfolio.
