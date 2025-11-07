"use client";

import { Pricing } from "@/components/blocks/pricing";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              Choose Your Trading Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Power your trading with AI agents that never sleep. Start with a 14-day free trial,
              no credit card required. Scale as you grow.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
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
      </section>

      {/* Pricing Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Pricing
          plans={tradingPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you. All plans include access to our platform, AI trading agents, and dedicated support."
        />
      </motion.div>

      {/* Features Comparison Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose Moon Trading AI?</h2>
          <p className="text-muted-foreground">The most advanced AI trading platform on the market</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="font-semibold mb-2">13 AI Agent Types</h3>
            <p className="text-sm text-muted-foreground">
              From basic trading to advanced RBI, Sniper, and Whale tracking agents
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-semibold mb-2">Real-time Execution</h3>
            <p className="text-sm text-muted-foreground">
              Lightning-fast order execution with sub-second latency
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold mb-2">Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive backtesting and performance analytics
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-semibold mb-2">Bank-level Security</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade encryption and secure API key management
            </p>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="space-y-6"
        >
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately
              and we'll prorate your billing accordingly.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">What exchanges are supported?</h3>
            <p className="text-sm text-muted-foreground">
              We support all major exchanges including Binance, Coinbase, Kraken, Hyperliquid, and 20+ more.
              Enterprise plans include custom exchange integrations.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Is my data secure?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. We use bank-level encryption, never store API secret keys in plain text, and
              comply with SOC 2 Type II standards. Your trading data is always private.
            </p>
          </div>
          <div className="p-6 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-sm text-muted-foreground">
              We offer a 14-day free trial so you can test the platform risk-free. If you're not satisfied
              within the first 30 days of paid subscription, we'll provide a full refund.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-primary p-12 text-center"
        >
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of traders using AI to make smarter decisions. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="px-8 py-6 bg-white text-primary font-semibold hover:bg-white/90">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
