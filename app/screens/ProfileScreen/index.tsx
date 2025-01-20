import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Avatar, Button, Card, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppBar from "../../components/GenericAppBar";
import { Dimensions, Colors, Routes, Strings } from "../../constants";
import { URLS } from '../../data/urls';
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../store";
import CircleImageButton from '../../components/ImageContainer/circleImageButton';

const renderInfoItem = (iconName, label, value) => (
  <View style={styles.infoItem}>
    <Icon name={iconName} size={24} color="#000" style={styles.icon} />
    <View style={styles.infoText}>
      <Text variant="bodyMedium" style={styles.label}>
        {label}
      </Text>
      <Text variant="bodySmall" style={styles.value}>
        {value}
      </Text>
    </View>
  </View>
);
const ProfileScreen = () => {
  const { user } = useAppSelector((state) => state.user);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <AppBar title={Strings.profile} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <CircleImageButton
            height={Dimensions.size65}
            width={Dimensions.size65}
            imagePath={`${URLS.baseUrl}assets/images/user/profile/${user.image}`}
            isAsset={false}
            isProfile={true}
          />
          <View style={styles.userInfo}>
            <Text variant="titleMedium" style={styles.username}>
              {user.username}
            </Text>
            <Text variant="bodySmall" style={styles.location}>
              {user.address?.country}
            </Text>
          </View>
          <Button
            mode="contained"
            icon="pencil"
            style={styles.editButton}
            onPress={() => {
              navigation.navigate(Routes.completeProfile, {
                shouldEdit: true,
              });
            }}
          >
            Edit Profile
          </Button>
        </View>

        {/* Info Section */}
        <Card style={styles.infoCard}>
          {renderInfoItem("bank", "Account No.", user.account_number)}
          <Divider />
          {renderInfoItem("account", "Username", user.username)}
          <Divider />
          {renderInfoItem("email", "Email", user.email)}
          <Divider />
          {renderInfoItem("phone", "Phone No.", user.mobile)}
          <Divider />
          {renderInfoItem("earth", "Country", user.address?.country)}
          <Divider />
          {renderInfoItem("map-marker", "State", user.address?.state)}
          <Divider />
          {renderInfoItem("city", "City", user.address?.city)}
          <Divider />
          {renderInfoItem("mailbox", "Zip Code", user.address?.zip)}
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  avatar: {
    backgroundColor: Colors.primaryColor,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    marginLeft:20,
  },
  username: {
    fontWeight: "bold",
  },
  location: {
    color: "#777",
  },
  editButton: {
    marginLeft: 16,
    backgroundColor: Colors.primaryColor,
  },
  infoCard: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.colorWhite,
    elevation: 1,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  icon: {
    marginRight: 16,
  },
  infoText: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
  },
  value: {
    color: "#555",
  },
});

export default ProfileScreen;
