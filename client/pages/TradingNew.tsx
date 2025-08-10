import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/Navigation";
import TradingViewWidget from "@/components/TradingViewWidget";
import MetaTrader5Widget from "@/components/MetaTrader5Widget";
import { useAuth } from "@/hooks/use-auth";
import {
  useCryptoPrices,
  useForexRates,
  formatPriceChange,
  formatCurrency,
} from "@/hooks/use-market-data";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Target,
  Zap,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus,
  RefreshCw,
  Settings,
  Calculator,
  BookOpen,
  Users,
  Star,
  Bell,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Bitcoin,
  Wallet,
  PieChart,
  LineChart,
} from "lucide-react";

export default function TradingNew() {
  const { user, updateBalance } = useAuth();
  const [selectedSymbol, setSelectedSymbol] = useState("BINANCE:BTCUSDT");
  const [orderType, setOrderType] = useState("market");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [isTrading, setIsTrading] = useState(false);
  const [tradeError, setTradeError] = useState("");
  const [tradeSuccess, setTradeSuccess] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [favoriteSymbols, setFavoriteSymbols] = useState<Set<string>>(new Set());

  // Function to toggle favorite symbols
  const toggleFavorite = (symbol: string) => {
    setFavoriteSymbols(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(symbol)) {
        newFavorites.delete(symbol);
      } else {
        newFavorites.add(symbol);
      }
      return newFavorites;
    });
  };

  // Function to set quick amounts
  const setQuickAmount = (percentage: number) => {
    if (!user || !user.balance || user.balance <= 0) return;
    const maxAmount = user.balance * (percentage / 100);
    setAmount(maxAmount.toFixed(2));
  };

  const location = useLocation();
  const { data: cryptoData, loading: cryptoLoading } = useCryptoPrices();
  const { data: forexData, loading: forexLoading } = useForexRates();

  // Handle URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const symbol = params.get('symbol');
    const action = params.get('action');

    if (symbol) {
      setSelectedSymbol(symbol);
    }

    if (action && (action === 'buy' || action === 'sell')) {
      setTradeType(action);
    }
  }, [location]);

  // Trading pairs data
  const tradingPairs = [
    {
      symbol: "BINANCE:BTCUSDT",
      name: "Bitcoin",
      pair: "BTC/USDT",
      type: "crypto",
    },
    {
      symbol: "BINANCE:ETHUSDT",
      name: "Ethereum",
      pair: "ETH/USDT",
      type: "crypto",
    },
    {
      symbol: "BINANCE:ADAUSDT",
      name: "Cardano",
      pair: "ADA/USDT",
      type: "crypto",
    },
    {
      symbol: "BINANCE:SOLUSDT",
      name: "Solana",
      pair: "SOL/USDT",
      type: "crypto",
    },
    {
      symbol: "FX:EURUSD",
      name: "Euro vs US Dollar",
      pair: "EUR/USD",
      type: "forex",
    },
    {
      symbol: "FX:GBPUSD",
      name: "British Pound vs US Dollar",
      pair: "GBP/USD",
      type: "forex",
    },
    {
      symbol: "FX:USDJPY",
      name: "US Dollar vs Japanese Yen",
      pair: "USD/JPY",
      type: "forex",
    },
    {
      symbol: "OANDA:XAUUSD",
      name: "Gold vs US Dollar",
      pair: "XAU/USD",
      type: "commodity",
    },
  ];

  // Mock trading positions - start with empty array so no automatic trades
  const [positions, setPositions] = useState([]);

  // Mock order book data
  const [orderBook, setOrderBook] = useState({
    bids: [
      { price: 67234.5, size: 0.5234, total: 0.5234 },
      { price: 67234.0, size: 1.2345, total: 1.7579 },
      { price: 67233.5, size: 0.8901, total: 2.648 },
      { price: 67233.0, size: 2.1234, total: 4.7714 },
      { price: 67232.5, size: 0.6789, total: 5.4503 },
    ],
    asks: [
      { price: 67235.0, size: 0.7891, total: 0.7891 },
      { price: 67235.5, size: 1.4567, total: 2.2458 },
      { price: 67236.0, size: 0.9876, total: 3.2334 },
      { price: 67236.5, size: 1.6543, total: 4.8877 },
      { price: 67237.0, size: 0.5432, total: 5.4309 },
    ],
  });

  // Function to close a position
  const closePosition = (positionId: number) => {
    setPositions(prev => prev.filter(position => position.id !== positionId));
    setTradeSuccess(`Position closed successfully`);
    setTimeout(() => setTradeSuccess(""), 3000);
  };

  const handleTrade = async () => {
    if (!user) return;

    setTradeError("");
    setTradeSuccess("");

    const tradeAmount = parseFloat(amount);
    if (!tradeAmount || tradeAmount <= 0) {
      setTradeError("Please enter a valid amount");
      return;
    }

    // Get current price for the selected asset
    if (!cryptoData || !Array.isArray(cryptoData) || cryptoData.length === 0) {
      setTradeError("Market data not available. Please try again.");
      return;
    }

    const currentAsset = cryptoData.find(c => selectedSymbol.includes(c.symbol));
    if (!currentAsset) {
      setTradeError("Asset not found. Please select a different symbol.");
      return;
    }

    const currentPrice = currentAsset.price;
    const totalCost = tradeType === "buy" ? tradeAmount * currentPrice : 0;
    const tradingFee = totalCost * 0.001; // 0.1% trading fee
    const totalRequired = totalCost + tradingFee;

    if (tradeType === "buy" && user.balance < totalRequired) {
      setTradeError(`Insufficient balance. Required: $${totalRequired.toFixed(2)}, Available: $${user.balance.toFixed(2)}`);
      return;
    }

    setIsTrading(true);

    try {
      // Simulate trade execution
      await new Promise(resolve => setTimeout(resolve, 1000));

      let newBalance = user.balance;

      if (tradeType === "buy") {
        newBalance -= totalRequired;
        setTradeSuccess(`Successfully bought ${tradeAmount} ${currentAsset.symbol} at $${currentPrice.toFixed(2)}`);
      } else {
        // For sell orders, assume user owns the asset and add to balance
        const sellValue = tradeAmount * currentPrice - tradingFee;
        newBalance += sellValue;
        setTradeSuccess(`Successfully sold ${tradeAmount} ${currentAsset.symbol} at $${currentPrice.toFixed(2)}`);
      }

      // Update user balance
      const response = await fetch('/api/auth/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : ''}`
        },
        body: JSON.stringify({
          type: tradeType === "buy" ? 'withdrawal' : 'deposit',
          amount: tradeType === "buy" ? totalRequired : (tradeAmount * currentPrice - tradingFee)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.user) {
        updateBalance(data.user.balance);
      } else {
        throw new Error(data.message || 'Balance update failed');
      }

      // Add to positions
      const newPosition = {
        id: (positions?.length || 0) + 1,
        symbol: currentAsset.symbol + "/USDT",
        type: tradeType,
        size: tradeAmount.toString(),
        entryPrice: currentPrice,
        currentPrice: currentPrice,
        pnl: 0,
        pnlPercent: 0,
        margin: totalCost
      };

      setPositions(prev => [...(prev || []), newPosition]);

      // Reset form
      setAmount("");
      setPrice("");
      setStopLoss("");
      setTakeProfit("");

    } catch (error) {
      setTradeError("Trade execution failed. Please try again.");
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation currentPage="trading" />

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Advanced Trading
            </h1>
            <p className="text-white/70">
              Professional trading platform with real-time charts and advanced
              tools.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Calculator
            </Button>
            <Button
              className="crypto-btn-primary"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Trading Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Portfolio Summary */}
          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Wallet className="w-4 h-4 text-crypto-gold" />
                <span className="text-white/80 text-sm">Portfolio Value</span>
              </div>
              <div className="text-xl font-bold text-white mb-1">
                $125,430.67
              </div>
              <div className="text-sm text-crypto-green">
                +$2,345.12 (1.91%)
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <TrendingUp className="w-4 h-4 text-crypto-accent" />
                <span className="text-white/80 text-sm">Available Balance</span>
              </div>
              <div className="text-xl font-bold text-white mb-1">
                ${user?.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
              </div>
              <div className="text-sm text-white/60">USDT</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-4 h-4 text-crypto-gold" />
                <span className="text-white/80 text-sm">Active Positions</span>
              </div>
              <div className="text-xl font-bold text-white mb-1">
                {positions.length}
              </div>
              <div className="text-sm text-white/60">
                {positions.length > 0 ? `$${positions.reduce((sum, pos) => sum + pos.pnl, 0).toLocaleString()} PnL` : 'No active positions'}
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Activity className="w-4 h-4 text-crypto-accent" />
                <span className="text-white/80 text-sm">24h P&L</span>
              </div>
              <div className="text-xl font-bold text-crypto-green mb-1">
                +$1,234.56
              </div>
              <div className="text-sm text-crypto-green">+2.45%</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Chart and Market Data */}
          <div className="xl:col-span-4 space-y-6">
            {/* Trading Pair Selector */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Select
                      value={selectedSymbol}
                      onValueChange={setSelectedSymbol}
                    >
                      <SelectTrigger className="w-64 bg-crypto-dark-100 border-crypto-gold/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tradingPairs.map((pair) => (
                          <SelectItem key={pair.symbol} value={pair.symbol}>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                  pair.type === "crypto"
                                    ? "bg-crypto-gold"
                                    : pair.type === "forex"
                                      ? "bg-crypto-accent"
                                      : "bg-crypto-green"
                                }`}
                              />
                              <span>{pair.pair}</span>
                              <span className="text-white/60 text-sm">
                                - {pair.name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {cryptoData && cryptoData.length > 0 && cryptoData.find((c) =>
                      selectedSymbol.includes(c.symbol),
                    ) && (
                      <div className="flex items-center space-x-4">
                        <div>
                          <div className="text-white font-bold text-xl">
                            {formatCurrency(
                              cryptoData.find((c) =>
                                selectedSymbol.includes(c.symbol),
                              )?.price || 0,
                            )}
                          </div>
                          <div
                            className={`text-sm ${(cryptoData.find((c) => selectedSymbol.includes(c.symbol))?.change24h || 0) >= 0 ? "text-crypto-green" : "text-crypto-red"}`}
                          >
                            {
                              formatPriceChange(
                                cryptoData.find((c) =>
                                  selectedSymbol.includes(c.symbol),
                                )?.change24h || 0,
                              ).text
                            }
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                      onClick={() => toggleFavorite(selectedSymbol)}
                    >
                      <Star className={`w-4 h-4 ${favoriteSymbols.has(selectedSymbol) ? 'fill-crypto-gold text-crypto-gold' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                      onClick={() => alert('Price alerts coming soon!')}
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* TradingView Chart - Larger for better analysis */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-0">
                <TradingViewWidget
                  symbol={selectedSymbol}
                  theme="dark"
                  height={800}
                  interval="15"
                  style="candles"
                  hide_side_toolbar={false}
                  allow_symbol_change={false}
                />
              </CardContent>
            </Card>

            {/* Market Data Tabs */}
            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
                <TabsTrigger
                  value="positions"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Positions
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Open Orders
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Trade History
                </TabsTrigger>
                <TabsTrigger
                  value="assets"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Assets
                </TabsTrigger>
                <TabsTrigger
                  value="mt5"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  MetaTrader 5
                </TabsTrigger>
              </TabsList>

              <TabsContent value="positions" className="mt-4">
                <Card className="crypto-card-gradient border-crypto-gold/20">
                  <CardContent className="p-4">
                    {positions.length === 0 ? (
                      <div className="text-center text-white/60 py-8">
                        No open positions. Place your first trade using the order panel.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {positions.map((position) => (
                          <div
                            key={position.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50"
                          >
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  position.type === "long"
                                    ? "bg-crypto-green"
                                    : "bg-crypto-red"
                                }`}
                              />
                              <div>
                                <div className="text-white font-medium">
                                  {position.symbol}
                                </div>
                                <div className="text-white/60 text-sm">
                                  {position.type.toUpperCase()} • {position.size}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-6">
                              <div className="text-center">
                                <div className="text-white text-sm">
                                  ${position.entryPrice.toLocaleString()}
                                </div>
                                <div className="text-white/60 text-xs">Entry</div>
                              </div>

                              <div className="text-center">
                                <div className="text-white text-sm">
                                  ${position.currentPrice.toLocaleString()}
                                </div>
                                <div className="text-white/60 text-xs">
                                  Current
                                </div>
                              </div>

                              <div className="text-center">
                                <div
                                  className={`text-sm ${position.pnl >= 0 ? "text-crypto-green" : "text-crypto-red"}`}
                                >
                                  ${position.pnl.toLocaleString()} (
                                  {position.pnlPercent > 0 ? "+" : ""}
                                  {position.pnlPercent}%)
                                </div>
                                <div className="text-white/60 text-xs">P&L</div>
                              </div>

                              <Button
                                size="sm"
                                variant="outline"
                                className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                                onClick={() => closePosition(position.id)}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-4">
                <Card className="crypto-card-gradient border-crypto-gold/20">
                  <CardContent className="p-4">
                    <div className="text-center text-white/60 py-8">
                      No open orders
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-4">
                <Card className="crypto-card-gradient border-crypto-gold/20">
                  <CardContent className="p-4">
                    <div className="text-center text-white/60 py-8">
                      No trade history available
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assets" className="mt-4">
                <Card className="crypto-card-gradient border-crypto-gold/20">
                  <CardContent className="p-4">
                    {!cryptoData || cryptoData.length === 0 ? (
                      <div className="text-center text-white/60 py-8">
                        Loading asset data...
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {cryptoData.slice(0, 5).map((asset) => (
                        <div
                          key={asset.symbol}
                          className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                              <span className="text-crypto-gold text-sm font-bold">
                                {asset.symbol[0]}
                              </span>
                            </div>
                            <div>
                              <div className="text-white">{asset.name}</div>
                              <div className="text-white/60 text-sm">
                                {asset.symbol}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-white">
                              {formatCurrency(asset.price)}
                            </div>
                            <div
                              className={`text-sm ${asset.change24h >= 0 ? "text-crypto-green" : "text-crypto-red"}`}
                            >
                              {formatPriceChange(asset.change24h).text}
                            </div>
                          </div>
                        </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mt5" className="mt-4">
                <MetaTrader5Widget />
              </TabsContent>
            </Tabs>
          </div>

          {/* Trading Panel and Order Book */}
          <div className="space-y-6">
            {/* Order Book */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-crypto-gold" />
                  Order Book
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {/* Asks (Sell Orders) */}
                  {orderBook.asks.reverse().map((ask, index) => (
                    <div
                      key={`ask-${index}`}
                      className="flex justify-between items-center px-4 py-1 text-xs hover:bg-crypto-red/5"
                    >
                      <span className="text-crypto-red">
                        {ask.price.toLocaleString()}
                      </span>
                      <span className="text-white/60">
                        {ask.size.toFixed(4)}
                      </span>
                      <span className="text-white/40">
                        {ask.total.toFixed(4)}
                      </span>
                    </div>
                  ))}

                  {/* Spread */}
                  <div className="px-4 py-2 bg-crypto-dark/50 text-center">
                    <span className="text-crypto-gold text-sm font-medium">
                      Spread: $0.50
                    </span>
                  </div>

                  {/* Bids (Buy Orders) */}
                  {orderBook.bids.map((bid, index) => (
                    <div
                      key={`bid-${index}`}
                      className="flex justify-between items-center px-4 py-1 text-xs hover:bg-crypto-green/5"
                    >
                      <span className="text-crypto-green">
                        {bid.price.toLocaleString()}
                      </span>
                      <span className="text-white/60">
                        {bid.size.toFixed(4)}
                      </span>
                      <span className="text-white/40">
                        {bid.total.toFixed(4)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Panel */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-crypto-gold" />
                  Place Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tradeError && (
                  <Alert variant="destructive">
                    <AlertDescription>{tradeError}</AlertDescription>
                  </Alert>
                )}

                {tradeSuccess && (
                  <Alert className="border-crypto-green/20 bg-crypto-green/10">
                    <AlertDescription className="text-crypto-green">{tradeSuccess}</AlertDescription>
                  </Alert>
                )}
                {/* Buy/Sell Toggle */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={tradeType === "buy" ? "default" : "outline"}
                    className={`${
                      tradeType === "buy"
                        ? "bg-crypto-green hover:bg-crypto-green/90 text-white"
                        : "border-crypto-green/20 text-crypto-green hover:bg-crypto-green/10"
                    }`}
                    onClick={() => setTradeType("buy")}
                  >
                    Buy
                  </Button>
                  <Button
                    variant={tradeType === "sell" ? "default" : "outline"}
                    className={`${
                      tradeType === "sell"
                        ? "bg-crypto-red hover:bg-crypto-red/90 text-white"
                        : "border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                    }`}
                    onClick={() => setTradeType("sell")}
                  >
                    Sell
                  </Button>
                </div>

                {/* Order Type */}
                <div className="space-y-2">
                  <Label className="text-white/80">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger className="bg-crypto-dark-100 border-crypto-gold/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="stop">Stop Order</SelectItem>
                      <SelectItem value="stop-limit">
                        Stop-Limit Order
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label className="text-white/80">Amount</Label>
                  <Input
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                  />
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                      onClick={() => setQuickAmount(25)}
                    >
                      25%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                      onClick={() => setQuickAmount(50)}
                    >
                      50%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                      onClick={() => setQuickAmount(75)}
                    >
                      75%
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                      onClick={() => setQuickAmount(100)}
                    >
                      Max
                    </Button>
                  </div>
                </div>

                {/* Price (for limit orders) */}
                {orderType !== "market" && (
                  <div className="space-y-2">
                    <Label className="text-white/80">Price</Label>
                    <Input
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                    />
                  </div>
                )}

                {/* Advanced Options */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label className="text-white/80">Stop Loss</Label>
                    <Input
                      placeholder="Optional"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white/80">Take Profit</Label>
                    <Input
                      placeholder="Optional"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="p-3 bg-crypto-dark/50 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">Estimated Total:</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/60">Fee:</span>
                    <span className="text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Available:</span>
                    <span className="text-white">${user?.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  onClick={handleTrade}
                  className={`w-full ${
                    tradeType === "buy"
                      ? "bg-crypto-green hover:bg-crypto-green/90"
                      : "bg-crypto-red hover:bg-crypto-red/90"
                  } text-white`}
                  disabled={!amount || isTrading || !user}
                >
                  {isTrading ? "Executing..." : (tradeType === "buy" ? "Place Buy Order" : "Place Sell Order")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Calculator Modal */}
        {showCalculator && (
          <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
            <DialogContent className="bg-crypto-dark border-crypto-gold/20 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-crypto-gold">Trading Calculator</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-4">
                    <Input
                      className="bg-crypto-dark-100 border-crypto-gold/20 text-white text-right text-xl"
                      placeholder="0"
                      readOnly
                      value="0"
                    />
                  </div>
                  {/* Calculator buttons */}
                  {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map((btn) => (
                    <Button
                      key={btn}
                      variant="outline"
                      className={`border-crypto-gold/20 text-white hover:bg-crypto-gold/10 ${
                        btn === '0' ? 'col-span-2' : ''
                      } ${
                        ['÷', '×', '-', '+', '='].includes(btn) ? 'bg-crypto-gold/20' : ''
                      }`}
                      onClick={() => {
                        console.log('Calculator button clicked:', btn);
                      }}
                    >
                      {btn}
                    </Button>
                  ))}
                </div>
                <div className="text-sm text-white/60 text-center">
                  Position Size Calculator • Risk Management Tool
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Settings Modal */}
        {showSettings && (
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogContent className="bg-crypto-dark border-crypto-gold/20 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-crypto-gold">Trading Settings</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 p-4">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Chart Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Chart Theme</Label>
                      <Select>
                        <SelectTrigger className="w-32 bg-crypto-dark-100 border-crypto-gold/20">
                          <SelectValue placeholder="Dark" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Default Timeframe</Label>
                      <Select>
                        <SelectTrigger className="w-32 bg-crypto-dark-100 border-crypto-gold/20">
                          <SelectValue placeholder="15m" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1m</SelectItem>
                          <SelectItem value="5m">5m</SelectItem>
                          <SelectItem value="15m">15m</SelectItem>
                          <SelectItem value="1h">1h</SelectItem>
                          <SelectItem value="4h">4h</SelectItem>
                          <SelectItem value="1d">1d</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Trading Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Default Order Type</Label>
                      <Select>
                        <SelectTrigger className="w-32 bg-crypto-dark-100 border-crypto-gold/20">
                          <SelectValue placeholder="Market" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">Market</SelectItem>
                          <SelectItem value="limit">Limit</SelectItem>
                          <SelectItem value="stop">Stop</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Risk Level</Label>
                      <Select>
                        <SelectTrigger className="w-32 bg-crypto-dark-100 border-crypto-gold/20">
                          <SelectValue placeholder="Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Price Alerts</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Order Notifications</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-white/80">Market News</Label>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
                    onClick={() => setShowSettings(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="crypto-btn-primary"
                    onClick={() => {
                      // Save settings logic would go here
                      console.log('Settings saved');
                      setShowSettings(false);
                    }}
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
