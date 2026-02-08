/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui"]
      },
      colors: {
        canvas: "#0b0f14",
        panel: "#0f172a",
        accent: "#60a5fa",
        glow: "#22d3ee"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(96, 165, 250, 0.2), 0 0 40px rgba(34, 211, 238, 0.15)"
      }
    }
  },
  plugins: []
};
