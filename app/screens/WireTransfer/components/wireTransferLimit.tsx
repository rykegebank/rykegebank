import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { formatNumber, showPercent } from "../../../utils/stringFormatHelper";
import { RootState } from "../../../store";
import { Strings, Colors, Dimensions } from "../../../constants";
import BottomSheetColumn from "../../../components/BottomSheet/bottomSheetColumn";

const SCREEN_HEIGHT = Dimensions.windowHeight;
const SHEET_HEIGHT = SCREEN_HEIGHT * 0.35; // Set the height to 40% of the screen height

const WireTransferLimitModal = ({ visible: propVisible, onClose }: { visible: boolean; onClose: () => void }) => {
    const controller = useSelector((state: RootState) => state.wireTransfer);
    const [visible, setVisible] = useState(propVisible);

    useEffect(() => {
        setVisible(propVisible);
    }, [propVisible]);

    return (
        <Modal visible={visible} animationType="none" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={[styles.bottomSheet, { height: SHEET_HEIGHT }]}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.modalHeader}>
                            {/* Close Icon */}
                            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                                <MaterialIcons name="close" size={30} color={Colors.colorGrey} />
                            </TouchableOpacity>
                            <Text style={styles.headerText}>{Strings.transferLimit}</Text>
                        </View>
                        <View style={styles.content}>
                            {/* Per Transaction Section */}
                            <View style={styles.row}>
                                <BottomSheetColumn
                                    header={Strings.perTransaction}
                                    body={`${formatNumber(controller.setting?.minimum_limit ?? "0")} - ${formatNumber(controller.setting?.maximum_limit ?? "0")} ${controller.currency}`}
                                />
                                <BottomSheetColumn
                                    header={Strings.charge}
                                    body={`${controller.setting?.percent_charge ?? ""}% ${showPercent(controller.currencySymbol, controller.setting?.fixed_charge ?? "0")}`}
                                    alignmentEnd
                                    isCharge
                                />
                            </View>

                            {/* Daily and Monthly Limits */}
                            <View style={styles.row}>
                                <BottomSheetColumn
                                    header={Strings.dailyMax}
                                    body={`${formatNumber(controller.setting?.daily_maximum_limit ?? "0")} ${controller.currency}`}
                                />
                                <BottomSheetColumn
                                    header={Strings.monthlyMax}
                                    body={`${formatNumber(controller.setting?.monthly_maximum_limit ?? "0")} ${controller.currency}`}
                                    alignmentEnd
                                />
                            </View>

                            {/* Daily and Monthly Transactions */}
                            <View style={styles.row}>
                                <BottomSheetColumn header={Strings.dailyMaxTrx} body={controller.setting?.daily_total_transaction ?? "0"} />
                                <BottomSheetColumn header={Strings.monthlyMinTrx} body={controller.setting?.monthly_total_transaction ?? "0"} alignmentEnd />
                            </View>
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    bottomSheet: {
        backgroundColor: Colors.colorWhite,
        borderTopLeftRadius: Dimensions.size15,
        borderTopRightRadius: Dimensions.size15,
        padding: Dimensions.size15,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    modalHeader: {
        padding: 15,
        alignItems: "center",
    },
    closeIcon: {
        position: "absolute",
        top: 10,
        right: 15, // Move icon to the top right
        zIndex: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20, // Adjust the top margin for the title (no background color)
    },
    content: {
        padding: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
});

export default WireTransferLimitModal;
