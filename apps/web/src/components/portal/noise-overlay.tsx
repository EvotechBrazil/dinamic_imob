export function NoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04] mix-blend-overlay"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="portal-noise-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#portal-noise-filter)" />
    </svg>
  );
}
