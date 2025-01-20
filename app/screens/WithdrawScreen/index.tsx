import React, { useCallback, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Dimensions } from "../../constants";
import {
  useFetchWithdrawHistory,
} from "../../data/transaction/queries";
import { useNavigation } from "@react-navigation/native";
import Search from "../../components/Search";
import { hexToRgba } from '../../utils/helperFunctions';
import TransactionSkeleton from '../../components/LoadingIndicators/transactionSkeleton';
import AppBar from '../../components/GenericAppBar';
import NoDataFoundScreen from '../../components/NoDataFound/NoDataFound';

const WithdrawScreen = () => {
  const { data: withdrawals, isLoading } = useFetchWithdrawHistory();
  const navigation = useNavigation();
  const [isSearch, setIsSearch] = useState(false);
  const [searchedStr, setSearchedStr] = useState("");

  const filteredData =
    withdrawals?.filter((e) => {
      return e.trx.toLowerCase().includes(searchedStr.toLowerCase());
    }) || [];

  const changeTextColor = useCallback((status: number) => {
    return status === 1 ? Colors.green : Colors.red;
  }, []);

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
            {`${parseFloat(item.final_amount).toFixed(2)} ${item.currency
              }`}
          </Text>
        </View>
        <View style={styles.row}>
          <View />
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              backgroundColor: hexToRgba(changeTextColor(item.status), .2),
              borderRadius: 4,
            }}
          >
            <Text style={[styles.buttonText, { color: changeTextColor(item.status) }]}>
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
        title="Withdraw"
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
      {isLoading
        ? <FlatList
          data={Array(3).fill(null)} // Mock data with 3 items
          keyExtractor={(_, index) => index.toString()}
          renderItem={() => (
            <TransactionSkeleton />
          )}
          contentContainerStyle={styles.skeletonContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        : null}
      {filteredData.length === 0 && (!isLoading) ? (
        <View style={styles.centered}>
          <NoDataFoundScreen />
        </View>
      ) : (<FlatList
        data={filteredData}
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
  buttonText: {
    fontSize: 12,
    color: "#28a745",
  },
  iconContainer: {
    width: 25,
    height: 25,
    borderRadius: 18,
    backgroundColor: Colors.colorWhite,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: Dimensions.size10,
  },
  skeletonContainer: {
    padding: Dimensions.space15,
  },
});

export default WithdrawScreen;
