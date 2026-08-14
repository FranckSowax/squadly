# Cahier des charges « Squadly Shop » — Outline exécutable du document final

Ce document est une outline exécutable : il définit la structure complète, les contenus attendus et les consignes de rédaction du cahier des charges du site e-commerce « Squadly Shop », développé en interne. Chaque point de niveau H4 est une consigne précise que le rédacteur doit transformer en paragraphes, tableaux ou listes du document final. Cible du document final : 4 500 à 6 500 mots, style consulting actionnable, en français, sans emoji, sans niveau de titre H5.

## 0. Mode d'emploi de cette outline

### 0.1 Finalité et usage

#### 0.1.1 Rôle du document
Préciser que cette outline sert de plan de rédaction contraignant : chaque chapitre H2 devient un chapitre du cahier des charges final, chaque section H3 une section, chaque point H4 un ou deux paragraphes rédigés.

#### 0.1.2 Statut des consignes
Indiquer que les formulations « le document doit », « préciser », « chiffrer » sont des instructions au rédacteur, et que tout point non tranché doit être explicité comme décision à prendre, jamais laissé implicite.

### 0.2 Conventions rédactionnelles

#### 0.2.1 Ton et style
Imposer un style consulting actionnable : phrases courtes, verbes d'action, exigences formulées avec « le site doit », « l'équipe devra », aucune tournure marketing vague.

#### 0.2.2 Formats privilégiés
Prescrire l'usage de tableaux pour les comparatifs (stack, risques, planning, budget de mots), de listes numérotées pour les exigences ordonnées, et d'au moins un schéma d'architecture décrit en texte.

#### 0.2.3 Interdits éditoriaux
Rappeler les interdits : pas d'emoji, pas de niveau H5, pas de jargon anglais non expliqué, pas de contenu dupliqué entre chapitres (renvoyer d'un chapitre à l'autre).

### 0.3 Budget de mots du document final

#### 0.3.1 Cible globale
Fixer la cible à environ 5 800 mots rédigés, dans la fourchette contractuelle de 4 500 à 6 500 mots, hors tableaux de référence et annexes éventuelles.

#### 0.3.2 Répartition par chapitre
Insérer un tableau de répartition indicatif : chapitres 1 à 3 (environ 600 mots), chapitres 4 à 5 (500 mots), chapitres 6 à 12 (1 600 mots), chapitres 13 à 14 (500 mots), chapitres 15 à 16 (550 mots), chapitres 17 à 22 (1 100 mots), chapitres 23 à 27 (900 mots), chapitre 28 (150 mots).

### 0.4 Sources de travail

#### 0.4.1 Matière première
Lister comme matière première obligatoire le cahier des charges source Squadly (PDF) et les cinq fichiers de recherche produits en amont, dont le contenu est résumé au chapitre 28.

#### 0.4.2 Traçabilité
Exiger que chaque affirmation structurante du document final soit rattachée soit au PDF source, soit à une recherche, soit explicitement marquée comme hypothèse ou décision projet.

## 1. Contexte et genèse du projet

### 1.1 Rappel du projet Squadly

#### 1.1.1 Produit d'origine
Résumer en cinq à huit lignes le PDF source : Squadly est une application mobile et web de gestion d'équipes sportives qui centralise messages, calendriers, convocations et statistiques pour coachs, joueurs, parents et clubs.

#### 1.1.2 Éléments distinctifs existants
Citer les éléments à préserver dans l'univers de la boutique : identité jeune, sportive et premium, navigation mobile-first, modèle freemium avec offre Premium, et Squadly AI comme différenciateur face à TeamSnap et SportCorico.

### 1.2 Genèse de Squadly Shop

#### 1.2.1 Concept
Définir Squadly Shop comme la boutique en ligne de l'univers Squadly, vendant trois familles d'offres : abonnements numériques (Premium, licences Club, module Squadly AI), textile et accessoires sportifs, packs club personnalisables.

#### 1.2.2 Justification business
Expliquer la logique : le modèle économique freemium du PDF et son volet « finances, paiements, sponsoring » prévu en évolution justifient un canal de vente direct, sans dépendre d'une plateforme externe.

#### 1.2.3 Positionnement stratégique
Formuler la promesse : prolonger le « tout au même endroit » de Squadly en reliant organisation sportive, communauté du club et achat d'équipements, plutôt qu'un catalogue de produits isolé.

### 1.3 Cadrage du document

#### 1.3.1 Périmètre du cahier des charges
Déclarer que le document couvre un site web e-commerce séparé de l'application Squadly, développé intégralement en interne, du design au déploiement, sans agence externe.

#### 1.3.2 Lecteurs visés
Identifier les lecteurs : direction produit, équipe de développement interne, référent conformité/RGPD, et tout futur prestataire de support ponctuel.

## 2. Objectifs et indicateurs de succès

### 2.1 Objectifs business

