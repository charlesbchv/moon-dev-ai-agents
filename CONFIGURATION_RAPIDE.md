# 🔧 Configuration Rapide - Moon Dev Trading Agents

## ✅ Checklist de Configuration

### 1. Variables d'Environnement (.env)

```bash
# Créer le fichier .env
cp .env_example .env

# Éditer avec vos clés
nano .env  # ou vim .env, ou votre éditeur préféré
```

**Clés OBLIGATOIRES pour trader :**
- [ ] `BIRDEYE_API_KEY` - Données de marché
- [ ] `RPC_ENDPOINT` - Node Solana
- [ ] `SOLANA_PRIVATE_KEY` - Votre clé privée (⚠️ GARDEZ SECRÈTE!)
- [ ] `ANTHROPIC_KEY` - Pour Claude AI (recommandé)

**Clés OPTIONNELLES :**
- [ ] `ELEVENLABS_API_KEY` - Alertes vocales
- [ ] `DEEPSEEK_KEY` - AI gratuit
- [ ] `OPENAI_KEY` - GPT models

### 2. Configuration du Trading (src/config.py)

```python
# Exchange à utiliser
EXCHANGE = 'solana'  # ou 'hyperliquid'

# Taille des positions
usd_size = 25                    # ⬅️ IMPORTANT: Taille position USD
max_usd_order_size = 3           # ⬅️ Taille max ordre

# Tokens à trader (Solana)
MONITORED_TOKENS = [
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',  # FART
    # ⬅️ AJOUTEZ VOS TOKENS ICI
]

# Symboles HyperLiquid
HYPERLIQUID_SYMBOLS = ['BTC', 'ETH', 'SOL']  # ⬅️ Perps à trader

# Risque
MAX_LOSS_USD = 25                # ⬅️ Perte max avant stop
MAX_GAIN_USD = 25                # ⬅️ Gain max avant stop
MINIMUM_BALANCE_USD = 50         # ⬅️ Balance minimum

# Mode AI
USE_SWARM_MODE = False           # ⬅️ True = 6 AI, False = 1 AI
AI_MODEL = "claude-3-haiku-20240307"  # Modèle par défaut
```

### 3. Installation des Dépendances

```bash
cd /Users/batchaev/git/moon-dev-ai-agents
pip install -r requirements.txt
```

---

## 🚀 Démarrage Rapide

### Option A : Script Interactif (Recommandé)

```bash
./start_agents.sh
```

Vous verrez un menu avec les options :
1. Trading Simple
2. Trading Essaim (6 AI)
3. Tous les agents
4. Surveillance seulement
5. Backtesting
6. Mode Testnet
7. Arrêter tout
8. Voir les logs

### Option B : Commandes Manuelles

```bash
# Un seul agent
python src/agents/trading_agent.py

# Plusieurs agents en arrière-plan
nohup python src/agents/trading_agent.py > logs/trading.log 2>&1 &
nohup python src/agents/risk_agent.py > logs/risk.log 2>&1 &
nohup python src/agents/whale_agent.py > logs/whale.log 2>&1 &
```

---

## 📊 Vérifier que Tout Fonctionne

### Test 1 : Vérifier les Clés API

```python
python -c "
import os
from dotenv import load_dotenv
load_dotenv()

keys = {
    'BIRDEYE_API_KEY': os.getenv('BIRDEYE_API_KEY'),
    'RPC_ENDPOINT': os.getenv('RPC_ENDPOINT'),
    'ANTHROPIC_KEY': os.getenv('ANTHROPIC_KEY'),
    'SOLANA_PRIVATE_KEY': os.getenv('SOLANA_PRIVATE_KEY')
}

for key, value in keys.items():
    status = '✅' if value and value != 'your_key_here' else '❌'
    print(f'{status} {key}: {'Configuré' if value and value != 'your_key_here' else 'Manquant'}')
"
```

### Test 2 : Mode Testnet (Sûr)

```bash
# 1. Activer testnet dans .env
echo "USE_TESTNET=true" >> .env

# 2. Lancer l'agent
python src/agents/trading_agent.py

# 3. Observer les logs
tail -f logs/trading_agent.log
```

