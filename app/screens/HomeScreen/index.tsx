import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    RefreshControl,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, setNoInternetStatus } from './hooks/homeSlice';
import HomeScreenTop from './components/homeScreenTop';
import NoInternet from '../../components/noData/noInternet';
import LoadingIndicator from '../../components/loader/loadingIndicator';
import HomeScreenItemsSection from './components/homeScreenItemSection';
import { Colors, Dimensions, Strings } from '../../constants';
import { RootState, AppDispatch } from '../../store';
import { hexToRgba } from '../../utils/helperFunctions';

const HomeScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, noInternet } = useSelector((state: RootState) => state.home);

    useEffect(() => {
        dispatch(loadData());
    }, [dispatch]);

    const handleRefresh = async () => {
        await dispatch(loadData());
    };

    if (noInternet) {
        return (
            <NoInternet
                isNoInternet={true}
                press={(value) => {
                    if (value) {
                        dispatch(setNoInternetStatus(false));
                        dispatch(loadData());
                    }
                }}
            />
        );
    }

    return (
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={handleRefresh}
                            colors={[Colors.primaryColor]}
                            tintColor={Colors.primaryColor}
                            progressBackgroundColor={Colors.colorWhite}
                        />
                    }
                >
                    <View style={styles.appBar}>
                        <HomeScreenTop />
                    </View>
                    <View style={styles.content}>
                        <HomeScreenItemsSection />
                    </View>
                </ScrollView>

                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <LoadingIndicator
                            isLoading={isLoading}
                            message={Strings.loadingPleaseWait}
                            showOverlay={true}
                            isVerticallyCentered={true}
                            noBackground={false}
                        />
                    </View>
                )}
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colorWhite,
    },
    appBar: {
        backgroundColor: Colors.primaryColor,
        height: 90,
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: Dimensions.space10,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: hexToRgba(Colors.colorWhite, 0.2),
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
});

export default HomeScreen;
