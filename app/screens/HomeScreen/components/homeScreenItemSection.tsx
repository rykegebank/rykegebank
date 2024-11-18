import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TopButtons from './topButtons'; // Import your TopButtons component
import { Colors, Dimensions } from '../../../constants';
import { getCardBg } from '../../../constants/colors';

const HomeScreenItemsSection = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <TopButtons />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: getCardBg(),
  },
  scrollViewContainer: {
    paddingVertical: Dimensions.space20,
    paddingHorizontal: Dimensions.space15,
  },
});

export default HomeScreenItemsSection;
