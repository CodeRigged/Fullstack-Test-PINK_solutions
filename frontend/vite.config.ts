import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 9000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "~/components": path.resolve(__dirname, "src/components"),
      "~/constans": path.resolve(__dirname, "src/constans"),
      "~/layouts": path.resolve(__dirname, "src/layouts"),
      "~/pages": path.resolve(__dirname, "src/pages"),
      "~/stores": path.resolve(__dirname, "src/stores"),
      "~/types": path.resolve(__dirname, "src/types"),
      "~/utils": path.resolve(__dirname, "src/utils"),
    },
  },
})
