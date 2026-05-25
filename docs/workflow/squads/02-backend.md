# Squad 2 — Backend (API + Worker + Adapters)

> NestJS modular monolith com 14 bounded contexts, worker BullMQ, adapters de integração externa (OpenRouter, Evolution→Meta, Asaas, D4Sign, Mapbox, R2). Camada de domínio + APIs REST + jobs assíncronos.

## Missão & Stack

**Missão:** entregar a API e workers que sustentam todos os fluxos de negócio (imóveis, leads, visitas, propostas, contratos, financeiro, IA conversacional, demanda reprimida). APIs limpas, OpenAPI fielmente gerado, módulos desacoplados, adapters externos isolados.

**Stack principal:**
- **Framework:** NestJS 10 (Express adapter)
- **ORM:** Prisma 5 + PgBouncer
- **Validação:** zod + nestjs-zod + class-validator (legado interno)
- **Queue:** BullMQ + Redis 7
- **Docs:** OpenAPI 3.1 (auto-gerado) + Swagger UI
- **AI:** OpenRouter SDK (pattern espelhado do `evofit/alicia`)
- **Embeddings:** pgvector + text-embedding-3-small (via OpenRouter)
- **WhatsApp:** Evolution API (Sprint 4) → Meta Cloud API (Fase 2)
- **Pagamentos:** Asaas (boleto + PIX)
- **Assinaturas:** D4Sign
- **Search:** Meilisearch SDK
- **Tests:** Vitest + Supertest + Testcontainers
- **Observabilidade:** Sentry SDK Node + Pino + OTel

**Módulos owned (bounded contexts):**
`auth`, `tenants`, `properties`, `leads`, `visits`, `proposals`, `contracts`, `rental`, `financial`, `conversations`, `ai-agent`, `demand-signals`, `notifications`, `lgpd`, `audit`.

## Composição do time (6 devs)

| Papel | Foco |
|-------|------|
| 1× Tech Lead / Backend Architect | Direção, ADRs, contratos OpenAPI, arbitragem cross-module |
| 3× Backend Engineers (NestJS) | Módulos de negócio, CRUD, services, controllers |
| 1× AI/ML Engineer | Módulo `ai-agent`, RAG pgvector, prompts, OpenRouter |
| 1× Integrations Engineer | Adapters (Evolution, Asaas, D4Sign), webhooks, idempotência |

## Visão executiva dos 9 sprints

| Sprint | Sprint Goal | SP | Marco |
|--------|-------------|----|----|
| **S0** | NestJS shell com 14 módulos vazios + OpenAPI generator + Worker BullMQ shell + adapter stubs | 50 | Esqueleto pronto |
| **S1** | Auth + tenants + properties CRUD completo + OpenAPI documentado | 55 | 1º módulo de negócio vivo |
| **S2** | leads + visits + proposals CRUD + busca Meilisearch + image upload | 70 | Pipeline comercial |
| **S3** | conversations + ai-agent (OpenRouter via padrão Alicia) + RAG pgvector + handoff | 75 | IA conversacional |
| **S4** | Evolution WhatsApp + notifications + demand-signals + radar matcher cron | 75 | M3 — demo IA cliente |
| **S5** | contracts + rental + financial + Asaas adapter + dunning worker | 75 | Financeiro funcional |
| **S6** | D4Sign + signature flow + repasse PIX + queries dashboards + relatórios | 70 | Locação ponta-a-ponta |
| **S7** | SEO worker + scraper Flex49 + migração 628 imóveis + LGPD endpoints | 70 | Migração e SEO |
| **S8** | Hardening + perf + correções + suporte go-live | 50 | Estabilização |
| **Total** | | **590 SP** | |

---

## Sprint 0 (semanas 1-2) — NestJS Shell

### Sprint Goal

