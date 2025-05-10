import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	Image,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { loadFont } from "../../loadFont";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BlurView } from "expo-blur";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import { useSession } from "../../context/Session";

type LandingScreenNavigationProp = StackNavigationProp<
	MainStackParamList,
	"LandingScreen"
>;

type Props = {
	navigation: LandingScreenNavigationProp;
};

const LandingScreen = ({ navigation }: Props) => {
	const [isFontLoaded, setIsFontLoaded] = useState(false);
	const { user } = useSession();

	useEffect(() => {
		if (!isFontLoaded) {
			loadFont().then(() => setIsFontLoaded(true));
		}
	}, [isFontLoaded]);

	useEffect(() => {
		if (!user) {
			navigation.replace("MainBottomTab");
		}
	}, [user, navigation]);

	if (!isFontLoaded) return null;

	return (
		<ImageBackground
			source={require("../../assets/NEUBackground.png")}
			style={styles.container}
		>
			<View style={styles.logoContainer}>
				<Image
					source={require("../../assets/NEUlogo.png")}
					style={styles.image}
				/>
				<Text style={styles.titleText}>NEU WALLET</Text>
			</View>

			<BlurView intensity={90} tint="dark" style={styles.transparentContainer}>
				<Text style={styles.headingText}>Welcome to NEU Wallet</Text>
				<Text style={styles.descriptionText}>
					NEU Wallet is a secure digital wallet for fast, cashless transactions,
					bill payments, and money transfers—convenient, reliable, and
					user-friendly.
				</Text>

				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.outlineButton}
						onPress={() => navigation.replace("RegisterScreen")}
					>
						<Text style={styles.outlineButtonText}>Don't have an account?</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.solidButton}
						onPress={() => navigation.navigate("LoginScreen")}
					>
						<Text style={styles.solidButtonText}>Login</Text>
					</TouchableOpacity>
				</View>
			</BlurView>
		</ImageBackground>
	);
};

export default LandingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		alignItems: "center",
		justifyContent: "center",
		marginBottom: hp(55),
	},
	image: {
		width: wp(30),
		height: hp(15),
		marginBottom: hp(2),
		borderRadius: wp(4),
	},
	titleText: {
		fontFamily: "klavika-bold",
		fontSize: wp(10),
		color: "#ffffff",
		textAlign: "center",
	},
	transparentContainer: {
		position: "absolute",
		bottom: 0,
		backgroundColor: "rgba(4, 62, 117, 0.6)",
		paddingHorizontal: wp(5),
		paddingVertical: hp(4),
		borderTopLeftRadius: wp(10),
		borderTopRightRadius: wp(10),
		alignItems: "center",
		justifyContent: "center",
		width: wp(100),
		height: hp(45),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.3,
		shadowRadius: 6,
	},
	headingText: {
		fontSize: wp(7),
		fontFamily: "klavika-bold",
		color: "#fff",
		textAlign: "center",
		marginBottom: hp(2),
	},
	descriptionText: {
		fontSize: wp(4),
		color: "#fff",
		textAlign: "center",
		marginBottom: hp(3),
	},
	buttonContainer: {
		width: "100%",
		marginTop: hp(2),
		alignItems: "center",
	},
	outlineButton: {
		borderColor: "#fff",
		borderWidth: 1,
		borderRadius: wp(2),
		paddingVertical: hp(1.5),
		width: wp(80),
		alignItems: "center",
		justifyContent: "center",
	},
	outlineButtonText: {
		color: "#fff",
		fontSize: wp(4),
	},
	solidButton: {
		backgroundColor: "#043E75",
		borderRadius: wp(2),
		paddingVertical: hp(1.5),
		marginTop: hp(2),
		width: wp(80),
		alignItems: "center",
		justifyContent: "center",
	},
	solidButtonText: {
		color: "#fff",
		fontSize: wp(4),
	},
});
