# Page — Tableau de bord coach (`/app`)

**Objectif** : en un coup d'œil, le coach sait *ce qui l'attend* (prochaine convocation), *qui n'a pas répondu* (alerte + relance en 1 tap) et *que tout roule* (canal WhatsApp OK). C'est la page d'atterrissage après login — elle doit donner le sourire et donner envie de cliquer.

**Layout global** : App Shell (`design.md` §7.3). Contenu : colonne unique max `1080 px`, padding `20 px` mobile / `32 px` desktop. Fond `paper`. Bannière démo dismissible en haut. Header sticky compact au scroll.

---

## 1. Header de page

- Salutation : « Salut Karim 👋 » → rendre sans emoji : « Salut Karim » + icône main (Lucide `Hand`) `sun`. `title-1` Bricolage. Sous-titre `small ink-soft` : « Samedi 14 juin · Match dans 2 jours — tout est sous contrôle. » (date du jour réelle, phrase contextuelle selon la donnée).
- À droite (desktop) : ChannelHealth pill « WhatsApp connecté · il y a 2 min » (dot vert pulsant) + bouton `＋ Nouvelle convocation` (primary pill). Mobile : le bouton est le FAB central de la tab bar ; le statut canal devient un dot dans la top bar.
- **Animation** : titre `y: 16 → 0, opacity, .5s`. Le texte contextuel apparaît `.15s` après. Dot canal : pulse `scale 1 → 1.4, opacity .7 → 0, 2s` infini.

---

## 2. Actions rapides (mobile-first : la rangée du pouce)

**Layout** : 4 tuiles horizontales scrollables mobile (snap), grille 4 col desktop. Tuile : carte blanche radius `20`, icône dans pastille colorée + label `body-strong 14 px`.
1. **Nouvelle convocation** — icône `Send`, pastille `pitch/12` → ouvre le wizard (`events.md` §5).
2. **Nouveau sondage** — icône `BarChart3`, pastille `sun/20` → modale sondage (`polls.md` §4).
3. **Relancer les sans-réponse** — icône `BellRing`, pastille `coral/12`, badge compteur « 3 » → action immédiate avec confirmation (voir §4).
4. **Message rapide** — icône `MessageCircle`, pastille `mist` → composer WhatsApp (`messages.md` §5).

- **Animation** : stagger `0.06s`, `y: 16 → 0`, trigger immédiat. Hover : `y: -3` + pastille qui tourne `rotate -6°` spring. Tap mobile : `scale .96`.

---

## 3. Carte « Prochaine convocation » (la vedette)

**Layout** : grande carte `28 px` radius, fond `gradient-pitch`, texte `paper`, ombre `shadow-lift`. Contenu en 2 zones (empilées mobile) :

**Zone gauche — l'événement**
- Chip type : pill `white/15` « ⚽ Match » (icône `Trophy` lime) + chip « U13 A ».
- Titre Bricolage 24 px : « U13 A vs FC Montreuil ».
- Méta `paper/80` : « Sam. 14 juin · 14 h 30 · Stade Jean-Bouin, Verrières » (icônes Calendar, Clock, MapPin).
- Compte à rebours : « Départ dans **2 j 4 h** » — chiffres Bricolage lime `stat-big` en tabular-nums, tick chaque minute.

**Zone droite — les réponses en direct**
- Anneau de progression RSVP (SVG, `stroke-dasharray` animé) : segments `Présents 12 (pitch→lime)`, `Peut-être 2 (sun)`, `Absent 1 (coral)`, `Sans réponse 3 (white/20)`. Centre : « **12/18** » Bricolage 800 + « confirmés ».
- Légende en 4 chips RSVP (design.md §7.4) + AvatarStack des présents.
- Mention live : dot lime pulsant + « Temps réel — dernière réponse il y a 3 min ».
- CTA ghost blanc : « Voir le détail → » (vers `events.md` détail).

**Comportement temps réel simulé** : toutes les 20–40 s, une réponse « arrive » (un sans-réponse devient Présent) : l'anneau s'anime, le compteur incrémente avec un pop spring, l'avatar apparaît dans la stack, la mention live se met à jour.

- **Animation** : entrée carte `y: 24 → 0, .6s`. L'anneau se dessine à l'entrée (`1.2s` ease-out, delay `.3s`). Compte à rebours : les chiffres changent avec un `y` flip discret. À chaque réponse entrante : halo lime `300 ms` sur l'anneau + toast discret « Yanis B. a répondu : Présent ✓ ».

---

## 4. Alerte « Sans réponse » + relance en 1 tap

**Layout** : carte blanche bordure `sun/40`, fond `sun/6` (tint très léger). En-tête : icône `BellRing sun` + « **3 joueurs n'ont pas répondu** » (body-strong) + sous-texte « La relance automatique part demain à 18 h — ou envoyez-la maintenant. »

