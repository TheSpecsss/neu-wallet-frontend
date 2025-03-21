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
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  query GetRecentTransactionByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        id\n        amount\n        createdAt\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": typeof types.GetRecentTransactionByUserIdDocument,
};
const documents: Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n": types.RegisterDocument,
    "\n  query GetRecentTransactionByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        id\n        amount\n        createdAt\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n": types.GetRecentTransactionByUserIdDocument,
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
export function gql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {\n    register(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetRecentTransactionByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        id\n        amount\n        createdAt\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"): (typeof documents)["\n  query GetRecentTransactionByUserId($perPage: Int!, $page: Int!) {\n    getRecentTransactionByUserId(perPage: $perPage, page: $page) {\n      transactions {\n        id\n        amount\n        createdAt\n        receiver {\n          name\n        }\n        sender {\n          name\n        }\n      }\n      page\n      totalPages\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;