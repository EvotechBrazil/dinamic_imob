# Dinamic Imobiliária — Plataforma Integrada

## O que é este projeto

Plataforma própria custom para a **Dinamic Imobiliária** (Arapongas-PR) — substitui o site atual da Flex49/Code49 e adiciona sistema de gestão completo: Portal público + Agente IA (chat + WhatsApp) + CRM + Financeiro de locação. Cliente atual: ~628 imóveis ativos, 2 números WhatsApp ((43) 98847-8713 vendas / (43) 98847-8670 locações).

**Status:** Planejamento concluído e aprovado. Implementação ainda não iniciada. Sprint 0 (fundação + repo) é o próximo passo.

## Documentos de referência

- **Plano aprovado (fonte da verdade):** `C:\Users\Tiago\.claude\plans\vamos-iniciar-um-novo-virtual-lobster.md`
- **Proposta estratégica original (27 seções, 20 módulos IA):** `docs/dinamic_web.md`
- **Repositório GitHub:** `https://github.com/EvotechBrazil/dinamic_imob` (precisa ser criado/conectado)

## Decisões já fechadas (não revisitar sem conversar)

- **Estratégia:** 100% custom (propriedade total código + dados)
- **Prazo:** MVP em 60 dias (8 sprints) — escopo "fino mas ponta-a-ponta" em cada módulo
- **MVP inclui:** Portal público + Agente IA chat web + Agente IA WhatsApp + CRM funil + Financeiro locação + Demanda reprimida + Radar de imóvel + Páginas SEO IA-geradas
- **Migração:** scraper automático puxa 628 imóveis do Flex49
- **Equipe:** pequena (~10 pessoas), com urgência
- **CRUD universal:** ~45 entidades com CRUD completo no admin desde o lançamento (via CRUD Generator Pattern)
- **Arquitetura:** **Modular Monolith desacoplado** — bounded contexts, event bus interno, adapter pattern para tudo externo, dependency inversion. Microsserviços ficam pra fase 3+.

## Stack técnica fixada

- **Frontend:** Next.js 14 App Router + TypeScript + Tailwind v4 + shadcn/ui + **Origin UI** React (`originui.com`) + **Tremor + Recharts + TanStack Table v8** (admin) + react-hook-form + zod + Mapbox GL + next-pwa
- **Backend:** NestJS modular monolith + Prisma + PostgreSQL 16 + BullMQ + Redis + Meilisearch + pgvector + Cloudflare R2
- **IA:** Anthropic Claude API (Haiku 4.5 + Sonnet 4.6 com prompt caching)
- **Integrações:** Meta WhatsApp Cloud API · Asaas · D4Sign · Mapbox · ViaCEP
- **Monorepo:** pnpm + Turborepo
- **Hosting:** Vercel (web) + Railway (api + worker + Postgres + Redis + Meilisearch)
- **Observabilidade:** Sentry + Better Stack + PostHog

## Referências de design

- **Portal público (landing):** ImobiBrasil (`painel1.imobibrasil.app.br`) — estrutura + estética Tremor Solar
- **Admin/dashboards:** Tremor Blocks (templates Planner/Dashboard/Overview)
- **Biblioteca de componentes (admin + portal):** Origin UI React (`originui.com`)

## Estrutura do repositório (objetivo)

```
dinamic_imob/
├── apps/web/      # Next.js (público + admin + auth)
├── apps/api/      # NestJS modular monolith
├── apps/worker/   # BullMQ workers
├── packages/db/         # Prisma schema + migrations + seeds
├── packages/shared/     # zod BR validators, types, formatters
├── packages/contracts/  # Interfaces TS dos módulos
├── packages/ui/         # shadcn + OriginUI + Tremor wrappers
├── packages/ai-prompts/ # Prompts versionados
└── docs/                # ARCHITECTURE.md, MODULES.md, ADRs/
```

Hoje: `backend/` e `frontend/` vazios; `docs/dinamic_web.md` contém a proposta estratégica original.

## Princípios não negociáveis ao codar aqui

1. **Modular monolith com bounded contexts** — módulos não tocam internals uns dos outros
2. **Adapter pattern** para todo externo (Asaas, WhatsApp, Claude, D4Sign, etc)
3. **Schema-first com zod** em `@dinamic/shared` (fonte da verdade)
4. **API contract-first** com OpenAPI gerado do NestJS
5. **CRUD Generator** — todo CRUD admin sai de uma `EntityDefinition`
6. **Onboarding em 1h** via `pnpm setup` (docker-compose com Postgres + Redis + Meilisearch)
7. **Testes em camadas** — unit + integration + Playwright E2E
8. **README por módulo** documentando responsabilidades, eventos, dependências
9. **Feature flags por módulo** — toggle sem deploy
10. **LGPD nativo** — consentimento separado para radar, audit log de PII

## Skills disponíveis (já configuradas)

`nextjs-shadcn-saas`, `nestjs-multitenant`, `prisma-schema-design`, `brazilian-forms`, `brazilian-payments` (Asaas), `bullmq-workers`, `integration-adapter`, `lgpd-compliance`, `admin-dashboard` (Tremor + TanStack Table), `pwa-mobile-first`, `claude-api`.

## Ajustes 2026-05-21 (parte 2) — estratégia local-first

