import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    svgr(),
    tsconfigPaths(),
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../app/styles/constants.scss"; @import "../app/styles/mixins.scss"; @import "../app/styles/placeholders.scss";`,
      },
    },
  },
});
