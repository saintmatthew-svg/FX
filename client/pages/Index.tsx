import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
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
  Linkedin
} from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-forex-dark">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center forex-hero-gradient overflow-hidden">
        {/* Network Animation Background */}
        <div className="absolute inset-0 forex-network-animation"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          {/* Tagline */}
          <div className="mb-8">
            <p className="text-white/80 text-lg mb-2">Our Capital, Your Expertise</p>
            <div className="section-divider"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Market<br />
            Awaits You
          </h1>

          {/* Subtext */}
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Trade up to $100,000 on CTC Account. Receive up to 90% of profits. Join GNC: the 
            founder of the modern prop trading industry.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button className="forex-btn-primary text-lg px-12 py-4">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button className="forex-btn-secondary text-lg px-12 py-4">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-forex-dark to-transparent"></div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Trade for Modern Prop Trading Firm</h2>
          <div className="section-divider mb-8"></div>
          
          <div className="max-w-4xl mx-auto text-white/80 leading-relaxed space-y-4">
            <p>
              Our Forex Capital developed a unique 2-step Evaluation Process for traders. This 
              Evaluation Process consists of an Beginner Trials and a Verification and is specifically 
              designed to identify people with great trading abilities.
            </p>
            <p>
              Upon successful completion of the Evaluation Process, you are offered to trade on an 
              Account with a balance of up to 100,000 USD. Your journey to get there might be 
              challenging, but our Performance Coaches are here to help you on the endeavour to 
              financial independence.
            </p>
          </div>
        </div>
      </section>

      {/* Evaluation Process Section */}
      <section className="bg-forex-dark-100" style={{paddingTop: "80px", marginBottom: "-1px"}}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Evaluation Process</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8" style={{marginBottom: "128px"}}>
            {/* Beginner Trials */}
            <Card className="forex-card-gradient border-forex-cyan/20" style={{ margin: "4px 0 101px", paddingBottom: "140px"}}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Beginner Trials</h3>
                <p className="text-sm text-forex-cyan/80 mb-4">(Come knowledge)</p>
                <p className="text-white/80 mb-8 leading-relaxed">
                  This stage is the first step of the Evaluation Process. You need to succeed here to advance into 
                  the Verification stage. Prove your trading skills and discipline in observing the Trading Objectives.
                </p>
                <Button className="forex-btn-primary w-full">Start Now</Button>
              </CardContent>
            </Card>

            {/* Evaluation */}
            <Card className="forex-card-gradient border-forex-cyan/20" style={{marginBottom: "93px", paddingBottom: "140px"}}>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Evaluation</h3>
                <p className="text-sm text-forex-cyan/80 mb-4">(Experience)</p>
                <p className="text-white/80 mb-8 leading-relaxed">
                  A Verification is the second and final step towards becoming a trader. Once you pass a Verification 
                  stage and your results are verified, you will be offered to trade on an Account.
                </p>
                <Button className="forex-btn-primary w-full">Start Now</Button>
              </CardContent>
            </Card>

            {/* Live Trader */}
            <Card className="forex-card-gradient border-forex-cyan/20" style={{ marginBottom: "167px", paddingBottom: "140px"}}>
              <CardContent className="p-8 text-center" style={{marginBottom: "82px"}}>
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Live Trader</h3>
                <p className="text-sm text-forex-cyan/80 mb-4">(Trade full time for a living)</p>
                <p className="text-white/80 mb-8 leading-relaxed">
                  YOU are becoming a Live Trader with a fully Loaded Account. Trade responsibly and consistently and 
                  receive up to 90% of your profits. If you consistently generate profits on your Account, we can scale your 
                  account according to our Scaling Plan.
                </p>
                <Button className="forex-btn-primary w-full">Start Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark-100 to-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Something New.</h2>
            <p className="text-xl text-white/80 mb-4">Key Platform features that set us apart</p>
            <p className="text-white/60">in the forex marketplace</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Fast Payments */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Fast Payments</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Experience lightning fast payment processing in less than 24 hours. No delays, no waiting. Have your earnings in record time giving payouts. It is one of all times.
              </p>
            </div>

            {/* Layered Security */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Layered Security</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Your data, your trades and your funds are all protected with state-of-the-art cyber security. We deploy our marketplace.
              </p>
            </div>

            {/* Revolutionary Technology */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Revolutionary Technology</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our team built our platform. As one of the most innovative and advanced trading platforms ever designed.
              </p>
            </div>

            {/* Transparent Reporting */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Transparent Reporting</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Track results, with up to date trade tickets. Your member position in everything knows! Currently and precisely to not confuse.
              </p>
            </div>
          </div>

          {/* Platform Image */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-forex-dark-200/50 to-forex-dark-300/50 rounded-2xl border border-forex-cyan/20">
              <div className="w-96 h-64 bg-forex-dark-300 rounded-lg border border-forex-cyan/30 flex items-center justify-center">
                <BarChart3 className="w-24 h-24 text-forex-cyan/50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Mega Fx Market Benefits</h2>
            <div className="section-divider mb-8"></div>
            <p className="text-white/80 max-w-4xl mx-auto leading-relaxed">
              At Mega Fx Market, we care about your Success. By joining us you'll get the opportunity to 
              trade with the world's leading prop trading firm that makes a real difference to the 
              industry. We constantly strive on increasing in cutting-edge technologies in order to create 
              the best possible trading environment for our traders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Select Your Platform */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Select Your Platform!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our 24/7 multilingual team is available for all your FOREX funded account needs, day or night we are there for you. When you need us we are always there to assist.
              </p>
            </div>

            {/* Always By Your Side */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">We are always by your side!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Our 24/7 multilingual team is available for all your FOREX funded account needs, day or night we are there for you. When you need us we are always there to assist.
              </p>
            </div>

            {/* Community */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">We are a community!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Talk actively with us, our traders only will, and see free on discord. We provide talks and information in real time to actively promote good behavior in trading. Join our discord and see what all the fuss is about.
              </p>
            </div>

            {/* Automated FOREX */}
            <div className="text-center">
              <div className="w-16 h-16 bg-forex-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-forex-cyan" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Automated FOREX Funded Accounts!</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Get your funded trader accounts immediately after program purchase. No waiting, get your FOREX funded account instantly upon purchase of your chosen program. You no longer need to wait!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Mega Fx Market Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark-200 to-forex-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-8">Why Mega Fx Market</h2>
            <p className="text-white/80 max-w-6xl mx-auto leading-relaxed">
              With just 1 phase to get funded, OURFOREXCAPITALS evaluation program is best for enthusiastic forex traders in need of capital to prove their position in the one phase process and join 
              the league of professionals with our LIVE ACCOUNT. Our evaluation program is a one step process where a Funded Trader can prove their FOREX, CFD or commodities trading skills. 
              Evaluation Traders have the ability to trade from $10 to $200k with profit split payouts occurring once a month on the first month and then bi-weekly from that point on. A Trader can 
              have up to 1M in capital from evaluation accounts but only 500k per trading account.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Phases Profits */}
            <Card className="forex-card-gradient border-forex-cyan/20 h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-forex-cyan/20 rounded-lg flex items-center justify-center mb-6">
                    <TrendingUp className="w-6 h-6 text-forex-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">Phases profits</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                      <span className="text-sm">Phase 1</span>
                    </div>
                    <div className="flex items-center text-white/80">
                      <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                      <span className="text-sm">Phase 2</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* First Profit Split Refund */}
            <Card className="forex-card-gradient border-forex-cyan/20 h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-forex-cyan/20 rounded-lg flex items-center justify-center mb-6">
                    <Award className="w-6 h-6 text-forex-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">First profit split refund</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-forex-cyan">19%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* VIP Trader */}
            <Card className="forex-card-gradient border-forex-cyan/20 h-80">
              <CardContent className="p-8 h-full flex flex-col">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-forex-cyan/20 rounded-lg flex items-center justify-center mb-6">
                    <Star className="w-6 h-6 text-forex-cyan" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">VIP Trader</h3>
                  <div className="space-y-3">
                    <div className="text-xs text-white/60 bg-forex-dark-100 px-3 py-2 rounded">VIP</div>
                    <div className="bg-white text-forex-dark px-4 py-2 rounded-full text-sm font-medium">
                      Withdraw anytime
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-forex-dark-300 p-6 rounded-lg border border-forex-cyan/20">
              <h4 className="text-white font-semibold mb-2">● Earn from Phase 1!</h4>
              <p className="text-white/70 text-sm">
                Get 2% of your trading profits by passing phase 1 and 4% of your trading profits by passing phase 2. 
                Get paid on your journey to a forex funded account.
              </p>
            </div>

            <div className="bg-forex-dark-300 p-6 rounded-lg border border-forex-cyan/20">
              <h4 className="text-white font-semibold mb-2">● More than a refund!</h4>
              <p className="text-white/70 text-sm">
                We pay 8% refund when you pass your first profit split. Why settle for just a refund when you can get paid for reaching a new milestone!
              </p>
            </div>

            <div className="bg-forex-dark-300 p-6 rounded-lg border border-forex-cyan/20">
              <h4 className="text-white font-semibold mb-2">● VIP Reward Program</h4>
              <p className="text-white/70 text-sm">
                With a 30% profit split, withdraws at any time with no restrictions, semi-automated payout confirmations, access to a new VIP account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Level Section */}
      <section className="py-20 bg-forex-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What is your experience level?</h2>
            <div className="section-divider mb-8"></div>
            <p className="text-white/80 max-w-4xl mx-auto leading-relaxed">
              Your success is our business. We provide forex traders with multiple product options to choose from based on your experience. 
              If you lose, we lose, so choose carefully the program that fits your FOREX and Prop firm trading experience. We will do the rest when it comes to support and trading conditions to ensure your success when trading FOREX with a Prop Firm.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Rapid */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Rapid</h3>
                <p className="text-sm text-forex-cyan/80 mb-6 text-center">(Some knowledge)</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Get to see how prop firms work</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Get paid as you gain experience</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Low entry cost</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Progress into a professional trader</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="forex-btn-primary flex-1">Start Now</Button>
                  <Button className="forex-btn-secondary flex-1">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Evaluation */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Evaluation</h3>
                <p className="text-sm text-forex-cyan/80 mb-6 text-center">(Experience)</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Prove your experience with our Evaluation Account!</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Quick 2 phase evaluation process</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Generous drawdown limits</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Profit split up to 85%</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="forex-btn-primary flex-1">Start Now</Button>
                  <Button className="forex-btn-secondary flex-1">Learn More</Button>
                </div>
              </CardContent>
            </Card>

            {/* Accelerated */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-forex-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Accelerated</h3>
                <p className="text-sm text-forex-cyan/80 mb-6 text-center">(Traders full time for a living)</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Get started immediately with our Accelerated Funding</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Industry leading profit split</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Speedy upscaling</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-forex-cyan mr-3" />
                    <span className="text-sm">Multiple sizes to choose from</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="forex-btn-primary flex-1">Start Now</Button>
                  <Button className="forex-btn-secondary flex-1">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark-300 to-forex-dark">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Hear what people are saying about us!</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8">
                <div className="text-forex-cyan text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Mega Fx Market has had the best traders and accounts managers we have ever come across as trading veterans, this is the gotta platform.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-forex-cyan/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-forex-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Roberto *****</h4>
                    <p className="text-forex-cyan text-sm">Investor</p>
                    <div className="flex text-forex-cyan">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8">
                <div className="text-forex-cyan text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  I've always loved to invest but with a verified trading system. This platform gave me an opportunity to invest with less stress.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-forex-cyan/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-forex-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Tyler ******</h4>
                    <p className="text-forex-cyan text-sm">Investor</p>
                    <div className="flex text-forex-cyan">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardContent className="p-8">
                <div className="text-forex-cyan text-4xl mb-4">"</div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Mega Fx Market has developed a personal plan for me that allows me to take much greater control of my financial affairs, and plan for the future.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-forex-cyan/20 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-forex-cyan" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">Martha ******</h4>
                    <p className="text-forex-cyan text-sm">Investor</p>
                    <div className="flex text-forex-cyan">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forex-dark py-16 border-t border-forex-cyan/20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-forex-teal to-forex-cyan p-8 rounded-lg mb-12">
            <p className="text-white leading-relaxed">
              With great power comes great responsibility. Having the interest of traders growth at heart inspired us to take things into 
              our own hands and create OURFOREXCAPITALS. We know that we have the best insights in the prop space as we have 
              received multiple prop firm payouts as our goal is to make sure that we create the best conditions for traders to ensure that 
              they have the best tools to succeed so we are committed to changing the lives of others through OURFOREXCAPITALS.
            </p>
            <div className="mt-6">
              <Button className="bg-white text-forex-dark hover:bg-white/90">
                Talk to us Today
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Brand */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-forex-cyan rounded transform rotate-45"></div>
                <span className="text-xl font-bold text-white">
                  MEGA FX<br />
                  <span className="text-sm">MARKET</span>
                </span>
              </div>
            </div>

            {/* Menu Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-forex-cyan transition-colors">Trading</a></li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Accounts</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-forex-cyan transition-colors">About</a></li>
                <li><a href="#" className="hover:text-forex-cyan transition-colors">Tools</a></li>
                <li><a href="#" className="hover:text-forex-cyan transition-colors">Contact us</a></li>
              </ul>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Platforms</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-forex-cyan hover:text-forex-cyan/80">
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-forex-cyan/20 pt-8 text-center">
            <p className="text-white/60 text-sm leading-relaxed">
              At OUR FOREX CAPITALS, we understand how fear of the internet tools and the biggest 3 years in local trading journey as every media mentions should think reviews in our market to reach their goal. We are pioneers trading in to have traders to get their trading skills test during our 1 
              account to make us about them or social media all and up giving you the first and cheapest options for the site and the industry. OurForexCapitals is open to traders worldwide.
            </p>
            <p className="text-white/60 text-xs mt-4">
              2023 © All Time High Profit Forex Sc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
