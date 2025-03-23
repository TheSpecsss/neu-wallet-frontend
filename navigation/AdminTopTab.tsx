import React, { useCallback } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import UserScreen from "../screens/Admin/UserScreen";
import AuditLogScreen from "../screens/Admin/AuditLogScreen";
import type { AdminTopTabParamList } from "../types";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useSession } from "../context/Session";
import type { StackNavigationProp } from "@react-navigation/stack";

const TopTab = createMaterialTopTabNavigator<AdminTopTabParamList>();

const AdminTopTab = () => {
  const navigation = useNavigation<StackNavigationProp<AdminTopTabParamList>>();
  const { user, clearSession } = useSession();

  const signOut = useCallback(async () => {
    try {
      await clearSession();

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "LoginScreen" }],
        })
      );
      Toast.show({
        type: "success",
        text1: "Successfully logged out",
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [clearSession, navigation.dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.mediumText}>Hi {user?.name}!</Text>
          <Text style={styles.smallText}>
            Welcome back to your admin panel.
          </Text>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <FontAwesome name="sign-out" size={24} color="#204A69" />
        </TouchableOpacity>
      </View>

      <TopTab.Navigator
        initialRouteName="UserScreen"
        screenOptions={{
          tabBarShowIcon: true,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#204A69",
          tabBarStyle: styles.tabBar,
          tabBarIndicatorStyle: { backgroundColor: "transparent" },
          tabBarPressColor: "transparent",
        }}
      >
        <TopTab.Screen
          name="UserScreen"
          component={UserScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <View
                style={[styles.tabButton, focused && styles.tabButtonActive]}
              >
                <FontAwesome
                  name="users"
                  size={16}
                  color={focused ? "#fff" : "#204A69"}
                />
                <Text style={[styles.tabText, focused && styles.tabTextActive]}>
                  Users
                </Text>
              </View>
            ),
          }}
        />
        <TopTab.Screen
          name="AuditLogScreen"
          component={AuditLogScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <View
                style={[styles.tabButton, focused && styles.tabButtonActive]}
              >
                <FontAwesome
                  name="file-text"
                  size={16}
                  color={focused ? "#fff" : "#204A69"}
                />
                <Text style={[styles.tabText, focused && styles.tabTextActive]}>
                  Audit Logs
                </Text>
              </View>
            ),
          }}
        />
      </TopTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginTop: "5%",
    marginBottom: "10%",
  },
  mediumText: {
    fontSize: 32,
    fontFamily: "klavika-bold",
    color: "#204A69",
  },
  smallText: {
    fontSize: 14,
    color: "gray",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAEAEA",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderRadius: 6,
    gap: 5,
  },
  signOutText: {
    color: "#204A69",
    fontFamily: "klavika-bold",
    fontSize: 14,
  },
  tabBar: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    marginHorizontal: "30%",
    marginLeft: 0,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: "5%",
    paddingVertical: "5%",
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#204A69",
  },
  tabButtonActive: {
    backgroundColor: "#204A69",
  },
  tabText: {
    fontSize: 14,
    color: "#204A69",
  },
  tabTextActive: {
    color: "#fff",
  },
});

export default AdminTopTab;
