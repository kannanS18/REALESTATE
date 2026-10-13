/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#f7e7a9',
          400: '#f0d588',
          500: '#d4af37',
          600: '#b89025',
          700: '#8c6b16',
        },
        luxury: {
          bg: '#08090b',
          card: '#0f1115',
          elevated: '#171920',
          border: 'rgba(212, 175, 55, 0.15)',
          muted: '#8e929d'
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #f0d588 0%, #d4af37 50%, #9a7618 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }
    },
  },
  plugins: [],
}
