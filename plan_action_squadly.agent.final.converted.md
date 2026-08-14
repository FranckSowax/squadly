# Plan d'action Squadly Shop

## Chapitre 1 : Pourquoi ce plan

### 1.1 Le point de départ

Squadly est aujourd'hui une application qui aide les équipes sportives. Les coachs, les joueurs, les parents et les clubs y trouvent tout au même endroit : le calendrier, les convocations, les messages et les statistiques. Le cahier des charges original décrit aussi un modèle économique « freemium » : l'application est gratuite de base, et les fonctions avancées, dont Squadly AI, sont vendues en abonnement Premium ou en licence pour les clubs.

L'idée nouvelle est simple : ajouter une boutique en ligne, appelée « Squadly Shop ». Cette boutique vendra des abonnements Premium, des licences pour les clubs, le module Squadly AI, et du matériel sportif comme des maillots, des survêtements ou des accessoires d'entraînement. La promesse reste la même que celle de l'application : tout au même endroit, sans jongler entre plusieurs outils.

### 1.2 L'objectif du plan

Ce plan explique, étape par étape, comment transformer Squadly en Squadly Shop. Il est écrit avec des mots simples pour que tout le monde puisse le suivre, même sans connaissances techniques. Chaque phase a des tâches précises, des responsables clairs et une manière de vérifier que le travail est bien fait. Le calendrier proposé est de treize semaines jusqu'à l'ouverture au public, puis une phase d'amélioration continue.

### 1.3 Les trois règles d'or

1. Commencer petit. On lance d'abord une version simple. Le mot « MVP » signifie « produit minimum viable » : c'est la plus petite version du site qui permet déjà de vendre. Si le MVP prouve que les gens achètent, on ajoutera le reste.
2. Rester fidèle à Squadly. La boutique garde le style Squadly : jeune, sportif, professionnel, simple à utiliser, et pensé d'abord pour le téléphone, car la plupart des utilisateurs naviguent sur mobile.
3. Protéger les gens. Beaucoup d'utilisateurs de Squadly sont des jeunes, parfois mineurs. Le mot « RGPD » désigne la loi européenne qui protège les données personnelles (nom, adresse, photo, habitudes d'achat). On respecte cette loi dès le premier jour : on ne collecte que ce qui est utile, on demande le consentement, et on prévoit un moyen de tout supprimer si quelqu'un le demande.

## Chapitre 2 : Les rôles de l'équipe

### 2.1 Qui fait quoi

Le projet repose sur cinq rôles. Une même personne peut porter deux rôles si l'équipe est petite, mais chaque responsabilité doit avoir un nom en face.

| Rôle | Ce qu'il fait concrètement |
|---|---|
| Chef de projet | Organise le travail, fixe les dates, vérifie que tout avance |
| Développeur | Construit le site, branche le paiement, répare les bugs |
| Designer | Crée l'aspect visuel : couleurs, logo, pages faciles à lire |
| Responsable contenu | Écrit les fiches produits, les emails, les pages d'aide |
| Testeur | Essaie le site comme un vrai client et signale ce qui ne va pas |

### 2.2 Règle de décision

1. Une seule personne décide. Pour chaque sujet important, une seule personne tranche. Cela évite les débats sans fin et les allers-retours qui bloquent le calendrier.
2. Une réunion courte chaque semaine. Trente minutes suffisent, avec trois questions : qu'est-ce qui est fait, qu'est-ce qui bloque, quelle est la prochaine tâche. Le chef de projet note les décisions pour que rien ne se perde.

## Chapitre 3 : Les priorités

### 3.1 Ce qui est prioritaire pour le lancement

