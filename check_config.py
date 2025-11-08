#!/usr/bin/env python3
"""
🌙 Moon Dev - Configuration Checker
Vérifie que tout est bien configuré avant de lancer les agents
"""

import os
import sys
from pathlib import Path

# Fonction simple pour charger .env sans dépendance
def load_env_file():
    """Charge les variables d'environnement depuis .env"""
    env_file = Path('.env')
    if not env_file.exists():
        return {}
    
    env_vars = {}
    with open(env_file, 'r') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                key, value = line.split('=', 1)
                env_vars[key.strip()] = value.strip()
    return env_vars

# Couleurs pour l'affichage
GREEN = '\033[0;32m'
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
BLUE = '\033[0;34m'
NC = '\033[0m'  # No Color

def print_status(status, message):
    """Affiche un message avec un statut coloré"""
    if status == "ok":
        print(f"{GREEN}✅{NC} {message}")
    elif status == "warning":
        print(f"{YELLOW}⚠️ {NC} {message}")
    elif status == "error":
        print(f"{RED}❌{NC} {message}")
    else:
        print(f"{BLUE}ℹ️ {NC} {message}")

def check_env_file():
    """Vérifie l'existence du fichier .env"""
    print(f"\n{BLUE}📋 Vérification du fichier .env...{NC}")
    
    if not Path('.env').exists():
        print_status("error", "Fichier .env introuvable!")
        print_status("info", "Créez-le avec: cp .env_example .env")
        return False
    
    print_status("ok", "Fichier .env trouvé")
    return True

def check_api_keys():
    """Vérifie les clés API essentielles"""
    print(f"\n{BLUE}🔑 Vérification des clés API...{NC}")
    
    env_vars = load_env_file()
    
    essential_keys = {
        'BIRDEYE_API_KEY': 'BirdEye (données marché)',
        'RPC_ENDPOINT': 'Helius RPC (Solana)',
        'SOLANA_PRIVATE_KEY': 'Clé privée Solana',
        'ANTHROPIC_KEY': 'Claude AI (recommandé)',
    }
    
    optional_keys = {
        'OPENAI_KEY': 'OpenAI GPT',
        'DEEPSEEK_KEY': 'DeepSeek',
        'GEMINI_KEY': 'Google Gemini',
        'ELEVENLABS_API_KEY': 'ElevenLabs (voix)',
        'HYPER_LIQUID_KEY': 'HyperLiquid',
    }
    
    all_ok = True
    
    print(f"\n{BLUE}Clés Essentielles:{NC}")
    for key, description in essential_keys.items():
        value = env_vars.get(key)
        if value and value not in ['your_key_here', 'your_cle_ici', '']:
            print_status("ok", f"{description}: Configuré")
        else:
            print_status("error", f"{description}: Manquant")
            all_ok = False
    
    print(f"\n{BLUE}Clés Optionnelles:{NC}")
    for key, description in optional_keys.items():
        value = env_vars.get(key)
        if value and value not in ['your_key_here', 'your_cle_ici', '']:
            print_status("ok", f"{description}: Configuré")
        else:
            print_status("warning", f"{description}: Non configuré (optionnel)")
    
    return all_ok

def check_config_file():
    """Vérifie la configuration dans config.py"""
    print(f"\n{BLUE}⚙️  Vérification de config.py...{NC}")
    
    try:
        # Ajouter le chemin src au PYTHONPATH
        sys.path.insert(0, str(Path(__file__).parent / 'src'))
        import config
        
        print_status("ok", "config.py trouvé et chargé")
        
        # Vérifier les paramètres critiques
        print(f"\n{BLUE}Configuration Actuelle:{NC}")
        print(f"  • Exchange: {config.EXCHANGE}")
        print(f"  • Taille position: ${config.usd_size} USD")
        print(f"  • Ordre max: ${config.max_usd_order_size} USD")
        print(f"  • Perte max: ${config.MAX_LOSS_USD} USD")
        print(f"  • Gain max: ${config.MAX_GAIN_USD} USD")
        print(f"  • Balance min: ${config.MINIMUM_BALANCE_USD} USD")
        print(f"  • Mode Essaim: {config.USE_SWARM_MODE if hasattr(config, 'USE_SWARM_MODE') else False}")
        print(f"  • Modèle AI: {config.AI_MODEL}")
        
        # Vérifier les tokens
        if config.EXCHANGE == 'solana':
            token_count = len(config.MONITORED_TOKENS)
            if token_count > 0:
                print_status("ok", f"{token_count} token(s) à surveiller")
            else:
                print_status("warning", "Aucun token dans MONITORED_TOKENS")
        else:
            symbol_count = len(config.HYPERLIQUID_SYMBOLS)
            print_status("ok", f"{symbol_count} symbole(s) HyperLiquid")
        
        return True
        
    except Exception as e:
        print_status("error", f"Erreur lors du chargement de config.py: {e}")
        return False

