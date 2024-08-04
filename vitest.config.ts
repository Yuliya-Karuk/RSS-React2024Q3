import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    open: true,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './testSetup/setupTests.ts',
    coverage: {
      provider: 'v8',
      exclude: ['**/.eslintrc.cjs', 'vitest.config.ts', 'next.config.js', '.next', 'dist', '**/*.test.{js,jsx,ts,tsx}'],
    },
    alias: {
      '@components': join(__dirname, 'components'),
      '@contexts': join(__dirname, 'contexts'),
      '@utils': join(__dirname, 'utils'),
      '@pages': join(__dirname, 'pages'),
      '@models': join(__dirname, 'models'),
      '@hooks': join(__dirname, 'hooks'),
      '@store': join(__dirname, 'store'),
      '@styles': join(__dirname, 'styles'),
      '@public': join(__dirname, 'public'),
      '@testSetup': join(__dirname, 'testSetup'),
    },
  },
  resolve: {
    alias: {
      '@public/icons/heart.svg': join(__dirname, 'testSetup/svgMock.js'),
    },
  },
});
