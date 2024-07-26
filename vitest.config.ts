import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [tsconfigPaths(), react(), svgr()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/testSetup/setupTests.ts',
    coverage: {
      provider: 'v8',
      exclude: ['**/.eslintrc.cjs', 'vite.config.ts', 'vitest.config.ts', 'dist' ]
    },
  },
});