import {getCustomerGiftcard, getCustomerGiftcards} from "@/repositories/giftcardRepository";
import { User } from "@/app/interfaces/userInterface";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("jwt")?.value;
        if (!token) {
            return NextResponse.json(
                { error: "No authentication token found" },
                { status: 401 }
            );
        }
        const user: User = JSON.parse(cookieStore.get("user")?.value as string);

        if (!user) {
            return NextResponse.json(
                { error: "User information is not available" },
                { status: 401 }
            );
        }

        const giftcardResponse = await getCustomerGiftcards(user.documentId, token);

        if (!giftcardResponse || giftcardResponse.nodes.length === 0) {
            return NextResponse.json(
                { error: "No gift cards found for this user" },
                { status: 404 }
            );
        }

        // Formatear los datos para adaptarlos a la estructura requerida por la interfaz
        const formattedData = {
            totalActiveGiftCards: giftcardResponse.nodes.length,
            totalBalance: giftcardResponse.nodes.reduce((acc, card) => acc + card.Balance.currentBalance, 0),
            recentGiftCards: giftcardResponse.nodes.map((card) => ({
                documentId: card.documentId,
                id: card.uniqueIdentifier,
                name: card.name,
                acquiredDate: card.createdAt.split("T")[0],
                balance: card.Balance.currentBalance,
                initialBalance: card.Balance.initialBalance,
                currency: card.Balance.currency,
                company: card.company.name,
            })),
            transactionCount: giftcardResponse.nodes.reduce(
                (acc, card) => acc + (card.consumption_histories?.length || 0),
                0
            ),
        };

        return NextResponse.json(formattedData, { status: 200 });
    } catch (e) {
        console.error("Error fetching gift card data:", e);

        return NextResponse.json(
            { error: "An error occurred while fetching gift card data" },
            { status: 500 }
        );
    }
}
