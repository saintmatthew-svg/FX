import { useState, useCallback } from "react";

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit";
  quantity: number;
  price?: number;
  stopPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  status: "pending" | "filled" | "cancelled" | "rejected";
  createdAt: string;
  filledAt?: string;
  filledPrice?: number;
  filledQuantity?: number;
  timeInForce: "GTC" | "IOC" | "FOK";
}

export interface Position {
  id: string;
  userId: string;
  symbol: string;
  side: "long" | "short";
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  realizedPnL: number;
  createdAt: string;
  updatedAt: string;
}

export interface Trade {
  id: string;
  orderId: string;
  userId: string;
  symbol: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  commission: number;
  timestamp: string;
}

export interface AccountInfo {
  balance: number;
  equity: number;
  unrealizedPnL: number;
  usedMargin: number;
  freeMargin: number;
  marginLevel: number;
  openPositions: number;
  pendingOrders: number;
}

interface PlaceOrderRequest {
  symbol: string;
  side: "buy" | "sell";
  type: "market" | "limit" | "stop" | "stop_limit";
  quantity: number;
  price?: number;
  stopPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  timeInForce?: "GTC" | "IOC" | "FOK";
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const useTrading = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = useCallback(async (orderData: PlaceOrderRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/trading/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": "demo-user", // In production, get from auth context
        },
        body: JSON.stringify(orderData),
      });

      const result: ApiResponse<{
        orderId: string;
        status: string;
        executed: boolean;
        message: string;
      }> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to place order");
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (orderId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/trading/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "user-id": "demo-user",
        },
        body: JSON.stringify({ orderId }),
      });

      const result: ApiResponse<{
        orderId: string;
        status: string;
        message: string;
      }> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to cancel order");
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getOrders = useCallback(async (status?: string) => {
    try {
      const url = status
        ? `/api/trading/orders?status=${status}`
        : "/api/trading/orders";
      const response = await fetch(url, {
        headers: {
          "user-id": "demo-user",
        },
      });

      const result: ApiResponse<Order[]> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch orders");
      }

      return result.data || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return [];
    }
  }, []);

  const getPositions = useCallback(async () => {
    try {
      const response = await fetch("/api/trading/positions", {
        headers: {
          "user-id": "demo-user",
        },
      });

      const result: ApiResponse<Position[]> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch positions");
      }

      return result.data || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return [];
    }
  }, []);

  const getTrades = useCallback(async (limit?: number) => {
    try {
      const url = limit
        ? `/api/trading/trades?limit=${limit}`
        : "/api/trading/trades";
      const response = await fetch(url, {
        headers: {
          "user-id": "demo-user",
        },
      });

      const result: ApiResponse<Trade[]> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch trades");
      }

      return result.data || [];
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return [];
    }
  }, []);

  const getAccountInfo = useCallback(async () => {
    try {
      const response = await fetch("/api/trading/account", {
        headers: {
          "user-id": "demo-user",
        },
      });

      const result: ApiResponse<AccountInfo> = await response.json();

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch account info");
      }

      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      return null;
    }
  }, []);

  return {
    placeOrder,
    cancelOrder,
    getOrders,
    getPositions,
    getTrades,
    getAccountInfo,
    loading,
    error,
  };
};

// Utility functions
export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPnL = (
  pnl: number,
): { text: string; isPositive: boolean; className: string } => {
  const isPositive = pnl >= 0;
  const sign = isPositive ? "+" : "";
  return {
    text: `${sign}${formatCurrency(pnl)}`,
    isPositive,
    className: isPositive ? "text-crypto-green" : "text-crypto-red",
  };
};

export const formatPercentage = (
  percentage: number,
): { text: string; isPositive: boolean; className: string } => {
  const isPositive = percentage >= 0;
  const sign = isPositive ? "+" : "";
  return {
    text: `${sign}${percentage.toFixed(2)}%`,
    isPositive,
    className: isPositive ? "text-crypto-green" : "text-crypto-red",
  };
};
