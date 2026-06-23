import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07111f',
          900: '#0c1728',
          800: '#14243a'
        },
        brand: {
          50: '#eefcf7',
          100: '#d5f8eb',
          500: '#1bbf89',
          600: '#0d9a6e',
          700: '#0f7354'
        },
        gold: {
          50: '#fff8eb',
          100: '#ffebbf',
          500: '#d7a21b',
          600: '#b5810f'
        }
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(27,191,137,0.18), 0 20px 60px -24px rgba(15,115,84,0.55)',
        panel: '0 24px 80px -28px rgba(7,17,31,0.35)'
      },
      backgroundImage: {
        'hero-grid': 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};

export default config;