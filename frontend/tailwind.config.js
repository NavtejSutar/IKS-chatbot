/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        vedic: {
          darkBg: "#0b0f19",
          secondaryBg: "#111827",
          cardBg: "rgba(26, 34, 52, 0.75)",
          borderSubtle: "rgba(255, 255, 255, 0.08)",
          gold: "#d97706",
          goldBright: "#fbbf24",
          goldLight: "#fef3c7",
          saffron: "#ea580c",
          crimson: "#e11d48",
          emerald: "#10b981",
          indigo: "#4f46e5",
          sandLight: "#fdfbf7",
          sandCard: "#ffffff"
        }
      },
      fontFamily: {
        heading: ["Cinzel", "serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        goldGlow: "0 0 25px rgba(245, 158, 11, 0.25)",
        cardGlow: "0 8px 30px rgba(0, 0, 0, 0.35)"
      }
    },
  },
  plugins: [],
}