> "Squad 3 consegue ver Swagger UI em `localhost:3001/docs` listando os 14 módulos (mesmo vazios), cliente OpenAPI TS é gerado e importável em apps/web, worker BullMQ aceita jobs."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-001** | Como TL, quero `apps/api` Nest 10 inicializado com pasta `modules/` e 14 módulos vazios (auth, tenants, properties, leads, visits, proposals, contracts, rental, financial, conversations, ai-agent, demand-signals, notifications, lgpd, audit) | 8 |
| **US-S2-002** | Como Backend, quero `apps/api` consumindo `@dinamic/db` e Prisma client funcional | 3 |
| **US-S2-003** | Como Frontend, quero OpenAPI 3.1 auto-gerado em `/api/openapi.json` via `@nestjs/swagger` | 5 |
| **US-S2-004** | Como Frontend, quero cliente TS tipado gerado via `openapi-typescript` em `packages/api-client` | 5 |
| **US-S2-005** | Como SRE, quero endpoint `/health` validando db+redis+meili | 2 |
| **US-S2-006** | Como TL, quero `apps/worker` BullMQ inicializado com 4 filas vazias (`image-process`, `radar-match`, `dunning`, `seo-gen`) | 5 |
| **US-S2-007** | Como Backend, quero global exception filter + interceptor de logging (Pino) + correlation ID | 5 |
| **US-S2-008** | Como Backend, quero stub adapters (`InMemoryPaymentGateway`, `InMemoryMessagingProvider`, `InMemoryAIProvider`, `InMemorySignatureProvider`) implementando interfaces de `@dinamic/contracts` | 8 |
| **US-S2-009** | Como Backend, quero global ValidationPipe usando zod (nestjs-zod) | 3 |
| **US-S2-010** | Como TL, quero ADR-003 (estrutura de módulos, event bus interno EventEmitter2 vs CQRS) | 3 |
| **US-S2-011** | Como TL, quero README de cada módulo (template) explicando responsabilidade, eventos, dependências | 3 |
| | **Total** | **50** |

### Definition of Done específica

- [ ] DoD global
- [ ] `pnpm dev` sobe api em < 30s
- [ ] Swagger UI navegável; todos os 14 módulos aparecem (mesmo com 0 endpoints)
- [ ] Cliente TS gerado consumido em apps/web com `import { paths } from '@dinamic/api-client'`
- [ ] Worker recebe um job de teste e processa
- [ ] Stubs adapters retornam dados fake mas válidos

### Entregáveis técnicos

- `apps/api/src/main.ts` + `app.module.ts`
- 14 pastas `apps/api/src/modules/<nome>/` com `module.ts` + `README.md`
- `packages/api-client/` (gerado via script `pnpm gen:api`)
- `apps/worker/src/main.ts` + 4 queues
- 4 stub adapters em `apps/api/src/adapters/`
- ADR-003

### Dependências

**Recebe de:**
- **Squad 1 S0:** monorepo + Prisma + docker-compose (D01, D03, D04)

**Entrega para:**
- **Squad 1 S1:** apps/api rodando para plugar auth guards
- **Squad 3 S0:** OpenAPI gerador + cliente TS (D06)

### Cerimônias

**Planning (Seg sem-1):** dependente da Squad 1 estar adiantada. Pode haver "dependência travada" — se Squad 1 atrasar S0, Squad 2 escreve módulos com schema Prisma local + faz refactor.

**Daily focus:** sincronizar diariamente com Squad 1 (Database Engineer) sobre Prisma schema final.

**Refinement S1 (Qui sem-1):** validar com Squad 3 quais endpoints de `properties` eles precisam exatamente.

**Refinement S2 (Qui sem-2):** validar `leads`+`visits` com Squad 3 (CRM Kanban precisa de quais campos?).

**Review (Sex sem-2):** demo Swagger + cliente TS importado no apps/web + worker processando job.

**Retro:** pergunta-chave: "a estrutura modular vai escalar pra 14 módulos sem virar spaghetti?"

### Riscos do sprint

