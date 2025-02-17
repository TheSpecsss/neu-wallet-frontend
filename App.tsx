import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LandingScreen from "./screens/LandingScreen";
import SplashScreen from "./screens/SplashScreen";
import MainBottomTab from "./navigation/MainBottomTab";
import ConfirmTransactionScreen from "./screens/ConfirmTransactionScreen";
import DetailsScreen from "./screens/DetailsScreen";
import SendScreen from "./screens/SendScreen";
import { type MainStackParamList, MainBottomTabParamlist } from "./types";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { loadFont } from "./loadFont";

const MainStack = createNativeStackNavigator<MainStackParamList>();

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, [isFontLoaded]);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="MainBottomTab">
        <MainStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="MainBottomTab"
          component={MainBottomTab}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="ConfirmTransactionScreen"
          component={ConfirmTransactionScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="SendScreen"
          component={SendScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
