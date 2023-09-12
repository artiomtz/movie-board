import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    TMDB_TOKEN: `"${process.env.TMDB_TOKEN}"`,
    WATCHMODE_TOKEN: `"${process.env.WATCHMODE_TOKEN}"`,
    IPDATA_TOKEN: `"${process.env.IPDATA_TOKEN}"`,
    TELEMETRY_SERVER: `"${process.env.TELEMETRY_SERVER}"`,
    TELEMETRY_SERVER_LOCAL: `"${process.env.TELEMETRY_SERVER_LOCAL}"`,
  },
  plugins: [react()],
});
