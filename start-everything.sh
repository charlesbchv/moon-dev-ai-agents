#!/bin/bash

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m'

clear
echo -e "${MAGENTA}"
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║     🚀 Moon Dev AI Trading Platform - Full Launcher         ║"
echo "║                                                              ║"
echo "║     Web Interface + AI Agents + Database                    ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Fonction pour vérifier un service
check_service() {
    local service_name=$1
    local check_command=$2
    
    echo -ne "${BLUE}Checking $service_name...${NC} "
    if eval "$check_command" > /dev/null 2>&1; then
        echo -e "${GREEN}✓${NC}"
        return 0
    else
        echo -e "${RED}✗${NC}"
        return 1
    fi
}

# Vérifications préliminaires
echo -e "${CYAN}═══ System Checks ═══${NC}"
check_service "PostgreSQL" "brew services list | grep postgresql | grep started"
POSTGRES_OK=$?

check_service "Node.js" "command -v node"
NODE_OK=$?

check_service "Python" "test -f ./python || command -v python3"
PYTHON_OK=$?

echo ""

if [ $POSTGRES_OK -ne 0 ]; then
    echo -e "${YELLOW}⚠ PostgreSQL not running. Starting...${NC}"
    brew services start postgresql@14
    sleep 2
fi

# Menu principal
echo -e "${GREEN}What do you want to launch?${NC}"
echo ""
echo "1) 🌐 Web Interface ONLY (Next.js + Dashboard)"
echo "2) 🤖 AI Agents ONLY (Python backend)"
echo "3) 🚀 EVERYTHING (Web + Agents in 2 terminals)"
echo "4) 📊 Status Check (voir ce qui tourne)"
echo "5) 🛑 Stop Everything"
echo "0) ❌ Exit"
echo ""
read -p "Your choice (0-5): " main_choice

case $main_choice in
    1)
        echo ""
        echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║   🌐 Launching Web Interface         ║${NC}"
        echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
        echo ""
        cd web
        
        # Vérifier si le script start-all.sh existe
        if [ -f "start-all.sh" ]; then
            echo -e "${GREEN}Using start-all.sh script...${NC}"
            ./start-all.sh
        else
            echo -e "${YELLOW}Script not found, starting manually...${NC}"
            
            # Vérifier DB
            psql -lqt | cut -d \| -f 1 | grep -qw moon_trading
            if [ $? -ne 0 ]; then
                echo -e "${YELLOW}Creating database...${NC}"
                createdb moon_trading
            fi
            
            # Prisma
            echo -e "${BLUE}Running Prisma migrations...${NC}"
            npx prisma db push --skip-generate
            npx prisma generate
            
            # Check if needs seeding
            USER_COUNT=$(psql -d moon_trading -tAc "SELECT COUNT(*) FROM \"User\";" 2>/dev/null || echo "0")
            if [ "$USER_COUNT" = "0" ]; then
                echo -e "${YELLOW}Seeding database...${NC}"
                npm run db:seed
            fi
            
            # Start server
            echo ""
            echo -e "${GREEN}════════════════════════════════════════${NC}"
            echo -e "${GREEN}✓ Starting Next.js server...${NC}"
            echo -e "${GREEN}════════════════════════════════════════${NC}"
            echo ""
            echo -e "${CYAN}📱 Access: http://localhost:3000${NC}"
            echo -e "${CYAN}📧 Login: gabriel@gmail.com${NC}"
            echo -e "${CYAN}🔑 Password: 12345678${NC}"
            echo ""
            npm run dev
        fi
        ;;
        
    2)
        echo ""
        echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║   🤖 Launching AI Agents             ║${NC}"
        echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
        echo ""
        
        # Vérifier si start_agents.sh existe
        if [ -f "start_agents.sh" ]; then
            echo -e "${GREEN}Using start_agents.sh menu...${NC}"
            ./start_agents.sh
        else
            echo -e "${YELLOW}Interactive menu not found${NC}"
            echo ""
            echo "Quick launch options:"
            echo "a) Trading Agent (simple)"
            echo "b) Trading Agent (swarm mode)"
            echo "c) All agents (main.py)"
            read -p "Choice (a-c): " agent_choice
            
            case $agent_choice in
                a)
                    ./python src/agents/trading_agent.py
                    ;;
                b)
                    export USE_SWARM_MODE=true
                    ./python src/agents/trading_agent.py
                    ;;
                c)
                    ./python src/main.py
                    ;;
            esac
        fi
        ;;
        
    3)
        echo ""
        echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║   🚀 Launching EVERYTHING            ║${NC}"
        echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
        echo ""
        echo -e "${YELLOW}This will open 2 terminal windows:${NC}"
        echo -e "${YELLOW}  1) Web Interface (port 3000)${NC}"
        echo -e "${YELLOW}  2) AI Agents (Python)${NC}"
        echo ""
        read -p "Continue? (y/n): " confirm
        
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            # Démarrer web dans un nouveau terminal
            osascript <<EOF
