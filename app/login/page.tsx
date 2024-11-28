'use client'

import React, {useState} from 'react'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import {AlertCircle, Facebook, Loader2} from 'lucide-react'

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en el inicio de sesión");
            }


            window.location.href = "/dashboard";
        } catch (error) {
            setIsLoading(false);

            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ha ocurrido un error inesperado");
            }
        }
    };
    const handleSocialLogin = async (provider: string) => {
        console.log('Social login attempt:', provider);
    };




    return (
        <div className="flex sm:mt-10 justify-center min-h-screen bg-background">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="w-full max-w-4xl p-4 space-y-8"

            >
                <h1 className="text-3xl font-bold text-center">Bienvenido a GiftCard Pro</h1>
                <div className="grid gap-8 md:grid-cols-2">

                    <Card className="w-[350px]">
                        {error && <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4"/>
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                Your session has expired. Please log in again.
                            </AlertDescription>
                        </Alert>}


                        <CardHeader>
                            <CardTitle>Iniciar Sesión</CardTitle>
                            <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="identifier">Correo electrónico</Label>
                                        <Input
                                            id="identifier"
                                            placeholder="tu@email.com"
                                            type="email"
                                            value={identifier}
                                            onChange={(e) => setIdentifier(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Ingresa tu contraseña"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        'Iniciar Sesión'
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <p className="text-sm text-muted-foreground">
                                ¿No tienes una cuenta?{' '}
                                <Link href="/register" className="text-primary hover:underline">
                                    Regístrate
                                </Link>
                            </p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Iniciar Sesión con Redes Sociales</CardTitle>
                            <CardDescription>Usa tu cuenta de redes sociales para un acceso rápido</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin('Google')}
                            >
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                                </svg>
                                Continuar con Google
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => handleSocialLogin('Facebook')}
                            >
                                <Facebook className="mr-2 h-4 w-4" />
                                Continuar con Facebook
                            </Button>
                            <Separator />
                            <p className="text-center text-sm text-muted-foreground">
                                Al iniciar sesión, aceptas nuestros{' '}
                                <Link href="#" className="text-primary hover:underline">
                                    Términos de Servicio
                                </Link>{' '}
                                y{' '}
                                <Link href="#" className="text-primary hover:underline">
                                    Política de Privacidad
                                </Link>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
)
}

