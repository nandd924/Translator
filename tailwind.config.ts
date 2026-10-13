import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#071B2F",
        navy: "#0E2340",
        ivory: "#F7F3EE",
        saffron: "#D89B2D",
        ember: "#B75A26",
        ash: "#DCE3EA",
      },
      boxShadow: {
        soft: "0 20px 50px rgba(15, 25, 42, 0.13)",
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top, rgba(216,155,45,0.22), transparent 42%)",
      },
    },
  },
  plugins: [],
};

export default config;
