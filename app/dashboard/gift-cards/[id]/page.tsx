'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Calendar, DollarSign } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface GiftCard {
  id: string;
  documentId: string;
  balance: number;
  initialBalance: number;
  expirationDate: string;
  purchaseDate: string;
  companyName: string;
}

function GiftCardSkeleton() {
  return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-32" />
                    </CardContent>
                  </Card>
              ))}
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-48" />
            </div>
          </CardContent>
        </Card>
      </div>
  );
}

export default function GiftCardDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [giftCard, setGiftCard] = useState<GiftCard | null>(null); // Estado con el tipo GiftCard | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGiftCardDetails = async () => {
      try {
        const response = await fetch(`/api/customer/giftcard?id=${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch Gift Card details");
        const data = await response.json();
        setGiftCard({
          id: data.id,
          documentId:data.documentId,
          balance: data.balance,
          initialBalance: data.initialBalance,
          expirationDate: data.expirationDate,
          purchaseDate: data.acquiredDate,
          companyName: data.company,
        });
      } catch (error) {
        console.error("Error fetching Gift Card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGiftCardDetails();
  }, [params.id]);

  if (loading) {
    return <GiftCardSkeleton />;
  }

  if (!giftCard) {
    return (
        <div className="text-center">
          <p className="text-red-500">No se pudo encontrar la Gift Card.</p>
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </div>
    );
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
                <Link href={`/dashboard/gift-cards/${giftCard.documentId}/history`}>
                  <Button>Ver Historial de Transacciones</Button>
                </Link>

              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
  );
}