- **Stack 100% local via Docker Desktop durante todo dev.** docker-compose sobe Postgres 16 + Redis 7 + Meilisearch. apps/web, apps/api, apps/worker rodam local. Storage local em `./uploads` (não R2 ainda).
- **Única integração externa ATIVA: OpenRouter.** API key em `.env.local` (NUNCA commitada). Modelos: Haiku 4.5 default + Sonnet 4.6 premium. Testada e respondendo no tom profissional caloroso (~R$ 0,002/conversa).
- **Adiadas pra entrega ao cliente:** Vercel, Hostinger easypanel, Cloudflare (DNS+R2+WAF), Asaas, Meta WhatsApp Cloud API, D4Sign. Adapters implementados (mock + real stubs), mas só OpenRouter ativada de fato.
- **Demo wow Sprint 1 Frontend já pode ter chat IA REAL** (não só mock UI) — antecipa parte da Sprint 3 Backend.
- **Segurança:** OPENROUTER_API_KEY foi exposta em chat; recomendado rotar em https://openrouter.ai/keys quando der.

## Ajustes da reunião 2026-05-21 (sobrepõem o plano original onde houver conflito)

- **Hosting backend:** Hostinger + easypanel (não Railway). Frontend continua na Vercel.
- **IA:** OpenRouter (clonando pattern do projeto `evofit/alicia`) — não Anthropic SDK direto.
- **WhatsApp:** Evolution API primeiro (demo), Meta Cloud API depois (Sprint 3+). Templates HSM adiados.
- **Asaas:** adapter/estrutura pronto, integração real adiada (pós-demo).
- **Primeira entrega = "wow visual" pro cliente:** foco em landing pública + admin shell com dashboards Tremor populados com mock realista. Backend só stub.
- **Identidade visual:** redesenha leve — indigo-600 `#4F46E5` + amber-500 `#F59E0B` + Plus Jakarta Sans (display) + Inter (body) + JetBrains Mono. Vibe Tremor Solar.
- **Landing híbrida:** hero buscador grande + CTA "Fale com a IA"; 6 seções (featured / como IA ajuda / bairros+mapa / números / depoimentos / CTA contato).
- **Dados demo:** mock realista — ~50–100 imóveis fictícios Arapongas (Centro, Jardim Tropical, Industrial), 30 leads, 15 contratos.
- **Tom IA:** profissional caloroso (você, sem gírias, máx 1 emoji/msg).
- **Atribuição:** round-robin por setor (vendas/locação/captação/financeiro) com fora-de-horário enfileirando pra abertura.
- **Calendário corretor:** agenda interna no admin (sem Google Calendar no MVP).
- **Flex49:** scraper e export proprietários adiados; reabordar pós-demo.

## Estado atual (2026-05-21 noite)

✅ **Sprint 0 concluído.** Landing demo executiva entregue por 3 squads paralelas e validada:
- TypeScript 0 erros, ESLint 0 warnings, `GET /` 200 OK
- 6 seções rodando: Omnichannel · Financeiro · CRM · Tokenização · Jurídico/LGPD · Dashboards
- Chat IA flutuante real (OpenRouter Qwen3.7-max)
- `pnpm dev` em apps/web sobe em ~4s, compila em 15.9s
- Repo: `EvotechBrazil/dinamic_imob` (HTTPS, branch `main`)

🟡 **Fase atual: POLIMENTO antes da entrega ao cliente 2026-05-22.**
Áreas: copy comercial, spacing, micro-interactions, perf, mobile/tablet, a11y, mensagens IA contextuais. Detalhes em `memory/project_landing_demo_polimento.md`.

## Como retomar polimento

```powershell
cd "E:\Projetos\Dinamic_Imob" ; claude
```

Primeiro prompt no novo Claude:

```
Retomar Dinamic. Landing demo executiva ESTA RODANDO (validada hoje).
Cliente ve 2026-05-22. Fase atual = polimento antes da entrega.

Ler primeiro nessa ordem:
1. memory/project_landing_demo_polimento.md (focus de polimento + lista 10 areas)
2. docs/prompts/landing-demo-cliente.md (briefing original — DoD)
3. CLAUDE.md (estado atual)

Comecar por:
1. cd apps/web && pnpm dev (sobe em http://localhost:3000)
2. Abrir browser e fazer auditoria visual secao por secao
3. Listar ajustes em ordem de prioridade
4. Atacar 1 por 1 com commits granulares feat(landing/polish): ...

Foco: visual clean + copy persuasivo + perf mobile + micro-interactions.
NAO mexer em backend, db, ou estrutura — so polir o que ja existe em
apps/web/src/{components,app,styles,lib}.

Confirma que leu e comeca pela auditoria visual.
```

## Histórico de fases

- ~~Sprint 0~~ ✅ — fundação (monorepo, docker-compose, .env, OpenRouter ativa) + landing demo entregue
- **Polimento** 🟡 — fase atual (poucos dias até cliente)
- Pós-demo: portar `vendor/jpasv-chat-bullq` → `apps/api conversations + ai-agents` (task #15 backlog)
- Sprint 1-7: voltar ao plano original (`docs/squads/`)

## Como retomar este projeto

Ler nesta ordem:
1. Este `CLAUDE.md`
2. O plano aprovado em `C:\Users\Tiago\.claude\plans\vamos-iniciar-um-novo-virtual-lobster.md`
3. `docs/dinamic_web.md` se precisar contexto estratégico/comercial original
4. `git log` para histórico de commits
