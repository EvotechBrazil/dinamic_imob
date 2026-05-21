// ============================================================
// Dinamic Imobiliária — Smoke test OpenRouter
// Modelo: qwen/qwen3.7-max (streaming)
// ============================================================
// Como rodar:  node scripts/test-openrouter.mjs
// Requer:      .env.local com OPENROUTER_API_KEY
// ============================================================

import dotenv from "dotenv";
import { OpenRouter } from "@openrouter/sdk";

// Carrega .env.local primeiro (segredos locais), depois .env (fallback)
dotenv.config({ path: ".env.local" });
dotenv.config();

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error("ERRO: OPENROUTER_API_KEY ausente. Confira .env.local na raiz.");
  process.exit(1);
}

const openrouter = new OpenRouter({ apiKey });

const model = process.env.OPENROUTER_DEFAULT_MODEL ?? "qwen/qwen3.7-max";

const systemPrompt = `Voce e a IA da Dinamic Imobiliaria, imobiliaria de Arapongas-PR.
Tom: profissional caloroso. Usa "voce", sem girias, no maximo 1 emoji por mensagem.
Como corretor experiente que escuta. Direto ao ponto mas humano.
NUNCA inventar disponibilidade de imovel. NUNCA prometer desconto sem aprovacao.
NUNCA confirmar visita sem agenda. Sempre encaminhar humano em negociacao.`;

const userMessage =
  "Oi! Quero alugar um apartamento de 3 dormitorios no Jardim Tropical, ate R$ 2500. Tem alguma coisa?";

console.log(`\n=== Dinamic IA smoke test ===`);
console.log(`Modelo: ${model}`);
console.log(`User: ${userMessage}\n`);
console.log(`IA: `);

const stream = await openrouter.chat.send({
  httpReferer: process.env.OPENROUTER_APP_URL ?? "https://dinamicimoveis.com.br",
  appTitle: process.env.OPENROUTER_APP_NAME ?? "Dinamic Imobiliaria",
  chatRequest: {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    stream: true,
  },
});

let totalChars = 0;
let usage = null;
const t0 = Date.now();
let firstTokenAt = null;

for await (const chunk of stream) {
  const content = chunk.choices?.[0]?.delta?.content;
  if (content) {
    if (firstTokenAt === null) firstTokenAt = Date.now() - t0;
    process.stdout.write(content);
    totalChars += content.length;
  }
  // Usage chega no chunk final (com reasoningTokens se modelo for de reasoning)
  if (chunk.usage) usage = chunk.usage;
}

const totalMs = Date.now() - t0;
console.log(`\n\n=== Metricas ===`);
console.log(`Primeiro token:  ${firstTokenAt ?? "n/a"} ms`);
console.log(`Tempo total:     ${totalMs} ms`);
console.log(`Caracteres:      ${totalChars}`);
console.log(`Throughput:      ${(totalChars / (totalMs / 1000)).toFixed(0)} chars/s`);

if (usage) {
  console.log(`\n=== Usage ===`);
  console.log(`Prompt tokens:     ${usage.promptTokens}`);
  console.log(`Completion tokens: ${usage.completionTokens}`);
  console.log(`Reasoning tokens:  ${usage.reasoningTokens ?? 0}`);
  console.log(`Total tokens:      ${usage.totalTokens}`);
  if (usage.cost !== undefined) {
    console.log(`Custo USD:         $${usage.cost?.toFixed?.(6) ?? usage.cost}`);
    console.log(`Custo BRL approx:  R$ ${(usage.cost * 5.0).toFixed(4)}`);
  }
}
