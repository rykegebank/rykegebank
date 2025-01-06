import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { Colors, Dimensions } from '../../../constants'

interface FilterRowWidgetProps {
    text: string;
    fromTrx?: boolean;
    iconColor?: string;
    press: () => void;
    isFilterBtn?: boolean;
    bgColor?: string;
}

const FilterRowWidget: React.FC<FilterRowWidgetProps> = ({
    text,
    fromTrx = false,
    iconColor = Colors.primaryColor,
    press,
    isFilterBtn = false,
    bgColor = Colors.containerBgColor,
}) => {
    return (
        <TouchableOpacity onPress={press} style={[styles.container, { backgroundColor: isFilterBtn ? Colors.primaryColor : bgColor, borderWidth: isFilterBtn ? 0 : 0.5 }]}>
            <View style={styles.row}>
                <Text
                    numberOfLines={1}
                    style={[
                        styles.text,
                        { color: isFilterBtn ? Colors.colorBlack : Colors.colorBlack },
                    ]}
                >
                    {text}
                </Text>
                <MaterialIcons name="expand-more" type="material" color={iconColor} size={17} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Dimensions.space10,
        paddingVertical: Dimensions.space10,
        borderRadius: Dimensions.space5,
        borderColor: Colors.colorGrey,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        fontFamily: 'Inter-Regular',
        fontSize: Dimensions.fontDefault,
        overflow: 'hidden',
    },
});

export default FilterRowWidget;
