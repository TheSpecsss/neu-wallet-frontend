import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Transaction {
  time: string;
  id: string;
  items: number;
  method: string;
  amount: number;
}

const transactions: Transaction[] = [
  { time: '09:15 AM', id: '#0001', items: 3, method: 'Cash', amount: 125.5 },
  { time: '10:30 AM', id: '#0002', items: 2, method: 'Credit Card', amount: 75.25 },
  { time: '11:45 AM', id: '#0003', items: 5, method: 'Cash', amount: 200.0 },
  { time: '01:20 PM', id: '#0004', items: 1, method: 'Debit Card', amount: 45.75 },
  { time: '02:35 PM', id: '#0005', items: 4, method: 'Credit Card', amount: 150.25 },
];

const totalSales = transactions.reduce((acc, t) => acc + t.amount, 0);
const averageSale = totalSales / transactions.length;

const TransactionReportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily Finance Report</Text>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Total Transactions</Text>
          <Text style={styles.value}>${totalSales.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Total Transactions</Text>
          <Text style={styles.value}>{transactions.length}</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.label}>Average Sale</Text>
          <Text style={styles.value}>${averageSale.toFixed(2)}</Text>
        </View>
      </View>

      <Text style={styles.subHeader}>Transaction Details</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Time</Text>
        <Text style={styles.tableHeaderText}>Name</Text>
        <Text style={styles.tableHeaderText}>Transaction Type</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.time}</Text>
            <Text style={styles.cell}>{item.id}</Text>
            <Text style={styles.cell}>{item.method}</Text>
            <Text style={styles.cell}>${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 48,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  summaryCard: {
    width: '30%',
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 3,
    shadowRadius: 4,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontWeight: '600',
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default TransactionReportScreen;
