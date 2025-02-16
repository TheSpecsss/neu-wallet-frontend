import React from "react";
import { Text, View } from "react-native";
import { Camera, CameraView } from "expo-camera";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useEffect, useRef } from "react";

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  const [QRData, setQRData] = React.useState("");

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            setQRData(data);
          }
        }}
      />
      <View style={styles.Overlay}>
        <View style={styles.Top}></View>
        <View style={styles.Middle} />
        <View style={styles.Bottom} />
      </View>
      <Text style={styles.texttest}>Read: {QRData}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Overlay: {
    position: "absolute",
    width: wp(100),
    height: hp(100),
  },
  Top: {
    position: "absolute",
    width: wp(100),
    height: hp(25),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  Middle: {
    position: "absolute",
    top: hp(25),
    width: wp(100),
    height: wp(100) - wp(20),
    borderLeftWidth: wp(10),
    borderRightWidth: wp(10),
    borderColor: "rgba(0,0,0,0.5)",
  },
  Bottom: {
    position: "absolute",
    top: hp(25) + wp(100) - wp(20),
    width: wp(100),
    height: hp(100) - (wp(100) - wp(20)),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  texttest: {
    position: "absolute",
    width: wp(100),
    bottom: 0,
    left: 0,
    margin: 5,
    marginBottom: hp(5),
    color: "#FFF",
    textAlign: "center",
  },
});
