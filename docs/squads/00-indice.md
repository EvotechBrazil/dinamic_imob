# Plano de Implantação Dinamic Imobiliária — Índice Master

> Visão geral, cronograma master, matriz de dependências e ritual Scrum compartilhado entre as 3 squads do projeto Dinamic.

## 1. Propósito deste plano

Este documento orquestra a entrega da plataforma Dinamic Imobiliária do **Sprint 0 ao Go-live**, dividida em **3 squads paralelas** com 6 devs cada (18 devs total), sprints de **2 semanas** no padrão Scrum, com cerimônias detalhadas e Definition of Done (DoD) explícita por sprint.

**Foco da 1ª entrega (Sprint 1 do Frontend):** demo "wow visual" — landing pública híbrida (buscador + IA) + dashboards admin populados com mock realista. Backend integrado e adapters reais (OpenRouter, Evolution, Asaas, D4Sign) entram a partir do Sprint 3.

**Fonte da verdade técnica:**
- `CLAUDE.md` (raiz) — decisões fechadas e ajustes 2026-05-21
- `docs/dinamic_web.md` — proposta estratégica completa (27 seções, 20 módulos IA)
- `C:\Users\Tiago\.claude\plans\vamos-iniciar-um-novo-virtual-lobster.md` — plano aprovado original

## 2. As 3 squads

| # | Squad | Missão | Stack principal | Output principal |
|---|-------|--------|-----------------|------------------|
| 1 | **Estrutura (Plataforma & Plat-Eng)** | Fundação técnica, infra, DevOps, packages compartilhados, observabilidade, segurança, LGPD base | Turborepo, pnpm, Docker, Hostinger easypanel, Vercel, Postgres, Redis, Meilisearch, GitHub Actions, Sentry, Better Stack, PostHog | Monorepo funcional + ambientes (dev/staging/prod) + plataforma confiável |
| 2 | **Backend** | NestJS modular monolith + Worker BullMQ + Adapters (OpenRouter, Evolution/Meta, Asaas, D4Sign, Mapbox, R2) + APIs REST/OpenAPI | NestJS 10, Prisma 5, BullMQ, zod, OpenAPI, pgvector | `apps/api` + `apps/worker` com 14 módulos de negócio |
| 3 | **Frontend** | Next.js 14 — Landing pública + Admin com dashboards Tremor + CRUD Generator + Chat widget IA + PWA mobile-first | Next.js 14 App Router, Tailwind v4, shadcn/ui, Origin UI, Tremor, TanStack Table v8, react-hook-form, zod, Mapbox GL, next-pwa | `apps/web` com landing + admin + PWA |

Detalhes operacionais de cada squad em `01-estrutura.md`, `02-backend.md`, `03-frontend.md`.

## 3. Cronograma master

**9 sprints (Sprint 0 + Sprints 1-8) × 2 semanas = 18 semanas (~4,5 meses).**

