# Cahier des charges — Squadly Shop

## Résumé exécutif

Ce document définit les exigences du site e-commerce « Squadly Shop », boutique en ligne de l'univers Squadly, développée intégralement en interne. Décision structurante : lancer d'abord un MVP (produit minimum viable) à catalogue court, avec paiement Stripe, comptes clients et back-office minimal, afin de valider les ventes en ligne avant tout investissement dans l'IA, la personnalisation avancée ou le multi-pays. Cette première partie fixe le contexte, les objectifs mesurables, les hypothèses, les utilisateurs, les parcours et le périmètre fonctionnel des trois phases. Chaque affirmation est rattachée au PDF source Squadly, à une recherche préalable, ou marquée comme hypothèse ou décision à valider.

## 1. Contexte et genèse du projet

### 1.1 Rappel du projet Squadly

Fait issu du PDF source : Squadly est une application mobile et web de gestion d'équipes sportives qui centralise messages, calendriers, convocations et statistiques pour les coachs, joueurs, parents et clubs. L'application repose sur un modèle freemium, c'est-à-dire un modèle « gratuit + payant » où l'accès de base est gratuit et les fonctions avancées sont vendues en abonnement (version gratuite, offre Premium avec fonctions avancées et Squadly AI, offre spéciale clubs) et se différencie de TeamSnap et SportCorico par une interface simple et une IA intégrée.

La boutique doit préserver quatre éléments distinctifs : identité jeune, sportive et premium ; navigation pensée d'abord pour le téléphone (mobile-first) ; lien avec le freemium et l'offre Premium ; Squadly AI comme différenciateur de marque.

### 1.2 Genèse de Squadly Shop

Squadly Shop vend trois familles d'offres : abonnements numériques (Premium, licences Club, module Squadly AI), textile et accessoires sportifs (maillots, survêtements, équipements d'entraînement), packs club personnalisables.

Deux faits du PDF justifient ce canal : le freemium crée déjà une offre payante à vendre, et le chapitre « Évolution » prévoit finances, paiements et sponsoring. La vente directe anticipe cette trajectoire sans dépendre d'une plateforme externe ni de ses commissions. Positionnement (décision projet) : Squadly Shop ne sera pas un catalogue isolé ; il prolonge la promesse « tout au même endroit » en reliant organisation sportive, communauté du club et achat d'équipements.

### 1.3 Cadrage du document

Le cahier des charges couvre un site web e-commerce séparé de l'application Squadly, développé en interne du design au déploiement, sans agence externe (hypothèse projet, chapitre 3). Lecteurs visés : direction produit, équipe de développement interne, référent conformité/RGPD et tout prestataire de support ponctuel futur.

## 2. Objectifs et indicateurs de succès

### 2.1 Objectifs business

L'objectif principal du MVP est de valider les ventes en ligne et les parcours d'achat avec un catalogue court avant tout investissement lourd. Cible indicative à valider par le sponsor : lancement exploitable en environ douze semaines. Trois flux de revenus sont attendus : ventes B2C (« business to consumer », vente directe aux particuliers) d'équipements aux parents et joueurs ; packs d'entraînement et renouvellement de matériel pour les coachs ; commandes groupées et abonnements pour les clubs.

### 2.2 Objectifs produit et expérience

Le site doit conduire de la page d'accueil à la confirmation de paiement en moins de trois étapes après le panier, avec un tunnel entièrement conçu pour le mobile. La boutique doit être immédiatement reconnaissable comme Squadly : ton sportif et premium, interface simple et rapide, sans compromis sur la lisibilité ni les contrastes.

### 2.3 Indicateurs de succès

Les cibles business, absentes des sources, sont indicatives et seront arrêtées au cadrage ; les seuils techniques sont des exigences fermes.

| Indicateur | Seuil | Statut |
|---|---|---|
| Taux de conversion visite-achat | Cible indicative à valider | KPI business |
| Panier moyen | Cible indicative à valider | KPI business |
| Part des ventes club dans le chiffre d'affaires | Cible indicative à valider | KPI business |
| Taux de souscription Premium via la boutique | Cible indicative à valider | KPI business |
| Core Web Vitals (métriques de performance Google) mobile | Dans le vert sur les pages clés | Exigence ferme |
| Taux de succès des paiements | Supérieur à 95 % | Exigence ferme |
| Délivrabilité des emails transactionnels | Supérieure à 98 % | Exigence ferme |
| Webhooks (notifications automatisées entre services) | Zéro événement non traité | Exigence ferme |

### 2.4 Non-objectifs du MVP

Le MVP exclut : recommandations IA, marketplace multi-vendeurs, multi-pays et multi-devises, personnalisation produit complexe en ligne. Toute demande sortant de ce cadre bascule en phase 2 ou 3, sans exception.

## 3. Hypothèses, arbitrages et zones à clarifier

### 3.1 Hypothèses retenues

Cinq hypothèses de périmètre structurent le document : site séparé de l'application, développement interne, lancement France et francophonie, ventes B2C et B2B (« business to business », vente aux organisations, ici aux clubs), paiement via Stripe. Le périmètre géographique et le double canal sont raisonnables mais non confirmés par le PDF (confiance moyenne) : le sponsor devra les valider. Une hypothèse de capacité conditionne l'architecture : l'équipe interne assure un minimum de DevOps (déploiement, supervision, sauvegardes) ; sinon, le backend prévu au chapitre 15 basculera vers l'alternative allégée.

### 3.2 Arbitrages structurants

| Arbitrage | Décision | Argument |
|---|---|---|
| Possession du code versus rapidité | Backend possédé (moteur open source) en choix principal ; alternative Supabase/Postgres + Stripe si catalogue très limité | Contrôle total sans commission plateforme, au prix de la maintenance ; l'alternative accélère la validation |
| Simplicité MVP versus ambition | IA avancée, personnalisation complexe et marketplace exclues du MVP | Un périmètre court valide les ventes avant d'investir ; tout ajout exige une décision écrite du sponsor |
| Design premium versus accessibilité | L'accessibilité WCAG 2.2 AA prime sur l'effet visuel | Le style sportif ne doit jamais réduire contrastes, lisibilité ni navigation clavier |

### 3.3 Zones à clarifier avant rédaction définitive

Trois zones exigent une décision du sponsor. La section Design du PDF contient des puces corrompues : la charte détaillée (couleurs, typographies, logo final) doit être redemandée ou redéfinie, avec un jalon dédié. Les données manquantes sont : budget, calendrier contractuel, volume de catalogue, grille de prix, pays cibles exacts, responsabilités nominatives. Le niveau de confiance des sources, issu de la vérification croisée consignée dans le fichier « squadly_ecommerce_cross_verification.md » et des fichiers de recherche associés, est marqué dans tout le document : élevée pour la nature du PDF, la cohérence de la stack Next.js retenue pour le site et l'adéquation de Stripe Checkout au MVP ; moyenne pour le choix du starter technique et le périmètre géographique.

## 4. Utilisateurs et personas

### 4.1 Segments prioritaires

Cibles hiérarchisées : 1) parents et joueurs, pour l'achat simple et rapide d'équipements ; 2) coachs, pour les packs d'entraînement et le renouvellement ; 3) clubs, pour les commandes groupées, la personnalisation et les abonnements. Trois profils internes conditionnent le back-office : gestionnaire de boutique, support client, comptabilité.

### 4.2 Personas

Le parent de joueur achète majoritairement sur mobile, souvent pressé ; il est sensible à la clarté des tailles, aux délais affichés avant paiement et à la simplicité du règlement, et doit pouvoir payer sans créer de compte. Le coach bénévole renouvelle régulièrement ses packs d'entraînement ; il attend la réutilisation de ses commandes précédentes, un historique clair et, à terme, des recommandations selon son sport. Le trésorier de club prépare des commandes groupées, demande des devis et exige personnalisation aux couleurs du club, factures conformes et codes promo dédiés.

### 4.3 Besoins, freins et cas particuliers

