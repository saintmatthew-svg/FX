import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Search,
  Filter,
  Star,
  BookOpen,
  Users,
  MessageSquare,
  Share2,
  ExternalLink,
  Bell,
  Globe,
  Calendar,
  Tag,
  BarChart3,
  DollarSign,
  Bitcoin,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle,
  Info,
  Target,
  Award,
} from "lucide-react";

export default function News() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock news data - in real app, this would come from APIs
  const [newsData, setNewsData] = useState([
    {
      id: 1,
      title: "Bitcoin Surges Past $70,000 Amid Institutional Adoption",
      summary: "Major corporations continue to add Bitcoin to their treasury reserves, driving price to new all-time highs.",
      category: "crypto",
      source: "CryptoNews",
      publishedAt: "2024-01-15T10:30:00Z",
      readTime: "3 min",
      image: "/placeholder.svg",
      trending: true,
      tags: ["Bitcoin", "Institutional", "ATH"],
      likes: 234,
      comments: 45,
    },
    {
      id: 2,
      title: "Federal Reserve Signals Potential Rate Cuts This Year",
      summary: "Fed Chair Jerome Powell hints at possible interest rate reductions to combat economic slowdown.",
      category: "forex",
      source: "Financial Times",
      publishedAt: "2024-01-15T09:15:00Z",
      readTime: "5 min",
      image: "/placeholder.svg",
      trending: false,
      tags: ["Fed", "Interest Rates", "USD"],
      likes: 156,
      comments: 32,
    },
    {
      id: 3,
      title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
      summary: "Polygon, Arbitrum, and Optimism process millions of transactions as scaling solutions gain traction.",
      category: "crypto",
      source: "DeFi Pulse",
      publishedAt: "2024-01-15T08:45:00Z",
      readTime: "4 min",
      image: "/placeholder.svg",
      trending: true,
      tags: ["Ethereum", "Layer 2", "Scaling"],
      likes: 189,
      comments: 28,
    },
    {
      id: 4,
      title: "EUR/USD Reaches Parity as ECB Maintains Dovish Stance",
      summary: "European Central Bank keeps rates unchanged while hinting at potential stimulus measures.",
      category: "forex",
      source: "Reuters",
      publishedAt: "2024-01-15T07:20:00Z",
      readTime: "2 min",
      image: "/placeholder.svg",
      trending: false,
      tags: ["EUR", "USD", "ECB", "Parity"],
      likes: 98,
      comments: 15,
    },
    {
      id: 5,
      title: "DeFi Protocol Launches Revolutionary Yield Farming Strategy",
      summary: "New automated market maker promises up to 25% APY through innovative liquidity provision mechanisms.",
      category: "defi",
      source: "DeFi Weekly",
      publishedAt: "2024-01-15T06:00:00Z",
      readTime: "6 min",
      image: "/placeholder.svg",
      trending: true,
      tags: ["DeFi", "Yield Farming", "AMM"],
      likes: 312,
      comments: 67,
    },
    {
      id: 6,
      title: "Gold Prices Soar as Inflation Concerns Mount",
      summary: "Precious metals rally as investors seek safe haven assets amid economic uncertainty.",
      category: "commodities",
      source: "MarketWatch",
      publishedAt: "2024-01-15T05:30:00Z",
      readTime: "3 min",
      image: "/placeholder.svg",
      trending: false,
      tags: ["Gold", "Inflation", "Safe Haven"],
      likes: 76,
      comments: 12,
    },
  ]);

  const marketSentiment = {
    crypto: { sentiment: "bullish", percentage: 78 },
    forex: { sentiment: "neutral", percentage: 52 },
    commodities: { sentiment: "bearish", percentage: 34 },
  };

  const trendingTopics = [
    { tag: "Bitcoin ETF", count: 1250 },
    { tag: "Fed Policy", count: 980 },
    { tag: "Ethereum Upgrade", count: 756 },
    { tag: "DeFi Innovation", count: 623 },
    { tag: "Regulation", count: 589 },
  ];

  const filteredNews = newsData.filter(article => {
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new articles or updates
      const randomUpdate = Math.random();
      if (randomUpdate > 0.95) {
        // Add new trending article occasionally
        console.log("New article would be added here");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation currentPage="news" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Market News</h1>
            <p className="text-white/70">
              Stay updated with the latest crypto, forex, and market news.
            </p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
            >
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button className="crypto-btn-primary">
              <Star className="w-4 h-4 mr-2" />
              My Feed
            </Button>
          </div>
        </div>

        {/* Market Sentiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="crypto-card-gradient border-crypto-gold/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Bitcoin className="w-5 h-5 text-crypto-gold" />
                <span className="text-white/80">Crypto Sentiment</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-crypto-green mb-1">
                    Bullish
                  </div>
                  <div className="text-sm text-white/60">
                    {marketSentiment.crypto.percentage}% positive
                  </div>
                </div>
                <TrendingUp className="w-8 h-8 text-crypto-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-accent/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="w-5 h-5 text-crypto-accent" />
                <span className="text-white/80">Forex Sentiment</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-crypto-accent mb-1">
                    Neutral
                  </div>
                  <div className="text-sm text-white/60">
                    {marketSentiment.forex.percentage}% mixed signals
                  </div>
                </div>
                <BarChart3 className="w-8 h-8 text-crypto-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="crypto-card-gradient border-crypto-red/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-5 h-5 text-crypto-red" />
                <span className="text-white/80">Commodities</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-crypto-red mb-1">
                    Bearish
                  </div>
                  <div className="text-sm text-white/60">
                    {marketSentiment.commodities.percentage}% negative
                  </div>
                </div>
                <TrendingDown className="w-8 h-8 text-crypto-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main News Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Search news..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-crypto-dark-100 border-crypto-gold/20 text-white placeholder:text-white/40"
                />
              </div>
              <Button
                variant="outline"
                className="border-crypto-gold/20 text-white hover:bg-crypto-gold/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Category Tabs */}
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
              <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  All News
                </TabsTrigger>
                <TabsTrigger
                  value="crypto"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Crypto
                </TabsTrigger>
                <TabsTrigger
                  value="forex"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Forex
                </TabsTrigger>
                <TabsTrigger
                  value="defi"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  DeFi
                </TabsTrigger>
                <TabsTrigger
                  value="commodities"
                  className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
                >
                  Commodities
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* News Articles */}
            <div className="space-y-6">
              {filteredNews.map((article) => (
                <Card
                  key={article.id}
                  className="crypto-card-gradient border-crypto-gold/20 hover:border-crypto-gold/40 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-crypto-dark-200 rounded-lg overflow-hidden shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-crypto-gold/20 to-crypto-accent/20 flex items-center justify-center">
                          <Globe className="w-8 h-8 text-crypto-gold" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {article.trending && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-crypto-red/20 text-crypto-red">
                                <Zap className="w-3 h-3 mr-1" />
                                Trending
                              </span>
                            )}
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                              article.category === 'crypto' ? 'bg-crypto-gold/20 text-crypto-gold' :
                              article.category === 'forex' ? 'bg-crypto-accent/20 text-crypto-accent' :
                              article.category === 'defi' ? 'bg-crypto-green/20 text-crypto-green' :
                              'bg-crypto-purple/20 text-crypto-purple'
                            }`}>
                              {article.category.toUpperCase()}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-crypto-gold transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                        
                        <p className="text-white/70 text-sm mb-3 leading-relaxed">
                          {article.summary}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {article.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-crypto-dark-200 text-white/60"
                            >
                              <Tag className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-white/60">
                            <span className="flex items-center">
                              <Globe className="w-4 h-4 mr-1" />
                              {article.source}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatTimeAgo(article.publishedAt)}
                            </span>
                            <span className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {article.readTime}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-white/60 hover:text-crypto-gold transition-colors">
                              <Users className="w-4 h-4" />
                              <span className="text-sm">{article.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-white/60 hover:text-crypto-gold transition-colors">
                              <MessageSquare className="w-4 h-4" />
                              <span className="text-sm">{article.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-white/60 hover:text-crypto-gold transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="flex items-center space-x-1 text-white/60 hover:text-crypto-gold transition-colors">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-crypto-gold" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded hover:bg-crypto-dark/50 cursor-pointer transition-colors"
                    >
                      <span className="text-white">{topic.tag}</span>
                      <span className="text-crypto-gold text-sm">
                        {topic.count}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Alerts */}
            <Card className="crypto-card-gradient border-crypto-accent/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-crypto-accent" />
                  Market Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 rounded bg-crypto-gold/10">
                    <CheckCircle className="w-5 h-5 text-crypto-green mt-0.5" />
                    <div>
                      <div className="text-white font-medium text-sm">
                        BTC breaks $70,000
                      </div>
                      <div className="text-white/60 text-xs">
                        Price target reached
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded bg-crypto-accent/10">
                    <Info className="w-5 h-5 text-crypto-accent mt-0.5" />
                    <div>
                      <div className="text-white font-medium text-sm">
                        Fed meeting scheduled
                      </div>
                      <div className="text-white/60 text-xs">
                        Tomorrow at 2:00 PM EST
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 rounded bg-crypto-red/10">
                    <AlertCircle className="w-5 h-5 text-crypto-red mt-0.5" />
                    <div>
                      <div className="text-white font-medium text-sm">
                        High volatility expected
                      </div>
                      <div className="text-white/60 text-xs">
                        EU inflation data release
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* News Sources */}
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-crypto-gold" />
                  Top Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "CoinDesk",
                    "CryptoNews",
                    "Reuters",
                    "Financial Times",
                    "DeFi Pulse",
                    "MarketWatch",
                  ].map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded hover:bg-crypto-dark/50 cursor-pointer transition-colors"
                    >
                      <span className="text-white text-sm">{source}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-crypto-gold hover:bg-crypto-gold/10"
                      >
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
