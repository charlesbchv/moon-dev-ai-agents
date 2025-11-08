# 🚀 Guide de Démarrage des Agents Moon Dev

## 📋 Table des Matières
1. [Configuration Initiale](#configuration-initiale)
2. [Configuration des Variables d'Environnement](#configuration-des-variables-denvironnement)
3. [Configuration du Trading](#configuration-du-trading)
4. [Démarrage des Agents](#démarrage-des-agents)
5. [Types d'Agents Disponibles](#types-dagents-disponibles)

---

## 1. Configuration Initiale

### Installation des Dépendances

```bash
# Depuis la racine du projet
pip install -r requirements.txt
```

### Structure du Projet

```
moon-dev-ai-agents/
├── src/
│   ├── config.py          # Configuration principale
│   ├── agents/            # Tous les agents
│   ├── strategies/        # Stratégies de trading
│   └── data/              # Données collectées
├── .env                   # Variables d'environnement (à créer)
├── .env_example          # Template des variables
└── requirements.txt      # Dépendances Python
```

---

## 2. Configuration des Variables d'Environnement

### Étape 1 : Créer le fichier .env

```bash
# Copier le template
cp .env_example .env
```

### Étape 2 : Remplir les Clés API Essentielles

Éditez le fichier `.env` avec vos propres clés :

```bash
# 🔑 Clés API Trading (OBLIGATOIRES)
BIRDEYE_API_KEY=votre_cle_birdeye           # Pour les données de marché
RPC_ENDPOINT=votre_endpoint_helius          # Pour Solana
MOONDEV_API_KEY=votre_cle_moondev           # API Moon Dev

# 🔐 Clés Blockchain (TRÈS IMPORTANT - GARDEZ SECRÈTES!)
SOLANA_PRIVATE_KEY=votre_cle_privee_solana  # Clé privée Solana (Base58)
HYPER_LIQUID_KEY=votre_cle_eth              # Clé privée Ethereum pour HyperLiquid

# 🤖 Clés AI (Choisissez selon vos besoins)
ANTHROPIC_KEY=votre_cle_claude              # Pour Claude (recommandé)
OPENAI_KEY=votre_cle_openai                 # Pour GPT
DEEPSEEK_KEY=votre_cle_deepseek             # Pour DeepSeek (gratuit!)
GEMINI_KEY=votre_cle_google                 # Pour Gemini
GROK_API_KEY=votre_cle_grok                 # Pour Grok
GROQ_API_KEY=votre_cle_groq                 # Pour Groq (rapide)

# 🎤 Clés Optionnelles
ELEVENLABS_API_KEY=votre_cle_elevenlabs     # Pour les alertes vocales
YOUTUBE_API_KEY=votre_cle_youtube           # Pour le research agent
```

### Où Obtenir les Clés API ?

- **BirdEye**: https://birdeye.so/
- **Helius RPC**: https://helius.dev/
- **Anthropic (Claude)**: https://console.anthropic.com/
- **OpenAI**: https://platform.openai.com/
- **DeepSeek**: https://platform.deepseek.com/
- **Google (Gemini)**: https://makersuite.google.com/
- **ElevenLabs**: https://elevenlabs.io/

---

## 3. Configuration du Trading

### Éditer `src/config.py`

```python
# 🔄 Choisir l'Exchange
EXCHANGE = 'solana'  # Options: 'solana' ou 'hyperliquid'

# 💰 Configuration de Position
usd_size = 25               # Taille de position à maintenir (USD)
max_usd_order_size = 3      # Taille max d'ordre (USD)
tx_sleep = 30               # Pause entre transactions (secondes)
slippage = 199              # Slippage toléré (199 = 1.99%)

# 🛡️ Gestion des Risques
CASH_PERCENTAGE = 20                # % minimum à garder en USDC (0-100)
MAX_POSITION_PERCENTAGE = 30        # % max par position (0-100)
MAX_LOSS_USD = 25                   # Perte max en USD avant arrêt
MAX_GAIN_USD = 25                   # Gain max en USD avant arrêt
MINIMUM_BALANCE_USD = 50            # Balance minimum (sécurité)
USE_AI_CONFIRMATION = True          # Demander confirmation AI avant fermeture

# 📊 Tokens à Trader (Solana)
MONITORED_TOKENS = [
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',  # Exemple: FART
    # Ajoutez vos tokens ici
]

# ⚡ Configuration HyperLiquid
HYPERLIQUID_SYMBOLS = ['BTC', 'ETH', 'SOL']  # Symboles perps
HYPERLIQUID_LEVERAGE = 5                      # Levier (1-50)

# 🤖 Modèle AI
AI_MODEL = "claude-3-haiku-20240307"  # Modèle par défaut
USE_SWARM_MODE = False                # Mode essaim (6 AI en parallèle)

# 🕒 Timing
SLEEP_BETWEEN_RUNS_MINUTES = 15  # Pause entre runs
```

---

## 4. Démarrage des Agents

### 🎯 Méthode 1 : Agents Individuels

```bash
cd /Users/batchaev/git/moon-dev-ai-agents

# Agent de Trading (Mode Simple)
python src/agents/trading_agent.py

# Agent de Trading (Mode Essaim - 6 AI)
# Modifier USE_SWARM_MODE = True dans config.py, puis:
python src/agents/trading_agent.py

# Agent de Risque
python src/agents/risk_agent.py

# Agent de Stratégie
python src/agents/strategy_agent.py

# Agent de Recherche
python src/agents/research_agent.py

# Agent RBI (Backtesting)
python src/agents/rbi_agent.py

# Agent RBI Parallèle (18 threads)
python src/agents/rbi_agent_pp_multi.py

# Agent Whale (Surveillance)
python src/agents/whale_agent.py

# Agent de Sentiment
python src/agents/sentiment_agent.py

# Agent Chart Analysis
python src/agents/chartanalysis_agent.py

# Agent Funding
python src/agents/funding_agent.py

# Agent Liquidation
python src/agents/liquidation_agent.py
```

### 🚀 Méthode 2 : Lancer Plusieurs Agents (Recommandé)

Créez un script `start_agents.sh` :

```bash
#!/bin/bash

# Lancer les agents en arrière-plan
cd /Users/batchaev/git/moon-dev-ai-agents

# Agent de Trading (cœur du système)
nohup python src/agents/trading_agent.py > logs/trading_agent.log 2>&1 &
echo "Trading Agent démarré (PID: $!)"

# Agent de Risque (surveillance)
nohup python src/agents/risk_agent.py > logs/risk_agent.log 2>&1 &
echo "Risk Agent démarré (PID: $!)"

# Agent de Stratégie (exécution des stratégies)
nohup python src/agents/strategy_agent.py > logs/strategy_agent.log 2>&1 &
echo "Strategy Agent démarré (PID: $!)"

# Agent Whale (surveillance des baleines)
nohup python src/agents/whale_agent.py > logs/whale_agent.log 2>&1 &
echo "Whale Agent démarré (PID: $!)"

echo "✅ Tous les agents sont démarrés!"
echo "📊 Voir les logs dans le dossier logs/"
```

Rendre exécutable et lancer :

```bash
chmod +x start_agents.sh
mkdir -p logs
./start_agents.sh
```

### 📊 Méthode 3 : Mode Test (Testnet)

Modifiez dans `.env` :

```bash
USE_TESTNET=true
```

Puis lancez l'agent :

```bash
python src/agents/trading_agent.py
```

---

## 5. Types d'Agents Disponibles

### 🔴 Agents de Trading Live (À utiliser APRÈS backtesting!)

| Agent | Fichier | Description |
|-------|---------|-------------|
| **Trading Agent** | `trading_agent.py` | Trading automatique avec AI (mode simple ou essaim) |
| **Strategy Agent** | `strategy_agent.py` | Exécute les stratégies du dossier strategies/ |
| **Risk Agent** | `risk_agent.py` | Surveille et gère les risques du portfolio |
| **Copy Agent** | `copy_agent.py` | Copie les trades d'autres wallets |

### 🟢 Agents de Backtesting & Recherche (Sûrs)

| Agent | Fichier | Description |
|-------|---------|-------------|
| **RBI Agent** | `rbi_agent.py` | Recherche et code des backtests automatiquement |
| **RBI Parallel** | `rbi_agent_pp_multi.py` | Version parallèle (18 threads) avec dashboard |
| **Research Agent** | `research_agent.py` | Cherche des idées de stratégies |
| **Websearch Agent** | `websearch_agent.py` | Recherche web pour stratégies |

### 🟡 Agents d'Analyse Marché (Surveillance)

| Agent | Fichier | Description |
|-------|---------|-------------|
| **Whale Agent** | `whale_agent.py` | Surveille l'activité des baleines |
| **Sentiment Agent** | `sentiment_agent.py` | Analyse le sentiment Twitter |
| **Chart Agent** | `chartanalysis_agent.py` | Analyse technique avec AI |
| **Funding Agent** | `funding_agent.py` | Surveille les taux de funding |
| **Liquidation Agent** | `liquidation_agent.py` | Track les liquidations |
| **Listing Arb Agent** | `listingarb_agent.py` | Trouve tokens avant listing CEX |

---

## 🎯 Workflow Recommandé

### Phase 1 : Recherche (Sûr) ✅

```bash
# 1. Rechercher des idées
python src/agents/research_agent.py

# 2. Créer des backtests
python src/agents/rbi_agent.py

# 3. Tester en parallèle
python src/agents/rbi_agent_pp_multi.py
```

### Phase 2 : Surveillance (Sûr) ✅

```bash
# Lancer les agents de surveillance
python src/agents/whale_agent.py &
python src/agents/sentiment_agent.py &
python src/agents/funding_agent.py &
python src/agents/liquidation_agent.py &
```

### Phase 3 : Trading Live (TESTNET d'abord!) ⚠️

```bash
# 1. Configurer USE_TESTNET=true dans .env
# 2. Tester sur testnet
python src/agents/trading_agent.py

# 3. Une fois validé, passer en mainnet
# Modifier USE_TESTNET=false dans .env
python src/agents/trading_agent.py
```

---

## 🔧 Commandes Utiles

### Voir les Processus en Cours

```bash
ps aux | grep python
```

### Arrêter Tous les Agents

```bash
pkill -f "python src/agents"
```

### Arrêter un Agent Spécifique

```bash
pkill -f "trading_agent.py"
```

### Voir les Logs en Temps Réel

```bash
tail -f logs/trading_agent.log
```

---

## 🆘 Dépannage

### Erreur : "No module named 'anthropic'"

```bash
pip install -r requirements.txt
```

### Erreur : "API Key not found"

Vérifiez que votre fichier `.env` existe et contient les bonnes clés.

### Erreur : "Insufficient funds"

Vérifiez votre balance et ajustez `usd_size` dans `config.py`.

### Les Agents Ne Tradent Pas

1. Vérifiez que `MONITORED_TOKENS` contient des tokens
2. Vérifiez que `USE_TESTNET=false` pour le mainnet
3. Vérifiez les logs : `tail -f logs/trading_agent.log`

---

## 📚 Ressources Supplémentaires

- **Documentation Complète** : Voir `README.md`
- **Vidéos Tutoriels** : https://www.youtube.com/playlist?list=PLXrNVMjRZUJg4M4uz52iGd1LhXXGVbIFz
- **Discord Community** : https://discord.gg/8UPuVZ53bh
- **Site Web** : https://www.moondev.com/

---

## ⚠️ Avertissements

1. **Testez TOUJOURS sur testnet d'abord**
2. **Ne tradez JAMAIS avec plus que vous pouvez vous permettre de perdre**
3. **Gardez vos clés privées SECRÈTES**
4. **Backtestez vos stratégies avant de les utiliser en live**
5. **Surveillez vos agents régulièrement**

---

🌙 **Built with love by Moon Dev** 🚀

Pour toute question, rejoignez notre Discord ou consultez la documentation complète.
