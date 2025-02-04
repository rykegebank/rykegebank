import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../../constants';
import { SvgProps } from 'react-native-svg'; // ✅ Use SvgProps

interface TransferCardProps {
    icon: React.FC<SvgProps>;
    title: string;
    press: () => void;
    isSelected?: boolean;
}

const TransferCard: React.FC<TransferCardProps> = ({ icon: Icon, title, press, isSelected = false }) => {
    return (
        <TouchableOpacity onPress={press} style={[styles.card, isSelected && styles.selectedCard]}>
            <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                <Icon width={24} height={24} fill={isSelected ? Colors.primaryColor : Colors.colorWhite} />
            </View>
            <Text style={[styles.title, isSelected && styles.selectedTitle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '47%',
        paddingVertical: Dimensions.space25,
        paddingHorizontal: Dimensions.space15,
        alignItems: 'center',
        backgroundColor: Colors.colorWhite,
        borderRadius: Dimensions.space10,
        borderWidth: 1,
        borderColor: Colors.colorWhite,
        shadowColor: Colors.lineColor,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    selectedCard: {
        backgroundColor: Colors.primaryColor,
        borderColor: Colors.primaryColor,
    },
    iconContainer: {
        width: Dimensions.size40,
        height: Dimensions.size40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.primaryColor,
    },
    selectedIconContainer: {
        backgroundColor: Colors.colorWhite,
    },
    title: {
        marginTop: Dimensions.space15,
        fontSize: Dimensions.fontDefault,
        fontWeight: '500',
        color: Colors.primaryColor,
        textAlign: 'center',
    },
    selectedTitle: {
        color: Colors.colorWhite,
    },
});

export default TransferCard;
