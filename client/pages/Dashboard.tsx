import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/use-auth";
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
  const { user, updateBalance } = useAuth();
  const navigate = useNavigate();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState<Array<{
    id: string;
    type: 'buy' | 'sell' | 'deposit' | 'withdrawal';
    asset: string;
    amount: string;
    value: string;
    time: string;
    status: string;
  }>>([]);
  const [favoriteAssets, setFavoriteAssets] = useState<Set<string>>(new Set());

  // Function to handle buying an asset
  const handleBuyAsset = (assetSymbol: string, assetName: string) => {
    try {
      // Navigate to trading page with the asset pre-selected
      navigate(`/trading?symbol=BINANCE:${assetSymbol}USDT&action=buy`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  // Function to handle selling an asset
  const handleSellAsset = (assetSymbol: string, assetName: string) => {
    try {
      // Navigate to trading page with the asset pre-selected
      navigate(`/trading?symbol=BINANCE:${assetSymbol}USDT&action=sell`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = (assetSymbol: string) => {
    setFavoriteAssets(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(assetSymbol)) {
        newFavorites.delete(assetSymbol);
      } else {
        newFavorites.add(assetSymbol);
      }
      return newFavorites;
    });
  };

  // Function to handle export
  const handleExport = () => {
    try {
      const portfolioData = {
        balance: user?.balance || 0,
        transactions: recentTransactions,
        timestamp: new Date().toISOString()
      };

      const dataStr = JSON.stringify(portfolioData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-export-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    if (isLoading) return; // Prevent double-clicks

    console.log('Starting deposit for amount:', depositAmount);
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('/api/auth/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : ''}`
        },
        body: JSON.stringify({
          type: 'deposit',
          amount: parseFloat(depositAmount)
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.user) {
        updateBalance(data.user.balance);
        addTransaction('deposit', 'USD', parseFloat(depositAmount));
        setDepositAmount('');
        setIsDepositOpen(false);
      } else {
        throw new Error(data.message || 'Deposit failed');
      }
    } catch (error) {
      console.error('Deposit error:', error);
      alert(`Deposit failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) return;
    if (isLoading) return; // Prevent double-clicks

    console.log('Starting withdrawal for amount:', withdrawAmount);
    setIsLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('/api/auth/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${typeof localStorage !== 'undefined' ? localStorage.getItem('auth_token') : ''}`
        },
        body: JSON.stringify({
          type: 'withdrawal',
          amount: parseFloat(withdrawAmount)
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.user) {
        updateBalance(data.user.balance);
        addTransaction('withdrawal', 'USD', parseFloat(withdrawAmount));
        setWithdrawAmount('');
        setIsWithdrawOpen(false);
      } else {
        throw new Error(data.message || 'Withdrawal failed');
      }
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert(`Withdrawal failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Function to format relative time
  const formatRelativeTime = (timestamp: string) => {
    const now = new Date();
    const transactionTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - transactionTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  // Wallet addresses for different currencies
  const walletAddresses = {
    USDT: 'TUvDY4bBhXX1x2YKZp7KfYp8gW1TvH1234',
    BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    ETH: '0x742d35Cc6634C0532925a3b8D000B2b77cFE4567',
    ADA: 'addr1qxy2lpan99fcnhhhy8heycw0lk9aydaddaer2v4ka68z3c4gkdyqs6z2hnyq',
    SOL: '7xKXtg2CW87d97TXJSDpbD8HCN98iF5M2z6WcKGKP1dz',
    DOT: '15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9K1N3UaNe5k1234',
    MATIC: '0x8ba1f109551bD432803012645Hac136c770077f8',
    AVAX: 'X-avax1yr9d8jy4lk6qvh6qw2h2r8t7x7j3k8j4v9d3c2',
    NEAR: 'wallet.near',
    ATOM: 'cosmos1234567890abcdefghijklmnopqrstuvwxyz1234'
  };

  const cryptoCurrencies = [
    { symbol: 'USDT', name: 'Tether USD', network: 'TRC20' },
    { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum', network: 'ERC20' },
    { symbol: 'ADA', name: 'Cardano', network: 'Cardano' },
    { symbol: 'SOL', name: 'Solana', network: 'Solana' },
    { symbol: 'DOT', name: 'Polkadot', network: 'Polkadot' },
    { symbol: 'MATIC', name: 'Polygon', network: 'Polygon' },
    { symbol: 'AVAX', name: 'Avalanche', network: 'Avalanche' },
    { symbol: 'NEAR', name: 'Near Protocol', network: 'Near' },
    { symbol: 'ATOM', name: 'Cosmos', network: 'Cosmos' }
  ];

  // Function to add a new transaction
  const addTransaction = (type: 'buy' | 'sell' | 'deposit' | 'withdrawal', asset: string, amount: number, price?: number) => {
    const newTransaction = {
      id: Date.now().toString(),
      type,
      asset,
      amount: amount.toString(),
      value: price ? `$${(amount * price).toFixed(2)}` : `$${amount.toFixed(2)}`,
      time: formatRelativeTime(new Date().toISOString()),
      status: 'completed'
    };

    setRecentTransactions(prev => [newTransaction, ...prev.slice(0, 9)]); // Keep only last 10 transactions
  };

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

  const userBalance = user?.balance || 0;
  const totalBalance = balanceVisible ? `$${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "•••••••••";
  const totalChange = balanceVisible
    ? "+$0.00 (+0.00%)"
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
              Welcome back, {user?.firstName}! Here's what's happening with your crypto portfolio.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-crypto-dark border-crypto-gold/20">
                <DialogHeader>
                  <DialogTitle className="text-white">Withdraw Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="withdraw-amount" className="text-white">Amount (USD)</Label>
                    <Input
                      id="withdraw-amount"
                      type="number"
                      placeholder="0.00"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="bg-crypto-dark-100 border-crypto-gold/30 text-white"
                    />
                  </div>
                  <div className="text-white/70 text-sm">
                    Available balance: ${userBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <Button
                    onClick={handleWithdrawal}
                    disabled={isLoading || !withdrawAmount || parseFloat(withdrawAmount) > userBalance}
                    className="w-full crypto-btn-primary"
                  >
                    {isLoading ? "Processing..." : "Withdraw"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
              <DialogTrigger asChild>
                <Button className="crypto-btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Deposit
                </Button>
              </DialogTrigger>
              <DialogContent className="crypto-card-gradient border-crypto-gold/20 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-crypto-gold" />
                    Deposit Crypto
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency" className="text-white">Select Currency</Label>
                    <Select value={selectedCurrency} onValueChange={(value) => {
                      setSelectedCurrency(value);
                      setShowWalletAddress(false);
                    }}>
                      <SelectTrigger className="bg-crypto-dark border-crypto-gold/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-crypto-dark border-crypto-gold/20">
                        {cryptoCurrencies.map((currency) => (
                          <SelectItem key={currency.symbol} value={currency.symbol} className="text-white hover:bg-crypto-gold/10">
                            {currency.symbol} - {currency.name} ({currency.network})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deposit-amount" className="text-white">Amount ({selectedCurrency})</Label>
                    <Input
                      id="deposit-amount"
                      type="number"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-crypto-dark border-crypto-gold/20 text-white"
                    />
                  </div>

                  {!showWalletAddress ? (
                    <Button
                      onClick={() => setShowWalletAddress(true)}
                      disabled={!depositAmount || parseFloat(depositAmount) <= 0}
                      className="w-full crypto-btn-primary"
                    >
                      Get Deposit Address
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-crypto-dark/50 p-4 rounded-lg border border-crypto-gold/20">
                        <div className="text-white/70 text-sm mb-2">Send exactly:</div>
                        <div className="text-crypto-gold font-bold text-lg mb-3">
                          {depositAmount} {selectedCurrency}
                        </div>
                        <div className="text-white/70 text-sm mb-2">To this address:</div>
                        <div className="bg-crypto-dark-100 p-3 rounded border border-crypto-gold/30 break-all">
                          <code className="text-crypto-accent text-sm">
                            {walletAddresses[selectedCurrency as keyof typeof walletAddresses]}
                          </code>
                        </div>
                        <div className="text-white/60 text-xs mt-2">
                          Network: {cryptoCurrencies.find(c => c.symbol === selectedCurrency)?.network}
                        </div>
                      </div>

                      <div className="bg-crypto-dark/30 p-3 rounded border border-crypto-red/20">
                        <div className="text-crypto-red text-sm font-medium mb-1">⚠️ Important:</div>
                        <ul className="text-white/70 text-xs space-y-1">
                          <li>• Send only {selectedCurrency} to this address</li>
                          <li>• Minimum deposit: 0.001 {selectedCurrency}</li>
                          <li>• Funds will be credited after 1 confirmation</li>
                          <li>• Do not send from smart contracts</li>
                        </ul>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => setShowWalletAddress(false)}
                          className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10 flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={() => {
                            // Copy address to clipboard
                            navigator.clipboard.writeText(walletAddresses[selectedCurrency as keyof typeof walletAddresses]);
                            alert('Address copied to clipboard!');
                          }}
                          className="crypto-btn-primary flex-1"
                        >
                          Copy Address
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-5 h-5 text-crypto-gold" />
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

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">24h P&L</span>
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
                <span className="text-white/80">Portfolio Assets</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-white/60">
                Different cryptocurrencies
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">Staking Rewards</span>
              </div>
              <div className="text-2xl font-bold text-crypto-gold mb-1">
                $1,234.56
              </div>
              <div className="text-sm text-crypto-gold">+12.5% APY</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="portfolio"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-white"
            >
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-white"
            >
              Trading
            </TabsTrigger>
            <TabsTrigger
              value="staking"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-white"
            >
              Staking
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Allocation */}
              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-crypto-gold" />
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
                          <div className="w-8 h-8 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-crypto-gold">
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
              <Card className="crypto-card-gradient border-crypto-accent/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-crypto-accent" />
                      Recent Transactions
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-crypto-accent hover:bg-crypto-accent/10"
                    >
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.length === 0 ? (
                      <div className="text-center text-white/60 py-8">
                        No recent transactions
                      </div>
                    ) : (
                      recentTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.type === "buy" || tx.type === "deposit"
                                  ? "bg-crypto-green/20"
                                  : "bg-crypto-red/20"
                              }`}
                            >
                              {tx.type === "buy" ? (
                                <ArrowDownRight className="w-4 h-4 text-crypto-green" />
                              ) : tx.type === "sell" ? (
                                <ArrowUpRight className="w-4 h-4 text-crypto-red" />
                              ) : tx.type === "deposit" ? (
                                <Plus className="w-4 h-4 text-crypto-green" />
                              ) : (
                                <Minus className="w-4 h-4 text-crypto-red" />
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
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Market Overview */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-crypto-gold" />
                    Market Overview
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-crypto-gold hover:bg-crypto-gold/10"
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
                              <div className="w-8 h-8 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-crypto-gold">
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
                            <Button
                              size="sm"
                              className="crypto-btn-primary"
                              onClick={() => navigate(`/trading?symbol=BINANCE:${asset.symbol}USDT`)}
                            >
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
                      <Button
                        className="crypto-btn-primary flex-1"
                        size="sm"
                        onClick={() => handleBuyAsset(asset.symbol, asset.name)}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Buy
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 border-crypto-red text-crypto-red hover:bg-crypto-red/10"
                        size="sm"
                        onClick={() => handleSellAsset(asset.symbol, asset.name)}
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
              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Trade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-white/70 mb-4">
                      Trade cryptocurrencies instantly
                    </p>
                    <Button
                      className="crypto-btn-primary w-full"
                      onClick={() => navigate('/trading')}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Open Trading Interface
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-accent/20">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Trading</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-white/70 mb-4">
                      Professional trading tools and charts
                    </p>
                    <Button
                      className="crypto-btn-accent w-full"
                      onClick={() => navigate('/trading')}
                    >
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
              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardHeader>
                  <CardTitle className="text-white">Active Stakes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-crypto-accent/20 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-crypto-accent">
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
                      <div className="text-crypto-accent">5.2% APY</div>
                      <div className="text-white/60 text-sm">$1,207.50</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-accent/20">
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
                    <Button
                      className="crypto-btn-accent w-full"
                      onClick={() => navigate('/staking')}
                    >
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
