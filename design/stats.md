# Page — Statistiques (`/app/statistiques`)

**Objectif** : transformer des données en **fierté de coach**. Des chiffres simples, vivants, et orientés action (« qui relancer ? »), pas un dashboard d'analyste. Ton complice : « Regarde comme ton équipe répond vite. »

**Layout** : App Shell. Header : `title-1` « Statistiques » + filtres à droite : select période `8 dernières semaines` (options : 4 sem / 8 sem / Saison) + select équipe `Toutes les équipes`. Les deux filtres re-animent tous les graphiques (transition de données `.5s`).

---

## 1. Rangée KPI (4 StatCards — grille 2×2 mobile / 4 col desktop)

1. **Taux de réponse moyen** — `86 %` · delta `+12 %` pitch · sparkline 8 points.
2. **Réponses sous 24 h** — `92 %` · delta `+8 %` pitch.
3. **Délai médian de réponse** — `42 min` · delta `-18 min` pitch + sous-texte « de mieux en mieux ».
4. **Présences confirmées (période)** — `47` · delta `+5` pitch.

- **Animation** : stagger `.08s`, `y: 20 → 0` ; count-up `1.2s` ; sparklines tracées `.8s`. Changement de filtre : les chiffres roulent (compteur de l'ancienne à la nouvelle valeur, `.6s`).

## 2. Graphique vedette — « Taux de réponse, semaine par semaine »

**Layout** : grande carte blanche radius `24`, padding `28`. En-tête : titre `title-3` « Vos équipes répondent de mieux en mieux » + légende (dots pitch / sun / gris : U13 A / U15 / Seniors B).

**Chart** (Recharts AreaChart custom) : 3 séries empilées en aires douces — U13 A : fill `pitch` gradient vers `pitch/5`, trait `pitch 2.5 px` ; U15 : `sun` ; Seniors B : `ink/30` dashed. Axe X : `S1…S8` (labels courts) ; axe Y : `%`. Grille horizontale `line` uniquement. Tooltip custom (carte blanche radius `14` ombre) : « Semaine 6 · U13 A : 91 % (+4) ». Points actifs avec halo.

- **Animation** : à l'entrée, chaque aire se dessine de gauche à droite (`1.2s` ease-out, stagger `.2s`) avec son point final qui pop. Hover : crosshair vertical doux + tooltip spring. Changement de filtre : morph des courbes `.5s` (Recharts animation).

## 3. Deux colonnes : « Présences par joueur » & « Rapidité de réponse »

**Layout** : grille 2 col desktop, empilé mobile.

### 3a. Présences par joueur (carte blanche)
- Titre : « Qui vient le plus souvent ? » + lien « Tout voir ».
- **Barres horizontales** top 8 joueurs : avatar + nom à gauche, barre `pitch` (hauteur `14 px`, radius pill) avec le pourcentage à droite en tabular-nums : Noé F. 100 % · Yanis B. 94 % · Tom N. 94 % · Hugo L. 89 % · Adam C. 89 % · Enzo R. 83 % · Maël P. 78 % · Raphaël D. 67 %.
- Le premier a une couronne `sun` (icône Crown) qui scintille et un fond `sun/8` sur sa ligne.
- **Animation** : barres se remplissent stagger `.07s` à l'entrée (`scaleX 0 → 1`, origine gauche, `.7s`). Couronne : `wiggle` infini doux (`rotate ±8°, 3s`). Hover ligne : fond `mist`, barre passe `pitch-dark`.

### 3b. Rapidité de réponse (carte blanche)
- Titre : « À quelle vitesse répond votre équipe ? »
- **Histogramme** (BarChart Recharts) : tranches `< 1 h` (34 %) · `1–3 h` (28 %) · `3–12 h` (21 %) · `12–24 h` (9 %) · `> 24 h` (8 %). Barres radius top `8 px`, couleur `pitch` dégradé : plus la tranche est rapide, plus le vert est dense (`pitch` → `pitch/40`). Valeur affichée au-dessus de chaque barre.
- Punchline sous le chart : « Vos joueurs répondent **2× plus vite** que la moyenne des équipes Squadly. » (chip lime).
- **Animation** : barres montent stagger `.09s` (`scaleY`, `.6s` spring). Valeurs en count-up.

## 4. « Le podium de la fiabilité » (carte fun, fond `gradient-pitch`, texte paper)

- 3 colonnes podium : 2ᵉ (Yanis B., 94 %) · **1ᵉʳ (Noé F., 100 %)** surélevé · 3ᵉ (Tom N., 94 %). Marches en `white/10` radius top `12`, hauteurs 80/110/60 px. Avatars 56 px sur chaque marche, médailles (icônes Medal `sun` / silver / bronze — teintes). Confettis lime discrets en boucle lente en fond (canvas, 12 particules max, opacité faible).
- Titre : « Le podium de la fiabilité » + sous-titre « Ces joueurs répondent toujours — dites-leur merci. » + bouton ghost blanc « Envoyer un merci sur WhatsApp » (envoie un message simulé aux 3 : bulle « Bravo pour ta fiabilité ! » dans le fil).
- **Animation** : marches montent `scaleY 0 → 1` spring stagger `.15s`, avatars pop ensuite (spring 420/17), médailles descendent `y: -20 → 0` avec rebond. Confettis continus très discrets.

## 5. Tableau « Par équipe » (comparatif)

- Carte blanche, tableau 3 lignes : équipe (avatar-groupe + nom) · Taux de réponse (mini barre + %) · Délai médian · Messages envoyés · Tendance (mini flèche `↗ +4 %` pitch / `↘ -2 %` coral — rendre avec icônes TrendingUp/Down).
- U13 A : 89 % · 38 min · 96 · ↗ +4 %
- U15 : 76 % · 1 h 12 · 72 · ↗ +6 %
- Seniors B : 81 % · 55 min · 144 · ↘ -2 %
- **Animation** : lignes stagger `.07s` ; mini barres remplissent à l'entrée.

## 6. Pied : export & pédagogie

- Bandeau `mist` : icône Download + « Besoin de ces chiffres pour le bureau du club ? » + bouton ghost « Exporter en CSV » (télécharge un vrai CSV généré côté client depuis les données de démo — feedback toast « Export téléchargé »).
- Note `small ink-faint` : « Statistiques calculées sur les réponses WhatsApp et in-app. Mode démo : données simulées. »

## Interactions récapitulatives
- Filtres période/équipe qui re-animent tous les charts.
- Tooltips riches au hover (desktop) / tap (mobile).
- Bouton « merci » du podium qui écrit réellement dans le fil WhatsApp (données partagées).
- Export CSV fonctionnel.

## Assets utilisés
Aucun — tout est en code (Recharts + SVG). Confettis canvas discrets sur le podium.

## Notes
- Mobile : les charts gardent une hauteur min `220 px`, scroll vertical naturel de la page, tooltips au tap.
- `prefers-reduced-motion` : bars/charts apparaissent sans animation de tracé.
