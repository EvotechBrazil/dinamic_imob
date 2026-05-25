# Dinamic Imobiliária — Plataforma Integrada

## O que é este projeto

Plataforma própria custom para a **Dinamic Imobiliária** (Arapongas-PR) — substitui o site atual da Flex49/Code49 e adiciona sistema de gestão completo: Portal público + Agente IA (chat + WhatsApp) + CRM + Financeiro de locação. Cliente atual: ~628 imóveis ativos, 2 números WhatsApp ((43) 98847-8713 vendas / (43) 98847-8670 locações).

**Status atual:** Fase 4 (Dinamic Channel — inbox omnichannel real) concluída e em produção. Próximo passo: voltar ao plano original (Sprint 1 backend NestJS + migração in-memory→Prisma) ou iterar mais features no admin.

## Em produção

- **Portal público:** https://dinamic-imob-web.vercel.app/portal — redesign Editorial Noir cinematic, chat IA OpenRouter (Haiku 4.5) funcionando, agendamento de visita por email Resend
- **Inbox Dinamic Channel:** https://dinamic-imob-web.vercel.app/admin/inbox — 3 colunas, polling 3s, multi-canal (WhatsApp/IG/FB/Web), conversa do chat IA cai aqui, lead vinculado ao Kanban
- **Repositório:** https://github.com/EvotechBrazil/dinamic_imob — branch `main` sincronizada
- **Hosting:** Vercel (apps/web). Apps/api e apps/worker ainda local-only.

## Documentos de referência

- **Plano aprovado (fonte da verdade):** `C:\Users\Tiago\.claude\plans\vamos-iniciar-um-novo-virtual-lobster.md`
- **Proposta estratégica original (27 seções, 20 módulos IA):** `docs/dinamic_web.md`
- **Plano Fase 3 (redesign portal):** `C:\Users\Tiago\.claude\plans\nossa-pagina-portal-de-mighty-flurry.md`
- **Specs técnicas Fase 3:** `docs/portal-mockups/spec-dia-noite.md`, `docs/portal-mockups/spec-lovable-panel.md`, `docs/portal-mockups/mobile-audit.md`

## Decisões já fechadas (não revisitar sem conversar)

- **Estratégia:** 100% custom (propriedade total código + dados)
- **Prazo:** MVP em 60 dias (8 sprints) — escopo "fino mas ponta-a-ponta" em cada módulo
- **MVP inclui:** Portal público + Agente IA chat web + Agente IA WhatsApp + CRM funil + Financeiro locação + Demanda reprimida + Radar de imóvel + Páginas SEO IA-geradas
- **Migração:** scraper automático puxa 628 imóveis do Flex49 (adiada pós-demo)
- **Equipe:** pequena (~10 pessoas), com urgência
- **CRUD universal:** ~45 entidades com CRUD completo no admin desde o lançamento (via CRUD Generator Pattern)
- **Arquitetura:** **Modular Monolith desacoplado** — bounded contexts, event bus interno, adapter pattern para tudo externo, dependency inversion. Microsserviços ficam pra fase 3+.

## Stack técnica

### Frontend (apps/web — em produção)

- Next.js 14 App Router + TypeScript
- Tailwind v3.4 + shadcn/ui + Origin UI (legado)
- **Editorial Noir tema (rota /portal):** Syncopate (display) + Manrope (body) + CSS vars `--noir-*`
- **Animação:** Lenis smooth scroll + GSAP ScrollTrigger
- Framer Motion + lucide-react
- next/font/google pra Syncopate, Manrope, Plus Jakarta Sans, Inter, Montserrat
- Mapbox GL (preparado, não ativo)
- next-pwa (preparado, não ativo)

### Backend (apps/api, apps/worker — ainda local)

- NestJS modular monolith
- Prisma + PostgreSQL 16
- BullMQ + Redis
- Meilisearch + pgvector
- Cloudflare R2 (preparado, não ativo)

### IA

- **OpenRouter** (clonando pattern do `evofit/alicia`) com Qwen / Sonnet 4.6 — ativo em produção
- API key configurada na Vercel — ver memory `reference-vercel-envs`

### Integrações externas

- **Ativas em produção:** OpenRouter (chat IA), Resend (email agendamento)
- **Adiadas:** Meta WhatsApp Cloud API (Evolution primeiro), Asaas, D4Sign, Mapbox, ViaCEP

### Monorepo

- pnpm + Turborepo
- `apps/web`, `apps/api`, `apps/worker`
- `packages/db`, `packages/shared`, `packages/contracts`, `packages/ui`, `packages/ai-prompts`

