# Plan d'action : construire le SaaS Squadly avec Whapi pour WhatsApp

Ce plan d'action remplace l'ancienne orientation du projet, qui visait un site e-commerce. Squadly n'est pas une boutique en ligne : c'est un service qui aide les coachs à organiser leurs équipes, et les seules choses qui se paient sont des abonnements. Ce document explique, étape par étape, comment construire ce service, même si l'on découvre ces sujets.

## 1. Comprendre le projet Squadly

### 1.1 Ce que Squadly doit faire

#### Le but de Squadly

Squadly est une application web et mobile qui aide à organiser une équipe de sport : calendrier, convocations, réponses des joueurs, statistiques. Six mots à connaître d'abord. Un SaaS est un logiciel utilisé sur Internet, sans installation, loué chaque mois, comme Netflix mais pour travailler. Whapi est un service payant qui permet à un programme d'envoyer et de recevoir des messages WhatsApp automatiquement ; ce n'est pas l'outil officiel de Meta, l'entreprise qui possède WhatsApp. Un webhook est une adresse Internet que WhatsApp appelle pour prévenir le programme qu'un message est arrivé, comme une sonnette qui prévient la maison. Un MVP est la première version du produit, avec seulement les fonctions indispensables, pour tester vite sans tout construire. Le RGPD est la loi européenne qui protège les données personnelles ; elle impose le consentement, surtout pour les mineurs. Enfin, un abonnement est un paiement régulier, mensuel ou annuel, qui donne accès au service ; Squadly proposera une version gratuite puis une version Premium.

#### Les quatre rôles

Le coach crée les entraînements et convoque les joueurs. Le joueur répond s'il sera présent ou absent. Le parent suit le calendrier de son enfant et répond à sa place. Le club gère plusieurs équipes, par exemple les U13 et les U15 d'un même club de football.

#### Pourquoi WhatsApp

Joueurs et parents utilisent déjà WhatsApp chaque jour : ils répondent à une convocation sans installer de nouvelle application, donc plus vite.

#### Squadly reste le centre

Squadly est le cerveau du système : calendrier, convocations et statistiques vivent dans sa base de données. WhatsApp n'est qu'un canal, un tuyau qui transporte les messages. Si WhatsApp tombe en panne, Squadly continue à fonctionner.

### 1.2 Les cinq fonctions WhatsApp du plan

#### Groupes

Un groupe WhatsApp est créé automatiquement par équipe. Quand un joueur rejoint ou quitte l'équipe dans Squadly, il est ajouté ou retiré du groupe sans intervention du coach.

#### Notifications

Les annonces importantes, par exemple « l'entraînement de mardi est déplacé à 18 h », sont envoyées dans le groupe WhatsApp de l'équipe.

#### Convocations

Une convocation est une demande de présence. Le joueur reçoit le message dans WhatsApp et répond avec un bouton : Présent, Absent ou Peut-être. La réponse remonte dans Squadly.

#### Sondages

Un sondage est une question avec plusieurs choix de réponses, par exemple « quel horaire pour le tournoi ? ». Whapi envoie de vrais sondages WhatsApp avec deux à douze options.

#### Rappels

Des messages automatiques partent avant chaque entraînement ou match. Les relances ne visent que les membres sans réponse, pour ne pas harceler les autres.

### 1.3 Checklist de compréhension

Vérifie ces points avant le chapitre 2 :

- [ ] Je sais expliquer avec mes propres mots : SaaS, Whapi, webhook, MVP, RGPD, abonnement.
- [ ] Je sais nommer les cinq fonctions WhatsApp : groupes, notifications, convocations, sondages, rappels.
- [ ] Je sais nommer les quatre rôles : coach, joueur, parent, club.
- [ ] Je sais que Squadly est le cerveau et WhatsApp seulement un canal.

Priorité du chapitre : comprendre avant de construire. Suite : le chapitre 2 prépare les outils et les comptes.

## 2. Préparer le terrain avant de coder

### 2.1 Choisir les outils

#### La pile technique en image

Construire un SaaS ressemble à construire une maison. Next.js construit les murs, c'est-à-dire le site et l'application. Supabase est la cave : la base de données qui stocke équipes, joueurs et réponses. Stripe est la caisse enregistreuse. Whapi est la boîte aux lettres reliée à WhatsApp.

