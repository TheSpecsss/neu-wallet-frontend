import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { loadFont } from "../../loadFont";
import { SvgXml } from "react-native-svg";
import { walletLogo, scanQrLogo, sendLogo } from "../../loadSVG";
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from "react-native-responsive-screen";

const transactions = [
  { id: "1", title: "Received Money", time: "02:45 PM", date: "02/02/2025", amount: 100.00, type: "received" },
  { id: "2", title: "Sent Money", time: "03:15 PM", date: "02/02/2025", amount: 50.00, type: "sent" },
  { id: "3", title: "Received Money", time: "04:00 PM", date: "02/02/2025", amount: 200.00, type: "received" },
  { id: "4", title: "Sent Money", time: "04:30 PM", date: "02/02/2025", amount: 30.00, type: "sent" },
  { id: "5", title: "Received Money", time: "05:00 PM", date: "02/02/2025", amount: 150.00, type: "received" },
];


const HomeScreen = () => {
    const [isFontLoaded, setIsFontLoaded] = useState(false);
    const [balance, setBalance] = useState(967.00);

    useEffect(() => {
      if (!isFontLoaded) {
        loadFont().then(() => setIsFontLoaded(true));
      }
    }, []);

    if (!isFontLoaded) {
      return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>NEU Wallet</Text>
            <View style={styles.balanceCard}>
                <View style={styles.balanceHeader}>
                    <SvgXml xml={walletLogo} width={100} height={90} />
                    <View style={styles.balanceInfo}>
                        <Text style={styles.balanceText}>Available Balance:</Text>
                        <Text style={styles.balanceAmount}>₱{balance.toFixed(2)}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                  <SvgXml xml={scanQrLogo} width={wp(10)} height={hp(10)}/>
                  <Text style={styles.buttonText}>Scan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  
                  <SvgXml xml={sendLogo} width={wp(8)} height={hp(10)}/>
                  <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>History</Text>   
                <TouchableOpacity>
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                    data={transactions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.transactionItem}>
                            <View>
                                <Text style={styles.transactionTitle}>{item.title}</Text>
                                <Text style={styles.transactionDate}>{item.time}  {item.date}</Text>
                            </View>
                            <Text style={styles.transactionAmount}>
                                {item.type === "received" ? "+" : "-"}₱{item.amount.toFixed(2)}
                            </Text>
                        </View>
                    )}
                />
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
    marginTop: hp (5),
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
