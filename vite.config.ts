import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      //This pattern is needed to make env variables available in sanity.config.ts.
      "process.env.VITE_SANITY_STUDIO_DATASET": JSON.stringify(
        env.VITE_SANITY_STUDIO_DATASET
      ),
      "process.env.VITE_SANITY_STUDIO_FRONTEND_URL": JSON.stringify(
        env.VITE_SANITY_STUDIO_FRONTEND_URL
      ),
    },

    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
      }),

      tsconfigPaths(),
    ],
  };
});
