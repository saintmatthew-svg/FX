import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useCryptoPrices, formatPriceChange, formatCurrency } from "@/hooks/use-market-data";
import {
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
  BarChart3,
  CheckCircle,
  Star,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Wallet,
  DollarSign,
  PiggyBank,
  Coins,
  TrendingDown,
  Lock,
  Globe,
  Smartphone,
  Activity,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Bitcoin,
  Banknote,
} from "lucide-react";

export default function Index() {
  const { data: liveData, loading: pricesLoading } = useCryptoPrices(['BTC', 'ETH', 'ADA', 'SOL', 'DOT']);

  // Fallback data while loading or if API fails
  const fallbackData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$67,234.52",
      change: "+2.47%",
      up: true,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$3,456.78",
      change: "+1.83%",
      up: true,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$0.4823",
      change: "-0.92%",
      up: false,
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$156.34",
      change: "+5.24%",
      up: true,
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "$7.891",
      change: "+3.16%",
      up: true,
    },
  ];

  // Use live data if available, otherwise fallback
  const cryptoPrices = liveData.length > 0 ? liveData.map(crypto => {
    const changeInfo = formatPriceChange(crypto.change24h);
    return {
      name: crypto.name,
      symbol: crypto.symbol,
      price: formatCurrency(crypto.price),
      change: changeInfo.text,
      up: changeInfo.isPositive,
    };
  }) : fallbackData;

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center crypto-hero-gradient overflow-hidden">
        <div className="absolute inset-0 crypto-network-animation"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-white/80 text-lg mb-2">
              Next Generation Crypto Investment Platform
            </p>
            <div className="crypto-divider"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-crypto-gold to-crypto-accent bg-clip-text text-transparent">
              Crypto Future
            </span>
            <br />
            Starts Here
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Trade, invest, and earn with the world's most advanced
            cryptocurrency platform. Access DeFi, staking, NFTs, and
            institutional-grade trading tools all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/signup">
              <Button className="crypto-btn-primary text-lg px-12 py-4">
                <Wallet className="w-5 h-5 mr-2" />
                Create Account
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="crypto-btn-secondary text-lg px-12 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>

          {/* Live Crypto Prices Ticker */}
          <div className="crypto-glassmorphism rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-5 h-5 text-crypto-gold mr-2" />
              <span className="text-white font-semibold">
                Live Crypto Prices {pricesLoading && <span className="text-crypto-accent text-sm ml-2">(Updating...)</span>}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {cryptoPrices.map((crypto) => (
                <div key={crypto.symbol} className="text-center">
                  <div className="text-white font-medium">{crypto.symbol}</div>
                  <div className="text-crypto-gold text-sm">{crypto.price}</div>
                  <div
                    className={`text-xs flex items-center justify-center ${crypto.up ? "crypto-price-up" : "crypto-price-down"}`}
                  >
                    {crypto.up ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {crypto.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-crypto-dark to-transparent"></div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark to-crypto-dark-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            All-in-One Crypto Platform
          </h2>
          <div className="crypto-divider mb-8"></div>

          <div className="max-w-4xl mx-auto text-white/80 leading-relaxed space-y-4 mb-16">
            <p>
              Our comprehensive cryptocurrency investment platform combines
              cutting-edge technology with institutional-grade security to
              provide you with everything you need to succeed in crypto.
            </p>
            <p>
              From spot trading and futures to DeFi yield farming and NFT
              marketplace access, we've built the ultimate crypto ecosystem for
              both beginners and professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow">
                <Coins className="w-8 h-8 text-crypto-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Spot & Futures Trading
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Trade 500+ cryptocurrencies with advanced charting tools, limit
                orders, and professional-grade features.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow-accent">
                <PiggyBank className="w-8 h-8 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                DeFi Staking & Yield
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Earn up to 20% APY through our curated DeFi protocols and
                automated yield farming strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow">
                <Wallet className="w-8 h-8 text-crypto-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Multi-Chain Wallet
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Securely store and manage assets across Ethereum, Binance Smart
                Chain, Polygon, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow-accent">
                <Shield className="w-8 h-8 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Bank-Grade Security
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Military-grade encryption, multi-signature wallets, and
                insurance coverage for your digital assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section
        className="bg-crypto-dark-100"
        style={{ paddingTop: "80px", marginBottom: "-250px" }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Investment Plans
            </h2>
            <div className="crypto-divider"></div>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8"
            style={{ marginBottom: "128px" }}
          >
            <Card
              className="crypto-card-gradient border-crypto-purple/20"
              style={{ marginBottom: "167px", paddingBottom: "20px" }}
            >
              <CardContent
                className="p-8 text-center"
                style={{ marginBottom: "50px" }}
              >
                <div className="w-16 h-16 bg-crypto-purple/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-crypto-purple" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Starter Plan
                </h3>
                <p className="text-sm text-crypto-purple/80 mb-4">
                  $100 - $1,000
                </p>
                <div className="text-3xl font-bold text-crypto-gold mb-4">
                  8% APY
                </div>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Perfect for beginners looking to enter the crypto market. Get
                  exposure to top cryptocurrencies with automated portfolio
                  rebalancing and educational resources.
                </p>
                <Button className="crypto-btn-primary w-full">
                  Start Investing
                </Button>
              </CardContent>
            </Card>

            <Card
              className="crypto-card-gradient border-crypto-purple/20"
              style={{ marginBottom: "167px", paddingBottom: "20px" }}
            >
              <CardContent
                className="p-8 text-center"
                style={{ marginBottom: "50px" }}
              >
                <div className="w-16 h-16 bg-crypto-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-crypto-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Growth Plan
                </h3>
                <p className="text-sm text-crypto-cyan/80 mb-4">
                  $1,000 - $10,000
                </p>
                <div className="text-3xl font-bold text-crypto-accent mb-4">
                  12% APY
                </div>
                <p className="text-white/80 mb-8 leading-relaxed">
                  Advanced strategies including DeFi protocols, yield farming,
                  and access to exclusive investment opportunities with higher
                  potential returns.
                </p>
                <Button className="crypto-btn-accent w-full">
                  Start Investing
                </Button>
              </CardContent>
            </Card>

            <Card
              className="crypto-card-gradient border-crypto-cyan/20"
              style={{ marginBottom: "167px", paddingBottom: "20px" }}
            >
              <CardContent
                className="p-8 text-center"
                style={{ marginBottom: "50px" }}
              >
                <div className="w-16 h-16 bg-crypto-purple/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-crypto-purple" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Elite Plan
                </h3>
                <p className="text-sm text-crypto-purple/80 mb-4">$10,000+</p>
                <div className="text-3xl font-bold text-crypto-gold mb-4">
                  18% APY
                </div>
                <p className="text-white/80 mb-8 leading-relaxed">
                  VIP treatment with dedicated account manager, access to
                  private sales, institutional-grade strategies, and priority
                  customer support.
                </p>
                <Button className="crypto-btn-primary w-full">
                  Start Investing
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark-100 to-crypto-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose CryptoFuture
            </h2>
            <p className="text-xl text-white/80 mb-4">
              The most advanced crypto platform
            </p>
            <p className="text-white/60">
              built for the next generation of investors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Lightning Fast
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Execute trades in milliseconds with our high-performance
                matching engine and global server infrastructure.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-crypto-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Ultra Secure
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Your funds are protected by multi-signature wallets, cold
                storage, and comprehensive insurance coverage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Global Access
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Trade 24/7 from anywhere in the world with support for 50+ fiat
                currencies and multiple languages.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-crypto-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Mobile First
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Full-featured mobile apps for iOS and Android with biometric
                security and offline portfolio tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-crypto-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              CryptoFuture Benefits
            </h2>
            <div className="crypto-divider mb-8"></div>
            <p className="text-white/80 max-w-4xl mx-auto leading-relaxed">
              Join millions of users who trust CryptoFuture for their
              cryptocurrency investments. Our platform combines
              institutional-grade security with user-friendly features to make
              crypto investing accessible to everyone, from beginners to
              professional traders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-8 h-8 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Multiple Payment Methods
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Buy crypto with credit cards, bank transfers, PayPal, and 20+
                other payment methods instantly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-crypto-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                24/7 Expert Support
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get help from our crypto experts anytime, anywhere. Live chat,
                phone support, and dedicated account managers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-purple/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Banknote className="w-8 h-8 text-crypto-purple" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Earn While You Learn
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Complete educational courses and earn free cryptocurrency. Learn
                about DeFi, NFTs, and trading strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bitcoin className="w-8 h-8 text-crypto-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Premium Features
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Access advanced analytics, API trading, portfolio insights, and
                exclusive market research reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark-200 to-crypto-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">
              Success Stories
            </h2>
            <p className="text-white/80 max-w-6xl mx-auto leading-relaxed">
              Join thousands of successful crypto investors who have achieved
              their financial goals with CryptoFuture. Our proven strategies and
              cutting-edge platform have helped users generate substantial
              returns across bull and bear markets. Start your journey today and
              become the next success story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="crypto-card-gradient border-crypto-purple/20 h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-crypto-purple/20 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="w-6 h-6 text-crypto-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Portfolio Growth
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-crypto-purple">
                      +347%
                    </div>
                    <p className="text-white/70 text-sm mt-2">
                      Average yearly returns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-cyan/20 h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-crypto-cyan/20 rounded-lg flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-crypto-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Satisfied Users
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-crypto-cyan">
                      2.5M+
                    </div>
                    <p className="text-white/70 text-sm mt-2">
                      Active investors
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-purple/20 h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-crypto-purple/20 rounded-lg flex items-center justify-center mb-6">
                    <DollarSign className="w-6 h-6 text-crypto-purple" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Assets Under Management
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-crypto-purple">
                      $15B+
                    </div>
                    <p className="text-white/70 text-sm mt-2">
                      Total value managed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark-300 to-crypto-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <div className="crypto-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="crypto-card-gradient border-crypto-purple/20">
              <CardContent className="p-8">
                <div className="text-crypto-purple text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  CryptoFuture changed my life. I started with $500 and now have
                  a diversified portfolio worth over $50K. The platform is
                  incredibly user-friendly and the returns are amazing.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-crypto-purple/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-crypto-purple" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Sarah M.</h4>
                    <p className="text-crypto-purple text-sm">
                      Software Engineer
                    </p>
                    <div className="flex text-crypto-purple">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-cyan/20">
              <CardContent className="p-8">
                <div className="text-crypto-cyan text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  The DeFi staking features are incredible. I'm earning 15% APY
                  on my stablecoins while learning about new protocols. The
                  educational content is top-notch.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-crypto-cyan/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-crypto-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Michael R.</h4>
                    <p className="text-crypto-cyan text-sm">
                      Financial Advisor
                    </p>
                    <div className="flex text-crypto-cyan">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-purple/20">
              <CardContent className="p-8">
                <div className="text-crypto-purple text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  As a beginner, I was intimidated by crypto. CryptoFuture made
                  it simple with guided tutorials and automated investing. I've
                  already seen 200% growth in just 8 months.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-crypto-purple/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-crypto-purple" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Lisa K.</h4>
                    <p className="text-crypto-purple text-sm">
                      Marketing Manager
                    </p>
                    <div className="flex text-crypto-purple">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-crypto-dark py-16 border-t border-crypto-purple/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-crypto-purple to-crypto-cyan p-8 rounded-2xl mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Crypto Journey?
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Join millions of users worldwide who trust CryptoFuture for
                their cryptocurrency investments. Get started today with as
                little as $10 and access professional-grade trading tools,
                educational resources, and 24/7 expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-crypto-dark hover:bg-white/90 font-semibold px-8 py-3">
                  <Wallet className="w-4 h-4 mr-2" />
                  Create Free Account
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-crypto-dark font-semibold px-8 py-3">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Explore Platform
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-crypto-purple rounded transform rotate-45"></div>
                <span className="text-xl font-bold text-white">
                  CRYPTO
                  <br />
                  <span className="text-sm">FUTURE</span>
                </span>
              </div>
              <p className="text-white/70 text-sm">
                The next generation cryptocurrency investment platform.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Trading</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link
                    to="/trading"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    Spot Trading
                  </Link>
                </li>
                <li>
                  <Link
                    to="/trading"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    Futures
                  </Link>
                </li>
                <li>
                  <Link
                    to="/staking"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    Staking
                  </Link>
                </li>
                <li>
                  <Link
                    to="/defi"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    DeFi
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Learn</h4>
              <ul className="space-y-2 text-white/70">
                <li>
                  <Link
                    to="/education"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    Crypto Academy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    Market News
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tools"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    Trading Tools
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-crypto-purple transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-crypto-purple hover:text-crypto-purple/80"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-crypto-purple hover:text-crypto-purple/80"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-crypto-purple hover:text-crypto-purple/80"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-crypto-purple hover:text-crypto-purple/80"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-crypto-purple hover:text-crypto-purple/80"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-crypto-purple/20 pt-8 text-center">
            <p className="text-white/60 text-sm leading-relaxed">
              CryptoFuture is a leading cryptocurrency investment platform
              providing secure, user-friendly access to digital assets and DeFi
              protocols. Trade responsibly and never invest more than you can
              afford to lose.
            </p>
            <p className="text-white/60 text-xs mt-4">
              © 2024 CryptoFuture. All rights reserved. | Licensed and
              regulated financial services provider.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
