import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Colors, Dimensions } from "../../constants";
interface CustomDropDownTextFieldProps {
  title?: string;
  selectedValue?: string;
  list?: string[];
  onChanged?: (value: string) => void;
}

const CustomDropDownTextField: React.FC<CustomDropDownTextFieldProps> = ({
  title,
  selectedValue,
  list = [],
  onChanged,
}) => {
  const [value, setValue] = useState(selectedValue || "");

  const filteredList = list.filter((item) => item.trim() !== "");
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.dropdownContainer}>
        <Picker
          itemStyle={{ height: 50 }}
          selectedValue={value}
          onValueChange={(itemValue) => {
            setValue(itemValue);
            if (onChanged) onChanged(itemValue);
          }}
          style={styles.picker}
          mode="dropdown"
        >
          {filteredList.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.space5,
    marginBottom: Dimensions.space5,
  },
  title: {
    fontSize: Dimensions.fontDefault,
    fontWeight: "600",
    color: Colors.colorBlack,
  },
  dropdownContainer: {
    height: 45,
    backgroundColor: Colors.colorWhite,
    borderRadius: 8,
    borderColor: Colors.lineColor,
    borderWidth: 1,
    justifyContent: "center",
    paddingLeft: Dimensions.space10,
    paddingRight: Dimensions.space5,
  },
  picker: {
    height: 45,
    width: "100%",
    color: Colors.colorBlack,
    fontSize: Dimensions.fontDefault,
  },
});

export default CustomDropDownTextField;