| Risco | Mitigação |
|-------|-----------|
| Prisma schema da Squad 1 atrasa, trava S0 | Plano B: schema local em apps/api, refactor depois |
| OpenAPI generator tem bugs com zod | Fallback class-validator nos pontos quebrados |
| Estrutura modular fica acoplada (módulos importam internals) | Code review estrito + linter rule custom |

### Métricas

- Velocity vs 50 SP
- # endpoints expostos no Swagger (alvo: ≥ 0 — sprint é só shell)
- Tempo `pnpm dev` apps/api

---

## Sprint 1 (semanas 3-4) — Auth + Tenants + Properties

### Sprint Goal

> "Login com email+senha funciona end-to-end (NextAuth ↔ NestJS via JWT), endpoints `properties` (CRUD + busca paginada) estão expostos e documentados em OpenAPI, Squad 3 consegue criar/listar imóveis a partir do admin."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-012** | Como sistema, quero módulo `auth` consumindo as guards da Squad 1 (JWT validation, role-based) | 5 |
| **US-S2-013** | Como sistema, quero módulo `tenants` (CRUD config tenant, settings, branding) | 5 |
| **US-S2-014** | Como admin, quero `POST /properties` validando 30+ campos via zod (endereço, financeiro, características, fotos, status) | 5 |
| **US-S2-015** | Como admin, quero `GET /properties?filters=...&page=...&sort=...` com filtros (tipo, finalidade, cidade, bairro, faixa preço, dormitórios, vagas) | 8 |
| **US-S2-016** | Como admin, quero `PATCH /properties/:id` com versionamento (audit log automático) | 3 |
| **US-S2-017** | Como admin, quero `DELETE /properties/:id` (soft delete + restore endpoint) | 3 |
| **US-S2-018** | Como admin, quero `POST /properties/:id/photos` (multipart → R2 via adapter) com geração de variantes pelo worker | 5 |
| **US-S2-019** | Como admin, quero gerenciar `Owner`, `Neighborhood`, `PropertyFeature` (CRUD endpoints) | 5 |
| **US-S2-020** | Como público, quero `GET /public/properties/:slug` (ficha pública, sem auth, com cache 5min) | 3 |
| **US-S2-021** | Como Backend, quero event bus interno emitindo `PropertyCreated`, `PropertyUpdated`, `PhotoUploaded` (EventEmitter2) | 5 |
| **US-S2-022** | Como QA, quero testes integration de properties (Testcontainer Postgres + Prisma migrate + 20 cenários) | 8 |
| | **Total** | **55** |

### DoD específica

- [ ] CRUD completo `properties` documentado e testado (≥ 70% coverage no service)
- [ ] Endpoint protegido por role (admin+manager podem criar; broker pode editar próprias; viewer só lê)
- [ ] Tenant isolation: tenant A não vê propriedades de tenant B (teste explícito)
- [ ] Upload de 5 fotos gera 20 variants (4 tamanhos × 2 formatos × processamento parcial worker)
- [ ] Event `PropertyCreated` capturado por listener fake (preparação pra módulos que vão consumir)

### Dependências

**Recebe de:** Squad 1 S1 (auth guards + tenant middleware + audit) (D05)

**Entrega para:**
- **Squad 3 S2:** endpoints properties listáveis no admin (D07 setup)
- **Squad 3 S3:** endpoints `GET /public/properties` para listagem pública (D07)

### Cerimônias

**Planning:** definir shape final de `Property` (revisar com Squad 3 a partir do mock).

**Daily:** dailyhandoff com Squad 1 (audit log middleware tem que estar pronto até dia 5 da sprint).

**Refinement S2 (Qui sem-3):** validar com Squad 3 endpoints `leads` + `visits`.

**Refinement S3 (Qui sem-4):** apresentar plano de `ai-agent` à PO + Squad 3 (UX do chat).

**Review:** demo do CRUD properties via Swagger + ficha pública renderizada pelo Squad 3.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Shape de Property muda (campos faltando) atrasando Squad 3 | Reunião dia 3 com Squad 3 para validar shape ANTES de escrever endpoints |
| Photo upload R2 lento em conexão pobre | Multipart + progress callback + retry |
| Testes integration com Testcontainer lentos no CI | Paralelizar; uso de `--shard` |

