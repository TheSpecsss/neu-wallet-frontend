import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SvgXml } from "react-native-svg";
import {
  walletLogo,
  scanQrLogo,
  sendLogo,
  checkoutLogo,
  loadBalanceLogo,
} from "../../loadSVG";
import { useGetRecentTransactions } from "../../hooks/query/useGetRecentTransactionsQuery";
import { useGetUserBalanceQuery } from "../../hooks/query/useGetBalanceQuery";
import { useSession } from "../../context/Session";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

type Props = { navigation: StackNavigationProp<MainStackParamList> };

const HomeScreen = ({ navigation }: Props) => {
  const { user } = useSession();
  const [page, setPage] = useState(1);
  
  const {
    data: transactions,
    isLoading,
    refetch,
  } = useGetRecentTransactions({
    page,
    perPage: 6, 
  });
  
  const totalPage = transactions?.data?.getRecentTransactionsByUserId?.totalPages || 0;
  const transactionList = (
    transactions?.data?.getRecentTransactionsByUserId?.transactions || [])
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); 

  const balance = useGetUserBalanceQuery().data?.balance;
  
  //To always show the last page of transactions - sab 
  useEffect(() => {
    if (totalPage > 0) {
      setPage(totalPage);
    }
  }, [totalPage]);

  useEffect(() => {
    if (!user) navigation.navigate("LoginScreen");
  }, [user, navigation]);

  if (!user) return null;

  const buttons = [
    { type: "USER", label: "Scan", icon: scanQrLogo("#204A69"), screen: "QRScanScreen" },
    { type: "USER", label: "Send", icon: sendLogo, screen: "SendScreen" },
    {
      type: ["USER", "CASH_TOP_UP", "CASHIER"],
      label: "Checkout",
      icon: checkoutLogo,
      screen: user?.accountType === "CASH_TOP_UP" ? "TopUpCheckoutScreen" : "CheckOutScreen", 
    },
    {
      type: "CASH_TOP_UP",
      label: "Load Balance",
      icon: loadBalanceLogo,
      screen: "LoadScreen",
    },
  ];

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case "DEPOSIT":
        return "Top Up";
      case "PAYMENT":
        return "Payment";
      case "TRANSFER":
        return "Send";
      case "WITHDRAW":
        return "Cashout";
      default:
        return "Unknown";
    }
  };

  const getAmountDisplay = (type: string, amount: number) => {
    const isCashier = user?.accountType === "CASHIER";
    const isTopUpCashier = user?.accountType === "CASH_TOP_UP";

    if (isCashier && type === "PAYMENT") {
      return { display: `+₱${amount.toFixed(2)}`, color: "green" };
    }

    if (isTopUpCashier) {
      if (type === "WITHDRAW") {
        return { display: `+₱${amount.toFixed(2)}`, color: "green" }; 
      }
      return { display: `-₱${amount.toFixed(2)}`, color: "red" };      
    }

    const isOutgoing = type === "PAYMENT" || type === "WITHDRAW";
    const sign = isOutgoing ? "-" : "+";
    const color = isOutgoing ? "red" : "green";

    return { display: `${sign}₱${amount.toFixed(2)}`, color };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NEU Wallet</Text>

      <View style={styles.balanceCard}>
        <SvgXml xml={walletLogo} width={100} height={90} />
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceText}>Available Balance:</Text>
          <Text style={styles.balanceAmount}>
            ₱{Number(balance).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {buttons.map(
          ({ type, label, icon, screen }) =>
            (Array.isArray(type)
              ? type.includes(user.accountType)
              : user.accountType === type) && (
              <TouchableOpacity
                key={label}
                style={styles.button}
                onPress={() => navigation.navigate(screen as never)}
              >
                <SvgXml xml={icon} width={40} height={40} />
                <Text style={styles.buttonText}>{label}</Text>
              </TouchableOpacity>
            )
        )}
      </View>

      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={styles.viewAll}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#204A69" />
        ) : (
          
          <FlatList
            data={transactionList}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text>No recent transactions</Text>}
            renderItem={({ item }) => {
              const label = getTransactionLabel(item.type);
              const { display, color } = getAmountDisplay(
                item.type,
                item.amount
              );

              return (
                <View style={styles.transactionItem}>
                  <View>
                    <Text style={styles.transactionTitle}>{label}</Text>
                    <Text style={styles.transactionDate}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                  </View>
                  <Text style={[styles.transactionAmount, { color }]}>
                    {display}
                  </Text>
                </View>
                
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F2F5F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  balanceCard: {
    backgroundColor: "#204A69",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  balanceInfo: {
    alignItems: "flex-end",
  },
  balanceText: {
    color: "#FFFFFF",
    fontSize: widthPercentageToDP(5),
    fontFamily: "klavika-regular-italic",
  },
  balanceAmount: {
    fontFamily: "klavika-medium-italic",
    color: "#FFFFFF",
    fontSize: widthPercentageToDP(7),
    marginTop: heightPercentageToDP(0.9),
    marginRight: widthPercentageToDP(6.5),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
  },
  buttonText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  historyContainer: {
    marginTop: 20,
    flex: 1,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  viewAll: {
    fontSize: 14,
    color: "#007AFF",
  },
  transactionItem: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#204A69",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDate: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
});
