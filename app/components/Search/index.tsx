import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Colors, Dimensions } from "../../constants";
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
          onPress={() => onPress(searchStr)}
        >
          <MaterialIcons name="search" color={Colors.colorWhite} size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: Dimensions.space10,
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
