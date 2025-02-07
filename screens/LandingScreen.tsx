import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LandingScreen = () => {
  console.log('LandingScreen loaded');
  return (
    <View>
      <Text>This is the landing screen</Text>
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