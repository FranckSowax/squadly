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
