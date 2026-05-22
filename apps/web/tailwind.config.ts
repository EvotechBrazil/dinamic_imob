import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern:
        /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900))$/,
      variants: ["hover", "ui-selected"],
    },
    {
      pattern:
        /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900))$/,
    },
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900))$/,
    },
    {
      pattern:
        /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900))$/,
    },
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          dark: "#3730A3",
          foreground: "#FFFFFF",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        accent: {
          DEFAULT: "#F59E0B",
          foreground: "#0F172A",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        app: "#F8FAFC",
        surface: "#FFFFFF",
        ink: "#0F172A",
        muted: {
          DEFAULT: "#64748B",
          foreground: "#94A3B8",
        },
        border: "#E2E8F0",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        info: "#0EA5E9",
        // Portal público Dinamic — escopado via [data-portal] em CSS, mas
        // disponibilizado como utility classes (bg-portal-gold etc).
        portal: {
          bg: "#F6F8FA",
          surface: "#FFFFFF",
          text: "#1F2933",
          "text-muted": "#64748B",
          "text-subtle": "#94A3B8",
          border: "#E2E8F0",
          "border-strong": "#CBD5E1",
          gold: "#D79A27",
          "gold-soft": "#FBF3DE",
          "gold-dark": "#B07F1E",
          "gold-darker": "#8B6515",
          "cta-black": "#111827",
          "cta-black-hover": "#1F2937",
          whatsapp: "#25D366",
          "whatsapp-dark": "#1FAE56",
          success: "#16A34A",
          warning: "#EA580C",
          danger: "#DC2626",
        },
        // Tremor (light)
        tremor: {
          brand: {
            faint: "#EEF2FF",
            muted: "#C7D2FE",
            subtle: "#818CF8",
            DEFAULT: "#4F46E5",
            emphasis: "#3730A3",
            inverted: "#FFFFFF",
          },
          background: {
            muted: "#F8FAFC",
            subtle: "#F1F5F9",
            DEFAULT: "#FFFFFF",
            emphasis: "#0F172A",
          },
          border: { DEFAULT: "#E2E8F0" },
          ring: { DEFAULT: "#E2E8F0" },
          content: {
            subtle: "#94A3B8",
            DEFAULT: "#64748B",
            emphasis: "#334155",
            strong: "#0F172A",
            inverted: "#FFFFFF",
          },
        },
      },
      boxShadow: {
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        "portal-card": "0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)",
        "portal-card-hover":
          "0 8px 24px rgba(15, 23, 42, 0.10), 0 2px 6px rgba(15, 23, 42, 0.06)",
        "portal-cta": "0 10px 30px rgba(215, 154, 39, 0.25)",
        "portal-whatsapp": "0 10px 30px rgba(37, 211, 102, 0.30)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", "1rem"],
        "tremor-default": ["0.875rem", "1.25rem"],
        "tremor-title": ["1.125rem", "1.75rem"],
        "tremor-metric": ["1.875rem", "2.25rem"],
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        "portal-display": [
          "var(--font-portal-display)",
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
