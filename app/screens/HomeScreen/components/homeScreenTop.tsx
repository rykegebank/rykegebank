import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Colors, Routes, Dimensions, Endpoints } from '../../../constants';
import BalanceAnimationContainer from './../components/balanceAnimationContainer';
import CircleImageButton from '../../../components/image/circleImageButton';
import CustomText from '../../../components/text/customText';
import { hexToRgba } from '../../../utils/helperFunctions';
import { RootState } from '../../../store';

const HomeScreenTop: React.FC = () => {
    const navigation = useNavigation();
    const { balance, currencySymbol, accountNumber, username, imagePath } = useSelector(
        (state: RootState) => state.home
    );

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity
                    style={{ flex: 8 }}
                    onPress={() => navigation.navigate(Routes.login)}>
                    <View style={styles.profileContainer}>
                        <CircleImageButton
                            height={Dimensions.size40}
                            width={Dimensions.size40}
                            imagePath={`${Endpoints.domain}/assets/images/user/profile/${imagePath}`}
                            isAsset={false}
                            press={() => navigation.navigate(Routes.login)}
                            isProfile={true}
                        />
                        <View style={styles.infoContainer}>
                            <CustomText fontSize={Dimensions.fontLarge} color={Colors.colorWhite} style={styles.text}> {username} </CustomText>
                            <CustomText fontSize={Dimensions.fontSmall} color={hexToRgba(Colors.colorWhite, 0.8)} style={styles.text}> {accountNumber} </CustomText>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.balanceContainer}>
                    <BalanceAnimationContainer
                        amount={balance}
                        curSymbol={currencySymbol}
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
    text: {
        paddingBottom: Dimensions.space5
    },
    balanceContainer: {
        width: 130,
    },
});

export default HomeScreenTop;
