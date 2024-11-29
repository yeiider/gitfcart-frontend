'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, History } from 'lucide-react';
import { useEffect, useState } from 'react';
import {Skeleton} from "@/components/ui/skeleton";
import {GiftCardSummary} from "@/app/interfaces/giftcardInterface";


function DashboardSkeleton() {
  return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>

        {/* Cards Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </CardContent>
              </Card>
          ))}
        </div>

        {/* Recent Gift Cards */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                  <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<GiftCardSummary | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customer/giftcards', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result); // Set the fetched data in state
      } catch (error) {
        console.error('Error fetching gift cards:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <DashboardSkeleton/>;
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido a tu panel de control de Gift Cards
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gift Cards Activas
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalActiveGiftCards}</div>
              <p className="text-xs text-muted-foreground">
                +1 desde el mes pasado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data.totalBalance.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                En todas tus Gift Cards
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Últimas Transacciones
              </CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.transactionCount}</div>
              <p className="text-xs text-muted-foreground">
                En los últimos 30 días
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Gift Cards Recientes</CardTitle>
            <CardDescription>
              Tus últimas Gift Cards adquiridas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentGiftCards.map((card) => (
                  <div
                      key={card.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{card.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Adquirida el {card.acquiredDate}
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold">
                      {card.currency} ${card.balance.toFixed(2)}
                    </div>
                  </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
