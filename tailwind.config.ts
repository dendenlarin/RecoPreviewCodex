import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./data/**/*.{ts,tsx,js,json}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: "#f6f7f9",
          100: "#e6e8ef",
          200: "#c8cddd",
          300: "#aab2cc",
          400: "#7c89ae",
          500: "#556093",
          600: "#3e497c",
          700: "#323b66",
          800: "#2a3353",
          900: "#242a44"
        },
        acid: {
          50: "#ecffe7",
          100: "#d6ffc3",
          200: "#b5ff8c",
          300: "#93ff55",
          400: "#73f517",
          500: "#5dd200",
          600: "#49a300",
          700: "#3a7b02",
          800: "#2f6106",
          900: "#2a510a"
        }
      },
      boxShadow: {
        neon: "0 0 20px rgba(115,245,23,0.45), 0 20px 60px rgba(0,0,0,0.35)",
        card: "0 18px 38px rgba(0,0,0,0.35)"
      },
      fontFamily: {
        display: ["'Staatliches'", "sans-serif"],
        body: ["'Chivo'", "sans-serif"]
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(115,245,23,0.15), transparent 25%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.08), transparent 30%), radial-gradient(circle at 60% 80%, rgba(93,210,0,0.12), transparent 30%)",
        grain: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNjAnIGhlaWdodD0nNjAnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PGZpbHRlciBpZD0nZicgeD0nMCcgeT0nMCcgd2lkdGg9JzIwMCUnIGhlaWdodD0nMjAwJSc+PGZlVHVyYnVsZW5jZSB0eXBlPSdyZnMnIGJhc2VGcmVxdWVuY3k9JzAnIHJlc3VsdD0nZicvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPScxMDAnIGhlaWdodD0nMTAwJyBmaWx0ZXI9J3VybCgjZiknIG9wYWNpdHk9JzAuMjUnLz48L3N2Zz4=')"
      }
    }
  },
  plugins: []
};

export default config;
