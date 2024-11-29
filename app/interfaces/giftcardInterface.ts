export interface GiftCardResponse {

        nodes: GiftCard[];
        pageInfo: PageInfo;
}

export interface GiftCard {
    documentId: string;
    createdAt: string;
    name: string;
    price: number;
    expirationDate: string;
    uniqueIdentifier: string;
    company: {
        name: string;
        documentId: string;
    };
    Balance: Balance;
    consumption_histories: ConsumptionHistory[];
}

export interface Balance {
    id:string;
    initialBalance: number;
    currentBalance: number;
    currency: string;
}

export interface ConsumptionHistory {
    documentId: string;
    date: string;
    amount: number;
    remainingBalance: number;
    createdAt: string;
}

export interface PageInfo {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
}


export interface GiftCardParser {
    documentId: string;
    id: string;
    name: string;
    acquiredDate: string; // Formato de fecha "YYYY-MM-DD"
    balance: number; // Saldo actual de la tarjeta
    initialBalance: number; // Saldo inicial de la tarjeta
    currency: string; // Código de moneda (por ejemplo, CLP)
    company: string; // Nombre de la empresa emisora
}

export interface GiftCardSummary {
    totalActiveGiftCards: number; // Total de tarjetas activas
    totalBalance: number; // Balance total de todas las tarjetas
    recentGiftCards: GiftCardParser[]; // Lista de tarjetas recientes
    transactionCount: number; // Cantidad de transacciones realizadas
}