| Segment | Besoin principal | Frein principal | Réponse du site |
|---|---|---|---|
| Parent / joueur | Achat rapide sur mobile | Incertitude sur tailles et délais | Guide des tailles, délais affichés, paiement invité |
| Coach | Renouvellement efficace des packs | Répétition des saisies | Historique et re-commande en un geste |
| Club | Commande groupée personnalisée | Absence de devis et de facture conforme | Formulaire de devis, factures PDF, codes promo |

Deux cas sont tranchés. Le public Squadly incluant des mineurs, le site doit minimiser les données collectées, obtenir le consentement parental lorsque requis et encadrer l'achat par un compte géré par un parent. Le paiement en invité doit être possible au MVP ; la création de compte est proposée après l'achat, jamais imposée avant le paiement.

## 5. Parcours utilisateurs

### 5.1 Parcours d'achat B2C

Parcours nominal en sept étapes : accueil, catégorie, fiche produit avec choix de variante et de taille, panier en panneau latéral (drawer), paiement sur la page hébergée Stripe Checkout, page de confirmation, email de confirmation. Quatre chemins dégradés sont exigés : échec de paiement avec reprise sans ressaisie ; rupture de stock entre panier et paiement signalée avant débit ; abandon de panier conservé ; retour en arrière sans perte du panier.

Emails déclenchés : confirmation de commande dès le paiement confirmé par webhook, puis email d'expédition avec suivi. États visibles dans le back-office : commande « payée », « en préparation », « expédiée », « annulée » ; paniers abandonnés consultables pour relance en phase 2.

### 5.2 Parcours abonnement

La souscription à Premium ou au module Squadly AI suit quatre étapes : page offre avec comparaison gratuit/Premium, paiement récurrent Stripe, activation immédiate des droits après confirmation, email de confirmation. Le cycle de vie couvre le renouvellement automatique, le changement d'offre, l'échec de prélèvement avec relance, et la résiliation en libre-service depuis l'espace client, sans contact support obligatoire.

Emails déclenchés : confirmation d'abonnement, relance après échec de prélèvement, confirmation de changement d'offre et de résiliation. États visibles dans le back-office : abonnement « actif », « en échec de paiement », « résilié en fin de période », avec historique des prélèvements.

### 5.3 Parcours club B2B

Le parcours démarre sur une page offre dédiée : constitution d'une commande groupée, demande de devis pour la personnalisation, validation, puis paiement (différé ou par virement, à arbitrer pour ce seul parcours). Au MVP, la personnalisation se limite à un formulaire structuré (nom, numéro, logo du club fourni par fichier) traité manuellement ; le configurateur en ligne relève de la phase 2.

Emails déclenchés : accusé de réception de la demande de devis, envoi du devis, confirmation de commande club après validation. États visibles dans le back-office : demande « reçue », « devis envoyé », « validée », « payée », « expédiée », avec le fichier de personnalisation joint à la demande.

### 5.4 Parcours post-achat et support

Le client doit suivre sa commande depuis son compte et l'email d'expédition, demander un retour conforme au droit de rétractation, échanger une taille et être remboursé avec notification systématique.

Emails déclenchés : accusé de réception de la demande de retour, confirmation de remboursement ou d'échange. États visibles dans le back-office : retour « demandé », « accepté », « refusé », « remboursé », rattachés à la commande d'origine. Exigence transversale : chaque parcours documente dans ce chapitre son schéma en texte, ses points de sortie, les emails déclenchés et les états visibles dans le back-office.

## 6. Fonctionnalités du MVP

### 6.1 Socle fonctionnel

Le socle arrêté comprend huit blocs : catalogue limité ; fiches produits avec variantes ; panier recalculé côté serveur ; paiement Stripe Checkout ; comptes clients ; emails transactionnels ; back-office minimal ; pages légales obligatoires. Règle de gouvernance : toute fonctionnalité non listée est hors MVP ; son ajout exige une décision écrite du sponsor et un réétalonnage du planning.

### 6.2 Détail par fonctionnalité

Chaque fonctionnalité du socle fait l'objet d'une fiche de cadrage à cinq rubriques : objectif, règles métier, données manipulées, états d'erreur, critère « prêt » mesurable. Les huit fiches ci-dessous engagent l'équipe ; tout écart constaté en recette bloque la mise en production.

| Fonctionnalité | Objectif | Règles métier | Données manipulées | États d'erreur | Critère « prêt » mesurable |
|---|---|---|---|---|---|
| Catalogue limité | Présenter un catalogue court et navigable sur mobile | Quatre catégories au MVP ; seules les fiches publiées sont visibles ; ordre d'affichage géré au back-office | Produits, catégories, images, statut de publication | Catégorie vide ; image manquante ; produit dépublié pendant la navigation | Parcours accueil-catégorie-fiche vert en test de bout en bout, catégorie vide affichée sans erreur serveur |
| Fiches produits avec variantes | Permettre le choix de la taille et de la couleur avant achat | Une variante par combinaison avec son SKU propre ; prix TTC et stock affichés par variante ; ajout au panier impossible en rupture | Variantes, SKU, prix HT et TTC, taux de TVA, stock, images | Variante épuisée ; combinaison inexistante ; prix désynchronisé du catalogue | Test de sélection de variante et d'ajout au panier vert de bout en bout ; stock affiché identique au stock back-office |
| Panier recalculé côté serveur | Garantir des montants fiables avant paiement | Recalcul des prix, de la TVA et du stock à chaque modification ; panier conservé entre sessions ; aucun prix du navigateur accepté | Lignes de panier, identifiant client ou de session, montants calculés | Rupture entre panier et paiement ; variante supprimée ; session expirée | Tests unitaires de calcul de panier et de TVA verts ; écart nul entre montant du panier et montant de la session Stripe en recette |
| Paiement Stripe Checkout | Encaisser sans manipuler de données carte | Session créée côté serveur après recalcul ; commande créée uniquement sur webhook « checkout.session.completed » traité de façon idempotente ; reprise après échec sans ressaisie | Sessions Stripe, identifiants de paiement, événements webhook | Échec de paiement ; webhook en retard ou dupliqué ; session expirée | Taux de succès des paiements supérieur à 95 % en recette ; zéro événement webhook non traité |
| Comptes clients | Fidéliser sans bloquer l'achat | Paiement en invité possible ; création de compte proposée après l'achat ; réinitialisation sécurisée ; consentement parental lorsque l'acheteur est mineur | Identité, email, mot de passe haché, adresses, consentements | Email déjà utilisé ; lien de réinitialisation expiré ; tentative de bourrage d'identifiants bloquée | Parcours invité et parcours avec compte verts de bout en bout ; export et suppression des données fonctionnels |
| Emails transactionnels | Confirmer chaque étape clé au client | Un gabarit par événement (commande, expédition, remboursement, abonnement, échec de prélèvement, réinitialisation) ; version texte systématique ; aucune donnée sensible dans le corps | Événements de commande, adresses email, gabarits | Rebond ; échec d'envoi du fournisseur ; gabarit manquant | Délivrabilité supérieure à 98 % mesurée sur des boîtes réelles de test |
| Back-office minimal | Exploiter la boutique au quotidien | Trois rôles : administrateur, gestionnaire boutique, support en lecture seule ; chaque action sensible tracée avec auteur et date | Produits, stocks, commandes, clients, remboursements, journal d'audit | Droits insuffisants ; conflit de mise à jour de stock ; remboursement refusé par Stripe | Traitement complet d'une commande (expédition puis remboursement) réalisé au back-office en recette, avec trace d'audit vérifiable |
| Pages légales | Rendre la vente conforme avant lancement | Mentions légales, conditions générales de vente avec rétractation de quatorze jours et médiation, CGU des abonnements, politique de confidentialité publiées et liées en pied de page ; relecture par le référent conformité | Contenus éditoriaux, version et date de publication | Page manquante ; version obsolète ; lien brisé | Corpus légal publié en production et vérifié page par page avant lancement, lien présent sur toutes les pages |

Trois exigences prix sont fermes : prix affichés TTC ; TVA calculée côté serveur ; montant recalculé systématiquement avant la création de la session Stripe. Aucun prix transmis par le navigateur n'est jamais pris pour argent comptant.

### 6.3 Definition of done du MVP

