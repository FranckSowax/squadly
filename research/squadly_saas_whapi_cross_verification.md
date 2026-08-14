# Vérification croisée — Squadly SaaS + Whapi

## Confiance élevée
- Le PDF source décrit un SaaS sportif multi-rôles avec calendrier, convocations, notifications, sondages, statistiques et IA.
- Le PDF ne mentionne ni WhatsApp ni Whapi : l'intégration est une décision nouvelle issue de la demande utilisateur.
- Whapi n'est pas l'API officielle WhatsApp Business de Meta ; elle fonctionne comme une session liée.
- Whapi documente l'envoi de messages, les sondages, la création de groupes, la gestion de participants et les webhooks.
- Un SaaS multi-tenant exige une isolation forte par organisation/équipe, idéalement avec RLS Postgres.
- Les réponses WhatsApp doivent être synchronisées avec le SaaS, qui reste la source de vérité.

## Confiance moyenne
- Next.js + Supabase + Inngest est la meilleure option pour une petite équipe interne visant un MVP en 10 à 12 semaines.
- MakerKit Pro est le template le plus aligné avec les besoins multi-tenant, rôles et Stripe Billing.
- Whapi peut convenir à un MVP ou à des volumes modérés si le risque de bannissement est accepté et atténué.
- Les tarifs Whapi observés sont indicatifs et doivent être revérifiés avant achat.

## Conflits ou arbitrages
- Whapi est moins cher et plus souple, mais non officiel ; l'API officielle Meta est plus conforme mais plus coûteuse et plus contraignante.
- Les groupes WhatsApp offrent une adoption naturelle, mais les envois individuels de convocations exposent davantage au throttling et à l'anti-spam.
- Les réponses rapides sont fiables, mais le texte libre exige parsing ou IA et gestion d'ambiguïté.
- Le SaaS ne doit pas dépendre exclusivement de WhatsApp : l'application doit rester utilisable sans ce canal.

## Décisions retenues pour les livrables
- Concevoir le SaaS avec une abstraction `WhatsAppProvider`.
- MVP : notifications, annonces, convocations bidirectionnelles, relances, sondages simples et synchronisation de groupe.
- Stack : Next.js + TypeScript + Tailwind + shadcn/ui + Supabase + Inngest + Stripe + Resend + Whapi.
- Template : MakerKit Pro si budget disponible ; MakerKit Lite ou starter open source sinon.
- Exiger une procédure anti-bannissement, une surveillance du canal et un plan B WhatsApp officiel.
