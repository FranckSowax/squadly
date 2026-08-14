# Plan de développement — SaaS Squadly (webapp full-stack)

Objectif : développer le SaaS Squadly (gestion d'équipe sportive via WhatsApp/Whapi) d'après le cahier des charges `/mnt/agents/output/cahier_des_charges_saas_whapi_squadly.agent.final.md` et les recherches dans `/mnt/agents/output/research/`. Style : moderne, friendly, facile d'utilisation, mobile-first, esprit sportif premium.

## Étape 1 — Skills & workspace
- Charger `vibecoding-webapp-swarm` (orchestration), puis `webapp-building-swarm` + `backend-building-swarm` + `swarm-workspace` au moment de leur étape.
- Setup du repo partagé + worktrees.

## Étape 2 — Brief produit & design (design-first)
- Source : CDC + fichiers de recherche existants (dim01-dim04, insight) — déjà disponibles, pas besoin de refaire la recherche métier.
- Un agent design produit : direction artistique (moderne/friendly/sportif), palette, typographie, écrans clés (dashboard coach, convocations, sondages, membres, messages WhatsApp, abonnements), parcours mobile-first.

## Étape 3 — Frontend (webapp-building-swarm)
- React + TypeScript + Tailwind + shadcn/ui.
- Pages : landing marketing friendly ; app : dashboard coach (prochaines convocations, taux de réponse), équipes & membres (rôles coach/joueur/parent), événements/convocations avec statuts Présent/Absent/Peut-être, sondages, fil de messages WhatsApp (vue conversation), statistiques, abonnements (Freemium/Premium/Club), paramètres canal WhatsApp.

## Étape 4 — Backend (backend-building-swarm)
- MySQL + tRPC : tenants (organisations multi-club), équipes, membres, événements, RSVP, sondages + votes, messages WhatsApp (machine à états pending→sent→delivered→read/failed/requeued), entitlements abonnements.
- Adaptateur WhatsAppProvider simulé (interface prête pour Whapi, sans appel externe réel).
- Auth selon capacités plateforme (Kimi login si dispo).

## Étape 5 — Intégration, QA, livraison
- Merge frontend+backend, build, tests de parcours clés (créer convocation → réponse WhatsApp simulée → stats mises à jour).
- Livraison via website_version_manager (type dynamic ou static selon backend).
