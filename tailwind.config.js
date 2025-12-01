/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // ✅ Enables dark mode using the "dark" class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#1e40af',
        brandRed: '#dc2626',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
