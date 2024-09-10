import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['/src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'next.config.js',
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        'src/test/**',
      ],
    },
    css: false,
  },
});
