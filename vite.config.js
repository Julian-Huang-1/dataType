import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // 对静态资源进行单独打包
        assetFileNames: "static/[ext]/[name].[hash].[ext]",
        // 对项目依赖进行单独打包
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vandor";
          }
        },
      },
    },
  },
});
