import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              displayName: true,
              fileName: false,
              pure: true,
              namespace: 'sc',
              meaninglessFileNames: ['index', 'styles']
            }
          ]
        ]
      }
    }),
    tsconfigPaths()
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/storybook.test.tsx', 'src/storybook-all.test.tsx'],
    setupFiles: ['.storybook/vitest.setup.ts'],
    restoreMocks: true,
    clearMocks: true,
    snapshotFormat: {
      printBasicPrototype: false,
      escapeString: false,
    }
  },
  resolve: {
    alias: {
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
}); 