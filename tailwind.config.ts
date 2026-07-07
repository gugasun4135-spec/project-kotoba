import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sumi: "#17211c",
        matcha: "#2f9d63",
        "matcha-soft": "#dff4e7",
        washi: "#f8faf7",
        kohaku: "#f5b72f",
        beniiro: "#ef5b5b",
        ai: "#477bd3"
      },
      boxShadow: {
        card: "0 10px 30px rgba(23, 33, 28, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