| Sprint | Semanas | Marco | Squad 1 (Estrutura) | Squad 2 (Backend) | Squad 3 (Frontend) |
|--------|---------|-------|---------------------|-------------------|---------------------|
| **S0** | 1-2 | Fundação | Monorepo + Prisma schema + seed mock + design tokens + CI/CD básico + docker-compose | NestJS shell + módulos vazios + OpenAPI generator + Worker BullMQ shell | apps/web shell + Tailwind + tokens import + Storybook + componentes base |
| **S1** | 3-4 | **🎯 DEMO WOW (interna)** | Auth (NextAuth+JWT+roles) + tenant middleware + feature flags + Sentry/PostHog + LGPD base | Módulos auth + tenants + properties (CRUD completo + OpenAPI) | **Landing pública v1 com mock** (hero buscador + CTA IA + 6 seções) |
| **S2** | 5-6 | API + Admin | Adapter interfaces base + R2 + Meilisearch + Mapbox + email | Módulos leads + visits + proposals + busca Meilisearch | Admin shell + 3 dashboards Tremor + CRUD Generator |
| **S3** | 7-8 | IA conversacional | Preview env/PR + Lighthouse CI + Playwright framework + audit log infra | conversations + ai-agent (OpenRouter via pattern Alicia) + RAG pgvector + handoff | Listagem imóveis pública + ficha pública + chat widget UI mockado |
| **S4** | 9-10 | **🎯 DEMO IA (cliente)** | LGPD endpoints (export/delete) infra + rate limit + secrets + staging full | notifications + WhatsApp Evolution + demand-signals + radar matcher cron | Chat integrado + handoff visual + CRM (Kanban funil + ficha lead + timeline) |
| **S5** | 11-12 | Financeiro | Hostinger easypanel prod + DNS + SSL + backups + DR plan | contracts + rental + financial + Asaas adapter (stub→real) + dunning | Cadastros auxiliares CRUD + ficha imóvel admin multi-aba |
| **S6** | 13-14 | Locação ponta a ponta | Load testing + security hardening + WAF + DAST + monitoring SLO | D4Sign adapter + signature flow + repasse PIX + queries financeiras | Financeiro UI completo + dashboards financeiros + agenda interna corretor |
| **S7** | 15-16 | Migração + SEO | Go-live runbook + on-call + DNS switchover + 301 redirects | SEO pages worker + LGPD endpoints + scraper Flex49 + migração 628 imóveis | Demanda reprimida + radar UI + páginas SEO + PWA install + push |
| **S8** | 17-18 | **🚀 GO-LIVE** | Polimento devops + handoff + treinamento + post-mortem | Hardening + perf + migração final + suporte go-live | Polimento UX + a11y WCAG AA + perf budget + LGPD UI + Playwright E2E |

## 4. Matriz de dependências entre squads

> Setas indicam: **fornecedor → consumidor**. Cada bloqueio listado tem que ser entregue **até o final do sprint do fornecedor** para o consumidor poder começar o sprint dependente.

### Dependências críticas (caminho crítico)

| # | Item | Fornecedor | Consumidor | Risco se atrasar |
|---|------|------------|------------|------------------|
| D01 | Monorepo + workspaces funcionando | S1 S0 | S2 S0 + S3 S0 | Backend e Frontend não podem nem começar |
| D02 | Design tokens (paleta indigo + tipografia) | S1 S0 | S3 S0 | Frontend faz placeholder, refator depois |
| D03 | Prisma schema núcleo + seed mock | S1 S0 | S2 S1 + S3 S2 | Backend bloqueia properties CRUD; Frontend faz mock no client |
| D04 | docker-compose dev (Postgres+Redis+Meili) | S1 S0 | S2 S0 + S2 S2 | Backend não roda local |
| D05 | Auth + tenant middleware (NextAuth+JWT+roles) | S1 S1 | S2 S1 (`properties`) + S3 S2 (admin) | Sem login, admin é só visual |
| D06 | OpenAPI generator + cliente TS gerado | S2 S0 | S3 S2 em diante | Frontend consome via tipos; sem gerador, manual hand-typing |
| D07 | Endpoints `GET /properties` + `GET /properties/:slug` | S2 S1 | S3 S3 (listagem + ficha pública) | Frontend continua com mock |
| D08 | Endpoints `GET/POST /leads` + `GET /visits` | S2 S2 | S3 S4 (CRM Kanban + ficha lead) | CRM mostra mock; pipeline parado |
| D09 | Meilisearch index `properties` populado | S1 S2 + S2 S2 | S3 S3 (busca + filtros) | Busca degrada para SQL `LIKE` (lenta) |
| D10 | Endpoints `ai-agent` (chat + handoff) | S2 S3 | S3 S4 (chat integrado) | Chat fica como mock UX-only |
| D11 | Adapter interfaces base (`IPaymentGateway` etc) + R2 | S1 S2 | S2 S5 (Asaas) + S2 S6 (D4Sign) | Backend não consegue isolar contratos |
| D12 | Endpoints `contracts`, `boletos`, `repasses` | S2 S5 + S2 S6 | S3 S6 (Financeiro UI) | Telas financeiras viram mock |
| D13 | Staging full + DNS + SSL | S1 S5 | Todos S5+ | Sem ambiente de homologação |
| D14 | Scraper Flex49 + migração 628 imóveis | S2 S7 | S3 S7 (SEO pages) + Go-live | Listagem em prod fica com mock |
| D15 | Go-live runbook + 301 redirects + DNS switchover | S1 S7 | Todos S8 | Sem checklist, go-live é improviso |

