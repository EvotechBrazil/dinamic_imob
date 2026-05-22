import { WhatsAppIcon } from "@/components/ui/brand-icons";

const VENDAS_URL =
  "https://wa.me/5543988478713?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20im%C3%B3veis%20da%20Dinamic";
const LOCACAO_URL =
  "https://wa.me/5543988478670?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20loca%C3%A7%C3%A3o";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--portal-cta-black) 0%, var(--portal-cta-black) 50%, rgba(176, 127, 30, 0.4) 100%)",
        }}
      />

      {/* SVG grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid-cta"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl font-bold tracking-tight text-white lg:text-5xl">
          Não encontrou o imóvel ideal?
        </h2>
        <p className="mt-4 text-lg text-white/80 lg:text-xl">
          Fala direto com um corretor da Dinamic. Resposta em minutos no
          WhatsApp.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <a
            href={VENDAS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-[var(--portal-whatsapp)] px-6 py-4 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--portal-whatsapp-dark)]"
            style={{ boxShadow: "var(--shadow-portal-whatsapp)" }}
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            <span className="text-left">
              <span className="block text-sm font-medium opacity-90">
                WhatsApp Vendas
              </span>
              <span className="block text-base font-bold tracking-tight">
                (43) 98847-8713
              </span>
            </span>
          </a>
          <a
            href={LOCACAO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-[var(--portal-whatsapp)] px-6 py-4 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[var(--portal-whatsapp-dark)]"
            style={{ boxShadow: "var(--shadow-portal-whatsapp)" }}
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            <span className="text-left">
              <span className="block text-sm font-medium opacity-90">
                WhatsApp Locação
              </span>
              <span className="block text-base font-bold tracking-tight">
                (43) 98847-8670
              </span>
            </span>
          </a>
        </div>

        <p className="mt-8 text-sm text-white/60">
          Atendimento de segunda a sábado, das 8h às 19h.
        </p>
      </div>
    </section>
  );
}
