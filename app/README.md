# Squadly — déploiement local

SaaS de gestion d'équipe sportive via WhatsApp. React + TypeScript + Tailwind côté client,
Hono + tRPC + Drizzle (MySQL/MariaDB) côté serveur, le tout servi par un seul process Vite.

## Prérequis

- Node 20+ (testé sur 22.12)
- MySQL ou MariaDB en local

## Démarrage

```bash
brew services start mariadb
```

```bash
mysql -u root -e "CREATE DATABASE IF NOT EXISTS squadly CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
```

```bash
cd app && npm install && npm run dev
```

L'app est sur **http://localhost:3000**. Au premier démarrage, `api/lib/bootstrap.ts` crée les
tables si besoin puis insère le jeu de démo (club « AS Verrières Football », 3 équipes,
31 membres, événements, sondages, historique WhatsApp). L'opération est idempotente.

## Connexion

Il n'y a pas de fournisseur OAuth en local. `GET /api/oauth/callback` ouvre directement une
session pour le coach de démonstration (Karim Haddad) — c'est ce que font le bouton
« Essayer gratuitement » de la landing et la page `/login`.

```bash
open http://localhost:3000/api/oauth/callback?redirect=/app
```

Pour brancher un vrai OAuth, seul le bloc `createOAuthCallbackHandler` de
[api/kimi/auth.ts](api/kimi/auth.ts) est à remplacer : la session (JWT signé dans un cookie
httpOnly) et `authenticateRequest` restent valables.

## Configuration

Tout est dans [.env](.env) :

| Variable | Rôle |
|---|---|
| `DATABASE_URL` | connexion MySQL/MariaDB |
| `SESSION_SECRET` | signature du JWT de session |
| `DEMO_AUTH` | `true` = connexion démo sans OAuth externe |
| `PORT` | port du serveur de production |

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | serveur unique (client + API) sur `:3000` |
| `npm run build` | bundle client dans `dist/public` + serveur dans `dist/boot.js` |
| `npm start` | sert le build en production (`NODE_ENV=production`) |
| `npm run check` | typecheck complet (client + serveur) |
| `npm run db:push` | applique le schéma Drizzle à la base |
| `npm run lint` | ESLint |

## Le canal WhatsApp

L'intégration Whapi.Cloud est **simulée**. Un « tick » serveur
(`squadly.sim.tick`, appelé toutes les 12 s par le client) fait progresser les messages sortants
dans la machine à états `pending → sent → delivered → read` (avec `failed`/`requeued`), génère des
réponses RSVP réalistes et des votes de sondage. Les commandes sont dans
**Paramètres → Mode démo** (vitesse, pause, déconnexion du canal).

## Structure

```
api/            Hono + tRPC (routers métier dans squadly.ts, infra dans lib/)
db/             schéma Drizzle, relations, seed de démo
contracts/      types et constantes partagés client/serveur (plans, sessions)
src/
  components/   AppShell, Layout landing, kit UI, composants métier Squadly
  pages/        landing + 8 pages de l'app connectée
  hooks/        boucle de simulation, compteurs animés
```
