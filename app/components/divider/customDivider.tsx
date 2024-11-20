import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from '../../constants';
import { getBorderColor } from '../../constants/colors';
interface CustomDividerProps {
  space?: number;
  lineColor?: string;
}

const CustomDivider = ({ space = Dimensions.space20, lineColor }: CustomDividerProps) => {
  return (
    <View style={[styles.container, { marginVertical: space }]}>
      <View
        style={[
          styles.divider,
          {
            borderBottomColor: lineColor ?? getBorderColor(),
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
