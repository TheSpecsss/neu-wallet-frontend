import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { MutationWithdrawBalanceArgs, Wallet } from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { WITHDRAW } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList, TransactionTypeKind } from "../../types";
import { useSession } from "../../context/Session";

type WithdrawBalanceMutationGraphQLResponse = GraphQLResponse<{ withdrawBalance?: Wallet }>;

export const useWithdrawBalanceMutation = (
  type: TransactionTypeKind,
  options?: Partial<
    UseMutationOptions<WithdrawBalanceMutationGraphQLResponse, Error, MutationWithdrawBalanceArgs>
  >
) => {
  const { navigate } = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { user } = useSession();

  return useMutation({
    mutationFn: async (args: MutationWithdrawBalanceArgs) => {
      const { data } = await api<WithdrawBalanceMutationGraphQLResponse>({
        data: {
          query: print(WITHDRAW),
          variables: args,
        },
      });

      return data;
    },
    onSuccess: ({ data, errors }, variables) => {
      if (errors) {
        return Toast.show({
          type: "error",
          text1: errors[0].message,
        });
      }
      navigate("ConfirmTransactionScreen", {
        receiverId: variables.topUpCashierId,
        senderId: user?.id || "",
        amount: variables.amount,
        date: new Date().toLocaleString(),
        type,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Withdrawal Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
