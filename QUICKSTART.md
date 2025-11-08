# 🚀 Guide de Démarrage Rapide - Moon Dev Trading Agents

## 📚 Documentation Disponible

- **[DEMARRAGE_AGENTS.md](./DEMARRAGE_AGENTS.md)** - Guide complet et détaillé
- **[CONFIGURATION_RAPIDE.md](./CONFIGURATION_RAPIDE.md)** - Configuration rapide et workflows
- **[README.md](./README.md)** - Documentation complète du projet

---

## ⚡ Démarrage Express (5 Minutes)

### Étape 1 : Configuration des Clés API

```bash
# 1. Copier le template
cp .env_example .env

# 2. Éditer avec vos clés
nano .env  # ou votre éditeur préféré
```

**Clés OBLIGATOIRES :**
```env
BIRDEYE_API_KEY=votre_cle_birdeye
RPC_ENDPOINT=votre_endpoint_helius
SOLANA_PRIVATE_KEY=votre_cle_privee_solana
ANTHROPIC_KEY=votre_cle_claude
```

### Étape 2 : Configuration du Trading

Éditez `src/config.py` :

```python
# Tokens à trader (Solana)
MONITORED_TOKENS = [
    '9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump',  # Vos tokens
]

# Taille des positions
usd_size = 25  # USD par position
```

### Étape 3 : Vérifier la Configuration

```bash
python check_config.py
```

Ce script vérifie :
- ✅ Présence du fichier .env
- ✅ Clés API configurées
- ✅ Configuration valide
- ✅ Dépendances installées
- ✅ Dossiers créés

### Étape 4 : Démarrer les Agents

```bash
# Mode interactif (recommandé)
./start_agents.sh

# Ou directement
python src/agents/trading_agent.py
```

---

## 🎯 Commandes Essentielles

```bash
# Vérifier la configuration
python check_config.py

# Lancer le menu interactif
./start_agents.sh

# Démarrer un agent spécifique
python src/agents/trading_agent.py
python src/agents/risk_agent.py
python src/agents/whale_agent.py

# Voir les logs en temps réel
tail -f logs/trading_agent.log

# Arrêter tous les agents
pkill -f "python src/agents"
```

---

## 📂 Fichiers Importants

```
moon-dev-ai-agents/
├── .env                          # ⚠️  Vos clés API (NE PAS COMMIT!)
├── .env_example                  # Template des clés
├── src/config.py                 # Configuration du trading
├── check_config.py              # ✅ Vérifier la config
├── start_agents.sh              # 🚀 Menu de démarrage
├── DEMARRAGE_AGENTS.md          # 📖 Guide complet
├── CONFIGURATION_RAPIDE.md      # ⚡ Config rapide
└── README.md                     # Documentation originale
```

---

## 🎓 Workflows Recommandés

### 1️⃣ Débutant - Mode Sûr

```bash
# 1. Activer le testnet dans .env
echo "USE_TESTNET=true" >> .env

# 2. Vérifier la config
python check_config.py

# 3. Démarrer en mode test
./start_agents.sh
# Choisir option 6 (Mode Testnet)
```

### 2️⃣ Intermédiaire - Trading Simple

```bash
# 1. Config dans src/config.py
usd_size = 10
USE_SWARM_MODE = False

# 2. Vérifier
python check_config.py

# 3. Lancer
./start_agents.sh
# Choisir option 1 (Trading Simple)
```

### 3️⃣ Avancé - Mode Essaim (6 AI)

```bash
# 1. Config dans src/config.py
USE_SWARM_MODE = True

# 2. Lancer avec surveillance
./start_agents.sh
# Choisir option 3 (Tous les agents)
```

---

## 🆘 Problèmes Fréquents

### ❌ "ModuleNotFoundError"

```bash
pip install -r requirements.txt
```

### ❌ "API Key not found"

Vérifier que `.env` existe et contient vos clés :

```bash
cat .env | grep API_KEY
```

### ❌ Les agents ne tradent pas

1. Vérifier `MONITORED_TOKENS` dans `config.py`
2. Vérifier `USE_TESTNET=false` pour mainnet
3. Voir les logs : `tail -f logs/trading_agent.log`

---

## 📚 Documentation Complète

Pour plus de détails :

- **Configuration complète** : `cat DEMARRAGE_AGENTS.md`
- **Workflows avancés** : `cat CONFIGURATION_RAPIDE.md`
- **Documentation originale** : `cat README.md`

---

## ⚠️ Avertissements de Sécurité

1. ❌ **NE JAMAIS** commit le fichier `.env`
2. ❌ **NE JAMAIS** partager vos clés privées
3. ✅ **TOUJOURS** tester sur testnet d'abord
4. ✅ **TOUJOURS** surveiller vos agents
5. ✅ **TOUJOURS** commencer avec de petites positions

---

## 📞 Support & Communauté

- **Discord** : https://discord.gg/8UPuVZ53bh
- **YouTube** : [Moon Dev Trading Agents Playlist](https://www.youtube.com/playlist?list=PLXrNVMjRZUJg4M4uz52iGd1LhXXGVbIFz)
- **Site Web** : https://www.moondev.com/

---

## 🎯 Prochaines Étapes

1. ✅ Configurer `.env` avec vos clés
2. ✅ Éditer `config.py` avec vos paramètres
3. ✅ Exécuter `python check_config.py`
4. ✅ Tester sur testnet (`USE_TESTNET=true`)
5. ✅ Lancer `./start_agents.sh`
6. ✅ Surveiller les logs
7. ✅ Passer en mainnet quand prêt

---

🌙 **Built with love by Moon Dev** 🚀

**Let's go to the moon!** 🚀🌙
