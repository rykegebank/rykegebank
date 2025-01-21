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
import { Colors, Dimensions, Routes, Strings } from "../../constants";
import { useFetchDepositHistory } from "../../data/transaction/queries";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Search from "../../components/Search";
import { hexToRgba } from "../../utils/helperFunctions";
import TransactionSkeleton from "../../components/LoadingIndicators/transactionSkeleton";
import AppBar from "../../components/GenericAppBar";
import NoDataFoundScreen from "../../components/NoDataFound/NoDataFound";

const DepositScreen = () => {
  const { data: deposits, isLoading } = useFetchDepositHistory();
  const navigation = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const [searchedStr, setSearchedStr] = useState("");

  const filteredData =
    deposits?.filter((e) => {
      return e.trx.toLowerCase().includes(searchedStr.toLowerCase());
    }) || [];

  const changeTextColor = useCallback((status: number) => {
    return status === 1 ? Colors.green : Colors.red;
  }, []);

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate(Routes.depositDetails, {
          transaction: item,
        });
      }}
    >
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
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: hexToRgba(changeTextColor(item.status), 0.2),
              borderRadius: 4,
            }}
          >
            <Text
              style={[
                styles.buttonText,
                { color: changeTextColor(item.status) },
              ]}
            >
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
      <AppBar
        title="Deposit"
        centerTitle
        showBackButton={true}
        backgroundColor={Colors.primaryColor}
        actions={[
          <TouchableOpacity
            key="toggle"
            onPress={() => setIsSearch(!isSearch)}
            style={styles.iconContainer}
          >
            <Icon
              name={isSearch ? "close" : "magnify"}
              size={15}
              color={Colors.primaryColor}
            />
          </TouchableOpacity>,
        ]}
      />
      {isSearch && <Search placeholder={"TRX No."} onPress={setSearchedStr} />}
      {isLoading ? (
        <FlatList
          data={Array(3).fill(null)} // Mock data with 3 items
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => <TransactionSkeleton />}
          contentContainerStyle={styles.skeletonContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : null}
      {filteredData.length === 0 && !isLoading ? (
        <View style={styles.centered}>
          <NoDataFoundScreen />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: Dimensions.space15,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: Colors.colorWhite,
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
  separator: {
    height: Dimensions.size10,
  },
  iconContainer: {
    width: 25,
    height: 25,
    borderRadius: 18,
    backgroundColor: Colors.colorWhite,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DepositScreen;
