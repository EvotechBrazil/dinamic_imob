# Squad 1 — Estrutura (Plataforma & Plat-Eng)

> Fundação técnica do Dinamic: monorepo, infra, DevOps, packages compartilhados, observabilidade, segurança, LGPD base. É a squad que destrava as outras duas.

## Missão & Stack

**Missão:** entregar uma plataforma técnica confiável, segura e produtiva — onde Squads 2 e 3 conseguem codar sem fricção, e operações consegue rodar produção sem surpresas.

**Stack principal:**
- **Monorepo:** pnpm workspaces + Turborepo (cache incremental)
- **Containers:** Docker + docker-compose (dev local)
- **Hosting:** Vercel (apps/web) + Hostinger easypanel (apps/api + worker + Postgres + Redis + Meilisearch)
- **Data:** PostgreSQL 16 + pgvector + PgBouncer
- **Cache/Queue:** Redis 7
- **Search:** Meilisearch 1.x
- **Storage:** Cloudflare R2 (multipart, presigned URLs)
- **CI/CD:** GitHub Actions
- **Secrets:** Doppler ou HashiCorp Vault leve
- **Observabilidade:** Sentry + Better Stack + PostHog + OpenTelemetry
- **Quality:** ESLint + Prettier + Husky + lint-staged + commitlint + Lighthouse CI + Playwright + k6/Artillery
- **Security:** Snyk + Gitleaks + OWASP ZAP + Cloudflare WAF

**Packages owned:** `@dinamic/tsconfig`, `@dinamic/eslint-config`, `@dinamic/ui` (design tokens + wrappers), `@dinamic/shared` (zod BR + formatters), `@dinamic/db` (Prisma + migrations + seed), `@dinamic/contracts` (interfaces cross-módulo), `@dinamic/ai-prompts`, `@dinamic/flags` (feature flags).

## Composição do time (6 devs)

| Papel | Responsabilidade principal |
|-------|-----------------------------|
| 1× Tech Lead / Platform Architect | Direção técnica, ADRs, arbitra trade-offs cross-squad |
| 2× Platform/DevOps Engineers | CI/CD, infra Hostinger+Vercel, Docker, secrets, deploys |
| 1× Database Engineer | Prisma schema, migrations, tuning Postgres, backups, pgvector |
| 1× Security/LGPD Engineer | Auth, audit, consent, retention, security scans, WAF |
| 1× SRE / Observability | Sentry, BetterStack, PostHog, OTel, SLO, alerting, on-call |

**Scrum Master:** compartilhado com Chief SM (não conta no time de 6).

## Visão executiva dos 9 sprints

| Sprint | Sprint Goal | SP | Marco entregue |
|--------|-------------|----|----------------|
| **S0** | `pnpm setup` < 60min funcional + Prisma schema núcleo + seed mock + CI verde + design tokens | 49 | M0 — Fundação verde |
| **S1** | Auth (NextAuth+JWT+RBAC) + tenant middleware + Sentry/PostHog/BetterStack instrumentados + LGPD base | 52 | Habilitador da demo wow |
| **S2** | Adapter interfaces + R2 + image pipeline + Meilisearch index + Mapbox + email adapter | 45 | Plataforma de integrações |
| **S3** | Preview env por PR + Lighthouse CI + Playwright framework + audit log + OTel | 45 | Quality gates |
| **S4** | Staging full + LGPD endpoints infra + rate limit + secrets management + cron orchestration | 39 | Habilitador da demo IA cliente |
| **S5** | Produção Hostinger provisionada + DNS + SSL + backups testados + DR plan | 38 | Produção idle |
| **S6** | Load testing + WAF + DAST + security hardening + monitoring SLO + alert routing | 42 | Plataforma robusta |
| **S7** | Go-live runbook + 301 redirects + DNS switchover + dry-run + treinamento DevOps | 44 | Pronto pra go-live |
| **S8** | Go-live executado + hyper-monitoring + post-mortem + handoff | 32 | M6 — GO-LIVE |
| **Total** | | **386 SP** | |

---

## Sprint 0 (semanas 1-2) — Fundação

### Sprint Goal

