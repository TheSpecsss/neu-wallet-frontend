import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={require("../assets/NEUBackground.png")}
      style={styles.background}
    >
      <View style={styles.content}>
        <Image source={require("../assets/NEUlogo.png")} style={styles.logo} />
        <Text style={styles.title}>NEU Wallet</Text>
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
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});