### Visualização do caminho crítico

```
S0  S1   S2     S3        S4         S5       S6      S7        S8
[S1] → [S1] →  [S1]  →   [S1]   →   [S1] →   [S1] → [S1]   →  [S1]   ← infra/devops
  ↓     ↓       ↓         ↓          ↓        ↓      ↓         ↓
[S2] → [S2] →  [S2]  →   [S2]   →   [S2] →   [S2] → [S2]   →  [S2]   ← backend
  ↓     ↓       ↓         ↓          ↓        ↓      ↓         ↓
[S3] → [S3] →  [S3]  →   [S3]   →   [S3] →   [S3] → [S3]   →  [S3]   ← frontend
       🎯 demo wow   🎯 demo IA cliente            🚀 GO-LIVE
```

## 5. Ritual Scrum compartilhado

Todas as 3 squads seguem o mesmo ritual. Cerimônias específicas por sprint vão detalhadas em cada `0X-*.md`, mas a estrutura abaixo é o padrão.

### 5.1. Cerimônias (por sprint de 2 semanas)

| Cerimônia | Quando | Duração | Participantes | Objetivo |
|-----------|--------|---------|---------------|----------|
| **Sprint Planning** | Segunda da semana 1 | 4h | Squad + PO + SM | Definir Sprint Goal, selecionar backlog, estimar SP, alinhar DoD |
| **Daily Standup** | Toda manhã 9h | 15min | Squad + SM | O que fiz / o que vou fazer / impedimentos. Async no Slack se assíncrono. |
| **Backlog Refinement** | Quinta semana 1 + Quinta semana 2 | 1h30 cada | Squad + PO | Refinar próximos 1-2 sprints, quebrar épicos, estimar |
| **Sprint Review (Demo)** | Sexta semana 2 — 14h | 2h | Squad + PO + stakeholders + outras squads | Demonstrar incremento, coletar feedback, atualizar product backlog |
| **Sprint Retrospective** | Sexta semana 2 — 16h | 1h30 | Squad + SM | Continuar / parar / começar. Ações no board com dono. |
| **Sync entre Squads (Scrum of Scrums)** | Quarta semana 1 e quarta semana 2 — 11h | 30min | 1 representante por squad + Chief SM | Riscos cross-squad, dependências, desbloqueios |

### 5.2. Definition of Ready (DoR) — antes de entrar no sprint

Cada item do backlog precisa antes do planning:

- [ ] User story no formato `Como <persona>, quero <ação>, para <valor>`
- [ ] Critérios de aceite escritos (BDD-like: Dado / Quando / Então)
- [ ] Estimativa em story points (planning poker)
- [ ] Dependências externas mapeadas (D01-D15)
- [ ] Designs/mockups linkados (Frontend) ou contrato OpenAPI proposto (Backend)
- [ ] Dúvidas técnicas resolvidas no refinement

### 5.3. Definition of Done (DoD) — global

Vale para **todas as squads, em todos os sprints**:

