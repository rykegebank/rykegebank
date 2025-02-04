import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Dimensions } from "../../constants";

interface BottomSheetContainerProps {
    children: React.ReactNode;
    showBorder?: boolean;
}

const BottomSheetContainer: React.FC<BottomSheetContainerProps> = ({
    children,
    showBorder = false,
}) => {
    return (
        <View
            style={[
                styles.container,
                showBorder ? styles.border : styles.noBorder,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        borderRadius: 4,
        backgroundColor: Colors.colorWhite,
    },
    border: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
    },
    noBorder: {
        borderWidth: 1,
        borderColor: Colors.transparentColor,
    },
});

export default BottomSheetContainer;
