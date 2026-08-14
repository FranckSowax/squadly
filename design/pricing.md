# Page — Abonnement & Tarifs (`/app/abonnement`)

**Objectif** : une page de billing qui ne stresse pas. Friendly, transparente, avec les **quotas visibles** (le coach voit ce qu'il consomme) et un upgrade qui ressemble à une évidence. Accessible aussi en version « publique » depuis la landing (lien « Voir le détail des plans »).

**Layout** : App Shell (version app) ou Navbar landing (version publique). Header : `title-1` « Abonnement » + sous-titre « Simple, sans engagement, résiliable en 2 clics. »

---

## 1. Bandeau « Plan actuel »

- Carte `gradient-pitch` texte `paper` radius `24` : chip `sun` « Plan Premium » + « Votre club : AS Verrières Football » + « 9 €/mois · prochain prélèvement le 1ᵉʳ juillet » + boutons ghost blancs « Gérer le paiement » et « Changer de plan ».
- **Jauges de quota** (intégrées à la carte) : 2 ProgressBar `white/20` fond, fill `lime` :
  - « Messages WhatsApp — **312 / 1 000** ce mois-ci » (31 %)
  - « Équipes — **3 / illimité** » (affiché « ∞ » avec icône Infinity)
- Alerte douce si quota > 80 % (état alternatif) : la jauge passe `sun` + « Vous approchez du plafond — passez à Club pour doubler. »
- **Animation** : entrée `y: 20 → 0, .5s`. Les jauges se remplissent `1s` ease-out delay `.3s` avec count-up des chiffres.

## 2. Toggle Mensuel / Annuel

- SegmentedTabs centré : `Mensuel` · `Annuel` + chip `lime` « −20 % » sur l'option annuelle (la chip fait un wiggle à l'arrivée).
- **Animation** : indicateur glisse (`layoutId` spring) ; les prix des cartes roulent (compteur `.5s`) quand on bascule.

## 3. Les 3 plans (grille 3 col desktop / pile mobile)

### Freemium — « Pour tester en vraie grandeur »
- Prix : `0 €` Bricolage 800 48 px + « pour toujours ».
- Cible : « 1 coach, 1 équipe ».
- Liste (icônes Check pitch) : 1 équipe · 100 messages WhatsApp/mois · convocations & réponses · relances manuelles · support communautaire.
- CTA ghost : « Plan actuel de départ » (ou « Choisir Freemium »).

### Premium — « Le choix des coachs » (carte vedette)
- Fond `gradient-pitch`, texte `paper`, `shadow-glow-lime` doux, badge `sun` « Le plus choisi » qui dépasse en haut. Légèrement plus grande (`scale 1.03` desktop).
- Prix : `9 €/mois` (ou `7 €/mois` annuel barré `9 €`).
- Liste (icônes Check lime) : équipes **illimitées** · 1 000 messages/mois · **relances automatiques J-7 & J-1** · sondages WhatsApp · statistiques complètes · export CSV.
- CTA `sun` pill : « Passer à Premium » → checkout simulé (§5).
- Chip « Votre plan actuel » si applicable (état de démo : Premium actif → le CTA devient « Plan actuel ✓ » désactivé, et le bouton devient visible sur Club).

### Club — « Pour les clubs qui grandissent »
- Prix : `29 €/mois` (ou `23 €` annuel).
- Liste : tout Premium, plus : équipes consolidées multi-coachs · vue club & délégation de rôles · 5 000 messages/mois · numéro WhatsApp dédié au club · support prioritaire humain.
- CTA secondary : « Essayer Club 14 jours » + lien `small` « ou parler à un humain » (ouvre un mailto / chat simulé).

- **Animation** : cartes stagger `.12s`, `y: 40 → 0` ; Premium pop avec spring rebond + halo. Hover : `y: -6` (Premium : `scale 1.05`). Bascule mensuel/annuel : prix roulent + badge annuel apparaît en pop.

## 4. Tableau comparatif détaillé

