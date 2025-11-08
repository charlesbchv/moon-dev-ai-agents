# 🏗️ Architecture des Agents Moon Dev - Guide de Connexion

## 📊 Vue d'Ensemble du Système

```
┌─────────────────────────────────────────────────────────────┐
│                     🌙 MOON DEV AGENTS                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │         src/main.py (Orchestrateur)     │
        │   • Active/désactive les agents         │
        │   • Gère le cycle de trading            │
        │   • Coordonne les décisions             │
        └─────────────────────────────────────────┘
                      │         │         │
         ┌────────────┼─────────┼─────────┼────────────┐
         ▼            ▼         ▼         ▼            ▼
    ┌────────┐  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
    │Trading │  │Strategy │ │   Risk   │ │CopyBot  │ │Sentiment │
    │ Agent  │  │ Agent   │ │  Agent   │ │ Agent   │ │  Agent   │
    └────────┘  └─────────┘ └──────────┘ └─────────┘ └──────────┘
         │            │           │            │            │
         └────────────┴───────────┴────────────┴────────────┘
                              │
                              ▼
         ┌────────────────────────────────────────────┐
         │         DONNÉES & STRATÉGIES               │
         │  • src/data/ (données historiques)         │
         │  • src/strategies/ (algorithmes)           │
         │  • src/config.py (configuration)           │
         └────────────────────────────────────────────┘
                              │
                              ▼
         ┌────────────────────────────────────────────┐
         │         EXÉCUTION DES TRADES               │
         │  • src/exchange_manager.py                 │
         │  • src/nice_funcs.py (Solana)             │
         │  • src/nice_funcs_aster.py (Aster)        │
         │  • src/nice_funcs_hyperliquid.py (HL)     │
         └────────────────────────────────────────────┘
```

---

## 🔄 Flux de Trading Complet

### 1. **Initialisation** (main.py)

```python
# Configuration dans main.py
ACTIVE_AGENTS = {
    'risk': True,       # ✅ Surveillance des risques
    'trading': True,    # ✅ Trading avec AI
    'strategy': True,   # ✅ Stratégies algorithmiques
    'copybot': False,   # ❌ Désactivé
    'sentiment': False, # ❌ Désactivé (lancer séparément)
}
```

### 2. **Agents Actifs**

#### 📈 **Trading Agent** (`src/agents/trading_agent.py`)
- **Rôle** : Décisions de trading basées sur AI
- **Modes** :
  - Mode Simple : 1 AI (rapide ~10s)
  - Mode Essaim : 6 AI en consensus (~45-60s)
- **Sources de données** :
  - Prix en temps réel (BirdEye, CoinGecko)
  - Données historiques (`src/data/ohlcv/`)
  - Analyse technique (RSI, MACD, etc.)
- **Actions** :
  - BUY : Ouvrir/maintenir position
  - SELL : Fermer position
  - DO NOTHING : Conserver position actuelle

#### 🎯 **Strategy Agent** (`src/agents/strategy_agent.py`)
- **Rôle** : Exécute les stratégies personnalisées
- **Localisation** : `src/strategies/custom/`
- **Stratégies disponibles** :
  - `example_strategy.py` - Exemple de base
  - `private_my_strategy.py` - Votre stratégie perso
- **Flux** :
  1. Charge toutes les stratégies actives
  2. Génère des signaux pour chaque stratégie
  3. Valide avec AI (Claude)
  4. Exécute les trades validés

#### 🛡️ **Risk Agent** (`src/agents/risk_agent.py`)
- **Rôle** : Surveillance et gestion des risques
- **Vérifications** :
  - Perte max (MAX_LOSS_USD)
  - Gain max (MAX_GAIN_USD)
  - Balance minimum (MINIMUM_BALANCE_USD)
  - Allocation par position (MAX_POSITION_PERCENTAGE)
- **Actions** :
  - Alerte quand limites approchées
  - Ferme positions si risque trop élevé
  - Consultation AI avant fermeture (si USE_AI_CONFIRMATION=True)

