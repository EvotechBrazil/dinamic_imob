# Auditoria Mobile-First — `A-editorial-noir.html`

> **Contexto:** demo cliente Dinamic Imobiliária 2026-05-23. Mockup A foi feito desktop-first. 70%+ dos leads finais entram por celular. Este documento mapeia o que precisa ajustar antes da demo e antes da portagem pro Next.

---

## 1. Resumo Executivo

O mockup A é visualmente forte e tem **mobile-first parcial** — o flexbox/grid colapsa via `@media (max-width: 900px)` cobrindo o esqueleto (nav off, grids 1-col, chat-card hidden, card-image hidden). Porém o **hero — peça central da demo — herdou medidas desktop**: greeting `clamp(32px, 4vw, 52px)` ainda gera 32 px de fonte em viewport 360 px (gigante demais), o painel lovable ocupa quase 100% da altura útil empurrando os chips pra fora do dobra, o sol/lua de 90 px cobre ~25% da largura do device, e o scroll indicator vertical não cabe ao lado do painel. **Nota geral mobile: 6/10** — passa, mas não impressiona, e o cliente vai testar no próprio celular durante a demo.

**3 prioridades críticas pra atacar antes da entrega:**
1. **Hero mobile**: encolher tudo (greeting, painel, celestial body, chips) e garantir que o input + 1 chip caibam acima da dobra em iPhone SE (375×667).
2. **Touch targets** abaixo de 44×44 px: nav links (não aplicável, nav fica `display:none`), social links do footer (atualmente ~30 px de altura), chips (atualmente ~32 px), botão envio chat IA (32 px).
3. **Performance**: Tailwind CDN (~290 kB) + GSAP + ScrollTrigger + Lenis somam ~150 kB JS. LCP estimado em 4G slow > 4 s. Pra demo via cabo USB tudo bem, mas pra deploy real (e Lighthouse mobile ≥ 85) precisa portar pro Next com build estático.

---

## 2. Auditoria por Seção

### 2.1 Loader

**✅ Funciona:**
- Layout flex centralizado já é mobile-first
- Progress bar 240 px cabe em qualquer viewport
- Logo D circular de 80 px é adequado pra mobile
- Some em 1.5s — não bloqueia interação

**⚠️ Ajustar:**
- `letter-spacing: 0.3em` no `.loader-sub` ("CARREGANDO EXPERIÊNCIA") em 12px pode quebrar em 2 linhas em < 360 px. Verificar com Pixel 5 (393 px) e iPhone SE (375 px).

**❌ Quebrado:** nenhum.

**💡 Recomendação:**
```css
@media (max-width: 400px) {
  #loader { gap: 24px; }
  #loader .loader-sub { letter-spacing: 0.2em; font-size: 11px; }
}
```

---

### 2.2 Topbar (mix-blend-difference + nav)

**✅ Funciona:**
- `@media (max-width: 900px)` esconde nav (`display: none`) e ajusta grid pra `1fr auto` — OK
- `mix-blend-mode: difference` funciona em Chrome Android e Safari iOS 15+
- CTA "Falar com a IA" continua visível e clicável

**⚠️ Ajustar:**
- Logo + brand-text "DINAMIC" (14 px com `letter-spacing: 0.25em`) ocupa ~120 px de largura — sobra pouco pro CTA em viewport 360 px. O CTA tem `padding: 12px 24px` + texto "FALAR COM A IA" — provável quebra de linha ou esmagamento.
- **Sem menu hamburguer.** O usuário não tem como navegar pra "Comprar / Alugar / Bairros / Contato" no mobile. Pra um mockup demo é tolerável, mas pra portagem Next vira bloqueador.
- `padding: 24px 6vw` em 360 px = 21.6 px lateral — tá OK.

**❌ Quebrado:**
- Risco de overflow horizontal em < 360 px (Galaxy Fold fechado = 280 px).

**💡 Recomendação:**
```css
@media (max-width: 600px) {
  .topbar { padding: 16px 5vw; }
  .topbar .brand-text { display: none; } /* deixa só o D no mobile */
  .topbar .cta { padding: 10px 16px; font-size: 10px; letter-spacing: 0.15em; }
}
@media (max-width: 380px) {
  .topbar .cta span:not(.dot) { display: none; } /* CTA vira só dot + ícone */
}
```
- **Pra portagem Next:** adicionar `<MobileMenuSheet />` shadcn com Drawer abrindo do top, contendo Comprar/Alugar/Bairros/Contato.

---

### 2.3 Hero (foto animada dia/noite + painel lovable central + scroll indicator)

**✅ Funciona:**
- `.hero-content` herda `max-width: 90vw` no mobile (linha 1017) — bom
- Painel lovable com `backdrop-filter: blur(20px)` funciona em iOS 15+ e Android Chrome 76+
- Animação day-night CSS pure (`@keyframes`) é GPU-acelerada
- `prefers-reduced-motion` desativa animações — boa prática a11y já presente
- Hero vignette ajuda legibilidade do texto no mobile

