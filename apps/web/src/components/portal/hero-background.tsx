"use client";

/**
 * HeroBackground — Editorial Noir dark cinematic.
 *
 * O hiperlapse `/portal/video_fachada.MP4` já contém o ciclo natural
 * dia→entardecer→noite, então este componente reduz pra 2 camadas
 * (era 4) — substituindo as animações CSS de céu/estrelas/filter por
 * 1 elemento `<video>` autoplay loop muted playsInline:
 *
 *  1. Hiperlapse da fachada (autoplay/loop/muted, poster com a foto
 *     `frente-imob.webp` enquanto o vídeo baixa).
 *  2. Vinheta radial + gradient vertical pra escurecer bordas e
 *     legibilizar o painel central.
 *
 * Tudo aria-hidden + pointer-events-none.
 */
export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Camada 1 — hiperlapse da fachada (ciclo dia→noite nativo).
          Sem poster: o vídeo é o LCP, então preload="auto" + fetchpriority
          "high" pra baixar agressivo e iniciar playback o mais rápido
          possível. Fundo noir-bg cobre o flash enquanto baixa. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-noir-bg"
      />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/portal/video_fachada.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        // @ts-expect-error — fetchPriority é suportado mas TS DOM types ainda atrasados
        fetchpriority="high"
      />

      {/* Camada 2 — vinheta dark sobre tudo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(11, 11, 20, 0.5) 60%, rgba(11, 11, 20, 0.95) 100%), linear-gradient(180deg, rgba(11,11,20,0.4) 0%, transparent 30%, transparent 70%, rgba(11,11,20,0.9) 100%)",
        }}
      />
    </div>
  );
}