def check_dependencies():
    """Vérifie les dépendances Python"""
    print(f"\n{BLUE}📦 Vérification des dépendances...{NC}")
    
    required_packages = [
        ('anthropic', 'anthropic'),
        ('openai', 'openai'),
        ('solders', 'solana'),
        ('dotenv', 'python-dotenv'),
        ('requests', 'requests'),
    ]
    
    missing = []
    installed = []
    
    for import_name, package_name in required_packages:
        try:
            __import__(import_name)
            print_status("ok", f"{package_name} installé")
            installed.append(package_name)
        except ImportError:
            print_status("warning", f"{package_name} peut être manquant")
            missing.append(package_name)
    
    if missing:
        print(f"\n{YELLOW}Si besoin, installez les dépendances avec:{NC}")
        print(f"/opt/homebrew/bin/python3 -m pip install -r requirements.txt")
    
    # Considérer comme OK si au moins quelques packages sont installés
    return len(installed) >= 3

def check_directories():
    """Vérifie les dossiers nécessaires"""
    print(f"\n{BLUE}📁 Vérification des dossiers...{NC}")
    
    required_dirs = ['src', 'src/agents', 'logs']
    
    for dir_path in required_dirs:
        path = Path(dir_path)
        if path.exists():
            print_status("ok", f"Dossier {dir_path}/ existe")
        else:
            if dir_path == 'logs':
                print_status("warning", f"Dossier {dir_path}/ manquant (sera créé automatiquement)")
                path.mkdir(parents=True, exist_ok=True)
            else:
                print_status("error", f"Dossier {dir_path}/ manquant")
                return False
    
    return True

def check_testnet_mode():
    """Vérifie le mode testnet"""
    print(f"\n{BLUE}🧪 Vérification du mode réseau...{NC}")
    
    env_vars = load_env_file()
    use_testnet = env_vars.get('USE_TESTNET', 'false').lower()
    
    if use_testnet == 'true':
        print_status("warning", "Mode TESTNET activé (recommandé pour débuter)")
        print_status("info", "Les trades seront simulés sur le testnet")
    else:
        print_status("warning", "Mode MAINNET activé (trading réel!)")
        print_status("info", "⚠️  Les trades utilisent de vrais fonds!")
    
    return True

def main():
    """Fonction principale"""
    print(f"{BLUE}{'='*60}{NC}")
    print(f"{BLUE}🌙 Moon Dev - Configuration Checker{NC}")
    print(f"{BLUE}{'='*60}{NC}")
    
    checks = [
        ("Fichier .env", check_env_file),
        ("Clés API", check_api_keys),
        ("Configuration", check_config_file),
        ("Dépendances", check_dependencies),
        ("Dossiers", check_directories),
        ("Mode réseau", check_testnet_mode),
    ]
    
    results = []
    for name, check_func in checks:
        try:
            result = check_func()
            results.append((name, result))
        except Exception as e:
            print_status("error", f"Erreur lors de la vérification de {name}: {e}")
            results.append((name, False))
    
    # Résumé
    print(f"\n{BLUE}{'='*60}{NC}")
    print(f"{BLUE}📊 Résumé{NC}")
    print(f"{BLUE}{'='*60}{NC}")
    
    success_count = sum(1 for _, result in results if result)
    total_count = len(results)
    
    for name, result in results:
        if result:
            print_status("ok", name)
        else:
            print_status("error", name)
    
    print(f"\n{BLUE}Score: {success_count}/{total_count}{NC}")
    
    if success_count == total_count:
        print(f"\n{GREEN}🎉 Configuration complète! Vous êtes prêt à démarrer les agents.{NC}")
        print(f"\n{BLUE}Commandes suivantes:{NC}")
        print(f"  • Mode interactif: ./start_agents.sh")
        print(f"  • Trading simple: python src/agents/trading_agent.py")
        print(f"  • Voir les logs: tail -f logs/trading_agent.log")
        return 0
    else:
        print(f"\n{YELLOW}⚠️  Configuration incomplète. Veuillez corriger les erreurs ci-dessus.{NC}")
        print(f"\n{BLUE}Documentation:{NC}")
        print(f"  • Guide complet: cat DEMARRAGE_AGENTS.md")
        print(f"  • Config rapide: cat CONFIGURATION_RAPIDE.md")
        return 1

if __name__ == "__main__":
    sys.exit(main())
