# Squad A — Foundation

> **Você é o Squad A.** Faça o setup técnico, layout, chat IA flutuante e tipos compartilhados. As Squads B e C dependem da sua entrega.

## Leitura obrigatória (nessa ordem)

1. `docs/prompts/coordenacao-3-squads.md` — regras anti-conflito
2. `docs/prompts/landing-demo-cliente.md` — briefing visual e funcional completo
3. `CLAUDE.md` — decisões de stack
4. `.env.local` — confirma `OPENROUTER_API_KEY` presente
5. `scripts/test-openrouter.mjs` — referência de como falar com OpenRouter (extrair lógica)

## Missão

Entregar o esqueleto da landing demo + tudo que B e C precisam pra trabalhar sem te perguntar nada.

## Sua pasta exclusiva

- `apps/web/` (tudo dentro, EXCETO `src/components/sections/`)

## Arquivos PROIBIDOS de tocar

- `apps/web/src/components/sections/**` (é do B e C)
- `apps/web/src/lib/mock-data-commercial.ts` (Squad B)
- `apps/web/src/lib/mock-data-platform.ts` (Squad C)

## Tarefas (na ordem)

### Fase 1 — Setup (commit "setup pronto" quando terminar essa fase)

1. **Inicializar Next.js 14 em `apps/web/`** (substituir o placeholder existente)
   ```bash
   cd apps/web
   # NÃO use create-next-app (cria conflito com workspace) — monta manual
   ```
   - `apps/web/package.json` com TODAS as deps:
     - next ^14.2 (App Router)
     - react ^18, react-dom ^18
     - typescript ^5.5
     - tailwindcss ^3.4 (v4 ainda alpha; usar 3.4 estável)
     - @tailwindcss/postcss, postcss, autoprefixer
     - clsx, tailwind-merge, class-variance-authority
     - lucide-react
     - framer-motion
     - **shadcn primitives:** @radix-ui/react-dialog, @radix-ui/react-tabs, @radix-ui/react-scroll-area, @radix-ui/react-tooltip, @radix-ui/react-avatar, @radix-ui/react-separator, @radix-ui/react-slot, @radix-ui/react-popover, @radix-ui/react-progress
     - **Tremor:** @tremor/react ^3.18 (ou tremor-raw via copy se preferir)
     - **dnd-kit (pro Squad B usar no Kanban):** @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities
     - **recharts** ^2.12 (Tremor depende)
     - **OpenRouter:** @openrouter/sdk ^0.12.35
     - dotenv ^16
   - Scripts: `dev: next dev`, `build: next build`, `start: next start`, `lint: next lint`

2. **Configs Next.js**
   - `apps/web/next.config.ts` (TS config) — habilita images.remotePatterns pra `images.unsplash.com` e `picsum.photos`
   - `apps/web/tsconfig.json` (extends `@dinamic/tsconfig/base.json` quando existir, senão extends `./node_modules/next/tsconfig.json`; paths alias `@/*` → `./src/*`)
   - `apps/web/postcss.config.mjs` (tailwindcss + autoprefixer)
   - `apps/web/tailwind.config.ts`:
     - content: `['./src/**/*.{ts,tsx}']`
     - theme.extend.colors com aliases (primary, accent, surface, app, ink, muted) lendo CSS vars
     - theme.extend.fontFamily: display (Plus Jakarta Sans), sans (Inter), mono (JetBrains Mono)

3. **Design tokens**
   - `apps/web/src/styles/tokens.css` — CSS vars conforme `coordenacao-3-squads.md`
   - `apps/web/src/app/globals.css` — importa tokens + tailwind directives + reset básico

4. **Fontes**
   - Em `src/app/layout.tsx` use `next/font` pra Plus Jakarta Sans e Inter (variable fonts)
   - Aplica nas CSS vars do `<html>`

