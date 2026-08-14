import { Session } from "@contracts/constants";

export type SessionCookieOptions = {
  httpOnly: boolean;
  path: string;
  sameSite: "Lax" | "None";
  secure: boolean;
  maxAge: number;
};

/**
 * Options du cookie de session.
 * En HTTPS (proxy ou prod) on passe en SameSite=None; Secure pour supporter
 * l'app embarquée en iframe ; en local (http) on reste sur Lax.
 */
export function getSessionCookieOptions(headers: Headers): SessionCookieOptions {
  const proto = headers.get("x-forwarded-proto") ?? "";
  const origin = headers.get("origin") ?? headers.get("referer") ?? "";
  const isHttps = proto.includes("https") || origin.startsWith("https://");

  return {
    httpOnly: true,
    path: "/",
    sameSite: isHttps ? "None" : "Lax",
    secure: isHttps,
    maxAge: Math.floor(Session.maxAgeMs / 1000),
  };
}
