import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Dimensions, Colors, Assets, Strings } from '../../../constants';
import CircleAnimatedButtonWithText from '../../../components/buttons/circleAnimatedButtonText';
import CustomImage from '../../../components/image/customImage';
import Deposit from '../../../../assets/images/deposit_1.svg';
import Fdr from '../../../../assets/images/fdr.svg';
import Dps from '../../../../assets/images/dps.svg';
import Withdraw from '../../../../assets/images/withdraw.svg';
import Transfer from '../../../../assets/images/transfer_solid.svg';
import Transaction from '../../../../assets/images/transaction_solid.svg';
import Referral from '../../../../assets/images/referral.svg';

interface GeneralSettings {
    deposit: boolean;
    withdraw: boolean;
    fdr: boolean;
    dps: boolean;
    loan: boolean;
    referralSystem: boolean;
}

const ModuleProvider = () => {
    const settings: GeneralSettings = {
        deposit: true,
        withdraw: true,
        fdr: true,
        dps: true,
        loan: true,
        referralSystem: true,
    };

    const { deposit, withdraw, fdr, dps, loan, referralSystem } = settings;
    const generatedModuleList: JSX.Element[] = [];

    if (deposit) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="deposit"
                buttonName={Strings.deposit}
                child={<Deposit width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => console.log('Navigate to Deposit Screen')}
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (fdr) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="fdr"
                buttonName={Strings.fdr}
                child={<Fdr width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => console.log('Navigate to FDR Screen')}
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (dps) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="dps"
                buttonName={Strings.dps}
                child={<Dps width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => console.log('Navigate to DPS Screen')}
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (loan) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="loan"
                buttonName={Strings.loan}
                child={<CustomImage source={Assets.loanIcon} color={Colors.primaryColor} height={22} width={22} fit="cover" />}
                onTap={() => console.log('Navigate to Loan Screen')}
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (withdraw) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="withdraw"
                buttonName={Strings.withdrawal}
                child={<Withdraw width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => console.log('Navigate to Withdraw Screen')}
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }


    generatedModuleList.push(
        <CircleAnimatedButtonWithText
            key="transfer"
            buttonName={Strings.transfer}
            child={<Transfer width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
            onTap={() => console.log('Navigate to Transfer Screen')}
            height={Dimensions.size60}
            width={Dimensions.size60}
            backgroundColor={Colors.colorWhite}
        />
    );
    
    generatedModuleList.push(
        <CircleAnimatedButtonWithText
            key="transaction"
            buttonName={Strings.transaction}
            child={<Transaction width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
            onTap={() => console.log('Navigate to Transaction Screen')}
            height={Dimensions.size60}
            width={Dimensions.size80}
            backgroundColor={Colors.colorWhite}
        />
    );

    if (referralSystem) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="referral"
                buttonName={Strings.referral}
                child={<Referral width={Dimensions.space20} height={Dimensions.space20} fill={Colors.primaryColor} />}
                onTap={() => console.log('Navigate to Referral Screen')}
                height={Dimensions.size60}
                width={Dimensions.size60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    return generatedModuleList;
};

export default ModuleProvider;
