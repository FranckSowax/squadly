## 23. Stratégie de tests

La stratégie de tests vise un objectif unique : aucun client ne doit payer sans recevoir sa commande, et aucune commande ne doit exister sans paiement confirmé. La pyramide est resserrée, adaptée à une petite équipe : tests unitaires sur la logique métier, quelques tests end-to-end sur les parcours qui rapportent de l'argent, recette manuelle cadrée avant lancement.

### 23.1 Pyramide de tests

**Tests unitaires et composants.** Le site doit utiliser Vitest et Testing Library pour couvrir les calculs de panier, de TVA et de remises, ainsi que les composants critiques du tunnel (récapitulatif, erreurs, rupture de stock). Couverture cible : 80 % des branches de la logique métier, cible indicative à valider au cadrage. Ces tests bloquent toute fusion en échec.

**Tests end-to-end.** L'équipe devra écrire des scénarios Playwright : achat complet d'un produit physique en mode test Stripe, souscription d'un abonnement Premium, échec de paiement et reprise, remboursement depuis le back-office, parcours complet sur viewport mobile. Ils s'exécutent en CI sur chaque pull request ; un scénario rouge interdit toute promotion en production.

### 23.2 Points critiques et recette

**Fiabilité des webhooks.** Les webhooks Stripe sont le point le plus fragile : ils créent les commandes. L'équipe devra tester l'idempotence (double envoi de « checkout.session.completed » sans doublon), l'événement en retard, la commande sans paiement confirmé et la réconciliation quotidienne Stripe / base. Tout échec alerte et alimente une file à rejouer.

**Recette avant lancement.** Une campagne de recette sera menée sur staging avec des données réalistes (catalogue proche du réel, comptes de test par persona). Elle applique la checklist du chapitre 27, inclut un test de charge léger sur catalogue et tunnel, et se conclut par la validation du sponsor : aucun lancement sans recette signée.

## 24. Planning et jalons

Le planning de référence s'étale sur environ douze semaines de travail (S1 à S12), précédées du cadrage S0, à confirmer par le sponsor, et sera réétalonné une fois connues la capacité réelle de l'équipe et les dépendances externes.

### 24.1 Découpage en phases

| Jalon | Période | Livrable | Critère de passage |
|---|---|---|---|
| J0 — Cadrage | S0-S1 | Hypothèses validées, périmètre MVP arrêté | Décision écrite du sponsor sur périmètre, budget et calendrier |
| J1 — Design | S2-S3 | Design system et maquettes des pages clés | Maquettes approuvées, tokens Squadly validés (charte source à reconstruire) |
| J2 — Build MVP | S4-S8 | Catalogue, panier serveur, paiement, comptes, emails, back-office | Parcours d'achat démontré de bout en bout en staging |
| J3 — Durcissement | S9-S10 | Tests, sécurité, RGPD, performance, SEO | Zéro faille critique ouverte, budgets de performance respectés |
| J4 — Recette | S11 | Campagne de recette sur staging | Recette signée par le sponsor (chapitre 27) |
| J5 — Lancement | S12 | Mise en production avec monitoring actif | Checklist de mise en production intégralement cochée |

### 24.2 Capacité et dépendances

#### 24.2.1 Hypothèse d'équipe

Le planning suppose au minimum un développeur full-stack confirmé, un profil design et un référent produit à temps partiel. Cette composition est une hypothèse à valider par le sponsor ; toute capacité inférieure impose d'allonger le planning ou de réduire le périmètre, jamais l'inverse.

#### 24.2.2 Dépendances critiques

Quatre dépendances conditionnent les jalons. Aucune date contractuelle n'est connue à ce stade : chaque date butoir sera fixée au jalon J0 avec le sponsor, et chaque responsable sera confirmé nominativement au même moment.