Le MVP est complet lorsque six conditions sont réunies :

1. Le test automatisé de bout en bout du parcours d'achat est vert en intégration continue.
2. Les emails transactionnels sont envoyés et reçus sur des boîtes réelles de test.
3. Les webhooks sont surveillés, avec zéro événement en échec non traité.
4. Les mentions légales, les conditions générales de vente, les CGU des abonnements et la politique de confidentialité sont publiées.
5. Les sauvegardes sont configurées et un test de restauration a réussi.
6. Le monitoring applicatif est actif avec des alertes nominatives.

## 7. Fonctionnalités des phases 2 et 3

### 7.1 Phase 2

La phase 2 comprend deux lots. Le lot commerce ajoute comptes avancés, promotions avancées (règles combinables, codes segmentés), gestion de la livraison et des transporteurs, avoirs automatisés et facturation avancée, recherche produit adossée à Meilisearch ou Algolia (moteurs de recherche clés en main ; le choix entre les deux est arbitré au lancement de la phase 2), CMS de contenu, relances de panier abandonné et avis clients. Le lot intelligence introduit les recommandations IA, cohérentes avec Squadly AI : suggestion de produits et de packs selon le sport, la taille d'effectif et l'historique d'achat. Décision : toute recommandation IA est déployée derrière une mesure d'impact ; sans gain démontré sur un échantillon, elle n'est pas généralisée.

### 7.2 Phase 3

La phase 3 comprend le lot scale : multi-pays et multi-devises, offre B2B club avancée avec configurateur en ligne, authentification unique (SSO) avec l'application Squadly, avantages Premium unifiés entre application et boutique, notifications de commande dans l'application.

