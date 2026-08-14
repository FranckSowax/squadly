# Page — Fil WhatsApp (`/app/messages`)

**Objectif** : la **transparence totale** du canal. Une vue conversation par équipe montrant tout ce qui sort (convocations, rappels, sondages, messages libres) et tout ce qui rentre (réponses), avec la **machine à états des messages** visible : `pending → sent → delivered → read` (+ `failed / requeued`). C'est la page qui rassure : « mes messages arrivent vraiment ».

**Layout** : App Shell, mais contenu spécifique : une **interface de chat**. Desktop : colonne gauche `300 px` (sélecteur de conversation) + panneau chat. Mobile : chat plein écran, sélecteur en haut (chips d'équipes scrollables). Hauteur : viewport moins le header, scroll interne au fil.

---

## 1. Sélecteur de conversation (colonne gauche / chips mobile)

- Liste « Conversations » : 3 équipes (avatar-groupe + nom + dernière activité « il y a 3 min » + badge compteur non lus `pitch`) + une conversation spéciale « Diffusions club » (icône Megaphone).
- En-tête de colonne : ChannelHealth compact (dot + « Connecté ») — voir §6 pour l'état déconnecté.
- Mobile : chips horizontales `[U13 A •3] [U15] [Seniors B] [Club]` avec badge non lus, scroll-snap.
- **Animation** : sélection : la ligne active prend fond `mist` radius `14` (`layoutId` glisse `.3s`). Badge non lus : pop spring quand il incrémente.

## 2. En-tête du fil

- Avatar-groupe + « U13 A » Bricolage 18 px + sous-texte « 18 membres · numéro dédié +33 6 12 34 56 78 ».
- À droite : pill ChannelHealth « Connecté · il y a 2 min » + bouton ghost « Composer » (icône PenLine) + `⋯` (Exporter l'historique).
- Bandeau démo fin (`mist`) : « Démo — cette conversation est simulée. En production, chaque message est un vrai WhatsApp envoyé via votre numéro dédié. » (dismissible).
- **Animation** : header sticky avec ombre au scroll `.25s`.

## 3. Le fil (zone scrollable, fond `sand` + doodle pattern léger en filigrane)

**Séparateurs de jour** : pill centrée `white` ombre légère « Aujourd'hui » / « Hier » / « Ven. 7 juin » (sticky en haut du viewport interne pendant le scroll du jour).

**Bulles sortantes** (Squadly → membres) — voir composant `WhatsAppBubble` (design.md §7.4). Variantes de contenu :
1. **Convocation** (rich) : titre gras + lignes date/lieu + 3 boutons factices empilés `Présent / Absent / Peut-être` (pills blanches, le bouton majoritairement choisi affiche un mini-compteur « ×12 » qui apparaît au fil des réponses) + footer : heure + StatusTicks. En-tête de bulle : chip « Squadly · Convocation » (`pitch`).
2. **Rappel automatique** : chip « Relance auto » (`sun`) + « Petit rappel : match samedi 14 h 30 au Stade Jean-Bouin. On compte sur toi ! »
3. **Sondage** : chip « Sondage » + question + options numérotées + « Réponds avec le numéro de ton choix ».
4. **Message libre** : texte simple du coach (« Entraînement avancé à 17 h 45 demain, l'accueil ouvre plus tôt »).

**Bulles entrantes** (membres → Squadly) : nom coloré par membre + texte court : « Présent », « Présent ! On vient en voiture », « Absent, week-end famille », « Peut-être, je confirme vendredi ». Les réponses RSVP affichent aussi une chip du statut dans la bulle (pitch/coral/sun).

**Message failed/requeued (démonstration de la machine à états)** : une bulle rappel affichée `failed` — triangle coral + « Échec d'envoi · numéro injoignable » + bouton inline « Réessayer ». Au clic (ou auto après 6 s en démo) : la bulle passe `requeued` (chip « Remis en file » + spinner mini) puis `sent → delivered` — la séquence complète s'anime sous les yeux.

**Indicateur de frappe simulé** : avant l'arrivée d'une réponse entrante, trois dots animés dans une petite bulle blanche (1–2 s) — rend le fil vivant.

- **Animation** : à l'ouverture du fil : les bulles du jour courant entrent en stagger rapide `.04s` (max 10 bulles animées, le reste direct). Nouvelle bulle sortante : `y: 20 → 0, scale .95 → 1, .4s` spring. Entrante : idem + indicateur de frappe avant. StatusTicks : chaque changement = pulse `.25s` + crossfade. Le scroll suit le bas automatiquement quand on est déjà en bas (bouton flottant « ↓ Nouveaux messages » sinon, pill blanche ombre, pop à l'apparition).

## 4. Drawer « Détail du message » (clic sur une bulle sortante)

Bottom sheet mobile / panneau droit `380 px` desktop. **La machine à états visualisée** :

- Rappel du contenu du message (mini bulle).
- **Timeline verticale horodatée** : rail avec dots successifs qui s'allument :
  - `14 h 32:01` — **Créé** (dot gris) « mis en file d'envoi »
  - `14 h 32:02` — **Envoyé** (dot gris + ✓) « transmis à WhatsApp »
  - `14 h 32:04` — **Remis** (dot gris + ✓✓) « reçu sur le téléphone de Yanis »
  - `14 h 35:18` — **Lu** (dot `read` bleu + ✓✓ bleu) « ouvert par Yanis »
  - (cas failed) `14 h 32:05` — **Échec** (dot coral) « le numéro n'est pas joignable » → `14 h 32:11` — **Remis en file** (dot sun) → reprise du cycle.
- Section « Destinataires » (messages groupés) : liste compacte avatar + statut individuel + heure de lecture. Filtre chips `Tous · Remis · Lus · Échec`.
- Métadonnées techniques repliables (« Détails techniques ») : `message_id`, `direction: outbound`, `type: convocation`, `provider: Whapi (simulé)`, latences par étape — **ton pédagogue** pour les coachs curieux, caché par défaut.
- **Animation** : ouverture spring. La timeline se « rejoue » à l'ouverture : chaque dot s'allume en séquence `.25s` stagger avec la ligne qui se dessine entre eux (stroke animé).

## 5. Composer « Message rapide »

- Modale/sheet : textarea (« Écris ton message… »), sélecteur de destinataires (chips équipe + membres, compteur), switch « Envoyer en tant que rappel de [événement lié] », aperçu bulle live à droite (desktop).
- Envoi : la bulle apparaît immédiatement dans le fil (`pending`) puis progresse dans la machine à états — **le coach voit son message vivre**.
- **Animation** : insertion de la bulle + progression des coches, toast « Message envoyé à 18 joueurs ».

## 6. État « Canal déconnecté » (démo toggleable depuis Paramètres)

- Bandeau en haut du chat : `coral/10` bordure coral : « WhatsApp déconnecté — les messages sont mis en pause » + bouton « Reconnecter ».
- Les bulles récentes affichent `pending` avec horloge ; le composer est désactivé avec tooltip explicatif.
- Une bulle « système » centrée (pill grise, style WhatsApp) : « Session déconnectée à 14 h 05 — reconnectez dans Paramètres ».
- **Animation** : bandeau slide-down `.3s` ; les coches des bulles en attente reprennent leur cycle à la reconnexion (cascade stagger `.1s`, moment satisfaisant).

## 7. Données du fil (ordre chronologique, conversation U13 A)

1. **Ven. 7 juin 18 h 02** — Convocation Match vs FC Montreuil → `read` (16/18).
2. Réponses entrantes du soir (8 bulles, 18 h 05 → 22 h 41) : « Présent » ×6, « Peut-être » ×1, « Absent, désolé » ×1.
3. **Sam. 8 juin 9 h 00** — Sondage covoiturage → `read`.
4. 4 réponses sondage (« 1 », « 3 », « 2 »…) — avec chips des options choisies.
5. **Aujourd'hui 14 h 32** — Relance auto J-2 aux 3 sans-réponse : 2 × `read`, 1 × `failed → requeued → delivered` (la démo de la machine à états).
6. Réponses qui arrivent en direct pendant la session (simulateur, toutes les 20–40 s).

## Interactions récapitulatives
- Navigation multi-conversations avec badges non lus.
- Clic bulle → drawer machine à états rejouée.
- Retry manuel d'un message failed.
- Composer avec aperçu live.
- Simulation d'arrivées entrantes (frappe → bulle → chip RSVP → compteurs mis à jour dans toute l'app).

## Assets utilisés
`empty-chat.svg` (conversation vide). Wallpaper chat : motif doodle CSS/SVG léger (ballons, sifflets, étoiles — `ink/4` opacity), pas d'image.
