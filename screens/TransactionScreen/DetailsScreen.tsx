import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Divider, Checkbox } from "react-native-paper";
import { MainStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import React from "react";

type DetailsScreenProps = StackNavigationProp<
  MainStackParamList,
  "DetailsScreen"
>;

// Define the props type
type Props = {
  navigation: DetailsScreenProps;
  route: RouteProp<MainStackParamList, "DetailsScreen">;
};

type QRInfo = {
  amount: Number;
  type: String;
  sender: String;
};

const DetailsScreen = ({ route, navigation }: Props) => {
  const transactionData: QRInfo = {
    amount: 320.0,
    type: "Payment",
    sender: "9b8a5f0c",
  };

  try {
    const { data } = route.params;
    console.log("Details Screen Data: " + data);

    if (data) {
      const qrData = JSON.parse(data);
      transactionData.amount = qrData.amount;
      transactionData.type = qrData.type;
      transactionData.sender = qrData.sender;
    }
  } catch (error) {
    console.log("No data passed to Details Screen");
  }

  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.containerColumn}>
        <Text style={styles.textNormal}>Canteen 1</Text>
        <Text style={styles.textBold}>9b8a5f0c</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Balance</Text>
        <Text style={styles.textBoldSmall}>₱967.14</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textBold}>You're Paying</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Amount</Text>
        <Text style={styles.textBoldSmall}>
          ₱{transactionData.amount.toString()}
        </Text>
      </View>

      <Divider style={styles.divider} />
      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Total Amount:</Text>
        <Text style={styles.textBoldSmall}>
          ₱{transactionData.amount.toString()}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.containerColumn}>
        <Text style={styles.textXSmall}>
          Once a transaction is confirmed, it cannot be refunded. Please ensure
          the mobile number and the amount are accurate before proceeding.
        </Text>
      </View>

      <View style={styles.containerRow}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
          color="#204A69"
        />
        <Text>I verify that the information is accurate.</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, !checked && styles.buttonDisabled]}
        disabled={!checked}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerColumn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
    marginBottom: "10%",
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "10%",
    marginBottom: 15,
  },
  textXSmall: {
    fontSize: 16,
    fontFamily: "klavika",
    textAlign: "center",
  },
  textSmall: {
    fontSize: 20,
    fontFamily: "klavika",
  },
  textBoldSmall: {
    fontSize: 20,
    fontFamily: "klavika-bold",
  },
  textNormal: {
    fontSize: 24,
    fontFamily: "klavika",
  },
  textBold: {
    fontSize: 28,
    fontFamily: "klavika-bold",
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#204A69",
    marginVertical: "10%",
  },
  button: {
    backgroundColor: "#043E75",
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "klavika",
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
});
