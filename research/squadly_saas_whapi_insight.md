# Insights — Squadly SaaS + Whapi

## Idée directrice
Squadly doit rester le cerveau du système. WhatsApp devient un canal d'interaction : le SaaS crée les événements, convocations et sondages, puis Whapi les diffuse et ramène les réponses dans Squadly.

## Proposition de valeur
Un coach organise son équipe dans Squadly ; les joueurs et parents peuvent répondre directement depuis WhatsApp, sans installer l'application. Cela réduit la friction et augmente le taux de réponse aux convocations.

## MVP recommandé
1. Comptes, équipes, rôles et invitations.
2. Calendrier des entraînements et matchs.
3. Convocations avec réponses Présent/Absent/Peut-être.
4. Notifications et annonces.
5. Groupe WhatsApp par équipe.
6. Envoi de convocations via WhatsApp.
7. Webhooks entrants pour synchroniser réponses et statuts.
8. Relances automatiques des non-répondants.
9. Sondages simples.
10. Abonnements et quotas.
11. Back-office minimal.
12. Tableau de bord coach.

## Architecture fonctionnelle
- Source de vérité : base Postgres Squadly.
- Canal : Whapi derrière une interface interne `WhatsAppProvider`.
- File d'envoi : pacing, retries, idempotence, journalisation.
- File de réception : webhooks rapides, traitement asynchrone, mapping par numéro et contexte.
- Statuts : `pending`, `sent`, `delivered`, `read`, échecs et relances.
- Groupes : un groupe actif par équipe, synchronisation des participants, archivage en fin de saison.

## Différenciation
- Réponse aux convocations dans WhatsApp sans application obligatoire.
- Relances intelligentes uniquement aux non-répondants.
- Sondages d'horaire et de covoiturage.
- Squadly AI pour transformer les réponses libres, proposer des compositions et résumer les événements.
- Offre club multi-équipes.

## Risques majeurs
- Bannissement WhatsApp si Whapi est mal utilisé.
- Session Whapi déconnectée ou scan QR requis.
- Réponses ambiguës en texte libre.
- Données de mineurs et consentement parental.
- Dédoublement des réponses entre l'app et WhatsApp.
- Coûts et quotas non intégrés au freemium.

## Recommandation finale
Lancer le MVP avec Whapi, mais concevoir l'architecture pour pouvoir basculer vers l'API officielle WhatsApp Business ou un autre fournisseur sans réécriture. Ne pas faire de WhatsApp l'unique canal : l'application Squadly doit rester pleinement fonctionnelle.
