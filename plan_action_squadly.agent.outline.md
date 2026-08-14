# Plan d'action Squadly Shop

## Chapitre 1 : Pourquoi ce plan

### 1.1 Le point de départ

Squadly est aujourd'hui une application qui aide les équipes sportives. Les coachs, les joueurs, les parents et les clubs y trouvent tout au même endroit : calendrier, convocations, messages et statistiques.

L'idée nouvelle est simple : ajouter une boutique en ligne, appelée « Squadly Shop ». Cette boutique vendra des abonnements Premium, des licences pour les clubs, le module Squadly AI, et du matériel sportif comme des maillots ou des accessoires d'entraînement.

### 1.2 L'objectif du plan

Ce plan explique, étape par étape, comment transformer Squadly en Squadly Shop. Il est écrit avec des mots simples. Chaque phase a des tâches, des responsables et une manière de vérifier que le travail est bien fait.

### 1.3 Les trois règles d'or

#### 1.3.1 Règle 1 : commencer petit
On lance d'abord une version simple. Le mot « MVP » signifie « produit minimum viable » : c'est la plus petite version du site qui permet déjà de vendre.

#### 1.3.2 Règle 2 : rester fidèle à Squadly
La boutique garde le style Squadly : jeune, sportif, professionnel, simple à utiliser, et pensé d'abord pour le téléphone.

#### 1.3.3 Règle 3 : protéger les gens
Beaucoup d'utilisateurs de Squadly sont des jeunes. Le mot « RGPD » désigne la loi européenne qui protège les données personnelles. On respecte cette loi dès le premier jour.

## Chapitre 2 : Les rôles de l'équipe

### 2.1 Qui fait quoi

#### 2.1.1 Rôle 1 : le chef de projet
Il organise le travail, fixe les dates, et vérifie que tout avance.

#### 2.1.2 Rôle 2 : le développeur
Il construit le site, branche le paiement et répare les bugs.

#### 2.1.3 Rôle 3 : le designer
Il crée l'aspect visuel : couleurs, logo, pages faciles à lire.

#### 2.1.4 Rôle 4 : le responsable contenu
Il écrit les fiches produits, les emails et les pages d'aide.

#### 2.1.5 Rôle 5 : le testeur
Il essaie le site comme un vrai client et signale ce qui ne va pas.

### 2.2 Règle de décision

#### 2.2.1 Point 1 : une seule personne décide
Pour chaque sujet important, une seule personne tranche. Cela évite les débats sans fin.

#### 2.2.2 Point 2 : réunion courte chaque semaine
Trente minutes par semaine suffisent : qu'est-ce qui est fait, qu'est-ce qui bloque, quelle est la prochaine tâche.

## Chapitre 3 : Les priorités

### 3.1 Ce qui est prioritaire pour le lancement

#### 3.1.1 Priorité 1 : un catalogue court
Dix à vingt produits maximum au début : quelques abonnements, quelques maillots, quelques accessoires.

#### 3.1.2 Priorité 2 : des fiches produits claires
Chaque produit a des photos, un prix, les tailles disponibles et le délai de livraison.

#### 3.1.3 Priorité 3 : un panier et un paiement sûr
Le mot « Stripe » désigne un service de paiement en ligne reconnu. Il gère la carte bancaire à notre place, ce qui est plus sûr.

#### 3.1.4 Priorité 4 : un compte client
Le client retrouve ses commandes, ses factures et son abonnement.

#### 3.1.5 Priorité 5 : des emails automatiques
Confirmation de commande, expédition, facture : le site envoie ces emails tout seul.

### 3.2 Ce qui attend la phase suivante

#### 3.2.1 Point 1 : pas d'intelligence artificielle au lancement
Les recommandations automatiques de produits viendront plus tard, quand les ventes seront prouvées.

#### 3.2.2 Point 2 : pas de multi-pays au lancement
On vend d'abord en France et dans les pays francophones proches.

#### 3.2.3 Point 3 : pas de marketplace
On ne permet pas à d'autres vendeurs de vendre sur Squadly Shop au début.

## Chapitre 4 : Phase 1 — Préparer (semaines 1 à 3)

### 4.1 Objectif de la phase

Décider, avant de construire : quels produits, quels prix, quel look, quels outils.

### 4.2 Tâches détaillées

