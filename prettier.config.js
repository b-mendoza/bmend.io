// @ts-check

/** @type {import('prettier').Config} */
const prettierConfig = {
  singleQuote: true,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['cn'],
};

export default prettierConfig;