#### 2.1.1 Objectif principal du MVP
Énoncer l'objectif : valider les ventes en ligne et les parcours d'achat avec un catalogue court avant tout investissement lourd, en visant un lancement exploitable en environ douze semaines.

#### 2.1.2 Segments de revenus
Détailler les trois flux attendus : ventes B2C d'équipements aux parents et joueurs, packs et renouvellement de matériel pour coachs, commandes groupées et abonnements pour clubs.

### 2.2 Objectifs produit et expérience

#### 2.2.1 Exigence de parcours
Fixer l'exigence chiffrée : de la page d'accueil à la confirmation de paiement en moins de trois étapes après le panier, avec un tunnel entièrement pensé pour le mobile.

#### 2.2.2 Cohérence de marque
Exiger que la boutique soit immédiatement reconnaissable comme Squadly : ton sportif et premium, interface simple et rapide, sans compromis sur la lisibilité.

### 2.3 Indicateurs de succès

#### 2.3.1 KPI business
Définir un tableau de KPI : taux de conversion visite-achat, panier moyen, part des ventes club, taux de souscription Premium via la boutique, avec des cibles chiffrées à fixer au cadrage.

#### 2.3.2 KPI techniques
Fixer les seuils : Core Web Vitals dans le vert sur mobile, taux de succès des paiements supérieur à 95 %, taux de délivrabilité des emails transactionnels supérieur à 98 %, zéro erreur webhook non traitée.

### 2.4 Non-objectifs du MVP

#### 2.4.1 Exclusions explicites
Lister ce que le MVP ne fait pas : pas de recommandations IA, pas de marketplace multi-vendeurs, pas de multi-pays ni multi-devises, pas de personnalisation produit complexe en ligne.

## 3. Hypothèses, arbitrages et zones à clarifier

### 3.1 Hypothèses retenues

#### 3.1.1 Hypothèses de périmètre
Énoncer comme hypothèses de travail : site web séparé de l'application, développement interne, lancement France et francophonie, ventes B2C et B2B club, paiement via Stripe.

#### 3.1.2 Hypothèses de capacité
Formuler l'hypothèse d'une équipe interne capable d'assurer un minimum de DevOps et d'observabilité ; condition qui détermine le choix du backend au chapitre 15.

### 3.2 Arbitrages structurants

#### 3.2.1 Possession du code versus rapidité
Trancher et argumenter : posséder le backend (Medusa) donne le contrôle et évite les commissions, au prix de la maintenance, du monitoring et des sauvegardes ; l'alternative allégée Supabase/Postgres + Stripe accélère la validation si le catalogue reste très limité.

#### 3.2.2 Simplicité MVP versus ambition
Statuer : le MVP exclut IA avancée, personnalisation complexe et marketplace ; toute demande sortant de ce cadre bascule en phase 2 ou 3 sans exception.

#### 3.2.3 Design premium versus accessibilité
Poser la règle : le style sportif ne doit jamais réduire les contrastes, la lisibilité ni la navigation clavier ; l'accessibilité WCAG 2.2 AA prime sur l'effet visuel.

### 3.3 Zones à clarifier avant rédaction définitive

#### 3.3.1 Charte graphique incomplète
Signaler que la section Design du PDF contient des puces corrompues et que la charte détaillée (couleurs, typographies, logo final) doit être redemandée ou redéfinie ; prévoir un jalon dédié.

#### 3.3.2 Données manquantes
Lister les inconnues à faire trancher par le sponsor : budget, calendrier contractuel, volume de catalogue au lancement, grille de prix, pays cibles exacts, responsabilités nominatives.

#### 3.3.3 Niveau de confiance des sources
Reprendre le tableau de vérification croisée : faits à confiance élevée (nature du PDF, stack Next.js cohérente, Stripe Checkout adapté au MVP), faits à confiance moyenne (choix du starter, périmètre géographique), et marquer chacun dans le document final.

## 4. Utilisateurs et personas

### 4.1 Segments prioritaires

#### 4.1.1 Hiérarchie des cibles
Classer les cibles par priorité : 1) parents et joueurs pour l'achat simple et rapide d'équipements, 2) coachs pour les packs d'entraînement et le renouvellement de matériel, 3) clubs pour les commandes groupées, la personnalisation et les abonnements.

#### 4.1.2 Utilisateurs secondaires
Mentionner les profils internes : gestionnaire de boutique, support client, comptabilité, qui utilisent le back-office et conditionnent ses exigences.

### 4.2 Personas

#### 4.2.1 Persona parent
Rédiger un persona complet : parent de joueur, achat majoritairement sur mobile, pressé, sensible à la clarté des tailles, aux délais de livraison et à la simplicité du paiement.

#### 4.2.2 Persona coach
Rédiger un persona coach bénévole : achète des packs d'entraînement, réutilise ses commandes précédentes, attend des recommandations pertinentes et un historique clair.

#### 4.2.3 Persona responsable club
Rédiger un persona trésorier ou responsable club : commandes groupées, demande de devis, personnalisation aux couleurs du club, besoin de factures conformes et de codes promo.

