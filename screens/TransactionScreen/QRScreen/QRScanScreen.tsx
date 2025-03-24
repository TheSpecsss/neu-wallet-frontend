import React from "react";
import { Text, View } from "react-native";
import { backLogo, cameraLogo } from "../../../loadSVG";
import { useCameraPermissions, CameraView } from "expo-camera";
import { SvgXml } from "react-native-svg";
import {
  AppState,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../../types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useEffect, useRef } from "react";
import { decryptString } from "../../../api/cryptoUtils";

type QRScanScreenProps = StackNavigationProp<
  MainStackParamList,
  "QRScanScreen"
>;

type Props = {
  navigation: QRScanScreenProps;
};

export const QRScan = ({ navigation }: Props) => {
  const [camPermission, requestCamPermission] = useCameraPermissions();
  const isCamPermissionGranted = Boolean(camPermission?.granted);

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

  return isCamPermissionGranted === true ? (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            const scanned = decryptString(data);
            if (scanned) {
              setQRData(`locked: ${scanned}`);
              navigation.navigate("DetailsScreen", { data: scanned });
            } else {
              setQRData("Invalid QR Code");
            }
            qrLock.current = false;
          }
        }}
      />
      <View style={styles.OverlayContainer}>
        <View style={styles.Top}>
          <Text style={styles.textTop}>Please Scan QR to Pay</Text>
        </View>
        <View style={styles.Middle} />
        <View style={styles.Bottom}>
          {/*<View style={styles.bottomSubpanel}>
            <TouchableOpacity
              style={styles.backButton}
              //onPress={() => navigation.navigate("LoginScreen")}
            >
              <View style={styles.centerview}>
                <SvgXml xml={topupLogo} width={wp(11)} height={wp(11)} />
                <Text style={styles.text}>Top-up | Cash in</Text>
              </View>
            </TouchableOpacity>
          </View>*/}
        </View>
      </View>
      {false && <Text style={styles.texttest}>DEBUG - Read: {QRData}</Text>}
      <View style={styles.toppannel}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <SvgXml xml={backLogo} width={wp(11)} height={wp(11)} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : (
    // REQUEST CAMERA PERMISSION
    <View style={styles.RCContainer}>
      <Text style={styles.RCTextCenter}>
        This app needs access to your camera to scan the QR code. Tap 'Allow' to
        continue.
      </Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={requestCamPermission}
      >
        <View style={styles.RCButton}>
          <SvgXml xml={cameraLogo} width={wp(9)} height={wp(9)} />
          <Text style={styles.text}>Request Permission</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  RCContainer: {
    width: wp(100),
    height: hp(100),
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  RCButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderColor: "#FFF",
    borderWidth: 2,
    width: wp(40),
    height: hp(10),
    borderRadius: 20,
  },
  RCTextCenter: {
    color: "#FFF",
    textAlign: "center",
    margin: 30,
  },
  OverlayContainer: {
    position: "absolute",
    width: wp(100),
    height: hp(100),
  },
  Top: {
    position: "absolute",
    width: wp(100),
    height: hp(25),
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
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
    marginBottom: hp(4),
    color: "#FFF",
    textAlign: "center",
  },
  textTop: {
    position: "absolute",
    width: wp(100),
    bottom: 0,
    left: 0,
    marginBottom: hp(3),
    color: "#FFF",
    textAlign: "center",
  },
  text: {
    color: "#FFF",
  },
  bottomSubpanel: {
    position: "absolute",
    top: hp(8),
    width: wp(100),
    height: hp(15),
    justifyContent: "center",
    alignItems: "center",
  },
  toppannel: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wp(100),
    height: hp(11),
    justifyContent: "center",
    padding: 20,
  },
  centerview: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    width: wp(40),
    height: hp(10),
    borderRadius: 20,
  },
  backButton: {},
});

export default QRScan;