**⚠️ Ajustar:**
- **Greeting H1** `clamp(32px, 4vw, 52px)` — em 360 px o min 32 px é grande demais. Sugiro `clamp(24px, 7vw, 52px)`.
- **Hero h1 "ENCONTRE SEU LAR"** `clamp(40px, 6vw, 88px)` — em 360 px gera 40 px de fonte. Pode estourar 1 linha se a fonte Syncopate carregar atrasada. Sugiro `clamp(28px, 8vw, 88px)`.
- **Hero eyebrow** "Estabelecida em 2014 · CRECI 8472-F" com `letter-spacing: 0.35em` em 11 px e padding generoso pode quebrar em 2 linhas em < 360 px.
- **Celestial body (sol/lua)** com `width: 90px; height: 90px` — em 360 px cobre 25% da tela e o `blur(2px)` + `box-shadow: 0 0 90px` cria um halo de ~270 px atrapalhando o texto.
- **Lovable panel** padding `28px 28px 24px` em mobile some o eixo X (336 px de width interna em 360 px) — apertado, mas OK. Já com `border-radius: 28px` arredonda bem.
- **Chips** ocupam 4 linhas no mobile (4 chips com `flex-wrap` + `padding: 8px 14px`). Esteticamente tá feio. Alternativas: reduzir pra 2 chips ou habilitar scroll horizontal sem wrap.
- **Lovable-proofs** (3 selos) viram 3 linhas no mobile com `flex-wrap` — funciona mas vira torre. Bom seria 2x2 ou esconder 1.
- **Scroll indicator** com `writing-mode: vertical-rl` + linha 64 px — em mobile junta com o painel lovable. **Dropar no mobile.**
- **Textarea min-height 56 px** — input é confortável, mas com 4 chips + 3 proofs depois, o painel inteiro ultrapassa os 100vh disponíveis no mobile. Fica scroll obrigatório só pra ver o hint "Enter pra enviar".

**❌ Quebrado:**
- Em iPhone SE (375×667), a soma de [topbar 80 px] + [eyebrow 40 px] + [h1 60 px] + [sub 60 px] + [painel 600 px] já passa de 700 px — **o usuário não vê os chips na primeira dobra.** O CTA primário (input + chips) fica escondido.
- O hero `height: 100vh` em mobile com 100% da viewport vai colapsar — barra de URL do mobile entra e sai mudando o vh. Considerar `100svh` (small viewport height).

**💡 Recomendação:**
```css
@media (max-width: 600px) {
  .hero { height: 100svh; min-height: 720px; }
  .hero-eyebrow { font-size: 10px; letter-spacing: 0.2em; padding: 6px 12px; margin-bottom: 16px; }
  .hero h1 { font-size: clamp(28px, 8vw, 88px); margin-bottom: 8px; }
  .hero-sub { font-size: 13px; max-width: 90vw; }
  .celestial-body { width: 60px; height: 60px; filter: blur(1px); }
  .celestial-body { animation-duration: 60s; } /* mais lento, menos atenção */
  .lovable-panel { padding: 20px 18px 16px; margin-top: 18px; border-radius: 20px; }
  .lovable-logo { width: 48px; height: 48px; }
  .lovable-greeting { font-size: clamp(24px, 7vw, 52px); margin: 12px 0 4px; }
  .lovable-sub { font-size: 13px; margin-bottom: 14px; }
  .lovable-input-wrap { padding: 14px 56px 14px 16px; border-radius: 14px; }
  .lovable-input-wrap textarea { font-size: 14px; min-height: 44px; }
  .lovable-send { width: 36px; height: 36px; bottom: 12px; right: 12px; }
  .lovable-hint { font-size: 10px; margin: 8px 0 12px; }
  .lovable-chips { gap: 6px; margin-bottom: 14px; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .lovable-chips::-webkit-scrollbar { display: none; }
  .chip { font-size: 11px; padding: 6px 12px; flex-shrink: 0; }
  .lovable-proofs { gap: 10px; padding-top: 12px; flex-direction: column; align-items: flex-start; }
  .lovable-proofs span { font-size: 10px; }
  .scroll-indicator { display: none; }
}
```
- **Considerar:** reduzir lista de chips de 4 pra 3 (drop o "Lançamentos em Arapongas" — menos provável click).
- **Considerar:** logo lovable 48 px com border 1 px de amber permanece como sinalizador do brand.

---

### 2.4 Intro 2-col text reveal

**✅ Funciona:**
- `@media (max-width: 900px)` colapsa `grid-template-columns: 1fr` (linha 1019) — OK
- Stats 3-col continua 3-col no mobile (linha 1023 só ajusta `.stats-row` no stats-brutal, NÃO o `.intro-stats`) — verificar

