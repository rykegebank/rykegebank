import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Dimensions } from "../../constants";
import { hexToRgba } from '../../utils/helperFunctions';

interface CustomTextFieldProps {
    labelText?: string;
    hintText?: string;
    onChange?: (text: string) => void;
    onSubmit?: (text: string) => void;
    controller?: any;
    focusNode?: any;
    nextFocus?: any;
    validator?: (value: string) => string | undefined;
    textInputType?: string;
    isEnable?: boolean;
    isPassword?: boolean;
    isShowSuffixIcon?: boolean;
    isIcon?: boolean;
    onSuffixTap?: () => void;
    isSearch?: boolean;
    isCountryPicker?: boolean;
    inputAction?: "next" | "done" | "go" | "search";
    needOutlineBorder?: boolean;
    needLabel?: boolean;
    readOnly?: boolean;
    isRequired?: boolean;
    prefixText?: string;
    disableColor?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    labelText,
    hintText,
    onChange,
    onSubmit,
    controller,
    focusNode,
    nextFocus,
    validator,
    textInputType,
    isEnable = true,
    isPassword = false,
    isShowSuffixIcon = false,
    isIcon = false,
    onSuffixTap,
    isSearch = false,
    isCountryPicker = false,
    inputAction = "next",
    needOutlineBorder = false,
    needLabel = true,
    readOnly = false,
    isRequired = false,
    prefixText = "",
    disableColor = Colors.borderColor,
}) => {
    const [obscureText, setObscureText] = useState(true);

    return (
        <View style={styles.container}>
            {needLabel && (
                <Text style={styles.label}>
                    {labelText} {isRequired && "*"}
                </Text>
            )}
            <View style={[styles.inputContainer, needOutlineBorder && styles.outlineBorder]}>
                {prefixText && <Text style={styles.prefixText}>{prefixText}</Text>}
                <TextInput
                    style={styles.input}
                    placeholder={hintText}
                    placeholderTextColor={hexToRgba(Colors.colorBlack, 0.5)}
                    secureTextEntry={isPassword && obscureText}
                    keyboardType={textInputType as any}
                    editable={isEnable && !readOnly}
                    returnKeyType={inputAction}
                    onChangeText={onChange}
                    onSubmitEditing={(e) => (nextFocus ? nextFocus.current?.focus() : onSubmit?.(e.nativeEvent.text))}
                />
                {isShowSuffixIcon && (
                    <TouchableOpacity onPress={isPassword ? () => setObscureText(!obscureText) : onSuffixTap}>
                        <Text style={styles.suffixIcon}>{isPassword ? (obscureText ? "👁️" : "🙈") : "🔍"}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: Colors.borderColor,
    },
    outlineBorder: {
        borderWidth: 1,
        borderRadius: Dimensions.space25,
    },
    prefixText: {
        marginRight: 10,
        color: Colors.primaryColor,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: Colors.colorBlack,
    },
    suffixIcon: {
        fontSize: 16,
        marginLeft: 10,
        color: Colors.primaryColor,
    },
});

export default CustomTextField;
