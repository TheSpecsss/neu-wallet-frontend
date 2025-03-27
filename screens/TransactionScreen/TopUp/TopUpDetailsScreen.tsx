import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Divider, Checkbox } from "react-native-paper";
import type { MainStackParamList } from "../../../types";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import React, { useCallback, useMemo } from "react";
import { useSession } from "../../../context/Session";
import { useGetUserBalanceQuery } from "../../../hooks/query/useGetBalanceQuery";
import { useTopUpMutation } from "../../../hooks/mutation/useTopUpMutation";
import { decryptString } from "../../../api/cryptoUtils";

type TopUpDetailsScreenProps = StackNavigationProp<
  MainStackParamList,
  "TopUpDetailsScreen"
>;

type Props = {
  navigation: TopUpDetailsScreenProps;
  route: RouteProp<MainStackParamList, "TopUpDetailsScreen">;
};

const TopUpDetailsScreen = ({ route, navigation }: Props) => {
  const { amount, receiverId, senderId, receiverName, type } = useMemo(() => {
    try {
      const decryptedData = decryptString(route.params.data);
      const parsedData = decryptedData ? JSON.parse(decryptedData) : {};
      console.log("Decrypted Data:", parsedData);
      return {
        receiverName: parsedData.receiverName,
        receiverId: parsedData.receiverId,
        senderId: parsedData.senderId,
        amount: parsedData.amount,
        type: parsedData.type,
      };
    } catch (error) {
      console.error("Error", error);
      return { receiverName: "", receiverId: "", senderId: "", amount: 0, type: "" };
    }
  }, [route.params.data]);
  const { user } = useSession();
  const [checked, setChecked] = React.useState(false);
  const { mutate: topUp } = useTopUpMutation(type);

  const balance = useGetUserBalanceQuery().data?.balance;


  const handleTopUpTransaction = useCallback(() => {
    if (type === "DEPOSIT") {
      topUp({ receiverId: senderId, amount });
    }
  }, [type, topUp, senderId,  amount]);


  return (
    <View style={styles.container}>
      <View style={styles.containerColumn}>
        <Text style={styles.textNormal}>{type} to </Text>
        <Text style={styles.textBold}>{receiverName}</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Balance</Text>
        <Text style={styles.textBoldSmall}>
          ₱{Number(balance).toFixed(2)}
          </Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textBold}>Deposit</Text>
      </View>

      <View style={styles.containerRow}>
        <Text style={styles.textSmall}> Amount</Text>
        <Text style={styles.textBoldSmall}>
        ₱{Number(amount).toFixed(2)}        
        </Text>
      </View>

      <Divider style={styles.divider} />
      <View style={styles.containerRow}>
        <Text style={styles.textSmall}>Total Amount:</Text>
        <Text style={styles.textBoldSmall}>
        ₱{Number(amount).toFixed(2)}        
        </Text>
      </View>
      <Divider style={styles.divider} />

      <View style={styles.containerColumn}>
        <Text style={styles.textXSmall}>
          Once a transaction is confirmed, it cannot be refunded. Please ensure
          the mobile number and the amount are accurate before proceeding.
        </Text>
      </View>
    
      {balance !== undefined && balance >= amount ? (
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
        
      ) : ( 
        <View style={styles.containerRow}>
          <Text style={{ width: "100%", textAlign: "center", color: "red" }}>
            Your account balance is too low to complete this transaction.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, !checked && styles.buttonDisabled]}
        disabled={!checked}
        onPress={handleTopUpTransaction}
      >
        <Text style={styles.buttonText}>Load</Text>
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

export default TopUpDetailsScreen;

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