// @ts-check

/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'xo',
    'xo-react',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/strict',
    'xo-typescript',
    'plugin:deprecation/recommended',
    'prettier',
  ],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.eslint.json'],
  },

  // ===========================================
  // Remix specific settings
  env: {
    browser: true,
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
  rules: {
    'jsx-a11y/anchor-has-content': [
      'error',
      {
        components: ['Link', 'NavLink'],
      },
    ],
    'react/jsx-no-leaked-render': ['warn', { validStrategies: ['ternary'] }],
  },
  // ===========================================
};
