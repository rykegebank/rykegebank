import React, { useCallback, useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import MyBankTransferListItem from './components/myBankTransferListItem';
import { Colors, Dimensions, Strings } from '../../constants';
import AppBar from '../../components/GenericAppBar';
import { useMyBankTransfer } from './hooks/useMyBankTransfer';
import { useBeneficiary } from '../../data/beneficiary/mutation';
import NoDataFoundScreen from '../../components/NoDataFound/NoDataFound';
import TransactionSkeleton from "../../components/LoadingIndicators/transactionSkeleton";

const MyBankTransferScreen = () => {
    const beneficiaryState = useSelector((state: RootState) => state.beneficiary);

    const { hasNext, beneficiaryList, loadMoreBeneficiary, reloadBeneficiary } = useBeneficiary();

    useEffect(() => {
        console.log("useEffect")
        loadMoreBeneficiary();
    }, []);


    const onRefresh = async () => {
        console.log("onRefresh")
        await reloadBeneficiary();
    };

    const renderItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
            if (index === beneficiaryList.length - 1 && !beneficiaryState.isLoading && beneficiaryState.nextPageUrl) {
                return <TransactionSkeleton />;
            }
            return (
                <MyBankTransferListItem
                    accountName={item.account_name ?? ''}
                    accountNumber={item.account_number ?? ''}
                    shortName={item.short_name ?? ''}
                    index={index}
                    beneficiaryID={item?.id?.toString() ?? ''}
                />
            );
        },
        []
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
                        <MaterialIcons name={'add'} size={15} color={Colors.primaryColor} />
                    </TouchableOpacity>,
                ]}
            />
            {beneficiaryState.isLoading ? (
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
                    onEndReached={() => {
                        if (hasNext() && !beneficiaryState.isLoading) {
                            console.log('loadPaginationData')
                            loadMoreBeneficiary();
                        }
                    }}
                    onEndReachedThreshold={0.5}
                    refreshControl={<RefreshControl refreshing={beneficiaryState.isLoading} onRefresh={onRefresh} />}
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
