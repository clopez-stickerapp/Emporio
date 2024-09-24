import baseConfig from '@stickerapp-org/pallas/tailwind.config';

export default {
  ...baseConfig,
  content: [
    './src/**/*.{html,js,svelte,ts}',
    '../../node_modules/@stickerapp-org/**/*.{html,js,svelte,ts}',
  ],
};
