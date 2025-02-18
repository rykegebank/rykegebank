import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

interface ChooseFileItemProps {
  fileName: string;
}

const ChooseFileItem: React.FC<ChooseFileItemProps> = ({ fileName }) => {
  return (
    <View style={styles.container}>
      {/* Choose File Button */}
      <TouchableOpacity style={styles.chooseFileButton}>
        <Text style={styles.chooseFileText}>Choose File</Text>
      </TouchableOpacity>

      {/* File Name Input */}
      <TextInput
        style={styles.input}
        value={fileName}
        editable={false} // Equivalent to Flutter's readOnly: true
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  chooseFileButton: {
    padding: 5,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  chooseFileText: {
    color: "#fff",
    fontWeight: "500",
  },
  input: {
    flex: 1,
    marginLeft: 15,
    color: "#333",
    fontSize: 14,
  },
});

export default ChooseFileItem;
