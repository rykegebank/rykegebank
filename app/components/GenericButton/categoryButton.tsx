import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants'; // Replace with your actual constants or imports
import CustomText  from '../Texts/customText'

interface CategoryButtonProps {
  text: string;
  press: () => void;
  color?: string;
  textColor?: string;
  horizontalPadding?: number;
  verticalPadding?: number;
  textSize?: number;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  text,
  press,
  color = Colors.primaryColor,
  textColor = Colors.colorWhite,
  horizontalPadding = 5,
  verticalPadding = 5,
  textSize = Dimensions.fontExtraSmall,
}) => {
  return (
    <TouchableOpacity onPress={press} style={[styles.button, { backgroundColor: color, paddingHorizontal: horizontalPadding, paddingVertical: verticalPadding }]}>
      <View style={styles.container}>
        <CustomText style={[styles.text, { color: textColor, fontSize: textSize }]}>
          {text}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    marginHorizontal:5,
    shadowColor: Colors.containerBgColor, 
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '500',
  },
});

export default CategoryButton;
