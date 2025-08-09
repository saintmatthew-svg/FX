import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleGoogleAuth, handleGoogleCallback, handleFacebookAuth, handleFacebookCallback } from "./routes/auth";
import { getCryptoPrices, getForexRates, getMarketNews, getMarketSentiment } from "./routes/market-data";

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  app.get("/api/auth/google", handleGoogleAuth);
  app.get("/api/auth/google/callback", handleGoogleCallback);
  app.get("/api/auth/facebook", handleFacebookAuth);
  app.get("/api/auth/facebook/callback", handleFacebookCallback);

  // Market data routes
  app.get("/api/crypto/prices", getCryptoPrices);
  app.get("/api/forex/rates", getForexRates);
  app.get("/api/market/news", getMarketNews);
  app.get("/api/market/sentiment", getMarketSentiment);

  return app;
}
