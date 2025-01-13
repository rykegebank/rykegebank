import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  Card,
  TextInput,
  Button,
  IconButton,
  Avatar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFetchReferees,
  useFetchReferralLink,
} from "../../data/referrals/queries";
import AppBar from "../../components/GenericAppBar";
// import { useClipboard } from "@react-native-clipboard/clipboard";
import toasts from "../../logic/toasts";

const ReferralScreen = () => {
  const { data: referees } = useFetchReferees();
  const { data: referralLink } = useFetchReferralLink();

  // const [data, setString] = useClipboard();
  console.log(referees);
  const renderReferralItem = ({ item, index }) => (
    <Card style={styles.referralItem}>
      <View style={styles.referralContent}>
        <Avatar.Text
          label={index.toString()}
          size={40}
          style={styles.avatar}
          color="#001F54"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.usernameText}>Username</Text>
          <Text style={styles.usernameValue}>{item.username}</Text>
        </View>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level</Text>
          <Text style={styles.levelValue}>{item.level}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}

      <AppBar title="Referral" showBackButton />

      {/* Referral Link Section */}
      <Card style={styles.referralCard}>
        <View style={styles.referralHeader}>
          <Icon name="account-group" size={24} color="#000" />
          <Text style={styles.referralText}>Referral Link</Text>
        </View>
        <View style={styles.referralLinkContainer}>
          <TextInput
            mode="outlined"
            value={referralLink}
            editable={false}
            style={styles.referralInput}
          />
          <IconButton
            icon="content-copy"
            size={20}
            onPress={() => {
              // setString(referralLink);
              toasts.genericSuccessToast("Referral Link copied");
            }}
            style={styles.copyButton}
          />
        </View>
      </Card>

      <FlatList
        data={referees}
        renderItem={renderReferralItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.referralList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#001F54",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  referralCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  referralHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  referralText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  referralLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  referralInput: {
    flex: 1,
    marginRight: 8,
  },
  copyButton: {
    alignSelf: "center",
  },
  referralList: {
    paddingHorizontal: 16,
  },
  referralItem: {
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  referralContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  avatar: {
    backgroundColor: "#E6F0FF",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  usernameText: {
    fontSize: 12,
    color: "#999",
  },
  usernameValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  levelContainer: {
    alignItems: "flex-end",
  },
  levelText: {
    fontSize: 12,
    color: "#999",
  },
  levelValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ReferralScreen;