- Carte blanche radius `24`, tableau 3 colonnes de plans + lignes de fonctionnalités groupées par thème (`label` séparateurs) :
  - **Équipes** : Nombre d'équipes (1 / ∞ / ∞) · Membres par équipe (25 / ∞ / ∞) · Vue consolidée club (— / — / ✓)
  - **WhatsApp** : Messages/mois (100 / 1 000 / 5 000) · Relances auto (— / ✓ / ✓) · Numéro dédié (partagé / partagé / dédié club)
  - **Organisation** : Sondages (— / ✓ / ✓) · Statistiques (basiques / complètes / complètes + club) · Rôles délégués (— / — / ✓) · Exports (— / ✓ / ✓)
  - **Support** : (communauté / email / prioritaire humain)
- Colonne Premium en fond `mist` avec liseré supérieur `pitch` et label « Recommandé ».
- Mobile : le tableau devient scrollable horizontal avec la 1ʳᵉ colonne sticky (labels), ombre de débordement indiquant le scroll.
- **Animation** : lignes stagger `.04s` à l'entrée (trigger 15 %). Les ✓ pop en spring un par un (limité : 6 max animés, les autres fades).

## 5. Checkout simulé (modale)

- Récap : plan choisi + prix + période, carte « 14 jours d'essai gratuit — aucun prélèvement avant le 28 juin ».
- Champs factices pré-remplis (carte `4242 •••• 4242`, « carte de démo »), mention : « Démo — aucun paiement réel n'est effectué. »
- CTA : « Confirmer — 0 € aujourd'hui ».
- **Succès** : spinner `1.5s` → coche lime stroke-draw + confettis + « Bienvenue au niveau supérieur ! » + récap des nouveautés débloquées (chips qui pop : « Relances auto » « Sondages » « Stats ») + CTA « Découvrir mes nouvelles fonctions » (→ dashboard où un bandeau « Nouveau : relances auto activées » apparaît).
- **Animation** : chips débloquées stagger `.1s` pop spring 420/17.

## 6. FAQ billing (accordéon compact, 4 questions)

1. **Je peux annuler quand je veux ?** — Oui, en 2 clics depuis cette page. Votre plan reste actif jusqu'à la fin du mois, puis vous repassez en Freemium sans perdre vos données.
2. **Que se passe-t-il si je dépasse mon quota de messages ?** — Rien de brutal : on vous prévient à 80 %, et les relances automatiques continuent. Au-delà du plafond, les messages passent en file lente jusqu'au mois suivant — ou vous passez au plan supérieur.
3. **Le numéro WhatsApp dédié, c'est quoi ?** — Un numéro au nom de votre club (plan Club) : les joueurs voient « AS Verrières Football » au lieu d'un numéro inconnu. Confiance + réponses en hausse.
4. **Vous proposez des tarifs pour les clubs bénévoles ?** — Oui : −30 % pour les associations loi 1901. Écrivez-nous, on adore les bénévoles.

- **Animation** : accordéon hauteur `.35s`, chevron rotate ; items stagger `.06s`.

## 7. Bandeau rassurance final

- Ligne centrée : icônes ShieldCheck, Lock, CreditCard (`ink-soft`) + « Paiement sécurisé · Sans engagement · Données hébergées en Europe · Résiliable en 2 clics ».
- **Animation** : fade `.5s`.

## États
- Plan actuel marqué sur la carte correspondante (CTA désactivé « Plan actuel ✓ »).
- État « essai Club en cours » (alternatif) : bandeau `sun/10` « Essai Club — 9 jours restants » + ProgressBar temporelle.
- Quota > 80 % : jauge `sun` + recommandation contextualisée.

## Interactions récapitulatives
- Toggle mensuel/annuel avec prix roulants.
- Checkout simulé complet avec célébration et déblocages visibles dans l'app.
- Jauges de quota vivantes (liées aux messages réellement « envoyés » dans la démo — envoyer une convocation fait monter la jauge : boucle produit).
- Tableau comparatif sticky mobile.

## Assets utilisés
Aucun — icônes Lucide + code.
