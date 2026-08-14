# Squadly — Design Global

> **Squadly** — le copilote WhatsApp des coachs sportifs. « La convocation envoyée en 30 secondes, les réponses comptées automatiquement. »
> SaaS moderne, friendly, facile d'utilisation. Mobile-first (le coach gère depuis son téléphone au bord du terrain). Toute l'interface est **en français**, ton chaleureux, phrases courtes, tutoiement léger.

---

## 1. Direction créative

**Personnalité** : un coach-adjoint digital sympa et hyper efficace. Énergique mais épuré. Sportif premium sans être corporate. Chaleureux sans être enfantin.

**3 principes directeurs**
1. **Terrain, pas bureau** — couleurs fraîches inspirées du sport (pelouse, lime, soleil), zéro bleu-violet SaaS. On respire le plein air.
2. **Un pouce suffit** — mobile-first réel : grosses zones tactiles (≥ 44 px), actions principales accessibles au pouce, bottom navigation + FAB sur mobile.
3. **La magie WhatsApp visible** — le produit montre en permanence le lien dashboard ↔ WhatsApp : bulles de chat, statuts de message (✓✓), réponses qui arrivent en temps réel. C'est la démo vivante du produit.

**Anti-références** : pas de gradient indigo/violet, pas d'illustrations corporate « gens autour d'un tableau », pas de coins à 4 px, pas de jargon (« workflow », « KPI dashboard »).

---

## 2. Palette de couleurs

| Token | Hex | Usage |
|---|---|---|
| `pine` | `#0C2B1C` | Fond hero landing, footer, surfaces sombres. Vert pin très profond, presque noir. |
| `pine-800` | `#123A28` | Surfaces sombres secondaires, cartes sur fond pine. |
| `pitch` | `#16A34A` | **Couleur primaire** — boutons, liens actifs, indicateurs « Présent », éléments de marque. Vert pelouse. |
| `pitch-dark` | `#15803D` | Hover/pressed de la primaire. |
| `lime` | `#A3E635` | **Accent joyeux** — surbrillances, soulignés animés, badges « Nouveau », glow sur fond sombre, confettis. |
| `sun` | `#FFC53D` | Accent chaud — badges « Peut-être », étoiles, highlights, plan Premium. |
| `coral` | `#FF6B57` | Alertes douces, « Absent », erreurs, états failed. Jamais agressif. |
| `paper` | `#FAF9F4` | Fond principal de l'app (crème chaud). |
| `mist` | `#EDF6EF` | Tint vert très clair — fonds de sections, cartes sélectionnées, hover subtil. |
| `sand` | `#F3EFE4` | Fond du fil WhatsApp (référence au wallpaper WhatsApp), zones « chat ». |
| `ink` | `#12211A` | Texte principal. |
| `ink-soft` | `#51645A` | Texte secondaire. |
| `ink-faint` | `#8AA093` | Texte tertiaire, placeholders. |
| `line` | `#E4E9E1` | Bordures fines. |
| `white` | `#FFFFFF` | Cartes, surfaces. |
| `wa` | `#25D366` | Vert WhatsApp — utilisé UNIQUEMENT pour l'icône/glyphe WhatsApp et les éléments qui imitent WhatsApp (bouton « Répondre sur WhatsApp »). |
| `wa-bubble-out` | `#D9FDD3` | Bulle sortante dans le fil WhatsApp. |
| `wa-bubble-in` | `#FFFFFF` | Bulle entrante. |
| `read` | `#53BDEB` | Coches « lu » (✓✓ bleu) dans les bulles. |

**Dégradés signature**
- `gradient-hero` : `radial` lime `#A3E635` à 8 % d'opacité qui diffuse sur `pine` (halo derrière le téléphone du hero).
- `gradient-pitch` : `linear 135° #16A34A → #0C2B1C` pour les cartes « pro » et CTA finaux.
- `gradient-sun` : `linear 90° #FFC53D → #FFB020` réservé au plan Premium et aux moments de célébration.

**Règles** : fond sombre = texte `#FAF9F4`, accent `lime`. Fond clair = texte `ink`, accent `pitch`. Le `lime` ne porte jamais de texte foncé en petit corps (réserve : grands titres, badges).

