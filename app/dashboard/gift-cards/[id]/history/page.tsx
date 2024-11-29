'use client'

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, CreditCard, DollarSign, Calendar } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
    id: number;
    date: string;
    amount: number;
    type: string;
}

interface GiftCard {
    id: string;
    balance: number;
    initialBalance: number;
    expirationDate: string;
    transactions: Transaction[];
}

function GiftCardSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-64" />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {[1, 2, 3].map((i) => (
                                    <TableHead key={i}>
                                        <Skeleton className="h-4 w-24" />
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[1, 2, 3].map((i) => (
                                <TableRow key={i}>
                                    {[1, 2, 3].map((j) => (
                                        <TableCell key={j}>
                                            <Skeleton className="h-4 w-20" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default function GiftCardHistoryPage() {
    const router = useRouter();
    const params = useParams();
    const [giftCard, setGiftCard] = useState<GiftCard | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchGiftCardDetails = async () => {
            try {
                const response = await fetch(`/api/customer/giftcard?id=${params.id}`);
                if (!response.ok) throw new Error("Failed to fetch Gift Card details");
                const data = await response.json();

                setGiftCard({
                    id: data.id,
                    balance: data.balance,
                    initialBalance: data.initialBalance,
                    expirationDate: data.expirationDate,
                    transactions: data.consumptionHistories.map((history:Transaction, index: number) => ({
                        id: index + 1,
                        date: history.date,
                        amount: history.amount,
                        type: history.amount > 0 ? 'Recarga' : 'Compra',
                    })),
                });
            } catch (error) {
                console.error("Error fetching Gift Card:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGiftCardDetails();
    }, [params.id]);

    if (isLoading) {
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
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Historial de Gift Card</h1>
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                </Button>
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
                        <div className="grid gap-4 md:grid-cols-3">
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
                                        <Calendar className="h-4 w-4" />
                                        Fecha de Vencimiento
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-2xl font-bold">{giftCard.expirationDate}</p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Historial de Transacciones</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Tipo</TableHead>
                                            <TableHead className="text-right">Monto</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {giftCard.transactions.map((transaction) => (
                                            <TableRow key={transaction.id}>
                                                <TableCell>{transaction.date}</TableCell>
                                                <TableCell>{transaction.type}</TableCell>
                                                <TableCell
                                                    className={`text-right ${
                                                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                                                    }`}
                                                >
                                                    ${Math.abs(transaction.amount).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