> "Qualquer dev novo clona o repo, roda `pnpm setup`, em menos de 60 minutos tem Postgres+Redis+Meilisearch rodando, migrations aplicadas, seed mock populado e CI verde. As Squads 2 e 3 podem começar Sprint 1 sem nenhum bloqueio."

### Backlog

| ID | User Story | SP | Owner |
|----|------------|----|-------|
| **US-S1-001** | Como dev, quero um monorepo Turborepo com `apps/{web,api,worker}` e `packages/*` para que `pnpm install` resolva tudo | 5 | Platform |
| **US-S1-002** | Como dev, quero `docker-compose.yml` subindo Postgres 16 + pgvector + Redis 7 + Meilisearch 1.x para rodar local | 3 | Platform |
| **US-S1-003** | Como dev, quero `@dinamic/tsconfig` (base/nextjs/nestjs) + `@dinamic/eslint-config` (base/react/node) + Prettier compartilhados | 3 | Platform |
| **US-S1-004** | Como dev de UI, quero `@dinamic/ui` com design tokens (indigo+amber+Plus Jakarta+Inter) + Tailwind preset compartilhado | 5 | TL + DB Eng |
| **US-S1-005** | Como dev, quero `@dinamic/shared` com validators zod BR (CPF, CNPJ, CEP+ViaCEP, celular, RG) + formatters | 5 | Security |
| **US-S1-006** | Como Backend, quero `@dinamic/db` com Prisma schema dos 10 modelos núcleo (User, Tenant, Property, PropertyPhoto, Neighborhood, Owner, Lead, LeadProfile, Visit, Contract) | 8 | DB Eng |
| **US-S1-007** | Como Frontend, quero seed mock realista (50-100 imóveis Arapongas, 30 leads, 15 contratos, métricas) — `pnpm db:seed:mock` | 5 | DB Eng |
| **US-S1-008** | Como dev, quero GitHub Actions CI (lint + typecheck + test + build) rodando em todo PR | 5 | DevOps |
| **US-S1-009** | Como TL, quero Husky + lint-staged + commitlint (Conventional Commits) pré-commit | 2 | DevOps |
| **US-S1-010** | Como dev novo, quero `pnpm setup` (orchestrator: check Node/pnpm, copia .env, sobe docker, migra, seed) — funciona em < 60min | 3 | DevOps |
| **US-S1-011** | Como dev, quero `.env.example` documentado por seção (DB, Redis, Meili, Auth, R2, Mapbox, OpenRouter, etc) + dotenv loader | 2 | Platform |
| **US-S1-012** | Como TL, quero `docs/ARCHITECTURE.md` + `docs/ADRs/ADR-001-stack-e-decisoes-sprint0.md` versionados | 3 | TL |
| | **Total** | **49** | |

### Definition of Done específica do Sprint 0

- [ ] DoD global (cobertura, lint, review, CI) — ver `00-indice.md` §5.3
- [ ] `pnpm setup` validado por **3 devs** diferentes em < 60min (medido)
- [ ] CI executa em < 6min no PR médio
- [ ] Prisma schema com migrations versionadas (`pnpm db:migrate dev`)
- [ ] Seed mock idempotente (rodar 2× não duplica)
- [ ] Design tokens publicados como package interno + documentados em Storybook (Frontend valida)
- [ ] Todos os packages têm `package.json` com `name: @dinamic/*` e `exports` definidos
- [ ] ADR-001 explicando: por que Turborepo (vs Nx), por que Hostinger easypanel (vs Railway), por que OpenRouter (vs Anthropic direto)

### Entregáveis técnicos

- `package.json` raiz + `pnpm-workspace.yaml` + `turbo.json` + `.npmrc` + `.nvmrc`
- `docker-compose.yml` + `docker-compose.override.example.yml`
- 7 packages com estrutura completa (build script, types export, README)
- 10 modelos Prisma + migration inicial + seed
- 1 workflow GitHub Actions (`.github/workflows/ci.yml`)
- `scripts/setup.ts` (orchestrator)
- ARCHITECTURE.md + ADR-001

### Dependências

**Recebe de:** nada — esta squad é a raiz.

