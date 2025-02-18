import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import RoundedLoadingBtn from "../../../components/GenericButton/roundedLoadingButton";
import RoundedButton from "../../../components/GenericButton/index";
import CustomDropDownTextField from "../../../components/GenericInput/DropDownButtonWithTextField";
import CustomAmountTextField from "../../../components/GenericInput/customAmountTextField";
import LimitPreviewRow from "../../../components/RowItem/limitPreviewRow";
import WidgetDivider from "../../../components/Dividers/componentDivider";
import ExpandedSection from "../../../components/Animated/expandedSection";
import BottomSheetContainer from "../../../components/CustomContainer/bottomSheetContainer";
import BottomSheetTopRow from "../../../components/RowItem/bottomSheetTopRow";
import { Colors, Dimensions } from "../../../constants";
import Dropdown from "./Dropdown";

const SCREEN_HEIGHT = Dimensions.windowHeight;
const SHEET_HEIGHT = SCREEN_HEIGHT / 2.1;

interface MyBankTransferBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectAuthMode: (authMode: string) => void;
  onTransfer: (beneficiaryId: string) => void;
  currencySymbol: string;
  currency: string;
  amount: string;
  limitPerTrx: string;
  chargePerTrx: string;
  dailyMaxLimit: string;
  monthlyLimit: string;
  authorizationList: string[];
  selectedAuthorizationMode: string;
  submitLoading: boolean;
}

const OtherTransferBottomSheet: React.FC<MyBankTransferBottomSheetProps> = ({
  isVisible,
  onClose,
  onTransfer,
  onSelectAuthMode,
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
  const [sheetHeight, setSheetHeight] = useState(
    new Animated.Value(SHEET_HEIGHT)
  );
  const [currentHeight, setCurrentHeight] = useState(SHEET_HEIGHT);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  useEffect(() => {
    if (isVisible) {
      if (isFirstOpen) {
        setSheetHeight(new Animated.Value(currentHeight));
        setIsFirstOpen(false);
      } else {
        Animated.timing(sheetHeight, {
          toValue: currentHeight,
          duration: 300,
          useNativeDriver: false,
        }).start();
      }
    } else {
      Animated.timing(sheetHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, currentHeight, isFirstOpen]);

  useEffect(() => {
    setCurrentHeight(
      isLimitVisible ? SCREEN_HEIGHT * 0.75 : SCREEN_HEIGHT / 2.1
    );
  }, [isLimitVisible]);

  const handleAmountChange = (text: string) => {
    setAmountValue(text);
  };

  const toggleLimitVisibility = () => {
    setIsLimitVisible((prev) => !prev);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="none"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View style={[styles.bottomSheet, { height: sheetHeight }]}>
          <BottomSheetTopRow header="Transfer Money" onPress={onClose} />

          <BottomSheetContainer>
            <View style={styles.limitContainer}>
              <TouchableOpacity
                onPress={toggleLimitVisibility}
                style={styles.limitToggle}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="info-outline"
                    color={Colors.colorGrey}
                    size={18}
                  />
                  <Text style={styles.limitText}>Transfer Limit</Text>
                </View>
                <MaterialIcons
                  name={isLimitVisible ? "arrow-upward" : "arrow-drop-down"}
                  color={Colors.colorGrey}
                  size={18}
                />
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

            {/* Wrapper with border from Amount to Button */}
            <View style={styles.borderContainer}>
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
                  <Text style={styles.authorizationLabel}>
                    Authorization Method <Text style={{ color: "red" }}>*</Text>
                  </Text>
                  <Dropdown
                    label="Select"
                    options={authorizationList}
                    selectedValue={selectedAuthorizationMode}
                    onSelect={(newValue: string) => {
                      onSelectAuthMode(newValue);
                    }}
                    style={{ marginBottom: 16 }}
                    error={""}
                  />
                  {/* <CustomDropDownTextField
                    selectedValue={selectedAuthorizationMode}
                    list={authorizationList}
                    onChanged={(value) => onSelectAuthMode(value)}
                  /> */}
                </View>
              )}

              <View style={styles.buttonContainer}>
                {submitLoading ? (
                  <RoundedLoadingBtn width={0.5} />
                ) : (
                  <RoundedButton
                    onPress={() => {
                      console.log("Amount on button click:", amountValue);
                      onTransfer(amountValue);
                    }}
                    title="Apply Now"
                  />
                )}
              </View>
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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    backgroundColor: Colors.colorWhite,
    borderTopLeftRadius: Dimensions.size15,
    borderTopRightRadius: Dimensions.size15,
    padding: Dimensions.size15,
  },
  limitContainer: {
    marginBottom: Dimensions.size20,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: Dimensions.size10,
    padding: Dimensions.size10,
  },
  limitToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  limitText: {
    fontSize: Dimensions.fontDefault,
    fontWeight: "600",
    color: Colors.colorGrey,
    marginLeft: Dimensions.space5,
  },
  arrow: {
    fontSize: Dimensions.extraLarge,
    color: Colors.colorGrey,
  },
  borderContainer: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: Dimensions.size10,
    padding: Dimensions.size15,
  },
  amountContainer: {},
  amountLabel: {
    fontSize: Dimensions.fontDefault,
  },
  authorizationContainer: {
    marginBottom: Dimensions.size15,
  },
  authorizationLabel: {
    fontSize: Dimensions.fontDefault,
    marginBottom: 8,
  },
  buttonContainer: {
    alignItems: "center",
  },
});

export default OtherTransferBottomSheet;
