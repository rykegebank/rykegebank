import { useGeneralSettingsQuery } from '../data/generalSettings/queries';

interface GeneralSettingsState {
    isDepositEnable: boolean;
    isWithdrawEnable: boolean;
    isFDREnable: boolean;
    isDPSEnable: boolean;
    isLoanEnable: boolean;
    isReferralEnable: boolean;
    currencyText: string;
    currencySymbol: string;
}

export const useGeneralSettings = () => {
    const { data, error, isLoading } = useGeneralSettingsQuery();

    const settings: GeneralSettingsState = {
        isDepositEnable: false,
        isWithdrawEnable: false,
        isFDREnable: false,
        isDPSEnable: false,
        isLoanEnable: false,
        isReferralEnable: false,
        currencyText: '',
        currencySymbol: '',
    };

    if (data) {
        const modules = data.data?.general_setting?.modules || {};

        settings.isDepositEnable = modules.deposit == '1';
        settings.isWithdrawEnable = modules.withdraw == '1';
        settings.isFDREnable = modules.fdr == '1';
        settings.isDPSEnable = modules.dps == '1';
        settings.isLoanEnable = modules.loan == '1';
        settings.isReferralEnable = modules.referral_system == '1';

        const model = data.data?.general_setting;
        settings.currencyText = model?.cur_text ?? '';
        settings.currencySymbol = model?.cur_sym ?? '';
    }

    const getCurrencyOrUsername = ({
        isCurrency = true,
        isSymbol = false,
    }: {
        isCurrency?: boolean;
        isSymbol?: boolean;
    }) => {
        if (isCurrency) {
            return isSymbol ? settings.currencySymbol : settings.currencyText;
        } else {
            return 'tbd'; // need to fetch from shared pref
        }
    }

    return {
        settings,
        error,
        isLoading,
        getCurrencyOrUsername,
    };
};