**Entrega para:**
- **Squad 2 S0:** monorepo + docker-compose + Prisma schema + .env.example (D01, D03, D04)
- **Squad 3 S0:** monorepo + design tokens + tsconfig/eslint (D01, D02)

### Cerimônias

**Sprint Planning (Segunda sem-1, 9h-13h):**
- 1. Apresentar Sprint Goal e validação com PO (30min)
- 2. Walkthrough da estrutura de pastas e ADR-001 proposta (45min)
- 3. Planning poker das 12 user stories (1h30)
- 4. Atribuição de owners e quebra em tasks Linear/Jira (45min)
- 5. Confirmar capacity (4 dias úteis perdidos por feriado/férias? quantos?) (30min)

**Daily Standup (9h, 15min, async no Slack sextas):** foco em "blockers cross-squad" — se Squad 2 ou 3 está esperando algo, levantar imediatamente.

**Backlog Refinement (Quinta sem-1, 14h-15h30):** refinar Sprint 1 (Auth, RBAC, tenant) com Squad 2 presente (eles consomem).

**Backlog Refinement 2 (Quinta sem-2, 14h-15h30):** refinar Sprint 2 (adapters, R2, Meili) com Squad 2 presente.

**Sprint Review (Sexta sem-2, 14h-16h):**
- Demo: dev novo clona, roda `pnpm setup` ao vivo, abre o admin local
- Mostrar CI verde no PR mais recente
- Mostrar Storybook com design tokens (Frontend valida)
- Coletar feedback Squad 2 e 3 sobre DX

**Sprint Retrospective (Sexta sem-2, 16h-17h30):**
- O que ajudou a entregar? (continue)
- O que atrapalhou? (stop)
- O que tentar no S1? (start)
- Ações com dono + sprint alvo

### Riscos do sprint

| Risco | Probab. | Impacto | Mitigação |
|-------|---------|---------|-----------|
| Setup local fica > 60min por imagem Docker pesada | Médio | Médio | Usar imagens slim, layer cache no CI, pré-baixar imagens em onboarding |
| Schema Prisma muda muito durante a sprint travando Squad 2 | Alto | Alto | Schema núcleo aprovado dia 3 da sprint; depois, só migrations aditivas |
| Design tokens mudam após Squad 3 começar | Médio | Médio | Tokens versionados em package; Frontend usa range fixo |
| Windows-only devs travam no docker-compose | Médio | Baixo | Testar Docker Desktop + WSL2 no setup; documentar |

### Métricas do sprint

- Velocity comprometida: 49 SP / Entregue: medir
- Tempo médio `pnpm setup` em 3 máquinas (alvo < 60min)
- CI time médio (alvo < 6min)
- # de migrations Prisma criadas
- # de PRs mergeados / com review

---

## Sprint 1 (semanas 3-4) — Auth + Tenant + Observabilidade

### Sprint Goal

> "Squad 2 consegue proteger endpoints com guards de role e filtrar por tenant automaticamente; toda exceção em apps/web e apps/api chega no Sentry; eventos chave aparecem no PostHog; LGPD tem fundação de tabelas pra consentimento e audit."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-013** | Como user, quero fazer login (credentials + magic link email) via NextAuth | 5 |
| **US-S1-014** | Como Backend, quero JWT signing + refresh token rotation funcionando | 5 |
| **US-S1-015** | Como admin, quero 5 roles (admin/manager/broker/financial/viewer) com permissions matrix | 5 |
| **US-S1-016** | Como sistema, quero resolver tenant via subdomain (`dinamic.app.dinamicimoveis.com.br`) ou header `X-Tenant` | 5 |
| **US-S1-017** | Como Backend, quero Prisma extension que injeta `tenantId` em todo SELECT/INSERT/UPDATE automaticamente | 8 |
| **US-S1-018** | Como SRE, quero Sentry SDK instrumentando apps/web + apps/api + worker com source maps | 3 |
| **US-S1-019** | Como PO, quero PostHog capturando eventos `lead_created`, `property_viewed`, `chat_opened`, `cta_clicked` | 3 |
| **US-S1-020** | Como SRE, quero logs Pino → Better Stack com correlation ID | 3 |
| **US-S1-021** | Como Security, quero tabelas `consent`, `audit_log`, `data_access_log` + Prisma middleware que loga acesso a PII | 5 |
| **US-S1-022** | Como Backend, quero `@dinamic/contracts` com interfaces dos 14 módulos (sem implementação) | 3 |
| **US-S1-023** | Como TL, quero `@dinamic/flags` (LaunchDarkly leve ou Unleash self-hosted) + decorator NestJS | 5 |
| **US-S1-024** | Como SRE, quero `/health` (db+redis+meili) + uptime monitor Better Stack | 2 |
| | **Total** | **52** |

