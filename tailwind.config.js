/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glintura: {
          bg: '#f8f6f3',
          card: '#ffffff',
          dark: '#0c0c0c',
          darkSurface: '#16181c',
          darkBorder: '#232529',
          border: '#e8e8e8',
          borderLight: '#ebebeb',
          accent: '#b9836a',
          accentGold: '#8c7b5e',
          textPrimary: '#1c1c1a',
          textSecondary: '#6d6a67',
          textMuted: '#9a948e',
          lightBg: '#f5f4f0',
          cream: '#fafaf7',
          sand: '#e7ece5',
        }
      },
      fontFamily: {
        switzer: ['Switzer', 'Inter', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        shimmer: 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
}
