"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Activity,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

// Mock data
const performanceStats = {
  totalPnL: 12847.50,
  dailyPnL: 342.80,
  weeklyPnL: 1847.20,
  monthlyPnL: 5234.90,
  totalTrades: 142,
  winningTrades: 98,
  losingTrades: 44,
  winRate: 69.01,
  avgWin: 215.40,
  avgLoss: -87.30,
  profitFactor: 2.47,
  sharpeRatio: 1.82,
  maxDrawdown: -1234.50,
  avgHoldTime: "4.5h",
};

const topPerformers = [
  { symbol: "BTC", trades: 45, pnl: 4234.50, winRate: 73.3, roi: 12.4 },
  { symbol: "ETH", trades: 38, pnl: 3128.90, winRate: 68.4, roi: 10.8 },
  { symbol: "SOL", trades: 29, pnl: 2847.30, winRate: 72.4, roi: 15.2 },
  { symbol: "ARB", trades: 15, pnl: 1234.80, winRate: 66.7, roi: 8.9 },
  { symbol: "MATIC", trades: 15, pnl: 1402.00, winRate: 80.0, roi: 11.3 },
];

const recentTrades = [
  { id: 1, symbol: "BTC", side: "LONG", entry: 68500, exit: 69200, pnl: 700, roi: 1.02, time: "2h ago", status: "CLOSED" },
  { id: 2, symbol: "ETH", side: "LONG", entry: 2450, exit: null, pnl: 85, roi: 3.47, time: "5h ago", status: "OPEN" },
  { id: 3, symbol: "SOL", side: "SHORT", entry: 150, exit: 148, pnl: 400, roi: 2.67, time: "8h ago", status: "CLOSED" },
  { id: 4, symbol: "ARB", side: "LONG", entry: 1.85, exit: 1.92, pnl: 175, roi: 3.78, time: "12h ago", status: "CLOSED" },
  { id: 5, symbol: "BTC", side: "LONG", entry: 67800, exit: 67500, pnl: -300, roi: -0.44, time: "1d ago", status: "CLOSED" },
];

const agentPerformance = [
  { name: "Trading Agent", trades: 67, pnl: 5234.50, winRate: 71.6, avgPnl: 78.13 },
  { name: "Strategy Agent", trades: 45, pnl: 3847.20, winRate: 68.9, avgPnl: 85.49 },
  { name: "Whale Agent", trades: 18, pnl: 2234.80, winRate: 77.8, avgPnl: 124.16 },
  { name: "Sentiment Agent", trades: 12, pnl: 1531.00, winRate: 75.0, avgPnl: 127.58 },
];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">Deep dive into your trading performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Last 7 days
              </Button>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Custom Range
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-profit">
                +${performanceStats.totalPnL.toLocaleString()}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="w-3 h-3 mr-1 text-profit" />
                <span className="text-profit">+{performanceStats.dailyPnL.toFixed(2)}</span>
                <span className="ml-1">today</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceStats.winRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {performanceStats.winningTrades}W / {performanceStats.losingTrades}L
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{performanceStats.profitFactor}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Sharpe: {performanceStats.sharpeRatio}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-loss">
                ${Math.abs(performanceStats.maxDrawdown).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Avg hold: {performanceStats.avgHoldTime}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Charts */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>P&L Over Time</CardTitle>
              <CardDescription>Cumulative profit and loss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <LineChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Line chart will be displayed here</p>
                  <p className="text-sm text-muted-foreground">ApexCharts integration</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Win/Loss Distribution</CardTitle>
              <CardDescription>Trade outcome analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center">
                  <PieChart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Pie chart will be displayed here</p>
                  <p className="text-sm text-muted-foreground">Win/Loss breakdown</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trades">Recent Trades</TabsTrigger>
            <TabsTrigger value="agents">Agent Analysis</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Assets</CardTitle>
                <CardDescription>Best performing symbols by P&L</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((asset, index) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-profit/10 text-profit flex items-center justify-center font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{asset.symbol}</h4>
                          <p className="text-sm text-muted-foreground">{asset.trades} trades</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-right">
                        <div>
                          <p className="text-xs text-muted-foreground">P&L</p>
                          <p className="font-semibold text-profit">+${asset.pnl.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Win Rate</p>
                          <p className="font-semibold">{asset.winRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className="font-semibold text-profit">+{asset.roi}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trades Tab */}
          <TabsContent value="trades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trades</CardTitle>
                <CardDescription>Your latest trading activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade) => (
                    <div
                      key={trade.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trade.side === "LONG" 
                            ? "bg-profit/10 text-profit" 
                            : "bg-loss/10 text-loss"
                        }`}>
                          {trade.side}
                        </div>
                        <div>
                          <h4 className="font-semibold">{trade.symbol}</h4>
                          <p className="text-sm text-muted-foreground">{trade.time}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-6 text-right">
                        <div>
                          <p className="text-xs text-muted-foreground">Entry</p>
                          <p className="font-medium">${trade.entry.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Exit</p>
                          <p className="font-medium">
                            {trade.exit ? `$${trade.exit.toLocaleString()}` : "-"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">P&L</p>
                          <p className={`font-semibold ${trade.pnl >= 0 ? "text-profit" : "text-loss"}`}>
                            {trade.pnl >= 0 ? "+" : ""}${trade.pnl}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">ROI</p>
                          <p className={`font-semibold ${trade.roi >= 0 ? "text-profit" : "text-loss"}`}>
                            {trade.roi >= 0 ? "+" : ""}{trade.roi}%
                          </p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        trade.status === "OPEN" 
                          ? "bg-blue-500/10 text-blue-500" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {trade.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Performance</CardTitle>
                <CardDescription>Compare performance across AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformance.map((agent) => (
                    <div
                      key={agent.name}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-profit/10 text-profit flex items-center justify-center">
                          <Activity className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{agent.name}</h4>
                          <p className="text-sm text-muted-foreground">{agent.trades} trades</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6 text-right">
                        <div>
                          <p className="text-xs text-muted-foreground">Total P&L</p>
                          <p className="font-semibold text-profit">+${agent.pnl.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Win Rate</p>
                          <p className="font-semibold">{agent.winRate}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Avg P&L</p>
                          <p className="font-semibold text-profit">+${agent.avgPnl}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
