import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import type { MainStackParamList } from "../../../types";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";
import UpdateNameModal from "./modals/UpdateNameModal";
import UpdateAccountTypeModal from "./modals/UpdateAccountTypeModal";
import SetBalanceModal from "./modals/SetBalanceModal";

type AdminTopTabProps = StackNavigationProp<MainStackParamList, "AdminTopTab">;
type EditUserScreenRouteProp = RouteProp<MainStackParamList, "EditUserScreen">;

type Props = {
  navigation: AdminTopTabProps;
  route: EditUserScreenRouteProp;
};

const EditUserScreen = ({ navigation, route }: Props) => {
  const { id, name, accountType, balance } = route.params;

  const [isNameModalVisible, setNameModalVisible] = useState(false);
  const [isTypeModalVisible, setTypeModalVisible] = useState(false);
  const [isBalanceModalVisible, setBalanceModallVisible] = useState(false);

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate("AdminTopTab")}
          >
            <MaterialIcons name="chevron-left" size={40} color="#204A69" />
          </TouchableOpacity>

          <View style={styles.profileContainer}>
            <FontAwesome name="user-circle" size={100} color="#204A69" />
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userInfo}>
              ID: {id} • Role: {accountType.replace(/_/g, " ")}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Manage User</Text>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Update Name</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionValue}>{name}</Text>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => setNameModalVisible(true)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Update Role</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionValue}>{accountType}</Text>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => setTypeModalVisible(true)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.optionContainer}>
            <Text style={styles.optionLabel}>Set Balance</Text>
            <View style={styles.optionRow}>
              <Text style={styles.optionValue}>₱ {balance.toFixed(2)}</Text>
              <TouchableOpacity 
              style={styles.updateButton}
              onPress={() => setBalanceModallVisible(true)}
              >
                <Text style={styles.buttonText}>Input</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete User</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <UpdateNameModal
        visible={isNameModalVisible}
        onClose={() => setNameModalVisible(false)}
        field="name"
        id={id}
      />

      <UpdateAccountTypeModal
        visible={isTypeModalVisible}
        onClose={() => setTypeModalVisible(false)}
        field="role"
        id={id}
        accountType={accountType} 
      />

      <SetBalanceModal 
      visible={isBalanceModalVisible}
      onClose={() => setBalanceModallVisible(false)}
      field="balance"
      id={id}
      balance={balance} 
      />
    </>
  );
};

export default EditUserScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
    marginTop: "10%",
  },
  userName: {
    fontSize: 24,
    color: "#204A69",
    marginTop: "5%",
    fontFamily: "klavika-bold",
  },
  userInfo: {
    fontSize: 15,
    color: "#204A69",
    textAlign: "center",
    fontFamily: "klavika",
    width: "75%",
    paddingTop: "5%",
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
    width: "28%",
    alignItems: "center",
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