### DoD específica

- [ ] Login funcional em apps/web (Squad 3 valida)
- [ ] Endpoint protegido testado: usuário sem role correto recebe 403
- [ ] Tenant isolation testado: usuário do tenant A não vê dado do tenant B (teste integration)
- [ ] Sentry recebe exceção provocada via endpoint `/api/test/error`
- [ ] PostHog dashboard configurado com 4 eventos
- [ ] LGPD: 1 audit log gerado automaticamente ao consultar email de Lead
- [ ] Feature flag `chat_widget_v2` criada e respondendo ON/OFF via API

### Entregáveis técnicos

- `apps/api/src/modules/auth/` + `tenants/` completos
- `packages/contracts/src/*.ts` — 14 interfaces
- `packages/flags/` — wrapper + provider
- Sentry, PostHog, BetterStack configurados em 3 ambientes (dev/staging/prod-placeholder)
- 3 novas migrations Prisma (auth tables, lgpd tables, audit)

### Dependências

**Recebe de:** Squad 2 S0 (NestJS shell pra plugar guards)

**Entrega para:**
- **Squad 2 S1:** Auth guards + tenant middleware + audit infra (D05)
- **Squad 3 S2:** auth flow funcional pra admin (D05)

### Cerimônias

**Planning (Segunda sem-3):** foco em alinhar shape do JWT + refresh + multi-tenant strategy com Squad 2.

**Refinement Sprint 2 (Quinta sem-3):** apresentar contrato dos adapters base (`IPaymentGateway`, `IMessagingProvider`, etc) e validar com Squad 2.

**Refinement Sprint 3 (Quinta sem-4):** apresentar plano de preview env + Lighthouse CI com Squad 3.

**Sprint Review (Sexta sem-4):** demo do login completo + dashboard Sentry com erro de exemplo + funnel PostHog. Squad 2 demonstra endpoint protegido por role.

**Retrospective:** pergunta-chave: "houve trade-off entre velocidade da Squad 2/3 e qualidade da fundação?"

### Riscos

| Risco | Probab. | Mitigação |
|-------|---------|-----------|
| Multi-tenant strategy diverge entre Frontend e Backend | Médio | ADR-002 obrigatório no início do sprint |
| Prisma extension cria performance hit | Baixo | Benchmark com 10k queries no fim do sprint |
| LGPD audit log gera escrita demais | Médio | Sampling configurável + retention 90d |

### Métricas

- Velocity entregue vs 52 SP
- # endpoints protegidos por role (alvo: 100% dos não-públicos)
- Sentry signal/noise ratio (sem flood)

---

## Sprint 2 (semanas 5-6) — Adapters base + Storage + Busca

### Sprint Goal

> "Squad 2 consegue trocar Asaas por outro gateway só implementando a interface, fotos de imóvel sobem no R2 e geram variantes WebP, busca de imóvel via Meilisearch retorna em < 100ms, e Mapbox renderiza mapa no Frontend."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-025** | Como Backend, quero 7 adapter interfaces (`IPaymentGateway`, `IMessagingProvider`, `IAIProvider`, `ISignatureProvider`, `IStorage`, `IMaps`, `IEmail`) + factory pattern | 5 |
| **US-S1-026** | Como Backend, quero `R2Storage` (multipart upload, presigned URL, lifecycle) implementando `IStorage` | 8 |
| **US-S1-027** | Como sistema, quero image pipeline (Sharp) gerando variants 320/640/1280/1920 WebP+AVIF no upload | 5 |
| **US-S1-028** | Como Backend+Frontend, quero `MeilisearchSearch` indexando `properties` com mock data; busca facetada (cidade, bairro, tipo, preço, dormitórios) | 8 |
| **US-S1-029** | Como Frontend, quero `MapboxMaps` adapter com geocoding (endereço→lat/lng) e tile config padrão | 3 |
| **US-S1-030** | Como Backend, quero `ResendEmail` adapter + templates Maizzle (welcome, magic link, lead notification, dunning) | 5 |
| **US-S1-031** | Como AI Eng, quero `@dinamic/ai-prompts` com versioning (v1, v2) + guardrails comuns + prompt registry | 3 |
| **US-S1-032** | Como SRE, quero Bull Board montado no admin para visibilidade de jobs em todas as filas | 3 |
| **US-S1-033** | Como DB Eng, quero `pg_dump` automático diário → R2 com retention 30d | 5 |
| | **Total** | **45** |

