import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Dimensions } from '../../../constants';

const NotificationSkeletonLoading = () => {
    return (
        <View style={styles.container}>
            <SkeletonPlaceholder>
                <View style={styles.rowContainer}>
                    {/* Circle to the left of the column */}
                    <View style={styles.circleContainer}>
                        <View style={styles.circle} />
                    </View>

                    {/* Column for remarks, trx, amount, and date */}
                    <View style={styles.remarksColumn}>
                        <View style={styles.remarks} />
                        <View style={styles.date} />
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
        marginVertical: 10,
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Dimensions.space10
    },
    circle: {
        width: Dimensions.size40,
        height: Dimensions.size40,
        borderRadius: Dimensions.size40 / 2,
        backgroundColor: '#e0e0e0',
    },
    remarksColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
    },
    remarks: {
        width: '60%',
        height: Dimensions.font16,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: '#e0e0e0',
    },
    date: {
        width: '35%',
        height: Dimensions.fontSmall,
        borderRadius: 8,
        backgroundColor: '#e0e0e0',
    },
});

export default NotificationSkeletonLoading;
