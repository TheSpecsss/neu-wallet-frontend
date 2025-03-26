import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { 
  MutationUpdateUserAccountTypeByUserIdArgs,
  UpdateUserAccountTypeByUserIdMutationVariables, 
  User 
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { UPDATE_USER_ACCOUNT_TYPE } from "../../api/graphql/mutation"; 
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import type { AccountTypeKind, TransactionTypeKind } from "../../types";

type UpdateUserAccountTypeMutationGraphQLResponse = GraphQLResponse<{
  updateUserAccountTypeByUserId?: User;
}>;

export const useUpdateUserAccountType = (
  options?: Partial<
    UseMutationOptions<
      UpdateUserAccountTypeMutationGraphQLResponse,
      Error, 
      MutationUpdateUserAccountTypeByUserIdArgs
    >
  >
) => {

  return useMutation({
    mutationFn: async (args: MutationUpdateUserAccountTypeByUserIdArgs) => {
      const { data } = await api<UpdateUserAccountTypeMutationGraphQLResponse>({
        data: {
          query: print(UPDATE_USER_ACCOUNT_TYPE),
          variables: args,
        },
      });

      return data;
    },
    onSuccess: ({ data, errors }) => {
      if (errors) {
        return Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: errors[0].message,
        });
      }

      Toast.show({
        type: "success",
        text1: "Account Type Updated",
        text2: `Updated Account Type: ${data?.updateUserAccountTypeByUserId?.accountType ?? ""}`,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: error.message || "An unexpected error occurred",
      });
    },
    ...options,
  });
};
