export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="section-container py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-primary text-xs font-bold text-white">
                D
              </span>
              <span className="font-display text-base font-bold text-ink">
                DINAMIC
              </span>
              <span className="text-xs text-muted">Imobiliária — Arapongas-PR</span>
            </div>
            <p className="mt-2 max-w-md text-sm text-muted">
              Plataforma proprietária desenvolvida sob medida. Portal +
              Atendimento IA + CRM + Financeiro de locação + Jurídico.
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
            © {new Date().getFullYear()} Dinamic Imobiliária. Todos os direitos
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
