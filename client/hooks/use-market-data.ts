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
  const [data, setData] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const symbolsParam = symbols ? symbols.join(",") : "";
      const response = await fetch(
        `/api/crypto/prices?symbols=${symbolsParam}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<CryptoPrice[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch crypto prices");
        // Provide fallback data
        setData(getFallbackCryptoData());
      }
    } catch (err) {
      console.error('Error fetching crypto prices:', err);
      setError(err instanceof Error ? err.message : "Unknown error");
      // Provide fallback data when API fails
      setData(getFallbackCryptoData());
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

export const useForexRates = (pairs?: string[], refreshInterval = 15000) => {
  const [data, setData] = useState<ForexRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const pairsParam = pairs ? pairs.join(",") : "";
      const response = await fetch(`/api/forex/rates?pairs=${pairsParam}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse<ForexRate[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch forex rates");
        // Provide fallback data
        setData(getFallbackForexData());
      }
    } catch (err) {
      console.error('Error fetching forex rates:', err);
      setError(err instanceof Error ? err.message : "Unknown error");
      // Provide fallback data when API fails
      setData(getFallbackForexData());
    } finally {
      setLoading(false);
    }
  }, [pairs]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
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
      const response = await fetch(
        `/api/market/news?category=${category}&limit=${limit}`,
      );
      const result: ApiResponse<MarketNews[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch market news");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [category, limit]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
};

export const useMarketSentiment = (refreshInterval = 60000) => {
  const [data, setData] = useState<MarketSentiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/market/sentiment");
      const result: ApiResponse<MarketSentiment> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch market sentiment");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
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

// Fallback data when API is not available
const getFallbackCryptoData = (): CryptoPrice[] => {
  const baseData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 67234.52, volume24h: 28500000000, marketCap: 1300000000000 },
    { symbol: 'ETH', name: 'Ethereum', price: 3456.78, volume24h: 12300000000, marketCap: 415000000000 },
    { symbol: 'ADA', name: 'Cardano', price: 0.4823, volume24h: 845000000, marketCap: 17000000000 },
    { symbol: 'SOL', name: 'Solana', price: 156.34, volume24h: 2100000000, marketCap: 67000000000 },
    { symbol: 'DOT', name: 'Polkadot', price: 7.891, volume24h: 145000000, marketCap: 10000000000 }
  ];

  return baseData.map(item => ({
    ...item,
    change24h: (Math.random() - 0.5) * 10, // Random change between -5% and +5%
    timestamp: Date.now()
  }));
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
