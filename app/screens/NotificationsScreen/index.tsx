import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Text, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppBar from "../../components/GenericAppBar";
import { useFetchNotifications } from "../../data/transaction/queries";

const NotificationsScreen = () => {
  const { data: notificationList } = useFetchNotifications();

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        {/* Icon */}
        <Avatar.Icon
          size={40}
          icon="cash"
          color="#ffffff"
          style={styles.iconContainer}
        />

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>
            {new Date(item.created_at).toDateString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <AppBar title="Notifications" showBackButton />

      <FlatList
        data={notificationList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#1F2937", // Dark blue background
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#1F2937", // Dark blue circle
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000", // Black text
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: "#6B7280", // Gray text
  },
});

export default NotificationsScreen;
