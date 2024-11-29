'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {  CreditCard, Zap, ShoppingBag } from 'lucide-react'

export default function Home() {
  return (
     <>
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className="flex flex-col justify-center space-y-4 text-white">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Regala Felicidad con Nuestras GiftCards
                    </h1>
                    <p className="max-w-[600px] text-gray-200 md:text-xl">
                      Sorprende a tus seres queridos con el regalo perfecto. Nuestras giftcards son la opción ideal para cualquier ocasión.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
                      Comprar ahora
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-pink-600">
                      Saber más
                    </Button>
                  </div>
                </div>
                <Image
                    alt="Gift Cards"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    height="550"
                    src="/placeholder.svg?height=550&width=550"
                    width="550"
                />
              </div>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Características de Nuestras GiftCards</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <CreditCard className="h-12 w-12 text-pink-500" />
                    <h3 className="text-xl font-bold">Flexibilidad Total</h3>
                    <p className="text-center text-gray-500">Úsalas en miles de tiendas asociadas o canjea por efectivo.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <Zap className="h-12 w-12 text-yellow-500" />
                    <h3 className="text-xl font-bold">Entrega Instantánea</h3>
                    <p className="text-center text-gray-500">Envío inmediato por email o mensaje de texto.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex flex-col items-center space-y-4 p-6">
                    <ShoppingBag className="h-12 w-12 text-green-500" />
                    <h3 className="text-xl font-bold">Personalización</h3>
                    <p className="text-center text-gray-500">Añade un mensaje personal y elige el diseño que más te guste.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Cómo Funciona</h2>
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="flex flex-col items-center space-y-2 border-r border-gray-200 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 text-white">1</div>
                  <h3 className="text-xl font-bold">Elige el Monto</h3>
                  <p className="text-center text-gray-500">Selecciona la cantidad que deseas regalar.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-r border-gray-200 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white">2</div>
                  <h3 className="text-xl font-bold">Personaliza</h3>
                  <p className="text-center text-gray-500">Añade un mensaje y elige el diseño de la tarjeta.</p>
                </div>
                <div className="flex flex-col items-center space-y-2 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">3</div>
                  <h3 className="text-xl font-bold">Envía</h3>
                  <p className="text-center text-gray-500">Elige cómo quieres entregar tu regalo: email o mensaje de texto.</p>
                </div>
              </div>
            </div>
          </section>
          <section id="buy-now" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-pink-500 to-purple-500">
            <div className="container px-4 md:px-6 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white mb-6">¡Regala Felicidad Hoy!</h2>
              <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl mb-8">
                No esperes más para sorprender a tus seres queridos con el regalo perfecto. Nuestras giftcards son la opción ideal para cualquier ocasión.
              </p>
              <Button size="lg" className="bg-white text-pink-500 hover:bg-gray-100">
                Comprar GiftCard Ahora
              </Button>
            </div>
          </section>


     </>
  )
}

