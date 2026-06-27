# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Cours Particuliers Tunis** — marketplace de cours particuliers (Tunis). Phase 0 : inscription prof/élève, profils, recherche, réservation de créneau.

## Commands

```bash
pnpm dev          # dev server → http://localhost:3000
pnpm build        # production build
pnpm lint         # ESLint

# Prisma
pnpm exec prisma generate       # regénérer le client après un changement de schéma
pnpm exec prisma db push        # appliquer le schéma à la DB (Phase 0)
pnpm exec prisma migrate dev    # créer une migration (avant prod)
pnpm exec prisma studio         # GUI base de données
pnpm exec prisma db seed        # seeder (après config du script seed)
```

## Stack

| Couche | Choix |
|---|---|
| Framework | Next.js 16, App Router, TypeScript strict |
| Styles | Tailwind v4 (config via CSS `@theme`, pas de `tailwind.config.ts`) |
| Composants | shadcn/ui v4 (base-ui — pas Radix UI) |
| Base de données | Prisma v5 + PostgreSQL Neon |
| Auth | Auth.js v5 beta (`next-auth@beta`), stratégie JWT, Credentials |
| Forms | react-hook-form + @hookform/resolvers + Zod v4 |
| Mutations | Server Actions (`"use server"`) + validation Zod côté serveur |

## Architecture

```
auth.ts                  # Config Auth.js — exporte handlers, auth, signIn, signOut
middleware.ts            # Protège /dashboard/* → redirect /login
prisma/schema.prisma     # Source de vérité DB (ne pas modifier)

app/
  (auth)/                # Route group sans segment URL
    login/               # Page publique
    register/            # Page publique
  dashboard/
    page.tsx             # Redirect selon role → /prof ou /eleve
    prof/                # TEACHER only
    eleve/               # STUDENT only
  api/auth/[...nextauth]/route.ts

lib/
  prisma.ts              # Singleton PrismaClient (hot-reload safe)
  auth/getCurrentUser.ts # Helper serveur : auth() → CurrentUser | null
  schemas/auth.schema.ts # Zod loginSchema + registerSchema
  actions/auth.actions.ts # registerAction (Server Action)

components/
  auth/                  # LoginForm, RegisterForm (Client Components)
  ui/                    # shadcn composants (form.tsx créé manuellement)

types/next-auth.d.ts     # Augmente Session et JWT avec id + role
```

## Règles de développement

- **Mutations** : toujours via Server Actions (`lib/actions/`), validation Zod en premier
- **Composants serveur** : appeler `getCurrentUser()` directement, pas de `useSession`
- **Composants client** : `useSession()` de `next-auth/react`
- **Schéma Prisma** : NE PAS MODIFIER — la source de vérité est `prisma/schema.prisma`
- **shadcn/ui** : utilise `@base-ui/react` (pas Radix). Le composant `form.tsx` est custom (dans `components/ui/form.tsx`)

## Pièges connus

- **Zod v4** : `z.enum(["A","B"], { error: "..." })` (pas `required_error`). Erreurs : `.issues[0].message` (pas `.errors`)
- **Auth.js v5 JWT callbacks** : `JWT extends Record<string,unknown>` → accès via `token.id as string`
- **Prisma v5** (pas v7) : `url = env("DATABASE_URL")` dans le datasource est supporté

## Env vars requises

```
DATABASE_URL=   # Neon PostgreSQL (URL pooled)
AUTH_SECRET=    # openssl rand -base64 32
```
