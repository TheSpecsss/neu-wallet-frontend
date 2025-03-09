import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("../../assets/NEUBackground.png")}
      style={styles.background}
    >
      <View style={styles.content}>
        <Image
          source={require("../../assets/NEUlogo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>NEU WALLET</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: wp(30),
    height: hp(15),
    marginBottom: hp(2),
    borderRadius: wp(4),
  },
  title: {
    fontFamily: "klavika-bold",
    fontSize: wp(10),
    color: "#ffffff",
    textAlign: "center",
  },
});
