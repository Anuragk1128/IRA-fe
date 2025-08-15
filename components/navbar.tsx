"use client";

import Link from "next/link";
import { useState, useEffect, Fragment } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const router = useRouter();
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Set isClient to true after component mounts to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Close menu when user logs out
  useEffect(() => {
    if (!user) {
      setIsMenuOpen(false);
    }
  }, [user]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      setIsAtTop(window.scrollY <= 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    // Listen for route changes in Next.js App Router
    window.addEventListener('routeChangeStart', handleRouteChange);
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChange);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isHovered || !isAtTop
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        } ${!isAtTop || isHovered || isScrolled ? 'opacity-100' : 'opacity-0'}`}
        style={{
          transition: 'background-color 0.3s ease, opacity 0.3s ease',
          height: '4rem',
          transform: isAtTop && !isHovered && !isScrolled ? 'translateY(-100%)' : 'translateY(0)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      <div className="h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${
          (!isScrolled && isAtTop && !isHovered) ? 'text-white' : 'text-gray-900'
        }`}>
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            IRA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!loading && isClient && user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile" 
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                  title="Profile"
                >
                  <FiUser className="text-gray-900" size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-900 hover:text-gray-700 transition-colors"
                  title="Logout"
                >
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : !loading ? (
              <Link 
                href="/login" 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {!loading && isClient && user ? (
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-gray-200 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            ) : !loading ? (
              <Link 
                href="/login" 
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
              >
                Login
              </Link>
            ) : null}
          </div>
        </div>

        {/* Mobile menu */}
        {!loading && isClient && user && isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/profile" 
                className="flex items-center text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser className="mr-2" size={20} /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-left"
              >
                <FiLogOut className="mr-2" size={20} /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
      </div>
    </nav>
    </div>
  );
}
