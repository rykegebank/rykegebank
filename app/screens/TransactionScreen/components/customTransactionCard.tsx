import React from 'react';
import {
  View,
  StyleSheet,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import WidgetDivider from '../../../components/Dividers/componentDivider';
import CustomText from '../../../components/Texts/customText';
import { Colors, Dimensions } from '../../../constants';
import { formatNumber } from '../../../utils/stringFormatHelper';
import { localDate } from '../../../utils/dateConvert';
import { hexToRgba } from '../../../utils/helperFunctions';

interface Props {
  trxData: string;
  dateData: string;
  amountData: string;
  detailsText: string;
  postBalanceData: string;
  index: number;
  expandIndex: number;
  trxType: string;
  currency: string;
  changeTextColor: (trxType: string) => string;
  setExpandIndex: (index: number | null) => void;
}

const CustomTransactionCard: React.FC<Props> = ({
  trxData,
  dateData,
  amountData,
  detailsText,
  postBalanceData,
  index,
  expandIndex,
  trxType,
  currency,
  changeTextColor,
  setExpandIndex,
}) => {
  const isExpanded = expandIndex === index;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandIndex(isExpanded ? null : index);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={toggleExpand}>
        <CustomText style={styles.title}>{detailsText}</CustomText>
        <View style={{ height: 5 }} />
        <View style={styles.row}>
          <View style={[styles.trxChip, { backgroundColor: hexToRgba(changeTextColor(trxType), .2) }]}>
            <CustomText style={[styles.trxChipText, { color: changeTextColor(trxType) }]}>{trxData}</CustomText>
          </View>
          <View style={styles.centeredAmountContainer}>
            <CustomText style={[styles.amount, { color: changeTextColor(trxType) }]}>
              {` ${currency}${formatNumber(amountData)}`}
            </CustomText>
          </View>
        </View>
        {/* <WidgetDivider space={15} /> */}
        <View style={{ height: 5 }} />
        <CustomText style={styles.date}>{localDate(dateData)}</CustomText>
        <View style={styles.row}>
          {/* Additional content could be added here */}
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View>
          <WidgetDivider space={15} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomText style={styles.regularText}>Post Balance:</CustomText>
            <CustomText style={styles.regularText}>{` ${currency}${formatNumber(postBalanceData)} `}</CustomText>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: Dimensions.font16,
    fontWeight: '600',
    paddingLeft: 5
  },
  regularText: {
    fontSize: Dimensions.fontDefault,
    fontWeight: '600',
  },
  date: {
    fontSize: Dimensions.fontSmall,
    fontWeight: 'thin',
    color: Colors.smallTextColor1,
    paddingLeft: 5
  },
  cardContainer: {
    paddingVertical: Dimensions.space15,
    paddingHorizontal: Dimensions.space12,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trxChip: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trxChipText: {
    fontSize: Dimensions.fontSmall,
    fontWeight: '600',
  },
  centeredAmountContainer: {
    flex: 1, // Ensures the container takes up space proportionately in the row
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: Dimensions.large,
    fontWeight: 'bold',
    textAlign: 'center', // Ensures text alignment in case of multiple lines
  },
});

export default CustomTransactionCard;
