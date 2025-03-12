import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@storybook/addon-docs'],
  },
  resolve: {
    dedupe: ['@storybook/react', 'react', 'react-dom'],
  },
}); 