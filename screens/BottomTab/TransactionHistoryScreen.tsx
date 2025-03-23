import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useGetRecentTransactions } from "../../hooks/query/useGetRecentTransactionsQuery";

const TransactionHistoryScreen = () => {
  const { data: transactions, isLoading } = useGetRecentTransactions({
    page: 1,
    perPage: 5,
  });

  const transactionList =
    transactions?.data?.getRecentTransactionsByUserId?.transactions || [];
  const hasError = !!transactions?.errors?.length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>

      {isLoading && <ActivityIndicator size="large" color="#000" />}
      {hasError && (
        <Text style={styles.message}>Error loading transactions.</Text>
      )}
      {!isLoading && !hasError && transactionList.length === 0 && (
        <Text style={styles.message}>No recent transactions found.</Text>
      )}

      <FlatList
        data={transactionList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.date}>{item.createdAt}</Text>
            <View style={styles.transactionRow}>
              <View>
                <Text style={styles.title}>{item.type}</Text>
                <Text style={styles.time}>{item.createdAt}</Text>
              </View>
              <Text style={styles.amount}>+₱{item.amount.toFixed(2)}</Text>
            </View>
          </View>
        )}
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
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },
  transactionItem: {
    marginTop: 20,
  },
  date: {
    fontSize: 22,
    fontFamily: "klavika-bold",
    marginTop: 10,
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
