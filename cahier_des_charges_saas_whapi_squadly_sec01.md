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
