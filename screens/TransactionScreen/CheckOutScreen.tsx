import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { walletLogo } from "../../loadSVG";
import { loadFont } from "../../loadFont";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MainStackParamList } from "../../types";
//import { getUserBalance, getUserRole, getUserInfo } from "../../api/auth";
import Toast from "react-native-toast-message";
import { encryptString } from "../../api/cryptoUtils";
import { StackNavigationProp } from "@react-navigation/stack";
import QRCode from "react-native-qrcode-svg";

type qrDataType = {
  receiverName: string;
  receiver: string;
  amount: string;
  type: string;
};

type NavigationProp = StackNavigationProp<MainStackParamList, "CheckOutScreen">;

type Props = {
  navigation: NavigationProp;
};
const CheckOutScreen = ({ navigation }: Props) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [balance, setBalance] = useState("");
  const [amountPay, setAmountPay] = useState("");
  const [RUserID, setRUserID] = useState("");
  const [RName, setRName] = useState("");
  const [role, setRole] = useState<string | null>();

  useEffect(() => {
    loadFont().then(() => setIsFontLoaded(true));

    const userInfo = async () => {
      try {
        const role = "await getUserRole()";
        const userInfo = "await getUserInfo()";
        const bal = "await getUserBalance()";
        setRole(role);
        setRUserID("userInfo.accountID");
        setRName("userInfo.name");
        setBalance(bal);
      } catch (error) {
        console.log(error);
      }
    };
    userInfo();
  }, []);

  const generateQRData = () => {
    var qrDATA: qrDataType = {
      receiverName: RName,
      receiver: RUserID,
      amount: amountPay,
      type: role === "CASHIER" ? "PAY" : "TRANSFER",
    };

    console.log(qrDATA);
    return qrDATA;
  };

  const generateButton = () => {
    if (amountPay.length === 0 || amountPay === "0") {
      Toast.show({
        type: "error",
        text1: "input amount",
      });
      return;
    }

    const eqrdata = encryptString(JSON.stringify(generateQRData()));

    Toast.show({
      type: "info",
      text1: "Input: " + amountPay,
      text2: eqrdata,
    });

    navigation.navigate("QRGenerateScreen", { data: eqrdata });
  };

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {role === "USER" ? "TOP UP" : "QR Generate"}
      </Text>

      {role && role === "USER" && false && (
        <View style={styles.containerBalance}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <SvgXml xml={walletLogo} width={100} height={90} />
              <View style={styles.balanceInfo}>
                <Text style={styles.balanceText}>Available Balance:</Text>
                <Text style={styles.balanceAmount}>
                  ₱{Number(balance).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View style={styles.containerAmount}>
        <Text style={styles.label}>Input Amount:</Text>
        <TextInput
          style={styles.input}
          placeholder="₱0.00"
          value={amountPay}
          onChangeText={setAmountPay}
          keyboardType="numeric"
        />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: 20,
          justifyContent: "center",
        }}
      >
        <Text style={styles.warningText}>
          * PLEASE MAKE SURE YOU CHECK THE AMOUNT YOU INPUT.
        </Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={generateButton}
        >
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckOutScreen;

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
  },
  buttonContainer: {
    backgroundColor: "#043E75",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp(2),
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "klavika-medium",
  },
});
