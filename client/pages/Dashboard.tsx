import { useState } from "react";
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
} from "lucide-react";

export default function Dashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const portfolioData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      amount: "2.4567",
      value: "$165,234.56",
      change: "+5.24%",
      changeValue: "+$8,234",
      up: true,
      percentage: 45,
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
    },
  ];

  const recentTransactions = [
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
    {
      type: "buy",
      asset: "SOL",
      amount: "10",
      value: "$1,563.40",
      time: "1 week ago",
      status: "completed",
    },
  ];

  const marketData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$67,234.52",
      change: "+2.47%",
      volume: "$28.5B",
      up: true,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,456.78",
      change: "+1.83%",
      volume: "$12.3B",
      up: true,
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      price: "$598.45",
      change: "-0.75%",
      volume: "$1.8B",
      up: false,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$0.4823",
      change: "-0.92%",
      volume: "$845M",
      up: false,
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$156.34",
      change: "+5.24%",
      volume: "$2.1B",
      up: true,
    },
  ];

  const totalBalance = balanceVisible ? "$246,189.13" : "•••••••••";
  const totalChange = balanceVisible
    ? "+$10,228.43 (+4.34%)"
    : "•••••••••••••••";

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation currentPage="dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-white/70">
              Welcome back! Here's what's happening with your crypto portfolio.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-crypto-purple/20 text-white hover:bg-crypto-purple/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="crypto-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Buy Crypto
            </Button>
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="crypto-card-gradient border-crypto-purple/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-crypto-purple" />
                  <span className="text-white/80">Total Balance</span>
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

          <Card className="crypto-card-gradient border-crypto-cyan/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-crypto-cyan" />
                <span className="text-white/80">24h P&L</span>
              </div>
              <div className="text-2xl font-bold text-crypto-green mb-1">
                +$5,432.18
              </div>
              <div className="text-sm text-crypto-green">+2.26%</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-purple/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart3 className="w-5 h-5 text-crypto-purple" />
                <span className="text-white/80">Portfolio Assets</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-white/60">
                Different cryptocurrencies
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-cyan/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-crypto-cyan" />
                <span className="text-white/80">Staking Rewards</span>
              </div>
              <div className="text-2xl font-bold text-crypto-cyan mb-1">
                $1,234.56
              </div>
              <div className="text-sm text-crypto-cyan">+12.5% APY</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-crypto-dark-100 border border-crypto-purple/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-crypto-purple data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-crypto-purple data-[state=active]:text-white"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="data-[state=active]:bg-crypto-purple data-[state=active]:text-white"
            >
              Trading
            </TabsTrigger>
            <TabsTrigger
              value="staking"
              className="data-[state=active]:bg-crypto-purple data-[state=active]:text-white"
            >
              Staking
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Allocation */}
              <Card className="crypto-card-gradient border-crypto-purple/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-crypto-purple" />
                    Portfolio Allocation
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
                          <div className="w-8 h-8 bg-crypto-purple/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-crypto-purple">
                              {asset.symbol[0]}
                            </span>
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {asset.name}
                            </div>
                            <div className="text-white/60 text-sm">
                              {asset.amount} {asset.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {asset.percentage}%
                          </div>
                          <div
                            className={`text-sm ${asset.up ? "text-crypto-green" : "text-crypto-red"}`}
                          >
                            {asset.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card className="crypto-card-gradient border-crypto-cyan/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-crypto-cyan" />
                      Recent Transactions
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-crypto-cyan hover:bg-crypto-cyan/10"
                    >
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((tx, index) => (
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
                                  : "bg-crypto-cyan/20"
                            }`}
                          >
                            {tx.type === "buy" ? (
                              <ArrowDownRight className="w-4 h-4 text-crypto-green" />
                            ) : tx.type === "sell" ? (
                              <ArrowUpRight className="w-4 h-4 text-crypto-red" />
                            ) : (
                              <Coins className="w-4 h-4 text-crypto-cyan" />
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium capitalize">
                              {tx.type} {tx.asset}
                            </div>
                            <div className="text-white/60 text-sm">
                              {tx.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">
                            {tx.value}
                          </div>
                          <div className="text-crypto-green text-sm">
                            {tx.status}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Overview */}
            <Card className="crypto-card-gradient border-crypto-purple/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-crypto-purple" />
                    Market Overview
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-crypto-purple hover:bg-crypto-purple/10"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-crypto-purple/20">
                        <th className="text-left text-white/80 pb-2">Asset</th>
                        <th className="text-right text-white/80 pb-2">Price</th>
                        <th className="text-right text-white/80 pb-2">
                          24h Change
                        </th>
                        <th className="text-right text-white/80 pb-2">
                          Volume
                        </th>
                        <th className="text-right text-white/80 pb-2">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.map((asset, index) => (
                        <tr
                          key={index}
                          className="border-b border-crypto-purple/10"
                        >
                          <td className="py-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-crypto-purple/20 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-crypto-purple">
                                  {asset.symbol[0]}
                                </span>
                              </div>
                              <div>
                                <div className="text-white font-medium">
                                  {asset.symbol}
                                </div>
                                <div className="text-white/60 text-sm">
                                  {asset.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="text-right text-white">
                            {asset.price}
                          </td>
                          <td
                            className={`text-right ${asset.up ? "text-crypto-green" : "text-crypto-red"}`}
                          >
                            {asset.change}
                          </td>
                          <td className="text-right text-white/70">
                            {asset.volume}
                          </td>
                          <td className="text-right">
                            <Button size="sm" className="crypto-btn-primary">
                              Trade
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {portfolioData.map((asset) => (
                <Card
                  key={asset.symbol}
                  className="crypto-card-gradient border-crypto-purple/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-crypto-purple/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-crypto-purple">
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
                        <span className="text-white/70">24h Change</span>
                        <span
                          className={
                            asset.up ? "text-crypto-green" : "text-crypto-red"
                          }
                        >
                          {asset.changeValue} ({asset.change})
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

          {/* Trading Tab */}
          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="crypto-card-gradient border-crypto-purple/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Trade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-white/70 mb-4">
                      Trade cryptocurrencies instantly
                    </p>
                    <Button className="crypto-btn-primary w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Open Trading Interface
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-cyan/20">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Trading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-white/70 mb-4">
                      Professional trading tools and charts
                    </p>
                    <Button className="crypto-btn-cyan w-full">
                      <LineChart className="w-4 h-4 mr-2" />
                      Pro Trading View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Staking Tab */}
          <TabsContent value="staking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="crypto-card-gradient border-crypto-purple/20">
                <CardHeader>
                  <CardTitle className="text-white">Active Stakes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-crypto-cyan/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-crypto-cyan">
                          A
                        </span>
                      </div>
                      <div>
                        <div className="text-white">Cardano (ADA)</div>
                        <div className="text-white/60 text-sm">
                          25,000 ADA staked
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-crypto-cyan">5.2% APY</div>
                      <div className="text-white/60 text-sm">$1,207.50</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-cyan/20">
                <CardHeader>
                  <CardTitle className="text-white">
                    Available for Staking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-white/70 mb-4">
                      Earn rewards by staking your crypto
                    </p>
                    <Button className="crypto-btn-cyan w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Explore Staking Options
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
