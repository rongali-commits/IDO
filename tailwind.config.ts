import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./content/**/*.mdx"],
  darkMode: ["class"],
  theme: { extend: {} },
  plugins: [typography],
} satisfies Config;
