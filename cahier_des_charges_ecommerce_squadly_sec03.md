## 15. Architecture technique

### 15.1 Vue d'ensemble

#### 15.1.1 Schéma d'architecture

Le site doit suivre l'architecture ci-dessous : storefront Next.js en App Router derrière Cloudflare, moteur commerce Medusa 2.x, services externes spécialisés. Aucun composant ne doit court-circuiter cette organisation.

```
Visiteur (mobile en priorité)
        |
        v
Cloudflare  (DNS, CDN, protection anti-abus)
        |
        v
+-----------------------------+        +------------------------------+
| Storefront Next.js (Vercel) |  API   | Moteur commerce Medusa 2.x   |
| App Router, Server          |------->| Produits, panier, commandes, |
| Components, ISR catalogue   |        | stocks, promotions           |
+-----------------------------+        | + base Postgres              |
        |                             +-------+----------+-----------+
        |                                     |          |
        v                                     v          v
Plausible (mesure           Stripe Checkout et     Resend + React Email
d'audience)                 Billing + webhooks     (emails transactionnels)
```

Le storefront interroge Medusa de serveur à serveur ; Stripe est sollicité en redirection hébergée, puis rappelle le backend par webhooks signés.

#### 15.1.2 Principes d'architecture

Quatre principes non négociables : rendu serveur des pages catalogue et produit ; prix, TVA et stocks recalculés côté serveur avant toute session de paiement ; aucune logique métier critique dans le navigateur ; séparation nette storefront / moteur commerce / services externes.

### 15.2 Décision de backend

#### 15.2.1 Option retenue

Le backend retenu est Medusa 2.x : il permet de posséder le code et les données sans commission plateforme, et son support multi-région prépare la phase 3. Ce choix est conditionné à la capacité de l'équipe interne à assurer hébergement, monitoring et sauvegardes (fait de confiance moyenne, à confirmer au cadrage).

#### 15.2.2 Alternative de validation

Si le catalogue reste très limité ou si la capacité DevOps fait défaut, le plan B est Supabase/Postgres + Stripe Checkout : panier, stocks, TVA et commandes sont alors conçus en interne, avec la dette associée documentée. Le basculement vers ce plan B exige une décision écrite du sponsor.

### 15.3 Stack détaillée

#### 15.3.1 Tableau des choix

| Domaine | Choix retenu | Alternative documentée |
|---|---|---|
| Framework | Next.js App Router + React + TypeScript strict | — |
| UI | Tailwind CSS v4 + shadcn/ui (Radix) | Tailwind Plus si budget validé |
| Moteur commerce | Medusa 2.x | Supabase/Postgres + Drizzle |
| Paiement | Stripe Checkout hébergé + Billing + webhooks | Stripe Elements (non retenu au MVP) |
| Emails | Resend + React Email | Postmark si délivrabilité critique |
| Analytics | Plausible | Matomo |
| Authentification | Auth.js (ou Better Auth) | Clerk en service géré |
| Tests | Vitest + Testing Library + Playwright | — |
| CI | GitHub Actions | — |
| Hébergement | Vercel (storefront) + Railway ou Render (backend) | — |
| Recherche produit | Postgres full-text | Meilisearch ou Algolia en phase 2 |

#### 15.3.2 Versions et maintenance

Les versions des dépendances doivent être épinglées. L'équipe devra tenir une revue mensuelle des mises à jour et installer sans délai les correctifs de sécurité critiques, notamment ceux de Next.js (voir 20.1.1).

### 15.4 Hébergement et exploitation

#### 15.4.1 Topologie de déploiement

Le storefront est déployé sur Vercel, le backend Medusa et sa base Postgres sur Railway ou Render, le DNS et la protection sur Cloudflare. Trois environnements isolés sont exigés : local, staging, production, avec clés et bases strictement séparées.

#### 15.4.2 Continuité de service

Exigences : sauvegardes quotidiennes de la base avec rétention définie (cible indicative à valider : trente jours), test de restauration trimestriel documenté, alerting sur indisponibilité, surveillance des statuts des services externes (Stripe, Resend).

