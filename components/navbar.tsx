'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Sheet, SheetContent, SheetTrigger} from '@/components/ui/sheet'
import {Menu} from 'lucide-react'

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = document.cookie.split('; ').find(c => c.startsWith('user='));
    setIsLoggedIn(!!userCookie);
  }, []);

  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = isLoggedIn
      ? [
        {href: '/', label: 'Inicio'},
        {href: '/dashboard', label: 'Dashboard'},
      ]
      : [
        {href: '/', label: 'Inicio'},
        {href: '/login', label: 'Iniciar Sesión'},
        {href: '/register', label: 'Registrarse'},
      ];

  return (
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              GiftCard Pro
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-4">
              {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost">{item.label}</Button>
                  </Link>
              ))}
            </div>

            {/* Mobile menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6"/>
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                      <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                      >
                        <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                                pathname === item.href ? 'bg-accent' : ''
                            }`}
                        >
                          {item.label}
                        </Button>
                      </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
  )
}