Le passage à chaque phase est conditionné par quatre critères mesurables : atteinte des seuils de ventes du chapitre 2 ; stabilité technique (taux d'erreur maîtrisé, zéro webhook non traité sur la période) ; capacité d'exploitation confirmée de l'équipe ; validation RGPD des nouveaux traitements. L'équipe devra documenter la revue de chaque critère avant le lancement des travaux de phase.

## 8. Catalogue produits

### 8.1 Taxonomie

Le catalogue du MVP est volontairement court pour valider les ventes avant d'élargir l'offre. Le site doit proposer quatre catégories : abonnements et licences (Premium, licence Club, module Squadly AI), textiles (maillots, survêtements), accessoires d'entraînement et packs club, en cohérence avec le modèle freemium du PDF source. Le volume de lancement est fixé à quinze à trente références hors variantes, cible indicative à valider par le sponsor. L'extension par sport et les filtres associés sont reportés en phase 2.

### 8.2 Modèle de données produit

Le site doit reposer sur un modèle de données unique, alimenté par le backend, jamais codé en dur dans les pages. Les attributs obligatoires sont définis ci-dessous.

| Attribut | Règle métier | Erreur à traiter |
|---|---|---|
| Titre et description | Orientée usage sportif, ton Squadly | Publication sans description refusée |
| Catégorie | Une parmi les quatre du MVP | Catégorie vide masquée du menu |
| Variantes | Taille et couleur, stock propre à chaque variante | Combinaison indisponible signalée |
| SKU | Identifiant unique par variante, pour stocks et factures | Doublon bloqué à la saisie |
| Prix HT/TTC et TVA | Affichage TTC, TVA calculée côté serveur | Recalcul systématique avant paiement |
| Stock | Décrémenté à la commande confirmée, seuil d'alerte | Rupture avant paiement : message clair |
| Images | Formats modernes, alternative textuelle | Aucune publication sans image |
| Statut | Brouillon, publié, archivé | Archivé retiré du catalogue et du sitemap |
| Personnalisation | Nom, numéro, logo club en fichier | Fichier invalide rejeté avec message explicite |

Les produits numériques (abonnements, licences) sont traités à part : pas de stock ni de livraison, association à un plan Stripe Billing, activation des droits uniquement après paiement confirmé par webhook. Un abonnement ne doit jamais passer par le tunnel de livraison.

### 8.3 Fiches produits

Chaque fiche produit doit contenir : visuels optimisés, prix TTC, disponibilité en temps réel, guide des tailles pour les textiles, délais et modes de livraison, conditions de retour, mentions légales de personnalisation le cas échéant. Ces mentions légales doivent préciser que les produits personnalisés (nom, numéro, logo club) sont exclus du droit de rétractation de quatorze jours, conformément à l'exception prévue pour les biens confectionnés selon les spécifications du consommateur, et que le fichier fourni engage la responsabilité du client sur les droits d'usage du logo. Règle de qualité : aucune fiche publiée sans image, sans stock renseigné ni sans relecture. Critère d'acceptation : une fiche textile permet de choisir une taille, de vérifier la disponibilité et d'ajouter au panier en moins de trois interactions sur mobile.

Sources du chapitre : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf » (modèle freemium, offres), « /mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md » ; volume de catalogue et mentions légales de personnalisation : décision projet à valider.

## 9. Paiements et facturation

### 9.1 Prestataire et intégration

Le prestataire retenu est Stripe Checkout hébergé, recommandation issue de la recherche technique pour trois raisons : aucune donnée carte ne transite par nos serveurs, ce qui minimise le périmètre PCI ; l'authentification forte 3DS/SCA est gérée nativement ; l'intégration est rapide pour une petite équipe. Le site doit accepter les cartes bancaires au lancement ; Apple Pay et Google Pay seront activés via Stripe dès que disponibles. Le virement ou paiement différé est réservé au parcours club et reste à arbitrer.

### 9.2 Webhooks et fiabilité

La création de commande repose exclusivement sur l'événement « checkout.session.completed », traité de façon idempotente : un événement reçu deux fois ne crée jamais deux commandes. Le site doit journaliser chaque événement, permettre son rejeu et maintenir une file des événements en échec avec alerte. L'équipe devra réconcilier chaque jour Stripe et la base de commandes ; le taux de succès des paiements doit être supérieur à 95 %, exigence ferme cohérente avec le chapitre 2. Critère d'acceptation : fermer le navigateur après paiement ne produit jamais un paiement sans commande.

### 9.3 Cas financiers particuliers

Le back-office doit permettre le remboursement total ou partiel, avec émission d'un avoir, mise à jour du statut et email systématique au client. La TVA française s'applique au MVP ; chaque commande génère une facture au format PDF, numérotée de façon séquentielle et inaltérable, téléchargeable depuis l'espace client et renvoyée en pièce jointe de l'email de confirmation, avec les mentions obligatoires, et un export comptable mensuel est produit. Le régime OSS (guichet unique de TVA européenne) sera étudié dès la première vente hors France ; le multi-pays reste hors MVP.

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (intégration Stripe, webhooks), https://docs.stripe.com/checkout ; régime TVA/OSS : décision projet à valider si nécessaire.

## 10. Abonnements et licences

### 10.1 Offres

La boutique vend trois offres numériques, cohérentes avec le modèle freemium du PDF : la version gratuite reste dans l'application, la boutique vend les niveaux payants. Tous les prix sont des cibles à valider par le sponsor.

| Offre | Cible | Contenu | Facturation |
|---|---|---|---|
| Premium individuel | Coachs, joueurs, parents | Fonctions avancées et module Squadly AI | Mensuelle ou annuelle, Stripe Billing |
| Licence Club | Clubs | Plusieurs équipes, tarif dégressif par volume | Annuelle, devis possible |
| Module Squadly AI | Abonnés gratuits ou Premium | Entraînements, compositions, résumés assistés | Option mensuelle |

### 10.2 Mécanique d'abonnement

Le cycle de vie repose sur Stripe Billing : création après paiement, renouvellement automatique, relances en cas d'échec de prélèvement, prorata lors d'un changement d'offre, résiliation en fin de période en libre-service. Les droits sont activés uniquement sur confirmation webhook, jamais sur la redirection post-paiement. Le portage vers l'application Squadly se fait au MVP par liaison de compte email ; le SSO complet relève de la phase 3. Critère d'acceptation : un utilisateur qui résilie conserve ses droits jusqu'en fin de période et reçoit un email de confirmation.

Sources du chapitre : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf » (modèle économique freemium, offre spéciale clubs), « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (Stripe Billing) ; grille des offres et prix : décision projet à valider.

## 11. Comptes clients et espaces club

### 11.1 Authentification

La solution retenue côté storefront est Auth.js ou Better Auth : email et mot de passe, lien magique en option, réinitialisation sécurisée ; Clerk reste l'alternative si l'équipe préfère un service géré. Le site doit imposer une politique de mot de passe raisonnable, une protection contre le bourrage d'identifiants, des sessions révocables et une authentification multifacteur obligatoire pour les comptes d'administration. Le paiement en invité reste possible ; la création de compte est proposée après l'achat, jamais imposée avant.

### 11.2 Espace client

L'espace client doit comporter cinq sections : commandes et statuts, abonnements et licences actifs, factures téléchargeables, adresses, données personnelles avec export et suppression conformes au RGPD. Le lien avec l'application se limite au MVP à un lien « ouvrir Squadly » et à l'affichage des avantages Premium actifs ; la synchronisation complète des comptes relève de la phase 3.

### 11.3 Espace club

L'espace club s'adresse au trésorier ou responsable identifié dans les personas. Il doit offrir : gestion de plusieurs équipes, membres autorisés à commander, historique des commandes groupées, dépôt et suivi des demandes de devis, codes promo dédiés. Au MVP, la personnalisation passe par un formulaire structuré (nom, numéro, logo en fichier) traitée manuellement ; le configurateur en ligne est phase 2. Critère d'acceptation : un responsable club suit l'état de sa demande de devis sans contacter le support.

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (choix d'authentification) ; contenu des espaces client et club : décision projet.

## 12. Back-office et opérations

### 12.1 Fonctions du back-office

Le back-office du MVP doit couvrir cinq modules : produits et stocks, commandes (statuts, expédition, remboursement), consultation des clients, codes promo simples, tableau de bord des ventes. Trois rôles sont exigés, chaque action sensible étant tracée avec auteur et date.

| Rôle | Droits | Interdictions |
|---|---|---|
| Administrateur | Tous droits, gestion des comptes et rôles | Aucune, sous MFA obligatoire |
| Gestionnaire boutique | Produits, stocks, commandes, remboursements, promos | Gestion des utilisateurs, accès aux clés |
| Support lecture seule | Consultation commandes et clients, réponse aux demandes | Modification, remboursement, export de masse |

### 12.2 Opérations quotidiennes

L'équipe devra tenir une routine écrite : chaque jour, expédier les commandes, vérifier les webhooks en échec, mettre à jour les stocks, répondre aux demandes de retour sous un délai à fixer (cible indicative à valider) ; en fin de mois, produire l'export comptable. Le back-office doit donner accès aux logs, au monitoring Sentry, au statut des sauvegardes et aux files d'événements, avec une procédure pour chaque incident courant (webhook perdu, paiement sans commande, stock incohérent).

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md » (opérations et monitoring) ; rôles, routines et délais de traitement : décision projet à valider.

## 13. Design system Squadly

### 13.1 Principes d'identité

Le design doit traduire l'identité du PDF : moderne, sportive, jeune, professionnelle et premium, avec une interface simple et rapide, pensée d'abord pour le téléphone. Un logo symbole évoquant équipe, mouvement et coordination sera produit et décliné en favicon, avatar social et en-tête d'emails. Règle non négociable : le style sportif ne doit jamais réduire contrastes, lisibilité ni navigation clavier ; l'accessibilité WCAG 2.2 AA prime sur l'effet visuel.

### 13.2 Fondations du design system

Les tokens Squadly seront définis en variables CSS Tailwind v4 : couleurs de marque et sémantiques, échelle typographique, espacements, rayons et ombres ; thème clair par défaut, thème sombre seulement si validé. Point de vigilance : la section Design du PDF source contient des puces corrompues et la charte détaillée est absente. Les tokens sont donc une proposition à valider par le sponsor avant tout développement des gabarits, avec un jalon dédié au planning.

### 13.3 Composants et patterns

La fondation retenue est shadcn/ui (Radix + Tailwind, code possédé, licence MIT), avec les icônes Lucide, des animations sobres via Motion et des notifications Sonner ; aucune dépendance UI opaque n'est admise. Les patterns prescrits sont mobile-first : navigation basse sur mobile, panier en drawer plein écran, boutons d'action larges, formulaires courts, micro-interactions discrètes, avec le template Striker comme benchmark visuel sportif.

Sources du chapitre : « /mnt/agents/temp/Cahier_des_charges_Squadly.pdf » (identité de marque, section Design corrompue), « /mnt/agents/output/research/squadly_ecommerce_dim03_templates.md », https://ui.shadcn.com ; tokens Squadly : décision projet à valider par le sponsor.

## 14. Templates et structure des pages

### 14.1 Arborescence du site

Le site doit couvrir : accueil (proposition de valeur, nouveautés, packs club, offre Premium), boutique par catégorie, fiche produit, page club B2B, panier et tunnel de paiement, compte client, support avec FAQ, pages légales. Chaque page définit ses blocs, ses données sources et son état vide : une catégorie sans produit affiche un message et un renvoi, jamais une page blanche ; un compte sans commande invite à découvrir la boutique.

La matrice page-gabarit ci-dessous fixe la correspondance entre chaque page et son gabarit technique. L'équipe devra la tenir à jour dans le dépôt ; toute nouvelle page exige une ligne validée en revue.

| Page | Gabarit utilisé | Blocs de contenu | Données sources | Exigence SEO associée | État vide prévu |
|---|---|---|---|---|---|
| Accueil | Gabarit éditorial (sections composables) | Proposition de valeur, nouveautés, packs club, offre Premium | Catalogue backend, contenu éditorial | Titre et métadonnées uniques, balisage Organization | Section sans contenu masquée, jamais de trou dans la page |
| Boutique par catégorie | Gabarit listing produits (rendu serveur, ISR) | Titre de catégorie, texte éditorial, grille produits, filtres taille/couleur | Catégories et produits publiés du backend | URLs lisibles, canonical, texte éditorial unique par catégorie | Message explicite et renvoi vers les autres catégories |
| Fiche produit | Gabarit produit avec variantes | Galerie, prix TTC, sélecteur de variante, disponibilité, guide des tailles, livraison et retours | Produit, variantes, stocks et images du backend | JSON-LD Product et Offer, BreadcrumbList, métadonnées uniques | Produit archivé ou épuisé : message et suggestion d'alternatives |
| Page club B2B | Gabarit page argumentaire avec formulaire | Argumentaire commande groupée, offre licence Club, formulaire de devis | Contenu éditorial, offres numériques du backend | Page ciblée « maillot personnalisé club », données structurées Service | Formulaire toujours disponible ; erreur d'envoi avec sauvegarde de la saisie |
| Panier et tunnel | Gabarit transactionnel (panier en drawer, redirection Stripe Checkout) | Récapitulatif panier, codes promo, redirection paiement hébergé, confirmation | Panier recalculé côté serveur, session Stripe | Balise noindex sur panier et tunnel | Panier vide : message et renvoi vers la boutique |
| Compte client | Gabarit espace authentifié à sections | Commandes, abonnements, factures téléchargeables, adresses, données personnelles | Compte, commandes et abonnements du backend | noindex, aucune donnée personnelle indexable | Compte sans commande : invitation à découvrir la boutique |
| Support et FAQ | Gabarit contenu éditorial | Questions-réponses achat, retours, tailles, contact | Contenu éditorial | Données structurées FAQPage si admissibles | Aucune réponse trouvée : renvoi vers le formulaire de contact |
| Pages légales | Gabarit contenu statique | Mentions légales, CGV, CGU abonnements, politique de confidentialité, déclaration d'accessibilité | Corpus juridique rédigé avant lancement | Indexables, accessibles en pied de page de tout le site | Jamais vide : publication bloquante pour la mise en production |

### 14.2 Templates de départ

La sélection des templates est une recommandation issue de la recherche comparative, soumise aux conditions suivantes.

| Template | Rôle | Licence | Conditions d'adoption |
|---|---|---|---|
| Medusa DTC Starter | Base monorepo backend + storefront | MIT | Rebranding complet aux tokens Squadly, suppression du code inutilisé |
| Next.js Commerce | Référence de patterns App Router | MIT | Emprunt de patterns uniquement, pas de dépendance au provider Shopify |
| shadcnblocks / Tailwind Plus | Accélérateurs de blocs e-commerce | Freemium / payante | Achat décidé par le sponsor, revue d'accessibilité de chaque bloc importé |

L'équipe devra vérifier la licence avant tout import et documenter la provenance de chaque bloc dans le dépôt.

### 14.3 Gabarits transactionnels

Les emails transactionnels seront produits avec React Email et envoyés via Resend. Le MVP exige six gabarits : confirmation de commande, expédition, remboursement, confirmation d'abonnement, échec de prélèvement, réinitialisation de mot de passe. Chaque gabarit doit exister en HTML et en texte, reprendre les tokens de marque et rester lisible sans image. Critère d'acceptation : chaque gabarit est testé en envoi réel sur les messageries courantes, avec une délivrabilité qui doit être supérieure à 98 %, exigence ferme.

Sources du chapitre : « /mnt/agents/output/research/squadly_ecommerce_dim03_templates.md » (sélection des templates), https://github.com/medusajs/dtc-starter, https://github.com/vercel/commerce, https://react.email, https://resend.com/docs ; matrice page-gabarit et conditions d'adoption : décision projet.

## 15. Architecture technique

### 15.1 Vue d'ensemble

#### 15.1.1 Schéma d'architecture

Le site doit suivre l'architecture ci-dessous : storefront Next.js en App Router derrière Cloudflare, moteur commerce Medusa 2.x, services externes spécialisés. Aucun composant ne doit court-circuiter cette organisation.

```
Visiteur (mobile en priorité)
        |
        v
Cloudflare  (DNS, CDN, protection anti-abus)
        |
        v
+-----------------------------+        +------------------------------+
| Storefront Next.js (Vercel) |  API   | Moteur commerce Medusa 2.x   |
| App Router, Server          |------->| Produits, panier, commandes, |
| Components, ISR catalogue   |        | stocks, promotions           |
+-----------------------------+        | + base Postgres              |
        |                             +-------+----------+-----------+
        |                                     |          |
        v                                     v          v
Plausible (mesure           Stripe Checkout et     Resend + React Email
d'audience)                 Billing + webhooks     (emails transactionnels)
```

Le storefront interroge Medusa de serveur à serveur ; Stripe est sollicité en redirection hébergée, puis rappelle le backend par webhooks signés.

#### 15.1.2 Principes d'architecture

Quatre principes non négociables : rendu serveur des pages catalogue et produit ; prix, TVA et stocks recalculés côté serveur avant toute session de paiement ; aucune logique métier critique dans le navigateur ; séparation nette storefront / moteur commerce / services externes.

### 15.2 Décision de backend

#### 15.2.1 Option retenue

Le backend retenu est Medusa 2.x : il permet de posséder le code et les données sans commission plateforme, et son support multi-région prépare la phase 3. Ce choix est conditionné à la capacité de l'équipe interne à assurer hébergement, monitoring et sauvegardes (fait de confiance moyenne, à confirmer au cadrage).

#### 15.2.2 Alternative de validation

Si le catalogue reste très limité ou si la capacité DevOps fait défaut, le plan B est Supabase/Postgres + Stripe Checkout : panier, stocks, TVA et commandes sont alors conçus en interne, avec la dette associée documentée. Le basculement vers ce plan B exige une décision écrite du sponsor.

### 15.3 Stack détaillée

#### 15.3.1 Tableau des choix

| Domaine | Choix retenu | Alternative documentée |
|---|---|---|
| Framework | Next.js App Router + React + TypeScript strict | — |
| UI | Tailwind CSS v4 + shadcn/ui (Radix) | Tailwind Plus si budget validé |
| Moteur commerce | Medusa 2.x | Supabase/Postgres + Drizzle |
| Paiement | Stripe Checkout hébergé + Billing + webhooks | Stripe Elements (non retenu au MVP) |
| Emails | Resend + React Email | Postmark si délivrabilité critique |
| Analytics | Plausible | Matomo |
| Authentification | Auth.js (ou Better Auth) | Clerk en service géré |
| Tests | Vitest + Testing Library + Playwright | — |
| CI | GitHub Actions | — |
| Hébergement | Vercel (storefront) + Railway ou Render (backend) | — |
| Recherche produit | Postgres full-text | Meilisearch ou Algolia en phase 2 |

#### 15.3.2 Versions et maintenance

Les versions des dépendances doivent être épinglées. L'équipe devra tenir une revue mensuelle des mises à jour et installer sans délai les correctifs de sécurité critiques, notamment ceux de Next.js (voir 20.1.1).

### 15.4 Hébergement et exploitation

#### 15.4.1 Topologie de déploiement

Le storefront est déployé sur Vercel, le backend Medusa et sa base Postgres sur Railway ou Render, le DNS et la protection sur Cloudflare. Trois environnements isolés sont exigés : local, staging, production, avec clés et bases strictement séparées.

#### 15.4.2 Continuité de service

Exigences : sauvegardes quotidiennes de la base avec rétention définie (cible indicative à valider : trente jours), test de restauration trimestriel documenté, alerting sur indisponibilité, surveillance des statuts des services externes (Stripe, Resend).

### 15.5 Données et intégrations

#### 15.5.1 Gestion des données

Le schéma de données doit être versionné par migrations. Le staging utilise exclusivement des données de démonstration ; aucune donnée de production n'y est copiée. Des procédures d'export et de suppression des données personnelles existent dès le MVP (chapitre 21).

Sources du chapitre : https://docs.medusajs.com, https://nextjs.org/docs, https://docs.stripe.com/checkout, https://resend.com/docs.

## 16. Workflows de développement

### 16.1 Organisation du code et des contributions

#### 16.1.1 Conventions de dépôt

Le code est organisé en monorepo backend + storefront sur la base du Medusa DTC Starter (deux dépôts si le plan B Supabase est retenu). Travail en branches courtes par fonctionnalité, revue de code obligatoire avant fusion, commits conventionnels, aucune fusion directe sur la branche principale.

#### 16.1.2 Qualité continue

Lint, formatage et vérification TypeScript stricte s'exécutent en pré-commit. La CI bloque toute fusion dont une étape échoue ; aucune exception manuelle sur la branche principale.

### 16.2 Intégration et déploiement continus

#### 16.2.1 Pipeline GitHub Actions

Chaque pull request doit déclencher le pipeline ordonné suivant :

1. Installation des dépendances épinglées.
2. Lint et vérification du formatage.
3. Vérification TypeScript stricte.
4. Tests unitaires Vitest (calculs panier, TVA, remises).
5. Tests end-to-end Playwright du parcours d'achat en mode test Stripe.
6. Build de production.
7. Déploiement d'un environnement de préproduction par pull request.
8. Promotion manuelle en production après validation, jamais automatique au MVP.

#### 16.2.2 Gestion des secrets et environnements

Les secrets doivent résider dans les coffres des plateformes (GitHub, Vercel, Railway/Render), jamais dans le dépôt. Les clés Stripe de test et de production sont strictement séparées ; chaque variable d'environnement est documentée dans un fichier d'exemple sans valeur réelle.

### 16.3 Déroulé du build MVP

#### 16.3.1 Séquence de travail en douze étapes

Séquence ordonnée imposée, chaque étape clôturée par une démonstration :

1. Cadrage du périmètre MVP et validation des hypothèses.
2. Squelette du dépôt : Next.js, TypeScript strict, Tailwind v4, shadcn/ui.
3. Modélisation des données : produits, variantes, prix, stocks, commandes.
4. Pages catalogue et produit en Server Components avec ISR.
5. Panier en état serveur avec recalcul des prix côté serveur.
6. Paiement Stripe Checkout et webhooks idempotents.
7. Emails transactionnels (confirmation, expédition, réinitialisation).
8. Qualité : tests unitaires et tests E2E du parcours d'achat.
9. SEO technique : métadonnées, sitemap, JSON-LD, Search Console.
10. Conformité : RGPD, registre, politique de confidentialité, CGV/CGU.
11. Lancement : monitoring Sentry, sauvegardes, alerting webhooks, Cloudflare.
12. Post-MVP : activation du backlog phase 2 (chapitre 7).

#### 16.3.2 Rituels d'équipe

Le cadencement retenu est simple : point hebdomadaire d'avancement, démonstration en fin de chaque étape, revue des risques à chaque jalon du chapitre 24. Aucun rituel supplémentaire au MVP.

Sources du chapitre : https://playwright.dev/docs/intro, https://vitest.dev, https://github.com/medusajs/dtc-starter.

## 17. SEO et contenu

### 17.1 SEO technique

#### 17.1.1 Exigences de rendu

Le site doit rendre les pages catalogue et produit côté serveur (Server Components avec ISR), avec métadonnées uniques par page, URLs lisibles, liens canoniques, sitemap XML et robots.txt. Aucune page catalogue ne doit dépendre d'un rendu exclusivement côté navigateur.

#### 17.1.2 Données structurées

Chaque fiche produit doit exposer du JSON-LD de type Product et Offer avec prix TTC et disponibilité ; le fil d'Ariane utilise BreadcrumbList. L'équipe devra valider ces balises avec l'outil de test des résultats enrichis avant mise en production.

### 17.2 Contenu et pilotage

#### 17.2.1 Plan de contenu

Le MVP doit livrer des pages catégories éditorialisées, un guide des tailles, une FAQ achat et retours, une page club argumentée. Ton Squadly : sportif, clair, français soigné. Aucun contenu dupliqué entre variantes d'un même produit.

#### 17.2.2 Suivi

L'inscription à la Search Console est obligatoire dès le lancement. L'équipe devra suivre mensuellement impressions et positions sur les mots-clés prioritaires : équipement sportif d'équipe, maillot personnalisé club, gestion d'équipe sportive. Les constats alimentent le backlog de contenu.

Sources du chapitre : https://search.google.com/search-console.

## 18. Performance

### 18.1 Budgets de performance

#### 18.1.1 Cibles chiffrées

Budgets applicables sur mobile, connexion 4G, constituant des critères d'acceptation :

| Indicateur | Budget | Outil de mesure |
|---|---|---|
| LCP (plus grand élément affiché) | inférieur à 2,5 s | Lighthouse CI + mesure réelle |
| INP (réactivité aux interactions) | inférieur à 200 ms | Mesure réelle utilisateurs |
| CLS (stabilité visuelle) | inférieur à 0,1 | Lighthouse CI |
| Poids d'une page produit | inférieur à 1,5 Mo | Budget de la CI |
| JavaScript initial par page | inférieur à 200 Ko (cible indicative à valider) | Rapport de build |
| Images | formats modernes AVIF/WebP, dimensions réservées | Revue de code |

#### 18.1.2 Techniques imposées

L'équipe devra utiliser par défaut les Server Components, l'ISR sur le catalogue, le composant next/image avec dimensions réservées, la mise en cache des données produits et le chargement différé de tout script tiers non critique.

### 18.2 Mesure et contrôle

#### 18.2.1 Outillage

Lighthouse CI doit s'exécuter sur les pages clés (accueil, catégorie, produit, panier) à chaque pull request. Un suivi en conditions réelles (RUM) via Plausible complète le dispositif, avec alerte en cas de dépassement de budget. Une régression non justifiée bloque la fusion.

Sources du chapitre : https://web.dev/articles/vitals.

## 19. Accessibilité

### 19.1 Cible et référentiel

#### 19.1.1 Niveau exigé

Le site doit être conforme WCAG 2.2 niveau AA, avec le référentiel RGAA comme cadre de déclaration en France. L'exigence couvre toutes les pages publiques et l'intégralité du tunnel d'achat, sans exception.

#### 19.1.2 Exigences concrètes

Exigences : contrastes conformes malgré la charte sportive (le chapitre 3 fait primer l'accessibilité sur l'effet visuel), navigation clavier complète, focus visible, étiquettes et messages d'erreur associés à chaque champ, alternative textuelle pour chaque image produit.

### 19.2 Vérification

#### 19.2.1 Méthode

Des tests automatisés axe s'exécutent dans la CI sur les pages clés. Un audit manuel clavier et lecteur d'écran du parcours d'achat est obligatoire avant lancement. La déclaration d'accessibilité RGAA est publiée en pied de page dès la mise en production.

Sources du chapitre : https://www.w3.org/TR/WCAG22/, https://accessibilite.numerique.gouv.fr/.

## 20. Sécurité

### 20.1 Principes et hygiène applicative

#### 20.1.1 Contrôles côté serveur

Règle critique : le middleware Next.js n'est jamais le seul contrôle d'accès. Chaque route et action serveur revérifie les permissions, et Next.js est maintenu à jour des correctifs (référence : CVE-2025-29927 — https://nvd.nist.gov/vuln/detail/CVE-2025-29927).

#### 20.1.2 Durcissement

Le site doit appliquer : en-têtes de sécurité et politique CSP, limitation de débit sur les endpoints sensibles (authentification, webhooks), validation stricte des entrées côté serveur, audit régulier des dépendances, gestion des erreurs sans fuite d'information technique.

### 20.2 Données de paiement et personnelles

#### 20.2.1 Périmètre PCI

Grâce à Stripe Checkout hébergé, aucune donnée de carte n'est manipulée ni stockée : le périmètre PCI reste minimal, documenté et réévalué à chaque évolution du tunnel de paiement.

#### 20.2.2 Protection des données

Exigences : chiffrement en transit et au repos, secrets hors du code, accès à la base restreint aux services nécessaires, aucune donnée personnelle sensible dans les journaux applicatifs.

### 20.3 Résilience

#### 20.3.1 Sauvegardes et incidents

Exigences : sauvegardes quotidiennes testées (15.4.2), plan de réponse à incident écrit, monitoring Sentry avec alertes nominatives, protection Cloudflare. « Zéro erreur critique Sentry sur sept jours » est un critère de recette (chapitre 27).

## 21. RGPD et conformité

### 21.1 Cartographie des traitements

#### 21.1.1 Registre

Un registre des traitements doit être tenu à jour avant lancement : identité et coordonnées clients, commandes, abonnements, emails transactionnels, mesure d'audience. Chaque traitement documente finalité, base légale, durée de conservation et destinataires ; le référent conformité en est propriétaire.

#### 21.1.2 Données de mineurs

Le public Squadly inclut des mineurs. Le site doit minimiser les données collectées, exiger le consentement parental lorsque la loi le requiert, et interdire toute utilisation des données de mineurs à des fins de profilage marketing. Ce point est un risque majeur suivi au chapitre 26.

### 21.2 Cookies et mesure d'audience

#### 21.2.1 Politique de traceurs

Le site applique les règles CNIL sur les cookies et traceurs (https://www.cnil.fr/fr/cookies-et-autres-traceurs) : Plausible (ou Matomo correctement configuré) sans cookie de suivi afin de rester exempté si possible ; une plateforme de consentement (CMP) devient obligatoire dès l'ajout d'un traceur non essentiel ; Google Analytics 4 n'est pas utilisé par défaut.

### 21.3 Documents et droits

#### 21.3.1 Corpus légal

Avant lancement, le site doit publier : politique de confidentialité, CGV incluant le droit de rétractation de quatorze jours et la médiation de la consommation, CGU des abonnements, mentions légales. Aucune mise en production sans ce corpus complet.

#### 21.3.2 Exercice des droits

Les droits d'accès, de rectification, de suppression et d'export doivent être exerçables depuis l'espace client ou sur demande, avec un délai de réponse d'un mois. Des contrats de sous-traitance (DPA) sont signés avec Stripe, Resend et l'hébergeur.

## 22. Analytics et mesure

### 22.1 Dispositif de mesure

#### 22.1.1 Outil retenu

L'outil retenu est Plausible (Matomo en alternative) : mesure respectueuse de la vie privée, cohérente avec la politique de traceurs du chapitre 21, tableau de bord simple pour une petite équipe.

#### 22.1.2 Plan de taggage

Les événements e-commerce mesurés sont : vue produit, ajout au panier, début de paiement, achat confirmé, souscription d'abonnement, demande de devis club. Chaque événement doit être documenté avec ses propriétés (identifiant produit, catégorie, montant) avant implémentation.

### 22.2 Exploitation

#### 22.2.1 Revue de performance

Une revue mensuelle est instituée : KPI du chapitre 2, entonnoir de conversion visite-achat, produits les plus vus et vendus. Chaque constat débouche sur une décision d'amélioration tracée dans le backlog ; une revue sans décision est non tenue.

Sources des chapitres 20 à 22 : https://plausible.io, https://www.cnil.fr/fr/cookies-et-autres-traceurs, https://nextjs.org/blog/cve-2025-29927.

## 23. Stratégie de tests

La stratégie de tests vise un objectif unique : aucun client ne doit payer sans recevoir sa commande, et aucune commande ne doit exister sans paiement confirmé. La pyramide est resserrée, adaptée à une petite équipe : tests unitaires sur la logique métier, quelques tests end-to-end sur les parcours qui rapportent de l'argent, recette manuelle cadrée avant lancement.

### 23.1 Pyramide de tests

**Tests unitaires et composants.** Le site doit utiliser Vitest et Testing Library pour couvrir les calculs de panier, de TVA et de remises, ainsi que les composants critiques du tunnel (récapitulatif, erreurs, rupture de stock). Couverture cible : 80 % des branches de la logique métier, cible indicative à valider au cadrage. Ces tests bloquent toute fusion en échec.

**Tests end-to-end.** L'équipe devra écrire des scénarios Playwright : achat complet d'un produit physique en mode test Stripe, souscription d'un abonnement Premium, échec de paiement et reprise, remboursement depuis le back-office, parcours complet sur viewport mobile. Ils s'exécutent en CI sur chaque pull request ; un scénario rouge interdit toute promotion en production.

### 23.2 Points critiques et recette

**Fiabilité des webhooks.** Les webhooks Stripe sont le point le plus fragile : ils créent les commandes. L'équipe devra tester l'idempotence (double envoi de « checkout.session.completed » sans doublon), l'événement en retard, la commande sans paiement confirmé et la réconciliation quotidienne Stripe / base. Tout échec alerte et alimente une file à rejouer.

**Recette avant lancement.** Une campagne de recette sera menée sur staging avec des données réalistes (catalogue proche du réel, comptes de test par persona). Elle applique la checklist du chapitre 27, inclut un test de charge léger sur catalogue et tunnel, et se conclut par la validation du sponsor : aucun lancement sans recette signée.

## 24. Planning et jalons

Le planning de référence s'étale sur environ douze semaines de travail (S1 à S12), précédées du cadrage S0, à confirmer par le sponsor, et sera réétalonné une fois connues la capacité réelle de l'équipe et les dépendances externes.

### 24.1 Découpage en phases

| Jalon | Période | Livrable | Critère de passage |
|---|---|---|---|
| J0 — Cadrage | S0-S1 | Hypothèses validées, périmètre MVP arrêté | Décision écrite du sponsor sur périmètre, budget et calendrier |
| J1 — Design | S2-S3 | Design system et maquettes des pages clés | Maquettes approuvées, tokens Squadly validés (charte source à reconstruire) |
| J2 — Build MVP | S4-S8 | Catalogue, panier serveur, paiement, comptes, emails, back-office | Parcours d'achat démontré de bout en bout en staging |
| J3 — Durcissement | S9-S10 | Tests, sécurité, RGPD, performance, SEO | Zéro faille critique ouverte, budgets de performance respectés |
| J4 — Recette | S11 | Campagne de recette sur staging | Recette signée par le sponsor (chapitre 27) |
| J5 — Lancement | S12 | Mise en production avec monitoring actif | Checklist de mise en production intégralement cochée |

### 24.2 Capacité et dépendances

#### 24.2.1 Hypothèse d'équipe

Le planning suppose au minimum un développeur full-stack confirmé, un profil design et un référent produit à temps partiel. Cette composition est une hypothèse à valider par le sponsor ; toute capacité inférieure impose d'allonger le planning ou de réduire le périmètre, jamais l'inverse.

#### 24.2.2 Dépendances critiques

Quatre dépendances conditionnent les jalons. Aucune date contractuelle n'est connue à ce stade : chaque date butoir sera fixée au jalon J0 avec le sponsor, et chaque responsable sera confirmé nominativement au même moment.

| Dépendance | Responsable | Date butoir |
|---|---|---|
| Validation de la charte graphique (section Design du PDF corrompue, à reconstruire) | Designer, arbitrage sponsor | À fixer au jalon J0, avant le jalon J1 |
| Ouverture des comptes Stripe et Resend | Référent technique | À fixer au jalon J0, avant le jalon J2 |
| Rédaction et validation des CGV | Référent RGPD, validation sponsor | À fixer au jalon J0, avant le jalon J3 |
| Disponibilité des visuels produits | Référent produit | À fixer au jalon J0, avant le jalon J2 |

Toute dépendance en retard remonte au point hebdomadaire avec un plan de contournement ; sans date fixée au jalon J0, la dépendance est traitée comme bloquante pour le jalon aval.

## 25. Backlog priorisé

Le backlog pilote le build : toute demande nouvelle entre par le bas et ne remonte qu'après arbitrage explicite du référent produit.

### 25.1 Format du backlog

L'équipe devra structurer le backlog en epics découpés en user stories au format « en tant que / je veux / afin de ». Chaque story comporte des critères d'acceptation mesurables, une priorité MoSCoW et une estimation en points relatifs ; sans critères d'acceptation, elle n'entre pas en développement.

### 25.2 Backlog MVP

| Epic | Exemples de stories | Priorité |
|---|---|---|
| Catalogue et fiches produits | « En tant que parent, je veux prix TTC et disponibilité en temps réel afin de décider vite » ; « En tant que gestionnaire, je veux publier une fiche avec tailles afin de vendre le textile » | Must |
| Panier | « En tant que joueur, je veux un panier recalculé côté serveur afin de payer le juste prix » ; « En tant que client, je veux retrouver mon panier après retour en arrière afin de ne rien recommencer » | Must |
| Paiement Stripe | « En tant que client, je veux payer par Stripe Checkout afin d'être débité en confiance » ; « En tant que système, je veux une commande créée par webhook idempotent afin d'éviter les doublons » | Must |
| Comptes clients | « En tant que client, je veux payer en invité puis créer mon compte après achat afin de suivre ma commande » ; « En tant que client, je veux exporter et supprimer mes données personnelles depuis mon espace afin d'exercer mes droits RGPD » (critère d'acceptation : l'export et la suppression s'exécutent en moins de trois clics, sans intervention du support) | Must |
| Emails transactionnels | « En tant que client, je veux une confirmation de commande et d'expédition afin de suivre mon achat » ; « En tant qu'abonné, je veux être alerté d'un échec de prélèvement afin de régulariser avant coupure » (critère d'acceptation : taux de délivrabilité supérieur à 98 % sur les gabarits en recette, version texte présente pour chaque gabarit) | Must |
| Back-office commandes | « En tant que gestionnaire, je veux changer le statut d'une commande et rembourser afin de traiter les retours » ; « En tant que support, je veux consulter une commande en lecture seule afin de répondre au client sans risque de modification » (critère d'acceptation : chaque action sensible est tracée avec auteur et date, vérifiable dans le journal) | Must |
| Pages légales | « En tant que client, je veux consulter CGV et rétractation afin d'acheter informé » ; « En tant que client, je veux accéder aux CGV depuis le tunnel de paiement afin de valider mon achat en connaissance de cause » (critère d'acceptation : les quatre documents légaux sont publiés et accessibles en un clic depuis le pied de page et le tunnel avant lancement) | Must |
| SEO technique | « En tant que visiteur, je veux trouver les fiches via les moteurs afin d'arriver sur l'offre » ; « En tant que moteur de recherche, je veux un sitemap XML, des canonicals et du JSON-LD produit afin d'indexer correctement le catalogue » (critère d'acceptation : le test des résultats enrichis valide Product, Offer et BreadcrumbList sur une fiche avant mise en production) | Should |
| Analytics de base | « En tant que référent produit, je veux mesurer vues et achats afin de piloter la conversion » ; « En tant que référent produit, je veux suivre les événements ajout au panier et achat confirmé afin de mesurer l'entonnoir » (critère d'acceptation : les six événements du plan de taggage du chapitre 22 remontent dans Plausible en staging avant lancement) | Should |

