# 🚀 Guide de Démarrage Complet - Moon Dev AI Agents

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir :
- ✅ Node.js 18+ installé
- ✅ PostgreSQL installé et démarré
- ✅ Python 3.13+ installé (pour les agents AI)

---

## 🌐 Démarrage de l'Interface Web (Next.js)

### Option 1 : Script Automatique (Recommandé) 🎯

```bash
cd /Users/batchaev/git/moon-dev-ai-agents/web
./start-all.sh
```

Ce script fait automatiquement :
1. ✓ Vérifie PostgreSQL
2. ✓ Crée la base de données si nécessaire
3. ✓ Applique les migrations Prisma
4. ✓ Seed les données de test
5. ✓ Démarre le serveur Next.js

### Option 2 : Démarrage Manuel 🔧

```bash
# 1. Aller dans le répertoire web
cd /Users/batchaev/git/moon-dev-ai-agents/web

# 2. Vérifier PostgreSQL
brew services list | grep postgresql
# Si pas démarré :
brew services start postgresql@14

# 3. Créer la base de données (si première fois)
createdb moon_trading

# 4. Appliquer le schéma Prisma
npx prisma db push

# 5. Générer le client Prisma
npx prisma generate

# 6. Seed les données (si première fois)
npm run db:seed

# 7. Démarrer le serveur
npm run dev
```

### 📱 Accès à l'Interface

Une fois démarré, accédez à :
- **URL** : http://localhost:3000
- **Login** : `gabriel@gmail.com`
- **Mot de passe** : `12345678`

---

## 🤖 Démarrage des Agents AI (Backend Python)

### Configuration Initiale

```bash
# 1. Aller dans le répertoire racine
cd /Users/batchaev/git/moon-dev-ai-agents

# 2. Vérifier la configuration
./python check_config.py

# 3. Si erreurs, éditer les fichiers :
nano .env                    # API keys (Claude, OpenAI, etc.)
nano src/config.py          # Configuration des agents
```

### Démarrage des Agents

#### Option A : Menu Interactif (Recommandé) 🎯

```bash
cd /Users/batchaev/git/moon-dev-ai-agents
./start_agents.sh
```

Menu disponible :
1. **Trading Simple** - 1 AI, rapide (~10s)
2. **Trading Swarm** - 6 AI, consensus (~45-60s)
3. **Tous les agents** - Trading + Risk + Strategy
4. **Surveillance** - Whale + Sentiment + Funding
5. **Backtesting** - Test des stratégies
6. **Mode Testnet** - Test sans risque
7. **Arrêter** - Stop tous les agents
8. **Logs** - Voir les logs en temps réel

#### Option B : Lancer des Agents Spécifiques

```bash
# Trading Agent uniquement
./python src/agents/trading_agent.py

# Strategy Agent uniquement
./python src/agents/strategy_agent.py

# Risk Agent uniquement
./python src/agents/risk_agent.py

# Tous ensemble (via main.py)
./python src/main.py
```

#### Option C : Agents de Surveillance

```bash
# Whale Agent (tracking des baleines)
./python src/agents/whale_agent.py

# Sentiment Agent (analyse Twitter/social)
./python src/agents/sentiment_agent.py

# Funding Agent (taux de financement)
./python src/agents/funding_agent.py

# Liquidation Agent (liquidations)
./python src/agents/liquidation_agent.py
```

---

## 📊 Architecture du Système

```
┌─────────────────────────────────────────────────┐
│         Interface Web (Next.js)                 │
│         http://localhost:3000                   │
│  • Dashboard avec stats en temps réel           │
│  • Gestion des 13 agents AI                     │
│  • Trading manuel et automatique                │
│  • Analytics et performance                     │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         Base de Données PostgreSQL              │
│         moon_trading                            │
│  • Utilisateurs et authentification             │
│  • Agents et configurations                     │
│  • Trades et historique                         │
│  • Positions et P&L                             │
└─────────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────────┐
│         Agents AI (Python)                      │
│  • Trading Agent (AI LLM)                       │
│  • Strategy Agent (Algorithmes)                 │
│  • Risk Agent (Gestion risques)                 │
│  • Whale/Sentiment/Funding Agents               │
│  ↓                                               │
│  • Exchanges (Solana, HyperLiquid, Aster)      │
└─────────────────────────────────────────────────┘
```

---

## ⚙️ Configuration des Agents

### 1. Fichier `.env` (Clés API)

```bash
nano .env
```

Contenu minimum requis :
```env
# AI Models
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx

# Exchanges (optionnel selon l'exchange utilisé)
SOLANA_PRIVATE_KEY=xxxxx
HYPERLIQUID_PRIVATE_KEY=xxxxx
ASTER_API_KEY=xxxxx

# Data Providers
BIRDEYE_API_KEY=xxxxx
COINGECKO_API_KEY=xxxxx

# Twitter (pour Sentiment Agent)
TWITTER_BEARER_TOKEN=xxxxx
```

### 2. Fichier `src/config.py` (Configuration)

```bash
nano src/config.py
```

Paramètres importants :
```python
# Exchange à utiliser
EXCHANGE = 'solana'  # 'solana', 'hyperliquid', ou 'ASTER'

# Tokens Solana à trader (adresses de contrat)
MONITORED_TOKENS = [
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',  # FART
    # Ajoutez vos tokens ici
]

# Symboles HyperLiquid/Aster
HYPERLIQUID_SYMBOLS = ['BTC', 'ETH', 'SOL']

# Position Sizing
usd_size = 25                # Taille position USD
max_usd_order_size = 3       # Ordre max USD

# Risk Management
MAX_LOSS_USD = 25            # Perte max
MAX_GAIN_USD = 25            # Gain max
MINIMUM_BALANCE_USD = 50     # Balance min

# AI Configuration
AI_MODEL = "claude-3-haiku-20240307"
USE_SWARM_MODE = False       # True = 6 AI, False = 1 AI

# Stratégies
ENABLE_STRATEGIES = True     # Activer strategy_agent
```

