import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { walletLogo, qrcodeLogo } from "../../loadSVG";
import { loadFont } from "../../loadFont";
import { SvgXml } from "react-native-svg";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Toast from "react-native-toast-message";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../types";
import { encryptString } from "../../api/cryptoUtils";

type QRInfo = {
  amount: Number;
  type: String;
  sender: String;
};

type QRGeneratorScreenProps = StackNavigationProp<
  MainStackParamList,
  "QRGeneratorScreen"
>;

type Props = {
  navigation: QRGeneratorScreenProps;
};

const QRGeneratorScreen = ({ navigation }: Props) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [inputAmount, setInputAmount] = useState("");
  const [balance, setBalance] = useState(967.0);

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

  const generateQR = () => {
    if (inputAmount === "") {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter an amount",
      });
      return;
    }

    if (isNaN(parseFloat(inputAmount))) {
      Toast.show({
        type: "error",
        text1: "Invalid input",
        text2: "Please enter a valid amount",
      });
      return;
    }

    if (parseFloat(inputAmount) <= 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Invalid amount",
      });
      return;
    }

    if (parseFloat(inputAmount) > balance) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Insufficient balance",
      });
      return;
    }

    // passed all checks
    // qr generate logic here

    var qrinfo: QRInfo = {
      amount: parseFloat(inputAmount),
      type: "payment",
      sender: "cashier1",
    };

    console.log(qrinfo);

    Toast.show({
      type: "success",
      text1: inputAmount,
    });

    const encrypted = encryptString(JSON.stringify(qrinfo));

    navigation.navigate("QRGenerateScreen", {
      data: encrypted,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Generator</Text>

      <View style={styles.balanceCard}>
        <SvgXml xml={walletLogo} width={wp(20)} height={hp(10)} />

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Available Balance:</Text>
          <Text style={styles.balanceAmount}>₱{balance.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.inputLabel}>Input Ammount:</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Ammount"
        value={inputAmount}
        onChangeText={setInputAmount}
        keyboardType="numeric"
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={generateQR}>
          <SvgXml
            style={{ marginLeft: -10 }}
            xml={qrcodeLogo("#FFF")}
            width={wp(10)}
          />
          <Text style={styles.optionText}>Generate QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRGeneratorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: wp(100),
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontFamily: "klavika-bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#204A69",
  },
  balanceCard: {
    flexDirection: "row",
    backgroundColor: "#204a69",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  balanceContainer: {
    marginLeft: 30,
    alignItems: "flex-start",
  },
  balanceLabel: {
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
  sectionTitle: {
    fontSize: 20,
    fontFamily: "klavika-bold",
    marginTop: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#204A69",
    width: wp(80),
    height: hp(7),
    justifyContent: "center",
    borderRadius: 10,
  },
  optionText: {
    fontSize: 20,
    fontFamily: "klavika-bold",
    marginLeft: 10,
    color: "#FFF",
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#043E75",
    paddingLeft: 10,
  },
  inputLabel: {
    fontFamily: "klavika-medium",
    fontSize: 16,
    color: "#204A69",
    marginTop: 35,
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});
