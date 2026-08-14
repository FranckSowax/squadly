import { readFileSync } from "node:fs";
import path from "node:path";
import type { Env, Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";

/**
 * Sert le bundle Vite en production (dist/public) avec repli SPA :
 * toute route non-API renvoie index.html pour laisser React Router décider.
 */
export function serveStaticFiles<E extends Env>(app: Hono<E>) {
  const root = "./dist/public";
  const indexPath = path.resolve(process.cwd(), "dist/public/index.html");

  app.use("/assets/*", serveStatic({ root }));
  app.use("/*", serveStatic({ root }));

  app.get("*", (c) => {
    try {
      return c.html(readFileSync(indexPath, "utf-8"));
    } catch {
      return c.text("Build introuvable — lancez `npm run build`.", 500);
    }
  });
}
