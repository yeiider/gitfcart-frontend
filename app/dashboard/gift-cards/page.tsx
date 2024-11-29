'use client'

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Search } from 'lucide-react';
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface GiftCard {
    documentId: string;
    id: string;
    name: string;
    acquiredDate: string; // Formato de fecha "YYYY-MM-DD"
    balance: number; // Saldo actual de la tarjeta
    initialBalance: number; // Saldo inicial de la tarjeta
    currency: string; // Código de moneda (por ejemplo, CLP)
    company: string; // Nombre de la empresa emisora
}

interface GiftCardSummary {
    totalActiveGiftCards: number; // Total de tarjetas activas
    totalBalance: number; // Balance total de todas las tarjetas
    recentGiftCards: GiftCard[]; // Lista de tarjetas recientes
    transactionCount: number; // Cantidad de transacciones realizadas
}

export default function GiftCardsPage() {
    const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGiftCards = async () => {
            try {
                const response = await fetch('/api/customer/giftcards', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                setGiftCards(data.recentGiftCards); // Usar el formato de datos del API
            } catch (error) {
                console.error('Error fetching gift cards:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGiftCards();
    }, []);

    if (loading) {
        return <GiftCardsSkeleton />;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mis Gift Cards</h1>
                <p className="text-muted-foreground">
                    Administra todas tus Gift Cards desde aquí
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar Gift Card por ID..."
                        className="pl-10"
                    />
                </div>
                <Button>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Agregar Gift Card
                </Button>
            </div>

            <div className="grid gap-4">
                {giftCards.map((card) => (
                    <Card key={card.id}>
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <CreditCard className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{card.name}</CardTitle>
                                        <div className="text-sm text-muted-foreground">
                                            Adquirida el {card.acquiredDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-semibold text-lg">
                                        {card.currency} ${card.balance.toFixed(2)}
                                    </div>
                                    <div className={`text-sm ${
                                        card.balance > 0 ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                        {card.balance > 0 ? 'Activa' : 'Agotada'}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="border-t p-4">
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                    Ver Historial
                                </Button>
                                <Link href={`/dashboard/gift-cards/${card.documentId}`}>
                                    <Button size="sm">
                                        Ver Detalles
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function GiftCardsSkeleton() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-48 mt-2" />
            </div>
            <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-64" />
                <Skeleton className="h-10 w-32" />
            </div>
            <div className="grid gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <div>
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-4 w-24 mt-1" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-4 w-12 mt-1" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="border-t p-4">
                            <div className="flex justify-end gap-2">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-8 w-24" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
