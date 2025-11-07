#!/bin/bash

# Moon Trading Platform - Installation automatique
# Résout les conflits de dépendances et installe tout

set -e

echo "🌙 Moon Trading Platform - Installation"
echo "========================================"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "   Installez Node.js 18+ depuis https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ requis (version actuelle: $(node --version))"
    exit 1
fi

echo "✅ Node.js $(node --version)"
echo ""

# Nettoyer les installations précédentes
if [ -d "node_modules" ]; then
    echo "🧹 Nettoyage de l'installation précédente..."
    rm -rf node_modules package-lock.json .next
    echo "✅ Nettoyage terminé"
    echo ""
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
echo "   (Cela peut prendre 2-3 minutes)"
echo ""

if npm install --legacy-peer-deps; then
    echo ""
    echo "✅ Dépendances installées avec succès !"
else
    echo ""
    echo "⚠️  Installation avec --legacy-peer-deps a échoué"
    echo "   Tentative avec --force..."
    if npm install --force; then
        echo "✅ Dépendances installées avec --force"
    else
        echo "❌ Installation échouée"
        exit 1
    fi
fi

echo ""

# Créer .env si nécessaire
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp .env.example .env
    echo "✅ Fichier .env créé"
    echo ""
    echo "⚠️  IMPORTANT : Configurez votre .env"
    echo ""
    echo "Générez vos secrets avec :"
    echo "  openssl rand -base64 32"
    echo ""
    echo "Puis éditez .env et ajoutez :"
    echo "  - DATABASE_URL"
    echo "  - NEXTAUTH_SECRET"
    echo "  - JWT_SECRET"
    echo ""
else
    echo "✅ Fichier .env existe déjà"
    echo ""
fi

# Générer Prisma Client
echo "🔧 Génération du Prisma Client..."
if npx prisma generate; then
    echo "✅ Prisma Client généré"
else
    echo "⚠️  Erreur Prisma (normal si DB pas configurée)"
fi

echo ""
echo "======================================"
echo "🎉 Installation terminée !"
echo "======================================"
echo ""
echo "Prochaines étapes :"
echo ""
echo "1. Configurez votre base de données dans .env"
echo "   DATABASE_URL=\"postgresql://user:pass@localhost:5432/moon_trading\""
echo ""
echo "2. Générez vos secrets :"
echo "   openssl rand -base64 32"
echo ""
echo "3. Initialisez la base de données :"
echo "   npm run db:push"
echo ""
echo "4. Démarrez le serveur :"
echo "   npm run dev"
echo ""
echo "5. Ouvrez votre navigateur :"
echo "   http://localhost:3000"
echo ""
echo "📚 Documentation :"
echo "   - README.md"
echo "   - SETUP_GUIDE.md"
echo "   - INSTALLATION_FIX.md"
echo ""
echo "🚀 Bon trading !"
