import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Landing Screen</Text>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});