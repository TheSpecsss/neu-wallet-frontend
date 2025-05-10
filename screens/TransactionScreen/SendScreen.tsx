import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	TextInput,
} from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import React, { useCallback, useState } from "react";
import { SvgXml } from "react-native-svg";
import { walletLogo } from "../../loadSVG";
import { useGetUserBalanceQuery } from "../../hooks/query/useGetBalanceQuery";
import Toast from "react-native-toast-message";
import { useTransferUIDMutation } from "../../hooks/mutation/useTransferByUIDMutation";

const SendScreen = () => {
	const [type, setType] = useState<"ID" | "EMAIL">("ID");
	const [id, setId] = useState("");
	const [amount, setAmount] = useState("");

	const balance = useGetUserBalanceQuery().data?.balance;

	const { mutate: transfer } = useTransferUIDMutation();

	const handleTransfer = useCallback(() => {
		transfer({
			receiverId: id,
			amount: Number(amount),
		});
	}, [transfer, id, amount]);

	return (
		<View style={styles.container}>
			<View style={styles.containerBalance}>
				<View style={styles.balanceCard}>
					<View style={styles.balanceHeader}>
						<SvgXml xml={walletLogo} width={100} height={90} />
						<View style={styles.balanceInfo}>
							<Text style={styles.balanceText}>Available Balance:</Text>
							<Text style={styles.balanceAmount}>
								₱{Number(balance).toFixed(2)}
							</Text>
						</View>
					</View>
				</View>
				<View style={styles.toggleContainer}>
					<TouchableOpacity
						style={[styles.button, type === "ID" && styles.buttonSelected]}
						onPress={() => setType("ID")}
					>
						<Text
							style={[
								styles.buttonText,
								type === "ID" && styles.buttonTextSelected,
							]}
						>
							ID
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, type === "EMAIL" && styles.buttonSelected]}
						disabled={true}
						onPress={() => setType("EMAIL")}
					>
						<Text
							style={[
								styles.buttonText,
								type === "EMAIL" && styles.buttonTextSelected,
							]}
						>
							Email
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.containerInput}>
				<View>
					<Text style={styles.label}>
						{type === "ID" ? "Enter ID:" : "Enter Email:"}
					</Text>
					<TextInput
						style={styles.input}
						placeholder={type === "ID" ? "Enter ID" : "Enter Email"}
						value={id}
						onChangeText={setId}
						keyboardType={type === "ID" ? "numeric" : "email-address"}
					/>
				</View>
				<View>
					<Text style={styles.label}>Amount: </Text>
					<TextInput
						style={styles.input}
						placeholder="₱0.0"
						value={amount}
						onChangeText={setAmount}
						keyboardType="numeric"
					/>
				</View>
			</View>
			<TouchableOpacity style={styles.button2} onPress={handleTransfer}>
				<Text style={styles.buttonText2}>Send Money</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SendScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "column",
	},
	containerBalance: {
		justifyContent: "center",
		alignItems: "center",
		gap: hp(4),
		marginBottom: hp(4),
		marginTop: hp(10),
	},
	containerInput: {
		justifyContent: "center",
		alignItems: "center",
		gap: hp(4),
		marginTop: hp(2),
	},
	balanceCard: {
		backgroundColor: "#204A69",
		padding: wp(7),
		borderRadius: wp(4),
		marginTop: hp(2),
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
		marginRight: wp(6.5),
	},
	toggleContainer: {
		flexDirection: "row",
		borderRadius: 10,
		overflow: "hidden",
		marginHorizontal: wp(5),
	},
	button: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#ddd",
		height: hp(5),
	},
	buttonSelected: {
		backgroundColor: "#204A69",
	},
	buttonText: {
		fontFamily: "klavika-medium",
		color: "#204A69",
	},
	buttonTextSelected: {
		color: "#fff",
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
	button2: {
		backgroundColor: "#043E75",
		height: 40,
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		width: "90%",
		marginTop: hp(25),
	},
	buttonText2: {
		color: "#fff",
		fontSize: 15,
		fontFamily: "klavika-medium",
	},
});
