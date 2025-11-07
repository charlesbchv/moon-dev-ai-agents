"use client";

import { motion } from "framer-motion";
import { Bot, Zap, BarChart3, Shield, TrendingUp, Brain } from "lucide-react";
import { useState } from "react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "13 AI Agent Types",
    description: "From basic trading to advanced RBI, Sniper, and Whale tracking agents",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-time Execution",
    description: "Lightning-fast order execution with sub-second latency",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Advanced Analytics",
    description: "Comprehensive backtesting and performance analytics",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bank-level Security",
    description: "Enterprise-grade encryption and secure API key management",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Smart Strategies",
    description: "AI-powered trading strategies that adapt to market conditions",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "LLM Integration",
    description: "Powered by Claude, DeepSeek, Gemini, and Grok for intelligent decisions",
    color: "from-indigo-500 to-violet-500",
  },
];

export function FeaturesSectionWithHoverEffects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      <div className="relative container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to trade like a pro with AI-powered automation
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              {/* Card Background with Hover Effect */}
              <div className="relative bg-card border border-border rounded-xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
                {/* Gradient Glow on Hover */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-20 blur-xl"
                    style={{
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Icon Container */}
                <div className="relative mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br ${feature.color} text-white transition-transform duration-300 ${
                      hoveredIndex === index ? "scale-110 rotate-3" : ""
                    }`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Border Effect */}
                <div
                  className={`absolute inset-0 rounded-xl border-2 transition-opacity duration-300 ${
                    hoveredIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    borderImage: `linear-gradient(135deg, ${
                      feature.color.includes("blue")
                        ? "#3b82f6, #06b6d4"
                        : feature.color.includes("yellow")
                        ? "#eab308, #f97316"
                        : feature.color.includes("purple")
                        ? "#a855f7, #ec4899"
                        : feature.color.includes("green")
                        ? "#22c55e, #10b981"
                        : feature.color.includes("red")
                        ? "#ef4444, #f43f5e"
                        : "#6366f1, #8b5cf6"
                    }) 1`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
