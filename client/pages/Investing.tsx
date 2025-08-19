import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import {
  TrendingUp,
  BarChart3,
  Award,
  Wallet,
  DollarSign,
  PiggyBank,
  Coins,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Investing() {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center crypto-hero-gradient overflow-hidden">
        <div className="absolute inset-0 crypto-network-animation"></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <p className="text-white/80 text-lg mb-2">
              Start Your Investment Journey
            </p>
            <div className="crypto-divider"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-crypto-gold to-crypto-accent bg-clip-text text-transparent">
              Invest Smart,
            </span>
            <br />
            Earn More
          </h1>

          <p className="text-xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Choose from our carefully curated investment plans designed to maximize your returns
            while minimizing risk. Start with as little as $1,000 and watch your portfolio grow.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-crypto-dark to-transparent"></div>
      </section>

      {/* Investment Plans */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark to-crypto-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Investment Plan
            </h2>
            <div className="crypto-divider"></div>
            <p className="text-white/80 max-w-3xl mx-auto mt-8 leading-relaxed">
              Our investment plans are designed to suit different experience levels and risk appetites.
              All plans include professional portfolio management, real-time monitoring, and 24/7 support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="crypto-card-gradient border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-crypto-gold/20 rounded-lg flex items-center justify-center mx-auto mb-6 crypto-glow">
                  <TrendingUp className="w-8 h-8 text-crypto-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Starter Plan
                </h3>
                <p className="text-sm text-crypto-gold/80 mb-4">
                  $1,000 - $10,000
                </p>
                <div className="text-4xl font-bold text-crypto-gold mb-6">
                  8% APY
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    Diversified crypto portfolio
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    Automated rebalancing
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    Educational resources
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    24/7 customer support
                  </div>
                </div>
                <Link to="/signup">
                  <Button className="crypto-btn-primary w-full">
                    Start Investing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-accent/20 hover:border-crypto-accent/40 transition-all duration-300 transform hover:scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-crypto-accent text-black px-6 py-2 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-crypto-accent/20 rounded-lg flex items-center justify-center mx-auto mb-6 crypto-glow-accent">
                  <BarChart3 className="w-8 h-8 text-crypto-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Growth Plan
                </h3>
                <p className="text-sm text-crypto-accent/80 mb-4">
                  $10,000 - $100,000
                </p>
                <div className="text-4xl font-bold text-crypto-accent mb-6">
                  12% APY
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-accent mr-2" />
                    Everything in Starter
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-accent mr-2" />
                    DeFi yield farming
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-accent mr-2" />
                    Advanced trading strategies
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-accent mr-2" />
                    Priority support
                  </div>
                </div>
                <Link to="/signup">
                  <Button className="crypto-btn-accent w-full">
                    Start Investing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-gold/20 hover:border-crypto-gold/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-crypto-gold/20 rounded-lg flex items-center justify-center mx-auto mb-6 crypto-glow">
                  <Award className="w-8 h-8 text-crypto-gold" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Elite Plan
                </h3>
                <p className="text-sm text-crypto-gold/80 mb-4">$100,000+</p>
                <div className="text-4xl font-bold text-crypto-gold mb-6">
                  18% APY
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    Everything in Growth
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    Dedicated account manager
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    Exclusive investment opportunities
                  </div>
                  <div className="flex items-center text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-crypto-gold mr-2" />
                    White-glove service
                  </div>
                </div>
                <Link to="/signup">
                  <Button className="crypto-btn-primary w-full">
                    Start Investing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark-100 to-crypto-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Our Investment Platform
            </h2>
            <div className="crypto-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow">
                <Shield className="w-8 h-8 text-crypto-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Secure & Insured
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Your investments are protected by bank-grade security and comprehensive insurance coverage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow-accent">
                <Zap className="w-8 h-8 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Instant Access
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Start investing immediately with instant account setup and immediate fund deployment.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow">
                <PiggyBank className="w-8 h-8 text-crypto-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Compound Growth
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Maximize returns through automatic reinvestment and compound interest strategies.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-crypto-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 crypto-glow-accent">
                <Coins className="w-8 h-8 text-crypto-accent" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Diversified Portfolio
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Reduce risk through strategic diversification across multiple cryptocurrencies and DeFi protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark-200 to-crypto-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Proven Track Record
            </h2>
            <div className="crypto-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-crypto-gold mb-4">
                  347%
                </div>
                <p className="text-white/80 text-lg">Average Annual Return</p>
                <p className="text-white/60 text-sm mt-2">
                  Over the past 3 years
                </p>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-accent/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-crypto-accent mb-4">
                  $15B+
                </div>
                <p className="text-white/80 text-lg">Assets Under Management</p>
                <p className="text-white/60 text-sm mt-2">
                  Trusted by 2.5M+ investors
                </p>
              </CardContent>
            </Card>

            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-crypto-gold mb-4">
                  99.9%
                </div>
                <p className="text-white/80 text-lg">Uptime Guarantee</p>
                <p className="text-white/60 text-sm mt-2">
                  24/7 monitoring and support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-crypto-dark-300 to-crypto-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Investing?
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Join thousands of successful investors who have already started building their crypto wealth.
            Open your account today and take the first step towards financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="crypto-btn-primary text-lg px-12 py-4">
                <Wallet className="w-5 h-5 mr-2" />
                Start Investing Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="crypto-btn-secondary text-lg px-12 py-4">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
