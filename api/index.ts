import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "../server/routes/demo";
import {
  handleLogin,
  handleRegister,
  handleLogout,
  handleGetProfile,
  handleUpdateBalance,
  handleGoogleAuth,
  handleGoogleCallback,
  handleFacebookAuth,
  handleFacebookCallback,
  handleForgotPassword,
  handleResetPassword,
} from "../server/routes/auth";
import {
  getCryptoPrices,
  getForexRates,
  getMarketNews,
  getMarketSentiment,
} from "../server/routes/market-data";
import {
  placeOrder,
  cancelOrder,
  getOrders,
  getPositions,
  getTrades,
  getAccountInfo,
} from "../server/routes/trading";


export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Debug middleware for development
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api', (req, res, next) => {
      console.log(`🔄 ${req.method} ${req.path} - Body:`, req.body);
      next();
    });
  }

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // User authentication routes
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/auth/profile", handleGetProfile);
  app.post("/api/auth/balance", handleUpdateBalance);
  app.post("/api/auth/forgot-password", handleForgotPassword);
  app.post("/api/auth/reset-password", handleResetPassword);

  // OAuth routes
  app.get("/api/auth/google", handleGoogleAuth);
  app.get("/api/auth/google/callback", handleGoogleCallback);
  app.get("/api/auth/facebook", handleFacebookAuth);
  app.get("/api/auth/facebook/callback", handleFacebookCallback);



  // Market data routes
  app.get("/api/crypto/prices", getCryptoPrices);
  app.get("/api/forex/rates", getForexRates);
  app.get("/api/market/news", getMarketNews);
  app.get("/api/market/sentiment", getMarketSentiment);

  // Trading routes
  app.post("/api/trading/orders", placeOrder);
  app.delete("/api/trading/orders", cancelOrder);
  app.get("/api/trading/orders", getOrders);
  app.get("/api/trading/positions", getPositions);
  app.get("/api/trading/trades", getTrades);
  app.get("/api/trading/account", getAccountInfo);

  return app;
}

export default createServer;
