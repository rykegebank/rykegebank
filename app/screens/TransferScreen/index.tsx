import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TransferCard from './components/transferCard';
import GenericButton from '../../components/GenericButton';
import { Routes, Dimensions, Strings } from '../../constants';
// Import SVG Icons
import MyBankTransfer from '../../../assets/images/transfer/my_bank_transfer.svg';
import OtherBankTransfer from '../../../assets/images/transfer/other_bank_transfer.svg';
import WireTransfer from '../../../assets/images/transfer/wire_transfer.svg';
import TransferHistory from '../../../assets/images/transfer/transfer_history.svg';
import AppBar from "../../components/GenericAppBar";


const TransferScreen: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const isWireTransferEnable = true; // Replace with actual condition
    const navigation = useNavigation();

    const handleNext = () => {
        if (selectedIndex === 1) {
            navigation.navigate(Routes.transferMyBank);
        } else if (selectedIndex === 2) {
            // navigation.navigate(Routes.otherBankTransferScreen);
        } else if (selectedIndex === 3) {
            navigation.navigate(Routes.wireTransfer);
        } else if (selectedIndex === 4) {
            navigation.navigate(Routes.transferHistory);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <AppBar title={Strings.menu} showBackButton={false} />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.row}>
                    <TransferCard
                        press={() => setSelectedIndex(1)}
                        icon={MyBankTransfer}
                        title={Strings.transferWithinBank()}
                        isSelected={selectedIndex === 1}
                    />
                    <TransferCard
                        press={() => setSelectedIndex(2)}
                        icon={OtherBankTransfer}
                        title={Strings.otherBanks}
                        isSelected={selectedIndex === 2}
                    />
                </View>

                <View style={styles.row}>
                    {isWireTransferEnable && (
                        <TransferCard
                            press={() => setSelectedIndex(3)}
                            icon={WireTransfer}
                            title={Strings.wireTransfer}
                            isSelected={selectedIndex === 3}
                        />
                    )}
                    <TransferCard
                        press={() => setSelectedIndex(4)}
                        icon={TransferHistory}
                        title={Strings.transferHistory}
                        isSelected={selectedIndex === 4}
                    />
                </View>

                <View style={{ height: Dimensions.windowWidth * 0.25 }} />

                <GenericButton onPress={handleNext} title={Strings.next} />
            </ScrollView>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
});

export default TransferScreen;
