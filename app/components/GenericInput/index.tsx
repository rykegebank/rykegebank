import React from "react";
import { Text } from "react-native";
import { TextInput as PaperTextInput } from "react-native-paper";

const GenericInput = ({ style, error, ...props }) => {
  return (
    <>
      <PaperTextInput
        mode="outlined"
        style={[{ backgroundColor: "white" }, style]}
        {...props}
      />
      {error && <Text style={{ color: "red", marginBottom: 5 }}>*{error}</Text>}
    </>
  );
};

export default GenericInput;
