import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import MenuScreen from "../screens/MenuScreen";
import BottomNav from "../components/BottomNav";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import PasswordResetScreen from "../screens/PasswordResetScreen";
import CodeVerificationScreen from "../screens/CodeVerificationScreen";
import ProfileChangePasswordScreen from "../screens/ProfileChangePasswordScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import FaqScreen from "../screens/FaqScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";
import DepositDetailsScreen from "../screens/DepositDetailsScreen";

import TransferMyBank from "../screens/TransferMyBank";
import TransferHistory from "../screens/TransferHistory";
import WireTransfer from "../screens/WireTransfer";
import OtpScreen from "../screens/OtpScreen";
import TranferOtherBank from "../screens/TransferOtherBank";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tab.Screen name={Routes.home} component={HomeScreen} />
      <Tab.Screen name={Routes.transfer} component={TransferScreen} />
      <Tab.Screen name={Routes.transaction} component={TransactionScreen} />
      <Tab.Screen name={Routes.menu} component={MenuScreen} />
    </Tab.Navigator>
  );
};

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.splash}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={Routes.splash} component={SplashScreen} />
        <Stack.Screen name={Routes.login} component={LoginScreen} />
        <Stack.Screen name={Routes.register} component={RegisterScreen} />
        <Stack.Screen
          name={Routes.forgotPassword}
          component={ForgotPasswordScreen}
        />

        <Stack.Screen name={Routes.main} component={BottomTabNavigator} />

        <Stack.Screen name={Routes.deposit} component={DepositScreen} />
        <Stack.Screen name={Routes.fdr} component={FdrScreen} />
        <Stack.Screen name={Routes.dps} component={DpsScreen} />
        <Stack.Screen name={Routes.loan} component={LoanScreen} />
        <Stack.Screen name={Routes.withdraw} component={WithdrawScreen} />
        <Stack.Screen name={Routes.referral} component={ReferralScreen} />
        <Stack.Screen name={Routes.profile} component={ProfileScreen} />
        <Stack.Screen
          name={Routes.completeProfile}
          component={CompleteProfileScreen}
        />
        <Stack.Screen
          name={Routes.codeVerification}
          component={CodeVerificationScreen}
        />
        <Stack.Screen
          name={Routes.resetPassword}
          component={PasswordResetScreen}
        />
        <Stack.Screen
          name={Routes.profileChangePassword}
          component={ProfileChangePasswordScreen}
        />
        <Stack.Screen
          name={Routes.notificationList}
          component={NotificationsScreen}
        />
        <Stack.Screen name={Routes.faqs} component={FaqScreen} />
        <Stack.Screen name={Routes.privacy} component={PrivacyScreen} />
        <Stack.Screen
          options={{
            presentation: "transparentModal",
            animation: "fade_from_bottom",
          }}
          name={Routes.transactionDetails}
          component={TransactionDetailsScreen}
        />
        <Stack.Screen
          options={{
            presentation: "transparentModal",
            animation: "fade_from_bottom",
          }}
          name={Routes.depositDetails}
          component={DepositDetailsScreen}
        />
        <Stack.Screen name={Routes.transferMyBank} component={TransferMyBank} />
        <Stack.Screen name={Routes.wireTransfer} component={WireTransfer} />
        <Stack.Screen
          name={Routes.transferHistory}
          component={TransferHistory}
        />
        <Stack.Screen name={Routes.otp} component={OtpScreen} />
        <Stack.Screen
          name={Routes.tranferOtherBank}
          component={TranferOtherBank}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
