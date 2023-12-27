import type { Config } from 'tailwindcss';

const ALPHA_VALUE = '<alpha-value>';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',

        /* Custom CSS vars */
        background: `hsl(var(--background) / ${ALPHA_VALUE})`,
        'block-background-1': `hsl(var(--block-background-1) / ${ALPHA_VALUE})`,
        'block-background-2': `hsl(var(--block-background-2) / ${ALPHA_VALUE})`,
        'block-border': `hsl(var(--block-border) / ${ALPHA_VALUE})`,
        'button-hover-background': `hsl(var(--button-hover-background) / ${ALPHA_VALUE})`,
        'button-hover-text': `hsl(var(--button-hover-text) / ${ALPHA_VALUE})`,
        'nav-link-background-hover': `hsl(var(--nav-link-background-hover) / ${ALPHA_VALUE})`,
        'nav-link-background': `hsl(var(--nav-link-background) / ${ALPHA_VALUE})`,
        'nav-link-text-hover': `hsl(var(--nav-link-text-hover) / ${ALPHA_VALUE})`,
        'section-background-bottom': `hsl(var(--section-background-bottom) / ${ALPHA_VALUE})`,
        'section-background-top': `hsl(var(--section-background-top) / ${ALPHA_VALUE})`,
        'section-border': `hsl(var(--section-border) / ${ALPHA_VALUE})`,
        texts: `hsl(var(--texts) / ${ALPHA_VALUE})`,
        'violet-glow': `hsl(var(--violet-glow) / ${ALPHA_VALUE})`,
        white: `hsl(var(--white) / ${ALPHA_VALUE})`,
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        sm: '1.4rem',
        md: '1.6rem',
        lg: '1.8rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
