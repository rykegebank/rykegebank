import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'; 
import { loadData, selectHome } from './hooks/homeSlice'; 

import HomeScreenTop from './components/homeScreenTop';
import NoDataFoundScreen from '../NoDataFoundScreen';
import HomeScreenItemsSection from './components/homeScreenItemSection';
import { Colors } from '../../constants';
import { RootState, AppDispatch } from '../../store';

const HomeScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading, noInternet, username, balance } = useSelector(
        (state: RootState) => state.home 
    );
    useEffect(() => {
        console.log('called')
        dispatch(loadData());
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (noInternet) {
        return (
            <View style={styles.container}>
                <Text>No Internet Connection</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <HomeScreenTop />
            <HomeScreenItemsSection />
            {/* Test */}
            <Text>{username}</Text>
            <Text>{balance}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorWhite,
    },
});

export default HomeScreen;
