import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), eslint()],
  resolve: {
    alias: {
      '@crema': path.resolve(__dirname, './src/@crema'),
      types: path.resolve(__dirname, './src/types'),
      shared: path.resolve(__dirname, './src/shared'),
    },
  },
});
