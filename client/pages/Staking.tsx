import { useState } from "react";
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
} from "lucide-react";

export default function Staking() {
  const [selectedValidator, setSelectedValidator] = useState(null);
  
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
      description: "Secure the Ethereum network and earn rewards through Proof of Stake consensus.",
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
      description: "Delegate your ADA to stake pools and earn rewards without locking your funds.",
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
      description: "High-performance blockchain with fast transactions and competitive staking rewards.",
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
      description: "Multi-chain protocol enabling blockchain interoperability with nominator staking.",
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
      description: "Internet of blockchains with high staking rewards and liquid staking options.",
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
      description: "Fast, low-cost, and eco-friendly blockchain platform for DeFi applications.",
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
    return sum + parseFloat(stake.value.replace('$', '').replace(',', ''));
  }, 0);

  const totalEarned = activeStakes.reduce((sum, stake) => {
    return sum + parseFloat(stake.earned.replace('$', ''));
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
                6h 23m
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
                        <span className={`${
                          pool.risk === 'Low' ? 'text-crypto-green' :
                          pool.risk === 'Medium' ? 'text-crypto-accent' :
                          'text-crypto-red'
                        }`}>
                          {pool.risk}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="crypto-btn-primary flex-1">
                        <Zap className="w-4 h-4 mr-2" />
                        Stake {pool.symbol}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-crypto-gold/20 text-crypto-gold hover:bg-crypto-gold/10"
                        size="sm"
                      >
                        <Star className="w-4 h-4" />
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
                  {[
                    {
                      date: "2024-01-15",
                      asset: "ETH",
                      amount: "0.0234",
                      value: "$81.34",
                      validator: "Lido",
                    },
                    {
                      date: "2024-01-14",
                      asset: "ADA",
                      amount: "12.567",
                      value: "$6.07",
                      validator: "AZTEC Pool",
                    },
                    {
                      date: "2024-01-13",
                      asset: "SOL",
                      amount: "0.456",
                      value: "$71.34",
                      validator: "Chorus One",
                    },
                  ].map((reward, index) => (
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
                  ))}
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
                          <div className="text-white">{validator.commission}</div>
                          <div className="text-white/60 text-xs">Commission</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="text-crypto-green">{validator.uptime}</div>
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
                        
                        <Button
                          size="sm"
                          className="crypto-btn-primary"
                        >
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
    </div>
  );
}
