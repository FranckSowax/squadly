## 7. Intégration Whapi / WhatsApp

[Décision] L'intégration WhatsApp est le cœur différenciant du produit et sa première source de risque. La décision structurante : Whapi est un composant remplaçable derrière une abstraction interne, et WhatsApp un canal d'interaction, jamais la source de vérité, qui reste la base Postgres Squadly.

### 7.1 Nature du service et architecture d'intégration

[Fait] Whapi.Cloud n'est pas l'API officielle WhatsApp Business de Meta : il fonctionne comme une session de type « appareil lié », proche de WhatsApp Web. Cela apporte souplesse et coût forfaitaire par canal, mais pas de SLA Meta, pas de badge vert, et un risque de bannissement du numéro ou de rupture de session. [Décision] Whapi est retenu sous condition suspensive d'acceptation écrite du risque ; [Hypothèse] cette acceptation sera obtenue en cadrage.

[Décision] L'équipe devra implémenter une interface `WhatsAppProvider` encapsulant tous les appels Whapi (envoi, groupes, sondages, médias, vérification de numéros). Aucun module métier n'appelle Whapi directement : c'est la condition d'une bascule de fournisseur sans réécriture. Le site doit recevoir les webhooks sur un endpoint HTTPS qui répond immédiatement (code 2xx), puis pousse les événements vers une file asynchrone Inngest, traités sous 60 secondes : il s'agit d'une exigence MVP ferme, critère d'acceptation de l'intégration.

### 7.2 Messages

[Fait] Whapi permet l'envoi de texte, médias, contacts, localisation, boutons et listes via `POST /messages/text` et les endpoints associés, avec statuts de livraison `pending`, `sent`, `delivered`, `read`.

[Décision] Le système doit suivre chaque message sortant par une machine à états `pending → sent → delivered → read`, complétée par `failed` et `requeued`. Le site doit persister les identifiants de message, de groupe et de sondage Whapi pour rattacher chaque réponse entrante au bon contexte : équipe, événement, membre. Exigence mesurable : 100 % des messages sortants sont rattachables à un identifiant Whapi et à un objet métier Squadly.

### 7.3 Groupes

[Fait] Whapi permet la création de groupes (`POST /groups`), l'ajout et le retrait de participants (`POST` et `DELETE /groups/{GroupID}/participants`) et les mentions via le paramètre `mentions`. [Fait] Les ajouts peuvent échouer à cause des protections anti-spam de WhatsApp.

[Décision] Une équipe possède un seul groupe WhatsApp actif, archivé en fin de saison. Le système doit synchroniser les participants après chaque changement d'effectif et par vérification périodique, sans présumer que les ajouts réussissent. Tout écart entre effectif Squadly et participants du groupe génère une tâche de correction visible par le coach et l'administrateur interne.

### 7.4 Sondages

[Fait] L'endpoint `POST /messages/poll` permet des sondages de 2 à 12 options, à choix unique ou multiple ; les votes arrivent par webhook. [Décision] Le MVP se limite aux sondages d'horaire et d'organisation à choix unique ; covoiturage et sondages avancés sont reportés en phase 2. Chaque vote entrant est dédupliqué et rattaché au sondage via l'identifiant persisté.

### 7.5 Webhooks entrants

[Fait] Whapi émet des événements couvrant messages, statuts de livraison, groupes, contacts, présence, appels, labels et utilisateurs ; les réponses entrantes incluent texte, boutons, listes, réactions et votes de sondage. [Fait] Aucune signature HMAC n'est clairement documentée.

[Décision] L'équipe devra sécuriser l'endpoint par quatre mesures cumulatives : URL secrète à entropie élevée, validation du `channel_id` sur chaque requête, allowlist d'adresses IP si disponible, journalisation de toute requête invalide. Les handlers sont idempotents, rapides et dédupliquent les événements par identifiant. Critère d'acceptation : le rejeu d'un même événement webhook ne produit aucun effet dupliqué.

### 7.6 Statuts et synchronisation des réponses

[Décision] Les réponses entrantes sont rattachées au membre par numéro de téléphone et au contexte par la dernière convocation active. Si un membre répond à la fois dans l'application et dans WhatsApp, le dernier statut horodaté gagne. Les réponses en texte libre ne sont pas interprétées au MVP : un message d'aide renvoie vers les boutons ; le parsing IA est prévu en phase 3. Exigence mesurable : une réponse WhatsApp met à jour le statut du membre dans l'application en moins de 60 secondes.

### 7.7 Pacing, erreurs et anti-bannissement

[Fait] Whapi signale un risque de bannissement en cas d'envois trop rapides, répétitifs ou non sollicités, et recommande warm-up de session, délais aléatoires, limitation de débit, personnalisation et commande STOP.

[Décision] Mesures techniques obligatoires :