### 4.3 Besoins, freins et cas particuliers

#### 4.3.1 Besoins et freins par segment
Produire un tableau segment / besoin principal / frein principal / réponse du site, avec au moins trois lignes renseignées.

#### 4.3.2 Mineurs et consentement
Traiter le cas des acheteurs mineurs ou des comptes gérés par des parents : achat encadré, consentement parental pour les données, minimisation des informations collectées, en cohérence avec le public Squadly.

#### 4.3.3 Achat invité versus compte
Statuer : le paiement en invité doit être possible au MVP ; la création de compte est proposée après l'achat, jamais imposée avant le paiement.

## 5. Parcours utilisateurs

### 5.1 Parcours d'achat B2C

#### 5.1.1 Enchaînement des étapes
Décrire le parcours nominal : accueil, catégorie, fiche produit avec variante et taille, panier en drawer, paiement Stripe Checkout hébergé, page de confirmation et email de confirmation.

#### 5.1.2 Chemins dégradés
Décrire les branches : échec de paiement et reprise, rupture de stock entre panier et paiement, abandon de panier, retour en arrière sans perte du panier.

### 5.2 Parcours abonnement

#### 5.2.1 Souscription Premium
Décrire la souscription à l'abonnement Premium ou au module Squadly AI depuis la boutique : page offre, comparaison gratuit/Premium, paiement récurrent Stripe, activation immédiate des droits.

#### 5.2.2 Gestion du cycle de vie
Décrire renouvellement, changement d'offre, échec de prélèvement avec relance, résiliation en libre-service depuis l'espace client.

### 5.3 Parcours club B2B

#### 5.3.1 Commande groupée et devis
Décrire le parcours club : page offre dédiée, constitution d'une commande groupée, demande de devis pour personnalisation, validation et paiement différé ou par virement si retenu.

#### 5.3.2 Personnalisation
Préciser le niveau MVP : personnalisation limitée à un formulaire structuré (nom, numéro, logo club fourni par fichier) traitée manuellement ; le configurateur en ligne est phase 2.

### 5.4 Parcours post-achat et support

#### 5.4.1 Suivi et retours
Décrire : suivi de commande depuis le compte et l'email, demande de retour conforme au droit de rétractation, échange de taille, remboursement.

#### 5.4.2 Exigences transverses de parcours
Exiger que chaque parcours du document final comporte un schéma en texte, les points de sortie possibles, les emails déclenchés et les états visibles dans le back-office.

## 6. Fonctionnalités du MVP

### 6.1 Socle fonctionnel

#### 6.1.1 Périmètre arrêté
Énumérer le socle MVP : catalogue limité, fiches produits avec variantes, panier recalculé côté serveur, paiement Stripe Checkout, comptes clients, emails transactionnels, back-office minimal, pages légales obligatoires.

#### 6.1.2 Règle de gouvernance du périmètre
Instaurer la règle : toute fonctionnalité non listée au 6.1.1 est hors MVP ; son ajout exige une décision écrite du sponsor et un réétalonnage du planning.

### 6.2 Détail par fonctionnalité

#### 6.2.1 Fiches de cadrage
Rédiger pour chaque fonctionnalité du socle une fiche de cinq lignes : objectif, règles métier, données manipulées, états d'erreur, critère « prêt » mesurable.

#### 6.2.2 Exigences panier et prix
Préciser : prix affichés TTC, TVA calculée côté serveur, recalcul systématique avant création de la session Stripe, jamais de prix de confiance venant du navigateur.

### 6.3 Definition of done du MVP

#### 6.3.1 Conditions de complétude
Lister les conditions : parcours d'achat E2E automatisé vert, emails envoyés et reçus, webhooks surveillés, mentions légales et CGV publiées, sauvegardes testées, monitoring actif.

## 7. Fonctionnalités des phases 2 et 3

### 7.1 Phase 2

#### 7.1.1 Lot commerce
Décrire le lot phase 2 : comptes avancés, codes promo, gestion de la livraison et des transporteurs, factures PDF, recherche produit (Meilisearch ou Algolia), CMS de contenu, relances de panier, avis clients.

#### 7.1.2 Lot intelligence
Décrire les recommandations IA de phase 2 : suggestion de produits et de packs selon le sport, la taille d'effectif et l'historique, en cohérence avec le positionnement Squadly AI, avec mesure d'impact avant généralisation.

### 7.2 Phase 3

#### 7.2.1 Lot scale
Décrire : multi-pays et multi-devises, offre B2B club avancée avec configurateur, SSO avec l'application Squadly, avantages Premium unifiés entre application et boutique, notifications de commande dans l'application.

