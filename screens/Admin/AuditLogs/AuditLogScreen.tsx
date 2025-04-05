import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useGetAuditLogsByPagination } from "../../../hooks/query/useGetAuditLogsByPagination";

const ITEMS_PER_PAGE = 10;

const AuditLogScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: logs, isLoading } = useGetAuditLogsByPagination({
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  const auditLogs = logs?.data?.getAuditLogsByPagination?.auditLogs ?? [];
  const filteredLogs = auditLogs.filter((log) =>
    log.actionType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasNextPage = logs?.data?.getAuditLogsByPagination?.hasNextPage ?? false;
  const hasPreviousPage = logs?.data?.getAuditLogsByPagination?.hasPreviousPage ?? false;
  const totalPages = logs?.data?.getAuditLogsByPagination?.totalPages ?? 1;
  const page = logs?.data?.getAuditLogsByPagination?.page ?? 1;

  const handleNextPage = () => {
    if (hasNextPage) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) setCurrentPage((prev) => prev - 1);
  };

  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const toggleDropdown = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#204A69" />
      </View>
    );
  }

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
        data={filteredLogs}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.userCard} onPress={() => toggleDropdown(index)}>
            <FontAwesome name="history" size={40} color="#204A69" style={styles.logo} />
            <View style={styles.rowContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.description}>{item.actionType}</Text>
                <View style={styles.column}>
                  <Text style={styles.info}>
                    {item.executor?.name ?? "Unknown"} made a change to{" "}
                    {item.target?.name ?? "Unknown"}
                  </Text>
                  <Text style={styles.info}>
                    {new Date(item.createdAt).toLocaleString()}
                  </Text>
                </View>
                {expandedItem === index && (
                  <View style={styles.dropdownContainer}>
                    {item.changes?.map((change) => (
                      <View key={change.key} style={styles.changeItem}>
                        <Text style={styles.changeKey}>{change.key}</Text>
                        {change.values?.map((value, idx2) => (
                          <Text key={`${value.from}-${value.to}-${idx2}`} style={styles.changeValue}>
                            From:{" "}
                            <Text style={{ fontWeight: "bold" }}>
                              {value.from ?? "-"}
                            </Text>{" "}
                            ➔ To:{" "}
                            <Text style={{ fontWeight: "bold" }}>
                              {value.to ?? "-"}
                            </Text>
                          </Text>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.noLogsText}>No logs found</Text>}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[styles.paginationButton, !hasPreviousPage && styles.disabledButton]}
          onPress={handlePreviousPage}
          disabled={!hasPreviousPage}
        >
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.smallText}>
          Page {page} of {totalPages}
        </Text>
        <TouchableOpacity
          style={[styles.paginationButton, !hasNextPage && styles.disabledButton]}
          onPress={handleNextPage}
          disabled={!hasNextPage}
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
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
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
    padding: "3%",
    borderRadius: 10,
    marginBottom: "3%",
    position: "relative",
  },
  logo: {
    position: "absolute",
    left: 12,
    top: 16,
  },
  textContainer: {
    flex: 1,
    paddingLeft: "15%",
  },
  description: {
    fontSize: 16,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
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
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: "#204A69",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noLogsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  changeKey: {
    fontSize: 14,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  changeValue: {
    fontSize: 12,
    fontFamily: "klavika-regular",
    color: "#555",
  },
  dropdownContainer: {
    marginTop: 10,
    paddingLeft: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  changeItem: {
    marginBottom: 8,
  },
});
