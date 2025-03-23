import {
  type QueryFunctionContext,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { GET_RECENT_TRANSACTIONS_BY_USER_ID } from "../../api/graphql/query";
import type { GraphQLResponse } from "../../api/graphql/types";
import type {
  GetRecentTransactionsByUserIdQueryVariables,
  TransactionByUserIdWithPagination,
} from "../../api/graphql/codegen/graphql";

type GetRecentTransactionsQueryGraphQLResponse = GraphQLResponse<{
  getRecentTransactionsByUserId?: TransactionByUserIdWithPagination;
}>;

export const useGetRecentTransactions = (
  variables: GetRecentTransactionsByUserIdQueryVariables,
  options?: Partial<
    UseQueryOptions<GetRecentTransactionsQueryGraphQLResponse, Error>
  >
) => {
  return useQuery({
    queryKey: ["recentTransactions", variables],
    queryFn: async ({ queryKey }: QueryFunctionContext) => {
      const [, variables] = queryKey as [
        string,
        GetRecentTransactionsByUserIdQueryVariables
      ];

      const { data } = await api<GetRecentTransactionsQueryGraphQLResponse>({
        data: {
          query: print(GET_RECENT_TRANSACTIONS_BY_USER_ID),
          variables,
        },
      });

      return data;
    },
    ...options,
  });
};