#### 📊 **Sentiment Agent** (`src/agents/sentiment_agent.py`)
- **Rôle** : Analyse du sentiment Twitter/social
- **Note** : Lancé séparément (pas via main.py)
- **Données** : Sauvegardées dans `src/data/sentiment_history.csv`

---

## 📂 Structure des Données

### **src/data/** - Toutes les données de trading

```
src/data/
├── ohlcv/                      # Données OHLCV historiques
│   ├── BTC-USD-15m.csv
│   ├── ETH-USD-15m.csv
│   └── [TOKEN]-[TIMEFRAME].csv
├── portfolio_balance.csv       # Balance du portfolio
├── current_allocation.csv      # Allocation actuelle
├── sentiment_history.csv       # Historique sentiment
├── funding_history.csv         # Historique funding rates
├── liquidation_history.csv     # Historique liquidations
├── transactions_analysis.csv   # Analyse des transactions
└── rbi/                        # Résultats backtests
```

### **src/strategies/** - Stratégies de trading

```
src/strategies/
├── base_strategy.py           # Classe de base (héritage)
├── example_strategy.py        # Exemple de stratégie
└── custom/                    # Vos stratégies personnalisées
    ├── __init__.py
    └── private_my_strategy.py # Votre stratégie
```

---

## 🔧 Configuration Complète

### **src/config.py** - Configuration Globale

```python
# 🔄 Exchange (ligne ~7)
EXCHANGE = 'solana'  # Options: 'solana', 'hyperliquid', 'ASTER'

# 💰 Tokens à trader (Solana)
MONITORED_TOKENS = [
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',  # FART
    # Ajoutez vos tokens ici
]

# ⚡ Symboles HyperLiquid/Aster
HYPERLIQUID_SYMBOLS = ['BTC', 'ETH', 'SOL']

# 💵 Sizing
usd_size = 25                # Taille position USD
max_usd_order_size = 3       # Ordre max USD

# 🛡️ Risk Management
MAX_LOSS_USD = 25            # Perte max
MAX_GAIN_USD = 25            # Gain max
MINIMUM_BALANCE_USD = 50     # Balance min
CASH_PERCENTAGE = 20         # % cash à garder
MAX_POSITION_PERCENTAGE = 30 # % max par position

# 🤖 AI Configuration
AI_MODEL = "claude-3-haiku-20240307"
USE_SWARM_MODE = False       # True = 6 AI, False = 1 AI

# 📊 Stratégies
ENABLE_STRATEGIES = True     # Activer strategy_agent
```

### **src/agents/trading_agent.py** - Config Trading

```python
# 🏦 Exchange Selection (ligne 75)
EXCHANGE = "SOLANA"  # "ASTER", "HYPERLIQUID", ou "SOLANA"

# 🌊 AI Mode (ligne 81)
USE_SWARM_MODE = False  # True = 6 AI consensus

# 📈 Trading Mode (ligne 85)
LONG_ONLY = True  # True = Long only, False = Long/Short

# 💰 Position Sizing (ligne 113-120)
usd_size = 25  # Taille position cible USD
```

---

## 🚀 Démarrage Complet

### **Option 1 : Tout en Un (main.py)**

```bash
# 1. Activer les agents dans main.py
# Éditer ACTIVE_AGENTS pour choisir les agents

# 2. Configurer les tokens/symboles dans config.py
# MONITORED_TOKENS pour Solana
# HYPERLIQUID_SYMBOLS pour HyperLiquid/Aster

# 3. Lancer
./python src/main.py
```

### **Option 2 : Agents Individuels**

```bash
# Trading Agent uniquement
./python src/agents/trading_agent.py

# Strategy Agent uniquement
./python src/agents/strategy_agent.py

# Risk Agent uniquement
./python src/agents/risk_agent.py

# Sentiment Agent
./python src/agents/sentiment_agent.py

# Whale Agent
./python src/agents/whale_agent.py
```

### **Option 3 : Menu Interactif**

```bash
./start_agents.sh
# Choisir l'option 3 : Tous les agents
```

---

## 📝 Créer une Stratégie Personnalisée

### Étape 1 : Créer le fichier

```bash
nano src/strategies/custom/ma_crossover_strategy.py
```

