import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Divider, Checkbox } from "react-native-paper";
import { MainStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

import { getUserBalance, getUserInfo } from "../../api/auth";
import React, { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosInstance";
import { print as graphqlPrint } from "graphql";
import { PAY } from "../../api/graphql/mutation";
import Toast from "react-native-toast-message";

type DetailsScreenProps = StackNavigationProp<
  MainStackParamList,
  "DetailsScreen"
>;

// Define the props type
type Props = {
  navigation: DetailsScreenProps;
  route: RouteProp<MainStackParamList, "DetailsScreen">;
};

type qrDataType = {
  receiverName: string;
  receiver: string;
  amount: string;
  type: string;
};

type transactionDataType = {
  receiver: String;
  sender: String;
  amount: String;
  date: String;
  type: String;
};

const DetailsScreen = ({ route, navigation }: Props) => {
  const [userBalance, setUserBalance] = useState("");
  const [userID, setUserID] = useState("");
  const [sufficientBal, isBalSufficient] = useState(true);

  const transactionData: qrDataType = {
    receiverName: "...",
    receiver: "...",
    amount: "...",
    type: "...",
  };

  try {
    const { data } = route.params;
    console.log("Details Screen Data: " + data);

    if (data) {
      const qrData = JSON.parse(data);
      transactionData.amount = qrData.amount;
      transactionData.type = qrData.type;
      transactionData.receiver = qrData.receiver;
      transactionData.receiverName = qrData.receiverName;
    }
  } catch (error) {
    console.log("No data passed to Details Screen");
  }

  const [cashierId] = useState(transactionData.receiver);
  const [amount] = useState(Number(transactionData.amount));

  const payMutation = useMutation({
    mutationFn: async () =>
      await api({
        data: {
          operationName: "Pay",
          query: `mutation Pay($cashierId: String!, $amount: Int!) {
              pay(cashierId: $cashierId, amount: $amount) {
                balance
                id
                updatedAt
              }
            }`,
          variables: {
            cashierId,
            amount,
          },
        },
      }),
    onSuccess: async ({ data }) => {
      const tdate = new Date(data.data.pay.updatedAt);
      const localeDate = tdate.toLocaleString();

      const transactData: transactionDataType = {
        receiver: transactionData.receiver,
        sender: userID,
        amount: transactionData.amount,
        date: localeDate,
        type: transactionData.type,
      };

      navigation.navigate("ConfirmTransactionScreen", {
        data: JSON.stringify(transactData),
      });

      console.log(JSON.stringify(data));
      return;
    },
    onError: (error) => {
      console.log(error);
      throw error;
    },
  });

  const transact = () => {
    if (transactionData.type === "PAY") {
      payMutation.mutate();
    }
  };

  useEffect(() => {
    const walletBalance = async () => {
      const balance = await getUserBalance();
      const user = await getUserInfo();
      setUserBalance(balance);
      setUserID(user.accountID);
    };
    walletBalance();

    // check if balance is sufficient
    isBalSufficient(Number(userBalance) >= Number(transactionData.amount));
  }, [userBalance]);

  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.containerColumn}>
        <Text style={styles.textNormal}>
          {transactionData.type} to{" "}
          {transactionData.type === "PAY" ? "cashier" : ""}
        </Text>
        <Text style={styles.textBold}>{transactionData.receiverName}</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Balance</Text>
        <Text style={styles.textBoldSmall}>
          ₱{Number(userBalance).toFixed(2)}
        </Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textBold}>You're Paying</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Amount</Text>
        <Text style={styles.textBoldSmall}>
          ₱{Number(transactionData.amount).toFixed(2)}
        </Text>
      </View>

      <Divider style={styles.divider} />
      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Total Amount:</Text>
        <Text style={styles.textBoldSmall}>
          ₱{Number(transactionData.amount).toFixed(2)}
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.containerColumn}>
        <Text style={styles.textXSmall}>
          Once a transaction is confirmed, it cannot be refunded. Please ensure
          the mobile number and the amount are accurate before proceeding.
        </Text>
      </View>

      {sufficientBal && (
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
      )}
      {!sufficientBal && (
        <View style={styles.containerRow}>
          <Text style={{ width: "100%", textAlign: "center", color: "red" }}>
            Your account balance is too low to complete this transaction.
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={[styles.button, !checked && styles.buttonDisabled]}
        disabled={!checked}
        onPress={() => transact()}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
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
    height: 45,
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
