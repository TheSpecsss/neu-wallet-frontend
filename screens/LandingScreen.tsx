import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { loadFont } from "../loadFont";

const LandingScreen = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, []);
  if (!isFontLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={{
        fontFamily: "klavika-bold"
      }}>Landing Screen</Text>
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