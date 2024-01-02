// @ts-check

// ESLint severity types
const SeverityTypes = Object.freeze({
  OFF: 0,
  WARN: 1,
  ERROR: 2,
});

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
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
    'plugin:sonarjs/recommended',
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
  plugins: ['@typescript-eslint', 'simple-import-sort'],
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
  rules: {
    '@typescript-eslint/consistent-type-definitions': [
      SeverityTypes.ERROR,
      'type',
    ],
    '@typescript-eslint/consistent-type-imports': [
      SeverityTypes.ERROR,
      { fixStyle: 'separate-type-imports' },
    ],
    '@typescript-eslint/explicit-function-return-type': SeverityTypes.OFF,
    'import/first': SeverityTypes.ERROR,
    'import/newline-after-import': SeverityTypes.ERROR,
    'import/no-duplicates': SeverityTypes.ERROR,
    'jsx-a11y/alt-text': [
      SeverityTypes.ERROR,
      {
        elements: ['img'],
        img: ['Image'],
      },
    ],
    'jsx-a11y/anchor-has-content': [
      SeverityTypes.ERROR,
      { components: ['Link', 'NavLink'] },
    ],
    'react/jsx-no-leaked-render': [
      SeverityTypes.ERROR,
      { validStrategies: ['ternary'] },
    ],
    'simple-import-sort/exports': SeverityTypes.ERROR,
    'simple-import-sort/imports': SeverityTypes.ERROR,
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': SeverityTypes.OFF,
      },
    },
  ],
};
