const { resolve } = require('path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-turbo',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        project,
    },
    env: {
        es2017: true,
        node: true,
    },
    rules: {
        'no-unused-vars': 'off',
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
        'prettier/prettier': 'error',
    },
};
