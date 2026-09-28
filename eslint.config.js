// @ts-check

import eslint from '@eslint/js';
import love from 'eslint-config-love';
import prettier from 'eslint-config-prettier';
import deprecation from 'eslint-plugin-deprecation';
import a11y from 'eslint-plugin-jsx-a11y';
import n from 'eslint-plugin-n';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import sort from 'eslint-plugin-simple-import-sort';
import { configs as sonarConfigs } from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const files = ['**/*.{js,cjs,mjs,ts,tsx}'];

export default [
  {
    ignores: [
      '**/node_modules/**',
      '.wrangler/**',
      'functions/**',
      'public/build/**',
      'dist/**',
      '.tanstack/**',
      '**/pnpm-lock.yaml',
      '**/.dev.vars',
      '**/*.tsbuildinfo',
      'app/routeTree.gen.ts',
      '**/.claude/**',
    ],
  },
  {
    files,
    languageOptions: {
      globals: { ...globals.browser, ...globals.commonjs, ...globals.es2015 },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        project: ['./tsconfig.json', './tsconfig.eslint.json'],
        sourceType: 'module',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
    },
  },
  { ...eslint.configs.recommended, files },
  ...tseslint.configs.strictTypeChecked.map((config) => ({
    ...config,
    files: 'files' in config ? config.files : files,
  })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({
    ...config,
    files: 'files' in config ? config.files : files,
  })),
  {
    ...love,
    files,
    languageOptions: {
      ...love.languageOptions,
      parserOptions: { projectService: false },
    },
    plugins: { ...love.plugins, n },
  },
  { ...react.configs.flat['recommended'], files },
  { ...react.configs.flat['jsx-runtime'], files },
  { ...hooks.configs.flat.recommended, files },
  { ...a11y.flatConfigs.strict, files },
  {
    ...sonarConfigs.recommended,
    files,
    settings: { react: { version: 'detect' } },
  },
  {
    files,
    plugins: { deprecation },
    rules: deprecation.configs.recommended.rules,
  },
  { ...prettier, files },
  {
    files,
    plugins: { 'simple-import-sort': sort },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'jsx-a11y/alt-text': ['error', { elements: ['img'], img: ['Image'] }],
      'jsx-a11y/anchor-has-content': [
        'error',
        { components: ['Link', 'NavLink'] },
      ],
      'lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          line: { markers: ['*package', '!', '/', ',', '='] },
          block: {
            balanced: true,
            markers: ['*package', '!', ',', ':', '::', 'flow-include'],
            exceptions: ['*'],
          },
        },
      ],
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
];
