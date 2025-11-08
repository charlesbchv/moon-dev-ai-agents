# 🌐 Web Interface - Mode d'emploi

## Démarrage

```bash
cd /Users/batchaev/git/moon-dev-ai-agents/web
./start-all.sh
```

Ce script automatique :
1. ✓ Vérifie PostgreSQL
2. ✓ Crée la base `moon_trading`
3. ✓ Applique les migrations Prisma
4. ✓ Seed les données (user + agents + trades)
5. ✓ Démarre Next.js sur port 3000

## Connexion

- **URL** : http://localhost:3000
- **Email** : `gabriel@gmail.com`
- **Password** : `12345678`

## Structure du Dashboard

### 1. Page Principale (`/dashboard`)
- **Stats globales** : Total P&L, Positions ouvertes, Agents actifs, Trades (24h)
- **13 Agents** avec icônes et descriptions (tooltip au survol)
- **"View All"** pour accéder à la gestion complète

### 2. Gestion des Agents (`/dashboard/agents`)
- **Recherche** : Filtre par nom ou description
- **Filtres** : All / Active / Inactive / Trading / Analysis
- **Cards** : Chaque agent avec statut, description, P&L
- **Configuration** : Modal avec tous les paramètres
  - Exchange (Solana, HyperLiquid, Aster)
  - AI Mode toggle
  - Strategies (Momentum, Mean Reversion, Breakout)
  - Risk Level (Low, Medium, High)
  - Position Size (USD)
  - Max Daily Loss (USD)
  - Stop Loss / Take Profit (%)
- **Toggle** : Activer/désactiver chaque agent

### 3. Trading (`/dashboard/trading`)
- **Panel de gauche** : Place orders
  - AI Mode toggle
  - Symbole (BTC/ETH/SOL)
  - Type (Market/Limit)
  - Size ($25/$50/$100/$250)
  - Buy Long / Sell Short
  - Quick actions (Close All, Cancel All)
- **Panel de droite** : Positions ouvertes
  - 3 positions actives affichées
  - Entry/Current/P&L/Time
  - Alerte liquidation si proche
- **Tabs** : Market Data / Order History

### 4. Analytics (`/dashboard/analytics`)
- **Stats** : Total P&L, Win Rate, Profit Factor, Max Drawdown
- **Charts** : P&L Over Time, Win/Loss Distribution (placeholders)
- **Tabs** :
  - Performance : Top 5 assets avec P&L
  - Recent Trades : 5 derniers trades
  - Agent Analysis : Stats par agent

### 5. Settings (`/dashboard/settings`)
- **Profile** : Name, Email, Bio
- **Trading** : Position sizing, Risk limits, AI settings, Exchange
- **Notifications** : Email, Trades, Risk, Agents, Market
- **Security** : Change password, 2FA
- **API Keys** : Liste, génération, révocation

## Sidebar Navigation

- 🏠 Dashboard
- 🤖 AI Agents
- 📈 Trading
- 📊 Analytics
- ⚙️ Settings

En haut :
- 🔔 Notifications
- 👤 Profile (Avatar GA)
- 🚪 Logout

## Données de Démonstration

Le seed crée automatiquement :

**User** :
- gabriel@gmail.com (Admin)
- Password: 12345678 (hashé avec bcrypt)

**3 Agents** :
1. Trading Agent AI (ACTIVE, TRADING)
2. Strategy Agent (ACTIVE, STRATEGY)
3. Risk Management (ACTIVE, RISK)

**3 Trades** :
1. BTC LONG : +$247.50 (+1.02%), CLOSED
2. ETH LONG : Entry $2,450, OPEN
3. SOL LONG : +$15.75 (+3.33%), CLOSED

**1 API Key** :
- Provider: Solana Trading
- Créée il y a 2 jours

## Commandes Utiles

### Développement
```bash
npm run dev              # Dev server (port 3000)
npm run build            # Build production
npm run start            # Start prod
npm run lint             # Linter
```

### Base de Données
```bash
npx prisma studio        # Interface graphique DB
npx prisma db push       # Sync schema
npx prisma generate      # Générer client
npm run db:seed          # Re-seed les données
```

### Prisma Studio
```bash
npx prisma studio
```
Ouvre http://localhost:5555 pour explorer :
- Users
- Agents
- Strategies
- Trades
- Notifications
- ApiKeys

## Problèmes Courants

### Port 3000 occupé
```bash
kill $(lsof -ti:3000)
# Ou
PORT=3001 npm run dev
```

### Erreur "Can't reach database"
```bash
# Vérifier PostgreSQL
brew services list | grep postgresql

# Redémarrer
brew services restart postgresql@14

# Vérifier .env
cat .env | grep DATABASE_URL
# Devrait être: postgresql://batchaev@localhost:5432/moon_trading?schema=public
```

### Base vide après seed
```bash
# Vérifier si le seed a marché
psql -d moon_trading -c "SELECT COUNT(*) FROM \"User\";"

# Re-seed
npm run db:seed
```

### Erreur Prisma schema
```bash
# Reset complet
npx prisma db push --force-reset
npx prisma generate
npm run db:seed
```

## Prochaines Étapes

### 1. Intégration API Python
Créer les routes API dans `/api` :
- `/api/agents` - CRUD agents
- `/api/trades` - Historique trades
- `/api/positions` - Positions ouvertes
- `/api/stats` - Stats temps réel

### 2. WebSocket pour Real-Time
Connexion WebSocket pour :
- Prix en temps réel
- Notifications live
- Mises à jour positions
- Logs agents

### 3. Charts avec ApexCharts
Remplacer les placeholders par :
- P&L Over Time (ligne)
- Win/Loss Distribution (pie)
- Asset Performance (bar)
- Equity Curve (area)

### 4. Authentification JWT
Implémenter :
- Login/Logout fonctionnel
- Protection des routes
- Token refresh
- Session management

## Architecture Technique

### Frontend
- **Framework** : Next.js 14.2.15 (App Router)
- **UI** : Tailwind CSS + shadcn/ui
- **Components** : 13+ components installés
- **TypeScript** : Strict mode

### Backend
- **ORM** : Prisma 5.20.0
- **Database** : PostgreSQL 14
- **Auth** : bcryptjs pour hash passwords

### Déploiement
```bash
npm run build
npm run start
# Ou avec PM2
pm2 start npm --name "moon-web" -- start
```

---

**Interface prête ! Connecte maintenant les agents Python pour un système complet 🚀**

Voir `../GUIDE_DEMARRAGE.md` pour lancer tout le système.
