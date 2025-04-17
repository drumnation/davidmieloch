import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Next.js mocks
      'next/navigation': path.resolve(__dirname, '.storybook/nextjs-mock-module.js'),
      'next/router': path.resolve(__dirname, '.storybook/nextjs-mock-module.js'),
      'next/link': path.resolve(__dirname, '.storybook/nextjs-mock-module.js'),
      
      // Path aliases
      '@components': path.resolve(__dirname, './src/components'),
      '@shared-components': path.resolve(__dirname, './src/shared-components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@store': path.resolve(__dirname, './src/store'),
      '@providers': path.resolve(__dirname, './src/providers'),
      '@data': path.resolve(__dirname, './src/data'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
    },
  },
  test: {
    workspace: [
      // Dedicated workspace for component tests (non-Storybook)
      {
        extends: true,
        test: {
          name: 'components',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.snapshot.test.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['.storybook/utils/vitest-setup.ts'],
        },
      },
      // Dedicated workspace for snapshot tests
      {
        extends: true,
        test: {
          name: 'snapshots',
          include: ['src/**/*.test.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
          setupFiles: ['.storybook/utils/vitest-setup.ts'],
        },
      },
    ],
  },
});
