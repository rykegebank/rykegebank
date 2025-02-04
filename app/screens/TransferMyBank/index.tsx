import React, { useEffect, useRef, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
    View,
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

import MyBankTransferListItem from './components/myBankTransferListItem';
import { Colors, Dimensions, Strings } from '../../constants';
import AppBar from '../../components/GenericAppBar';

interface Beneficiary {
    accountName: string;
    accountNumber: string;
    shortName: string;
}

const MyBankTransferScreen = () => {
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasNext, setHasNext] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        fetchBeneficiaries();
    }, [page]);

    const fetchBeneficiaries = async () => {
        try {
            setIsLoading(true);
            // Simulating API call
            setTimeout(() => {
                const newBeneficiaries: Beneficiary[] = [
                    { accountName: 'John Doe', accountNumber: '123456', shortName: 'JD' },
                    { accountName: 'Jane Smith', accountNumber: '789012', shortName: 'JS' },
                ];
                setBeneficiaries((prev) => [...prev, ...newBeneficiaries]);
                setIsLoading(false);
                setHasNext(newBeneficiaries.length > 0);
            }, 1000);
        } catch (error) {
            console.error('Error fetching beneficiaries:', error);
            setIsLoading(false);
        }
    };

    const loadMoreData = () => {
        if (hasNext && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const renderItem = ({ item, index }: { item: Beneficiary; index: number }) => (
        <MyBankTransferListItem
            accountName={item.accountName}
            accountNumber={item.accountNumber}
            shortName={item.shortName}
            index={index}
        />
    );

    return (
        <SafeAreaView style={styles.container}>


            <AppBar
                title="Transfer Within Viser Bank"
                centerTitle
                showBackButton={true}
                backgroundColor={Colors.primaryColor}
                actions={[
                    <TouchableOpacity key="toggle" onPress={() => console.log('')} style={styles.iconContainer}>
                        <MaterialIcons
                            name={'add'}
                            size={15}
                            color={Colors.primaryColor}
                        />
                    </TouchableOpacity>,
                ]}
            />
            {isLoading && beneficiaries.length === 0 ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : beneficiaries.length === 0 ? (
                <Text style={styles.noDataText}>No Beneficiaries Found</Text>
            ) : (
                <FlatList
                    data={beneficiaries}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={renderItem}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isLoading && hasNext ? <ActivityIndicator size="small" color="#007BFF" /> : null}
                />
            )}


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    iconContainer: {
        width: 25,
        height: 25,
        borderRadius: 18,
        backgroundColor: Colors.colorWhite,
        justifyContent: "center",
        alignItems: "center",
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 20,
    },
});

export default MyBankTransferScreen;
