import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Routes, Dimensions } from '../../../constants';
import BalanceAnimationContainer from './../components/balanceAnimationContainer';
import CircleImageButton from '../../../components/image/circleImageButton';
import CustomText from '../../../components/text/customText';
import { hexToRgba } from '../../../utils/helperFunctions';

const HomeScreenTop = () => {
    const navigation = useNavigation();

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
                            imagePath="https://example.com/your_image.jpg" // Replace with the image URL
                            isAsset={false} // Indicating it's an image from a URL
                            press={() => navigation.navigate(Routes.login)} // Optional press action
                            isProfile={true} // Optional, set to true if it's a profile image
                        />
                        <View style={styles.infoContainer}>
                            <CustomText fontSize={Dimensions.fontLarge} color={Colors.colorWhite} style={styles.text}> {'user_demo'} </CustomText>
                            <CustomText fontSize={Dimensions.fontSmall} color={hexToRgba(Colors.colorWhite, 0.8)} style={styles.text}> {'VB241214213810'} </CustomText>
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
    text: {
        paddingBottom: Dimensions.space5
    },

    balanceContainer: {
        width: 130,
    },
});


export default HomeScreenTop;
