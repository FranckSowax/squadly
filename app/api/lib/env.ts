import "dotenv/config";

function bool(value: string | undefined, fallback: boolean) {
  if (value === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

const nodeEnv = process.env.NODE_ENV ?? "development";

export const env = {
  nodeEnv,
  isProduction: nodeEnv === "production",
  isDevelopment: nodeEnv !== "production",

  /** Chaîne de connexion MySQL / MariaDB. */
  databaseUrl: process.env.DATABASE_URL ?? "mysql://root@127.0.0.1:3306/squadly",

  /** Secret de signature du JWT de session. */
  sessionSecret: process.env.SESSION_SECRET ?? "squadly-local-dev-secret-change-me",

  /**
   * Connexion démo : en local il n'y a pas de fournisseur OAuth Kimi,
   * le callback crée directement une session pour le coach de démonstration.
   */
  demoAuth: bool(process.env.DEMO_AUTH, nodeEnv !== "production"),

  port: parseInt(process.env.PORT ?? "3000", 10),
} as const;
