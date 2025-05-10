import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import type { MainStackParamList } from "../../../types";
import Toast from "react-native-toast-message";
import { encryptString } from "../../../api/cryptoUtils";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useSession } from "../../../context/Session";
import { useGetUserBalanceQuery } from "../../../hooks/query/useGetBalanceQuery";

type TopUpCheckOutScreenProp = StackNavigationProp<
	MainStackParamList,
	"TopUpCheckOutScreen"
>;

type Props = {
	navigation: TopUpCheckOutScreenProp;
};
const TopUpCheckOutScreen = ({ navigation }: Props) => {
	const { user } = useSession();
	const [amount, setAmount] = useState("");
	const balance = useGetUserBalanceQuery().data?.balance;

	const numericValue = useMemo(() => Number.parseFloat(amount), [amount]);

	const handleGenerateQRCode = useCallback(() => {
		if (!amount.trim() || Number.isNaN(numericValue) || numericValue <= 0) {
			return Toast.show({
				type: "error",
				text1: "Please enter a valid amount",
			});
		}

		navigation.navigate("QRGenerateScreen", {
			data: encryptString(
				JSON.stringify({
					receiverName: user?.name,
					receiver: user?.id,
					amount,
					type: user?.accountType === "CASH_TOP_UP" ? "WITHDRAW" : " ",
				}),
			),
		});
	}, [amount, numericValue, user, navigation.navigate]);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>
				{user?.accountType === "CASH_TOP_UP" ? "WITHRAW/CASHOUT" : " "}
			</Text>

			{user?.accountType === "CASH_TOP_UP" && (
				<View style={styles.containerAmount}>
					<Text style={styles.label}>Input Amount:</Text>
					<TextInput
						style={styles.input}
						placeholder="₱0.00"
						value={amount}
						onChangeText={setAmount}
						keyboardType="numeric"
					/>
				</View>
			)}

			<View
				style={{
					position: "absolute",
					bottom: 0,
					marginBottom: "5%",
					justifyContent: "center",
					paddingHorizontal: "6%",
					paddingVertical: "2%",
				}}
			>
				<Text style={styles.warningText}>
					* PLEASE MAKE SURE YOU CHECK THE AMOUNT YOU INPUT.
				</Text>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={handleGenerateQRCode}
				>
					<Text style={styles.buttonText}>Generate</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TopUpCheckOutScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "column",
		backgroundColor: "#F5F5F5",
	},
	header: {
		fontSize: wp(6),
		fontFamily: "klavika-bold",
		textAlign: "center",
		color: "#204A69",
		marginTop: hp(7.7),
	},
	containerBalance: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: hp(1.5),
	},
	balanceCard: {
		backgroundColor: "#204A69",
		padding: wp(7),
		borderRadius: wp(4),
		alignItems: "flex-start",
	},
	balanceHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: wp(10),
	},
	balanceInfo: {
		alignItems: "flex-end",
	},
	balanceText: {
		color: "#FFFFFF",
		fontSize: wp(5),
		fontFamily: "klavika-regular-italic",
	},
	balanceAmount: {
		fontFamily: "klavika-medium-italic",
		color: "#FFFFFF",
		fontSize: wp(7),
		marginTop: hp(0.9),
	},
	containerAmount: {
		marginTop: hp(5),
	},
	input: {
		width: wp(90),
		padding: wp(4),
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: wp(2),
		fontSize: wp(4),
		backgroundColor: "#fff",
	},
	label: {
		fontFamily: "klavika-medium",
		color: "#204A69",
		fontSize: wp(5),
		marginBottom: 5,
	},
	warningText: {
		fontFamily: "klavika-medium-italic",
		color: "#204A69",
		fontSize: wp(4),
		textAlign: "center",
	},
	buttonContainer: {
		backgroundColor: "#043E75",
		height: 40,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		marginTop: hp(2),
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontFamily: "klavika-medium",
	},
});
