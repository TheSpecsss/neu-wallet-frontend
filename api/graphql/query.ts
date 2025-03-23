import { gql } from "./codegen";

export const GET_RECENT_TRANSACTIONS_BY_USER_ID = gql(`
  query getRecentTransactionByUserId($perPage: Int!, $page: Int!) {
    getRecentTransactionByUserId(perPage: $perPage, page: $page) {
      transactions {
        id
        amount
        createdAt
        receiver {
          name
        }
        sender {
          name
        }
      }
      page
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`);

export const GET_USER = gql(`
  query GetUser  {
    getUser  {
        id
        name
        email
        accountType
        createdAt
    }
  }
`);

export const GET_USER_BALANCE = gql(`
  query GetUserBalanceByUserId {
    getUserBalanceByUserId {
      balance
    }
  }  
`);
