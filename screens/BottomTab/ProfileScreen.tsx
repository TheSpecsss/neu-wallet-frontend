import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { logoutLogo, personLogo } from "../../loadSVG";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainBottomTabParamlist } from "../../types";

import { logout } from "../../api/auth";

import { getUserInfo } from "../../api/auth";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type ProfileScreenNavigationProp = StackNavigationProp<
  MainBottomTabParamlist,
  "ProfileScreen"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen = () => {
  const navigation = useNavigation();

  const signOut = async () => {
    try {
      await logout();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        })
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const [email, setEmail] = React.useState<string>("");
  const [accType, setAccType] = React.useState<string>("");
  const [accountID, setAccountID] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [dateCreated, setDateCreated] = React.useState<string>("");

  const handleUser = async () => {
    try {
      const userInfo = await getUserInfo();

      setName(userInfo.data.name);
      setAccType(userInfo.data.accountType);
      setEmail(userInfo.data.email);
      setAccountID(userInfo.data.id);
      setDateCreated(userInfo.data.createdAt);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  handleUser();

  const userInfo = {
    name: name,
    accountType: accType,
    accountId: accountID,
    email: email,
    password: "*******",
    createdAt: dateCreated,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileContainer}>
        <SvgXml xml={personLogo} width={80} height={70} />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.role}>{userInfo.accountType}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Account ID:</Text>
          <Text style={styles.detailValue}>{userInfo.accountId}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{userInfo.email}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Change Password:</Text>
          <Text style={styles.detailValue}>{userInfo.password}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date Created:</Text>
          <Text style={styles.detailValue}>{userInfo.createdAt}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.aboutApp}>
        <Text style={styles.aboutAppText}>About Us</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <SvgXml xml={logoutLogo} width={wp(5)} height={hp(5)} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    fontFamily: "klavika-bold",
    color: "#1E3A5F",
  },
  role: {
    fontSize: 14,
    fontFamily: "klavika-bold",
    color: "#8E8E93",
  },
  detailsContainer: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: hp(25),
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: wp(4),
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "klavika-bold",
    color: "#4A4A4A",
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "klavika-bold",
    color: "#4A4A4A",
  },
  aboutApp: {
    marginTop: 30,
    width: "90%",
    backgroundColor: "#E0E0E0",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  aboutAppText: {
    fontSize: 14,
    fontFamily: "klavika-bold",
    color: "#4A4A4A",
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#D1D1D1",
    marginVertical: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 17,
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginLeft: 20,
  },
});
