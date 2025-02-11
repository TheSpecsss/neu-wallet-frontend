import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const RegisterScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/NEUBackground.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require("../assets/NEUlogo.png")}
            style={styles.logo}
          />
          <Text style={styles.title}>NEU Wallet</Text>
          <Text style={styles.text}>ASD</Text>
        </View>
        <View style={styles.squarepanel}>
          <Text style={styles.text}>Placeholder</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 30,
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    top: 0,
    marginTop: 150,
    position: "absolute",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "regular",
    color: "#fff",
  },
  squarepanel: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "rgba(4, 62, 117, 0.6)", // **Deeper blue**
    paddingHorizontal: wp(5),
    paddingVertical: hp(4),
    borderTopLeftRadius: wp(10),
    borderTopRightRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
    width: wp(100),
    height: hp(55),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
