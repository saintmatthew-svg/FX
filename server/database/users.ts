import { pool } from './config';
import { User } from '@shared/api';
import crypto from 'crypto';

// Fallback in-memory storage for development
let isDatabaseAvailable = true;
const fallbackUsers = new Map<string, DatabaseUser>();
const fallbackSessions = new Map<string, { userId: string; expiresAt: Date; }>();

// Check if database is available
export const checkDatabaseAvailability = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    isDatabaseAvailable = true;
    return true;
  } catch (error) {
    isDatabaseAvailable = false;
    if (process.env.NODE_ENV !== 'production') {
      console.log('📝 Using fallback in-memory storage for development');
    }
    return false;
  }
};

export interface DatabaseUser extends User {
  passwordHash: string;
  amountDeposited: number;
  updatedAt: string;
}

// Helper functions
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// User operations
export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  country?: string;
  tradingExperience?: string;
}): Promise<DatabaseUser> => {
  const client = await pool.connect();
  
  try {
    const passwordHash = hashPassword(userData.password);
    
    const result = await client.query(
      `INSERT INTO users (first_name, last_name, email, password_hash, phone_number, country, trading_experience)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        userData.firstName,
        userData.lastName,
        userData.email,
        passwordHash,
        userData.phoneNumber,
        userData.country,
        userData.tradingExperience
      ]
    );

    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      passwordHash: dbUser.password_hash,
      phoneNumber: dbUser.phone_number,
      country: dbUser.country,
      tradingExperience: dbUser.trading_experience,
      balance: parseFloat(dbUser.balance),
      amountDeposited: parseFloat(dbUser.amount_deposited),
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  } finally {
    client.release();
  }
};

export const findUserByEmail = async (email: string): Promise<DatabaseUser | null> => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      passwordHash: dbUser.password_hash,
      phoneNumber: dbUser.phone_number,
      country: dbUser.country,
      tradingExperience: dbUser.trading_experience,
      balance: parseFloat(dbUser.balance),
      amountDeposited: parseFloat(dbUser.amount_deposited),
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  } finally {
    client.release();
  }
};

export const findUserById = async (id: string): Promise<DatabaseUser | null> => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      passwordHash: dbUser.password_hash,
      phoneNumber: dbUser.phone_number,
      country: dbUser.country,
      tradingExperience: dbUser.trading_experience,
      balance: parseFloat(dbUser.balance),
      amountDeposited: parseFloat(dbUser.amount_deposited),
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  } finally {
    client.release();
  }
};

export const updateUserBalance = async (userId: string, balance: number): Promise<DatabaseUser | null> => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `UPDATE users 
       SET balance = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [balance, userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      passwordHash: dbUser.password_hash,
      phoneNumber: dbUser.phone_number,
      country: dbUser.country,
      tradingExperience: dbUser.trading_experience,
      balance: parseFloat(dbUser.balance),
      amountDeposited: parseFloat(dbUser.amount_deposited),
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  } finally {
    client.release();
  }
};

export const updateUserDeposit = async (userId: string, amount: number, isDeposit: boolean = true): Promise<DatabaseUser | null> => {
  const client = await pool.connect();
  
  try {
    // Get current values
    const currentUser = await findUserById(userId);
    if (!currentUser) return null;

    let newBalance = currentUser.balance;
    let newAmountDeposited = currentUser.amountDeposited;

    if (isDeposit) {
      newBalance += amount;
      newAmountDeposited += amount;
    } else {
      // Withdrawal
      if (newBalance < amount) {
        throw new Error('Insufficient balance');
      }
      newBalance -= amount;
    }

    const result = await client.query(
      `UPDATE users 
       SET balance = $1, amount_deposited = $2, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $3 
       RETURNING *`,
      [newBalance, newAmountDeposited, userId]
    );

    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      passwordHash: dbUser.password_hash,
      phoneNumber: dbUser.phone_number,
      country: dbUser.country,
      tradingExperience: dbUser.trading_experience,
      balance: parseFloat(dbUser.balance),
      amountDeposited: parseFloat(dbUser.amount_deposited),
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  } finally {
    client.release();
  }
};

export const updateUserPassword = async (userId: string, newPassword: string): Promise<boolean> => {
  const client = await pool.connect();
  
  try {
    const passwordHash = hashPassword(newPassword);
    const result = await client.query(
      'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [passwordHash, userId]
    );

    return result.rowCount === 1;
  } finally {
    client.release();
  }
};

// Session operations
export const createSession = async (userId: string): Promise<string> => {
  const client = await pool.connect();
  
  try {
    const token = generateToken();
    await client.query(
      'INSERT INTO user_sessions (token, user_id) VALUES ($1, $2)',
      [token, userId]
    );
    return token;
  } finally {
    client.release();
  }
};

export const findUserByToken = async (token: string): Promise<DatabaseUser | null> => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT u.* FROM users u
       JOIN user_sessions s ON u.id = s.user_id
       WHERE s.token = $1 AND s.expires_at > CURRENT_TIMESTAMP`,
      [token]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const dbUser = result.rows[0];
    return {
      id: dbUser.id,
      firstName: dbUser.first_name,
      lastName: dbUser.last_name,
      email: dbUser.email,
      passwordHash: dbUser.password_hash,
      phoneNumber: dbUser.phone_number,
      country: dbUser.country,
      tradingExperience: dbUser.trading_experience,
      balance: parseFloat(dbUser.balance),
      amountDeposited: parseFloat(dbUser.amount_deposited),
      createdAt: dbUser.created_at,
      updatedAt: dbUser.updated_at
    };
  } finally {
    client.release();
  }
};

export const deleteSession = async (token: string): Promise<boolean> => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'DELETE FROM user_sessions WHERE token = $1',
      [token]
    );
    return result.rowCount === 1;
  } finally {
    client.release();
  }
};

export const deleteAllUserSessions = async (userId: string): Promise<number> => {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      'DELETE FROM user_sessions WHERE user_id = $1',
      [userId]
    );
    return result.rowCount || 0;
  } finally {
    client.release();
  }
};
