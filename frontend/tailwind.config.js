/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softoria: {
          black: '#0B0B0B',
          dark: '#151515',
          greyDark: '#222222',
          greyMedium: '#333333',
          greyLight: '#777777',
          greyBorder: '#E5E7EB',
          bgLight: '#F5F5F5',
          gold: '#D4AF37',
          goldLight: '#E5C158',
          goldDark: '#B89628',
          goldMuted: 'rgba(212, 175, 55, 0.12)',
          goldBorder: 'rgba(212, 175, 55, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(212, 175, 55, 0.15)',
        'gold-md': '0 4px 20px rgba(212, 175, 55, 0.22)',
        'gold-lg': '0 8px 30px rgba(212, 175, 55, 0.28)',
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}

