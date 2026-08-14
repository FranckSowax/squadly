import { and, asc, desc, eq, gt, isNull, ne, sql } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import * as s from "@db/schema";
import { PLANS, type PlanId } from "@contracts/plans";
import { getDb } from "./queries/connection";
import { authedQuery, createRouter } from "./middleware";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Démo mono-organisation : renvoie le tenant unique (seedé). */
async function getTenant() {
  const t = await getDb().select().from(s.tenants).limit(1);
  if (!t[0]) throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Aucune organisation — lancez le seed." });
  return t[0];
}

const memberName = (m: typeof s.members.$inferSelect) => `${m.firstName} ${m.lastName.charAt(0)}.`;

async function rsvpCounts(eventId: number) {
  const rows = await getDb().select().from(s.rsvps).where(eq(s.rsvps.eventId, eventId));
  return {
    present: rows.filter((r) => r.status === "present").length,
    absent: rows.filter((r) => r.status === "absent").length,
    maybe: rows.filter((r) => r.status === "maybe").length,
    none: rows.filter((r) => r.status === "none").length,
    total: rows.length,
  };
}

function pushLog(log: Array<{ status: string; at: string }>, status: string) {
  return [...log, { status, at: new Date().toISOString() }];
}

async function bumpUsage(n = 1) {
  await getDb()
    .update(s.subscriptions)
    .set({ messagesUsed: sql`${s.subscriptions.messagesUsed} + ${n}`, updatedAt: new Date() });
}

// ---------------------------------------------------------------------------
// Tenant / settings / billing
// ---------------------------------------------------------------------------

const tenantRouter = createRouter({
  get: authedQuery.query(async () => {
    const tenant = await getTenant();
    const [sub] = await getDb().select().from(s.subscriptions).where(eq(s.subscriptions.tenantId, tenant.id));
    return { tenant, subscription: sub ?? null, plans: PLANS };
  }),

  setChannel: authedQuery
    .input(z.object({ connected: z.boolean() }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      await getDb().update(s.tenants)
        .set({ channelConnected: input.connected, channelLastSeenAt: new Date() })
        .where(eq(s.tenants.id, tenant.id));
      return { connected: input.connected };
    }),

  reconnect: authedQuery.mutation(async () => {
    const tenant = await getTenant();
    // QR simulé : la reconnexion prend effet immédiatement côté démo
    await getDb().update(s.tenants)
      .set({ channelConnected: true, channelLastSeenAt: new Date() })
      .where(eq(s.tenants.id, tenant.id));
    return { connected: true, lastSeenAt: new Date() };
  }),

  setDemo: authedQuery
    .input(z.object({ demoMode: z.boolean().optional(), simSpeed: z.number().min(0).max(3).optional() }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      await getDb().update(s.tenants)
        .set({
          ...(input.demoMode !== undefined ? { demoMode: input.demoMode } : {}),
          ...(input.simSpeed !== undefined ? { simSpeed: input.simSpeed } : {}),
        })
        .where(eq(s.tenants.id, tenant.id));
      return { ok: true };
    }),

  rename: authedQuery
    .input(z.object({ name: z.string().min(2).max(255) }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      await getDb().update(s.tenants).set({ name: input.name }).where(eq(s.tenants.id, tenant.id));
      return { ok: true };
    }),

  changePlan: authedQuery
    .input(z.object({ plan: z.enum(["freemium", "premium", "club"]), interval: z.enum(["monthly", "yearly"]) }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      const def = PLANS.find((p) => p.id === (input.plan as PlanId));
      if (!def) throw new TRPCError({ code: "BAD_REQUEST" });
      await getDb().update(s.subscriptions)
        .set({
          plan: input.plan,
          interval: input.interval,
          status: "active",
          messagesQuota: def.messagesQuota,
          currentPeriodEnd: new Date(Date.now() + (input.interval === "yearly" ? 365 : 30) * 24 * 3600 * 1000),
          updatedAt: new Date(),
        })
        .where(eq(s.subscriptions.tenantId, tenant.id));
      return { ok: true, plan: input.plan, interval: input.interval };
    }),
});

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