### 25.3 Backlog phases 2 et 3

Les epics différés renvoient au chapitre 7 : promotions avancées, livraison, facturation avancée (avoirs automatisés, exports enrichis), recherche produit, CMS, relances de panier, avis clients, recommandations IA, SSO Squadly, multi-devises, configurateur club. Aucun ne peut être avancé au MVP sans décision écrite du sponsor et réétalonnage du planning.

## 26. Risques et plans de mitigation

Le registre ci-dessous liste les risques structurants. Il est revu à chaque jalon du chapitre 24 ; chaque risque possède un propriétaire unique.

### 26.1 Registre des risques

| Risque | Probabilité | Impact | Mitigation | Propriétaire |
|---|---|---|---|---|
| Périmètre trop large au lancement | Élevée | Élevé | Règle du chapitre 6 : tout ajout exige décision écrite et réétalonnage | Référent produit |
| Charte graphique incomplète (PDF corrompu) | Élevée | Moyen | Jalon J1 dédié, tokens validés par le sponsor avant tout gabarit | Designer |
| Traitement RGPD des mineurs insuffisant | Moyenne | Élevé | Minimisation des données, consentement parental, revue avant lancement | Référent RGPD |
| Backend interne sous-monitoré | Moyenne | Élevé | Sentry, alerting, procédures écrites, sauvegardes testées | Référent technique |
| Webhooks Stripe non surveillés | Moyenne | Élevé | File d'événements à rejouer, alerte sur échec, réconciliation quotidienne | Référent technique |
| Capacité DevOps surestimée | Moyenne | Élevé | Évaluation au jalon J0 ; repli sur Supabase + Stripe si insuffisante | Sponsor |
| IA ajoutée trop tôt sans valeur mesurable | Faible | Moyen | IA verrouillée en phase 2, mesure d'impact avant généralisation | Référent produit |
| Dépendance aux services externes (Stripe, Resend, Vercel) | Moyenne | Moyen | Statuts externes surveillés, rollback documenté, DPA signés | Référent technique |
| Retard des visuels produits | Moyenne | Moyen | Date butoir au jalon J0, fiches de démonstration provisoires | Référent produit |