### DoD específica

- [ ] Upload de foto via apps/api retorna URL R2 + variantes acessíveis
- [ ] Busca Meilisearch com 100 imóveis mock retorna em < 100ms p95
- [ ] Email "welcome" enviado em staging chega no inbox de teste
- [ ] Switch de R2 → S3-local (LocalStack) em dev via env var, sem mudar código
- [ ] Backup pg_dump validado por restore drill

### Entregáveis técnicos

- 7 interfaces em `packages/contracts/src/adapters/`
- 4 adapters implementados (R2, Meili, Mapbox, Resend)
- Image pipeline worker (BullMQ job `image-process`)
- AI prompts registry com 3 templates de exemplo
- Backup script + cron + restore drill documentado

### Dependências

**Recebe de:** Squad 2 S1 (módulos rodando para registrar adapters via DI)

**Entrega para:**
- **Squad 2 S2:** Meilisearch ready (D09); image pipeline pra upload de fotos (D11)
- **Squad 2 S5:** R2 + adapter interfaces para Asaas (D11)
- **Squad 3 S3:** Mapbox + Meili search (D09)

### Cerimônias

**Planning (Segunda sem-5):** validar com Squad 2 quais adapters precisam de mock LocalStack (Asaas sandbox vs prod, OpenRouter mock, etc).

**Daily focus:** sincronizar diariamente com AI Eng da Squad 2 sobre interface `IAIProvider` (vai consumir no Sprint 3).

**Refinement S3 (Qui sem-5):** preview environments — Vercel ok, mas Hostinger preview ainda incerto; pesquisar.

**Refinement S4 (Qui sem-6):** apresentar plano de staging full + LGPD endpoints com PO.

**Review:** demo de upload de imagem com geração de variantes + search Meili com filtros + email recebido.

**Retro:** foco em DX dos adapters (Squad 2 acha fácil trocar implementação?).

### Riscos

| Risco | Mitigação |
|-------|-----------|
| R2 multipart upload falha em arquivo > 50MB | Limitar tamanho + retry com exponential backoff |
| Meili re-index lento com volume real (628 imóveis) | Indexar em batch; medir; tune `searchableAttributes` |
| Sharp não compila no Windows local | Documentar setup + fallback |

### Métricas

- Velocity entregue vs 45 SP
- Latência p95 busca Meili (alvo < 100ms)
- # de adapters implementados / contratos definidos
- Storage usado em R2 ao fim do sprint

---

## Sprint 3 (semanas 7-8) — Quality Gates + Preview Env

### Sprint Goal

> "Todo PR gera ambiente preview navegável; CI bloqueia merge se Lighthouse < 90 ou coverage cai; Playwright tem fixtures prontas para Squad 3 escrever E2E; toda mutação em tabela com PII gera audit log searcheável."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-034** | Como dev, quero Vercel preview environment por PR no apps/web (URL única em comentário no PR) | 5 |
| **US-S1-035** | Como dev, quero preview env por PR no apps/api (Hostinger ephemeral ou container CI) | 8 |
| **US-S1-036** | Como QA, quero Lighthouse CI rodando no preview e bloqueando merge se score < 90 mobile | 5 |
| **US-S1-037** | Como QA, quero Playwright framework configurado com fixtures (user logado, tenant default, seed mock) | 5 |
| **US-S1-038** | Como Security, quero Prisma middleware que loga em `audit_log` todo CREATE/UPDATE/DELETE em tabelas marcadas como PII | 8 |
| **US-S1-039** | Como SRE, quero OpenTelemetry SDK em api+worker; traces de requests fluindo para Better Stack | 5 |
| **US-S1-040** | Como TL, quero coverage report no PR (Vitest + comment no PR) com threshold 70% nos services | 3 |
| **US-S1-041** | Como TL, quero bundle analyzer e bundle size budget (apps/web ≤ 250KB JS first-load) | 3 |
| **US-S1-042** | Como Security, quero Snyk + Gitleaks + npm audit no CI; críticos bloqueiam merge | 3 |
| | **Total** | **45** |

