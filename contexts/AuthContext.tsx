"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role?: string;
  createdAt?: string;
} | null;

type AuthContextType = {
  user: User;
  login: (token: string, userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Verify token with backend
          const response = await fetch('http://localhost:5000/api/v1/users/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser({
              id: userData._id,
              email: userData.email,
            });
          } else {
            // Invalid token, clear it
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (token: string, userData?: any) => {
    try {
      console.log('Login called with token');
      
      // Store the token in localStorage
      localStorage.setItem('token', token);
      setLoading(true);
      
      // If userData is provided, use it directly
      if (userData) {
        setUser({
          id: userData._id || userData.id,
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          role: userData.role,
          createdAt: userData.createdAt
        });
        return userData;
      }
      
      // Otherwise fetch user data using the token
      const response = await fetch('http://localhost:5000/api/v1/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const fetchedUserData = await response.json();
      console.log('User data from /me endpoint:', fetchedUserData);
      
      // Set the user data in state with all available fields
      const userDataToSet = {
        id: fetchedUserData._id || fetchedUserData.id,
        email: fetchedUserData.email,
        name: fetchedUserData.name,
        phone: fetchedUserData.phone,
        role: fetchedUserData.role,
        createdAt: fetchedUserData.createdAt
      };
      
      setUser(userDataToSet);
      return userDataToSet;
      
    } catch (error) {
      console.error('Login failed:', error);
      // Clean up on error
      localStorage.removeItem('token');
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    try {
      // Clear user data and token
      setUser(null);
      localStorage.removeItem('token');
      
      // Optional: Call backend to invalidate token
      const token = localStorage.getItem('token');
      if (token) {
        fetch('http://localhost:5000/api/v1/users/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        }).catch(console.error);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
