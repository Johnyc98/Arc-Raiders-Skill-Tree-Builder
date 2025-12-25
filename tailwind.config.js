/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Arc Raiders Brand Colors
        'gunmetal': '#0F1115',        // Deep Gunmetal - Main Canvas
        'charcoal': '#1A1D21',        // Panel Charcoal - Side panels
        'warning': '#D95204',         // Warning Orange - Active elements (PRIMARY)
        'critical': '#790000',        // Critical Red - Errors
        'industrial': '#D4A017',      // Industrial Yellow - Currency/Keystones
        'survival': '#3c668d',        // Survival Blue - Tech elements
        'organic': '#4c7510',         // Organic Green - Physiological
        'panel-border': '#2C3038',    // Border/Grid color
        'text-primary': '#E0E0E0',    // Main text (not pure white)
        'text-secondary': '#9CA3AF',  // Secondary text
      },
      fontFamily: {
        'display': ['Rajdhani', 'sans-serif'],  // Headers (Handel Gothic alternative)
        'body': ['Barlow', 'sans-serif'],       // Body text
        'mono': ['JetBrains Mono', 'monospace'], // HUD Data
      },
      letterSpacing: {
        'widest': '0.1em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(217, 82, 4, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(217, 82, 4, 0.8)' },
        }
      },
      backgroundImage: {
        'diagonal-stripes': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(217, 82, 4, 0.1) 10px, rgba(217, 82, 4, 0.1) 20px)',
      },
    },
  },
  plugins: [],
}