### 15.5 Données et intégrations

#### 15.5.1 Gestion des données

Le schéma de données doit être versionné par migrations. Le staging utilise exclusivement des données de démonstration ; aucune donnée de production n'y est copiée. Des procédures d'export et de suppression des données personnelles existent dès le MVP (chapitre 21).

Sources du chapitre : https://docs.medusajs.com, https://nextjs.org/docs, https://docs.stripe.com/checkout, https://resend.com/docs.

## 16. Workflows de développement

### 16.1 Organisation du code et des contributions

#### 16.1.1 Conventions de dépôt

Le code est organisé en monorepo backend + storefront sur la base du Medusa DTC Starter (deux dépôts si le plan B Supabase est retenu). Travail en branches courtes par fonctionnalité, revue de code obligatoire avant fusion, commits conventionnels, aucune fusion directe sur la branche principale.

#### 16.1.2 Qualité continue

Lint, formatage et vérification TypeScript stricte s'exécutent en pré-commit. La CI bloque toute fusion dont une étape échoue ; aucune exception manuelle sur la branche principale.

### 16.2 Intégration et déploiement continus

#### 16.2.1 Pipeline GitHub Actions

Chaque pull request doit déclencher le pipeline ordonné suivant :

1. Installation des dépendances épinglées.
2. Lint et vérification du formatage.
3. Vérification TypeScript stricte.
4. Tests unitaires Vitest (calculs panier, TVA, remises).
5. Tests end-to-end Playwright du parcours d'achat en mode test Stripe.
6. Build de production.
7. Déploiement d'un environnement de préproduction par pull request.
8. Promotion manuelle en production après validation, jamais automatique au MVP.

#### 16.2.2 Gestion des secrets et environnements

Les secrets doivent résider dans les coffres des plateformes (GitHub, Vercel, Railway/Render), jamais dans le dépôt. Les clés Stripe de test et de production sont strictement séparées ; chaque variable d'environnement est documentée dans un fichier d'exemple sans valeur réelle.

### 16.3 Déroulé du build MVP

#### 16.3.1 Séquence de travail en douze étapes

Séquence ordonnée imposée, chaque étape clôturée par une démonstration :

1. Cadrage du périmètre MVP et validation des hypothèses.
2. Squelette du dépôt : Next.js, TypeScript strict, Tailwind v4, shadcn/ui.
3. Modélisation des données : produits, variantes, prix, stocks, commandes.
4. Pages catalogue et produit en Server Components avec ISR.
5. Panier en état serveur avec recalcul des prix côté serveur.
6. Paiement Stripe Checkout et webhooks idempotents.
7. Emails transactionnels (confirmation, expédition, réinitialisation).
8. Qualité : tests unitaires et tests E2E du parcours d'achat.
9. SEO technique : métadonnées, sitemap, JSON-LD, Search Console.
10. Conformité : RGPD, registre, politique de confidentialité, CGV/CGU.
11. Lancement : monitoring Sentry, sauvegardes, alerting webhooks, Cloudflare.
12. Post-MVP : activation du backlog phase 2 (chapitre 7).

#### 16.3.2 Rituels d'équipe

Le cadencement retenu est simple : point hebdomadaire d'avancement, démonstration en fin de chaque étape, revue des risques à chaque jalon du chapitre 24. Aucun rituel supplémentaire au MVP.

Sources du chapitre : https://playwright.dev/docs/intro, https://vitest.dev, https://github.com/medusajs/dtc-starter.

## 17. SEO et contenu

### 17.1 SEO technique

#### 17.1.1 Exigences de rendu

Le site doit rendre les pages catalogue et produit côté serveur (Server Components avec ISR), avec métadonnées uniques par page, URLs lisibles, liens canoniques, sitemap XML et robots.txt. Aucune page catalogue ne doit dépendre d'un rendu exclusivement côté navigateur.

#### 17.1.2 Données structurées

