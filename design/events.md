# Page — Événements & Convocations (`/app/convocations`)

**Objectif** : le cœur du produit. Trois vues : la **liste** des événements, le **détail** d'une convocation (board RSVP temps réel), et le **wizard de création** (avec aperçu WhatsApp en direct). La promesse « envoyée en 30 secondes » doit être vérifiable ici.

---

# A. Liste des événements

**Layout** : App Shell. Header : `title-1` « Convocations » + bouton `＋ Nouvelle convocation` (primary). Sous le header : SegmentedTabs `À venir (3) · Passés (12) · Brouillons (1)` + select filtre équipe `Toutes les équipes`.

## 1. Groupes chronologiques

Événements regroupés par mois : label `JUIN 2025` (`label ink-faint`) puis cartes. Mobile : 1 col ; desktop : 2 col.

**Carte événement** (blanche, radius `20`, cliquable entièrement)
- **Bloc date** à gauche : carré `64 px` fond `mist` radius `16` — jour Bricolage 700 22 px `pitch-dark`, mois `label`. Pour les matchs : liseré supérieur `pitch` ; entraînement : `sun` ; tournoi : `lime`.
- **Centre** : chip type (`Match` / `Entraînement` / `Tournoi` — pill avec icône Trophy / Dumbbell / Medal) + titre Bricolage 18 px « U13 A vs FC Montreuil » + méta `small ink-soft` « 14 h 30 · Stade Jean-Bouin » + chip équipe « U13 A ».
- **Droite** : statut des réponses —
  - Si convocation envoyée : barre RSVP multi-segments `96 px` + « 12/18 » Bricolage 700 + chip « 3 sans réponse » (sun-soft) si > 0.
  - Si brouillon : chip dashed « Convocation non envoyée » + bouton compact « Envoyer » (pitch ghost).
  - Si passé : chip gris « Terminé » + « 15/18 présents ».
- Chevron discret au hover.

**Événements affichés** : Sam. 14 Match U13 A vs FC Montreuil (12/18, 3 sans réponse) · Dim. 15 Match Seniors B vs AS Choisy (15/22) · Mar. 17 Entraînement U13 (brouillon) · Sam. 28–29 Tournoi de printemps (brouillon, chip `lime` « À préparer ») · Passés : Mar. 10 Entraînement (15/18), Sam. 7 Match vs US Villebon (14/18)…

- **Animation** : groupes stagger `.1s` ; cartes `y: 20 → 0, stagger .06s`. Le bloc date fait un micro-pop à l'entrée (spring, delay par carte). Hover : `y: -3, shadow-lift`, chevron `x: 0 → 4`. Tap carte : `scale .98` puis navigation avec transition partagée — le bloc date se morph (`layoutId`) vers l'en-tête du détail.
- **Empty state** (onglet sans contenu) : `empty-events.svg` + « Rien de prévu pour l'instant » + CTA « Créer une convocation ».

---

# B. Détail d'une convocation (`/app/convocations/match-fc-montreuil`)

**La page temps réel.** Le coach la laisse ouverte le jour du match.

## 1. En-tête événement

- Retour `← Convocations`. Carte d'en-tête fond `gradient-pitch` texte `paper` (cohérente avec dashboard §3) : chips type+équipe, titre Bricolage 28 px « U13 A vs FC Montreuil », méta complète (date, heure, lieu + bouton ghost « Itinéraire » icône MapPin → ouvre maps), compte à rebours « Départ dans 2 j 4 h ».
- Actions en haut à droite : `⋯` (Modifier l'événement, Dupliquer, Annuler l'événement — coral) + bouton ghost blanc « Renvoyer la convocation ».
- **Animation** : entrée via morph du bloc date + `y: 16 → 0` du contenu, stagger `.05s`.

## 2. Bandeau « Envoi WhatsApp »

- Carte `mist` : glyphe wa + « Convocation envoyée le 7 juin à 18 h 02 — **18 messages remis, 16 lus** » + StatusTicks récapitulatif + lien « Voir dans le fil WhatsApp → » (`messages.md`).
- Mention relances : icône BellRing + « Relance automatique programmée : **J-1, demain 18 h 00**, pour les sans-réponse » + bouton compact « Envoyer maintenant ».
- **Animation** : la ligne de statut s'actualise en direct (« 16 → 17 lus ») avec un flash lime discret `300 ms` sur le chiffre qui change.

## 3. Board RSVP (la pièce maîtresse)

**Layout** : 4 colonnes desktop (`Présents 12` pitch · `Peut-être 2` sun · `Absents 1` coral · `Sans réponse 3` dashed). Mobile : SegmentedTabs `Présents · Peut-être · Absents · Sans rép.` avec le compteur dans chaque tab, une colonne affichée à la fois.

**En-tête de colonne** : chip RSVP + compteur Bricolage 700 + pourcentage.
**Cartes membre** (blanches, radius `16`, compactes) : avatar + nom + sous-texte contextuel :
- Présents : « répondu il y a 2 h · par Samira (maman) » si parent — **traçabilité du répondant**.
- Peut-être : « "Je confirme vendredi" » (note si fournie).
- Absents : motif (« blessé »).
- Sans réponse : « convoqué il y a 3 j » + bouton compact « Relancer » (wa ghost) par membre.

**Comportement temps réel simulé** : toutes les 15–35 s, un sans-réponse répond : sa carte **quitte sa colonne et glisse** vers la bonne (Framer `layout` + `AnimatePresence`, trajectoire fluide `.6s` spring), les compteurs pop, un toast discret apparaît (« Noé F. a répondu : Présent ✓ »), la barre du haut se met à jour. Quand les 3 sans-réponse ont répondu : **moment de célébration** — confettis lime/pitch + bannière `lime/15` « 100 % de réponses. Belle équipe ! » + illustration `celebration.png` en petit.

