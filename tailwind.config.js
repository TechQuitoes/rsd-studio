/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        travertine: {
          50: '#faf8f5',
          100: '#f7f4ef',
          200: '#f4f0ea',
          300: '#ede5d8',
          400: '#d8cbb8',
        },
        royaleGreen: {
          DEFAULT: '#0a1f16',
          light: '#0d2a1d',
          dark: '#061409',
        },
        onyx: {
          DEFAULT: '#080808',
          soft: '#111111',
          dark: '#050505',
        },
        muted: {
          warm: '#8e8a84',
          cool: '#5e5e5c',
          green: '#b2c2ba',
          dark: '#888888',
        },
        gold: '#c5a880',
        chocolate: '#3d2c25',
        charcoal: '#3c403e',
      },
      fontFamily: {
        serif: ['"Tenor Sans"', '"Times New Roman"', 'Times', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.35em',
        ultra: '0.25em',
        luxury: '0.2em',
        relaxed: '0.15em',
        soft: '0.12em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.19, 1, 0.22, 1)',
        smooth: 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      keyframes: {
        grain: {
          '0%': { transform: 'translate(0, 0)' },
          '20%': { transform: 'translate(-5%, -10%)' },
          '40%': { transform: 'translate(10%, 5%)' },
          '60%': { transform: 'translate(5%, 10%)' },
          '80%': { transform: 'translate(-10%, 5%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
        glassMove: {
          '0%': { left: '-300px' },
          '100%': { left: '130%' },
        },
        float1: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(40px) translateX(20px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-40px) translateX(-20px)' },
        },
        scrollMarquee: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        videoScale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        grain: 'grain 8s steps(10) infinite',
        glassMove: 'glassMove 8s linear infinite',
        float1: 'float1 12s ease-in-out infinite',
        float2: 'float2 15s ease-in-out infinite',
        scrollMarquee: 'scrollMarquee 30s linear infinite',
        scrollMarqueeSlow: 'scrollMarquee 35s linear infinite',
        videoScale: 'videoScale 18s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