1. Warm-up progressif de la session et du numéro : à toute activation ou réactivation de canal (scan QR, remplacement de numéro), l'équipe devra faire monter le volume d'envoi par paliers quotidiens croissants sur plusieurs jours, en commençant par des échanges bidirectionnels avec des contacts connus, avant tout envoi de masse aux groupes (calendrier et paliers exacts : cible indicative à valider en cadrage).
2. File d'envoi avec débit plafonné et jitter aléatoire (paramètres exacts : cible indicative à valider en cadrage).
3. Retries à backoff exponentiel, idempotence des envois, journalisation complète de chaque tentative.
4. Opt-in WhatsApp explicite et révocable par membre ; la commande STOP est traitée automatiquement et désinscrit le membre du canal.
5. Médias entrants : au MVP, seule une conservation technique minimale est assurée, strictement limitée à ce qui est nécessaire au support et au diagnostic d'incidents (rétention Whapi limitée). L'import complet des médias via `GET /media/{media-id}` vers le stockage Squadly et la galerie associée sont reportés en phase 2. Vérification de l'existence WhatsApp des numéros à l'invitation.
6. Surveillance du canal : alerte interne en moins de 5 minutes en cas de déconnexion ou de scan QR requis ; procédure documentée de remplacement du numéro en cas de bannissement.

### 7.8 Plan B

[Décision] Si le risque Whapi devient inacceptable (bannissements répétés, exigence de conformité), le produit basculera vers l'API officielle WhatsApp Business Platform de Meta : plus conforme, mais plus coûteuse et contraignante (templates approuvés, fenêtre de 24 h, facturation par conversation). Grâce à `WhatsAppProvider`, la bascule se limite à un nouvel adaptateur et à la migration des gabarits ; la décision est réévaluée en phase 3.

## 8. Règles métier

[Décision] Les règles ci-dessous sont des invariants produit : elles s'appliquent quel que soit le canal et priment sur tout comportement d'interface.

### 8.1 Identité et appartenance

[Décision] Un membre est identifié par un compte SaaS ou, pour les interactions de réponse limitées (réponse à une convocation, vote à un sondage), par un numéro WhatsApp vérifié, opt-in actif, rattaché à un membre existant de l'effectif : un tel numéro ne constitue pas un compte à part entière et n'ouvre aucun accès à l'application. Un membre titulaire d'un compte SaaS peut y associer son numéro WhatsApp ; il peut appartenir à plusieurs équipes et organisations. [Décision] Un parent peut répondre pour son enfant ; la réponse déléguée est tracée avec l'auteur réel, et le compte d'un mineur est géré par son parent, consentement parental obligatoire.

### 8.2 Convocations et événements

[Décision] Seuls le coach et les rôles délégués publient convocations et annonces. Une équipe ne possède qu'un seul groupe WhatsApp actif. Les relances ne ciblent que les non-répondants, jamais en rafale : elles passent par la file avec pacing. Le dernier statut horodaté gagne entre canaux, sans exception.

### 8.3 IA

[Décision] Toute création Squadly AI (événement, composition, résumé publié dans WhatsApp) exige la validation explicite du coach avant publication. Aucun contenu IA n'est diffusé automatiquement.

### 8.4 Quotas et plans

[Décision] Les coûts WhatsApp sont intégrés au modèle freemium : le plan Gratuit applique un plafond mensuel de messages ; Premium et Club étendent les volumes. [Hypothèse] Les seuils chiffrés sont une cible indicative à valider en cadrage, à partir du coût Whapi observé (environ 35 dollars par mois et par canal, 29 dollars en annuel, à revérifier avant achat).

## 9. Abonnements et modèle économique

### 9.1 Plans

[Fait] Le PDF source prévoit un modèle freemium : version gratuite avec fonctions essentielles, version Premium avec fonctions avancées et Squadly AI, et offre spéciale clubs. [Décision] La grille MVP est la suivante :

| Plan | Périmètre | Quotas WhatsApp | Cible |
|---|---|---|---|
| Gratuit | 1 équipe, calendrier, convocations, réponses in-app | Plafond mensuel de messages (seuil à valider) | Découverte, petites équipes |
| Premium | Fonctions avancées, relances, sondages, statistiques | Volumes étendus | Coach ou équipe |
| Club | Création de plusieurs équipes sous une même organisation | Volumes mutualisés par club | Clubs multi-équipes |

[Décision] Le plan Club est vendable dès le MVP avec la création de plusieurs équipes rattachées à une même organisation ; les vues consolidées inter-équipes et les fonctions club avancées (administration centralisée, statistiques agrégées) sont reportées en phase 3. [Décision] La facturation Club (par siège ou par équipe) est arbitrée en cadrage. [Hypothèse] La conversion freemium vers Premium visée est de 5 à 10 % en année 1 (benchmark SaaS vertical, cible indicative à valider).

### 9.2 Implémentation Stripe

