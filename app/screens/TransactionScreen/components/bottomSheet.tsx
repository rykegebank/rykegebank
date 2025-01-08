import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props {
    list: string[] | null;
    callFrom: number;
    header: string;
    visible: boolean;
    onSelect: (selectedValue: string) => void;
    onClose: () => void; // Add onClose prop to handle closing the modal
}

const TransactionBottomSheet: React.FC<Props> = ({
    list,
    callFrom,
    header,
    visible,
    onSelect,
    onClose,
}) => {
    const handleSelect = (item: string) => {
        onSelect(item); // Call the onSelect function
        onClose(); // Close the bottom sheet
    };

    if (!list || list.length === 0) {
        return null;
    }

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalBackground}>
                <View style={styles.container}>
                    <View style={styles.headerRow}>
                        <Text style={styles.headerText}>{header}</Text>
                        <TouchableOpacity onPress={() => {
                            console.log('Close button pressed');
                            onClose();
                        }} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={list}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.itemText}>
                                    {callFrom === 2
                                        ? item.replace(/_/g, ' ').charAt(0).toUpperCase() +
                                        item.slice(1)
                                        : item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
        maxHeight: Dimensions.get('window').height * 0.8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Align header and close icon
        alignItems: 'center',
        marginBottom: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    closeButton: {
        padding: 8, // Add some touchable area
    },
    itemContainer: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 4,
        backgroundColor: '#f1f1f1',
    },
    itemText: {
        fontSize: 16,
        color: '#000',
    },
});

export default TransactionBottomSheet;
