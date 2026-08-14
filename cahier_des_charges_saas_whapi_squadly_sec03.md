## 13. Architecture technique

L'architecture retient une seule application déployée, une plateforme backend managée et un orchestrateur de jobs managé. Ce choix répond à une contrainte explicite : [Décision] la petite équipe interne n'opérera pas de workers persistants de type BullMQ/Redis au stade du MVP. [Décision] La base Postgres reste la source de vérité ; WhatsApp, via Whapi, est un canal d'interaction interchangeable, jamais le cœur du système.

### 13.1 Stack retenue

[Décision] La stack A (recherche interne sur les workflows SaaS) est retenue sans variante : Next.js full-stack en TypeScript strict, Supabase comme backend managé, Inngest pour l'asynchrone. Les alternatives (API séparée Hono/NestJS, monorepo avec worker dédié) sont écartées au MVP : elles multiplient les déploiements et la charge d'exploitation.

| Couche | Composant retenu | Rôle | Exigence associée |
|---|---|---|---|
| Application | Next.js + TypeScript strict | Interface web, PWA mobile-first, Server Actions et Route Handlers | Un seul déploiement ; TypeScript strict activé |
| Données et auth | Supabase (Postgres, Auth, RLS, Realtime, Cron) | Base multi-tenant, authentification, temps réel, déclencheur horaire optionnel des rappels | Projet hébergé en Union européenne ; RLS sur toutes les tables tenant |
| Jobs asynchrones | Inngest | Rappels J-7 / J-1, relances, onboarding, files WhatsApp, traitement différé des webhooks | Handlers idempotents et rapides |
| Paiement | Stripe Billing | Plans, Checkout, Customer Portal, webhooks vers entitlements | Clés restreintes par environnement |
| Emails | Resend + React Email | Notifications transactionnelles | DPA signé |
| Canal WhatsApp | Whapi.Cloud derrière l'interface interne `WhatsAppProvider` | Envoi, réception, groupes, sondages | Aucun appel direct à Whapi hors de l'adaptateur |
| Analytics | PostHog Cloud UE ou Plausible | Événements produit et métriques | Instance ou région UE |
| Monitoring | Sentry région UE | Erreurs applicatives et alertes | Région UE, DPA signé |
| Tests | Vitest + Playwright | Unitaires, intégration, end-to-end | Quality gate bloquant en CI |
| CI/CD | GitHub Actions, previews Vercel | Lint, typecheck, tests, déploiements de preview | Migrations versionnées (Drizzle ou Supabase) |

### 13.2 Schéma d'architecture

Le schéma ci-dessous fixe les responsabilités de chaque flux.

```
Joueurs / Parents / Coachs
        |
        v
[PWA Next.js] -- Server Actions / Route Handlers
        |                    |
        v                    v
[Supabase Postgres + RLS] <---- [Supabase Auth]
        |                    (rôles Owner/Admin/Coach/Player/Parent)
        |
        +--> [Supabase Realtime] --> mises à jour live des convocations
        |
        +--> [Supabase Cron] --> déclencheur horaire des rappels (si nécessaire)
        |
        v
[Inngest] -- orchestration des jobs
   |-- file d'envoi WhatsApp : pacing, jitter, retries exponentiels, idempotence
   |-- file de réception : traitement différé des événements webhook
   |-- relances non-répondants J-1, onboarding, rappels J-7 / J-1
        |
        v
[WhatsAppProvider] -- interface interne d'abstraction
        |
        v
[Whapi.Cloud] <== webhooks entrants ==> [Endpoint HTTPS Next.js]
                                             |-- réponse HTTP immédiate
                                             |-- validation channel_id + URL secrète
                                             |-- push vers Inngest (déduplication par id d'événement)

[Stripe] -- webhooks billing --> service entitlements --> Supabase
[Resend] -- emails transactionnels
[PostHog UE / Sentry UE] -- analytics et monitoring
```

### 13.3 Modèle de données multi-tenant

Le schéma couvre au minimum les entités suivantes : `organizations`, `teams`, `members`, `memberships`, événements, convocations, réponses, sondages, messages, groupes WhatsApp, événements de webhook, abonnements et entitlements. Chaque message sortant porte une machine à états `pending → sent → delivered → read`, complétée par les états `failed` et `requeued`. Le système doit persister les identifiants de message, de groupe et de sondage Whapi afin de rattacher chaque réponse entrante au bon contexte (équipe, événement, membre).

[Décision] Le site doit appliquer la Row Level Security (RLS) sur toutes les tables tenant, sans exception. [Décision] Les tests automatisés d'isolation multi-tenant sont obligatoires et couvrent 100 % des tables tenant : c'est un critère d'acceptation bloquant, pas une cible de couverture indicative.

### 13.4 Files et traitements asynchrones

[Décision] L'équipe devra implémenter deux files distinctes :

