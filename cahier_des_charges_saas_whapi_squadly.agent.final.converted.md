# Cahier des charges — Squadly SaaS + Whapi

## Résumé exécutif

[Décision] Ce cahier des charges définit le produit Squadly, un SaaS de gestion d'équipes sportives destiné aux coachs, joueurs, parents et clubs, enrichi d'une intégration WhatsApp via Whapi.Cloud. [Décision] Le principe directeur est simple : Squadly reste le cerveau du système, WhatsApp devient un canal d'interaction supplémentaire, jamais l'unique canal. [Décision] Les convocations, le calendrier et les statistiques vivent dans le SaaS ; les membres peuvent y répondre directement depuis WhatsApp sans installer l'application Squadly.

[Décision] Trois arbitrages structurent le projet. Premièrement, le développement est entièrement interne et s'appuie sur un template commercial (MakerKit Pro) pour les fondations non différenciantes. Deuxièmement, le lancement vise un MVP commercial en 12 semaines, avec une beta fermée de 3 à 5 clubs. Troisièmement, Whapi.Cloud est retenu comme fournisseur WhatsApp malgré son statut d'API non officielle : ce choix exige l'acceptation explicite du risque par le commanditaire, des mesures anti-bannissement rigoureuses et une architecture permettant de basculer vers l'API officielle Meta sans réécriture.

Chaque affirmation de ce document porte un préfixe : [Fait] pour un élément sourcé (PDF initial ou documentation externe), [Hypothèse] pour une inférence à valider avec le commanditaire, [Décision] pour un arbitrage retenu dans ce cahier des charges. Par convention, les listes, tableaux et étapes placés sous un paragraphe ou un titre préfixé héritent de ce statut : il n'est donc pas nécessaire de répéter le préfixe sur chaque cellule ou chaque ligne, la traçabilité restant assurée par le préfixe du bloc parent.

## 1. Contexte et genèse du projet

### 1.1 Origine du besoin

#### Produit décrit par la source

- [Fait] Squadly est décrit dans le PDF source comme une application mobile et web de gestion d'équipes sportives pour coachs, joueurs, parents et clubs.
- [Fait] Le PDF vise à centraliser messages, calendriers, convocations et statistiques afin d'éviter l'usage de plusieurs applications distinctes.

#### Extension WhatsApp

- [Fait] Le PDF ne mentionne ni WhatsApp ni Whapi : l'intégration WhatsApp est une décision nouvelle issue de la demande du commanditaire, et non une exigence du document initial.
- [Décision] Développer le SaaS entièrement en interne, en s'appuyant sur un template commercial (MakerKit Pro) pour les fondations non différenciantes (authentification, organisations, rôles, billing) afin de concentrer l'effort de l'équipe sur les modules métier.

### 1.2 Constats de marché

#### Concurrence

- [Fait] Le PDF cite TeamSnap et SportCorico comme références ; la différenciation visée repose sur la simplicité d'interface et sur l'intégration de l'IA.

#### Comportement des utilisateurs

- [Hypothèse] WhatsApp est le canal de messagerie dominant des équipes sportives amateurs en Europe francophone ; permettre de répondre aux convocations sans application supplémentaire réduit la friction et augmente le taux de réponse. À valider en cadrage par une enquête auprès des clubs de la beta.
- [Hypothèse] Les coachs bénévoles disposent de peu de temps ; chaque automatisation (relances des non-répondants, rappels) a une valeur perçue élevée et justifie le passage au plan Premium.

### 1.3 Positionnement du produit

#### Rôle de Squadly

- [Décision] Squadly reste le cerveau du système : la base Postgres est la source de vérité des événements, des convocations et des réponses. WhatsApp est un canal d'interaction piloté par le SaaS, qui diffuse les messages et ramène les réponses dans Squadly.

#### Indépendance au canal

- [Décision] Le produit reste pleinement fonctionnel sans WhatsApp pour les membres non équipés ou sans opt-in : le parcours complet (calendrier, convocations, réponses, notifications) doit rester disponible in-app et par email.

