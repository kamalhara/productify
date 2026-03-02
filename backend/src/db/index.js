import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ENV } from "../config/env.js";
import * as schema from "./schema.js";

if (!ENV.DB_URL) {
  throw new Error("DB_URL is not defined");
}

const pool = new Pool({ connectionString: ENV.DB_URL });

pool.on("connect", () => {
  console.log("Db connected");
});

pool.on("error", (err) => {
  console.log("Db error", err);
});

export const db = drizzle({ client: pool, schema });