1. La file d'envoi WhatsApp, avec débit plafonné, jitter aléatoire (délais variables entre envois), retries exponentiels, idempotence par clé unique et journalisation complète. Ces mesures répondent au risque documenté de bannissement du numéro en cas d'envois trop rapides ou répétitifs.
2. La file de réception : l'endpoint webhook répond immédiatement en HTTP, pousse l'événement vers Inngest et traite en différé le mapping numéro + contexte, en moins de 60 secondes.

[Décision] Inngest est le propriétaire fonctionnel unique des rappels : il gère toute la logique J-7 / J-1 et les relances ; Supabase Cron ne sert que de déclencheur horaire si nécessaire, sans porter de logique métier. [Décision] Les relances ne ciblent que les non-répondants et ne sont jamais envoyées en rafale.

## 14. Workflows de développement

### 14.1 Organisation du code et CI/CD

[Décision] Repository unique, GitHub Actions, migrations versionnées et environnements de preview Vercel par pull request. L'équipe devra appliquer une convention de branches, des revues de code obligatoires et un quality gate bloquant : lint, typecheck et tests doivent être verts avant toute fusion. Aucune exception au quality gate n'est admise sur les branches principales.

### 14.2 Déroulé MVP en 12 semaines

[Décision] Le séquencement ci-dessous est le plan de référence du projet. Chaque semaine se termine par une démonstration fonctionnelle.

1. Semaine 1 : cadrage, maquettes, schéma multi-tenant, repository, CI/CD, environnements.
2. Semaine 2 : auth, organisations, équipes, rôles, invitations, RLS.
3. Semaine 3 : calendrier, événements, récurrences, vues.
4. Semaine 4 : convocations et réponses in-app en temps réel.
5. Semaine 5 : intégration Whapi — envoi, webhooks entrants, file d'envoi avec pacing.
6. Semaine 6 : groupes WhatsApp — création, synchronisation des membres, gestion d'erreurs.
7. Semaine 7 : Stripe Billing — plans, Checkout, webhooks, portail client.
8. Semaine 8 : emails et rappels planifiés J-7/J-1, relances non-répondants.
9. Semaine 9 : analytics, tableau de bord coach, durcissement sécurité et RGPD.
10. Semaine 10 : beta fermée avec 3 à 5 clubs.
11. Semaine 11 : corrections beta, onboarding, performance.
12. Semaine 12 : runbook, durcissement final, lancement.

[Hypothèse] Ce rythme suppose une équipe de 2 à 3 développeurs full-stack à temps plein ; toute réduction de capacité impose de revoir le périmètre, pas la qualité des fondations (RLS, files, webhooks).

## 15. Sécurité

### 15.1 Application

[Décision] Le site doit appliquer les contrôles suivants, tous vérifiables par des tests ou des revues :

- RLS activée sur toutes les tables tenant et RBAC vérifié côté serveur sur chaque Server Action et Route Handler.
- MFA obligatoire pour les rôles privilégiés (super-admin interne, accès back-office).
- Validation Zod de toutes les entrées utilisateur et de tous les payloads externes.
- Webhooks Whapi sécurisés : [Décision] URL secrète à entropie élevée, validation systématique du `channel_id`, allowlist d'adresses IP si Whapi la fournit, journalisation de toute requête invalide. [Fait] Whapi ne documente pas clairement de signature HMAC : ces contrôles compensatoires sont donc obligatoires, pas optionnels.
- Handlers de webhooks idempotents avec déduplication par identifiant d'événement, démontrée par des tests de rejeu.

### 15.2 Secrets et accès

L'équipe devra centraliser la gestion des secrets (gestionnaire de secrets ou variables d'environnement chiffrées de la plateforme), planifier leur rotation et appliquer le principe de moindre privilège. Les clés Whapi et Stripe doivent être restreintes par environnement : aucune clé de production ne circule dans les environnements de preview ou de développement.

### 15.3 Audit et supervision

Le site doit tenir un journal d'audit de toutes les actions sensibles (impersonation, changements de plan, actions super-admin). Sentry collecte les erreurs. La santé du canal WhatsApp fait l'objet d'alertes dédiées : toute déconnexion de session ou demande de scan QR déclenche une alerte interne en moins de 5 minutes. Une procédure documentée de remplacement du numéro en cas de bannissement doit figurer dans le runbook.

## 16. RGPD et conformité

### 16.1 Registre et bases légales

L'équipe devra tenir un registre des traitements avant le lancement. Les bases légales retenues sont : l'exécution du contrat pour la fourniture du service, et le consentement pour le canal WhatsApp. [Décision] L'opt-in WhatsApp est explicite et révocable à tout moment ; la commande STOP reçue par WhatsApp est traitée automatiquement et désinscrit le membre du canal sans intervention manuelle.

### 16.2 Données de mineurs

Le produit gère des données de mineurs. Le site doit appliquer : consentement parental obligatoire à la création du compte enfant, compte enfant géré par le parent, minimisation stricte des données, traçabilité de l'auteur réel lorsqu'un parent répond pour son enfant. Ce périmètre est un risque élevé : aucune dérogation n'est admise au MVP.

### 16.3 Droits, sous-traitants et hébergement

