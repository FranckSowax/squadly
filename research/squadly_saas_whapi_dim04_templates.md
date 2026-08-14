# Dimension 4 — Templates SaaS et design system

## Recommandation principale
MakerKit Pro Next.js Supabase comme base, car il couvre multi-tenant, organisations, rôles, invitations, RLS, Stripe Billing par siège, MFA, i18n et super-admin. Cela correspond aux besoins clubs/équipes/rôles de Squadly.

## Options
| Option | Usage | Avantages | Limites | Coût/licence |
|---|---|---|---|---|
| MakerKit Pro | Base SaaS complète | Organisations, RBAC, RLS, invitations, Stripe per-seat, MFA | Payant, Turborepo à apprendre | 349 $ one-time observé |
| MakerKit Lite | Évaluation gratuite | Même architecture, MIT | Pas de billing/RBAC complet | MIT gratuit |
| supastarter | Alternative SaaS | Organizations-first, Better Auth, i18n, plusieurs PSP | Moins éprouvé, payant | 349 € et plus observé |
| Achromatic | Starter premium UI | Design léché, auth, orgs, Stripe | Multi-tenant moins profond | 180 $ one-time observé |
| nextjs/saas-starter | Référence gratuite | Vercel, Postgres, Drizzle, Auth.js, Stripe | Minimal | MIT |
| ixartz/SaaS-Boilerplate | Gratuit complet | Clerk, Stripe, multi-tenant, RBAC, tests | Dépendance Clerk | MIT |

## Design system
- Socle : Tailwind CSS v4 + shadcn/ui.
- Tokens Squadly : palette sportive premium, rayons, typographie display, thème clair/sombre.
- Dashboard : blocks shadcn/ui officiels.
- Statistiques : shadcn Charts ou Tremor.
- Landing marketing : Tailwind Plus en option.
- Calendrier : FullCalendar Standard MIT ; Premium seulement si vue Timeline ressources indispensable.
- Tables membres : TanStack Table ou tablecn.
- Chat et notifications : block chat de Shadboard comme inspiration, Supabase Realtime, Sonner.
- Formulaires et sondages : react-hook-form + Zod + composants shadcn.
- Mobile : PWA mobile-first avec bottom navigation.

## Fonctions métier à construire
Aucun template ne fournit les convocations sportives, la synchronisation WhatsApp, les compositions, les statistiques d'équipe ou le moteur de sondages Squadly. Ces modules restent du développement interne.

## Sources
- https://makerkit.dev
- https://supastarter.dev
- https://achromatic.dev
- https://github.com/nextjs/saas-starter
- https://github.com/ixartz/SaaS-Boilerplate
- https://ui.shadcn.com
- https://tailwindcss.com/plus
- https://tremor.so
- https://fullcalendar.io
- https://github.com/Qualiora/shadboard