#### 4.2.1 Tâche 1 : choisir la liste des produits de départ
Le chef de projet et le responsable contenu listent les dix à vingt premiers produits.

#### 4.2.2 Tâche 2 : fixer les prix
Prix public, prix pour les clubs, et prix des abonnements Premium.

#### 4.2.3 Tâche 3 : refaire la charte graphique
Le fichier d'origine a des pages de design illisibles. Le designer recrée une charte propre : couleurs, police, logo.

#### 4.2.4 Tâche 4 : choisir les outils techniques
Le développeur choisit les briques du site. Les mots compliqués, expliqués simplement : « Next.js » est un outil pour construire des sites rapides ; « Tailwind » sert à faire le design ; « Medusa » est un moteur de boutique gratuit et modifiable. Si l'équipe est petite, on peut commencer encore plus simple avec une base de données et Stripe seulement.

#### 4.2.5 Tâche 5 : écrire les règles de protection des données
Quelles données on collecte, pourquoi, et comment les supprimer si on nous le demande.

### 4.3 Résultat attendu de la phase

#### 4.3.1 Point 1 : une liste de produits validée
#### 4.3.2 Point 2 : une maquette visuelle des pages principales
#### 4.3.3 Point 3 : une décision écrite sur les outils

## Chapitre 5 : Phase 2 — Construire la première version (semaines 4 à 10)

### 5.1 Objectif de la phase

Construire le site complet mais simple, prêt à vendre.

### 5.2 Pages à construire

#### 5.2.1 Page 1 : l'accueil
Elle explique en une phrase ce que vend Squadly Shop, montre les nouveautés et les packs pour les clubs.

#### 5.2.2 Page 2 : la boutique
La liste des produits, rangée en familles : abonnements, textiles, accessoires, packs.

#### 5.2.3 Page 3 : la fiche produit
Photos, tailles, personnalisation possible, stock restant, livraison.

#### 5.2.4 Page 4 : la page club
Pour les commandes groupées, les devis et les codes promo des clubs.

#### 5.2.5 Page 5 : le compte client
Commandes, abonnements, factures.

#### 5.2.6 Page 6 : l'aide
Questions fréquentes, suivi de commande, retours.

### 5.3 Fonctions techniques à construire

#### 5.3.1 Fonction 1 : le panier
Ajouter, retirer, voir le total.

#### 5.3.2 Fonction 2 : le paiement Stripe
Le paiement se fait sur une page sécurisée de Stripe. Le mot « webhook » désigne un message automatique que Stripe envoie à notre site pour confirmer le paiement. Ces messages doivent être surveillés.

#### 5.3.3 Fonction 3 : les emails automatiques
Confirmation, expédition, facture.

#### 5.3.4 Fonction 4 : le back-office
Le « back-office » est la partie cachée du site, réservée à l'équipe : gérer les produits, les stocks et les commandes.

#### 5.3.5 Fonction 5 : les mesures d'audience
Un outil simple, comme Plausible ou Matomo, pour compter les visiteurs sans les espionner.

### 5.4 Résultat attendu de la phase

#### 5.4.1 Point 1 : un site qui marche sur téléphone et ordinateur
#### 5.4.2 Point 2 : un achat de test réussi du début à la fin
#### 5.4.3 Point 3 : un back-office utilisable par l'équipe

## Chapitre 6 : Phase 3 — Tester et lancer (semaines 11 à 13)

### 6.1 Objectif de la phase

Vérifier que tout marche avec de vraies personnes, puis ouvrir au public.

### 6.2 Tests obligatoires

#### 6.2.1 Test 1 : le parcours d'achat complet
Le testeur achète un produit du début à la fin, sur téléphone et sur ordinateur.

#### 6.2.2 Test 2 : les cas qui tournent mal
Carte refusée, stock épuisé, livraison impossible : le site doit répondre poliment et clairement.

#### 6.2.3 Test 3 : l'accessibilité
Le mot « accessibilité » signifie que le site est utilisable par tous : textes lisibles, couleurs contrastées, navigation possible au clavier.

#### 6.2.4 Test 4 : la protection des données
Vérifier que seules les données utiles sont collectées et que le bandeau des cookies est honnête.

#### 6.2.5 Test 5 : un lancement doux
D'abord, ouvrir à un petit groupe : deux ou trois clubs amis. Corriger. Puis ouvrir à tous.

