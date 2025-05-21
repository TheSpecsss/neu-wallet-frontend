import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Divider, Checkbox } from "react-native-paper";
import type { MainStackParamList } from "../../types";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { usePayMutation } from "../../hooks/mutation/usePayMutation";
import { useGetUserBalanceQuery } from "../../hooks/query/useGetBalanceQuery";
import { decryptString } from "../../api/cryptoUtils";
import { useWithdrawBalanceMutation } from "../../hooks/mutation/useWithdrawBalance";

type DetailsScreenProps = StackNavigationProp<
  MainStackParamList,
  "DetailsScreen"
>;

type Props = {
  navigation: DetailsScreenProps;
  route: RouteProp<MainStackParamList, "DetailsScreen">;
};

const DetailsScreen = ({ route, navigation }: Props) => {
  const { amount, receiverId, receiverName, type } = useMemo(() => {
    const parsedData = JSON.parse(route.params.data);
    const decryptedData = JSON.parse(decryptString(parsedData.data) || "");

    return {
      receiverName: decryptedData.receiverName,
      receiverId: decryptedData.receiver,
      amount: Number(decryptedData.amount),
      type: decryptedData.type,
    };
  }, [route.params.data]);

  const [checked, setChecked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { mutate: pay } = usePayMutation(type);
  const { mutate: withdraw } = useWithdrawBalanceMutation(type);
  const balance = useGetUserBalanceQuery().data?.balance;

  const handleTransaction = useCallback(() => {
    setIsProcessing(true);
    if (type === "PAY") {
      pay(
        { cashierId: receiverId, amount },
        {
          onSuccess: () => setIsProcessing(false),
          onError: () => setIsProcessing(false),
        }
      );
    } else if (type === "WITHDRAW") {
      withdraw(
        { topUpCashierId: receiverId, amount },
        {
          onSuccess: () => setIsProcessing(false),
          onError: () => setIsProcessing(false),
        }
      );
    }
  }, [type, pay, withdraw, receiverId, amount]);

  return (
    <View style={styles.container}>
      <View style={styles.containerColumn}>
        <Text style={styles.textNormal}>{type} to cashier</Text>
        <Text style={styles.textBold}>{receiverName}</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Balance</Text>
        <Text style={styles.textBoldSmall}>₱{(balance ?? 0).toFixed(2)}</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textBold}>
          {type === "PAY" ? "You're Paying" : "You're Withdrawing"}
        </Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Amount</Text>
        <Text style={styles.textBoldSmall}>₱{amount.toFixed(2)}</Text>
      </View>

      <Divider style={styles.divider} />
      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Total Amount:</Text>
        <Text style={styles.textBoldSmall}>₱{amount.toFixed(2)}</Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.containerColumn}>
        <Text style={styles.textXSmall}>
          Once a transaction is confirmed, it cannot be refunded. Please ensure
          the details are accurate before proceeding.
        </Text>
      </View>

      {balance !== undefined && balance >= amount ? (
        <View style={styles.containerRow}>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color="#204A69"
          />
          <Text>I verify that the information is accurate.</Text>
        </View>
      ) : (
        <View style={styles.containerRow}>
          <Text style={{ width: "100%", textAlign: "center", color: "red" }}>
            Your account balance is too low to complete this transaction.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !checked && styles.buttonDisabled]}
        disabled={!checked || isProcessing}
        onPress={handleTransaction}
      >
        <Text style={styles.buttonText}>
          {isProcessing ? "Processing..." : "Proceed"}
        </Text>
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
