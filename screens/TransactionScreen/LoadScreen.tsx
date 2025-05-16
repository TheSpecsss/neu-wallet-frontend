import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { walletLogo, expressSendLogo, scanQrLogo } from "../../loadSVG";
import { SvgXml } from "react-native-svg";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import { useSession } from "../../context/Session";
import { useGetUserBalanceQuery } from "../../hooks/query/useGetBalanceQuery";

type LoadScreenProp = StackNavigationProp<MainStackParamList, "LoadScreen">;

type Props = {
	navigation: LoadScreenProp;
};

export const LoadScreen = ({ navigation }: Props) => {
	const { user } = useSession();
	const balance = useGetUserBalanceQuery().data?.balance;

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Load Balance</Text>

			<View style={styles.balanceCard}>
				<SvgXml xml={walletLogo} width={wp(20)} height={hp(10)} />

				<View style={styles.balanceInfo}>
					<Text style={styles.balanceText}>Available Balance:</Text>
					<Text style={styles.balanceAmount}>
						{user?.accountType === "CASHIER" ||
						user?.accountType === "CASH_TOP_UP"
							? `₱${Number(balance).toFixed(2)}`
							: "***"}
					</Text>
				</View>
			</View>

			<Text style={styles.sectionTitle}>Load Options</Text>
			<View style={styles.divider} />

			<TouchableOpacity
				style={styles.optionButton}
				onPress={() => navigation.navigate("SendScreen")}
			>
				<SvgXml xml={expressSendLogo} width={24} height={24} />
				<Text style={styles.optionText}>Express Send</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.optionButton}
				onPress={() => navigation.navigate("QRScanScreen")}
			>
				<SvgXml xml={scanQrLogo("#000")} width={24} height={24} />
				<Text style={styles.optionText}>Scan</Text>
			</TouchableOpacity>
		</View>
	);
};

export default LoadScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 20,
		paddingTop: 50,
	},
	header: {
		fontSize: 22,
		fontFamily: "klavika-bold",
		textAlign: "center",
		marginBottom: 30,
		color: "#204A69",
	},
	balanceCard: {
		flexDirection: "row",
		backgroundColor: "#204a69",
		padding: 20,
		borderRadius: 10,
		alignItems: "center",
	},
	balanceInfo: {
		marginLeft: 30,
		alignItems: "flex-start",
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
	sectionTitle: {
		fontSize: 20,
		fontFamily: "klavika-bold",
		marginTop: 20,
	},
	divider: {
		height: 1,
		backgroundColor: "black",
		marginVertical: 10,
	},
	optionButton: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#EAEAEA",
		padding: 25,
		borderRadius: 10,
		marginTop: 10,
		marginBottom: 20,
	},
	optionText: {
		fontSize: 20,
		fontFamily: "klavika-bold",
		marginLeft: 10,
	},
});