## 2. Objectifs, KPI et indicateurs de succès

### 2.1 Objectifs business

#### Lancement

- [Décision] Lancer un MVP commercial en 12 semaines avec une beta fermée de 3 à 5 clubs, suivie d'un lancement public après correction des retours beta.

#### Monétisation

- [Hypothèse] Atteindre un taux de conversion freemium vers Premium de l'ordre de 5 à 10 % en année 1 (benchmark SaaS vertical). Cible indicative à valider avec le commanditaire.
- [Décision] Le plan Club commercial peut être vendu dès le MVP : il inclut la création de plusieurs équipes au sein d'une même organisation. Les vues consolidées et les fonctions club avancées restent en phase 3.

### 2.2 KPI produit

#### Engagement

- [Hypothèse] Taux de réponse aux convocations sous 24 h : cible indicative supérieure à 80 %, à valider avec le commanditaire.
- [Décision] Part des réponses reçues via WhatsApp versus in-app : indicateur d'adoption du canal suivi dès le MVP, sans cible au MVP ; une cible sera fixée après la beta sur la base des mesures observées.
- [Décision] Temps de préparation d'une convocation par le coach : mesure avant/après pendant la beta (chronométrage sur un échantillon de coachs), sans cible au MVP ; l'objectif chiffré de gain de productivité sera fixé à l'issue de la beta.

#### Rétention et fiabilité

- [Décision] Taux de rétention des équipes actives à 30 et 90 jours : indicateurs suivis sans cible au MVP ; les cibles seront fixées après la beta sur la base des cohortes observées.
- [Hypothèse] Taux de messages aboutissant au statut `delivered` : cible indicative supérieure à 95 % hors bannissement, à valider en cadrage. [Décision] Nombre d'incidents de session Whapi par mois (déconnexions, scans QR requis) : indicateur suivi sans cible au MVP, avec revue mensuelle et seuil d'escalade défini en cadrage.

### 2.3 KPI techniques

#### Performance d'intégration

- [Décision] Latence de traitement des webhooks entrants : réponse HTTP immédiate, traitement asynchrone complet sous 60 secondes (exigence mesurable, vérifiée par monitoring).
- [Décision] Taux d'erreur de la file d'envoi WhatsApp après retries : indicateur suivi en continu sans cible au MVP ; le seuil d'alerte sera défini en cadrage puis ajusté après la beta.

#### Qualité structurelle

- [Décision] Couverture des tests d'isolation multi-tenant (Row Level Security Postgres) : 100 % des tables tenant, sans exception (exigence mesurable, vérifiée en intégration continue).

## 3. Hypothèses et contraintes

### 3.1 Hypothèses à valider en cadrage

#### Budget

- [Hypothèse] Template MakerKit Pro (environ 349 dollars one-time observé) et abonnement Whapi (environ 35 dollars par mois et par canal, 29 dollars en annuel). Tarifs indicatifs à revérifier avant tout engagement contractuel.

#### Acceptation du risque

- [Hypothèse] Acceptation écrite par le commanditaire du risque lié à une API WhatsApp non officielle (bannissement possible du numéro). À obtenir en cadrage.
- [Hypothèse] Disponibilité d'un numéro de téléphone dédié à la session Whapi, distinct des numéros personnels des fondateurs. À confirmer en cadrage.

### 3.2 Contraintes

#### Contraintes fournisseur

- [Fait] Whapi.Cloud n'est pas l'API officielle WhatsApp Business de Meta : il fonctionne comme une session de type appareil lié (proche de WhatsApp Web). Conséquences : risque de bannissement, risque de rupture de session, absence de SLA Meta et de badge vert. Le produit doit donc tolérer une indisponibilité temporaire du canal sans bloquer les fonctionnalités cœur.

#### Contraintes d'exploitation

