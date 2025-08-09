import { RequestHandler } from "express";
import { z } from "zod";

// Trading schemas for validation
const PlaceOrderSchema = z.object({
  symbol: z.string(),
  side: z.enum(["buy", "sell"]),
  type: z.enum(["market", "limit", "stop", "stop_limit"]),
  quantity: z.number().positive(),
  price: z.number().positive().optional(),
  stopPrice: z.number().positive().optional(),
  stopLoss: z.number().positive().optional(),
  takeProfit: z.number().positive().optional(),
  timeInForce: z.enum(["GTC", "IOC", "FOK"]).default("GTC"),
});

const CancelOrderSchema = z.object({
  orderId: z.string(),
});

// In-memory storage (in production, use a database)
let orders: Order[] = [];
let positions: Position[] = [];
let trades: Trade[] = [];
let accountBalance = 100000; // Starting balance in USD

interface Order {
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
  createdAt: Date;
  filledAt?: Date;
  filledPrice?: number;
  filledQuantity?: number;
  timeInForce: "GTC" | "IOC" | "FOK";
}

interface Position {
  id: string;
  userId: string;
  symbol: string;
  side: "long" | "short";
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnL: number;
  realizedPnL: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Trade {
  id: string;
  orderId: string;
  userId: string;
  symbol: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  commission: number;
  timestamp: Date;
}

// Mock current prices (in production, get from real-time data feed)
const getCurrentPrice = (symbol: string): number => {
  const prices: { [key: string]: number } = {
    BTCUSDT: 67234.52,
    ETHUSDT: 3456.78,
    ADAUSDT: 0.4823,
    SOLUSDT: 156.34,
    EURUSD: 1.0856,
    GBPUSD: 1.2634,
    USDJPY: 149.23,
    XAUUSD: 2045.67,
  };

  // Add some random variance
  const basePrice = prices[symbol] || 100;
  const variance = (Math.random() - 0.5) * 0.002; // ±0.1% variance
  return basePrice * (1 + variance);
};

const generateId = () => Math.random().toString(36).substr(2, 9);

// Simulate order execution
const executeOrder = (order: Order): boolean => {
  const currentPrice = getCurrentPrice(order.symbol);

  // Market orders execute immediately
  if (order.type === "market") {
    order.status = "filled";
    order.filledAt = new Date();
    order.filledPrice = currentPrice;
    order.filledQuantity = order.quantity;

    // Create trade record
    const trade: Trade = {
      id: generateId(),
      orderId: order.id,
      userId: order.userId,
      symbol: order.symbol,
      side: order.side,
      quantity: order.quantity,
      price: currentPrice,
      commission: currentPrice * order.quantity * 0.001, // 0.1% commission
      timestamp: new Date(),
    };
    trades.push(trade);

    // Update account balance
    const tradeValue = currentPrice * order.quantity;
    if (order.side === "buy") {
      accountBalance -= tradeValue + trade.commission;
    } else {
      accountBalance += tradeValue - trade.commission;
    }

    // Update or create position
    updatePosition(order, currentPrice);

    return true;
  }

  // Limit orders check if price condition is met
  if (order.type === "limit") {
    const shouldExecute =
      order.side === "buy"
        ? currentPrice <= (order.price || 0)
        : currentPrice >= (order.price || 0);

    if (shouldExecute) {
      order.status = "filled";
      order.filledAt = new Date();
      order.filledPrice = order.price;
      order.filledQuantity = order.quantity;

      const trade: Trade = {
        id: generateId(),
        orderId: order.id,
        userId: order.userId,
        symbol: order.symbol,
        side: order.side,
        quantity: order.quantity,
        price: order.price || currentPrice,
        commission: (order.price || currentPrice) * order.quantity * 0.001,
        timestamp: new Date(),
      };
      trades.push(trade);

      updatePosition(order, order.price || currentPrice);
      return true;
    }
  }

  return false;
};

const updatePosition = (order: Order, executionPrice: number) => {
  const existingPosition = positions.find(
    (p) => p.symbol === order.symbol && p.userId === order.userId,
  );

  if (existingPosition) {
    // Update existing position
    if (
      (existingPosition.side === "long" && order.side === "buy") ||
      (existingPosition.side === "short" && order.side === "sell")
    ) {
      // Adding to position
      const totalValue =
        existingPosition.quantity * existingPosition.entryPrice +
        order.quantity * executionPrice;
      const totalQuantity = existingPosition.quantity + order.quantity;
      existingPosition.entryPrice = totalValue / totalQuantity;
      existingPosition.quantity = totalQuantity;
    } else {
      // Reducing or closing position
      if (order.quantity >= existingPosition.quantity) {
        // Close position
        positions = positions.filter((p) => p.id !== existingPosition.id);
      } else {
        // Reduce position
        existingPosition.quantity -= order.quantity;
      }
    }
    existingPosition.updatedAt = new Date();
  } else {
    // Create new position
    const newPosition: Position = {
      id: generateId(),
      userId: order.userId,
      symbol: order.symbol,
      side: order.side === "buy" ? "long" : "short",
      quantity: order.quantity,
      entryPrice: executionPrice,
      currentPrice: executionPrice,
      unrealizedPnL: 0,
      realizedPnL: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    positions.push(newPosition);
  }
};

export const placeOrder: RequestHandler = async (req, res) => {
  try {
    const orderData = PlaceOrderSchema.parse(req.body);
    const userId = (req.headers["user-id"] as string) || "demo-user";

    // Validate sufficient balance for buy orders
    if (orderData.side === "buy") {
      const estimatedCost =
        (orderData.price || getCurrentPrice(orderData.symbol)) *
        orderData.quantity;
      if (estimatedCost > accountBalance * 0.95) {
        // 95% to account for fees
        return res.status(400).json({
          success: false,
          error: "Insufficient balance",
        });
      }
    }

    const order: Order = {
      id: generateId(),
      userId,
      symbol: orderData.symbol,
      side: orderData.side,
      type: orderData.type,
      quantity: orderData.quantity,
      price: orderData.price,
      stopPrice: orderData.stopPrice,
      stopLoss: orderData.stopLoss,
      takeProfit: orderData.takeProfit,
      status: "pending",
      createdAt: new Date(),
      timeInForce: orderData.timeInForce || "GTC",
    };

    orders.push(order);

    // Try to execute immediately
    const executed = executeOrder(order);

    res.json({
      success: true,
      data: {
        orderId: order.id,
        status: order.status,
        executed,
        message: executed
          ? "Order executed successfully"
          : "Order placed successfully",
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Invalid order data",
    });
  }
};

export const cancelOrder: RequestHandler = async (req, res) => {
  try {
    const { orderId } = CancelOrderSchema.parse(req.body);
    const userId = (req.headers["user-id"] as string) || "demo-user";

    const order = orders.find((o) => o.id === orderId && o.userId === userId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        success: false,
        error: "Cannot cancel non-pending order",
      });
    }

    order.status = "cancelled";

    res.json({
      success: true,
      data: {
        orderId: order.id,
        status: order.status,
        message: "Order cancelled successfully",
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Invalid request",
    });
  }
};

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const userId = (req.headers["user-id"] as string) || "demo-user";
    const status = req.query.status as string;

    let userOrders = orders.filter((o) => o.userId === userId);

    if (status) {
      userOrders = userOrders.filter((o) => o.status === status);
    }

    res.json({
      success: true,
      data: userOrders.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
      ),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch orders",
    });
  }
};

