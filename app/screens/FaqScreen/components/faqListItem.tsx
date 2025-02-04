import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Dimensions } from '../../../constants'
import { getCardBg } from '../../../constants/colors';
import { hexToRgba } from '../../../utils/helperFunctions';

interface FaqListItemProps {
    question: string;
    answer: string;
    index: number;
    selectedIndex: number;
    press: () => void;
}

const FaqListItem: React.FC<FaqListItemProps> = ({
    question,
    answer,
    index,
    selectedIndex,
    press,
}) => {
    const isExpanded = index === selectedIndex;

    return (
        <TouchableOpacity onPress={press} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.question} numberOfLines={2}>
                    {question}
                </Text>
                <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Colors.primaryColor}
                />
            </View>
            {isExpanded && (
                <Animated.View style={styles.expandedSection}>
                    <Text style={styles.answer}>{answer}</Text>
                </Animated.View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: Dimensions.space15,
        backgroundColor: getCardBg(),
        borderRadius: 3,
        marginBottom: Dimensions.space10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        fontSize: Dimensions.font16,
        fontWeight: '600',
        color: hexToRgba(Colors.colorBlack, 0.8), 
        flex: 1,
        marginRight: Dimensions.space10,
    },
    expandedSection: {
        marginTop:  Dimensions.space10,
    },
    answer: {
        fontSize: Dimensions.fontDefault,
        color: Colors.labelTextColor, 
    },
});

export default FaqListItem;
