import React, { useEffect ,useMemo} from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Colors, Dimensions } from '../../constants';
import Html from 'react-native-render-html';
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import { usePolicy } from "./hook/usePolicy";
import CategoryButton from '../../components/GenericButton/categoryButton';
import AppBar from "../../components/GenericAppBar";

const PrivacyScreen = () => {
    const { isLoading, data, changeSelectedIndex, selectedIndex, selectedHtml } = usePolicy();
    const { width } = useWindowDimensions();

    useEffect(() => {
        if (data && data.length > 0) {
            changeSelectedIndex(0);
        }
    }, [data]);

    const tagsStyles = useMemo(
        () => ({
            p: {
                fontFamily: 'Roboto',
                color: Colors.colorBlack,
                fontSize: Dimensions.fontDefault,
                fontWeight: 400, // Use valid fontWeight value
            },
        }),
        []
    );
    
    return (
        <ScrollView style={styles.container}>
            <AppBar title="Policies" showBackButton />
            {isLoading ? (
                <View style={styles.loaderContainer}>
                    <LoadingIndicator isLoading={true} />
                </View>
            ) : (
                <View>
                    <View style={styles.categoryContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {data?.map((item: any, index: number) => (
                                <CategoryButton
                                    key={index}
                                    text={item.data_values?.title || ''}
                                    press={() => changeSelectedIndex(index)}
                                    verticalPadding={8}
                                    horizontalPadding={7}
                                    color={selectedIndex === index ? Colors.primaryColor : Colors.colorWhite}
                                    textColor={selectedIndex === index ? Colors.colorWhite : Colors.colorBlack}
                                    textSize={Dimensions.fontDefault}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.contentContainer}>
                        <View style={{ padding: Dimensions.space15, width: '100%' }}>
                            <Html
                                source={{ html: selectedHtml }}
                                contentWidth={width}
                                tagsStyles={tagsStyles}
                            />
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.windowHeight,
        width: Dimensions.windowWidth,
    },
    categoryContainer: {
        paddingHorizontal: Dimensions.space15,
        paddingTop: Dimensions.space20,
    },
    contentContainer: {
        padding: Dimensions.space15,
        width: '100%',
    },
});

export default PrivacyScreen;
