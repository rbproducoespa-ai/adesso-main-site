# PROJECT_STATUS — Portfólio de Apps / Micro-SaaS

> Arquivo exigido pelo §22 do [master plan](./docs/master-plan-15-apps.md).
> Serve para retomar o desenvolvimento em sessões futuras sem perder contexto.
> **Este arquivo acompanha o portfólio, não o site da Adesso.** Move-se para o
> repositório `graphipy` assim que ele existir.

**Última atualização:** 2026-08-23

---

**Current phase:**
FASE 1 — FOUNDATION / MONOREPO (documento de arquitetura concluído; implementação **não iniciada**)

**Status:**
Bloqueado por dependência externa. A arquitetura está definida e aprovada para execução, mas o repositório de destino ainda não existe/não está acessível.

**Completed:**
- Master plan registrado como fonte da verdade — `docs/master-plan-15-apps.md`
- Fase 0 parcial: portfólio, posicionamento, hipóteses de preço e priorização (Tier A/B/C) definidos pelo próprio master plan
- Inspeção do repositório existente (`adesso-main-site`), conforme a diretiva final do plano: projeto Next.js 15 em produção, **não** é base vazia — decidido não converter
- Arquitetura técnica e plano de repositório da Fase 1 — `docs/phase-1-foundation-architecture.md`
- Decisões registradas: pnpm + Turborepo; React Native/Expo em vez de Flutter (justificativa no §2 do doc de arquitetura); monorepo novo em `graphipy` em vez de conversão destrutiva do site
- Mapa do que portar de `adesso-main-site` (§7 do doc de arquitetura)

**In progress:**
Nada. Aguardando desbloqueio.

**Blocked:**
1. **Repositório `graphipy` não existe ou não está autorizado.** Nenhum repositório com esse nome aparece na lista de repositórios liberados para o Claude — só `rbproducoespa-ai/adesso-main-site`. Desbloqueio: criar o repo no GitHub e autorizá-lo em claude.ai → Settings → Connectors (GitHub).
2. **Projeto Supabase do portfólio não criado.** Necessário para as migrations `0001`–`0006`. Precisa de três ambientes: local, staging, production.
3. **Fase 0 incompleta.** O plano (§7, §13) proíbe código de produção antes de entrevistas com usuários reais. As entrevistas do WorkProof não começaram. Isso **não** bloqueia a Fase 1 (a fundação é agnóstica de produto), mas bloqueia a Fase 4.

**Next task:**
Assim que o `graphipy` estiver acessível, executar o passo 1 da §9 do doc de arquitetura: criar o monorepo (pnpm workspaces + Turborepo), `packages/config` com TypeScript/ESLint/Prettier compartilhados e o workflow de CI mínimo. Copiar os três documentos (`master-plan-15-apps.md`, `phase-1-foundation-architecture.md`, `PROJECT_STATUS.md`) para o novo repositório. Parar em checkpoint estável e atualizar este arquivo.

Em paralelo, sem depender de código: iniciar as entrevistas da Fase 0 para o **WorkProof** (lista de 20 potenciais usuários, §7).

**Database migrations:**
Nenhuma aplicada. Planejadas para a Fase 1:
```
0001_core_identity.sql        profiles + trigger de signup
0002_workspaces.sql           workspaces, workspace_members, roles, is_workspace_member()
0003_plans_subscriptions.sql  catálogo de planos + esqueleto de assinatura
0004_files_storage.sql        tabela files + buckets + policies de storage
0005_audit_analytics.sql      audit_logs (append-only) + analytics_events
0006_rls_policies.sql         policies de todas as tabelas
```

**Environment variables:**
Nenhuma configurada ainda. Previstas para a Fase 1:
```
SUPABASE_URL                  cliente (público)
SUPABASE_ANON_KEY             cliente (público) — a defesa real é a RLS
SUPABASE_SERVICE_ROLE_KEY     apenas servidor/Edge Functions
SENTRY_DSN                    cliente + servidor, por ambiente
POSTHOG_KEY                   cliente + servidor, por ambiente
```
Fases posteriores: `ANTHROPIC_API_KEY` (apenas servidor, Fase 5), `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` (apenas servidor, Fase 3).

**Known issues:**
- Cobrança de assinatura em iOS/Android pode exigir in-app purchase da Apple/Google em vez de Stripe puro. Decidir na Fase 3, antes de qualquer submissão às lojas. O modelo de entitlements nasce independente do provedor para não travar essa escolha.
- `adesso-main-site` libera acesso ao admin quando as variáveis do Supabase não estão configuradas (`src/middleware.ts`) e retorna um cliente mock silencioso (`src/lib/supabase-admin.ts`). São padrões convenientes em dev que **não devem ser portados** para o portfólio em produção. Registrado no §7 do doc de arquitetura. (Observação sobre o site existente — não é bug do portfólio.)

**Tests status:**
Nenhum teste ainda — não há código de produto. Definido para a Fase 1: Vitest (domínio), Playwright (E2E web), Maestro (E2E mobile). Teste obrigatório de isolamento entre workspaces (RLS) faz parte da definição de pronto da fase.
