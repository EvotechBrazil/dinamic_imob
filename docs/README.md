# Documentação — Dinamic Imobiliária

Mapa da pasta `docs/`. Tudo que não for código mora aqui, categorizado por propósito.

## Estrutura

```
docs/
├── README.md              # este arquivo
├── strategy/              # visão estratégica, propostas, decisões macro
├── design/                # mockups HTML, especificações visuais, refs de UI
├── workflow/              # orquestração de trabalho (sprints, squads, prompts)
└── references/            # documentos externos usados como referência (Bravy etc)
```

## O que vai em cada pasta

### `strategy/`

Visão de alto nível: proposta original do projeto, decisões estratégicas, escopo, premissas.

- `proposta-original.md` — proposta inicial entregue ao cliente (27 seções, 20 módulos IA)

### `design/`

Mockups visuais, especificações de design, protótipos HTML, referências de UI/UX.

- `portal-mockups/` — 4 mockups HTML do `/portal` (A-editorial-noir foi a escolhida) + specs `spec-dia-noite.md`, `spec-lovable-panel.md`, `mobile-audit.md`
- `parallax-clean/` — referência parallax-clean usada como base estética do portal

### `workflow/`

Documentos de orquestração de sprints, planos de squad, prompts usados na execução. Documentos vivos que mudam conforme as fases avançam.

- `squads/` — planos numerados de squad (estrutura, backend, frontend) seguindo padrão `00-`, `01-`, `02-`, `03-`
- `prompts/` — prompts usados nas execuções de squad/agents paralelos

### `references/`

Documentos externos usados como referência de boas práticas. **Não são do projeto** — são insumos.

- `bravy-forecast-spec.md` — spec do sistema Bravy Forecast (referência de arquitetura)
- `bravy-knowledge-base-plan.md` — plano de base de conhecimento Bravy para vibecoders

## Padrões de nomenclatura

- Arquivos `.md` em **kebab-case**: `proposta-original.md`, não `PropostaOriginal.md`
- Pastas em **kebab-case**: `portal-mockups/`, não `PortalMockups/`
- Documentos numerados em sequência usam **2 dígitos**: `00-indice.md`, `01-estrutura.md`
- Specs técnicas começam com `spec-`: `spec-dia-noite.md`
- Auditorias começam com nome+`-audit`: `mobile-audit.md`

## Onde NÃO mora doc

- **Código** (READMEs por app/package): dentro de `apps/*/README.md` e `packages/*/README.md`
- **Memórias do Claude:** `C:\Users\Tiago\.claude\projects\e--Projetos-Dinamic-Imob\memory\` (estado vivo da sessão)
- **Planos aprovados:** `C:\Users\Tiago\.claude\plans\` (artefatos do Claude Code)
- **CLAUDE.md** (raiz do projeto): estado vivo + instruções para o agente — é o ponto de entrada
