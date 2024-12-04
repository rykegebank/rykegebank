import React from 'react';
import { View, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@expo/vector-icons/MaterialIcons';

import { Colors, Dimensions } from '../../constants'
import CustomText from '../../components/Texts/customText'
interface AppBarProps {
    title: string | React.ReactNode;  // Title can be a string or any React element
    showBackButton?: boolean;
    onBackPress?: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ title, showBackButton = true, onBackPress }) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            navigation.goBack();  // Default action
        }
    };

    return (
        <View style={styles.headerContainer}>
            {showBackButton && (
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color={Colors.colorWhite} />
                </TouchableOpacity>
            )}
            <View style={styles.titleContainer}>
                {typeof title == 'string' ? (
                    <CustomText style={styles.title}>{title}</CustomText>
                ) : (
                    title
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Dimensions.space10,
        backgroundColor: Colors.primaryColor,
    },
    backButton: {
        position: 'absolute',
        left: Dimensions.space10,
        zIndex: 1,
    },
    backButtonText: {
        color: Colors.colorWhite,
        fontSize: Dimensions.fontLarge,
    }, titleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: Colors.colorWhite,
        fontSize: Dimensions.extraLarge,
        fontWeight: '600',
    }
});

export default AppBar;
