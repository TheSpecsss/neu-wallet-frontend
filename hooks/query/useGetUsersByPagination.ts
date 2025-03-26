import { 
    type QueryFunctionContext, 
    useQuery, 
    type UseQueryOptions 
} from "@tanstack/react-query";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { GET_USERS_BY_PAGINATION } from "../../api/graphql/query";
import type { GraphQLResponse } from "../../api/graphql/types";
import type {
  GetUsersByPaginationQueryVariables,
  UserPagination,
} from "../../api/graphql/codegen/graphql";

type GetUsersByPaginationQueryGraphQLResponse = GraphQLResponse<{
  getUsersByPagination?: UserPagination;
}>;

export const useGetUsersByPagination = (
  variables: GetUsersByPaginationQueryVariables,
  options?: Partial<
    UseQueryOptions<GetUsersByPaginationQueryGraphQLResponse, Error>
  >
) => {
  return useQuery({
    queryKey: ["usersByPagination", variables],
    queryFn: async ({ queryKey }: QueryFunctionContext) => {
      const [, variables] = queryKey as [
        string, 
        GetUsersByPaginationQueryVariables
    ];

      const { data } = await api<GetUsersByPaginationQueryGraphQLResponse>({
        data: {
          query: print(GET_USERS_BY_PAGINATION),
          variables,
        },
      });

      return data;
    },
    ...options,
  });
};
