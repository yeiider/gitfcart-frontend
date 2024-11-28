'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userCookie = document.cookie.split('; ').find(c => c.startsWith('user='));
    setIsLoggedIn(!!userCookie); // Si la cookie existe, establece isLoggedIn en true
  }, []);

  return (
      <nav className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              GiftCard Pro
            </Link>
            <div className="space-x-4">
              {isLoggedIn ? (
                  // Opcional: Agregar un botón para cerrar sesión si está logueado
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
              ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost">Iniciar Sesión</Button>
                    </Link>
                    <Link href="/register">
                      <Button variant="ghost">Registrarse</Button>
                    </Link>
                  </>
              )}
            </div>
          </div>
        </div>
      </nav>
  );
}
