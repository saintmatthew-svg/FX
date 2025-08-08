import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Award, TrendingUp, Globe, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-forex-dark">
      {/* Navigation */}
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
              <Link to="/accounts" className="text-white hover:text-forex-cyan transition-colors">Accounts</Link>
              <Link to="/about" className="text-forex-cyan font-semibold">About</Link>
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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Mega FX Market</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We are a leading proprietary trading firm committed to empowering talented traders worldwide with capital and cutting-edge technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Founded in 2018, Mega FX Market emerged from a simple vision: to democratize access to professional trading capital and create opportunities for skilled traders regardless of their financial background.
                </p>
                <p>
                  Our founders, seasoned traders and technology experts, recognized the barriers that prevented talented individuals from accessing the capital needed to maximize their trading potential. This insight led to the creation of our innovative evaluation process and funding model.
                </p>
                <p>
                  Today, we've funded thousands of traders worldwide, distributing over $50 million in profits and establishing ourselves as a trusted partner in the proprietary trading industry.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-forex-cyan/20 to-forex-teal/20 rounded-2xl p-8 border border-forex-cyan/30">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-forex-cyan/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-forex-cyan" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">10,000+</h3>
                      <p className="text-white/70">Funded Traders</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-forex-cyan/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-forex-cyan" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">$50M+</h3>
                      <p className="text-white/70">Profits Distributed</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-forex-cyan/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-forex-cyan" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">120+</h3>
                      <p className="text-white/70">Countries Served</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Transparency</h3>
                <p className="text-white/70">
                  We believe in complete transparency in all our processes, from evaluation criteria to payout procedures.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Community</h3>
                <p className="text-white/70">
                  Building a supportive community where traders can learn, grow, and succeed together.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Excellence</h3>
                <p className="text-white/70">
                  Striving for excellence in everything we do, from technology to customer service.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Innovation</h3>
                <p className="text-white/70">
                  Continuously innovating to provide better tools and opportunities for our traders.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Global Reach</h3>
                <p className="text-white/70">
                  Connecting talented traders from around the world with opportunities to succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Reliability</h3>
                <p className="text-white/70">
                  Providing reliable platforms, fast payouts, and consistent support you can depend on.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-forex-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Leadership Team</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Michael Chen</h3>
                <p className="text-forex-cyan mb-4">CEO & Co-Founder</p>
                <p className="text-white/70 text-sm">
                  Former Goldman Sachs trader with 15+ years in institutional trading and risk management.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sarah Williams</h3>
                <p className="text-forex-cyan mb-4">CTO & Co-Founder</p>
                <p className="text-white/70 text-sm">
                  Technology expert specializing in financial systems and algorithmic trading platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8 text-center">
                <div className="w-24 h-24 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-forex-cyan" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">David Rodriguez</h3>
                <p className="text-forex-cyan mb-4">Head of Risk Management</p>
                <p className="text-white/70 text-sm">
                  Risk management specialist with extensive experience in derivatives and forex markets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark-300 to-forex-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Success Story</h2>
          <p className="text-xl text-white/80 mb-8">
            Be part of a company that's revolutionizing the prop trading industry and empowering traders worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accounts">
              <Button className="forex-btn-primary text-lg px-8 py-3">
                Start Trading
              </Button>
            </Link>
            <Button className="forex-btn-secondary text-lg px-8 py-3">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
