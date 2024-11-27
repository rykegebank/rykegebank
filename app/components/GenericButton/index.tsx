import React from "react";
import { Button as PaperButton } from "react-native-paper";

const GenericButton = ({ children, style, ...props }) => {
  return (
    <PaperButton
      mode="contained"
      style={[{ borderRadius: 4, paddingVertical: 8 }, style]}
      {...props}
    >
      {children}
    </PaperButton>
  );
};

export default GenericButton;
