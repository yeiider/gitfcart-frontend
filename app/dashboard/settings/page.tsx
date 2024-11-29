'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Loader2, User, Lock } from 'lucide-react'

// Simulación de datos del usuario
const userData = {
    name: 'Yeider Adrian',
    lastname: 'Mina Caicedo',
    email: 'yeider@example.com',
    rut: '12345678-9'
}

export default function SettingsPage() {
    const [user, setUser] = useState(userData)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    const handleUserInfoUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simular una llamada a la API para actualizar la información del usuario
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)

    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) {

            return
        }
        setIsLoading(true)
        // Simular una llamada a la API para cambiar la contraseña
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')

    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Configuración de la Cuenta</h1>
                <Button variant="ghost" onClick={() => router.push('/dashboard')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al Dashboard
                </Button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Tabs defaultValue="profile" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="profile">Perfil</TabsTrigger>
                        <TabsTrigger value="password">Contraseña</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información del Perfil</CardTitle>
                                <CardDescription>
                                    Actualiza tu información personal aquí. Haz clic en guardar cuando hayas terminado.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handleUserInfoUpdate}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nombre</Label>
                                            <Input
                                                id="name"
                                                value={user.name}
                                                onChange={(e) => setUser({...user, name: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastname">Apellido</Label>
                                            <Input
                                                id="lastname"
                                                value={user.lastname}
                                                onChange={(e) => setUser({...user, lastname: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Correo Electrónico</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={user.email}
                                                onChange={(e) => setUser({...user, email: e.target.value})}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="rut">RUT</Label>
                                            <Input
                                                id="rut"
                                                value={user.rut}
                                                onChange={(e) => setUser({...user, rut: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <Button className="mt-4" type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Actualizando...
                                            </>
                                        ) : (
                                            <>
                                                <User className="mr-2 h-4 w-4" />
                                                Guardar Cambios
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cambiar Contraseña</CardTitle>
                                <CardDescription>
                                    Asegúrate de que tu nueva contraseña sea segura y única.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form onSubmit={handlePasswordChange}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current-password">Contraseña Actual</Label>
                                            <Input
                                                id="current-password"
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="new-password">Nueva Contraseña</Label>
                                            <Input
                                                id="new-password"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                                            <Input
                                                id="confirm-password"
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <Button className="mt-4" type="submit" disabled={isLoading}>
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Cambiando...
                                            </>
                                        ) : (
                                            <>
                                                <Lock className="mr-2 h-4 w-4" />
                                                Cambiar Contraseña
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}

