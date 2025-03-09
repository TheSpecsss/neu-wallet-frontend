import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { successLogo } from "../../loadSVG";
import { loadFont } from "../../loadFont";
import { SvgXml } from "react-native-svg";
import MainBottomTab from "../../navigation/MainBottomTab";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ConfirmTransactionScreen = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  const transactions = {
    reciever: "9b8a5f0c",
    sender: "23-1234-123",
    amount: 150.0,
    time: "3:30 PM",
    date: "14/02/2025",
    type: "Pay",
    reference: "REF-2025-QC-0002",
  };

  return (
    <View style={styles.container}>
      <SvgXml xml={successLogo} width={wp(50)} height={hp(47)} />
      <Text style={styles.title}>Transaction Successful</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Receiver ID:</Text>
          <Text style={styles.detailValue}>{transactions.reciever}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Sender ID:</Text>
          <Text style={styles.detailValue}>{transactions.sender}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Amount:</Text>
          <Text style={styles.detailValue}>
            ₱{transactions.amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date & Time:</Text>
          <Text style={styles.detailValue}>
            {transactions.date} {transactions.time}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Remarks:</Text>
          <Text style={styles.detailValue}>{transactions.type}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Ref No.:</Text>
          <Text style={styles.detailValue}>{transactions.reference}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <MainBottomTab />
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
    padding: 20,
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
    height: 40,
    borderRadius: 8,
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
