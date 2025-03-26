import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { UserBalance } from "../../api/graphql/codegen/graphql";
import { GET_USER_BALANCE } from "../../api/graphql/query";
import api from "../../api/axiosInstance";
import { print } from "graphql";

export const useGetUserBalanceQuery = (
  options?: Partial<UseQueryOptions<UserBalance, Error>>
) => {
  return useQuery<UserBalance, Error>({
    queryKey: ["userBalance"],
    queryFn: async () => {
      const { data } = await api({
        data: { query: print(GET_USER_BALANCE) },
      });

      return data.data.getUserBalanceByUserId;
    },
    retry: false,
    ...options,
  });
};
