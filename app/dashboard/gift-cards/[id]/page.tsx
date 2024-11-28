'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CreditCard, Calendar, DollarSign } from 'lucide-react'

// Simulación de datos de la gift card
const giftCardData = {
  id: 'GC-001',
  balance: 75.50,
  initialBalance: 100.00,
  expirationDate: '2024-12-31',
  purchaseDate: '2024-01-15',
}

export default function GiftCardDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [giftCard, setGiftCard] = useState(null)

  useEffect(() => {
    // Simular una llamada a la API para obtener los detalles de la gift card
    const fetchGiftCardDetails = async () => {
      // En una aplicación real, aquí se haría una llamada a la API con el ID
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simular delay de red
      setGiftCard(giftCardData)
    }

    fetchGiftCardDetails()
  }, [params.id])

  if (!giftCard) {
    return <div className="flex justify-center items-center h-screen">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Detalles de Gift Card</h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              Gift Card #{giftCard.id}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Fecha de Compra
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{giftCard.purchaseDate}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Fecha de Vencimiento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{giftCard.expirationDate}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Saldo Inicial
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${giftCard.initialBalance.toFixed(2)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Saldo Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">${giftCard.balance.toFixed(2)}</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button>Ver Historial de Transacciones</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

