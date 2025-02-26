import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import type { MainStackParamList } from "../../../types";
import type { StackNavigationProp } from "@react-navigation/stack";

type AdminTopTabProps = StackNavigationProp<
  MainStackParamList, "AdminTopTab">

type Props = {
    navigation: AdminTopTabProps;
};

const EditUserScreen = ({navigation}:Props) => {
  const user = {
    name: "Daniel Joshua Saberon",
    id: "22-13207-591",
    role: "Cashier",
    balance: "₱ 0.00",
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("AdminTopTab")}>
        <MaterialIcons name="chevron-left" size={40} color="#204A69" />
      </TouchableOpacity>
      
      <View style={styles.profileContainer}>
        <FontAwesome name="user-circle" size={100} color="#204A69" />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userInfo}>ID: {user.id}  •  <Text style={styles.userRole}>Role: {user.role}</Text></Text>
      </View>
      
      <Text style={styles.sectionTitle}>Manage User</Text>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Update Name</Text>
        <View style={styles.optionRow}>
          <Text style={styles.optionValue}>{user.name}</Text>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Update Role</Text>
        <View style={styles.optionRow}>
          <Text style={styles.optionValue}>{user.role}</Text>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.optionContainer}>
        <Text style={styles.optionLabel}>Set Balance</Text>
        <View style={styles.optionRow}>
          <Text style={styles.optionValue}>{user.balance}</Text>
          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.buttonText}>Input</Text>
        </TouchableOpacity>
        </View>
        

      </View>
      
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete User</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
      alignItems: "center",
    },
    backButton: { 
        alignSelf: "flex-start",
        borderWidth: 1,
        borderRadius: 10,
        marginTop: "15%",
    },
    profileContainer: {
      alignItems: "center",
      marginVertical: "10%",
    },
    userName: {
      fontSize: 28,
      color: "#204A69",
      marginTop: "10%",
      fontFamily: "klavika-bold",
    },
    userInfo: {
      fontSize: 16,
      color: "#204A69",
      textAlign: "center",
      fontFamily: "klavika",
    },
    userRole: {
      fontFamily: "klavika",
    },
    sectionTitle: {
      fontSize: 24,
      marginBottom: "3%",
      alignSelf: "flex-start",
      fontFamily: "klavika-bold",
      color: "#204A69",
    },
    optionContainer: {
      width: "100%",
      marginBottom: "3%",
    },
    optionLabel: {
      fontSize: 16,
      flexDirection: "row",
      fontFamily: "klavika-bold",
      color: "#204A69",
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "3%",
      borderRadius: 5,
    },
    optionValue: {
      backgroundColor: "#f5f5f5",
      fontSize: 16,
      flex: 1,
      fontFamily: "klavika",
      color: "#204A69",
      padding: "3%",
      borderRadius: 5,
    },
    updateButton: {
      backgroundColor: "#204A69",
      paddingVertical: "3%",
      paddingHorizontal: "5%",
      borderRadius: 5,
      marginLeft: "3%",
      width:"28%",
      alignItems:"center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontFamily: "klavika-bold",
      
    },
    deleteButton: {
      backgroundColor: "#d9534f",
      padding: "4%",
      borderRadius: 5,
      alignItems: "center",
      width: "70%",
      marginTop: "6%",
    },
    deleteButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
      fontFamily: "klavika",
    },
  });
  
