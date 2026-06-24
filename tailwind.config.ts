import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#07302e",
        teal: {
          50: "#e9f2f0",
          100: "#cfe5e1",
          300: "#7ab8b1",
          500: "#15837f",
          600: "#11716f",
          700: "#0e5f63",
          800: "#0c494b",
          900: "#0a3a3c",
        },
        cream: {
          DEFAULT: "#f6f3ec",
          2: "#efe9dd",
        },
        paper: "#ffffff",
        muted: {
          DEFAULT: "#5d736f",
          2: "#7e9490",
        },
        gold: {
          50: "#fdf3e0",
          DEFAULT: "#f4b455",
          600: "#e09c34",
          700: "#b87a1f",
          glow: "#ffd27a",
        },

        // Semantic aliases (continue to back legacy uses via CSS vars)
        base: "var(--bg-base)",
        elevated: "var(--bg-elevated)",
        subtle: "var(--bg-subtle)",
        "bg-dark": "var(--bg-dark)",
        "bg-dark-elevated": "var(--bg-dark-elevated)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-on-dark": "var(--text-on-dark)",
        "text-on-dark-muted": "var(--text-on-dark-muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-strong": "var(--accent-strong)",
        // Backwards-compatible warm/cool aliases — both now map to gold so legacy classes keep working
        "accent-warm": "var(--gold)",
        "accent-warm-2": "var(--gold-glow)",
        "accent-cool": "var(--teal-500)",
        "accent-cool-2": "var(--teal-300)",
        "border-subtle": "var(--border-subtle)",
        "border-strong": "var(--border-strong)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.25rem, 5.2vw, 3.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2rem, 4.4vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(1.5rem, 2.8vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        sm: "10px",
        DEFAULT: "16px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(7,48,46,0.06), 0 1px 3px rgba(7,48,46,0.05)",
        DEFAULT: "0 6px 18px -6px rgba(7,48,46,0.14), 0 2px 6px rgba(7,48,46,0.06)",
        lg: "0 28px 60px -24px rgba(7,48,46,0.30), 0 8px 24px -10px rgba(7,48,46,0.14)",
        cta: "0 10px 24px -8px rgba(224,156,52,0.55), 0 2px 6px rgba(184,122,31,0.30)",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float-y": "float-y 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