### Étape 2 : Code de la stratégie

```python
"""
🌙 Ma Stratégie de Croisement de Moyennes Mobiles
"""

from src.strategies.base_strategy import BaseStrategy
from src.config import *
import pandas as pd

class MACrossoverStrategy(BaseStrategy):
    def __init__(self):
        super().__init__("MA Crossover")
        self.fast_period = 10
        self.slow_period = 30
    
    def generate_signals(self) -> dict:
        """Génère des signaux de trading basés sur le croisement des MA"""
        
        # Charger les données OHLCV
        token = MONITORED_TOKENS[0]
        data = self.load_ohlcv_data(token)
        
        # Calculer les moyennes mobiles
        data['MA_fast'] = data['close'].rolling(self.fast_period).mean()
        data['MA_slow'] = data['close'].rolling(self.slow_period).mean()
        
        # Dernier point
        last_row = data.iloc[-1]
        prev_row = data.iloc[-2]
        
        # Détection de croisement
        if last_row['MA_fast'] > last_row['MA_slow'] and \
           prev_row['MA_fast'] <= prev_row['MA_slow']:
            # Croisement haussier
            return {
                'token': token,
                'signal': 0.8,
                'direction': 'BUY',
                'metadata': {
                    'ma_fast': last_row['MA_fast'],
                    'ma_slow': last_row['MA_slow'],
                    'reason': 'Golden Cross'
                }
            }
        elif last_row['MA_fast'] < last_row['MA_slow'] and \
             prev_row['MA_fast'] >= prev_row['MA_slow']:
            # Croisement baissier
            return {
                'token': token,
                'signal': 0.8,
                'direction': 'SELL',
                'metadata': {
                    'ma_fast': last_row['MA_fast'],
                    'ma_slow': last_row['MA_slow'],
                    'reason': 'Death Cross'
                }
            }
        
        # Pas de signal
        return {
            'token': token,
            'signal': 0,
            'direction': 'NEUTRAL',
            'metadata': {}
        }
    
    def load_ohlcv_data(self, token):
        """Charge les données OHLCV depuis src/data/ohlcv/"""
        import os
        file_path = f"src/data/ohlcv/{token}_{DATA_TIMEFRAME}.csv"
        
        if os.path.exists(file_path):
            return pd.read_csv(file_path)
        else:
            # Collecter les données si pas disponibles
            from src.data.ohlcv_collector import collect_ohlcv
            return collect_ohlcv(token, DAYSBACK_4_DATA, DATA_TIMEFRAME)
```

### Étape 3 : Enregistrer la stratégie

Éditer `src/agents/strategy_agent.py` ligne ~73 :

```python
# Importer votre stratégie
from src.strategies.custom.ma_crossover_strategy import MACrossoverStrategy

# L'ajouter aux stratégies actives (ligne ~78)
self.enabled_strategies.extend([
    ExampleStrategy(),
    MyStrategy(),
    MACrossoverStrategy()  # ✨ Nouvelle stratégie
])
```

### Étape 4 : Activer et lancer

```python
# Dans config.py
ENABLE_STRATEGIES = True

# Lancer
./python src/agents/strategy_agent.py
```

---

## 🔗 Connexion des Composants

### **Trading Agent → Données**

```python
# Le trading agent utilise :
- src/data/ohlcv/[TOKEN]_[TIMEFRAME].csv  # Prix historiques
- BirdEye API (temps réel)
- CoinGecko API (marché)
```

### **Strategy Agent → Stratégies → Données**

```python
# Flux :
1. strategy_agent charge strategies/custom/*.py
2. Chaque stratégie analyse src/data/ohlcv/
3. Génère des signaux (BUY/SELL/NEUTRAL)
4. strategy_agent valide avec AI
5. Exécute via exchange_manager
```

### **Risk Agent → Portfolio**

```python
# Le risk agent surveille :
- src/data/portfolio_balance.csv
- src/data/current_allocation.csv
- src/data/transactions_analysis.csv
```

### **Tous → Exchange Manager**

