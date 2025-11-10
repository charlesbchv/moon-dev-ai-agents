# 🔶 Binance Integration Guide

## 📋 Overview

L'intégration Binance permet de trader sur **Binance Spot** et **Binance Futures** avec la même interface que Solana et HyperLiquid.

---

## 🚀 Quick Setup

### 1. Installer les Dépendances

```bash
cd /Users/batchaev/git/moon-dev-ai-agents
./python -m pip install python-binance
```

### 2. Obtenir les Clés API Binance

1. Va sur [Binance API Management](https://www.binance.com/en/my/settings/api-management)
2. Crée une nouvelle API Key
3. **Active les permissions** :
   - ✅ Enable Reading
   - ✅ Enable Spot & Margin Trading
   - ✅ Enable Futures (si tu veux trader les futures)
   - ❌ Enable Withdrawals (PAS nécessaire, plus sécurisé)

4. **Whitelist IP** (optionnel mais recommandé) :
   - Ajoute ton IP pour plus de sécurité
   - Ou utilise "Unrestricted" pour tester

5. **Note les clés** :
   - API Key : `xxxx`
   - Secret Key : `yyyy`

### 3. Configurer l'Environnement

Ajoute dans `.env` :

```env
# Binance Configuration
BINANCE_API_KEY=your_api_key_here
BINANCE_SECRET_KEY=your_secret_key_here
BINANCE_TESTNET=False  # True pour Testnet, False pour production
```

### 4. Configurer config.py

```bash
nano src/config.py
```

Modifie la ligne :

```python
EXCHANGE = 'binance'  # Change de 'solana' ou 'hyperliquid' à 'binance'

# Symboles à trader
BINANCE_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT']

# Spot ou Futures
BINANCE_USE_FUTURES = False  # True pour Futures
```

---

## 🎯 Utilisation

### Mode Simple

```bash
cd /Users/batchaev/git/moon-dev-ai-agents
./python src/agents/trading_agent.py
```

L'agent détectera automatiquement que tu utilises Binance et tradera les symboles configurés dans `BINANCE_SYMBOLS`.

### Test Direct

```bash
./python src/nice_funcs_binance.py
```

Cela affichera :
- Balance USDT
- Prix BTC actuel
- Changement 24h
- Portfolio complet

---

## 📊 Fonctions Disponibles

### Trading de Base

```python
from src import nice_funcs_binance as binance

# Market Buy
result = binance.market_buy('BTCUSDT', 25)  # Acheter $25 de BTC

# Market Sell
result = binance.market_sell('BTCUSDT', 100)  # Vendre 100% de BTC

# Limit Orders
binance.limit_buy('BTCUSDT', 25, 65000)  # Buy à $65k
binance.limit_sell('BTCUSDT', 0.001, 70000)  # Sell à $70k
```

### Informations

```python
# Balance
usdt = binance.get_balance('USDT')
btc = binance.get_balance('BTC')

# Prix
price = binance.get_price('BTCUSDT')

# Stats 24h
stats = binance.get_24h_change('BTCUSDT')
# Returns: {'price', 'change_percent', 'high', 'low', 'volume'}

# Portfolio
portfolio = binance.get_portfolio_value()
binance.print_portfolio()
```

### Ordres

```python
# Ordres ouverts
orders = binance.get_open_orders('BTCUSDT')

# Historique
history = binance.get_order_history('BTCUSDT', limit=10)

# Annuler
binance.cancel_order('BTCUSDT', order_id)
```

### Données de Marché

```python
# Klines/Candlesticks
df = binance.get_klines('BTCUSDT', interval='1h', limit=100)
# Returns: DataFrame avec columns [timestamp, open, high, low, close, volume]
```

---

## ⚙️ Configuration Avancée

### Symboles à Trader

Dans `src/config.py` :

```python
# Spot Trading (recommandé pour commencer)
BINANCE_SYMBOLS = [
    'BTCUSDT',   # Bitcoin
    'ETHUSDT',   # Ethereum
    'SOLUSDT',   # Solana
    'BNBUSDT',   # Binance Coin
    'ADAUSDT',   # Cardano
    'DOGEUSDT',  # Dogecoin
]

BINANCE_USE_FUTURES = False
```

### Futures Trading (Plus risqué)

```python
BINANCE_SYMBOLS = [
    'BTCUSDT',
    'ETHUSDT',
]

BINANCE_USE_FUTURES = True  # Active Futures
```

⚠️ **Note** : Pour Futures, tu dois installer `python-binance[futures]` et utiliser `nice_funcs_binance_futures.py` (à créer).

---

## 🔄 Intégration avec Trading Agent

Le Trading Agent fonctionne automatiquement avec Binance :

```python
# Dans trading_agent.py
from src.exchange_manager import ExchangeManager

# Init avec config
em = ExchangeManager()  # Lit EXCHANGE depuis config.py

# Trading
em.market_buy('BTCUSDT', 25)  # Fonctionne avec Binance
em.market_sell('BTCUSDT', 50)  # Vend 50%

# Position
position = em.get_position('BTCUSDT')
```

---

## 🧪 Testnet (Recommandé pour débuter)

### Setup Testnet

1. Va sur [Binance Testnet](https://testnet.binance.vision/)
2. Crée un compte testnet
3. Génère des API keys
4. Dans `.env` :

```env
BINANCE_API_KEY=testnet_key
BINANCE_SECRET_KEY=testnet_secret
BINANCE_TESTNET=True  # IMPORTANT
```

5. Tu recevras des fonds virtuels automatiquement

### Avantages Testnet

- ✅ Pas de risque financier
- ✅ Tester les stratégies
- ✅ Apprendre l'API
- ✅ Debug sans stress
- ❌ Prix légèrement différents du mainnet

---

## 📊 Dashboard Web - Ajout Binance

### 1. Schéma Prisma

Binance est déjà supporté dans le schéma :

```prisma
enum AgentType {
  BINANCE  // ✅ Déjà présent
}

model Agent {
  exchange  String?  // "binance"
}
```

### 2. Dashboard Config

Dans `/web/src/app/dashboard/settings/page.tsx`, Binance apparaît déjà :

```typescript
<Select>
  <SelectItem value="solana">Solana</SelectItem>
  <SelectItem value="hyperliquid">HyperLiquid</SelectItem>
  <SelectItem value="binance">Binance</SelectItem>  {/* ✅ */}
  <SelectItem value="aster">Aster</SelectItem>
</Select>
```

---

## 🔧 Troubleshooting

### Erreur "Invalid API Key"

```bash
# Vérifie .env
cat .env | grep BINANCE

# Test les clés
./python -c "from binance.client import Client; c = Client('key', 'secret'); print(c.get_account())"
```

### Erreur "Insufficient Balance"

```bash
# Vérifie balance
./python -c "from src import nice_funcs_binance as b; print(b.get_balance('USDT'))"

# Si Testnet, va sur testnet.binance.vision pour recevoir des fonds
```

### Erreur "Symbol not found"

```python
# Liste tous les symboles disponibles
from binance.client import Client
client = Client()
info = client.get_exchange_info()
symbols = [s['symbol'] for s in info['symbols'] if 'USDT' in s['symbol']]
print(symbols[:20])  # Top 20
```

### Rate Limiting

Binance a des limites :
- **Spot** : 1200 requêtes/minute
- **Testnet** : Plus strict

Si rate limited :
```python
import time
time.sleep(0.1)  # Ajoute delay entre requêtes
```

---

## 💡 Best Practices

### 1. Start avec Testnet

```env
BINANCE_TESTNET=True
```

### 2. Petites Positions

```python
usd_size = 10  # Commence avec $10
```

### 3. Symboles Liquides

```python
BINANCE_SYMBOLS = ['BTCUSDT', 'ETHUSDT']  # Les plus liquides
```

### 4. Monitoring

```bash
tail -f logs/trading_agent.log
```

### 5. Stop Loss

```python
MAX_LOSS_USD = 25  # Dans config.py
```

---

## 📈 Stratégies Recommandées

### Débutant

```python
EXCHANGE = 'binance'
BINANCE_SYMBOLS = ['BTCUSDT', 'ETHUSDT']
usd_size = 10
MAX_LOSS_USD = 10
USE_SWARM_MODE = False  # 1 AI seulement
```

### Intermédiaire

```python
EXCHANGE = 'binance'
BINANCE_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT']
usd_size = 25
MAX_LOSS_USD = 25
USE_SWARM_MODE = True  # 6 AI consensus
```

### Avancé

```python
EXCHANGE = 'binance'
BINANCE_SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'BNBUSDT', 'ADAUSDT']
usd_size = 50
MAX_LOSS_USD = 50
USE_SWARM_MODE = True
ENABLE_STRATEGIES = True  # Strategy Agent ON
```

---

## 🆚 Binance vs Autres Exchanges

| Feature | Binance | HyperLiquid | Solana |
|---------|---------|-------------|--------|
| Type | CEX | Perps DEX | DEX |
| Liquidité | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Fees | 0.1% | 0.02% | ~0.5% |
| Symboles | 500+ | 30+ | Millions |
| Leverage | 125x (Futures) | 50x | 1x |
| KYC | ✅ Requis | ❌ Non | ❌ Non |
| Fiat | ✅ Oui | ❌ Non | ❌ Non |
| Testnet | ✅ Oui | ✅ Oui | ✅ Devnet |

---

## 🔐 Sécurité

### Permissions API

```
✅ Enable Reading
✅ Enable Spot Trading
❌ Enable Withdrawals  ⚠️ JAMAIS activer
❌ Enable Margin
```

### IP Whitelist

Ajoute ton IP dans Binance API settings pour limiter l'accès.

### Secrets

```bash
# .env doit être dans .gitignore
echo ".env" >> .gitignore
```

### 2FA

Active 2FA sur ton compte Binance (pas pour l'API, mais pour le compte).

---

## 📚 Documentation Complète

- [Binance API Docs](https://binance-docs.github.io/apidocs/spot/en/)
- [python-binance](https://python-binance.readthedocs.io/)
- [Testnet](https://testnet.binance.vision/)

---

## 🚀 Quick Start Final

```bash
# 1. Install
./python -m pip install python-binance

# 2. Config .env
echo "BINANCE_API_KEY=your_key" >> .env
echo "BINANCE_SECRET_KEY=your_secret" >> .env
echo "BINANCE_TESTNET=True" >> .env

# 3. Config config.py
nano src/config.py
# Change EXCHANGE = 'binance'

# 4. Test
./python src/nice_funcs_binance.py

# 5. Trade
./start_agents.sh
# Option 1 : Trading Simple
```

---

**Binance prêt ! Trade avec la liquidité d'un des plus gros exchanges au monde 🚀💰**