### Métricas

- Velocity vs 55 SP
- # endpoints completos (alvo: ~ 12)
- Coverage do módulo properties (alvo ≥ 70%)
- Latência p95 `GET /properties` com 100 imóveis (alvo < 200ms)

---

## Sprint 2 (semanas 5-6) — Leads + Visits + Proposals + Search

### Sprint Goal

> "Pipeline comercial básico funcional: criar lead, agendar visita, registrar proposta. Busca de imóvel via Meilisearch retorna em < 100ms. Squad 3 consegue popular Kanban de leads em real-time."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-023** | `leads` CRUD completo + `LeadProfile` (preferências: bairros, faixa preço, dormitórios, finalidade) | 8 |
| **US-S2-024** | `leads`: state machine de funil (novo → contatado → qualificado → visita_agendada → proposta → ganho/perdido) | 8 |
| **US-S2-025** | Round-robin assignment por setor (vendas/locação/captação) — rule engine simples | 5 |
| **US-S2-026** | `visits` CRUD com integração à agenda interna do corretor (mas agenda em si é Frontend) | 5 |
| **US-S2-027** | `proposals` CRUD + estado (rascunho/enviada/aceita/rejeitada/expirada) | 5 |
| **US-S2-028** | Busca Meilisearch sync com `Property` (post-save hook → reindex + remove on delete) | 8 |
| **US-S2-029** | Endpoint `GET /search?q=...&filters=...&facets=...` retornando facets (cidade, bairro, tipo, faixa) | 5 |
| **US-S2-030** | Endpoint `GET /leads/:id/timeline` agregando: visits, proposals, conversations, audit events | 8 |
| **US-S2-031** | Webhook handler genérico em `apps/api/src/webhooks/` (assinatura HMAC + idempotency key) | 5 |
| **US-S2-032** | Testes integration leads/visits/proposals com fixtures realistas | 8 |
| **US-S2-033** | Event bus: `LeadCreated`, `LeadAssigned`, `VisitScheduled`, `ProposalSent` | 5 |
| | **Total** | **70** |

### DoD específica

- [ ] State machine `LeadStatus` testada com 12 transições válidas + 5 inválidas
- [ ] Round-robin distribui 30 leads entre 5 corretores ~ 6 cada (±1)
- [ ] Busca Meili retorna 10 imóveis filtrados em < 100ms p95
- [ ] Timeline de lead agrega ≥ 4 tipos de evento

### Dependências

**Recebe de:** Squad 1 S2 (Meilisearch wrapper + image pipeline) (D09, D11)

**Entrega para:**
- **Squad 3 S3:** busca + filtros + facets (D09)
- **Squad 3 S4:** CRM Kanban + timeline (D08)

### Cerimônias

**Refinement S3 (Qui sem-5):** apresentar plano detalhado `ai-agent` + RAG ao time (revisão técnica com AI Eng).

**Refinement S4 (Qui sem-6):** validar plano Evolution WhatsApp com Squad 1 (webhooks recebem por onde?).

**Review:** demo CRUD leads + busca filtrada com facets + timeline de lead.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| State machine fica simples demais ou complexa demais | Validar com PO ANTES de codar |
| Round-robin não considera carga atual do corretor | Sprint 2 = ingênuo; Sprint 4 refina com carga |
| Meili reindex lento no save | Index async via BullMQ (não bloqueia request) |

### Métricas

- Velocity vs 70 SP
- # endpoints (alvo: ~ 18 novos)
- Latência p95 busca Meili
- # eventos no event bus

---

## Sprint 3 (semanas 7-8) — IA Conversacional

### Sprint Goal

