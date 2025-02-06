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
import { useMyBankTransfer } from './hooks/useMyBankTransfer';
import { useBeneficiary } from '../../data/beneficiary/mutation';
import { IData } from '../../types/beneficiary';
import NoDataFoundScreen from '../../components/NoDataFound/NoDataFound';
import TransactionSkeleton from "../../components/LoadingIndicators/transactionSkeleton";

const MyBankTransferScreen = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const {
        loadPaginationData,
        hasNext,
    } = useMyBankTransfer();

    const { loadMoreBeneficiary, beneficiaryList, nextPageUrl, beneficiaryData } = useBeneficiary();


    useEffect(() => {
        loadPaginationData();
    }, []);



    const renderItem = ({ item, index }: { item: IData, index: number }) => (
        <MyBankTransferListItem
            accountName={item.account_name ?? ''}
            accountNumber={item.account_number ?? ''}
            shortName={item.short_name ?? ''}
            index={index}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <AppBar
                title="Transfer Within MXBank"
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
            {true && beneficiaryList.length == 0 ? (
                <FlatList
                    data={Array(3).fill(null)} // Mock data with 3 items
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={() => <TransactionSkeleton />}
                    contentContainerStyle={styles.skeletonContainer}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            ) : beneficiaryList.length === 0 ? (
                <View style={styles.centered}>
                    <NoDataFoundScreen />
                </View>
            ) : (
                <FlatList
                    data={beneficiaryList}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ padding: 20 }}
                    renderItem={renderItem}
                    onEndReached={loadPaginationData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={isLoading && hasNext() ? <ActivityIndicator size="small" color="#007BFF" /> : null}
                />
            )}


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    separator: {
        height: Dimensions.size10,
    },
    skeletonContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
