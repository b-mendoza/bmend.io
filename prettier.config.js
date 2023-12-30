// @ts-check

/** @type {import('prettier').Config} */
const prettierConfig = {
  singleQuote: true,
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindFunctions: ['cn'],
};

export default prettierConfig;