> "Agente IA responde no chat web qualificando lead, consulta base de imóveis via RAG (pgvector), respeita guardrails, gera handoff payload completo. OpenRouter integrado seguindo o pattern do `evofit/alicia`."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-034** | Módulo `conversations` (origem-agnóstica: chat web, WhatsApp, etc) + state machine | 8 |
| **US-S2-035** | Adapter `OpenRouterAIProvider` implementando `IAIProvider` (streaming, tool use, fallback chain) — clonar pattern Alicia | 8 |
| **US-S2-036** | Embeddings pipeline: indexar properties (descrição, bairro, features) em pgvector via worker job `embeddings-sync` | 8 |
| **US-S2-037** | RAG query function: dado pergunta do usuário, busca top-K propriedades relevantes (similarity search) | 5 |
| **US-S2-038** | Conversational state machine: greeting → discovery → suggestion → handoff/scheduling | 8 |
| **US-S2-039** | Guardrails: não inventar disponibilidade, não confirmar visita sem agenda, não compartilhar dados de outros clientes (system prompt + tool use validation) | 5 |
| **US-S2-040** | Endpoint `POST /chat/messages` (streaming SSE) | 5 |
| **US-S2-041** | Handoff payload generator: nome, telefone, intenção, imóveis vistos, resumo, urgência, sugestão abordagem | 5 |
| **US-S2-042** | `Lead` + `LeadProfile` auto-criados a partir da conversa | 5 |
| **US-S2-043** | Cost tracking: log de tokens IN/OUT por conversa + custo R$ | 3 |
| **US-S2-044** | Prompt registry + versioning + A/B test simples (`@dinamic/ai-prompts`) | 5 |
| **US-S2-045** | Testes: 20 cenários de conversa (golden conversations) replicando bem | 8 |
| | **Total** | **73** |

### DoD específica

- [ ] Chat respondendo end-to-end em staging com OpenRouter real
- [ ] RAG retorna top-5 imóveis relevantes em < 500ms
- [ ] Custo médio por conversa < R$ 0,50 (medido com 50 conversas mock)
- [ ] Guardrails: testar 5 prompts adversariais (jailbreak, vazamento), nenhum passa
- [ ] Handoff payload gera Lead + LeadProfile com dados consistentes

### Dependências

**Recebe de:**
- **Squad 1 S2:** `IAIProvider` interface + `@dinamic/ai-prompts` (D11)
- **Reference:** projeto `evofit/alicia` (estrutura OpenRouter espelhada)

**Entrega para:**
- **Squad 3 S4:** endpoint `POST /chat/messages` streaming (D10)
- **Squad 2 S4:** chat funcional para integrar Evolution WhatsApp

### Cerimônias

**Planning:** AI Eng apresenta arquitetura RAG + state machine. TL + PO validam.

**Daily:** AI Eng faz daily-extra com Squad 3 sobre UX do chat (Squad 3 vai consumir).

**Refinement S4 (Qui sem-7):** validar plano WhatsApp Evolution + radar matcher.

**Refinement S5 (Qui sem-8):** plano contracts + Asaas com Integrations Eng.

**Review:** demo do chat ao vivo respondendo perguntas reais ("quero alugar apartamento de 3 dormitórios no Centro até R$ 2500") + handoff aparecendo no admin.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| OpenRouter rate limit ou downtime | Adapter com fallback chain (Sonnet primário, GPT-4 fallback) |
| RAG retrieves resultados irrelevantes | Curating do prompt + reranking simples |
| Custo por conversa explode | Limite de tokens por mensagem + truncamento de histórico |
| Pattern do Alicia tem dívida técnica que herdamos | Code review crítico, refator antes de copiar cego |

### Métricas

- Velocity vs 73 SP
- Custo médio por conversa (alvo ≤ R$ 0,50)
- Latência p95 streaming primeiro token (alvo ≤ 2s)
- Taxa de handoff "esperada" em testes (alvo 20-30%)

---

## Sprint 4 (semanas 9-10) — WhatsApp Evolution + Notifications + Radar

### Sprint Goal