#### 7.2.2 Conditions de passage
Fixer les critères de déclenchement de chaque phase : seuils de ventes, stabilité technique (taux d'erreur, webhooks), capacité d'exploitation de l'équipe, validation RGPD des nouveaux traitements.

## 8. Catalogue produits

### 8.1 Taxonomie

#### 8.1.1 Arborescence
Définir l'arborescence MVP en quatre catégories : abonnements et licences, textiles (maillots, survêtements), accessoires d'entraînement, packs club ; prévoir l'extension par sport en phase 2.

#### 8.1.2 Volume de lancement
Chiffrer l'ordre de grandeur : catalogue court au lancement, de l'ordre de quinze à trente références hors variantes, à confirmer par le sponsor.

### 8.2 Modèle de données produit

#### 8.2.1 Attributs obligatoires
Spécifier le modèle : titre, description, catégorie, variantes (taille, couleur), SKU, prix HT/TTC et taux de TVA, stock, images, statut de publication, attributs de personnalisation éventuels.

#### 8.2.2 Produits numériques
Distinguer les abonnements et licences : pas de stock ni de livraison, association à un plan Stripe Billing, activation de droits après paiement confirmé par webhook.

### 8.3 Fiches produits

#### 8.3.1 Contenu exigé
Lister le contenu obligatoire d'une fiche : visuels optimisés, prix TTC, disponibilité en temps réel, guide des tailles, délais et modes de livraison, conditions de retour, mentions légales de personnalisation.

#### 8.3.2 Qualité éditoriale
Imposer des règles : descriptions orientées usage sportif, ton Squadly, aucune fiche publiée sans image ni stock renseigné, relecture avant mise en ligne.

## 9. Paiements et facturation

### 9.1 Prestataire et intégration

#### 9.1.1 Choix du PSP
Justifier Stripe Checkout hébergé : périmètre PCI minimal car aucune donnée carte ne transite par nos serveurs, authentification forte 3DS/SCA gérée nativement, rapidité d'intégration adaptée au MVP.

#### 9.1.2 Méthodes de paiement
Préciser le périmètre : cartes bancaires au MVP, portefeuilles (Apple Pay, Google Pay) dès que disponibles via Stripe, virement ou paiement différé réservé au parcours club et à arbitrer.

### 9.2 Webhooks et fiabilité

#### 9.2.1 Traitement des événements
Spécifier : la création de commande repose sur l'événement « checkout.session.completed », traité de façon idempotente, avec journalisation et rejeu possible.

#### 9.2.2 Surveillance
Exiger : alerting sur échec de webhook, file d'événements non traités, procédure de réconciliation quotidienne entre Stripe et la base de commandes.

### 9.3 Cas financiers particuliers

#### 9.3.1 Remboursements et avoirs
Décrire les flux : remboursement total ou partiel depuis le back-office, émission d'avoir, impact sur la commande, email client systématique.

#### 9.3.2 TVA et facturation
Préciser : TVA française au MVP, facture PDF numérotée pour chaque commande, mentions obligatoires, export comptable mensuel, évolution OSS à étudier dès vente hors France.

## 10. Abonnements et licences

### 10.1 Offres

#### 10.1.1 Grille des offres
Définir trois offres : Premium individuel (fonctions avancées et Squadly AI), licence Club (plusieurs équipes, tarif dégressif), module Squadly AI en option ; prix à faire valider par le sponsor.

#### 10.1.2 Cohérence avec le freemium
Relier au modèle du PDF : la version gratuite reste dans l'application ; la boutique vend les niveaux payants, avec une offre spéciale clubs comme prévu au chapitre modèle économique du PDF.

### 10.2 Mécanique d'abonnement

#### 10.2.1 Cycle de vie technique
Spécifier Stripe Billing : création d'abonnement après paiement, renouvellement automatique, gestion des échecs de prélèvement avec relances, prorata lors des changements d'offre, résiliation en fin de période.

#### 10.2.2 Portage des droits
Décrire l'activation : les droits achetés sur la boutique doivent être reconnus dans l'application Squadly, d'abord par liaison de compte email, puis par SSO en phase 3.

## 11. Comptes clients et espaces club

### 11.1 Authentification

#### 11.1.1 Solution retenue
Retenir Auth.js ou Better Auth côté storefront : email et mot de passe, lien magique en option, réinitialisation sécurisée ; Clerk reste une alternative si l'équipe préfère un service géré.

#### 11.1.2 Sécurité des comptes
Exiger : politique de mot de passe raisonnable, protection contre le bourrage d'identifiants, sessions révocables, MFA obligatoire pour les comptes d'administration.

### 11.2 Espace client

#### 11.2.1 Contenu de l'espace
Spécifier les sections : commandes et statuts, abonnements et licences actifs, factures téléchargeables, adresses, données personnelles avec export et suppression.

#### 11.2.2 Liaison avec l'application
Prévoir au minimum un lien « ouvrir Squadly » et l'affichage des avantages Premium ; la synchronisation complète des comptes relève de la phase 3.

### 11.3 Espace club

#### 11.3.1 Fonctions club
Décrire : gestion de plusieurs équipes, membres autorisés à commander, historique des commandes groupées, demandes de devis, codes promo dédiés.

## 12. Back-office et opérations

### 12.1 Fonctions du back-office

#### 12.1.1 Modules exigés au MVP
Lister : gestion des produits et stocks, traitement des commandes (statuts, expédition, remboursement), consultation des clients, codes promo simples, tableau de bord des ventes.

#### 12.1.2 Rôles et permissions
Définir au moins trois rôles : administrateur, gestionnaire boutique, support lecture seule ; chaque action sensible est tracée avec auteur et date.

### 12.2 Opérations quotidiennes

#### 12.2.1 Routines d'exploitation
Décrire la journée type : traitement des commandes, vérification des webhooks en échec, mise à jour des stocks, réponse aux demandes de retour, export comptable en fin de mois.

#### 12.2.2 Outils d'administration technique
Préciser : accès aux logs, au monitoring Sentry, aux sauvegardes et à leur statut, aux files d'événements, avec une procédure écrite pour chaque incident courant.

## 13. Design system Squadly

### 13.1 Principes d'identité

#### 13.1.1 Territoire de marque
Traduire en règles de design l'identité du PDF : moderne, sportive, jeune, professionnelle et premium ; interface simple et rapide, pensée d'abord pour le téléphone.

#### 13.1.2 Logo et signes distinctifs
Prévoir la production d'un logo symbole évoquant équipe, mouvement et coordination, décliné en favicon, avatar social et en-tête d'emails.

### 13.2 Fondations du design system

#### 13.2.1 Tokens
Spécifier les tokens Squadly en variables CSS Tailwind v4 : couleurs de marque et sémantiques, échelle typographique, espacements, rayons, ombres ; thème clair par défaut, thème sombre si validé.

#### 13.2.2 Dette de la charte source
Documenter explicitement que la charte détaillée est absente du PDF (section corrompue) et que les tokens sont donc une proposition à valider par le sponsor avant développement des gabarits.

### 13.3 Composants et patterns

#### 13.3.1 Socle de composants
Retenir shadcn/ui (Radix + Tailwind, code possédé) comme fondation, icônes Lucide, animations sobres avec Motion, notifications Sonner ; aucune dépendance UI opaque.

#### 13.3.2 Patterns e-commerce mobile-first
Prescrire : navigation basse sur mobile, panier en drawer plein écran, boutons d'action larges, formulaires courts, micro-interactions discrètes ; benchmark visuel sportif de type Striker.

## 14. Templates et structure des pages

### 14.1 Arborescence du site

#### 14.1.1 Plan des pages
Décrire l'arborescence : accueil (proposition de valeur, nouveautés, packs club, Premium), boutique par catégorie, fiche produit, page club B2B, panier et tunnel, compte, support avec FAQ, pages légales.

#### 14.1.2 Matrice page-gabarit
Produire un tableau : page, gabarit utilisé, blocs de contenu, données sources, exigence SEO associée, état vide prévu.

### 14.2 Templates de départ

#### 14.2.1 Sélection argumentée
Justifier la sélection : Medusa DTC Starter comme base monorepo backend + storefront, Next.js Commerce comme référence de patterns App Router, shadcnblocks ou Tailwind Plus en accélérateurs optionnels si le budget le permet.

#### 14.2.2 Conditions d'adoption
Exiger pour chaque template : licence vérifiée (MIT pour les starters retenus), rebranding complet aux tokens Squadly, suppression du code inutilisé, revue d'accessibilité des blocs importés.

### 14.3 Gabarits transactionnels

#### 14.3.1 Emails
Spécifier les gabarits React Email : confirmation de commande, expédition, remboursement, confirmation d'abonnement, échec de prélèvement, réinitialisation de mot de passe ; chacun décliné en version texte.

## 15. Architecture technique

### 15.1 Vue d'ensemble

#### 15.1.1 Schéma d'architecture
Fournir un schéma décrit en texte : storefront Next.js (App Router) connecté au backend Medusa, à Stripe (Checkout et Billing), au service d'emails Resend, à l'analytics Plausible, derrière Cloudflare.

#### 15.1.2 Principes d'architecture
Énoncer : rendu serveur des pages catalogue et produit, prix et stocks recalculés côté serveur, aucune logique métier critique dans le navigateur, séparation nette storefront / moteur commerce / services externes.

### 15.2 Décision de backend

#### 15.2.1 Option retenue
Acter le choix principal : Medusa 2.x pour posséder code et données sans commission plateforme, avec multi-région utile en phase 3 ; conditionné à la capacité DevOps de l'équipe.

#### 15.2.2 Alternative de validation
Documenter le plan B : Supabase/Postgres + Stripe si le catalogue reste très limité, en assumant la conception du panier, des stocks et de la TVA, et la dette associée en cas de croissance.

### 15.3 Stack détaillée

#### 15.3.1 Tableau des choix
Reprendre et compléter le tableau par domaine : Next.js + TypeScript strict, Tailwind CSS v4 + shadcn/ui, Medusa, Stripe Checkout, Resend + React Email, Plausible, Vitest + Playwright, GitHub Actions + Vercel, Auth.js, recherche Postgres full-text au départ.

#### 15.3.2 Versions et maintenance
Exiger : versions épinglées, politique de mise à jour mensuelle des dépendances, application immédiate des correctifs de sécurité critiques.

### 15.4 Hébergement et exploitation

#### 15.4.1 Topologie de déploiement
Préciser : storefront sur Vercel, backend Medusa et Postgres sur Railway ou Render, DNS et protection sur Cloudflare, environnements local, staging et production isolés.

#### 15.4.2 Continuité de service
Spécifier : sauvegardes quotidiennes de la base avec rétention définie, test de restauration trimestriel, alerting sur indisponibilité, statut des services externes surveillé.

### 15.5 Données et intégrations

#### 15.5.1 Gestion des données
Décrire : schéma versionné par migrations, données de démonstration pour staging, aucune donnée de production en environnement de test, procédures d'export RGPD.

## 16. Workflows de développement

### 16.1 Organisation du code et des contributions

#### 16.1.1 Conventions de dépôt
Définir : monorepo ou dépôts storefront/backend selon l'option retenue, branches courtes par fonctionnalité, revue de code obligatoire avant fusion, commits conventionnels, aucune fusion directe sur la branche principale.

#### 16.1.2 Qualité continue
Exiger : lint, vérification TypeScript stricte et formatage en pré-commit ; la CI bloque toute fusion en échec.

### 16.2 Intégration et déploiement continus

#### 16.2.1 Pipeline GitHub Actions
Décrire le pipeline : installation, lint, typecheck, tests unitaires, tests E2E sur le parcours d'achat, build, déploiement de préproduction par pull request, promotion manuelle en production.

#### 16.2.2 Gestion des secrets et environnements
Spécifier : secrets dans les coffres des plateformes (jamais dans le dépôt), clés Stripe de test et de production strictement séparées, variables d'environnement documentées.

### 16.3 Déroulé du build MVP

#### 16.3.1 Séquence de travail en douze étapes
Reprendre le workflow de la recherche et le formaliser en étapes ordonnées : cadrage, squelette du dépôt, modélisation des données, pages catalogue et produit, panier serveur, paiement et webhooks idempotents, emails, qualité et tests, SEO, conformité RGPD et légal, lancement avec monitoring, puis post-MVP.

#### 16.3.2 Rituels d'équipe
Proposer un cadencement simple : point hebdomadaire d'avancement, démonstration de fin d'étape, revue des risques à chaque jalon du chapitre 24.

## 17. SEO et contenu

### 17.1 SEO technique

#### 17.1.1 Exigences de rendu
Imposer : pages catalogue et produit rendues côté serveur (Server Components, ISR), métadonnées uniques par page, canonicals, sitemap XML et robots.txt, URLs lisibles.

#### 17.1.2 Données structurées
Spécifier le JSON-LD : Product, Offer avec prix et disponibilité, BreadcrumbList ; validation via l'outil de test des résultats enrichis avant mise en production.

### 17.2 Contenu et pilotage

#### 17.2.1 Plan de contenu
Définir : pages catégories éditorialisées, guide des tailles, FAQ achat et retours, page club argumentée ; ton Squadly, français soigné, aucun contenu dupliqué entre variantes.

#### 17.2.2 Suivi
Prescrire : inscription Search Console dès le lancement, suivi mensuel des impressions et positions, liste de mots-clés prioritaires (équipement sportif d'équipe, maillot personnalisé club, gestion d'équipe).

## 18. Performance

### 18.1 Budgets de performance

#### 18.1.1 Cibles chiffrées
Fixer les seuils sur mobile : LCP inférieur à 2,5 s, INP inférieur à 200 ms, CLS inférieur à 0,1, poids d'une page produit inférieur à 1,5 Mo, images en formats modernes.

#### 18.1.2 Techniques imposées
Lister : Server Components par défaut, ISR sur catalogue, next/image avec dimensions réservées, mise en cache des données produits, chargement différé des scripts tiers.

### 18.2 Mesure et contrôle

#### 18.2.1 Outillage
Prescrire : Lighthouse CI sur les pages clés à chaque pull request, suivi RUM via l'analytics ou un outil dédié, alerte en cas de régression de budget.

## 19. Accessibilité

### 19.1 Cible et référentiel

#### 19.1.1 Niveau exigé
Fixer la conformité WCAG 2.2 AA avec référence RGAA pour le contexte français, applicable à toutes les pages publiques et au tunnel d'achat.

#### 19.1.2 Exigences concrètes
Énumérer : contrastes conformes malgré la charte sportive, navigation clavier complète, focus visible, formulaires avec étiquettes et messages d'erreur explicites, alternatives textuelles des images produits.

### 19.2 Vérification

#### 19.2.1 Méthode
Prévoir : tests automatisés axe dans la CI, audit manuel clavier et lecteur d'écran sur le parcours d'achat avant lancement, publication de la déclaration d'accessibilité.

## 20. Sécurité

### 20.1 Principes et hygiène applicative

#### 20.1.1 Contrôles côté serveur
Énoncer la règle critique : le middleware Next.js n'est jamais le seul contrôle d'accès ; chaque route et action serveur revérifie les permissions, et la version de Next.js est maintenue patchée (référence CVE-2025-29927).

#### 20.1.2 Durcissement
Lister : en-têtes de sécurité et CSP, limitation de débit sur les endpoints sensibles, validation stricte des entrées, dépendances auditées, gestion des erreurs sans fuite d'information.

### 20.2 Données de paiement et personnelles

#### 20.2.1 Périmètre PCI
Rappeler : aucune donnée carte n'est manipulée ni stockée grâce à Stripe Checkout ; le périmètre PCI reste minimal et documenté.

#### 20.2.2 Protection des données
Spécifier : chiffrement en transit et au repos, secrets hors du code, accès base de données restreint, journalisation sans données personnelles sensibles.

### 20.3 Résilience

#### 20.3.1 Sauvegardes et incidents
Exiger : sauvegardes quotidiennes testées, plan de réponse à incident écrit, monitoring Sentry avec alertes nominatives, protection Cloudflare contre les abus.

## 21. RGPD et conformité

### 21.1 Cartographie des traitements

#### 21.1.1 Registre
Exiger un registre des traitements : identité et coordonnées clients, commandes, abonnements, emails transactionnels, analytics ; pour chacun, finalité, base légale, durée de conservation, destinataires.

#### 21.1.2 Données de mineurs
Traiter spécifiquement : public Squadly incluant des mineurs, minimisation des données, consentement parental lorsque requis, aucune donnée de mineur utilisée à des fins de profilage marketing.

### 21.2 Cookies et mesure d'audience

#### 21.2.1 Politique de traceurs
Appliquer les règles CNIL : analytics Plausible ou Matomo configuré sans cookie de suivi pour rester exempté si possible, CMP obligatoire dès qu'un traceur non essentiel est ajouté, aucune utilisation de GA4 par défaut.

### 21.3 Documents et droits

#### 21.3.1 Corpus légal
Lister les documents à produire avant lancement : politique de confidentialité, CGV incluant droit de rétractation de quatorze jours et médiation de la consommation, CGU des abonnements, mentions légales.

#### 21.3.2 Exercice des droits
Décrire le processus : accès, rectification, suppression et export des données depuis l'espace client ou sur demande, avec délai de réponse d'un mois et contrats de sous-traitance (DPA) avec Stripe, Resend et l'hébergeur.

## 22. Analytics et mesure

### 22.1 Dispositif de mesure

#### 22.1.1 Outil retenu
Retenir Plausible (ou Matomo) : mesure respectueuse de la vie privée, cohérente avec la politique de traceurs, tableau de bord simple pour l'équipe.

#### 22.1.2 Plan de taggage
Définir les événements e-commerce mesurés : vue produit, ajout au panier, début de paiement, achat confirmé, souscription d'abonnement, demande de devis club ; chaque événement documenté avec ses propriétés.

### 22.2 Exploitation

#### 22.2.1 Revue de performance
Instituer une revue mensuelle : KPI du chapitre 2, entonnoir de conversion, produits les plus vus et vendus, décisions d'amélioration tracées dans le backlog.

## 23. Stratégie de tests

### 23.1 Pyramide de tests

#### 23.1.1 Tests unitaires et composants
Spécifier : Vitest et Testing Library pour les calculs de panier, de TVA et de remises, les composants critiques du tunnel ; couverture cible à définir sur la logique métier.

#### 23.1.2 Tests end-to-end
Spécifier Playwright : parcours achat complet en mode test Stripe, souscription d'abonnement, échec de paiement, remboursement, parcours mobile ; exécution en CI sur chaque pull request.

### 23.2 Points critiques et recette

#### 23.2.1 Fiabilité des webhooks
Exiger des tests dédiés : idempotence (double envoi), événement en retard, commande sans paiement confirmé, réconciliation Stripe / base.

#### 23.2.2 Recette avant lancement
Définir : campagne de recette sur staging avec données réalistes, checklist de mise en production du chapitre 27, test de charge léger sur catalogue et paiement, validation finale par le sponsor.

## 24. Planning et jalons

### 24.1 Découpage en phases

#### 24.1.1 Macro-planning
Présenter six phases sur environ douze semaines indicatives : S0-S1 cadrage et validation des hypothèses, S2-S3 design system et maquettes, S4-S8 build du MVP, S9-S10 durcissement (tests, sécurité, RGPD), S11 recette, S12 lancement.

#### 24.1.2 Jalons et livrables
Produire un tableau jalon / livrable / critère de passage : hypothèses validées, maquettes approuvées, parcours d'achat démontré, recette signée, mise en production.

### 24.2 Capacité et dépendances

#### 24.2.1 Hypothèse d'équipe
Formuler : équipe interne à dimensionner (au minimum un développeur full-stack confirmé, un profil design, un référent produit à temps partiel), à confirmer par le sponsor ; ajuster le planning si la capacité réelle diffère.

#### 24.2.2 Dépendances critiques
Identifier : validation de la charte graphique, ouverture des comptes Stripe et Resend, rédaction des CGV, disponibilité des visuels produits ; chaque dépendance a un responsable et une date butoir.

## 25. Backlog priorisé

### 25.1 Format du backlog

#### 25.1.1 Structure et priorisation
Imposer le format : epics, user stories au format « en tant que / je veux / afin de », critères d'acceptation par story, priorisation MoSCoW, estimation en points relatifs.

### 25.2 Backlog MVP

#### 25.2.1 Epics du MVP
Lister les epics avec deux à trois stories d'exemple chacun : catalogue et fiches produits, panier, paiement Stripe, comptes clients, emails transactionnels, back-office commandes, pages légales, SEO technique, analytics de base.

### 25.3 Backlog phases 2 et 3

#### 25.3.1 Epics différés
Lister de façon condensée : promotions, livraison avancée, factures PDF, recherche, CMS, relances de panier, avis, recommandations IA, SSO Squadly, multi-devises, configurateur club ; chaque epic renvoie au chapitre 7.

## 26. Risques et plans de mitigation

### 26.1 Registre des risques

#### 26.1.1 Tableau de risques
Produire un tableau d'au moins huit risques avec probabilité, impact, mitigation et propriétaire, incluant : périmètre trop large, charte graphique incomplète, traitement RGPD des mineurs insuffisant, backend interne sous-monitoré, webhooks non surveillés, capacité DevOps surestimée, IA ajoutée trop tôt, dépendance aux services externes.

### 26.2 Risques majeurs

#### 26.2.1 Analyse des trois risques dominants
Détailler en paragraphes : dérive du périmètre (mitigation par la règle du chapitre 6), dette d'exploitation du backend (mitigation par monitoring, sauvegardes testées ou repli sur l'alternative Supabase), conformité RGPD insuffisante (mitigation par revue avant lancement et registre tenu à jour).

