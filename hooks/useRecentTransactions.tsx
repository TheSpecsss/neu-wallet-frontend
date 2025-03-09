import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useRecentTransactions = (perPage: number, page: number) => {
  return useQuery({
    queryKey: ["recentTransactions", perPage, page],
    queryFn: async () => {
      const response = await api({
        method: "POST",
        data: {
          operationName: "GetRecentTransactionByUserId",
          query: `query GetRecentTransactionByUserId($perPage: Int!, $page: Int!) {
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
            }
          }`,
          variables: { perPage, page },
        },
      });

      if (response.data?.errors?.length > 0) {
        throw new Error(response.data.errors[0].message);
      }

      return response.data?.data?.getRecentTransactionByUserId?.transactions || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