> "WhatsApp Evolution recebe e envia mensagens passando pelo mesmo backend do chat web; notifications module entrega emails+push; demand-signals captura buscas sem resultado; radar matcher cron diário detecta novos imóveis matching `LeadProfile` ativos."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-046** | Adapter `EvolutionMessagingProvider` implementando `IMessagingProvider` (send text, send image, receive webhook) | 8 |
| **US-S2-047** | Webhook handler Evolution: HMAC validation + idempotency + dispatch to `conversations` module | 5 |
| **US-S2-048** | Unificação chat: mesma engine `ai-agent` responde web e WhatsApp (origem-agnóstica) | 5 |
| **US-S2-049** | Módulo `notifications` (email + push web + WhatsApp out) com adapter abstraction | 8 |
| **US-S2-050** | Templates de mensagem versionados (Maizzle email + WhatsApp text) | 5 |
| **US-S2-051** | Módulo `demand-signals`: captura busca sem resultado, lead frustrado, requests com filters incomum | 5 |
| **US-S2-052** | Endpoint `GET /demand-signals?groupBy=neighborhood&period=30d` para heatmap | 3 |
| **US-S2-053** | Worker job `radar-match` (cron diário 6h): para cada `LeadProfile.ativo=true`, busca novos imóveis (created last 24h) matching critérios → enfileira notification | 8 |
| **US-S2-054** | Cooldown + dedup: não enviar radar match 2× pro mesmo lead+imóvel em 30d | 3 |
| **US-S2-055** | Multi-atendente: corretor "assume" conversa, IA para de responder, hand-back configurável | 5 |
| **US-S2-056** | Lead enrichment automático: cruzar telefone com `Owner`, marcar duplicatas | 3 |
| **US-S2-057** | Dashboards de IA: tokens consumidos por dia, custo, taxa de handoff, tópicos top | 5 |
| **US-S2-058** | Testes E2E "chat web → handoff humano → continua WhatsApp" | 8 |
| | **Total** | **74** |

### DoD específica

- [ ] Mensagem enviada via WhatsApp Evolution para # de teste recebe resposta da IA
- [ ] `radar-match` rodando dia D, com 5 novos imóveis e 10 `LeadProfile` ativos, gera N notifications corretas
- [ ] Corretor consegue "assumir" conversa via endpoint `POST /conversations/:id/takeover`
- [ ] Demand signals: 3 buscas frustradas registradas e visíveis no heatmap

### Dependências

**Recebe de:** Squad 1 S4 (staging full pra mostrar pro cliente — M3 demo IA cliente)

**Entrega para:**
- **Squad 3 S4:** chat real integrado (D10)
- **PO:** demo IA cliente (M3)

### Cerimônias

**Planning:** Integrations Eng apresenta capacidades do Evolution + gaps (vs Meta Cloud).

**Refinement S5 (Qui sem-9):** plano `contracts` + `rental` + Asaas.

**Refinement S6 (Qui sem-10):** D4Sign + repasse PIX.

**Review (cliente convidado):** demo end-to-end "lead chega via WhatsApp, IA qualifica, corretor assume". M3 atingido.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Evolution instável ou recursos limitados | Documentar gaps; ter mock provider pro CI |
| WhatsApp # bloqueado por uso pesado | Usar # de teste; produção com WABA Meta no futuro |
| Radar matcher gera spam | Cooldown 30d + opt-in obrigatório (LGPD) |

### Métricas

- Velocity vs 74 SP
- # mensagens trocadas WhatsApp em testes
- Cooldown working (0 duplicatas em 100 testes)

---

## Sprint 5 (semanas 11-12) — Contratos + Financeiro + Asaas

### Sprint Goal