**⚠️ Ajustar:**
- `.intro` `padding: 20vh 8vw` — 20vh em 667 px = 133 px top/bottom. Excessivo. Reduzir pra `12vh` no mobile.
- `.intro h2` `clamp(48px, 6vw, 80px)` — em 360 px gera 48 px. Cabe, mas com `letter-spacing: -0.02em` e `font-family: Syncopate` (display) pode quebrar feio. Sugiro `clamp(36px, 8vw, 80px)`.
- `.intro-text` 20 px com `line-height: 1.7` — adequado mobile.
- `.intro-stats` mantém `grid-template-columns: repeat(3, 1fr)` no mobile — 3 colunas em 360 px = ~120 px por coluna, mas o `.stat-num` `clamp(36px, 4vw, 64px)` gera 36 px de fonte. "8472-F" não cabe em 120 px com 36 px de fonte. **Vai quebrar.**

**❌ Quebrado:**
- "8472-F" em `.stat-num` quebra layout em viewport < 400 px.

**💡 Recomendação:**
```css
@media (max-width: 600px) {
  .intro { padding: 10vh 6vw; gap: 32px; }
  .intro h2 { font-size: clamp(32px, 9vw, 80px); }
  .intro-stats { margin-top: 40px; gap: 16px; grid-template-columns: 1fr 1fr; }
  .intro-stats > div:last-child { grid-column: 1 / -1; } /* CRECI vira full-width */
  .stat-num { font-size: clamp(28px, 9vw, 64px); }
}
```

---

### 2.5 Sticky Card Stack (3 imóveis)

**✅ Funciona:**
- `@media (max-width: 900px)` (linha 1020) colapsa `.card-inner` pra `grid-template-columns: 1fr` + `.card-image { display: none }` — vira layout só texto
- `.card-content` ajusta padding pra `2rem 1.5rem` — OK
- Stack sticky com GSAP ScrollTrigger ainda funciona em mobile, mas o efeito de empilhamento perde graça sem imagem

**⚠️ Ajustar:**
- **Imagem some no mobile** — perde 50% do appeal do imóvel. Pra demo imobiliária, ver o imóvel é ESSENCIAL. Em vez de esconder, colocar a imagem ACIMA do conteúdo.
- `.card-num` `font-size: 80px` continua 80 px no mobile — domina a tela. Reduzir.
- `.card-title` `font-size: 48px` — em 360 px com `letter-spacing: -0.02em` Syncopate "Casa moderna · Centro" pode estourar. Reduzir pra ~32 px.
- `.card-price` `font-size: 56px` — "R$ 1.280.000" em Syncopate 56 px = ~280 px de largura, mas só com 12 caracteres. Provavelmente cabe, mas apertado.
- `.card-specs` `grid-template-columns: repeat(4, 1fr)` — 4 colunas em 320 px de container interno = 80 px cada. "180m²" cabe, mas "Dormitórios" como label abaixo (10 px) fica esmagado.
- **Stack sticky em mobile**: cada card ocupa 80vh com `top: 10vh` — usuário scrolla muito sem mudança visual. Considerar dropar o sticky no mobile e fazer cards em fluxo normal.

**❌ Quebrado:**
- Imagem do imóvel some — bug de produto, não só design.

**💡 Recomendação:**
```css
@media (max-width: 900px) {
  .card-image { display: block !important; height: 220px; position: relative; }
  .card-image img { position: absolute; }
  .card-inner { grid-template-rows: auto 1fr; }
  .card-num { font-size: 48px; }
  .card-title { font-size: clamp(24px, 6vw, 48px); }
  .card-price { font-size: clamp(32px, 8vw, 56px); }
  .card-specs { grid-template-columns: repeat(2, 1fr); gap: 12px; }
}
@media (max-width: 600px) {
  .stack-card { position: relative; top: auto; height: auto; min-height: 70vh; padding: 0 6vw 32px; }
  /* Desliga sticky no mobile — cards em flow */
}
```
- **JS:** wrap o `gsap.to(inner, { scale, opacity ... })` em check `if (window.innerWidth > 900)` ou usar `ScrollTrigger.matchMedia()`.

---

### 2.6 Bairros grid 2x2

**✅ Funciona:**
- `@media (max-width: 900px)` (linha 1024) colapsa `grid-template-columns: 1fr` — vira lista vertical
- Remove `border-left` e `padding-left` no segundo filho (linha 1025) — OK

**⚠️ Ajustar:**
- `.bairros` `padding: 20vh 8vw` — 20vh excessivo no mobile.
- `.bairro-name` `clamp(36px, 4vw, 56px)` — em 360 px gera 36 px. "Jd Tropical" cabe, mas "Industrial" e "Aeroporto" também. OK.
- **Sem `:hover` em mobile** — o estado `opacity:0; transform: translateY(20px)` do `.bairro-meta` faz com que o texto **NUNCA apareça no mobile** (não tem hover em touch). Bug funcional.
- `.bairros-header` colapsa pra 1-col mas mantém `margin-bottom: 12vh` — exagerado.

**❌ Quebrado:**
- **`.bairro-meta` invisível no mobile** — usuário não vê "187 imóveis · ticket médio R$ 680.000". Bug crítico de info.

