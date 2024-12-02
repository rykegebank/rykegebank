import React from "react";
import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store"
import { useHomeQuery } from "./hooks/home";
import HomeScreenTop from "./components/homeScreenTop";
import NoInternet from "../../components/NoData/noInternet";
import LoadingIndicator from "../../components/Loader/loadingIndicator";
import HomeScreenItemsSection from "./components/homeScreenItemSection";
import { Colors, Dimensions, Strings } from "../../constants";
import { hexToRgba } from "../../utils/helperFunctions";
import { setOffline } from '../../hooks/internetSlice';

const HomeScreen = () => {
    const { isFetching, refetch } = useHomeQuery();
    const dispatch = useDispatch<AppDispatch>();
    const { isOffline } = useSelector((state: RootState) => state.internet)

    if (isOffline) {
        return (
            <NoInternet
                isNoInternet={true}
                press={(value) => {
                    if (value) {
                        refetch();
                        dispatch(setOffline(false));
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
                        refreshing={isFetching}
                        onRefresh={refetch}
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

            {isFetching && (
                <View style={styles.loadingOverlay}>
                    <LoadingIndicator
                        isLoading={isFetching}
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
        width: "100%",
    },
    content: {
        flex: 1,
        paddingHorizontal: Dimensions.space10,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: hexToRgba(Colors.colorWhite, 0.2),
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
});

export default HomeScreen;
