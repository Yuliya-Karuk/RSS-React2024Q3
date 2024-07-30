import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testSetup/setupTests.ts',
    coverage: {
      provider: 'v8',
      exclude: ['**/.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'dist', '**/*.test.{js,jsx,ts,tsx}'],
    },
  },
});
