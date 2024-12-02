import React, { FC } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';

import { Colors, Dimensions, Strings } from '../../../constants';
import { getCardBg } from '../../../constants/colors';
import TopButtons from './topButtons';
import CustomDivider from '../../../components/Dividers/customDivider';
import CustomText from '../../../components/Texts/customText';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import LatestTransactionListItem from '../components/latestTransactionListItem';
import { formatNumber } from '../../../utils/stringFormatHelper';
import { isoStringToLocalDateOnly, isoStringToLocalTimeOnly } from '../../../utils/dateConvert';
import { useHomeQuery } from "../hooks/home";

const HomeScreenItemsSection: React.FC = () => {
  const { data, isLoading, error, refetch } = useHomeQuery();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <TopButtons />
        <CustomDivider space={10} />
        <CustomText
          style={styles.space}
          fontSize={Dimensions.fontLarge}
          color={Colors.labelTextColor}
          fontWeight={'500'}>
          {Strings.latestTransaction}
        </CustomText>

        {data?.debitsLists.length === 0 ? (
          <NoDataFound topMargin={60} />
        ) : (
          <FlatList
            data={data?.debitsLists}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            contentContainerStyle={styles.flatListContainer}
            renderItem={({ item }) => (
              <LatestTransactionListItem
                isShowDivider={true}
                isCredit={item.trx_type === '+'}
                trx={item.trx || ''}
                date={`${isoStringToLocalDateOnly(item.created_at || '')}, ${isoStringToLocalTimeOnly(item.created_at || '')}`}
                amount={`${data?.currencySymbol}${formatNumber(item.amount || "")}`}
                postBalance={`${formatNumber(item.post_balance || "")} ${data?.currency}`}
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
  space: {
    paddingVertical: Dimensions.space5,
  },
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
