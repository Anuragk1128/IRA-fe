"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { adminLogin, isAdminAuthenticated, adminLoading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('AdminLoginPage: useEffect - isAdminAuthenticated:', isAdminAuthenticated, 'adminLoading:', adminLoading);
    if (isAdminAuthenticated) {
      console.log('AdminLoginPage: Redirecting to /admin');
      router.push('/admin');
    }
  }, [isAdminAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('AdminLoginPage: Submitting login for email:', email);

    const success = await adminLogin(email, password);
    if (!success) {
      setError('Invalid username or password.');
      console.log('AdminLoginPage: Login failed.');
    } else {
      console.log('AdminLoginPage: Login successful. Redirection handled by useEffect.');
    }
  };

  if (adminLoading) {
    console.log('AdminLoginPage: Rendering loading state.');
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Or a spinner
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="flex items-baseline justify-end">
              <button
                type="submit"
                className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
