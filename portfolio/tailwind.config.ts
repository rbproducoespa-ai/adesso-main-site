import type { Config } from "tailwindcss";

/**
 * Colours are driven by CSS custom properties (see globals.css) so that each
 * division can re-tint the page by setting --accent on a wrapper element,
 * and so light/dark themes swap at the token level rather than per component.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-2": "rgb(var(--ink-2) / <alpha-value>)",
        "ink-3": "rgb(var(--ink-3) / <alpha-value>)",
        rule: "rgb(var(--rule) / <alpha-value>)",
        "rule-strong": "rgb(var(--rule-strong) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      maxWidth: {
        sheet: "1240px",
        prose: "68ch",
      },
      letterSpacing: {
        label: "0.15em",
      },
      keyframes: {
        riseIn: {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "rise-in": "riseIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