const dashboardRouter = createRouter({
  summary: authedQuery.query(async () => {
    const tenant = await getTenant();
    const db = getDb();
    const now = new Date();

    const upcoming = await db
      .select()
      .from(s.events)
      .where(and(eq(s.events.tenantId, tenant.id), gt(s.events.startsAt, now), ne(s.events.status, "draft")))
      .orderBy(asc(s.events.startsAt))
      .limit(1);

    const nextEvent = upcoming[0] ?? null;
    let nextEventData = null;
    if (nextEvent) {
      const [team] = await db.select().from(s.teams).where(eq(s.teams.id, nextEvent.teamId));
      const counts = await rsvpCounts(nextEvent.id);
      const unanswered = await db
        .select({ m: s.members })
        .from(s.rsvps)
        .innerJoin(s.members, eq(s.rsvps.memberId, s.members.id))
        .where(and(eq(s.rsvps.eventId, nextEvent.id), eq(s.rsvps.status, "none")));
      nextEventData = { event: nextEvent, team, counts, unanswered: unanswered.map((u) => u.m) };
    }

    const allTeams = await db.select().from(s.teams).where(eq(s.teams.tenantId, tenant.id));
    const allMembers = await db.select().from(s.members).where(eq(s.members.tenantId, tenant.id));
    const allRsvps = await db
      .select({ r: s.rsvps })
      .from(s.rsvps)
      .innerJoin(s.events, eq(s.rsvps.eventId, s.events.id))
      .where(eq(s.events.tenantId, tenant.id));
    const answered = allRsvps.filter((x) => x.r.status !== "none").length;
    const responseRate = allRsvps.length ? Math.round((answered / allRsvps.length) * 100) : 0;
    const delays = allRsvps.map((x) => x.r.responseDelayMin).filter((d): d is number => d != null).sort((a, b) => a - b);
    const medianDelay = delays.length ? delays[Math.floor(delays.length / 2)] : null;

    const [sub] = await db.select().from(s.subscriptions).where(eq(s.subscriptions.tenantId, tenant.id));
    const unreadIn = await db.select({ id: s.messages.id }).from(s.messages)
      .where(and(eq(s.messages.tenantId, tenant.id), eq(s.messages.direction, "in")));

    return {
      tenant,
      nextEvent: nextEventData,
      kpis: {
        teams: allTeams.length,
        members: allMembers.filter((m) => m.role === "player").length,
        responseRate,
        medianDelayMin: medianDelay,
        unreadMessages: unreadIn.length,
      },
      subscription: sub ?? null,
    };
  }),
});

// ---------------------------------------------------------------------------
// Équipes & membres
// ---------------------------------------------------------------------------

