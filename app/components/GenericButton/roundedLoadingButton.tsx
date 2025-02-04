import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

interface RoundedLoadingBtnProps {
    textColor?: string;
    width?: number;
    horizontalPadding?: number;
    verticalPadding?: number;
    cornerRadius?: number;
}

const RoundedLoadingBtn = ({
    textColor = Colors.colorWhite,
    width = 1,
    horizontalPadding = 35,
    verticalPadding = 18,
    cornerRadius = 8,
}: RoundedLoadingBtnProps) => {

    return (
        <View style={{ width: Dimensions.windowWidth * width }}>
            <TouchableOpacity style={[styles.button, { borderRadius: cornerRadius, paddingHorizontal: horizontalPadding, paddingVertical: verticalPadding }]} onPress={() => { }}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={textColor} />
                </View>
                <Text style={[styles.buttonText, { color: textColor }]}>Loading</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primaryColor,
        shadowColor: Colors.transparentColor,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    loadingContainer: {
        width: Dimensions.size20,
        height: Dimensions.size20,
        marginRight: Dimensions.size10,
    },
    buttonText: {
        fontSize: Dimensions.fontDefault,
        fontWeight: '500',
    },
});

export default RoundedLoadingBtn;
