/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
    extends: ['./node.js', 'plugin:svelte/recommended'],
    env: {
        browser: true,
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.svelte'],
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
