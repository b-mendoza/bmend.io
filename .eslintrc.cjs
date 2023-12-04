// @ts-check

// ESLint severity types
const SeverityTypes = Object.freeze({
  OFF: 0,
  WARN: 1,
  ERROR: 2,
});

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:deprecation/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/consistent-type-definitions': [
      SeverityTypes.ERROR,
      'type',
    ],
    '@typescript-eslint/explicit-function-return-type': SeverityTypes.OFF,
    // '@typescript-eslint/no-namespace': [
    //   SeverityTypes.ERROR,
    //   { allowDeclarations: true },
    // ],
    'jsx-a11y/anchor-has-content': [
      SeverityTypes.ERROR,
      {
        components: ['Link', 'NavLink'],
      },
    ],
    'react/jsx-no-leaked-render': [
      SeverityTypes.ERROR,
      { validStrategies: ['ternary'] },
    ],
    'react/prefer-read-only-props': SeverityTypes.ERROR,
  },
  settings: {
    react: {
      version: 'detect',
    },
    formComponents: ['Form'],
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' },
      { name: 'NavLink', linkAttribute: 'to' },
    ],
  },
};