```python
# Tous les agents exécutent via :
from src.exchange_manager import ExchangeManager

em = ExchangeManager()
em.buy(symbol, amount)    # Ouvrir position
em.sell(symbol, amount)   # Fermer position
em.get_balance()          # Récupérer balance
```

---

## 🎯 Workflow Complet Recommandé

### Phase 1 : Configuration (5 min)

```bash
# 1. Vérifier la config
./python check_config.py

# 2. Éditer les tokens
nano src/config.py
# Remplir MONITORED_TOKENS ou HYPERLIQUID_SYMBOLS

# 3. Choisir le mode
# main.py : ACTIVE_AGENTS
# config.py : USE_SWARM_MODE, ENABLE_STRATEGIES
```

### Phase 2 : Test des Stratégies (Optionnel)

```bash
# 1. Créer votre stratégie
nano src/strategies/custom/my_strategy.py

# 2. Tester isolément
./python src/agents/strategy_agent.py

# 3. Observer les signaux générés
```

### Phase 3 : Trading (Production)

```bash
# Option A : Tout en un
./python src/main.py

# Option B : Menu
./start_agents.sh
# Choisir option 3

# Option C : Agents séparés
./python src/agents/trading_agent.py &
./python src/agents/risk_agent.py &
./python src/agents/strategy_agent.py &
```

### Phase 4 : Monitoring

```bash
# Voir les logs
tail -f logs/trading_agent.log
tail -f logs/strategy_agent.log
tail -f logs/risk_agent.log

# Voir les données
cat src/data/portfolio_balance.csv
cat src/data/current_allocation.csv
cat src/data/transactions_analysis.csv
```

---

## 📊 Données Importantes

### **portfolio_balance.csv**
```csv
timestamp,total_value_usd,cash_usd,positions_value_usd
2025-11-08 01:00:00,1000.00,200.00,800.00
```

### **current_allocation.csv**
```csv
token,amount,value_usd,percentage
BTC,0.01,500.00,50%
ETH,0.5,300.00,30%
USDC,200.00,200.00,20%
```

### **transactions_analysis.csv**
```csv
timestamp,symbol,action,amount,price,value_usd,reason
2025-11-08 01:00:00,BTC,BUY,0.01,50000,500,AI Signal
```

---

## 🆘 Problèmes Courants

### ❌ "No strategies loaded"

```bash
# Vérifier que ENABLE_STRATEGIES = True dans config.py
nano src/config.py

# Vérifier que les fichiers existent
ls src/strategies/custom/
```

### ❌ "No OHLCV data found"

```bash
# Collecter les données manuellement
./python src/data/ohlcv_collector.py

# Ou vérifier DATA_TIMEFRAME et DAYSBACK_4_DATA dans config.py
```

### ❌ "Agent not trading"

```bash
# 1. Vérifier que l'agent est activé dans main.py
# 2. Vérifier MONITORED_TOKENS n'est pas vide
# 3. Voir les logs : tail -f logs/trading_agent.log
```

---

## 🎓 Exemples d'Utilisation

### Exemple 1 : Trading Simple sur Solana

```python
# config.py
EXCHANGE = 'solana'
MONITORED_TOKENS = ['9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump']
USE_SWARM_MODE = False
ENABLE_STRATEGIES = False

# Lancer
./python src/agents/trading_agent.py
```

### Exemple 2 : Trading avec Stratégies

```python
# config.py
ENABLE_STRATEGIES = True

# main.py
ACTIVE_AGENTS = {
    'risk': True,
    'trading': True,
    'strategy': True,
}

# Lancer
./python src/main.py
```

### Exemple 3 : Mode Essaim sur HyperLiquid

```python
# config.py
EXCHANGE = 'hyperliquid'
HYPERLIQUID_SYMBOLS = ['BTC', 'ETH']
USE_SWARM_MODE = True

# Lancer
./python src/agents/trading_agent.py
```

---

🌙 **Tout est maintenant connecté et prêt à fonctionner !** 🚀

Pour plus de détails, consultez :
- `DEMARRAGE_AGENTS.md` - Guide complet
- `CONFIGURATION_RAPIDE.md` - Config rapide
- `README.md` - Documentation originale
