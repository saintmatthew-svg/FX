import { RequestHandler } from "express";
import { pool } from "../database/config";
import { findUserByToken } from "../database/users";

// Get all users (admin only)
export const handleGetAllUsers: RequestHandler = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const currentUser = await findUserByToken(token);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Get all users from database
    const client = await pool.connect();
    
    try {
      const result = await client.query(
        `SELECT 
          id, 
          first_name, 
          last_name, 
          email, 
          phone_number, 
          country, 
          trading_experience, 
          balance, 
          amount_deposited,
          created_at,
          updated_at
        FROM users 
        ORDER BY created_at DESC`
      );

      const users = result.rows.map(user => ({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        country: user.country,
        tradingExperience: user.trading_experience,
        balance: parseFloat(user.balance || 0),
        amountDeposited: parseFloat(user.amount_deposited || 0),
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      }));

      res.json({
        success: true,
        message: `Found ${users.length} users in database`,
        users: users,
        totalUsers: users.length,
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get database statistics
export const handleGetDatabaseStats: RequestHandler = async (req, res) => {
  try {
    const client = await pool.connect();
    
    try {
      // Get user count
      const userCount = await client.query("SELECT COUNT(*) FROM users");
      
      // Get session count
      const sessionCount = await client.query("SELECT COUNT(*) FROM user_sessions");
      
      // Get recent registrations (last 24 hours)
      const recentUsers = await client.query(
        "SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '24 hours'"
      );

      // Check if tables exist
      const tablesExist = await client.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('users', 'user_sessions', 'password_reset_tokens')
      `);

      res.json({
        success: true,
        stats: {
          totalUsers: parseInt(userCount.rows[0].count),
          activeSessions: parseInt(sessionCount.rows[0].count),
          recentRegistrations: parseInt(recentUsers.rows[0].count),
          tablesCreated: tablesExist.rows.map(row => row.table_name),
          databaseConnected: true,
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Database stats error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      stats: {
        databaseConnected: false,
        error: error.message,
      },
    });
  }
};
