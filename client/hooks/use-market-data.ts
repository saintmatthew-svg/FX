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
  refreshInterval = 30000,
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
      const result: ApiResponse<CryptoPrice[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch crypto prices");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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

export const useForexRates = (pairs?: string[], refreshInterval = 10000) => {
  const [data, setData] = useState<ForexRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const pairsParam = pairs ? pairs.join(",") : "";
      const response = await fetch(`/api/forex/rates?pairs=${pairsParam}`);
      const result: ApiResponse<ForexRate[]> = await response.json();

      if (result.success) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error || "Failed to fetch forex rates");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
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
