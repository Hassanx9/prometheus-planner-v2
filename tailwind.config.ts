import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        poe: { black: "#050506", gold: "#c5a059", spirit: "#7ecce0", border: "#3d3d43" }
      },
    },
  },
  plugins: [],
};
export default config;
