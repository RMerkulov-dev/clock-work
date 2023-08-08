import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "url";

// https://vitejs.dev/config/

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "nested/index.html"),
      },
    },
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
});
