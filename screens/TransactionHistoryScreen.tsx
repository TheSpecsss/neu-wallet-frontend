import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { loadFont } from "../loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const transactions = [
  {
    id: "1",
    title: "Received Money",
    date: "Feb 02, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "2",
    title: "Received Money",
    date: "Feb 02, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "3",
    title: "Received Money",
    date: "Feb 02, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "4",
    title: "Received Money",
    date: "Feb 02, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "5",
    title: "Received Money",
    date: "Feb 02, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "6",
    title: "Received Money",
    date: "Feb 02, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "7",
    title: "Received Money",
    date: "Feb 05, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "8",
    title: "Received Money",
    date: "Feb 05, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "9",
    title: "Received Money",
    date: "Feb 05, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "10",
    title: "Received Money",
    date: "Feb 05, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "11",
    title: "Received Money",
    date: "Feb 05, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "12",
    title: "Received Money",
    date: "Feb 05, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "13",
    title: "Received Money",
    date: "Feb 16, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "14",
    title: "Received Money",
    date: "Feb 16, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "15",
    title: "Received Money",
    date: "Feb 16, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "16",
    title: "Received Money",
    date: "Feb 20, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
  {
    id: "17",
    title: "Received Money",
    date: "Feb 20, 2025",
    time: "04:00 PM",
    amount: 200.0,
    type: "received",
  },
];

const TransactionHistoryScreen = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [balance, setBalance] = useState(967.0);

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

  const renderTransactionItem = ({ item, index }: { item: typeof transactions[0]; index: number }) => (
    <View style={styles.transactionItem}>
      {index === 0 || item.date !== transactions[index - 1]?.date ? (
        <Text style={styles.date}>{item.date}</Text>
      ) : null}
      <View style={styles.transactionRow}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.amount}>+₱{item.amount.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontFamily: "klavika-bold",
    textAlign: "center",
    marginTop: hp(7),
  },
  date: {
    fontSize: 22,
    fontFamily: "klavika-bold",
    marginTop: wp(5),
  },
  transactionItem: {
    marginTop: hp(2),
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  time: {
    fontSize: 13,
    color: "#777",
  },
  amount: {
    fontSize: 20,
    fontFamily: "klavika-bold",
    color: "green",
  },
});
