import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import ActionSheet from "react-native-actions-sheet";
import GenericInput from "../../../components/GenericInput";
import { FlatList } from "react-native-gesture-handler";

const { height } = Dimensions.get("window");

const CountriesDropdown = ({
  label,
  options,
  onSelect,
  selectedValue,
  style,
  error,
}) => {
  const actionSheetRef = React.useRef<ActionSheet>(null);

  const handleSelect = (itemValue) => {
    onSelect(itemValue);
    actionSheetRef.current?.hide();
  };

  const RenderItem = React.memo(({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleSelect(`${item.country_code}-${item.dial_code}-${item.country}`)}
    >
      <Text style={styles.itemText}>{item.dial_code} - {item.country}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.container, style]}>
      <GenericInput
        label="Select a country"
        mode="outlined"
        onPress={() => {
          actionSheetRef.current?.show();
        }}
        right={
          <TextInput.Icon
            icon="chevron-down"
            onPress={() => {
              actionSheetRef.current?.show();
            }}
          />
        }
        value={selectedValue}
        error={error}
      />

      <ActionSheet
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={styles.actionSheetContainer}
      >
        <View style={styles.sheetContainer}>
          <Text style={styles.sheetTitle}>Select a Country</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => item.country_code}
            renderItem={({ item }) => <RenderItem item={item} />}
            style={styles.flatListContainer}
            initialNumToRender={10} 
            getItemLayout={(data, index) => ({
              length: 50, 
              offset: 50 * index,
              index,
            })}
            removeClippedSubviews={true} 
          />
        </View>
      </ActionSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  actionSheetContainer: {},
  sheetContainer: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  flatListContainer: {
    maxHeight: height * 0.8,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
});

export default CountriesDropdown;