Le site doit fournir l'export des données personnelles et la suppression effective (droit à l'effacement), avec des durées de rétention définies par catégorie de données. [Décision] Un DPA (Data Processing Agreement, accord de traitement des données) doit être signé avec chaque sous-traitant : Supabase, Sentry, PostHog, Stripe, Resend et Whapi. [Décision] L'hébergement des données en Union européenne est exigé dès que le fournisseur le permet (Supabase, Sentry, PostHog). La politique de confidentialité doit mentionner explicitement le transfert éventuel de données hors UE lié à Whapi, qui est un point de conformité résiduel assumé et documenté, non masqué.

## 17. Analytics et mesure

### 17.1 Instrumentation

[Décision] PostHog Cloud UE est la solution de référence, avec Plausible comme alternative sobre si l'équipe préfère limiter l'instrumentation. Les événements métier suivants doivent être instrumentés dès la semaine 9 : convocation envoyée, réponse reçue (avec le canal : in-app ou WhatsApp), relance déclenchée, sondage créé et voté, abonnement souscrit ou résilié. Chaque événement porte l'organisation, l'équipe et le plan, sans données personnelles de contenu.

### 17.2 Tableaux de bord et KPI

Deux vues sont exigées. Le dashboard coach expose réponses, présences et statistiques d'équipe. Le dashboard interne suit l'activation, la rétention des équipes actives à 30 et 90 jours, la santé du canal (taux de messages `delivered`, incidents de session par mois, taux d'échec de la file d'envoi après retries) et la consommation des quotas par plan. Ces métriques alimentent les KPI du chapitre 2 ; toute cible chiffrée non issue des sources est une cible indicative à valider.

## 18. Stratégie de tests

### 18.1 Niveaux de tests

[Décision] L'équipe devra couvrir quatre niveaux :

1. Tests unitaires (Vitest) : règles métier, mapping des réponses WhatsApp par numéro et contexte, machine à états des messages, règle du dernier statut horodaté en cas de réponse sur deux canaux.
2. Tests d'intégration : RLS et isolation multi-tenant (un membre de l'organisation A ne lit ni n'écrit aucune donnée de l'organisation B), handlers de webhooks (idempotence, déduplication, rejet des requêtes invalides), file d'envoi (pacing, jitter, retries exponentiels).
3. Tests end-to-end (Playwright) : parcours coach complet, réponse à une convocation, souscription Stripe.
4. Tests contractuels : vérification des payloads Whapi émis et reçus contre le contrat attendu, pour détecter toute rupture d'API du fournisseur.

### 18.2 Mocks Whapi et tests RLS

[Décision] Tous les tests automatisés s'exécutent contre un double de `WhatsAppProvider` (mock Whapi) simulant envois, statuts, webhooks entrants et erreurs (session déconnectée, échec d'envoi, rejeu dupliqué). Aucun test CI ne doit appeler l'API Whapi réelle : cela garantit la reproductibilité et évite tout envoi non sollicité pendant les tests, facteur de bannissement. Les tests RLS couvrent 100 % des tables tenant et s'exécutent à chaque pull request ; leur échec bloque la fusion.

### 18.3 Critères de qualité

Le quality gate CI est bloquant (lint, typecheck, tests). La couverture cible porte sur les modules critiques — convocations, canal WhatsApp, billing — avec un seuil chiffré à fixer en cadrage (cible indicative à valider). Les critères d'acceptation non fonctionnels du chapitre 22 (absence de fuite inter-tenant, idempotence démontrée par rejeu) s'appuient directement sur cette stratégie.

## 19. Planning et jalons

### 19.1 Jalons

Le planning retient quatre jalons de go/no-go, chacun assorti d'un critère de franchissement mesurable :

| Jalon | Échéance | Critère de franchissement |
|---|---|---|
| Jalon 1 — Fondations | Fin semaine 2 | Auth, organisations, équipes, rôles et RLS opérationnels ; tests d'isolation multi-tenant verts |
| Jalon 2 — Boucle WhatsApp | Fin semaine 6 | Boucle complète convocation WhatsApp : envoi pascé, réponse entrante synchronisée en moins de 60 secondes, groupe par équipe |
| Jalon 3 — MVP prêt pour beta | Fin semaine 9 | Billing Stripe, analytics et tableau de bord coach livrés ; durcissement sécurité et RGPD effectué |
| Jalon 4 — Lancement | Fin semaine 12 | Beta fermée de 3 à 5 clubs soldée, runbook rédigé, lancement public |

Tout glissement sur un jalon se traite par réduction du périmètre de la phase concernée, jamais par suppression des exigences de sécurité, de RLS ou de pacing.

### 19.2 Capacité et dépendances

[Hypothèse] L'équipe est composée de 2 à 3 développeurs full-stack à temps plein, à confirmer en cadrage. Trois dépendances externes conditionnent le planning : la disponibilité d'un numéro de téléphone dédié à la session Whapi dès la semaine 4, la validation par le commanditaire du risque lié à une API WhatsApp non officielle, et la signature des DPA avec les sous-traitants avant la semaine 9. L'équipe devra remonter toute dépendance non tenue comme risque de planning dès son identification.
