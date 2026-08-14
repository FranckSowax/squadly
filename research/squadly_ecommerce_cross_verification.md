# Vérification croisée — Squadly e-commerce

## Confiance élevée
- Le cahier des charges source décrit Squadly comme une application de gestion d'équipes sportives, avec quatre rôles utilisateurs, un MVP organisationnel, une identité mobile-first et un modèle freemium.
- Le PDF ne décrit pas directement un site e-commerce ; la transposition vers Squadly Shop est une proposition dérivée.
- Pour un développement interne moderne, Next.js + TypeScript + Tailwind + shadcn/ui est une base cohérente et largement documentée.
- Stripe Checkout réduit la manipulation des données carte et convient à un MVP.
- Un moteur e-commerce open source comme Medusa évite une dépendance forte à une plateforme SaaS, mais exige plus d'exploitation.
- Les tests E2E du parcours d'achat, la surveillance des webhooks et la conformité RGPD sont indispensables.

## Confiance moyenne
- Medusa DTC Starter est le meilleur point de départ si l'équipe peut assurer un minimum de DevOps ; un MVP Supabase/Postgres + Stripe peut être plus rapide si le catalogue est très limité.
- Tailwind Plus et Striker accélèrent le design, mais leur coût et leur compatibilité doivent être revérifiés avant achat.
- Le périmètre France/francophonie, B2C + clubs, est une hypothèse raisonnable mais non confirmée par le PDF.

## Conflits ou arbitrages
- Développement 100 % interne vs rapidité : plus le backend est possédé, plus l'équipe doit assurer maintenance, monitoring et sauvegardes.
- Simplicité MVP vs ambition : le MVP ne doit pas inclure IA avancée, personnalisation complexe ou marketplace.
- Design premium vs accessibilité : le style sportif ne doit pas réduire contrastes, lisibilité ni navigation clavier.

## Décision retenue pour les livrables
- Recommander un MVP Squadly Shop développé en interne avec Next.js, TypeScript, Tailwind, shadcn/ui, Stripe Checkout et un backend Medusa si l'équipe peut l'exploiter.
- Prévoir une alternative allégée Supabase/Postgres + Stripe pour validation rapide.
- Garder l'IA et la personnalisation avancée en phase 2.
