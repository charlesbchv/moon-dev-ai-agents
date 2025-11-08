# 🚀 Quick Start - Moon Dev AI Trading Platform

## Démarrage Ultra-Rapide

### Option 1 : Tout en Un (Recommandé) 🎯

```bash
cd /Users/batchaev/git/moon-dev-ai-agents
./start-everything.sh
```

**Choisissez :**
- `1` = Web Interface uniquement (Dashboard)
- `2` = AI Agents uniquement (Python backend)
- `3` = **TOUT** (Web + Agents dans 2 terminaux) ⭐
- `4` = Voir le statut du système
- `5` = Tout arrêter

### Option 2 : Séparé (2 Terminaux)

**Terminal 1 - Web Interface :**
```bash
cd /Users/batchaev/git/moon-dev-ai-agents/web
./start-all.sh
```
➜ Ouvre http://localhost:3000

**Terminal 2 - AI Agents :**
```bash
cd /Users/batchaev/git/moon-dev-ai-agents
./start_agents.sh
```
➜ Menu interactif pour choisir les agents

---

## 🔑 Connexion

Une fois démarré :
- **URL** : http://localhost:3000
- **Email** : `gabriel@gmail.com`
- **Password** : `12345678`

---

## 📊 Pages Disponibles

Après connexion :
- `/dashboard` - Vue d'ensemble avec 13 agents
- `/dashboard/agents` - Gestion complète des agents
- `/dashboard/trading` - Interface de trading manuelle/AI
- `/dashboard/analytics` - Performances et statistiques
- `/dashboard/settings` - Configuration (Profile, Trading, API Keys)

---

## 🤖 Agents AI Disponibles

**Trading** :
- Trading Agent (AI LLM - 1 ou 6 AI en swarm)
- Strategy Agent (Algorithmes)
- Risk Agent (Gestion des risques)
- CopyBot Agent (Copy trading)

**Surveillance** :
- Whale Agent (Tracking baleines)
- Sentiment Agent (Twitter/Social)
- Funding Agent (Taux financement)
- Liquidation Agent (Liquidations)

**Analyse** :
- Research Agent (Deep dive tokens)
- ChartAnalysis Agent (Analyse technique)
- Sniper Agent (Nouveaux listings)

**Autres** :
- Polymarket Agent (Paris prédictifs)
- Solana Agent (DEX Solana)

---

## ⚙️ Configuration Rapide

### 1. Clés API (`.env`)

```bash
nano .env
```

Minimum requis :
```env
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
```

### 2. Config Trading (`src/config.py`)

```bash
nano src/config.py
```

Paramètres importants :
```python
EXCHANGE = 'solana'              # Exchange à utiliser
usd_size = 25                    # Taille position
MAX_LOSS_USD = 25                # Perte max
USE_SWARM_MODE = False           # 1 AI ou 6 AI
```

---

## 🔍 Commandes Utiles

### Vérifier le Statut
```bash
./start-everything.sh   # Puis option 4
```

### Voir les Logs
```bash
tail -f logs/trading_agent.log
tail -f logs/strategy_agent.log
tail -f logs/risk_agent.log
```

### Arrêter Tout
```bash
./start-everything.sh   # Puis option 5
```

### Base de Données (Prisma Studio)
```bash
cd web && npx prisma studio
```
➜ Ouvre http://localhost:5555

---

## 🐛 Problèmes Courants

### Port 3000 occupé
```bash
kill $(lsof -ti:3000)
```

### PostgreSQL pas démarré
```bash
brew services start postgresql@14
```

### Erreur Prisma Database
```bash
cd web
npx prisma db push
npm run db:seed
```

---

## 📚 Documentation Complète

Voir `GUIDE_DEMARRAGE.md` pour :
- Configuration détaillée
- Workflows recommandés
- Troubleshooting complet
- Architecture système

---

## 💡 Tips

- **Premier lancement** : Utilise `./start-everything.sh` option 3
- **Trading conservateur** : Active seulement Trading + Risk agents
- **Trading agressif** : Active tous les agents
- **Test sans risque** : Mode Testnet dans `start_agents.sh`
- **Monitoring** : Garde un œil sur les logs en temps réel

---

**Prêt à trader ! 🚀**

Questions ? Consulte `GUIDE_DEMARRAGE.md` ou les docs dans `/docs`
