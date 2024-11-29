export interface User {
    id?: number;
    documentId?: string;
    username?: string;
    email?: string;
    provider?: string;
    confirmed?: boolean;
    blocked?: boolean;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    name?: string;
    lastName?: string;
    rut?: string;
}
