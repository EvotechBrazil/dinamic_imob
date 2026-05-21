// ============================================================
// Dinamic — Espera os 3 servicos (Postgres / Redis / Meili)
// ficarem saudaveis depois de `pnpm db:up`.
// Uso: pnpm db:wait
// ============================================================

import net from "node:net";

const services = [
  { name: "Postgres", host: "localhost", port: 5436 },
  { name: "Redis", host: "localhost", port: 6382 },
  { name: "Meilisearch", host: "localhost", port: 7700 },
];

const MAX_TRIES = 30;
const DELAY_MS = 1000;

function checkPort(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const onError = () => {
      socket.destroy();
      resolve(false);
    };
    socket.setTimeout(2000);
    socket.once("error", onError);
    socket.once("timeout", onError);
    socket.connect(port, host, () => {
      socket.end();
      resolve(true);
    });
  });
}

async function waitFor(svc) {
  process.stdout.write(`  ${svc.name.padEnd(12)} (${svc.host}:${svc.port}) ... `);
  for (let i = 0; i < MAX_TRIES; i++) {
    if (await checkPort(svc.host, svc.port)) {
      console.log("OK");
      return true;
    }
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }
  console.log("FALHOU");
  return false;
}

console.log("Esperando servicos ficarem prontos:");
let allOk = true;
for (const svc of services) {
  if (!(await waitFor(svc))) allOk = false;
}

if (!allOk) {
  console.error("\nAlgum servico nao subiu. Rode: pnpm db:logs");
  process.exit(1);
}
console.log("\nTudo pronto.");
