import Link from "next/link";
import {
  ArrowRightLeft,
  ArrowUpRight,
  CalendarClock,
  Database,
  Inbox,
  Sparkles,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatBRL } from "@/lib/utils";
import { RelativeTime } from "@/components/ui/relative-time";
import type { AgentAction, AgentRun } from "@/lib/mock-types";

const ACTION_META: Record<
  AgentAction,
  { label: string; icon: LucideIcon; color: string; bg: string }
> = {
  classify: {
    label: "Classify",
    icon: Tag,
    color: "text-sky-600",
    bg: "bg-sky-100",
  },
  "rag-search": {
    label: "RAG search",
    icon: Database,
    color: "text-violet-600",
    bg: "bg-violet-100",
  },
  "propose-visit": {
    label: "Propose visit",
    icon: CalendarClock,
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
  handoff: {
    label: "Handoff",
    icon: ArrowRightLeft,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  "collect-info": {
    label: "Collect info",
    icon: Sparkles,
    color: "text-primary",
    bg: "bg-primary/10",
  },
};

interface AgentRunsSidebarProps {
  runs: AgentRun[];
}

export function AgentRunsSidebar({ runs }: AgentRunsSidebarProps) {
  const totalIn = runs.reduce((s, r) => s + r.tokensIn, 0);
  const totalOut = runs.reduce((s, r) => s + r.tokensOut, 0);
  const totalCost = runs.reduce((s, r) => s + r.costBRL, 0);

  return (
    <div className="flex h-full flex-col border-l border-border bg-surface">
      {/* Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-sm font-semibold text-ink">Agent runs</h3>
          </div>
          <Badge variant="success" className="text-[10px]">
            ao vivo
          </Badge>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          Cada passo da IA nessa conversa — totalmente auditável.
        </p>
        <Link
          href="/admin/inbox"
          className="group mt-2.5 flex items-center justify-between gap-2 rounded-lg bg-primary px-3 py-2 text-[12px] font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
        >
          <span className="flex items-center gap-1.5">
            <Inbox className="h-3.5 w-3.5" />
            Abrir Dinamic Channel
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Lista */}
      <ScrollArea className="min-h-0 flex-1">
        <ol className="relative px-4 py-4">
          {/* Linha vertical do timeline */}
          <span
            aria-hidden
            className="absolute bottom-4 left-[27px] top-4 w-px bg-border"
          />
          {runs.map((run) => (
            <RunCard key={run.id} run={run} />
          ))}
        </ol>
      </ScrollArea>

      {/* Footer com totais */}
      <div className="border-t border-border bg-app/40 px-4 py-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-muted">
              Tokens IN
            </p>
            <p className="mt-0.5 font-display text-sm font-bold text-ink">
              {totalIn}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-muted">
              Tokens OUT
            </p>
            <p className="mt-0.5 font-display text-sm font-bold text-ink">
              {totalOut}
            </p>
          </div>
          <div>
            <p className="text-[9px] font-medium uppercase tracking-wider text-muted">
              Custo total
            </p>
            <p className="mt-0.5 font-display text-sm font-bold text-primary">
              {formatBRL(totalCost)}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

function RunCard({ run }: { run: AgentRun }) {
  const meta = ACTION_META[run.action];
  const Icon = meta.icon;

  return (
    <li className="relative mb-3 pl-10 last:mb-0">
      {/* Bolinha do timeline */}
      <span
        className={cn(
          "absolute left-2.5 top-2 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-surface",
          meta.bg
        )}
      >
        <Icon className={cn("h-3 w-3", meta.color)} />
      </span>

      <div className="rounded-lg border border-border bg-surface p-2.5 shadow-sm transition-colors hover:border-primary/40">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-ink">
            {meta.label}
          </span>
          <RelativeTime ts={run.ts} className="text-[10px] text-muted" />
        </div>
        <p className="mt-1 line-clamp-1 text-xs leading-snug text-muted">
          {run.detail}
        </p>
        <div className="mt-2 flex items-center justify-between text-[10px]">
          <span className="font-mono text-muted">
            <span className="text-emerald-600">↑{run.tokensIn}</span>
            <span className="mx-1 text-border">/</span>
            <span className="text-sky-600">↓{run.tokensOut}</span>
          </span>
          <span className="rounded-md bg-primary/5 px-1.5 py-0.5 font-mono font-semibold text-primary">
            {formatBRL(run.costBRL)}
          </span>
        </div>
      </div>
    </li>
  );
}
