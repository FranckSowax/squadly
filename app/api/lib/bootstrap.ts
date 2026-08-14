import { getPool } from "../queries/connection";
import { seedIfEmpty } from "@db/seed-core";
import { ensureDemoUser } from "../kimi/auth";

/**
 * DDL idempotente — miroir de `db/schema.ts`.
 * Permet à `npm run dev` de partir d'une base vide sans étape de migration.
 * (`npm run db:push` reste disponible pour les évolutions de schéma.)
 */
const TABLES: string[] = [
  `CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`unionId\` VARCHAR(255) NOT NULL,
    \`name\` VARCHAR(255) NULL,
    \`email\` VARCHAR(320) NULL,
    \`avatar\` TEXT NULL,
    \`role\` ENUM('user','admin') NOT NULL DEFAULT 'user',
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`lastSignInAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`users_unionId_unique\` (\`unionId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`tenants\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`name\` VARCHAR(255) NOT NULL,
    \`sport\` VARCHAR(80) NOT NULL DEFAULT 'Football',
    \`whatsappNumber\` VARCHAR(40) NULL,
    \`channelConnected\` TINYINT(1) NOT NULL DEFAULT 1,
    \`channelLastSeenAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`demoMode\` TINYINT(1) NOT NULL DEFAULT 1,
    \`simSpeed\` INT NOT NULL DEFAULT 1,
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`teams\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`tenantId\` BIGINT UNSIGNED NOT NULL,
    \`name\` VARCHAR(120) NOT NULL,
    \`category\` VARCHAR(60) NOT NULL DEFAULT '',
    \`color\` VARCHAR(20) NOT NULL DEFAULT 'pitch',
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`teams_tenantId_idx\` (\`tenantId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`members\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`tenantId\` BIGINT UNSIGNED NOT NULL,
    \`teamId\` BIGINT UNSIGNED NOT NULL,
    \`firstName\` VARCHAR(80) NOT NULL,
    \`lastName\` VARCHAR(80) NOT NULL,
    \`role\` ENUM('coach','player','parent') NOT NULL DEFAULT 'player',
    \`position\` VARCHAR(60) NOT NULL DEFAULT '',
    \`phone\` VARCHAR(40) NOT NULL DEFAULT '',
    \`whatsappOptIn\` TINYINT(1) NOT NULL DEFAULT 0,
    \`linkedMemberId\` BIGINT UNSIGNED NULL,
    \`avatarColor\` VARCHAR(20) NOT NULL DEFAULT 'mist',
    \`reliability\` INT NOT NULL DEFAULT 90,
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`members_teamId_idx\` (\`teamId\`),
    KEY \`members_tenantId_idx\` (\`tenantId\`),
    KEY \`members_linkedMemberId_idx\` (\`linkedMemberId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`events\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`tenantId\` BIGINT UNSIGNED NOT NULL,
    \`teamId\` BIGINT UNSIGNED NOT NULL,
    \`title\` VARCHAR(200) NOT NULL,
    \`type\` ENUM('match','entrainement','tournoi','autre') NOT NULL DEFAULT 'match',
    \`startsAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`location\` VARCHAR(200) NOT NULL DEFAULT '',
    \`opponent\` VARCHAR(120) NOT NULL DEFAULT '',
    \`notes\` TEXT NULL,
    \`status\` ENUM('draft','sent','closed') NOT NULL DEFAULT 'draft',
    \`sentAt\` TIMESTAMP NULL DEFAULT NULL,
    \`remindersSent\` INT NOT NULL DEFAULT 0,
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`events_tenantId_idx\` (\`tenantId\`),
    KEY \`events_teamId_idx\` (\`teamId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`rsvps\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`eventId\` BIGINT UNSIGNED NOT NULL,
    \`memberId\` BIGINT UNSIGNED NOT NULL,
    \`status\` ENUM('none','present','absent','maybe') NOT NULL DEFAULT 'none',
    \`respondedBy\` VARCHAR(120) NOT NULL DEFAULT '',
    \`respondedAt\` TIMESTAMP NULL DEFAULT NULL,
    \`responseDelayMin\` INT NULL,
    \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`rsvps_eventId_idx\` (\`eventId\`),
    KEY \`rsvps_memberId_idx\` (\`memberId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`polls\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`tenantId\` BIGINT UNSIGNED NOT NULL,
    \`teamId\` BIGINT UNSIGNED NOT NULL,
    \`question\` VARCHAR(300) NOT NULL,
    \`status\` ENUM('open','closed') NOT NULL DEFAULT 'open',
    \`multipleChoice\` TINYINT(1) NOT NULL DEFAULT 0,
    \`closesAt\` TIMESTAMP NULL DEFAULT NULL,
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`polls_tenantId_idx\` (\`tenantId\`),
    KEY \`polls_teamId_idx\` (\`teamId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`poll_options\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`pollId\` BIGINT UNSIGNED NOT NULL,
    \`label\` VARCHAR(200) NOT NULL,
    \`sortOrder\` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (\`id\`),
    KEY \`poll_options_pollId_idx\` (\`pollId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`poll_votes\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`pollId\` BIGINT UNSIGNED NOT NULL,
    \`optionId\` BIGINT UNSIGNED NOT NULL,
    \`memberId\` BIGINT UNSIGNED NOT NULL,
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`poll_votes_pollId_idx\` (\`pollId\`),
    KEY \`poll_votes_optionId_idx\` (\`optionId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`messages\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`tenantId\` BIGINT UNSIGNED NOT NULL,
    \`teamId\` BIGINT UNSIGNED NULL,
    \`eventId\` BIGINT UNSIGNED NULL,
    \`pollId\` BIGINT UNSIGNED NULL,
    \`memberId\` BIGINT UNSIGNED NULL,
    \`direction\` ENUM('in','out') NOT NULL,
    \`kind\` ENUM('convocation','rappel','sondage','annonce','reponse') NOT NULL DEFAULT 'annonce',
    \`content\` TEXT NOT NULL,
    \`status\` ENUM('pending','sent','delivered','read','failed','requeued') NULL DEFAULT NULL,
    \`statusLog\` JSON NOT NULL DEFAULT '[]',
    \`buttons\` JSON NOT NULL DEFAULT '[]',
    \`createdAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    KEY \`messages_tenantId_idx\` (\`tenantId\`),
    KEY \`messages_teamId_idx\` (\`teamId\`),
    KEY \`messages_createdAt_idx\` (\`createdAt\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS \`subscriptions\` (
    \`id\` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    \`tenantId\` BIGINT UNSIGNED NOT NULL,
    \`plan\` ENUM('freemium','premium','club') NOT NULL DEFAULT 'freemium',
    \`interval\` ENUM('monthly','yearly') NOT NULL DEFAULT 'monthly',
    \`status\` ENUM('trialing','active','past_due','canceled') NOT NULL DEFAULT 'active',
    \`messagesQuota\` INT NOT NULL DEFAULT 100,
    \`messagesUsed\` INT NOT NULL DEFAULT 0,
    \`trialEndsAt\` TIMESTAMP NULL DEFAULT NULL,
    \`currentPeriodEnd\` TIMESTAMP NULL DEFAULT NULL,
    \`updatedAt\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`subscriptions_tenantId_unique\` (\`tenantId\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

let started: Promise<void> | undefined;

/**
 * Crée les tables si besoin, insère les données de démo et le coach de démo.
 * Tolérant aux pannes : une base indisponible ne doit jamais empêcher le
 * serveur de démarrer (l'UI affichera l'erreur côté tRPC).
 */
export function bootstrapDatabase(): Promise<void> {
  if (started) return started;

  started = (async () => {
    try {
      const pool = getPool();
      for (const ddl of TABLES) {
        await pool.query(ddl);
      }
      await seedIfEmpty();
      await ensureDemoUser();
      console.log("[bootstrap] base de données prête.");
    } catch (err) {
      console.error(
        "[bootstrap] initialisation de la base impossible — l'app démarre quand même.\n" +
          "Vérifiez que MySQL/MariaDB tourne et que DATABASE_URL est correct.",
        err instanceof Error ? err.message : err,
      );
    }
  })();

  return started;
}
