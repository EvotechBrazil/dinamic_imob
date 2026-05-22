/**
 * Parser do marker [[AGENDAMENTO]]{json}[[/AGENDAMENTO]] que a IA pode incluir
 * no final da resposta quando coleta todos os dados de agendamento.
 *
 * Estratégia:
 *  - Procura literalmente as tags "[[AGENDAMENTO]]" e "[[/AGENDAMENTO]]".
 *  - Se ambas existem na ordem certa, extrai o JSON entre elas.
 *  - Retorna o texto SEM as tags + payload parseado (ou null se ausente/inválido).
 *  - Tolera espaços, quebras de linha e código markdown ao redor (```json ... ```).
 */

export interface AgendamentoRaw {
  nome?: unknown;
  whatsapp?: unknown;
  imovelId?: unknown;
  periodo?: unknown;
}

export interface AgendamentoMarker {
  nome: string;
  whatsapp: string;
  imovelId: string;
  periodo: string;
}

export interface ExtractResult {
  visibleText: string;
  marker: AgendamentoMarker | null;
}

export function extractAgendamentoMarker(input: string): ExtractResult {
  const OPEN = "[[AGENDAMENTO]]";
  const CLOSE = "[[/AGENDAMENTO]]";

  const openIdx = input.indexOf(OPEN);
  if (openIdx === -1) return { visibleText: input, marker: null };

  const closeIdx = input.indexOf(CLOSE, openIdx + OPEN.length);
  if (closeIdx === -1) {
    // Sem fechamento — pode ser stream ainda incompleto; remove só do open pra frente,
    // mas como aqui o input já é completo, considera marker ausente.
    return { visibleText: input, marker: null };
  }

  const inner = input.slice(openIdx + OPEN.length, closeIdx).trim();
  // Strip ```json ... ``` se vier wrapped
  const cleaned = inner
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  let raw: AgendamentoRaw;
  try {
    raw = JSON.parse(cleaned) as AgendamentoRaw;
  } catch {
    // JSON inválido — mantém texto visível mas sem marker
    const visibleText =
      input.slice(0, openIdx) + input.slice(closeIdx + CLOSE.length);
    return { visibleText: visibleText.trimEnd(), marker: null };
  }

  const marker = validateMarker(raw);

  const before = input.slice(0, openIdx);
  const after = input.slice(closeIdx + CLOSE.length);
  // Remove qualquer linha em branco residual onde estava o bloco
  const visibleText = (before + after).replace(/\n{3,}/g, "\n\n").trimEnd();

  return { visibleText, marker };
}

function validateMarker(raw: AgendamentoRaw): AgendamentoMarker | null {
  if (
    typeof raw.nome !== "string" ||
    typeof raw.whatsapp !== "string" ||
    typeof raw.imovelId !== "string" ||
    typeof raw.periodo !== "string"
  ) {
    return null;
  }
  const nome = raw.nome.trim();
  const whatsapp = raw.whatsapp.trim();
  const imovelId = raw.imovelId.trim();
  const periodo = raw.periodo.trim();
  if (!nome || !whatsapp || !imovelId || !periodo) return null;
  return { nome, whatsapp, imovelId, periodo };
}
