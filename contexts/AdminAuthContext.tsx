import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  adminLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAdminAuthenticated(true);
    }
    setAdminLoading(false);
    console.log('AdminAuthContext: Initial load - isAdminAuthenticated:', token ? true : false, 'adminLoading:', false);
  }, []);

  const adminLogin = async (email: string, password: string) => {
    setAdminLoading(true);
    console.log('AdminAuthContext: Attempting login for email:', email);
    try {
      const response = await fetch('http://localhost:5000/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          setIsAdminAuthenticated(true);
          setAdminLoading(false);
          console.log('AdminAuthContext: Login successful. Token stored. isAdminAuthenticated: true');
          return true;
        } else {
          console.error('AdminAuthContext: Login successful, but no token received.');
          setIsAdminAuthenticated(false);
          setAdminLoading(false);
          return false;
        }
      } else {
        const errorData = await response.json();
        console.error('AdminAuthContext: Admin login failed:', errorData);
        setIsAdminAuthenticated(false);
        setAdminLoading(false);
        return false;
      }
    } catch (error) {
      console.error('AdminAuthContext: Network error or unexpected issue during admin login:', error);
      setIsAdminAuthenticated(false);
      setAdminLoading(false);
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    console.log('AdminAuthContext: Logout successful. isAdminAuthenticated: false');
    router.push('/admin/login');
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout, adminLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
