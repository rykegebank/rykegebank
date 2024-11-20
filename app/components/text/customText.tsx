import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { Colors, Dimensions } from '../../constants'; // Adjust imports as needed

interface CustomTextProps extends TextProps {
    fontFamily?: string;
    color?: string;
    fontWeight?: TextStyle['fontWeight'];  // Use TextStyle['fontWeight'] for proper typing
    fontSize?: number;
}

const CustomText = ({
    fontFamily = 'Roboto',
    color = Colors.colorBlack,
    fontWeight = '400',
    fontSize = Dimensions.fontSmall,
    style,
    children,
    ...props
}: CustomTextProps) => {
    return (
        <Text
            {...props}
            style={[
                styles.text,
                { fontFamily, color, fontWeight, fontSize },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
    },
});

export default CustomText;
