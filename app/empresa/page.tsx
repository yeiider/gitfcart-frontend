'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, CheckCircle, XCircle, CreditCard, DollarSign, Store } from 'lucide-react'
import { GiftCardSkeleton } from '@/components/loading-skeleton'

// Simulación de datos de gift card
let giftCardData = {
  id: '1234',
  balance: 100,
  lastUsed: '2023-06-25',
  transactions: [
    { date: '2023-05-15', amount: -20, description: 'Compra en Tienda A' },
    { date: '2023-06-02', amount: -30, description: 'Compra en Tienda B' },
  ]
}

export default function EmpresaView() {
  const [giftCardId, setGiftCardId] = useState('')
  const [amount, setAmount] = useState('')
  const [giftCard, setGiftCard] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', content: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: '', content: '' })
    
    // Simulamos una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (giftCardId === giftCardData.id) {
      setGiftCard(giftCardData)
    } else {
      setGiftCard(null)
      setMessage({ type: 'error', content: 'Gift Card no encontrada' })
    }
    setIsLoading(false)
  }

  const handleCharge = async () => {
    setIsLoading(true)
    setMessage({ type: '', content: '' })
    
    // Simulamos una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const chargeAmount = parseFloat(amount)
    if (isNaN(chargeAmount) || chargeAmount <= 0) {
      setMessage({ type: 'error', content: 'Por favor, ingrese un monto válido' })
    } else if (chargeAmount > giftCard.balance) {
      setMessage({ type: 'error', content: 'Saldo insuficiente en la Gift Card' })
    } else {
      giftCardData.balance -= chargeAmount
      setGiftCard({ ...giftCardData })
      setMessage({ type: 'success', content: `Cobro de $${chargeAmount.toFixed(2)} realizado con éxito` })
      setAmount('')
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
          <Store className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">Portal de Empresas</h1>
        <p className="text-muted-foreground">
          Gestione y cobre tarjetas de regalo en su negocio
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Buscar Gift Card</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                value={giftCardId}
                onChange={(e) => setGiftCardId(e.target.value)}
                placeholder="Ingrese el ID de la Gift Card"
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CreditCard className="mr-2 h-4 w-4" />}
                Buscar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {isLoading && !giftCard ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GiftCardSkeleton />
          </motion.div>
        ) : giftCard ? (
          <motion.div
            key="giftcard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Gift Card #{giftCard.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-accent rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Saldo actual</p>
                    <p className="text-2xl font-bold">${giftCard.balance.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Último uso</p>
                    <p className="text-lg">{giftCard.lastUsed}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Monto a cobrar
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="pl-8"
                      />
                    </div>
                    <Button onClick={handleCharge} disabled={isLoading || !amount}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Realizar Cobro
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Últimas transacciones</h3>
                  <div className="space-y-2">
                    {giftCard.transactions.map((transaction, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-2 rounded-md hover:bg-accent transition-colors"
                      >
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <p className="font-semibold">${Math.abs(transaction.amount).toFixed(2)}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {message.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
              {message.type === 'error' ? (
                <XCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertTitle>{message.type === 'error' ? 'Error' : 'Éxito'}</AlertTitle>
              <AlertDescription>{message.content}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

