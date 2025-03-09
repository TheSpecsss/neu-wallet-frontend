/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuditLog = {
  __typename?: 'AuditLog';
  actionType: Scalars['String']['output'];
  changes?: Maybe<Array<Maybe<AuditLogChange>>>;
  createdAt: Scalars['String']['output'];
  executor?: Maybe<User>;
  executorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  target?: Maybe<User>;
  targetId: Scalars['ID']['output'];
};

export type AuditLogChange = {
  __typename?: 'AuditLogChange';
  key?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<AuditLogChangeValue>>>;
};

export type AuditLogChangeValue = {
  __typename?: 'AuditLogChangeValue';
  from?: Maybe<Scalars['String']['output']>;
  to?: Maybe<Scalars['String']['output']>;
};

export type AuditLogHydrateOption = {
  executor: Scalars['Boolean']['input'];
  target: Scalars['Boolean']['input'];
};

export type Login = {
  __typename?: 'Login';
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmVerification?: Maybe<Verification>;
  login?: Maybe<Login>;
  register?: Maybe<User>;
  resendVerification?: Maybe<Verification>;
};


export type MutationConfirmVerificationArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationResendVerificationArgs = {
  email: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getRecentTransactionByUserId?: Maybe<TransactionByUserIdWithPagination>;
  getUserBalanceByUserId?: Maybe<UserBalance>;
};


export type QueryGetRecentTransactionByUserIdArgs = {
  hydrate?: InputMaybe<TransactionHydrateOption>;
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  receiver?: Maybe<User>;
  receiverId: Scalars['ID']['output'];
  sender?: Maybe<User>;
  senderId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
};

export type TransactionByUserIdWithPagination = {
  __typename?: 'TransactionByUserIdWithPagination';
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  page?: Maybe<Scalars['Int']['output']>;
  totalPages?: Maybe<Scalars['Int']['output']>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};

export type TransactionHydrateOption = {
  receiver: Scalars['Boolean']['input'];
  sender: Scalars['Boolean']['input'];
};

export type User = {
  __typename?: 'User';
  accountType: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isDeleted: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  receivedTransactions?: Maybe<Array<Maybe<Transaction>>>;
  sentTransactions?: Maybe<Array<Maybe<Transaction>>>;
  updatedAt: Scalars['String']['output'];
  wallet?: Maybe<Wallet>;
};

export type UserBalance = {
  __typename?: 'UserBalance';
  balance?: Maybe<Scalars['Float']['output']>;
};

export type UserHydrateOption = {
  receivedTransactions: Scalars['Boolean']['input'];
  sentTransactions: Scalars['Boolean']['input'];
  wallet: Scalars['Boolean']['input'];
};

export type Verification = {
  __typename?: 'Verification';
  code: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  expiredAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type Wallet = {
  __typename?: 'Wallet';
  balance: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isDeleted: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Login', token?: string | null } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string } | null };

export type GetRecentTransactionByUserIdQueryVariables = Exact<{
  perPage: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetRecentTransactionByUserIdQuery = { __typename?: 'Query', getRecentTransactionByUserId?: { __typename?: 'TransactionByUserIdWithPagination', page?: number | null, totalPages?: number | null, hasNextPage?: boolean | null, hasPreviousPage?: boolean | null, transactions?: Array<{ __typename?: 'Transaction', id: string, amount: number, createdAt: string, receiver?: { __typename?: 'User', name: string } | null, sender?: { __typename?: 'User', name: string } | null } | null> | null } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const GetRecentTransactionByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecentTransactionByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRecentTransactionByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]} as unknown as DocumentNode<GetRecentTransactionByUserIdQuery, GetRecentTransactionByUserIdQueryVariables>;