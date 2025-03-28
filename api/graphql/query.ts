import { gql } from "./codegen";

export const GET_RECENT_TRANSACTIONS_BY_USER_ID = gql(`
  query GetRecentTransactionsByUserId($perPage: Int!, $page: Int!) {
    getRecentTransactionsByUserId(perPage: $perPage, page: $page) {
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

export const GET_USERS_BY_PAGINATION = gql(`
  query GetUsersByPagination($perPage: Int!, $page: Int!) {
    getUsersByPagination(perPage: $perPage, page: $page) {
      users {
        id
        name
        accountType
        wallet {
          balance
        }
      }
      page
      totalPages
      hasNextPage
      hasPreviousPage
    }
  }
`);