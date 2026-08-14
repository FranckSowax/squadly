# Dimension 2 — Whapi.Cloud et WhatsApp

## Point critique
Whapi.Cloud n'est pas l'API officielle WhatsApp Business de Meta. Il fonctionne comme une session « appareil lié » proche de WhatsApp Web. Cela permet plus de souplesse et un coût forfaitaire, mais crée un risque de conformité, de bannissement du numéro et de rupture de session.

## Capacités confirmées
- Envoi de messages texte, médias, contacts, localisation, boutons et listes : `POST /messages/text`.
- Envoi de sondages : `POST /messages/poll`, avec 2 à 12 options et choix unique ou multiple.
- Création de groupes : `POST /groups`.
- Ajout/retrait de participants : `POST` et `DELETE /groups/{GroupID}/participants`.
- Mentions dans les groupes via paramètre `mentions`.
- Webhooks entrants HTTPS : messages, statuts, groupes, contacts, présence, appels, labels, utilisateurs.
- Réponses entrantes : texte, boutons, listes, réactions et votes de sondage.
- Statuts de livraison : `pending`, `sent`, `delivered`, `read`.
- Médias entrants via `GET /media/{media-id}` ou téléchargement automatique avec rétention limitée.
- Vérification de numéros WhatsApp.

## Limites et risques
- Aucune garantie officielle Meta, pas de badge vert, pas de SLA Meta.
- Risque de bannissement du numéro si envois trop rapides, répétitifs ou non sollicités.
- Nécessité de warm-up, délais aléatoires, limitation de débit, personnalisation et commande STOP.
- Les ajouts de membres à un groupe peuvent échouer à cause des protections anti-spam WhatsApp.
- La session peut être invalidée et nécessiter un nouveau scan QR.
- Pas de signature HMAC de webhook clairement documentée : sécuriser par URL secrète, validation du `channel_id` et restrictions complémentaires.
- Tarification observée : environ 35 dollars par mois et par canal, 29 dollars en annuel, avec dégressif ; à revérifier avant engagement.

## Architecture d'intégration recommandée
1. Créer une interface interne `WhatsAppProvider` pour isoler Whapi.
2. Recevoir les webhooks sur un endpoint HTTPS qui répond vite et pousse les événements dans une file.
3. Utiliser une file d'envoi avec pacing, retries et idempotence.
4. Suivre chaque message avec machine à états `pending → sent → delivered → read`.
5. Persister les identifiants de groupe, message et sondage pour rattacher les réponses.
6. Synchroniser régulièrement les participants au lieu de présumer que les ajouts réussissent.
7. Télécharger les médias importants vers le stockage Squadly.
8. Surveiller la santé du canal et alerter si déconnexion ou scan QR requis.
9. Documenter une procédure de remplacement du numéro en cas de bannissement.
10. Prévoir l'API officielle WhatsApp Business comme plan B si le risque Whapi devient inacceptable.

## Sources principales
- https://whapi.cloud/docs
- https://whapi.cloud/price
- https://whapi.readme.io/reference/sendmessagetext
- https://whapi.readme.io/reference/sendmessagepoll
- https://whapi.readme.io/reference/creategroup
- https://support.whapi.cloud/help-desk/receiving/webhooks
- https://support.whapi.cloud/help-desk/blocking/how-to-not-get-banned
