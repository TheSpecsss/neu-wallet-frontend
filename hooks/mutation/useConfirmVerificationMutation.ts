import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type {
	MutationConfirmVerificationArgs,
	Verification,
} from "../../api/graphql/codegen/graphql";
import api from "../../api/axiosInstance";
import { print } from "graphql";
import { CONFIRM_VERIFICATION } from "../../api/graphql/mutation";
import type { GraphQLResponse } from "../../api/graphql/types";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";

type ConfirmVerificationMutationGraphQLResponse = GraphQLResponse<{
	confirmVerification?: Verification;
}>;

export const useConfirmVerificationMutation = (
	options?: Partial<
		UseMutationOptions<
			ConfirmVerificationMutationGraphQLResponse,
			Error,
			MutationConfirmVerificationArgs
		>
	>,
) => {
	const { navigate } = useNavigation<StackNavigationProp<MainStackParamList>>();

	return useMutation({
		mutationFn: async (args: MutationConfirmVerificationArgs) => {
			const { data } = await api<ConfirmVerificationMutationGraphQLResponse>({
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
				text1: "Email Verified",
			});

			navigate("LoginScreen");
		},
		onError: (error) => {
			Toast.show({
				type: "error",
				text1: "Verification Failed",
				text2: error.message || "An unexpected error occurred",
			});
		},
		...options,
	});
};
