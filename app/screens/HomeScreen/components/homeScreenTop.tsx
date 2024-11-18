import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BalanceAnimationContainer from './../components/balanceAnimationContainer';
import ProfileImage from '../../../components/profileImage';
import { Colors, Routes, Dimensions } from '../../../constants';

const HomeScreenTop = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ flex: 8 }}
                    onPress={() => navigation.navigate(Routes.login)}>
                    <View style={styles.profileContainer}>
                        <ProfileImage uri={''} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.username}>{'user_demo'}</Text>
                            <Text style={styles.accountNumber}>{'VB241214213810'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.balanceContainer}>
                    <BalanceAnimationContainer
                        amount={'100'}
                        curSymbol={'P'}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryColor,
        paddingTop: Dimensions.space20,
        paddingHorizontal: Dimensions.space15,
        height: 90
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: Dimensions.space20,
    },
    infoContainer: {
        marginLeft: Dimensions.space15,
    },
    username: {
        color: 'white',
        fontSize: Dimensions.fontLarge,
        fontWeight: '500',
    },
    accountNumber: {
        color: Colors.colorWhite,
        fontSize: Dimensions.fontSmall,
    },
    balanceContainer: {
        width: 130,
    },
});


export default HomeScreenTop;
