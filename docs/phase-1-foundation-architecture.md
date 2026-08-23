# FASE 1 — FOUNDATION: Arquitetura Técnica e Plano de Repositório

**Documento de arquitetura. Nenhum código de produto foi implementado ainda.**

Referência obrigatória: [`master-plan-15-apps.md`](./master-plan-15-apps.md)
Estado atual do trabalho: [`../PROJECT_STATUS.md`](../PROJECT_STATUS.md)

---

## 0. Contexto e decisão de repositório

A diretiva final do master plan manda verificar se o repositório está vazio ou já contém um projeto **antes de escrever código**. Verificação feita:

| Repositório | Conteúdo | Decisão |
|---|---|---|
| `rbproducoespa-ai/adesso-main-site` | Site institucional da Adesso — Next.js 15 (App Router), React 19, Supabase, Tailwind 3, i18n PT/EN, painel admin, engine de WhatsApp. 128 arquivos em `src/`, em produção. | **Não converter.** Preservar funcionamento. Serve apenas como **repositório de origem** para código reaproveitável e como host temporário desta documentação. |
| `graphipy` (destino pretendido) | Ainda não acessível a esta sessão. | **Destino do monorepo.** Toda a Fase 1 deve ser implementada lá, do zero. |

**Consequência prática:** converter o site da Adesso em monorepo do portfólio seria exatamente a "substituição destrutiva" que o plano proíbe — o site tem rotas, admin e integrações em produção que não têm relação com os 15 apps. A Fase 1 nasce limpa no `graphipy`; o que valer a pena do site é **portado**, não movido.

### Pré-requisito de desbloqueio

Antes que a Fase 1 possa ser implementada:

1. Criar o repositório `graphipy` no GitHub (conta `rbproducoespa-ai`, privado é o recomendado enquanto não há produto público).
2. Autorizar o repositório para o Claude em claude.ai → Settings → Connectors (GitHub).
3. Copiar `docs/master-plan-15-apps.md`, este documento e `PROJECT_STATUS.md` para o `graphipy`.

---

## 1. Escopo da Fase 1 (e o que fica de fora)

**Dentro do escopo** (§7, Fase 1 do master plan):

- Repositório Git + monorepo + tooling compartilhado
- TypeScript config, ESLint, Prettier compartilhados
- Estratégia de ambientes/env
- Projeto Supabase + sistema de migrations
- Auth, user profile, workspace/company, team membership, roles
- File storage
- Audit log básico
- Eventos de analytics
- Error monitoring
- Design system compartilhado

**Fora do escopo — não implementar agora:** telas de produto, câmera, assinatura de cliente, PDF, qualquer chamada de IA, Stripe (Fase 3), shell mobile completo (Fase 2), e qualquer entidade de negócio (`jobs`, `quotes`, `invoices`…). As tabelas `plans` e `subscriptions` entram apenas como **esqueleto de leitura** para que o modelo de entitlements exista, sem lógica de cobrança.

---

## 2. Stack da fundação

| Camada | Escolha | Motivo |
|---|---|---|
| Gerenciador de pacotes | **pnpm** (workspaces) | Melhor com monorepo e dependências duplicadas de RN/Next |
| Orquestrador | **Turborepo** | Cache de build/lint/typecheck por pacote; já familiar ao ecossistema Next |
| Linguagem | **TypeScript strict** | §21: "todos os módulos principais devem ter interfaces tipadas" |
| Mobile | **Expo (SDK managed) + Expo Router + React Native** | Preferência declarada no §2; EAS Build/Submit resolve iOS+Android |
| Web | **Next.js (App Router) + Tailwind + shadcn/ui** | §2; alinhado ao que já se domina no site da Adesso |
| Backend | **Supabase** — Postgres, Auth, RLS, Storage, Edge Functions | §2 |
| Erros | **Sentry** (`@sentry/react-native`, `@sentry/nextjs`) | §2 |
| Analytics de produto | **PostHog** | §2, §11 |
| Testes | **Vitest** (unit/domínio) · **Playwright** (E2E web) · **Maestro** (E2E mobile) | §15 |
| CI | **GitHub Actions** | §16 |

