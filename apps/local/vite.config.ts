/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/local',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  resolve: {
    alias: {
      '@investbook-pages/common-ui': path.resolve(
        __dirname,
        '../../libs/common-ui/src/index.ts',
      ),
      '@investbook-pages/products': path.resolve(
        __dirname,
        '../../libs/products/src/index.ts',
      ),
      widgets: path.resolve(__dirname, 'src/app/widgets'),
    },
  },

  plugins: [tailwindcss(), react()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['html', 'text'],
      reportsDirectory: '../../coverage/apps/local',
    },
  },
});
