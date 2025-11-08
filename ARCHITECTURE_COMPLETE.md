# 📁 Architecture Complète du Projet

## Structure des Dossiers

```
moon-dev-ai-agents/
│
├── 🌐 web/                          # Interface Web (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx         # Page principale (13 agents)
│   │   │   │   ├── layout.tsx       # Sidebar navigation
│   │   │   │   ├── agents/
│   │   │   │   │   └── page.tsx     # Gestion agents (search, config)
│   │   │   │   ├── trading/
│   │   │   │   │   └── page.tsx     # Interface trading
│   │   │   │   ├── analytics/
│   │   │   │   │   └── page.tsx     # Performance stats
│   │   │   │   └── settings/
│   │   │   │       └── page.tsx     # Configuration (5 tabs)
│   │   │   └── api/                 # (À créer) Routes API
│   │   ├── components/
│   │   │   └── ui/                  # shadcn/ui components (13+)
│   │   └── lib/
│   │       └── utils.ts
│   ├── prisma/
│   │   ├── schema.prisma            # Schema DB (6 models)
│   │   └── seed.ts                  # Seed script
│   ├── start-all.sh                 # 🚀 Script démarrage auto
│   ├── README_WEB.md                # Doc interface web
│   └── package.json
│
├── 🤖 src/                          # Backend Python (AI Agents)
│   ├── agents/
│   │   ├── trading_agent.py         # Trading AI (LLM)
│   │   ├── strategy_agent.py        # Algorithmes
│   │   ├── risk_agent.py            # Risk management
│   │   ├── copybot_agent.py         # Copy trading
│   │   ├── whale_agent.py           # Whale tracking
│   │   ├── sentiment_agent.py       # Twitter/social
│   │   ├── funding_agent.py         # Funding rates
│   │   ├── liquidation_agent.py     # Liquidations
│   │   ├── sniper_agent.py          # New listings
│   │   ├── research_agent.py        # Token research
│   │   ├── chartanalysis_agent.py   # TA
│   │   ├── polymarket_agent.py      # Prediction markets
│   │   └── solana_agent.py          # Solana DEX
│   ├── config.py                    # Configuration globale
│   ├── main.py                      # Entry point (tous agents)
│   ├── exchange_manager.py          # Gestion exchanges
│   └── nice_funcs*.py               # Utils
│
├── 🗄️ Database (PostgreSQL)
│   └── moon_trading
│       ├── User                     # Authentification
│       ├── Agent                    # 13 agents configs
│       ├── Strategy                 # Stratégies
│       ├── Trade                    # Historique trades
│       ├── Notification             # Alertes
│       └── ApiKey                   # Clés API
│
├── 📚 docs/                         # Documentation complète
│   ├── HOUSECOIN_AGENT.md
│   ├── tradingagents.md
│   ├── hyperliquid.md
│   └── ... (20+ docs)
│
├── 🚀 Scripts de Lancement
│   ├── start-everything.sh          # 🎯 MASTER (Web + Agents)
│   ├── start_agents.sh              # Menu agents Python
│   └── python                       # Wrapper Python
│
├── 📖 Documentation Principale
│   ├── QUICK_START.md               # ⭐ Démarrage ultra-rapide
│   ├── GUIDE_DEMARRAGE.md           # Guide complet détaillé
│   ├── ARCHITECTURE.md              # Architecture backend
│   └── README.md                    # Overview projet
│
├── ⚙️ Configuration
│   ├── .env                         # API keys (Claude, OpenAI, etc.)
│   ├── requirements.txt             # Dépendances Python
│   └── web/.env                     # DATABASE_URL
│
└── 📝 Logs
    └── logs/
        ├── trading_agent.log
        ├── strategy_agent.log
        └── risk_agent.log
```

---

## 🔄 Flux de Données

```
┌─────────────────────────────────────────────┐
│  👤 User Browser                            │
│  http://localhost:3000                      │
│  • Login (gabriel@gmail.com)                │
│  • View dashboard (13 agents)               │
│  • Configure agents                         │
│  • Place trades                             │
│  • View analytics                           │
└─────────────────────────────────────────────┘
                    ↓ HTTP/WebSocket
┌─────────────────────────────────────────────┐
│  🌐 Next.js Web Interface                   │
│  Port 3000                                  │
│  • React Components                         │
│  • API Routes (/api/*)                      │
│  • Server-side rendering                    │
│  • Real-time updates                        │
└─────────────────────────────────────────────┘
                    ↓ Prisma ORM
┌─────────────────────────────────────────────┐
│  🗄️  PostgreSQL Database                    │
│  moon_trading                               │
│  • Users (auth)                             │
│  • Agents (configs)                         │
│  • Trades (history)                         │
│  • Positions (open)                         │
│  • Strategies                               │
│  • Notifications                            │
│  • API Keys                                 │
└─────────────────────────────────────────────┘
                    ↕ Read/Write
┌─────────────────────────────────────────────┐
│  🤖 Python AI Agents                        │
│  • Trading Agent (Claude/GPT)               │
│  • Strategy Agent (Algorithms)              │
│  • Risk Agent (Risk management)             │
│  • Surveillance Agents (Whale, Sentiment)   │
└─────────────────────────────────────────────┘
                    ↓ API Calls
┌─────────────────────────────────────────────┐
│  📡 External Services                       │
│  • Exchanges (Solana, HyperLiquid, Aster)  │
│  • AI Models (Claude, GPT, Gemini)         │
│  • Data (Birdeye, CoinGecko)               │
│  • Social (Twitter API)                    │
└─────────────────────────────────────────────┘
```

