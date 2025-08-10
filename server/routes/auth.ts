import { RequestHandler } from "express";
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@shared/api';
import crypto from 'crypto';

// In-memory user storage (replace with a real database)
const users: Map<string, User & { password: string }> = new Map();
const sessions: Map<string, string> = new Map(); // token -> userId
const resetTokens: Map<string, { userId: string, expires: number }> = new Map(); // reset token -> user info

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

export const handleForgotPassword: RequestHandler = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  const user = findUserByEmail(email);
  if (!user) {
    // For security, we don't reveal if the email exists or not
    return res.json({
      success: true,
      message: 'If an account with that email exists, we have sent a password reset link.'
    });
  }

  // Generate reset token
  const resetToken = generateToken();
  const expiresAt = Date.now() + (60 * 60 * 1000); // 1 hour from now

  // Store reset token
  resetTokens.set(resetToken, {
    userId: user.id,
    expires: expiresAt
  });

  // In a real app, you would send an email here
  // For demo purposes, we'll log the reset link
  const resetLink = `${req.protocol}://${req.get('host')}/reset-password?token=${resetToken}`;
  console.log('\n=== PASSWORD RESET EMAIL (Demo) ===');
  console.log(`To: ${email}`);
  console.log(`Subject: Reset Your Crypto Future Password`);
  console.log(`\nHi ${user.firstName},\n`);
  console.log(`You requested a password reset for your Crypto Future account.`);
  console.log(`Click the link below to reset your password:\n`);
  console.log(`${resetLink}\n`);
  console.log(`This link will expire in 1 hour for security.`);
  console.log(`If you didn't request this, please ignore this email.\n`);
  console.log(`Best regards,`);
  console.log(`The Crypto Future Team`);
  console.log('===============================\n');

  res.json({
    success: true,
    message: 'If an account with that email exists, we have sent a password reset link.',
    // In demo mode, include the reset link in the response
    resetLink: process.env.NODE_ENV === 'development' ? resetLink : undefined
  });
};

export const handleResetPassword: RequestHandler = (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Token and new password are required'
    });
  }

  const resetInfo = resetTokens.get(token);
  if (!resetInfo) {
    return res.status(400).json({
      success: false,
      message: 'Invalid or expired reset token'
    });
  }

  if (Date.now() > resetInfo.expires) {
    resetTokens.delete(token);
    return res.status(400).json({
      success: false,
      message: 'Reset token has expired'
    });
  }

  const user = users.get(resetInfo.userId);
  if (!user) {
    resetTokens.delete(token);
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Update password
  user.password = hashPassword(newPassword);
  users.set(user.id, user);

  // Delete the reset token
  resetTokens.delete(token);

  // Invalidate all existing sessions for this user
  for (const [sessionToken, userId] of sessions.entries()) {
    if (userId === user.id) {
      sessions.delete(sessionToken);
    }
  }

  res.json({
    success: true,
    message: 'Password reset successful. Please log in with your new password.'
  });
};
