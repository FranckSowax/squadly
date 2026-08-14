# Page — Équipes & Membres (`/app/equipes`)

**Objectif** : gérer les équipes du club et leurs membres (joueurs/parents), avec en vedette le **statut opt-in WhatsApp** de chacun — c'est la clé du produit. Une page, deux niveaux : vue « équipes » (cartes) et vue « effectif » (roster de l'équipe sélectionnée).

**Layout** : App Shell. Header : `title-1` « Équipes » + bouton `＋ Nouvelle équipe` (primary). SegmentedTabs sticky sous le header : `[Équipes] [Membres]` — « Membres » = vue consolidée tous effectifs confondus (plan Club).

---

## 1. Onglet « Équipes » — cartes d'équipes

**Layout** : grille 1 col mobile / 2 col desktop de grandes cartes blanches radius `24`. Chaque carte :

- **En-tête** : avatar-groupe (carré radius `16`, initiales de l'équipe « U13 » sur fond pastel déterministe + icône sport) + nom Bricolage 20 px « U13 A » + chip coach « Coach : Karim H. »
- **Stats en 3 colonnes** séparées par des filets `line` : `18` joueurs · `89 %` réponses · `12` parents liés (chiffres Bricolage 700, labels `small ink-faint`).
- **Prochain événement** : bandeau `mist` radius `14` : « Sam. 14 juin · vs FC Montreuil » + mini barre RSVP + « 12/18 ».
- **Pied** : bouton ghost « Voir l'effectif » + menu `⋯` (Renommer, Archiver).

**Cartes affichées** : U13 A (89 %), U15 (76 %), Seniors B (81 %) + **carte « Nouvelle équipe »** en dashed `ink/20` avec icône `＋` centrée et « Créer une équipe » — hover : bordure devient `pitch`, icône tourne `90°`.

- **Animation** : stagger `.09s`, `y: 24 → 0, scale .98 → 1`. Hover carte : `y: -4, shadow-lift`. Tap « Voir l'effectif » : transition partagée — l'avatar-groupe se morph (Framer `layoutId`) vers l'en-tête de la vue roster (§2). La carte dashed : hover avec dash animé (`stroke-dashoffset`).

---

## 2. Vue « Effectif » (roster d'une équipe)

Déclenchée par « Voir l'effectif » — navigation interne `/app/equipes/u13-a` (retour par bouton `← Équipes`).

### 2.1 En-tête équipe
- Avatar-groupe + « U13 A » `title-1` + méta : « 18 joueurs · 12 parents · créée en sept. 2023 ».
- À droite : `＋ Ajouter un membre` (primary) + `Inviter via WhatsApp` (bouton `wa`, glyphe WhatsApp) — ouvre la modale d'invitation (§4).
- Barre de santé de l'équipe : ProgressBar multi-segments « 16 membres joignables sur WhatsApp » + chips : « 16 opt-in ✓ » / « 2 à inviter » (chip coral-soft).

### 2.2 Filtres
- SegmentedTabs : `Tous (30) · Joueurs (18) · Parents (12)` + champ recherche (icône Search, radius pill, « Rechercher un membre… ») + filtre select « Tri : Prénom ».
- **Animation** : indicateur de tab glisse (`layoutId`, spring). Recherche : les lignes filtrent avec `layout` animation (déplacement fluide `.3s`).

### 2.3 Liste des membres
**Desktop** : tableau stylé (shadcn Table) — colonnes : Membre (avatar + nom + poste) · Rôle · WhatsApp · Réponses · Actions.
**Mobile** : cartes lignes (même contenu, empilé).

**Contenu d'une ligne**
- Avatar (initiales pastel) + **Yanis Belkacem** + sous-texte « Attaquant · N°9 ».
- Rôle : chip `Joueur` (mist) / `Parent` (sun/20) ; si parent lié : sous-texte « → parent de Noé F. ».
- WhatsApp : **la colonne vedette** —
  - `✓ Opt-in` (chip pitch, icône Check) + numéro masqué `06 •• •• 45 21`
  - `À inviter` (chip coral-soft, icône Clock) + bouton compact « Inviter » (wa ghost)
- Réponses : mini barre + « 94 % » (pitch) — hover : tooltip « 17 réponses sur 18 convocations ».
- Actions `⋯` : Modifier, Lier un parent, Désactiver.

**Membres affichés (échantillon)** : Yanis Belkacem (94 %), Noé Fontaine (100 %, gardien), Enzo Ricci (83 %), Adam Cherif (89 %), Lucas Perrot (72 %), Tom Nguyen (94 %), Raphaël Diallo (67 %), Hugo Lainé (89 %), puis section « Parents » : Samira Belkacem (parent de Yanis, opt-in ✓), Claire Fontaine (parent de Noé), Marc Ricci (`À inviter`)…

- **Animation** : lignes stagger `.05s`, `opacity + x: -8 → 0`. Le chip « À inviter » pulse doucement (respiration opacité `4s`) pour attirer l'œil. Tap « Inviter » : le chip devient « Invitation envoyée ✓ » (flip couleur `.3s`) + toast « Invitation WhatsApp envoyée à Marc R. ».

### 2.4 Empty states
- Équipe vide : `empty-teams.svg` + « Aucun membre pour l'instant » + « Ajoutez vos joueurs un par un, ou invitez-les par WhatsApp — ils rempliront leur fiche eux-mêmes. » + 2 CTA.

---

## 3. Drawer « Ajouter / Modifier un membre »

Bottom sheet mobile / panneau droit `420 px` desktop (slide-in spring).

- Titre : « Nouveau membre ». Sous-titre pédagogue : « Il recevra ses convocations sur WhatsApp — avec son accord, bien sûr. »
- Champs : Prénom + Nom · Rôle (SegmentedTabs Joueur/Parent) · Poste (select, visible si Joueur) · N° maillot (input compact) · Téléphone WhatsApp (input avec préfixe `+33`, icône wa) · Checkbox « Le membre (ou son parent) accepte de recevoir les messages du club sur WhatsApp » (obligatoire, texte opt-in explicite) · Si rôle Parent : select « Enfant lié » (liste des joueurs).
- Aperçu en direct : mini carte du membre qui se remplit en haut du drawer (avatar initiales qui apparaissent dès la saisie du prénom — petit pop).
- CTA : « Ajouter le membre » (primary, désactivé tant que le formulaire est incomplet) + « Ajouter et inviter sur WhatsApp » (wa).

- **Animation** : sheet slide `y/spring 320/26`. L'aperçu : chaque champ rempli fait pop l'élément correspondant. Soumission : bouton spinner `1s` → succès : la sheet se ferme, la nouvelle ligne apparaît dans la liste avec un flash `mist` (`background .6s`) et l'avatar pop (spring 420/17) + toast.

---

## 4. Modale « Inviter via WhatsApp »

- Icône wa grande + titre « Invitez vos joueurs en un message ».
- Explication : « Squadly envoie un message WhatsApp avec un lien magique. Le joueur (ou son parent) confirme son opt-in en un tap. »
- Liste de sélection : membres « À inviter » pré-cochés (checkboxes rondes animées) + « Sélectionner tout ».
- **Aperçu du message** : vraie WhatsAppBubble sortante : « Salut Marc ! Karim (AS Verrières U13) utilise Squadly pour les convocations. Reçois-les directement ici sur WhatsApp : 👉 squadly.app/j/… » (rendre sans emoji : icône lien) + coches `✓`.
- CTA : « Envoyer 1 invitation » (wa, compteur dynamique).

- **Animation** : modale `scale .94 → 1, opacity, .35s`. La bulle d'aperçu : entrée `y: 12 → 0, delay .2s`, coches qui s'animent en boucle douce. Envoi : spinner → confettis légers → la modale se referme, les chips passent à « Invitation envoyée ».

---

## 5. Onglet « Membres » (vue consolidée club)

- Même liste que §2.3 avec une colonne supplémentaire « Équipe » (chip avec avatar-groupe mini) et filtre par équipe.
- Bandeau informatif plan Club : « Vue consolidée multi-équipes — incluse dans le plan Club » + CTA ghost « Découvrir Club » (si plan Premium : la liste reste visible mais limitée aux équipes du coach connecté, badge `sun` sur le bandeau).

---

## Interactions récapitulatives
- Morph carte → roster (`layoutId` sur l'avatar-groupe).
- Recherche + filtres avec animations `layout`.
- Invitations WhatsApp individuelles et groupées (chips animés, toasts, bulle d'aperçu vivante).
- Drawer membre avec aperçu en direct.
- Empty states illustrés.

## Assets utilisés
`empty-teams.svg`. Avatars : initiales générées en code (pastels déterministes).

## Accessibilité & détails
- Table desktop : `th` sticky, tri par colonne (flèche animée rotate).
- Numéros masqués par défaut (vie privée), révélation au hover avec icône Eye.
- Toutes les confirmations d'envoi utilisent le vocabulaire opt-in (« accepte de recevoir ») — ton pédagogue, jamais juridique lourd.