const teamsRouter = createRouter({
  list: authedQuery.query(async () => {
    const tenant = await getTenant();
    const db = getDb();
    const teams = await db.select().from(s.teams).where(eq(s.teams.tenantId, tenant.id));
    const result = [];
    for (const t of teams) {
      const members = await db.select().from(s.members)
        .where(and(eq(s.members.teamId, t.id), eq(s.members.role, "player")));
      const parents = await db.select().from(s.members)
        .where(and(eq(s.members.teamId, t.id), eq(s.members.role, "parent")));
      const evts = await db.select().from(s.events)
        .where(and(eq(s.events.teamId, t.id), gt(s.events.startsAt, new Date())))
        .orderBy(asc(s.events.startsAt)).limit(1);
      const rsvpRows = await db.select({ r: s.rsvps }).from(s.rsvps)
        .innerJoin(s.events, eq(s.rsvps.eventId, s.events.id))
        .where(eq(s.events.teamId, t.id));
      const answered = rsvpRows.filter((x) => x.r.status !== "none").length;
      const rate = rsvpRows.length ? Math.round((answered / rsvpRows.length) * 100) : null;
      result.push({ team: t, players: members.length, parents: parents.length, responseRate: rate, nextEvent: evts[0] ?? null });
    }
    return result;
  }),

  members: authedQuery
    .input(z.object({ teamId: z.number() }))
    .query(async ({ input }) => {
      const rows = await getDb().select().from(s.members)
        .where(eq(s.members.teamId, input.teamId))
        .orderBy(asc(s.members.role), asc(s.members.lastName));
      return rows;
    }),

  invite: authedQuery
    .input(z.object({ memberId: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [m] = await db.select().from(s.members).where(eq(s.members.id, input.memberId));
      if (!m) throw new TRPCError({ code: "NOT_FOUND" });
      await db.insert(s.messages).values({
        tenantId: m.tenantId, teamId: m.teamId, memberId: m.id, direction: "out", kind: "annonce",
        content: `Invitation Squadly — ${m.firstName}, ton coach t'invite à recevoir les convocations des ${""}U13 A sur WhatsApp. Réponds OUI pour accepter. Tu pourras répondre STOP à tout moment.`,
        status: "pending", statusLog: [{ status: "pending", at: new Date().toISOString() }],
      });
      await bumpUsage(1);
      return { ok: true };
    }),

  markOptIn: authedQuery
    .input(z.object({ memberId: z.number(), optIn: z.boolean() }))
    .mutation(async ({ input }) => {
      await getDb().update(s.members).set({ whatsappOptIn: input.optIn }).where(eq(s.members.id, input.memberId));
      return { ok: true };
    }),

  createMember: authedQuery
    .input(z.object({
      teamId: z.number(), firstName: z.string().min(1), lastName: z.string().min(1),
      role: z.enum(["coach", "player", "parent"]).default("player"),
      position: z.string().default(""), phone: z.string().default(""),
      linkedMemberId: z.number().nullable().default(null),
    }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      const colors = ["mist", "lime", "sun", "coral"] as const;
      const [row] = await getDb().insert(s.members).values({
        tenantId: tenant.id, teamId: input.teamId, firstName: input.firstName, lastName: input.lastName,
        role: input.role, position: input.position, phone: input.phone,
        whatsappOptIn: !!input.phone, linkedMemberId: input.linkedMemberId ?? undefined,
        avatarColor: colors[Math.floor(Math.random() * colors.length)], reliability: 80,
      }).$returningId();
      return { id: row.id };
    }),
});

// ---------------------------------------------------------------------------
// Événements / convocations
// ---------------------------------------------------------------------------

const eventsRouter = createRouter({
  list: authedQuery.query(async () => {
    const tenant = await getTenant();
    const db = getDb();
    const evts = await db.select().from(s.events)
      .where(eq(s.events.tenantId, tenant.id))
      .orderBy(desc(s.events.startsAt));
    const out = [];
    for (const e of evts) {
      const [team] = await db.select().from(s.teams).where(eq(s.teams.id, e.teamId));
      out.push({ event: e, team, counts: e.status === "draft" ? null : await rsvpCounts(e.id) });
    }
    return out;
  }),

  byId: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [event] = await db.select().from(s.events).where(eq(s.events.id, input.id));
      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      const [team] = await db.select().from(s.teams).where(eq(s.teams.id, event.teamId));
      const rows = await db.select({ r: s.rsvps, m: s.members }).from(s.rsvps)
        .innerJoin(s.members, eq(s.rsvps.memberId, s.members.id))
        .where(eq(s.rsvps.eventId, event.id));
      return {
        event, team,
        board: {
          present: rows.filter((x) => x.r.status === "present"),
          absent: rows.filter((x) => x.r.status === "absent"),
          maybe: rows.filter((x) => x.r.status === "maybe"),
          none: rows.filter((x) => x.r.status === "none"),
        },
      };
    }),

  create: authedQuery
    .input(z.object({
      teamId: z.number(), title: z.string().min(3), type: z.enum(["match", "entrainement", "tournoi", "autre"]),
      startsAt: z.date(), location: z.string().default(""), opponent: z.string().default(""),
      notes: z.string().default(""), sendNow: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      const db = getDb();
      const [evt] = await db.insert(s.events).values({
        tenantId: tenant.id, teamId: input.teamId, title: input.title, type: input.type,
        startsAt: input.startsAt, location: input.location, opponent: input.opponent,
        notes: input.notes || null, status: input.sendNow ? "sent" : "draft",
        sentAt: input.sendNow ? new Date() : null,
      }).$returningId();

      if (input.sendNow) {
        await sendConvocation(tenant.id, evt.id, input.teamId, input);
      }
      return { id: evt.id, sent: input.sendNow };
    }),

  send: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [event] = await db.select().from(s.events).where(eq(s.events.id, input.id));
      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      if (event.status !== "draft") throw new TRPCError({ code: "BAD_REQUEST", message: "Déjà envoyée" });
      await db.update(s.events).set({ status: "sent", sentAt: new Date() }).where(eq(s.events.id, event.id));
      await sendConvocation(event.tenantId, event.id, event.teamId, event);
      return { ok: true };
    }),

  remind: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [event] = await db.select().from(s.events).where(eq(s.events.id, input.id));
      if (!event) throw new TRPCError({ code: "NOT_FOUND" });
      const pending = await db.select({ r: s.rsvps, m: s.members }).from(s.rsvps)
        .innerJoin(s.members, eq(s.rsvps.memberId, s.members.id))
        .where(and(eq(s.rsvps.eventId, event.id), eq(s.rsvps.status, "none")));
      if (pending.length === 0) return { reminded: 0 };
      await db.insert(s.messages).values({
        tenantId: event.tenantId, teamId: event.teamId, eventId: event.id, direction: "out", kind: "rappel",
        content: `Rappel — ${event.title}\nIl nous manque ta réponse : Présent, Absent ou Peut-être ? Un tap suffit :`,
        status: "pending", statusLog: [{ status: "pending", at: new Date().toISOString() }],
        buttons: ["Présent", "Absent", "Peut-être"],
      });
      await db.update(s.events).set({ remindersSent: event.remindersSent + 1 }).where(eq(s.events.id, event.id));
      await bumpUsage(pending.length);
      return { reminded: pending.length };
    }),
});

