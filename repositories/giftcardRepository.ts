import createApolloClient from "@/app/apollo-client";
import {GQL_GET_CUSTOMERS_GIFTCARD, GQL_GET_CUSTOMERS_GIFTCARDS} from "@/query-graphql/giftcard";
import {GiftCard, GiftCardResponse} from "@/app/interfaces/giftcardInterface";

export async function getCustomerGiftcards(documentId:string,token:string): Promise<GiftCardResponse> {

    const {data} = await createApolloClient.query({
        query: GQL_GET_CUSTOMERS_GIFTCARDS,
        fetchPolicy: "no-cache",
        context: {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        variables: {
            filters:{
                user: {
                    documentId: {
                        eq: documentId
                    }
                }
            }
        }

    });

    return data.giftCards_connection as GiftCardResponse;
}

export async function getCustomerGiftcard(documentId:string,token:string, giftCardId:string): Promise<GiftCard> {

    const {data} = await createApolloClient.query({
        query: GQL_GET_CUSTOMERS_GIFTCARD,
        fetchPolicy: "no-cache",
        context: {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        },
        variables: {
            documentId: giftCardId,
            user: {
                documentId: {
                    eq: documentId
                }
            }
        }

    });

    return data.giftCard as GiftCard;
}