**Decisão registrada (§21 exige documentar):** React Native/Expo em vez de Flutter. Razão — o dashboard web e as Edge Functions são TypeScript; RN mantém uma única linguagem e permite compartilhar `packages/database`, `packages/ai` e tipos gerados do Supabase entre mobile e web. Flutter forçaria duplicar toda a camada de domínio em Dart. Revisitar só se surgir requisito de performance gráfica que o RN não atenda.

---

## 3. Estrutura do monorepo

```text
graphipy/
├── apps/
│   ├── mobile/                 # Expo — shell único, produtos como módulos (Fase 2)
│   └── web/                    # Next.js — dashboard + landing pages de validação (Fase 0)
├── packages/
│   ├── design-tokens/          # cores, spacing 8pt, tipografia — fonte única, sem React
│   ├── ui/                     # componentes: web (shadcn) e native, mesmos tokens
│   ├── auth/                   # sessão, guards, hooks de usuário
│   ├── database/               # cliente Supabase, tipos gerados, repositórios tipados
│   ├── billing/                # entitlements + esqueleto Stripe (preenchido na Fase 3)
│   ├── analytics/             # trackEvent tipado (PostHog + destinos adicionais)
│   ├── notifications/          # push + email transacional (stub na Fase 1)
│   ├── ai/                     # cliente Claude + validação de schema (stub na Fase 1)
│   ├── pdf/                    # renderização de documentos (stub na Fase 1)
│   ├── storage/                # upload, signed URLs, validação de arquivo
│   └── config/                 # tsconfig, eslint, prettier compartilhados
├── supabase/
│   ├── migrations/             # SQL versionado — única forma de alterar o schema
│   ├── functions/              # Edge Functions
│   └── seed.sql
├── docs/
│   ├── master-plan-15-apps.md
│   └── phase-1-foundation-architecture.md
├── .github/workflows/ci.yml
├── PROJECT_STATUS.md
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

**Regra de dependência (evita o monorepo virar espaguete):**

```text
apps/*  →  packages/*        permitido
packages/*  →  packages/*    permitido apenas "para baixo" na lista acima
packages/*  →  apps/*        proibido
```

`design-tokens` e `config` não dependem de nada. `ui` depende só de `design-tokens`. `database` não importa `ui`. Um produto (WorkProof, SiteReport…) nunca vira um `package` — vira um módulo de feature dentro de `apps/mobile`, consumindo os packages.

---

## 4. Modelo de dados da Fase 1

Apenas o núcleo multi-tenant do §4. As entidades de negócio chegam com seus produtos.

```text
profiles            1:1 com auth.users — nome, avatar, locale, telefone
workspaces          o tenant. Toda linha de negócio futura carrega workspace_id
workspace_members   usuário × workspace × role
plans               catálogo de planos (seed; preços vêm daqui, não do código — §12)
subscriptions       workspace → plano + status (esqueleto; Stripe na Fase 3)
files               metadados de todo upload (bucket, path, mime, tamanho, dono)
audit_logs          quem fez o quê, em qual workspace, quando, com que payload
analytics_events    espelho interno dos eventos enviados ao PostHog
```

**Roles:** `owner` · `admin` · `member`. Um workspace tem exatamente um `owner`.

### Princípios de RLS (§9 — obrigatório)

1. RLS **habilitado em todas as tabelas** listadas acima, sem exceção.
2. O predicado padrão é a pertença ao workspace, resolvido por uma função `SECURITY DEFINER`:

```sql
create or replace function public.is_workspace_member(ws uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from workspace_members
    where workspace_id = ws and user_id = auth.uid()
  );
$$;
```

Usar a função — e não um subselect direto na policy — evita recursão infinita de RLS em `workspace_members` e mantém as policies legíveis.

3. Escrita destrutiva (`delete`, mudança de role, remoção de membro) exige `owner`/`admin`, verificado **no servidor**. Checagem de role no cliente é só UX.
4. `audit_logs` é **append-only**: policy de `insert` + `select`; sem `update`/`delete` para nenhum role de aplicação.
5. Buckets de Storage privados por padrão. Acesso a documento de cliente sempre por **signed URL** de vida curta. Nada de bucket público para foto de job ou relatório.
6. Links públicos de quote/report (Fases 5–6) usarão token não adivinhável em coluna própria — nunca o UUID da linha.

### Migrations

Toda alteração de schema é um arquivo em `supabase/migrations/`, com timestamp, aplicado por `supabase db push` no CI. Sem edição manual no dashboard — o dashboard é só para inspeção. A Fase 1 entrega:

```text
0001_core_identity.sql        profiles + trigger de criação no signup
0002_workspaces.sql           workspaces, workspace_members, roles, is_workspace_member()
0003_plans_subscriptions.sql  catálogo de planos + esqueleto de assinatura
0004_files_storage.sql        tabela files + buckets + policies de storage
0005_audit_analytics.sql      audit_logs (append-only) + analytics_events
0006_rls_policies.sql         policies de todas as tabelas acima
```

---

## 5. Estratégia de ambientes

Três projetos Supabase distintos: **local** (CLI/Docker) · **staging** · **production**. Nenhum desenvolvimento aponta para produção.

| Variável | Onde vive | Observação |
|---|---|---|
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | mobile + web (público) | seguro no cliente **porque** a RLS é a defesa real |
| `SUPABASE_SERVICE_ROLE_KEY` | só servidor/Edge Functions | nunca em `apps/mobile`, nunca em bundle client |
| `ANTHROPIC_API_KEY` | só servidor | chamadas de IA passam por Edge Function, jamais direto do app (§10) |
| `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | só servidor | Fase 3 |
| `SENTRY_DSN`, `POSTHOG_KEY` | ambos | por ambiente |

Cada `app` mantém `.env.example` versionado. Segredos reais em GitHub Secrets / EAS Secrets / Vercel Env — nunca no git.

---

## 6. Design system compartilhado

`packages/design-tokens` exporta objetos TypeScript puros (cores, escala 8pt, tipografia, raio, sombra, duração). Dele derivam o preset do Tailwind (web) e o tema do React Native — **uma definição, dois consumidores**, sem valor hex escrito à mão em componente.

O §8 pede estética "UK SaaS profissional", alto contraste, e explicitamente *não* parecer template de IA genérico. Portanto: paleta própria por marca de produto (WorkProof ≠ QuoteSnap ≠ SiteReport) sobre a **mesma** estrutura de tokens semânticos (`surface`, `content`, `accent`, `danger`, `success`). Marca troca a paleta; nunca a escala nem os componentes.

Estados obrigatórios em todo componente de lista/formulário desde o primeiro dia: `loading` (skeleton), `empty` (com CTA), `error` (com recuperação). Confirmação explícita para ação destrutiva.

---

## 7. O que portar de `adesso-main-site`

Reaproveitar padrões já testados em produção, sem copiar acoplamento ao domínio de exhibitions:

| Origem | Destino | Ação |
|---|---|---|
| `src/lib/supabase.ts`, `supabase-server.ts` | `packages/database` | Portar o padrão de client browser/server SSR. |
| `src/lib/supabase-admin.ts` | `packages/database` | Portar **o conceito** de degradar sem env configurada — mas apenas em dev. Em produção, env ausente deve **falhar alto**, não retornar mock silencioso. |
| `src/middleware.ts` | `apps/web` | Bom padrão de refresh de sessão via cookies. **Não** portar a autorização por lista de e-mails (`ADMIN_EMAILS`) nem o fallback "sem env, libera tudo" — no portfólio a autorização é role em `workspace_members`, checada no servidor. |
| `src/lib/analytics.ts` | `packages/analytics` | Portar a ideia de fachada única de eventos; trocar o alvo (GA4/Meta Pixel → PostHog) e **tipar os nomes de evento** em vez de string livre. |
| `src/lib/i18n.tsx` | `packages/ui` | Estrutura de locale PT/EN. Trocar o dicionário embutido no arquivo por catálogos por namespace — o master plan pede "internationalisation-ready", e o produto nasce em inglês (UK). |
| `tailwind.config.ts` | `packages/design-tokens` | Portar a disciplina de tokens; **não** portar a paleta escura da Adesso — é identidade do site institucional. |
| `src/lib/whatsapp-engine.ts` | — | **Não portar agora.** Reavaliar na Fase 9 (WhatsJob AI), à luz das políticas oficiais da WhatsApp Business API. |

---

## 8. CI desde o primeiro commit (§16)

`.github/workflows/ci.yml`, em todo PR: `pnpm install` → `turbo lint` → `turbo typecheck` → `turbo test` → `turbo build`. Migrations aplicadas a staging no merge para `main`. Branches curtas por feature; `main` sempre verde.

---

## 9. Ordem de execução da Fase 1

Cada passo termina em checkpoint estável, com `PROJECT_STATUS.md` atualizado (§21, §22).

1. Repositório `graphipy`, pnpm workspace, Turborepo, `packages/config` (tsconfig/eslint/prettier), CI mínima.
2. `packages/design-tokens` + `packages/ui` (primitivos: Button, Input, Card, ListItem, EmptyState, Skeleton, ErrorState).
3. Projeto Supabase + migrations `0001`–`0006` + tipos gerados para `packages/database`.
4. `packages/auth` — signup, login, recuperação de senha, sessão, `useCurrentUser`, `useWorkspace`.
5. Workspaces: criação no signup, convite de membro, papéis, troca de workspace.
6. `packages/storage` — upload com validação de tipo/tamanho, signed URLs, tabela `files`.
7. `packages/analytics` (PostHog, eventos tipados) + Sentry em web e mobile.
8. Audit log gravando as ações sensíveis do que já existe (convite, mudança de role, remoção de membro, exclusão de arquivo).

### Definição de pronto da Fase 1 (§23)

- [ ] Usuário se cadastra, cria workspace, convida um segundo usuário e ele entra
- [ ] Usuário do workspace A comprovadamente **não** lê dados do workspace B (teste automatizado contra a RLS, não inspeção manual)
- [ ] Upload de arquivo e leitura por signed URL funcionando; bucket não é público
- [ ] Ações sensíveis aparecem em `audit_logs`
- [ ] Eventos chegam ao PostHog; erros chegam ao Sentry
- [ ] `lint`, `typecheck` e `test` verdes no CI
- [ ] Migrations aplicam em base limpa do zero
- [ ] Estados vazio/carregando/erro presentes nas telas existentes
- [ ] `.env.example` e documentação atualizados
- [ ] `PROJECT_STATUS.md` refletindo o estado real

---

## 10. Riscos conhecidos e como tratá-los

| Risco | Tratamento |
|---|---|
| Fundação virar projeto sem fim | Fase 1 tem lista fechada e checklist de pronto. Ao completá-la, ir direto para WorkProof (Fase 4 é o primeiro produto real, e é o que testa a fundação de verdade). |
| Recursão de RLS em `workspace_members` | Função `SECURITY DEFINER` (§4), com teste dedicado. |
| Assinaturas no iOS/Android | Apple e Google exigem in-app purchase para conteúdo digital consumido no app. Stripe puro pode ser rejeitado. **Resolver na Fase 3, antes de qualquer submissão** — não é decisão de Fase 1, mas o modelo de entitlements já nasce independente do provedor de cobrança. |
| Preço fixo no código | `plans` no banco desde a Fase 1 (§12). |
| Custo de IA sem teto | `ai_usage` + quota por plano antes da primeira chamada real de IA (Fase 5). |
| Dados de cliente no Storage (GDPR) | Buckets privados, signed URLs curtas, caminho de exclusão/exportação de conta antes do lançamento público (§9). |
