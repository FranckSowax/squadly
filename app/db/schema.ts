import {
  mysqlTable,
  mysqlEnum,
  serial,
  bigint,
  varchar,
  text,
  int,
  boolean,
  json,
  timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ---------------------------------------------------------------------------
// Squadly — modèle métier (multi-tenant, mono-organisation pour la démo)
// ---------------------------------------------------------------------------

export const tenants = mysqlTable("tenants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  sport: varchar("sport", { length: 80 }).default("Football").notNull(),
  whatsappNumber: varchar("whatsappNumber", { length: 40 }),
  channelConnected: boolean("channelConnected").default(true).notNull(),
  channelLastSeenAt: timestamp("channelLastSeenAt").defaultNow().notNull(),
  demoMode: boolean("demoMode").default(true).notNull(),
  simSpeed: int("simSpeed").default(1).notNull(), // 1 = normal, 2 = rapide, 0 = pause
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Tenant = typeof tenants.$inferSelect;

export const teams = mysqlTable("teams", {
  id: serial("id").primaryKey(),
  tenantId: bigint("tenantId", { mode: "number", unsigned: true }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  category: varchar("category", { length: 60 }).default("").notNull(),
  color: varchar("color", { length: 20 }).default("pitch").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Team = typeof teams.$inferSelect;

export const members = mysqlTable("members", {
  id: serial("id").primaryKey(),
  tenantId: bigint("tenantId", { mode: "number", unsigned: true }).notNull(),
  teamId: bigint("teamId", { mode: "number", unsigned: true }).notNull(),
  firstName: varchar("firstName", { length: 80 }).notNull(),
  lastName: varchar("lastName", { length: 80 }).notNull(),
  role: mysqlEnum("role", ["coach", "player", "parent"]).default("player").notNull(),
  position: varchar("position", { length: 60 }).default("").notNull(),
  phone: varchar("phone", { length: 40 }).default("").notNull(),
  whatsappOptIn: boolean("whatsappOptIn").default(false).notNull(),
  // parent lié à un joueur (réponse déléguée)
  linkedMemberId: bigint("linkedMemberId", { mode: "number", unsigned: true }),
  avatarColor: varchar("avatarColor", { length: 20 }).default("mist").notNull(),
  reliability: int("reliability").default(90).notNull(), // % de réponses historique (stats)
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Member = typeof members.$inferSelect;

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  tenantId: bigint("tenantId", { mode: "number", unsigned: true }).notNull(),
  teamId: bigint("teamId", { mode: "number", unsigned: true }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  type: mysqlEnum("type", ["match", "entrainement", "tournoi", "autre"]).default("match").notNull(),
  startsAt: timestamp("startsAt").notNull(),
  location: varchar("location", { length: 200 }).default("").notNull(),
  opponent: varchar("opponent", { length: 120 }).default("").notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["draft", "sent", "closed"]).default("draft").notNull(),
  sentAt: timestamp("sentAt"),
  remindersSent: int("remindersSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Event = typeof events.$inferSelect;

export const rsvps = mysqlTable("rsvps", {
  id: serial("id").primaryKey(),
  eventId: bigint("eventId", { mode: "number", unsigned: true }).notNull(),
  memberId: bigint("memberId", { mode: "number", unsigned: true }).notNull(),
  status: mysqlEnum("status", ["none", "present", "absent", "maybe"]).default("none").notNull(),
  respondedBy: varchar("respondedBy", { length: 120 }).default("").notNull(), // "Yanis B." ou "Samira B. (maman)"
  respondedAt: timestamp("respondedAt"),
  responseDelayMin: int("responseDelayMin"), // minutes entre envoi et réponse (stats)
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Rsvp = typeof rsvps.$inferSelect;

export const polls = mysqlTable("polls", {
  id: serial("id").primaryKey(),
  tenantId: bigint("tenantId", { mode: "number", unsigned: true }).notNull(),
  teamId: bigint("teamId", { mode: "number", unsigned: true }).notNull(),
  question: varchar("question", { length: 300 }).notNull(),
  status: mysqlEnum("status", ["open", "closed"]).default("open").notNull(),
  multipleChoice: boolean("multipleChoice").default(false).notNull(),
  closesAt: timestamp("closesAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Poll = typeof polls.$inferSelect;

export const pollOptions = mysqlTable("poll_options", {
  id: serial("id").primaryKey(),
  pollId: bigint("pollId", { mode: "number", unsigned: true }).notNull(),
  label: varchar("label", { length: 200 }).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
});
export type PollOption = typeof pollOptions.$inferSelect;

export const pollVotes = mysqlTable("poll_votes", {
  id: serial("id").primaryKey(),
  pollId: bigint("pollId", { mode: "number", unsigned: true }).notNull(),
  optionId: bigint("optionId", { mode: "number", unsigned: true }).notNull(),
  memberId: bigint("memberId", { mode: "number", unsigned: true }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PollVote = typeof pollVotes.$inferSelect;

export const messageStatusLogSchema = json;

export const messages = mysqlTable("messages", {
  id: serial("id").primaryKey(),
  tenantId: bigint("tenantId", { mode: "number", unsigned: true }).notNull(),
  teamId: bigint("teamId", { mode: "number", unsigned: true }),
  eventId: bigint("eventId", { mode: "number", unsigned: true }),
  pollId: bigint("pollId", { mode: "number", unsigned: true }),
  memberId: bigint("memberId", { mode: "number", unsigned: true }), // expéditeur (entrant) ou destinataire (sortant individuel)
  direction: mysqlEnum("direction", ["in", "out"]).notNull(),
  kind: mysqlEnum("kind", ["convocation", "rappel", "sondage", "annonce", "reponse"]).default("annonce").notNull(),
  content: text("content").notNull(),
  status: mysqlEnum("status", ["pending", "sent", "delivered", "read", "failed", "requeued"]),
  statusLog: json("statusLog").$type<Array<{ status: string; at: string }>>().default([]).notNull(),
  buttons: json("buttons").$type<string[]>().default([]).notNull(), // ["Présent","Absent","Peut-être"]
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Message = typeof messages.$inferSelect;

export const subscriptions = mysqlTable("subscriptions", {
  id: serial("id").primaryKey(),
  tenantId: bigint("tenantId", { mode: "number", unsigned: true }).notNull().unique(),
  plan: mysqlEnum("plan", ["freemium", "premium", "club"]).default("freemium").notNull(),
  interval: mysqlEnum("interval", ["monthly", "yearly"]).default("monthly").notNull(),
  status: mysqlEnum("status", ["trialing", "active", "past_due", "canceled"]).default("active").notNull(),
  messagesQuota: int("messagesQuota").default(100).notNull(),
  messagesUsed: int("messagesUsed").default(0).notNull(),
  trialEndsAt: timestamp("trialEndsAt"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Subscription = typeof subscriptions.$inferSelect;
