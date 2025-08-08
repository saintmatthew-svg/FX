import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Calculator, TrendingUp, BarChart3, Calendar, Bell, Shield } from 'lucide-react';

export default function Tools() {
  return (
    <div className="min-h-screen bg-forex-dark">
      <Navigation currentPage="tools" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Trading Tools</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Professional tools and resources designed to enhance your trading performance and decision-making process.
            </p>
          </div>
        </div>
      </section>

      {/* Trading Tools Grid */}
      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Position Size Calculator */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Position Size Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Calculate optimal position sizes based on your risk tolerance and account balance.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Risk percentage calculator</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Stop loss optimization</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Multi-currency support</span>
                  </div>
                </div>
                <Button className="forex-btn-primary w-full">Use Calculator</Button>
              </CardContent>
            </Card>

            {/* Pip Calculator */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Pip Calculator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Calculate pip values for different currency pairs and position sizes.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Real-time pip values</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Profit/loss calculation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Cross-currency pairs</span>
                  </div>
                </div>
                <Button className="forex-btn-primary w-full">Calculate Pips</Button>
              </CardContent>
            </Card>

            {/* Market Analysis */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Market Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Advanced technical and fundamental analysis tools for informed trading decisions.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Technical indicators</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Market sentiment</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Price alerts</span>
                  </div>
                </div>
                <Button className="forex-btn-primary w-full">View Analysis</Button>
              </CardContent>
            </Card>

            {/* Economic Calendar */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Economic Calendar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Stay informed about market-moving events and economic releases.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Real-time updates</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Impact ratings</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Custom notifications</span>
                  </div>
                </div>
                <Button className="forex-btn-primary w-full">View Calendar</Button>
              </CardContent>
            </Card>

            {/* Trading Signals */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Trading Signals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Professional trading signals from experienced analysts and algorithms.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Expert analysis</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Real-time alerts</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Performance tracking</span>
                  </div>
                </div>
                <Button className="forex-btn-primary w-full">Get Signals</Button>
              </CardContent>
            </Card>

            {/* Risk Management */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Risk Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Advanced risk management tools to protect your capital and optimize returns.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Portfolio analysis</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Drawdown protection</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Risk/reward ratios</span>
                  </div>
                </div>
                <Button className="forex-btn-primary w-full">Manage Risk</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Tool */}
      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Trading Journal</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Keep track of your trading performance with our comprehensive trading journal. 
                  Analyze your trades, identify patterns, and continuously improve your strategy.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Detailed trade logging</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Performance analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Custom tags and notes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full"></div>
                    <span>Strategy backtesting</span>
                  </div>
                </div>
                <Button className="forex-btn-primary">Start Journaling</Button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-forex-cyan/20 to-forex-teal/20 rounded-2xl p-8 border border-forex-cyan/30">
              <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Win Rate</span>
                  <span className="text-forex-cyan font-semibold">78.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Profit Factor</span>
                  <span className="text-forex-cyan font-semibold">2.34</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Max Drawdown</span>
                  <span className="text-forex-cyan font-semibold">4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Average Trade</span>
                  <span className="text-forex-cyan font-semibold">+$245</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark-200 to-forex-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Elevate Your Trading</h2>
          <p className="text-xl text-white/80 mb-8">
            Access professional-grade tools and take your trading to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accounts">
              <Button className="forex-btn-primary text-lg px-8 py-3">
                Get Started
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
