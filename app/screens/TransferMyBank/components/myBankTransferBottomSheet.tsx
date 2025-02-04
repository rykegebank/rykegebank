import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Keyboard, Platform } from 'react-native';
import RoundedLoadingBtn from '../../../components/GenericButton/roundedLoadingButton';
import RoundedButton from '../../../components/GenericButton/index';
import CustomDropDownTextField from '../../../components/GenericInput/DropDownButtonWithTextField';
import CustomAmountTextField from '../../../components/GenericInput/customAmountTextField';
import LimitPreviewRow from '../../../components/RowItem/limitPreviewRow';
import WidgetDivider from '../../../components/Dividers/componentDivider';
import ExpandedSection from '../../../components/Animated/expandedSection';
import BottomSheetContainer from '../../../components/CustomContainer/bottomSheetContainer';
import BottomSheetTopRow from '../../../components/RowItem/bottomSheetTopRow';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_HEIGHT = SCREEN_HEIGHT / 2;

interface MyBankTransferBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    onTransfer: (beneficiaryId: string) => void;
    currencySymbol: string;
    currency: string;
    amount: string;
    limitPerTrx: number;
    chargePerTrx: number;
    dailyMaxLimit: number;
    monthlyLimit: number;
    authorizationList: string[];
    selectedAuthorizationMode: string;
    submitLoading: boolean;
}

const MyBankTransferBottomSheet: React.FC<MyBankTransferBottomSheetProps> = ({
    isVisible,
    onClose,
    onTransfer,
    currencySymbol,
    currency,
    amount,
    limitPerTrx,
    chargePerTrx,
    dailyMaxLimit,
    monthlyLimit,
    authorizationList,
    selectedAuthorizationMode,
    submitLoading,
}) => {
    const [amountValue, setAmountValue] = useState(amount);
    const [isLimitVisible, setIsLimitVisible] = useState(false);
    const [sheetHeight, setSheetHeight] = useState(SHEET_HEIGHT);
    const [slideAnim] = useState(new Animated.Value(SHEET_HEIGHT)); // Initialize animation for sliding effect

    useEffect(() => {
        if (isVisible) {
            // Animate the bottom sheet to slide up when visible
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            // Animate the bottom sheet to slide down when closed
            Animated.timing(slideAnim, {
                toValue: SHEET_HEIGHT,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    useEffect(() => {
        // Adjust the height when the limit visibility changes
        const newHeight = isLimitVisible ? SCREEN_HEIGHT / 1.2 : SHEET_HEIGHT;
        setSheetHeight(newHeight);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isLimitVisible]);

    const handleAmountChange = (text: string) => {
        setAmountValue(text);
    };

    const toggleLimitVisibility = () => {
        setIsLimitVisible((prev) => !prev);
    };

    return (
        <Modal visible={isVisible} animationType="none" transparent onRequestClose={onClose}>
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        {
                            transform: [{ translateY: slideAnim }],
                            height: sheetHeight, // Dynamically set the height based on the limit visibility
                        },
                    ]}
                >
                    <BottomSheetTopRow header="Transfer Money" onPress={onClose} />

                    <BottomSheetContainer>
                        <View style={styles.limitContainer}>
                            <TouchableOpacity onPress={toggleLimitVisibility} style={styles.limitToggle}>
                                <Text style={styles.limitText}>Transfer Limit</Text>
                                <Text style={styles.arrow}>{isLimitVisible ? '↑' : '↓'}</Text>
                            </TouchableOpacity>

                            <ExpandedSection expand={isLimitVisible}>
                                <WidgetDivider />
                                <LimitPreviewRow
                                    firstText="Limit per Transaction"
                                    secondText={`${currencySymbol}${limitPerTrx}`}
                                />
                                <LimitPreviewRow
                                    firstText="Charge per Transaction"
                                    secondText={chargePerTrx.toString()}
                                />
                                <LimitPreviewRow
                                    firstText="Daily Limit"
                                    secondText={`${currencySymbol}${dailyMaxLimit}`}
                                />
                                <LimitPreviewRow
                                    firstText="Monthly Limit"
                                    secondText={`${currencySymbol}${monthlyLimit}`}
                                    showDivider={false}
                                />
                            </ExpandedSection>
                        </View>

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountLabel}>Amount</Text>
                            <CustomAmountTextField
                                chargeText={amountValue}
                                onChanged={handleAmountChange}
                                currency={currency}
                                labelText="Amount"
                                hintText="Enter Amount"
                            />
                        </View>

                        {authorizationList.length > 1 && (
                            <View style={styles.authorizationContainer}>
                                <Text style={styles.authorizationLabel}>Authorization Method</Text>
                                <CustomDropDownTextField
                                    selectedValue={selectedAuthorizationMode}
                                    list={authorizationList}
                                    onChanged={(value) => {
                                        // Call the function to change the authorization mode
                                    }}
                                />
                            </View>
                        )}

                        <View style={styles.buttonContainer}>
                            {submitLoading ? (
                                <RoundedLoadingBtn />
                            ) : (
                                <RoundedButton
                                    onPress={() => onTransfer('beneficiaryId')}
                                    title="Apply Now"
                                />
                            )}
                        </View>
                    </BottomSheetContainer>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
    bottomSheet: {
        backgroundColor: 'white',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    limitContainer: {
        marginBottom: 20,
    },
    limitToggle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    limitText: {
        fontSize: 16,
    },
    arrow: {
        fontSize: 20,
        color: '#ccc',
    },
    amountContainer: {
        marginBottom: 20,
    },
    amountLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    authorizationContainer: {
        marginBottom: 20,
    },
    authorizationLabel: {
        fontSize: 16,
        marginBottom: 8,
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default MyBankTransferBottomSheet;