export const getPositions: RequestHandler = async (req, res) => {
  try {
    const userId = (req.headers["user-id"] as string) || "demo-user";

    // Update current prices and P&L for all positions
    const userPositions = positions
      .filter((p) => p.userId === userId)
      .map((position) => {
        const currentPrice = getCurrentPrice(position.symbol);
        const priceDiff = currentPrice - position.entryPrice;
        const unrealizedPnL =
          position.side === "long"
            ? priceDiff * position.quantity
            : -priceDiff * position.quantity;

        return {
          ...position,
          currentPrice,
          unrealizedPnL,
        };
      });

    res.json({
      success: true,
      data: userPositions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch positions",
    });
  }
};

export const getTrades: RequestHandler = async (req, res) => {
  try {
    const userId = (req.headers["user-id"] as string) || "demo-user";
    const limit = parseInt(req.query.limit as string) || 50;

    const userTrades = trades
      .filter((t) => t.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    res.json({
      success: true,
      data: userTrades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch trades",
    });
  }
};

export const getAccountInfo: RequestHandler = async (req, res) => {
  try {
    const userId = (req.headers["user-id"] as string) || "demo-user";

    const userPositions = positions.filter((p) => p.userId === userId);
    const totalUnrealizedPnL = userPositions.reduce((sum, position) => {
      const currentPrice = getCurrentPrice(position.symbol);
      const priceDiff = currentPrice - position.entryPrice;
      const unrealizedPnL =
        position.side === "long"
          ? priceDiff * position.quantity
          : -priceDiff * position.quantity;
      return sum + unrealizedPnL;
    }, 0);

    const equity = accountBalance + totalUnrealizedPnL;
    const usedMargin = userPositions.reduce((sum, pos) => {
      return sum + pos.entryPrice * pos.quantity * 0.01; // 1% margin requirement
    }, 0);

    res.json({
      success: true,
      data: {
        balance: accountBalance,
        equity,
        unrealizedPnL: totalUnrealizedPnL,
        usedMargin,
        freeMargin: equity - usedMargin,
        marginLevel: usedMargin > 0 ? (equity / usedMargin) * 100 : 0,
        openPositions: userPositions.length,
        pendingOrders: orders.filter(
          (o) => o.userId === userId && o.status === "pending",
        ).length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch account info",
    });
  }
};

// Background task to process pending orders
setInterval(() => {
  const pendingOrders = orders.filter((o) => o.status === "pending");
  pendingOrders.forEach((order) => {
    executeOrder(order);
  });
}, 5000); // Check every 5 seconds
