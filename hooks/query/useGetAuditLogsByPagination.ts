import {
    type QueryFunctionContext,
    useQuery,
    type UseQueryOptions,
  } from "@tanstack/react-query";
  import api from "../../api/axiosInstance";
  import { print } from "graphql";
  import type { GraphQLResponse } from "../../api/graphql/types";
  import type {
    GetAuditLogsByPaginationQueryVariables,
    AuditLogPagination,
  } from "../../api/graphql/codegen/graphql";
import { GET_AUDIT_LOGS_BY_PAGINATION } from "../../api/graphql/query";
  
  type GetAuditLogsByPaginationQueryGraphQLResponse = GraphQLResponse<{
    getAuditLogsByPagination?: AuditLogPagination;
  }>;
  
  export const useGetAuditLogsByPagination = (
    variables: GetAuditLogsByPaginationQueryVariables,
    options?: Partial<
      UseQueryOptions<GetAuditLogsByPaginationQueryGraphQLResponse, Error>
    >
  ) => {
    return useQuery({
      queryKey: ["auditLogsByPagination", variables],
      queryFn: async ({ queryKey }: QueryFunctionContext) => {
        const [, variables] = queryKey as [
          string,
          GetAuditLogsByPaginationQueryVariables
        ];
  
        const { data } = await api<GetAuditLogsByPaginationQueryGraphQLResponse>({
          data: {
            query: print(GET_AUDIT_LOGS_BY_PAGINATION),
            variables,
          },
        });
  
        return data;
      },
      ...options,
    });
  };
  