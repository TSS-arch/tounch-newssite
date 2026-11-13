import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Admin app port 5173 par chalega
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
