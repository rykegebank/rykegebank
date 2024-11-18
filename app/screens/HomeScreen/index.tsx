import React from 'react';
import { View, StyleSheet } from 'react-native';

import HomeScreenTop from './components/homeScreenTop';
import NoDataFoundScreen from '../NoDataFoundScreen';
import HomeScreenItemsSection from './components/homeScreenItemSection';
import { Colors } from '../../constants';

const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <HomeScreenTop />
            {/* <NoDataFoundScreen /> */}
            <HomeScreenItemsSection />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorWhite
    },

});


export default HomeScreen;
