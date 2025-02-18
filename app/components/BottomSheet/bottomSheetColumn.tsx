import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Strings, Colors, Dimensions } from '../../constants';
import { hexToRgba } from '../../utils/helperFunctions';

interface BottomSheetColumnProps {
    isCharge?: boolean;
    header: string;
    body: string;
    alignmentEnd?: boolean;
}

function BottomSheetColumn({ isCharge = false, header, body, alignmentEnd = false }: BottomSheetColumnProps) {
    return (
        <View style={[styles.container, alignmentEnd && styles.alignEnd]}>
            <Text style={[styles.header, alignmentEnd && styles.alignRight]} numberOfLines={1}>
                {header}
            </Text>
            <View style={styles.spacing} />
            <Text style={[styles.body, isCharge && styles.chargeText, alignmentEnd && styles.alignRight]} numberOfLines={1}>
                {body}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column", // Make sure it's column by default
        alignSelf: "flex-start", // Default to align to the start
    },
    alignEnd: {
        alignSelf: "flex-end", // Align to the end if the prop is true
    },
    header: {
        color: Colors.bodyTextColor,
        fontSize: Dimensions.fontDefault,
        fontWeight: "300",
    },
    spacing: {
        height: 5,
    },
    body: {
        fontSize: Dimensions.fontDefault,
        fontWeight: "400",
    },
    chargeText: {
        color: Colors.redCancelTextColor,
    },
    alignRight: {
        textAlign: 'right', // Align text to the right
    },
});

export default BottomSheetColumn;
