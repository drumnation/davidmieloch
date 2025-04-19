/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import * as react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    (react as any).default(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    css: true,
  },
  resolve: {
    // alias: viteConfig.resolve?.alias,
  },
});
