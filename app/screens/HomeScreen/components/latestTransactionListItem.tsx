import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Colors, Dimensions } from '../../../constants';
import CustomDivider from '../../../components/Dividers/customDivider';
import CustomText from '../../../components/Texts/customText';
import { getTextColor } from '../../../constants/colors';
import { hexToRgba } from '../../../utils/helperFunctions';

interface LatestTransactionListItemProps {
  trx: string;
  date: string;
  amount: string;
  postBalance: string;
  currency?: string;
  onPressed: () => void;
  isShowDivider?: boolean;
  isCredit: boolean;
}

const LatestTransactionListItem: React.FC<LatestTransactionListItemProps> = ({
  trx,
  date,
  amount,
  postBalance,
  currency = '',
  onPressed,
  isShowDivider = false,
  isCredit,
}) => {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={styles.row}>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: isCredit
                    ? hexToRgba(Colors.greenSuccessColor, 0.17)
                    : hexToRgba(Colors.colorRed, 0.2),
                },
              ]}
            >
              <Text
                style={{
                  color: isCredit ? Colors.greenSuccessColor : Colors.colorRed,
                  fontSize: 20,
                }}
              >
                {<MaterialIcons name={isCredit ? 'arrow-downward' : 'arrow-upward'} size={Dimensions.size20} color={isCredit ? Colors.greenSuccessColor : Colors.colorRed} />}
              </Text>
            </View>
            <View style={{ marginLeft: Dimensions.space12 }}>
              <CustomText fontSize={Dimensions.fontDefault} color={getTextColor()} fontWeight={'500'}> {trx} </CustomText>
              <View style={{ height: Dimensions.space10 }} />
              <CustomText fontSize={Dimensions.fontDefault} color={hexToRgba(getTextColor(), 0.5)} numberOfLines={2}
                ellipsizeMode="tail"> {date} </CustomText>
            </View>
          </View>
          <CustomText fontSize={Dimensions.fontSmall} color={isCredit ? Colors.greenSuccessColor : Colors.colorRed} numberOfLines={1}
            ellipsizeMode="tail"> {amount} </CustomText>
        </View>
        {isShowDivider ? (
          <View style={styles.divider}>
            <CustomDivider space={20} lineColor={Colors.bgColor1} />
          </View>
        ) : (
          <View style={{ height: Dimensions.space20 }} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.transparentColor,
  },
  content: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    height: Dimensions.size35,
    width: Dimensions.size35,
    borderRadius: Dimensions.size35 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trxText: {
    fontWeight: '500',
  },
  dateText: {
    width: 150,
  },
  amountText: {
    fontWeight: '600',
  },
  divider: {
    paddingHorizontal: Dimensions.space5,
  },
});

export default LatestTransactionListItem;