Chaque fiche produit doit exposer du JSON-LD de type Product et Offer avec prix TTC et disponibilité ; le fil d'Ariane utilise BreadcrumbList. L'équipe devra valider ces balises avec l'outil de test des résultats enrichis avant mise en production.

### 17.2 Contenu et pilotage

#### 17.2.1 Plan de contenu

Le MVP doit livrer des pages catégories éditorialisées, un guide des tailles, une FAQ achat et retours, une page club argumentée. Ton Squadly : sportif, clair, français soigné. Aucun contenu dupliqué entre variantes d'un même produit.

#### 17.2.2 Suivi

L'inscription à la Search Console est obligatoire dès le lancement. L'équipe devra suivre mensuellement impressions et positions sur les mots-clés prioritaires : équipement sportif d'équipe, maillot personnalisé club, gestion d'équipe sportive. Les constats alimentent le backlog de contenu.

Sources du chapitre : https://search.google.com/search-console.

## 18. Performance

### 18.1 Budgets de performance

#### 18.1.1 Cibles chiffrées

Budgets applicables sur mobile, connexion 4G, constituant des critères d'acceptation :

| Indicateur | Budget | Outil de mesure |
|---|---|---|
| LCP (plus grand élément affiché) | inférieur à 2,5 s | Lighthouse CI + mesure réelle |
| INP (réactivité aux interactions) | inférieur à 200 ms | Mesure réelle utilisateurs |
| CLS (stabilité visuelle) | inférieur à 0,1 | Lighthouse CI |
| Poids d'une page produit | inférieur à 1,5 Mo | Budget de la CI |
| JavaScript initial par page | inférieur à 200 Ko (cible indicative à valider) | Rapport de build |
| Images | formats modernes AVIF/WebP, dimensions réservées | Revue de code |

#### 18.1.2 Techniques imposées

L'équipe devra utiliser par défaut les Server Components, l'ISR sur le catalogue, le composant next/image avec dimensions réservées, la mise en cache des données produits et le chargement différé de tout script tiers non critique.

### 18.2 Mesure et contrôle

#### 18.2.1 Outillage

Lighthouse CI doit s'exécuter sur les pages clés (accueil, catégorie, produit, panier) à chaque pull request. Un suivi en conditions réelles (RUM) via Plausible complète le dispositif, avec alerte en cas de dépassement de budget. Une régression non justifiée bloque la fusion.

Sources du chapitre : https://web.dev/articles/vitals.

## 19. Accessibilité

### 19.1 Cible et référentiel

#### 19.1.1 Niveau exigé

Le site doit être conforme WCAG 2.2 niveau AA, avec le référentiel RGAA comme cadre de déclaration en France. L'exigence couvre toutes les pages publiques et l'intégralité du tunnel d'achat, sans exception.

#### 19.1.2 Exigences concrètes

Exigences : contrastes conformes malgré la charte sportive (le chapitre 3 fait primer l'accessibilité sur l'effet visuel), navigation clavier complète, focus visible, étiquettes et messages d'erreur associés à chaque champ, alternative textuelle pour chaque image produit.

### 19.2 Vérification

#### 19.2.1 Méthode

Des tests automatisés axe s'exécutent dans la CI sur les pages clés. Un audit manuel clavier et lecteur d'écran du parcours d'achat est obligatoire avant lancement. La déclaration d'accessibilité RGAA est publiée en pied de page dès la mise en production.

Sources du chapitre : https://www.w3.org/TR/WCAG22/, https://accessibilite.numerique.gouv.fr/.

## 20. Sécurité

### 20.1 Principes et hygiène applicative

#### 20.1.1 Contrôles côté serveur

