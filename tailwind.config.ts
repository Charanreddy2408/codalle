import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pebble color palette (backgrounds and neutral tones)
        pebble: {
          50: 'rgb(var(--pebble-50) / <alpha-value>)',
          100: 'rgb(var(--pebble-100) / <alpha-value>)',
          200: 'rgb(var(--pebble-200) / <alpha-value>)',
          300: 'rgb(var(--pebble-300) / <alpha-value>)',
          400: 'rgb(var(--pebble-400) / <alpha-value>)',
          500: 'rgb(var(--pebble-500) / <alpha-value>)',
          600: 'rgb(var(--pebble-600) / <alpha-value>)',
          700: 'rgb(var(--pebble-700) / <alpha-value>)',
          800: 'rgb(var(--pebble-800) / <alpha-value>)',
          900: 'rgb(var(--pebble-900) / <alpha-value>)',
          950: 'rgb(var(--pebble-950) / <alpha-value>)',
        },
        // Meadow color palette (green accents, buttons, and text)
        meadow: {
          50: 'rgb(var(--meadow-50) / <alpha-value>)',
          100: 'rgb(var(--meadow-100) / <alpha-value>)',
          200: 'rgb(var(--meadow-200) / <alpha-value>)',
          300: 'rgb(var(--meadow-300) / <alpha-value>)',
          400: 'rgb(var(--meadow-400) / <alpha-value>)',
          500: 'rgb(var(--meadow-500) / <alpha-value>)',
          600: 'rgb(var(--meadow-600) / <alpha-value>)',
          700: 'rgb(var(--meadow-700) / <alpha-value>)',
          800: 'rgb(var(--meadow-800) / <alpha-value>)',
          900: 'rgb(var(--meadow-900) / <alpha-value>)',
          950: 'rgb(var(--meadow-950) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-akkurat)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      spacing: {
        'grid-margin': 'var(--grid-margin)',
        'nav-height': 'var(--nav-height)',
      },
      maxWidth: {
        'content': '80rem', // 1280px
      },
    },
  },
  plugins: [],
};
export default config;