async function sendConvocation(
  tenantId: number,
  eventId: number,
  teamId: number,
  e: { title: string; startsAt: Date; location: string; notes?: string | null },
) {
  const db = getDb();
  const players = await db.select().from(s.members)
    .where(and(eq(s.members.teamId, teamId), eq(s.members.role, "player")));
  // RSVP « none » pour chaque joueur opt-in
  const optIns = players.filter((p) => p.whatsappOptIn);
  if (optIns.length) {
    await db.insert(s.rsvps).values(optIns.map((p) => ({ eventId, memberId: p.id, status: "none" as const })));
  }
  const dateStr = e.startsAt.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const timeStr = e.startsAt.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  await db.insert(s.messages).values({
    tenantId, teamId, eventId, direction: "out", kind: "convocation",
    content: `Convocation — ${e.title}\n${dateStr}, ${timeStr}${e.location ? ` · ${e.location}` : ""}${e.notes ? `\n${e.notes}` : ""}\nRéponds en un tap :`,
    status: "pending", statusLog: [{ status: "pending", at: new Date().toISOString() }],
    buttons: ["Présent", "Absent", "Peut-être"],
  });
  await bumpUsage(optIns.length);
}

// ---------------------------------------------------------------------------
// Sondages
// ---------------------------------------------------------------------------

