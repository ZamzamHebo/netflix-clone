import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Netflix-Clone-2025/", // 👈 very important!
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001,
  },
});