### 26.2 Risques majeurs

**Dérive du périmètre.** Risque dominant d'un projet interne sans agence : chaque semaine apporte une « petite » demande qui retarde le lancement. Mitigation : la règle du chapitre 6, sans exception, fait basculer toute fonctionnalité hors socle en phase 2 ou 3, avec décision écrite du sponsor.

**Dette d'exploitation du backend.** Choisir Medusa, c'est posséder le code mais hériter du monitoring, des sauvegardes et des mises à jour ; faute de capacité, la dette devient des incidents. Mitigation : monitoring Sentry, sauvegardes quotidiennes avec restauration testée chaque trimestre, repli assumé sur Supabase + Stripe si le catalogue reste très limité.

**Conformité RGPD insuffisante.** Le public Squadly inclut des mineurs, ce qui interdit toute approximation. Mitigation : registre des traitements à jour, revue conformité au jalon J3, corpus légal publié avant ouverture au public.

## 27. Critères d'acceptation et recette

La recette est la preuve que le site vend, encaisse, informe et respecte la loi. Aucune mise en production sans les validations croisées ci-dessous.

### 27.1 Critères globaux

**Critères fonctionnels.** Le site est accepté lorsque : un achat de produit physique et une souscription d'abonnement réussissent de bout en bout en production (commandes réelles puis remboursées) ; les emails de confirmation sont reçus ; la commande est traitable au back-office, de « payée » à « expédiée » ; un remboursement complet est exécuté avec email client automatique.

