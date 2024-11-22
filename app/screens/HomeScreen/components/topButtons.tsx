import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import ModuleProvider from './moduleProvider';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useNavigation } from '@react-navigation/native';

const TopButtons: React.FC = () => {
    const navigation = useNavigation();
    const {
        isDepositEnable,
        isWithdrawEnable,
        isFDREnable,
        isDPSEnable,
        isLoanEnable,
        isReferralEnable,
    } = useSelector((state: RootState) => state.generalSettings);

    const [moduleList, setModuleList] = useState<JSX.Element[]>([]);

    const screenWidth = Dimensions.get('window').width;
    const totalPadding = 32 + 24; // Horizontal padding and spacing
    const maxItemsPerRow = 4;
    const itemWidth = (screenWidth - totalPadding) / maxItemsPerRow;

    useEffect(() => {
        const modules = ModuleProvider({
            isDepositEnable,
            isWithdrawEnable,
            isFDREnable,
            isDPSEnable,
            isLoanEnable,
            isReferralEnable, 
            navigation
        });

        setModuleList(modules.filter(Boolean) as JSX.Element[]);
    }, [isDepositEnable, isWithdrawEnable, isFDREnable, isDPSEnable, isLoanEnable, isReferralEnable]);

    const renderRows = () => {
        const rows = [];
        for (let i = 0; i < moduleList.length; i += maxItemsPerRow) {
            const items = moduleList.slice(i, i + maxItemsPerRow);

            rows.push(
                <View
                    key={i}
                    style={[
                        styles.row,
                        {
                            justifyContent:
                                items.length < maxItemsPerRow ? 'center' : 'space-between',
                        },
                    ]}
                >
                    {items.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.itemWrapper,
                                { width: items.length < maxItemsPerRow ? 'auto' : itemWidth },
                            ]}
                        >
                            {item}
                        </View>
                    ))}
                </View>
            );
        }
        return rows;
    };

    return <View style={styles.container}>{renderRows()}</View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingBottom: 16,
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 8,
        alignItems: 'center', // Vertically align items
    },
    itemWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TopButtons;
