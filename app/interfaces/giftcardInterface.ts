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
