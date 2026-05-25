/**
 * Coordenadas dos pins de imoveis no mapa SVG estilizado de Arapongas-PR.
 *
 * Consumido por: `apps/web/src/components/portal/arapongas-map.tsx`
 * SVG viewBox: 0 0 1920 1080.
 *
 * Clusters base (centroides aproximados dos 4 bairros principais do /portal):
 *   - Centro            ~(960, 540)
 *   - Jardim Tropical   ~(480, 380)
 *   - Industrial        ~(1248, 700)
 *   - Aeroporto         ~(1536, 320)
 *
 * Bairros sem cluster proprio foram aproximados ao vizinho geografico mais
 * coerente:
 *   - Jardim Universitario  -> mini-cluster entre Centro e Jd Tropical (SW)
 *   - Jardim Bandeirantes   -> proximo ao Industrial (rota norte)
 *   - Vale do Sol           -> entre Centro e Aeroporto (NE de Centro)
 *   - Vila Industrial       -> proximo do Industrial
 *
 * Regras seguidas:
 *   - Coordenadas distintas para os 12 pins (sem duplicatas).
 *   - Pins do mesmo bairro ficam dentro de ~120px do centro do cluster.
 *   - Offsets variados (nao em linha reta) para evitar sobreposicao.
 *   - Margem minima de 80px das bordas do viewBox.
 */

import { PROPERTIES } from "@/components/sections/crm/mock";
import type { Property } from "@/lib/mock-types";

export interface PortalImovelMapPin {
  property: Property;
  cx: number; // 0-1920 (SVG viewBox X)
  cy: number; // 0-1080 (SVG viewBox Y)
}

/**
 * Localiza um imovel por id no PROPERTIES e lanca erro se faltar.
 * Garante que o modulo nao fique silenciosamente quebrado se o mock mudar.
 */
function byId(id: string): Property {
  const property = PROPERTIES.find((p) => p.id === id);
  if (!property) {
    throw new Error(
      `[portal-imoveis-coords] Imovel "${id}" nao encontrado em PROPERTIES. ` +
        `Verifique apps/web/src/components/sections/crm/mock.ts.`,
    );
  }
  return property;
}

export const PORTAL_IMOVEIS_MAP: ReadonlyArray<PortalImovelMapPin> = [
  // Centro (cluster ~960,540) — im-001, im-004, im-009
  { property: byId("im-001"), cx: 920, cy: 500 },
  // Jardim Tropical (cluster ~480,380) — im-002, im-010
  { property: byId("im-002"), cx: 440, cy: 360 },
  // Jardim Universitario (mini-cluster SW, entre Centro e Tropical) — im-003, im-011
  { property: byId("im-003"), cx: 560, cy: 480 },
  // Centro
  { property: byId("im-004"), cx: 1010, cy: 580 },
  // Jardim Bandeirantes (proximo ao Industrial, ligeiramente norte) — im-005
  { property: byId("im-005"), cx: 1180, cy: 620 },
  // Vale do Sol (NE de Centro, rumo ao Aeroporto) — im-006
  { property: byId("im-006"), cx: 1240, cy: 450 },
  // Aeroporto (cluster ~1536,320) — im-007
  { property: byId("im-007"), cx: 1530, cy: 320 },
  // Vila Industrial (proximo ao cluster Industrial) — im-008
  { property: byId("im-008"), cx: 1290, cy: 760 },
  // Centro
  { property: byId("im-009"), cx: 880, cy: 600 },
  // Jardim Tropical
  { property: byId("im-010"), cx: 520, cy: 320 },
  // Jardim Universitario
  { property: byId("im-011"), cx: 620, cy: 420 },
  // Industrial (cluster ~1248,700) — im-012
  { property: byId("im-012"), cx: 1210, cy: 720 },
] as const;
