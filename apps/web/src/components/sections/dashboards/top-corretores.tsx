"use client";

/**
 * <TopCorretores />
 * Lista 5 corretores do mês com avatar (fallback iniciais), barra horizontal
 * proporcional ao volume de leads e pill de conversão colorida por threshold.
 * 1º lugar recebe ícone Award amber.
 */

import { Award } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, initials } from "@/lib/utils";

import { TOP_CORRETORES } from "./mock";

// Avatares pravatar pra fallback visual realista (não vaza dado real)
const AVATAR_URLS: Record<string, string> = {
  "Rodrigo Almeida": "https://i.pravatar.cc/150?img=12",
  "Patrícia Santos": "https://i.pravatar.cc/150?img=44",
  "Marcos Ferreira": "https://i.pravatar.cc/150?img=33",
  "Helena Costa": "https://i.pravatar.cc/150?img=47",
  "Caio Mendes": "https://i.pravatar.cc/150?img=15",
};

/** Cor do pill de conversão por threshold. */
function pillClass(conv: number): string {
  if (conv >= 30) return "bg-emerald-100 text-emerald-700";
  if (conv >= 20) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

export function TopCorretores() {
  const maxLeads = Math.max(...TOP_CORRETORES.map((c) => c.leads));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Top corretores do mês
        </CardTitle>
        <CardDescription>
          Ranking por leads atribuídos e taxa de conversão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ol role="list" className="space-y-4">
          {TOP_CORRETORES.map((c, i) => {
            const isFirst = i === 0;
            const widthPct = Math.max(8, (c.leads / maxLeads) * 100);

            return (
              <li key={c.name} className="flex items-center gap-3">
                {/* Posição + Avatar */}
                <div className="relative flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={AVATAR_URLS[c.name]}
                      alt={c.name}
                    />
                    <AvatarFallback>{initials(c.name)}</AvatarFallback>
                  </Avatar>
                  {isFirst && (
                    <span
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 shadow-sm ring-2 ring-surface"
                      aria-label="1º lugar"
                    >
                      <Award className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>

                {/* Nome + barra de proporção */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-ink">
                      {c.name}
                    </p>
                    <p className="flex-shrink-0 text-xs text-muted">
                      {c.leads} leads
                    </p>
                  </div>
                  <div
                    className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-valuenow={c.leads}
                    aria-valuemin={0}
                    aria-valuemax={maxLeads}
                    aria-label={`${c.name}: ${c.leads} leads`}
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>

                {/* Pill conversão */}
                <span
                  className={cn(
                    "flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                    pillClass(c.conversao)
                  )}
                >
                  {c.conversao}%
                </span>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
