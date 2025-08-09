import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Settings,
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Shield,
  Wallet,
  BarChart3,
  Users,
  Star,
  Bell,
  RefreshCw,
  Download,
  Upload,
  Link,
  ExternalLink,
} from "lucide-react";

interface MT5Account {
  accountId: string;
  server: string;
  login: string;
  password: string;
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  connected: boolean;
}

interface MT5Position {
  ticket: number;
  symbol: string;
  type: "buy" | "sell";
  volume: number;
  openPrice: number;
  currentPrice: number;
  profit: number;
  swap: number;
  commission: number;
  comment: string;
  openTime: string;
}

interface MT5Order {
  ticket: number;
  symbol: string;
  type: "buy_limit" | "sell_limit" | "buy_stop" | "sell_stop";
  volume: number;
  openPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  comment: string;
  expiration?: string;
}

export default function MetaTrader5Widget() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connecting" | "connected" | "error"
  >("disconnected");
  const [account, setAccount] = useState<MT5Account | null>(null);
  const [positions, setPositions] = useState<MT5Position[]>([]);
  const [orders, setOrders] = useState<MT5Order[]>([]);
  const [activeTab, setActiveTab] = useState("account");

  // Mock account data
  const mockAccount: MT5Account = {
    accountId: "MT5_DEMO_12345",
    server: "MetaQuotes-Demo",
    login: "12345678",
    password: "••••••••",
    balance: 50000.0,
    equity: 52345.67,
    margin: 1234.56,
    freeMargin: 51111.11,
    marginLevel: 4241.23,
    connected: true,
  };

  const mockPositions: MT5Position[] = [
    {
      ticket: 123456789,
      symbol: "EURUSD",
      type: "buy",
      volume: 0.1,
      openPrice: 1.0856,
      currentPrice: 1.0862,
      profit: 6.0,
      swap: 0.0,
      commission: -0.7,
      comment: "Manual trade",
      openTime: "2024-01-15 10:30:00",
    },
    {
      ticket: 987654321,
      symbol: "GBPUSD",
      type: "sell",
      volume: 0.05,
      openPrice: 1.2634,
      currentPrice: 1.2628,
      profit: 3.0,
      swap: -0.5,
      commission: -0.35,
      comment: "Auto trade",
      openTime: "2024-01-15 09:15:00",
    },
  ];

  const mockOrders: MT5Order[] = [
    {
      ticket: 555666777,
      symbol: "USDJPY",
      type: "buy_limit",
      volume: 0.1,
      openPrice: 149.0,
      stopLoss: 148.5,
      takeProfit: 150.0,
      comment: "Pending order",
      expiration: "2024-01-20 23:59:59",
    },
  ];

  const connectToMT5 = async () => {
    setConnectionStatus("connecting");

    // Simulate connection process
    setTimeout(() => {
      setConnectionStatus("connected");
      setIsConnected(true);
      setAccount(mockAccount);
      setPositions(mockPositions);
      setOrders(mockOrders);
    }, 2000);
  };

  const disconnectFromMT5 = () => {
    setConnectionStatus("disconnected");
    setIsConnected(false);
    setAccount(null);
    setPositions([]);
    setOrders([]);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="crypto-card-gradient border-crypto-gold/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-crypto-gold" />
              MetaTrader 5 Integration
            </div>
            <div
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs ${
                connectionStatus === "connected"
                  ? "bg-crypto-green/20 text-crypto-green"
                  : connectionStatus === "connecting"
                    ? "bg-crypto-accent/20 text-crypto-accent"
                    : connectionStatus === "error"
                      ? "bg-crypto-red/20 text-crypto-red"
                      : "bg-crypto-dark-200 text-white/60"
              }`}
            >
              {connectionStatus === "connected" && (
                <CheckCircle className="w-3 h-3" />
              )}
              {connectionStatus === "connecting" && (
                <RefreshCw className="w-3 h-3 animate-spin" />
              )}
              {connectionStatus === "error" && (
                <AlertCircle className="w-3 h-3" />
              )}
              {connectionStatus === "disconnected" && (
                <AlertCircle className="w-3 h-3" />
              )}
              <span className="capitalize">{connectionStatus}</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Server</Label>
                  <Input
                    defaultValue="MetaQuotes-Demo"
                    className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Login</Label>
                  <Input
                    defaultValue="12345678"
                    className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Password</Label>
                  <Input
                    type="password"
                    defaultValue="password123"
                    className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white/80">Company</Label>
                  <Select defaultValue="metaquotes">
                    <SelectTrigger className="bg-crypto-dark-100 border-crypto-gold/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metaquotes">
                        MetaQuotes Software Corp.
                      </SelectItem>
                      <SelectItem value="alpari">
                        Alpari International
                      </SelectItem>
                      <SelectItem value="fxpro">
                        FxPro Global Markets
                      </SelectItem>
                      <SelectItem value="ic-markets">IC Markets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={connectToMT5}
                  disabled={connectionStatus === "connecting"}
                  className="crypto-btn-primary flex-1"
                >
                  {connectionStatus === "connecting" ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Link className="w-4 h-4 mr-2" />
                      Connect to MT5
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download MT5
                </Button>
              </div>

              <div className="p-4 bg-crypto-accent/10 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-crypto-accent mt-0.5" />
                  <div>
                    <div className="text-crypto-accent font-medium text-sm">
                      Setup Instructions
                    </div>
                    <div className="text-white/70 text-sm mt-1">
                      1. Download and install MetaTrader 5 platform
                      <br />
                      2. Open a demo or live trading account
                      <br />
                      3. Enable API access in MT5 settings
                      <br />
                      4. Enter your account credentials above
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-crypto-gold" />
                </div>
                <div>
                  <div className="text-white font-medium">Connected to MT5</div>
                  <div className="text-white/60 text-sm">
                    Account: {account?.login} • Server: {account?.server}
                  </div>
                </div>
              </div>
              <Button
                onClick={disconnectFromMT5}
                variant="outline"
                className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
              >
                Disconnect
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Information and Trading */}
      {isConnected && account && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Account Info
            </TabsTrigger>
            <TabsTrigger
              value="positions"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Positions ({positions.length})
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Orders ({orders.length})
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Place Trade
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet className="w-4 h-4 text-crypto-gold" />
                    <span className="text-white/80 text-sm">Balance</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(account.balance)}
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-crypto-accent" />
                    <span className="text-white/80 text-sm">Equity</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(account.equity)}
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-crypto-gold" />
                    <span className="text-white/80 text-sm">Margin</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(account.margin)}
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-accent/20">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-crypto-accent" />
                    <span className="text-white/80 text-sm">Free Margin</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(account.freeMargin)}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="positions" className="mt-4">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {positions.map((position) => (
                    <div
                      key={position.ticket}
                      className="flex items-center justify-between p-4 border-b border-crypto-gold/10 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            position.type === "buy"
                              ? "bg-crypto-green"
                              : "bg-crypto-red"
                          }`}
                        />
                        <div>
                          <div className="text-white font-medium">
                            {position.symbol}
                          </div>
                          <div className="text-white/60 text-sm">
                            {position.type.toUpperCase()} {position.volume}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-white text-sm">
                            {position.openPrice.toFixed(5)}
                          </div>
                          <div className="text-white/60 text-xs">Open</div>
                        </div>

                        <div className="text-center">
                          <div className="text-white text-sm">
                            {position.currentPrice.toFixed(5)}
                          </div>
                          <div className="text-white/60 text-xs">Current</div>
                        </div>

                        <div className="text-center">
                          <div
                            className={`text-sm ${position.profit >= 0 ? "text-crypto-green" : "text-crypto-red"}`}
                          >
                            {formatCurrency(position.profit)}
                          </div>
                          <div className="text-white/60 text-xs">P&L</div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  ))}

                  {positions.length === 0 && (
                    <div className="text-center text-white/60 py-8">
                      No open positions
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-4">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {orders.map((order) => (
                    <div
                      key={order.ticket}
                      className="flex items-center justify-between p-4 border-b border-crypto-gold/10 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 rounded-full bg-crypto-accent" />
                        <div>
                          <div className="text-white font-medium">
                            {order.symbol}
                          </div>
                          <div className="text-white/60 text-sm">
                            {order.type.toUpperCase().replace("_", " ")}{" "}
                            {order.volume}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-white text-sm">
                            {order.openPrice.toFixed(5)}
                          </div>
                          <div className="text-white/60 text-xs">Price</div>
                        </div>

                        {order.stopLoss && (
                          <div className="text-center">
                            <div className="text-crypto-red text-sm">
                              {order.stopLoss.toFixed(5)}
                            </div>
                            <div className="text-white/60 text-xs">SL</div>
                          </div>
                        )}

                        {order.takeProfit && (
                          <div className="text-center">
                            <div className="text-crypto-green text-sm">
                              {order.takeProfit.toFixed(5)}
                            </div>
                            <div className="text-white/60 text-xs">TP</div>
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ))}

                  {orders.length === 0 && (
                    <div className="text-center text-white/60 py-8">
                      No pending orders
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="mt-4">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white">Place MT5 Trade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/80">Symbol</Label>
                    <Select defaultValue="EURUSD">
                      <SelectTrigger className="bg-crypto-dark-100 border-crypto-gold/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EURUSD">EUR/USD</SelectItem>
                        <SelectItem value="GBPUSD">GBP/USD</SelectItem>
                        <SelectItem value="USDJPY">USD/JPY</SelectItem>
                        <SelectItem value="AUDUSD">AUD/USD</SelectItem>
                        <SelectItem value="USDCAD">USD/CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Volume</Label>
                    <Input
                      placeholder="0.01"
                      defaultValue="0.1"
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Stop Loss</Label>
                    <Input
                      placeholder="Optional"
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Take Profit</Label>
                    <Input
                      placeholder="Optional"
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-crypto-green hover:bg-crypto-green/90 text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Buy
                  </Button>
                  <Button className="flex-1 bg-crypto-red hover:bg-crypto-red/90 text-white">
                    <TrendingDown className="w-4 h-4 mr-2" />
                    Sell
                  </Button>
                </div>

                <div className="p-3 bg-crypto-accent/10 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <ExternalLink className="w-4 h-4 text-crypto-accent" />
                    <span className="text-crypto-accent font-medium text-sm">
                      MT5 Integration
                    </span>
                  </div>
                  <div className="text-white/70 text-sm">
                    Trades placed here will be executed directly in your
                    MetaTrader 5 platform. Make sure your MT5 terminal is
                    running and connected.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