> "Contrato de locação digital pode ser criado via wizard (gera versão draft), Asaas adapter (stub→real sandbox) gera boleto recorrente, dunning worker agenda lembretes D+1/D+5/D+15."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-059** | Módulo `contracts` (base venda + locação) + versionamento | 8 |
| **US-S2-060** | Módulo `rental` (especialização: período, reajuste IGPM/IPCA, garantia, taxas) | 8 |
| **US-S2-061** | Wizard de contrato locação: gera PDF preview (puppeteer/jsPDF) | 8 |
| **US-S2-062** | Módulo `financial` (Boleto, Repasse, Inadimplencia, ReceiptVoucher) | 8 |
| **US-S2-063** | Adapter `AsaasPaymentGateway` (real sandbox) implementando `IPaymentGateway` — create customer, charge, webhook | 8 |
| **US-S2-064** | Webhook Asaas: HMAC + idempotency + update `Boleto.status` | 5 |
| **US-S2-065** | Worker `dunning`: D+1 (lembrete amigável), D+5 (segundo aviso), D+15 (formal) — agendado por `Boleto` ativo | 8 |
| **US-S2-066** | Endpoint `POST /contracts/:id/generate-charges` (gera N boletos recorrentes pro contrato) | 5 |
| **US-S2-067** | Estado `Boleto`: criado → enviado → pago / vencido / cancelado | 3 |
| **US-S2-068** | Idempotency em `POST /charges` (Idempotency-Key header) | 3 |
| **US-S2-069** | Testes integration Asaas sandbox (criar customer, gerar boleto, simular pagamento) | 8 |
| | **Total** | **72** |

### DoD específica

- [ ] Contrato draft gerado para 1 imóvel + 1 inquilino + 1 proprietário
- [ ] 12 boletos mensais criados no Asaas sandbox
- [ ] Webhook recebido + status atualizado
- [ ] Dunning roda em modo dry-run, agenda corretamente 3 disparos por boleto vencido

### Dependências

**Recebe de:** Squad 1 S2 (`IPaymentGateway` interface + R2 para PDFs) (D11)

**Entrega para:** Squad 3 S6 (contratos + boletos + repasses UI)

### Métricas

- Velocity vs 72 SP
- # boletos criados em sandbox
- Latência criação contrato (alvo < 2s incluindo PDF)

---

## Sprint 6 (semanas 13-14) — D4Sign + Repasse + Dashboards

### Sprint Goal

> "Contrato é assinado digitalmente via D4Sign (link enviado a inquilino+proprietário+fiador), repasse PIX automático ao proprietário quando boleto for pago, dashboards financeiros têm queries otimizadas."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-070** | Adapter `D4SignSignatureProvider` implementando `ISignatureProvider` (upload doc, create envelope, send) | 8 |
| **US-S2-071** | Webhook D4Sign: HMAC + idempotency + atualizar `Contract.signatureStatus` | 5 |
| **US-S2-072** | Worker `repasse-pix`: dado pagamento confirmado, calcular repasse (aluguel - taxa admin - IPTU - taxas), criar PIX no Asaas | 8 |
| **US-S2-073** | Extrato PDF mensal do proprietário (rendimentos, taxas, líquido, próximos vencimentos) | 5 |
| **US-S2-074** | Endpoints relatórios financeiros (`/reports/inadimplencia`, `/reports/recebido-vs-previsto`, `/reports/ocupacao`, `/reports/contratos-vencendo`) | 8 |
| **US-S2-075** | Aggregation queries otimizadas (índices Postgres composite, materialized views para dashboards pesados) | 8 |
| **US-S2-076** | Endpoints visitas/funil/atribuição para dashboards Squad 3 | 5 |
| **US-S2-077** | Soft-delete + restore endpoints em todos os 14 módulos (uniforme) | 5 |
| **US-S2-078** | Module `audit`: query API para auditoria (quem mudou o que quando) | 5 |
| **US-S2-079** | Testes E2E "contrato → assinatura D4Sign → primeiro boleto → pagamento → repasse PIX" | 8 |
| | **Total** | **65** |

### Dependências

**Entrega para:** Squad 3 S6 (financeiro UI completo) (D12)

### Métricas

- Velocity vs 65 SP
- E2E completo executando em ambiente teste em < 5min

---

## Sprint 7 (semanas 15-16) — Scraper Flex49 + SEO + LGPD endpoints

### Sprint Goal

