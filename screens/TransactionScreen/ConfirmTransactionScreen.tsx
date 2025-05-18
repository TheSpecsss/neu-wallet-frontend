import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { successLogo } from "../../loadSVG";
import { SvgXml } from "react-native-svg";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import type { RouteProp } from "@react-navigation/native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CommonActions } from "@react-navigation/native";
import { useSession } from "../../context/Session";

type ScreenProps = StackNavigationProp<
	MainStackParamList,
	"ConfirmTransactionScreen"
>;

type Props = {
	navigation: ScreenProps;
	route: RouteProp<MainStackParamList, "ConfirmTransactionScreen">;
};

const ConfirmTransactionScreen = ({ route, navigation }: Props) => {
	const { receiver, senderId, amount, date, type, method } = route.params;

	const { user } = useSession();

	return (
		<View style={styles.container}>
			<View style={{ margin: wp(14) }}>
				<SvgXml xml={successLogo} />
			</View>
			<Text style={styles.title}>Transaction Successful</Text>
			<View style={styles.detailsContainer}>
				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>
						Receiver {method === "EMAIL" ? "Email" : "ID"}
					</Text>
					<Text style={styles.detailValue}>{receiver}</Text>
				</View>
				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Sender ID:</Text>
					<Text style={styles.detailValue}>{senderId}</Text>
				</View>
				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Amount:</Text>
					<Text style={styles.detailValue}>₱{amount.toFixed(2)}</Text>
				</View>
				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Date & Time:</Text>
					<Text style={styles.detailValueTime}>{date}</Text>
				</View>
				<View style={styles.detailItem}>
					<Text style={styles.detailLabel}>Remarks:</Text>
					<Text style={styles.detailValue}>{type}</Text>
				</View>
				{false && (
					<View style={styles.detailItem}>
						<Text style={styles.detailLabel}>Ref No.:</Text>
						<Text style={styles.detailValue}>{"transactions.reference"}</Text>
					</View>
				)}
			</View>
			<TouchableOpacity
				style={styles.buttonContainer}
				onPress={() => {
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: "MainBottomTab" }],
						}),
					);
				}}
			>
				<Text style={styles.buttonText}>Home</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ConfirmTransactionScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		padding: wp(5),
	},
	title: {
		fontSize: 24,
		fontFamily: "klavika",
		color: "#1E3A5F",
		marginBottom: 11,
	},

	detailsContainer: {
		width: "100%",
		marginBottom: "10%",
	},
	detailItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: "5%",
	},
	detailLabel: {
		color: "#1E3A5F",
		fontSize: 20,
		fontFamily: "klavika",
	},
	detailValue: {
		color: "#1E3A5F",
		fontFamily: "klavika-bold",
		fontSize: 20,
		flexWrap: "wrap",
		width: "55%",
		textAlign: "right",
	},
	detailValueTime: {
		color: "#1E3A5F",
		fontFamily: "klavika-bold",
		fontSize: 20,
		flexWrap: "wrap",
		width: "35%",
		textAlign: "right",
	},
	buttonContainer: {
		backgroundColor: "#043E75",
		height: 45,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
		width: "80%",
		marginTop: hp(1),
	},
	buttonText: {
		color: "#fff",
		fontSize: 20,
		fontFamily: "klavika-medium",
	},
});