1. Un catalogue court. Dix à vingt produits maximum au début : quelques abonnements, quelques maillots, quelques accessoires, un ou deux packs pour les clubs. Un petit catalogue est plus facile à remplir, à tester et à vendre.
2. Des fiches produits claires. Chaque produit a des photos de bonne qualité, un prix affiché, les tailles disponibles, les options de personnalisation et le délai de livraison.
3. Un panier et un paiement sûr. Le mot « Stripe » désigne un service de paiement en ligne reconnu. Il gère la carte bancaire à notre place, sur ses propres pages sécurisées : le site Squadly Shop ne touche jamais les numéros de carte, ce qui réduit fortement les risques.
4. Un compte client. Le client retrouve ses commandes, ses factures et son abonnement à tout moment, sans avoir à écrire à l'équipe.
5. Des emails automatiques. Confirmation de commande, expédition, facture : le site envoie ces emails tout seul, sans intervention humaine.

### 3.2 Ce qui attend la phase suivante

1. Pas d'intelligence artificielle au lancement. Les recommandations automatiques de produits viendront plus tard, quand les ventes seront prouvées. Ajouter de l'IA avant d'avoir des données d'achat serait construire un outil qui n'a rien à analyser.
2. Pas de multi-pays au lancement. On vend d'abord en France et dans les pays francophones proches. Ce périmètre est une hypothèse raisonnable à valider, il n'est pas écrit dans le cahier des charges original.
3. Pas de marketplace. On ne permet pas à d'autres vendeurs de proposer leurs produits sur Squadly Shop au début. Cela éviterait des problèmes de qualité, de droit et de support que l'équipe ne peut pas encore absorber.

## Chapitre 4 : Phase 1 — Préparer (semaines 1 à 3)

### 4.1 Objectif de la phase

Décider avant de construire : quels produits, quels prix, quel look, quels outils. Trois semaines de décisions valent mieux que trois semaines de code jeté.

### 4.2 Tâches détaillées

1. Choisir la liste des produits de départ. Le chef de projet et le responsable contenu listent les dix à vingt premiers produits, avec pour chacun le nom, la famille (abonnement, textile, accessoire, pack) et la cible (parent, joueur, coach, club).
2. Fixer les prix. Trois grilles : prix public, prix pour les clubs (commandes groupées) et prix des abonnements Premium. Les montants exacts ne figurent pas dans les documents sources : c'est une cible indicative à valider par la direction.
3. Refaire la charte graphique. Le fichier d'origine contient des pages de design illisibles : des symboles de liste sont corrompus dans le PDF. Le designer recrée donc une charte propre — couleurs, police, logo, boutons — qui respecte l'esprit décrit dans le cahier des charges : moderne, sportif, jeune et professionnel.
4. Choisir les outils techniques. Le développeur choisit les briques du site. Les mots compliqués, expliqués simplement : « Next.js » est un outil pour construire des sites rapides ; « TypeScript » aide à écrire du code avec moins d'erreurs ; « Tailwind » sert à faire le design ; « Medusa » est un moteur de boutique gratuit et modifiable. La recommandation des recherches est Next.js, TypeScript, Tailwind et Stripe. Si l'équipe est petite et ne peut pas entretenir un moteur complet comme Medusa, on peut commencer encore plus simple avec une base de données (par exemple Supabase) et Stripe seulement. Ce choix doit être écrit noir sur blanc.
5. Écrire les règles de protection des données. Quelles données on collecte, pourquoi, pendant combien de temps, et comment les supprimer si on nous le demande. Cette tâche est obligatoire à cause du RGPD et du public jeune de Squadly.

### 4.3 Résultat attendu de la phase

À la fin de la semaine 3, l'équipe doit tenir trois choses :

1. Une liste de produits validée, avec leurs prix.
2. Une maquette visuelle des pages principales, dessinée à partir de la nouvelle charte.
3. Une décision écrite sur les outils techniques, signée par le chef de projet et le développeur.

## Chapitre 5 : Phase 2 — Construire la première version (semaines 4 à 10)

### 5.1 Objectif de la phase

Construire le site complet mais simple, prêt à vendre. C'est la phase la plus longue : sept semaines.

### 5.2 Pages à construire

