import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Dimensions, Strings } from '../../constants';
import { hexToRgba } from '../../utils/helperFunctions';

interface CustomAmountTextFieldProps {
    labelText: string;
    hintText: string;
    chargeText?: string;
    currency: string;
    onChanged: (text: string) => void;
    autoFocus?: boolean;
    required?: boolean;
    inputAction?: 'next' | 'done' | 'go';
    controller?: any;
}

const CustomAmountTextField: React.FC<CustomAmountTextFieldProps> = ({
    labelText,
    hintText,
    chargeText = '',
    currency,
    onChanged,
    autoFocus = false,
    required = false,
    inputAction,
    controller
}) => {

    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.labelText}>
                {labelText} {required && <Text style={styles.required}>*</Text>}
            </Text>
            <View style={[styles.inputContainer, { borderColor: isFocus ? Colors.primaryColor : Colors.borderColor }]}>
                <TextInput
                    ref={controller}
                    style={styles.textInput}
                    placeholder={hintText}
                    placeholderTextColor={hexToRgba(Colors.colorGrey, 0.5)}
                    keyboardType="numeric"
                    returnKeyType={inputAction}
                    onChangeText={onChanged}
                    value={chargeText}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    autoFocus={autoFocus}
                />
                <View style={styles.currencyContainer}>
                    <Text style={styles.currencyText}>{currency}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    labelText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.textColor,
    },
    required: {
        color: 'red',
    },
    inputContainer: {
        height: 50,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 5,
        fontSize: 16,
        color: Colors.colorBlack,
    },
    currencyContainer: {
        width: 48,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.transparentColor,
    },
    currencyText: {
        fontSize: 16,
        color: hexToRgba(Colors.colorGrey, 0.5),
        fontWeight: '500',
    },
});

export default CustomAmountTextField;
