import { RequestHandler } from "express";
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@shared/api';
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByToken,
  createSession,
  deleteSession,
  deleteAllUserSessions,
  updateUserDeposit,
  updateUserPassword,
  hashPassword,
  generateToken,
  DatabaseUser
} from '../database/users';

// Initialize database on startup
import { testConnection, initializeDatabase } from '../database/config';

// Initialize database connection and tables
const initializeAuth = async () => {
  // Skip database initialization in development if no DB config is provided
  if (process.env.NODE_ENV !== 'production' && !process.env.DB_HOST && !process.env.DATABASE_URL) {
    console.log('⚠️ Development mode: Database connection skipped (no DB_HOST or DATABASE_URL configured)');
    console.log('📝 Note: User auth will use fallback in-memory storage for development');
    return;
  }

  const isConnected = await testConnection();
  if (isConnected) {
    await initializeDatabase();
    console.log('🗄️ PostgreSQL database ready for user management');
  } else {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Database connection required in production');
    } else {
      console.log('⚠️ Development mode: Database connection failed, using fallback storage');
    }
  }
};

initializeAuth().catch(error => {
  if (process.env.NODE_ENV === 'production') {
    console.error('💥 Critical: Database initialization failed in production:', error);
    process.exit(1);
  } else {
    console.log('⚠️ Development: Database initialization failed, continuing with fallback storage');
  }
});

// In-memory storage for password reset tokens (can be moved to DB later)
const resetTokens: Map<string, { userId: string, expires: number }> = new Map();

export const handleLogin: RequestHandler<{}, AuthResponse, LoginRequest> = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const user = await findUserByEmail(email);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = await createSession(user.id);

    const userWithoutPassword: User = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      country: user.country,
      tradingExperience: user.tradingExperience,
      balance: user.balance,
      createdAt: user.createdAt
    };

    res.json({
      success: true,
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const handleRegister: RequestHandler<{}, AuthResponse, RegisterRequest> = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber, country, tradingExperience } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email, and password are required'
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      country,
      tradingExperience
    });

    const token = await createSession(newUser.id);

    const userWithoutPassword: User = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      country: newUser.country,
      tradingExperience: newUser.tradingExperience,
      balance: newUser.balance,
      createdAt: newUser.createdAt
    };

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const handleLogout: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (token) {
      await deleteSession(token);
    }

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const handleGetProfile: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const user = await findUserByToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
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
      createdAt: user.createdAt
    };

    res.json({
      success: true,
      message: 'Profile retrieved successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const handleUpdateBalance: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { amount, type } = req.body; // type: 'deposit' | 'withdrawal'

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    const user = await findUserByToken(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    if (!['deposit', 'withdrawal'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction type. Must be "deposit" or "withdrawal"'
      });
    }

    const updatedUser = await updateUserDeposit(user.id, amount, type === 'deposit');
    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: type === 'withdrawal' ? 'Insufficient balance' : 'Update failed'
      });
    }

    const userWithoutPassword: User = {
      id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      country: updatedUser.country,
      tradingExperience: updatedUser.tradingExperience,
      balance: updatedUser.balance,
      createdAt: updatedUser.createdAt
    };

    res.json({
      success: true,
      message: `${type} successful`,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Balance update error:', error);
    if (error instanceof Error && error.message === 'Insufficient balance') {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
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
