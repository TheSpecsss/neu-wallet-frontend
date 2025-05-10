import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { logoutLogo, personLogo } from "../../loadSVG";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSession } from "../../context/Session";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ProfileScreen = () => {
	const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
	const { user, clearSession } = useSession();

	const handleSignOut = useCallback(async () => {
		try {
			await clearSession();
			navigation.dispatch(
				CommonActions.reset({ index: 0, routes: [{ name: "LoginScreen" }] }),
			);
			Toast.show({ type: "success", text1: "Successfully logged out" });
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}, [clearSession, navigation]);

	return (
		<View style={styles.container}>
			<Text style={styles.header}>Profile</Text>
			<View style={styles.profile}>
				<SvgXml xml={personLogo} width={80} height={70} />
				<Text style={styles.name}>{user?.name}</Text>
				<Text style={styles.role}>{user?.accountType}</Text>
			</View>

			<View style={styles.details}>
				<ProfileDetail label="Account ID" value={user?.id} />
				<ProfileDetail label="Email" value={user?.email} />
				<ProfileDetail
					label="Date Created"
					value={
						user?.createdAt ? new Date(user.createdAt).toLocaleString() : " "
					}
				/>
			</View>

			<TouchableOpacity style={styles.aboutApp}>
				<Text style={styles.aboutAppText}>About Us</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
				<SvgXml xml={logoutLogo} width={20} height={20} />
				<Text style={styles.logoutText}>Log Out</Text>
			</TouchableOpacity>
		</View>
	);
};

const ProfileDetail = ({ label, value }: { label: string; value?: string }) => (
	<View style={styles.detailItem}>
		<Text style={styles.detailLabel}>{label}:</Text>
		<Text style={styles.detailValue}>{value}</Text>
	</View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F2F5F9",
		alignItems: "center",

		paddingTop: hp(10),
	},
	header: {
		fontSize: 22,
		fontFamily: "klavika-bold",
		color: "#204A69",
		marginBottom: hp(1.5),
	},
	profile: { alignItems: "center", marginBottom: 20 },
	name: { fontSize: 18, fontWeight: "bold", color: "#1E3A5F" },
	role: { fontSize: 14, color: "#8E8E93" },
	details: {
		width: "95%",
		backgroundColor: "#fff",
		borderRadius: 12,
		padding: wp(5),
		shadowColor: "#000",
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
		marginBottom: hp(10),
	},
	detailItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: hp(1),
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
		marginBottom: hp(2),
	},
	detailLabel: {
		fontSize: wp(3.5),
		fontFamily: "klavika-bold",
		color: "#4A4A4A",
	},
	detailValue: {
		fontSize: wp(3.5),
		fontFamily: "klavika-bold",
		color: "#4A4A4A",
	},
	aboutApp: {
		marginTop: hp(4),
		width: "90%",
		backgroundColor: "#E0E0E0",
		padding: 12,
		borderRadius: 10,
		alignItems: "center",
	},
	aboutAppText: {
		fontSize: wp(4),
		fontFamily: "klavika-bold",
		color: "#4A4A4A",
	},
	divider: {
		width: "90%",
		height: 1,
		backgroundColor: "#D1D1D1",
		marginVertical: hp(2),
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		width: "90%",

		paddingVertical: hp(1),
		borderRadius: 10,
		marginTop: 20,
	},
	logoutText: {
		fontSize: wp(4),
		fontFamily: "klavika-bold",
		color: "#204A69",
		marginLeft: hp(2),
	},
});
