import defaultThemeOpts from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', ...defaultThemeOpts.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
