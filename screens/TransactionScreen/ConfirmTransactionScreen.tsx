import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { successLogo } from "../../loadSVG";
import { loadFont } from "../../loadFont";
import { SvgXml } from "react-native-svg";
import MainBottomTab from "../../navigation/MainBottomTab";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../types";
import { RouteProp } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { CommonActions } from "@react-navigation/native";

type ScreenProps = StackNavigationProp<
  MainStackParamList,
  "ConfirmTransactionScreen"
>;

// Define the props type
type Props = {
  navigation: ScreenProps;
  route: RouteProp<MainStackParamList, "ConfirmTransactionScreen">;
};

type transactionDataType = {
  receiver: String;
  sender: String;
  amount: String;
  date: String;
  type: String;
};

const ConfirmTransactionScreen = ({ route, navigation }: Props) => {
  const { data } = route.params;

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }

    const transactData = JSON.parse(data);

    setReceiver(transactData.receiver);
    setSender(transactData.sender);
    setAmount(transactData.amount);
    setDate(transactData.date);
    setType(transactData.type);
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: wp(14) }}>
        <SvgXml xml={successLogo} />
      </View>
      <Text style={styles.title}>Transaction Successful</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Receiver ID:</Text>
          <Text style={styles.detailValue}>{receiver}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Sender ID:</Text>
          <Text style={styles.detailValue}>{sender}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>₱{Number(amount).toFixed(2)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date & Time:</Text>
          <Text style={styles.detailValue}>{date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Remarks:</Text>
          <Text style={styles.detailValue}>{type}</Text>
        </View>
        {false && (
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ref No.:</Text>
            <Text style={styles.detailValue}>{"transactions.reference"}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "MainBottomTab" }],
            })
          );
        }}
      >
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfirmTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: wp(9),
  },
  title: {
    fontSize: 30,
    fontFamily: "klavika",
    color: "#1E3A5F",
    marginBottom: 11,
  },

  detailsContainer: {
    width: "100%",
    marginBottom: 20,
  },

  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  detailLabel: {
    color: "#1E3A5F",
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "klavika",
  },
  detailValue: {
    color: "#1E3A5F",
    fontFamily: "klavika-bold",
    fontSize: 20,
  },

  buttonContainer: {
    backgroundColor: "#043E75",
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: hp(1),
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "klavika-medium",
  },
});
