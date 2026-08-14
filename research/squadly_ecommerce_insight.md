# Insights — Squadly Shop

## Idée directrice
Squadly ne doit pas devenir un simple catalogue de produits. Son avantage est de relier trois univers : l'organisation sportive, la communauté du club et l'achat d'équipements ou d'abonnements. Le site e-commerce doit donc prolonger la promesse « tout au même endroit ».

## Recommandation principale
Lancer d'abord un MVP Squadly Shop : catalogue court, fiches produits claires, panier, paiement Stripe, compte client, emails transactionnels et back-office minimal. L'objectif est de valider les ventes et les parcours avant d'investir dans l'IA, la personnalisation avancée ou le multi-pays.

## Cibles prioritaires
1. Parents et joueurs : achat simple et rapide d'équipements.
2. Coachs : packs d'entraînement et renouvellement de matériel.
3. Clubs : commandes groupées, personnalisation, devis et abonnements.

## Architecture de contenu
- Accueil : proposition de valeur, nouveautés, packs club, abonnement Premium.
- Boutique : abonnements, textiles, accessoires, packs.
- Produit : variantes, tailles, personnalisation, disponibilité, livraison.
- Club : offre B2B, commande groupée, devis, codes promo.
- Compte : commandes, abonnements, licences, factures.
- Support : aide, suivi, retours, FAQ.

## Différenciation
- Identité Squadly : jeune, sportive, premium, simple, mobile-first.
- IA en phase 2 : recommander produits et packs selon sport, effectif et historique.
- Lien avec l'application : SSO Squadly, avantages Premium, notifications commandes.
- Offres club : personnalisation et gestion de plusieurs équipes.

## Stack et workflow recommandés
- Base : Next.js + TypeScript + Tailwind CSS v4 + shadcn/ui.
- Backend : Medusa DTC Starter si l'équipe peut exploiter un backend ; sinon Supabase/Postgres + Stripe pour valider.
- Paiement : Stripe Checkout hébergé + webhooks idempotents.
- Emails : Resend + React Email ou Postmark.
- Analytics : Plausible ou Matomo.
- Tests : Vitest et Playwright sur le parcours achat.
- CI/CD : GitHub Actions et Vercel, avec plan B Railway/Render pour le backend.

## Risques principaux
- Périmètre trop large au lancement.
- Charte graphique source incomplète à cause des puces corrompues du PDF.
- Données de mineurs et RGPD non traités dès la conception.
- Backend interne sous-monitoré.
- IA ajoutée trop tôt sans valeur mesurable.
