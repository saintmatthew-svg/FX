import { RequestHandler } from "express";
import { AuthResponse, LoginRequest, RegisterRequest, User, Transaction, TransactionRequest, BalanceResponse } from "@shared/api";

// In-memory user storage (in production, use a real database)
const users: User[] = [];
const transactions: Transaction[] = [];

// Simple token generation (in production, use JWT or similar)
const generateToken = (userId: string): string => {
  return `token_${userId}_${Date.now()}`;
};

// Helper function to find user by email
const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

// Helper function to find user by ID
const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Registration handler
export const handleRegister: RequestHandler = (req, res) => {
  try {
    const userData: RegisterRequest = req.body;

    // Validate required fields
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      const response: AuthResponse = {
        success: false,
        message: "Missing required fields",
      };
      return res.status(400).json(response);
    }

    // Check if user already exists
    if (findUserByEmail(userData.email)) {
      const response: AuthResponse = {
        success: false,
        message: "User with this email already exists",
      };
      return res.status(409).json(response);
    }

    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      country: userData.country,
      tradingExperience: userData.tradingExperience,
      balance: 0, // Starting balance is 0
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    const token = generateToken(newUser.id);

    const response: AuthResponse = {
      success: true,
      message: "User registered successfully",
      user: newUser,
      token,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error("Registration error:", error);
    const response: AuthResponse = {
      success: false,
      message: "Internal server error",
    };
    res.status(500).json(response);
  }
};

// Login handler
export const handleLogin: RequestHandler = (req, res) => {
  try {
    const credentials: LoginRequest = req.body;

    // Validate required fields
    if (!credentials.email || !credentials.password) {
      const response: AuthResponse = {
        success: false,
        message: "Email and password are required",
      };
      return res.status(400).json(response);
    }

    // Find user
    const user = findUserByEmail(credentials.email);
    if (!user) {
      const response: AuthResponse = {
        success: false,
        message: "Invalid email or password",
      };
      return res.status(401).json(response);
    }

    // In production, verify password hash here
    // For this demo, we'll just check if password is not empty
    if (!credentials.password) {
      const response: AuthResponse = {
        success: false,
        message: "Invalid email or password",
      };
      return res.status(401).json(response);
    }

    const token = generateToken(user.id);

    const response: AuthResponse = {
      success: true,
      message: "Login successful",
      user,
      token,
    };

    res.json(response);
  } catch (error) {
    console.error("Login error:", error);
    const response: AuthResponse = {
      success: false,
      message: "Internal server error",
    };
    res.status(500).json(response);
  }
};

// Get user balance and transactions
export const getBalance: RequestHandler = (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userTransactions = transactions
      .filter(t => t.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const response: BalanceResponse = {
      balance: user.balance,
      transactions: userTransactions,
    };

    res.json(response);
  } catch (error) {
    console.error("Get balance error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Handle deposit
export const handleDeposit: RequestHandler = (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;
    const { amount }: { amount: number } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Create transaction record
    const transaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: 'deposit',
      amount,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    transactions.push(transaction);

    // Update user balance
    user.balance += amount;

    res.json({
      success: true,
      message: "Deposit successful",
      balance: user.balance,
      transaction,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Handle withdrawal
export const handleWithdrawal: RequestHandler = (req, res) => {
  try {
    const userId = req.headers['user-id'] as string;
    const { amount }: { amount: number } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid amount" });
    }

    const user = findUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.balance < amount) {
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    // Create transaction record
    const transaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: 'withdrawal',
      amount,
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    transactions.push(transaction);

    // Update user balance
    user.balance -= amount;

    res.json({
      success: true,
      message: "Withdrawal successful",
      balance: user.balance,
      transaction,
    });
  } catch (error) {
    console.error("Withdrawal error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
