import React from 'react';

import CircleAnimatedButtonWithText from '../../../components/Buttons/circleAnimatedButtonText';
import Deposit from '../../../../assets/images/deposit_1.svg';
import Fdr from '../../../../assets/images/fdr.svg';
import Dps from '../../../../assets/images/dps.svg';
import Withdraw from '../../../../assets/images/withdraw.svg';
import Transfer from '../../../../assets/images/transfer_solid.svg';
import Transaction from '../../../../assets/images/transaction_solid.svg';
import Referral from '../../../../assets/images/referral.svg';
import CustomImage from '../../../components/Image/customImage';
import { Colors, Strings, Dimensions, Assets, Routes } from '../../../constants';

interface ModuleProviderProps {
    isDepositEnable: boolean;
    isWithdrawEnable: boolean;
    isFDREnable: boolean;
    isDPSEnable: boolean;
    isLoanEnable: boolean;
    isReferralEnable: boolean;
    navigation: any;
}

const ModuleProvider = ({
    isDepositEnable,
    isWithdrawEnable,
    isFDREnable,
    isDPSEnable,
    isLoanEnable,
    isReferralEnable,
    navigation
}: ModuleProviderProps): JSX.Element[] => {
    const generatedModuleList: JSX.Element[] = [];

    // Deposit Module
    if (isDepositEnable) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="deposit"
                buttonName={Strings.deposit}
                child={<Deposit width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => navigation.navigate(Routes.deposit)}  // Navigate to deposit screen
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    // FDR Module
    if (isFDREnable) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="fdr"
                buttonName={Strings.fdr}
                child={<Fdr width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => navigation.navigate(Routes.fdr)}  // Navigate to FDR screen
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    // DPS Module
    if (isDPSEnable) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="dps"
                buttonName={Strings.dps}
                child={<Dps width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => navigation.navigate(Routes.dps)}  // Navigate to DPS screen
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    // Loan Module
    if (isLoanEnable) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="loan"
                buttonName={Strings.loan}
                child={<CustomImage source={Assets.loanIcon} color={Colors.primaryColor} height={22} width={22} fit="cover" />}
                onTap={() => navigation.navigate(Routes.loan)}  // Navigate to Loan screen
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    // Withdraw Module
    if (isWithdrawEnable) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="withdraw"
                buttonName={Strings.withdrawal}
                child={<Withdraw width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => navigation.navigate(Routes.withdraw)}  // Navigate to Withdraw screen
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    // Transfer Module
    generatedModuleList.push(
        <CircleAnimatedButtonWithText
            key="transfer"
            buttonName={Strings.transfer}
            child={<Transfer width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
            onTap={() => navigation.navigate(Routes.transfer)}  // Navigate to Transfer screen
            height={Dimensions.size60}
            width={Dimensions.size60}
            backgroundColor={Colors.colorWhite}
        />
    );

    // Transaction Module
    generatedModuleList.push(
        <CircleAnimatedButtonWithText
            key="transaction"
            buttonName={Strings.transaction}
            child={<Transaction width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
            onTap={() => navigation.navigate(Routes.transaction)}  // Navigate to Transaction screen
            height={Dimensions.size60}
            width={Dimensions.size80}
            backgroundColor={Colors.colorWhite}
        />
    );

    // Referral Module
    if (isReferralEnable) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="referral"
                buttonName={Strings.referral}
                child={<Referral width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => navigation.navigate(Routes.referral)}  // Navigate to Referral screen
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    return generatedModuleList;
};

export default ModuleProvider;
