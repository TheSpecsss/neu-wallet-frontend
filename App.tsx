import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loadFont } from "./loadFont";
import LoginScreen from "./screens/OnboardingScreens/LoginScreen";
import RegisterScreen from "./screens/OnboardingScreens/RegisterScreen";
import LandingScreen from "./screens/OnboardingScreens/LandingScreen";
import SplashScreen from "./screens/OnboardingScreens/SplashScreen";
import MainBottomTab from "./navigation/MainBottomTab";
import QRScanScreen from "./screens/TransactionScreen/QRScreen/QRScanScreen";
import ConfirmTransactionScreen from "./screens/TransactionScreen/ConfirmTransactionScreen";
import DetailsScreen from "./screens/TransactionScreen/DetailsScreen";
import SendScreen from "./screens/TransactionScreen/SendScreen";
import LoadScreen from "./screens/TransactionScreen/LoadScreen";
import CheckOutScreen from "./screens/TransactionScreen/CheckOutScreen";
import QRGenerateScreen from "./screens/TransactionScreen/QRScreen/QRGenerateScreen";
import AdminTopTab from "./navigation/AdminTopTab";
import EmailConfirmationScreen from "./screens/OnboardingScreens/EmailConfirmationScreen";
import { type MainStackParamList, MainBottomTabParamlist } from "./types";
import EditUserScreen from "./screens/Admin/optionScreens/EditUserScreen";
import QRGeneratorScreen from "./screens/TransactionScreen/QRGeneratorScreen";
import { getUserRole } from "./api/auth";

const MainStack = createNativeStackNavigator<MainStackParamList>();
const queryClient = new QueryClient();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const role = await getUserRole();
      console.log("User Role:", role);

      if (role === "SUPER_ADMIN") {
        setInitialRoute("AuditLogsScreen");
      } else {
        setInitialRoute("MainBottomTab");
      }
    };

    checkUserRole();
  }, []);

  if (!initialRoute) return <SplashScreen />; // Show loading while checking role

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="LandingScreen">
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
            name="QRScanScreen"
            component={QRScanScreen}
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
          <MainStack.Screen
            name="LoadScreen"
            component={LoadScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="CheckOutScreen"
            component={CheckOutScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="AdminTopTab"
            component={AdminTopTab}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="QRGenerateScreen"
            component={QRGenerateScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="EditUserScreen"
            component={EditUserScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="EmailConfirmationScreen"
            component={EmailConfirmationScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="QRGeneratorScreen"
            component={QRGeneratorScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
        <Toast />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
