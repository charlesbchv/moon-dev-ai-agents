#!/bin/bash

# 🚀 Script de démarrage complet - Moon Dev AI Agents
# Ce script lance tous les services nécessaires

set -e

echo "🌙 Moon Dev AI Agents - Démarrage complet"
echo "========================================"
echo ""

# Couleurs pour les logs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les étapes
step() {
    echo -e "${BLUE}▶${NC} $1"
}

success() {
    echo -e "${GREEN}✓${NC} $1"
}

error() {
    echo -e "${RED}✗${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Vérifier qu'on est dans le bon répertoire
if [ ! -f "package.json" ]; then
    error "Erreur : package.json introuvable. Exécutez ce script depuis /moon-dev-ai-agents/web"
    exit 1
fi

# 1. Vérifier PostgreSQL
step "Vérification de PostgreSQL..."
if brew services list | grep -q "postgresql.*started"; then
    success "PostgreSQL est démarré"
else
    warning "PostgreSQL n'est pas démarré. Démarrage..."
    brew services start postgresql@14
    sleep 2
    success "PostgreSQL démarré"
fi

# 2. Vérifier la base de données
step "Vérification de la base de données..."
if psql -lqt | cut -d \| -f 1 | grep -qw moon_trading; then
    success "Base de données 'moon_trading' existe"
else
    warning "Base de données 'moon_trading' n'existe pas. Création..."
    createdb moon_trading
    success "Base de données créée"
fi

# 3. Migrations Prisma
step "Application des migrations Prisma..."
npx prisma db push --skip-generate
success "Schéma de base de données synchronisé"

# 4. Génération du client Prisma
step "Génération du client Prisma..."
npx prisma generate
success "Client Prisma généré"

# 5. Seed de la base de données (si nécessaire)
step "Vérification des données..."
USER_COUNT=$(psql -d moon_trading -tAc "SELECT COUNT(*) FROM \"User\";")
if [ "$USER_COUNT" -eq "0" ]; then
    warning "Aucun utilisateur trouvé. Seed de la base de données..."
    npm run db:seed
    success "Données de test créées (gabriel@gmail.com / 12345678)"
else
    success "Base de données contient $USER_COUNT utilisateur(s)"
fi

# 6. Démarrage du serveur Next.js
echo ""
echo "========================================"
echo -e "${GREEN}✓ Tous les services sont prêts !${NC}"
echo "========================================"
echo ""
echo "🌐 Interface web : http://localhost:3000"
echo "📧 Login : gabriel@gmail.com"
echo "🔒 Mot de passe : 12345678"
echo ""
step "Démarrage du serveur Next.js..."
echo ""

npm run dev