**💡 Recomendação:**
```css
@media (max-width: 900px) {
  .bairros { padding: 10vh 6vw; }
  .bairros-header { margin-bottom: 6vh; }
  .bairros h2 { font-size: clamp(32px, 9vw, 80px); }
  .bairro { padding: 4vh 0; }
  .bairro-meta { opacity: 1 !important; transform: none !important; }
  .bairro:hover { padding-left: 0; }
}
```

---

### 2.7 Stats Brutal 3-col

**✅ Funciona:**
- `@media (max-width: 900px)` (linha 1023) colapsa `.stats-row` pra `grid-template-columns: 1fr` — vira coluna única vertical
- Counter animation GSAP funciona em mobile

**⚠️ Ajustar:**
- `.stat-brutal-num` `clamp(120px, 18vw, 240px)` — em 360 px gera 120 px (min). Em viewport 360 px o "628" Syncopate 120 px = ~240 px de largura, cabe. Mas o "97%" também — OK.
- `.stats-brutal` `padding: 30vh 6vw` — 30vh = 200 px de padding top/bottom em 667 px. Exagerado. Reduzir.
- Verificar que `letter-spacing: -0.05em` não corta caracteres em telas pequenas.

**❌ Quebrado:** nenhum.

**💡 Recomendação:**
```css
@media (max-width: 600px) {
  .stats-brutal { padding: 15vh 6vw; }
  .stat-brutal-num { font-size: clamp(80px, 25vw, 240px); }
  .stat-brutal-label { font-size: 10px; letter-spacing: 0.25em; }
}
```

---

### 2.8 Footer Parallax

**✅ Funciona:**
- `@media (max-width: 900px)` (linha 1026) colapsa `.footer-ctas` pra `flex-direction: column` — vira lista vertical
- Footer logo bg (60vh) escalado pelo viewport — OK em mobile (60vh = 400 px em iPhone SE)
- `footer-bg-img opacity: 0.15` continua tênue — bom

**⚠️ Ajustar:**
- `footer h2 "VAMOS CONVERSAR"` `clamp(80px, 14vw, 160px)` — em 360 px gera 80 px. "VAMOS" tem ~5 chars × ~60 px = 300 px — cabe. Mas com `letter-spacing: -0.03em` e dois palavras separadas, vai quebrar em 2 linhas. OK estilisticamente.
- `.footer-sub` 22 px em mobile — adequado.
- `.footer-cta` `font-size: clamp(20px, 2vw, 28px)` — em 360 px gera 20 px. "(43) 98847-8713" cabe.
- `.footer-social a` `font-size: 11px` com `letter-spacing: 0.3em` — **touch target ~30 px**, abaixo do mínimo 44 px.
- `footer { padding: 20vh 8vw }` — 20vh excessivo.

**❌ Quebrado:** nenhum.

**💡 Recomendação:**
```css
@media (max-width: 600px) {
  footer { padding: 12vh 6vw; }
  .footer-sub { font-size: 16px; margin: 32px auto 48px; }
  .footer-ctas { gap: 24px; margin-bottom: 48px; }
  .footer-cta { padding-bottom: 16px; }
  .footer-social { gap: 20px; padding-top: 32px; }
  .footer-social a { padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
  .footer-logo-bg { height: 40vh; width: 40vh; }
}
```

---

### 2.9 Noise Overlay

**✅ Funciona:**
- `opacity: 0.04` é sutil — não atrapalha
- `pointer-events: none` — não bloqueia interação
- `mix-blend-mode: overlay` funciona em mobile

**⚠️ Ajustar:**
- SVG filter `feTurbulence` com `baseFrequency="0.9" numOctaves="4"` é **caro de renderizar** em GPU fraca. Em telas < 400 px e em devices Android low-end (Redmi 9A, Moto G), pode causar jank.

**❌ Quebrado:** nenhum.

**💡 Recomendação:**
```css
@media (max-width: 400px) {
  .noise-overlay { display: none; }
}
```

---

## 3. Checklist Priorizado

### 🔴 Crítico (bloqueia demo)

1. **Hero painel lovable não cabe acima da dobra em iPhone SE.** Reduzir greeting, logo, padding, chips e dropar scroll-indicator no mobile. → seção 2.3
2. **`.bairro-meta` invisível no mobile** (depende de `:hover` que não existe em touch). Adicionar `opacity: 1 !important` em `@media (max-width: 900px)`. → seção 2.6, CSS linha 1024
3. **Imagem do imóvel some no card stack** (`@media: .card-image { display: none }`). Reabilitar com `height: 220px; position: relative`. → seção 2.5, CSS linha 1021
4. **`.intro-stats` 3-col com "8472-F" quebra em < 400 px.** Mudar pra 2-col com CRECI full-width. → seção 2.4
5. **Topbar overflow risk em Galaxy Fold (280 px).** Esconder brand-text no mobile, encolher CTA. → seção 2.2

### 🟡 Importante (afeta percepção de qualidade)