**Critères techniques et conformité.** L'équipe devra démontrer : Core Web Vitals dans les budgets du chapitre 18 sur mobile ; zéro erreur critique Sentry sur sept jours de staging chargé ; aucun webhook en échec non traité ; une sauvegarde restaurée avec succès sur environnement isolé ; corpus légal complet publié (CGV, CGU des abonnements, politique de confidentialité, mentions légales) ; déclaration d'accessibilité en ligne.

### 27.2 Processus de recette

**Checklist de mise en production.**

| Contrôle | Responsable | Statut requis |
|---|---|---|
| DNS et Cloudflare configurés (protection et cache) | Référent technique | Fait |
| Clés Stripe de production activées, clés de test retirées | Référent technique | Fait |
| Webhooks de production vérifiés sur événement réel | Référent technique | Fait |
| Search Console activée et sitemap soumis | Référent produit | Fait |
| Monitoring Sentry et alertes nominatives actifs | Référent technique | Fait |
| Sauvegardes vérifiées et restauration testée | Référent technique | Fait |
| Corpus légal et déclaration d'accessibilité publiés | Référent RGPD | Fait |
| Plan de rollback documenté et répété | Référent technique | Fait |
| Analytics Plausible actif sans cookie de suivi | Référent produit | Fait |

**Responsabilités de validation.** Trois validations conditionnent le lancement : le référent produit valide le fonctionnel (parcours, contenus, emails), le référent technique valide sécurité et exploitation (webhooks, sauvegardes, monitoring), le sponsor signe la recette finale. Une seule signature manquante bloque la mise en production, sans dérogation verbale.