const pollsRouter = createRouter({
  list: authedQuery.query(async () => {
    const tenant = await getTenant();
    const db = getDb();
    const polls = await db.select().from(s.polls)
      .where(eq(s.polls.tenantId, tenant.id)).orderBy(desc(s.polls.createdAt));
    const out = [];
    for (const p of polls) {
      const options = await db.select().from(s.pollOptions).where(eq(s.pollOptions.pollId, p.id)).orderBy(asc(s.pollOptions.sortOrder));
      const votes = await db.select().from(s.pollVotes).where(eq(s.pollVotes.pollId, p.id));
      const [team] = await db.select().from(s.teams).where(eq(s.teams.id, p.teamId));
      out.push({
        poll: p, team,
        options: options.map((o) => ({ ...o, votes: votes.filter((v) => v.optionId === o.id).length })),
        totalVotes: votes.length,
      });
    }
    return out;
  }),

  create: authedQuery
    .input(z.object({
      teamId: z.number(), question: z.string().min(5).max(300),
      options: z.array(z.string().min(1).max(200)).min(2).max(12),
      multipleChoice: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      const db = getDb();
      const [poll] = await db.insert(s.polls).values({
        tenantId: tenant.id, teamId: input.teamId, question: input.question, multipleChoice: input.multipleChoice,
      }).$returningId();
      await db.insert(s.pollOptions).values(input.options.map((label, i) => ({ pollId: poll.id, label, sortOrder: i })));
      await db.insert(s.messages).values({
        tenantId: tenant.id, teamId: input.teamId, pollId: poll.id, direction: "out", kind: "sondage",
        content: `Sondage — ${input.question}\nVote directement ici :`,
        status: "pending", statusLog: [{ status: "pending", at: new Date().toISOString() }],
        buttons: input.options,
      });
      await bumpUsage(1);
      return { id: poll.id };
    }),

  close: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().update(s.polls).set({ status: "closed" }).where(eq(s.polls.id, input.id));
      return { ok: true };
    }),
});

// ---------------------------------------------------------------------------
// Messages WhatsApp
// ---------------------------------------------------------------------------

const messagesRouter = createRouter({
  list: authedQuery
    .input(z.object({ teamId: z.number().optional(), limit: z.number().default(80) }))
    .query(async ({ input }) => {
      const tenant = await getTenant();
      const db = getDb();
      const cond = input.teamId
        ? and(eq(s.messages.tenantId, tenant.id), eq(s.messages.teamId, input.teamId))
        : eq(s.messages.tenantId, tenant.id);
      const rows = await db.select({
        msg: s.messages,
        memberName: s.members.firstName,
        memberLastName: s.members.lastName,
        memberColor: s.members.avatarColor,
        teamName: s.teams.name,
      }).from(s.messages)
        .leftJoin(s.members, eq(s.messages.memberId, s.members.id))
        .leftJoin(s.teams, eq(s.messages.teamId, s.teams.id))
        .where(cond)
        .orderBy(asc(s.messages.createdAt))
        .limit(input.limit);
      return rows;
    }),

  retry: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const [m] = await db.select().from(s.messages).where(eq(s.messages.id, input.id));
      if (!m || m.status !== "failed") throw new TRPCError({ code: "BAD_REQUEST" });
      await db.update(s.messages)
        .set({ status: "requeued", statusLog: pushLog(m.statusLog, "requeued") })
        .where(eq(s.messages.id, m.id));
      return { ok: true };
    }),

  send: authedQuery
    .input(z.object({ teamId: z.number(), content: z.string().min(1).max(1000) }))
    .mutation(async ({ input }) => {
      const tenant = await getTenant();
      await getDb().insert(s.messages).values({
        tenantId: tenant.id, teamId: input.teamId, direction: "out", kind: "annonce",
        content: input.content, status: "pending",
        statusLog: [{ status: "pending", at: new Date().toISOString() }],
      });
      await bumpUsage(1);
      return { ok: true };
    }),
});

// ---------------------------------------------------------------------------
// Statistiques
// ---------------------------------------------------------------------------