6. **Sticky card stack perde graça no mobile** — desligar sticky em `@media (max-width: 600px)`. → seção 2.5
7. **Celestial body 90 px** cobre 25% da tela — reduzir pra 60 px. → seção 2.3
8. **Hero h1 "ENCONTRE SEU LAR" min 40 px** — encolher pra 28 px min. → seção 2.3
9. **Chips em 4 linhas** — scroll horizontal nowrap. → seção 2.3
10. **Padding excessivo de 20vh nas seções intro/bairros/footer** — reduzir pra 10-12vh mobile. → seções 2.4, 2.6, 2.8
11. **Touch targets do footer-social (~30 px)** — adicionar `padding: 12px 8px; min-height: 44px`. → seção 2.8
12. **Touch target do chat-send (32 px)** — não aplica (chat-card escondido no mobile), mas o `.lovable-send` mobile sugerido 36 px ainda está < 44 px. Aumentar pra 44 px. → seção 2.3
13. **Sem menu hamburguer** — implementar drawer na portagem Next. → seção 2.2
14. **Hero usar `100svh` em vez de `100vh`** pra evitar jump quando barra URL aparece/some. → seção 2.3

### 🟢 Polish (nice to have)

15. **Lovable-proofs em coluna vertical no mobile** com gap 10 px. → seção 2.3
16. **Loader letter-spacing reduzido em < 400 px.** → seção 2.1
17. **Noise overlay desligado em < 400 px** pra economizar GPU. → seção 2.9
18. **Stars animação (25 elementos)** — em < 400 px reduzir pra 10 estrelas ou desligar `twinkle` animation (manter estrelas estáticas). → seção 4
19. **Footer logo-bg de 60vh** muito grande em mobile — reduzir pra 40vh. → seção 2.8
20. **Bairros header `margin-bottom: 12vh`** exagerado — reduzir pra 6vh. → seção 2.6
21. **Stats-brutal `padding: 30vh`** exagerado — reduzir pra 15vh. → seção 2.7

---

## 4. Comportamentos a Remover/Desligar em Mobile

| Comportamento | Decisão | Justificativa |
|---|---|---|
| **Smooth scroll Lenis** | Manter, mas com `smoothTouch: false` (já está) | Lenis tem detect interno e não aplica em touch devices. Já está configurado correto. |
| **Parallax hero img (`yPercent: 30`)** | **Desligar em < 900 px** com `ScrollTrigger.matchMedia()` | Em mobile o iOS pode causar jitter ao swipe + reduz LCP perceptivo. |
| **Sticky card stack scrub** | **Desligar em < 900 px** — wrap no `matchMedia` | Sem imagem visível ao lado, o efeito perde sentido. Cards em flow normal. |
| **Stars cintilando (25 elementos × `twinkle 3s`)** | Reduzir pra 10 stars em < 600 px; desligar `twinkle` em < 400 px | 25 animações simultâneas em GPU fraca = jank visível. |
| **Day-night cycle (`animation: 40s`)** | Manter (CSS pure, GPU-acelerada) | Funciona bem mesmo em devices low-end. Reduzir velocidade pra 60s no mobile pra dar menos atenção. |
| **Celestial body sun-arc** | Manter, encolher pra 60 px | Animação central da identidade do hero. |
| **Noise overlay (SVG feTurbulence)** | **Dropar em < 400 px** | SVG filter caro de renderizar. Em alta densidade (DPR 3) é ainda pior. |
| **Counter animations (intro-stats + stats-brutal)** | Manter | ScrollTrigger `once: true` e duração curta. Tudo OK. |
| **GSAP hero entrance timeline (delay 2.2s)** | Manter | Cinematic, vale a impressão na demo. |
| **Loader 1.5s fixo** | Manter | Demo precisa do beat dramático. |

---

## 5. Touch Targets

> **Apple HIG: mínimo 44×44 px. Material Design: 48×48 dp.**

| Elemento | Estado atual mobile | Status |
|---|---|---|
| Topbar logo + brand | ~120×32 px (32 px altura) | ⚠️ 32 px < 44 |
| Topbar CTA "Falar com a IA" | ~140×44 px (com padding 12px vertical) | ✅ OK |
| Nav links (Comprar/Alugar/etc) | `display: none` no mobile | N/A |
| Lovable textarea | ~290×56 px | ✅ OK |
| Lovable send button | 40×40 px (sugiro mobile 36, mas ideal 44) | ❌ < 44 |
| Lovable chips | ~140×32 px (8 px padding vertical) | ❌ 32 px < 44 |
| Lovable proofs (texto, não clicável) | N/A | N/A |
| Scroll indicator | ~16×80 px (não interativo) | N/A |
| Stack card CTA "Ver detalhes →" | ~140×24 px (text + 4 px border-bottom) | ❌ 24 px < 44 |
| Bairro (cada card) | ~360×~120 px (6vh padding) | ✅ OK |
| Footer-cta WhatsApp | ~200×~80 px (cada um) | ✅ OK |
| Footer-social a | ~100×~16 px (font 11 px sem padding) | ❌ 16 px < 44 |
| Chat IA card | `display: none` no mobile | N/A |

