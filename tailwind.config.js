/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff88',
        'neon-orange': '#ffaa00',
        'bg-primary': '#0a0f0a',
        'bg-secondary': '#0d1510',
        'bg-panel': '#0a120a',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        orbit: 'orbit 10s linear infinite',
        blink: 'blink 1.5s ease-in-out infinite',
        fadeInSlide: 'fadeInSlide 0.3s ease-out',
        glowPulse: 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(60px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(60px) rotate(-360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.2' },
        },
        fadeInSlide: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 136, 0.3)' },
          '50%': { boxShadow: '0 0 15px rgba(0, 255, 136, 1), 0 0 30px rgba(0, 255, 136, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
