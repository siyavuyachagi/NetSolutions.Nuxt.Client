/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./pages/**/*.{vue,js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        primary: "#7c3aed", // Adjusted for better contrast
        secondary: "#E6C200", // Softer gold for dark mode readability
        success: "#34d399", // Success color
        error: "#f87171", // Error color
        warning: "#fbbf24", // Warning color
        info: "#60a5fa", // Info color
        neutral: "#1E293B", // Tech-friendly dark gray
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#7c3aed", // Adjusted main primary
          600: "#6d28d9",
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#3b0764",
          950: "#2a0550",
        },
        secondary: {
          50: "#fff9e5",
          100: "#fff3cc",
          200: "#ffe699",
          300: "#ffdb66",
          400: "#ffd633",
          500: "#E6C200", // Adjusted gold
          600: "#b39b00",
          700: "#806d00",
          800: "#4d4000",
          900: "#332a00",
          950: "#1f1a00",
        },
        neutral: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1E293B", // Tech-friendly dark gray
          900: "#0f172a",
          950: "#0a101d",
        },
      },
    },
  },
  plugins: [],
};
