import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Dimensions, Strings } from "../../constants";
import AppBar from "../../components/GenericAppBar";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import NoInternet from "../../components/NoDataFound/noInternet";
import WireTransferForm from "./components/wireTransferForm";
import { useWireTransfer } from './hooks/useWireTransfer';

const WireTransferScreen = () => {
    const { isLoading, noInternet } = useSelector((state: any) => state.wireTransfer);
    const { initializeData } = useWireTransfer();
    
    useEffect(() => {
        initializeData();
    }, []);


    const handleRetry = () => {
        // dispatch(setNoInternetStatus(false));
    };

    return (
        <SafeAreaView style={styles.container}>
            <AppBar title={Strings.wireTransfer} />
            {isLoading ? (
                <LoadingIndicator isLoading={isLoading} />
            ) : noInternet ? (
                <NoInternet isNoInternet={true} press={handleRetry} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.body}>
                        <WireTransferForm />
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lScreenBgColor1,
    },
    scrollView: {
        paddingHorizontal: Dimensions.space17,
    },
    body: {
        padding: Dimensions.space17,
        backgroundColor: Colors.colorWhite,
        borderRadius: 3,
    },
});

export default WireTransferScreen;
