import React, { FC } from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { Colors, Dimensions } from '../../constants';

interface CustomTextProps extends TextProps {
    fontFamily?: string;
    color?: string;
    fontWeight?: TextStyle['fontWeight'];
    fontSize?: number;
}

const CustomText: FC<CustomTextProps> = ({
    fontFamily = 'Roboto',
    color = Colors.colorBlack,
    fontWeight = '400',
    fontSize = Dimensions.fontSmall,
    style,
    children,
    ...props
}) => {
    return (
        <Text
            {...props}
            style={[
                { fontFamily, color, fontWeight, fontSize },
                style,
            ]}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {},
});

export default CustomText;