---

## 🚀 Commandes Principales

### Tout Démarrer (Option 1) ⭐
```bash
./start-everything.sh
# Puis choisir option 3 : EVERYTHING
```

### Séparé (Option 2)

**Terminal 1 - Web :**
```bash
cd web && ./start-all.sh
```

**Terminal 2 - Agents :**
```bash
./start_agents.sh
```

---

## 📊 Technologies

### Frontend
- **Next.js** 14.2.15 (App Router)
- **React** 18.3.1
- **TypeScript** 5.6.3
- **Tailwind CSS** 3.4.14
- **shadcn/ui** (13+ components)

### Backend
- **Python** 3.13+
- **Anthropic** (Claude)
- **OpenAI** (GPT)
- **Solana Web3** (DEX)
- **HyperLiquid SDK** (Perps)

### Database
- **PostgreSQL** 14
- **Prisma** 5.20.0 (ORM)

### Exchanges
- **Solana** (DEX on-chain)
- **HyperLiquid** (Perpetuals)
- **Aster** (Futures)

---

## 🎯 Features Principales

### Interface Web
- ✅ Dashboard avec 13 agents
- ✅ Gestion complète agents (search, filters, config)
- ✅ Trading interface (AI mode, manual)
- ✅ Analytics (performance, charts)
- ✅ Settings (5 tabs)
- ✅ Sidebar navigation
- ✅ Responsive design
- 🔄 API integration (à faire)
- 🔄 WebSocket real-time (à faire)
- 🔄 ApexCharts (à faire)

### AI Agents
- ✅ Trading Agent (1 AI ou 6 AI swarm)
- ✅ Strategy Agent (algorithmes)
- ✅ Risk Agent (risk management)
- ✅ CopyBot Agent
- ✅ Whale Agent (tracking)
- ✅ Sentiment Agent (social)
- ✅ Funding Agent
- ✅ Liquidation Agent
- ✅ Research Agent
- ✅ ChartAnalysis Agent
- ✅ Sniper Agent
- ✅ Polymarket Agent
- ✅ Solana Agent

### Database
- ✅ Schema Prisma (6 models)
- ✅ Seed script (user + agents + trades)
- ✅ Migrations automatiques
- ✅ Relations complètes

---

## 📈 Statistiques Projet

**Code :**
- **Frontend** : ~3000 lignes (TypeScript/TSX)
- **Backend** : ~5000 lignes (Python)
- **Config** : ~500 lignes

**Fichiers :**
- **Pages** : 5 pages dashboard
- **Components** : 13+ UI components
- **Agents** : 13 agents AI
- **Docs** : 25+ fichiers documentation

**Fonctionnalités :**
- **Agents AI** : 13
- **Exchanges** : 3
- **AI Models** : 6+ (Claude, GPT, Gemini, DeepSeek, Grok, Groq)
- **Pages** : 5 + login

---

## 🔐 Sécurité

### Données Sensibles
- `.env` - **JAMAIS commit** (dans .gitignore)
- Private keys - **Stockées localement uniquement**
- Passwords - **Hashés avec bcrypt**
- API keys - **Chiffrées en DB**

### Meilleures Pratiques
- ✅ Environnement variables
- ✅ Hash passwords (bcrypt)
- ✅ HTTPS en production
- ✅ Rate limiting (à implémenter)
- ✅ Input validation (à améliorer)

---

## 🔄 Workflow de Développement

### 1. Développement Local
```bash
# Web
cd web && npm run dev

# Agents
./python src/agents/trading_agent.py
```

### 2. Tests
```bash
# Frontend
cd web && npm run lint

# Backend
./python -m pytest tests/
```

### 3. Build Production
```bash
# Web
cd web
npm run build
npm run start

# Agents
# Utiliser PM2 ou systemd
pm2 start src/main.py --name moon-agents --interpreter ./python
```

---

## 📞 Support

**Documentation :**
- `QUICK_START.md` - Démarrage rapide
- `GUIDE_DEMARRAGE.md` - Guide complet
- `ARCHITECTURE.md` - Architecture backend
- `web/README_WEB.md` - Interface web
- `docs/` - 25+ docs spécifiques

**Scripts :**
- `./start-everything.sh` - Démarrage master
- `./start_agents.sh` - Menu agents
- `web/start-all.sh` - Web auto

**Logs :**
- `logs/` - Tous les logs agents
- Terminal web - Logs Next.js
- `npx prisma studio` - Explorer DB

---

**Système complet prêt à l'emploi ! 🚀**
