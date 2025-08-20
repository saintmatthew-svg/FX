import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@shared/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<AuthResponse>;
  register: (userData: RegisterRequest) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  updateBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof localStorage === 'undefined') {
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      // Simulate server validation with client-side logic
      const storedUsers = JSON.parse(localStorage.getItem('cryptofuture_users') || '[]');
      const user = storedUsers.find((u: any) =>
        u.email === credentials.email && u.password === credentials.password
      );

      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      // Create session token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const userWithoutPassword = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        tradingExperience: user.tradingExperience,
        balance: user.balance || 0,
        createdAt: user.createdAt,
      };

      setUser(userWithoutPassword);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
        // Initialize empty portfolio for new sessions
        if (!localStorage.getItem('user_portfolio')) {
          localStorage.setItem('user_portfolio', JSON.stringify({}));
        }
      }

      return {
        success: true,
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Login failed',
      };
    }
  };

  const register = async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      // Client-side registration logic
      const storedUsers = JSON.parse(localStorage.getItem('cryptofuture_users') || '[]');

      // Check if user already exists
      const existingUser = storedUsers.find((u: any) => u.email === userData.email);
      if (existingUser) {
        return {
          success: false,
          message: 'User with this email already exists',
        };
      }

      // Create new user
      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password, // In a real app, this would be hashed
        phoneNumber: userData.phoneNumber,
        country: userData.country,
        tradingExperience: userData.tradingExperience,
        balance: 0,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage users array
      storedUsers.push(newUser);
      localStorage.setItem('cryptofuture_users', JSON.stringify(storedUsers));

      // Create session token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const userWithoutPassword = {
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

      setUser(userWithoutPassword);

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(userWithoutPassword));
        localStorage.setItem('user_portfolio', JSON.stringify({}));
      }

      return {
        success: true,
        message: 'Registration successful',
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      console.error('Register error:', error);
      return {
        success: false,
        message: 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      // Pure client-side logout
      setUser(null);
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('user_portfolio');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, balance: newBalance };
      setUser(updatedUser);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateBalance,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
