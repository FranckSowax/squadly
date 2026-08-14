# Page — Paramètres (`/app/parametres`)

**Objectif** : le centre de contrôle, avec en vedette la **santé du canal WhatsApp** (connexion, numéro dédié, reconnexion QR simulée). Doit aussi porter la **pédagogie du mode démo** (« c'est simulé, voici comment ça marchera en vrai »).

**Layout** : App Shell. Header : `title-1` « Paramètres ». Navigation interne : onglets verticaux desktop (colonne `220 px`, items avec icônes) / SegmentedTabs scrollable mobile : `Organisation · Canal WhatsApp · Notifications · Profil · Mode démo`. Contenu max `760 px`.

---

## 1. Onglet « Organisation »

- Carte blanche : avatar du club (initiales « AS » carré radius `16`, bouton « Changer ») + champs : Nom du club (« AS Verrières Football ») · Sport principal (select Football — options Basket, Hand, Volley, Rugby, Autre) · Ville (« Verrières ») · Fuseau horaire (select `Europe/Paris`).
- Sous-carte « Membres de l'organisation » (rôles admin) : liste de 3 : Karim Haddad (chip `Owner` sun) · Julie Perrot (chip `Admin` mist) · Mehdi Kaci (chip `Coach` mist) + bouton ghost « Inviter un coach » (envoi email simulé, toast).
- Sous-carte « Danger » (bordure `coral/30`) : « Archiver l'organisation » bouton `danger-soft` → modale de confirmation (taper le nom du club pour confirmer — input + bouton désactivé tant que non conforme).
- Sauvegarde : bouton primary « Enregistrer » qui s'active dès qu'un champ change (animation : apparition `scale .9 → 1` en bas de carte, sticky). Succès : toast « Paramètres enregistrés ✓ ».
- **Animation** : onglets : contenu entrant `y: 12 → 0, opacity, .3s`. Cartes stagger `.06s`.

## 2. Onglet « Canal WhatsApp » (la pièce maîtresse)

### 2.1 Carte de statut (état connecté, défaut)
- Grande carte blanche radius `24`. En-tête : glyphe WhatsApp dans pastille `wa/12` + « Canal WhatsApp » `title-3` + ChannelHealth : dot vert pulsant + « **Connecté** » (chip pitch) + « dernière vérification il y a 2 min » (se rafraîchit).
- **Grille d'infos** (2 col) :
  - Numéro dédié : `+33 6 12 34 56 78` (Bricolage 700, bouton copier — icône Copy, feedback « Copié ! »)
  - Nom affiché : « AS Verrières Football »
  - Fournisseur : « Whapi.Cloud — session appareil lié » + chip `mist` « Démo simulée »
  - Santé de session : barre de score « **98 %** de messages remis cette semaine » (ProgressBar pitch) + « 0 incident ce mois-ci »
- **Jauge batterie-style** de session : 5 segments, 4 remplis pitch + label « Session saine ».
- Boutons : ghost « Tester l'envoi » (envoie un message de test dans le fil : « Message de test de Squadly — tout fonctionne ! » visible dans `/app/messages`) + `danger-soft` « Déconnecter la session ».

### 2.2 État déconnecté (toggleable — voir §5)
- La carte passe fond `coral/6` bordure `coral/30` : dot coral fixe + « **Déconnecté** » (chip coral) + « Session interrompue à 14 h 05 — vos convocations sont en pause, vos données sont en sécurité. »
- **Bloc reconnexion** : titre « Reconnecter en 30 secondes » + 3 étapes numérotées (dots animés) : « 1. Ouvrez WhatsApp sur le téléphone du club → 2. Appareils connectés → 3. Scannez ce code ».
- **QR code simulé** : carré `220 px` (faux QR en SVG — motif de modules généré + logo Squadly au centre) dans un cadre radius `20` avec **coin-flash animé** (les 4 coins du viseur en `pitch`, respiration `opacity .5 → 1, 2s`) + ligne de scan horizontale qui balaye (`y` animé, `2.5s`, ease-in-out infini) + compte à rebours « expire dans 1:47 » (tabular-nums, tick chaque seconde).
- Bouton « Simuler la reconnexion » (visible en démo) : le QR se couvre d'une coche lime animée (stroke draw + `scale` spring) → la carte repasse à l'état connecté avec flash `mist` → toast « Canal WhatsApp reconnecté 🎉 » (icône PartyPopper) → les messages en pause du fil reprennent leur cycle.
- **Animation** : bascule d'état `crossfade .4s`. Le scan loop du QR est le seul élément animé en continu de la page.

### 2.3 Sous-carte « Comment ça marche » (pédagogie)
- Accordéon repliable : « D'où viennent les messages ? » — explication simple : « Squadly utilise une session WhatsApp dédiée à votre club, via notre partenaire Whapi.Cloud. Les joueurs voient un numéro professionnel, jamais le vôtre. » + « Et si la session tombe ? » — « On vous alerte immédiatement (email + bannière), vos convocations se mettent en pause et repartent automatiquement à la reconnexion. » + « C'est le WhatsApp officiel ? » — réponse transparente sur l'API non officielle et la possibilité de bascule, en langage clair.
- **Animation** : accordéon hauteur `.35s`.

## 3. Onglet « Notifications »

- Carte blanche, liste de switches (grands, tactiles, thumb animé spring) :
  - « Réponse à une convocation » — activé · sous-texte « un récap discret, pas 18 notifications »
  - « Rappel des sans-réponse » — activé · « la veille à 18 h »
  - « Canal WhatsApp déconnecté » — activé + chip « recommandé »
  - « Résumé hebdo du dimanche » — activé · « vos stats de la semaine, avec des mots gentils »
  - « Nouveautés produit » — désactivé
- Choix du canal par notification : chips `Email` / `WhatsApp` (multi-sélection, pills qui se cochent).
- **Animation** : switches : thumb glisse spring + track change de couleur `.25s`. Sauvegarde auto (toast fin « Enregistré »).

## 4. Onglet « Profil »

- Avatar (initiales KH, pastille édition) · Nom « Karim Haddad » · Email · Téléphone · Rôle affiché « Owner — AS Verrières Football » (chip sun) · Bouton « Se déconnecter » (ghost) + lien `small coral` « Supprimer mon compte ».
- **Animation** : identique aux autres onglets.

## 5. Onglet « Mode démo » (pédagogie transparente)

- Carte `mist` : icône FlaskConical `pitch` + titre « Vous explorez une démo ».
- Texte : « Cette version de Squadly fonctionne avec des données fictives (le club AS Verrières, ses 3 équipes et ses 56 membres) et un **canal WhatsApp simulé** : les messages progressent comme en vrai (envoyé → remis → lu) et des joueurs virtuels répondent pour rendre l'expérience vivante. Aucun message réel n'est envoyé. »
- **Contrôles de la simulation** (fun et utile pour la démo) :
  - Switch « Simuler des réponses entrantes » (activé — pilote toutes les boucles temps réel de l'app)
  - Switch « Simuler une déconnexion du canal » (pilote l'état §2.2 + bannière globale + page Messages)
  - Select « Vitesse de simulation » : `Temps réel · Accéléré ×4`
  - Bouton ghost « Réinitialiser les données de démo » (restaure le dataset initial, toast « Démo réinitialisée »)
- **Animation** : switches identiques §3. La bascule « déconnexion » déclenche immédiatement la bannière globale (slide-down `.3s`) — effet visible où qu'on soit dans l'app.

## Interactions récapitulatives
- QR de reconnexion simulé (scan animé, expiration, reconnexion en un clic).
- Test d'envoi qui écrit réellement dans le fil WhatsApp.
- Bouton copier le numéro avec feedback.
- Switches de simulation qui pilotent l'état global de l'app (canal déconnecté ↔ bannières, bulles en pause, reprise en cascade).
- Formulaire organisation avec sauvegarde contextualisée.

## Assets utilisés
`empty-chat.svg` (réutilisé en petit dans la sous-carte pédagogie). QR code : SVG généré en code (modules pseudo-aléatoires fixes + logo centré), pas d'asset image.

## Notes
- Ton : transparent et rassurant — la page assume la simulation (« Démo simulée ») et explique le réel.
- Tous les changements d'état du canal sont **globaux** : ils se répercutent sur Dashboard, Messages et Événements (single source of truth simulée côté client).
