import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useCallback, useMemo } from "react";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../../types";
import { type RouteProp, CommonActions } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import QRCode from "react-native-qrcode-svg";
import { encryptString } from "../../../api/cryptoUtils";

type QRGenerateScreenProps = StackNavigationProp<
  MainStackParamList,
  "QRGenerateScreen"
>;

type Props = {
  navigation: QRGenerateScreenProps;
  route: RouteProp<MainStackParamList, "QRGenerateScreen">;
};

const QRGenerate = ({ route, navigation }: Props) => {
  const params = route.params;

  const qrValue = useMemo(
    () => encryptString(JSON.stringify(params)),
    [params]
  );

  const handleNavigateHome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MainBottomTab" }],
      })
    );
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Generate Screen</Text>
      <QRCode size={wp(60)} logoSize={wp(20)} value={qrValue} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleNavigateHome}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRGenerate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  bottomContainer: {
    position: "absolute",
    bottom: hp(3),
    alignItems: "center",
    width: "100%",
  },
  header: {
    fontSize: wp(6),
    fontFamily: "klavika-bold",
    textAlign: "center",
    color: "#204A69",
    marginBottom: hp(5),
  },
  buttonContainer: {
    backgroundColor: "#043E75",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: wp(60),
    marginTop: hp(1),
  },
  buttonText: {
    color: "white",
    fontSize: wp(4),
    fontFamily: "klavika-medium",
  },
});
