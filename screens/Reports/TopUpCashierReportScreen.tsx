import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSession } from '../../context/Session';
import type { StackNavigationProp } from "@react-navigation/stack";
import type { MainStackParamList } from "../../types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import {
  backLogo
} from "../../loadSVG";
import { SvgXml } from "react-native-svg";

type Props = { navigation: StackNavigationProp<MainStackParamList> };

interface Transaction {
  time: string;
  id: string;
  items: number;
  method: string;
  amount: number;
  date: string; 
}


const transactions: Transaction[] = [
  { time: '09:15 AM', id: '#0001', items: 3, method: 'TopUp', amount: 10000.00, date: '2025-04-25' },
  { time: '10:30 AM', id: '#0002', items: 2, method: 'CashOut', amount: 75.25, date: '2025-04-25' },
  { time: '11:45 AM', id: '#0003', items: 5, method: 'TopUp', amount: 200.0, date: '2025-04-24' },
  { time: '01:20 PM', id: '#0004', items: 1, method: 'CashOut', amount: 45.75, date: '2025-04-23' },
  { time: '02:35 PM', id: '#0005', items: 4, method: 'TopUp', amount: 150.25, date: '2025-04-25' },
];

const formatDate = (date: Date) => date.toISOString().split('T')[0];

const TopUpCashierReportScreen = ({ navigation }: Props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleConfirm = (date: Date) => {
    const today = new Date();
    const isToday = formatDate(date) === formatDate(today);

    if (isToday) {
      setSelectedDate(null); 
    } else {
      setSelectedDate(date);
    }

    setDatePickerVisibility(false);
  };

  const todayDate = formatDate(new Date());
  const filteredTransactions = selectedDate
    ? transactions.filter((t) => t.date === formatDate(selectedDate))
    : transactions.filter((t) => t.date === todayDate); 

  // Calculate Total Cash Outs
  const totalCashOuts = filteredTransactions
    .filter((t) => t.method === 'CashOut')
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate Total Top Up
  const totalTopUp = filteredTransactions
    .filter((t) => t.method === 'TopUp')
    .reduce((acc, t) => acc + t.amount, 0);

  // Calculate Net Cash Flow
  const netCashFlow = totalTopUp - totalCashOuts;

  // Count Transactions
  const totalCashOutTransactions = filteredTransactions.filter((t) => t.method === 'CashOut').length;
  const totalTopUpTransactions = filteredTransactions.filter((t) => t.method === 'TopUp').length;
  const allTransactions = totalCashOutTransactions + totalTopUpTransactions;

  const dynamicHeader = selectedDate
    ? `${format(selectedDate, 'MMMM d, yyyy')} Transactions`
    : "Daily Transactions";

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <SvgXml
          xml={backLogo}
          style={{ width: wp(7), height: hp(7) }}
          fill="black"
          />
        </TouchableOpacity>

        <Text style={styles.header}>Daily Finance Report</Text>
        <View style={styles.headerCard}>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={{ fontSize: wp(2), color: '#999' }}>
              {selectedDate ? formatDate(selectedDate) : 'Pick a Date'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Net Cash Flow</Text>
          <Text style={styles.value}>₱{netCashFlow.toFixed(2)}</Text>
          <Text style={styles.cardSub}>All Transactions: {allTransactions}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Total Cash outs</Text>
          <Text style={styles.value}>₱{totalCashOuts.toFixed(2)}</Text>
          <Text style={styles.cardSub}>Transactions: {totalCashOutTransactions}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Total Top Up</Text>
          <Text style={styles.value}>₱{totalTopUp.toFixed(2)}</Text>
          <Text style={styles.cardSub}>Transactions: {totalTopUpTransactions}</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>{dynamicHeader}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Time</Text>
        <Text style={styles.tableHeaderText}>Name</Text>
        <Text style={styles.tableHeaderText}>Transaction Type</Text>
        <Text style={styles.tableHeaderText}>Status</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
      </View>

      {filteredTransactions.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#999' }}>
          No transactions found for this date.
        </Text>
      ) : (
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.cell}>{item.time}</Text>
              <Text style={styles.cell}>{item.id}</Text>
              <Text style={styles.cell}>{item.method}</Text>
              <Text style={styles.cell}>Success</Text>
              <Text style={styles.cell}>₱ {item.amount.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: hp(8),
    backgroundColor: '#fff',
    flex: 1,
  },
  headerCard: {
    width: wp(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: wp(1),
    marginBottom: hp(3.5),
    borderRadius: wp(1),
    elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  header: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: hp(4),
  },
  subHeader: {
    fontSize: wp(5),
    fontWeight: '600',
    marginTop: hp(5),
    marginBottom: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  summaryCard: {
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: wp(5),
    marginBottom: hp(0.2),
    borderRadius: wp(2),
    elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: wp(2.7),
    color: '#888',
  },
  value: {
    fontSize: wp(3),
    fontWeight: 'bold',
    marginTop: hp(1),
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: hp(0.2),
    paddingBottom: hp(1),
    marginBottom: hp(1),
    marginTop: hp(1),
  },
  tableHeaderText: {
    fontWeight: '600',
    fontSize: wp(3),
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: hp(1.8),
    borderBottomWidth: wp(0.5),
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: wp(3),
  },
  cardSub: {
    fontSize: wp(2  ),
    color: '#999',
  },
});

export default TopUpCashierReportScreen;
