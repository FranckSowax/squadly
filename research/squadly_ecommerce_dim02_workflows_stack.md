# Dimension 2 — Workflows et stack e-commerce moderne

## Verdict de recherche
Approche principale recommandée : storefront Next.js avec App Router, TypeScript strict, Tailwind CSS v4 et shadcn/ui ; moteur e-commerce open source Medusa 2.x si le projet veut posséder le backend ; variante MVP plus légère avec Supabase/Postgres et Stripe Checkout si le catalogue reste très simple. Paiement délégué à Stripe Checkout, emails via Resend + React Email ou Postmark, analytics Plausible ou Matomo, tests Vitest + Playwright, CI/CD GitHub Actions + Vercel.

## Comparaison synthétique
| Approche | Forces | Limites | Cas d'usage |
|---|---|---|---|
| Next.js + Medusa | Code et données possédés, pas de commission plateforme, multi-région, backend complet | DevOps et observabilité à assurer, délai 4 à 8 semaines | Projet ambitieux, catalogue et offres club évolutifs |
| Next.js + Supabase/Postgres + Stripe | Simple, rapide, peu coûteux, un seul socle technique | Panier, stocks, TVA et commandes à concevoir ; dette si croissance | MVP de validation avec petit catalogue |
| Shopify headless | Très rapide, checkout fiable, peu d'exploitation | Frais, dépendance fournisseur, moins de contrôle | Équipe sans capacité backend/DevOps |

## Stack recommandée par domaine
| Domaine | Choix principal | Alternative |
|---|---|---|
| Framework | Next.js App Router + React + TypeScript strict | — |
| UI | Tailwind CSS v4 + shadcn/ui | Tailwind Plus pour composants premium |
| Moteur commerce | Medusa 2.x | Supabase/Postgres + Drizzle pour MVP simple |
| Paiement | Stripe Checkout hébergé + webhooks | Stripe Elements |
| CMS/contenu | Payload CMS ou Sanity | Contenu statique au MVP |
| Emails | Resend + React Email | Postmark si délivrabilité critique |
| Analytics | Plausible | Matomo |
| Tests | Vitest + Testing Library + Playwright | — |
| CI/CD | GitHub Actions + Vercel | Railway/Render pour backend |
| Auth | Auth.js/Better Auth ou SSO Squadly | Clerk |
| Recherche produit | Postgres full-text au début | Meilisearch/Algolia ensuite |

## Workflow MVP recommandé
1. Cadrage : catalogue, fiche produit, panier, Stripe Checkout, commandes, emails, mentions légales/CGV.
2. Squelette : repo GitHub, Next.js, TypeScript strict, Tailwind, shadcn/ui, conventions de branches et PR.
3. Données : modélisation produits, variantes, prix, stocks et commandes.
4. Front : pages catalogue et produit en Server Components, ISR, images optimisées.
5. Panier : état serveur, recalcul des prix côté serveur.
6. Paiement : Stripe Checkout, webhook `checkout.session.completed`, idempotence des événements.
7. Emails : confirmation commande, expédition, réinitialisation mot de passe.
8. Qualité : tests unitaires calculs panier/TVA, tests E2E du parcours achat.
9. SEO : metadata, sitemap, robots, JSON-LD Product/Offer, Search Console.
10. Conformité : RGPD, CMP uniquement si traceurs non essentiels, politique de confidentialité, registre, CGV/CGU.
11. Lancement : monitoring Sentry, sauvegardes, alerting webhooks, protection Cloudflare.
12. Post-MVP : comptes, promos, livraison, factures, recherche, CMS, multi-devise, relances panier, avis, B2B club.

## Points critiques
- Ne pas utiliser le middleware Next.js comme seul contrôle d'accès ; maintenir une version patchée et refaire les contrôles dans les routes/actions serveur.
- Préférer Stripe Checkout pour rester dans un périmètre PCI limité.
- Éviter GA4 par défaut dans un contexte français ; préférer Plausible ou Matomo correctement configurés.
- Les pages produits doivent être rendues côté serveur pour le SEO.
- Prévoir la surveillance des webhooks et des erreurs de commande.

## Sources principales
- Documentation Next.js : https://nextjs.org/docs
- Next.js Commerce : https://github.com/vercel/commerce
- Medusa : https://docs.medusajs.com et https://github.com/medusajs/dtc-starter
- shadcn/ui : https://ui.shadcn.com
- Stripe Checkout : https://docs.stripe.com/checkout
- Resend : https://resend.com/docs
- React Email : https://react.email
- Payload CMS : https://payloadcms.com
- Playwright : https://playwright.dev/docs/intro
- Vitest : https://vitest.dev
- Plausible : https://plausible.io
- CNIL cookies et traceurs : https://www.cnil.fr/fr/cookies-et-autres-traceurs
- CVE Next.js CVE-2025-29927 : https://nvd.nist.gov/vuln/detail/CVE-2025-29927 et https://nextjs.org/blog/cve-2025-29927
