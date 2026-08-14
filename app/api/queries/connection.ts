import { drizzle } from "drizzle-orm/mysql2";
import type { MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@db/schema";
import * as relations from "@db/relations";
import { env } from "../lib/env";

const fullSchema = { ...schema, ...relations };

let pool: mysql.Pool | undefined;
let db: MySql2Database<typeof fullSchema> | undefined;

/** Pool MySQL partagé (créé à la première utilisation). */
export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      uri: env.databaseUrl,
      connectionLimit: 10,
      waitForConnections: true,
      // Les colonnes JSON reviennent déjà parsées ; les dates restent des Date.
      timezone: "Z",
    });
  }
  return pool;
}

/** Instance Drizzle partagée. */
export function getDb(): MySql2Database<typeof fullSchema> {
  if (!db) {
    db = drizzle(getPool(), { schema: fullSchema, mode: "default" });
  }
  return db;
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = undefined;
    db = undefined;
  }
}
