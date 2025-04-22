/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
      },
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        dark: 'var(--dark)',
      },
      zIndex: {
        '-15': '-15',
        '-20': '-20',
      },
      animation: {
        'search-pulse': 'search-pulse 2s infinite',
        'rotate-background-balls':
          'rotate-background-balls 10s linear infinite',
        'animate-eyes': 'animate-eyes 10s infinite linear',
        scanline: 'scanline 8s linear infinite',
        flicker: 'flicker 5s ease infinite',
      },
      keyframes: {
        'search-pulse': {
          '0%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0, transform: 'scale(1.05)' },
          '100%': { opacity: 0.5, transform: 'scale(1)' },
        },
        'rotate-background-balls': {
          from: {
            transform: 'translateX(-50%) translateY(-50%) rotate(360deg)',
          },
          to: { transform: 'translateX(-50%) translateY(-50%) rotate(0)' },
        },
        'animate-eyes': {
          '46%': { height: '52px' },
          '48%': { height: '20px' },
          '50%': { height: '52px' },
          '96%': { height: '52px' },
          '98%': { height: '20px' },
          '100%': { height: '52px' },
        },
        scanline: {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 100%' },
        },
        flicker: {
          '2.5%, 5%, 8%, 12%, 15%, 18.5%': { opacity: '0' },
          '4.5%, 7.5%, 10%, 15%, 23%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
