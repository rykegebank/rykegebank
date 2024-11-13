import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";

const RootStack = createNativeStackNavigator({
  screens: {
    Login: LoginScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default Navigation;