**Resumo:** 5 violações de touch target. As 3 mais críticas:
- **Chips do hero** (32 px) — usuários vão errar o click
- **Footer-social** (16 px) — quase impossível clicar com dedo
- **Stack card CTA "Ver detalhes"** (24 px) — usuário pode tentar tocar o card inteiro, mas o `border-bottom` indica click só no texto

**Fix:** adicionar `padding: 12px 0; min-height: 44px; display: inline-flex; align-items: center;` em todos os elementos < 44 px.

---

## 6. Performance

### Bundle JS atual (CDN)

| Recurso | Tamanho (min+gzip estimado) | Bloqueia render? |
|---|---|---|
| `tailwindcss` (CDN script) | ~290 kB (não otimizado, runtime JIT) | **SIM** — bloqueia até carregar |
| `gsap.min.js` 3.12.5 | ~50 kB | Async-friendly |
| `ScrollTrigger.min.js` | ~30 kB | Async-friendly |
| `lenis.min.js` 1.0.33 | ~12 kB | Async-friendly |
| Google Fonts (Syncopate + Manrope) | ~80 kB total | Preconnect ajuda mas ainda bloqueia |
| `frente-imob.webp` | ? kB (verificar) | LCP element |
| `imovel-1/2/3.webp` (card stack) | ? kB cada | Lazy possível |
| `imovel-5.webp` (footer bg) | ? kB | Lazy |
| `logo-d.png` (4 ocorrências) | ? kB | Otimizar pra SVG |
| **TOTAL JS ~382 kB** | | |

### LCP estimado em 4G slow (1.6 Mbps, RTT 300ms)

- HTML parsing: ~200 ms
- CSS + fonts: ~800 ms (preconnect + cache)
- Tailwind CDN: ~1500 ms (290 kB)
- GSAP + Plugins: ~500 ms
- Hero img webp: depende do tamanho — assumindo 200 kB = ~1000 ms
- GSAP delay de 2.2s antes de mostrar hero h1

**LCP estimado: ~3.5-4.5 s em 4G slow.**

**Target Lighthouse mobile ≥ 85:** LCP < 2.5 s. Não atinge com setup atual.

### Trade-offs pra bater Lighthouse mobile ≥ 85

1. **Tirar Tailwind CDN** — só pra demo, pode ficar. Pra prod (portagem Next), Tailwind build-time corta ~250 kB.
2. **Bundle GSAP só com plugins usados** — usar `gsap-core` + import só `ScrollTrigger` → ~40 kB economia.
3. **Comprimir `frente-imob.webp`** com `cwebp -q 75` — alvo < 100 kB.
4. **`fetchpriority="high"` no hero img + preload** no `<head>`.
5. **Dropar fonts não usadas** — Manrope tem 3 pesos (300, 400, 700). Considerar dropar 700 ou usar `font-display: swap`.
6. **Adiar GSAP delay** — em vez de `delay: 2.2`, fazer entrance imediato em mobile (não vê o loader animar 1.5s + delay 0.7s = 2.2s).
7. **Lazy load imagens** abaixo da dobra com `loading="lazy"`.

**Pra demo (cabo + WiFi):** stack atual funciona. Pra portagem Next (target Lighthouse ≥ 85): refatorar conforme acima.

---

## 7. Adaptação pra Portagem Next (Fase 3)

### Mapping `@media` → Tailwind responsive

| CSS atual | Tailwind equivalente | Notas |
|---|---|---|
| `@media (max-width: 600px)` | `sm:` (640 px breakpoint default) | Quase igual, ajustar |
| `@media (max-width: 900px)` | `md:` (768 px) ou `lg:` (1024 px) | Sugiro `lg:` pra cobrir tablets |
| `clamp(28px, 8vw, 88px)` | Manter clamp inline ou definir custom utility | shadcn já tem `text-display-1` |
| `grid-template-columns: 1fr 1fr` | `grid-cols-2` | Direto |
| `display: none` mobile | `hidden md:block` | Pra elementos só desktop |

### Onde usar `next/image`

| Elemento | Estratégia |
|---|---|
| `frente-imob.webp` (hero) | `<Image priority fill sizes="100vw" />` + preload |
| `imovel-1/2/3.webp` (cards) | `<Image fill sizes="(min-width: 1024px) 50vw, 100vw" loading="lazy" />` |
| `imovel-5.webp` (footer bg) | `<Image fill sizes="100vw" loading="lazy" quality={60} />` (opacity 0.15, pode comprimir mais) |
| `logo-d.png` (4x na página) | **Converter pra SVG dedicado** (sem precisar do crop trick `width: 290%`) — economiza 4 requests e elimina o hack |

### Estratégia de hidratação

