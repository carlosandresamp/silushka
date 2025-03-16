import tailwindcss from "@tailwindcss/vite";
import gzip from "rollup-plugin-gzip";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import paths from "vite-tsconfig-paths";

import { name, version } from "./package.json";

export default defineConfig({
  plugins: [
    paths(),
    solid(),
    icons({
      compiler: "solid",
      iconCustomizer(collection, icon, props) {
        props.width = "100%";
        props.height = "100%";
        props["aria-hidden"] = "true";
      },
    }),
    tailwindcss(),
  ],
  test: {
    dir: "src",
    globals: true,
    environment: "jsdom",
    setupFiles: ["node_modules/@testing-library/jest-dom/vitest"],
  },
  server: {
    port: 3000,
  },
  define: {
    "import.meta.env.APP_NAME": JSON.stringify(name),
    "import.meta.env.APP_VERSION": JSON.stringify(version),
  },
  build: {
    target: "esnext",
    outDir: "public",
    rollupOptions: {
      plugins: [gzip()],
    },
  },
  publicDir: "assets",
});
