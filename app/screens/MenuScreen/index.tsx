import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, List, Divider, Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Routes, Strings } from "../../constants";
import AppBar from "../../components/GenericAppBar";
import { useNavigation } from "@react-navigation/native";

const MenuScreen = () => {
  const navigation = useNavigation();
  const menuItems = [
    {
      title: "Profile",
      icon: "account",
      onPress: () => {
        navigation.navigate(Routes.profile);
      },
    },
    {
      title: "Change Password",
      icon: "key",
      onPress: () => {
        navigation.navigate(Routes.profileChangePassword);
      },
    },
    {
      title: "Referral",
      icon: "account-group",
      onPress: () => {
        navigation.navigate(Routes.referral);
      },
    },
  ];

  const settingsItems = [
    { title: "Notification", icon: "bell", onPress: () => { } },
    { title: "Deposit", icon: "cash-plus", onPress: () => { } },
    { title: "Withdraw", icon: "cash-minus", onPress: () => { } },
    { title: "Language", icon: "alphabetical", onPress: () => { } },
  ];

  const otherItems = [
    { title: "Terms & Conditions", icon: "file-document", onPress: () => { navigation.navigate(Routes.privacy) } },
    { title: "FAQ", icon: "help-circle", onPress: () => { navigation.navigate(Routes.faqs) } },
    { title: "Sign Out", icon: "exit-to-app", onPress: () => { } },
  ];

  const renderList = (items) => {
    return items.map((item, index) => (
      <React.Fragment key={index}>
        <List.Item
          title={item.title}
          left={() => <Icon name={item.icon} size={24} style={styles.icon} />}
          right={() => <Icon name="chevron-right" size={24} />}
          onPress={item.onPress}
        />
        {index < items.length - 1 && <Divider />}
      </React.Fragment>
    ));
  };

  return (
    <View style={styles.container}>
      <AppBar title={Strings.menu} showBackButton={false} />

      <Card style={styles.card}>{renderList(menuItems)}</Card>

      <Card style={styles.card}>{renderList(settingsItems)}</Card>

      <Card style={styles.card}>{renderList(otherItems)}</Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    marginBottom: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: "#000",
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  icon: {
    marginRight: 16,
    marginLeft: 10,
    color: "#6B7280",
  },
});

export default MenuScreen;