---

## 3. Typographie

**Google Fonts (2 familles)**

| Rôle | Police | Graisses | Notes |
|---|---|---|---|
| Display / titres / chiffres | **Bricolage Grotesque** | 500, 600, 700, 800 | Caractère friendly-géométrique, parfait pour le sport. `letter-spacing: -0.02em` sur titres. |
| UI / corps / labels | **Plus Jakarta Sans** | 400, 500, 600, 700 | Ronde, lisible, chaleureuse. |

**Échelle** (base 16 px, mobile-first)

| Style | Mobile | Desktop | Graisse | Tracking | Usage |
|---|---|---|---|---|---|
| `display-hero` | 44 px / 1.05 | 72 px / 1.02 | 800 Bricolage | -0.03em | H1 landing |
| `display-2` | 34 px / 1.1 | 52 px / 1.05 | 700 Bricolage | -0.025em | H2 sections |
| `title-1` | 26 px / 1.15 | 32 px | 700 Bricolage | -0.02em | Titres de pages app |
| `title-2` | 20 px / 1.2 | 24 px | 700 Bricolage | -0.015em | Titres de cartes |
| `title-3` | 17 px | 18 px | 600 Jakarta | 0 | Sous-titres, noms |
| `body` | 15 px / 1.6 | 16 px / 1.6 | 400 Jakarta | 0 | Corps de texte |
| `body-strong` | 15 px | 16 px | 600 Jakarta | 0 | Emphase |
| `label` | 12 px | 12.5 px | 700 Jakarta | +0.08em, uppercase | Labels de sections, chips |
| `small` | 13 px / 1.5 | 13.5 px | 400 Jakarta | 0 | Méta, timestamps |
| `stat-big` | 32 px | 44 px | 800 Bricolage | -0.02em | Gros chiffres (stats cards) — `font-variant-numeric: tabular-nums` |

Chiffres toujours en `tabular-nums` (compteurs temps réel stables). Timestamps WhatsApp en `small` `ink-faint`.

---

## 4. Espacement, rayons, ombres

**Espacement** : échelle 4 px — `4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 120`. Sections landing : `96 px` mobile / `160 px` desktop de padding vertical. Densité app généreuse : cartes avec `20–24 px` de padding.

**Rayons (généreux — signature friendly)**
- Boutons, chips, inputs pill : `999 px`
- Inputs standard : `14 px`
- Cartes : `20 px`
- Grandes cartes / modales / panneaux : `28 px`
- Bulles WhatsApp : `18 px` (coin « queue » à `6 px`)
- Avatars : ronds par défaut, `16 px` pour les avatars-groupes (équipes)

**Ombres (teintées vert, jamais grises froides)**
- `shadow-card` : `0 1px 2px rgba(12,43,28,.05), 0 8px 24px -8px rgba(12,43,28,.10)`
- `shadow-lift` (hover) : `0 2px 4px rgba(12,43,28,.06), 0 16px 40px -12px rgba(12,43,28,.18)`
- `shadow-pop` (modales, FAB) : `0 24px 64px -16px rgba(12,43,28,.28)`
- `shadow-glow-lime` : `0 0 40px rgba(163,230,53,.35)` — accents sur fond sombre
- Bordures préférées aux ombres dans l'app dense : `1px line` + `shadow-card` léger.

---

## 5. Langage de mouvement

**Outils** : Framer Motion (UI, micro-interactions, listes), GSAP + ScrollTrigger (storytelling landing uniquement), Lenis (scroll doux landing + app optionnelle), canvas-confetti (célébrations).

**Courbes signature**
- `ease-out-expo` : `cubic-bezier(0.16, 1, 0.3, 1)` — entrées de page et révélations.
- Spring UI (défaut) : `{ type: "spring", stiffness: 320, damping: 26 }` — boutons, chips, toggles.
- Spring rebond joyeux : `{ type: "spring", stiffness: 420, damping: 17 }` — badges, compteurs, confettis, réponses RSVP qui « poppent ».

