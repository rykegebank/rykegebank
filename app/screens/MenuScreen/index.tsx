import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Card, List, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Routes, Strings, Colors } from "../../constants";
import AppBar from "../../components/GenericAppBar";
import { useNavigation } from "@react-navigation/native";
import LanguageDialog from "../../components/Language/languageDialog"; // Adjust the path
import { useLanguage } from "../../hooks/useLanguage";

const MenuScreen = () => {
  const navigation = useNavigation();
  const [isLanguageDialogVisible, setLanguageDialogVisible] = useState(false);
  const { languageData } = useLanguage();

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

  const handleShowEnglish = async () => {
    setLanguageDialogVisible(true);
  };

  const settingsItems = [
    {
      title: "Notification",
      icon: "bell",
      onPress: () => {
        navigation.navigate(Routes.notificationList);
      },
    },
    {
      title: "Deposit",
      icon: "cash-plus",
      onPress: () => {
        navigation.navigate(Routes.depositHistory);
      },
    },
    {
      title: "Withdraw",
      icon: "cash-minus",
      onPress: () => {
        navigation.navigate(Routes.withdraw);
      },
    },
    { title: "Language", icon: "alphabetical", onPress: handleShowEnglish },
  ];

  const otherItems = [
    {
      title: "Terms & Conditions",
      icon: "file-document",
      onPress: () => {
        navigation.navigate(Routes.privacy);
      },
    },
    {
      title: "FAQ",
      icon: "help-circle",
      onPress: () => {
        navigation.navigate(Routes.faqs);
      },
    },
    {
      title: "Sign Out",
      icon: "exit-to-app",
      onPress: () => {
        navigation.navigate(Routes.login);
      },
    },
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

      {/* LanguageDialog is moved here to prevent multiple renderings */}
      {isLanguageDialogVisible && (
        <LanguageDialog
          languageList={languageData}
          fromSplash={false}
          onClose={() => setLanguageDialogVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  card: {
    marginBottom: 10,
    borderRadius: 8,
    margin: 20,
    backgroundColor: Colors.colorWhite,
    overflow: "hidden",
  },
  icon: {
    marginRight: 16,
    marginLeft: 10,
    color: Colors.colorBlack,
  },
});

export default MenuScreen;
