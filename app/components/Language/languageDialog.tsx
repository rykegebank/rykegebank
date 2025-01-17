import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { MainLanguageResponseModel, LanguageModel } from '../../types/language';
import LanguageDialogBody from './languageDialogBody'; // Ensure this is the correct path

interface LanguageDialogProps {
    languageList: MainLanguageResponseModel;
    fromSplash?: boolean;
    onClose: () => void;
}

const LanguageDialog: React.FC<LanguageDialogProps> = ({
    languageList,
    fromSplash = false,
    onClose,
}) => {
    const [modalVisible, setModalVisible] = useState(true);
    console.log('languageList',languageList)
    try {
        const langList: LanguageModel[] = languageList.data?.languages?.map((listItem) => ({
            imageUrl: listItem.icon || '',
            languageCode: listItem.code || '',
            countryCode: listItem.name || '',
            languageName: listItem.name || '',
        })) || [];

        return (
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => {
                    setModalVisible(false);
                    onClose();
                }}
                transparent={true}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <LanguageDialogBody langList={langList} fromSplashScreen={fromSplash} onClose={() => {
                            setModalVisible(false);
                            onClose();
                        }} />
                        <Text
                            onPress={() => {
                                setModalVisible(false);
                                onClose();
                            }}
                        >
                            Close
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    } catch (error) {
        console.error('Error parsing languageList:', error);
        return null;
    }
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Slight transparency for the modal background
    },
    modalContent: {
        backgroundColor: 'white', // Modal content remains opaque
        padding: 20,
        borderRadius: 10,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // Adds shadow for better visibility on Android
    },
});

export default LanguageDialog;