**Recettes**
- Entrée de section : `y: 24 → 0, opacity: 0 → 1, durée .7s ease-out-expo, trigger 20 % viewport`.
- Listes/grilles : stagger enfants `0.06 s` (max 0.5 s total), `y: 16 → 0`.
- Hover carte : `y: -4 px, shadow-card → shadow-lift, .25s`.
- Press bouton : `scale: .97` spring, retour `.15s`.
- Compteurs : count-up `1.2 s` ease-out à l'entrée dans le viewport.
- Arrivée d'une réponse RSVP (temps réel simulé) : avatar `scale: 0 → 1` spring rebond + chip qui change de couleur + léger flash `mist` sur la ligne, + son visuel « coche » (pas d'audio).
- Envoi WhatsApp : la bulle sort du bas du chat (`y: 20 → 0, scale: .95 → 1`) puis ses coches évoluent : `✓ gris (sent) → ✓✓ gris (delivered) → ✓✓ bleu (read)`, chaque étape avec un léger `pulse` de 300 ms.
- Succès d'envoi de convocation : confettis `lime/pitch/sun` discrets (≈ 80 particules, 1.2 s) + toast « Convocation envoyée à 18 joueurs 🎉 » (style sans emoji excessif — un seul max).
- Page transitions (app) : fondu + `y: 8 px`, `.3s`. Pas de transitions lourdes dans l'app.

**Budget performance** : ≤ 8 éléments animés simultanés par viewport ; GSAP réservé à la landing ; pas de WebGL/Three.js (le produit doit rester vif sur téléphone de terrain — choix assumé de fluidité) ; `prefers-reduced-motion` respecté partout (désactive confettis, springs → fades).

---

## 6. Scroll & curseur

- **Lenis** sur la landing (`lerp: 0.09`), sync avec ScrollTrigger. App : scroll natif (listes longues, fiabilité mobile), Lenis désactivé.
- Landing : une section épinglée (la démo produit, voir `home.md`) — pin `~250 vh`, progression scroll qui pilote 4 étapes.
- App : le header de page devient « sticky compact » au scroll (titre rétrécit, ombre apparaît) avec transition `.25s`.
- **Curseur** : natif partout (mobile-first, accessibilité). `cursor: pointer` sur tout interactif. Pas de curseur custom.

---

## 7. Composants partagés

### 7.1 Navbar landing
- Fixe, pleine largeur, conteneur max `1200 px`. Fond `transparent` → `paper/90` + blur `12 px` + bordure `line` après 24 px de scroll (transition `.3s`).
- Gauche : logo Squadly (`logo.svg` + wordmark Bricolage 700). Centre (desktop) : liens `Fonctionnalités · Comment ça marche · Tarifs · FAQ` (smooth-scroll, souligné lime animé au hover — le souligné glisse via `layoutId`). Droite : `Se connecter` (ghost) + `Essayer gratuitement` (pill `pitch`, flèche qui glisse au hover).
- Mobile : logo + CTA pill compact + burger ; menu plein écran `pine` avec liens en Bricolage 32 px, stagger `0.07s`, fond motif `pattern-field.svg` en filigrane.

### 7.2 Footer
- Fond `pine`, texte `paper`. 4 colonnes : logo + baseline (« Moins de temps sur WhatsApp, plus de temps sur le terrain. »), Produit, Ressources, Légal. Bas : © Squadly, « Fait avec ❤ pour les coachs bénévoles » (remplacer emoji par cœur SVG lime), sélecteur de langue FR. Motif lignes de terrain en filigrane.

### 7.3 App Shell (connecté)
- **Desktop** : sidebar fixe `264 px`, fond `white`, bordure droite `line`. Logo en haut, nav verticale : `Tableau de bord, Équipes, Convocations, Sondages, Messages, Statistiques` (icônes Lucide 20 px + label `body-strong 14 px`). Item actif : pilule `mist` + texte `pitch-dark` + indicateur animé (`layoutId`, glisse `.3s` spring). Badge compteur sur `Messages` (réponses non lues) et `Convocations` (sans-réponse). En bas de sidebar : carte quota plan (barre de progression messages, CTA upgrade `sun`) + bloc utilisateur (avatar, « Karim H. — Coach U13 », menu).
- **Mobile** : top bar (`logo, titre contextuel, cloche avec dot, avatar`) + **bottom tab bar** 5 items : `Accueil · Équipes · [＋] · Messages · Stats`. Le `＋` central est un FAB `pitch` surélevé (`56 px`, `shadow-pop`) qui ouvre un action sheet (`Nouvelle convocation / Nouveau sondage / Nouveau message`) en bottom sheet animée spring. Tab actif : icône remplie + dot lime animé.
- **Bannière démo** : pill discrète en haut du contenu : « Mode démo — les messages WhatsApp sont simulés » (icône info, fond `mist`, dismissible). Ton pédagogue, jamais alarmiste.
- **Bannière canal déconnecté** (état simulé via Paramètres) : barre `coral/10` texte `coral` « WhatsApp déconnecté — reconnectez la session dans Paramètres » + bouton.