| Dépendance | Responsable | Date butoir |
|---|---|---|
| Validation de la charte graphique (section Design du PDF corrompue, à reconstruire) | Designer, arbitrage sponsor | À fixer au jalon J0, avant le jalon J1 |
| Ouverture des comptes Stripe et Resend | Référent technique | À fixer au jalon J0, avant le jalon J2 |
| Rédaction et validation des CGV | Référent RGPD, validation sponsor | À fixer au jalon J0, avant le jalon J3 |
| Disponibilité des visuels produits | Référent produit | À fixer au jalon J0, avant le jalon J2 |

Toute dépendance en retard remonte au point hebdomadaire avec un plan de contournement ; sans date fixée au jalon J0, la dépendance est traitée comme bloquante pour le jalon aval.

## 25. Backlog priorisé

Le backlog pilote le build : toute demande nouvelle entre par le bas et ne remonte qu'après arbitrage explicite du référent produit.

### 25.1 Format du backlog

L'équipe devra structurer le backlog en epics découpés en user stories au format « en tant que / je veux / afin de ». Chaque story comporte des critères d'acceptation mesurables, une priorité MoSCoW et une estimation en points relatifs ; sans critères d'acceptation, elle n'entre pas en développement.

### 25.2 Backlog MVP

| Epic | Exemples de stories | Priorité |
|---|---|---|
| Catalogue et fiches produits | « En tant que parent, je veux prix TTC et disponibilité en temps réel afin de décider vite » ; « En tant que gestionnaire, je veux publier une fiche avec tailles afin de vendre le textile » | Must |
| Panier | « En tant que joueur, je veux un panier recalculé côté serveur afin de payer le juste prix » ; « En tant que client, je veux retrouver mon panier après retour en arrière afin de ne rien recommencer » | Must |
| Paiement Stripe | « En tant que client, je veux payer par Stripe Checkout afin d'être débité en confiance » ; « En tant que système, je veux une commande créée par webhook idempotent afin d'éviter les doublons » | Must |
| Comptes clients | « En tant que client, je veux payer en invité puis créer mon compte après achat afin de suivre ma commande » ; « En tant que client, je veux exporter et supprimer mes données personnelles depuis mon espace afin d'exercer mes droits RGPD » (critère d'acceptation : l'export et la suppression s'exécutent en moins de trois clics, sans intervention du support) | Must |
| Emails transactionnels | « En tant que client, je veux une confirmation de commande et d'expédition afin de suivre mon achat » ; « En tant qu'abonné, je veux être alerté d'un échec de prélèvement afin de régulariser avant coupure » (critère d'acceptation : taux de délivrabilité supérieur à 98 % sur les gabarits en recette, version texte présente pour chaque gabarit) | Must |
| Back-office commandes | « En tant que gestionnaire, je veux changer le statut d'une commande et rembourser afin de traiter les retours » ; « En tant que support, je veux consulter une commande en lecture seule afin de répondre au client sans risque de modification » (critère d'acceptation : chaque action sensible est tracée avec auteur et date, vérifiable dans le journal) | Must |
| Pages légales | « En tant que client, je veux consulter CGV et rétractation afin d'acheter informé » ; « En tant que client, je veux accéder aux CGV depuis le tunnel de paiement afin de valider mon achat en connaissance de cause » (critère d'acceptation : les quatre documents légaux sont publiés et accessibles en un clic depuis le pied de page et le tunnel avant lancement) | Must |
| SEO technique | « En tant que visiteur, je veux trouver les fiches via les moteurs afin d'arriver sur l'offre » ; « En tant que moteur de recherche, je veux un sitemap XML, des canonicals et du JSON-LD produit afin d'indexer correctement le catalogue » (critère d'acceptation : le test des résultats enrichis valide Product, Offer et BreadcrumbList sur une fiche avant mise en production) | Should |
| Analytics de base | « En tant que référent produit, je veux mesurer vues et achats afin de piloter la conversion » ; « En tant que référent produit, je veux suivre les événements ajout au panier et achat confirmé afin de mesurer l'entonnoir » (critère d'acceptation : les six événements du plan de taggage du chapitre 22 remontent dans Plausible en staging avant lancement) | Should |

