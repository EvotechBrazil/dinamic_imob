"use client";

import * as React from "react";
import { Building2, Home, Key } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type {
  IntencaoLead,
  Lead,
  LeadStatus,
  Setor,
} from "@/lib/mock-types";
import { LEAD_STATUS_LABELS, SETOR_LABELS } from "@/lib/mock-types";

interface NewLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Coluna sugerida ao abrir (quando vem do "+" da coluna). */
  defaultStatus?: LeadStatus;
  onCreate: (lead: Lead) => void;
}

const STATUS_OPTIONS: LeadStatus[] = [
  "novo",
  "contatado",
  "qualificado",
  "visita",
  "proposta",
];

const SETOR_OPTIONS: Setor[] = ["vendas", "locacao", "captacao", "financeiro"];

const BAIRROS = [
  "Centro",
  "Jardim Tropical",
  "Jardim Universitário",
  "Jardim Bandeirantes",
  "Vale do Sol",
  "Industrial",
  "Aeroporto",
  "Vila Industrial",
];

const INTENCAO_OPTIONS: {
  id: IntencaoLead;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "aluguel", label: "Alugar", icon: <Key className="h-3.5 w-3.5" /> },
  { id: "compra", label: "Comprar", icon: <Home className="h-3.5 w-3.5" /> },
];

function parseOrcamento(input: string): number {
  const digits = input.replace(/\D/g, "");
  return digits ? Number(digits) : 0;
}

function formatOrcamentoInput(input: string): string {
  const n = parseOrcamento(input);
  if (!n) return "";
  return n.toLocaleString("pt-BR");
}

function formatPhone(input: string): string {
  const d = input.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function NewLeadDialog({
  open,
  onOpenChange,
  defaultStatus = "novo",
  onCreate,
}: NewLeadDialogProps) {
  const [nome, setNome] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [bairro, setBairro] = React.useState(BAIRROS[0]);
  const [orcamento, setOrcamento] = React.useState("");
  const [intencao, setIntencao] = React.useState<IntencaoLead>("aluguel");
  const [setor, setSetor] = React.useState<Setor>("locacao");
  const [status, setStatus] = React.useState<LeadStatus>(defaultStatus);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setStatus(defaultStatus);
      setTouched(false);
    }
  }, [open, defaultStatus]);

  // Sincroniza setor com intenção quando o usuário ainda não escolheu setor.
  React.useEffect(() => {
    if (intencao === "aluguel") setSetor("locacao");
    if (intencao === "compra") setSetor("vendas");
  }, [intencao]);

  const reset = () => {
    setNome("");
    setTelefone("");
    setBairro(BAIRROS[0]);
    setOrcamento("");
    setIntencao("aluguel");
    setSetor("locacao");
    setTouched(false);
  };

  const nomeInvalido = touched && nome.trim().length < 3;
  const orcamentoNum = parseOrcamento(orcamento);
  const orcamentoInvalido = touched && orcamentoNum <= 0;
  const valid = nome.trim().length >= 3 && orcamentoNum > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;

    const lead: Lead = {
      id: `lead-${Date.now()}`,
      nome: nome.trim(),
      avatarUrl: "",
      bairro,
      orcamento: orcamentoNum,
      intencao,
      status,
      setor,
      ultimaInteracao: "agora",
      telefone: telefone.trim() || undefined,
    };

    onCreate(lead);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Novo lead</DialogTitle>
          <DialogDescription>
            Cadastro manual — o lead entra no funil imediatamente e segue a
            esteira do CRM.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Nome + telefone */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="lead-nome">
                Nome <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lead-nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Ana Souza"
                autoFocus
                aria-invalid={nomeInvalido}
              />
              {nomeInvalido && (
                <p className="text-[11px] text-red-600">Mínimo 3 caracteres.</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-telefone">Telefone (opcional)</Label>
              <Input
                id="lead-telefone"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
                placeholder="(43) 9 8847-0000"
                inputMode="tel"
              />
            </div>
          </div>

          {/* Intenção */}
          <div className="space-y-1.5">
            <Label>Intenção</Label>
            <div className="flex gap-2">
              {INTENCAO_OPTIONS.map((opt) => {
                const isActive = intencao === opt.id;
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => setIntencao(opt.id)}
                    className={cn(
                      "inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition",
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-surface text-muted hover:border-primary/30"
                    )}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bairro + orçamento */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="lead-bairro">Bairro de interesse</Label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                <select
                  id="lead-bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className="flex h-10 w-full appearance-none rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-ink shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {BAIRROS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-orcamento">
                Orçamento{intencao === "aluguel" ? " (mensal)" : ""}{" "}
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted">
                  R$
                </span>
                <Input
                  id="lead-orcamento"
                  value={orcamento}
                  onChange={(e) =>
                    setOrcamento(formatOrcamentoInput(e.target.value))
                  }
                  placeholder={intencao === "aluguel" ? "2.500" : "350.000"}
                  inputMode="numeric"
                  className="pl-9"
                  aria-invalid={orcamentoInvalido}
                />
              </div>
              {orcamentoInvalido && (
                <p className="text-[11px] text-red-600">Informe um valor.</p>
              )}
            </div>
          </div>

          {/* Setor + status */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="lead-setor">Setor responsável</Label>
              <select
                id="lead-setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value as Setor)}
                className="flex h-10 w-full appearance-none rounded-md border border-border bg-surface px-3 text-sm text-ink shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SETOR_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {SETOR_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lead-status">Etapa inicial</Label>
              <select
                id="lead-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
                className="flex h-10 w-full appearance-none rounded-md border border-border bg-surface px-3 text-sm text-ink shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {LEAD_STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!nome.trim() || !orcamentoNum}>
              Criar lead
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