- **Animation** : colonnes entrée stagger `.08s` (`y: 24 → 0`). Cartes : `scale .9 → 1` pop à l'apparition. Déplacement inter-colonnes : `layout` spring 260/24. Badge 100 % : `scale 0 → 1` spring 420/17.

## 4. Timeline d'activité (colonne latérale desktop / section mobile)

- « Activité » `title-3` : flux vertical avec rail et dots colorés : « 14 h 32 — Yanis B. a répondu Présent » (dot pitch) · « 12 h 05 — Relance envoyée à 3 joueurs » (dot sun) · « 7 juin — Convocation envoyée à 18 joueurs » (dot wa) · « Message remis à tous · 18/18 » (dot gris).
- Temps relatif qui se rafraîchit (« il y a 3 min »).
- **Animation** : nouvelles entrées insérées en haut avec `y: -12 → 0, opacity, .4s` + dot pop.

---

# C. Wizard « Nouvelle convocation » (modale plein écran mobile / modale `880 px` desktop)

**3 étapes + envoi.** Stepper en haut : 3 dots+labels (`L'événement` → `Les destinataires` → `Le message`) reliés par une ligne qui se remplit `pitch`. Transition entre étapes : slide horizontal `x: 40 → 0` (direction selon avance/recul), `.35s` ease-out-expo.

## Étape 1 — L'événement
- SegmentedTabs type : `Match · Entraînement · Tournoi · Autre` (icônes). Le choix colore le wizard (accent pitch / sun / lime).
- Champs : Titre (pré-rempli intelligent : « Match U13 A vs … ») · Équipe (select avec avatar-groupe) · Date + heure (date-fns fr, calendrier custom radius `20`) · Lieu (input avec icône MapPin + suggestions « Stade Jean-Bouin ») · Rendez-vous (optionnel, chip horaire « -1 h avant ») · Note aux joueurs (textarea courte, placeholder « Apportez les gilets verts »).
- **Animation** : champs stagger `.05s` à l'entrée de l'étape. Sélection de type : le segmented glisse + la carte d'aperçu latérale se teinte.

## Étape 2 — Les destinataires
- « Toute l'équipe U13 A (18) » pré-cochée (switch large) ; détail repliable : liste des membres avec checkboxes rondes et leur chip opt-in. Les non opt-in : désactivés + mention « recevra par email » (chip gris) — **pédagogie indépendance au canal**.
- Compteur en bas : « 16 joueurs recevront un WhatsApp · 2 recevront un email ».
- **Animation** : checkboxes pop spring ; le compteur se met à jour avec un flash discret.

## Étape 3 — Le message (aperçu WhatsApp en direct)
- **Écran partagé** : à gauche le formulaire d'options (switches : « Ajouter la carte du lieu », « Activer la relance auto J-7 » `sun` (badge Premium), « Activer la relance J-1 ») ; à droite un **mockup téléphone live** qui affiche la bulle exactement telle qu'elle partira :
  > « ⚽ **Convocation — Match U13 A vs FC Montreuil**
  > Samedi 14 juin · 14 h 30
  > Stade Jean-Bouin, Verrières
  > Tu viens ? Réponds en un tap 👇 »
  > + boutons `Présent` `Absent` `Peut-être` + footer coches.
  (rendre les ⚽/👇 avec icônes Lucide inline)
- L'aperçu **se met à jour à chaque frappe** (rebond 300 ms) : nouvelle ligne = la bulle grandit avec spring.
- CTA final : bouton géant `wa` « Envoyer sur WhatsApp — 16 joueurs » + sous-texte « Relance auto J-1 activée · Les 2 non opt-in recevront un email ».

**Séquence d'envoi** : clic → le bouton devient compte à rebours « 3… 2… 1… » clin d'œil (annulable, `small` « Annuler ») → la bulle **s'envole littéralement** du formulaire vers le téléphone (Framer Motion : `x/y/scale` `.5s`) → coches `✓ → ✓✓` dans l'aperçu → confettis → écran de succès : grande coche lime animée (stroke draw) + « Convocation envoyée à 18 joueurs ! » + « Les réponses arrivent déjà — on vous prévient. » + CTA « Voir les réponses en direct » (→ détail B) / « Retour à la liste ».

- **Animation succès** : coche `stroke-dashoffset` `.5s`, cercle `scale 0 → 1` spring, confettis 100 particules. Les premières « réponses » simulées arrivent après 5–10 s sur la page de détail.

---

## Interactions récapitulatives
- Morph liste → détail (bloc date `layoutId`).
- Board RSVP vivant : déplacements de cartes inter-colonnes, toasts, célébration 100 %.
- Relances individuelles et globales avec feedback (spinner → chip « Relancé »).
- Wizard 3 étapes avec aperçu WhatsApp temps réel, séquence d'envoi théâtrale mais rapide (< 4 s).
- Brouillons : sauvegarde auto à chaque étape (chip « Brouillon enregistré à 14 h 32 » dans la liste).

## États
- Événement annulé : bandeau `coral/10` « Événement annulé — les joueurs ont été prévenus sur WhatsApp ».
- Canal déconnecté : bouton d'envoi désactivé + tooltip « Reconnectez WhatsApp dans Paramètres » (la convocation peut être enregistrée en brouillon).
- Empty : `empty-events.svg`.

## Assets utilisés
`empty-events.svg`, `celebration.png` (moment 100 %). Téléphone et bulles en code.
