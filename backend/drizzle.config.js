import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/config/env.js";

export default defineConfig({
  schema: "./src/db/schema.js",
  dbCredentials: {
    url: ENV.DB_URL,
  },
  dialect: "postgresql",
});
