import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "3rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        bg: "oklch(0.145 0.008 250)",
        "bg-elev": "oklch(0.175 0.009 250)",
        "bg-elev-2": "oklch(0.205 0.010 250)",
        surface: "oklch(0.185 0.010 250)",
        line: "oklch(0.265 0.012 250)",
        "line-soft": "oklch(0.225 0.011 250)",

        fg: "oklch(0.965 0.004 90)",
        "fg-soft": "oklch(0.82 0.006 240)",
        "fg-mute": "oklch(0.62 0.010 240)",
        "fg-dim": "oklch(0.48 0.012 245)",

        accent: {
          DEFAULT: "oklch(0.84 0.09 200)",
          soft: "oklch(0.84 0.09 200 / 0.18)",
          line: "oklch(0.84 0.09 200 / 0.32)",
        },

        pass: {
          DEFAULT: "oklch(0.80 0.13 155)",
          soft: "oklch(0.80 0.13 155 / 0.14)",
          line: "oklch(0.80 0.13 155 / 0.30)",
        },
        fail: {
          DEFAULT: "oklch(0.72 0.17 25)",
          soft: "oklch(0.72 0.17 25 / 0.14)",
          line: "oklch(0.72 0.17 25 / 0.32)",
        },
        warn: {
          DEFAULT: "oklch(0.82 0.13 75)",
          soft: "oklch(0.82 0.13 75 / 0.14)",
          line: "oklch(0.82 0.13 75 / 0.28)",
        },

        border: "oklch(0.265 0.012 250)",
        input: "oklch(0.225 0.011 250)",
        ring: "oklch(0.84 0.09 200 / 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "14px",
      },
      letterSpacing: {
        tightish: "-0.012em",
        tighter2: "-0.025em",
        tighter3: "-0.035em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spin: { to: { transform: "rotate(360deg)" } },
        pulse: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(.2,.7,.2,1) both",
        "spin-slow": "spin 1.4s linear infinite",
        pulse: "pulse 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
