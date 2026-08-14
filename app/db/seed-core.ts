import { getDb } from "../api/queries/connection";
import * as schema from "./schema";

/**
 * Seed Squadly — données de démo réalistes.
 * Organisation : AS Verrières Football (plan Premium), utilisateur : Karim Haddad (coach U13).
 * Idempotent : ne s'exécute que si aucun tenant n'existe.
 */
export async function seedIfEmpty() {
  const db = getDb();
  console.log("Seeding Squadly demo data...");

  const existing = await db.select().from(schema.tenants).limit(1);
  if (existing.length > 0) {
    console.log("Seed skipped — tenant already exists.");
    return;
  }

  // --- Tenant -------------------------------------------------------------
  const [tenant] = await db
    .insert(schema.tenants)
    .values({
      name: "AS Verrières Football",
      sport: "Football",
      whatsappNumber: "+33 6 12 34 56 78",
      channelConnected: true,
      demoMode: true,
      simSpeed: 1,
    })
    .$returningId();
  const tenantId = tenant.id;

  await db.insert(schema.subscriptions).values({
    tenantId,
    plan: "premium",
    interval: "monthly",
    status: "active",
    messagesQuota: 2000,
    messagesUsed: 847,
    currentPeriodEnd: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
  });

  // --- Équipes --------------------------------------------------------------
  const [u13] = await db
    .insert(schema.teams)
    .values({ tenantId, name: "U13 A", category: "Jeunes", color: "pitch" })
    .$returningId();
  const [u15] = await db
    .insert(schema.teams)
    .values({ tenantId, name: "U15", category: "Jeunes", color: "sun" })
    .$returningId();
  const [seniors] = await db
    .insert(schema.teams)
    .values({ tenantId, name: "Seniors B", category: "Adultes", color: "coral" })
    .$returningId();

  // --- Membres --------------------------------------------------------------
  type M = typeof schema.members.$inferInsert;
  const u13Players: Array<[string, string, string, string, number]> = [
    // prénom, nom, poste, couleur avatar, fiabilité
    ["Yanis", "Belkacem", "Attaquant", "lime", 100],
    ["Noé", "Fontaine", "Gardien", "mist", 95],
    ["Enzo", "Ricci", "Défenseur", "sun", 88],
    ["Adam", "Cherif", "Milieu", "coral", 92],
    ["Lucas", "Perrot", "Milieu", "mist", 76],
    ["Tom", "Nguyen", "Défenseur", "lime", 84],
    ["Raphaël", "Diallo", "Attaquant", "sun", 97],
    ["Hugo", "Lainé", "Milieu", "mist", 81],
    ["Maël", "Perrin", "Défenseur", "coral", 90],
    ["Sofiane", "Kaci", "Attaquant", "lime", 93],
    ["Ethan", "Moreau", "Milieu", "sun", 72],
    ["Nolan", "Petit", "Gardien", "mist", 88],
  ];
  const memberRows: M[] = u13Players.map(([f, l, pos, color, rel]) => ({
    tenantId,
    teamId: u13.id,
    firstName: f,
    lastName: l,
    role: "player",
    position: pos,
    phone: "+33 6 ** ** ** **",
    whatsappOptIn: true,
    avatarColor: color,
    reliability: rel,
  }));
  // 2 non opt-in « à inviter »
  memberRows.push(
    { tenantId, teamId: u13.id, firstName: "Léo", lastName: "Garnier", role: "player", position: "Milieu", phone: "", whatsappOptIn: false, avatarColor: "coral", reliability: 60 },
    { tenantId, teamId: u13.id, firstName: "Mathis", lastName: "Roche", role: "player", position: "Défenseur", phone: "", whatsappOptIn: false, avatarColor: "sun", reliability: 55 },
  );
  const insertedU13 = await db.insert(schema.members).values(memberRows).$returningId();
  const u13FirstNames = memberRows.map((r) => r.firstName);
  const yanis = insertedU13[0];
  const noe = insertedU13[1];

  // Parents liés
  await db.insert(schema.members).values([
    { tenantId, teamId: u13.id, firstName: "Samira", lastName: "Belkacem", role: "parent", position: "", phone: "+33 6 ** ** ** **", whatsappOptIn: true, linkedMemberId: yanis.id, avatarColor: "sun", reliability: 98 },
    { tenantId, teamId: u13.id, firstName: "Claire", lastName: "Fontaine", role: "parent", position: "", phone: "+33 6 ** ** ** **", whatsappOptIn: true, linkedMemberId: noe.id, avatarColor: "lime", reliability: 96 },
    { tenantId, teamId: u13.id, firstName: "Marc", lastName: "Ricci", role: "parent", position: "", phone: "+33 6 ** ** ** **", whatsappOptIn: true, avatarColor: "mist", reliability: 85 },
  ]);

  // U15 + Seniors (rosters plus courts pour la démo)
  const u15Names: Array<[string, string]> = [["Théo", "Lambert"], ["Jules", "Morel"], ["Rayan", "Ait Ahmed"], ["Nathan", "Barbier"], ["Sam", "Collet"], ["Ilyes", "Mansouri"]];
  const insertedU15 = await db.insert(schema.members).values(
    u15Names.map(([f, l], i) => ({ tenantId, teamId: u15.id, firstName: f, lastName: l, role: "player" as const, position: i === 0 ? "Gardien" : "Joueur", phone: "+33 6 ** ** ** **", whatsappOptIn: true, avatarColor: (["mist", "lime", "sun", "coral"] as const)[i % 4], reliability: 70 + (i * 5) % 28 })),
  ).$returningId();
  const senNames: Array<[string, string]> = [["Karim", "Bensaïd"], ["Julien", "Perrin"], ["Antoine", "Girard"], ["Mehdi", "Lopez"], ["Paul", "Fontaine"], ["Alex", "Rivière"], ["Sacha", "Barthez"], ["Romain", "Duval"]];
  const insertedSen = await db.insert(schema.members).values(
    senNames.map(([f, l], i) => ({ tenantId, teamId: seniors.id, firstName: f, lastName: l, role: "player" as const, position: "Joueur", phone: "+33 6 ** ** ** **", whatsappOptIn: true, avatarColor: (["lime", "sun", "mist", "coral"] as const)[i % 4], reliability: 75 + (i * 4) % 24 })),
  ).$returningId();

  // --- Événements -----------------------------------------------------------
  const now = Date.now();
  const day = 1000 * 60 * 60 * 24;
  const nextSaturday = new Date(now + 3 * day);
  nextSaturday.setHours(14, 30, 0, 0);
  const lastTuesday = new Date(now - 2 * day);
  lastTuesday.setHours(18, 0, 0, 0);
  const nextSunday = new Date(now + 4 * day);
  nextSunday.setHours(15, 0, 0, 0);
  const tournament = new Date(now + 17 * day);
  tournament.setHours(9, 0, 0, 0);

  const [matchU13] = await db.insert(schema.events).values({
    tenantId, teamId: u13.id, title: "Match — U13 A vs FC Montreuil", type: "match",
    startsAt: nextSaturday, location: "Stade Jean-Bouin, Verrières", opponent: "FC Montreuil",
    notes: "RDV 13 h 45 au stade. Maillots verts. Pensez aux crampons moulés.",
    status: "sent", sentAt: new Date(now - 2 * day), remindersSent: 1,
  }).$returningId();

  const [trainingPast] = await db.insert(schema.events).values({
    tenantId, teamId: u13.id, title: "Entraînement U13 — jeu en transition", type: "entrainement",
    startsAt: lastTuesday, location: "Terrain synthétique n°2", status: "closed", sentAt: new Date(now - 5 * day), remindersSent: 1,
  }).$returningId();

  await db.insert(schema.events).values({
    tenantId, teamId: u13.id, title: "Tournoi de printemps", type: "tournoi",
    startsAt: tournament, location: "Complexe sportif départemental", status: "draft",
    notes: "2 jours — prévoir pique-nique et crème solaire.",
  });

  await db.insert(schema.events).values({
    tenantId, teamId: seniors.id, title: "Match — Seniors B vs AS Choisy", type: "match",
    startsAt: nextSunday, location: "Stade municipal", opponent: "AS Choisy", status: "sent", sentAt: new Date(now - 1 * day),
  });

  // --- RSVPs match U13 (12 présents / 2 peut-être / 1 absent / 3 sans réponse)
  const sentAtMs = now - 2 * day;
  const rsvpSeed: Array<[number, "present" | "absent" | "maybe" | "none", string, number | null]> = [];
  insertedU13.forEach((m, i) => {
    const label = u13FirstNames[i] ?? "";
    if (i < 9) rsvpSeed.push([m.id, "present", label, 20 + i * 13]);
    else if (i < 10) rsvpSeed.push([m.id, "present", "Samira B. (maman)", 45]);
    else if (i < 11) rsvpSeed.push([m.id, "maybe", label, 130]);
    else if (i < 12) rsvpSeed.push([m.id, "maybe", label, 95]);
    else if (i < 13) rsvpSeed.push([m.id, "absent", "Claire F. (maman)", 60]);
    else rsvpSeed.push([m.id, "none", "", null]);
  });
  await db.insert(schema.rsvps).values(
    rsvpSeed.map(([memberId, status, respondedBy, delay]) => ({
      eventId: matchU13.id, memberId, status, respondedBy,
      respondedAt: status === "none" ? null : new Date(sentAtMs + (delay ?? 30) * 60000),
      responseDelayMin: delay,
    })),
  );
  // RSVPs entraînement passé (15/18 présents — stats historiques)
  await db.insert(schema.rsvps).values(
    insertedU13.map((m, i) => ({
      eventId: trainingPast.id, memberId: m.id,
      status: (i < 13 ? "present" : i < 15 ? "absent" : "maybe") as "present" | "absent" | "maybe",
      respondedBy: u13FirstNames[i] ?? "", respondedAt: new Date(now - 4 * day + i * 900000), responseDelayMin: 25 + i * 7,
    })),
  );

  // --- Sondages ---------------------------------------------------------------
  const [carpool] = await db.insert(schema.polls).values({
    tenantId, teamId: u13.id, question: "Covoiturage pour le match de samedi ?", status: "open",
    closesAt: new Date(now + 2 * day),
  }).$returningId();
  const carpoolOpts = await db.insert(schema.pollOptions).values([
    { pollId: carpool.id, label: "Je conduis (4 places)", sortOrder: 0 },
    { pollId: carpool.id, label: "Je cherche une place", sortOrder: 1 },
    { pollId: carpool.id, label: "Pas besoin", sortOrder: 2 },
  ]).$returningId();
  // 18 votes : 6 / 5 / 7
  const voters = insertedU13.slice(0, 12).concat(insertedU15.slice(0, 6));
  await db.insert(schema.pollVotes).values(
    voters.map((m, i) => ({
      pollId: carpool.id,
      optionId: carpoolOpts[i < 6 ? 0 : i < 11 ? 1 : 2].id,
      memberId: m.id,
      createdAt: new Date(now - day + i * 3600000),
    })),
  );

  const [gouter] = await db.insert(schema.polls).values({
    tenantId, teamId: u13.id, question: "Quelle date pour le goûter de fin de saison ?", status: "closed",
    closesAt: new Date(now - day),
  }).$returningId();
  const gouterOpts = await db.insert(schema.pollOptions).values([
    { pollId: gouter.id, label: "Sam. 21 juin", sortOrder: 0 },
    { pollId: gouter.id, label: "Sam. 28 juin", sortOrder: 1 },
    { pollId: gouter.id, label: "Dim. 29 juin", sortOrder: 2 },
  ]).$returningId();
  await db.insert(schema.pollVotes).values(
    voters.slice(0, 21 > voters.length ? voters.length : 21).map((m, i) => ({
      pollId: gouter.id, optionId: gouterOpts[i % 3 === 2 ? 1 : 0].id, memberId: m.id,
      createdAt: new Date(now - 3 * day + i * 5400000),
    })),
  );

  // --- Messages WhatsApp ------------------------------------------------------
  const log = (steps: string[], base: number, gapMin = 2) =>
    steps.map((s, i) => ({ status: s, at: new Date(base + i * gapMin * 60000).toISOString() }));

  const msgRows: Array<typeof schema.messages.$inferInsert> = [
    {
      tenantId, teamId: u13.id, eventId: matchU13.id, direction: "out", kind: "convocation",
      content: "Convocation — Match U13 A vs FC Montreuil\nSamedi 14 juin, 14 h 30 · Stade Jean-Bouin\nRDV 13 h 45. Maillots verts. Réponds en un tap :",
      status: "read", statusLog: log(["pending", "sent", "delivered", "read"], sentAtMs),
      buttons: ["Présent", "Absent", "Peut-être"], createdAt: new Date(sentAtMs),
    },
    {
      tenantId, teamId: u13.id, memberId: yanis.id, direction: "in", kind: "reponse",
      content: "Présent", status: null, createdAt: new Date(sentAtMs + 22 * 60000),
    },
    {
      tenantId, teamId: u13.id, memberId: noe.id, direction: "in", kind: "reponse",
      content: "Présent — papa nous dépose à 13 h 30", status: null, createdAt: new Date(sentAtMs + 47 * 60000),
    },
    {
      tenantId, teamId: u13.id, eventId: matchU13.id, direction: "out", kind: "rappel",
      content: "Rappel J-1 — Match demain 14 h 30 au Stade Jean-Bouin. Il manque encore ta réponse : Présent, Absent ou Peut-être ?",
      status: "delivered", statusLog: log(["pending", "sent", "delivered"], now - day),
      buttons: ["Présent", "Absent", "Peut-être"], createdAt: new Date(now - day),
    },
    {
      tenantId, teamId: u13.id, pollId: carpool.id, direction: "out", kind: "sondage",
      content: "Sondage — Covoiturage pour le match de samedi ? Vote directement ici :",
      status: "read", statusLog: log(["pending", "sent", "delivered", "read"], now - day),
      buttons: ["Je conduis (4 places)", "Je cherche une place", "Pas besoin"], createdAt: new Date(now - day),
    },
    {
      tenantId, teamId: u13.id, memberId: insertedU13[4].id, direction: "in", kind: "reponse",
      content: "Je cherche une place, merci !", status: null, createdAt: new Date(now - day + 35 * 60000),
    },
    {
      tenantId, teamId: u13.id, direction: "out", kind: "annonce",
      content: "Bienvenue sur Squadly ! Tu recevras ici les convocations et sondages des U13 A. Réponds STOP à tout moment pour ne plus recevoir de messages.",
      status: "read", statusLog: log(["pending", "sent", "delivered", "read"], now - 6 * day),
      createdAt: new Date(now - 6 * day),
    },
    {
      tenantId, teamId: seniors.id, direction: "out", kind: "convocation",
      content: "Convocation — Seniors B vs AS Choisy\nDimanche, 15 h 00 · Stade municipal. Confirme ta présence :",
      status: "sent", statusLog: log(["pending", "sent"], now - day),
      buttons: ["Présent", "Absent", "Peut-être"], createdAt: new Date(now - day),
    },
    {
      tenantId, teamId: u13.id, memberId: insertedU13[12].id, direction: "out", kind: "rappel",
      content: "Rappel — il nous manque ta réponse pour le match de samedi. Un tap suffit :",
      status: "requeued", statusLog: [...log(["pending", "sent", "failed"], now - 20 * 3600000, 3), { status: "requeued", at: new Date(now - 19 * 3600000).toISOString() }],
      buttons: ["Présent", "Absent", "Peut-être"], createdAt: new Date(now - 20 * 3600000),
    },
  ];
  await db.insert(schema.messages).values(msgRows);

  console.log("Done. Tenant: AS Verrières Football — U13 A, U15, Seniors B.");
}
