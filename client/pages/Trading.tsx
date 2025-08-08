import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { TrendingUp, BarChart3, DollarSign, Clock, Shield, Target } from 'lucide-react';

export default function Trading() {
  return (
    <div className="min-h-screen bg-forex-dark">
      <Navigation currentPage="trading" />

      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Trading with Mega FX</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Access global markets with industry-leading technology, competitive spreads, and professional-grade tools designed for serious traders.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trading Instruments</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <DollarSign className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">Forex Pairs</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-forex-cyan mb-2">70+</p>
                <p className="text-white/70 mb-4">Currency Pairs</p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>Major pairs (EUR/USD, GBP/USD)</li>
                  <li>Minor pairs (EUR/GBP, AUD/CAD)</li>
                  <li>Exotic pairs (USD/ZAR, EUR/TRY)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <BarChart3 className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">Indices</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-forex-cyan mb-2">25+</p>
                <p className="text-white/70 mb-4">Global Indices</p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>S&P 500, NASDAQ, DOW</li>
                  <li>FTSE 100, DAX, CAC 40</li>
                  <li>Nikkei 225, ASX 200</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <TrendingUp className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">Commodities</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-forex-cyan mb-2">15+</p>
                <p className="text-white/70 mb-4">Commodities</p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>Gold, Silver, Platinum</li>
                  <li>Crude Oil, Natural Gas</li>
                  <li>Agricultural products</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <Target className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">Crypto</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-forex-cyan mb-2">10+</p>
                <p className="text-white/70 mb-4">Cryptocurrencies</p>
                <ul className="text-sm text-white/60 space-y-1">
                  <li>Bitcoin, Ethereum</li>
                  <li>Litecoin, Ripple</li>
                  <li>Major altcoins</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Trading Conditions</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Ultra-Fast Execution</h3>
                <p className="text-white/70 mb-4">Order execution in under 50ms with 99.9% fill rate</p>
                <div className="bg-forex-dark-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-forex-cyan">&lt; 50ms</p>
                  <p className="text-white/60 text-sm">Average execution speed</p>
                </div>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <DollarSign className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">Tight Spreads</h3>
                <p className="text-white/70 mb-4">Competitive spreads starting from 0.0 pips</p>
                <div className="bg-forex-dark-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-forex-cyan">0.0</p>
                  <p className="text-white/60 text-sm">Pips on EUR/USD</p>
                </div>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">High Leverage</h3>
                <p className="text-white/70 mb-4">Leverage up to 1:100 for maximum capital efficiency</p>
                <div className="bg-forex-dark-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-forex-cyan">1:100</p>
                  <p className="text-white/60 text-sm">Maximum leverage</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Risk Management</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Professional risk management is at the core of successful trading. Our platform provides advanced risk management tools to help you protect your capital and maximize profits.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Stop Loss and Take Profit orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Trailing stops for profit optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Position sizing calculators</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Real-time P&L monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Margin call protection</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-forex-cyan/20 to-forex-teal/20 rounded-2xl p-8 border border-forex-cyan/30">
              <h3 className="text-2xl font-bold text-white mb-6">Daily Drawdown Limits</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Challenge Account</span>
                  <span className="text-forex-cyan font-semibold">5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Instant Funding</span>
                  <span className="text-forex-cyan font-semibold">4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Professional</span>
                  <span className="text-forex-cyan font-semibold">3%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Global Trading Hours</h2>
            <div className="section-divider"></div>
            <p className="text-white/80 mt-4">Trade 24/5 across global markets with extended hours on select instruments</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-forex-dark-200 rounded-lg p-6 border border-forex-cyan/20">
              <h3 className="text-lg font-semibold text-white mb-2">Sydney</h3>
              <p className="text-forex-cyan">22:00 - 07:00 GMT</p>
              <p className="text-white/60 text-sm mt-1">Sunday - Thursday</p>
            </div>
            <div className="bg-forex-dark-200 rounded-lg p-6 border border-forex-cyan/20">
              <h3 className="text-lg font-semibold text-white mb-2">Tokyo</h3>
              <p className="text-forex-cyan">00:00 - 09:00 GMT</p>
              <p className="text-white/60 text-sm mt-1">Sunday - Thursday</p>
            </div>
            <div className="bg-forex-dark-200 rounded-lg p-6 border border-forex-cyan/20">
              <h3 className="text-lg font-semibold text-white mb-2">London</h3>
              <p className="text-forex-cyan">08:00 - 17:00 GMT</p>
              <p className="text-white/60 text-sm mt-1">Monday - Friday</p>
            </div>
            <div className="bg-forex-dark-200 rounded-lg p-6 border border-forex-cyan/20">
              <h3 className="text-lg font-semibold text-white mb-2">New York</h3>
              <p className="text-forex-cyan">13:00 - 22:00 GMT</p>
              <p className="text-white/60 text-sm mt-1">Monday - Friday</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-forex-dark-100 to-forex-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Trading Today</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of traders who trust Mega FX Market for their trading success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accounts">
              <Button className="forex-btn-primary text-lg px-8 py-3">
                Choose Account
              </Button>
            </Link>
            <Link to="/platforms">
              <Button className="forex-btn-secondary text-lg px-8 py-3">
                View Platforms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
