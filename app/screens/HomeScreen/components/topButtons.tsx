import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import ModuleProvider from './moduleProvider';

const TopButtons = () => {
    const [moduleList, setModuleList] = useState<JSX.Element[]>([]);

    const screenWidth = Dimensions.get('window').width;
    const itemWidth = (screenWidth - 32 - 24) / 4;

    useEffect(() => {
        const modules = ModuleProvider();
        setModuleList(modules);
    }, []);

    return (
        <View style={styles.container}>
            {moduleList.length === 8 ? (
                <View style={styles.columnContainer}>
                    <View style={styles.row}>
                        {moduleList.slice(0, 4).map((item, index) => (
                            <View key={index} style={styles.itemWrapper}>
                                {item}
                            </View>
                        ))}
                    </View>

                    <View style={styles.row}>
                        {moduleList.slice(4).map((item, index) => (
                            <View key={index} style={styles.itemWrapper}>
                                {item}
                            </View>
                        ))}
                    </View>
                </View>
            ) : moduleList.length > 4 ? (
                <View style={styles.wrapContainer}>
                    {moduleList.map((item, index) => (
                        <View key={index} style={[styles.itemWrapper, { width: itemWidth }]}>
                            {item}
                        </View>
                    ))}
                </View>
            ) : moduleList.length === 4 ? (
                <View style={styles.row}>
                    {moduleList.map((item, index) => (
                        <View key={index} style={styles.itemWrapper}>
                            {item}
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.row}>
                    {moduleList.slice(0, 3).map((item, index) => (
                        <View key={index} style={styles.itemWrapper}>
                            {item}
                        </View>
                    ))}
                    {moduleList.length < 3 && <View style={styles.itemWrapper} />}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 8,
    },
    itemWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    wrapContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 8,
    },
});

export default TopButtons;
