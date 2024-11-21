import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import Routes from "../constants/routes";

export type RootStackParamList = {
  LoginScreen: undefined;
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.splash}>
        <Stack.Screen name={Routes.splash} component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name={Routes.login} component={LoginScreen} />
        <Stack.Screen name={Routes.home} component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