| Page | Ce qu'elle contient |
|---|---|
| Accueil | Une phrase qui explique ce que vend Squadly Shop, les nouveautés, les packs pour les clubs, l'abonnement Premium |
| Boutique | La liste des produits rangée en familles : abonnements, textiles, accessoires, packs |
| Fiche produit | Photos, tailles, personnalisation possible, stock restant, livraison |
| Page club | Commandes groupées, devis, codes promo pour les clubs |
| Compte client | Commandes, abonnements, factures |
| Aide | Questions fréquentes, suivi de commande, retours |

### 5.3 Fonctions techniques à construire

1. Le panier. Ajouter, retirer, voir le total. Rien de plus.
2. Le paiement Stripe. Le paiement se fait sur une page sécurisée hébergée par Stripe. Le mot « webhook » désigne un message automatique que Stripe envoie à notre site pour confirmer qu'un paiement a réussi. Ces messages doivent être surveillés et traités sans doublon : sans eux, une commande pourrait être payée mais jamais enregistrée.
3. Les emails automatiques. Confirmation, expédition, facture, envoyés avec un service d'emails fiable.
4. Le back-office. Le « back-office » est la partie cachée du site, réservée à l'équipe : elle sert à gérer les produits, les stocks et les commandes sans toucher au code. Si l'équipe choisit Medusa, ce back-office est presque prêt ; sinon il faut le construire en version minimale.
5. Les mesures d'audience. Un outil simple, comme Plausible ou Matomo, pour compter les visiteurs sans les espionner. Ces outils respectent la vie privée et simplifient la conformité RGPD.

### 5.4 Résultat attendu de la phase

1. Un site qui marche bien sur téléphone et sur ordinateur.
2. Un achat de test réussi du début à la fin, de la fiche produit à l'email de confirmation.
3. Un back-office utilisable par l'équipe, y compris par quelqu'un qui n'est pas développeur.

## Chapitre 6 : Phase 3 — Tester et lancer (semaines 11 à 13)

### 6.1 Objectif de la phase

Vérifier que tout marche avec de vraies personnes, puis ouvrir au public. On ne lance pas un site qui n'a jamais été testé par quelqu'un d'extérieur au projet.

### 6.2 Tests obligatoires

