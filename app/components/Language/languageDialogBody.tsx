import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { LanguageModel } from '../../types/language';
import { useNavigation } from '@react-navigation/native';
import { useLanguage, Locale } from "../../hooks/useLanguage";
import { Routes, Dimensions, Colors } from '../../constants'

interface LanguageDialogBodyProps {
    langList: LanguageModel[];
    fromSplashScreen: boolean;
    onClose: () => void;
}

const LanguageDialogBody: React.FC<LanguageDialogBodyProps> = ({ langList, fromSplashScreen, onClose }) => {
    const [pressIndex, setPressIndex] = useState<number>(-1);
    const navigation = useNavigation();
    const { locale: localeData, setLanguage, fetchUpdatedData,isLoading } = useLanguage();

    const [locale, setLocale] = useState<Locale>({
        languageCode: localeData.languageCode,
        countryCode: localeData.countryCode
    });

    const handleLanguageChange = async (languageCode: string, index: number) => {
        setPressIndex(index);
        try {
            setLocale({ languageCode: languageCode, countryCode: 'US' })
            await fetchUpdatedData(locale);
            setPressIndex(-1);

            setLanguage(locale);
            if (fromSplashScreen) {
                navigation.navigate(Routes.splash)
            } else {
                onClose();
            }
        } catch (error) {
            setPressIndex(-1); // Reset pressIndex on error
        }
    };

    const renderItem = ({ item, index }: { item: LanguageModel; index: number }) => (
        <TouchableOpacity
            onPress={() => handleLanguageChange(item.languageCode, index)}
            style={[styles.languageItem, pressIndex === index && styles.selectedItem]}>
            {pressIndex === index ? (
                <ActivityIndicator color="#0000ff" />
            ) : (
                <Text style={styles.languageText}>{item.languageName}</Text>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select a Language</Text>
            <FlatList
                data={langList}
                keyExtractor={(item) => item.languageCode}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Dimensions.space15,
        backgroundColor: Colors.colorWhite,
        borderRadius: 10,
    },
    title: {
        textAlign: 'center',
        fontSize: Dimensions.large,
        marginBottom: Dimensions.space15,
    },
    list: {
        paddingBottom: Dimensions.space20,
    },
    languageItem: {
        paddingVertical: Dimensions.space15,
        paddingHorizontal: Dimensions.space16,
        borderRadius: Dimensions.space10,
        marginBottom: Dimensions.space10,
        backgroundColor: Colors.textColor,
        borderColor: Colors.borderColor,
        borderWidth: 1,
    },
    selectedItem: {
        backgroundColor: Colors.colorWhite,
    },
    languageText: {
        fontSize: Dimensions.font16,
    },
});

export default LanguageDialogBody;
