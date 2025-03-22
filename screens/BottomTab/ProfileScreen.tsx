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
import Toast from "react-native-toast-message";

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
      Toast.show({
        type: "success",
        text1: `User "${name}" logged out.`,
      });
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
    paddingTop: hp(10),  
  },
  header: {
    fontSize: wp(5), 
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginBottom: hp(1.5), 
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: hp(2), 
  },
  name: {
    fontSize: wp(5), 
    fontFamily: "klavika-bold",
    color: "#1E3A5F",
  },
  role: {
    fontSize: wp(3), 
    fontFamily: "klavika-bold",
    color: "#8E8E93",
  },
  detailsContainer: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: wp(5), 
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: hp(20), 
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: hp(1), 
    borderBottomWidth: 1, 
    borderBottomColor: "#E0E0E0",
    marginBottom: hp(2), 
  },
  detailLabel: {
    fontSize: wp(3.5), 
    fontFamily: "klavika-bold",
    color: "#4A4A4A",
  },
  detailValue: {
    fontSize: wp(3.5), 
    fontFamily: "klavika-bold",
    color: "#4A4A4A",
  },
  aboutApp: {
    marginTop: hp(4), 
    width: "90%",
    backgroundColor: "#E0E0E0",
    padding: 12, 
    borderRadius: 10,
    alignItems: "center",
  },
  aboutAppText: {
    fontSize: wp(4), 
    fontFamily: "klavika-bold",
    color: "#4A4A4A",
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#D1D1D1",
    marginVertical: hp(2), 
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    paddingVertical: hp(1), 
    borderRadius: 10, 
  },
  logoutText: {
    fontSize: wp(4), 
    fontFamily: "klavika-bold",
    color: "#204A69",
    marginLeft: hp(2), 
  },
});