### DoD específica

- [ ] PR de exemplo gera preview URL para web + api em < 5min
- [ ] Lighthouse CI falha PR com regressão proposital
- [ ] Playwright executa 1 teste smoke (login → dashboard) em headless mode no CI
- [ ] OTel: trace de request `GET /properties` aparece com 5+ spans
- [ ] Audit log: alterar `Lead.email` gera entrada com `before`/`after`

### Entregáveis técnicos

- Workflow GitHub Actions: `preview.yml`, `lighthouse.yml`, `security-scan.yml`
- `playwright.config.ts` + `playwright/fixtures/*.ts`
- OTel instrumentation em apps/api + worker
- 1 ADR sobre estratégia de preview env (Vercel vs full stack)

### Dependências

**Entrega para:**
- **Squad 3 S3+:** Playwright fixtures (D07 indireto)
- **Squad 2 S3+:** OTel traces para debugar IA

### Cerimônias

Padrão. Daily inclui sincronia com Squad 3 sobre Lighthouse budgets (eles que vão "sofrer").

**Review:** demo de PR aberto → preview navegável + Lighthouse score visível + audit log de alteração.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Hostinger easypanel não suporta ephemeral envs | Plano B: docker-compose-up em GitHub Actions runner |
| Lighthouse 90 inalcançável em mobile com imagens pesadas | Coordinar com Squad 3 budgets desde S2 |

### Métricas

- Velocity vs 45 SP
- Tempo médio CI total (alvo < 8min com preview)
- # PRs bloqueados por Lighthouse < 90
- # falsos positivos Snyk

---

## Sprint 4 (semanas 9-10) — Staging full + LGPD endpoints + Rate limit

### Sprint Goal

> "Staging está provisionado e idêntico à produção futura; chamadas críticas têm rate limit; secrets gerenciados via Doppler; endpoints `/api/lgpd/export` e `/api/lgpd/delete` rodam end-to-end (base — Backend implementa lógica de negócio)."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-043** | Como SRE, quero staging completo (Hostinger easypanel + Vercel + Postgres + Redis + Meili + R2) deployado e estável | 8 |
| **US-S1-044** | Como Security, quero base infra de `/api/lgpd/export` (job assíncrono → email com link R2) e `/api/lgpd/delete` (job com confirmation token) | 8 |
| **US-S1-045** | Como SRE, quero secrets em Doppler (web, api, worker têm projetos separados), env vars injetadas no deploy | 5 |
| **US-S1-046** | Como Backend, quero rate limit decorator (Upstash Redis sliding window) + presets (10/min auth, 100/min api, 1000/min webhook) | 5 |
| **US-S1-047** | Como Frontend, quero CDN + cache headers corretos em imagens R2 (cache-control immutable) | 3 |
| **US-S1-048** | Como Backend, quero cron orchestration via BullMQ Repeatable Jobs (radar diário 6h, dunning diário 8h, backup 2h) | 3 |
| **US-S1-049** | Como DB Eng, quero PgBouncer entre apps/api e Postgres (pool transaction mode) | 5 |
| **US-S1-050** | Como PO, quero status page pública via Better Stack (status.dinamicimoveis.com.br) | 2 |
| | **Total** | **39** |

### DoD específica

- [ ] Staging tem TLS, custom domain (staging.dinamicimoveis.com.br) e funciona
- [ ] Job de export LGPD gera ZIP com dados de 1 lead de teste em < 2min
- [ ] Rate limit em endpoint de exemplo bloqueia 11ª request em 1min
- [ ] PgBouncer reduz # conexões Postgres em load test simples

