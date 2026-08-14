# Dimension 3 — Workflows et stack SaaS

## Recommandation principale
Stack A : Next.js full-stack + TypeScript strict + Supabase Postgres + Inngest + Stripe Billing + Resend + Whapi.Cloud. Cette stack limite l'exploitation pour une petite équipe : un déploiement applicatif, une plateforme backend managée et un orchestrateur de jobs.

## Comparaison
| Approche | Forces | Limites | Cas d'usage |
|---|---|---|---|
| Next.js + Supabase | Rapide, RLS, Auth, Realtime, Cron, Queues, hébergement UE | Lock-in modéré, jobs longs à déléguer | MVP et scale initial |
| Next.js + Hono/NestJS + Postgres | API séparée, contrôle, adaptée mobile et workers lourds | Plus d'infrastructure et de déploiements | API publique ou volumes élevés |
| Monorepo + worker dédié | Organisation claire web/api/worker/packages | Sur-ingénierie possible pour MVP | Équipe plus grande ou app mobile |

## Architecture recommandée
- Frontend : Next.js, React, TypeScript strict, Tailwind CSS v4, shadcn/ui.
- Backend : Next.js Server Actions/Route Handlers + Supabase.
- Données : Postgres multi-tenant avec `organizations`, `teams`, `members`, `memberships`, événements, convocations, messages, webhooks.
- Sécurité données : Row Level Security sur toutes les tables tenant.
- Auth : Supabase Auth ou Better Auth avec rôles Owner/Admin/Coach/Player/Parent.
- Temps réel : Supabase Realtime pour présences et mises à jour de convocations.
- Jobs : Inngest pour relances, onboarding, files WhatsApp ; Supabase Cron pour rappels simples.
- Paiement : Stripe Billing, Checkout, Customer Portal, webhooks vers entitlements.
- Emails : Resend + React Email.
- Analytics : PostHog Cloud UE ou Plausible.
- Monitoring : Sentry région UE.
- Tests : Vitest + Playwright.
- CI/CD : GitHub Actions, migrations Drizzle ou Supabase, previews Vercel.

## Workflow MVP en 12 semaines
1. Cadrage, maquettes, schéma multi-tenant, repo, CI/CD et environnements.
2. Auth, organisations, équipes, rôles, invitations et RLS.
3. Calendrier : événements, récurrences, vues.
4. Convocations et réponses in-app temps réel.
5. Intégration Whapi : envoi, webhooks entrants, file avec pacing.
6. Groupes WhatsApp : création, synchronisation membres, erreurs.
7. Stripe Billing : plans, Checkout, webhooks, portail client.
8. Emails et rappels planifiés J-7/J-1/relances non-répondants.
9. Analytics, tableau de bord coach, durcissement sécurité/RGPD.
10. Beta fermée avec 3 à 5 clubs.
11-12. Corrections beta, onboarding, performance, runbook et lancement.

## Points critiques
- Ne pas démarrer avec BullMQ + Redis si l'équipe ne veut pas opérer de workers persistants.
- Les handlers de webhooks doivent être idempotents et rapides.
- L'isolation multi-tenant doit être testée automatiquement.
- Préférer hébergement UE et DPA pour Supabase, Sentry, PostHog, Stripe, Resend et Whapi.
- Prévoir une abstraction fournisseur WhatsApp.

## Sources
- https://nextjs.org/docs
- https://supabase.com/docs
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/realtime
- https://supabase.com/docs/guides/cron
- https://supabase.com/docs/guides/queues
- https://www.inngest.com/docs
- https://docs.stripe.com/billing
- https://resend.com/docs
- https://posthog.com/docs
- https://docs.sentry.io
- https://vitest.dev/guide
- https://playwright.dev/docs/intro
