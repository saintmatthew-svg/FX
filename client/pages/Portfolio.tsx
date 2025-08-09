import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  Activity,
  Eye,
  EyeOff,
  Star,
  Bell,
  Settings,
  RefreshCw,
  Download,
  Upload,
  PieChart,
  LineChart,
  Bitcoin,
  Zap,
  Shield,
  Coins,
  Target,
  Users,
  Award,
  Calculator,
} from "lucide-react";

export default function Portfolio() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [portfolioData, setPortfolioData] = useState([
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "2.4567",
      value: "$165,234.56",
      change: "+5.24%",
      changeValue: "+$8,234",
      up: true,
      percentage: 45,
      price: "$67,234.52",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      amount: "15.8923",
      value: "$54,890.34",
      change: "+2.15%",
      changeValue: "+$1,156",
      up: true,
      percentage: 28,
      price: "$3,456.78",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      amount: "25,000",
      value: "$12,075.00",
      change: "-1.45%",
      changeValue: "-$177",
      up: false,
      percentage: 12,
      price: "$0.4823",
    },
    {
      name: "Solana",
      symbol: "SOL",
      amount: "89.456",
      value: "$13,989.23",
      change: "+7.82%",
      changeValue: "+$1,015",
      up: true,
      percentage: 15,
      price: "$156.34",
    },
  ]);

  const totalBalance = balanceVisible ? "$246,189.13" : "•••••••••";
  const totalChange = balanceVisible
    ? "+$10,228.43 (+4.34%)"
    : "•••••••••••••••";

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioData((prev) =>
        prev.map((asset) => ({
          ...asset,
          change: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10).toFixed(2)}%`,
          up: Math.random() > 0.4,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation currentPage="portfolio" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
            <p className="text-white/70">
              Manage and track your crypto investments in real-time.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="crypto-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-crypto-gold" />
                  <span className="text-white/80">Total Portfolio Value</span>
                </div>
                <button
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {balanceVisible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {totalBalance}
              </div>
              <div className="text-sm text-crypto-green">{totalChange}</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">24h Performance</span>
              </div>
              <div className="text-2xl font-bold text-crypto-green mb-1">
                +$5,432.18
              </div>
              <div className="text-sm text-crypto-green">+2.26%</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-crypto-gold" />
                <span className="text-white/80">Assets Count</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {portfolioData.length}
              </div>
              <div className="text-sm text-white/60">
                Active cryptocurrencies
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">Best Performer</span>
              </div>
              <div className="text-2xl font-bold text-crypto-accent mb-1">
                SOL
              </div>
              <div className="text-sm text-crypto-green">+7.82%</div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Content */}
        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
            <TabsTrigger
              value="holdings"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Holdings
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="allocation"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Allocation
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {portfolioData.map((asset) => (
                <Card
                  key={asset.symbol}
                  className="crypto-card-gradient border-crypto-gold/20 hover:border-crypto-gold/40 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-crypto-gold">
                            {asset.symbol[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {asset.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">Holdings</span>
                        <span className="text-white">
                          {asset.amount} {asset.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Value</span>
                        <span className="text-white font-medium">
                          {asset.value}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Price</span>
                        <span className="text-white">{asset.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">24h Change</span>
                        <span
                          className={
                            asset.up ? "text-crypto-green" : "text-crypto-red"
                          }
                        >
                          {asset.changeValue} ({asset.change})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Allocation</span>
                        <span className="text-crypto-gold">
                          {asset.percentage}%
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-6">
                      <Button className="crypto-btn-primary flex-1" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Buy
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-crypto-red text-crypto-red hover:bg-crypto-red/10"
                        size="sm"
                      >
                        <Minus className="w-4 h-4 mr-1" />
                        Sell
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-crypto-gold" />
                  Portfolio Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-crypto-green">
                      +24.7%
                    </div>
                    <div className="text-white/70 text-sm">7 Day Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-crypto-green">
                      +89.3%
                    </div>
                    <div className="text-white/70 text-sm">30 Day Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-crypto-green">
                      +234.8%
                    </div>
                    <div className="text-white/70 text-sm">1 Year Return</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Allocation Tab */}
          <TabsContent value="allocation" className="space-y-6">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-crypto-gold" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-crypto-gold rounded-full"></div>
                        <span className="text-white">{asset.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 h-2 bg-crypto-dark-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-crypto-gold rounded-full"
                            style={{ width: `${asset.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-crypto-gold font-medium w-12 text-right">
                          {asset.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-crypto-gold" />
                    Recent Transactions
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-crypto-gold hover:bg-crypto-gold/10"
                  >
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "buy",
                      asset: "BTC",
                      amount: "0.5",
                      value: "$33,617.26",
                      time: "2 hours ago",
                      status: "completed",
                    },
                    {
                      type: "sell",
                      asset: "ETH",
                      amount: "2.5",
                      value: "$8,642.15",
                      time: "1 day ago",
                      status: "completed",
                    },
                    {
                      type: "stake",
                      asset: "ADA",
                      amount: "1,000",
                      value: "$483.00",
                      time: "3 days ago",
                      status: "completed",
                    },
                  ].map((tx, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === "buy"
                              ? "bg-crypto-green/20"
                              : tx.type === "sell"
                                ? "bg-crypto-red/20"
                                : "bg-crypto-gold/20"
                          }`}
                        >
                          {tx.type === "buy" ? (
                            <ArrowDownRight className="w-4 h-4 text-crypto-green" />
                          ) : tx.type === "sell" ? (
                            <ArrowUpRight className="w-4 h-4 text-crypto-red" />
                          ) : (
                            <Coins className="w-4 h-4 text-crypto-gold" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-medium capitalize">
                            {tx.type} {tx.asset}
                          </div>
                          <div className="text-white/60 text-sm">
                            {tx.amount} {tx.asset} • {tx.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">{tx.value}</div>
                        <div className="text-crypto-green text-sm">
                          {tx.status}
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
