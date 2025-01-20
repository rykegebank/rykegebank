import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Card, Text, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppBar from "../../components/GenericAppBar";
import { useFetchNotifications } from "../../data/transaction/queries";
import { Colors, Dimensions } from "../../constants";
import NotificationSkeletonLoading from './components/notifSkeletonLoading';
import NoDataFoundScreen from '../../components/NoDataFound/NoDataFound';

const NotificationsScreen = () => {
  const { data: notificationList, isLoading } = useFetchNotifications();

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

      {isLoading
        ? <FlatList
          data={Array(3).fill(null)} // Mock data with 3 items
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => (
            <NotificationSkeletonLoading />
          )}
          contentContainerStyle={styles.skeletonContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        : null}

      {notificationList.length === 0 && (!isLoading) ? (
        <View style={styles.centered}>
          <NoDataFoundScreen />
        </View>
      ) : (<FlatList
        data={notificationList}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 2,
    backgroundColor: Colors.colorWhite,
    borderRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: Colors.primaryColor,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.colorBlack,
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: Colors.colorGrey2,
  },
  separator: {
    height: Dimensions.size10,
  },
  skeletonContainer: {
    padding: Dimensions.space15,
  },
});

export default NotificationsScreen;
