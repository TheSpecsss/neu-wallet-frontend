import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
	MutationSetBalanceArgs,
	Wallet,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { SET_BALANCE } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";

type SetBalanceMutationGraphQLResponse = GraphQLResponse<{
	setBalance?: Wallet;
}>;

export const useSetBalance = (
	options?: Partial<
		UseMutationOptions<
			SetBalanceMutationGraphQLResponse,
			Error,
			MutationSetBalanceArgs
		>
	>,
) => {
	return useMutation({
		mutationFn: async (args: MutationSetBalanceArgs) => {
			const { data } = await api<SetBalanceMutationGraphQLResponse>({
				data: {
					query: print(SET_BALANCE),
					variables: args,
				},
			});

			return data;
		},
		onSuccess: ({ data, errors }) => {
			if (errors) {
				return Toast.show({
					type: "error",
					text1: "Balance Update Failed",
					text2: errors[0].message,
				});
			}

			Toast.show({
				type: "success",
				text1: "Balance Updated",
				text2: `New Balance: ₱${data?.setBalance?.balance.toFixed(2) ?? "0.00"}`,
			});
		},
		onError: (error) => {
			Toast.show({
				type: "error",
				text1: "Balance Update Failed",
				text2: error.message || "An unexpected error occurred",
			});
		},
		...options,
	});
};