[Décision] La facturation repose sur Stripe Billing : plans et tarifs, Checkout pour la souscription, Customer Portal en self-service, webhooks vers le service d'entitlements. Quatre états sont gérés : essai, actif, impayé, annulé. En cas d'impayé ou d'annulation, la dégradation vers le plan Gratuit est gracieuse : aucune donnée supprimée, seuls quotas et fonctions Premium sont désactivés. Critère d'acceptation : un changement d'état Stripe est répercuté sur les droits en moins de 60 secondes (cible indicative à valider).

## 10. Back-office interne

### 10.1 Fonctionnalités

[Décision] Le back-office minimal du MVP couvre deux périmètres. Pilotage des comptes : liste et recherche d'organisations, équipes et membres, gestion des plans et exceptions commerciales, impersonation encadrée et systématiquement journalisée. Canal WhatsApp : tableau de santé du canal Whapi (état de session, file d'envoi, taux d'échec après retries) et console d'incidents (bannissement, scan QR requis, webhooks en échec), depuis laquelle l'administrateur interne déclenche la procédure de remplacement de numéro.

### 10.2 Accès

[Décision] L'accès back-office exige un rôle super-admin distinct de tout rôle métier, une authentification multifacteur obligatoire et un journal d'audit de toute action sensible (consultation d'organisation, impersonation, modification de plan, action sur le canal). Exigence mesurable : 100 % des actions super-admin produisent une entrée d'audit horodatée et attribuée.

## 11. Design system et identité

### 11.1 Principes

[Fait] Le PDF source demande une identité moderne, sportive, jeune, professionnelle et premium, une navigation mobile d'abord et un logo évoquant équipe, mouvement et coordination. [Décision] Le socle retenu est Tailwind CSS v4 avec shadcn/ui ; l'équipe devra définir les tokens Squadly : palette sportive premium, rayons, typographie display, thème clair et sombre. L'interface est livrée en PWA mobile-first avec bottom navigation.

### 11.2 Composants

[Décision] Composants retenus par module :

| Module | Composant retenu | Justification |
|---|---|---|
| Tableau de bord coach | Blocks shadcn/ui officiels | Couverture standard, coût nul |
| Statistiques | shadcn Charts ou Tremor | Cohérence visuelle avec shadcn |
| Calendrier | FullCalendar Standard (MIT) | Licence gratuite ; Premium seulement si la vue Timeline ressources devient indispensable |
| Tables de membres | TanStack Table ou tablecn | Gestion d'effectifs volumineux |
| Chat et notifications | Block chat de Shadboard (inspiration), Supabase Realtime, Sonner | Temps réel natif de la stack |
| Formulaires et sondages | react-hook-form + Zod + shadcn | Validation unique client et serveur |
| Landing marketing | Tailwind Plus (option) | Accélération du site vitrine |

Exigence : chaque écran du parcours de réponse à une convocation est utilisable à une main sur mobile, avec les actions Présent / Absent / Peut-être accessibles sans défilement.

## 12. Templates et base de code

### 12.1 Choix du template

[Décision] MakerKit Pro Next.js Supabase est la base recommandée si le budget est disponible (environ 349 dollars one-time observé, tarif indicatif à revérifier) : il couvre multi-tenant, organisations, rôles, invitations, RLS, Stripe Billing par siège, MFA, i18n et super-admin, soit directement les besoins clubs et équipes de Squadly.

| Option | Usage | Avantages | Limites | Coût / licence |
|---|---|---|---|---|
| MakerKit Pro | Base SaaS complète (recommandée) | Organisations, RBAC, RLS, invitations, Stripe per-seat, MFA | Payant, Turborepo à apprendre | 349 dollars one-time observé |
| MakerKit Lite | Évaluation gratuite | Même architecture, MIT | Pas de billing ni RBAC complet | MIT |
| supastarter | Alternative SaaS | Organizations-first, Better Auth, i18n, plusieurs PSP | Moins éprouvé | 349 euros et plus observé |
| Achromatic | Starter premium UI | Design léché, auth, orgs, Stripe | Multi-tenant moins profond | 180 dollars one-time observé |
| nextjs/saas-starter | Référence gratuite | Vercel, Postgres, Drizzle, Auth.js, Stripe | Minimal | MIT |
| ixartz/SaaS-Boilerplate | Gratuit complet | Clerk, Stripe, multi-tenant, RBAC, tests | Dépendance Clerk | MIT |

[Décision] En cas de contrainte budgétaire, MakerKit Lite ou un starter open source est retenu, les développements billing et RBAC correspondants étant réintégrés au planning.

### 12.2 Développements internes restants

[Fait] Aucun des templates évalués ne fournit les convocations sportives, la synchronisation WhatsApp, les compositions, les statistiques d'équipe ou le moteur de sondages : ces modules sont du développement interne pur et portent la valeur différenciante. [Décision] Le périmètre interne du MVP comprend l'adaptateur `WhatsAppProvider`, les files d'envoi et de réception, la machine à états des messages, le mapping des réponses, le moteur de convocations et de sondages, les relances planifiées et le tableau de bord coach. Le template n'accélère que les fondations non différenciantes ; toute modification profonde compliquant ses mises à jour futures est à éviter.
