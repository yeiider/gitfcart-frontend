import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h1 className="text-4xl font-bold text-center">Bienvenido a GiftCard Pro</h1>
      <p className="text-xl text-center text-gray-600 max-w-2xl">
        La plataforma líder para gestionar y utilizar tarjetas de regalo en múltiples negocios.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Para Clientes</CardTitle>
            <CardDescription>Consulta el saldo y el historial de tu tarjeta de regalo.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/cliente">
              <Button className="w-full">Acceder como Cliente</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Para Empresas</CardTitle>
            <CardDescription>Gestiona y cobra tarjetas de regalo en tu negocio.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/empresa">
              <Button className="w-full">Acceder como Empresa</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

