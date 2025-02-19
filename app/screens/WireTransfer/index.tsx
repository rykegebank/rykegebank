import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Colors, Dimensions, Strings } from "../../constants";
import AppBar from "../../components/GenericAppBar";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import NoInternet from "../../components/NoDataFound/noInternet";
import WireTransferForm from "./components/wireTransferForm";
import { useWireTransfer } from './hooks/useWireTransfer';
import { setOffline } from '../../store/slices/internetSlice';
import { RootState, AppDispatch } from "../../store"

const WireTransferScreen = () => {
    const { isLoading } = useSelector((state: any) => state.wireTransfer);
    const { isOffline } = useSelector((state: any) => state.internet);
    const { initializeData } = useWireTransfer();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        initializeData();
    }, []);



    return (
        <SafeAreaView style={styles.container}>

            <AppBar title={Strings.wireTransfer} />
            {isOffline ? (
                <NoInternet
                    isNoInternet={true}
                    press={(value) => {
                        if (value) {
                            dispatch(setOffline(false));
                        }
                    }}
                />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.body}>
                        <WireTransferForm />
                    </View>
                </ScrollView>
            )}
            <LoadingIndicator isLoading={isLoading} />

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
        marginTop: Dimensions.space17,
        padding: Dimensions.space17,
        backgroundColor: Colors.colorWhite,
        borderRadius: 3,
    },
});

export default WireTransferScreen;