const statsRouter = createRouter({
  overview: authedQuery.query(async () => {
    const tenant = await getTenant();
    const db = getDb();
    const rows = await db.select({ r: s.rsvps, m: s.members, e: s.events }).from(s.rsvps)
      .innerJoin(s.members, eq(s.rsvps.memberId, s.members.id))
      .innerJoin(s.events, eq(s.rsvps.eventId, s.events.id))
      .where(eq(s.events.tenantId, tenant.id));

    const answered = rows.filter((x) => x.r.status !== "none");
    const responseRate = rows.length ? Math.round((answered.length / rows.length) * 100) : 0;
    const delays = answered.map((x) => x.r.responseDelayMin).filter((d): d is number => d != null).sort((a, b) => a - b);
    const medianDelay = delays.length ? delays[Math.floor(delays.length / 2)] : null;

    // Présences par joueur
    const byMember = new Map<number, { name: string; color: string; present: number; total: number; reliability: number }>();
    for (const x of rows) {
      const cur = byMember.get(x.m.id) ?? { name: memberName(x.m), color: x.m.avatarColor, present: 0, total: 0, reliability: x.m.reliability };
      cur.total += 1;
      if (x.r.status === "present") cur.present += 1;
      byMember.set(x.m.id, cur);
    }
    const attendance = [...byMember.values()]
      .map((v) => ({ ...v, rate: v.total ? Math.round((v.present / v.total) * 100) : 0 }))
      .sort((a, b) => b.rate - a.rate);

    // Leaderboard fiabilité
    const leaderboard = [...byMember.values()].sort((a, b) => b.reliability - a.reliability).slice(0, 5);

    // Tendance 8 semaines (déterministe, dérivée des données réelles + progression)
    const weeks = ["S-7", "S-6", "S-5", "S-4", "S-3", "S-2", "S-1", "Cette sem."];
    const base = Math.max(60, responseRate - 14);
    const trend = weeks.map((w, i) => ({
      week: w,
      "U13 A": Math.min(99, base + i * 2 + (i % 3)),
      "U15": Math.min(97, base - 4 + i * 1.5 + (i % 2) * 2),
      "Seniors B": Math.min(98, base - 2 + i * 1.8 + ((i + 1) % 3)),
    }));

    // Histogramme rapidité de réponse
    const buckets = [
      { label: "< 15 min", count: 0 }, { label: "15-30 min", count: 0 },
      { label: "30-60 min", count: 0 }, { label: "1-3 h", count: 0 }, { label: "> 3 h", count: 0 },
    ];
    for (const d of delays) {
      if (d < 15) buckets[0].count++;
      else if (d < 30) buckets[1].count++;
      else if (d < 60) buckets[2].count++;
      else if (d < 180) buckets[3].count++;
      else buckets[4].count++;
    }

    return { responseRate, medianDelayMin: medianDelay, attendance, leaderboard, trend, speedBuckets: buckets, totalEvents: new Set(rows.map((x) => x.e.id)).size };
  }),
});

// ---------------------------------------------------------------------------
// Simulateur temps réel (mode démo)
// ---------------------------------------------------------------------------

