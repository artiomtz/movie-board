import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    TMDB_TOKEN: `"${process.env.TMDB_TOKEN}"`,
    WATCHMODE_TOKEN: `"${process.env.WATCHMODE_TOKEN}"`,
    IPSTACK_TOKEN: `"${process.env.IPSTACK_TOKEN}"`,
    TELEMETRY_SERVER: `"${process.env.TELEMETRY_SERVER}"`,
    TELEMETRY_SERVER_LOCAL: `"${process.env.TELEMETRY_SERVER_LOCAL}"`,
  },
  plugins: [react()],
});
