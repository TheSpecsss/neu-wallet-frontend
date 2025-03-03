import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { DeleteUserModal } from "./optionScreens/modals/DeleteUserModal";
import type {  MainStackParamList } from "../../types";
import type { StackNavigationProp } from "@react-navigation/stack";

type EditUserScreenNavigationProp = StackNavigationProp<
  MainStackParamList, "EditUserScreen">

type Props = {
    navigation: EditUserScreenNavigationProp;
  };

const users = [
  { id: "1", name: "Daniel Joshua Saberon", role: "Cashier" },
  { id: "2", name: "John Victor Gonzales", role: "Admin" },
  { id: "3", name: "Luis Joshua Bulatao", role: "User" },
  { id: "4", name: "User 1", role: "User" },
  { id: "5", name: "User 2", role: "Cashier" },
  { id: "6", name: "User 3", role: "Cashier" },
  { id: "7", name: "User 4", role: "User" },
  { id: "8", name: "User 5", role: "User" },
];

const ITEMS_PER_PAGE = 6;

const UserScreen = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <View style={styles.container}>
      <Text style={styles.largeText}>Users</Text>

      <View style={styles.searchFilterContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search users"
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FontAwesome name="search" size={20} color="#204A69" />
        </View>
        <TouchableOpacity style={{marginHorizontal:"5%"}}>
          <FontAwesome name="filter" size={30} color="#204A69" />
        </TouchableOpacity>
      </View>
 

      <FlatList
        data={paginatedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <FontAwesome name="user-circle" size={40} color="#204A69" style={{marginRight:"3%"}} />
            <View style={styles.rowContainer}>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userRole}>Role: {item.role}</Text>
              </View> 
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => navigation.navigate("EditUserScreen")}>
                  <FontAwesome name="pencil" size={18} color="#204A69" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsDeleteModalVisible(true)}>
                  <FontAwesome name="trash" size={18} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <DeleteUserModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onConfirmDelete={() => {
          setIsDeleteModalVisible(false);
          // TODO: Add logic to delete the user
        }}
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

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: "5%",
    paddingHorizontal: "5%",
    backgroundColor: "#fff",
  },
  rowContainer:{ 
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconRow: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    gap: "25%"
  },
  smallText:{
    fontSize: 16,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  largeText: {
    fontSize: 36  ,
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
  userName: {
    fontSize: 16,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  userRole: {
    fontSize: 12,
    fontFamily: "klavika-regular",
    color: "#666",
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