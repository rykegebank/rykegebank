import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from '../../constants';
import { getBorderColor } from '../../constants/colors';

interface CustomDividerProps {
  space?: number;  // Optional prop with a default value of Dimensions.space20
  lineColor?: string;  // Optional prop to allow a custom divider color
}

const CustomDivider: React.FC<CustomDividerProps> = ({ space = Dimensions.space20, lineColor }) => {
  return (
    <View style={[styles.container, { marginVertical: space }]}>
      <View
        style={[
          styles.divider,
          {
            borderBottomColor: lineColor ?? getBorderColor(), // Fallback to default color
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
  },
});

export default CustomDivider;