### 7.4 Composants métier

- **Button** : variantes `primary` (pitch, texte blanc, pill, icône flèche qui translate `4 px` au hover), `whatsapp` (fond `wa`, glyphe WhatsApp), `secondary` (bordure `ink/15`, fond blanc), `ghost`, `sun` (CTA upgrade), `danger-soft` (fond `coral/10`, texte `coral`). Tailles : `lg 52px / md 44px / sm 36px`. Press `scale .97`.
- **Card** : blanche, `20 px` radius, `shadow-card`, hover `lift` si cliquable. Variante `dark` (pine-800 sur pine, texte paper) pour les cartes mises en avant.
- **Chip RSVP** : pill 32 px — `Présent` (pitch/12 fond, pitch-dark texte, icône check), `Absent` (coral/10, coral, x), `Peut-être` (sun/20, `#8a6400`, ?), `Sans réponse` (bordure dashed `ink/20`, ink-faint, horloge). Animation : transition de couleur `.3s` quand le statut change.
- **AvatarStack** : avatars ronds 32 px superposés `-8 px`, initiales sur fonds pastel déterministes (palette : mist/lime/sun/coral à 20 % + texte foncé assorti). Surplus : `+4`. Pop spring à l'ajout.
- **WhatsAppBubble** : le composant signature.
  - Sortante : fond `wa-bubble-out`, alignée droite, queue en haut à droite, radius `18/18/6/18`. Contenu : texte du message, éventuels boutons factices `Présent / Absent / Peut-être` (pills blanches à bordure, pleine largeur, empilées), footer : heure `small` + coches de statut (voir machine à états).
  - Entrante : fond blanc, alignée gauche, nom de l'expéditeur en `small` coloré (couleur par membre), texte court (« Présent 👍 » → rendre sans emoji : « Présent » + icône).
  - **StatusTicks** : `pending` horloge grise → `sent` ✓ gris → `delivered` ✓✓ gris → `read` ✓✓ `read` bleu → `failed` triangle coral + « Échec — Réessayer ». Chaque transition animée (pulse + fade `.25s`).
  - Au clic sur une bulle sortante : drawer détail (voir `messages.md`) avec la timeline horodatée de la machine à états.
- **StatCard** : label `label`, gros chiffre `stat-big` count-up, delta chip (`+12 %` pitch / `-3 %` coral), mini-sparkline optionnelle (ligne `pitch`, aire `mist`).
- **ProgressBar** : hauteur `8 px`, fond `mist`, fill `pitch` arrondi, animation de remplissage `.8s` ease-out à l'entrée. Variante multi-segments (Présent/Peut-être/Absent/Sans réponse empilés : pitch/sun/coral/`ink/10`).
- **SegmentedTabs** : pilule conteneur `mist`, indicateur blanc `layoutId` qui glisse, labels `body-strong`.
- **ChannelHealth** (statut WhatsApp) : dot animé — `connecté` vert pulsant doux + « Connecté · il y a 2 min », `déconnecté` coral fixe + bouton « Reconnecter ».
- **EmptyState** : illustration SVG (`empty-*.svg`), titre Bricolage 20 px, phrase d'aide, CTA primaire. Entrée : `scale .96 → 1, opacity, .5s`.
- **Toast** : bottom-center mobile / bottom-right desktop, pill `ink` texte `paper`, icône de statut, entrée spring `y: 16 → 0`, auto-dismiss `4 s`.
- **Modal / Sheet** : mobile = bottom sheet (drag-to-dismiss, spring), desktop = modale centrée `28 px` radius, `shadow-pop`, backdrop `pine/40` blur `4 px`.
- **Skeletons** : cartes shimmer `mist → paper` pendant les (courts) chargements simulés.

