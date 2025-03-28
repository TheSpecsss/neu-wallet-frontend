import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  MutationPayArgs,
  Wallet,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { PAY } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList, TransactionTypeKind } from "../../types";

import { useSession } from "../../context/Session";

type PayMutationGraphQLResponse = GraphQLResponse<{ pay?: Wallet }>;

export const usePayMutation = (
  type: TransactionTypeKind,
  options?: Partial<
    UseMutationOptions<PayMutationGraphQLResponse, Error, MutationPayArgs>
  >
) => {
  const { navigate } = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { user } = useSession();

  return useMutation({
    mutationFn: async (args: MutationPayArgs) => {
      const { data } = await api<PayMutationGraphQLResponse>({
        data: {
          query: print(PAY),
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
        receiverId: variables.cashierId,
        senderId: user?.id || "",
        amount: variables.amount,
        date: new Date().toLocaleString(),
        type,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Pay Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
