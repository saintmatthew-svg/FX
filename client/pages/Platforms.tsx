import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Monitor, Smartphone, Download, Zap, BarChart3, Settings } from 'lucide-react';

export default function Platforms() {
  return (
    <div className="min-h-screen bg-forex-dark">
      <Navigation currentPage="platforms" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark to-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Trading Platforms</h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Professional trading platforms designed for speed, reliability, and advanced functionality across all devices.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Options */}
      <section className="py-20 bg-forex-dark-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* MetaTrader 5 */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-2xl text-white">MetaTrader 5</CardTitle>
                <p className="text-forex-cyan/80">Industry Standard</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-white/80 text-center">
                  The world's most popular trading platform with advanced charting and automated trading capabilities.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Advanced charting tools</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Expert Advisors (EAs)</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Custom indicators</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>One-click trading</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="forex-btn-primary flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button className="forex-btn-secondary flex-1">
                    Web Platform
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* cTrader */}
            <Card className="forex-card-gradient border-forex-cyan/20 ring-2 ring-forex-cyan/30">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-forex-cyan text-forex-dark px-4 py-1 rounded-full text-sm font-semibold">
                  RECOMMENDED
                </span>
              </div>
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-2xl text-white">cTrader</CardTitle>
                <p className="text-forex-cyan/80">Ultra-Fast Execution</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-white/80 text-center">
                  Next-generation platform with lightning-fast execution and intuitive interface.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Level II pricing</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>cBots automation</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Advanced order types</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Copy trading</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="forex-btn-primary flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button className="forex-btn-secondary flex-1">
                    Web Platform
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Apps */}
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-forex-cyan/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-forex-cyan" />
                </div>
                <CardTitle className="text-2xl text-white">Mobile Trading</CardTitle>
                <p className="text-forex-cyan/80">Trade Anywhere</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-white/80 text-center">
                  Full-featured mobile apps for iOS and Android with complete trading functionality.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Full trading capabilities</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Push notifications</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Biometric security</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <div className="w-2 h-2 bg-forex-cyan rounded-full mr-3"></div>
                    <span>Sync with desktop</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="forex-btn-primary flex-1">
                    iOS App
                  </Button>
                  <Button className="forex-btn-secondary flex-1">
                    Android
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-forex-dark-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
            <div className="section-divider"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-forex-dark-100 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-forex-dark-300">
                  <th className="text-left p-4 text-white font-semibold">Feature</th>
                  <th className="text-center p-4 text-white font-semibold">MetaTrader 5</th>
                  <th className="text-center p-4 text-white font-semibold">cTrader</th>
                  <th className="text-center p-4 text-white font-semibold">Mobile</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-forex-cyan/20">
                  <td className="p-4 text-white/80">Advanced Charting</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                </tr>
                <tr className="border-t border-forex-cyan/20">
                  <td className="p-4 text-white/80">Automated Trading</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-white/40">-</td>
                </tr>
                <tr className="border-t border-forex-cyan/20">
                  <td className="p-4 text-white/80">One-Click Trading</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                </tr>
                <tr className="border-t border-forex-cyan/20">
                  <td className="p-4 text-white/80">Level II Pricing</td>
                  <td className="p-4 text-center text-white/40">-</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-white/40">-</td>
                </tr>
                <tr className="border-t border-forex-cyan/20">
                  <td className="p-4 text-white/80">Copy Trading</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                </tr>
                <tr className="border-t border-forex-cyan/20">
                  <td className="p-4 text-white/80">Multi-Monitor Support</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-forex-cyan">✓</td>
                  <td className="p-4 text-center text-white/40">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Platform Requirements */}
      <section className="py-20 bg-forex-dark-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">System Requirements</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center">
                <Monitor className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">Windows</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/70">
                <p>• Windows 10 or later</p>
                <p>• 4GB RAM minimum</p>
                <p>• 1GB disk space</p>
                <p>• Internet connection</p>
                <p>• DirectX 9.0c compatible</p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center">
                <Monitor className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">macOS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/70">
                <p>• macOS 10.15 or later</p>
                <p>• 4GB RAM minimum</p>
                <p>• 1GB disk space</p>
                <p>• Internet connection</p>
                <p>• Intel or Apple Silicon</p>
              </CardContent>
            </Card>

            <Card className="forex-card-gradient border-forex-cyan/20">
              <CardHeader className="text-center">
                <Smartphone className="w-12 h-12 text-forex-cyan mx-auto mb-4" />
                <CardTitle className="text-xl text-white">Mobile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-white/70">
                <p>• iOS 13.0+ / Android 8.0+</p>
                <p>• 2GB RAM minimum</p>
                <p>• 500MB storage</p>
                <p>• Stable internet connection</p>
                <p>• Push notification support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-forex-dark-300 to-forex-dark">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get Started Today</h2>
          <p className="text-xl text-white/80 mb-8">
            Download our trading platforms and start your journey to trading success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/accounts">
              <Button className="forex-btn-primary text-lg px-8 py-3">
                Create Account
              </Button>
            </Link>
            <Button className="forex-btn-secondary text-lg px-8 py-3">
              Try Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
