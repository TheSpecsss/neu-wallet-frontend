import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/BottomTab/HomeScreen";
import NotificationScreen from "../screens/BottomTab/NotificationScreen";
import ProfileScreen from "../screens/BottomTab/ProfileScreen";
import { MainBottomTabParamlist } from "../types";
import { SvgXml } from "react-native-svg";
import { homeLogo, notificationLogo, profileLogo } from "../loadSVG";
import { loadFont } from "./../loadFont";

const BottomNavigator = createBottomTabNavigator<MainBottomTabParamlist>();


const MainBottomTab = () => {
      const [isFontLoaded, setIsFontLoaded] = useState(false);
      useEffect(() => {
        if (!isFontLoaded) {
          loadFont().then(() => setIsFontLoaded(true));
        }
      }, []);
  return (
    <BottomNavigator.Navigator
    initialRouteName ="HomeScreen"
    screenOptions={{
        tabBarActiveTintColor: '#FFD700',
        tabBarInactiveTintColor:'white',
        tabBarStyle: { backgroundColor: "#204A69", height: 59, paddingBottom: 5 },
    }}

    >
      <BottomNavigator.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
            headerShown: false,
            tabBarLabel: 'Home',
            tabBarLabelStyle: {fontSize: 12, fontFamily: "klavika-medium-italic"},
            tabBarIcon: ({ focused }) => <SvgXml xml={homeLogo(focused ? "#FFD700" : "white")} width={20} height={25} />, 
        }}
      />
      <BottomNavigator.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
            headerShown: false,
            tabBarLabel: 'Notification',
            tabBarLabelStyle: {fontSize: 12, fontFamily: "klavika-medium-italic"},
            tabBarIcon: ({ focused }) => <SvgXml xml={notificationLogo(focused ? "#FFD700" : "white")} width={20} height={25} />, 
        }}
      />
      <BottomNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
            headerShown: false,
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {fontSize: 12, fontFamily: "klavika-medium-italic"},
            tabBarIcon: ({ focused }) => <SvgXml xml={profileLogo(focused ? "#FFD700" : "white")} width={20} height={25} />, 
        }}
      />
    </BottomNavigator.Navigator>
  );
};

export default MainBottomTab;