### Dependências

**Recebe de:** Squad 2 S2 (módulos LGPD começam aqui).

**Entrega para:**
- **Squad 2+3 S4+:** staging full pra demo IA cliente (D13 começa)

### Cerimônias

Padrão. Daily focus em destravar staging — gargalo do sprint.

**Refinement S5:** decidir DR (single region + read replica? multi-region?) com PO baseado em custo Hostinger.

**Review:** demo de export LGPD ponta-a-ponta no staging + dashboard rate limit no admin.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Hostinger easypanel limita ports/resources em staging | Validar specs no início do sprint; provisionar produção upgrade em paralelo |
| Doppler outage trava deploys | Fallback `.env` files em S3 emergency |

### Métricas

- Velocity vs 39 SP
- # de deploys em staging no sprint (alvo ≥ 10)
- Latência média staging vs dev local (alvo razão ≤ 2x)

---

## Sprint 5 (semanas 11-12) — Produção provisionada + DR

### Sprint Goal

> "Ambiente de produção está provisionado (não recebendo tráfego ainda), DNS + SSL configurados, backups testados via restore drill, plano de DR documentado e ensaiado."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-051** | Provisionar produção Hostinger easypanel (idle, sem tráfego) — Postgres 16, Redis 7, Meili, apps/api, worker | 8 |
| **US-S1-052** | DNS Cloudflare (dinamicimoveis.com.br, app.dinamicimoveis.com.br, admin.*, staging.*, status.*) + SSL Let's Encrypt | 3 |
| **US-S1-053** | Restore drill: pegar backup, restaurar em ambiente isolado, validar dados | 5 |
| **US-S1-054** | DR plan documentado (RTO 4h, RPO 1h) — runbook de recuperação | 5 |
| **US-S1-055** | Logging retention policy (90d hot Better Stack, 1y cold R2) com cron archive | 3 |
| **US-S1-056** | SLOs definidos (uptime 99.5%, latência p95 < 500ms api, p95 < 2s web) + dashboards | 3 |
| **US-S1-057** | Decidir + implementar read replica Postgres (sim/não conforme custo) | 8 |
| **US-S1-058** | Cost monitoring + alerts (> R$ X/mês por serviço) | 3 |
| | **Total** | **38** |

### DoD específica

- [ ] Produção respondendo em HTTPS (mas com health check apenas)
- [ ] Restore drill cronometrado e validado (alvo < 30min)
- [ ] DR plan revisado por TL + Security
- [ ] SLO dashboard ao vivo

### Dependências

**Entrega para:**
- **Todos S6+:** ambiente de produção disponível para validações
- **Squad 1 S7:** base para dry-run do go-live

### Métricas

- Velocity vs 38 SP
- Tempo de restore drill (alvo < 30min)
- Custo mensal projetado vs orçamento

---

## Sprint 6 (semanas 13-14) — Load + Security hardening

### Sprint Goal

> "Plataforma sustenta 10× o load esperado em pico, WAF Cloudflare bloqueia ataques OWASP top 10, DAST scan retorna 0 críticos, alerta routing testado com on-call simulado."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-059** | Load testing k6 (10× peak: 1000 RPS busca, 100 RPS upload) | 8 |
| **US-S1-060** | WAF Cloudflare (managed rules + custom: rate limit IPs, bot mitigation) | 5 |
| **US-S1-061** | DAST scan OWASP ZAP automático no staging semanal | 5 |
| **US-S1-062** | Pen test interno light (checklist OWASP) | 5 |
| **US-S1-063** | Security headers (CSP estrita, HSTS, X-Frame-Options, Permissions-Policy) | 3 |
| **US-S1-064** | Dependabot + auto-merge em patches | 3 |
| **US-S1-065** | Gitleaks no CI (secrets scanning) | 3 |
| **US-S1-066** | Monitoring dashboards RED (rate/errors/duration) + USE (utilization/saturation/errors) | 5 |
| **US-S1-067** | Alert routing Better Stack → Slack + SMS on-call + escalation | 5 |
| | **Total** | **42** |