- [ ] Código revisado por ≥ 1 outro dev (PR aprovado)
- [ ] Testes automatizados escritos: unit (≥ 70% nos services de negócio), integration (módulos críticos), E2E (fluxos golden — Squad 3)
- [ ] Lint + typecheck + build passam no CI (sem warnings novos)
- [ ] Sem `console.log` / `dd()` / `TODO` sem ticket vinculado
- [ ] OpenAPI atualizado (Backend) / Storybook atualizado (Frontend) / README do módulo atualizado (Estrutura)
- [ ] Feature flag criada se a feature não está pronta para produção
- [ ] Sentry instrumentado em pontos críticos
- [ ] Migração Prisma testada em dev e staging (Backend)
- [ ] Lighthouse ≥ 90 em mobile (Frontend, telas públicas)
- [ ] LGPD: novo dado PII tem consent + audit log + flag de retention (transversal)
- [ ] Deploy em preview/staging executado e validado
- [ ] Demo gravada / screenshot no PR

### 5.4. Velocity esperada por squad

Com 6 devs por squad e sprints de 2 semanas:

- **Velocity inicial (Sprints 0-2):** ~50 SP/sprint (ramp-up, padrões em formação)
- **Velocity de cruzeiro (Sprints 3-6):** ~70-80 SP/sprint
- **Velocity de fechamento (Sprints 7-8):** ~60 SP/sprint (mais bugs, polimento, menos features novas)

Escala de Fibonacci: 1 (trivial), 2, 3, 5 (média), 8 (complexa, 1 dev × 1 sprint), 13 (épica — quebrar), 21 (refinement obrigatório).

## 6. Marcos e demos

| Marco | Sprint | Quem demonstra | Audiência | Objetivo |
|-------|--------|----------------|-----------|----------|
| **M0 — Fundação verde** | S0 fim | Squad 1 | Tech leads + PO | `pnpm setup` < 60min, CI verde, monorepo OK |
| **🎯 M1 — Demo wow visual** | S1 fim | Squad 3 + Squad 1 | **Cliente Dinamic + equipe interna** | Landing + admin shell visual + dashboards mock; fechar contrato |
| **M2 — API funcional core** | S2 fim | Squad 2 | PO + Squad 3 | properties + leads + visits via Postman/Swagger; busca Meili funciona |
| **🎯 M3 — Demo IA conversacional** | S4 fim | Squad 2 + Squad 3 | **Cliente Dinamic + equipe vendas/locação** | Chat IA na landing qualificando lead real (ainda em staging); WhatsApp Evolution recebe e responde |
| **M4 — Financeiro ponta a ponta** | S6 fim | Squad 2 + Squad 3 | PO + equipe financeira | Contrato locação gerado, boleto Asaas emitido (sandbox), dunning agendado |
| **M5 — Migração + SEO** | S7 fim | Squad 2 + Squad 1 | PO + cliente | 628 imóveis migrados em staging, páginas SEO geradas, 301 redirects validados |
| **🚀 M6 — GO-LIVE** | S8 meio | Squad 1 (driver) + todos | Cliente + equipe + público | dinamicimoveis.com.br aponta para nova plataforma |
| **M7 — Estabilização pós-go-live** | S8 fim | Todos | PO + cliente | Métricas pós-launch, treinamento equipe, retro final |

## 7. Métricas de sucesso (acompanhadas todo sprint)

| Métrica | Owner | Meta no go-live |
|---------|-------|------------------|
| Velocity por squad (SP entregues / SP comprometidos) | SM | ≥ 85% |
| Cobertura de testes unit nos services de negócio | Squad 2 | ≥ 70% |
| Lighthouse mobile (telas públicas) | Squad 3 | ≥ 90 |
| Bugs P1 abertos | Todos | 0 no go-live |
| Bugs P2 abertos | Todos | ≤ 5 no go-live |
| Uptime staging | Squad 1 | ≥ 99% |
| Tempo médio CI por PR | Squad 1 | ≤ 6min |
| % PRs com review | Todos | 100% |
| Dependências cross-squad atrasadas | Chief SM | 0 críticas atrasadas > 1 sprint |
| Custo IA por conversa (após S4) | Squad 2 | ≤ R$ 0,50 |
| Tempo primeira resposta IA (após S4) | Squad 2 | ≤ 60s 24/7 |
| Inadimplência financeira após go-live | PO/cliente | < 3% (alvo 90d pós-launch) |