## 27. Critères d'acceptation et recette

### 27.1 Critères globaux

#### 27.1.1 Critères fonctionnels
Énumérer : achat d'un produit physique et souscription d'un abonnement réussis de bout en bout en production, emails reçus, commande visible et traitable au back-office, remboursement exécuté.

#### 27.1.2 Critères techniques et conformité
Énumérer : Core Web Vitals dans les budgets, zéro erreur critique Sentry sur sept jours, webhooks sans échec non traité, sauvegarde restaurée avec succès, corpus légal publié, déclaration d'accessibilité en ligne.

### 27.2 Processus de recette

#### 27.2.1 Checklist de mise en production
Fournir la checklist finale : DNS et Cloudflare configurés, clés Stripe production, webhooks production vérifiés, Search Console activée, monitoring et alertes actifs, plan de rollback documenté.

#### 27.2.2 Responsabilités de validation
Désigner : le référent produit valide le fonctionnel, le sponsor signe la recette, le référent technique valide sécurité et exploitation ; aucune mise en production sans les trois validations.

## 28. Références et sources

### 28.1 Fichiers internes

#### 28.1.1 Documents du projet
Lister les fichiers à citer intégralement dans le document final : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf », « /mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md », « squadly_ecommerce_dim02_workflows_stack.md », « squadly_ecommerce_dim03_templates.md », « squadly_ecommerce_cross_verification.md », « squadly_ecommerce_insight.md » et « /mnt/agents/output/plan.md ».

