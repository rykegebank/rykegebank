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
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
const Search = (props) => {
  const [searchStr, setSearchStr] = useState("");
  const { placeholder, onPress } = props;
  return (
    <View style={styles.searchContainer}>
      <Text style={styles.label}>{placeholder}</Text>
      <View style={styles.row}>
        <TextInput
          value={searchStr}
          onChangeText={setSearchStr}
          style={styles.textInput}
          placeholder="Enter Transaction No"
          placeholderTextColor="#9E9E9E"
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            onPress(searchStr);
          }}
        >
          <MaterialIcons name="search" color={Colors.colorWhite} size={18} />
        </TouchableOpacity>
      </View>
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
    padding: 15,
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
  },
  buttonText: {
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

export default Search;
