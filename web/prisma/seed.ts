import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash('12345678', 10);

  // Créer l'utilisateur Gabriel
  const user = await prisma.user.upsert({
    where: { email: 'gabriel@gmail.com' },
    update: {},
    create: {
      email: 'gabriel@gmail.com',
      name: 'Gabriel',
      password: hashedPassword,
      role: 'ADMIN', // Admin pour avoir tous les droits
    },
  });

  console.log('✅ User created:', user.email);

  // Créer quelques agents de démonstration
  const tradingAgent = await prisma.agent.create({
    data: {
      name: 'Trading Agent AI',
      type: 'TRADING',
      status: 'ACTIVE',
      description: 'Agent de trading avec IA - Mode Swarm disponible',
      userId: user.id,
      config: {
        exchange: 'solana',
        useSwarmMode: false,
        longOnly: true,
        usdSize: 25,
      },
    },
  });

  const strategyAgent = await prisma.agent.create({
    data: {
      name: 'Strategy Agent',
      type: 'STRATEGY',
      status: 'ACTIVE',
      description: 'Exécute les stratégies algorithmiques personnalisées',
      userId: user.id,
      config: {
        enableStrategies: true,
        strategies: ['ExampleStrategy', 'MyStrategy'],
      },
    },
  });

  const riskAgent = await prisma.agent.create({
    data: {
      name: 'Risk Management',
      type: 'RISK',
      status: 'ACTIVE',
      description: 'Surveillance des risques et gestion du portfolio',
      userId: user.id,
      config: {
        maxLossUsd: 25,
        maxGainUsd: 25,
        minimumBalanceUsd: 50,
      },
    },
  });

  console.log('✅ Agents created:', [tradingAgent.name, strategyAgent.name, riskAgent.name]);

  // Créer quelques trades de démonstration
  const trades = await prisma.trade.createMany({
    data: [
      {
        symbol: 'BTC',
        side: 'LONG',
        type: 'MARKET',
        quantity: 0.001,
        price: 68500.00,
        entryPrice: 68500.00,
        exitPrice: 69200.00,
        pnl: 0.70,
        pnlPercent: 1.02,
        status: 'CLOSED',
        exchange: 'HYPERLIQUID',
        userId: user.id,
        agentId: tradingAgent.id,
      },
      {
        symbol: 'ETH',
        side: 'LONG',
        type: 'MARKET',
        quantity: 0.025,
        price: 2450.00,
        entryPrice: 2450.00,
        status: 'OPEN',
        exchange: 'HYPERLIQUID',
        userId: user.id,
        agentId: tradingAgent.id,
      },
      {
        symbol: 'SOL',
        side: 'LONG',
        type: 'MARKET',
        quantity: 0.5,
        price: 150.00,
        entryPrice: 150.00,
        exitPrice: 155.00,
        pnl: 2.50,
        pnlPercent: 3.33,
        status: 'CLOSED',
        exchange: 'SOLANA',
        userId: user.id,
        agentId: strategyAgent.id,
      },
    ],
  });

  console.log('✅ Trades created:', trades.count);

  // Créer une API Key
  const apiKey = await prisma.apiKey.create({
    data: {
      name: 'Solana Trading Key',
      key: 'sk_test_' + Math.random().toString(36).substring(2, 15),
      provider: 'SOLANA',
      userId: user.id,
    },
  });

  console.log('✅ API Key created:', apiKey.name);

  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📧 Email: gabriel@gmail.com');
  console.log('🔒 Password: 12345678');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
