import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions, Colors } from '../../constants'
interface FormRowProps {
    label?: string;
    isRequired: boolean;
}

const FormRow: React.FC<FormRowProps> = ({ label, isRequired }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {isRequired && <Text style={styles.required}> *</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        color: Colors.labelTextColor,
        fontSize: Dimensions.font16,
    },
    required: {
        color: Colors.red,
        fontWeight: "bold",
        fontSize: Dimensions.font16,
    },
});

export default FormRow;
