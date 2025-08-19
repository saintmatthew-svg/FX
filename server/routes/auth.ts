import { RequestHandler } from "express";
import { User, AuthResponse, LoginRequest, RegisterRequest } from "@shared/api";

// Simple in-memory storage for demo purposes
const users: Map<string, User & { passwordHash: string }> = new Map();
const sessions: Map<string, { userId: string; expires: number }> = new Map();
const resetTokens: Map<string, { userId: string; expires: number }> = new Map();

// Helper functions
const generateToken = (): string => `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const hashPassword = (password: string): string => `hash_${password}`; // Simple hash for demo
const findUserByEmail = (email: string): (User & { passwordHash: string }) | undefined => {
  for (const user of users.values()) {
    if (user.email === email) return user;
  }
  return undefined;
};
const findUserById = (id: string): (User & { passwordHash: string }) | undefined => users.get(id);
const findUserByToken = (token: string): (User & { passwordHash: string }) | undefined => {
  const session = sessions.get(token);
  if (!session || Date.now() > session.expires) {
    sessions.delete(token);
    return undefined;
  }
  return findUserById(session.userId);
};

export const handleLogin: RequestHandler<
  {},
  AuthResponse,
  LoginRequest
> = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = findUserByEmail(email);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken();
    sessions.set(token, { userId: user.id, expires: Date.now() + 24 * 60 * 60 * 1000 }); // 24 hours

    const userWithoutPassword: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      tradingExperience: user.tradingExperience,
      balance: user.balance,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleRegister: RequestHandler<
  {},
  AuthResponse,
  RegisterRequest
> = (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      country,
      tradingExperience,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and password are required",
      });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newUser = {
      id: userId,
      firstName,
      lastName,
      email,
      phoneNumber,
      country,
      tradingExperience,
      balance: 0,
      createdAt: new Date().toISOString(),
      passwordHash: hashPassword(password),
    };

    users.set(userId, newUser);

    const token = generateToken();
    sessions.set(token, { userId, expires: Date.now() + 24 * 60 * 60 * 1000 }); // 24 hours

    const userWithoutPassword: User = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      tradingExperience: newUser.tradingExperience,
      balance: newUser.balance,
      createdAt: newUser.createdAt,
    };

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleLogout: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      sessions.delete(token);
    }

    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleGetProfile: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const user = findUserByToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    const userWithoutPassword: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      tradingExperience: user.tradingExperience,
      balance: user.balance,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: "Profile retrieved successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleUpdateBalance: RequestHandler = (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const { amount, type } = req.body;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const user = findUserByToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be greater than 0",
      });
    }

    if (!["deposit", "withdrawal"].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction type. Must be "deposit" or "withdrawal"',
      });
    }

    if (type === "withdrawal" && user.balance < amount) {
      return res.status(400).json({
        success: false,
        message: "Insufficient balance",
      });
    }

    // Update balance
    if (type === "deposit") {
      user.balance += amount;
    } else {
      user.balance -= amount;
    }
    users.set(user.id, user);

    const userWithoutPassword: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      tradingExperience: user.tradingExperience,
      balance: user.balance,
      createdAt: user.createdAt,
    };

    res.json({
      success: true,
      message: `${type} successful`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Balance update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Password reset functionality remains but simplified
export const handleForgotPassword: RequestHandler = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = findUserByEmail(email);
    if (!user) {
      return res.json({
        success: true,
        message: "If an account with that email exists, we have sent a password reset link.",
      });
    }

    const resetToken = generateToken();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour from now

    resetTokens.set(resetToken, {
      userId: user.id,
      expires: expiresAt,
    });

    const resetLink = `${req.protocol}://${req.get("host")}/reset-password?token=${resetToken}`;
    console.log(`\n=== PASSWORD RESET LINK ===`);
    console.log(`Reset link for ${email}: ${resetLink}`);
    console.log(`==============================\n`);

    res.json({
      success: true,
      message: "If an account with that email exists, we have sent a password reset link.",
      resetLink: process.env.NODE_ENV === "development" ? resetLink : undefined,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleResetPassword: RequestHandler = (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Token and new password are required",
    });
  }

  try {
    const resetInfo = resetTokens.get(token);
    if (!resetInfo) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    if (Date.now() > resetInfo.expires) {
      resetTokens.delete(token);
      return res.status(400).json({
        success: false,
        message: "Reset token has expired",
      });
    }

    const user = findUserById(resetInfo.userId);
    if (!user) {
      resetTokens.delete(token);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update password
    user.passwordHash = hashPassword(newPassword);
    users.set(user.id, user);

    // Delete the reset token
    resetTokens.delete(token);

    // Invalidate all existing sessions for this user
    for (const [sessionToken, session] of sessions.entries()) {
      if (session.userId === user.id) {
        sessions.delete(sessionToken);
      }
    }

    res.json({
      success: true,
      message: "Password reset successful. Please log in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
