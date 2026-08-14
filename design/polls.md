# Page — Sondages WhatsApp (`/app/sondages`)

**Objectif** : montrer que Squadly remplace aussi les « sondages à 47 messages » du groupe WhatsApp. Création en 20 secondes, votes dans WhatsApp, résultats en barres de progression vivantes.

**Layout** : App Shell. Header : `title-1` « Sondages » + bouton `＋ Nouveau sondage` (primary). SegmentedTabs : `Ouverts (1) · Clôturés (3)`.

---

## 1. Cartes de sondages (grille 1 col mobile / 2 col desktop)

**Carte sondage** (blanche, radius `24`, padding `24`)
- **En-tête** : chip statut — `Ouvert` (dot vert pulsant + « se clôture dans 2 j ») ou `Clôturé` (gris) — + chip équipe « U13 A » + menu `⋯` (Clôturer, Relancer les non-votants, Supprimer).
- **Question** Bricolage 20 px : « Covoiturage pour le match de samedi ? »
- **Options avec résultats** — le cœur visuel. Chaque option : ligne avec label `body-strong` + compteur de votes à droite, sous laquelle une **ProgressBar** (hauteur `10 px`, fond `mist`, fill `pitch` ; l'option gagnante en `pitch` plein, les autres en `pitch/50`). Le gagnant porte une chip `lime` « En tête ».
  - « Je conduis (4 places) » — 6 votes — 33 %
  - « Je cherche une place » — 5 votes — 28 %
  - « Pas besoin » — 7 votes — 39 % ← En tête
- **Pied** : AvatarStack des votants + « 18 votes sur 18 membres » + lien « Voir qui a voté → » (expand : liste nominative avec heure du vote, repliable animé) + bouton ghost wa « Relancer les 5 non-votants ».

**Sondages affichés**
1. « Covoiturage pour le match de samedi ? » — Ouvert, 18 votes (ci-dessus).
2. « Quelle date pour le goûter de fin de saison ? » — Clôturé, 21 votes, gagnant « Sam. 21 juin » (55 %) — badge `sun` « Résultat : Sam. 21 juin » épinglé en haut de carte.
3. « On commande les nouveaux maillots ? » — Clôturé, 16 votes (« Oui » 81 %).

- **Animation** : cartes stagger `.09s`, `y: 24 → 0`. Les barres se remplissent à l'entrée (`.9s` ease-out, stagger `.12s`, trigger 20 %) avec les pourcentages en count-up. **Votes simulés en direct** (sondage ouvert) : toutes les 25–45 s un vote arrive — la barre concernée grandit avec un flash `lime 300 ms`, le compteur pop, l'avatar du votant apparaît dans la stack. Expand « Voir qui a voté » : hauteur animée `.35s`. Hover carte : `y: -4`.
- **Empty state** : `empty-polls.svg` + « Aucun sondage pour l'instant » + « Posez votre première question — les réponses arrivent dans WhatsApp. » + CTA.

---

## 2. Modale « Nouveau sondage »

Pleine page mobile / modale `760 px` desktop. Deux colonnes desktop : formulaire à gauche, **aperçu téléphone live** à droite (même principe que le wizard convocation — cohérence).

**Formulaire**
- Question : input large, placeholder « Ex. Covoiturage pour le match de samedi ? » — compteur 120 caractères.
- Options : liste de 2 inputs minimum, `＋ Ajouter une option` (max 6). Chaque ligne : poignée de drag (`GripVertical`) + input + bouton `×` (dès 3 options). **Réordonnancement au drag** avec `layout` spring.
- Équipe (select) · Clôture automatique (select « Dans 3 jours ») · Switch « Votes anonymes » · Switch « Relance auto aux non-votants à J-1 » (badge Premium `sun`).
- CTA : « Envoyer le sondage sur WhatsApp » (wa) + compteur « 18 membres ».

**Aperçu live** : bulle sortante :
> « 📊 **Sondage — Covoiturage pour le match de samedi ?**
> 1️⃣ Je conduis (4 places)
> 2️⃣ Je cherche une place
> 3️⃣ Pas besoin
> Réponds avec le numéro de ton choix ! »
(rendre avec icônes/typographie, pas d'emojis bruts) — mise à jour à chaque frappe (rebond 300 ms), les options numérotées se réordonnent en direct quand on drag le formulaire (mirroring animé).

- **Animation** : modale `scale .95 → 1, .35s`. Options : ajout = slide-in `x: -12 → 0` ; suppression = `scale .9 → 0`. Envoi : même chorégraphie que la convocation (compte à rebours 3-2-1 annulable, bulle qui s'envole, confettis) → le sondage apparaît en tête de liste avec flash `mist` + toast « Sondage envoyé à 18 membres ».

---

## 3. Détail / expand d'un sondage clôturé

- Bandeau résultat : « Résultat : **Sam. 21 juin** — 55 % des votes » + bouton « Convertir en événement » (ghost pitch → pré-remplit le wizard convocation avec la date gagnante : **boucle produit intelligente**, le montrer).
- Liste nominative des votes : avatar + nom + choix (chip coloré) + « il y a 3 j ». Tri par option.
- **Animation** : conversion en événement : le bandeau se transforme (`layoutId` sur la date) en carte événement miniature qui glisse vers le haut + toast « Événement créé en brouillon ».

---

## Interactions récapitulatives
- Barres animées + votes temps réel simulés.
- Drag-to-reorder des options (avec miroir dans l'aperçu WhatsApp).
- Relances non-votants (spinner → chips « Relancé »).
- Conversion sondage → événement (morph animée).
- Aperçu téléphone live synchronisé à la frappe.

## Assets utilisés
`empty-polls.svg`. Téléphone/bulles en code.

## Notes
- Ton des textes : utilitaire et complice (« fini les "+1" qui se perdent »).
- Le sondage ouvert affiche toujours son état WhatsApp : ligne `small` « Envoyé à 18 · 16 lus · 18 réponses » avec StatusTicks.
