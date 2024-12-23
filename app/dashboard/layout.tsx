'use client';

import {useRef, useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, CreditCard, Settings, Menu, X, LogOut } from 'lucide-react';
import UserName from "@/app/dashboard/userName";
import { AuthProvider } from "@/app/context/AuthContext";

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Mis Gift Cards',
    href: '/dashboard/gift-cards',
    icon: CreditCard,
  },
  {
    title: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const sidebarRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {

        window.location.href = '/login';
      } else {
        console.error('Failed to logout:', await response.text());
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <div className="font-semibold">Mi Dashboard</div>
          <div className="w-10" />
        </div>

        <div className="flex">
          {/* Sidebar */}
          <AnimatePresence mode="wait">
            {(isMobileMenuOpen || !isMobileMenuOpen) && (
                <motion.aside
                    ref={sidebarRef}
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    className={`${
                        isMobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden lg:block'
                    } w-64 border-r bg-card`}
                >
                  <div className="flex flex-col h-full">
                    <AuthProvider>
                      <UserName />
                    </AuthProvider>
                    <nav className="flex-1 p-4">
                      <ul className="space-y-2">
                        {menuItems.map((item) => {
                          const isActive = pathname === item.href;
                          return (
                              <li key={item.href}>
                                <Link href={item.href}>
                                  <Button
                                      variant={isActive ? 'secondary' : 'ghost'}
                                      className="w-full justify-start"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.title}
                                  </Button>
                                </Link>
                              </li>
                          );
                        })}
                      </ul>
                    </nav>

                    <div className="p-4 border-t mt-auto">
                      <Button
                          variant="ghost"
                          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                          onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
  );
}
