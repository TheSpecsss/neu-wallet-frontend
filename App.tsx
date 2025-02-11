import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { loadFont } from "./loadFont";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LandingScreen from "./screens/LandingScreen";
import { MainStackParamList } from "./types";
import SplashScreen from "./screens/SplashScreen";

const MainStack = createNativeStackNavigator<MainStackParamList>();

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  useEffect(() => {
    if (!isFontLoaded) {
      loadFont().then(() => setIsFontLoaded(true));
    }
  }, []);
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="SplashScreen">
        <MainStack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
export default App;
