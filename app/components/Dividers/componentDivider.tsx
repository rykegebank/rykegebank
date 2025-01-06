import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dimensions } from '../../constants';
import { getBorderColor } from '../../constants/colors';
interface ComponentDividerProps {
    space?: number;
    lineColor?: string;
}

const ComponentDivider: React.FC<ComponentDividerProps> = ({ space = Dimensions.space20, lineColor }) => {
    return (
        <View style={[styles.container, { marginVertical: space }]}>
            <View style={[styles.divider, { backgroundColor: lineColor ?? getBorderColor() }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }, divider: {
        width: '100%',
        height: 1,
    },
});

export default ComponentDivider;