- [Décision] Hébergement des données en Union européenne lorsque disponible ; tout transfert hors UE doit être identifié, minimisé, documenté et couvert par des garanties appropriées (clauses contractuelles types ou mécanisme équivalent). Signature d'un DPA (accord de traitement des données) avec chaque sous-traitant : Supabase, Sentry, PostHog, Stripe, Resend, Whapi.
- [Décision] Petite équipe interne : un seul déploiement applicatif, backend managé (Supabase), orchestrateur de jobs managé (Inngest). Pas de workers persistants type BullMQ/Redis au MVP, afin de limiter la charge d'exploitation.

## 4. Utilisateurs et rôles

### 4.1 Rôles métier

#### Rôles définis par le PDF

- [Fait] Coach : gère l'équipe, les entraînements, les matchs, les convocations et les statistiques.
- [Fait] Joueur : consulte son calendrier, répond aux convocations et suit ses statistiques.
- [Fait] Parent : suit les activités de son enfant et reçoit les informations importantes.
- [Décision] Le parent peut répondre à une convocation à la place de son enfant, avec traçabilité de l'auteur réel.
- [Fait] Club : gère plusieurs équipes.

### 4.2 Rôles techniques (RBAC)

#### Nomenclature

- [Décision] Cinq rôles applicatifs : Owner, Admin, Coach, Player, Parent, complétés par un rôle super-admin interne pour le back-office.

#### Mapping club et délégation