tell application "Terminal"
    activate
    do script "cd \"$PWD/web\" && ./start-all.sh"
end tell
EOF
            
            sleep 2
            
            # Démarrer agents dans un autre terminal
            osascript <<EOF
tell application "Terminal"
    activate
    do script "cd \"$PWD\" && ./start_agents.sh"
end tell
EOF
            
            echo ""
            echo -e "${GREEN}✓ Launched in 2 terminals!${NC}"
            echo ""
            echo -e "${CYAN}📱 Web Interface: http://localhost:3000${NC}"
            echo -e "${CYAN}📧 Login: gabriel@gmail.com${NC}"
            echo -e "${CYAN}🔑 Password: 12345678${NC}"
            echo ""
            echo -e "${YELLOW}Check the 2 new terminal windows that opened${NC}"
        fi
        ;;
        
    4)
        echo ""
        echo -e "${CYAN}╔════════════════════════════════════════╗${NC}"
        echo -e "${CYAN}║   📊 System Status                    ║${NC}"
        echo -e "${CYAN}╚════════════════════════════════════════╝${NC}"
        echo ""
        
        # Check PostgreSQL
        echo -e "${BLUE}🗄  PostgreSQL:${NC}"
        brew services list | grep postgresql
        echo ""
        
        # Check Web Server
        echo -e "${BLUE}🌐 Web Server (Next.js):${NC}"
        if lsof -ti:3000 > /dev/null 2>&1; then
            echo -e "${GREEN}✓ Running on port 3000${NC}"
            echo "  URL: http://localhost:3000"
        else
            echo -e "${RED}✗ Not running${NC}"
        fi
        echo ""
        
        # Check Python Agents
        echo -e "${BLUE}🤖 Python Agents:${NC}"
        PYTHON_PROCS=$(ps aux | grep -E "python.*(agents|main.py)" | grep -v grep | wc -l)
        if [ $PYTHON_PROCS -gt 0 ]; then
            echo -e "${GREEN}✓ $PYTHON_PROCS agent(s) running${NC}"
            echo ""
            ps aux | grep -E "python.*(agents|main.py)" | grep -v grep | awk '{print "  PID:", $2, "- Command:", $11, $12}'
        else
            echo -e "${RED}✗ No agents running${NC}"
        fi
        echo ""
        
        # Check logs
        echo -e "${BLUE}📝 Recent Logs:${NC}"
        if [ -d "logs" ]; then
            ls -lht logs/*.log 2>/dev/null | head -5
        else
            echo "  No logs directory"
        fi
        echo ""
        ;;
        
    5)
        echo ""
        echo -e "${RED}╔════════════════════════════════════════╗${NC}"
        echo -e "${RED}║   🛑 Stopping Everything              ║${NC}"
        echo -e "${RED}╚════════════════════════════════════════╝${NC}"
        echo ""
        
        # Stop Web
        echo -ne "${YELLOW}Stopping Web Server...${NC} "
        if lsof -ti:3000 > /dev/null 2>&1; then
            kill $(lsof -ti:3000) 2>/dev/null
            echo -e "${GREEN}✓${NC}"
        else
            echo -e "${BLUE}(not running)${NC}"
        fi
        
        # Stop Python Agents
        echo -ne "${YELLOW}Stopping Python Agents...${NC} "
        KILLED=$(pkill -f "python.*agents" 2>/dev/null && echo "yes" || echo "no")
        if [ "$KILLED" = "yes" ]; then
            echo -e "${GREEN}✓${NC}"
        else
            echo -e "${BLUE}(none running)${NC}"
        fi
        
        echo ""
        echo -e "${GREEN}✓ All services stopped${NC}"
        ;;
        
    0)
        echo -e "${BLUE}👋 Goodbye!${NC}"
        exit 0
        ;;
        
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}Done!${NC}"
echo -e "${CYAN}═══════════════════════════════════════════════${NC}"
