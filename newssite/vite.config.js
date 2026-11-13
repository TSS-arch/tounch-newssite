import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// News feed app port 5174 par chalega (admin se alag)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
  },
});