- [Décision] Les rôles Owner et Admin incarnent la délégation club : ils portent l'administration de l'organisation (membres, équipes, facturation) au nom du club, sans préjuger des droits métier de terrain.
- [Décision] La publication des convocations et des annonces reste réservée au coach et aux rôles explicitement délégués par le club (par exemple un Owner ou Admin désigné comme responsable d'équipe) ; elle n'est pas accordée automatiquement à tous les Owner/Admin.

#### Matrice de permissions

| Action | Owner | Admin | Coach | Player | Parent |
|---|---|---|---|---|---|
| Publier convocations et annonces | Si délégué | Si délégué | Oui | Non | Non |
| Gérer la facturation | Oui | Oui | Non | Non | Non |
| Consulter les statistiques nominatives | Oui | Oui | Oui | Soi-même | Son enfant |
| Répondre aux convocations | Oui | Oui | Oui | Oui | Pour son enfant |

### 4.3 Cas particuliers

#### Membre WhatsApp sans compte

- [Décision] Membre sans compte SaaS mais avec numéro WhatsApp opt-in : interactions limitées aux réponses aux convocations et aux sondages. Le système rattache ses réponses par numéro de téléphone et contexte (dernière convocation active).

#### Mineurs et membres sans WhatsApp

- [Décision] Mineurs : compte géré par le parent, consentement parental obligatoire avant toute collecte.
- [Décision] Membre sans WhatsApp : parcours complet in-app et par email, sans dégradation fonctionnelle.

## 5. Parcours utilisateurs

### 5.1 Parcours coach

#### Onboarding

1. [Décision] Création de compte, puis de l'organisation et de la première équipe.
2. [Décision] Choix du plan (gratuit ou Premium) et invitation des membres.
3. [Décision] Connexion du groupe WhatsApp de l'équipe (création automatique ou rattachement).

#### Cycle hebdomadaire

1. [Décision] Création d'un événement (entraînement ou match) dans le calendrier.
2. [Décision] Envoi de la convocation, diffusée in-app, par email et dans WhatsApp.
3. [Décision] Suivi des réponses en temps réel sur le tableau de bord.
4. [Décision] Relance automatique des seuls non-répondants.
5. [Décision] Composition de l'équipe, puis résumé post-événement (fonction IA, phase 2).

### 5.2 Parcours joueur et parent

#### Réponse à une convocation

- [Décision] Réception dans WhatsApp, réponse en un appui via boutons ou réponses rapides (Présent / Absent / Peut-être), ou réponse in-app. Le statut est synchronisé partout, la dernière réponse horodatée l'emportant entre canaux.

#### Consultation

- [Décision] Calendrier, annonces, statistiques personnelles et sondages, accessibles in-app ; les notifications essentielles sont relayées dans WhatsApp pour les membres opt-in.

### 5.3 Parcours club

#### Multi-équipes

- [Décision] Au MVP : création de plusieurs équipes au sein d'une organisation, délégation de la gestion aux coachs et gestion centralisée de l'abonnement club (plan Club commercial). [Décision] La vue consolidée des équipes et les fonctions club avancées restent en phase 3.

### 5.4 Parcours d'administration interne

#### Supervision

- [Décision] Supervision des organisations, surveillance de la santé du canal Whapi (état de session, file d'envoi, taux d'échec) et gestion des incidents : bannissement du numéro, session déconnectée, webhooks en échec, support utilisateurs.

## 6. Fonctionnalités

### 6.1 MVP (semaines 1 à 12)

#### Socle SaaS

1. [Décision] Comptes, organisations, équipes, rôles et invitations. Critère d'acceptation : un coach crée son équipe et invite 30 membres en moins de 15 minutes (cible indicative à valider).
2. [Décision] Tableau de bord coach avec vue temps réel des réponses.
3. [Décision] Calendrier des entraînements, matchs et événements, avec gestion des récurrences.
4. [Décision] Convocations et réponses Présent / Absent / Peut-être, gestion des absences. Critère d'acceptation : une réponse WhatsApp met à jour le statut du membre dans l'application en moins de 60 secondes.
5. [Décision] Notifications et annonces sur trois canaux : in-app, email, WhatsApp.

#### Boucle WhatsApp

6. [Décision] Groupe WhatsApp par équipe : création, ajout et retrait des membres, synchronisation avec l'effectif.
7. [Décision] Convocations bidirectionnelles via WhatsApp : envoi, réponses par boutons, synchronisation des statuts dans Squadly. Critère d'acceptation : une convocation envoyée à une équipe de 30 membres est distribuée en respectant le pacing, avec statuts suivis jusqu'à `delivered`.
8. [Décision] Relances automatiques ciblant uniquement les non-répondants, jamais en rafale.
9. [Décision] Sondages simples (horaire, organisation) à choix unique.
10. [Décision] Médias WhatsApp : le MVP ne comprend pas de galerie. Tout stockage technique éventuel des médias reçus reste interne et non exposé aux utilisateurs ; l'import de médias et la galerie visible restent en phase 2.

#### Monétisation et pilotage

11. [Décision] Compositions d'équipe et statistiques de base.
12. [Décision] Abonnements Stripe : plans, quotas par plan (dont plafond de messages WhatsApp en plan gratuit), portail client en self-service.
13. [Décision] Back-office minimal : liste des organisations, état du canal WhatsApp, support.

### 6.2 Phase 2 (post-lancement, 3 à 6 mois)

#### Squadly AI

- [Décision] Création d'entraînement à la demande, proposition de composition selon les disponibilités, aide à la préparation des convocations, résumé de match ou d'entraînement publié dans WhatsApp après validation du coach. [Décision] Toute création IA nécessite la validation humaine avant publication.

#### Vie d'équipe

- [Décision] Sondages avancés et organisation du covoiturage.
- [Décision] Galerie photos et vidéos : les médias WhatsApp importants sont téléchargés vers le stockage Squadly.
- [Décision] Gestion de tâches pour l'équipe et statistiques avancées.

### 6.3 Phase 3 (6 à 12 mois)

#### Club et finances

- [Décision] Fonctionnalités club avancées (vues consolidées multi-équipes et fonctions club avancées), finances, paiements de cotisations et sponsoring, en extension du socle Stripe. La création de plusieurs équipes, vendue avec le plan Club commercial, est déjà disponible au MVP.

#### IA avancée et conformité canal

- [Décision] Parsing IA des réponses WhatsApp en texte libre avec gestion de l'ambiguïté (au MVP, le texte libre reçoit un message d'aide renvoyant vers les boutons).
- [Décision] Évaluation formelle de la bascule vers l'API officielle WhatsApp Business (plan B) si le risque Whapi devient inacceptable : bannissements répétés ou exigence de conformité accrue. L'abstraction fournisseur `WhatsAppProvider`, détaillée au chapitre 7, limite cette bascule à l'implémentation d'un nouvel adaptateur.

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
