import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import GenericInput from "../../../components/GenericInput";

const CountriesDropdown = ({
  label,
  options,
  onSelect,
  selectedValue,
  style,
  error,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      <GenericInput
        label="Select a country"
        mode="outlined"
        onPress={() => {
          setMenuVisible((e) => !e);
        }}
        right={
          <TextInput.Icon
            icon="chevron-down"
            onPress={() => {
              setMenuVisible((e) => !e);
            }}
          />
        }
        value={selectedValue}
        error={error}
      />

      {menuVisible && (
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => {
            onSelect(itemValue);
            setMenuVisible(false);
          }}
        >
          {options.map((e) => {
            return (
              <Picker.Item
                key={e.country_code}
                label={e.country}
                value={`${e.country_code}-${e.dial_code}-${e.country}`}
              />
            );
          })}
        </Picker>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
  },
  placeholder: {
    color: "#6c757d",
  },
  value: {
    color: "#000",
  },
});

export default CountriesDropdown;
