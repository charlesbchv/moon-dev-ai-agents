"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  TrendingUp, 
  DollarSign, 
  Bot, 
  BarChart3,
  PlayCircle,
  PauseCircle,
  Info,
  ArrowRight
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data - replace with real API calls
const mockAgents = [
  { id: "1", name: "Trading Agent", type: "TRADING", status: "ACTIVE", pnl: 2341, description: "LLM-based trading with AI (Single/Swarm mode)" },
  { id: "2", name: "Strategy Agent", type: "STRATEGY", status: "ACTIVE", pnl: 1847, description: "Execute algorithmic strategies" },
  { id: "3", name: "Risk Agent", type: "RISK", status: "ACTIVE", pnl: 0, description: "Portfolio risk management & monitoring" },
  { id: "4", name: "CopyBot Agent", type: "COPYBOT", status: "INACTIVE", pnl: 942, description: "Copy trades from top traders" },
  { id: "5", name: "Sentiment Agent", type: "SENTIMENT", status: "ACTIVE", pnl: 573, description: "Twitter/social sentiment analysis" },
  { id: "6", name: "Whale Agent", type: "WHALE", status: "ACTIVE", pnl: 1234, description: "Track whale movements & transactions" },
  { id: "7", name: "Funding Agent", type: "FUNDING", status: "INACTIVE", pnl: 0, description: "Monitor funding rates for arbitrage" },
  { id: "8", name: "Liquidation Agent", type: "LIQUIDATION", status: "INACTIVE", pnl: 0, description: "Track liquidations for market signals" },
  { id: "9", name: "Sniper Agent", type: "SNIPER", status: "INACTIVE", pnl: 0, description: "Snipe new token launches" },
  { id: "10", name: "Research Agent", type: "RESEARCH", status: "ACTIVE", pnl: 0, description: "AI-powered market research" },
  { id: "11", name: "Chart Analysis Agent", type: "CHARTANALYSIS", status: "INACTIVE", pnl: 0, description: "Technical chart pattern analysis" },
  { id: "12", name: "Polymarket Agent", type: "POLYMARKET", status: "INACTIVE", pnl: 0, description: "Prediction market trading" },
  { id: "13", name: "Solana Agent", type: "SOLANA", status: "INACTIVE", pnl: 0, description: "Solana on-chain trading" },
];

const mockTrades = [
  { id: "1", symbol: "BTC/USD", side: "BUY", pnl: 342, time: "2 mins ago" },
  { id: "2", symbol: "ETH/USD", side: "SELL", pnl: -128, time: "15 mins ago" },
  { id: "3", symbol: "SOL/USD", side: "BUY", pnl: 573, time: "1 hour ago" },
];

export default function DashboardPage() {
  const activeAgentsCount = mockAgents.filter(a => a.status === "ACTIVE").length;
  
  const stats = {
    totalPnL: mockAgents.reduce((sum, agent) => sum + agent.pnl, 0),
    winRate: 87,
    activeAgents: activeAgentsCount,
    totalTrades: 142,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Monitor your AI trading agents and performance</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-profit/10 text-profit">
                <div className="w-2 h-2 rounded-full bg-profit animate-pulse" />
                <span className="text-sm font-medium">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-profit">+${stats.totalPnL.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-profit">+24.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.winRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-profit">+2.3%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeAgents}</div>
              <p className="text-xs text-muted-foreground">
                Out of {mockAgents.length} total agents
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTrades}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-profit">+12</span> today
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Active Agents */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active AI Agents</CardTitle>
                    <CardDescription>Monitor and control your trading agents</CardDescription>
                  </div>
                  <Link href="/dashboard/agents">
                    <Button variant="outline" size="sm">
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TooltipProvider>
                    {mockAgents.slice(0, 5).map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            agent.status === "ACTIVE" 
                              ? "bg-profit/10 text-profit" 
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <Bot className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{agent.name}</h4>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">{agent.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <p className="text-sm text-muted-foreground">{agent.type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {agent.pnl !== 0 && (
                            <div className={agent.pnl > 0 ? "text-profit" : "text-loss"}>
                              {agent.pnl > 0 ? "+" : ""}${agent.pnl}
                            </div>
                          )}
                          <Button
                            variant={agent.status === "ACTIVE" ? "destructive" : "default"}
                            size="sm"
                          >
                            {agent.status === "ACTIVE" ? (
                              <>
                                <PauseCircle className="w-4 h-4 mr-1" />
                                Pause
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4 mr-1" />
                                Start
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TooltipProvider>
                  
                  {/* Show remaining agents count */}
                  {mockAgents.length > 5 && (
                    <div className="p-4 border border-dashed rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        + {mockAgents.length - 5} more agents
                      </p>
                      <Link href="/dashboard/agents">
                        <Button variant="link" size="sm" className="mt-2">
                          View All {mockAgents.length} Agents
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Trades */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Latest trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTrades.map((trade) => (
                    <div key={trade.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div>
                        <div className="font-medium">{trade.symbol}</div>
                        <div className="text-sm text-muted-foreground">{trade.time}</div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${trade.pnl > 0 ? "text-profit" : "text-loss"}`}>
                          {trade.pnl > 0 ? "+" : ""}${Math.abs(trade.pnl)}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          trade.side === "BUY" 
                            ? "bg-profit/10 text-profit" 
                            : "bg-loss/10 text-loss"
                        }`}>
                          {trade.side}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Your trading performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Performance chart will be displayed here</p>
                <p className="text-sm text-muted-foreground">ApexCharts integration coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
