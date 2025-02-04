import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Dimensions } from "../../constants";
import { hexToRgba } from '../../utils/helperFunctions';

interface LimitPreviewRowProps {
    firstText: string;
    secondText: string;
    showDivider?: boolean;
}

const LimitPreviewRow: React.FC<LimitPreviewRowProps> = ({
    firstText,
    secondText,
    showDivider = true,
}) => {

    return (
        <View>
            <View style={styles.row}>
                <Text style={[styles.firstText]}>{firstText}</Text>
                <Text style={[styles.secondText]}>{secondText}</Text>
            </View>

            <View style={styles.spacer} />

            {showDivider && (
                <>
                    <View style={styles.divider} />
                    <View style={styles.spacer} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    firstText: {
        fontSize: Dimensions.fontSmall,
        color: hexToRgba(Colors.colorBlack, 0.5),
    },
    secondText: {
        fontSize: Dimensions.fontSmall,
        color: hexToRgba(Colors.colorBlack, 0.8),
    },
    spacer: {
        height: 15,
    },
    divider: {
        height: 0.5,
        backgroundColor: Colors.borderColor,
    },
});

export default LimitPreviewRow;
