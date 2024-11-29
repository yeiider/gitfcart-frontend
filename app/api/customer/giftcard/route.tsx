import { getCustomerGiftcard } from "@/repositories/giftcardRepository";
import { User } from "@/app/interfaces/userInterface";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
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

        const { searchParams } = new URL(request.url);
        const giftCardId = searchParams.get("id");

        if (!giftCardId) {
            return NextResponse.json(
                { error: "Gift Card ID is required" },
                { status: 400 }
            );
        }

        const giftcardResponse = await getCustomerGiftcard(user.documentId, token, giftCardId);
        console.log(giftcardResponse);
        if (!giftcardResponse || giftcardResponse.documentId !== giftCardId) {
            return NextResponse.json(
                { error: "Gift Card not found" },
                { status: 404 }
            );
        }

        // Formatear la respuesta de la Gift Card
        const formattedGiftCard = {
            id: giftcardResponse.uniqueIdentifier,
            documentId: giftcardResponse.documentId,
            name: giftcardResponse.name,
            acquiredDate: giftcardResponse.createdAt.split("T")[0],
            balance: giftcardResponse.Balance.currentBalance,
            initialBalance: giftcardResponse.Balance.initialBalance,
            currency: giftcardResponse.Balance.currency,
            expirationDate: giftcardResponse.expirationDate,
            company: giftcardResponse.company.name,
            consumptionHistories: giftcardResponse.consumption_histories.map((history) => ({
                date: history.date,
                amount: history.amount,
                remainingBalance: history.remainingBalance,
            })),
        };

        return NextResponse.json(formattedGiftCard, { status: 200 });
    } catch (e) {
        console.error("Error fetching gift card data:", e);

        return NextResponse.json(
            { error: "An error occurred while fetching gift card data" },
            { status: 500 }
        );
    }
}
