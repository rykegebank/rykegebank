import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CardColumn from '../../../components/GenericCard/cardColumn';
import { Colors, Dimensions, Strings } from '../../../constants';
import Send from '../../../../assets/images/transfer/send.svg';
import MyBankTransferBottomSheet from '../components/myBankTransferBottomSheet'; // Adjust import as needed
import { useMyBankTransfer } from '.././hooks/useMyBankTransfer';
import { useBeneficiary } from '../../../data/beneficiary/mutation';
import { RootState } from '../../../store';
import { setSelectedAuthorization } from '../../../store/slices/myBankTransferSlice';

interface MyBankTransferListItemProps {
  accountName: string;
  accountNumber: string;
  shortName: string;
  index: number;
}

const MyBankTransferListItem: React.FC<MyBankTransferListItemProps> = ({
  accountName,
  accountNumber,
  shortName,
  index,
}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const bankState = useSelector((state: RootState) => state.myBankTransfer);

  const {
    changeAuthorizationMode,
    loadPaginationData,
    hasNext,
    handleToggleLimitShow,
  } = useMyBankTransfer();

  const handleTransfer = () => {
    // Show the bottom sheet when Transfer is clicked
    handleToggleLimitShow();
  };


  const handleTransferAction = (beneficiaryId: string) => {
    // Perform the transfer action here
    console.log(`Transfer to ${bankState.authorizationList}`);

  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => { }}>
      <View style={styles.row}>
        <CardColumn header={'Account Name'} body={accountName} />
        <CardColumn header={'Short Name'} body={shortName} alignmentEnd />
      </View>

      <View style={styles.divider} />

      <View style={styles.row}>
        <CardColumn header={'Account Number'} body={accountNumber} />
        <TouchableOpacity style={styles.transferButton} onPress={handleToggleLimitShow}>
          <Send width={11} height={11} color={Colors.textColor} />
          <Text style={styles.transferText}>{'Transfer'}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <MyBankTransferBottomSheet
        isVisible={bankState.isLimitShow}
        onClose={handleToggleLimitShow}
        onTransfer={handleTransferAction}
        currencySymbol={bankState.currencySymbol}
        currency={bankState.currency}
        amount={''}
        limitPerTrx={bankState.limitPerTrx}
        chargePerTrx={bankState.chargePerTrx}
        dailyMaxLimit={bankState.dailyMaxLimit}
        monthlyLimit={bankState.monthlyLimit}
        authorizationList={bankState.authorizationList}
        selectedAuthorizationMode={bankState.selectedAuthorizationMode ?? ''}
        onSelectAuthMode={changeAuthorizationMode}
        submitLoading={false}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%',
    padding: Dimensions.space15,
    backgroundColor: Colors.colorWhite,
    borderRadius: 8,
    shadowColor: Colors.lineColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardColumn: {
    flex: 1,
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  transferButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  transferText: {
    marginLeft: 7,
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default MyBankTransferListItem;
