import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Card, Searchbar } from "react-native-paper"; // React Native Paper components
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Dimensions, Strings } from "../../constants";
import { useFetchDepositHistory } from "../../data/transaction/queries";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Search from "../../components/Search";

const DepositHistoryScreen = () => {
  const { data: deposits } = useFetchDepositHistory();
  const navigation = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const [searchedStr, setSearchedStr] = useState("");

  const filteredData =
    deposits?.filter((e) => {
      return e.trx.toLowerCase().includes(searchedStr.toLowerCase());
    }) || [];
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>TRX No.</Text>
          <Text style={styles.value}>{item.trx}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>
            {new Date(item.created_at).toDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.value}>
            {`${parseFloat(item.final_amount).toFixed(2)} ${
              item.method_currency
            }`}
          </Text>
        </View>
        <View style={styles.row}>
          <View />
          <View
            style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderColor: "#28a745",
              borderRadius: 4,
            }}
          >
            <Text style={styles.buttonText}>
              {item.status === 1
                ? "Succeed"
                : "all test data is succeeded for now"}{" "}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-left"
          size={24}
          color="#fff"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.title}>Deposits</Text>
        <Icon
          name={isSearch ? "close" : "magnify"}
          size={24}
          color={Colors.colorWhite}
          onPress={() => {
            setIsSearch(!isSearch);
          }}
        />
      </View>
      {isSearch && <Search placeholder={"TRX No."} onPress={setSearchedStr} />}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchbar: {
    margin: 10,
    backgroundColor: "white",
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 2,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
  },
  value: {
    color: "#555",
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#d4edda",
    borderRadius: 0,
    height: 40,
  },
  buttonText: {
    fontSize: 12,
    color: "#28a745",
  },
  textInput: {
    height: Dimensions.size45,
    borderWidth: 1,
    borderColor: "#B0B0B0",
    borderRadius: 4,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    color: "#000",
    flex: 1,
  },
  searchContainer: {
    backgroundColor: Colors.colorWhite,
    borderRadius: Dimensions.space10,
    padding: Dimensions.space15,
    margin: Dimensions.space15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchButton: {
    height: Dimensions.size45,
    width: Dimensions.size45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    borderRadius: 4,
    marginLeft: Dimensions.space10,
  },
});

export default DepositHistoryScreen;
