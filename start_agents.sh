#!/bin/bash

# 🌙 Moon Dev Trading Agents Launcher
# Script pour démarrer facilement les agents

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Créer le dossier logs s'il n'existe pas
mkdir -p logs

echo -e "${BLUE}🌙 Moon Dev Trading Agents Launcher${NC}"
echo ""
echo "Choisissez le mode de lancement :"
echo ""
echo -e "${GREEN}1)${NC} Trading Live (Mode Simple)"
echo -e "${GREEN}2)${NC} Trading Live (Mode Essaim - 6 AI)"
echo -e "${GREEN}3)${NC} Tous les Agents (Trading + Risk + Strategy + Whale)"
echo -e "${GREEN}4)${NC} Agents de Surveillance (Whale + Sentiment + Funding + Liquidation)"
echo -e "${GREEN}5)${NC} Agents de Backtesting (RBI + Research)"
echo -e "${GREEN}6)${NC} Mode Testnet (Test avant production)"
echo -e "${GREEN}7)${NC} Arrêter tous les agents"
echo -e "${GREEN}8)${NC} Voir les logs"
echo ""
read -p "Votre choix (1-8): " choice

case $choice in
    1)
        echo -e "${BLUE}🚀 Démarrage du Trading Agent (Mode Simple)...${NC}"
        nohup python src/agents/trading_agent.py > logs/trading_agent.log 2>&1 &
        echo -e "${GREEN}✅ Trading Agent démarré (PID: $!)${NC}"
        echo -e "${YELLOW}📊 Voir les logs: tail -f logs/trading_agent.log${NC}"
        ;;
    2)
        echo -e "${BLUE}🐝 Démarrage du Trading Agent (Mode Essaim - 6 AI)...${NC}"
        echo -e "${YELLOW}⚠️  Assurez-vous que USE_SWARM_MODE=True dans config.py${NC}"
        read -p "Continuer ? (y/n): " confirm
        if [ "$confirm" == "y" ]; then
            nohup python src/agents/trading_agent.py > logs/trading_agent.log 2>&1 &
            echo -e "${GREEN}✅ Trading Agent (Swarm) démarré (PID: $!)${NC}"
            echo -e "${YELLOW}📊 Voir les logs: tail -f logs/trading_agent.log${NC}"
        fi
        ;;
    3)
        echo -e "${BLUE}🚀 Démarrage de tous les agents principaux...${NC}"
        
        # Trading Agent
        nohup python src/agents/trading_agent.py > logs/trading_agent.log 2>&1 &
        echo -e "${GREEN}✅ Trading Agent démarré (PID: $!)${NC}"
        
        # Risk Agent
        nohup python src/agents/risk_agent.py > logs/risk_agent.log 2>&1 &
        echo -e "${GREEN}✅ Risk Agent démarré (PID: $!)${NC}"
        
        # Strategy Agent
        nohup python src/agents/strategy_agent.py > logs/strategy_agent.log 2>&1 &
        echo -e "${GREEN}✅ Strategy Agent démarré (PID: $!)${NC}"
        
        # Whale Agent
        nohup python src/agents/whale_agent.py > logs/whale_agent.log 2>&1 &
        echo -e "${GREEN}✅ Whale Agent démarré (PID: $!)${NC}"
        
        echo ""
        echo -e "${GREEN}🎉 Tous les agents sont démarrés!${NC}"
        echo -e "${YELLOW}📊 Voir les logs dans le dossier logs/${NC}"
        ;;
    4)
        echo -e "${BLUE}👀 Démarrage des agents de surveillance...${NC}"
        
        # Whale Agent
        nohup python src/agents/whale_agent.py > logs/whale_agent.log 2>&1 &
        echo -e "${GREEN}✅ Whale Agent démarré (PID: $!)${NC}"
        
        # Sentiment Agent
        nohup python src/agents/sentiment_agent.py > logs/sentiment_agent.log 2>&1 &
        echo -e "${GREEN}✅ Sentiment Agent démarré (PID: $!)${NC}"
        
        # Funding Agent
        nohup python src/agents/funding_agent.py > logs/funding_agent.log 2>&1 &
        echo -e "${GREEN}✅ Funding Agent démarré (PID: $!)${NC}"
        
        # Liquidation Agent
        nohup python src/agents/liquidation_agent.py > logs/liquidation_agent.log 2>&1 &
        echo -e "${GREEN}✅ Liquidation Agent démarré (PID: $!)${NC}"
        
        echo ""
        echo -e "${GREEN}👁️  Agents de surveillance actifs!${NC}"
        ;;
    5)
        echo -e "${BLUE}📊 Démarrage des agents de backtesting...${NC}"
        
        # Research Agent
        nohup python src/agents/research_agent.py > logs/research_agent.log 2>&1 &
        echo -e "${GREEN}✅ Research Agent démarré (PID: $!)${NC}"
        
        # RBI Agent
        echo -e "${YELLOW}💡 RBI Agent s'exécute en mode interactif${NC}"
        python src/agents/rbi_agent.py
        ;;
    6)
        echo -e "${BLUE}🧪 Mode Testnet${NC}"
        echo -e "${YELLOW}⚠️  Vérifiez que USE_TESTNET=true dans .env${NC}"
        read -p "Continuer ? (y/n): " confirm
        if [ "$confirm" == "y" ]; then
            python src/agents/trading_agent.py
        fi
        ;;
    7)
        echo -e "${RED}🛑 Arrêt de tous les agents...${NC}"
        pkill -f "python src/agents"
        echo -e "${GREEN}✅ Tous les agents ont été arrêtés${NC}"
        ;;
    8)
        echo -e "${BLUE}📊 Logs disponibles:${NC}"
        echo ""
        ls -lh logs/ 2>/dev/null || echo -e "${RED}Aucun log disponible${NC}"
        echo ""
        echo -e "${YELLOW}Pour voir un log en temps réel:${NC}"
        echo "tail -f logs/trading_agent.log"
        echo "tail -f logs/risk_agent.log"
        echo "tail -f logs/whale_agent.log"
        ;;
    *)
        echo -e "${RED}❌ Choix invalide${NC}"
        ;;
esac

echo ""
echo -e "${BLUE}🌙 Moon Dev - Built with love${NC}"
