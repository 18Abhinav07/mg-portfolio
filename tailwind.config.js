/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        hindi: ['Yantramanav', 'sans-serif'],
      },
      colors: {
        slateWhite: '#F8F9FA',
        saffron: '#FF6B00',
        parliament: '#0A192F',
        organic: '#008751',
      },
      boxShadow: {
        'bezel-inner': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        '2rem': '2rem',
        'bezel-core': 'calc(2rem - 0.375rem)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
      }
    },
  },
  plugins: [],
}
