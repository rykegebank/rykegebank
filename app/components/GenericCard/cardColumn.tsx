import React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors, Dimensions } from '../../constants';
import { hexToRgba } from '../../utils/helperFunctions';

interface CardColumnProps {
    header: string;
    body: string;
    alignmentEnd?: boolean;
    isDate?: boolean;
    textColor?: string;
}

const CardColumn: React.FC<CardColumnProps> = ({
    header,
    body,
    alignmentEnd = false,
    isDate = false,
    textColor,
}) => {
    return (
        <View style={[styles.column, alignmentEnd && styles.alignEnd]}>
            <Text style={[styles.header]} numberOfLines={1}>
                {header}
            </Text>
            <View style={{ height: 8 }} />
            <Text
                style={[
                    isDate
                        ? [styles.bodyDate, { color: textColor || styles.bodyDate.color }]
                        : [styles.body, { color: textColor || styles.body.color }],
                ]}
            >
                {body}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    header: {
        fontSize: Dimensions.fontDefault,
        fontWeight: '600',
        color: hexToRgba(Colors.colorBlack, 0.5),
    },
    body: {
        fontSize: Dimensions.fontLarge,
        color: Colors.smallTextColor1,
    },
    bodyDate: {
        fontSize: Dimensions.fontDefault,
        fontStyle: 'italic',
        color: Colors.smallTextColor1,
    },
});

export default CardColumn;
