'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Loader2, Eye, EyeOff } from 'lucide-react'

interface FormData {
  username: string
  password: string
  confirmPassword: string
  email: string
  name: string
  lastName: string
  rut: string
}

interface ErrorState {
  [key: string]: string | undefined
}

const validateRUT = (rut: string): boolean => {
  const cleanRut = rut.replace(/\./g, '').replace('-', '')
  const body = cleanRut.slice(0, -1)
  const dv = cleanRut.slice(-1).toUpperCase()

  let sum = 0
  let multiplier = 2

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier
    multiplier = multiplier === 7 ? 2 : multiplier + 1
  }

  const calculatedDV = 11 - (sum % 11)
  const expectedDV = calculatedDV === 11 ? '0' : calculatedDV === 10 ? 'K' : calculatedDV.toString()

  return expectedDV === dv
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    lastName: '',
    rut: ''
  })
  const [errors, setErrors] = useState<ErrorState>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const router = useRouter()

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {}

    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio'
    if (!formData.password || formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido'
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio'
    if (!formData.lastName.trim()) newErrors.lastname = 'El apellido es obligatorio'
    if (!formData.rut.trim() || !validateRUT(formData.rut)) newErrors.rut = 'El RUT no es válido (ejemplo: 12345678-9)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result: { success: boolean; error?: string } = await response.json()

      if (response.ok && result.success) {
        router.push('/dashboard')
      } else {
        setErrors({ api: result.error || 'Ocurrió un error en el registro' })
      }
    } catch (error) {
      console.error('Error en el registro:', error)
      setErrors({ api: 'Error al conectar con el servidor. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Registro</CardTitle>
              <CardDescription>Crea una nueva cuenta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {errors.api && (
                      <p className="text-red-500 text-sm mb-2">{errors.api}</p>
                  )}
                  {[
                    { name: 'username', label: 'Nombre de Usuario' },
                    { name: 'email', label: 'Correo Electrónico' },
                    { name: 'name', label: 'Nombre' },
                    { name: 'lastName', label: 'Apellido' },
                    { name: 'rut', label: 'RUT' }
                  ].map(({ name, label }) => (
                      <div className="flex flex-col space-y-1.5" key={name}>
                        <Label htmlFor={name}>{label}</Label>
                        <Input
                            id={name}
                            name={name}
                            type="text"
                            placeholder={`Ingresa tu ${label.toLowerCase()}`}
                            value={formData[name as keyof FormData]}
                            onChange={handleChange}
                            required
                        />
                        {errors[name] && (
                            <p className="text-red-500 text-sm">{errors[name]}</p>
                        )}
                      </div>
                  ))}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Ingresa tu contraseña"
                          value={formData.password}
                          onChange={handleChange}
                          required
                      />
                      <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => togglePasswordVisibility('password')}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <div className="relative">
                      <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirma tu contraseña"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                      />
                      <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => togglePasswordVisibility('confirmPassword')}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>
                <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                  {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando
                      </>
                  ) : (
                      'Registrarse'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                ¿Ya tienes una cuenta?{' '}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
  )
}
