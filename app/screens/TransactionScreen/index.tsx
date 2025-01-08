import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    FlatList,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppBar from '../../components/GenericAppBar';
import FilterRowWidget from './components/filterRow';
import { Colors } from '../../constants';
import CustomTransactionCard from './components/customTransactionCard';
import NoDataFoundScreen from '../../components/NoDataFound/NoDataFound';
import LoadingIndicator from '../../components/LoadingIndicators/loadingIndicator';
import TransactionBottomSheet from './components/bottomSheet';
import { useTransactionHistory } from './hooks/useTransactionHistory';
import { useForm, Controller } from 'react-hook-form';
import { RootState } from '../../store';

const TransactionScreen = () => {
    const state = useSelector((state: RootState) => state.transactionHistory);
    const { control, handleSubmit, setValue, getValues } = useForm();
    const {
        filterData,
        loadMore,
        changeSearchIcon,
        openFilterBottomSheet,
        onSelectBottomSheetItem,
        closeBottomSheetAction,
        changeExpandIndex,
        initializeTransactions,
    } = useTransactionHistory();

    // Initialize transaction data
    useEffect(() => {
        initializeTransactions();
    }, []);

    const changeTextColor = useCallback((trxType: string) => {
        return trxType === '+' ? Colors.green : Colors.red;
    }, []);

    const renderTransactionItem = useCallback(
        ({ item, index }: { item: any; index: number }) => {
            if (state.transactionList.length === index) {
                return state.nextPageUrl ? (
                    <View style={styles.footerLoader}>
                        <ActivityIndicator size="small" color={Colors.primaryColor} />
                    </View>
                ) : null;
            }

            return (
                <TouchableOpacity onPress={() => changeExpandIndex(index)}>
                    <CustomTransactionCard
                        index={index}
                        expandIndex={state.expandIndex}
                        trxType={item.trx_type ?? ''}
                        detailsText={item.details ?? ''}
                        trxData={item.trx ?? ''}
                        currency={state.currency}
                        changeTextColor={changeTextColor}
                        setExpandIndex={changeExpandIndex}
                        dateData={item.createdAt}
                        amountData={`${item.trx_type} ${item.amount}`}
                        postBalanceData={`${item.post_balance}`}
                    />
                </TouchableOpacity>
            );
        },
        [state, changeExpandIndex, changeTextColor]
    );

    const ListHeader = useCallback(
        () =>
            state.isSearch ? (
                <View style={styles.searchContainer}>
                    <View style={styles.row}>
                        <View style={styles.expanded}>
                            <Text style={styles.label}>Type</Text>
                            <FilterRowWidget
                                text={state.selectedTrxType || 'Trx Type'}
                                press={() => openFilterBottomSheet('type')}
                            />
                        </View>
                        <View style={styles.spacing15} />
                        <View style={[styles.expanded, styles.flex3]}>
                            <Text style={styles.label}>Remark</Text>
                            <FilterRowWidget
                                text={state.selectedRemark || 'Any'}
                                press={() => openFilterBottomSheet('remark')}
                            />
                        </View>
                    </View>
                    <Text style={styles.label}>Transaction No</Text>
                    <View style={styles.row}>
                        <Controller
                            control={control}
                            name="transactionNo"
                            render={({ field: { value, onChange } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    style={styles.textInput}
                                    placeholder="Enter Transaction No"
                                    placeholderTextColor="#9E9E9E"
                                />
                            )}
                        />
                        <TouchableOpacity
                            style={styles.searchButton}
                            onPress={() => filterData(getValues('transactionNo'))}
                        >
                            <MaterialIcons name="search" color={Colors.colorWhite} size={18} />
                        </TouchableOpacity>
                    </View>
                </View>
            ) : null,
        [state, filterData, control, getValues]
    );

    return (
        <>
            <AppBar
                title="Transactions"
                centerTitle
                showBackButton={false}
                backgroundColor={Colors.primaryColor}
                actions={[
                    <TouchableOpacity key="toggle" onPress={changeSearchIcon}>
                        <MaterialIcons
                            name={state.isSearch ? 'clear' : 'filter-list'}
                            size={24}
                            color={Colors.colorWhite}
                        />
                    </TouchableOpacity>,
                ]}
            />
            <ListHeader />
            {state.transactionList.length === 0 && !state.filterLoading ? (
                <NoDataFoundScreen />
            ) : state.filterLoading ? (
                <LoadingIndicator isLoading={true} />
            ) : (
                <FlatList
                    data={[...state.transactionList, {}]}
                    renderItem={renderTransactionItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.container}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                />
            )}
            <TransactionBottomSheet
                list={state.selectedList}
                callFrom={state.callFrom}
                header={state.bottomSheetTitle}
                visible={state.isBottomSheetVisible}
                onSelect={onSelectBottomSheetItem}
                onClose={closeBottomSheetAction}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    searchContainer: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 15,
        margin:15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    expanded: {
        flex: 2,
    },
    flex3: {
        flex: 3,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    textInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#B0B0B0',
        borderRadius: 4,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        color: '#000',
        flex: 1,
    },
    searchButton: {
        height: 45,
        width: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
        borderRadius: 4,
        marginLeft: 10,
    },
    spacing: {
        height: 10,
    },
    spacing10: {
        width: 10,
    },
    spacing15: {
        width: 15,
    },
    footerLoader: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TransactionScreen;
