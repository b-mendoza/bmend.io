// @ts-check

/** @type {import('prettier').Config} */
const prettierConfig = {
  singleQuote: true,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn'],
  tailwindStylesheet: './app/styles/global.styles.css',
};

export default prettierConfig;
