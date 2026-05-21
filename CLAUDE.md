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

## Próximas decisões pendentes (antes de começar Sprint 0)

1. Criar/confirmar repo `EvotechBrazil/dinamic_imob` no GitHub e configurar `origin`
2. Confirmar contas/acessos: Vercel, Railway, Cloudflare, Asaas, Meta Business, Anthropic
3. Logo Dinamic em vetor + paleta + fontes — mantém ou redesenha?
4. WhatsApp: migrar os 2 números (8713/8670) para Meta Cloud API ou criar um novo?
5. Aprovar 5-6 templates WhatsApp HSM com Meta (radar, agendamento, boleto, dunning, confirmação visita)
6. Exportar manual do Flex49 a lista de proprietários (necessário pro Sprint 5)
7. Definir tom de voz da IA com equipe de vendas/locação
8. Definir regras de transferência por setor (vendas/locação/captação/financeiro) fora do horário
9. Calendário corretor: Google Calendar OAuth ou agenda interna?

## Como retomar este projeto

Ler nesta ordem:
1. Este `CLAUDE.md`
2. O plano aprovado em `C:\Users\Tiago\.claude\plans\vamos-iniciar-um-novo-virtual-lobster.md`
3. `docs/dinamic_web.md` se precisar contexto estratégico/comercial original
4. `git log` para histórico de commits
