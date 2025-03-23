import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  Login,
  MutationLoginArgs,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { LOGIN } from "../../api/graphql/mutation";
import { useSession } from "../../context/Session";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";

type LoginMutationGraphQLResponse = GraphQLResponse<{ login?: Login }>;

export const useLoginMutation = (
  options?: Partial<
    UseMutationOptions<LoginMutationGraphQLResponse, Error, MutationLoginArgs>
  >
) => {
  const { user, setSession } = useSession();

  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();

  return useMutation({
    mutationFn: async (args: MutationLoginArgs) => {
      const { data } = await api<LoginMutationGraphQLResponse>({
        data: {
          query: print(LOGIN),
          variables: args,
        },
      });

      return data;
    },
    onSuccess: async ({ data, errors }, { email }) => {
      if (errors) {
        Toast.show({
          type: "error",
          text1: errors[0].message,
        });

        if (errors[0].message === `${email} is not yet verified`) {
          navigation.navigate("EmailConfirmationScreen", { email });
        }
      }

      if (data?.login?.token && data.login.expiresAt) {
        await setSession(data.login.token, new Date(data.login.expiresAt));

        if (user) {
          navigation.navigate(
            user.accountType === "ADMIN" || user.accountType === "SUPER_ADMIN"
              ? "AdminTopTab"
              : "MainBottomTab"
          );
        }
      }
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
