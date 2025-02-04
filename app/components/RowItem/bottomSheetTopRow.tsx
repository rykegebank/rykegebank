import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomCircleAnimatedButton from '../GenericButton/customCircleAnimatedButton';
import ComponentDivider from '../Dividers/componentDivider';
import { Colors, Dimensions, Strings } from '../../constants';
import { MaterialIcons } from "@expo/vector-icons";

interface BottomSheetTopRowProps {
    header: string;
    onPress: () => void;
    bottomSpace?: number;
    bgColor?: string;
}

const BottomSheetTopRow: React.FC<BottomSheetTopRowProps> = ({ 
    header, 
    onPress, 
    bottomSpace = 10, 
    bgColor = Colors.containerBgColor 
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.headerText}>{header}</Text>
                <CustomCircleAnimatedButton
                    press={onPress} 
                    height={30}
                    width={30}
                    backgroundColor={bgColor}
                    child={<MaterialIcons name="close" style={styles.icon} />}
                />
            </View>
            <ComponentDivider lineColor="transparent" space={bottomSpace} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    icon: {
        fontSize: 15,
        color: 'black',
    },
});

export default BottomSheetTopRow;
