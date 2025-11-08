# 🐍 Utilisation de Python dans ce Projet

## Problème Résolu

Sur votre système, `python` n'est pas dans le PATH, mais Python 3 est installé via Homebrew à `/opt/homebrew/bin/python3`.

## Solutions

### Option 1 : Utiliser le script `./python` (Recommandé)

```bash
# Vérifier la configuration
./python check_config.py

# Lancer un agent
./python src/agents/trading_agent.py

# Installer des packages
./python -m pip install nom_du_package
```

### Option 2 : Utiliser le chemin complet

```bash
# Vérifier la configuration
/opt/homebrew/bin/python3 check_config.py

# Lancer un agent
/opt/homebrew/bin/python3 src/agents/trading_agent.py
```

### Option 3 : Créer un alias permanent (Pour tous vos projets)

Ajoutez dans votre `~/.zshrc` :

```bash
alias python="/opt/homebrew/bin/python3"
alias pip="/opt/homebrew/bin/python3 -m pip"
```

Puis rechargez :

```bash
source ~/.zshrc
```

## Commandes Courantes

```bash
# Vérifier la configuration
./python check_config.py

# Installer les dépendances de base
./python -m pip install anthropic openai requests python-dotenv

# Installer toutes les dépendances (peut prendre du temps)
./python -m pip install -r requirements.txt

# Lancer le trading agent
./python src/agents/trading_agent.py

# Voir la version de Python
./python --version
```

## Installation des Dépendances Essentielles

Les packages suivants ont été installés :
✅ `anthropic` - Pour Claude AI
✅ `openai` - Pour GPT
✅ `requests` - Pour les requêtes HTTP
✅ `python-dotenv` - Pour charger .env
✅ `solders` - Pour Solana

Pour installer les autres dépendances si nécessaire :

```bash
./python -m pip install -r requirements.txt
```

## Résumé

- ✅ Python 3.13.7 est installé
- ✅ Le script `./python` pointe vers le bon interpréteur
- ✅ Les packages essentiels sont installés
- ✅ Vous êtes prêt à lancer les agents !

🌙 **Let's go to the moon!** 🚀
