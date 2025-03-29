import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  MutationTopUpArgs,
  Wallet,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import {  TOP_UP } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList, TransactionTypeKind } from "../../types";
import { useSession } from "../../context/Session";

type TopUpMutationGraphQLResponse = GraphQLResponse<{ topUp?: Wallet }>;

export const useTopUpMutation = (
  type: TransactionTypeKind,
  options?: Partial<
    UseMutationOptions<TopUpMutationGraphQLResponse, Error, MutationTopUpArgs>
  >
) => {
  const { navigate } = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { user } = useSession();

  return useMutation({
    mutationFn: async (args: MutationTopUpArgs) => {
      const { data } = await api<TopUpMutationGraphQLResponse>({
        data: {
          query: print(TOP_UP),
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
        receiverId: variables.receiverId,
        senderId: user?.id || "",
        amount: variables.amount,
        date: new Date().toLocaleString(),
        type,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Top Up Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