### 6.3 Résultat attendu de la phase

#### 6.3.1 Point 1 : zéro bug bloquant restant
#### 6.3.2 Point 2 : les premières vraies commandes du groupe test
#### 6.3.3 Point 3 : l'ouverture publique du site

## Chapitre 7 : Phase 4 — Faire grandir (après le lancement)

### 7.1 Objectif de la phase

Améliorer la boutique seulement quand les chiffres montrent que c'est utile.

### 7.2 Améliorations possibles

#### 7.2.1 Amélioration 1 : les recommandations IA
Suggérer des produits selon le sport, la taille de l'équipe et les achats passés.

#### 7.2.2 Amélioration 2 : le lien avec l'application Squadly
Le mot « SSO » signifie « connexion unique » : le client utilise son compte Squadly pour la boutique.

#### 7.2.3 Amélioration 3 : les avantages Premium
Réductions ou livraison offerte pour les abonnés Premium.

#### 7.2.4 Amélioration 4 : la personnalisation avancée
Flocage des maillots, packs sur mesure pour les clubs.

#### 7.2.5 Amélioration 5 : d'autres pays
Seulement après le succès en France.

## Chapitre 8 : Les checklists

### 8.1 Checklist avant le lancement

#### 8.1.1 Point 1 : le catalogue est rempli avec photos et prix
#### 8.1.2 Point 2 : le paiement de test fonctionne
#### 8.1.3 Point 3 : les emails automatiques arrivent bien
#### 8.1.4 Point 4 : les pages légales sont en ligne (conditions, confidentialité)
#### 8.1.5 Point 5 : le site est rapide sur téléphone
#### 8.1.6 Point 6 : l'équipe sait utiliser le back-office

### 8.2 Checklist après le lancement

#### 8.2.1 Point 1 : regarder les chiffres chaque semaine
#### 8.2.2 Point 2 : répondre aux clients en moins de 24 heures
#### 8.2.3 Point 3 : noter chaque problème et le corriger par ordre d'importance
#### 8.2.4 Point 4 : vérifier que les messages de Stripe arrivent toujours
#### 8.2.5 Point 5 : faire une sauvegarde des données régulièrement

## Chapitre 9 : Les critères de réussite

### 9.1 Comment savoir que le plan a réussi

#### 9.1.1 Critère 1 : le site est en ligne à la date prévue
#### 9.1.2 Critère 2 : au moins trente commandes le premier mois
#### 9.1.3 Critère 3 : au moins deux clubs passent une commande groupée
#### 9.1.4 Critère 4 : moins de 5 pour cent des paiements échouent
#### 9.1.5 Critère 5 : aucune alerte de sécurité ou de données
#### 9.1.6 Critère 6 : les clients trouvent la boutique simple et rapide

### 9.2 Les risques à surveiller

#### 9.2.1 Risque 1 : vouloir tout faire tout de suite
Le remède : respecter la liste des priorités du chapitre 3.

#### 9.2.2 Risque 2 : un design illisible
La charte du fichier d'origine est cassée ; elle doit être refaite avant de coder.

#### 9.2.3 Risque 3 : oublier la loi sur les données
Le remède : appliquer la tâche 5 de la phase 1 et le test 4 de la phase 3.

#### 9.2.4 Risque 4 : un site mal surveillé
Le remède : la checklist du chapitre 8.2, chaque semaine.

#### 9.2.5 Risque 5 : ajouter l'IA trop tôt
Le remède : attendre les résultats de la phase 3 avant la phase 4.

## Chapitre 10 : Références

### 10.1 Fichiers utilisés pour écrire ce plan

#### 10.1.1 Référence 1 : /mnt/agents/temp/Cahier_des_charges_Squadly.pdf
Le cahier des charges original de l'application Squadly.

#### 10.1.2 Référence 2 : /mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md
L'analyse du cahier des charges et la première proposition de transposition vers le e-commerce.

#### 10.1.3 Référence 3 : /mnt/agents/output/research/squadly_ecommerce_insight.md
Les recommandations stratégiques : MVP, cibles, architecture, outils et risques.

#### 10.1.4 Référence 4 : /mnt/agents/output/research/squadly_ecommerce_cross_verification.md
La vérification croisée des choix techniques et des arbitrages retenus.
