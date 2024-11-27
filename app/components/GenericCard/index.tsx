import React from "react";
import { Card as PaperCard } from "react-native-paper";

const GenericCard = ({ style, children, ...props }) => {
  return (
    <PaperCard
      style={[{ padding: 16, borderRadius: 8, elevation: 3 }, style]}
      {...props}
    >
      {children}
    </PaperCard>
  );
};

export default GenericCard;
