# État du projet — Cours Particuliers Tunis

## Phase 0 — Auth (en cours)

### Stack configurée
| Couche | Version | État |
|---|---|---|
| Next.js | 16.2.9 (Turbopack) | ✅ Serveur dev opérationnel |
| Auth.js | v5 beta | ✅ Configuré (JWT + Credentials) |
| Prisma | v5.22.0 | ✅ Schéma synchronisé avec Neon |
| PostgreSQL | Neon (eu-central-1) | ✅ Connexion OK |
| Tailwind | v4 | ✅ |
| shadcn/ui | v4 (base-ui) | ✅ |

### Fichiers d'environnement
- `.env.local` — DATABASE_URL + DIRECT_URL + AUTH_SECRET (Next.js runtime)
- `.env` — DATABASE_URL seul (Prisma CLI)
- Les deux sont gitignorés (`.gitignore` vérifié)

### Correctifs appliqués
- **Server Actions CSRF** : `experimental.serverActions.allowedOrigins` ajouté dans `next.config.ts` pour autoriser `*.app.github.dev` (Codespaces) et `localhost:3000`

### Commandes utiles
```bash
pnpm dev                        # http://localhost:3000
pnpm exec prisma studio         # GUI base de données
pnpm exec prisma db push        # sync schéma → Neon
pnpm exec prisma generate       # regénérer le client Prisma
```

## À faire (Phase 0)
- [ ] Page d'inscription (`/register`) — RegisterForm fonctionnel
- [ ] Page de connexion (`/login`) — LoginForm fonctionnel
- [ ] Dashboard prof (`/dashboard/prof`)
- [ ] Dashboard élève (`/dashboard/eleve`)
- [ ] Middleware de protection `/dashboard/*`
