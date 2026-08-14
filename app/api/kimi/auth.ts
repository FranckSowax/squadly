import * as cookie from "cookie";
import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { Session } from "@contracts/constants";
import * as s from "@db/schema";
import type { User } from "@db/schema";
import { getDb } from "../queries/connection";
import { env } from "../lib/env";
import { getSessionCookieOptions } from "../lib/cookies";

const secret = new TextEncoder().encode(env.sessionSecret);
const ISSUER = "squadly";

/** Coach de démonstration — correspond au tenant seedé (AS Verrières Football). */
const DEMO_USER = {
  unionId: "demo-coach-karim",
  name: "Karim Haddad",
  email: "karim@asverrieres.fr",
  avatar: null as string | null,
  role: "admin" as const,
};

// ---------------------------------------------------------------------------
// Session (JWT signé, stocké dans un cookie httpOnly)
// ---------------------------------------------------------------------------

export async function createSessionToken(userId: number): Promise<string> {
  return new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${Math.floor(Session.maxAgeMs / 1000)}s`)
    .sign(secret);
}

async function readSessionToken(token: string): Promise<number | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { issuer: ISSUER });
    const uid = payload.uid;
    return typeof uid === "number" ? uid : null;
  } catch {
    return null;
  }
}

/**
 * Résout l'utilisateur courant à partir du cookie de session.
 * Lève si aucune session valide — l'appelant décide quoi en faire.
 */
export async function authenticateRequest(headers: Headers): Promise<User> {
  const header = headers.get("cookie");
  if (!header) throw new Error("no cookie");

  const token = cookie.parse(header)[Session.cookieName];
  if (!token) throw new Error("no session cookie");

  const userId = await readSessionToken(token);
  if (!userId) throw new Error("invalid session");

  const [user] = await getDb().select().from(s.users).where(eq(s.users.id, userId));
  if (!user) throw new Error("unknown user");
  return user;
}

// ---------------------------------------------------------------------------
// Provisioning utilisateur
// ---------------------------------------------------------------------------

export async function upsertUser(profile: {
  unionId: string;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  role?: "user" | "admin";
}): Promise<User> {
  const db = getDb();
  const [existing] = await db.select().from(s.users).where(eq(s.users.unionId, profile.unionId));

  if (existing) {
    await db
      .update(s.users)
      .set({
        name: profile.name ?? existing.name,
        email: profile.email ?? existing.email,
        avatar: profile.avatar ?? existing.avatar,
        lastSignInAt: new Date(),
      })
      .where(eq(s.users.id, existing.id));
    const [refreshed] = await db.select().from(s.users).where(eq(s.users.id, existing.id));
    return refreshed;
  }

  const [row] = await db
    .insert(s.users)
    .values({
      unionId: profile.unionId,
      name: profile.name ?? null,
      email: profile.email ?? null,
      avatar: profile.avatar ?? null,
      role: profile.role ?? "user",
    })
    .$returningId();
  const [created] = await db.select().from(s.users).where(eq(s.users.id, row.id));
  return created;
}

/** Garantit l'existence du coach de démo (utilisé par le bootstrap et le login démo). */
export function ensureDemoUser(): Promise<User> {
  return upsertUser(DEMO_USER);
}

// ---------------------------------------------------------------------------
// Callback OAuth
// ---------------------------------------------------------------------------

/**
 * Handler du callback OAuth.
 *
 * En local (DEMO_AUTH=true) il n'y a pas de fournisseur externe : le callback
 * ouvre directement une session pour le coach de démonstration. L'emplacement
 * et la signature restent ceux attendus par un vrai flux OAuth, de sorte que
 * seul ce bloc soit à remplacer le jour où l'on branche Kimi.
 */
export function createOAuthCallbackHandler() {
  return async (c: Context) => {
    const redirectTo = c.req.query("redirect") || "/app";

    if (!env.demoAuth) {
      return c.json({ error: "OAuth provider not configured" }, 501);
    }

    let user: User;
    try {
      user = await ensureDemoUser();
    } catch (err) {
      console.error("[auth] impossible de créer la session démo:", err);
      return c.json({ error: "Base de données indisponible" }, 503);
    }

    const token = await createSessionToken(user.id);
    const opts = getSessionCookieOptions(c.req.raw.headers);

    c.header(
      "set-cookie",
      cookie.serialize(Session.cookieName, token, {
        httpOnly: opts.httpOnly,
        path: opts.path,
        sameSite: opts.sameSite.toLowerCase() as "lax" | "none",
        secure: opts.secure,
        maxAge: opts.maxAge,
      }),
      { append: true },
    );

    return c.redirect(redirectTo, 302);
  };
}
