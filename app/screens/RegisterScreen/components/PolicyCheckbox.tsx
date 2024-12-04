import React from "react";

import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Checkbox } from "react-native-paper";

interface PolicyCheckbox {
  value: number;
  onPress(): void;
}

const PolicyCheckbox = ({ value, onPress }: PolicyCheckbox) => {
  const status = value == 1 ? "checked" : "unchecked";

  return (
    <View>
      <Checkbox color="#1e293b" status={status} onPress={onPress} />

      <Text style={styles.checkboxText}>
        I agree with the{" "}
        <TouchableOpacity>
          <Text style={styles.linkText}>Privacy & Policies</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxText: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 8,
    marginTop: 20,
  },
  linkText: {
    color: "#1a1f71",
    textDecorationLine: "underline",
  },
});

export default PolicyCheckbox;
