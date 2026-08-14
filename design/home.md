# Page — Landing marketing (`/`)

**Objectif** : convertir un coach bénévole en essai gratuit en < 60 secondes de scroll. Prouver la promesse (« convocation en 30 s, réponses comptées automatiquement ») par une **démo produit vivante** intégrée à la page — pas de vidéo, du vrai UI animé.

**Scroll global** : Lenis actif. GSAP ScrollTrigger pour la section épinglée (4.3). Les autres sections utilisent Framer Motion `whileInView`.

---

## 1. Navbar
Voir `design.md` §7.1. État initial : transparent sur le hero sombre (texte `paper`), après scroll : fond `paper/90` blur (texte `ink`). Le CTA « Essayer gratuitement » reste visible en permanence.

- **Animation** : la navbar glisse `y: -80 → 0` au chargement (`.6s`, delay `.2s`). Au scroll > 24 px : transition fond + ombre `.3s`. Souligné lime des liens : glisse entre les items via `layoutId` (spring 320/26).

---

## 2. Hero — « La promesse »

**Layout** : fond `pine` plein viewport (min `100 svh`), motif `pattern-field.svg` en filigrane + halo radial `lime` (8 %) derrière le téléphone. Grille desktop 2 colonnes (55/45), mobile : texte puis téléphone centré.

**Contenu (colonne gauche)**
- Badge pill `pine-800` bordure `lime/30` : « ⚡ Nouveau — relances automatiques J-1 » (icône Zap lime, pas d'emoji : rendre l'icône Lucide).
- H1 `display-hero`, `paper` : « La convocation envoyée en **30 secondes**. » — le mot « **30 secondes** » est surligné d'un trait de marqueur `lime` (SVG stroke animé) et le chiffre « 30 » est en Bricolage 800 lime.
- Sous-titre `body` 18 px, `paper/80` : « Squadly envoie vos convocations, sondages et rappels directement dans WhatsApp. Vos joueurs répondent en un tap — vous, vous regardez les réponses remonter tout seuls. »
- CTAs : `Essayer gratuitement` (pill `pitch` lg, flèche) + `Voir la démo` (ghost, icône Play dans un cercle `lime/20`) — scroll vers §4.
- Micro-preuve : « Gratuit pour 1 équipe · Sans carte bancaire · 2 min pour démarrer » (`small`, `paper/60`, séparés par des dots).
- Rangée de mini-stats : `86 %` de réponses sous 24 h · `30 s` par convocation · `0` appli à installer pour les joueurs — chiffres Bricolage lime, labels `small paper/60`.

