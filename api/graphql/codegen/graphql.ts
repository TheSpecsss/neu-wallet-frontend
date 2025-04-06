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
  changes?: Maybe<Array<AuditLogChange>>;
  createdAt: Scalars['String']['output'];
  executor?: Maybe<User>;
  executorId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  target?: Maybe<User>;
  targetId: Scalars['ID']['output'];
};

export type AuditLogChange = {
  __typename?: 'AuditLogChange';
  key: Scalars['String']['output'];
  values: Array<AuditLogChangeValue>;
};

export type AuditLogChangeValue = {
  __typename?: 'AuditLogChangeValue';
  from: Scalars['String']['output'];
  to: Scalars['String']['output'];
};

export type AuditLogHydrateOption = {
  executor: Scalars['Boolean']['input'];
  target: Scalars['Boolean']['input'];
};

export type AuditLogPagination = {
  __typename?: 'AuditLogPagination';
  auditLogs: Array<AuditLog>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Login = {
  __typename?: 'Login';
  expiresAt: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmVerification?: Maybe<Verification>;
  login?: Maybe<Login>;
  pay?: Maybe<Wallet>;
  register?: Maybe<User>;
  resendVerification?: Maybe<Verification>;
  setBalance?: Maybe<Wallet>;
  topUp?: Maybe<Wallet>;
  transferBalance?: Maybe<Wallet>;
  updateUserAccountTypeByUserId?: Maybe<User>;
  withdrawBalance?: Maybe<Wallet>;
};


export type MutationConfirmVerificationArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationPayArgs = {
  amount: Scalars['Int']['input'];
  cashierId: Scalars['String']['input'];
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


export type MutationSetBalanceArgs = {
  balance: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};


export type MutationTopUpArgs = {
  amount: Scalars['Int']['input'];
  receiverId: Scalars['String']['input'];
};


export type MutationTransferBalanceArgs = {
  amount: Scalars['Int']['input'];
  receiverId: Scalars['String']['input'];
};


export type MutationUpdateUserAccountTypeByUserIdArgs = {
  accountType: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationWithdrawBalanceArgs = {
  amount: Scalars['Int']['input'];
  topUpCashierId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAuditLogsByPagination?: Maybe<AuditLogPagination>;
  getRecentTransactionsByUserId?: Maybe<TransactionByUserIdWithPagination>;
  getUser?: Maybe<User>;
  getUserBalanceByUserId?: Maybe<UserBalance>;
  getUsersByPagination?: Maybe<UserPagination>;
};


export type QueryGetAuditLogsByPaginationArgs = {
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryGetRecentTransactionsByUserIdArgs = {
  hydrate?: InputMaybe<TransactionHydrateOption>;
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
};


export type QueryGetUsersByPaginationArgs = {
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
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  transactions: Array<Transaction>;
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
  receivedTransactions?: Maybe<Array<Transaction>>;
  sentTransactions?: Maybe<Array<Transaction>>;
  updatedAt: Scalars['String']['output'];
  wallet?: Maybe<Wallet>;
};

export type UserBalance = {
  __typename?: 'UserBalance';
  balance: Scalars['Float']['output'];
};

export type UserHydrateOption = {
  receivedTransactions: Scalars['Boolean']['input'];
  sentTransactions: Scalars['Boolean']['input'];
  wallet: Scalars['Boolean']['input'];
};

export type UserPagination = {
  __typename?: 'UserPagination';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  users: Array<User>;
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

export type WalletHydrateOption = {
  receiver: Scalars['Boolean']['input'];
  sender: Scalars['Boolean']['input'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Login', token: string, expiresAt: string } | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id: string } | null };

export type ConfirmVerificationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ConfirmVerificationMutation = { __typename?: 'Mutation', confirmVerification?: { __typename?: 'Verification', id: string } | null };

export type PayMutationVariables = Exact<{
  cashierId: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
}>;


export type PayMutation = { __typename?: 'Mutation', pay?: { __typename?: 'Wallet', balance: number, createdAt: string, id: string } | null };

export type TopUpMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
}>;


export type TopUpMutation = { __typename?: 'Mutation', topUp?: { __typename?: 'Wallet', balance: number, id: string, updatedAt: string } | null };

export type UpdateUserAccountTypeByUserIdMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  accountType: Scalars['String']['input'];
}>;


export type UpdateUserAccountTypeByUserIdMutation = { __typename?: 'Mutation', updateUserAccountTypeByUserId?: { __typename?: 'User', accountType: string, updatedAt: string, name: string } | null };

export type WithdrawBalanceMutationVariables = Exact<{
  topUpCashierId: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
}>;


export type WithdrawBalanceMutation = { __typename?: 'Mutation', withdrawBalance?: { __typename?: 'Wallet', balance: number } | null };

export type TransferBalanceMutationVariables = Exact<{
  receiverId: Scalars['String']['input'];
  amount: Scalars['Int']['input'];
}>;


export type TransferBalanceMutation = { __typename?: 'Mutation', transferBalance?: { __typename?: 'Wallet', user?: { __typename?: 'User', updatedAt: string } | null } | null };

export type GetRecentTransactionsByUserIdQueryVariables = Exact<{
  perPage: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetRecentTransactionsByUserIdQuery = { __typename?: 'Query', getRecentTransactionsByUserId?: { __typename?: 'TransactionByUserIdWithPagination', page: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, transactions: Array<{ __typename?: 'Transaction', id: string, amount: number, createdAt: string, type: string, receiver?: { __typename?: 'User', name: string } | null, sender?: { __typename?: 'User', name: string } | null }> } | null };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, name: string, email: string, accountType: string, createdAt: string } | null };

export type GetUserBalanceByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserBalanceByUserIdQuery = { __typename?: 'Query', getUserBalanceByUserId?: { __typename?: 'UserBalance', balance: number } | null };

export type GetUsersByPaginationQueryVariables = Exact<{
  perPage: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetUsersByPaginationQuery = { __typename?: 'Query', getUsersByPagination?: { __typename?: 'UserPagination', page: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, users: Array<{ __typename?: 'User', id: string, name: string, accountType: string, wallet?: { __typename?: 'Wallet', balance: number } | null }> } | null };

export type GetAuditLogsByPaginationQueryVariables = Exact<{
  perPage: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
}>;


export type GetAuditLogsByPaginationQuery = { __typename?: 'Query', getAuditLogsByPagination?: { __typename?: 'AuditLogPagination', page: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, auditLogs: Array<{ __typename?: 'AuditLog', actionType: string, createdAt: string, executor?: { __typename?: 'User', name: string, accountType: string } | null, target?: { __typename?: 'User', name: string, accountType: string } | null, changes?: Array<{ __typename?: 'AuditLogChange', key: string, values: Array<{ __typename?: 'AuditLogChangeValue', from: string, to: string }> }> | null }> } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"confirmPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"confirmPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const ConfirmVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"confirmVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ConfirmVerificationMutation, ConfirmVerificationMutationVariables>;
export const PayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Pay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cashierId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pay"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cashierId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cashierId"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PayMutation, PayMutationVariables>;
export const TopUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TopUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TopUpMutation, TopUpMutationVariables>;
export const UpdateUserAccountTypeByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserAccountTypeByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserAccountTypeByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"accountType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accountType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateUserAccountTypeByUserIdMutation, UpdateUserAccountTypeByUserIdMutationVariables>;
export const WithdrawBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WithdrawBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topUpCashierId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"withdrawBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topUpCashierId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topUpCashierId"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<WithdrawBalanceMutation, WithdrawBalanceMutationVariables>;
export const TransferBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TransferBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"amount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transferBalance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"receiverId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverId"}}},{"kind":"Argument","name":{"kind":"Name","value":"amount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"amount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<TransferBalanceMutation, TransferBalanceMutationVariables>;
export const GetRecentTransactionsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRecentTransactionsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRecentTransactionsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"receiver"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"sender"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]} as unknown as DocumentNode<GetRecentTransactionsByUserIdQuery, GetRecentTransactionsByUserIdQueryVariables>;
export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const GetUserBalanceByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserBalanceByUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserBalanceByUserId"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}}]} as unknown as DocumentNode<GetUserBalanceByUserIdQuery, GetUserBalanceByUserIdQueryVariables>;
export const GetUsersByPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersByPagination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUsersByPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]} as unknown as DocumentNode<GetUsersByPaginationQuery, GetUsersByPaginationQueryVariables>;
export const GetAuditLogsByPaginationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuditLogsByPagination"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAuditLogsByPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"perPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"perPage"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auditLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"executor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"target"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"accountType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"changes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}}]}}]}}]} as unknown as DocumentNode<GetAuditLogsByPaginationQuery, GetAuditLogsByPaginationQueryVariables>;