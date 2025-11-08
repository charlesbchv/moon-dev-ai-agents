"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  X,
  AlertCircle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

// Mock data
const openPositions = [
  { 
    id: 1, 
    symbol: "BTC", 
    side: "LONG", 
    entry: 68500, 
    current: 69200, 
    size: 0.001, 
    leverage: 1,
    pnl: 0.70, 
    pnlPercent: 1.02,
    liquidation: null,
    openedAt: "2h ago",
    agent: "Trading Agent"
  },
  { 
    id: 2, 
    symbol: "ETH", 
    side: "LONG", 
    entry: 2450, 
    current: 2535, 
    size: 0.025, 
    leverage: 1,
    pnl: 2.125, 
    pnlPercent: 3.47,
    liquidation: null,
    openedAt: "5h ago",
    agent: "Strategy Agent"
  },
  { 
    id: 3, 
    symbol: "SOL", 
    side: "SHORT", 
    entry: 150, 
    current: 149, 
    size: 0.5, 
    leverage: 2,
    pnl: 0.50, 
    pnlPercent: 0.67,
    liquidation: 165,
    openedAt: "8h ago",
    agent: "Whale Agent"
  },
];

const marketData = [
  { symbol: "BTC", price: 69200, change24h: 2.34, volume: "42.5B", high24h: 70100, low24h: 67800 },
  { symbol: "ETH", price: 2535, change24h: 3.47, volume: "18.2B", high24h: 2580, low24h: 2420 },
  { symbol: "SOL", price: 149, change24h: -1.23, volume: "3.8B", high24h: 152, low24h: 147 },
  { symbol: "ARB", price: 1.92, change24h: 5.12, volume: "845M", high24h: 1.95, low24h: 1.82 },
  { symbol: "MATIC", price: 0.87, change24h: -0.45, volume: "654M", high24h: 0.89, low24h: 0.85 },
  { symbol: "AVAX", price: 42.50, change24h: 4.23, volume: "1.2B", high24h: 43.20, low24h: 40.80 },
];

const orderHistory = [
  { id: 1, symbol: "BTC", type: "MARKET", side: "BUY", amount: 0.001, price: 68500, total: 68.50, status: "FILLED", time: "2h ago" },
  { id: 2, symbol: "ETH", type: "LIMIT", side: "BUY", amount: 0.025, price: 2450, total: 61.25, status: "FILLED", time: "5h ago" },
  { id: 3, symbol: "SOL", type: "MARKET", side: "SELL", amount: 0.5, price: 150, total: 75.00, status: "FILLED", time: "8h ago" },
  { id: 4, symbol: "ARB", type: "LIMIT", side: "BUY", amount: 10, price: 1.85, total: 18.50, status: "CANCELLED", time: "12h ago" },
  { id: 5, symbol: "BTC", type: "MARKET", side: "SELL", amount: 0.001, price: 67500, total: 67.50, status: "FILLED", time: "1d ago" },
];