5. **shadcn/ui primitives mínimas** em `apps/web/src/components/ui/`:
   - `button.tsx`, `card.tsx`, `badge.tsx`, `avatar.tsx`, `dialog.tsx`, `tabs.tsx`, `tooltip.tsx`, `separator.tsx`, `scroll-area.tsx`, `input.tsx`, `label.tsx`, `popover.tsx`, `progress.tsx`
   - Cole os arquivos do shadcn/ui standard (ou via `npx shadcn@latest add ...`)
   - `apps/web/src/lib/utils.ts` com `cn()` (clsx + tailwind-merge)

6. **mock-types.ts (CRÍTICO — B e C dependem disso)**
   - `apps/web/src/lib/mock-types.ts` — TODOS os tipos TS que B e C vão usar.
   - Tipos esperados (mínimo):
     ```ts
     export type ChannelType = 'whatsapp' | 'instagram' | 'facebook';
     export type Setor = 'vendas' | 'locacao' | 'captacao' | 'financeiro';
     export type ConversationStatus = 'pending' | 'open' | 'snoozed' | 'closed';
     export interface Conversation { id; nome; canal: ChannelType; avatarUrl; ultimaMsg; horaRelativa; naoLidas: number; setor: Setor; status: ConversationStatus; }
     export interface ChatMessage { id; conversationId; direction: 'inbound'|'outbound'; sender: 'lead'|'ai'|'corretor'; nome?; content; ts; status?: 'sent'|'delivered'|'read' }
     export type AgentAction = 'classify'|'rag-search'|'propose-visit'|'handoff'|'collect-info';
     export interface AgentRun { id; ts; action: AgentAction; detail; tokensIn: number; tokensOut: number; costBRL: number; }
     export interface KPI { label; value: string|number; delta?: number; deltaType?: 'increase'|'decrease'|'moderateIncrease'|'moderateDecrease'|'unchanged'; helper?: string }
     export interface Boleto { id; locatario; imovel; valor: number; vencimento; status: 'pago'|'pendente'|'vencido'|'cancelado' }
     export interface Lead { id; nome; avatarUrl; bairro; orcamento; intencao: 'compra'|'aluguel'; status: 'novo'|'contatado'|'qualificado'|'visita'|'proposta'; setor: Setor }
     export interface Property { id; titulo; bairro; tipo: 'apartamento'|'casa'|'terreno'|'comercial'; finalidade: 'venda'|'aluguel'; preco: number; area: number; dormitorios: number; vagas: number; fotos: string[]; destaque?: boolean }
     export interface TokenRecord { id; ts; conversa: string; modelo: string; tokensIn: number; tokensOut: number; costBRL: number }
     export interface Contract { id; locatario; imovel; periodoInicio; periodoFim; valor: number; status: 'ativo'|'vencendo'|'encerrado'; }
     export interface LGPDRequest { id; tipo: 'export'|'delete'|'consent_revoke'; titular; dataAbertura; status: 'pendente'|'concluido' }
     export interface ChartPoint { label: string; valor: number; valor2?: number }
     ```

7. **openrouter-client.ts**
   - `apps/web/src/lib/openrouter-client.ts` — função `sendChatMessage(history, onChunk)` que faz streaming, lê `OPENROUTER_API_KEY` do `process.env`, usa modelo `qwen/qwen3.7-max`. Reusa lógica do `scripts/test-openrouter.mjs` (incluindo `chatRequest` wrapper). Coloca no SERVER (route handler `app/api/chat/route.ts`) pra esconder a key.

8. **Layout root**
   - `apps/web/src/app/layout.tsx` — metadata, fonts, children, providers (theme se quiser, modo light only OK pra demo)

9. **Topbar sticky**
   - `apps/web/src/components/layout/topbar.tsx` — logo "DINAMIC" estilizado + nav com 6 anchors (omnichannel, financeiro, crm, tokenizacao, juridico, dashboards) + avatar mock + botão tema (opcional)

10. **SectionHeader helper**
    - `apps/web/src/components/layout/section-header.tsx` — `<SectionHeader title subtitle eyebrow? />` reutilizável

11. **Hero**
    - `apps/web/src/components/layout/hero.tsx` — "A plataforma da Dinamic em 6 frentes." + subhead + 4 mini-KPIs