### Test 3 : Vérifier les Processus

```bash
# Voir les agents actifs
ps aux | grep "python src/agents"

# Compter les agents actifs
ps aux | grep "python src/agents" | wc -l
```

---

## 🎯 Workflows Courants

### Workflow 1 : Trading Conservateur

```bash
# 1. Config conservatrice
usd_size = 10
MAX_LOSS_USD = 15
USE_SWARM_MODE = True  # Consensus de 6 AI

# 2. Lancer avec surveillance
./start_agents.sh
# Choisir option 3 (Tous les agents)
```

### Workflow 2 : Trading Agressif

```bash
# 1. Config agressive
usd_size = 50
MAX_LOSS_USD = 50
USE_SWARM_MODE = False  # Décision rapide

# 2. Lancer trading + whale
nohup python src/agents/trading_agent.py > logs/trading.log 2>&1 &
nohup python src/agents/whale_agent.py > logs/whale.log 2>&1 &
```

### Workflow 3 : Recherche & Backtest

```bash
# 1. Rechercher des stratégies
python src/agents/research_agent.py

# 2. Générer des backtests
python src/agents/rbi_agent.py

# 3. Tester en parallèle
python src/agents/rbi_agent_pp_multi.py
```

---

## 🔍 Monitoring

### Voir les Logs en Temps Réel

```bash
# Trading
tail -f logs/trading_agent.log

# Risque
tail -f logs/risk_agent.log

# Whale
tail -f logs/whale_agent.log

# Tous ensemble
tail -f logs/*.log
```

### Dashboard Web (RBI Parallel)

```bash
# Lancer RBI avec dashboard
python src/agents/rbi_agent_pp_multi.py

# Ouvrir dans le navigateur
# http://localhost:8050
```

---

## 🛑 Arrêt d'Urgence

### Arrêter Tous les Agents

```bash
# Méthode 1 : Script
./start_agents.sh
# Choisir option 7

# Méthode 2 : Commande
pkill -f "python src/agents"

# Méthode 3 : Arrêt spécifique
pkill -f "trading_agent.py"
```

### Vérifier que Tout est Arrêté

```bash
ps aux | grep "python src/agents"
# Devrait ne rien retourner
```

---

## ⚠️ Sécurité

### ✅ À FAIRE

- [ ] Tester d'abord sur testnet (`USE_TESTNET=true`)
- [ ] Commencer avec de petites positions (`usd_size = 10`)
- [ ] Activer `USE_AI_CONFIRMATION = True`
- [ ] Surveiller les logs régulièrement
- [ ] Garder `MINIMUM_BALANCE_USD` conservateur
- [ ] Sauvegarder votre `.env` (pas sur GitHub!)

### ❌ À NE PAS FAIRE

- ❌ Ne JAMAIS commit le fichier `.env`
- ❌ Ne JAMAIS partager vos clés privées
- ❌ Ne pas trader avec plus que vous pouvez perdre
- ❌ Ne pas lancer en production sans tester
- ❌ Ne pas laisser les agents sans surveillance

---

## 🆘 Problèmes Courants

### "ModuleNotFoundError"

```bash
pip install -r requirements.txt
```

### "API Key not found"

Vérifier que `.env` existe et contient vos clés :

```bash
cat .env | grep API_KEY
```

### "Insufficient funds"

Réduire `usd_size` dans `config.py` :

```python
usd_size = 5  # Plus petit
```

### Les Agents ne Tradent Pas

1. Vérifier `MONITORED_TOKENS` n'est pas vide
2. Vérifier `USE_TESTNET=false` pour mainnet
3. Vérifier les logs : `tail -f logs/trading_agent.log`

---

## 📞 Support

- **Discord**: https://discord.gg/8UPuVZ53bh
- **YouTube**: https://www.youtube.com/playlist?list=PLXrNVMjRZUJg4M4uz52iGd1LhXXGVbIFz
- **Documentation**: README.md et DEMARRAGE_AGENTS.md

---

🌙 **Moon Dev - Let's go to the moon!** 🚀
