import { gql } from "./codegen";

export const GET_RECENT_TRANSACTION_BY_USER_ID = gql(`
  query GetRecentTransactionByUserId($perPage: Int!, $page: Int!) {
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
