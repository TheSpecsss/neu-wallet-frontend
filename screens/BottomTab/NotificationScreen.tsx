import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Notification</Text>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});