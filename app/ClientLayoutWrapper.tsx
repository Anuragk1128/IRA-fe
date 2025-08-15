"use client";

import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import dynamic from 'next/dynamic';

const AuthProvider = dynamic(
  () => import('@/contexts/AuthContext').then((mod) => mod.AuthProvider),
  {
    ssr: false
  }
);

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children, className }) => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <AuthProvider>
        {isAdminRoute ? (
          <AdminAuthProvider>{children}</AdminAuthProvider>
        ) : (
          <>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </>
        )}
      </AuthProvider>
      <Toaster position="top-right" />
    </div>
  );
};

export default ClientLayoutWrapper;