12. **Footer**
    - `apps/web/src/components/layout/footer.tsx`

13. **page.tsx esqueleto**
    - `apps/web/src/app/page.tsx`:
      ```tsx
      import { Topbar, Hero, Footer } from '@/components/layout';
      import { ChatWidget } from '@/components/chat-widget';
      // imports comentados até B/C subirem:
      // import { OmnichannelSection } from '@/components/sections/omnichannel';
      // import { FinanceiroSection } from '@/components/sections/financeiro';
      // import { CRMSection } from '@/components/sections/crm';
      // import { TokenizacaoSection } from '@/components/sections/tokenizacao';
      // import { JuridicoSection } from '@/components/sections/juridico';
      // import { DashboardsSection } from '@/components/sections/dashboards';

      export default function HomePage() {
        return (
          <>
            <Topbar />
            <main>
              <Hero />
              {/* <OmnichannelSection /> */}
              {/* <FinanceiroSection /> */}
              {/* <CRMSection /> */}
              {/* <TokenizacaoSection /> */}
              {/* <JuridicoSection /> */}
              {/* <DashboardsSection /> */}
            </main>
            <Footer />
            <ChatWidget />
          </>
        );
      }
      ```

14. **🔴 COMMIT 1 (CRÍTICO):**
    ```
    feat(landing/foundation): setup pronto — B e C podem começar

    - apps/web Next.js 14 rodando
    - Design tokens + Tailwind + shadcn instalados
    - src/lib/mock-types.ts definido (todos os types compartilhados)
    - src/lib/openrouter-client.ts pronto
    - Layout root + topbar (anchors pras 6 sections) + footer
    - Chat widget esqueleto
    - src/app/page.tsx com placeholders das 6 sections
    ```

### Fase 2 — Chat IA flutuante (em paralelo com B e C)

15. **Chat widget completo**
    - `apps/web/src/components/chat-widget/`
      - `index.tsx` — wrapper cliente
      - `chat-button.tsx` — botão flutuante canto inf direito (animação pulse sutil)
      - `chat-panel.tsx` — janela do chat (Dialog ou drawer customizado)
      - `chat-message.tsx` — bubble (variantes: user, assistant, system)
      - `chat-input.tsx` — textarea + botão send
      - `use-chat.ts` — hook com state + streaming via `/api/chat`
    - Sistema prompt da Dinamic (mesmo do `scripts/test-openrouter.mjs`)
    - Mostra typing indicator durante stream
    - Histórico em useState (não persistir — é demo)
    - Visual: header "Fale com a Dinamic" + corpo scrollable + footer com input

16. **Polimento layout**
    - Spacing consistente entre seções
    - Sticky topbar com scroll-spy (highlight section ativa)
    - Smooth scroll nos anchors
    - Responsivo desktop / tablet

### Fase 3 — Assembly final (depois que B e C commitarem)

17. **Descomentar imports e wirings no page.tsx** quando B e C avisarem que suas seções estão prontas
18. **Validar end-to-end:** rolar a página inteira, abrir chat, mandar mensagem
19. **Commit final**

## Definition of Done específica

- [ ] `cd apps/web && pnpm dev` sobe sem erro em `http://localhost:3000`
- [ ] Lighthouse mobile ≥ 80 na home com 6 seções
- [ ] Chat IA responde de verdade via OpenRouter
- [ ] Topbar fica sticky no scroll, anchors funcionam
- [ ] Fontes Plus Jakarta + Inter aplicadas
- [ ] Sem warning no console
- [ ] Sem any TS sem justificativa

## Quando tiver dúvida

Pergunta no chat humano. Não decida sozinho mexer em pasta de B ou C.

## Comandos uteis

```bash
cd "E:/Projetos/Dinamic_Imob"
git pull --rebase origin main
pnpm install         # primeira vez ou quando package.json muda
cd apps/web
pnpm dev             # roda Next em :3000

# commit:
git add apps/web/...   # só seus arquivos
git commit -m "feat(landing/foundation): ..."
git push origin main
```
