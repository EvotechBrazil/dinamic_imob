/**
 * Event bus client-side via window.dispatchEvent / CustomEvent.
 * USO CLIENT-ONLY (guarda contra SSR via typeof window).
 *
 * Permite comunicação loose-coupled entre componentes da landing demo
 * (ex.: chat IA agenda visita → CRM kanban refresca → Tarefas refresca).
 */

export type DinamicEvent =
  | "dinamic:open-chat-widget"
  | "dinamic:chat-ended"
  | "dinamic:lead-added"
  | "dinamic:task-created"
  | "dinamic:task-updated"
  | "dinamic:contract-closed"
  | "dinamic:visit-scheduled"
  | "dinamic:tasks-refresh";

/** Dispara CustomEvent global. No-op em SSR. */
export function dispatchAppEvent(name: DinamicEvent, detail?: unknown): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

/**
 * Escuta evento global. Retorna função de cleanup (chame no useEffect return).
 * No-op em SSR; cleanup sempre seguro de chamar.
 */
export function onAppEvent(
  name: DinamicEvent,
  handler: (e: CustomEvent) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const wrapped = (e: Event) => handler(e as CustomEvent);
  window.addEventListener(name, wrapped);
  return () => window.removeEventListener(name, wrapped);
}