Componentes que precisam de `"use client"`:
- `<HeroLovablePanel />` — textarea state, placeholder rotativo, chips onClick
- `<ChatWidget />` — já existe no projeto
- `<SmoothScrollProvider />` — Lenis init
- `<HeroAnimations />` — GSAP timeline (delay 2.2s)
- `<StatsCounter />` — IntersectionObserver + counter
- `<TopbarFade />` — scroll listener

Resto (loader, bairros, footer, stats-brutal labels) pode ser **server component** estático.

**Estrutura sugerida:** `apps/web/src/app/portal/(landing)/page.tsx` (server) importa `<HeroSection />` (client) e `<BairrosSection />` (server).

### GSAP + ScrollTrigger no Next

- Importar via dynamic import com `ssr: false`:
  ```tsx
  const GsapAnimations = dynamic(() => import('./gsap-animations'), { ssr: false });
  ```
- Wrap em `useEffect` + cleanup `ScrollTrigger.killAll()` no unmount
- Lenis: usar provider no `RootLayout` (`"use client"`)

### `prefers-reduced-motion`

Manter o CSS atual já está bom. No JS, adicionar:
```ts
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // skip GSAP timeline
```

---

## 8. Como Testar Mobile Localmente

### DevTools Chrome

1. Abrir `e:/Projetos/Dinamic_Imob/docs/portal-mockups/A-editorial-noir.html` no Chrome
2. `F12` → **Device toolbar** (`Ctrl+Shift+M`)
3. Testar nesses devices em ordem:
   - **iPhone SE** (375×667) — viewport pequeno, garantir que tudo cabe
   - **iPhone 14 Pro** (393×852) — viewport médio, target real do cliente
   - **Samsung Galaxy S22** (360×800) — Android comum
   - **Galaxy Fold (closed)** (280×653) — viewport extremo, verificar overflow
   - **iPad Mini** (768×1024) — breakpoint de transição

### Lighthouse Mobile Audit

1. DevTools → tab **Lighthouse**
2. Mode: **Navigation** · Device: **Mobile** · Categories: **Performance + Accessibility + SEO**
3. Throttling: **Simulated throttling (default)** — equivale a 4G slow
4. Click **Analyze page load**
5. Targets: LCP < 2.5 s · CLS < 0.1 · FID < 100ms · Score ≥ 85

### Teste em celular real (recomendado)

1. Servir a pasta com `npx serve` ou via Python:
   ```powershell
   cd "e:/Projetos/Dinamic_Imob/docs/portal-mockups"
   npx serve -p 5500
   ```
2. Pegar IP local do PC:
   ```powershell
   ipconfig | findstr IPv4
   ```
   (algo como `192.168.0.42`)
3. No celular (mesma rede WiFi), abrir `http://192.168.0.42:5500/A-editorial-noir.html`
4. **Importante:** desabilitar Wi-Fi e testar via 4G/5G real pra ver LCP real (não emulado).
5. Safari iOS: ativar **Web Inspector** no celular → conectar via cabo USB → Mac Safari → Develop menu → escolher iPhone.
6. Chrome Android: `chrome://inspect` no desktop com cabo USB conectado.

### Checklist visual rápido (10 min)

- [ ] Loader aparece e some em 1.5s sem flash
- [ ] Topbar não quebra em 2 linhas
- [ ] Hero h1 "ENCONTRE SEU LAR" cabe em 1 linha
- [ ] Painel lovable visível com input + ao menos 1 chip acima da dobra
- [ ] Animação day-night roda smooth (sol cruza o céu)
- [ ] Bairros mostra meta ("187 imóveis...") sem precisar hover
- [ ] Card stack mostra imagem do imóvel
- [ ] Stats-brutal números não estouram tela
- [ ] Footer CTAs WhatsApp clicáveis
- [ ] Sem scroll horizontal em nenhum ponto da página
- [ ] Sem console errors no DevTools

---

## Apêndice: Patch CSS consolidado pronto pra colar

Substituir o bloco `@media (max-width: 900px)` (linhas 1014-1027) por:

