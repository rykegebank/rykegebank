import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Colors, Dimensions,Strings } from '../../../constants';
import { getCardBg } from '../../../constants/colors';
import TopButtons from './topButtons';
import CustomDivider from '../../../components/divider/customDivider';
import CustomText from '../../../components/text/customText';

const HomeScreenItemsSection = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <TopButtons />
        <CustomDivider />
        <CustomText fontSize={Dimensions.fontLarge} color={Colors.labelTextColor} fontWeight={'500'}> {Strings.latestTransaction} </CustomText>
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
