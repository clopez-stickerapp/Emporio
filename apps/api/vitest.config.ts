import tsconfigPaths from 'vite-tsconfig-paths';

// We will dynamically resolve the config to avoid setting type: module in the package.json
// and thus avoiding setting module resolution to esnext
async function loadConfig() {
  const { defineConfig } = await import('vitest/config');

  const config = defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      include: ['tests/**/*.{test,spec}.{js,ts}'],
      exclude: ['node_modules', 'dist', '*.config.ts'],
      server: {
        deps: {
          inline: ['$data/database', '@fastify/autoload'],
        },
      },
      globals: true,
      environment: 'node',
    },
  });
  return config;
}

export default loadConfig;