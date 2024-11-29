import gql from 'graphql-tag';

export const GQL_GET_CUSTOMERS_GIFTCARDS = gql`
query Nodes($filters: GiftCardFiltersInput) {
  giftCards_connection(filters: $filters) {
    nodes {
      documentId
      createdAt
      name
      price
      expirationDate
      uniqueIdentifier
      company {
        name
      }
      Balance {
        initialBalance
        currentBalance
        currency
      }
      consumption_histories {
        documentId
        date
        amount
        remainingBalance
        createdAt
      }
      user {
        documentId
      }
    }
    pageInfo {
      total
      page
      pageSize
      pageCount
    }
  }
}`
export const GQL_GET_CUSTOMERS_GIFTCARD = gql`
query GiftCard($documentId: ID!) {
  giftCard(documentId: $documentId) {
    documentId
    createdAt
    name
    price
    expirationDate
    company {
      name
      documentId
    }
    Balance {
      id
      initialBalance
      currentBalance
      currency
    }
    consumption_histories {
      documentId
      date
      remainingBalance
      amount
      createdAt
      updatedAt
    }
  }
}`
