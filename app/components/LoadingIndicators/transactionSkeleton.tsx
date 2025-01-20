import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dimensions } from '../../constants';

const TransactionSkeleton = () => {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder>
                <View>
                    {/* First Row: trx and trx value */}
                    <View style={styles.rowContainer}>
                        <View style={styles.trx} />
                        <View style={styles.trxValue} />
                    </View>

                    {/* Second Row: date and date value */}
                    <View style={styles.rowContainer}>
                        <View style={styles.date} />
                        <View style={styles.dateValue} />
                    </View>

                    {/* Third Row: amount and amount value */}
                    <View style={styles.rowContainer}>
                        <View style={styles.amount} />
                        <View style={styles.amountValue} />
                    </View>

                    {/* Fourth Row: status centered */}
                    <View style={styles.statusContainer}>
                        <View style={styles.status} />
                    </View>
                </View>
            </SkeletonPlaceholder>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: Dimensions.space20,
        backgroundColor: '#fff',
        borderRadius: Dimensions.space5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Dimensions.space5,
    },
    statusContainer: {
        alignItems: 'flex-end',
        marginVertical: Dimensions.space5,
    },
    trx: {
        width: '20%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
    trxValue: {
        width: '30%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
    date: {
        width: '12%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
    dateValue: {
        width: '35%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
    amount: {
        width: '15%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
    amountValue: {
        width: '20%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
    status: {
        width: '15%',
        height: Dimensions.fontDefault,
        borderRadius: Dimensions.space5,
    },
});

export default TransactionSkeleton;
