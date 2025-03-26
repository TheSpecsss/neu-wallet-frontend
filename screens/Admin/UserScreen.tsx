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
import { useGetUsersByPagination } from "../../hooks/query/useGetUsersByPagination";
import type { AccountTypeKind, MainStackParamList } from "../../types";
import type { StackNavigationProp } from "@react-navigation/stack";

type EditUserScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  "EditUserScreen"
>;

type Props = {
  navigation: EditUserScreenNavigationProp;
};

const ITEMS_PER_PAGE = 10;

const UserScreen = ({ navigation }: Props) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: users, isLoading } = useGetUsersByPagination({
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
  });

  const fetchedUsers = users?.data?.getUsersByPagination?.users ?? [];
  const hasNextPage = users?.data?.getUsersByPagination?.hasNextPage ?? false;
  const hasPreviousPage =
    users?.data?.getUsersByPagination?.hasPreviousPage ?? false;
  const totalPages = users?.data?.getUsersByPagination?.totalPages ?? 1;
  const page = users?.data?.getUsersByPagination?.page ?? 1;

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
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
      <Text style={styles.header}>Users</Text>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search users"
            placeholderTextColor="#aaa"
          />
          <FontAwesome name="search" size={20} color="#204A69" />
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome name="filter" size={30} color="#204A69" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={fetchedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <FontAwesome
              name="user-circle"
              size={40}
              color="#204A69"
              style={styles.userIcon}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userRole}>
                Account Type: {item.accountType.replace(/_/g, " ")}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("EditUserScreen", {
                    id: item.id,
                    name: item.name,
                    accountType: item.accountType as AccountTypeKind,
                    balance: item.wallet?.balance ?? 0,
                  })
                }
              >
                <FontAwesome name="pencil" size={22} color="#204A69" />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome name="trash" size={18} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noUsersText}>No users found</Text>
        }
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={[
            styles.paginationButton,
            !hasPreviousPage && styles.disabledButton,
          ]}
          onPress={handlePreviousPage}
          disabled={!hasPreviousPage}
        >
          <FontAwesome name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Page {page} of {totalPages}
        </Text>

        <TouchableOpacity
          style={[
            styles.paginationButton,
            !hasNextPage && styles.disabledButton,
          ]}
          onPress={handleNextPage}
          disabled={!hasNextPage}
        >
          <FontAwesome name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingBottom: "5%",
  },
  header: {
    fontSize: 36,
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginBottom: 15,
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#204A69",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    flex: 1,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    paddingHorizontal: 10,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  userIcon: {
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  userRole: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  paginationButton: {
    padding: 10,
    backgroundColor: "#204A69",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  pageText: {
    fontSize: 16,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  noUsersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