### Dependências

**Recebe de:** Squad 2 S5 (módulos financeiros pra load testar fluxos completos)

### Métricas

- Throughput máximo sustentado
- # vulnerabilidades High+ encontradas no pen test (alvo 0 no fechamento)
- MTTA simulado (alvo < 5min)

---

## Sprint 7 (semanas 15-16) — Go-live runbook + dry-run

### Sprint Goal

> "Runbook de go-live escrito, dry-run executado em staging com sucesso, 301 redirects das URLs antigas do Flex49 mapeados e testados, equipe Dinamic treinada em DevOps básico."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-068** | Runbook go-live (T-7d a T+7d) com checklist + responsáveis + comandos | 8 |
| **US-S1-069** | 301 redirects Flex49 → novas URLs (de `/{id}/imoveis/...` para `/imovel/{slug}`) — middleware Vercel | 5 |
| **US-S1-070** | DNS switchover plan (TTL baixo 24h antes, plan B rollback < 1h) | 5 |
| **US-S1-071** | Dry-run completo go-live em staging (cronometrado, gravado) | 8 |
| **US-S1-072** | On-call escalation policy + handoff parcial Squad 1 → equipe interna Dinamic | 5 |
| **US-S1-073** | Treinamento DevOps Dinamic (2h: monitoramento, deploy, logs, rollback) | 3 |
| **US-S1-074** | Documentação operacional consolidada (RUNBOOK.md, OPERATIONS.md) | 5 |
| **US-S1-075** | Monitoring playbooks (top 10 alertas: o que fazer quando dispara) | 5 |
| | **Total** | **44** |

### Dependências

**Recebe de:** Squad 2 S7 (scraper Flex49 + migração — pra validar 301 redirects no dry-run).

**Entrega para:** Todos S8 — runbook executável (D15).

### Métricas

- Tempo total do dry-run (alvo < 4h)
- # de itens do runbook com dono atribuído

---

## Sprint 8 (semanas 17-18) — GO-LIVE + Pós-launch

### Sprint Goal

> "🚀 dinamicimoveis.com.br aponta para a nova plataforma sem incidente P1; equipe Dinamic já está rodando o sistema com suporte residual de Squad 1; post-mortem entregue."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S1-076** | Coordenar dry-run final T-3d com todas as squads | 3 |
| **US-S1-077** | Executar DNS switchover T-0 conforme runbook | 5 |
| **US-S1-078** | Hyper-monitoring T+1d a T+7d (alguém Squad 1 acompanhando 12h/dia) | 5 |
| **US-S1-079** | Suporte a incidentes pós-go-live (rollback ready, hotfixes documentados) | 8 |
| **US-S1-080** | Retro pós-launch (todas as squads) + post-mortem documentado | 3 |
| **US-S1-081** | Handoff oficial pra equipe Dinamic com SLA de suporte 30d pós-launch | 5 |
| **US-S1-082** | Arquivamento de ADRs + documentação final + lessons learned | 3 |
| | **Total** | **32** |

### DoD do sprint final

- [ ] 0 incidentes P1 nos primeiros 7 dias
- [ ] ≤ 5 incidentes P2 nos primeiros 7 dias
- [ ] Equipe Dinamic conseguiu fazer 1 deploy de hotfix sem ajuda
- [ ] Post-mortem assinado por TLs + PO

---

## Backlog de Fase 2 (pós-MVP) — Squad 1

Itens que ficam fora do MVP mas já mapeados:

- Multi-região DB com failover automático
- Kubernetes (se escala demandar — não no MVP)
- Service mesh (Istio/Linkerd) — só se microsserviços
- BigQuery / data warehouse para analytics avançado
- SOC 2 compliance prep
- Provisionamento via Terraform completo (hoje parcial Cloudflare apenas)
- A/B testing infra com PostHog feature flags
- CDN edge functions para personalização
- Mobile app SDK (React Native) infra
- WhatsApp Meta Cloud API migration (do Evolution)
- pgvector → Pinecone se RAG escalar

---

**Mantenedor:** Tech Lead Squad 1 + Chief Scrum Master
**Última atualização:** 2026-05-21
