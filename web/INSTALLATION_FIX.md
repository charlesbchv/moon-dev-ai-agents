# 🚀 Installation Rapide - Moon Trading Platform

## Problème de Dépendances Résolu ✅

Les conflits de dépendances React 18/19 ont été corrigés. Suivez ces étapes :

## Installation (3 étapes)

### 1. Nettoyer l'installation précédente (si nécessaire)
```bash
cd /Users/batchaev/git/moon-dev-ai-agents/web
rm -rf node_modules package-lock.json .next
```

### 2. Installer avec --legacy-peer-deps
```bash
npm install --legacy-peer-deps
```

**Pourquoi --legacy-peer-deps ?**  
Certaines dépendances (comme `next-themes`) n'ont pas encore été mises à jour pour React 18.3, donc nous utilisons cette flag pour ignorer les conflits de peer dependencies.

### 3. Configurer l'environnement
```bash
cp .env.example .env
```

Éditez `.env` et ajoutez :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/moon_trading"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
JWT_SECRET="$(openssl rand -base64 32)"
```

### 4. Initialiser la base de données
```bash
npm run db:push
```

### 5. Lancer le serveur
```bash
npm run dev
```

## Commandes Utiles

```bash
# Développement
npm run dev                  # http://localhost:3000

# Base de données
npm run db:push             # Créer les tables
npm run db:studio           # Interface graphique

# Build
npm run build               # Build de production
npm start                   # Démarrer en production

# Vérification
npm run type-check          # Vérifier TypeScript
npm run lint                # Linter
```

## Si l'installation échoue

### Option 1 : Forcer l'installation
```bash
npm install --force
```

### Option 2 : Utiliser yarn
```bash
yarn install
```

### Option 3 : Script automatisé
```bash
chmod +x install.sh
./install.sh
```

## Versions des Packages (Compatibles ✅)

- **Next.js**: 14.2.15 (stable avec React 18)
- **React**: 18.3.1 (stable)
- **TypeScript**: 5.6.3
- **Prisma**: 5.20.0
- **Tailwind CSS**: 3.4.14

## Erreurs Communes

### "prisma: command not found"
```bash
npm install --legacy-peer-deps
# Prisma sera installé et disponible
```

### "next: command not found"
```bash
npm install --legacy-peer-deps
# Next.js sera installé
```

### Erreur de dépendances peer
```bash
npm install --legacy-peer-deps
# Ignore les conflits de peer dependencies
```

### Port 3000 déjà utilisé
```bash
lsof -ti:3000 | xargs kill -9
# Ou utilisez un autre port
PORT=3001 npm run dev
```

## Vérification de l'Installation

Après l'installation, vérifiez que tout fonctionne :

```bash
# 1. Vérifier que les packages sont installés
ls node_modules/next
ls node_modules/prisma

# 2. Vérifier TypeScript
npm run type-check

# 3. Tester le build
npm run build

# 4. Lancer le serveur
npm run dev
```

## Structure Finale

```
web/
├── node_modules/          # ✅ Doit être créé
├── .next/                 # ✅ Créé après npm run dev
├── src/                   # ✅ Code source
├── prisma/               # ✅ Schéma DB
├── package.json          # ✅ Dépendances fixées
├── .env                  # ⚠️  À créer
└── README.md             # ✅ Documentation
```

## Support

Si vous rencontrez encore des problèmes :

1. Vérifiez Node.js version : `node --version` (doit être 18+)
2. Vérifiez npm version : `npm --version` (doit être 9+)
3. Supprimez tout et recommencez :
   ```bash
   rm -rf node_modules package-lock.json .next
   npm install --legacy-peer-deps
   ```

## Succès ! 🎉

Une fois l'installation terminée :
- ✅ Ouvrez http://localhost:3000
- ✅ Vous devriez voir la landing page
- ✅ Dashboard accessible à /dashboard

---

**Note** : Tous les avertissements TypeScript ont été corrigés dans les fichiers sources.
