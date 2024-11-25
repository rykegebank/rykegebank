import React, { FC } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import { Colors, Dimensions, Strings } from '../../../constants';
import { getCardBg } from '../../../constants/colors';
import TopButtons from './topButtons';
import CustomDivider from '../../../components/divider/customDivider';
import CustomText from '../../../components/text/customText';
import { RootState } from '../../../store';
import NoDataFound from '../../../components/noData/NoDataFound';
import LatestTransactionListItem from '../components/latestTransactionListItem';
import { formatNumber } from '../../../utils/stringFormatHelper';
import { isoStringToLocalDateOnly, isoStringToLocalTimeOnly } from '../../../utils/dateConvert';

const HomeScreenItemsSection: React.FC = () => {
  const { debitsLists, currencySymbol, currency } = useSelector(
    (state: RootState) => state.home
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <TopButtons />
        <CustomDivider space={20} />
        <CustomText
          fontSize={Dimensions.fontLarge}
          color={Colors.labelTextColor}
          fontWeight={'500'}>
          {Strings.latestTransaction}
        </CustomText>

        {debitsLists.length === 0 ? (
          <NoDataFound topMargin={60} />
        ) : (
          <FlatList
            data={debitsLists}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item }) => (
              <LatestTransactionListItem
                isShowDivider={true}
                isCredit={item.trx_type === '+'}
                trx={item.trx || ''}
                date={`${isoStringToLocalDateOnly(item.created_at || '')}, ${isoStringToLocalTimeOnly(item.created_at || '')}`}
                amount={`${currencySymbol}${formatNumber(item.amount || "")}`}
                postBalance={`${formatNumber(item.post_balance || "")} ${currency}`}
                onPressed={() => { }}
              />
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: getCardBg(),
  },
  scrollViewContainer: {
    paddingVertical: Dimensions.space20,
    paddingHorizontal: Dimensions.space15,
  },
  flatListContainer: {
    paddingVertical: Dimensions.space10,
  },
});

export default HomeScreenItemsSection;