### 3. Activer/Désactiver les Agents dans `src/main.py`

```bash
nano src/main.py
```

```python
ACTIVE_AGENTS = {
    'risk': True,       # ✅ Surveillance des risques
    'trading': True,    # ✅ Trading avec AI
    'strategy': True,   # ✅ Stratégies algorithmiques
    'copybot': False,   # ❌ Désactivé
    'sentiment': False, # ❌ Lancer séparément
}
```

---

## 🔍 Vérification et Monitoring

### Vérifier l'État des Services

```bash
# Web (Next.js)
curl http://localhost:3000

# PostgreSQL
psql -d moon_trading -c "SELECT COUNT(*) FROM \"User\";"

# Agents Python (vérifier les processus)
ps aux | grep python
```

### Voir les Logs

```bash
# Logs des agents
tail -f logs/trading_agent.log
tail -f logs/strategy_agent.log
tail -f logs/risk_agent.log

# Logs du serveur web
# (affichés dans le terminal où npm run dev tourne)
```

### Prisma Studio (Interface DB)

```bash
cd /Users/batchaev/git/moon-dev-ai-agents/web
npx prisma studio
```
Ouvre une interface web sur http://localhost:5555 pour explorer la base de données.

---

## 🎯 Workflows Recommandés

### Workflow 1 : Trading Conservateur

```bash
# Terminal 1 : Interface Web
cd web && npm run dev

# Terminal 2 : Agents de base
./python src/main.py
# Avec ACTIVE_AGENTS = {risk: True, trading: True, strategy: False}
```

### Workflow 2 : Trading Agressif

```bash
# Terminal 1 : Interface Web
cd web && npm run dev

# Terminal 2 : Tous les agents
./start_agents.sh
# Choisir option 3 : Tous les agents
```

### Workflow 3 : Surveillance + Recherche

```bash
# Terminal 1 : Interface Web
cd web && npm run dev

# Terminal 2 : Whale Agent
./python src/agents/whale_agent.py

# Terminal 3 : Sentiment Agent
./python src/agents/sentiment_agent.py

# Terminal 4 : Research Agent
./python src/agents/research_agent.py
```

---

## 🐛 Dépannage

### Problème : Port 3000 déjà utilisé

```bash
# Trouver le processus
lsof -ti:3000

# Tuer le processus
kill -9 $(lsof -ti:3000)

# Ou utiliser un autre port
PORT=3001 npm run dev
```

### Problème : PostgreSQL ne démarre pas

```bash
# Vérifier l'état
brew services list

# Redémarrer
brew services restart postgresql@14

# Vérifier les logs
tail -f /opt/homebrew/var/log/postgresql@14.log
```

### Problème : Erreur Prisma "Can't reach database"

```bash
# Vérifier la DATABASE_URL dans .env
cat web/.env | grep DATABASE_URL

# Devrait être :
# DATABASE_URL="postgresql://batchaev@localhost:5432/moon_trading?schema=public"

# Recréer la base
dropdb moon_trading
createdb moon_trading
cd web && npx prisma db push
```

### Problème : Python module not found

```bash
# Installer les dépendances manquantes
./python -m pip install -r requirements.txt

# Ou modules spécifiques
./python -m pip install anthropic openai solders requests python-dotenv
```

### Problème : Agent ne trade pas

```bash
# 1. Vérifier config.py
cat src/config.py | grep MONITORED_TOKENS
cat src/config.py | grep HYPERLIQUID_SYMBOLS

# 2. Vérifier les clés API dans .env
cat .env | grep API_KEY

# 3. Voir les logs
tail -f logs/trading_agent.log
```

---

## 📚 Commandes Utiles

### Web (Next.js)
```bash
cd web
npm run dev              # Démarrer en dev
npm run build            # Build production
npm run start            # Démarrer en prod
npm run lint             # Linter
npx prisma studio        # Interface DB
npx prisma db push       # Sync DB schema
npm run db:seed          # Seed data
```

### Agents Python
```bash
./python check_config.py           # Vérifier config
./start_agents.sh                  # Menu interactif
./python src/main.py               # Lancer main
./python src/agents/trading_agent.py    # Agent spécifique
```

### Base de Données
```bash
createdb moon_trading              # Créer DB
dropdb moon_trading                # Supprimer DB
psql moon_trading                  # Accès psql
pg_dump moon_trading > backup.sql  # Backup
```

---

## 🎉 Démarrage Rapide (TL;DR)

```bash
# 1. Interface Web
cd /Users/batchaev/git/moon-dev-ai-agents/web
./start-all.sh

# 2. Agents AI (dans un autre terminal)
cd /Users/batchaev/git/moon-dev-ai-agents
./start_agents.sh

# 3. Ouvrir le navigateur
open http://localhost:3000

# 4. Se connecter
# Email: gabriel@gmail.com
# Password: 12345678
```

---

## 📞 Support

Si tu rencontres des problèmes :
1. Vérifie les logs : `tail -f logs/*.log`
2. Vérifie la config : `./python check_config.py`
3. Redémarre les services
4. Consulte la documentation dans `/docs`

**Tout est prêt pour trader ! 🚀**
