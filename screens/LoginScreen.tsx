import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 30,
    alignItems: "center",
  },
});