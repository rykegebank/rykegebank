import React from 'react';
import { View, Text } from 'react-native';
import { Dimensions, Strings } from '../../../constants';
import { getUnselectedIconColor, getTextColor } from '../../../constants/colors';
import MyIcon from '../../../../assets/images/common/no_data.svg';

interface NoDataFoundProps {
  topMargin?: number;
  bottomMargin?: number;
  title?: string;
  imageHeight?: number;
}

const NoDataFound = ({ topMargin = 0, bottomMargin = 0, title = Strings.noDataFound, imageHeight = 150 }: NoDataFoundProps) => {
  return (
    <View style={{ alignItems: 'center', marginTop: topMargin, marginBottom: bottomMargin }}>
      <MyIcon width={100} height={100} fill={getUnselectedIconColor()} />
      <Text
        style={{
          color: getTextColor(),
          opacity: 0.6,
          fontSize: Dimensions.fontDefault,
          textAlign: 'center',
          marginTop: Dimensions.space20,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default NoDataFound;
