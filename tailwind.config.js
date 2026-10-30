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
          bg: '#FFFFFF',
          card: '#F3F3F3',
          dark: '#111111',
          darkSurface: '#F5F5F5',
          darkBorder: '#E5E5E5',
          border: '#E5E5E5',
          borderLight: '#E5E5E5',
          accent: '#111111',
          accentGold: '#F5B301',
          textPrimary: '#111111',
          textSecondary: '#6B6B6B',
          textMuted: '#6B6B6B',
          lightBg: '#F5F5F5',
          cream: '#F5F5F5',
          sand: '#F3F3F3',
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
