# Cahier des charges — SaaS Squadly avec intégration Whapi / WhatsApp (outline exécutable)

Cible document final : 5 000 à 7 000 mots, style consulting actionnable, en français.
Règle de distinction appliquée dans tout le document : chaque affirmation porte un préfixe [Fait] (source PDF ou documentation externe citée), [Hypothèse] (inférence à valider avec le commanditaire) ou [Décision] (arbitrage produit ou d'architecture retenu dans ce cahier des charges). Aucun emoji. Structure maximale H4, aucun H5.

## 1. Contexte et genèse du projet

### 1.1 Origine du besoin

#### Produit décrit par la source
- [Fait] Squadly est décrit dans le PDF source comme une application mobile et web de gestion d'équipes sportives pour coachs, joueurs, parents et clubs.
- [Fait] Le PDF vise à centraliser messages, calendriers, convocations et statistiques pour éviter l'usage de plusieurs applications.

#### Extension WhatsApp
- [Fait] Le PDF ne mentionne ni WhatsApp ni Whapi : l'intégration WhatsApp est une décision nouvelle issue de la demande du commanditaire.
- [Décision] Développer le SaaS entièrement en interne, en s'appuyant sur un template commercial (MakerKit Pro) pour les fondations non différenciantes.

### 1.2 Constats de marché

#### Concurrence
- [Fait] Le PDF cite TeamSnap et SportCorico comme références ; la différenciation visée repose sur la simplicité d'interface et l'IA.

#### Comportement des utilisateurs
- [Hypothèse] WhatsApp est le canal de messagerie dominant des équipes sportives amateurs en Europe francophone ; y répondre sans installer d'application réduit la friction et augmente le taux de réponse aux convocations.
- [Hypothèse] Les coachs bénévoles disposent de peu de temps ; chaque automatisation (relances, rappels) a une valeur perçue élevée.

### 1.3 Positionnement du produit

#### Rôle de Squadly
- [Décision] Squadly reste le cerveau du système : la base Postgres est la source de vérité ; WhatsApp est un canal d'interaction, jamais l'unique canal.

#### Indépendance au canal
- [Décision] Le produit reste pleinement fonctionnel sans WhatsApp pour les membres non équipés ou sans opt-in.

## 2. Objectifs, KPI et indicateurs de succès

### 2.1 Objectifs business

#### Lancement
- [Décision] Lancer un MVP commercial en 12 semaines avec une beta fermée de 3 à 5 clubs.

#### Monétisation
- [Hypothèse] Atteindre un taux de conversion freemium vers Premium de l'ordre de 5 à 10 % en année 1 (benchmark SaaS vertical, à valider).

### 2.2 KPI produit

#### Engagement
- Taux de réponse aux convocations sous 24 h (cible à définir, hypothèse : supérieur à 80 %).
- Part des réponses reçues via WhatsApp versus in-app.
- Temps de préparation d'une convocation par le coach (mesure avant/après).

#### Rétention et fiabilité
- Taux de rétention des équipes actives à 30 et 90 jours.
- Taux de messages aboutissant au statut `delivered` ; nombre d'incidents de session Whapi par mois.

### 2.3 KPI techniques

#### Performance d'intégration
- Latence de traitement des webhooks entrants : réponse HTTP immédiate, traitement asynchrone sous 60 secondes.
- Taux d'erreur de la file d'envoi après retries.

#### Qualité structurelle
- Couverture des tests d'isolation multi-tenant (RLS) : 100 % des tables tenant.

## 3. Hypothèses et contraintes

### 3.1 Hypothèses à valider en cadrage

#### Budget
- Template MakerKit Pro (environ 349 dollars one-time observé) et abonnement Whapi (environ 35 dollars par mois et par canal, 29 dollars en annuel ; tarifs indicatifs à revérifier avant achat).

#### Acceptation du risque
- Acceptation par le commanditaire du risque lié à une API WhatsApp non officielle.
- Disponibilité d'un numéro de téléphone dédié à la session Whapi.

### 3.2 Contraintes

#### Contraintes fournisseur
- [Fait] Whapi.Cloud n'est pas l'API officielle WhatsApp Business de Meta : session de type appareil lié, risque de bannissement, de rupture de session, absence de SLA Meta et de badge vert.

#### Contraintes d'exploitation
- [Décision] Hébergement des données en Union européenne et DPA avec chaque sous-traitant (Supabase, Sentry, PostHog, Stripe, Resend, Whapi).
- [Décision] Petite équipe interne : un seul déploiement applicatif, backend managé, orchestrateur de jobs managé (Inngest) ; pas de workers persistants type BullMQ/Redis au MVP.

## 4. Utilisateurs et rôles

### 4.1 Rôles métier

#### Rôles définis par le PDF
- [Fait] Coach : gère l'équipe, entraînements, matchs, convocations et statistiques.
- [Fait] Joueur : consulte son calendrier, répond aux convocations, suit ses statistiques.
- [Fait] Parent : suit les activités de son enfant, reçoit les informations importantes, peut répondre à la place de son enfant.
- [Fait] Club : gère plusieurs équipes.

### 4.2 Rôles techniques (RBAC)

#### Nomenclature
- [Décision] Owner, Admin, Coach, Player, Parent, plus rôle super-admin interne pour le back-office.

#### Matrice de permissions
- Publication des convocations et annonces : coach et rôles délégués uniquement.
- Gestion de la facturation : owner et admin.
- Statistiques nominatives : coach, club, membre concerné et son parent.

### 4.3 Cas particuliers

#### Membre WhatsApp sans compte
- Membre sans compte SaaS mais avec numéro WhatsApp opt-in : interactions limitées aux réponses aux convocations et sondages.

#### Mineurs et membres sans WhatsApp
- Mineurs : compte géré par le parent, consentement parental obligatoire.
- Membre sans WhatsApp : parcours complet in-app et par email.

## 5. Parcours utilisateurs

### 5.1 Parcours coach

#### Onboarding
- Création de compte, création d'organisation et d'équipe, choix du plan, invitation des membres, connexion du groupe WhatsApp.

#### Cycle hebdomadaire
- Création d'événement, envoi de convocation, suivi des réponses en temps réel, relance des non-répondants, composition, résumé post-événement (IA, phase 2).

### 5.2 Parcours joueur et parent

#### Réponse à une convocation
- Réception dans WhatsApp, réponse via boutons ou réponses rapides (Présent / Absent / Peut-être), ou réponse in-app.

#### Consultation
- Calendrier, annonces, statistiques personnelles, sondages.

### 5.3 Parcours club

#### Multi-équipes
- Création de plusieurs équipes, délégation aux coachs, vue consolidée, gestion de l'abonnement club.

### 5.4 Parcours d'administration interne

#### Supervision
- Supervision des organisations, santé du canal Whapi, gestion des incidents (bannissement, session déconnectée), support.

## 6. Fonctionnalités

### 6.1 MVP (semaines 1 à 12)

#### Socle SaaS
1. Comptes, organisations, équipes, rôles et invitations.
2. Tableau de bord coach.
3. Calendrier des entraînements, matchs et événements (avec récurrences).
4. Convocations et réponses Présent / Absent / Peut-être, gestion des absences.
5. Notifications et annonces (in-app, email, WhatsApp).

#### Boucle WhatsApp
6. Groupe WhatsApp par équipe : création, ajout et retrait des membres, synchronisation.
7. Convocations bidirectionnelles via WhatsApp (envoi, réponses, synchronisation des statuts).
8. Relances automatiques des non-répondants.
9. Sondages simples (horaire, organisation).

#### Monétisation et pilotage
10. Compositions d'équipe et statistiques de base.
11. Abonnements Stripe, quotas par plan, portail client.
12. Back-office minimal (organisations, canal WhatsApp, support).

### 6.2 Phase 2 (post-lancement, 3 à 6 mois)

#### Squadly AI
- Création d'entraînement à la demande, proposition de composition selon disponibilités, aide aux convocations, résumé de match ou d'entraînement publié dans WhatsApp après validation du coach.

#### Vie d'équipe
- Sondages avancés et covoiturage.
- Galerie photos et vidéos (médias WhatsApp importants téléchargés vers le stockage Squadly).
- Gestion de tâches pour l'équipe et statistiques avancées.

### 6.3 Phase 3 (6 à 12 mois)

#### Club et finances
- Fonctionnalités club avancées (multi-équipes, vue consolidée), finances, paiements de cotisations, sponsoring (extensions Stripe).

#### IA avancée et conformité canal
- Parsing IA des réponses WhatsApp en texte libre avec gestion de l'ambiguïté.
- Évaluation de la bascule vers l'API officielle WhatsApp Business (plan B).

## 7. Intégration Whapi / WhatsApp

### 7.1 Nature du service et architecture d'intégration

#### Nature du service
- [Fait] Whapi fonctionne comme une session WhatsApp liée (proche de WhatsApp Web) : souplesse et coût forfaitaire, mais risque de conformité et de bannissement.

#### Architecture
- [Décision] Interface interne `WhatsAppProvider` isolant Whapi derrière une abstraction pour permettre le changement de fournisseur sans réécriture.
- [Décision] Endpoint webhook HTTPS qui répond vite et pousse les événements dans une file de traitement asynchrone (Inngest).

### 7.2 Messages

#### Capacités
- [Fait] Envoi de texte, médias, contacts, localisation, boutons et listes via `POST /messages/text` et endpoints associés.

#### Suivi
- [Décision] Machine à états par message : `pending → sent → delivered → read`, plus états d'échec et de relance.
- [Décision] Persistance des identifiants de message, groupe et sondage pour rattacher les réponses entrantes au bon contexte (équipe, événement, membre).

### 7.3 Groupes

#### Capacités
- [Fait] Création de groupes (`POST /groups`), ajout et retrait de participants (`POST`/`DELETE /groups/{GroupID}/participants`), mentions via paramètre `mentions`.

#### Cycle de vie
- [Décision] Un seul groupe actif par équipe ; archivage en fin de saison.
- [Décision] Synchronisation périodique et après chaque changement d'effectif des participants, au lieu de présumer que les ajouts réussissent (protections anti-spam WhatsApp possibles).

### 7.4 Sondages

#### Capacités
- [Fait] `POST /messages/poll` : 2 à 12 options, choix unique ou multiple ; votes entrants reçus par webhook.

#### Périmètre
- [Décision] MVP : sondages d'horaire et d'organisation à choix unique ; covoiturage en phase 2.

### 7.5 Webhooks entrants

#### Capacités
- [Fait] Événements disponibles : messages, statuts de livraison, groupes, contacts, présence, appels, labels, utilisateurs ; réponses sous forme de texte, boutons, listes, réactions et votes de sondage.
- [Fait] Pas de signature HMAC clairement documentée.

#### Sécurisation et robustesse
- [Décision] URL secrète à entropie élevée, validation du `channel_id`, allowlist IP si disponible, journalisation de toute requête invalide.
- [Décision] Handlers idempotents et rapides ; déduplication par identifiant d'événement.

### 7.6 Statuts et synchronisation des réponses

#### Mapping
- Correspondance des réponses entrantes par numéro de téléphone et contexte (dernière convocation active du membre).

#### Résolution de conflits
- [Décision] Le dernier statut horodaté gagne si le membre répond à la fois in-app et dans WhatsApp.
- Réponses en texte libre : MVP = message d'aide renvoyant vers les boutons ; phase 3 = parsing IA.

### 7.7 Pacing, erreurs et anti-bannissement

#### Risque documenté
- [Fait] Risque de bannissement si envois trop rapides, répétitifs ou non sollicités ; bonnes pratiques : warm-up, délais aléatoires, limitation de débit, personnalisation, commande STOP.

#### Mesures techniques
- [Décision] File d'envoi avec pacing (débit plafonné, jitter aléatoire), retries exponentiels, idempotence, journalisation complète.
- [Décision] Opt-in WhatsApp explicite et révocable ; commande STOP traitée automatiquement (désinscription du canal).
- [Décision] Médias entrants importants téléchargés via `GET /media/{media-id}` vers le stockage Squadly (rétention Whapi limitée) ; [Fait] vérification de numéros WhatsApp disponible dans l'API.

#### Mesures opérationnelles
- [Décision] Surveillance de la santé du canal : alerte immédiate si déconnexion ou scan QR requis ; procédure documentée de remplacement du numéro en cas de bannissement.

### 7.8 Plan B

#### Bascule vers l'API officielle
- [Décision] Si le risque Whapi devient inacceptable (bannissements répétés, exigence de conformité), bascule vers l'API officielle WhatsApp Business Platform (Meta) : plus conforme mais plus coûteuse et contraignante (templates approuvés, fenêtre de 24 h, facturation par conversation).

#### Facilitation
- L'abstraction `WhatsAppProvider` limite la bascule à l'implémentation d'un nouvel adaptateur.

## 8. Règles métier

### 8.1 Identité et appartenance

#### Comptes et numéros
- Un membre possède un compte SaaS et optionnellement un numéro WhatsApp vérifié.
- Un membre peut appartenir à plusieurs équipes et organisations.

#### Délégation parentale
- Un parent peut répondre pour son enfant ; la réponse est tracée avec l'auteur réel.

### 8.2 Convocations et événements

#### Publication
- Seuls le coach et les rôles délégués publient convocations et annonces.
- Un seul groupe WhatsApp actif par équipe ; archivage en fin de saison.

#### Réponses et relances
- Le dernier statut horodaté gagne entre canaux.
- Relances envoyées uniquement aux non-répondants, jamais en rafale.

### 8.3 IA

#### Validation humaine
- Toute création IA (événement, composition, résumé) nécessite la validation du coach avant publication.

### 8.4 Quotas et plans

#### Intégration des coûts WhatsApp
- [Décision] Coûts et quotas WhatsApp intégrés au modèle freemium : plafond de messages WhatsApp par mois en plan gratuit, volumes étendus en Premium et Club.

## 9. Abonnements et modèle économique

### 9.1 Plans

#### Grille
- [Fait] Modèle freemium : version gratuite avec fonctions essentielles, Premium avec fonctions avancées et Squadly AI, offre spéciale clubs.
- [Décision] Grille MVP : Gratuit (1 équipe, quotas WhatsApp limités), Premium (par équipe ou par coach, fonctions avancées), Club (multi-équipes, facturation par siège ou par équipe, à arbitrer en cadrage).

### 9.2 Implémentation Stripe

#### Flux
- Stripe Billing : plans, Checkout, Customer Portal, webhooks vers le service d'entitlements.

#### États
- Essai, actif, impayé, annulé ; dégradation gracieuse vers le plan gratuit.

## 10. Back-office interne

### 10.1 Fonctionnalités

#### Pilotage
- Liste et recherche d'organisations, équipes, membres ; impersonation encadrée et journalisée ; gestion des plans et exceptions commerciales.

#### Canal WhatsApp
- Tableau de santé du canal Whapi : état de session, file d'envoi, taux d'échec, incidents.
- Console d'incidents : bannissement, scan QR requis, webhooks en échec.

### 10.2 Accès

#### Protection
- Rôle super-admin distinct, MFA obligatoire, journal d'audit de toutes les actions.

## 11. Design system et identité

### 11.1 Principes

#### Identité
- [Fait] Identité moderne, sportive, jeune, professionnelle et premium ; navigation pensée mobile d'abord ; logo évoquant équipe, mouvement et coordination.

#### Socle
- [Décision] Tailwind CSS v4 + shadcn/ui ; tokens Squadly (palette sportive premium, rayons, typographie display, thème clair/sombre).

### 11.2 Composants

#### Modules d'interface
- Dashboard : blocks shadcn/ui officiels ; statistiques via shadcn Charts ou Tremor.
- Calendrier : FullCalendar Standard (licence MIT) ; Premium seulement si la vue Timeline ressources devient indispensable.
- Tables de membres : TanStack Table ou tablecn.
- Chat et notifications : inspiration du block chat de Shadboard, Supabase Realtime, Sonner.

#### Formulaires et mobile
- Formulaires et sondages : react-hook-form + Zod + composants shadcn.
- Mobile : PWA mobile-first avec bottom navigation ; landing marketing via Tailwind Plus en option.

## 12. Templates et base de code

### 12.1 Choix du template

#### Recommandation
- [Décision] MakerKit Pro Next.js Supabase si le budget est disponible : multi-tenant, organisations, rôles, invitations, RLS, Stripe Billing par siège, MFA, i18n, super-admin (environ 349 dollars one-time observé).

#### Alternatives
- MakerKit Lite (MIT, sans billing/RBAC complet) ou starter open source (`nextjs/saas-starter`, `ixartz/SaaS-Boilerplate`) si contrainte budgétaire ; supastarter et Achromatic comme options intermédiaires.

### 12.2 Développements internes restants

#### Modules métier
- [Fait] Aucun template ne fournit convocations sportives, synchronisation WhatsApp, compositions, statistiques d'équipe ou moteur de sondages : ces modules sont du développement interne pur.

## 13. Architecture technique

### 13.1 Stack retenue

#### Application
- [Décision] Next.js full-stack + TypeScript strict ; Server Actions et Route Handlers ; PWA mobile-first.

#### Plateforme
- Supabase : Postgres, Auth, Row Level Security, Realtime, Cron, Queues ; hébergement UE.
- Inngest : relances, onboarding, files WhatsApp, traitement asynchrone des webhooks.
- Stripe Billing, Resend + React Email, PostHog Cloud UE ou Plausible, Sentry région UE, Whapi.Cloud derrière `WhatsAppProvider`.

### 13.2 Modèle de données multi-tenant

#### Entités
- `organizations`, `teams`, `members`, `memberships`, événements, convocations, réponses, sondages, messages, groupes WhatsApp, événements de webhook, abonnements, entitlements.

#### Isolation
- [Décision] RLS sur toutes les tables tenant ; tests automatisés d'isolation obligatoires.

### 13.3 Files et traitements asynchrones

#### Envoi et réception
- File d'envoi WhatsApp : pacing, retries, idempotence, journalisation.
- File de réception : webhooks rapides, traitement différé, mapping numéro + contexte.

#### Planification
- Rappels J-7 / J-1 et relances non-répondants via Inngest ; Supabase Cron pour les rappels simples.

## 14. Workflows de développement

### 14.1 Organisation du code et CI/CD

#### Outillage
- Repository unique, GitHub Actions, migrations (Drizzle ou Supabase), environnements de preview Vercel.

#### Discipline
- Convention de branches, revues de code obligatoires, quality gate (lint, typecheck, tests).

### 14.2 Déroulé MVP en 12 semaines

#### Séquencement
1. Semaine 1 : cadrage, maquettes, schéma multi-tenant, repo, CI/CD, environnements.
2. Semaine 2 : auth, organisations, équipes, rôles, invitations, RLS.
3. Semaine 3 : calendrier, événements, récurrences, vues.
4. Semaine 4 : convocations et réponses in-app temps réel.
5. Semaine 5 : intégration Whapi — envoi, webhooks entrants, file avec pacing.
6. Semaine 6 : groupes WhatsApp — création, synchronisation membres, gestion d'erreurs.
7. Semaine 7 : Stripe Billing — plans, Checkout, webhooks, portail client.
8. Semaine 8 : emails et rappels planifiés J-7/J-1, relances non-répondants.
9. Semaine 9 : analytics, tableau de bord coach, durcissement sécurité et RGPD.
10. Semaine 10 : beta fermée avec 3 à 5 clubs.
11-12. Semaines 11-12 : corrections beta, onboarding, performance, runbook, lancement.

## 15. Sécurité

### 15.1 Application

#### Contrôles
- RLS partout, RBAC serveur, MFA pour rôles privilégiés, validation Zod de toutes les entrées.
- Webhooks sécurisés (URL secrète, validation `channel_id`, journalisation).

### 15.2 Secrets et accès

#### Gestion
- Gestion centralisée des secrets, rotation, principe de moindre privilège, clés Whapi et Stripe restreintes par environnement.

### 15.3 Audit et supervision

#### Observabilité
- Journal d'audit des actions sensibles, Sentry pour les erreurs, alertes sur la santé du canal WhatsApp.

## 16. RGPD et conformité

### 16.1 Registre et bases légales

#### Fondements
- Registre des traitements ; base légale : exécution du contrat pour le service, consentement pour le canal WhatsApp (opt-in explicite et révocable).

### 16.2 Données de mineurs

#### Protection
- Consentement parental obligatoire ; minimisation des données ; compte enfant géré par le parent.

### 16.3 Droits et sous-traitants

#### Mise en conformité
- Export et suppression des données (droit à l'effacement), durées de rétention définies, DPA avec tous les sous-traitants, hébergement UE privilégié, mention explicite du transfert éventuel lié à Whapi dans la politique de confidentialité.

## 17. Analytics et mesure

### 17.1 Outils

#### Instrumentation
- PostHog Cloud UE ou Plausible ; événements métier instrumentés (convocation envoyée, réponse reçue par canal, relance déclenchée).

### 17.2 Tableaux de bord

#### Vues
- Dashboard coach (réponses, présences, statistiques) et dashboard interne (activation, rétention, santé canal, quotas).

## 18. Stratégie de tests

### 18.1 Niveaux

#### Unitaires et intégration
- Unitaires : Vitest (règles métier, mapping de réponses, machine à états des messages).
- Intégration : RLS et isolation multi-tenant, handlers de webhooks (idempotence, déduplication), file d'envoi (pacing, retries).

#### End-to-end et contrats
- Playwright : parcours coach, réponse à convocation, abonnement Stripe.
- Doubles de `WhatsAppProvider` (mock Whapi) ; tests contractuels sur les payloads Whapi.

### 18.2 Critères de qualité

#### Seuils
- Quality gate CI bloquant ; couverture cible sur les modules critiques (convocations, WhatsApp, billing).

## 19. Planning et jalons

### 19.1 Jalons

#### Calendrier
- Jalon 1 (fin semaine 2) : fondations multi-tenant et auth opérationnelles.
- Jalon 2 (fin semaine 6) : boucle complète convocation WhatsApp (envoi, réponse, synchronisation).
- Jalon 3 (fin semaine 9) : produit MVP complet avec billing et analytics.
- Jalon 4 (fin semaine 12) : lancement public après beta.

### 19.2 Capacité

#### Équipe
- [Hypothèse] Équipe de 2 à 3 développeurs full-stack à temps plein ; à ajuster en cadrage.

## 20. Backlog priorisé (extraits)

### 20.1 Epics et stories MVP

#### Epics
- Epic Convocations : en tant que coach, j'envoie une convocation reçue dans WhatsApp avec boutons de réponse ; en tant que joueur, je réponds en un appui et mon statut est synchronisé partout.
- Epic Groupes : en tant que coach, le groupe de mon équipe est créé et maintenu automatiquement.
- Epic Relances : en tant que coach, seuls les non-répondants sont relancés à J-1.
- Epic Billing : en tant qu'owner, je souscris et gère mon abonnement en self-service.
- Epic Canal : en tant qu'admin interne, je suis alerté de toute dégradation du canal WhatsApp.

### 20.2 Hors scope MVP

#### Exclusions
- Squadly AI, covoiturage, galerie, tâches, finances, sponsoring, application mobile native.

## 21. Risques et mitigation

### 21.1 Registre des risques

#### Risques canal WhatsApp
- Bannissement du numéro (élevé) : pacing, warm-up, opt-in, STOP, procédure de remplacement, plan B API officielle.
- Session Whapi déconnectée ou scan QR requis (moyen) : monitoring, alertes, runbook.
- Réponses ambiguës en texte libre (moyen) : boutons privilégiés, parsing IA en phase 3.
- Dédoublement des réponses app / WhatsApp (moyen) : règle du dernier statut horodaté.

#### Risques produit et conformité
- Données de mineurs (élevé) : consentement parental, minimisation, DPA.
- Dérive des coûts et quotas non intégrés au freemium (moyen) : plafonds par plan, métriques de consommation.
- Dépendance fournisseur (moyen) : abstraction `WhatsAppProvider`.

## 22. Critères d'acceptation

### 22.1 Critères fonctionnels

#### Boucle WhatsApp
- Une convocation envoyée à une équipe de 30 membres est distribuée en respectant le pacing, avec statuts suivis jusqu'à `delivered`.
- Une réponse WhatsApp met à jour le statut du membre dans l'application en moins de 60 secondes.

#### Robustesse
- Un membre sans WhatsApp accomplit le parcours complet in-app.
- La déconnexion de la session Whapi déclenche une alerte interne en moins de 5 minutes.

### 22.2 Critères non fonctionnels

#### Sécurité et qualité
- Aucune fuite de données inter-tenant (tests RLS automatisés verts).
- Handlers de webhooks idempotents démontrés par tests de rejeu.
- Parcours mobile-first validé sur appareils courants.

## 23. Références et sources

### 23.1 Source produit

#### Document initial
- `/mnt/agents/temp/Cahier_des_charges_Squadly.pdf` (cahier des charges initial Squadly).

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
- https://supabase.com/docs ; RLS : https://supabase.com/docs/guides/database/postgres/row-level-security ; Realtime : https://supabase.com/docs/guides/realtime ; Cron : https://supabase.com/docs/guides/cron ; Queues : https://supabase.com/docs/guides/queues
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

### 23.5 Notes de vérification

#### Réserves
- Tarifs Whapi, MakerKit, supastarter et Achromatic : valeurs observées indicatives, à revérifier avant tout engagement contractuel.
- Whapi n'étant pas l'API officielle Meta, la décision de l'utiliser doit être actée par le commanditaire en connaissance du risque.
