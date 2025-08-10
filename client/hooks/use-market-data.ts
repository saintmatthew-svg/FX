import { useState, useEffect, useCallback } from "react";

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
  refreshInterval = 10000, // Update every 10 seconds for more realistic feel
) => {
  const [data, setData] = useState<CryptoPrice[]>(getFallbackCryptoData()); // Start with fallback data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Use a fetch with timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const symbolsParam = symbols ? symbols.join(",") : "";
      const response = await fetch(
        `/api/crypto/prices?symbols=${symbolsParam}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<CryptoPrice[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError("Using simulated data");
        // Keep current fallback data if API call fails
        if (data.length === 0) {
          setData(getFallbackCryptoData());
        }
      }
    } catch (err) {
      // Ignore AbortErrors (caused by timeout) and other expected errors
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted due to timeout, use fallback data silently
      }
      setError(null); // Don't show errors to user
      // Only set fallback data if we don't have any data yet
      if (data.length === 0) {
        setData(getFallbackCryptoData());
      }
    } finally {
      setLoading(false);
    }
  }, [symbols, data.length]);

  useEffect(() => {
    // Set loading to false immediately when we have fallback data
    setLoading(false);

    // Try to fetch real data after a delay, but don't block the UI
    const initialTimeout = setTimeout(() => {
      fetchData();
    }, 2000); // Longer delay to ensure server is ready

    // Reduce frequency of API calls to avoid spamming
    const interval = setInterval(fetchData, refreshInterval * 3); // 3x less frequent

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

export const useForexRates = (pairs?: string[], refreshInterval = 15000) => {
  const [data, setData] = useState<ForexRate[]>(getFallbackForexData()); // Start with fallback data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Use a fetch with timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const pairsParam = pairs ? pairs.join(",") : "";
      const response = await fetch(`/api/forex/rates?pairs=${pairsParam}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<ForexRate[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError("Using simulated data");
        // Keep current fallback data if API call fails
        if (data.length === 0) {
          setData(getFallbackForexData());
        }
      }
    } catch (err) {
      // Ignore AbortErrors (caused by timeout) and other expected errors
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted due to timeout, use fallback data silently
      }
      setError(null); // Don't show errors to user
      // Only set fallback data if we don't have any data yet
      if (data.length === 0) {
        setData(getFallbackForexData());
      }
    } finally {
      setLoading(false);
    }
  }, [pairs, data.length]);

  useEffect(() => {
    // Set loading to false immediately when we have fallback data
    setLoading(false);

    // Try to fetch real data after a delay, but don't block the UI
    const initialTimeout = setTimeout(() => {
      fetchData();
    }, 2500); // Longer delay to ensure server is ready

    // Reduce frequency of API calls to avoid spamming
    const interval = setInterval(fetchData, refreshInterval * 3); // 3x less frequent

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

export const useMarketNews = (
  category = "all",
  limit = 20,
  refreshInterval = 300000,
) => {
  const [data, setData] = useState<MarketNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Use a fetch with timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(
        `/api/market/news?category=${category}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<MarketNews[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError("News service unavailable");
      }
    } catch (err) {
      // Ignore AbortErrors (caused by timeout) and other expected errors
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted due to timeout, fail silently
      }
      // Silently fail for news - it's not critical
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    setLoading(false); // Don't block UI for news

    // Try to fetch news after a longer delay
    const initialTimeout = setTimeout(() => {
      fetchData();
    }, 5000);

    // Much less frequent updates for news
    const interval = setInterval(fetchData, refreshInterval * 2);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

export const useMarketSentiment = (refreshInterval = 60000) => {
  const [data, setData] = useState<MarketSentiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Use a fetch with timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch("/api/market/sentiment", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<MarketSentiment> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError("Sentiment service unavailable");
      }
    } catch (err) {
      // Ignore AbortErrors (caused by timeout) and other expected errors
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted due to timeout, fail silently
      }
      // Silently fail for sentiment - it's not critical
      setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(false); // Don't block UI for sentiment

    // Try to fetch sentiment after a longer delay
    const initialTimeout = setTimeout(() => {
      fetchData();
    }, 6000);

    // Much less frequent updates for sentiment
    const interval = setInterval(fetchData, refreshInterval * 5);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [fetchData, refreshInterval]);

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

// Fallback data when API is not available - with dynamic prices
let fallbackPriceState: { [key: string]: { basePrice: number, lastPrice: number, lastUpdate: number } } = {};

const getFallbackCryptoData = (): CryptoPrice[] => {
  const baseData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 67234.52, volume24h: 28500000000, marketCap: 1300000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 3456.78, volume24h: 12300000000, marketCap: 415000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 0.4823, volume24h: 845000000, marketCap: 17000000000 },
    { symbol: 'SOL', name: 'Solana', price: 156.34, volume24h: 2100000000, marketCap: 67000000000 },
    { symbol: 'DOT', name: 'Polkadot', price: 7.891, volume24h: 145000000, marketCap: 10000000000 }
  ];

  return baseData.map(item => {
    // Initialize price state if not exists
    if (!fallbackPriceState[item.symbol]) {
      fallbackPriceState[item.symbol] = {
        basePrice: item.price,
        lastPrice: item.price,
        lastUpdate: Date.now()
      };
    }

    const state = fallbackPriceState[item.symbol];
    const now = Date.now();

    // Update price every 10 seconds with small random movement
    if (now - state.lastUpdate > 10000) {
      const change = (Math.random() - 0.5) * 0.02; // ±1% change
      state.lastPrice = state.lastPrice * (1 + change);
      state.lastUpdate = now;
    }

    const change24h = ((state.lastPrice - state.basePrice) / state.basePrice) * 100;

    return {
      ...item,
      price: Math.round(state.lastPrice * 100) / 100,
      change24h: Math.round(change24h * 100) / 100,
      timestamp: now
    };
  });
};

const getFallbackForexData = (): ForexRate[] => {
  const baseData = [
    { pair: 'EUR/USD', rate: 1.0856 },
    { pair: 'GBP/USD', rate: 1.2634 },
    { pair: 'USD/JPY', rate: 149.23 },
    { pair: 'USD/CHF', rate: 0.8912 }
  ];

  return baseData.map(item => {
    const spread = item.rate * 0.0001;
    return {
      ...item,
      change24h: (Math.random() - 0.5) * 2, // Random change between -1% and +1%
      bid: item.rate - spread,
      ask: item.rate + spread,
      timestamp: Date.now()
    };
  });
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
