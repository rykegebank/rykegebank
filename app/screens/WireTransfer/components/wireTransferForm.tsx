import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useWireTransfer } from "../hooks/useWireTransfer";
import CustomTextField from "../../../components/GenericInput/customTextField";
import DropDownButtonWithTextField from "../../../components/GenericInput/DropDownButtonWithTextField";
import CustomRadioButton from "../../../components/customRadioButton";
import CustomCheckBox from "../../../components/Checkbox/customCheckBox";
import ChooseFileItem from "../../../components/GenericButton/chooseFile";
import GenericButton from "../../../components/GenericButton";
import RoundedLoadingBtn from "../../../components/GenericButton/roundedLoadingButton";
import FormRow from "../../../components/RowItem/formRow";
import { Strings, Colors } from "../../../constants";
import WireTransferLimitModal from "../components/wireTransferLimit";

const WireTransferForm: React.FC = () => {
    const {
        state,
        submitMutation,
        pickFile,
        changeSelectedValue,
        changeSelectedRadioBtnValue,
        changeSelectedCheckBoxValue,
        changeAuthorizationMode
    } = useWireTransfer();

    const [isModalVisible, setModalVisible] = useState(false);
    const [amountValue, setAmountValue] = useState('0');

    const handleAmountChange = (text: string) => {
        setAmountValue(text);
    };

    return (
        <ScrollView style={{ padding: 16 }}>
            {/* Amount Field */}
            <CustomTextField
                labelText={Strings.amount}
                hintText={Strings.enterAmount}
                isRequired
                needOutlineBorder
                needLabel
                onChange={handleAmountChange}
            />

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{ color: Colors.redCancelTextColor }}>{Strings.transferLimit}</Text>
            </TouchableOpacity>

            {/* Authorization Method Field */}
            {state.authorizationList.length > 1 && (
                <>
                    <FormRow label={Strings.authorizationMethod} isRequired={true} />
                    <DropDownButtonWithTextField
                        list={state.authorizationList}
                        selectedValue={state.selectedAuthorizationMode}
                        onChanged={(value) => changeAuthorizationMode(value)}
                    />
                </>
            )}
            <View style={{ paddingBottom: 10 }} />
            {/* Dynamic Form Fields */}
            {state.formList.map((model, index) => (
                <View key={index}>
                    {model.type === "text" && (
                        <>
                            <CustomTextField
                                labelText={model.name}
                                hintText={model.name}
                                onChange={(value) => changeSelectedValue(index, value)}
                                isRequired={model.is_required !== "optional"}
                                needOutlineBorder
                                needLabel
                            />
                        </>
                    )}

                    {model.type === "textarea" && (
                        <>
                            <CustomTextField
                                labelText={model.name}
                                hintText={model.name}
                                onChange={(value) => changeSelectedValue(index, value)}
                                isRequired={model.is_required !== "optional"}
                                needOutlineBorder
                                needLabel
                            />
                        </>
                    )}

                    {model.type === "select" && (
                        <>
                            <FormRow label={model.name} isRequired={model.is_required !== "optional"} />
                            <DropDownButtonWithTextField
                                list={model.options || []}
                                selectedValue={model.selected_value}
                                onChanged={(value) => changeSelectedValue(index, value)}
                            />
                        </>
                    )}

                    {model.type === "radio" && (
                        <>
                            <FormRow label={model.name} isRequired={model.is_required !== "optional"} />
                            <CustomRadioButton
                                list={model.options || []}
                                selectedIndex={model.options?.indexOf(model.selected_value) ?? 0}
                                onChanged={(selectedIndex) => changeSelectedRadioBtnValue(index, selectedIndex)}
                            />
                        </>
                    )}

                    {model.type === "checkbox" && (
                        <>
                            <FormRow label={model.name} isRequired={model.is_required !== "optional"} />
                            <CustomCheckBox
                                list={model.options || []}
                                selectedValues={model.cb_selected || []}
                                onChanged={(value) => changeSelectedCheckBoxValue(index, value)}
                            />
                        </>
                    )}

                    {model.type === "file" && (
                        <>
                            <FormRow label={model.name} isRequired={model.is_required !== "optional"} />
                            <TouchableOpacity onPress={() => pickFile(index)}>
                                <ChooseFileItem
                                    fileName={model.selected_value || Strings.chooseFile}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            ))}

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                {state.isLoading ? (
                    <RoundedLoadingBtn width={0.5} />
                ) : (
                    <GenericButton
                        onPress={() => submitMutation.mutate({ amount: amountValue, twoFactorCode: '' })}
                        title={Strings.submit}
                    />
                )}
            </View>

            {/* WireTransferLimitModal */}
            <WireTransferLimitModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
});

export default WireTransferForm;