## 28. Références et sources

Ce chapitre garantit la traçabilité : chaque affirmation structurante renvoie au PDF source, à une recherche produite en amont, ou est marquée comme hypothèse ou décision à valider.

### 28.1 Fichiers internes

1. Cahier des charges source Squadly : `/mnt/agents/temp/Cahier_des_charges_Squadly.pdf` (gestion d'équipes sportives, freemium, mobile-first ; section Design partiellement corrompue).
2. Analyse du PDF : `/mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md`.
3. Workflows et stack : `/mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md`.
4. Templates et accélérateurs UI : `/mnt/agents/output/research/squadly_ecommerce_dim03_templates.md`.
5. Vérification croisée : `/mnt/agents/output/research/squadly_ecommerce_cross_verification.md`.
6. Insights stratégiques : `/mnt/agents/output/research/squadly_ecommerce_insight.md`.
7. Plan d'exécution : `/mnt/agents/output/plan.md`.

### 28.2 Références externes

**Documentation technique.** Next.js : https://nextjs.org/docs ; Next.js Commerce : https://github.com/vercel/commerce ; Medusa : https://docs.medusajs.com et starter DTC : https://github.com/medusajs/dtc-starter ; shadcn/ui : https://ui.shadcn.com ; Stripe Checkout : https://docs.stripe.com/checkout ; Resend : https://resend.com/docs ; React Email : https://react.email ; Playwright : https://playwright.dev/docs/intro ; Vitest : https://vitest.dev ; Plausible : https://plausible.io ; Payload CMS : https://payloadcms.com ; Tailwind Plus Ecommerce : https://tailwindcss.com/plus/ui-blocks/ecommerce ; shadcnblocks : https://www.shadcnblocks.com ; Saleor Storefront : https://github.com/saleor/storefront.

**Conformité et sécurité.** CNIL, cookies et autres traceurs : https://www.cnil.fr/fr/cookies-et-autres-traceurs ; vulnérabilité Next.js CVE-2025-29927 : https://nvd.nist.gov/vuln/detail/CVE-2025-29927 et https://nextjs.org/blog/cve-2025-29927.

### 28.3 Règles de citation

Chaque chapitre cite ses sources en fin de section lorsqu'il s'appuie sur un fait externe. Toute donnée non sourcée est marquée « hypothèse » ou « décision à valider » (couverture de tests, durée de douze semaines, composition d'équipe). Les URL sont données en clair, sans raccourcisseur.
