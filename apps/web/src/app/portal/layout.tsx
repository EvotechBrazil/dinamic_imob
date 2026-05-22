import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const fontPortalDisplay = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-portal-display",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Dinamic Imobiliária — Imóveis em Arapongas-PR pra comprar e alugar",
  description:
    "Encontre apartamentos, casas e terrenos em Arapongas-PR. Atendimento humano local, IA pra acelerar sua busca, e WhatsApp direto com corretor. CRECI ativo.",
  openGraph: {
    title: "Dinamic Imobiliária — Imóveis em Arapongas-PR",
    description:
      "Atendimento humano local + IA para encontrar seu imóvel em segundos. Comprar, alugar ou anunciar em Arapongas-PR.",
    url: "/portal",
    siteName: "Dinamic Imobiliária",
    images: [
      {
        url: "/portal/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dinamic Imobiliária — Imóveis em Arapongas-PR",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinamic Imobiliária — Imóveis em Arapongas-PR",
    description:
      "Atendimento humano local + IA para encontrar seu imóvel em segundos.",
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      data-portal
      suppressHydrationWarning
      className={`${fontPortalDisplay.variable} min-h-screen overflow-x-hidden bg-portal-bg text-portal-text`}
    >
      {children}
    </main>
  );
}