### 25.3 Backlog phases 2 et 3

Les epics différés renvoient au chapitre 7 : promotions avancées, livraison, facturation avancée (avoirs automatisés, exports enrichis), recherche produit, CMS, relances de panier, avis clients, recommandations IA, SSO Squadly, multi-devises, configurateur club. Aucun ne peut être avancé au MVP sans décision écrite du sponsor et réétalonnage du planning.

## 26. Risques et plans de mitigation

Le registre ci-dessous liste les risques structurants. Il est revu à chaque jalon du chapitre 24 ; chaque risque possède un propriétaire unique.

### 26.1 Registre des risques

| Risque | Probabilité | Impact | Mitigation | Propriétaire |
|---|---|---|---|---|
| Périmètre trop large au lancement | Élevée | Élevé | Règle du chapitre 6 : tout ajout exige décision écrite et réétalonnage | Référent produit |
| Charte graphique incomplète (PDF corrompu) | Élevée | Moyen | Jalon J1 dédié, tokens validés par le sponsor avant tout gabarit | Designer |
| Traitement RGPD des mineurs insuffisant | Moyenne | Élevé | Minimisation des données, consentement parental, revue avant lancement | Référent RGPD |
| Backend interne sous-monitoré | Moyenne | Élevé | Sentry, alerting, procédures écrites, sauvegardes testées | Référent technique |
| Webhooks Stripe non surveillés | Moyenne | Élevé | File d'événements à rejouer, alerte sur échec, réconciliation quotidienne | Référent technique |
| Capacité DevOps surestimée | Moyenne | Élevé | Évaluation au jalon J0 ; repli sur Supabase + Stripe si insuffisante | Sponsor |
| IA ajoutée trop tôt sans valeur mesurable | Faible | Moyen | IA verrouillée en phase 2, mesure d'impact avant généralisation | Référent produit |
| Dépendance aux services externes (Stripe, Resend, Vercel) | Moyenne | Moyen | Statuts externes surveillés, rollback documenté, DPA signés | Référent technique |
| Retard des visuels produits | Moyenne | Moyen | Date butoir au jalon J0, fiches de démonstration provisoires | Référent produit |

### 26.2 Risques majeurs

**Dérive du périmètre.** Risque dominant d'un projet interne sans agence : chaque semaine apporte une « petite » demande qui retarde le lancement. Mitigation : la règle du chapitre 6, sans exception, fait basculer toute fonctionnalité hors socle en phase 2 ou 3, avec décision écrite du sponsor.

**Dette d'exploitation du backend.** Choisir Medusa, c'est posséder le code mais hériter du monitoring, des sauvegardes et des mises à jour ; faute de capacité, la dette devient des incidents. Mitigation : monitoring Sentry, sauvegardes quotidiennes avec restauration testée chaque trimestre, repli assumé sur Supabase + Stripe si le catalogue reste très limité.

**Conformité RGPD insuffisante.** Le public Squadly inclut des mineurs, ce qui interdit toute approximation. Mitigation : registre des traitements à jour, revue conformité au jalon J3, corpus légal publié avant ouverture au public.

## 27. Critères d'acceptation et recette

La recette est la preuve que le site vend, encaisse, informe et respecte la loi. Aucune mise en production sans les validations croisées ci-dessous.

### 27.1 Critères globaux

**Critères fonctionnels.** Le site est accepté lorsque : un achat de produit physique et une souscription d'abonnement réussissent de bout en bout en production (commandes réelles puis remboursées) ; les emails de confirmation sont reçus ; la commande est traitable au back-office, de « payée » à « expédiée » ; un remboursement complet est exécuté avec email client automatique.

**Critères techniques et conformité.** L'équipe devra démontrer : Core Web Vitals dans les budgets du chapitre 18 sur mobile ; zéro erreur critique Sentry sur sept jours de staging chargé ; aucun webhook en échec non traité ; une sauvegarde restaurée avec succès sur environnement isolé ; corpus légal complet publié (CGV, CGU des abonnements, politique de confidentialité, mentions légales) ; déclaration d'accessibilité en ligne.