#### Pourquoi ces outils

Next.js réunit site et serveur dans un seul projet ; Supabase fournit base de données et comptes sans serveur à gérer ; Stripe encaisse les abonnements ; Whapi donne accès à WhatsApp. Chaque service est géré par son fournisseur, ce qui soulage une petite équipe.

#### Gagner du temps avec un gabarit

Un gabarit de départ comme MakerKit fournit déjà comptes, équipes, rôles et paiements Stripe, pour environ 349 dollars une fois, avec une version gratuite pour évaluer. Aucun gabarit ne fournit les convocations ni la synchronisation WhatsApp : ces parties restent à développer.

### 2.2 Créer les comptes nécessaires

#### La liste des comptes

Quatre comptes à créer : hébergeur du site (Vercel fonctionne bien avec Next.js), Supabase, Whapi, Stripe. La plupart proposent un palier gratuit pour démarrer.

#### Un numéro de téléphone dédié

Whapi se connecte à WhatsApp avec un vrai numéro de téléphone. Achetez un numéro dédié au projet, jamais le numéro personnel : si WhatsApp le bannit, seul le numéro du projet est touché.

#### Le budget mensuel

Whapi coûte environ 35 dollars par mois et par numéro, 29 dollars en annuel : cible indicative à valider avant achat. Les autres outils démarrent gratuitement, puis se paient quand le service grandit.

### 2.3 Définir les rôles du projet

#### Trois casquettes

Le projet comporte trois rôles : le chef de projet décide des priorités, le développeur écrit le code, le testeur vérifie que tout fonctionne. Une seule personne peut cumuler les trois casquettes, mais elle les porte une à une.

#### Attribuer les tâches

Le chef de projet valide le glossaire, le budget et les critères de réussite. Le développeur monte les outils et code les phases. Le testeur remplit les checklists de fin de phase.

Priorité du chapitre : outils et comptes prêts avant la première ligne de code. Suite : le chapitre 3 construit la première version.

### 2.4 Checklist de préparation

- [ ] Comptes créés et fonctionnels : hébergement, Supabase, Whapi, Stripe.
- [ ] Numéro WhatsApp dédié prêt, différent du numéro personnel.
- [ ] Outils choisis et notés dans un tableau simple avec leur rôle.
- [ ] Budget mensuel estimé écrit noir sur blanc.

## 3. Phase 1 : construire le MVP, la première version simple

### 3.1 Les fondations du SaaS

#### Comptes et connexion

Chaque utilisateur crée un compte avec son e-mail. Un joueur rejoint l'équipe sur invitation, sans démarche compliquée.

#### Créer une équipe et inviter

Le coach crée son équipe, puis invite les joueurs et les parents par un lien d'invitation. Chaque membre renseigne son numéro WhatsApp, qu'il faudra vérifier.

#### Les rôles dans l'application

L'application doit savoir qui a le droit de faire quoi : le coach publie les convocations et les annonces, les joueurs et les parents répondent.

#### La règle des messages officiels

Seuls le coach et ses délégués envoient les messages officiels : cela évite que n'importe quel membre déclenche des envois WhatsApp au nom de l'équipe.

### 3.2 Le calendrier et les convocations

#### Créer les événements

Le coach saisit les entraînements, les matchs et les événements dans le calendrier de Squadly. Le calendrier est la source de vérité : tout le reste en découle.

#### Convocations et réponses

Quand le coach convoque l'équipe pour un match, chaque membre répond Présent, Absent ou Peut-être, dans l'application ou dans WhatsApp. Chaque réponse est enregistrée avec la date et l'heure.

#### Le tableau de bord du coach

Le coach voit en un coup d'œil qui a répondu, qui sera absent et qui n'a pas encore répondu. Les absences sont gérées au même endroit.

### 3.3 Brancher WhatsApp avec Whapi

#### Créer le groupe de l'équipe

Pour chaque équipe, Squadly demande à Whapi de créer un groupe WhatsApp et d'y ajouter les membres. Attention : WhatsApp bloque parfois certains ajouts anti-spam ; l'application vérifie donc régulièrement la liste réelle des participants.

