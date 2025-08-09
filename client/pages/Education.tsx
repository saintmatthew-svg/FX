import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { BookOpen, Video, TrendingUp, Users, Calendar, Award } from 'lucide-react';

export default function Education() {
  return (
    <div className="min-h-screen bg-forex-dark">
      <Navigation currentPage="news-education" />

      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Education Center</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive learning resources, market news, and expert insights to help you become a successful trader.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Learning Paths</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Beginner Course</CardTitle>
                <p className="text-forex-cyan/80">Start from basics</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Learn the fundamentals of forex trading from market basics to your first trade.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>What is Forex trading?</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Currency pairs explained</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Basic trading terminology</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Platform navigation</span>
                  </div>
                </div>
                <div className="bg-forex-dark-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-white/60">Duration: 2-3 weeks</p>
                  <p className="text-sm text-white/60">8 modules • 24 lessons</p>
                </div>
                <Button className="forex-btn-primary w-full">Start Learning</Button>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20 ring-2 ring-forex-cyan/30">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-forex-cyan text-forex-dark px-4 py-1 rounded-full text-sm font-semibold">
                  POPULAR
                </span>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Intermediate Course</CardTitle>
                <p className="text-forex-cyan/80">Build your skills</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Advanced trading strategies, technical analysis, and risk management techniques.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Technical analysis mastery</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Trading strategies</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Risk management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Psychology of trading</span>
                  </div>
                </div>
                <div className="bg-forex-dark-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-white/60">Duration: 4-6 weeks</p>
                  <p className="text-sm text-white/60">12 modules • 48 lessons</p>
                </div>
                <Button className="forex-btn-primary w-full">Start Learning</Button>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-xl text-white">Advanced Course</CardTitle>
                <p className="text-forex-cyan/80">Master level trading</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/70 text-center">
                  Professional trading techniques, algorithmic strategies, and portfolio management.
                </p>
                <div className="space-y-3 text-sm text-white/60">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Algorithmic trading</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Portfolio management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Market making strategies</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Institutional techniques</span>
                  </div>
                </div>
                <div className="bg-forex-dark-200 rounded-lg p-3 text-center">
                  <p className="text-sm text-white/60">Duration: 6-8 weeks</p>
                  <p className="text-sm text-white/60">15 modules • 60 lessons</p>
                </div>
                <Button className="forex-btn-primary w-full">Start Learning</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Latest Market News</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="bg-forex-cyan/20 text-forex-cyan px-3 py-1 rounded-full text-xs font-semibold">
                    MARKET UPDATE
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Federal Reserve Signals Rate Cut Possibilities
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Latest FOMC meeting minutes reveal dovish sentiment as inflation pressures continue to ease...
                </p>
                <div className="flex justify-between items-center text-xs text-white/50">
                  <span>2 hours ago</span>
                  <span>By Market Analyst</span>
                </div>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="bg-forex-cyan/20 text-forex-cyan px-3 py-1 rounded-full text-xs font-semibold">
                    CURRENCY FOCUS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  EUR/USD Breaks Key Resistance Level
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  The euro rallies against the dollar following positive eurozone economic data and ECB commentary...
                </p>
                <div className="flex justify-between items-center text-xs text-white/50">
                  <span>4 hours ago</span>
                  <span>By FX Strategist</span>
                </div>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="bg-forex-cyan/20 text-forex-cyan px-3 py-1 rounded-full text-xs font-semibold">
                    GLOBAL MARKETS
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Asian Markets Rally on Trade Optimism
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Regional indices surge as diplomatic progress signals improved trade relations between major economies...
                </p>
                <div className="flex justify-between items-center text-xs text-white/50">
                  <span>6 hours ago</span>
                  <span>By Global Correspondent</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="forex-btn-secondary">View All News</Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Video Tutorials</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-forex-cyan/20 to-forex-teal/20 h-48 rounded-t-lg flex items-center justify-center">
                  <Video className="w-16 h-16 text-forex-cyan" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Understanding Candlestick Patterns
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Learn to read and interpret candlestick patterns for better trading decisions.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>15 min</span>
                    <span>Beginner</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-forex-cyan/20 to-forex-teal/20 h-48 rounded-t-lg flex items-center justify-center">
                  <Video className="w-16 h-16 text-forex-cyan" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Risk Management Strategies
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Essential risk management techniques to protect your trading capital.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>22 min</span>
                    <span>Intermediate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-forex-cyan/20 to-forex-teal/20 h-48 rounded-t-lg flex items-center justify-center">
                  <Video className="w-16 h-16 text-forex-cyan" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Advanced Trading Psychology
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Master the mental aspects of trading for consistent performance.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>28 min</span>
                    <span>Advanced</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="forex-btn-secondary">Browse All Videos</Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Live Webinars & Events</h2>
              <div className="space-y-6 text-white/80 leading-relaxed">
                <p>
                  Join our expert traders and analysts for live webinars, Q&A sessions, and exclusive market insights.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-forex-cyan" />
                    <span>Weekly market analysis sessions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-forex-cyan" />
                    <span>Interactive Q&A with experts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-forex-cyan" />
                    <span>Recorded sessions available</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-forex-cyan" />
                    <span>Certificate upon completion</span>
                  </div>
                </div>
                <Button className="forex-btn-primary">View Upcoming Events</Button>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="forex-card-gradient border-forex-cyan/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Weekly Market Outlook</h3>
                      <p className="text-forex-cyan text-sm">Live Webinar</p>
                    </div>
                    <span className="bg-forex-cyan/20 text-forex-cyan px-3 py-1 rounded-full text-xs">
                      UPCOMING
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    Join our senior analyst for insights into the coming week's market movements.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>Tomorrow, 3:00 PM EST</span>
                    <span>60 minutes</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="forex-card-gradient border-forex-cyan/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">Advanced EA Development</h3>
                      <p className="text-forex-cyan text-sm">Workshop</p>
                    </div>
                    <span className="bg-forex-cyan/20 text-forex-cyan px-3 py-1 rounded-full text-xs">
                      NEXT WEEK
                    </span>
                  </div>
                  <p className="text-white/70 text-sm mb-4">
                    Learn to build and optimize Expert Advisors for MetaTrader platforms.
                  </p>
                  <div className="flex justify-between items-center text-xs text-white/60">
                    <span>Next Friday, 2:00 PM EST</span>
                    <span>90 minutes</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-forex-dark-100 to-forex-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Your Learning Journey</h2>
          <p className="text-xl text-white/80 mb-8">
            Access comprehensive educational resources and take your trading skills to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="forex-btn-primary text-lg px-8 py-3">
              Begin Learning
            </Button>
            <Link to="/accounts">
              <Button className="forex-btn-secondary text-lg px-8 py-3">
                Open Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
