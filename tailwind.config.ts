import type { Config } from "tailwindcss";

// Tokens ported from presso-web-kit/tailwind.tokens.ts.
// Brand hues verified against the real logo (presso_app/assets/logo/presso_logo.png):
// sampled blue #03379C, green #36A326 — the kit's #073D4B / #147B80 come from this mark.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#EFF7F6", 100: "#DCEEEF", 200: "#A5DDE0", 400: "#31BAC3",
          500: "#167482", 600: "#0B5360", 700: "#073D4B", 800: "#063540", 900: "#002E3C",
        },
        green: {
          50: "#F0F8F5", 100: "#DDF1EF", 400: "#55CBD0", 500: "#249DA5",
          600: "#147B80", 700: "#136B73", 800: "#095661",
        },
        ink: { DEFAULT: "#073D4B", muted: "#647577", dim: "#65787A" },
        line: { DEFAULT: "#DAE3E1", soft: "#E9EEEB" },
        surface: { DEFAULT: "#FFFFFF", alt: "#F1F4F3", lavender: "#EFF5F3", panel2: "#F8FAF9" },
        danger: "#D64545",
        brand: "#073D4B",
        "brand-green": "#147B80",
      },
      fontFamily: {
        display: ["var(--font-display)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: ["3.5rem", { lineHeight: "1.08", letterSpacing: "0", fontWeight: "700" }],
        h2: ["2.5rem", { lineHeight: "1.15", letterSpacing: "0", fontWeight: "700" }],
        h3: ["1.375rem", { lineHeight: "1.3", fontWeight: "700" }],
        micro: ["0.75rem", { letterSpacing: "0", lineHeight: "1.4" }],
      },
      borderRadius: { sm: "4px", DEFAULT: "6px", lg: "8px", xl: "8px", pill: "4px" },
      boxShadow: {
        sm: "0 1px 2px rgba(12,27,58,.06), 0 1px 1px rgba(12,27,58,.04)",
        DEFAULT: "0 10px 30px rgba(11,64,158,.10)",
        lg: "0 24px 60px rgba(11,64,158,.16)",
        glowGreen: "0 8px 26px rgba(53,165,37,.28)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(#073D4B,#073D4B)",
        "fresh-wash": "linear-gradient(#F1F4F3,#F1F4F3)",
        "photo-darken": "linear-gradient(180deg,rgba(15,34,27,0) 15%,rgba(15,34,27,.85) 100%)",
      },
      maxWidth: { content: "1200px", measure: "68ch" },
      // The kit's spacing scale (4 8 12 16 24 32 48 64 96 128) needs a few
      // half-steps Tailwind doesn't ship by default.
      spacing: { "4.5": "1.125rem", "5.5": "1.375rem", "6.5": "1.625rem" },
      transitionDuration: { "250": "250ms" },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "12%": { opacity: ".28" },
          "100%": { transform: "translateY(-660px)", opacity: "0" },
        },
        shine: { "0%": { transform: "translateX(-120%)" }, "100%": { transform: "translateX(220%)" } },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".55", transform: "scale(.85)" },
        },
        glint: { "0%": { transform: "translateX(-40vw)" }, "55%,100%": { transform: "translateX(140vw)" } },
        motifDrift: { from: { transform: "translate(-50%,0) scale(1)" }, to: { transform: "translate(-50%,-22px) scale(1.04)" } },
      },
      animation: {
        floatUp: "floatUp 22s linear infinite",
        shine: "shine 1.1s ease-out",
        pulseDot: "pulseDot 1.8s ease-in-out infinite",
        glint: "glint 9s ease-in-out infinite",
        motifDrift: "motifDrift 26s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
