import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import DepositScreen from "../screens/DepositScreen";
import FdrScreen from "../screens/FdrScreen";
import DpsScreen from "../screens/DpsScreen";
import LoanScreen from "../screens/LoanScreen";
import WithdrawScreen from "../screens/WithdrawScreen";
import TransferScreen from "../screens/TransferScreen";
import TransactionScreen from "../screens/TransactionScreen";
import ReferralScreen from "../screens/ReferralScreen";
import ProfileScreen from "../screens/ProfileScreen";
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
        <Stack.Screen name={Routes.deposit} component={DepositScreen} />
        <Stack.Screen name={Routes.fdr} component={FdrScreen} />
        <Stack.Screen name={Routes.dps} component={DpsScreen} />
        <Stack.Screen name={Routes.loan} component={LoanScreen} />
        <Stack.Screen name={Routes.withdraw} component={WithdrawScreen} />
        <Stack.Screen name={Routes.transfer} component={TransferScreen} />
        <Stack.Screen name={Routes.transaction} component={TransactionScreen} />
        <Stack.Screen name={Routes.referral} component={ReferralScreen} />
        <Stack.Screen name={Routes.profile} component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
