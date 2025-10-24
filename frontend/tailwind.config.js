/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: (() => {
       
 const customSpacing = {};
        for (let i = 0; i <= 200; i++) {
          customSpacing[i] = `${i * 0.25}rem`;
        }

        return customSpacing;
      })(),

      fontSize: {
        'size-xs': '.75rem',
        'size-sm': '.875rem',
        'size-base': '1rem',
        'size-lg': '1.125rem',
        'size-xl': '1.25rem',
        'size-2xl': '1.5rem',
        'size-3xl': '1.875rem',
        'size-4xl': '2.25rem',
        'size-5xl': '3rem',
        'size-6xl': '4rem',
        'size-7xl': '5rem',
      },

      colors: {
        white: '#ffffff',
        charcoal: '#0f172a',
        'charcoal-light': '#111827',
        text: {
          primary: '#1a202c',
          subtle: '#4a5568',
          muted: '#718096',
          strong: '#0f172a',
        },
        coral: {
          DEFAULT: '#ff6b6b',
          dark: '#ff4d4d',
        },
        bg: {
          white: '#ffffff',
          gray: '#f7fafc',
        },
        purple: '#9B59B6',
        lavender: {
          DEFAULT: '#a78bfa',
          dark: '#7c5cf5',
        },
        backgroundImage: {
          'gradient-primary': 'linear-gradient(135deg, #FF6B6B 0%, #9B59B6 100%)',
        },
      },

      fontFamily: {
        sans: ['Noto Sans', 'sans-serif'],
      },

      zIndex: {
        nav: 999,
      },

      height: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
        '60vh': '60vh',
        '70vh': '70vh',
        '80vh': '80vh',
        '90vh': '90vh',
      },

      width: {
        '10vw': '10vw',
        '20vw': '20vw',
        '30vw': '30vw',
        '40vw': '40vw',
        '50vw': '50vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
      },

      screens: {
        mobile: '320px',
        'iphone-12': '390px',
        'iphone-13-pro': '428px',
        big: '2000px',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        'fade-in': 'fadeIn 1s ease-out both',
        'slide-in-left': 'slideInLeft 1s ease-out both',
        'slide-in-right': 'slideInRight 1s ease-out both',
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};
