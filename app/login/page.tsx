'use client'

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {motion} from 'framer-motion'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Label} from '@/components/ui/label'
import {AlertCircle, Loader2} from 'lucide-react'
import {useToast} from "@/components/ui/use-toast"

import {loginWithRest} from "@/lib/useAuth";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const {toast} = useToast()


    const saveSession = (jwt: string) => {
        document.cookie = `jwt=${jwt}; Path=/; Secure; SameSite=Strict`;
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)


        try {
            const data = await loginWithRest(identifier, password);
            const {jwt, user} = data;
            saveSession(jwt);
            setIsLoading(true)
            toast({
                title: "Inicio de sesión exitoso",
                description: `Bienvenido, ${data.user.name}!`,
            })
            setError("")
            window.location.href = "/dashboard";
        } catch (error: any) {
            setIsLoading(false)
            setError("" + error.message)
        }
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
            >
                <Card className="w-[350px]">
                    {error &&  <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
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
            </motion.div>
        </div>
    )
}

