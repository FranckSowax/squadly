## 20. Backlog priorisé

Le backlog du MVP est ordonné selon la valeur livrée à chaque jalon des 12 semaines : d'abord la boucle WhatsApp complète, puis la monétisation et le pilotage. [Décision] Toute story non rattachée à un jalon est reportée en phase 2 pour protéger la date de lancement.

### 20.1 Epics et stories MVP

#### Priorisation

| Priorité | Epic | Stories clés | Jalon associé |
|---|---|---|---|
| P0 | Convocations | Le coach envoie une convocation reçue dans WhatsApp avec boutons Présent / Absent / Peut-être ; le joueur répond en un appui et son statut est synchronisé dans l'application ; le parent répond pour son enfant avec traçabilité de l'auteur réel | Jalon 2 (fin semaine 6) |
| P0 | Groupes WhatsApp | Création automatique du groupe d'équipe ; ajout et retrait des membres ; synchronisation périodique des participants ; archivage en fin de saison | Jalon 2 |
| P0 | Relances | Seuls les non-répondants sont relancés à J-1 ; aucun envoi en rafale ; journalisation de chaque relance | Jalon 3 (fin semaine 9) |
| P0 | Canal et webhooks | Endpoint webhook sécurisé (URL secrète, validation du `channel_id`) ; handlers idempotents ; file d'envoi avec pacing, jitter et retries ; alerte interne sur déconnexion de session | Jalon 2 |
| P1 | Socle SaaS | Comptes, organisations, équipes, rôles et invitations ; calendrier avec récurrences ; tableau de bord coach ; notifications in-app et email | Jalon 1 (fin semaine 2) puis continu |
| P1 | Billing | Plans Gratuit / Premium / Club ; Checkout et Customer Portal Stripe ; webhooks vers les entitlements ; quotas de messages WhatsApp par plan | Jalon 3 |
| P1 | Sondages | Sondages d'horaire et d'organisation à choix unique (2 à 12 options) ; votes synchronisés depuis WhatsApp | Jalon 3 |
| P2 | Back-office | Version minimale au jalon 3 : supervision des organisations, tableau de santé du canal Whapi ; finitions au jalon 4 : console d'incidents, impersonation journalisée, runbook d'exploitation | Jalon 3 (version minimale) puis jalon 4 (finitions et runbook) |

Les epics P0 rattachés au jalon 2 constituent son critère de réussite : sans convocation WhatsApp bidirectionnelle fiable, le produit n'a pas de différenciation face à TeamSnap ou SportCorico. L'epic Relances, bien que prioritaire en P0, reste rattaché au jalon 3 et ne conditionne donc pas la validation du jalon 2. [Décision] Les epics P1 sont nécessaires au lancement commercial mais tolèrent une version simplifiée à la beta (par exemple un seul plan payant activable manuellement). [Décision] L'epic Back-office (P2) se découpe en deux livraisons : une version minimale au jalon 3 (supervision des organisations, tableau de santé du canal Whapi), puis les finitions au jalon 4 (console d'incidents, impersonation journalisée) accompagnées du runbook d'exploitation. Les epics P2 peuvent être réduits à des vues de lecture si la capacité de l'équipe se tend.

### 20.2 Hors scope MVP

#### Exclusions actées

[Décision] Les exclusions suivantes sont actées pour le MVP et relèvent des phases ultérieures :

