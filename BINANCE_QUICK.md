# 🔶 Binance - Résumé Rapide

## ✅ Fichiers Créés

1. **`src/nice_funcs_binance.py`** - Fonctions Binance (550+ lignes)
   - market_buy(), market_sell()
   - limit_buy(), limit_sell()
   - get_balance(), get_price()
   - get_portfolio_value(), print_portfolio()
   - get_klines() pour data OHLCV

2. **`docs/BINANCE_SETUP.md`** - Guide complet d'utilisation

3. **`check_binance.py`** - Script de test automatique

4. **Modifications** :
   - `src/config.py` : Ajout BINANCE_SYMBOLS et configuration
   - `src/exchange_manager.py` : Support Binance dans ExchangeManager
   - `requirements.txt` : Ajout python-binance==1.0.19

---

## 🚀 Setup en 3 Minutes

### 1. Installer

```bash
./python -m pip install python-binance
```

### 2. Configurer .env

```bash
nano .env
```

Ajouter :
```env
BINANCE_API_KEY=your_key_here
BINANCE_SECRET_KEY=your_secret_here
BINANCE_TESTNET=True  # Commencer avec testnet
```

### 3. Configurer config.py

```bash
nano src/config.py
```

Changer :
```python
EXCHANGE = 'binance'  # Au lieu de 'solana'
```

### 4. Tester

```bash
./python check_binance.py
```

---

## 💡 Quick Start

### Option 1 : Test Direct

```bash
./python src/nice_funcs_binance.py
```

Affiche :
- Balance USDT
- Prix BTC
- Changement 24h
- Portfolio complet

### Option 2 : Trading Agent

```bash
./start_agents.sh
```

Choisir option 1 (Trading Simple) - détectera automatiquement Binance

---

## 📊 Symboles à Trader

Par défaut dans `config.py` :

```python
BINANCE_SYMBOLS = [
    'BTCUSDT',   # Bitcoin
    'ETHUSDT',   # Ethereum
    'SOLUSDT',   # Solana
    'BNBUSDT'    # Binance Coin
]
```

Personnalise selon tes préférences !

---

## 🧪 Testnet (Recommandé)

1. Va sur https://testnet.binance.vision/
2. Crée un compte testnet
3. Génère API keys
4. Utilise `.env` avec `BINANCE_TESTNET=True`
5. Reçois des fonds de test gratuits

**Avantages** :
- ✅ Zéro risque
- ✅ Tester stratégies
- ✅ Apprendre l'API
- ✅ Pas de KYC requis

---

## 🔄 Utilisation avec ExchangeManager

Le système est **unifié** - même code pour tous les exchanges :

```python
from src.exchange_manager import ExchangeManager

# Init (lit config.py automatiquement)
em = ExchangeManager()

# Trading - fonctionne avec Binance, Solana, HyperLiquid
em.market_buy('BTCUSDT', 25)      # Acheter $25 BTC
em.market_sell('BTCUSDT', 50)     # Vendre 50% BTC

# Info
position = em.get_position('BTCUSDT')
balance = em.get_balance()
```

---

## 🆚 Comparaison Exchanges

| Feature | Binance | HyperLiquid | Solana |
|---------|---------|-------------|--------|
| Type | CEX | Perps DEX | DEX |
| Liquidité | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Fees | 0.1% | 0.02% | ~0.5% |
| Symboles | 500+ | 30+ | Millions |
| KYC | Oui | Non | Non |
| Testnet | ✅ | ✅ | ✅ |

---

## 📱 Dashboard Web

Binance est **déjà intégré** dans le dashboard :

- `/dashboard/settings` → Exchange selector inclut Binance
- Schema Prisma → AgentType.BINANCE existe
- Prêt pour l'UI

---

## 🔐 Sécurité

### Permissions API (Important!)

```
✅ Enable Reading
✅ Enable Spot Trading
❌ Enable Withdrawals  ⚠️ NE JAMAIS ACTIVER
```

### IP Whitelist

Dans Binance API Management, ajoute ton IP pour limiter l'accès.

---

## 📚 Documentation

- **Guide complet** : `docs/BINANCE_SETUP.md`
- **Code** : `src/nice_funcs_binance.py`
- **Test** : `check_binance.py`
- **Config** : `src/config.py`

---

## 🎯 Workflow Complet

### Terminal 1 - Interface Web

```bash
cd web && ./start-all.sh
```

→ http://localhost:3000

### Terminal 2 - Trading Agent (Binance)

```bash
./start_agents.sh
```

→ Option 1 : Trading Simple
→ Tradera automatiquement BTCUSDT, ETHUSDT, SOLUSDT, BNBUSDT

---

## ✅ Checklist

- [ ] `python-binance` installé
- [ ] `.env` configuré avec API keys
- [ ] `BINANCE_TESTNET=True` pour commencer
- [ ] `config.py` : `EXCHANGE = 'binance'`
- [ ] Test avec `./python check_binance.py`
- [ ] Obtenir funds testnet sur testnet.binance.vision
- [ ] Lancer `./start_agents.sh`
- [ ] Surveiller `tail -f logs/trading_agent.log`

---

## 🚀 C'est Parti !

```bash
# Test rapide
./python check_binance.py

# Voir le guide complet
cat docs/BINANCE_SETUP.md

# Commencer à trader
./start_agents.sh
```

**Binance intégré avec succès ! 🎉**

Trade sur l'un des plus gros exchanges du monde avec la même interface que Solana et HyperLiquid ! 💰📈