Règle critique : le middleware Next.js n'est jamais le seul contrôle d'accès. Chaque route et action serveur revérifie les permissions, et Next.js est maintenu à jour des correctifs (référence : CVE-2025-29927 — https://nvd.nist.gov/vuln/detail/CVE-2025-29927).

#### 20.1.2 Durcissement

Le site doit appliquer : en-têtes de sécurité et politique CSP, limitation de débit sur les endpoints sensibles (authentification, webhooks), validation stricte des entrées côté serveur, audit régulier des dépendances, gestion des erreurs sans fuite d'information technique.

### 20.2 Données de paiement et personnelles

#### 20.2.1 Périmètre PCI

Grâce à Stripe Checkout hébergé, aucune donnée de carte n'est manipulée ni stockée : le périmètre PCI reste minimal, documenté et réévalué à chaque évolution du tunnel de paiement.

#### 20.2.2 Protection des données

Exigences : chiffrement en transit et au repos, secrets hors du code, accès à la base restreint aux services nécessaires, aucune donnée personnelle sensible dans les journaux applicatifs.

### 20.3 Résilience

#### 20.3.1 Sauvegardes et incidents

Exigences : sauvegardes quotidiennes testées (15.4.2), plan de réponse à incident écrit, monitoring Sentry avec alertes nominatives, protection Cloudflare. « Zéro erreur critique Sentry sur sept jours » est un critère de recette (chapitre 27).

## 21. RGPD et conformité

### 21.1 Cartographie des traitements

#### 21.1.1 Registre

Un registre des traitements doit être tenu à jour avant lancement : identité et coordonnées clients, commandes, abonnements, emails transactionnels, mesure d'audience. Chaque traitement documente finalité, base légale, durée de conservation et destinataires ; le référent conformité en est propriétaire.

#### 21.1.2 Données de mineurs

Le public Squadly inclut des mineurs. Le site doit minimiser les données collectées, exiger le consentement parental lorsque la loi le requiert, et interdire toute utilisation des données de mineurs à des fins de profilage marketing. Ce point est un risque majeur suivi au chapitre 26.

### 21.2 Cookies et mesure d'audience

#### 21.2.1 Politique de traceurs

Le site applique les règles CNIL sur les cookies et traceurs (https://www.cnil.fr/fr/cookies-et-autres-traceurs) : Plausible (ou Matomo correctement configuré) sans cookie de suivi afin de rester exempté si possible ; une plateforme de consentement (CMP) devient obligatoire dès l'ajout d'un traceur non essentiel ; Google Analytics 4 n'est pas utilisé par défaut.

### 21.3 Documents et droits

#### 21.3.1 Corpus légal

Avant lancement, le site doit publier : politique de confidentialité, CGV incluant le droit de rétractation de quatorze jours et la médiation de la consommation, CGU des abonnements, mentions légales. Aucune mise en production sans ce corpus complet.

#### 21.3.2 Exercice des droits

Les droits d'accès, de rectification, de suppression et d'export doivent être exerçables depuis l'espace client ou sur demande, avec un délai de réponse d'un mois. Des contrats de sous-traitance (DPA) sont signés avec Stripe, Resend et l'hébergeur.

## 22. Analytics et mesure

### 22.1 Dispositif de mesure

#### 22.1.1 Outil retenu

L'outil retenu est Plausible (Matomo en alternative) : mesure respectueuse de la vie privée, cohérente avec la politique de traceurs du chapitre 21, tableau de bord simple pour une petite équipe.

#### 22.1.2 Plan de taggage

Les événements e-commerce mesurés sont : vue produit, ajout au panier, début de paiement, achat confirmé, souscription d'abonnement, demande de devis club. Chaque événement doit être documenté avec ses propriétés (identifiant produit, catégorie, montant) avant implémentation.

### 22.2 Exploitation

#### 22.2.1 Revue de performance

Une revue mensuelle est instituée : KPI du chapitre 2, entonnoir de conversion visite-achat, produits les plus vus et vendus. Chaque constat débouche sur une décision d'amélioration tracée dans le backlog ; une revue sans décision est non tenue.

Sources des chapitres 20 à 22 : https://plausible.io, https://www.cnil.fr/fr/cookies-et-autres-traceurs, https://nextjs.org/blog/cve-2025-29927.