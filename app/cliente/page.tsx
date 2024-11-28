'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { GiftCard } from '@/components/ui/icons'
import { GiftCardSkeleton } from '@/components/loading-skeleton'

// Simulación de datos de gift card
const giftCardData = {
  id: '1234',
  balance: 1.93,
  transactions: [
    { date: '2023-05-15', establishment: 'Tienda de Ropa XYZ', amount: 25.99 },
    { date: '2023-06-02', establishment: 'Restaurante Gourmet', amount: 45.50 },
    { date: '2023-06-20', establishment: 'Librería Cultural', amount: 18.75 },
  ]
}

export default function ClienteView() {
  const [giftCardId, setGiftCardId] = useState('')
  const [giftCard, setGiftCard] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e:object) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulamos una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (giftCardId === giftCardData.id) {
      setGiftCard(giftCardData)
    } else {
      setGiftCard(null)
    }
    setIsLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex justify-center">
          <GiftCard className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Consulta de Tarjeta de Regalo</h1>
        <p className="text-muted-foreground">
          Ingrese el código de su tarjeta de regalo para ver el saldo disponible y el historial de uso
        </p>
      </motion.div>

      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={giftCardId}
                onChange={(e) => setGiftCardId(e.target.value)}
                placeholder="Ingrese el código de la tarjeta"
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                Consultar
              </Button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6"
              >
                <GiftCardSkeleton />
              </motion.div>
            ) : giftCard ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 space-y-6"
              >
                <div className="text-center p-6 bg-accent rounded-lg">
                  <p className="text-sm text-muted-foreground">Saldo Disponible</p>
                  <motion.p 
                    className="text-4xl font-bold text-primary"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                  >
                    $ {giftCard.balance.toFixed(2)}
                  </motion.p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </span>
                    Historial de Uso
                  </h3>
                  <div className="space-y-3">
                    {giftCard.transactions.map((transaction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-3 rounded-lg hover:bg-accent transition-colors"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">{transaction.establishment}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <p className="font-semibold">${transaction.amount.toFixed(2)}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  Para cualquier consulta, por favor contacte a nuestro servicio al cliente.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}

