import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import {
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  Shield,
  Target,
  Award,
  Calculator,
  Star,
  Activity,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  PieChart,
  BarChart3,
  Wallet,
  Bell,
  Settings,
  RefreshCw,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Staking() {
  const { user } = useAuth();
  const [selectedValidator, setSelectedValidator] = useState(null);
  const [favoriteStakes, setFavoriteStakes] = useState<Set<string>>(new Set());
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [userStakingHistory, setUserStakingHistory] = useState<any[]>([]);
  const [isStakeDialogOpen, setIsStakeDialogOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isStaking, setIsStaking] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState<{[key: string]: number}>({});
  const [calculatorData, setCalculatorData] = useState({
    amount: '',
    apy: '15.5',
    period: '12', // months
    periodType: 'months',
    asset: 'LUNA'
  });
  const [nextRewardCountdown, setNextRewardCountdown] = useState({
    hours: 6,
    minutes: 23,
    seconds: 45
  });

  // Load user portfolio from localStorage
  useEffect(() => {
    if (typeof localStorage !== 'undefined' && user) {
      const savedPortfolio = localStorage.getItem('user_portfolio');
      if (savedPortfolio) {
        try {
          setUserPortfolio(JSON.parse(savedPortfolio));
        } catch (error) {
          console.error('Error loading portfolio:', error);
          setUserPortfolio({});
        }
      }
    }
  }, [user]);

  // Function to open staking dialog
  const handleStake = (poolSymbol: string, poolName: string) => {
    const pool = stakingPools.find(p => p.symbol === poolSymbol);
    if (pool) {
      setSelectedPool(pool);
      setStakeAmount('');
      setIsStakeDialogOpen(true);
    }
  };

  // Function to execute actual staking
  const executeStake = async () => {
    if (!selectedPool || !stakeAmount || !user) return;

    const amount = parseFloat(stakeAmount);
    const userBalance = userPortfolio[selectedPool.symbol as keyof typeof userPortfolio] || 0;

    if (amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount > userBalance) {
      alert(`Insufficient ${selectedPool.symbol} balance. You have ${userBalance} ${selectedPool.symbol}`);
      return;
    }

    const minStake = parseFloat(selectedPool.minimumStake.split(' ')[0]);
    if (amount < minStake) {
      alert(`Minimum stake is ${selectedPool.minimumStake}`);
      return;
    }

    setIsStaking(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update user portfolio (deduct staked amount)
      const updatedPortfolio = {
        ...userPortfolio,
        [selectedPool.symbol]: (userPortfolio[selectedPool.symbol] || 0) - amount
      };
      setUserPortfolio(updatedPortfolio);

      // Save to localStorage
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user_portfolio', JSON.stringify(updatedPortfolio));
      }

      // Add to staking history
      const historyEntry = {
        date: new Date().toISOString().split('T')[0],
        asset: selectedPool.symbol,
        amount: amount.toString(),
        value: `$${(amount * getAssetPrice(selectedPool.symbol)).toFixed(2)}`,
        validator: selectedPool.name,
        type: 'stake'
      };

      setUserStakingHistory(prev => [historyEntry, ...prev]);

      alert(`Successfully staked ${amount} ${selectedPool.symbol}!`);
      setIsStakeDialogOpen(false);

    } catch (error) {
      alert('Staking failed. Please try again.');
    } finally {
      setIsStaking(false);
    }
  };

  // Helper function to get asset prices (mock prices)
  const getAssetPrice = (symbol: string): number => {
    const prices: { [key: string]: number } = {
      BTC: 43000,
      ETH: 2600,
      ADA: 0.48,
      SOL: 95,
      DOT: 7.2,
      ATOM: 12.5,
      AVAX: 38,
      LUNA: 0.85,
      NEAR: 3.2,
      ALGO: 0.28,
      MATIC: 0.85,
      FTM: 0.42
    };
    return prices[symbol] || 1;
  };

  // Function to open rewards calculator
  const openRewardsCalculator = () => {
    setIsCalculatorOpen(true);
  };

  // Comprehensive crypto assets with enhanced APYs
  const cryptoAssets = {
    'BTC': { name: 'Bitcoin', apy: '8.5' },
    'ETH': { name: 'Ethereum', apy: '12.2' },
    'ADA': { name: 'Cardano', apy: '15.8' },
    'SOL': { name: 'Solana', apy: '18.1' },
    'DOT': { name: 'Polkadot', apy: '22.5' },
    'ATOM': { name: 'Cosmos', apy: '28.2' },
    'AVAX': { name: 'Avalanche', apy: '19.8' },
    'LUNA': { name: 'Terra Luna', apy: '35.5' },
    'NEAR': { name: 'Near Protocol', apy: '24.7' },
    'ALGO': { name: 'Algorand', apy: '16.3' },
    'MATIC': { name: 'Polygon', apy: '14.9' },
    'FTM': { name: 'Fantom', apy: '21.4' },
    'OSMO': { name: 'Osmosis', apy: '45.2' },
    'JUNO': { name: 'Juno', apy: '38.7' },
    'SCRT': { name: 'Secret Network', apy: '32.1' },
    'KAVA': { name: 'Kava', apy: '29.6' },
    'CRO': { name: 'Cronos', apy: '18.5' },
    'ONE': { name: 'Harmony', apy: '26.3' },
    'VET': { name: 'VeChain', apy: '13.7' },
    'THETA': { name: 'Theta Network', apy: '17.9' },
    'XTZ': { name: 'Tezos', apy: '11.4' },
    'ICX': { name: 'ICON', apy: '19.2' },
    'QTUM': { name: 'Qtum', apy: '15.6' },
    'ZIL': { name: 'Zilliqa', apy: '23.8' },
    'BAND': { name: 'Band Protocol', apy: '31.4' },
    'RUNE': { name: 'THORChain', apy: '42.1' },
    'KSM': { name: 'Kusama', apy: '16.8' },
    'FLOW': { name: 'Flow', apy: '20.3' },
    'MINA': { name: 'Mina Protocol', apy: '25.7' },
    'ROSE': { name: 'Oasis Network', apy: '33.9' }
  };

  // Function to calculate rewards over time with monthly support
  const calculateRewards = () => {
    const principal = parseFloat(calculatorData.amount) || 0;
    const annualRate = parseFloat(calculatorData.apy) / 100;
    const totalPeriods = parseFloat(calculatorData.period);
    const isMonthly = calculatorData.periodType === 'months';

    if (principal <= 0) return { total: 0, earned: 0, breakdown: [] };

    const breakdown = [];
    let currentAmount = principal;

    // Calculate compound interest for each period
    if (isMonthly) {
      const monthlyRate = annualRate / 12;
      for (let month = 1; month <= totalPeriods; month++) {
        const monthlyEarnings = currentAmount * monthlyRate;
        currentAmount += monthlyEarnings;
        breakdown.push({
          period: month,
          periodLabel: `Month ${month}`,
          amount: currentAmount,
          earned: monthlyEarnings,
          totalEarned: currentAmount - principal
        });
      }
    } else {
      // Yearly calculation
      for (let year = 1; year <= totalPeriods; year++) {
        const yearlyEarnings = currentAmount * annualRate;
        currentAmount += yearlyEarnings;
        breakdown.push({
          period: year,
          periodLabel: `Year ${year}`,
          amount: currentAmount,
          earned: yearlyEarnings,
          totalEarned: currentAmount - principal
        });
      }
    }

    return {
      total: currentAmount,
      earned: currentAmount - principal,
      breakdown
    };
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setNextRewardCountdown(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset to next reward cycle (24 hours)
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to toggle favorite staking pools
  const toggleFavoriteStake = (poolSymbol: string) => {
    setFavoriteStakes(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(poolSymbol)) {
        newFavorites.delete(poolSymbol);
      } else {
        newFavorites.add(poolSymbol);
      }
      return newFavorites;
    });
  };

  const stakingPools = [
    {
      name: "Ethereum 2.0",
      symbol: "ETH",
      apy: "5.2%",
      minimumStake: "0.1 ETH",
      totalStaked: "$2.4B",
      validators: 245000,
      lockPeriod: "Until upgrade",
      risk: "Low",
      description:
        "Secure the Ethereum network and earn rewards through Proof of Stake consensus.",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      apy: "4.8%",
      minimumStake: "10 ADA",
      totalStaked: "$18.7B",
      validators: 3200,
      lockPeriod: "Flexible",
      risk: "Low",
      description:
        "Delegate your ADA to stake pools and earn rewards without locking your funds.",
    },
    {
      name: "Solana",
      symbol: "SOL",
      apy: "7.1%",
      minimumStake: "0.01 SOL",
      totalStaked: "$22.1B",
      validators: 1800,
      lockPeriod: "2-3 days",
      risk: "Medium",
      description:
        "High-performance blockchain with fast transactions and competitive staking rewards.",
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      apy: "12.5%",
      minimumStake: "1 DOT",
      totalStaked: "$6.8B",
      validators: 297,
      lockPeriod: "28 days",
      risk: "Medium",
      description:
        "Multi-chain protocol enabling blockchain interoperability with nominator staking.",
    },
    {
      name: "Cosmos",
      symbol: "ATOM",
      apy: "18.2%",
      minimumStake: "0.1 ATOM",
      totalStaked: "$2.1B",
      validators: 175,
      lockPeriod: "21 days",
      risk: "High",
      description:
        "Internet of blockchains with high staking rewards and liquid staking options.",
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      apy: "9.8%",
      minimumStake: "25 AVAX",
      totalStaked: "$3.2B",
      validators: 1250,
      lockPeriod: "14 days",
      risk: "Medium",
      description:
        "Fast, low-cost, and eco-friendly blockchain platform for DeFi applications.",
    },
  ];

  const activeStakes = [
    {
      asset: "ETH",
      amount: "5.2",
      value: "$17,976.25",
      apy: "5.2%",
      earned: "$234.56",
      validator: "Lido",
      status: "active",
    },
    {
      asset: "ADA",
      amount: "25,000",
      value: "$12,075.00",
      apy: "4.8%",
      earned: "$156.78",
      validator: "AZTEC Pool",
      status: "active",
    },
    {
      asset: "SOL",
      amount: "45.6",
      value: "$7,131.50",
      apy: "7.1%",
      earned: "$89.23",
      validator: "Chorus One",
      status: "active",
    },
  ];

  const totalStakedValue = activeStakes.reduce((sum, stake) => {
    return sum + parseFloat(stake.value.replace("$", "").replace(",", ""));
  }, 0);

  const totalEarned = activeStakes.reduce((sum, stake) => {
    return sum + parseFloat(stake.earned.replace("$", ""));
  }, 0);

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation currentPage="staking" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Staking</h1>
            <p className="text-white/70">
              Earn passive income by staking your crypto assets.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
              onClick={openRewardsCalculator}
            >
              <Calculator className="w-4 h-4 mr-2" />
              Rewards Calculator
            </Button>
            <Button className="crypto-btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Start Staking
            </Button>
          </div>
        </div>

        {/* Staking Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Wallet className="w-5 h-5 text-crypto-gold" />
                <span className="text-white/80">Total Staked</span>
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                ${totalStakedValue.toLocaleString()}
              </div>
              <div className="text-sm text-crypto-green">3 Active Stakes</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">Total Rewards</span>
              </div>
              <div className="text-2xl font-bold text-crypto-green mb-1">
                ${totalEarned.toFixed(2)}
              </div>
              <div className="text-sm text-crypto-green">This Month</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-crypto-gold" />
                <span className="text-white/80">Average APY</span>
              </div>
              <div className="text-2xl font-bold text-crypto-gold mb-1">
                5.7%
              </div>
              <div className="text-sm text-white/60">Weighted Average</div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">Next Reward</span>
              </div>
              <div className="text-2xl font-bold text-crypto-accent mb-1">
                {nextRewardCountdown.hours}h {nextRewardCountdown.minutes}m {nextRewardCountdown.seconds}s
              </div>
              <div className="text-sm text-white/60">ETH Reward</div>
            </CardContent>
          </Card>
        </div>

        {/* Staking Content */}
        <Tabs defaultValue="pools" className="space-y-6">
          <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
            <TabsTrigger
              value="pools"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Staking Pools
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Active Stakes
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Rewards History
            </TabsTrigger>
            <TabsTrigger
              value="validators"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Validators
            </TabsTrigger>
          </TabsList>

          {/* Staking Pools Tab */}
          <TabsContent value="pools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {stakingPools.map((pool, index) => (
                <Card
                  key={index}
                  className="crypto-card-gradient border-crypto-gold/20 hover:border-crypto-gold/40 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-crypto-gold">
                            {pool.symbol[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-lg">
                            {pool.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {pool.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-crypto-gold">
                          {pool.apy}
                        </div>
                        <div className="text-white/60 text-xs">APY</div>
                      </div>
                    </div>

                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {pool.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Minimum Stake</span>
                        <span className="text-white">{pool.minimumStake}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Total Staked</span>
                        <span className="text-white">{pool.totalStaked}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Lock Period</span>
                        <span className="text-white">{pool.lockPeriod}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Risk Level</span>
                        <span
                          className={`${
                            pool.risk === "Low"
                              ? "text-crypto-green"
                              : pool.risk === "Medium"
                                ? "text-crypto-accent"
                                : "text-crypto-red"
                          }`}
                        >
                          {pool.risk}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        className="crypto-btn-primary flex-1"
                        onClick={() => handleStake(pool.symbol, pool.name)}
                        disabled={!user}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Stake {pool.symbol}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10"
                        size="sm"
                        onClick={() => toggleFavoriteStake(pool.symbol)}
                      >
                        <Star className={`w-4 h-4 ${favoriteStakes.has(pool.symbol) ? 'fill-crypto-gold text-crypto-gold' : ''}`} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Stakes Tab */}
          <TabsContent value="active" className="space-y-6">
            <div className="space-y-4">
              {activeStakes.map((stake, index) => (
                <Card
                  key={index}
                  className="crypto-card-gradient border-crypto-gold/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-crypto-gold text-lg">
                            {stake.asset[0]}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium text-lg">
                            {stake.asset} Staking
                          </div>
                          <div className="text-white/60 text-sm">
                            Validator: {stake.validator}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        <div className="text-center">
                          <div className="text-white font-medium">
                            {stake.amount} {stake.asset}
                          </div>
                          <div className="text-white/60 text-sm">Staked</div>
                        </div>

                        <div className="text-center">
                          <div className="text-white font-medium">
                            {stake.value}
                          </div>
                          <div className="text-white/60 text-sm">Value</div>
                        </div>

                        <div className="text-center">
                          <div className="text-crypto-gold font-medium">
                            {stake.apy}
                          </div>
                          <div className="text-white/60 text-sm">APY</div>
                        </div>

                        <div className="text-center">
                          <div className="text-crypto-green font-medium">
                            {stake.earned}
                          </div>
                          <div className="text-white/60 text-sm">Earned</div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-crypto-red/20 text-crypto-red hover:bg-crypto-red/10"
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Rewards History Tab */}
          <TabsContent value="rewards" className="space-y-6">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-crypto-gold" />
                  Rewards History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStakingHistory.length > 0 ? (
                    userStakingHistory.map((reward, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                            <Award className="w-4 h-4 text-crypto-gold" />
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {reward.asset} Reward
                            </div>
                            <div className="text-white/60 text-sm">
                              {reward.validator} • {reward.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-crypto-green font-medium">
                            +{reward.amount} {reward.asset}
                          </div>
                          <div className="text-white/60 text-sm">
                            {reward.value}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-crypto-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-crypto-gold/50" />
                      </div>
                      <div className="text-white/70 font-medium mb-2">No Staking History</div>
                      <div className="text-white/50 text-sm">Start staking to see your rewards history here.</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Validators Tab */}
          <TabsContent value="validators" className="space-y-6">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-crypto-gold" />
                  Recommended Validators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Lido",
                      network: "Ethereum",
                      commission: "10%",
                      uptime: "99.8%",
                      rating: 5,
                    },
                    {
                      name: "Chorus One",
                      network: "Solana",
                      commission: "8%",
                      uptime: "99.9%",
                      rating: 5,
                    },
                    {
                      name: "AZTEC Pool",
                      network: "Cardano",
                      commission: "2%",
                      uptime: "99.7%",
                      rating: 4,
                    },
                  ].map((validator, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-crypto-dark/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-crypto-gold" />
                        </div>
                        <div>
                          <div className="text-white font-medium">
                            {validator.name}
                          </div>
                          <div className="text-white/60 text-sm">
                            {validator.network}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-white">
                            {validator.commission}
                          </div>
                          <div className="text-white/60 text-xs">
                            Commission
                          </div>
                        </div>

                        <div className="text-center">
                          <div className="text-crypto-green">
                            {validator.uptime}
                          </div>
                          <div className="text-white/60 text-xs">Uptime</div>
                        </div>

                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < validator.rating
                                  ? "text-crypto-gold fill-current"
                                  : "text-white/30"
                              }`}
                            />
                          ))}
                        </div>

                        <Button size="sm" className="crypto-btn-primary">
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rewards Calculator Dialog */}
      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
        <DialogContent className="crypto-card-gradient border-crypto-gold/20 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-crypto-gold" />
              Staking Rewards Calculator
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 max-h-[calc(90vh-120px)] overflow-y-auto pr-2">
            {/* Input Form */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">Amount to Stake</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={calculatorData.amount}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, amount: e.target.value }))}
                  className="bg-crypto-dark border-crypto-gold/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="asset" className="text-white">Asset</Label>
                <Select value={calculatorData.asset} onValueChange={(value) => {
                  setCalculatorData(prev => ({
                    ...prev,
                    asset: value,
                    apy: cryptoAssets[value as keyof typeof cryptoAssets]?.apy || prev.apy
                  }));
                }}>
                  <SelectTrigger className="bg-crypto-dark border-crypto-gold/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-crypto-dark border-crypto-gold/20 max-h-96 overflow-y-auto">
                    {Object.entries(cryptoAssets).map(([symbol, { name, apy }]) => (
                      <SelectItem key={symbol} value={symbol} className="text-white hover:bg-crypto-gold/10">
                        {symbol} - {name} ({apy}% APY)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="apy" className="text-white">APY (%)</Label>
                <Input
                  id="apy"
                  type="number"
                  step="0.1"
                  value={calculatorData.apy}
                  onChange={(e) => setCalculatorData(prev => ({ ...prev, apy: e.target.value }))}
                  className="bg-crypto-dark border-crypto-gold/20 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodType" className="text-white">Period Type</Label>
                <Select value={calculatorData.periodType} onValueChange={(value) => {
                  setCalculatorData(prev => ({
                    ...prev,
                    periodType: value,
                    period: value === 'months' ? '12' : '1'
                  }));
                }}>
                  <SelectTrigger className="bg-crypto-dark border-crypto-gold/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-crypto-dark border-crypto-gold/20">
                    <SelectItem value="months" className="text-white hover:bg-crypto-gold/10">Months</SelectItem>
                    <SelectItem value="years" className="text-white hover:bg-crypto-gold/10">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="period" className="text-white">
                  Staking Period ({calculatorData.periodType === 'months' ? 'Months' : 'Years'})
                </Label>
                <Select value={calculatorData.period} onValueChange={(value) => setCalculatorData(prev => ({ ...prev, period: value }))}>
                  <SelectTrigger className="bg-crypto-dark border-crypto-gold/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-crypto-dark border-crypto-gold/20">
                    {calculatorData.periodType === 'months' ? (
                      <>
                        <SelectItem value="1" className="text-white hover:bg-crypto-gold/10">1 Month</SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-crypto-gold/10">3 Months</SelectItem>
                        <SelectItem value="6" className="text-white hover:bg-crypto-gold/10">6 Months</SelectItem>
                        <SelectItem value="12" className="text-white hover:bg-crypto-gold/10">12 Months</SelectItem>
                        <SelectItem value="18" className="text-white hover:bg-crypto-gold/10">18 Months</SelectItem>
                        <SelectItem value="24" className="text-white hover:bg-crypto-gold/10">24 Months</SelectItem>
                        <SelectItem value="36" className="text-white hover:bg-crypto-gold/10">36 Months</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="1" className="text-white hover:bg-crypto-gold/10">1 Year</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-crypto-gold/10">2 Years</SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-crypto-gold/10">3 Years</SelectItem>
                        <SelectItem value="5" className="text-white hover:bg-crypto-gold/10">5 Years</SelectItem>
                        <SelectItem value="10" className="text-white hover:bg-crypto-gold/10">10 Years</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results */}
            {calculatorData.amount && parseFloat(calculatorData.amount) > 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="crypto-card-gradient border-crypto-gold/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-white/70 text-sm mb-1">Initial Stake</div>
                      <div className="text-white font-bold text-lg">
                        {parseFloat(calculatorData.amount).toLocaleString()} {calculatorData.asset}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card-gradient border-crypto-green/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-white/70 text-sm mb-1">Total Rewards</div>
                      <div className="text-crypto-green font-bold text-lg">
                        +{calculateRewards().earned.toLocaleString(undefined, { maximumFractionDigits: 4 })} {calculatorData.asset}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="crypto-card-gradient border-crypto-accent/20">
                    <CardContent className="p-4 text-center">
                      <div className="text-white/70 text-sm mb-1">Final Amount</div>
                      <div className="text-crypto-accent font-bold text-lg">
                        {calculateRewards().total.toLocaleString(undefined, { maximumFractionDigits: 4 })} {calculatorData.asset}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Yearly Breakdown */}
                <Card className="crypto-card-gradient border-crypto-gold/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">
                      {calculatorData.periodType === 'months' ? 'Monthly' : 'Yearly'} Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {calculateRewards().breakdown.map((year, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-crypto-dark/30">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                              <span className="text-crypto-gold font-bold text-sm">{year.period}</span>
                            </div>
                            <div>
                              <div className="text-white font-medium">{year.periodLabel}</div>
                              <div className="text-white/60 text-sm">+{year.earned.toLocaleString(undefined, { maximumFractionDigits: 4 })} {calculatorData.asset} earned</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">
                              {year.amount.toLocaleString(undefined, { maximumFractionDigits: 4 })} {calculatorData.asset}
                            </div>
                            <div className="text-crypto-green text-sm">
                              +{year.totalEarned.toLocaleString(undefined, { maximumFractionDigits: 4 })} total
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsCalculatorOpen(false)}
                className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
              >
                Close
              </Button>
              <Button
                className="crypto-btn-primary"
                onClick={() => {
                  // Auto-select asset APY when asset changes
                  const assetAPYMap: { [key: string]: string } = {
                    'ETH': '5.2',
                    'ADA': '4.8',
                    'SOL': '7.1',
                    'DOT': '12.5',
                    'ATOM': '18.2',
                    'AVAX': '9.8'
                  };
                  setCalculatorData(prev => ({
                    ...prev,
                    apy: assetAPYMap[prev.asset] || prev.apy
                  }));
                }}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Update APY
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Staking Dialog */}
      <Dialog open={isStakeDialogOpen} onOpenChange={setIsStakeDialogOpen}>
        <DialogContent className="crypto-card-gradient border-crypto-gold/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-crypto-gold" />
              Stake {selectedPool?.symbol}
            </DialogTitle>
          </DialogHeader>

          {selectedPool && (
            <div className="space-y-4">
              <div className="bg-crypto-dark/30 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-crypto-gold/20 rounded-full flex items-center justify-center">
                    <span className="font-bold text-crypto-gold">
                      {selectedPool.symbol[0]}
                    </span>
                  </div>
                  <div>
                    <div className="text-white font-medium">{selectedPool.name}</div>
                    <div className="text-crypto-gold text-sm">{selectedPool.apy} APY</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-white/70">Your Balance:</span>
                    <div className="text-white font-medium">
                      {userPortfolio[selectedPool.symbol as keyof typeof userPortfolio] || 0} {selectedPool.symbol}
                    </div>
                  </div>
                  <div>
                    <span className="text-white/70">Minimum:</span>
                    <div className="text-white font-medium">{selectedPool.minimumStake}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stakeAmount" className="text-white">Amount to Stake</Label>
                <Input
                  id="stakeAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="bg-crypto-dark border-crypto-gold/20 text-white"
                />

                <div className="flex space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10 flex-1"
                    onClick={() => {
                      const balance = userPortfolio[selectedPool.symbol as keyof typeof userPortfolio] || 0;
                      setStakeAmount((balance * 0.25).toString());
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10 flex-1"
                    onClick={() => {
                      const balance = userPortfolio[selectedPool.symbol as keyof typeof userPortfolio] || 0;
                      setStakeAmount((balance * 0.5).toString());
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10 flex-1"
                    onClick={() => {
                      const balance = userPortfolio[selectedPool.symbol as keyof typeof userPortfolio] || 0;
                      setStakeAmount((balance * 0.75).toString());
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10 flex-1"
                    onClick={() => {
                      const balance = userPortfolio[selectedPool.symbol as keyof typeof userPortfolio] || 0;
                      setStakeAmount(balance.toString());
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsStakeDialogOpen(false)}
                  className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10 flex-1"
                  disabled={isStaking}
                >
                  Cancel
                </Button>
                <Button
                  className="crypto-btn-primary flex-1"
                  onClick={executeStake}
                  disabled={isStaking || !stakeAmount || parseFloat(stakeAmount) <= 0}
                >
                  {isStaking ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Staking...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Stake Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