#### Notifications et annonces

Les annonces du coach partent dans le groupe WhatsApp. Chaque message envoyé est suivi avec un statut simple : en attente, envoyé, distribué, lu.

#### Convocations dans WhatsApp

La convocation part dans WhatsApp avec des boutons ou des réponses rapides : Présent, Absent, Peut-être. Les boutons sont préférables au texte libre, difficile à comprendre pour un programme.

#### Mettre en place le webhook

Le webhook est l'adresse de Squadly que Whapi appelle dès qu'une réponse arrive : Squadly lit la réponse et l'enregistre sur la fiche du joueur. Cette adresse reste secrète pour empêcher les fausses réponses.

#### Sondages et rappels automatiques

Les sondages simples partent via Whapi avec deux à douze options. Les rappels sont programmés automatiquement avant chaque événement, par exemple la veille et le jour même.

#### Relancer les non-répondants

La relance ne part que vers les membres qui n'ont pas répondu. Moins de messages envoyés signifie moins de risque d'être repéré comme spam.

### 3.4 Règles importantes à coder

1. Le dernier statut répondu gagne : si un joueur répond « Absent » dans l'application puis « Présent » dans WhatsApp, c'est « Présent » qui compte, car c'est la plus récente.
2. Un parent peut répondre pour son enfant : l'application relie le compte du parent au joueur concerné.
3. Un seul groupe actif par équipe : pas de doublons ; en fin de saison, le groupe est archivé.
4. L'application reste utilisable même sans WhatsApp : un membre sans WhatsApp fait tout dans l'application, avec les mêmes droits.

### 3.5 Checklist de fin de phase 1

- [ ] Un coach peut créer son équipe et inviter des membres.
- [ ] Une convocation envoyée sur WhatsApp reçoit des réponses qui remontent dans Squadly.
- [ ] Un sondage fonctionne et les résultats sont visibles.
- [ ] Les rappels partent automatiquement avant un entraînement.

Priorité du chapitre : livrer peu, mais livrer quelque chose qui marche de bout en bout. Suite : le chapitre 4 teste avec de vraies équipes et sécurise le service.

## 4. Phase 2 : tester, sécuriser et respecter la loi

### 4.1 Tester avec de vraies équipes

#### Organiser une bêta fermée

Une bêta fermée est un test avec un petit nombre d'utilisateurs volontaires. Squadly invite trois à cinq clubs ou équipes à utiliser le service en conditions réelles, pendant au moins deux semaines.

#### Recueillir les retours

Chaque semaine, l'équipe note les retours dans un tableau simple : date, problème, gravité, statut de correction. Les retours les plus précieux sont les situations réelles, notées sans filtre.

#### Corriger d'abord ce qui bloque

Les corrections sont triées par gravité : d'abord ce qui empêche d'utiliser le service, comme une convocation qui ne part pas, ensuite le confort.

### 4.2 Protéger les données et respecter le RGPD

#### Le consentement

Chaque membre accepte clairement de recevoir des messages WhatsApp, par une case à cocher explicite à l'inscription. Il peut changer d'avis à tout moment ; le mot d'arrêt STOP doit être respecté immédiatement.

#### Le consentement parental

Beaucoup de joueurs sont mineurs : le parent autorise alors l'usage des données et des messages WhatsApp, via un parcours où il valide le compte de son enfant.

#### Hébergement en Europe

Les données doivent être hébergées en Europe, ce que Supabase permet en choisissant une région européenne. Chaque membre peut demander la suppression de son compte, et Squadly doit pouvoir l'exécuter réellement.

#### Garder le minimum de données

Squadly ne stocke que ce qui est utile au service : nom, rôle, numéro vérifié, réponses aux convocations. Toute donnée qui ne sert à rien est une donnée de trop.

### 4.3 Les risques WhatsApp et comment les éviter

#### Le risque principal

Whapi n'est pas l'outil officiel de Meta : c'est une session WhatsApp Web connectée à distance. WhatsApp peut bannir le numéro s'il détecte un usage proche du spam, et la session peut se déconnecter, ce qui impose un nouveau scan de code QR. Risque réel mais gérable si l'on joue les bons élèves.

