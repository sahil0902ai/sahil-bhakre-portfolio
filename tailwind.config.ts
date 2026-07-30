import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base': '#050505',
        'bg-surface': '#0D0D0E',
        'bg-glass': 'rgba(13, 13, 14, 0.7)',
        'bg-inset': '#010101',
        'text-primary': '#F8F9FA',
        'text-secondary': '#8E8E93',
        'text-muted': '#A1A1AA',
        'accent-primary': '#00F2FE',
        'accent-secondary': '#4FACFE',
        'accent-highlight': '#A855F7',
        'accent-success': '#10B981',
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          focus: '#00F2FE',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '20px',
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(0, 242, 254, 0.15)',
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 100%)',
      },
      animation: {
        'marquee-horizontal': 'marquee-horizontal 40s linear infinite',
      },
      keyframes: {
        'marquee-horizontal': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
