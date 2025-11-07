"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Shield, BarChart3, Bot, Brain } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pricing } from "@/components/blocks/pricing";

export default function HomePage() {
  const tradingPlans = [
    {
      name: "STARTER",
      price: "99",
      yearlyPrice: "79",
      period: "per month",
      features: [
        "Up to 3 AI Trading Agents",
        "Basic trading strategies",
        "Real-time market data",
        "Email support (48h response)",
        "Community access",
        "$10,000 monthly volume limit",
        "Basic analytics dashboard",
      ],
      description: "Perfect for individual traders starting with AI",
      buttonText: "Start Free Trial",
      href: "/signup",
      isPopular: false,
    },
    {
      name: "PROFESSIONAL",
      price: "299",
      yearlyPrice: "239",
      period: "per month",
      features: [
        "Unlimited AI Trading Agents",
        "Advanced strategies (RBI, Sniper, Whale)",
        "Real-time + historical data",
        "Priority support (24h response)",
        "Strategy backtesting",
        "Unlimited trading volume",
        "Advanced analytics & reports",
        "API access",
        "Risk management tools",
        "Multi-exchange support",
      ],
      description: "Ideal for serious traders and small funds",
      buttonText: "Get Started",
      href: "/signup",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      price: "999",
      yearlyPrice: "799",
      period: "per month",
      features: [
        "Everything in Professional",
        "Custom AI agent development",
        "Dedicated account manager",
        "Premium support (1h response)",
        "White-label solution available",
        "Custom integrations",
        "Advanced security features",
        "SLA agreement",
        "Team collaboration (unlimited users)",
        "Custom contracts & compliance",
        "Direct blockchain access",
        "Institutional-grade infrastructure",
      ],
      description: "For hedge funds and institutional traders",
      buttonText: "Contact Sales",
      href: "/contact",
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">Moon Trading</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#agents" className="text-sm hover:text-primary transition-colors">
              AI Agents
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link href="#docs" className="text-sm hover:text-primary transition-colors">
              Docs
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="inline-block">
              <span className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                🚀 AI-Powered Trading Platform
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Trade Smarter with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                AI Agents
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Harness the power of advanced AI agents to automate your trading strategies,
              analyze markets in real-time, and maximize your profits 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto text-base">
                  View Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                  Start Free Trial
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Active Traders</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$50M+</div>
                <div className="text-sm text-muted-foreground">Volume Traded</div>
              </div>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-3xl rounded-full" />
            <div className="relative bg-card border rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Live Trading Dashboard</h3>
                  <span className="flex items-center gap-2 text-sm text-profit">
                    <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Total P&L</div>
                    <div className="text-2xl font-bold text-profit">+$12,847</div>
                    <div className="text-xs text-profit">+24.5%</div>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                    <div className="text-2xl font-bold">87%</div>
                    <div className="text-xs text-muted-foreground">Last 30 days</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-primary" />
                      Trading Agent
                    </span>
                    <span className="text-profit">+$2,341</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      Strategy Agent
                    </span>
                    <span className="text-profit">+$1,847</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      Analysis Agent
                    </span>
                    <span className="text-profit">+$942</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  View Full Dashboard
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate and optimize your trading strategies
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Trading Agents</h3>
            <p className="text-muted-foreground">
              Deploy intelligent agents that trade 24/7 using advanced machine learning models
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
            <p className="text-muted-foreground">
              Monitor your trades with live dashboards and detailed performance metrics
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
            <p className="text-muted-foreground">
              Advanced risk controls and compliance agents protect your capital
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Strategy Backtesting</h3>
            <p className="text-muted-foreground">
              Test your strategies on historical data before deploying with real capital
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multi-Exchange Support</h3>
            <p className="text-muted-foreground">
              Connect to major exchanges including Hyperliquid, Binance, and more
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">LLM Integration</h3>
            <p className="text-muted-foreground">
              Powered by Claude, DeepSeek, Gemini, and Grok for intelligent decision-making
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Trading Plan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Power your trading with AI agents that never sleep. Start with a 14-day free trial,
              no credit card required. Scale as you grow.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
          >
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-profit mb-2">$50M+</div>
              <div className="text-sm text-muted-foreground">Monthly Volume</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
              <div className="text-3xl font-bold text-primary mb-2">87%</div>
              <div className="text-sm text-muted-foreground">Average Win Rate</div>
            </div>
          </motion.div>
        </div>
        
        {/* Pricing Cards */}
        <Pricing
          plans={tradingPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you. All plans include access to our platform, AI trading agents, and dedicated support."
        />

        {/* Why Choose Section */}
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Moon Trading AI?</h2>
            <p className="text-muted-foreground text-lg">The most advanced AI trading platform on the market</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-semibold mb-2">13 AI Agent Types</h3>
              <p className="text-sm text-muted-foreground">
                From basic trading to advanced RBI, Sniper, and Whale tracking agents
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold mb-2">Real-time Execution</h3>
              <p className="text-sm text-muted-foreground">
                Lightning-fast order execution with sub-second latency
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive backtesting and performance analytics
              </p>
            </div>
            <div className="p-6 rounded-lg bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold mb-2">Bank-level Security</h3>
              <p className="text-sm text-muted-foreground">
                Enterprise-grade encryption and secure API key management
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Trading?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of traders using AI to maximize their profits. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="text-base">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="text-base bg-white/10 hover:bg-white/20 text-white border-white/30">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">Moon Trading</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered trading platform for the modern trader
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/api" className="hover:text-primary transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="/security" className="hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Moon Trading. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
