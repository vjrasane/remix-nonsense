import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { cjsInterop } from "vite-plugin-cjs-interop";

installGlobals();

export default defineConfig({
  plugins: [
    cjsInterop({
      dependencies: ["lodash/fp"],
    }),
    remix({
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
    // vanillaExtractPlugin(),
  ],
});
