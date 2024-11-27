import React from "react";
import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import { useHomeQuery } from "./hooks/home";
import HomeScreenTop from "./components/homeScreenTop";
import NoInternet from "../../components/NoData/noInternet";
import LoadingIndicator from "../../components/Loader/loadingIndicator";
import HomeScreenItemsSection from "./components/homeScreenItemSection";
import { Colors, Dimensions, Strings } from "../../constants";
import { hexToRgba } from "../../utils/helperFunctions";

const HomeScreen = () => {
    const { data, isFetching, error, refetch } = useHomeQuery();

    if (error?.message === "No internet connection") {
        return (
            <NoInternet
                isNoInternet={true}
                press={(value) => {
                    if (value) {
                        refetch();
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
