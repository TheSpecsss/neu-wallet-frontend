import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
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
  const {
    data: transactions,
    isLoading,
    refetch,
  } = useGetRecentTransactions({
    page: 1,
    perPage: 5,
  });

  const balance = useGetUserBalanceQuery().data?.balance;

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
      screen: "CheckOutScreen",
    },
    {
      type: "CASH_TOP_UP",
      label: "Load Balance",
      icon: loadBalanceLogo,
      screen: "LoadScreen",
    },
  ];

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
          <TouchableOpacity
            onPress={() => {
              refetch;
            }}
          >
            <Text style={styles.viewAll}>Refresh</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : transactions?.data?.getRecentTransactionsByUserId?.transactions
            ?.length ? (
          <FlatList
            data={transactions.data.getRecentTransactionsByUserId.transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionTitle}>Transaction</Text>
                <Text style={styles.transactionAmount}>
                  {item.type === "received" ? "+" : "-"}₱
                  {item.amount.toFixed(2)}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text>No recent transactions</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginTop: 20 },
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
  headerText: {
    color: "#FFFFFF",
    fontSize: widthPercentageToDP(5),
    fontFamily: "klavika-regular-italic",
  },
  header2Text: {
    fontFamily: "klavika-medium-italic",
    color: "#FFFFFF",
    fontSize: widthPercentageToDP(7),
    marginTop: widthPercentageToDP(0.9),
    marginRight: widthPercentageToDP(6.5),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  button: { alignItems: "center" },
  buttonText: { marginTop: 5, fontSize: 14, fontWeight: "bold" },
  historyContainer: { marginTop: 20 },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  historyTitle: { fontSize: 18, fontWeight: "bold" },
  viewAll: { fontSize: 14, color: "#007AFF" },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  transactionTitle: { fontSize: 16 },
  transactionAmount: { fontSize: 16, fontWeight: "bold" },
});
