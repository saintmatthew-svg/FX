// This file is no longer needed as we've moved to pure frontend
// But keeping it minimal for Vercel to avoid build errors
export default function handler(req: any, res: any) {
  res.status(200).json({
    message: 'CryptoFuture is now a frontend-only application',
    status: 'success',
    redirect: '/'
  });
}

// Environment configuration for Vercel
const isProduction = process.env.NODE_ENV === 'production';
const corsOrigin = process.env.CORS_ORIGIN || '*';

export function createServer() {
  const app = express();

  // Configure CORS for Vercel deployment
  app.use(cors({
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));
  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Debug middleware for Vercel
  if (!isProduction) {
    app.use('/api', (req, res, next) => {
      console.log(`🔄 ${req.method} ${req.path} - Body:`, req.body);
      next();
    });
  }

  // Health check endpoints
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "CryptoFuture API is running on Vercel";
    res.json({ 
      message: ping,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      platform: 'vercel'
    });
  });

  app.get("/health", (_req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      platform: 'vercel'
    });
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

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Global error handler:', err);
    
    if (res.headersSent) {
      return next(err);
    }
    
    const status = err.status || err.statusCode || 500;
    const message = isProduction ? 'Internal Server Error' : err.message;
    
    res.status(status).json({
      success: false,
      error: message,
      ...(isProduction ? {} : { stack: err.stack })
    });
  });

  // 404 handler for API routes
  app.use('/api/*', (req, res) => {
    res.status(404).json({
      success: false,
      error: 'API endpoint not found',
      path: req.path,
      availableEndpoints: [
        '/api/ping',
        '/api/auth/register',
        '/api/auth/login', 
        '/api/crypto/prices'
      ]
    });
  });

  return app;
}

// Export for Vercel serverless function
const app = createServer();
export default app;
