import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@views": "/src/views",
      "@assets": "/src/assets",
      "@router": "/src/router",
      "@store": "/src/store",
      "@styles": "/src/styles",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
    },
  },
});
