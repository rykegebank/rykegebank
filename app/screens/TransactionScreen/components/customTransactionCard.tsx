import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import CardColumn from '../../../components/GenericCard/cardColumn';
import WidgetDivider from '../../../components/Dividers/componentDivider';

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
        <View style={styles.row}>
          <CardColumn header="Transaction" body={trxData} />
          <CardColumn header="Date" body={dateData} alignmentEnd />
        </View>
        <WidgetDivider space={15} />
        <View style={styles.row}>
          <CardColumn
            header="Amount"
            body={`${amountData} ${currency}`}
            textColor={changeTextColor(trxType)}
          />
          <CardColumn
            header="Post Balance"
            body={`${postBalanceData} ${currency}`}
            alignmentEnd
          />
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View>
          <WidgetDivider space={15} />
          <CardColumn header="Details" body={detailsText} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 15,
    paddingHorizontal: 12,
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
});

export default CustomTransactionCard;