> "Scraper Flex49 migra 628 imóveis para staging (dedupe + image rehosting em R2), worker SEO-pages gera 50+ páginas por bairro/intenção, endpoints LGPD funcionais (export ZIP + delete cascata)."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-080** | Worker `scrape-flex49`: crawler (Playwright) + parser + dedup + image rehost em R2 | 13 |
| **US-S2-081** | Reconciliação: marcar imóvel como `migratedFromFlex49: true` + `originalId` | 3 |
| **US-S2-082** | Worker `seo-page-generator`: para cada combo bairro × intenção (comprar/alugar) × tipo, gera conteúdo único + lista filtrada + FAQ | 13 |
| **US-S2-083** | Endpoints `GET /seo-pages?slug=...` retornando conteúdo pronto pro SSG do Frontend | 5 |
| **US-S2-084** | Módulo `lgpd`: implementar lógica `/api/lgpd/export` (gera ZIP com todos dados PII de um usuário) | 5 |
| **US-S2-085** | Módulo `lgpd`: lógica `/api/lgpd/delete` (cascade delete + anonimização de logs) | 5 |
| **US-S2-086** | Módulo `lgpd`: endpoint para revogar consentimento de radar (mantém histórico, para alertas futuros) | 3 |
| **US-S2-087** | Auditoria de PII acesso: query "quem viu o telefone do Lead X no último mês?" | 3 |
| **US-S2-088** | Rate limit + auth especial em endpoints LGPD (só dono + admin) | 3 |
| **US-S2-089** | Testes E2E migração: rodar scraper em staging, validar 628 imóveis chegaram | 5 |
| **US-S2-090** | Cleanup de mock seed em staging (substituir por dados reais) | 5 |
| | **Total** | **63** |

### Dependências

**Recebe de:** Squad 1 S4 (endpoints LGPD infra base) (D03)

**Entrega para:**
- **Squad 1 S7:** dados reais em staging pra validar 301 redirects (D14)
- **Squad 3 S7:** endpoint `/seo-pages` pra renderizar (D14)

### Métricas

- # imóveis migrados (alvo 628)
- # SEO pages geradas (alvo ≥ 50)
- Tempo total scraper end-to-end

---

## Sprint 8 (semanas 17-18) — Hardening + Suporte Go-live

### Sprint Goal

> "Backend estabilizado pra go-live: queries lentas otimizadas, bugs P1+P2 zerados, suporte ativo durante DNS switchover e primeira semana."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S2-091** | Performance audit: identificar queries N+1, índices faltando, hot paths | 8 |
| **US-S2-092** | Bugs P1 (zerar) | 8 |
| **US-S2-093** | Bugs P2 (≤ 5 abertos no go-live) | 8 |
| **US-S2-094** | Migração final em prod (cutover) | 5 |
| **US-S2-095** | Suporte ao DNS switchover (Squad 1 driver) | 3 |
| **US-S2-096** | Hyper-monitoring T+1d a T+7d | 5 |
| **US-S2-097** | Hotfix branch ready + deploy pipeline acelerado | 3 |
| **US-S2-098** | Documentação API final + Postman collection | 5 |
| **US-S2-099** | Retro + post-mortem Backend | 3 |
| | **Total** | **48** |

---

## Backlog de Fase 2 (pós-MVP) — Squad 2

- WhatsApp Meta Cloud API migration (templates HSM + WABA)
- Pagar.me como alternativa Asaas
- Análise preditiva de inadimplência (ML)
- Tour virtual 3D integrado
- Recomendação personalizada (ML embedding similarity)
- API pública para integrações (parceiros, sites de listing)
- Multi-idioma (i18n nas mensagens IA)
- CRM avançado: campanhas drip, segmentação, score lead
- Integração contábil (exportar para Conta Azul/Omie)
- Microsserviços extraction quando módulos atingirem threshold (ai-agent, financial)

---

**Mantenedor:** Tech Lead Squad 2 + Chief Scrum Master
**Última atualização:** 2026-05-21
