"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Settings, 
  TrendingUp,
  Shield,
  Copy,
  MessageSquare,
  Fish,
  DollarSign,
  AlertTriangle,
  Target,
  Search,
  BarChart3,
  Vote,
  Coins
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Agent icons mapping
const agentIcons: Record<string, any> = {
  TRADING: TrendingUp,
  STRATEGY: Target,
  RISK: Shield,
  COPYBOT: Copy,
  SENTIMENT: MessageSquare,
  WHALE: Fish,
  FUNDING: DollarSign,
  LIQUIDATION: AlertTriangle,
  SNIPER: Target,
  RESEARCH: Search,
  CHARTANALYSIS: BarChart3,
  POLYMARKET: Vote,
  SOLANA: Coins,
};

// Agent categories
const agentCategories = [
  { name: "All", value: "all" },
  { name: "Active", value: "active" },
  { name: "Inactive", value: "inactive" },
  { name: "Trading", value: "trading" },
  { name: "Analysis", value: "analysis" },
];

// Mock agents data with full config
const allAgents = [
  {
    id: "1",
    name: "Trading Agent",
    type: "TRADING",
    category: "trading",
    status: "ACTIVE",
    pnl: 2341,
    description: "LLM-based trading with AI (Single/Swarm mode)",
    config: {
      exchange: "SOLANA",
      useSwarmMode: false,
      longOnly: true,
      usdSize: 25,
      aiModel: "claude-3-haiku-20240307",
    },
  },
  {
    id: "2",
    name: "Strategy Agent",
    type: "STRATEGY",
    category: "trading",
    status: "ACTIVE",
    pnl: 1847,
    description: "Execute algorithmic strategies",
    config: {
      enableStrategies: true,
      strategies: ["ExampleStrategy", "MyStrategy"],
    },
  },
  {
    id: "3",
    name: "Risk Agent",
    type: "RISK",
    category: "trading",
    status: "ACTIVE",
    pnl: 0,
    description: "Portfolio risk management & monitoring",
    config: {
      maxLossUsd: 25,
      maxGainUsd: 25,
      minimumBalanceUsd: 50,
      useAiConfirmation: true,
    },
  },
  {
    id: "4",
    name: "CopyBot Agent",
    type: "COPYBOT",
    category: "trading",
    status: "INACTIVE",
    pnl: 942,
    description: "Copy trades from top traders",
    config: {
      walletsToFollow: [],
      copyPercentage: 50,
    },
  },
  {
    id: "5",
    name: "Sentiment Agent",
    type: "SENTIMENT",
    category: "analysis",
    status: "ACTIVE",
    pnl: 573,
    description: "Twitter/social sentiment analysis",
    config: {
      sources: ["twitter", "reddit"],
      updateInterval: 300,
    },
  },
  {
    id: "6",
    name: "Whale Agent",
    type: "WHALE",
    category: "analysis",
    status: "ACTIVE",
    pnl: 1234,
    description: "Track whale movements & transactions",
    config: {
      minTransactionUsd: 100000,
      trackTopWallets: true,
    },
  },
  {
    id: "7",
    name: "Funding Agent",
    type: "FUNDING",
    category: "analysis",
    status: "INACTIVE",
    pnl: 0,
    description: "Monitor funding rates for arbitrage",
    config: {
      exchanges: ["HYPERLIQUID", "ASTER"],
      alertThreshold: 0.01,
    },
  },
  {
    id: "8",
    name: "Liquidation Agent",
    type: "LIQUIDATION",
    category: "analysis",
    status: "INACTIVE",
    pnl: 0,
    description: "Track liquidations for market signals",
    config: {
      exchanges: ["HYPERLIQUID"],
      minLiquidationUsd: 50000,
    },
  },
  {
    id: "9",
    name: "Sniper Agent",
    type: "SNIPER",
    category: "trading",
    status: "INACTIVE",
    pnl: 0,
    description: "Snipe new token launches",
    config: {
      autoSnipe: false,
      maxBuyAmount: 100,
    },
  },
  {
    id: "10",
    name: "Research Agent",
    type: "RESEARCH",
    category: "analysis",
    status: "ACTIVE",
    pnl: 0,
    description: "AI-powered market research",
    config: {
      topics: ["crypto", "defi", "nft"],
      aiModel: "claude-3-sonnet",
    },
  },
  {
    id: "11",
    name: "Chart Analysis Agent",
    type: "CHARTANALYSIS",
    category: "analysis",
    status: "INACTIVE",
    pnl: 0,
    description: "Technical chart pattern analysis",
    config: {
      patterns: ["head-and-shoulders", "double-top", "triangle"],
      timeframes: ["1h", "4h", "1d"],
    },
  },
  {
    id: "12",
    name: "Polymarket Agent",
    type: "POLYMARKET",
    category: "trading",
    status: "INACTIVE",
    pnl: 0,
    description: "Prediction market trading",
    config: {
      minOdds: 1.5,
      maxBetUsd: 50,
    },
  },
  {
    id: "13",
    name: "Solana Agent",
    type: "SOLANA",
    category: "trading",
    status: "INACTIVE",
    pnl: 0,
    description: "Solana on-chain trading",
    config: {
      network: "mainnet-beta",
      slippage: 1,
    },
  },
];

