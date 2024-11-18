import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Dimensions, Colors } from '../../../constants';
import CircleAnimatedButtonWithText from '../../../components/buttons/circleAnimatedButtonText';

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
                buttonName="Deposit"
                child={<Text>💰</Text>}
                onTap={() => console.log('Navigate to Deposit Screen')}
                height={40}
                width={60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (fdr) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="fdr"
                buttonName="FDR"
                child={<Text>📈</Text>}
                onTap={() => console.log('Navigate to FDR Screen')}
                height={40}
                width={60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (dps) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="dps"
                buttonName="DPS"
                child={<Text>💹</Text>}
                onTap={() => console.log('Navigate to DPS Screen')}
                height={40}
                width={60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (loan) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="loan"
                buttonName="Loan"
                child={<Text>📜</Text>}
                onTap={() => console.log('Navigate to Loan Screen')}
                height={40}
                width={60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    if (withdraw) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="withdraw"
                buttonName="Withdraw"
                child={<Text>🏦</Text>}
                onTap={() => console.log('Navigate to Withdraw Screen')}
                height={40}
                width={60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

 

    // Always include these modules
    generatedModuleList.push(
        <CircleAnimatedButtonWithText
            key="transfer"
            buttonName="Transfer"
            child={<Text>🔄</Text>}
            onTap={() => console.log('Navigate to Transfer Screen')}
            height={40}
            width={60}
            backgroundColor={Colors.colorWhite}
        />
    );
    generatedModuleList.push(
        <CircleAnimatedButtonWithText
            key="transaction"
            buttonName="Transaction"
            child={<Text>🧾</Text>}
            onTap={() => console.log('Navigate to Transaction Screen')}
            height={40}
            width={60}
            backgroundColor={Colors.colorWhite}
        />
    );

    if (referralSystem) {
        generatedModuleList.push(
            <CircleAnimatedButtonWithText
                key="referral"
                buttonName="Referral"
                child={<Text>👥</Text>}
                onTap={() => console.log('Navigate to Referral Screen')}
                height={40}
                width={60}
                backgroundColor={Colors.colorWhite}
            />
        );
    }

    return generatedModuleList;
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 40,
        borderRadius: Dimensions.space15,
        backgroundColor: '#fff',
        marginBottom: Dimensions.space20,
    },
    buttonText: {
        marginTop: 8,
        fontSize: Dimensions.fontSmall,
    },
});

export default ModuleProvider;
