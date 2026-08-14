# Brief produit — Squadly (SaaS de gestion d'équipe sportive via WhatsApp)

## Concept
Squadly est un SaaS qui aide les coachs sportifs (foot, basket, hand, volley…) à gérer leurs équipes sans friction. Le problème : les coachs passent des heures dans des groupes WhatsApp désorganisés (convocations perdues, réponses éparpillées, rappels manuels). La solution Squadly : le coach pilote tout depuis un tableau de bord web simple, et les joueurs/parents reçoivent les convocations, sondages et rappels directement dans WhatsApp — ils répondent en un tap (Présent / Absent / Peut-être) sans installer aucune application.

Promesse : « La convocation envoyée en 30 secondes, les réponses comptées automatiquement. »

## Utilisateurs et rôles
- **Coach** : crée équipes et événements, envoie convocations et sondages, suit les réponses en temps réel, voit les stats.
- **Joueur / Parent** : interagit via WhatsApp (boutons de réponse), peut consulter un espace web léger.
- **Club (Owner/Admin)** : gère plusieurs équipes, vue consolidée, délégation aux coachs.

## Fonctionnalités clés (MVP)
1. **Dashboard coach** : prochaines convocations, taux de réponse en temps réel, alertes (joueurs sans réponse), actions rapides.
2. **Équipes & membres** : équipes multiples, membres avec rôles (coach/joueur/parent), numéro WhatsApp opt-in, parent lié à un enfant.
3. **Événements & convocations** : match/entraînement/tournoi, date-lieu-horaire, envoi WhatsApp, réponses Présent/Absent/Peut-être, relances automatiques J-7/J-1 pour les sans-réponse.
4. **Sondages WhatsApp** : questions à choix (ex. « Covoiturage samedi ? »), votes, résultats en barres de progression.
5. **Fil WhatsApp** : vue conversation par équipe montrant les messages sortants (convocations, rappels, sondages) et les réponses entrantes, avec machine à états des messages : pending → sent → delivered → read, failed/requeued.
6. **Statistiques** : taux de réponse moyen, présences par joueur, ponctualité des réponses.
7. **Abonnements** : Freemium (1 équipe, plafond de messages), Premium (équipes illimitées, relances auto, stats), Club (multi-équipes, vue consolidée, rôles délégués). Page tarifs friendly.
8. **Paramètres canal WhatsApp** : état de connexion de la session (connecté/déconnecté avec alerte), numéro dédié, indicateur de santé.

## Intégration WhatsApp (Whapi)
L'intégration passe par Whapi.Cloud (API WhatsApp non officielle). Dans cette démo, l'adaptateur `WhatsAppProvider` est simulé côté serveur : les messages sortants progressent automatiquement dans la machine à états, et des réponses entrantes réalistes sont simulées pour rendre l'expérience vivante (démo convaincante sans appel externe réel). Ton pédagogue : l'app explique discrètement que c'est une démo simulée.

## Modèle de données (pour le backend)
tenants (organisations/clubs), users (auth), memberships (rôles), teams, members (joueurs/parents avec opt-in WhatsApp), events (matchs/entraînements), rsvps (présent/absent/peut-être, répondu par joueur ou parent), polls + poll_votes, whatsapp_messages (direction, type, contenu, statut avec horodatages), subscriptions (plan, statut, quotas).

## Ambiance et style demandés
- **Moderne, friendly, facile d'utilisation** — un SaaS chaleureux et sportif, pas un outil d'entreprise froid.
- Mobile-first (le coach gère depuis son téléphone au bord du terrain).
- Esprit sportif premium : énergique mais épuré, couleurs fraîches (pas de bleu-violet corporate), arrondis généreux, micro-animations joyeuses, illustrations sportives amicales.
- Ton des textes : français, chaleureux, tutoiement léger possible, phrases courtes, orienté « gain de temps pour le coach ».
- Landing page marketing : hero avec la promesse, démonstration visuelle du flux (dashboard → message WhatsApp → réponse → stats), témoignages de coachs, tarifs, FAQ, CTA « Essayer gratuitement ».

## Pages attendues (indicatif, le designer décide)
- Landing marketing (/)
- Login (fourni par le backend)
- App : Dashboard, Équipes, Membres, Événements/Convocations (liste + détail avec réponses temps réel), Sondages, Messages WhatsApp (vue chat), Statistiques, Abonnement/Tarifs, Paramètres (canal WhatsApp, organisation)
- Données de démo réalistes : un club « AS Verrières Football » avec 2-3 équipes (U13, U15, Seniors), ~25 membres, événements passés et à venir, sondages votés, historique de messages.
