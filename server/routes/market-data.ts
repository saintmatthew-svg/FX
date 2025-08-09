import { RequestHandler } from "express";

// Mock data for demonstration - in production, this would connect to real APIs
// like CoinGecko, Alpha Vantage, or premium data providers

export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  timestamp: number;
}

export interface ForexRate {
  pair: string;
  rate: number;
  change24h: number;
  bid: number;
  ask: number;
  timestamp: number;
}

export interface MarketNews {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: string;
  url: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

// Simulated crypto data with realistic fluctuations
const generateCryptoPrice = (basePrice: number, symbol: string): CryptoPrice => {
  const variance = (Math.random() - 0.5) * 0.1; // ±5% variance
  const price = basePrice * (1 + variance);
  const change24h = (Math.random() - 0.5) * 20; // ±10% daily change
  
  return {
    symbol,
    name: getCryptoName(symbol),
    price: Math.round(price * 100) / 100,
    change24h: Math.round(change24h * 100) / 100,
    volume24h: Math.random() * 1000000000,
    marketCap: price * Math.random() * 1000000000,
    timestamp: Date.now(),
  };
};

const generateForexRate = (basePair: string, baseRate: number): ForexRate => {
  const variance = (Math.random() - 0.5) * 0.02; // ±1% variance
  const rate = baseRate * (1 + variance);
  const change24h = (Math.random() - 0.5) * 4; // ±2% daily change
  const spread = rate * 0.0001; // 1 pip spread
  
  return {
    pair: basePair,
    rate: Math.round(rate * 100000) / 100000,
    change24h: Math.round(change24h * 10000) / 10000,
    bid: Math.round((rate - spread) * 100000) / 100000,
    ask: Math.round((rate + spread) * 100000) / 100000,
    timestamp: Date.now(),
  };
};

const getCryptoName = (symbol: string): string => {
  const names: { [key: string]: string } = {
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'ADA': 'Cardano',
    'SOL': 'Solana',
    'DOT': 'Polkadot',
    'MATIC': 'Polygon',
    'AVAX': 'Avalanche',
    'ATOM': 'Cosmos',
    'LINK': 'Chainlink',
    'UNI': 'Uniswap',
  };
  return names[symbol] || symbol;
};

// Base prices for simulation
const basePrices = {
  'BTC': 67234.52,
  'ETH': 3456.78,
  'ADA': 0.4823,
  'SOL': 156.34,
  'DOT': 7.891,
  'MATIC': 0.8912,
  'AVAX': 38.45,
  'ATOM': 12.67,
  'LINK': 16.78,
  'UNI': 6.23,
};

const baseForexRates = {
  'EUR/USD': 1.0856,
  'GBP/USD': 1.2634,
  'USD/JPY': 149.23,
  'USD/CHF': 0.8912,
  'AUD/USD': 0.6745,
  'USD/CAD': 1.3567,
  'NZD/USD': 0.6234,
  'EUR/GBP': 0.8589,
};

export const getCryptoPrices: RequestHandler = (req, res) => {
  try {
    const symbols = req.query.symbols as string;
    const requestedSymbols = symbols ? symbols.split(',') : Object.keys(basePrices);
    
    const prices = requestedSymbols.map(symbol => {
      const basePrice = basePrices[symbol as keyof typeof basePrices];
      if (!basePrice) {
        throw new Error(`Unknown symbol: ${symbol}`);
      }
      return generateCryptoPrice(basePrice, symbol);
    });
    
    res.json({
      success: true,
      data: prices,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getForexRates: RequestHandler = (req, res) => {
  try {
    const pairs = req.query.pairs as string;
    const requestedPairs = pairs ? pairs.split(',') : Object.keys(baseForexRates);
    
    const rates = requestedPairs.map(pair => {
      const baseRate = baseForexRates[pair as keyof typeof baseForexRates];
      if (!baseRate) {
        throw new Error(`Unknown pair: ${pair}`);
      }
      return generateForexRate(pair, baseRate);
    });
    
    res.json({
      success: true,
      data: rates,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMarketNews: RequestHandler = (req, res) => {
  try {
    const category = req.query.category as string || 'all';
    const limit = parseInt(req.query.limit as string) || 20;
    
    // Mock news data
    const allNews: MarketNews[] = [
      {
        id: '1',
        title: 'Bitcoin Surges Past $70,000 Amid Institutional Adoption',
        summary: 'Major corporations continue to add Bitcoin to their treasury reserves, driving price to new all-time highs.',
        category: 'crypto',
        source: 'CryptoNews',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        url: '#',
        sentiment: 'positive',
      },
      {
        id: '2',
        title: 'Federal Reserve Signals Potential Rate Cuts This Year',
        summary: 'Fed Chair Jerome Powell hints at possible interest rate reductions to combat economic slowdown.',
        category: 'forex',
        source: 'Financial Times',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        url: '#',
        sentiment: 'neutral',
      },
      {
        id: '3',
        title: 'Ethereum Layer 2 Solutions See Record Transaction Volume',
        summary: 'Polygon, Arbitrum, and Optimism process millions of transactions as scaling solutions gain traction.',
        category: 'crypto',
        source: 'DeFi Pulse',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        url: '#',
        sentiment: 'positive',
      },
      {
        id: '4',
        title: 'EUR/USD Reaches Parity as ECB Maintains Dovish Stance',
        summary: 'European Central Bank keeps rates unchanged while hinting at potential stimulus measures.',
        category: 'forex',
        source: 'Reuters',
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        url: '#',
        sentiment: 'negative',
      },
      {
        id: '5',
        title: 'DeFi Protocol Launches Revolutionary Yield Farming Strategy',
        summary: 'New automated market maker promises up to 25% APY through innovative liquidity provision mechanisms.',
        category: 'defi',
        source: 'DeFi Weekly',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        url: '#',
        sentiment: 'positive',
      },
    ];
    
    const filteredNews = category === 'all' 
      ? allNews 
      : allNews.filter(news => news.category === category);
    
    const limitedNews = filteredNews.slice(0, limit);
    
    res.json({
      success: true,
      data: limitedNews,
      total: filteredNews.length,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getMarketSentiment: RequestHandler = (req, res) => {
  try {
    // Generate realistic sentiment data
    const sentiment = {
      crypto: {
        sentiment: 'bullish',
        percentage: 72 + Math.floor(Math.random() * 20),
        trend: 'up',
      },
      forex: {
        sentiment: 'neutral',
        percentage: 45 + Math.floor(Math.random() * 20),
        trend: 'sideways',
      },
      commodities: {
        sentiment: 'bearish',
        percentage: 30 + Math.floor(Math.random() * 20),
        trend: 'down',
      },
      overall: {
        sentiment: 'bullish',
        percentage: 68 + Math.floor(Math.random() * 15),
        trend: 'up',
      },
    };
    
    res.json({
      success: true,
      data: sentiment,
      timestamp: Date.now(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
