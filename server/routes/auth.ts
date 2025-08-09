import { RequestHandler } from "express";
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@shared/api';
import crypto from 'crypto';

// In-memory user storage (replace with a real database)
const users: Map<string, User & { password: string }> = new Map();
const sessions: Map<string, string> = new Map(); // token -> userId

// Helper functions
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

function findUserByEmail(email: string): (User & { password: string }) | undefined {
  for (const user of users.values()) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

export const handleLogin: RequestHandler<{}, AuthResponse, LoginRequest> = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = findUserByEmail(email);
  if (!user || user.password !== hashPassword(password)) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  const token = generateToken();
  sessions.set(token, user.id);

  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    success: true,
    message: 'Login successful',
    user: userWithoutPassword,
    token
  });
};

export const handleRegister: RequestHandler<{}, AuthResponse, RegisterRequest> = (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, country, tradingExperience } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'First name, last name, email, and password are required'
    });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({
      success: false,
      message: 'User with this email already exists'
    });
  }

  const userId = crypto.randomUUID();
  const hashedPassword = hashPassword(password);
  const now = new Date().toISOString();

  const newUser: User & { password: string } = {
    id: userId,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phoneNumber,
    country,
    tradingExperience,
    balance: 0, // New users start with 0 balance
    createdAt: now
  };

  users.set(userId, newUser);

  const token = generateToken();
  sessions.set(token, userId);

  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    success: true,
    message: 'Registration successful',
    user: userWithoutPassword,
    token
  });
};

export const handleLogout: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (token) {
    sessions.delete(token);
  }
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
};

export const handleGetProfile: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  const userId = sessions.get(token);
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    success: true,
    message: 'Profile retrieved successfully',
    user: userWithoutPassword
  });
};

export const handleUpdateBalance: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const { amount, type } = req.body; // type: 'deposit' | 'withdrawal'
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  const userId = sessions.get(token);
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
  
  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }
  
  if (!amount || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0'
    });
  }
  
  if (type === 'withdrawal' && user.balance < amount) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient balance'
    });
  }
  
  if (type === 'deposit') {
    user.balance += amount;
  } else if (type === 'withdrawal') {
    user.balance -= amount;
  } else {
    return res.status(400).json({
      success: false,
      message: 'Invalid transaction type'
    });
  }
  
  users.set(userId, user);
  
  const { password: _, ...userWithoutPassword } = user;
  
  res.json({
    success: true,
    message: `${type} successful`,
    user: userWithoutPassword
  });
};

export const handleGoogleAuth: RequestHandler = (req, res) => {
  // Demo Google Auth - redirect to login for now
  res.redirect('/login?demo=google');
};

export const handleGoogleCallback: RequestHandler = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect('/login?error=oauth_failed');
    }

    console.log('Google OAuth callback received code:', code);
    
    res.redirect('/?success=google_login');
    
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect('/login?error=oauth_failed');
  }
};

export const handleFacebookAuth: RequestHandler = (req, res) => {
  // Demo Facebook Auth - redirect to login for now
  res.redirect('/login?demo=facebook');
};

export const handleFacebookCallback: RequestHandler = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.redirect('/login?error=oauth_failed');
    }
    console.log('Facebook OAuth callback received code:', code);
    res.redirect('/?success=facebook_login');
    
  } catch (error) {
    console.error('Facebook OAuth error:', error);
    res.redirect('/login?error=oauth_failed');
  }
};
