import baseConfig from '@stickerapp-org/tailwind-config';

/** @type {import('tailwindcss').Config} */
const config = {
  ...baseConfig,
  content: ['./src/**/*.{html,js,svelte,ts}'],
};

export default config;