**Contenu (colonne droite) — le téléphone vivant**
- Mockup iPhone construit en code (coque `ink`, encoche, fond d'écran `sand` + doodles). À l'intérieur, une **conversation WhatsApp simulée qui se joue en boucle** :
  1. Bulle sortante (coach via Squadly) : « ⚽ Convocation — Match U13 A vs FC Montreuil. Sam. 14 juin, 14 h 30, Stade Jean-Bouin. Tu viens ? » + 3 boutons factices.
  2. Les coches passent `✓ → ✓✓ → ✓✓ bleu`.
  3. Réponses entrantes qui arrivent une à une : « Yanis : Présent », « Samira (maman de Noé) : Présent », « Enzo : Peut-être »…
- Autour du téléphone, 3 chips flottantes (glass `white/10` blur, bordure `white/15`) connectées par de fines lignes pointillées animées : « 12 présents ✓ » · « Relance auto J-1 activée » · « Réponse moyenne : 42 min ».
- La boucle dure ~12 s puis se rejoue avec un léger `fade`. Un compteur en haut du téléphone (« Réponses : 3 → 4 → 5… ») incrémente en sync.

- **Animation** : H1 en mots (word-level split), `y: 30 → 0, opacity, stagger .08s, ease-out-expo, delay .3s`. Le surlignage lime se dessine après le titre (stroke-dashoffset, `.6s`, delay `1s`). Sous-titre + CTAs : fade `y: 20`, delay `.8s`, stagger `.1s`. Téléphone : entre par la droite `x: 60 → 0, rotate: 4° → 0°, spring 200/20, delay .5s`, puis **flottement continu** `y: ±8 px, 5s, ease-in-out`. Chips flottantes : pop staggered `scale 0 → 1` (spring 420/17, delay `1.2s`, stagger `.15s`) + flottement désynchronisé. La conversation se joue : chaque bulle `y: 16 → 0, scale .95 → 1, .4s`, coches pulsées à chaque changement. Halo lime : respiration `opacity .06 → .1, 6s`.

---

## 3. Bandeau de confiance

**Layout** : bande `paper` (transition du fond sombre via un arrondi supérieur `32 px` de la section). Une ligne : « Ils coachent avec Squadly » (`label ink-faint`) + 5 logos de clubs fictifs en texte stylisé (`AS Verrières Football`, `FC Montreuil`, `US Choisy Basket`, `RC Villebon Handball`, `Volley Club Orsay`) en `ink/40` Bricolage 600 — pas d'images, juste des wordmarks.

- **Animation** : logos en marquee horizontal infini (défilement `30s` linéaire, pause au hover), opacité `.4 → .7` au hover. Entrée : fade `opacity 0 → 1, .6s, trigger 30 %`.

---

## 4. « Comment ça marche » — démo épinglée (pièce maîtresse)

**Structure** : 3 sous-parties.

### 4.1 Intro (non épinglée)
- `label` pitch : « Comment ça marche ». H2 `display-2` : « Du tableau de bord à WhatsApp, **sans quitter votre poche**. » Sous-titre : « Faites défiler — on vous montre le voyage d'une convocation. »
- **Animation** : titre en mots, stagger `.06s`, trigger 25 %.

### 4.2 Section épinglée (~250 vh) — le voyage d'une convocation en 4 étapes
**Layout** : viewport épinglé. À gauche (desktop) : la liste verticale des 4 étapes (numéro `01–04` Bricolage lime, titre, 1 phrase). À droite : un grand « écran » partagé (carte `28 px` radius, ombre) dont le **contenu se transforme** selon la progression du scroll. Mobile : empilé, l'écran reste sticky en haut (60 vh) et les étapes défilent dessous.

**Les 4 étapes** (progression scroll 0–25 / 25–50 / 50–75 / 75–100 %)
1. **« Vous créez la convocation »** — l'écran montre le mini-formulaire Squadly (Match, date, lieu) qui se remplit tout seul, puis le bouton « Envoyer sur WhatsApp » s'illumine et se « clique » (scale .97 + ripple).
2. **« Squadly l'envoie sur WhatsApp »** — l'écran devient le téléphone : la bulle part, les coches défilent `✓ → ✓✓`. Particules fines qui « voyagent » du dashboard vers le téléphone (chemin SVG animé, tirets).
3. **« Les joueurs répondent en un tap »** — les bulles entrantes poppent (« Présent », « Présent », « Peut-être »), chaque pop accompagné d'un « ding » visuel (halo lime derrière la bulle, 300 ms).
4. **« Les stats se remplissent tout seules »** — l'écran devient le dashboard : les barres de progression RSVP se remplissent (`0 → 67 %` présents), le compteur « 12/18 » monte en count-up, badge « Relance auto envoyée aux 3 sans-réponse » apparaît.

**Indicateur de progression** : colonne de 4 dots à gauche de l'écran (mobile : barre fine en haut), dot actif `pitch` qui grandit `8 → 12 px`, ligne de progression qui se remplit.

- **Animation** : tout est piloté par `ScrollTrigger` scrub (progress 0→1). Transitions entre étapes : l'écran sortant `opacity → 0, y: -20, scale .98` et l'entrant `y: 20 → 0, scale 1` (crossfade `.3` de la plage de scroll). Étapes texte : celle active passe `ink/30 → ink` avec son numéro qui devient lime (`color` tween). Fin de section : unpin, l'écran s'efface en fondu et laisse place à §4.3. Fallback `prefers-reduced-motion` : les 4 étapes s'affichent en cartes empilées statiques.

### 4.3 Bandeau résultat
- Une seule ligne géante centrée sur fond `mist` : « Résultat : **2 h 30 gagnées** chaque semaine. » (« 2 h 30 » en Bricolage 800 `pitch`, count-up au scroll). Sous : « C'est le temps moyen que nos coachs passaient à relancer dans leurs groupes WhatsApp. »
- **Animation** : le chiffre compte de `0:00 → 2:30` (`1.5s`, trigger 40 %), titre slide-up `.6s`.

---

## 5. Fonctionnalités — grille bento

**Layout** : fond `paper`. Header centré : `label` « Fonctionnalités », H2 « Tout ce qu'il faut. **Rien de trop.** », sous-titre « Squadly fait 5 choses, et il les fait très bien. » Grille bento desktop 12 colonnes : 1 grande carte (7 col) + 1 carte (5 col) sur la première rangée, 3 cartes (4 col) sur la seconde. Mobile : pile.

**Cartes** (blanches, radius `24`, padding `28`, hover `lift` + icône qui bouge)
1. **Grande — Convocations WhatsApp** : mini UI intégrée (vraie bulle WhatsAppBubble animée en boucle courte) + titre « Convocations en un tap » + « Envoyez à toute l'équipe en 30 secondes. Les joueurs répondent Présent, Absent ou Peut-être directement dans WhatsApp. »
2. **Relances automatiques** : icône BellRing + timeline visuelle `J-7 → J-1 → Match` avec dots animés. « Squadly relance gentiment les sans-réponse. Vous, vous n'y pensez plus. »
3. **Sondages** : mini barres de progression qui s'animent (covoiturage). « Covoiturage, dates, goûter… décidez ensemble, sans 47 messages. »
4. **Statistiques** : mini sparkline + compteur. « Qui répond vite ? Qui manque souvent ? Vous le savez enfin. »
5. **Zéro installation** : icône Smartphone + coches. « Vos joueurs et les parents restent sur WhatsApp. Rien à installer, rien à expliquer. »

- **Animation** : cartes en stagger `0.08s`, `y: 24 → 0`, trigger 15 %. Les mini-UI internes bouclent en continu (budget : 5 petites animations simultanées max). Hover : `y: -4`, l'icône fait un micro-wiggle (`rotate ±6°, .4s`).

---

## 6. « Pensé pour le banc de touche » — section éditoriale

**Layout** : fond `pine` (motif terrain filigrane). 2 colonnes : `hero-illustration.png` à gauche (cadre arrondi `28 px`, légère rotation `-2°`), texte à droite en `paper`.

**Contenu**
- `label` lime : « Mobile-first ». H2 : « Conçu pour être utilisé **une main dans le dos**, l'autre sur le sifflet. »
- 3 points avec icônes lime : « Actions au pouce » (tout est accessible d'une main) · « Lisible en plein soleil » (contrastes pensés pour le bord du terrain) · « Rapide même en 3G » (léger, sans fioritures qui chargent).
- CTA ghost lime : « Essayer sur mon téléphone ».

- **Animation** : image `clip-path` reveal (inset `12% → 0`, `.8s`, trigger 25 %) + rotation `-4° → -2°`. Texte : stagger lignes `.08s`. Points : icônes pop spring staggered.

---

## 7. Témoignages

**Layout** : fond `paper`. Header : H2 « Des coachs qui ont **raccroché leur sifflet de relance**. » Carrousel de 3 cartes (desktop : 3 colonnes ; mobile : swipe horizontal avec snap + dots).

**Cartes** (blanches, guillemet géant Bricolage lime en filigrane)
1. `avatar-sophie.jpg` — « Avant, je passais mes jeudis soirs à relancer les parents un par un. Maintenant j'envoie, et je regarde les réponses arriver pendant l'apéro. » — **Sophie Marchand**, coach U11, FC Montreuil. Note : 5 étoiles `sun`.
2. `avatar-mehdi.jpg` — « Le truc génial : les parents n'ont rien à installer. Ils répondent sur WhatsApp, moi j'ai mes tableaux. Tout le monde y gagne. » — **Mehdi Kaci**, coach U15, AS Verrières.
3. `avatar-claire.jpg` — « On l'utilise pour le basket, le sondage covoiturage a changé nos déplacements. Simple, rapide, fini. » — **Claire Dubois**, coach basket, BC Orsay.

- **Animation** : entrée stagger `.1s`, `y: 30 → 0`. Hover carte : `y: -6` + étoiles qui scintillent (stagger `scale 1 → 1.2 → 1`, `.3s`). Mobile : cartes `85 vw`, scroll-snap, dot actif animé.

---

## 8. Tarifs (teaser)

**Layout** : fond `mist`. Header centré : `label` « Tarifs », H2 « Gratuit pour démarrer. **Abordable pour grandir.** », sous-titre « Sans engagement. Sans carte pour l'essai. Sans surprise. »

**3 cartes** (même contenu que `pricing.md`, version condensée)
- **Freemium — 0 €** : 1 équipe · 100 messages/mois · convocations & réponses. CTA ghost « Commencer ».
- **Premium — 9 €/mois** (carte mise en avant : fond `gradient-pitch`, texte `paper`, badge `sun` « Le plus choisi », légèrement surélevée `scale 1.04` desktop) : équipes illimitées · relances auto J-7/J-1 · sondages · statistiques. CTA `sun` « Essayer 14 jours gratis ».
- **Club — 29 €/mois** : tout Premium · multi-équipes consolidé · rôles délégués · support prioritaire. CTA ghost « Parler à un humain ».

Lien sous les cartes : « Voir le détail des plans → » (vers `/app/abonnement` en démo, ouvre la page pricing).

- **Animation** : cartes stagger `.12s`, `y: 40 → 0` ; la carte Premium pop avec un spring rebond (delay `.3s`) et un halo `shadow-glow-lime` pulsé doux. Hover : `y: -6` (sauf Premium qui passe `scale 1.06`).

---

## 9. FAQ

**Layout** : fond `paper`, colonne étroite centrée (`720 px`). H2 « Les questions qu'on nous pose **au bord du terrain**. » Accordéon (shadcn, chevron animé) :

1. **Mes joueurs doivent installer quelque chose ?** — Non. Ils reçoivent et répondent directement dans WhatsApp, comme d'habitude. C'est toute la magie de Squadly.
2. **C'est le vrai WhatsApp ?** — Oui, via notre partenaire d'intégration. Dans cette démo, les messages sont simulés pour que vous puissiez tout essayer sans connecter votre numéro.
3. **Et les parents des jeunes joueurs ?** — Un parent peut être lié à son enfant et répondre à sa place. La réponse est tracée : vous savez qui a répondu.
4. **Que se passe-t-il si WhatsApp se déconnecte ?** — Squadly vous alerte immédiatement et garde vos données en sécurité. La reconnexion prend 30 secondes via un QR code.
5. **Puis-je gérer plusieurs équipes ?** — Oui, avec les plans Premium (équipes illimitées) et Club (vue consolidée multi-équipes, délégation aux coachs).
6. **C'est vraiment gratuit ?** — Le plan Freemium l'est, pour toujours : 1 équipe, 100 messages/mois. Parfait pour tester en conditions réelles.

- **Animation** : items stagger `.06s` à l'entrée. Ouverture : hauteur animée `.35s` ease-out-expo + chevron `rotate 180°`. Une seule ouverte à la fois.

---

## 10. CTA final

**Layout** : pleine largeur, fond `gradient-pitch` + motif terrain, arrondis `32 px` (carte géante inset dans la section), `celebration.png` à droite (desktop), centré mobile.

**Contenu** : H2 `paper` « Votre prochaine convocation part dans **30 secondes**. » · sous-titre `paper/80` « Créez votre équipe, envoyez, respirez. » · CTA géant `sun` « Essayer Squadly gratuitement » + micro-preuve « Gratuit · Sans CB · 2 min ».

- **Animation** : la carte entre `scale .96 → 1, opacity, .7s`, trigger 20 %. Titre en mots. L'illustration célébration : `x: 40 → 0` + confettis lime/sun déclenchés à l'entrée dans le viewport (une fois, 120 particules, `.15s` spread). Bouton : pulse doux infini (`scale 1 → 1.03`, `2s`) jusqu'au premier hover.

---

## 11. Footer
Voir `design.md` §7.2. Colonnes : Produit (Fonctionnalités, Tarifs, Sécurité, Feuille de route) · Ressources (Guide du coach débordé, Centre d'aide, Blog, Contact) · Légal (Mentions légales, Confidentialité, CGU). Baseline : « Moins de temps sur WhatsApp, plus de temps sur le terrain. »

- **Animation** : entrée fade bloc `.5s`. Liens : souligné lime glissant au hover. Logo footer : le sifflet du logo fait un micro-wiggle au hover.

---

## Assets utilisés
`logo.svg` · `pattern-field.svg` · `hero-illustration.png` · `avatar-sophie.jpg` · `avatar-mehdi.jpg` · `avatar-claire.jpg` · `celebration.png` — voir manifeste dans `design.md` §11.
