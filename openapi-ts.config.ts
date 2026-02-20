import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'openapi-spec.json',
  output: {
    path: 'libs/products/src/client',
    clean: true,
  },
  plugins: ['@hey-api/typescript', '@hey-api/sdk', '@hey-api/client-fetch'],
});
