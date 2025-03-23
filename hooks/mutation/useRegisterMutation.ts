import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  MutationRegisterArgs,
  User,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { REGISTER } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";

type RegisterMutationGraphQLResponse = GraphQLResponse<{ register?: User }>;

export const useRegisterMutation = (
  options?: Partial<
    UseMutationOptions<
      RegisterMutationGraphQLResponse,
      Error,
      MutationRegisterArgs
    >
  >
) => {
  const { navigate } = useNavigation<StackNavigationProp<MainStackParamList>>();

  return useMutation({
    mutationFn: async (args: MutationRegisterArgs) => {
      const { data } = await api<RegisterMutationGraphQLResponse>({
        data: {
          query: print(REGISTER),
          variables: args,
        },
      });

      return data;
    },
    onSuccess: ({ errors }) => {
      if (errors) {
        return Toast.show({
          type: "error",
          text1: errors[0].message,
        });
      }

      Toast.show({
        type: "success",
        text1: "Registration Successful",
      });

      navigate("LoginScreen");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
