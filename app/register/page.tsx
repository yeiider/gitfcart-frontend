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
  lastname: string
  rut: string
}

interface ErrorState {
  [key: string]: string | undefined
}

// Etiquetas traducidas
const fieldLabels: { [key in keyof FormData]: string } = {
  username: 'Nombre de usuario',
  password: 'Contraseña',
  confirmPassword: 'Confirmar contraseña',
  email: 'Correo electrónico',
  name: 'Nombre',
  lastname: 'Apellido',
  rut: 'RUT'
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    name: '',
    lastname: '',
    rut: ''
  })
  const [errors, setErrors] = useState<ErrorState>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const router = useRouter()

  const isValidChileanRUT = (rut: string): boolean => {
    if (!/^\d{1,8}-[\dkK]$/.test(rut)) return false; // Validar formato básico

    const [numberPart, verifier] = rut.split('-');
    const digits = numberPart.split('').reverse().map(Number);

    let sum = 0;
    let multiplier = 2;

    for (const digit of digits) {
      sum += digit * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const remainder = sum % 11;
    const calculatedVerifier = 11 - remainder === 11 ? '0' : 11 - remainder === 10 ? 'K' : (11 - remainder).toString();

    return calculatedVerifier.toUpperCase() === verifier.toUpperCase();
  };


  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};

    if (!formData.username.trim()) newErrors.username = 'El nombre de usuario es obligatorio';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'El correo electrónico no es válido';
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.lastname.trim()) newErrors.lastname = 'El apellido es obligatorio';

    if (!formData.rut.trim() || !isValidChileanRUT(formData.rut)) {
      newErrors.rut = 'El RUT no es válido (formato: 12345678-9 y dígito verificador correcto)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


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
                  {Object.keys(formData).map((field) => (
                      <div className="flex flex-col space-y-1.5" key={field}>
                        <Label htmlFor={field}>
                          {fieldLabels[field as keyof FormData]}
                        </Label>
                        <Input
                            id={field}
                            name={field}
                            type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                            placeholder={`Ingresa tu ${fieldLabels[field as keyof FormData].toLowerCase()}`}
                            value={formData[field as keyof FormData]}
                            onChange={handleChange}
                            required
                        />
                        {errors[field] && (
                            <p className="text-red-500 text-sm">{errors[field]}</p>
                        )}
                      </div>
                  ))}
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