## 8. Riscos cross-squad (gerenciados na Scrum of Scrums)

| Risco | Probab. | Impacto | Mitigação | Owner |
|-------|---------|---------|-----------|-------|
| Atraso no D03 (Prisma schema) trava S2 e S3 | Médio | Alto | Schema núcleo entregue até dia 7 do S0; refinements via migrations incrementais | Squad 1 |
| Cliente recusa demo wow no M1 | Baixo | Crítico | Validar wireframes com cliente no S0 (não esperar S1 fim) | PO + Squad 3 |
| OpenRouter API instável quando integrar IA | Médio | Alto | Adapter `IAIProvider` com fallback para 2º modelo; teste em staging desde S3 | Squad 2 |
| Evolution API não cobre todos os recursos necessários | Médio | Médio | Documentar gaps no S3; já planejar Meta migration no S5+ | Squad 2 |
| Asaas sandbox diverge de produção | Baixo | Médio | Webhook signature validation + idempotency desde stub (S5) | Squad 2 |
| Scraper Flex49 quebra por mudança no site origem | Alto | Médio | Capturar HTML completo antes (S0); rodar scraper em batch único; ter export manual como backup | Squad 2 |
| Equipe Dinamic não treinada no go-live | Médio | Alto | Treinamento agendado no S7; vídeo + manual + sessão ao vivo | Squad 1 + PO |
| Lighthouse < 90 por imagens não otimizadas | Médio | Médio | Image pipeline com Sharp/next/image desde S1; LCP budget no CI | Squad 3 + Squad 1 |
| LGPD: ANPD muda regra de retenção | Baixo | Médio | Retention policies em config (não hardcoded); revisão jurídica antes do go-live | PO |

## 9. Glossário

- **DoR** — Definition of Ready (pré-requisitos pra item entrar no sprint)
- **DoD** — Definition of Done (critérios pra item ser considerado pronto)
- **SP** — Story Points (estimativa relativa de esforço — Fibonacci)
- **PR** — Pull Request
- **PO** — Product Owner
- **SM** — Scrum Master
- **WABA** — WhatsApp Business Account (Meta Cloud API)
- **HSM** — Highly Structured Message (template WhatsApp aprovado pela Meta)
- **RAG** — Retrieval-Augmented Generation (busca semântica + LLM)
- **CRUD Generator** — fábrica de telas CRUD a partir de `EntityDefinition` (ver CLAUDE.md)
- **Adapter Pattern** — interface + implementação trocável para integração externa (Asaas, Evolution, OpenRouter, D4Sign, etc)
- **Bounded Context** — módulo de negócio com fronteira de domínio explícita
- **M0-M7** — marcos cross-squad (ver §6)
- **D01-D15** — dependências críticas cross-squad (ver §4)

## 10. Como ler os outros documentos

Cada arquivo `0X-*.md` segue a mesma estrutura:

```
# Squad X — Nome
## Missão & Stack
## Composição do time
## Visão de sprints (tabela executiva)
## Sprint 0
  ### Sprint Goal
  ### Backlog (user stories com SP)
  ### Definition of Done específica
  ### Entregáveis técnicos
  ### Dependências (recebe / entrega)
  ### Cerimônias (planning agenda, daily focus, review demo, retro)
  ### Riscos do sprint
  ### Métricas do sprint
## Sprint 1
... (mesma estrutura)
## Sprint 8
## Backlog de Fase 2 (pós-MVP)
```

Boas leituras:
- `01-estrutura.md` → `02-backend.md` → `03-frontend.md` (ordem de dependência)

---

**Mantenedor:** Tech Lead + Chief Scrum Master
**Última atualização:** 2026-05-21
**Próxima revisão:** fim do Sprint 0 (semana 2)