---

## 8. Données de démo (référence pour toutes les pages)

**Organisation** : `AS Verrières Football` (plan Premium, essai « Club » disponible). Utilisateur connecté : **Karim Haddad**, coach U13.

**Équipes**
1. **U13 A** — 18 joueurs, 12 parents liés, taux de réponse 89 %, prochain match sam. 14 juin.
2. **U15** — 16 joueurs, taux 76 %.
3. **Seniors B** — 22 joueurs, taux 81 %.

**Membres (échantillon)** : Yanis Belkacem (U13, attaquant, opt-in ✓, parent lié : Samira B.), Noé Fontaine (U13, gardien), Enzo Ricci, Adam Cherif, Lucas Perrot, Tom Nguyen, Raphaël Diallo, Hugo Lainé, Maël Perrin, Sofiane Kaci… + parents : Samira Belkacem, Claire Fontaine, Marc Ricci… Statuts opt-in WhatsApp : 2 membres non opt-in (badge « À inviter »).

**Événements**
- `Match — U13 A vs FC Montreuil` (sam. 14 juin, 14 h 30, Stade Jean-Bouin) : 12 présents / 2 peut-être / 1 absent / 3 sans réponse — **événement vedette du dashboard et de la démo**.
- `Entraînement U13` (mar. 10 juin, 18 h 00) : passé, 15/18 présents.
- `Tournoi de printemps` (28–29 juin) : convocation pas encore envoyée (état « Brouillon »).
- `Match — Seniors B vs AS Choisy` (dim. 15 juin).
- Événements passés pour l'historique et les stats.

**Sondages**
- « Covoiturage pour le match de samedi ? » — options : `Je conduis (4 places) 6 · Je cherche une place 5 · Pas besoin 7` — ouvert, 18 votes.
- « Quelle date pour le goûter de fin de saison ? » — clôturé, 21 votes, gagnant « Sam. 21 juin ».

**Messages WhatsApp** : historique mixte — convocations (avec boutons), rappels J-1 automatiques, sondages, réponses entrantes (« Présent », « Absent, désolé »), un message `failed → requeued → sent` pour montrer la machine à états complète.

**Statistiques** : taux de réponse moyen 86 %, délai médian de réponse 42 min, joueur le plus fiable « Yanis B. — 100 % de réponses », tendance 8 semaines en hausse (+12 %).

---

## 9. Liste des pages

| Fichier | Route | Description |
|---|---|---|
| `home.md` | `/` | Landing marketing : hero promesse, démo produit épinglée scroll-driven, fonctionnalités, témoignages, tarifs, FAQ. |
| `dashboard.md` | `/app` | Tableau de bord coach : prochaine convocation, réponses temps réel, alertes sans-réponse, actions rapides, santé du canal. |
| `teams.md` | `/app/equipes` | Équipes (cartes) + membres (roster, rôles, opt-in WhatsApp, lien parent-enfant, invitations). |
| `events.md` | `/app/convocations` | Liste des événements + détail avec board RSVP temps réel + wizard de création/envoi de convocation. |
| `polls.md` | `/app/sondages` | Sondages WhatsApp : liste, résultats en barres animées, création, aperçu bulle. |
| `messages.md` | `/app/messages` | Fil WhatsApp type chat : bulles sortantes/entrantes, machine à états horodatée, retry, santé du canal. |
| `stats.md` | `/app/statistiques` | Statistiques : KPI count-up, courbes de tendance, présences par joueur, rapidité de réponse, leaderboard. |
| `pricing.md` | `/app/abonnement` | Abonnement : plan actuel, 3 offres, toggle mensuel/annuel, quotas, comparatif, checkout simulé. |
| `settings.md` | `/app/parametres` | Paramètres : organisation, canal WhatsApp (connexion, numéro dédié, santé, QR simulé), notifications, mode démo. |