export default function TradingPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTC");
  const [orderType, setOrderType] = useState<"market" | "limit">("market");
  const [tradeSize, setTradeSize] = useState("25");
  const [limitPrice, setLimitPrice] = useState("");
  const [useAI, setUseAI] = useState(true);

  const totalPositionValue = openPositions.reduce((sum, pos) => sum + (pos.size * pos.current), 0);
  const totalPnL = openPositions.reduce((sum, pos) => sum + pos.pnl, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Trading</h1>
              <p className="text-muted-foreground">Execute trades and manage positions</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Position Value</p>
                <p className="text-2xl font-bold">${totalPositionValue.toFixed(2)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Unrealized P&L</p>
                <p className={`text-2xl font-bold ${totalPnL >= 0 ? "text-profit" : "text-loss"}`}>
                  {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Trading Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Place Order</CardTitle>
                <CardDescription>Manual or AI-assisted trading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI Toggle */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    <Label htmlFor="ai-mode" className="cursor-pointer">AI Trading Mode</Label>
                  </div>
                  <Switch id="ai-mode" checked={useAI} onCheckedChange={setUseAI} />
                </div>

                {/* Symbol Selection */}
                <div className="space-y-2">
                  <Label>Symbol</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["BTC", "ETH", "SOL"].map((sym) => (
                      <Button
                        key={sym}
                        variant={selectedSymbol === sym ? "default" : "outline"}
                        onClick={() => setSelectedSymbol(sym)}
                        className="w-full"
                      >
                        {sym}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Order Type */}
                <div className="space-y-2">
                  <Label>Order Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={orderType === "market" ? "default" : "outline"}
                      onClick={() => setOrderType("market")}
                      className="w-full"
                    >
                      Market
                    </Button>
                    <Button
                      variant={orderType === "limit" ? "default" : "outline"}
                      onClick={() => setOrderType("limit")}
                      className="w-full"
                    >
                      Limit
                    </Button>
                  </div>
                </div>

                {/* Limit Price (if limit order) */}
                {orderType === "limit" && (
                  <div className="space-y-2">
                    <Label htmlFor="limit-price">Limit Price</Label>
                    <Input
                      id="limit-price"
                      type="number"
                      placeholder="Enter price"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value)}
                    />
                  </div>
                )}

                {/* Trade Size */}
                <div className="space-y-2">
                  <Label htmlFor="trade-size">Trade Size (USD)</Label>
                  <Input
                    id="trade-size"
                    type="number"
                    placeholder="Enter amount"
                    value={tradeSize}
                    onChange={(e) => setTradeSize(e.target.value)}
                  />
                  <div className="flex gap-2">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setTradeSize(amount.toString())}
                        className="flex-1"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Buy/Sell Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button className="w-full bg-profit hover:bg-profit/90">
                    <ArrowUpRight className="w-4 h-4 mr-2" />
                    Buy Long
                  </Button>
                  <Button className="w-full bg-loss hover:bg-loss/90">
                    <ArrowDownRight className="w-4 h-4 mr-2" />
                    Sell Short
                  </Button>
                </div>

                {useAI && (
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-500">AI Mode Enabled</p>
                        <p className="text-muted-foreground text-xs mt-1">
                          Trades will be validated by AI before execution
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Close All Positions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <X className="w-4 h-4 mr-2" />
                  Cancel All Orders
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Open Positions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Open Positions</CardTitle>
                    <CardDescription>{openPositions.length} active positions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {openPositions.map((position) => (
                    <div
                      key={position.id}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            position.side === "LONG" 
                              ? "bg-profit/10 text-profit" 
                              : "bg-loss/10 text-loss"
                          }`}>
                            {position.side}
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg">{position.symbol}</h4>
                            <p className="text-sm text-muted-foreground">
                              {position.agent} • {position.openedAt}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${position.pnl >= 0 ? "text-profit" : "text-loss"}`}>
                            {position.pnl >= 0 ? "+" : ""}${position.pnl.toFixed(2)}
                          </p>
                          <p className={`text-sm ${position.pnlPercent >= 0 ? "text-profit" : "text-loss"}`}>
                            {position.pnlPercent >= 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Entry</p>
                          <p className="font-medium">${position.entry.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Current</p>
                          <p className="font-medium">${position.current.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Size</p>
                          <p className="font-medium">{position.size} {position.symbol}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Leverage</p>
                          <p className="font-medium">{position.leverage}x</p>
                        </div>
                      </div>

                      {position.liquidation && (
                        <div className="mt-3 p-2 bg-loss/10 border border-loss/20 rounded text-xs text-loss">
                          <AlertCircle className="w-3 h-3 inline mr-1" />
                          Liquidation price: ${position.liquidation}
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          Modify
                        </Button>
                        <Button variant="destructive" size="sm" className="flex-1">
                          Close Position
                        </Button>
                      </div>
                    </div>
                  ))}

                  {openPositions.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">
                      <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No open positions</p>
                      <p className="text-sm">Place your first trade to get started</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Market Data & Order History */}
            <Tabs defaultValue="market" className="space-y-4">
              <TabsList>
                <TabsTrigger value="market">Market Data</TabsTrigger>
                <TabsTrigger value="orders">Order History</TabsTrigger>
              </TabsList>

              <TabsContent value="market">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Overview</CardTitle>
                    <CardDescription>Real-time market data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {marketData.map((market) => (
                        <div
                          key={market.symbol}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                          onClick={() => setSelectedSymbol(market.symbol)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="font-semibold">{market.symbol}</div>
                            <Badge variant={market.change24h >= 0 ? "default" : "destructive"}>
                              {market.change24h >= 0 ? "+" : ""}{market.change24h}%
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-6 text-right text-sm">
                            <div>
                              <p className="text-muted-foreground text-xs">Price</p>
                              <p className="font-medium">${market.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">24h High/Low</p>
                              <p className="font-medium">
                                ${market.high24h.toLocaleString()} / ${market.low24h.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Volume</p>
                              <p className="font-medium">${market.volume}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                    <CardDescription>Your recent orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {orderHistory.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              order.side === "BUY" 
                                ? "bg-profit/10 text-profit" 
                                : "bg-loss/10 text-loss"
                            }`}>
                              {order.side}
                            </div>
                            <div>
                              <p className="font-semibold">{order.symbol}</p>
                              <p className="text-xs text-muted-foreground">{order.time}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-right text-sm">
                            <div>
                              <p className="text-muted-foreground text-xs">Type</p>
                              <p className="font-medium">{order.type}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Amount</p>
                              <p className="font-medium">{order.amount}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs">Price</p>
                              <p className="font-medium">${order.price}</p>
                            </div>
                            <div>
                              <Badge
                                variant={
                                  order.status === "FILLED" 
                                    ? "default" 
                                    : order.status === "CANCELLED" 
                                    ? "destructive" 
                                    : "secondary"
                                }
                              >
                                {order.status}
                              </Badge>
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
      </div>
    </div>
  );
}
