import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ArrowRight, TrendingUp, Shield, Users, Zap } from 'lucide-react';

export default function Accounts() {
  return (
    <div className="min-h-screen bg-forex-dark">
      <nav className="bg-forex-dark/95 backdrop-blur-md border-b border-forex-cyan/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-forex-cyan rounded transform rotate-45"></div>
              <span className="text-xl font-bold text-white">
                MEGA FX<br />
                <span className="text-sm">MARKET</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/accounts" className="text-forex-cyan font-semibold">Accounts</Link>
              <Link to="/about" className="text-white hover:text-forex-cyan transition-colors">About</Link>
              <Link to="/trading" className="text-white hover:text-forex-cyan transition-colors">Trading</Link>
              <Link to="/platforms" className="text-white hover:text-forex-cyan transition-colors">Platforms</Link>
              <Link to="/tools" className="text-white hover:text-forex-cyan transition-colors">Tools</Link>
              <Link to="/education" className="text-white hover:text-forex-cyan transition-colors">News & Education</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white hover:text-forex-cyan transition-colors">Sign In</Link>
              <Link to="/signup">
                <Button className="forex-btn-primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Trading Accounts</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Choose from our range of trading accounts designed for different experience levels and capital requirements
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            <Card className="forex-card-gradient border-forex-cyan/20 relative">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-2xl text-white">Challenge Account</CardTitle>
                <p className="text-forex-cyan/80">For aspiring traders</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$10K - $200K</p>
                  <p className="text-white/60">Account Size</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>2-step evaluation process</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>80% profit split</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>10% profit target</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>5% daily drawdown limit</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>Trade major forex pairs</span>
                  </div>
                </div>

                <Button className="forex-btn-primary w-full">
                  Start Challenge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20 relative ring-2 ring-forex-cyan/30">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-forex-cyan text-forex-dark px-4 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </span>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-2xl text-white">Instant Funding</CardTitle>
                <p className="text-forex-cyan/80">No evaluation required</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$5K - $50K</p>
                  <p className="text-white/60">Instant Access</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>Immediate trading access</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>90% profit split</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>Bi-weekly payouts</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>4% daily drawdown limit</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>All trading instruments</span>
                  </div>
                </div>

                <Button className="forex-btn-primary w-full">
                  Get Instant Access
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20 relative">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-2xl text-white">Professional</CardTitle>
                <p className="text-forex-cyan/80">For experienced traders</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">$100K+</p>
                  <p className="text-white/60">Scaling Available</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>1-step evaluation</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>95% profit split</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>Weekly payouts</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>3% daily drawdown limit</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span>Account scaling up to $2M</span>
                  </div>
                </div>

                <Button className="forex-btn-primary w-full">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Our Accounts?</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Fast Payouts</h3>
              <p className="text-white/70 text-sm">Get your profits within 24-48 hours with our streamlined payout system.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Secure Trading</h3>
              <p className="text-white/70 text-sm">Trade with confidence on our secure, regulated trading platform.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">24/7 Support</h3>
              <p className="text-white/70 text-sm">Our dedicated support team is available around the clock to assist you.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Account Scaling</h3>
              <p className="text-white/70 text-sm">Grow your account size based on consistent profitable performance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-forex-dark-200 to-forex-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Trading?</h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of successful traders who have chosen Mega FX Market for their trading journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="forex-btn-primary text-lg px-8 py-3">
                Create Account
              </Button>
            </Link>
            <Link to="/trading">
              <Button className="forex-btn-secondary text-lg px-8 py-3">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