Hors périmètre design : `/login` (fourni par le backend — prévoir juste un écran simple centré : logo, « Connexion coach », bouton magique).

---

## 10. Dépendances

`tailwindcss@3.4` · `@shadcn/ui` (button, card, dialog, sheet, tabs, badge, avatar, progress, accordion, switch, select, table, tooltip, toast) · `framer-motion` · `gsap` + `ScrollTrigger` · `lenis` · `lucide-react` · `recharts` (stats) · `canvas-confetti` · `date-fns` (locale fr) · `clsx` + `tailwind-merge`. Fonts : Bricolage Grotesque + Plus Jakarta Sans via Google Fonts.

---

## 11. Assets (manifeste — génération par l'équipe Scaffold)

| Fichier | Description (prompt) | Emplacement | Dimensions | Type |
|---|---|---|---|---|
| `logo.svg` | Logo Squadly : sifflet de coach stylisé dont l'ouverture forme une bulle de dialogue, traits ronds et épais, deux couleurs (corps `pitch #16A34A`, trou du sifflet `lime #A3E635`), style flat friendly, fonctionne en 32 px. Version monochrome blanc pour footer. | Navbar, sidebar, footer, login | vectoriel | SVG |
| `pattern-field.svg` | Motif de lignes de terrain de football vues de dessus (ligne médiane, cercle central, surface), traits fins blancs à 6 % d'opacité sur transparent, tuile sans couture. | Fonds `pine` (hero, footer, menu mobile, CTA final) | 800×800 tuile | SVG |
| `hero-illustration.png` | Illustration flat moderne et chaleureuse : un coach souriant (casquette, sifflet autour du cou) au bord d'un terrain, téléphone à la main, des enfants en maillots verts qui courent en arrière-plan flou ; palette `pitch/lime/sun/paper`, formes rondes, ombres douces, grain léger ; style « éditorial sportif » (pas corporate). | Landing — section « Pensé pour le banc de touche » | 1200×900 4:3 | Image |
| `avatar-sophie.jpg` | Portrait photo réaliste et chaleureux : femme ~38 ans, coach bénévole, polo vert, sourire naturel, arrière-plan terrain de foot flou, lumière dorée de fin de journée. | Landing — témoignages | 400×400 1:1 | Image |
| `avatar-mehdi.jpg` | Portrait photo réaliste : homme ~45 ans, coach d'équipe U15, barbe courte, veste de club, sourire franc, stade amateur en arrière-plan flou. | Landing — témoignages | 400×400 1:1 | Image |
| `avatar-claire.jpg` | Portrait photo réaliste : femme ~30 ans, coach de basket en salle, queue de cheval, sweat à capuche, gymnase flou en arrière-plan, éclairage naturel. | Landing — témoignages | 400×400 1:1 | Image |
| `celebration.png` | Illustration flat joyeuse : groupe d'enfants footballeurs (maillots verts et blancs) qui lèvent les bras en célébration avec leur coach, confettis `lime/sun`, fond `paper`, style cohérent avec `hero-illustration.png`. | Landing — CTA final ; aussi empty-state « 100 % de réponses » | 1400×900 3:2 | Image |
| `empty-events.svg` | Spot illustration flat : ballon de foot posé sur un rond central, petit calendrier flottant, palette `mist/pitch/lime`, traits ronds minimalistes. | Événements — liste vide / brouillons | 480×360 | SVG |
| `empty-polls.svg` | Spot illustration flat : bulle de dialogue avec trois coches de vote, mégaphone minimal, palette `mist/sun/pitch`. | Sondages — liste vide | 480×360 | SVG |
| `empty-chat.svg` | Spot illustration flat : deux bulles de chat superposées avec des coches ✓✓, petite antenne/onde, palette `mist/pitch/wa`. | Messages — fil vide ; Paramètres canal | 480×360 | SVG |
| `empty-teams.svg` | Spot illustration flat : trois maillots de foot sur cintres + un sifflet, palette `mist/pitch/sun`. | Équipes — liste vide / onboarding | 480×360 | SVG |

*Note : les mockups de téléphone (hero, démo) et toutes les vues produit sont construits en code (composants React réels), PAS en images — pour la netteté et l'animation temps réel.*
