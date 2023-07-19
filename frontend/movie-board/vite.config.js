import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    TMDB_TOKEN: `"${process.env.TMDB_TOKEN}"`,
    WATCHMODE_TOKEN: `"${process.env.WATCHMODE_TOKEN}"`,
  },
  plugins: [react()],
});
