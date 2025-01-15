import React from "react";
import { SafeAreaView, View, FlatList, StyleSheet } from "react-native";
import FaqListItem from './components/faq_component'; // Replace with your FaqListItem component
import AppBar from "../../components/GenericAppBar";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import { useFaqs } from "./hooks/useFaq";
import { Colors, Dimensions } from '../../constants'

const FaqScreen = () => {
    const { isLoading, data, changeSelectedIndex, selectedIndex } = useFaqs();

    if (isLoading) {
        return <LoadingIndicator isLoading={true} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <AppBar title="FAQ" showBackButton />
            <FlatList
                data={data?.slice(0, 6) || []} // Show up to 6 items
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item, index }) => (
                    <FaqListItem
                        question={item?.data_values?.question || ""}
                        answer={item?.data_values?.answer || ""}
                        index={index}
                        selectedIndex={selectedIndex}
                        press={() => changeSelectedIndex(index)}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    listContainer: {
        paddingHorizontal: Dimensions.space15,
        paddingVertical: Dimensions.space10,
    },
    separator: {
        height: Dimensions.space10,
    },
});

export default FaqScreen;
