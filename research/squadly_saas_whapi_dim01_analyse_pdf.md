# Dimension 1 — Analyse du PDF recentrée SaaS + WhatsApp

## Source
- `/mnt/agents/temp/Cahier_des_charges_Squadly.pdf`

## Exigences du PDF
- Squadly est une application mobile et web pour coachs, joueurs, parents et clubs.
- Objectif : centraliser messages, calendriers, convocations et statistiques.
- Fonctions principales : gestion d'équipe, calendrier, convocations Présent/Absent/Peut-être, absences, compositions, statistiques, messages, notifications, sondages, covoiturage, photos/vidéos, tâches.
- Squadly AI : créer un entraînement, proposer une composition, aider aux convocations, générer un résumé.
- MVP : compte, création d'équipe, invitations, tableau de bord, calendrier, entraînements/matchs, convocations/absences, notifications/annonces, compositions, statistiques de base.
- Évolution : finances, paiements, sponsoring, statistiques avancées, fonctions club, IA.
- Modèle : freemium, Premium avec fonctions avancées et IA, offre clubs.
- Design : moderne, sportif, jeune, professionnel, premium, mobile-first.

## Ce qui doit rester dans le SaaS
- Comptes, rôles, organisations, équipes et invitations.
- Calendrier structuré et source de vérité des événements.
- Moteur de convocations, agrégation des réponses, relances et absences.
- Compositions, statistiques, tableau de bord, tâches, covoiturage, galerie.
- Squadly AI et validation par le coach.
- Abonnements, quotas et droits Premium.
- Paramètres de consentement et préférences de notification.

## Ce qui peut passer par WhatsApp via Whapi
- Création et synchronisation d'un groupe WhatsApp par équipe.
- Ajout/retrait de membres selon l'effectif.
- Notifications et annonces envoyées dans le groupe ou en message individuel.
- Convocations avec réponses Présent/Absent/Peut-être via boutons ou réponses rapides.
- Relances automatiques des non-répondants.
- Sondages d'horaire, covoiturage et organisation.
- Rappels d'entraînement, match, tâche et changement d'horaire/lieu.
- Résumés IA publiés après événement.

## Règles métier probables
- Un membre possède un compte SaaS et un numéro WhatsApp vérifié.
- Un parent peut répondre pour son enfant.
- Le dernier statut horodaté gagne si le membre répond dans l'app et dans WhatsApp.
- Seuls le coach et les rôles délégués publient convocations et annonces.
- Un seul groupe actif par équipe ; archivage en fin de saison.
- La création IA d'événement ou de composition nécessite validation du coach.
- L'opt-in WhatsApp est explicite et révocable.

## Risques et hypothèses
- Whapi est une API non officielle : risque de bannissement, rupture de session, dépendance au protocole WhatsApp.
- Le SaaS doit prévoir une abstraction fournisseur pour pouvoir changer de prestataire.
- Les membres sans WhatsApp doivent garder un parcours complet dans l'application.
- Les mineurs nécessitent consentement parental et parcours parent.
- Les coûts et quotas WhatsApp doivent être intégrés au modèle freemium.
