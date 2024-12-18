import React, { useEffect } from "react";
import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { RootState, AppDispatch } from "../../store"
import { useHomeQuery } from "./hooks/useHome";
import HomeScreenTop from "./components/homeScreenTop";
import NoInternet from "../../components/NoDataFound/noInternet";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import HomeScreenItemsSection from "./components/homeScreenItemSection";
import { Colors, Dimensions, Strings } from "../../constants";
import { hexToRgba } from "../../utils/helperFunctions";
import { setOffline } from '../../store/slices/internetSlice';

const HomeScreen = () => {
    const { isFetching, refetch } = useHomeQuery();
    const dispatch = useDispatch<AppDispatch>();
    const { isOffline } = useSelector((state: RootState) => state.internet);
    const queryClient = useQueryClient();


    if (isOffline) {
        return (
            <NoInternet
                isNoInternet={true}
                press={(value) => {
                    if (value) {
                        queryClient.resetQueries({ queryKey: ["homeData"] });
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
