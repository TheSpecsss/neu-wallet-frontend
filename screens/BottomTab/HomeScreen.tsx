import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { loadFont } from "../../loadFont";
import { SvgXml } from "react-native-svg";
import {
  walletLogo,
  scanQrLogo,
  sendLogo,
  checkoutLogo,
  loadBalanceLogo,
} from "../../loadSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainBottomTabParamlist } from "../../types";
import { useRecentTransactions } from "../../hooks/useRecentTransactions";
import { getUserBalance, getUserRole } from "../../api/auth";

import { getUserInfo } from "../../api/auth";

type HomeScreenNavigationProp = StackNavigationProp<
  MainBottomTabParamlist,
  "HomeScreen"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen = ({ navigation }: Props) => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [balance, setBalance] = useState(0.0);
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");

  const {
    data,
    data: transactions,
    isLoading,
    error,
    refetch,
  } = useRecentTransactions(5, 1);

  const handleRefresh = () => {
    refetch();
  };

  const loadUserRole = async () => {
    const role = await getUserRole();
    setRole(role);

    console.log(role);

    const userInfo = await getUserInfo();
    setName(userInfo.name);
  };

  const walletBalance = async () => {
    const balance = await getUserBalance();
    setBalance(balance);
  };

  useEffect(() => {
    loadUserRole();
    walletBalance();
    handleRefresh();

    loadFont().then(() => setIsFontLoaded(true));
  }, []);

  if (!isFontLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>NEU Wallet</Text>
      <View style={styles.balanceCard}>
        {role && role === "USER" && (
          <View style={styles.balanceHeader}>
            <SvgXml xml={walletLogo} width={100} height={90} />
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceText}>Available Balance:</Text>
              <Text style={styles.balanceAmount}>₱{balance.toFixed(2)}</Text>
            </View>
          </View>
        )}
        {role && role !== "USER" && (
          <View style={styles.balanceHeader}>
            <View>
              <Text style={styles.headerText}>Welcome Back: {name}</Text>
              <Text style={styles.header2Text}>Cashier </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        {role && role === "USER" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.getParent()?.navigate("QRScanScreen")}
          >
            <SvgXml xml={scanQrLogo} width={wp(8)} height={hp(10)} />

            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
        )}

        {role && role === "USER" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.getParent()?.navigate("SendScreen")}
          >
            <SvgXml xml={sendLogo} width={wp(8)} height={hp(10)} />
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        )}

        {role &&
          (role === "USER" || role === "CASH_TOP_UP" || role === "CASHIER") && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.getParent()?.navigate("CheckOutScreen")}
            >
              <SvgXml xml={checkoutLogo} width={wp(10.5)} height={hp(10)} />
              <Text style={styles.buttonText}>
                {role === "USER"
                  ? "TopUPs"
                  : role === "CASH_TOP_UP"
                  ? "Chit Out"
                  : "Checkout"}
              </Text>
            </TouchableOpacity>
          )}

        {role && role === "CASH_TOP_UP" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.getParent()?.navigate("LoadScreen")}
          >
            <SvgXml xml={loadBalanceLogo} width={wp(10.5)} height={hp(10)} />

            <Text style={styles.buttonText}>Load Balance</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.historyContainer}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>Recent Transactions</Text>
          <TouchableOpacity
            onPress={() => {
              loadUserRole();
              walletBalance();
              handleRefresh();
            }}
          >
            <Text style={styles.viewAll}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : !transactions || transactions.length === 0 ? (
          <Text>No recent transactions</Text>
        ) : error ? (
          <Text>Error loading transactions.</Text>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <View>
                  <Text style={styles.transactionTitle}>{item.title}</Text>
                  <Text style={styles.transactionDate}>
                    {item.time} {item.date}
                  </Text>
                </View>
                <Text style={styles.transactionAmount}>
                  {item.type === "received" ? "+" : "-"}₱
                  {item.amount.toFixed(2)}
                </Text>
              </View>
            )}
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
    backgroundColor: "#fff",
  },
  header: {
    fontSize: wp(10),
    fontFamily: "klavika-bold",
    marginTop: hp(5),
  },
  balanceCard: {
    backgroundColor: "#204A69",
    padding: wp(7),
    borderRadius: wp(4),
    marginTop: hp(2),
    alignItems: "flex-start",
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
  },
  balanceInfo: {
    alignItems: "flex-end",
  },
  balanceText: {
    color: "#FFFFFF",
    fontSize: wp(5),
    fontFamily: "klavika-regular-italic",
  },
  balanceAmount: {
    fontFamily: "klavika-medium-italic",
    color: "#FFFFFF",
    fontSize: wp(7),
    marginTop: hp(0.9),
    marginRight: wp(6.5),
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: wp(5),
    fontFamily: "klavika-regular-italic",
  },
  header2Text: {
    fontFamily: "klavika-medium-italic",
    color: "#FFFFFF",
    fontSize: wp(7),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: wp(3),
  },
  button: {
    marginTop: hp(2),
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: wp(4),
    fontFamily: "klavika-medium",
    marginTop: -hp(1.5),
  },
  historyContainer: {
    marginTop: hp(3),
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.5),
  },
  historyTitle: {
    fontSize: wp(6),
    fontFamily: "klavika-bold",
  },
  viewAll: {
    fontSize: wp(4),
    fontFamily: "klavika-medium",
    color: "#007AFF",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(1.5),
    borderBottomColor: "#bbb",
    borderBottomWidth: 1.5,
  },
  transactionTitle: {
    fontSize: wp(4.5),
    fontFamily: "klavika-medium",
  },
  transactionDate: {
    fontSize: wp(3.5),
    fontFamily: "klavika-regular",
    color: "#888",
  },
  transactionAmount: {
    fontSize: wp(4.5),
    fontFamily: "klavika-bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: hp(0.5),
  },
});
