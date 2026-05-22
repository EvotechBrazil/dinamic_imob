import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="section-container py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-start">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/logo-dinamic.png"
                alt="Dinamic Imóveis"
                width={180}
                height={120}
                className="h-9 w-auto"
              />
              <span className="rounded-md border border-border bg-app/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                CRECI-J 03226
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
              Plataforma proprietária desenvolvida sob medida — Portal,
              Atendimento IA, CRM, Financeiro de locação e Jurídico em um só
              produto. Arapongas-PR.
            </p>
          </div>
          <div className="text-sm text-muted">
            <p>
              <span className="font-medium text-ink">Vendas:</span>{" "}
              (43) 98847-8713
            </p>
            <p>
              <span className="font-medium text-ink">Locação:</span>{" "}
              (43) 98847-8670
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Dinamic Imóveis. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <span>LGPD: dados tratados conforme política interna</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
