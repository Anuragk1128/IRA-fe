"use client";

import React, { useEffect } from 'react';
import { useAdminAuth, AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { useRouter, usePathname } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayoutContent: React.FC<AdminLayoutProps> = ({ children }) => {
  const { isAdminAuthenticated, adminLoading, adminLogout } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (!adminLoading && !isAdminAuthenticated && !isAdminLoginPage) {
      router.push('/admin/login');
    }
    // Removed the redirect from login page to admin dashboard here.
    // That logic is handled in IRA-fe/app/admin/login/page.tsx directly.
  }, [isAdminAuthenticated, adminLoading, isAdminLoginPage, router]);

  if (adminLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading admin panel...</div>; // Or a spinner
  }

  if (isAdminLoginPage) {
    return <>{children}</>; // Render children directly for login page, no sidebar
  }

  if (!isAdminAuthenticated) {
    // This case should primarily be handled by the redirect above for protected pages.
    // For /admin/login, isAdminAuthenticated will be false, and it will be handled by isAdminLoginPage block.
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="/admin" className="block hover:text-gray-300">Dashboard</a>
            </li>
            <li className="mb-2">
              <a href="/admin/users" className="block hover:text-gray-300">Users</a>
            </li>
            <li className="mb-2">
              <a href="/admin/products" className="block hover:text-gray-300">Products</a>
            </li>
            {/* Add more admin links here */}
            <li className="mt-auto">
              <button
                onClick={adminLogout}
                className="w-full text-left py-2 px-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
};

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
};

export default AdminLayout;
