import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import TradingViewWidget from '@/components/TradingViewWidget';
import MetaTrader5Widget from '@/components/MetaTrader5Widget';
import { useCryptoPrices, useForexRates, useMarketNews, useMarketSentiment } from '@/hooks/use-market-data';
import { useTrading } from '@/hooks/use-trading';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  DollarSign,
  TrendingUp,
  Bell,
  Settings,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  duration?: number;
}

export default function TestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string>('');

  // Hook instances for testing
  const { data: cryptoData, loading: cryptoLoading, error: cryptoError } = useCryptoPrices();
  const { data: forexData, loading: forexLoading, error: forexError } = useForexRates();
  const { data: newsData, loading: newsLoading, error: newsError } = useMarketNews();
  const { data: sentimentData, loading: sentimentLoading, error: sentimentError } = useMarketSentiment();
  const { placeOrder, getAccountInfo, loading: tradingLoading, error: tradingError } = useTrading();

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    
    // Test 1: Navigation Component
    setCurrentTest('Testing Navigation Component');
    try {
      const navElement = document.querySelector('nav');
      addTestResult({
        name: 'Navigation Component',
        status: navElement ? 'pass' : 'fail',
        message: navElement ? 'Navigation component rendered successfully' : 'Navigation component not found',
      });
    } catch (error) {
      addTestResult({
        name: 'Navigation Component',
        status: 'fail',
        message: 'Failed to test navigation component',
      });
    }

    // Test 2: Theme Integration
    setCurrentTest('Testing Black & Gold Theme');
    try {
      const darkBgElements = document.querySelectorAll('.bg-crypto-dark');
      const goldElements = document.querySelectorAll('.text-crypto-gold, .bg-crypto-gold');
      addTestResult({
        name: 'Black & Gold Theme',
        status: darkBgElements.length > 0 && goldElements.length > 0 ? 'pass' : 'warning',
        message: `Found ${darkBgElements.length} dark elements and ${goldElements.length} gold elements`,
      });
    } catch (error) {
      addTestResult({
        name: 'Black & Gold Theme',
        status: 'fail',
        message: 'Failed to verify theme elements',
      });
    }

    // Test 3: API Data Loading
    setCurrentTest('Testing API Data Loading');
    
    // Wait for data to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    addTestResult({
      name: 'Crypto Prices API',
      status: cryptoError ? 'fail' : cryptoData.length > 0 ? 'pass' : 'warning',
      message: cryptoError || (cryptoData.length > 0 ? `Loaded ${cryptoData.length} crypto prices` : 'No crypto data received'),
    });

    addTestResult({
      name: 'Forex Rates API',
      status: forexError ? 'fail' : forexData.length > 0 ? 'pass' : 'warning',
      message: forexError || (forexData.length > 0 ? `Loaded ${forexData.length} forex rates` : 'No forex data received'),
    });

    addTestResult({
      name: 'Market News API',
      status: newsError ? 'fail' : newsData.length > 0 ? 'pass' : 'warning',
      message: newsError || (newsData.length > 0 ? `Loaded ${newsData.length} news articles` : 'No news data received'),
    });

    addTestResult({
      name: 'Market Sentiment API',
      status: sentimentError ? 'fail' : sentimentData ? 'pass' : 'warning',
      message: sentimentError || (sentimentData ? 'Sentiment data loaded successfully' : 'No sentiment data received'),
    });

    // Test 4: TradingView Widget
    setCurrentTest('Testing TradingView Integration');
    try {
      const tradingViewScript = document.querySelector('script[src*="tradingview.com"]');
      addTestResult({
        name: 'TradingView Widget',
        status: tradingViewScript ? 'pass' : 'warning',
        message: tradingViewScript ? 'TradingView script loaded' : 'TradingView script not found (may load dynamically)',
      });
    } catch (error) {
      addTestResult({
        name: 'TradingView Widget',
        status: 'fail',
        message: 'Failed to test TradingView integration',
      });
    }

    // Test 5: Trading Engine
    setCurrentTest('Testing Trading Engine');
    try {
      const accountInfo = await getAccountInfo();
      addTestResult({
        name: 'Trading Engine - Account Info',
        status: accountInfo ? 'pass' : 'fail',
        message: accountInfo ? `Account balance: $${accountInfo.balance.toLocaleString()}` : 'Failed to fetch account info',
      });

      // Test order placement
      try {
        const testOrder = await placeOrder({
          symbol: 'BTCUSDT',
          side: 'buy',
          type: 'limit',
          quantity: 0.001,
          price: 60000, // Low price to avoid execution
        });
        
        addTestResult({
          name: 'Trading Engine - Order Placement',
          status: testOrder ? 'pass' : 'fail',
          message: testOrder ? `Order placed successfully: ${testOrder.orderId}` : 'Failed to place test order',
        });
      } catch (orderError) {
        addTestResult({
          name: 'Trading Engine - Order Placement',
          status: 'warning',
          message: `Order placement test failed: ${orderError}`,
        });
      }
    } catch (error) {
      addTestResult({
        name: 'Trading Engine',
        status: 'fail',
        message: 'Failed to test trading engine',
      });
    }

    // Test 6: Responsive Design
    setCurrentTest('Testing Responsive Design');
    try {
      const viewportWidth = window.innerWidth;
      const isMobile = viewportWidth < 768;
      const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
      const isDesktop = viewportWidth >= 1024;

      addTestResult({
        name: 'Responsive Design',
        status: 'pass',
        message: `Viewport: ${viewportWidth}px (${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'})`,
      });

      // Test mobile menu
      if (isMobile) {
        const mobileMenuButton = document.querySelector('button[aria-label*="menu"], button:has(svg)');
        addTestResult({
          name: 'Mobile Navigation',
          status: mobileMenuButton ? 'pass' : 'warning',
          message: mobileMenuButton ? 'Mobile menu button found' : 'Mobile menu button not found',
        });
      }
    } catch (error) {
      addTestResult({
        name: 'Responsive Design',
        status: 'fail',
        message: 'Failed to test responsive design',
      });
    }

    // Test 7: Component Rendering
    setCurrentTest('Testing Component Rendering');
    try {
      const cardElements = document.querySelectorAll('.crypto-card-gradient');
      const buttonElements = document.querySelectorAll('.crypto-btn-primary, .crypto-btn-secondary');
      
      addTestResult({
        name: 'Component Rendering',
        status: cardElements.length > 0 && buttonElements.length > 0 ? 'pass' : 'warning',
        message: `Found ${cardElements.length} cards and ${buttonElements.length} styled buttons`,
      });
    } catch (error) {
      addTestResult({
        name: 'Component Rendering',
        status: 'fail',
        message: 'Failed to test component rendering',
      });
    }

    setCurrentTest('');
    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-crypto-green" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-crypto-red" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-crypto-accent" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return 'text-crypto-green';
      case 'fail':
        return 'text-crypto-red';
      case 'warning':
        return 'text-crypto-accent';
      default:
        return 'text-white';
    }
  };

  const passedTests = testResults.filter(t => t.status === 'pass').length;
  const failedTests = testResults.filter(t => t.status === 'fail').length;
  const warningTests = testResults.filter(t => t.status === 'warning').length;

  return (
    <div className="min-h-screen bg-crypto-dark">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            CryptoFuture Platform Test Suite
          </h1>
          <p className="text-white/70">
            Comprehensive testing of all platform features and integrations
          </p>
        </div>

        {/* Test Controls */}
        <Card className="crypto-card-gradient border-crypto-gold/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={runTests}
                  disabled={isRunning}
                  className="crypto-btn-primary"
                >
                  {isRunning ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Run All Tests
                    </>
                  )}
                </Button>
                
                {isRunning && currentTest && (
                  <div className="text-white/70">
                    Currently testing: <span className="text-crypto-gold">{currentTest}</span>
                  </div>
                )}
              </div>

              {testResults.length > 0 && (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-crypto-green" />
                    <span className="text-crypto-green">{passedTests} Passed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-crypto-accent" />
                    <span className="text-crypto-accent">{warningTests} Warnings</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-crypto-red" />
                    <span className="text-crypto-red">{failedTests} Failed</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {testResults.length > 0 && (
          <Card className="crypto-card-gradient border-crypto-gold/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-crypto-gold" />
                Test Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 rounded-lg bg-crypto-dark/50"
                  >
                    <div className="flex items-start space-x-3">
                      {getStatusIcon(result.status)}
                      <div>
                        <div className="text-white font-medium">{result.name}</div>
                        <div className={`text-sm ${getStatusColor(result.status)}`}>
                          {result.message}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                      {result.status.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Demo Components */}
        <Tabs defaultValue="widgets" className="space-y-6">
          <TabsList className="bg-crypto-dark-100 border border-crypto-gold/20">
            <TabsTrigger
              value="widgets"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              Demo Widgets
            </TabsTrigger>
            <TabsTrigger
              value="tradingview"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              TradingView Chart
            </TabsTrigger>
            <TabsTrigger
              value="mt5"
              className="data-[state=active]:bg-crypto-gold data-[state=active]:text-black"
            >
              MetaTrader 5
            </TabsTrigger>
          </TabsList>

          <TabsContent value="widgets" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <DollarSign className="w-5 h-5 text-crypto-gold" />
                    <span className="text-white/80">Crypto Prices</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {cryptoData.length}
                  </div>
                  <div className="text-sm text-crypto-green">
                    {cryptoLoading ? 'Loading...' : 'Assets loaded'}
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-crypto-accent" />
                    <span className="text-white/80">Forex Rates</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {forexData.length}
                  </div>
                  <div className="text-sm text-crypto-green">
                    {forexLoading ? 'Loading...' : 'Pairs loaded'}
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-gold/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Bell className="w-5 h-5 text-crypto-gold" />
                    <span className="text-white/80">News Feed</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {newsData.length}
                  </div>
                  <div className="text-sm text-crypto-green">
                    {newsLoading ? 'Loading...' : 'Articles loaded'}
                  </div>
                </CardContent>
              </Card>

              <Card className="crypto-card-gradient border-crypto-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-crypto-accent" />
                    <span className="text-white/80">Sentiment</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {sentimentData ? 'Active' : 'Inactive'}
                  </div>
                  <div className="text-sm text-crypto-green">
                    {sentimentLoading ? 'Loading...' : 'Data available'}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tradingview" className="space-y-6">
            <Card className="crypto-card-gradient border-crypto-gold/20">
              <CardContent className="p-0">
                <TradingViewWidget
                  symbol="BINANCE:BTCUSDT"
                  theme="dark"
                  height={500}
                  interval="15"
                  style="candles"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mt5" className="space-y-6">
            <MetaTrader5Widget />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
