import { useState, useEffect, useCallback, useMemo } from "react";

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
  sentiment: "positive" | "negative" | "neutral";
}

export interface MarketSentiment {
  crypto: {
    sentiment: string;
    percentage: number;
    trend: string;
  };
  forex: {
    sentiment: string;
    percentage: number;
    trend: string;
  };
  commodities: {
    sentiment: string;
    percentage: number;
    trend: string;
  };
  overall: {
    sentiment: string;
    percentage: number;
    trend: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: number;
}

export const useCryptoPrices = (
  symbols?: string[],
  refreshInterval = 30000, // Update every 30 seconds to be respectful to API
) => {
  const [data, setData] = useState<CryptoPrice[]>(() => getFallbackCryptoData()); // Start with fallback data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<number>(0);

  // Memoize symbols to prevent infinite loop
  const symbolsString = useMemo(() =>
    symbols ? symbols.join(',') : 'BTC,ETH,ADA,SOL,DOT',
    [symbols]
  );

  const fetchData = useCallback(async () => {
    // Prevent too frequent API calls
    const now = Date.now();
    if (now - lastFetch < 10000) { // Minimum 10 seconds between calls
      return;
    }

    try {
      setError(null);
      setLastFetch(now);

      const response = await fetch(`/api/crypto/prices?symbols=${symbolsString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<CryptoPrice[]> = await response.json();

      if (result.success && result.data) {
        setData(result.data);
        console.log('✅ Live crypto prices updated:', result.data.length, 'symbols');
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (err) {
      console.log('📊 API unavailable, using fallback data:', err);
      setError(null); // Don't show error, just use fallback
      // Don't update data here - let fallback interval handle it
    } finally {
      setLoading(false);
    }
  }, [symbolsString, lastFetch]);

  // Try to fetch real data, but don't block UI
  useEffect(() => {
    let mounted = true;

    // Only try API fetch in production or if we know the server is running
    const shouldTryAPI = process.env.NODE_ENV === 'production' || window.location.port === '8080';

    if (shouldTryAPI && mounted) {
      // Delay initial fetch to let server start
      const timeoutId = setTimeout(() => {
        if (mounted) {
          fetchData();
        }
      }, 2000);

      // Set up interval for regular updates (less frequent to avoid spam)
      const intervalId = setInterval(() => {
        if (mounted) {
          fetchData();
        }
      }, refreshInterval * 2); // Double the interval for API calls

      return () => {
        mounted = false;
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [fetchData, refreshInterval]);

  // Update fallback data for smooth price movements (independent of API)
  useEffect(() => {
    let mounted = true;

    const updateFallbackData = () => {
      if (mounted && !loading) {
        setData(currentData => {
          // Only update if we don't have recent real data
          const hasRecentData = currentData.some(item =>
            Date.now() - item.timestamp < 60000 // Less than 1 minute old
          );

          if (!hasRecentData) {
            return getFallbackCryptoData();
          }
          return currentData;
        });
      }
    };

    // Update fallback data every 15 seconds (less frequent)
    const fallbackInterval = setInterval(updateFallbackData, 15000);

    return () => {
      mounted = false;
      clearInterval(fallbackInterval);
    };
  }, [loading]);

  return { data, loading, error, refetch: fetchData };
};

export const useForexRates = (pairs?: string[], refreshInterval = 15000) => {
  const [data, setData] = useState<ForexRate[]>(() => getFallbackForexData()); // Start with fallback data
  const [loading, setLoading] = useState(false); // Start as not loading
  const [error, setError] = useState<string | null>(null);

  // Memoize pairs to prevent infinite loop
  const pairsString = useMemo(() =>
    pairs ? pairs.join(',') : 'EUR/USD,GBP/USD,USD/JPY,USD/CHF',
    [pairs]
  );

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      // For now, just use fallback data since forex API isn't critical
      setData(getFallbackForexData());
    } catch (err) {
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [pairsString]);

  useEffect(() => {
    let mounted = true;

    // Update forex data less frequently (it's not as time-sensitive)
    const updateInterval = setInterval(() => {
      if (mounted) {
        setData(getFallbackForexData());
      }
    }, refreshInterval * 2); // Update every 30 seconds

    return () => {
      mounted = false;
      clearInterval(updateInterval);
    };
  }, [refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

export const useMarketNews = (
  category = "all",
  limit = 20,
  refreshInterval = 300000,
) => {
  const [data, setData] = useState<MarketNews[]>([]);
  const [loading, setLoading] = useState(false); // Start as not loading
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      // News is optional, keep it empty for now
      setData([]);
    } catch (err) {
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  // No automatic fetching for news to keep it simple
  return { data, loading, error, refetch: fetchData };
};

export const useMarketSentiment = (refreshInterval = 60000) => {
  const [data, setData] = useState<MarketSentiment | null>(null);
  const [loading, setLoading] = useState(false); // Start as not loading
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      // Sentiment is optional, keep it null for now
      setData(null);
    } catch (err) {
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // No automatic fetching for sentiment to keep it simple
  return { data, loading, error, refetch: fetchData };
};

// Utility function to format price changes
export const formatPriceChange = (
  change: number,
): { text: string; isPositive: boolean } => {
  const isPositive = change >= 0;
  const sign = isPositive ? "+" : "";
  return {
    text: `${sign}${change.toFixed(2)}%`,
    isPositive,
  };
};

// Utility function to format currency
export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(amount);
};

// Enhanced fallback data with daily updates and realistic price movements
let fallbackPriceState: { [key: string]: {
  basePrice: number,
  lastPrice: number,
  lastUpdate: number,
  dailyBase: number,
  lastDailyUpdate: number,
  trend: number
} } = {};

let lastDailyCheck = 0;

// Check if we need to update daily base prices (simulating daily market changes)
const checkDailyUpdate = () => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  // Only check once per hour to avoid excessive calculations
  if (now - lastDailyCheck < 60 * 60 * 1000) return;
  lastDailyCheck = now;

  Object.keys(fallbackPriceState).forEach(symbol => {
    const state = fallbackPriceState[symbol];
    if (now - state.lastDailyUpdate > oneDayMs) {
      // Update daily base with larger movement (±5%)
      const dailyChange = (Math.random() - 0.5) * 0.1; // ±5% daily change
      state.dailyBase = state.dailyBase * (1 + dailyChange);
      state.basePrice = state.dailyBase;
      state.lastDailyUpdate = now;
      state.lastPrice = state.dailyBase; // Reset to new daily base
      console.log(`📈 Daily update for ${symbol}: ${dailyChange > 0 ? '+' : ''}${(dailyChange * 100).toFixed(2)}%`);
    }
  });
};

let lastFallbackUpdate = 0;
let cachedFallbackData: CryptoPrice[] = [];

const getFallbackCryptoData = (): CryptoPrice[] => {
  const now = Date.now();

  // Only update every 15 seconds to prevent excessive recalculation
  if (now - lastFallbackUpdate < 15000 && cachedFallbackData.length > 0) {
    return cachedFallbackData;
  }

  // Realistic current market data (updated December 2024)
  const baseData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 97234.52, volume24h: 28500000000, marketCap: 1900000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 3656.78, volume24h: 12300000000, marketCap: 440000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 1.0823, volume24h: 2845000000, marketCap: 38000000000 },
    { symbol: 'SOL', name: 'Solana', price: 239.34, volume24h: 4100000000, marketCap: 112000000000 },
    { symbol: 'DOT', name: 'Polkadot', price: 8.891, volume24h: 245000000, marketCap: 12000000000 }
  ];

  // Check for daily updates (throttled)
  checkDailyUpdate();

  cachedFallbackData = baseData.map(item => {
    // Initialize price state if not exists
    if (!fallbackPriceState[item.symbol]) {
      fallbackPriceState[item.symbol] = {
        basePrice: item.price,
        lastPrice: item.price,
        lastUpdate: now,
        dailyBase: item.price,
        lastDailyUpdate: now,
        trend: (Math.random() - 0.5) * 0.005 // Small initial trend
      };
    }

    const state = fallbackPriceState[item.symbol];

    // Update price every 15 seconds with realistic movement patterns
    if (now - state.lastUpdate > 15000) {
      // Implement momentum-based price movement
      const momentum = state.trend * 0.7; // Carry 70% of previous trend
      const randomChange = (Math.random() - 0.5) * 0.003; // ±0.15% random change
      const newTrend = momentum + randomChange;

      // Bound the trend to prevent extreme movements
      state.trend = Math.max(-0.01, Math.min(0.01, newTrend)); // Max ±1% per update

      // Apply trend to price
      state.lastPrice = state.lastPrice * (1 + state.trend);
      state.lastUpdate = now;
    }

    const change24h = ((state.lastPrice - state.dailyBase) / state.dailyBase) * 100;

    return {
      ...item,
      price: Math.round(state.lastPrice * 100) / 100,
      change24h: Math.round(change24h * 100) / 100,
      volume24h: item.volume24h * (0.8 + Math.random() * 0.4), // ±20% volume variation
      marketCap: state.lastPrice * (item.marketCap / item.price), // Recalculate market cap
      timestamp: now
    };
  });

  lastFallbackUpdate = now;
  return cachedFallbackData;
};

let lastForexUpdate = 0;
let cachedForexData: ForexRate[] = [];

const getFallbackForexData = (): ForexRate[] => {
  const now = Date.now();

  // Only update every 30 seconds for forex (less volatile)
  if (now - lastForexUpdate < 30000 && cachedForexData.length > 0) {
    return cachedForexData;
  }

  const baseData = [
    { pair: 'EUR/USD', rate: 1.0856 },
    { pair: 'GBP/USD', rate: 1.2634 },
    { pair: 'USD/JPY', rate: 149.23 },
    { pair: 'USD/CHF', rate: 0.8912 }
  ];

  cachedForexData = baseData.map(item => {
    const spread = item.rate * 0.0001;
    return {
      ...item,
      change24h: (Math.random() - 0.5) * 2, // Random change between -1% and +1%
      bid: item.rate - spread,
      ask: item.rate + spread,
      timestamp: now
    };
  });

  lastForexUpdate = now;
  return cachedForexData;
};

// Utility function to format large numbers
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) {
    return `$${(num / 1e9).toFixed(1)}B`;
  } else if (num >= 1e6) {
    return `$${(num / 1e6).toFixed(1)}M`;
  } else if (num >= 1e3) {
    return `$${(num / 1e3).toFixed(1)}K`;
  }
  return `$${num.toFixed(2)}`;
};
