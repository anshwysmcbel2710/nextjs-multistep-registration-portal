/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0f62fe",
          600:     "#0353e9",
          700:     "#003bb5",
          success: "#22c55e",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system"],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%":   { transform: "scale(0.8)", opacity: "0" },
          "50%":  { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)",   opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.4s ease-out both",
        pop:       "pop 0.3s ease-out both",
        shimmer:   "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};