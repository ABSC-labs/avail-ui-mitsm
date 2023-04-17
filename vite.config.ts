import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    eslint(),
    EnvironmentPlugin(['KEYCLOAK_SERVICE_PROTOCOL', 'KEYCLOAK_SERVICE_HOST', 'KEYCLOAK_SERVICE_PORT']),
  ],
  resolve: {
    alias: {
      '@crema': path.resolve(__dirname, './src/@crema'),
      types: path.resolve(__dirname, './src/types'),
      shared: path.resolve(__dirname, './src/shared'),
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  define: {
    'process.env': process.env,
  },
});
