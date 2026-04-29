import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hd: {
          green: "#447A44",
          greenBtn: "#00BC19",
          panel: "#F4F9FC",
          border: "#BABABA",
          hairline: "rgba(0,0,0,0.1)",
          body: "rgba(0,0,0,0.7)",
          muted: "rgba(0,0,0,0.6)",
          subtle: "rgba(0,0,0,0.5)",
        },
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
