import { relations } from "drizzle-orm";
import {
  tenants,
  teams,
  members,
  events,
  rsvps,
  polls,
  pollOptions,
  pollVotes,
  messages,
  subscriptions,
} from "./schema";

export const tenantsRelations = relations(tenants, ({ many, one }) => ({
  teams: many(teams),
  members: many(members),
  events: many(events),
  subscription: one(subscriptions, {
    fields: [tenants.id],
    references: [subscriptions.tenantId],
  }),
}));

export const teamsRelations = relations(teams, ({ one, many }) => ({
  tenant: one(tenants, { fields: [teams.tenantId], references: [tenants.id] }),
  members: many(members),
  events: many(events),
}));

export const membersRelations = relations(members, ({ one, many }) => ({
  team: one(teams, { fields: [members.teamId], references: [teams.id] }),
  rsvps: many(rsvps),
  votes: many(pollVotes),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  team: one(teams, { fields: [events.teamId], references: [teams.id] }),
  rsvps: many(rsvps),
}));

export const rsvpsRelations = relations(rsvps, ({ one }) => ({
  event: one(events, { fields: [rsvps.eventId], references: [events.id] }),
  member: one(members, { fields: [rsvps.memberId], references: [members.id] }),
}));

export const pollsRelations = relations(polls, ({ one, many }) => ({
  team: one(teams, { fields: [polls.teamId], references: [teams.id] }),
  options: many(pollOptions),
  votes: many(pollVotes),
}));

export const pollOptionsRelations = relations(pollOptions, ({ one, many }) => ({
  poll: one(polls, { fields: [pollOptions.pollId], references: [polls.id] }),
  votes: many(pollVotes),
}));

export const pollVotesRelations = relations(pollVotes, ({ one }) => ({
  poll: one(polls, { fields: [pollVotes.pollId], references: [polls.id] }),
  option: one(pollOptions, { fields: [pollVotes.optionId], references: [pollOptions.id] }),
  member: one(members, { fields: [pollVotes.memberId], references: [members.id] }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  team: one(teams, { fields: [messages.teamId], references: [teams.id] }),
  event: one(events, { fields: [messages.eventId], references: [events.id] }),
  member: one(members, { fields: [messages.memberId], references: [members.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  tenant: one(tenants, { fields: [subscriptions.tenantId], references: [tenants.id] }),
}));
