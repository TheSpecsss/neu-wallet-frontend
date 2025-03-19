import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { loadFont } from "../../../loadFont";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import QRCode from "react-native-qrcode-svg";

type QRGenerateScreenProps = StackNavigationProp<
  MainStackParamList,
  "QRGenerateScreen"
>;

// Define the type for your route parameters

type QRGenerateParams = {
  data: string;
};

// Define the props type
type Props = {
  navigation: QRGenerateScreenProps;
  route: RouteProp<MainStackParamList, "QRGenerateScreen">;
};

const QRGenerate = ({ route, navigation }: Props) => {
  const { data } = route.params;
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  console.log("QR DATA:" + data);

  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Generate Screen</Text>
      <QRCode
        size={wp(60)}
        logo={require("../../../assets/NEUlogo.png")}
        logoSize={wp(20)}
        value={data}
      />
    </View>
  );
};

export default QRGenerate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: wp(6),
    fontFamily: "klavika-bold",
    textAlign: "center",
    color: "#204A69",
    marginTop: hp(7.7),
    marginBottom: hp(5),
  },
  containerBalance: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(1.5),
  },
  balanceCard: {
    backgroundColor: "#204A69",
    padding: wp(7),
    borderRadius: wp(4),
    alignItems: "flex-start",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
  },
  balanceInfo: {
    alignItems: "flex-end",
  },
  balanceText: {
    color: "#FFFFFF",
    fontSize: wp(5),
    fontFamily: "klavika-regular-italic",
  },
  balanceAmount: {
    fontFamily: "klavika-medium-italic",
    color: "#FFFFFF",
    fontSize: wp(7),
    marginTop: hp(0.9),
  },
  containerAmount: {
    marginTop: hp(5),
  },
  input: {
    width: wp(90),
    padding: wp(4),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp(2),
    fontSize: wp(4),
    backgroundColor: "#fff",
  },
  label: {
    fontFamily: "klavika-medium",
    color: "#204A69",
    fontSize: wp(5),
    marginBottom: 5,
  },
  warningText: {
    fontFamily: "klavika-medium-italic",
    color: "#204A69",
    fontSize: wp(4),
    textAlign: "center",
    marginTop: hp(48),
  },
  buttonContainer: {
    backgroundColor: "#043E75",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: hp(4),
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "klavika-medium",
  },
});
