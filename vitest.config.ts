import { vitePlugin as remix } from '@remix-run/dev';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    !process.env.VITEST
      ? remix({
          appDirectory: 'app',
        })
      : react(),
    tsconfigPaths(),
    svgr(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './app/testSetup/setupTests.ts',
    coverage: {
      provider: 'v8',
      exclude: [
        '**/.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        'dist',
        '.next',
        'app/entry.client.tsx',
        'app/entry.server.tsx',
        'app/vite-env.d.ts',
      ],
    },
    env: loadEnv('test', process.cwd(), ''),
  },
});
