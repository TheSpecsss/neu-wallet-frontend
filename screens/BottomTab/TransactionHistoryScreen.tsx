import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { loadFont } from "../../loadFont";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRecentTransactions } from "../../hooks/useRecentTransactions";

const TransactionHistoryScreen = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [balance, setBalance] = useState(967.0);
  const { data, data: transactions, isLoading, error } = useRecentTransactions(10, 1);

  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Transaction History</Text>
        <Text style={styles.transactionItem}>Loading transactions...</Text>
      </View>
    );
  }
  if (!data || data.length === 0) {
    return( 
      <View style={styles.container}>
        <Text style={styles.header}>Transaction History</Text>
        <Text style={styles.transactionItem}>No recent transactions found.</Text>
      </View>
  );
  }
  if (error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Transaction History</Text>
        <Text style={styles.transactionItem}>Error loading transactions.</Text>
      </View>
    );
  }

  const renderTransactionItem = ({
    item,
    index,
  }: {
    item: (typeof transactions)[0];
    index: number;
  }) => {
    if (!transactions || transactions.length === 0) return null;

    return (
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions || []} 
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
    marginTop: hp(2),
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