1. Le parcours d'achat complet. Le testeur achète un produit du début à la fin, sur téléphone et sur ordinateur, avec plusieurs navigateurs.
2. Les cas qui tournent mal. Carte refusée, stock épuisé, adresse de livraison impossible : le site doit répondre poliment et clairement, jamais avec une page d'erreur incompréhensible.
3. L'accessibilité. Le mot « accessibilité » signifie que le site est utilisable par tous : textes lisibles, couleurs suffisamment contrastées, navigation possible au clavier. Un style sportif et jeune ne doit jamais sacrifier la lisibilité.
4. La protection des données. Vérifier que seules les données utiles sont collectées, que le bandeau des cookies est honnête (refuser doit être aussi facile qu'accepter), et que la demande de suppression fonctionne.
5. Un lancement doux. D'abord, ouvrir à un petit groupe : deux ou trois clubs amis. Corriger ce qu'ils remontent. Puis seulement, ouvrir à tous.

### 6.3 Résultat attendu de la phase

1. Zéro bug bloquant restant (un bug bloquant est un problème qui empêche d'acheter).
2. Les premières vraies commandes du groupe test, livrées et payées sans incident.
3. L'ouverture publique du site, annoncée dans l'application Squadly et par email.

## Chapitre 7 : Phase 4 — Faire grandir (après le lancement)

### 7.1 Objectif de la phase

Améliorer la boutique seulement quand les chiffres montrent que c'est utile. Chaque amélioration doit répondre à un problème observé chez les clients, pas à une envie de l'équipe.

### 7.2 Améliorations possibles

1. Les recommandations IA. Suggérer des produits selon le sport, la taille de l'équipe et les achats passés. Cette fonction prolonge naturellement Squadly AI, mais elle exige d'abord des données de vente réelles.
2. Le lien avec l'application Squadly. Le mot « SSO » signifie « connexion unique » (« Single Sign-On » en anglais) : le client utilise son compte Squadly existant pour se connecter à la boutique, sans créer un nouveau mot de passe. Cela simplifie la vie des utilisateurs et relie les deux univers.
3. Les avantages Premium. Réductions ou livraison offerte pour les abonnés Premium, ce qui donne une raison de plus de s'abonner.
4. La personnalisation avancée. Flocage des maillots (imprimer un nom et un numéro), packs sur mesure pour les clubs.
5. D'autres pays. Seulement après le succès en France, et seulement après avoir vérifié les règles de TVA et de livraison de chaque pays.

## Chapitre 8 : Les checklists

### 8.1 Checklist avant le lancement

Le chef de projet coche chaque point, avec une preuve, avant d'autoriser l'ouverture :

1. Le catalogue est rempli avec photos, prix, tailles et stocks.
2. Le paiement de test fonctionne, en mode test puis avec une vraie carte.
3. Les emails automatiques arrivent bien, y compris dans les boîtes des grandes messageries.
4. Les pages légales sont en ligne : conditions générales de vente, politique de confidentialité, mentions légales.
5. Le site est rapide sur téléphone, même avec une connexion moyenne.
6. L'équipe sait utiliser le back-office : ajouter un produit, changer un stock, rembourser une commande.

### 8.2 Checklist après le lancement

Chaque semaine, lors de la réunion de trente minutes :

1. Regarder les chiffres : visiteurs, commandes, panier moyen.
2. Vérifier que les clients reçoivent une réponse en moins de 24 heures.
3. Noter chaque problème signalé et le corriger par ordre d'importance.
4. Vérifier que les messages automatiques de Stripe (les webhooks) arrivent toujours et ne produisent pas de doublons.
5. Faire une sauvegarde des données régulièrement, et tester qu'on sait la restaurer.

## Chapitre 9 : Les critères de réussite

### 9.1 Comment savoir que le plan a réussi

Le cahier des charges original ne fixe aucun chiffre. Les critères suivants sont donc des cibles indicatives à valider par la direction avant le lancement :

1. Le site est en ligne à la date prévue, soit environ treize semaines après le démarrage.
2. Au moins trente commandes le premier mois (cible indicative à valider).
3. Au moins deux clubs passent une commande groupée (cible indicative à valider).
4. Moins de 5 pour cent des paiements échouent pour une raison technique.
5. Aucune alerte de sécurité ou de fuite de données.
6. Les clients interrogés trouvent la boutique simple et rapide.

### 9.2 Les risques à surveiller

| Risque | Remède |
|---|---|
| Vouloir tout faire tout de suite | Respecter la liste des priorités du chapitre 3 |
| Un design illisible | La charte du fichier d'origine est cassée : elle doit être refaite (phase 1, tâche 3) avant de coder |
| Oublier la loi sur les données | Appliquer la tâche 5 de la phase 1 et le test 4 de la phase 3 |
| Un site mal surveillé | Appliquer la checklist du chapitre 8.2 chaque semaine |
| Ajouter l'IA trop tôt | Attendre les résultats de la phase 3 avant d'engager la phase 4 |

Le risque le plus fréquent dans ce type de projet est le premier : gonfler le périmètre. Chaque fois qu'une nouvelle idée apparaît, on la note dans la liste de la phase 4 au lieu de l'ajouter au chantier en cours.

## Chapitre 10 : Références

### 10.1 Fichiers utilisés pour écrire ce plan

1. `/mnt/agents/temp/Cahier_des_charges_Squadly.pdf` — le cahier des charges original de l'application Squadly : utilisateurs, fonctions, modèle freemium, identité visuelle.
2. `/mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md` — l'analyse du cahier des charges et la première proposition de transposition vers le e-commerce.
3. `/mnt/agents/output/research/squadly_ecommerce_insight.md` — les recommandations stratégiques : MVP, cibles, architecture, outils et risques.
4. `/mnt/agents/output/research/squadly_ecommerce_cross_verification.md` — la vérification croisée des choix techniques et des arbitrages retenus.
