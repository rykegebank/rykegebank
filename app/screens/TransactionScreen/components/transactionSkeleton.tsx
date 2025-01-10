import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dimensions } from '../../../constants';

const SkeletonLoading = () => {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder>
                <View>
                    <View style={styles.remarks} />

                    <View style={styles.rowContainer}>
                        <View style={styles.trx} />

                        <View style={styles.amount} />
                    </View>

                    <View style={styles.date} />
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
        marginVertical: 10,
    },
    remarks: {
        width: '60%',
        height: Dimensions.font16,
        borderRadius: 8,
    },
    trx: {
        width: '25%',
        height: Dimensions.fontDefault,
        borderRadius: 8,
    },
    amount: {
        width: '25%',
        height: Dimensions.large,
        borderRadius: 8,
    },
    date: {
        width: '20%',
        height: Dimensions.fontSmall,
        borderRadius: 8,
    },
});

export default SkeletonLoading;
