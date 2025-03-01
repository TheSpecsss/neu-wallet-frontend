import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const auditLogs = [
  { id: "1", action: "Role Updated", reference: "REF-002", timestamp: "Feb 19, 2025 16:34" },
  { id: "2", action: "Delete User", reference: "REF-003", timestamp: "Feb 19, 2025 16:34" },
  { id: "3", action: "Name Updated", reference: "REF-004", timestamp: "Feb 19, 2025 16:34" },
  { id: "4", action: "User Created", reference: "REF-005", timestamp: "Feb 19, 2025 16:34" },
  { id: "5", action: "Role Updated", reference: "REF-006", timestamp: "Feb 19, 2025 16:34" },
  { id: "6", action: "Delete User", reference: "REF-003", timestamp: "Feb 19, 2025 16:34" },
  { id: "7", action: "Name Updated", reference: "REF-004", timestamp: "Feb 19, 2025 16:34" },
  { id: "8", action: "User Created", reference: "REF-005", timestamp: "Feb 19, 2025 16:34" },
  { id: "9", action: "Role Updated", reference: "REF-006", timestamp: "Feb 19, 2025 16:34" },
];

const ITEMS_PER_PAGE = 6;

const AuditLogScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLogs.length / ITEMS_PER_PAGE);
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>Audit Logs</Text>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search log"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="search" size={20} color="#204A69" />
        </View>
        <TouchableOpacity style={{ marginHorizontal: "5%" }}>
          <FontAwesome name="filter" size={30} color="#204A69" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={paginatedLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <FontAwesome name="history" size={40} color="#204A69" style={{ marginRight: "3%" }} />
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.description}>{item.action}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.info}>{item.timestamp}</Text>
                <Text style={styles.info}>{item.reference}</Text>
              </View>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
          onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.smallText}>Page {currentPage} of {totalPages}</Text>

        <TouchableOpacity
          style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
          onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FontAwesome name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuditLogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "#fff",
  },
  rowContainer: { 
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 16,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  largeText: {
    fontSize: 36,
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginBottom: 15,
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: "5%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#204A69",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  info: {
    fontSize: 12,
    fontFamily: "klavika-regular",
    color: "#999",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationButton: {
    padding: 10,
    backgroundColor: "#204A69",
    borderRadius: 8,
    marginTop: "3%",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
});