### 27.2 Processus de recette

**Checklist de mise en production.**

| Contrôle | Responsable | Statut requis |
|---|---|---|
| DNS et Cloudflare configurés (protection et cache) | Référent technique | Fait |
| Clés Stripe de production activées, clés de test retirées | Référent technique | Fait |
| Webhooks de production vérifiés sur événement réel | Référent technique | Fait |
| Search Console activée et sitemap soumis | Référent produit | Fait |
| Monitoring Sentry et alertes nominatives actifs | Référent technique | Fait |
| Sauvegardes vérifiées et restauration testée | Référent technique | Fait |
| Corpus légal et déclaration d'accessibilité publiés | Référent RGPD | Fait |
| Plan de rollback documenté et répété | Référent technique | Fait |
| Analytics Plausible actif sans cookie de suivi | Référent produit | Fait |

**Responsabilités de validation.** Trois validations conditionnent le lancement : le référent produit valide le fonctionnel (parcours, contenus, emails), le référent technique valide sécurité et exploitation (webhooks, sauvegardes, monitoring), le sponsor signe la recette finale. Une seule signature manquante bloque la mise en production, sans dérogation verbale.

## 28. Références et sources

Ce chapitre garantit la traçabilité : chaque affirmation structurante renvoie au PDF source, à une recherche produite en amont, ou est marquée comme hypothèse ou décision à valider.

### 28.1 Fichiers internes

1. Cahier des charges source Squadly : `/mnt/agents/temp/Cahier_des_charges_Squadly.pdf` (gestion d'équipes sportives, freemium, mobile-first ; section Design partiellement corrompue).
2. Analyse du PDF : `/mnt/agents/output/research/squadly_ecommerce_dim01_analyse_pdf.md`.
3. Workflows et stack : `/mnt/agents/output/research/squadly_ecommerce_dim02_workflows_stack.md`.
4. Templates et accélérateurs UI : `/mnt/agents/output/research/squadly_ecommerce_dim03_templates.md`.
5. Vérification croisée : `/mnt/agents/output/research/squadly_ecommerce_cross_verification.md`.
6. Insights stratégiques : `/mnt/agents/output/research/squadly_ecommerce_insight.md`.
7. Plan d'exécution : `/mnt/agents/output/plan.md`.

### 28.2 Références externes

**Documentation technique.** Next.js : https://nextjs.org/docs ; Next.js Commerce : https://github.com/vercel/commerce ; Medusa : https://docs.medusajs.com et starter DTC : https://github.com/medusajs/dtc-starter ; shadcn/ui : https://ui.shadcn.com ; Stripe Checkout : https://docs.stripe.com/checkout ; Resend : https://resend.com/docs ; React Email : https://react.email ; Playwright : https://playwright.dev/docs/intro ; Vitest : https://vitest.dev ; Plausible : https://plausible.io ; Payload CMS : https://payloadcms.com ; Tailwind Plus Ecommerce : https://tailwindcss.com/plus/ui-blocks/ecommerce ; shadcnblocks : https://www.shadcnblocks.com ; Saleor Storefront : https://github.com/saleor/storefront.

**Conformité et sécurité.** CNIL, cookies et autres traceurs : https://www.cnil.fr/fr/cookies-et-autres-traceurs ; vulnérabilité Next.js CVE-2025-29927 : https://nvd.nist.gov/vuln/detail/CVE-2025-29927 et https://nextjs.org/blog/cve-2025-29927.

### 28.3 Règles de citation

Chaque chapitre cite ses sources en fin de section lorsqu'il s'appuie sur un fait externe. Toute donnée non sourcée est marquée « hypothèse » ou « décision à valider » (couverture de tests, durée de douze semaines, composition d'équipe). Les URL sont données en clair, sans raccourcisseur.