#### Les règles de prévention

1. Ne pas envoyer trop de messages trop vite : espacer les envois, surtout au début.
2. Personnaliser les messages : un message qui commence par le prénom ressemble à une conversation normale.
3. N'écrire qu'aux membres qui ont donné leur consentement, jamais à des inconnus.
4. Prévoir et respecter le mot d'arrêt STOP.
5. Relancer uniquement les non-répondants, pour limiter le volume.

#### Prévoir un plan B

Un deuxième numéro est gardé de côté en cas de bannissement. Côté code, tout ce qui touche à WhatsApp passe par une porte unique : pour changer Whapi contre l'API officielle WhatsApp Business ou un autre service, on remplace une pièce sans réécrire toute la maison.

#### Surveiller le canal

Squadly surveille la connexion Whapi en permanence. Si le canal tombe ou demande un nouveau code QR, l'équipe est prévenue et les membres continuent d'utiliser l'application, car Squadly ne dépend pas de WhatsApp.

### 4.4 Checklist de fin de phase 2

- [ ] Bêta réalisée avec trois à cinq équipes réelles et retours documentés.
- [ ] Consentement WhatsApp explicite et révocable en place.
- [ ] Consentement parental en place pour les joueurs mineurs.
- [ ] Procédure anti-bannissement écrite : rythme d'envoi, personnalisation, STOP.
- [ ] Plan B documenté : numéro de rechange et porte unique dans le code.

Priorité du chapitre : un service fiable et légal avant de chercher des clients. Suite : le chapitre 5 lance le service et fait payer les abonnements.

## 5. Phase 3 : lancer et faire payer

### 5.1 Mettre en place les abonnements

#### Gratuit puis Premium

Squadly fonctionne en freemium, c'est-à-dire gratuit d'abord, payant ensuite. La version gratuite offre l'essentiel : équipe, calendrier, convocations. La version Premium ajoute les fonctions avancées : statistiques, sondages illimités, résumés automatiques. Une offre spéciale existe pour les clubs multi-équipes.

#### Brancher Stripe

Stripe encaisse les paiements et fournit un portail où l'abonné change de formule ou résilie. Squadly vérifie via Stripe si un compte est gratuit ou Premium avant d'ouvrir les fonctions avancées.

#### Des limites simples

Les limites entre gratuit et Premium doivent tenir en une phrase, par exemple : « gratuit pour une équipe, Premium pour les statistiques avancées et les envois WhatsApp étendus ». Les chiffres exacts sont des cibles indicatives à valider après la bêta.

### 5.2 Lancer officiellement

#### La page de présentation

Une page simple explique Squadly en trois phrases : ce que c'est, pour qui, et pourquoi c'est pratique grâce à WhatsApp. Un coach doit comprendre en trente secondes.

#### Le guide de démarrage

Un guide pas à pas accompagne un nouveau coach : créer son compte, créer son équipe, inviter les joueurs, connecter le groupe WhatsApp, envoyer sa première convocation.

#### Le tableau de suivi

Un petit tableau de bord suit la santé du service : nombre d'équipes actives, taux de réponse aux convocations, nombre d'abonnements payants. Ces trois chiffres suffisent.

### 5.3 Critères de réussite du projet

Ces cinq mesures sont des cibles indicatives à valider : elles donnent une direction, pas des promesses.

1. Au moins cinq équipes utilisent Squadly chaque semaine.
2. Plus de la moitié des convocations reçoivent une réponse via WhatsApp.
3. Les rappels partent sans erreur pendant un mois complet.
4. Au moins une équipe passe à l'abonnement payant.
5. Aucun bannissement WhatsApp et aucune perte de données.

### 5.4 Checklist finale

- [ ] Abonnements fonctionnels et testés avec un vrai paiement Stripe.
- [ ] Page de présentation en ligne.
- [ ] Guide de démarrage disponible pour un nouveau coach.
- [ ] Tableau de suivi des cinq critères rempli chaque semaine.

Priorité du chapitre : lancer petit, mesurer, puis améliorer. Suite : écouter les équipes et enrichir le service ; l'ancien périmètre e-commerce reste volontairement hors de ce plan.