- Liste compacte : 3 lignes (avatar + nom + « Convoqué il y a 3 j »), chacune avec son chip « Sans réponse ».
- CTA à droite : bouton `sun` « Relancer maintenant » (icône Send).
- **Interaction** : au clic → le bouton devient un spinner `1.2s`, puis les 3 chips passent de « Sans réponse » à « Relancé » (pill `mist`, icône CheckCheck) avec stagger `.2s`, toast « Relance envoyée à 3 joueurs 🎉 » (rendre : icône PartyPopper au lieu d'emoji) + mini confettis (60 particules lime/pitch). La carte se replie ensuite en une ligne « Relances envoyées aujourd'hui à 14 h 32 ✓ ».

- **Animation** : entrée `y: 20 → 0, .5s, delay .2s`. Bordure sun : respiration très douce (`opacity .4 → .6, 4s`). Transition des chips : flip couleur `.3s`.

---

## 5. Rangée de statistiques (4 StatCards)

**Layout** : grille 2×2 mobile, 4 col desktop. Chaque StatCard (design.md §7.4) :
1. **Taux de réponse moyen** — `86 %` · delta `+12 %` (pitch) · sparkline 8 semaines.
2. **Présences confirmées (7 j)** — `47` · delta `+5` · sparkline.
3. **Messages envoyés (mois)** — `312` · sous-texte « quota 1 000 — plan Premium » · mini ProgressBar.
4. **Délai médian de réponse** — `42 min` · delta `-18 min` (pitch, « de mieux en mieux »).

- **Animation** : stagger `.08s`, entrée `y: 20 → 0`. Count-up des chiffres `1.2s`. Sparklines : tracé `stroke-dashoffset` `.8s` delay `.4s`. Hover : `y: -3` + delta chip qui pop.

---

## 6. Deux colonnes : « À venir » & « Dernier sondage »

**Layout** : grille 2 col desktop, empilé mobile.

### 6a. Prochains événements (carte blanche)
- En-tête : « À venir » `title-3` + lien « Tout voir → » (`small pitch`).
- 3 lignes compactes : bloc date (carré `mist` radius `12`, « 14 » Bricolage 700 / « JUIN » label) + titre + heure/lieu + mini barre RSVP multi-segments + « 12/18 ».
  - Sam. 14 — Match U13 A vs FC Montreuil — 12/18
  - Dim. 15 — Match Seniors B vs AS Choisy — 15/22
  - Mar. 17 — Entraînement U13 — convocation non envoyée (chip « Brouillon » dashed)
- Tap ligne → détail événement.
- **Animation** : lignes stagger `.07s`, `x: -12 → 0`. Hover ligne : fond `mist` radius `12`, `.2s`.

### 6b. Dernier sondage (carte blanche)
- En-tête : chip « Sondage ouvert » (dot vert pulsant) + « il y a 2 j ».
- Question `body-strong` : « Covoiturage pour le match de samedi ? »
- 3 options avec ProgressBar animées : « Je conduis (4 places) — 6 » · « Je cherche une place — 5 » · « Pas besoin — 7 » + total « 18 votes ».
- CTA ghost « Voir les sondages → ».
- **Animation** : barres se remplissent `.8s` stagger `.15s` à l'entrée. Compteur votes count-up.

---

## 7. Widget « Canal WhatsApp »

**Layout** : carte horizontale compacte fond `mist`. Gauche : glyphe WhatsApp dans pastille `wa/15`. Centre : « Canal WhatsApp » body-strong + « +33 6 12 34 56 78 · Connecté · session saine » `small ink-soft`. Droite : ChannelHealth dot + chevron « Gérer » (→ `settings.md` §3).

- État alternatif (si déconnecté, toggleable dans Paramètres) : fond `coral/8`, « Déconnecté » + bouton coral « Reconnecter » + bannière globale (App Shell).
- **Animation** : entrée `y: 16 → 0, .5s, delay .3s`. Dot : pulse infini. Hover : chevron translate `4 px`.

---

## 8. Pied de page app

- Ligne centrée `small ink-faint` : « Squadly pour AS Verrières Football · Plan Premium · Mode démo — les messages sont simulés ».
- **Animation** : fade `.4s, delay .5s`.

---

## États & données
- **Données** : voir `design.md` §8 (événement vedette : Match U13 A vs FC Montreuil).
- **Skeleton** : cartes en shimmer `mist` pendant 600 ms au premier chargement (simulation réseau).
- **Vide (nouvelle organisation)** : la carte §3 devient un EmptyState (`empty-events.svg`) : « Aucune convocation prévue — envoyez la première en 30 secondes » + CTA.
- **Temps réel simulé** : boucle d'événements entrants (intervalle 20–40 s, jitter), pausée quand l'onglet est inactif. Maximum 1 toast simultané.

## Interactions récapitulatives
- Tap « Relancer maintenant » → flow §4 (spinner → chips → confettis → toast).
- Tap carte vedette / ligne événement → `/app/convocations/[id]`.
- Tap tuile action rapide → wizard/modale correspondante.
- Bannière démo dismissible (persisté en local).
- Toutes les cartes cliquables : `cursor-pointer`, hover lift, tap `scale .98`.

## Assets utilisés
`empty-events.svg` (état vide). Le reste est construit en code (anneau SVG, sparklines, chips).
