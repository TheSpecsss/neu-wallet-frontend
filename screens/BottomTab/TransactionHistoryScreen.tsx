import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useGetRecentTransactions } from "../../hooks/query/useGetRecentTransactionsQuery";
import { useSession } from "../../context/Session";
import ReportModal from "./modals/ReportModal";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";

type Props ={ navigation: StackNavigationProp<MainStackParamList>};

const TransactionHistoryScreen = ({navigation}: Props) => {
  const { user } = useSession();
  const [page, setPage] = useState(1);
  const [isModalVisible, setModalVisible] = useState(false);

  const { data: transactions, isLoading } = useGetRecentTransactions({
    page,
    perPage: 10,
  });

  const totalPage = transactions?.data?.getRecentTransactionsByUserId?.totalPages || 0;
  const hasNextPage = transactions?.data?.getRecentTransactionsByUserId?.hasNextPage || false;
  const hasPreviousPage = transactions?.data?.getRecentTransactionsByUserId?.hasPreviousPage || false;
  const transactionList = (transactions?.data?.getRecentTransactionsByUserId?.transactions || []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const hasError = !!transactions?.errors?.length;

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "DEPOSIT": return "Top Up";
      case "PAYMENT": return "Payment";
      case "TRANSFER": return "Send";
      case "WITHDRAW": return "Withdrawal";
      default: return "Unknown";
    }
  };

  const getAmountDisplay = (type: string, amount: number, senderID: string) => {
    const isCashier = user?.accountType === "CASHIER";
    const isTopUpCashier = user?.accountType === "CASH_TOP_UP";

    if (isCashier && type === "PAYMENT") return { display: `+₱${amount.toFixed(2)}`, color: "green" };
    if (isTopUpCashier) {
      if (type === "WITHDRAW") return { display: `+₱${amount.toFixed(2)}`, color: "green" };
      return { display: `-₱${amount.toFixed(2)}`, color: "red" };
    }

    const isOutgoing = type === "PAYMENT" || type === "WITHDRAW" || (type === "TRANSFER" && senderID === user?.id);
    const sign = isOutgoing ? "-" : "+";
    const color = isOutgoing ? "red" : "green";

    return { display: `${sign}₱${amount.toFixed(2)}`, color };
  };

  const getDirectionLabel = (type: string, senderName?: string, receiverName?: string) => {
    const isCashier = user?.accountType === "CASHIER";
    const isTopUpCashier = user?.accountType === "CASH_TOP_UP";

    if (isCashier && type === "PAYMENT") return `From ${senderName || "Unknown"}`;
    if (isTopUpCashier) {
      if (type === "WITHDRAW") return `From ${senderName || "Unknown"}`;
      return `To ${receiverName || "Unknown"}`;
    }

    const isOutgoing = type === "PAYMENT" || type === "WITHDRAW";
    return isOutgoing ? `To ${receiverName || "Unknown"}` : `From ${senderName || "Unknown"}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>

      {isLoading && <ActivityIndicator size="large" color="#204A69" />}
      {hasError && <Text style={styles.message}>Error loading transactions.</Text>}
      {!isLoading && !hasError && transactionList.length === 0 && <Text style={styles.message}>No recent transactions found.</Text>}

      <FlatList
        data={transactionList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const label = getTransactionLabel(item.type);
          const { display, color } = getAmountDisplay(item.type, item.amount, item.senderId);
          const direction = getDirectionLabel(item.type, item.sender?.name, item.receiver?.name);

          return (
            <View style={styles.card}>
              <Text style={styles.direction}>{direction}</Text>
              <View style={styles.transactionRow}>
                <View>
                  <Text style={styles.label}>Transaction: {label}</Text>
                  <Text style={styles.time}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
                <Text style={[styles.amount, { color }]}>{display}</Text>
              </View>
            </View>
          );
        }}
      />

      {user?.accountType !== 'USER' && (
          <TouchableOpacity style={styles.reportButton} onPress={() => user?.accountType === "CASHIER" 
              ? navigation.navigate('TransactionReportScreen')
              : navigation.navigate('TopUpCashierReportScreen')
            }>
            <Text style={styles.reportButtonText}>Generate Report</Text>
          </TouchableOpacity>
      )}


      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.pageButton, !hasPreviousPage && styles.disabledButton]}
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!hasPreviousPage}
        >
          <Text style={styles.pageButtonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>Page {page} of {totalPage}</Text>

        <TouchableOpacity
          style={[styles.pageButton, !hasNextPage && styles.disabledButton]}
          onPress={() => setPage((prev) => prev + 1)}
          disabled={!hasNextPage}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F5F9",
    paddingHorizontal: "5%",
    paddingTop: "3%",
  },
  header: {
    fontSize: 26,
    fontFamily: "klavika-bold",
    textAlign: "center",
    marginVertical: "5%",
    color: "#204A69",
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginVertical: "5%",
  },
  card: {
    backgroundColor: "#FFF",
    padding: "5%",
    borderRadius: 10,
    marginBottom: "5%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  direction: {
    fontSize: 20,
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginBottom: "5%",
    alignSelf: "center",
  },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: "klavika-medium",
    color: "#204A69",
  },
  time: {
    fontSize: 14,
    color: "#777",
    marginTop: "3%",
  },
  amount: {
    fontSize: 20,
    fontFamily: "klavika-bold",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "5%",
  },
  pageButton: {
    backgroundColor: "#204A69",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  pageButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "klavika-bold",
  },
  pageIndicator: {
    fontSize: 16,
    color: "#204A69",
    fontFamily: "klavika-medium",
  },
  reportButton: {
    backgroundColor: "#204A69",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
  },
  reportButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "klavika-bold",
  },
});