### 28.2 Références externes

#### 28.2.1 Documentation technique
Reprendre les URL clés : Next.js (https://nextjs.org/docs), Next.js Commerce (https://github.com/vercel/commerce), Medusa (https://docs.medusajs.com, https://github.com/medusajs/dtc-starter), shadcn/ui (https://ui.shadcn.com), Stripe Checkout (https://docs.stripe.com/checkout), Resend (https://resend.com/docs), React Email (https://react.email), Playwright (https://playwright.dev/docs/intro), Vitest (https://vitest.dev), Plausible (https://plausible.io), Payload CMS (https://payloadcms.com), Tailwind Plus Ecommerce (https://tailwindcss.com/plus/ui-blocks/ecommerce), shadcnblocks (https://www.shadcnblocks.com), Saleor Storefront (https://github.com/saleor/storefront).

#### 28.2.2 Conformité et sécurité
Reprendre : CNIL cookies et traceurs (https://www.cnil.fr/fr/cookies-et-autres-traceurs), CVE-2025-29927 (https://nvd.nist.gov/vuln/detail/CVE-2025-29927 et https://nextjs.org/blog/cve-2025-29927).

### 28.3 Règles de citation

#### 28.3.1 Traçabilité dans le document final
Exiger : chaque chapitre cite ses sources en fin de section ; toute donnée non sourcée est marquée « hypothèse » ou « décision à valider » ; les URL sont données en clair, sans raccourcisseur.
