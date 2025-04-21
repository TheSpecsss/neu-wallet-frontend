/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      expiresAt\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation ConfirmVerification($email: String!, $code: String!) {\n    confirmVerification(email: $email, code: $code) {\n      id\n    }\n  }  \n": typeof types.ConfirmVerificationDocument,
    "\n  mutation Pay($cashierId: String!, $amount: Int!) {\n    pay(cashierId: $cashierId, amount: $amount) {\n      balance\n      createdAt\n      id\n    }\n  } \n": typeof types.PayDocument,
    "\n  mutation TopUp($receiverId: String!, $amount: Int!) {\n  topUp(receiverId: $receiverId, amount: $amount) {\n    balance\n    id\n    updatedAt\n  }\n}\n  ": typeof types.TopUpDocument,
    "\n  mutation UpdateUserAccountTypeByUserId($userId: String!, $accountType: String!) {\n  updateUserAccountTypeByUserId(userId: $userId, accountType: $accountType) {\n    accountType\n    updatedAt\n    name\n  }\n}\n": typeof types.UpdateUserAccountTypeByUserIdDocument,
    "mutation WithdrawBalance($topUpCashierId: String!, $amount: Int!){\n  withdrawBalance(topUpCashierId: $topUpCashierId, amount: $amount) {\n    balance\n  }\n}": typeof types.WithdrawBalanceDocument,
    "\n  mutation SetBalance($userId: String!, $balance: Int!) {\n  setBalance(userId: $userId, balance: $balance) {\n    balance\n    id\n    updatedAt\n  }\n}": typeof types.SetBalanceDocument,
    "\nmutation TransferBalanceByUserId($receiverId: String!, $amount: Int!) {\n  transferBalanceByUserId(receiverId: $receiverId, amount: $amount) {\n    receiverWallet {\n      balance\n      id\n      updatedAt\n    }\n    senderWallet {\n      id\n      updatedAt\n      balance\n    }\n  }\n}\n": typeof types.TransferBalanceByUserIdDocument,
    "\nmutation TransferBalanceByUserEmail($receiverEmail: String!, $amount: Int!) {\n  transferBalanceByUserEmail(receiverEmail: $receiverEmail, amount: $amount) {\n    receiverWallet {\n      balance\n    }\n  }\n}\n": typeof types.TransferBalanceByUserEmailDocument,
    "\n  query GetRecentTransactionsByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionsByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        amount\n        createdAt\n        id\n        receiverId\n        senderId\n        type\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n    }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": typeof types.GetRecentTransactionsByUserIdDocument,
    "\n  query GetUser  {\n    getUser  {\n        id\n        name\n        email\n        accountType\n        createdAt\n    }\n  }\n": typeof types.GetUserDocument,
    "\n  query GetUserBalanceByUserId {\n    getUserBalanceByUserId {\n      balance\n    }\n  }  \n": typeof types.GetUserBalanceByUserIdDocument,
    "\n  query GetUsersByPagination($perPage: Int!, $page: Int!) {\n    getUsersByPagination(perPage: $perPage, page: $page) {\n      users {\n        id\n        name\n        accountType\n        wallet {\n          balance\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": typeof types.GetUsersByPaginationDocument,
    "\n  query GetAuditLogsByPagination($perPage: Int!, $page: Int!) {\n  getAuditLogsByPagination(perPage: $perPage, page: $page) {\n    auditLogs {\n      actionType\n      createdAt\n      executor {\n        name\n        accountType\n      }\n      target {\n        name\n        accountType\n      }\n      changes {\n        key\n        values {\n          from\n          to\n        }\n      }\n    }\n    page\n    totalPages\n    hasNextPage\n    hasPreviousPage\n  }\n}": typeof types.GetAuditLogsByPaginationDocument,
};
const documents: Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      expiresAt\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation ConfirmVerification($email: String!, $code: String!) {\n    confirmVerification(email: $email, code: $code) {\n      id\n    }\n  }  \n": types.ConfirmVerificationDocument,
    "\n  mutation Pay($cashierId: String!, $amount: Int!) {\n    pay(cashierId: $cashierId, amount: $amount) {\n      balance\n      createdAt\n      id\n    }\n  } \n": types.PayDocument,
    "\n  mutation TopUp($receiverId: String!, $amount: Int!) {\n  topUp(receiverId: $receiverId, amount: $amount) {\n    balance\n    id\n    updatedAt\n  }\n}\n  ": types.TopUpDocument,
    "\n  mutation UpdateUserAccountTypeByUserId($userId: String!, $accountType: String!) {\n  updateUserAccountTypeByUserId(userId: $userId, accountType: $accountType) {\n    accountType\n    updatedAt\n    name\n  }\n}\n": types.UpdateUserAccountTypeByUserIdDocument,
    "mutation WithdrawBalance($topUpCashierId: String!, $amount: Int!){\n  withdrawBalance(topUpCashierId: $topUpCashierId, amount: $amount) {\n    balance\n  }\n}": types.WithdrawBalanceDocument,
    "\n  mutation SetBalance($userId: String!, $balance: Int!) {\n  setBalance(userId: $userId, balance: $balance) {\n    balance\n    id\n    updatedAt\n  }\n}": types.SetBalanceDocument,
    "\nmutation TransferBalanceByUserId($receiverId: String!, $amount: Int!) {\n  transferBalanceByUserId(receiverId: $receiverId, amount: $amount) {\n    receiverWallet {\n      balance\n      id\n      updatedAt\n    }\n    senderWallet {\n      id\n      updatedAt\n      balance\n    }\n  }\n}\n": types.TransferBalanceByUserIdDocument,
    "\nmutation TransferBalanceByUserEmail($receiverEmail: String!, $amount: Int!) {\n  transferBalanceByUserEmail(receiverEmail: $receiverEmail, amount: $amount) {\n    receiverWallet {\n      balance\n    }\n  }\n}\n": types.TransferBalanceByUserEmailDocument,
    "\n  query GetRecentTransactionsByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionsByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        amount\n        createdAt\n        id\n        receiverId\n        senderId\n        type\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n    }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": types.GetRecentTransactionsByUserIdDocument,
    "\n  query GetUser  {\n    getUser  {\n        id\n        name\n        email\n        accountType\n        createdAt\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetUserBalanceByUserId {\n    getUserBalanceByUserId {\n      balance\n    }\n  }  \n": types.GetUserBalanceByUserIdDocument,
    "\n  query GetUsersByPagination($perPage: Int!, $page: Int!) {\n    getUsersByPagination(perPage: $perPage, page: $page) {\n      users {\n        id\n        name\n        accountType\n        wallet {\n          balance\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": types.GetUsersByPaginationDocument,
    "\n  query GetAuditLogsByPagination($perPage: Int!, $page: Int!) {\n  getAuditLogsByPagination(perPage: $perPage, page: $page) {\n    auditLogs {\n      actionType\n      createdAt\n      executor {\n        name\n        accountType\n      }\n      target {\n        name\n        accountType\n      }\n      changes {\n        key\n        values {\n          from\n          to\n        }\n      }\n    }\n    page\n    totalPages\n    hasNextPage\n    hasPreviousPage\n  }\n}": types.GetAuditLogsByPaginationDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      expiresAt\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      expiresAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ConfirmVerification($email: String!, $code: String!) {\n    confirmVerification(email: $email, code: $code) {\n      id\n    }\n  }  \n"): (typeof documents)["\n  mutation ConfirmVerification($email: String!, $code: String!) {\n    confirmVerification(email: $email, code: $code) {\n      id\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Pay($cashierId: String!, $amount: Int!) {\n    pay(cashierId: $cashierId, amount: $amount) {\n      balance\n      createdAt\n      id\n    }\n  } \n"): (typeof documents)["\n  mutation Pay($cashierId: String!, $amount: Int!) {\n    pay(cashierId: $cashierId, amount: $amount) {\n      balance\n      createdAt\n      id\n    }\n  } \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation TopUp($receiverId: String!, $amount: Int!) {\n  topUp(receiverId: $receiverId, amount: $amount) {\n    balance\n    id\n    updatedAt\n  }\n}\n  "): (typeof documents)["\n  mutation TopUp($receiverId: String!, $amount: Int!) {\n  topUp(receiverId: $receiverId, amount: $amount) {\n    balance\n    id\n    updatedAt\n  }\n}\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserAccountTypeByUserId($userId: String!, $accountType: String!) {\n  updateUserAccountTypeByUserId(userId: $userId, accountType: $accountType) {\n    accountType\n    updatedAt\n    name\n  }\n}\n"): (typeof documents)["\n  mutation UpdateUserAccountTypeByUserId($userId: String!, $accountType: String!) {\n  updateUserAccountTypeByUserId(userId: $userId, accountType: $accountType) {\n    accountType\n    updatedAt\n    name\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation WithdrawBalance($topUpCashierId: String!, $amount: Int!){\n  withdrawBalance(topUpCashierId: $topUpCashierId, amount: $amount) {\n    balance\n  }\n}"): (typeof documents)["mutation WithdrawBalance($topUpCashierId: String!, $amount: Int!){\n  withdrawBalance(topUpCashierId: $topUpCashierId, amount: $amount) {\n    balance\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetBalance($userId: String!, $balance: Int!) {\n  setBalance(userId: $userId, balance: $balance) {\n    balance\n    id\n    updatedAt\n  }\n}"): (typeof documents)["\n  mutation SetBalance($userId: String!, $balance: Int!) {\n  setBalance(userId: $userId, balance: $balance) {\n    balance\n    id\n    updatedAt\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation TransferBalanceByUserId($receiverId: String!, $amount: Int!) {\n  transferBalanceByUserId(receiverId: $receiverId, amount: $amount) {\n    receiverWallet {\n      balance\n      id\n      updatedAt\n    }\n    senderWallet {\n      id\n      updatedAt\n      balance\n    }\n  }\n}\n"): (typeof documents)["\nmutation TransferBalanceByUserId($receiverId: String!, $amount: Int!) {\n  transferBalanceByUserId(receiverId: $receiverId, amount: $amount) {\n    receiverWallet {\n      balance\n      id\n      updatedAt\n    }\n    senderWallet {\n      id\n      updatedAt\n      balance\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nmutation TransferBalanceByUserEmail($receiverEmail: String!, $amount: Int!) {\n  transferBalanceByUserEmail(receiverEmail: $receiverEmail, amount: $amount) {\n    receiverWallet {\n      balance\n    }\n  }\n}\n"): (typeof documents)["\nmutation TransferBalanceByUserEmail($receiverEmail: String!, $amount: Int!) {\n  transferBalanceByUserEmail(receiverEmail: $receiverEmail, amount: $amount) {\n    receiverWallet {\n      balance\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRecentTransactionsByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionsByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        amount\n        createdAt\n        id\n        receiverId\n        senderId\n        type\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n    }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"): (typeof documents)["\n  query GetRecentTransactionsByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionsByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        amount\n        createdAt\n        id\n        receiverId\n        senderId\n        type\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n    }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser  {\n    getUser  {\n        id\n        name\n        email\n        accountType\n        createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetUser  {\n    getUser  {\n        id\n        name\n        email\n        accountType\n        createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserBalanceByUserId {\n    getUserBalanceByUserId {\n      balance\n    }\n  }  \n"): (typeof documents)["\n  query GetUserBalanceByUserId {\n    getUserBalanceByUserId {\n      balance\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsersByPagination($perPage: Int!, $page: Int!) {\n    getUsersByPagination(perPage: $perPage, page: $page) {\n      users {\n        id\n        name\n        accountType\n        wallet {\n          balance\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"): (typeof documents)["\n  query GetUsersByPagination($perPage: Int!, $page: Int!) {\n    getUsersByPagination(perPage: $perPage, page: $page) {\n      users {\n        id\n        name\n        accountType\n        wallet {\n          balance\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAuditLogsByPagination($perPage: Int!, $page: Int!) {\n  getAuditLogsByPagination(perPage: $perPage, page: $page) {\n    auditLogs {\n      actionType\n      createdAt\n      executor {\n        name\n        accountType\n      }\n      target {\n        name\n        accountType\n      }\n      changes {\n        key\n        values {\n          from\n          to\n        }\n      }\n    }\n    page\n    totalPages\n    hasNextPage\n    hasPreviousPage\n  }\n}"): (typeof documents)["\n  query GetAuditLogsByPagination($perPage: Int!, $page: Int!) {\n  getAuditLogsByPagination(perPage: $perPage, page: $page) {\n    auditLogs {\n      actionType\n      createdAt\n      executor {\n        name\n        accountType\n      }\n      target {\n        name\n        accountType\n      }\n      changes {\n        key\n        values {\n          from\n          to\n        }\n      }\n    }\n    page\n    totalPages\n    hasNextPage\n    hasPreviousPage\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;