export default function AgentsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = allAgents.filter((agent) => {
    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "active" && agent.status === "ACTIVE") ||
      (selectedCategory === "inactive" && agent.status === "INACTIVE") ||
      agent.category === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleAgentStatus = (agentId: string) => {
    // TODO: API call to toggle agent
    console.log("Toggling agent:", agentId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">AI Agents</h1>
              <p className="text-muted-foreground">Manage and configure your trading agents</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Active Agents</p>
                <p className="text-2xl font-bold">
                  {allAgents.filter((a) => a.status === "ACTIVE").length}/{allAgents.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
            <TabsList>
              {agentCategories.map((cat) => (
                <TabsTrigger key={cat.value} value={cat.value}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Agents Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredAgents.map((agent) => {
            const IconComponent = agentIcons[agent.type] || Bot;
            return (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          agent.status === "ACTIVE"
                            ? "bg-profit/10 text-profit"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{agent.name}</CardTitle>
                        <Badge
                          variant={agent.status === "ACTIVE" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {agent.status}
                        </Badge>
                      </div>
                    </div>
                    <Switch
                      checked={agent.status === "ACTIVE"}
                      onCheckedChange={() => toggleAgentStatus(agent.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
                  
                  {agent.pnl !== 0 && (
                    <div className="mb-4">
                      <Label className="text-xs text-muted-foreground">P&L</Label>
                      <p className={`text-2xl font-bold ${agent.pnl > 0 ? "text-profit" : "text-loss"}`}>
                        {agent.pnl > 0 ? "+" : ""}${agent.pnl.toLocaleString()}
                      </p>
                    </div>
                  )}

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <IconComponent className="w-6 h-6" />
                          {agent.name}
                        </DialogTitle>
                        <DialogDescription>{agent.description}</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        {/* Status */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Agent Status</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable or disable this agent
                            </p>
                          </div>
                          <Switch
                            checked={agent.status === "ACTIVE"}
                            onCheckedChange={() => toggleAgentStatus(agent.id)}
                          />
                        </div>

                        {/* Configuration */}
                        <div className="space-y-4 border-t pt-4">
                          <h4 className="font-semibold">Configuration</h4>
                          {Object.entries(agent.config).map(([key, value]) => (
                            <div key={key} className="space-y-2">
                              <Label className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</Label>
                              {typeof value === "boolean" ? (
                                <div className="flex items-center gap-2">
                                  <Switch checked={value} />
                                  <span className="text-sm text-muted-foreground">
                                    {value ? "Enabled" : "Disabled"}
                                  </span>
                                </div>
                              ) : typeof value === "number" ? (
                                <Input type="number" defaultValue={value} />
                              ) : Array.isArray(value) ? (
                                <Textarea
                                  defaultValue={value.join(", ")}
                                  rows={2}
                                  placeholder="Comma-separated values"
                                />
                              ) : (
                                <Input defaultValue={value as string} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAgents.length === 0 && (
          <Card className="p-12">
            <div className="text-center">
              <Bot className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No agents found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
