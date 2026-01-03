/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-aura': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.25' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        }
      },
      animation: {
        'pulse-aura': 'pulse-aura 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse-slow 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
