import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  MutationTransferBalanceArgs,
  User,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import {  TRANSFER_BY_UID } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import { useSession } from "../../context/Session";

type TransferMutationGraphQLResponse = GraphQLResponse<{ transfer?: User }>;

export const useTransferUIDMutation = (
  options?: Partial<
    UseMutationOptions<TransferMutationGraphQLResponse, Error, MutationTransferBalanceArgs>
  >
) => {
  const { navigate } = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { user } = useSession();

  return useMutation({
    mutationFn: async (args: MutationTransferBalanceArgs) => {
      const { data } = await api<TransferMutationGraphQLResponse>({
        data: {
          query: print(TRANSFER_BY_UID),
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
        type: "TRANSFER",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Transfer Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