const simRouter = createRouter({
  tick: authedQuery.mutation(async () => {
    const db = getDb();
    const tenant = await getTenant();
    if (!tenant.demoMode || tenant.simSpeed === 0) return { messages: 0, rsvps: 0, votes: 0, paused: true };

    const speed = tenant.simSpeed;
    let progressed = 0, newRsvps = 0, newVotes = 0;

    // 1. Progression des messages sortants dans la machine à états
    const outgoing = await db.select().from(s.messages).where(
      and(
        eq(s.messages.tenantId, tenant.id),
        eq(s.messages.direction, "out"),
        sql`${s.messages.status} IN ('pending','sent','delivered','requeued')`,
      ),
    );
    for (const m of outgoing) {
      if (Math.random() > 0.55 * speed) continue;
      let next: "pending" | "sent" | "delivered" | "read" | "failed" | "requeued" = m.status ?? "pending";
      if (m.status === "pending") next = Math.random() < 0.06 ? "failed" : "sent";
      else if (m.status === "requeued") next = "sent";
      else if (m.status === "sent") next = "delivered";
      else if (m.status === "delivered") next = Math.random() < 0.7 ? "read" : "delivered";
      if (next !== m.status) {
        await db.update(s.messages).set({ status: next, statusLog: pushLog(m.statusLog, next) }).where(eq(s.messages.id, m.id));
        progressed++;
      }
    }

    if (!tenant.channelConnected) {
      await db.update(s.tenants).set({ channelLastSeenAt: new Date() }).where(eq(s.tenants.id, tenant.id));
      return { messages: progressed, rsvps: 0, votes: 0, paused: false };
    }

    // 2. Réponses entrantes aux convocations (RSVP)
    const openEvents = await db.select().from(s.events).where(
      and(eq(s.events.tenantId, tenant.id), eq(s.events.status, "sent"), gt(s.events.startsAt, new Date())),
    );
    for (const evt of openEvents) {
      const pendings = await db.select({ r: s.rsvps, m: s.members }).from(s.rsvps)
        .innerJoin(s.members, eq(s.rsvps.memberId, s.members.id))
        .where(and(eq(s.rsvps.eventId, evt.id), eq(s.rsvps.status, "none"), eq(s.members.whatsappOptIn, true)));
      for (const { r, m } of pendings) {
        if (Math.random() > 0.22 * speed) continue;
        const roll = Math.random();
        const status = roll < 0.7 ? "present" : roll < 0.85 ? "maybe" : "absent";
        const delayMin = evt.sentAt ? Math.max(1, Math.round((Date.now() - evt.sentAt.getTime()) / 60000)) : null;
        // Réponse déléguée : si un parent opt-in est lié, il répond parfois pour l'enfant
        const [parent] = await db.select().from(s.members)
          .where(and(eq(s.members.linkedMemberId, m.id), eq(s.members.whatsappOptIn, true))).limit(1);
        const byParent = parent && Math.random() < 0.4;
        const respondedBy = byParent ? `${parent.firstName} ${parent.lastName.charAt(0)}. (parent)` : memberName(m);
        await db.update(s.rsvps)
          .set({ status, respondedBy, respondedAt: new Date(), responseDelayMin: delayMin, updatedAt: new Date() })
          .where(eq(s.rsvps.id, r.id));
        await db.insert(s.messages).values({
          tenantId: tenant.id, teamId: evt.teamId, eventId: evt.id, memberId: byParent ? parent.id : m.id,
          direction: "in", kind: "reponse",
          content: status === "present" ? "Présent" : status === "absent" ? "Absent, désolé" : "Peut-être, je confirme ce soir",
        });
        newRsvps++;
      }
    }

    // 3. Votes aux sondages ouverts
    const openPolls = await db.select().from(s.polls).where(
      and(eq(s.polls.tenantId, tenant.id), eq(s.polls.status, "open")),
    );
    for (const p of openPolls) {
      const options = await db.select().from(s.pollOptions).where(eq(s.pollOptions.pollId, p.id));
      if (!options.length) continue;
      const teamMembers = await db.select().from(s.members)
        .where(and(eq(s.members.teamId, p.teamId), eq(s.members.whatsappOptIn, true), isNull(s.members.linkedMemberId)));
      const votes = await db.select().from(s.pollVotes).where(eq(s.pollVotes.pollId, p.id));
      const voted = new Set(votes.map((v) => v.memberId));
      for (const m of teamMembers) {
        if (voted.has(m.id)) continue;
        if (Math.random() > 0.18 * speed) continue;
        const opt = options[Math.floor(Math.random() * options.length)];
        await db.insert(s.pollVotes).values({ pollId: p.id, optionId: opt.id, memberId: m.id });
        newVotes++;
      }
    }

    await db.update(s.tenants).set({ channelLastSeenAt: new Date() }).where(eq(s.tenants.id, tenant.id));
    return { messages: progressed, rsvps: newRsvps, votes: newVotes, paused: false };
  }),
});

// ---------------------------------------------------------------------------

export const squadlyRouter = createRouter({
  tenant: tenantRouter,
  dashboard: dashboardRouter,
  teams: teamsRouter,
  events: eventsRouter,
  polls: pollsRouter,
  messages: messagesRouter,
  stats: statsRouter,
  sim: simRouter,
});