```css
/* ============ RESPONSIVE (mobile-first refinement) ============ */
@media (max-width: 1024px) {
  .topbar nav { display: none; }
  .topbar { grid-template-columns: 1fr auto; }
  .hero-content { max-width: 92vw; }
  .chat-card { display: none; }
  .intro, .bairros-header { grid-template-columns: 1fr; gap: 48px; }
  .card-inner { grid-template-columns: 1fr; grid-template-rows: 220px 1fr; }
  .card-image { display: block; }
  .card-image img { position: absolute; }
  .card-content { padding: 2rem 1.5rem; }
  .stats-row { grid-template-columns: 1fr; gap: 6vh; }
  .bairros-grid { grid-template-columns: 1fr; }
  .bairro:nth-child(2n) { border-left: none; padding-left: 0; }
  .bairro-meta { opacity: 1 !important; transform: none !important; }
  .bairro:hover { padding-left: 0; }
  .footer-ctas { flex-direction: column; align-items: center; gap: 32px; }
}

@media (max-width: 600px) {
  /* Hero */
  .hero { height: 100svh; min-height: 720px; }
  .hero-eyebrow { font-size: 10px; letter-spacing: 0.2em; padding: 6px 12px; margin-bottom: 16px; }
  .hero h1 { font-size: clamp(28px, 8vw, 88px); }
  .hero-sub { font-size: 13px; }
  .celestial-body { width: 60px; height: 60px; filter: blur(1px); animation-duration: 60s; }
  .scroll-indicator { display: none; }

  /* Lovable Panel */
  .lovable-panel { padding: 20px 18px 16px; margin-top: 18px; border-radius: 20px; }
  .lovable-logo { width: 48px; height: 48px; }
  .lovable-greeting { font-size: clamp(24px, 7vw, 52px); margin: 12px 0 4px; }
  .lovable-sub { font-size: 13px; margin-bottom: 14px; }
  .lovable-input-wrap { padding: 14px 56px 14px 16px; border-radius: 14px; }
  .lovable-input-wrap textarea { font-size: 14px; min-height: 44px; }
  .lovable-send { width: 44px; height: 44px; bottom: 10px; right: 10px; }
  .lovable-hint { font-size: 10px; margin: 8px 0 12px; }
  .lovable-chips { gap: 6px; margin-bottom: 14px; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
  .lovable-chips::-webkit-scrollbar { display: none; }
  .chip { font-size: 11px; padding: 10px 14px; flex-shrink: 0; min-height: 44px; display: inline-flex; align-items: center; }
  .lovable-proofs { gap: 10px; padding-top: 12px; flex-direction: column; align-items: flex-start; }
  .lovable-proofs span { font-size: 10px; }

  /* Topbar */
  .topbar { padding: 16px 5vw; }
  .topbar .brand-text { display: none; }
  .topbar .cta { padding: 10px 16px; font-size: 10px; letter-spacing: 0.15em; }

  /* Intro */
  .intro { padding: 10vh 6vw; gap: 32px; }
  .intro h2 { font-size: clamp(32px, 9vw, 80px); }
  .intro-stats { margin-top: 40px; gap: 16px; grid-template-columns: 1fr 1fr; }
  .intro-stats > div:last-child { grid-column: 1 / -1; }
  .stat-num { font-size: clamp(28px, 9vw, 64px); }

  /* Card Stack */
  .stack-card { position: relative; top: auto; height: auto; min-height: 70vh; padding: 0 6vw 32px; }
  .card-num { font-size: 48px; }
  .card-title { font-size: clamp(24px, 6vw, 48px); }
  .card-price { font-size: clamp(32px, 8vw, 56px); }
  .card-specs { grid-template-columns: repeat(2, 1fr); gap: 12px; }

  /* Bairros */
  .bairros { padding: 10vh 6vw; }
  .bairros-header { margin-bottom: 6vh; }
  .bairros h2 { font-size: clamp(32px, 9vw, 80px); }
  .bairro { padding: 4vh 0; }

  /* Stats Brutal */
  .stats-brutal { padding: 15vh 6vw; }
  .stat-brutal-num { font-size: clamp(80px, 25vw, 240px); }
  .stat-brutal-label { font-size: 10px; letter-spacing: 0.25em; }

  /* Footer */
  footer { padding: 12vh 6vw; }
  .footer-sub { font-size: 16px; margin: 32px auto 48px; }
  .footer-ctas { gap: 24px; margin-bottom: 48px; }
  .footer-cta { padding-bottom: 16px; }
  .footer-social { gap: 20px; padding-top: 32px; }
  .footer-social a { padding: 12px 8px; min-height: 44px; display: inline-flex; align-items: center; }
  .footer-logo-bg { height: 40vh; width: 40vh; }
}

@media (max-width: 400px) {
  #loader { gap: 24px; }
  #loader .loader-sub { letter-spacing: 0.2em; font-size: 11px; }
  .noise-overlay { display: none; }
  /* Stars: reduzir twinkle pra estáticas */
  .stars .star { animation: none !important; opacity: 0.5; }
}

@media (max-width: 380px) {
  .topbar .cta span:not(.dot) { display: none; }
}
```

JS adicional pra desligar parallax + sticky em mobile (substituir bloco `gsap.to('.hero-img', ...)` e `stackCards.forEach(...)`):

```js
ScrollTrigger.matchMedia({
  '(min-width: 901px)': function() {
    // Hero parallax
    gsap.to('.hero-img', {
      yPercent: 30, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Card stack scrub
    const stackCards = document.querySelectorAll('.stack-card');
    stackCards.forEach((card, i) => {
      if (i === stackCards.length - 1) return;
      const inner = card.querySelector('.card-inner');
      gsap.to(inner, {
        scale: 0.92, opacity: 0.4, ease: 'none',
        scrollTrigger: { trigger: stackCards[i + 1], start: 'top bottom', end: 'top 10vh', scrub: true }
      });
    });
  }
});
```

---

**Fim do documento.** Estimativa de tempo pra aplicar Crítico + Importante: **2-3 horas** com testes em DevTools + iPhone real.
