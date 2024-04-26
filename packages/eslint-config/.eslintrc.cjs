/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:svelte/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    extraFileExtensions: ['.svelte'],
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  rules: {
    'import/no-unresolved': 0,
    'import/default': 0,
    'import/order': 1,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  ],
  globals: {
    $props: 'readonly',
    $derived: 'readonly',
    $state: 'readonly',
    $effect: 'readonly',
  },
};