1. Squadly AI (création d'entraînement, propositions de composition, résumés) : phase 2.
2. Covoiturage, sondages avancés à choix multiples : phase 2.
3. Galerie photos et vidéos, gestion de tâches, statistiques avancées : phase 2.
4. Finances, paiements de cotisations, sponsoring : phase 3.
5. Parsing IA des réponses WhatsApp en texte libre : phase 3 ; au MVP, le texte libre reçoit un message d'aide renvoyant vers les boutons.
6. Application mobile native : la PWA mobile-first couvre le besoin.
7. Bascule vers l'API officielle WhatsApp Business : simple évaluation en phase 3, sauf si le risque Whapi devient inacceptable avant.

[Décision] Toute demande sortant de cette liste pendant le MVP est refusée par défaut et arbitrée uniquement en comité de cadrage, afin d'éviter la dérive du périmètre sur un calendrier de 12 semaines.

## 21. Risques et mitigation

### 21.1 Registre des risques

#### Risques canal WhatsApp

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Bannissement du numéro par WhatsApp (Whapi n'est pas l'API officielle Meta) | Élevée | Critique | Pacing plafonné avec jitter aléatoire, warm-up du numéro, opt-in explicite, commande STOP automatique, personnalisation des messages, procédure documentée de remplacement du numéro, plan B API officielle via l'abstraction `WhatsAppProvider` |
| Session Whapi déconnectée ou scan QR requis | Moyenne | Élevé | Monitoring de santé du canal, alerte interne en moins de 5 minutes, runbook de reconnexion, numéro dédié à la session |
| Réponses ambiguës en texte libre | Moyenne | Moyen | Boutons et réponses rapides privilégiés dans tous les messages ; message d'aide automatique au MVP ; parsing IA différé en phase 3 |
| Dédoublement des réponses entre application et WhatsApp | Moyenne | Moyen | Règle du dernier statut horodaté ; persistance des identifiants de message et de sondage pour rattacher chaque réponse au bon contexte |
| Échec d'ajout de membres à un groupe (protections anti-spam) | Moyenne | Moyen | Synchronisation périodique des participants au lieu de présumer le succès ; notification au coach des ajouts en échec |
| Webhook usurpé (pas de signature HMAC documentée) | Faible | Élevé | URL secrète à entropie élevée, validation du `channel_id`, allowlist IP si disponible, journalisation de toute requête invalide |

#### Risques produit, conformité et projet

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Données de mineurs mal protégées | Moyenne | Critique | Consentement parental obligatoire, compte enfant géré par le parent, minimisation des données, DPA avec tous les sous-traitants |
| Dérive des coûts WhatsApp non intégrée au freemium | Moyenne | Élevé | Plafonds de messages par plan, métriques de consommation par organisation, alertes de quota |
| Dépendance fournisseur Whapi | Moyenne | Élevé | Abstraction `WhatsAppProvider` limitant la bascule à un nouvel adaptateur ; aucun appel direct à Whapi hors de cette interface |
| Dépendance exclusive au canal WhatsApp | Faible | Élevé | Parcours complet in-app et email garanti ; WhatsApp reste un canal, jamais le seul |
| Dépassement du planning de 12 semaines | Moyenne | Élevé | Backlog P0/P1/P2 arbitrable, scope MVP figé, beta fermée limitée à 3 à 5 clubs |

[Décision] Whapi est retenu sous condition suspensive d'acceptation écrite du risque ; cette acceptation est supposée obtenue en cadrage. Cette acceptation conditionne l'architecture anti-bannissement et le plan B. [Hypothèse] Les probabilités ci-dessus sont à recalibrer après la beta.

## 22. Critères d'acceptation

### 22.1 Critères fonctionnels

#### Boucle WhatsApp

[Décision] Le site est accepté sur la boucle WhatsApp uniquement si chaque critère ci-dessous est démontré en recette, avec un club réel de la beta :

1. Une convocation envoyée à une équipe de 30 membres opt-in est distribuée intégralement en respectant le pacing configuré, et chaque message atteint au minimum le statut `delivered` ; tout message bloqué en échec après retries est visible dans le back-office avec sa cause.
2. Une réponse WhatsApp (bouton, liste, réaction ou vote de sondage) met à jour le statut du membre dans l'application en moins de 60 secondes, y compris lorsque le parent répond à la place de son enfant, avec l'auteur réel tracé.
3. Une relance automatique J-1 part uniquement vers les non-répondants ; un membre ayant répondu entre-temps ne reçoit aucune relance, vérifié par test de rejeu.
4. La règle du dernier statut horodaté est respectée : une réponse in-app postérieure à une réponse WhatsApp écrase le statut, et inversement.
5. Une commande STOP reçue par WhatsApp désinscrit le membre du canal en une seule passe, sans intervention manuelle.

#### Robustesse et dégradation

[Décision] Le site doit également satisfaire les critères de robustesse suivants, démontrés en recette :

1. Un membre sans WhatsApp accomplit le parcours complet (convocation, réponse, calendrier, annonces) in-app et par email, sans aucun blocage.
2. La déconnexion de la session Whapi déclenche une alerte interne en moins de 5 minutes et les messages en file restent en attente sans perte jusqu'à reconnexion.
3. Le retrait d'un membre de l'équipe le retire du groupe WhatsApp à la synchronisation suivante, et l'échec éventuel est signalé au coach.

### 22.2 Critères non fonctionnels

#### Sécurité, qualité et exploitation

[Décision] Les critères non fonctionnels suivants sont bloquants pour l'acceptation du jalon 4 :

1. Aucune fuite de données inter-tenant : les tests automatisés d'isolation RLS couvrent 100 % des tables tenant et sont verts en intégration continue.
2. Les handlers de webhooks sont idempotents, démontré par des tests de rejeu d'événements dupliqués sans effet de bord.
3. Toute requête de webhook invalide (URL incorrecte, `channel_id` inconnu) est rejetée et journalisée.
4. Le parcours mobile-first est validé sur les appareils courants de la beta (smartphones Android et iOS récents).
5. Le quality gate d'intégration continue (lint, typecheck, tests unitaires et d'intégration) est bloquant sur les modules critiques : convocations, canal WhatsApp, billing.
6. L'export et la suppression des données d'un membre (droit à l'effacement) sont exécutables de bout en bout et vérifiés sur un cas de test avant le lancement.

[Décision] Un critère non mesuré est un critère non satisfait : la recette du jalon 4 exige une démonstration ou un test automatisé pour chaque ligne ci-dessus.

## 23. Références et sources

### 23.1 Source produit

#### Document initial

- `/mnt/agents/temp/Cahier_des_charges_Squadly.pdf` : cahier des charges initial Squadly (rôles, fonctionnalités sportives, positionnement freemium). [Fait] Ce document ne mentionne ni WhatsApp ni Whapi ; l'intégration du canal est une décision nouvelle du commanditaire.

### 23.2 Documentation Whapi

#### API et bonnes pratiques

- https://whapi.cloud/docs
- https://whapi.cloud/price
- https://whapi.readme.io/reference/sendmessagetext
- https://whapi.readme.io/reference/sendmessagepoll
- https://whapi.readme.io/reference/creategroup
- https://support.whapi.cloud/help-desk/receiving/webhooks
- https://support.whapi.cloud/help-desk/blocking/how-to-not-get-banned

### 23.3 Stack technique

#### Documentation des plateformes

- https://nextjs.org/docs
- https://supabase.com/docs ; RLS : https://supabase.com/docs/guides/database/postgres/row-level-security ; Realtime : https://supabase.com/docs/guides/realtime ; Cron : https://supabase.com/docs/guides/cron
- https://www.inngest.com/docs
- https://docs.stripe.com/billing
- https://resend.com/docs
- https://posthog.com/docs
- https://docs.sentry.io
- https://vitest.dev/guide ; https://playwright.dev/docs/intro

### 23.4 Templates et design

#### Ressources

- https://makerkit.dev ; https://supastarter.dev ; https://achromatic.dev
- https://github.com/nextjs/saas-starter ; https://github.com/ixartz/SaaS-Boilerplate
- https://ui.shadcn.com ; https://tailwindcss.com/plus ; https://tremor.so ; https://fullcalendar.io ; https://github.com/Qualiora/shadboard

### 23.5 Références internes

#### Fichiers de recherche

- `/mnt/agents/output/research/squadly_saas_whapi_dim01_analyse_pdf.md` : analyse du cahier des charges initial Squadly.
- `/mnt/agents/output/research/squadly_saas_whapi_dim02_whapi.md` : recherche sur l'API Whapi.Cloud (fonctionnalités, webhooks, limites, tarifs).
- `/mnt/agents/output/research/squadly_saas_whapi_dim03_workflows_stack.md` : recherche sur les workflows produit et la stack technique.
- `/mnt/agents/output/research/squadly_saas_whapi_dim04_templates.md` : recherche sur les templates SaaS et les ressources de design.
- `/mnt/agents/output/research/squadly_saas_whapi_insight.md` : synthèse transversale des recherches.
- `/mnt/agents/output/research/squadly_saas_whapi_cross_verification.md` : vérification croisée des faits et des sources.

### 23.6 Notes de vérification

#### Réserves

- [Fait] Les tarifs Whapi (environ 35 dollars par mois et par canal, 29 dollars en annuel), MakerKit Pro (environ 349 dollars one-time), supastarter et Achromatic sont des valeurs observées indicatives : l'équipe devra les revérifier avant tout engagement contractuel.
- [Fait] Whapi.Cloud n'est pas l'API officielle WhatsApp Business de Meta ; [Décision] son utilisation doit être actée par le commanditaire en connaissance du risque de bannissement, de rupture de session et d'absence de SLA Meta.
- [Hypothèse] Les cibles de KPI non sourcées (taux de réponse, conversion freemium) restent des cibles indicatives à valider en cadrage et à recalibrer après la beta.
