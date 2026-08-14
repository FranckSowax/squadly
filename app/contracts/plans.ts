// Plans Squadly — partagés frontend (page tarifs) + backend (billing router).
export type PlanId = "freemium" | "premium" | "club";

export interface PlanDef {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number; // euros / mois
  yearlyPrice: number; // euros / mois (facturé annuellement)
  messagesQuota: number;
  maxTeams: number; // -1 = illimité
  features: string[];
  cta: string;
}

export const PLANS: PlanDef[] = [
  {
    id: "freemium",
    name: "Découverte",
    tagline: "Pour tester avec une équipe",
    monthlyPrice: 0,
    yearlyPrice: 0,
    messagesQuota: 100,
    maxTeams: 1,
    features: [
      "1 équipe, 25 joueurs max",
      "Convocations et réponses WhatsApp",
      "100 messages WhatsApp / mois",
      "Sondages simples",
    ],
    cta: "Commencer gratuitement",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Pour les coachs qui veulent du temps en plus",
    monthlyPrice: 9,
    yearlyPrice: 7,
    messagesQuota: 2000,
    maxTeams: -1,
    features: [
      "Équipes et joueurs illimités",
      "2 000 messages WhatsApp / mois",
      "Relances automatiques J-7 et J-1",
      "Statistiques de présence avancées",
      "Sondages à choix multiples",
      "Support prioritaire",
    ],
    cta: "Passer Premium",
  },
  {
    id: "club",
    name: "Club",
    tagline: "Pour tout le club, toutes les équipes",
    monthlyPrice: 29,
    yearlyPrice: 24,
    messagesQuota: 10000,
    maxTeams: -1,
    features: [
      "Tout Premium, et :",
      "Vue consolidée toutes équipes",
      "Rôles délégués (coachs adjoints, dirigeants)",
      "10 000 messages WhatsApp / mois",
      "Numéro WhatsApp dédié au club",
      "Accompagnement à la mise en route",
    ],
    cta: "Équiper mon club",
  },
];

export const RSVP_LABELS = {
  present: "Présent",
  absent: "Absent",
  maybe: "Peut-être",
  none: "Sans réponse",
} as const;

export const MESSAGE_FLOW = ["pending", "sent", "delivered", "read"] as const;