## Estrutura do /portal (Editorial Noir)

Rota: `/portal` em `apps/web/src/app/portal/page.tsx`.

Componentes ativos (em ordem renderizada):

1. **`PortalHeader`** — mix-blend-difference + nav uppercase + CTA "Falar com a IA" pill amber + mobile drawer
2. **`HeroChat`** + **`HeroBackground`** — foto fachada (`/portal/frente-imob.webp`) animando dia→noite (40s) + 25 estrelas + painel lovable dark central (logo D + greeting dinâmico + input grande + 4 chips + 3 proofs com check verde)
3. **`IntroSection`** — 2-col text reveal "IMOBILIÁRIA LOCAL, IA 24/7" + 3 stats animados (628 / 12 / 8472-F)
4. **`StickyCardStack`** — 3 imóveis featured com sticky + scrub scale/opacity em GSAP
5. **`Neighborhoods`** — 4 bairros com hover expand (Centro · Jd Tropical · Industrial · Aeroporto)
6. **`StatsBrutal`** — "12 / 628 / 97%" Syncopate gigante + counter animado
7. **`PortalFooter`** — "VAMOS CONVERSAR" clamp 80-160px + 2 CTAs WhatsApp + logo D fantasma
8. **`FloatingActions`** — botão flutuante WhatsApp + chat dispatcher

CSS vars do tema em `apps/web/src/styles/portal-day-night.css`. Smooth scroll via `lenis-provider.tsx`. Noise overlay SVG via `noise-overlay.tsx`.

Demo autoplay (uau item) está **desativado** a pedido do cliente — painel fica exposto sem instrução automática.

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
11. **Dev server DESLIGADO durante refator massivo** (4+ arquivos paralelos) — HMR quebra state runtime mesmo com código correto. Mata `pnpm dev`, faz tudo, depois sobe. Ver memory `feedback-dev-server-hmr`.
12. **6+3 agents paralelos com arquivos disjuntos** — cada agent ganha lista explícita de paths, nunca 2 agents no mesmo arquivo. Ver memory `feedback-agents-paralelos-fase3`.

## Skills disponíveis (já configuradas)

`nextjs-shadcn-saas`, `nestjs-multitenant`, `prisma-schema-design`, `brazilian-forms`, `brazilian-payments` (Asaas), `bullmq-workers`, `integration-adapter`, `lgpd-compliance`, `admin-dashboard` (Tremor + TanStack Table), `pwa-mobile-first`, `claude-api`.

## Histórico de fases

- ~~Sprint 0~~ ✅ — fundação (monorepo, docker-compose, .env, OpenRouter ativa) + landing demo entregue (rota `/`)
- ~~Polimento da landing demo executiva~~ ✅ — 2026-05-22
- ~~**Fase 3** — Redesign Editorial Noir do `/portal`~~ ✅ — 2026-05-23, em produção Vercel
- ~~**Fase 4** — Dinamic Channel inbox (`/admin/inbox` + persistência chat IA + bridge Kanban) ~~ ✅ — 2026-05-25, em produção Vercel. In-memory store com interface drop-in pra Prisma no Sprint 1
- **Próximo:** decidir entre (a) iterar features no admin (Kanban no /admin, dashboards, tasks) ou (b) Sprint 1 backend (NestJS + Prisma migration do conversation-store)

## Como retomar este projeto

Ler nesta ordem:
1. Este `CLAUDE.md`
2. Memórias em `C:\Users\Tiago\.claude\projects\e--Projetos-Dinamic-Imob\memory\MEMORY.md` (índice)
3. Specs Fase 3: `docs/portal-mockups/spec-*.md`
4. O plano aprovado em `C:\Users\Tiago\.claude\plans\vamos-iniciar-um-novo-virtual-lobster.md` se precisar contexto estratégico
5. `git log --oneline -20` para histórico recente

Primeiro prompt sugerido no próximo Claude:

```
Retomar Dinamic. Portal /portal redesenhado (Editorial Noir) ESTA EM PRODUCAO
em https://dinamic-imob-web.vercel.app/portal — chat IA + agendamento email
funcionando.

Ler primeiro nessa ordem:
1. CLAUDE.md (estado atual)
2. MEMORY.md em ~/.claude/projects/.../memory/ (indice de memorias)
3. memory/project_fase3_editorial_noir.md (resumo da Fase 3)

Proxima decisao: (a) iterar visual /portal conforme feedback do cliente
ou (b) voltar Sprint 1 do plano original (apps/api NestJS modules).
Me confirma qual antes de seguir.
```
