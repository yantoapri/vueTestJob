import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig((commad, mode) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      BASE_API: JSON.stringify(env.BASE_API),
    },
    build: {
      outDir: "dist", // Output directory
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"), // Entry point for the build
      },
    },
  };
});
