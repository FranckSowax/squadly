# Dimension 3 — Templates et design system e-commerce

## Options analysées
| Option | Usage idéal | Avantages | Limites | Licence/coût observé |
|---|---|---|---|---|
| Next.js Commerce Vercel | Storefront headless de référence | Patterns App Router, SEO, MIT, déploiement Vercel | Design générique, provider Shopify surtout | MIT, gratuit |
| Medusa DTC Starter | E-commerce complet possédé en interne | Monorepo backend + storefront, Stripe/PayPal, comptes, commandes, multi-région | Backend à héberger, UI à rebrand | MIT, gratuit |
| shadcn/ui officiel | Fondation UI et design system | Code possédé, accessible, Radix + Tailwind, MIT | Peu de blocks e-commerce complets | MIT, gratuit |
| shadcnblocks | Blocks e-commerce et marketing | Large catalogue, intégration CLI | Partie payante, logique métier à brancher | Freemium, licences payantes |
| Tailwind Plus Ecommerce | Composants premium éprouvés | 114 composants e-commerce, pages complètes, Tailwind v4 | Payant, esthétique à personnaliser | 299 $ personnel / 979 $ équipe, lifetime |
| Striker Ogresto | Marque D2C sport/streetwear | Look sport, mobile-first, pages prêtes, cart drawer | Template premium, backend à brancher | 79 $ lifetime |
| Saleor Storefront | Multi-canal/multi-devise | Next.js, GraphQL, open source | Plus complexe que nécessaire pour un MVP | FSL-1.1 puis Apache 2.0 |

## Recommandation pour Squadly
1. **Template de base : Medusa DTC Starter** (`medusajs/dtc-starter`) car il fournit un backend et un storefront dans un monorepo, sans commission plateforme, avec Stripe/PayPal, comptes clients et commandes.
2. **Fondation UI : shadcn/ui officiel + Tailwind CSS v4** pour posséder le code des composants et construire un design system Squadly.
3. **Blocks e-commerce : shadcnblocks en option gratuite/freemium**, ou Tailwind Plus si le budget permet d'accélérer les pages produit, panier et checkout.
4. **Référence visuelle sport : Striker** comme benchmark ou accélérateur visuel pour l'univers jeune, sportif, premium et mobile-first.
5. **Design system : tokens Squadly** dans Tailwind v4/CSS variables, icônes Lucide, animations Motion, notifications Sonner, thème clair/sombre si utile.

## Principes UX recommandés
- Mobile-first strict : navigation basse, panier en drawer plein écran, boutons larges, formulaires courts.
- Ton visuel : sportif et premium, contrastes maîtrisés, images d'équipes et d'équipements, micro-interactions sobres.
- Parcours : accueil → catégorie → produit → panier → paiement en moins de 3 étapes après le panier.
- Personnalisation : maillot, nom, numéro, logo club ; recommandations par sport, rôle et taille d'équipe en phase 2.

## Sources
- Next.js Commerce : https://github.com/vercel/commerce et https://vercel.com/templates/next.js/nextjs-commerce
- Medusa DTC Starter : https://github.com/medusajs/dtc-starter et https://docs.medusajs.com/resources/nextjs-starter
- shadcn/ui blocks : https://ui.shadcn.com/blocks
- shadcnblocks : https://www.shadcnblocks.com
- Tailwind Plus Ecommerce : https://tailwindcss.com/plus/ui-blocks/ecommerce
- Saleor Storefront : https://github.com/saleor/storefront
