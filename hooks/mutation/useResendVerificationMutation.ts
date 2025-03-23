import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
  MutationResendVerificationArgs,
  Verification,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { CONFIRM_VERIFICATION } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";

type ResendVerificationMutationGraphQLResponse = GraphQLResponse<{
  resendVerification?: Verification;
}>;

export const useResendVerificationMutation = (
  options?: Partial<
    UseMutationOptions<
      ResendVerificationMutationGraphQLResponse,
      Error,
      MutationResendVerificationArgs
    >
  >
) => {
  return useMutation({
    mutationFn: async (args: MutationResendVerificationArgs) => {
      const { data } = await api<ResendVerificationMutationGraphQLResponse>({
        data: {
          query: print(CONFIRM_VERIFICATION),
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
        text1: "Resend Verification",
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Resend Verification Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
